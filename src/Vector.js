// create a vector class
export class Tuple {
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  get(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error('Index out of range');
    }
  }

  equals(tuple) {
    return this.x === tuple.x &&
      this.y === tuple.y &&
      this.z === tuple.z &&
      this.w === tuple.w;
  }

  add(tuple) {
    return new Tuple(
      this.x + tuple.x,
      this.y + tuple.y,
      this.z + tuple.z,
      this.w + tuple.w
    );
  }

  sub(tuple) {
    return new Tuple(
      this.x - tuple.x,
      this.y - tuple.y,
      this.z - tuple.z,
      this.w - tuple.w
    );
  }

  negate(tuple) {
    return new Tuple(
      -this.x,
      -this.y,
      -this.z,
      -this.w
    );
  }

  multiply(scalar) {
    return new Tuple(
      this.x * scalar,
      this.y * scalar,
      this.z * scalar,
      this.w * scalar
    );
  }

  divide(scalar) {
    return this.multiply(1 / scalar);
  }

  isPoint() {
    return this.w === 1;
  }

  isVector() {
    return this.w === 0;
  }
}

export class Vector3D extends Tuple {
  constructor(x, y, z) {
    super(x, y, z, 0);
  }

  magnitude() {
    return Math.sqrt(
      this.x * this.x +
      this.y * this.y +
      this.z * this.z
    );
  }

  normalize() {
    const magnitude = this.magnitude();

    return new Vector3D(
      this.x / magnitude,
      this.y / magnitude,
      this.z / magnitude
    );
  }

  dot(vector) {
    return this.x * vector.x +
      this.y * vector.y +
      this.z * vector.z +
      this.w * vector.w;
  }

  cross(vector) {
    return new Vector3D(
      this.y * vector.z - this.z * vector.y,
      this.z * vector.x - this.x * vector.z,
      this.x * vector.y - this.y * vector.x
    );
  }
}

export class Point3D extends Tuple {
  constructor(x, y, z) {
    super(x, y, z, 1);
  }
}

export class Color extends Tuple {
  constructor(r, g, b) {
    super(r, g, b, 0);
  }

  add(color) {
    return new Color(
      this.r + color.r,
      this.g + color.g,
      this.b + color.b
    );
  }

  sub(color) {
    return new Color(
      this.r - color.r,
      this.g - color.g,
      this.b - color.b
    );
  }

  multiply(scalar) {
    return new Color(
      this.r * scalar,
      this.g * scalar,
      this.b * scalar
    );
  }

  multiplyByColor(color) {
    return new Color(
      this.r * color.r,
      this.g * color.g,
      this.b * color.b
    );
  }

  get r() {
    return this.x;
  }

  get g() {
    return this.y;
  }

  get b() {
    return this.z;
  }
}


