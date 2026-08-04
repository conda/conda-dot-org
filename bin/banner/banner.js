#!/usr/bin/env node
// Usage:
//   npm run banner -- --output path/to/output.png [--input path/to/icon.png] [--style random|smooth|auto]
//   npm run banner -- fill-missing [blog/some-post.md ...]
const {
  existsSync,
  mkdirSync,
  createWriteStream,
  readFileSync,
  writeFileSync,
  readdirSync,
} = require("fs");
const { program, Option } = require("commander");
const { createCanvas, loadImage } = require("canvas");
const { join, dirname, basename, extname, resolve } = require("path");
const { paintMosaicBackground } = require("./mosaic.js");

const REPO_ROOT = join(__dirname, "..", "..");
const WIDTH = 1200;
const HEIGHT = 630;
const DEFAULT_ICON = "static/img/conda_logo_c.png";

const styleOption = () =>
  new Option("-s, --style <style>", "Background style")
    .choices(["random", "smooth", "auto"])
    .default("auto");

/**
 * Render a single banner (mosaic background + rounded card + centered icon)
 * to a PNG file.
 * @param {object} opts
 * @param {string} opts.input Icon path, relative to the repo root
 * @param {string} opts.output Output PNG path, relative to the repo root
 * @param {"random"|"smooth"|"auto"} opts.style
 * @returns {Promise<void>}
 */
async function renderBanner({ input, output, style }) {
  const inputPath = resolve(REPO_ROOT, input);
  const outputPath = resolve(REPO_ROOT, output);

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");
  const resolvedStyle =
    style === "auto" ? (Math.random() < 0.5 ? "random" : "smooth") : style;
  paintMosaicBackground(ctx, WIDTH, HEIGHT, resolvedStyle);

  const image = await loadImage(inputPath);

  // Calculate height/width
  const radius = 20;
  const padding = 20;
  const cardHeight = canvas.height / 3;
  const hIcon = cardHeight - padding * 2;
  const wIcon = (image.width / image.height) * hIcon;
  const cardWidth = wIcon + padding * 2;

  ctx.shadowColor = "black";
  ctx.shadowBlur = 10;

  // Draw the rounded rectangle
  // I ╭ H ──── G ╮ F
  //   J          E
  //   │          │
  //   K          D
  // L ╰ A ──── B ╯ C
  const [x0, y0] = [
    (canvas.width - cardWidth) / 2,
    (canvas.height - cardHeight) / 2,
  ];

  const [xA, yA] = [x0 + radius, y0];
  const [xB, yB] = [x0 + cardWidth - radius, y0];
  const [xC, yC] = [x0 + cardWidth, y0];

  const [xD, yD] = [x0 + cardWidth, y0 + radius];
  const [xE, yE] = [x0 + cardWidth, y0 + cardHeight - radius];
  const [xF, yF] = [x0 + cardWidth, y0 + cardHeight];

  const [xG, yG] = [x0 + cardWidth - radius, y0 + cardHeight];
  const [xH, yH] = [x0 + radius, y0 + cardHeight];
  const [xI, yI] = [x0, y0 + cardHeight];

  const [xJ, yJ] = [x0, y0 + cardHeight - radius];
  const [xK, yK] = [x0, y0 + radius];
  const [xL, yL] = [x0, y0];

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(xA, yA); // A
  ctx.lineTo(xB, yB); // A → B: ─
  ctx.arcTo(xC, yC, xD, yD, radius); // B → C → D: ╯
  ctx.lineTo(xE, yE); // D → E: │
  ctx.arcTo(xF, yF, xG, yG, radius); // E → F → G: ╮
  ctx.lineTo(xH, yH); // G → H: ─
  ctx.arcTo(xI, yI, xJ, yJ, radius); // H → I → J: ╭
  ctx.lineTo(xK, yK); // J → K: │
  ctx.arcTo(xL, yL, xA, yA, radius); // K → L → A: ╰
  ctx.closePath();
  ctx.fill();

  // Clear the shadow properties
  ctx.shadowColor = "white";
  ctx.shadowBlur = 0;

  // Draw the image in the center of the canvas
  const xCenter = canvas.width / 2 - wIcon / 2;
  const yCenter = canvas.height / 2 - hIcon / 2;
  ctx.drawImage(image, xCenter, yCenter, wIcon, hIcon);

  // Create output directory if missing
  const parent = dirname(outputPath);
  if (!existsSync(parent)) mkdirSync(parent, { recursive: true });

  // Save the canvas to a file
  await new Promise((resolvePromise, reject) => {
    const out = createWriteStream(outputPath);
    canvas.createPNGStream().pipe(out);
    out.on("finish", resolvePromise);
    out.on("error", reject);
  });
  console.log(`Banner saved to ${output}`);
}

//: Matches a date-prefixed blog slug, e.g. "2023-03-23-something"
const BLOG_SLUG_PAT = /^[0-9]{4}-[0-9]{2}-[0-9]{2}.+$/;
//: Captures the frontmatter block at the very start of a blog file
const FRONTMATTER_PAT = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;

/**
 * Derive a post's slug from its path (handles both `<slug>.md` and
 * `<slug>/index.md`), matching the convention used by `bin/update-news`.
 * @param {string} file Path to a blog post file
 * @returns {string|null}
 */
function slugFor(file) {
  const stem = basename(file, extname(file));
  const base = stem === "index" ? basename(dirname(file)) : stem;
  return BLOG_SLUG_PAT.test(base) ? base : null;
}

/**
 * Recursively collect blog post files (`.md`/`.mdx`) under a directory.
 * @param {string} dir Absolute path to scan
 * @returns {string[]} Absolute file paths
 */
function collectBlogFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collectBlogFiles(full));
    else if (/\.mdx?$/.test(entry.name)) files.push(full);
  }
  return files;
}

/**
 * Scan blog post(s) for a missing `image:` banner and generate it:
 * - `image: <path>` already set -> generate at that path if it's missing.
 * - `image:` present but blank -> derive `img/blog/<slug>/banner.png` from
 *   the post's filename, generate it there, and fill in the frontmatter.
 * - No `image:` key at all -> left alone (many posts intentionally have none).
 * @param {string[]} files Absolute paths to blog post files to check
 * @param {"random"|"smooth"|"auto"} style
 * @returns {Promise<string[]>} Blog files whose banner was generated
 */
async function fillMissingBanners(files, style) {
  const generated = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const frontmatterMatch = text.match(FRONTMATTER_PAT);
    if (!frontmatterMatch) continue;

    const imageMatch = frontmatterMatch[1].match(/^image:[ \t]*(.*)$/m);
    if (!imageMatch) continue;

    const value = imageMatch[1].trim();
    let relImage;
    if (value) {
      relImage = value;
    } else {
      const slug = slugFor(file);
      if (!slug) continue;
      relImage = `img/blog/${slug}/banner.png`;
    }

    const output = join("static", relImage);
    if (existsSync(resolve(REPO_ROOT, output))) continue;

    console.log(`Generating missing banner for ${file}: ${output}`);
    await renderBanner({ input: DEFAULT_ICON, output, style });

    if (!value) {
      const updatedText = text.replace(FRONTMATTER_PAT, (whole, fm) => {
        const updatedFm = fm.replace(/^image:[ \t]*$/m, `image: ${relImage}`);
        return whole.replace(fm, updatedFm);
      });
      writeFileSync(file, updatedText);
    }

    generated.push(file);
  }
  return generated;
}

program
  .name("banner")
  .version("0.0.0")
  .description(
    "A small tool to generate geometric banners layered with an icon.",
  );

program
  .command("generate", { isDefault: true })
  .description("Generate a single banner")
  .option("-i, --input <filename>", "Specify the icon/input file", DEFAULT_ICON)
  .requiredOption("-o, --output <filename>", "Specify the output file")
  .addOption(styleOption())
  .action(async (options) => {
    await renderBanner(options);
  });

program
  .command("fill-missing")
  .description(
    "Generate banners for blog posts whose frontmatter `image:` is set but missing on disk",
  )
  .argument(
    "[files...]",
    "Specific blog post files to check (defaults to scanning the whole blog directory)",
  )
  .addOption(styleOption())
  .action(async (files, options) => {
    const targets = files.length
      ? files.map((file) => resolve(REPO_ROOT, file))
      : collectBlogFiles(join(REPO_ROOT, "blog"));
    const generated = await fillMissingBanners(targets, options.style);
    if (generated.length) {
      process.exitCode = 1;
    }
  });

program.parseAsync().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
