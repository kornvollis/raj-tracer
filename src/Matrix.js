import { Tuple } from "./Vector";

// create a matrix 4x4 class
export class Matrix {
    constructor(rows) {
      this.rows = rows;
    }
  
    get(row, column) {
      return this.rows[row][column];
    }

    equals(matrix) {
        if (this.rows.length !== matrix.rows.length) {
            return false;
        }
        for (let row = 0; row < this.rows.length; row++) {
            for (let column = 0; column < this.rows[row].length; column++) {
                if (this.get(row, column) !== matrix.get(row, column)) {
                    return false;
                }
            }
        }
        return true;
    }

    multiply(matrix) {
        const result = [];
        for (let row = 0; row < this.rows.length; row++) {
            const resultRow = [];
            for (let column = 0; column < matrix.rows[row].length; column++) {
                let sum = 0;
                for (let i = 0; i < this.rows[row].length; i++) {
                    sum += this.get(row, i) * matrix.get(i, column);
                }
                resultRow.push(sum);
            }
            result.push(resultRow);
        }
        return new Matrix(result);
    }

    multiplyTuple(tuple) {
        const result = [];
        for (let row = 0; row < this.rows.length; row++) {
            let sum = 0;
            for (let column = 0; column < this.rows[row].length; column++) {
                sum += this.get(row, column) * tuple.get(column);
            }
            result.push(sum);
        }
        return new Tuple(result[0], result[1], result[2], result[3]);
    }

    // getter by row and col
  
    // static identity() {
    //   return new Matrix([
    //     [1, 0, 0, 0],
    //     [0, 1, 0, 0],
    //     [0, 0, 1, 0],
    //     [0, 0, 0, 1]
    //   ]);
    // }
  
    // static translation(x, y, z) {
    //   return new Matrix([
    //     [1, 0, 0, x],
    //     [0, 1, 0, y],
    //     [0, 0, 1, z],
    //     [0, 0, 0, 1]
    //   ]);
    // }
  
    // static scaling(x, y, z) {
    //   return new Matrix([
    //     [x, 0, 0, 0],
    //     [0, y, 0, 0],
    //     [0, 0, z, 0],
    //     [0, 0, 0, 1]
    //   ]);
    // }
  
    // static rotationX(radians) {
    //   return new Matrix([
    //     [1, 0, 0, 0],
    //     [0, Math.cos(radians), -Math.sin(radians), 0],
    //     [0, Math.sin(radians), Math.cos(radians), 0],
    //     [0, 0, 0, 1]
    //   ]);
    // }
  
    // static rotationY(radians) {
    //   return new Matrix([
    //     [Math.cos(radians), 0, Math.sin(radians), 0],
    //     [0, 1, 0, 0],
    //     [-Math.sin(radians), 0, Math.cos(radians), 0],
    //     [0, 0, 0, 1]
    //   ]);
    // }
  
    // static rotationZ(radians) {
    //   return new Matrix([
    //     [Math.cos(radians), -Math.sin(radians), 0, 0],
    //     [Math.sin(radians), Math.cos(radians), 0, 0],
    //     [0, 0, 1, 0],
    //     [0, 0, 0, 1]
    //   ]);
    // }
  }