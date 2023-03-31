import { Tuple, Point3D, Vector3D, Color } from './Vector';

test('A tuple with w=1.0 is a point', () => {
  const tuple = new Tuple(4.3, -4.2, 3.1, 1.0);

  expect(tuple.x).toBe(4.3);
  expect(tuple.y).toBe(-4.2);
  expect(tuple.z).toBe(3.1);
  expect(tuple.w).toBe(1.0);

  expect(tuple.isPoint()).toBe(true);
});

test('A tuple with w=0 is a vector', () => {
  const tuple = new Tuple(4.3, -4.2, 3.1, 0.0);

  expect(tuple.x).toBe(4.3);
  expect(tuple.y).toBe(-4.2);
  expect(tuple.z).toBe(3.1);
  expect(tuple.w).toBe(0);

  expect(tuple.isVector()).toBe(true);
});

test('Point3D() creates tuples with w=1', () => {
  const tuple = new Point3D(4, -4, 3);

  expect(tuple.w).toBe(1);
});

test('Vector3D() creates tuples with w=0', () => {
  const tuple = new Vector3D(4, -4, 3);

  expect(tuple.w).toBe(0);
});

test('Adding two tuples', () => {
  const a1 = new Tuple(3, -2, 5, 1);
  const a2 = new Tuple(-2, 3, 1, 0);

  const result = a1.add(a2);

  expect(result.x).toBe(1);
  expect(result.y).toBe(1);
  expect(result.z).toBe(6);
  expect(result.w).toBe(1);
});

test('Subtracting two points', () => {
  const p1 = new Point3D(3, 2, 1);
  const p2 = new Point3D(5, 6, 7);

  const result = p1.sub(p2);

  expect(result.x).toBe(-2);
  expect(result.y).toBe(-4);
  expect(result.z).toBe(-6);
  expect(result.isVector()).toBe(true);
});

test('Subtracting a vector from a point', () => {
  const p = new Point3D(3, 2, 1);
  const v = new Vector3D(5, 6, 7);

  const result = p.sub(v);

  expect(result.x).toBe(-2);
  expect(result.y).toBe(-4);
  expect(result.z).toBe(-6);
  expect(result.isPoint()).toBe(true);
});

test('Subtracting two vectors', () => {
  const v1 = new Vector3D(3, 2, 1);
  const v2 = new Vector3D(5, 6, 7);

  const result = v1.sub(v2);

  expect(result.x).toBe(-2);
  expect(result.y).toBe(-4);
  expect(result.z).toBe(-6);
  expect(result.isVector()).toBe(true);
});

test('Subtracting a vector from the zero vector', () => {
  const zero = new Vector3D(0, 0, 0);
  const v = new Vector3D(1, -2, 3);

  const result = zero.sub(v);

  expect(result.x).toBe(-1);
  expect(result.y).toBe(2);
  expect(result.z).toBe(-3);
  expect(result.isVector()).toBe(true);
});

test('Negating a tuple', () => {
  const tuple = new Tuple(1, -2, 3, -4);

  const result = tuple.negate();

  expect(result.x).toBe(-1);
  expect(result.y).toBe(2);
  expect(result.z).toBe(-3);
  expect(result.w).toBe(4);
});

test('Multiplying a tuple by a scalar', () => {
  const tuple = new Tuple(1, -2, 3, -4);

  const result = tuple.multiply(3.5);

  expect(result.x).toBe(3.5);
  expect(result.y).toBe(-7);
  expect(result.z).toBe(10.5);
  expect(result.w).toBe(-14);
});

test('Multiplying a tuple by a fraction', () => {
  const tuple = new Tuple(1, -2, 3, -4);

  const result = tuple.multiply(0.5);

  expect(result.x).toBe(0.5);
  expect(result.y).toBe(-1);
  expect(result.z).toBe(1.5);
  expect(result.w).toBe(-2);
});

test('Dividing a tuple by a scalar', () => {
  const tuple = new Tuple(1, -2, 3, -4);

  const result = tuple.divide(2);

  expect(result.x).toBe(0.5);
  expect(result.y).toBe(-1);
  expect(result.z).toBe(1.5);
  expect(result.w).toBe(-2);
});

test('Computing the magnitude of vector(1, 0, 0)', () => {
  const v = new Vector3D(1, 0, 0);

  expect(v.magnitude()).toBe(1);
});

test('Computing the magnitude of vector(0, 1, 0)', () => {
  const v = new Vector3D(0, 1, 0);

  expect(v.magnitude()).toBe(1);
});

test('Computing the magnitude of vector(0, 0, 1)', () => {
  const v = new Vector3D(0, 0, 1);

  expect(v.magnitude()).toBe(1);
});

test('Computing the magnitude of vector(1, 2, 3)', () => {
  const v = new Vector3D(1, 2, 3);

  expect(v.magnitude()).toBe(Math.sqrt(14));
});

test('Computing the magnitude of vector(-1, -2, -3)', () => {
  const v = new Vector3D(-1, -2, -3);

  expect(v.magnitude()).toBe(Math.sqrt(14));
});

test('Normalizing vector(4, 0, 0) gives (1, 0, 0)', () => {
  const v = new Vector3D(4, 0, 0);
  const result = v.normalize();

  expect(result.x).toBe(1);
  expect(result.y).toBe(0);
  expect(result.z).toBe(0);
});

test('Normalizing vector(1, 2, 3)', () => {
  const v = new Vector3D(1, 2, 3);
  const result = v.normalize();

  expect(result.x).toBe(1 / v.magnitude());
  expect(result.y).toBe(2 / v.magnitude());
  expect(result.z).toBe(3 / v.magnitude());
});

test('The magnitude of a normalized vector', () => {
  const v = new Vector3D(1, 2, 3);
  const result = v.normalize();

  expect(result.magnitude()).toBe(1);
})

test('The dot product of two tuples', () => {
  const a = new Vector3D(1, 2, 3);
  const b = new Vector3D(2, 3, 4);

  expect(a.dot(b)).toBe(20);
});

test('The cross product of two vectors', () => {
  const a = new Vector3D(1, 2, 3);
  const b = new Vector3D(2, 3, 4);

  expect(a.cross(b)).toEqual(new Vector3D(-1, 2, -1));
  expect(b.cross(a)).toEqual(new Vector3D(1, -2, 1));
});

test('Colors are (red, green, blue) tuples', () => {
    const c = new Color(-0.5, 0.4, 1.7);

    expect(c.r).toBe(-0.5);
    expect(c.g).toBe(0.4);
    expect(c.b).toBe(1.7);
});

test('Adding colors', () => {
  const c1 = new Color(0.9, 0.6, 0.75);
  const c2 = new Color(0.7, 0.1, 0.25);

  const result = c1.add(c2);

  expect(result.r).toBe(1.6);
  expect(result.g).toBe(0.7);
  expect(result.b).toBe(1.0);
})

test('Subtracting colors', () => {
  const c1 = new Color(0.9, 0.6, 0.75);
  const c2 = new Color(0.7, 0.1, 0.25);

  const result = c1.sub(c2);

  expect(result.r).toBeCloseTo(0.2, 5);
  expect(result.g).toBeCloseTo(0.5, 5);
  expect(result.b).toBeCloseTo(0.5, 5);
})

test('Multiplying a color by a scalar', () => {
  const c = new Color(0.2, 0.3, 0.4);

  const result = c.multiply(2);

  expect(result.r).toBe(0.4);
  expect(result.g).toBe(0.6);
  expect(result.b).toBe(0.8);
})

test('Multiplying colors', () => {
  const c1 = new Color(1, 0.2, 0.4);
  const c2 = new Color(0.9, 1, 0.1);

  const result = c1.multiplyByColor(c2);

  expect(result.r).toBeCloseTo(0.9);
  expect(result.g).toBeCloseTo(0.2);
  expect(result.b).toBeCloseTo(0.04);
})
