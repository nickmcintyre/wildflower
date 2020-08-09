/**
 * An abstract base class for Axes and NumberPlane.
 */
class CoordinateSystem {
  constructor() {

  }
}

/**
 * A class for drawing axes in two dimensions.
 */
class Axes2D extends CoordinateSystem {

}

/**
 * A class for drawing axes in three dimensions.
 */
class Axes3D extends CoordinateSystem {

}

/**
 * A class for drawing a Cartesian plane.
 */
class NumberPlane extends CoordinateSystem {

}

/**
 * A class for drawing a complex (z) plane.
 */
class ComplexPlane extends NumberPlane {

}

export {
  Axes2D,
  Axes3D,
  NumberPlane,
  ComplexPlane,
}
