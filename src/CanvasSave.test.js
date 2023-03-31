import { Canvas } from "./Canvas";
import { Color } from "./Vector";

test('should save to a file', () => {
    const canvas = new Canvas(100, 100);
    
    console.log(canvas.toPPM());

    for(var i = 0; i < canvas.width; i++) {
        canvas.writePixel(i, 50, new Color(255, 0, 0));
        canvas.writePixel(i, 51, new Color(255, 0, 0));
        canvas.writePixel(i, 52, new Color(255, 0, 0));
    }

    // save string to file

    const fs = require('fs');
    fs.writeFile('canvas.ppm', canvas.toPPM(), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
})
