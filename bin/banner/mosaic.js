/**
 * Flat, top-down color mosaic background: a grid of square cells, each
 * independently colored. No 3D/isometric/perspective rendering — variation
 * in color/lightness alone is what should read as "different heights", not
 * any actual angle or depth.
 */

/**
 * @param {number} h Hue in degrees (wrapped to [0, 360))
 * @param {number} s Saturation percent
 * @param {number} l Lightness percent (clamped to [0, 100])
 * @returns {string} CSS hsl() color
 */
function hsl(h, s, l) {
  return `hsl(${((h % 360) + 360) % 360}, ${s}%, ${Math.max(0, Math.min(100, l))}%)`;
}

/** Target square cell size in px; see `gridFor` for how it's actually picked. */
const TARGET_CELL_SIZE = 60;

/**
 * @param {number} a
 * @param {number} b
 * @returns {number} Greatest common divisor of `a` and `b`
 */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Derive a square cell size (and the cols/rows needed to cover the canvas)
 * for a `width` x `height` canvas. The cell size is the largest divisor of
 * `gcd(width, height)` no bigger than `TARGET_CELL_SIZE`, so `cellSize * cols`
 * and `cellSize * rows` always equal `width`/`height` exactly — the grid
 * tiles the banner perfectly, with no partial/cropped cells at the edges.
 * @param {number} width
 * @param {number} height
 * @returns {{ cellSize: number, cols: number, rows: number }}
 */
function gridFor(width, height) {
  const commonDivisor = gcd(width, height);
  let cellSize = Math.min(commonDivisor, TARGET_CELL_SIZE);
  while (commonDivisor % cellSize !== 0) cellSize--;
  return {
    cellSize,
    cols: width / cellSize,
    rows: height / cellSize,
  };
}

/**
 * Fill one grid cell, overshooting by 1px so adjacent cells overlap slightly —
 * without this, anti-aliasing at each rect's edge leaves faint seam lines
 * between differently-colored neighbors.
 * @param {import("canvas").CanvasRenderingContext2D} ctx
 * @param {number} col
 * @param {number} row
 * @param {number} cellSize
 */
function fillCell(ctx, col, row, cellSize) {
  ctx.fillRect(col * cellSize, row * cellSize, cellSize + 1, cellSize + 1);
}

/**
 * Each cell gets a fully independent random hue jitter + lightness.
 * @param {import("canvas").CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 */
function paintRandom(ctx, width, height) {
  const baseHue = Math.random() * 360;
  const sat = 45 + Math.random() * 25;
  const { cellSize, cols, rows } = gridFor(width, height);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const hue = baseHue + (Math.random() * 50 - 25);
      const light = 25 + Math.random() * 50;
      ctx.fillStyle = hsl(hue, sat, light);
      fillCell(ctx, col, row, cellSize);
    }
  }
}

/**
 * Colors are bilinearly interpolated from a small coarse grid of random
 * control points (classic value-noise technique), so neighboring cells drift
 * gently instead of jumping — reads like a soft heightmap. Hue jitter stays
 * within a small range of `baseHue` so linear interpolation never needs to
 * handle hue wraparound.
 * @param {import("canvas").CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 */
function paintSmooth(ctx, width, height) {
  const baseHue = Math.random() * 360;
  const sat = 45 + Math.random() * 25;
  const { cellSize, cols, rows } = gridFor(width, height);

  const controlCols = 3 + Math.floor(Math.random() * 3);
  const controlRows = 2 + Math.floor(Math.random() * 3);
  const control = [];
  for (let i = 0; i <= controlRows; i++) {
    control.push([]);
    for (let j = 0; j <= controlCols; j++) {
      control[i].push({
        hue: (Math.random() - 0.5) * 60,
        light: 25 + Math.random() * 50,
      });
    }
  }

  const lerp = (a, b, t) => a + (b - a) * t;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const u = (col / (cols - 1)) * controlCols;
      const v = (row / (rows - 1)) * controlRows;
      const i0 = Math.min(Math.floor(v), controlRows - 1);
      const j0 = Math.min(Math.floor(u), controlCols - 1);
      const tu = u - j0;
      const tv = v - i0;
      const c00 = control[i0][j0];
      const c10 = control[i0][j0 + 1];
      const c01 = control[i0 + 1][j0];
      const c11 = control[i0 + 1][j0 + 1];
      const hue = lerp(
        lerp(c00.hue, c10.hue, tu),
        lerp(c01.hue, c11.hue, tu),
        tv,
      );
      const light = lerp(
        lerp(c00.light, c10.light, tu),
        lerp(c01.light, c11.light, tu),
        tv,
      );
      ctx.fillStyle = hsl(baseHue + hue, sat, light);
      fillCell(ctx, col, row, cellSize);
    }
  }
}

/**
 * Paint the mosaic background onto an existing canvas context.
 * @param {import("canvas").CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @param {"random"|"smooth"} style
 */
function paintMosaicBackground(ctx, width, height, style) {
  if (style === "smooth") {
    paintSmooth(ctx, width, height);
  } else {
    paintRandom(ctx, width, height);
  }
}

module.exports = { paintMosaicBackground };
