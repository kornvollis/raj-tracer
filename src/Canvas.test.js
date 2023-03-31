import { Canvas } from "./Canvas";
import { Color } from "./Vector";

test('Creating a canvas', () => {
  const canvas = new Canvas(10, 20);

  expect(canvas.width).toBe(10);
  expect(canvas.height).toBe(20);
  // loop on all pixels
  for (let i = 0; i < canvas.width * canvas.height; i++) {
    expect(canvas.pixels[i]).toStrictEqual(new Color(0, 0, 0));
  }
})

test('Writing pixels to a canvas', () => {
  const canvas = new Canvas(10, 20);
  const red = new Color(1, 0, 0);

  canvas.writePixel(2, 3, red);

  expect(canvas.pixelAt(2, 3)).toStrictEqual(red);
})

test('Constructing the PPM header', () => {
  const canvas = new Canvas(5, 3);

  const ppm = canvas.toPPM();

  const expectedPPM = `
P3
5 3
255
`;

  expect(ppm).toMatch(expectedPPM);
})

test('Constructing the PPM pixel data', () => {
  const canvas = new Canvas(5, 3);
  const c1 = new Color(1.5, 0, 0);
  const c2 = new Color(0, 0.5, 0);
  const c3 = new Color(-0.5, 0, 1);

  canvas.writePixel(0, 0, c1);
  canvas.writePixel(2, 1, c2);
  canvas.writePixel(4, 2, c3);

  const ppm = canvas.toPPM();

  const expectedPPM = `
P3
5 3
255
255 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 128 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 255
`.trim();

  expect(ppm).toMatch(expectedPPM);
})

test('Splitting long lines in PPM files', () => {
  const canvas = new Canvas(10, 2);
  const color = new Color(1, 0.8, 0.6);

  for (let i = 0; i < canvas.width; i++) {
    for (let j = 0; j < canvas.height; j++) {
      canvas.writePixel(i, j, color);
    }
  }

  const ppm = canvas.toPPM();

  const expectedPPM = `
    P3
    10 2
    255
    255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204
    153 255 204 153 255 204 153 255 204 153 255 204 153
    255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204
    153 255 204 153 255 204 153 255 204 153 255 204 153
  `.trim();

  expect(ppm).toMatch(expectedPPM);
})