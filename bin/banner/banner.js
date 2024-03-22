// Usage: npm run banner -- --input path/to/icon.png --output path/to/output.png
// Warning: canvas isn't compiled for macOS-arm64, follow compiling instructions:
//  https://www.npmjs.com/package/canvas#compiling
const { existsSync, mkdirSync, createWriteStream } = require("fs");
const trianglify = require("trianglify");
const { program } = require("commander");
const { loadImage } = require("canvas");
const { join, dirname } = require("path");

program
  .version("0.0.0")
  .description(
    "A small tool to generate geometric banner layered with an icon.",
  )
  .option(
    "-i, --input <filename>",
    "Specify the icon/input file",
    "static/img/conda_logo_c.png",
  )
  .requiredOption("-o, --output <filename>", "Specify the output file")
  .parse();
const options = program.opts();

const input = join("..", "..", options.input);
const output = join("..", "..", options.output);

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
    const [x0, y0] = [(canvas.width - width) / 2, (canvas.height - height) / 2];

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
    console.error(`Error: ${error.message}`);
  });
