import { Color } from './Vector.js';

export class Canvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.pixels = [];
        for (let i = 0; i < this.width * this.height; i++) {
        this.pixels.push(new Color(0, 0, 0));
        }
    }

    writePixel(x, y, color) {
        this.pixels[y * this.width + x] = color;
    }

    pixelAt(x, y) {
        return this.pixels[y * this.width + x];
    }

    toPPM() {
        let ppm = `
P3
${this.width} ${this.height}
255
`;
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const color = this.pixelAt(j, i);
                // js number can not bi bigger than 255
                let r = Math.round(color.r * 255) > 255 ? 255 : Math.round(color.r * 255);
                let g = Math.round(color.g * 255) > 255 ? 255 : Math.round(color.g * 255);
                let b = Math.round(color.b * 255) > 255 ? 255 : Math.round(color.b * 255);

                r = r < 0 ? 0 : r;
                g = g < 0 ? 0 : g;
                b = b < 0 ? 0 : b;

                ppm += `${r} ${g} ${b} `;
            }
            ppm = ppm.trim() + '\n';
        }

        return ppm;
    }
}