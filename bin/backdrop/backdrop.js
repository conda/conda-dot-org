// Usage: npm run backdrop --input path/to/icon.png --output path/to/output.png
// Warning: canvas isn't compiled for macOS-arm64, follow compiling instructions:
//  https://www.npmjs.com/package/canvas#compiling
const { existsSync, mkdirSync, createWriteStream } = require('fs');
const trianglify = require('trianglify');
const { program } = require('commander');
const { loadImage } = require('canvas');
const { join, dirname } = require('path');

program
  .version('0.0.0')
  .description('A small tool to generate geometric backdrops layered with an icon.')
  .option('-i, --input <filename>', 'Specify the icon/input file', 'static/img/conda_logo_c.png')
  .requiredOption('-o, --output <filename>', 'Specify the output file')
  .parse();
const options = program.opts();

const input = join("..", "..", options.input);
const output = join("..", "..", options.output);

// Randomize color function
const colorFunctions = Object.values(trianglify.colorFunctions);
const colorFunction = colorFunctions[Math.floor(Math.random() * colorFunctions.length)];

// Generate a canvas using trianglify
const canvas = trianglify({
  width: 1000,
  height: 600,
  cellSize: Math.random() * 100 + 20,  // 20-120
  variance: Math.random() * 0.7 + 0.3,  // 0.3-1
  xColors: 'random',
  colorFunction: colorFunction(Math.random()),
}).toCanvas();
const ctx = canvas.getContext('2d');

// Load the icon/image
loadImage(input).then((image) => {
  // Calculate the position to center the image on the canvas
  const centerX = canvas.width / 2 - image.width / 2;
  const centerY = canvas.height / 2 - image.height / 2;

  // Draw the image in the center of the canvas
  ctx.drawImage(image, centerX, centerY);

  // Create output directory if missing
  const parent = dirname(output);
  if (!existsSync(parent)) mkdirSync(parent, { recursive: true });

  // Save the canvas to a file
  const out = createWriteStream(output);
  canvas.createPNGStream().pipe(out);

  out.on('finish', () => {
    console.log(`Image with backdrop saved to ${output}`);
  });
}).catch((error) => {
  console.error(`Error: ${error.message}`);
  console.error(`CWD: ${process.cwd()}`);
});
