// Usage: npm run banner -- --help

const { existsSync, mkdirSync, createWriteStream } = require("fs");
const trianglify = require("trianglify");
const { program } = require("commander");
const { loadImage } = require("canvas");
const { join, dirname } = require("path");
const chalk = require("chalk");

const STATIC_DIR = join(__dirname, "..", "..", "static");
const IMG_DIR = join(STATIC_DIR, "img");
const ICON_FILE = join(IMG_DIR, "conda_logo_c.png");

// Function to generate banner
function generateBanner(output, input = ICON_FILE, verbose = false) {
  // Randomize color function
  const colorFunctions = Object.values(trianglify.colorFunctions);
  const colorIndex = Math.floor(Math.random() * colorFunctions.length);

  // Generate a canvas using trianglify
  const canvas = trianglify({
    width: 1200,
    height: 630,
    cellSize: Math.random() * 100 + 20, // 20-120
    variance: Math.random() * 0.7 + 0.3, // 0.3-1
    xColors: "random",
    colorFunction: colorFunctions[colorIndex](Math.random()),
  }).toCanvas();

  // Load the icon/image
  loadImage(input)
    .then((image) => {
      // Calculate height/width
      const radius = 20;
      const padding = 20;
      const height = canvas.height / 3;
      const hIcon = height - padding * 2;
      const wIcon = (image.width / image.height) * hIcon;
      const width = wIcon + padding * 2;

      // Get 2D context to draw icon
      const ctx = canvas.getContext("2d");
      ctx.shadowColor = "black";
      ctx.shadowBlur = 10;

      // Draw the rounded rectangle
      // I ╭ H ──── G ╮ F
      //   J          E
      //   │          │
      //   K          D
      // L ╰ A ──── B ╯ C
      const [x0, y0] = [
        (canvas.width - width) / 2,
        (canvas.height - height) / 2,
      ];

      const [xA, yA] = [x0 + radius, y0];
      const [xB, yB] = [x0 + width - radius, y0];
      const [xC, yC] = [x0 + width, y0];

      const [xD, yD] = [x0 + width, y0 + radius];
      const [xE, yE] = [x0 + width, y0 + height - radius];
      const [xF, yF] = [x0 + width, y0 + height];

      const [xG, yG] = [x0 + width - radius, y0 + height];
      const [xH, yH] = [x0 + radius, y0 + height];
      const [xI, yI] = [x0, y0 + height];

      const [xJ, yJ] = [x0, y0 + height - radius];
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
      const parent = dirname(output);
      if (!existsSync(parent)) mkdirSync(parent, { recursive: true });

      // Save the canvas to a file
      const out = createWriteStream(output);
      canvas.createPNGStream().pipe(out);
      out.on("finish", () => {
        console.log(`Banner saved to ${output}`);
      });
    })
    .catch((error) => {
      if (verbose) throw error;
      console.error(`Error: ${error.message}`);
    });
}

function main() {
  program
    .name("banner")
    .version("0.1.0")
    .description("A small tool to generate banners layered with an icon.")
    .option("-i, --input <filename>", "Specify the icon/input file", ICON_FILE)
    .requiredOption("-o, --output <filename>", "Specify the output file")
    .option("-v, --verbose", "Enable verbose mode")
    .parse();
  const options = program.opts();

  // output the CWD
  console.log(chalk.green(`Current working directory: ${process.cwd()}`));

  // output script directory
  console.log(chalk.green(`Script directory: ${__dirname}`));

  // error if options.input doesn't exist
  if (!existsSync(options.input)) {
    console.error(`Error: ${options.input} does not exist.`);
    process.exit(1);
  }

  // warn if options.output exists
  if (existsSync(options.output)) {
    console.log(
      chalk.orange(`Warning: ${options.output} already exists. Overwriting.`),
    );
  }

  generateBanner(options.output, options.input, options.verbose);
}

if (require.main === module) main();

module.exports = { generateBanner };
