import { Matrix } from './Matrix';
import { Tuple } from './Vector';

test('Constructing and inspecting a 4x4 matrix', () => {
    const m = new Matrix([
        [1, 2, 3, 4],
        [5.5, 6.5, 7.5, 8.5],
        [9, 10, 11, 12],
        [13.5, 14.5, 15.5, 16.5]
    ]);

    expect(m.get(0, 0)).toBe(1);
    expect(m.get(0, 3)).toBe(4);
    expect(m.get(1, 0)).toBe(5.5);
    expect(m.get(1, 2)).toBe(7.5);
    expect(m.get(2, 2)).toBe(11);
    expect(m.get(3, 0)).toBe(13.5);
    expect(m.get(3, 2)).toBe(15.5);
});

test('A 2x2 matrix ought to be representable', () => {
    const m = new Matrix([
        [-3, 5],
        [1, -2]
    ]);

    expect(m.get(0, 0)).toBe(-3);
    expect(m.get(0, 1)).toBe(5);
    expect(m.get(1, 0)).toBe(1);
    expect(m.get(1, 1)).toBe(-2);
});

test('A 3x3 matrix ought to be representable', () => {
    const m = new Matrix([
        [-3, 5, 0],
        [1, -2, -7],
        [0, 1, 1]
    ]);

    expect(m.get(0, 0)).toBe(-3);
    expect(m.get(1, 1)).toBe(-2);
    expect(m.get(2, 2)).toBe(1);
    expect(m.get(2, 0)).toBe(0);
});

test('Matrix equality with identical matrices', () => {
    const a = new Matrix([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
    ]);

    const b = new Matrix([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
    ]);

    expect(a.equals(b)).toBe(true);
});

test('Matrix equality with different matrices', () => {
    const a = new Matrix([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
    ]);

    const b = new Matrix([
        [2, 3, 4, 5],
        [6, 7, 8, 9],
        [8, 7, 6, 5],
        [4, 3, 2, 1]
    ]);

    expect(a.equals(b)).toBe(false);
});

test('Multiplying two matrices', () => {
    const a = new Matrix([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
    ]);

    const b = new Matrix([
        [-2, 1, 2, 3],
        [3, 2, 1, -1],
        [4, 3, 6, 5],
        [1, 2, 7, 8]
    ]);

    const expected = new Matrix([
        [20, 22, 50, 48],
        [44, 54, 114, 108],
        [40, 58, 110, 102],
        [16, 26, 46, 42]
    ]);

    expect(a.multiply(b).equals(expected)).toBe(true);
});

test('A matrix multiplied by a tuple', () => {
    const a = new Matrix([
        [1, 2, 3, 4],
        [2, 4, 4, 2],
        [8, 6, 4, 1],
        [0, 0, 0, 1]
    ]);

    const b = new Tuple(1, 2, 3, 1);

    expect(a.multiplyTuple(b).equals(new Tuple(18, 24, 33, 1))).toBe(true);
});

test('Multiplying a matrix by the identity matrix', () => {
    const a = new Matrix([
        [0, 1, 2, 4],
        [1, 2, 4, 8],
        [2, 4, 8, 16],
        [4, 8, 16, 32]
    ]);

    expect(a.multiply(Matrix.identity()).equals(a)).toBe(true);
});

test('Multiplying the identity matrix by a tuple', () => {
    const a = new Tuple(1, 2, 3, 4);

    expect(Matrix.identity().multiplyTuple(a).equals(a)).toBe(true);
});

test('Transposing a matrix', () => {
    const a = new Matrix([
        [0, 9, 3, 0],
        [9, 8, 0, 8],
        [1, 8, 5, 3],
        [0, 0, 5, 8]
    ]);

    const expected = new Matrix([
        [0, 9, 1, 0],
        [9, 8, 8, 0],
        [3, 0, 5, 5],
        [0, 8, 3, 8]
    ]);

    expect(a.transpose().equals(expected)).toBe(true);
});

test('Transposing the identity matrix', () => {
    expect(Matrix.identity().transpose().equals(Matrix.identity())).toBe(true);
});

test('Calculating the determinant of a 2x2 matrix', () => {
    const a = new Matrix([
        [1, 5],
        [-3, 2]
    ]);

    expect(a.determinant()).toBe(17);
})

test('A submatrix of a 3x3 matrix is a 2x2 matrix', () => {
    const a = new Matrix([
        [1, 5, 0],
        [-3, 2, 7],
        [0, 6, -3]
    ]);

    const expected = new Matrix([
        [-3, 2],
        [0, 6]
    ]);

    expect(a.submatrix(0, 2).equals(expected)).toBe(true);
});

test('A submatrix of a 4x4 matrix is a 3x3 matrix', () => {
    const a = new Matrix([
        [-6, 1, 1, 6],
        [-8, 5, 8, 6],
        [-1, 0, 8, 2],
        [-7, 1, -1, 1]
    ]);

    const expected = new Matrix([
        [-6, 1, 6],
        [-8, 8, 6],
        [-7, -1, 1]
    ]);

    expect(a.submatrix(2, 1).equals(expected)).toBe(true);
});

test('Calculating a minor of a 3x3 matrix', () => {
    const a = new Matrix([
        [3, 5, 0],
        [2, -1, -7],
        [6, -1, 5]
    ]);

    const b = a.submatrix(1, 0);

    expect(b.determinant()).toBe(25);
    expect(a.minor(1, 0)).toBe(25);
});

test('Calculating a cofactor of a 3x3 matrix', () => {
    const a = new Matrix([
        [3, 5, 0],
        [2, -1, -7],
        [6, -1, 5]
    ]);

    expect(a.minor(0, 0)).toBe(-12);
    expect(a.cofactor(0, 0)).toBe(-12);
    expect(a.minor(1, 0)).toBe(25);
    expect(a.cofactor(1, 0)).toBe(-25);
});

test('Calculating the determinant of a 3x3 matrix', () => {
    const a = new Matrix([
        [1, 2, 6],
        [-5, 8, -4],
        [2, 6, 4]
    ]);

    expect(a.cofactor(0, 0)).toBe(56);
    expect(a.cofactor(0, 1)).toBe(12);
    expect(a.cofactor(0, 2)).toBe(-46);
    expect(a.determinant()).toBe(-196);
});

test('Calculating the determinant of a 4x4 matrix', () => {
    const a = new Matrix([
        [-2, -8, 3, 5],
        [-3, 1, 7, 3],
        [1, 2, -9, 6],
        [-6, 7, 7, -9]
    ]);

    expect(a.cofactor(0, 0)).toBe(690);
    expect(a.cofactor(0, 1)).toBe(447);
    expect(a.cofactor(0, 2)).toBe(210);
    expect(a.cofactor(0, 3)).toBe(51);
    expect(a.determinant()).toBe(-4071);
})

test('Testing an invertible matrix for invertibility', () => {
    const a = new Matrix([
        [6, 4, 4, 4],
        [5, 5, 7, 6],
        [4, -9, 3, -7],
        [9, 1, 7, -6]
    ]);

    expect(a.determinant()).toBe(-2120);
    expect(a.isInvertible()).toBe(true);
});

test('Testing a non-invertible matrix for invertibility', () => {
    const a = new Matrix([
        [-4, 2, -2, -3],
        [9, 6, 2, 6],
        [0, -5, 1, -5],
        [0, 0, 0, 0]
    ]);

    expect(a.determinant()).toBe(0);
    expect(a.isInvertible()).toBe(false);
});

test('Calculating the inverse of a matrix', () => {
    const a = new Matrix([
        [-5, 2, 6, -8],
        [1, -5, 1, 8],
        [7, 7, -6, -7],
        [1, -3, 7, 4]
    ]);

    const b = a.inverse();

    expect(a.determinant()).toBe(532);
    expect(a.cofactor(2, 3)).toBe(-160);
    expect(b.get(3, 2)).toBe(-160 / 532);
    expect(a.cofactor(3, 2)).toBe(105);
    expect(b.get(2, 3)).toBe(105 / 532);
    expect(b.equals(new Matrix([
        [0.21805, 0.45113, 0.24060, -0.04511],
        [-0.80827, -1.45677, -0.44361, 0.52068],
        [-0.07895, -0.22368, -0.05263, 0.19737],
        [-0.52256, -0.81391, -0.30075, 0.30639]
    ]))).toBe(true);
});

