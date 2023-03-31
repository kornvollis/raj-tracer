import { Matrix } from './Matrix';
import { Tuple } from './Vector';

test('Constructing and inspecting a 4x4 matrix', () => {
    /*
    | 1    | 2    | 3    | 4    |
    | 5.5  | 6.5  | 7.5  | 8.5  |
    | 9    | 10   | 11   | 12   |
    | 13.5 | 14.5 | 15.5 | 16.5 |
    */

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
    /*
    | -3 |  5 |
    | 1  | -2 |
    */

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
    /*
    | -3 |  5 |  0 |
    | 1  | -2 | -7 |
    | 0  |  1 |  1 |
    */

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

