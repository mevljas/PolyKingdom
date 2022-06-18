(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.PolyKingdom = {})));
}(this, (function (exports) { 'use strict';

  /**
   * Common utilities
   * @module glMatrix
   */
  // Configuration Constants
  var EPSILON = 0.000001;
  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
  var degree = Math.PI / 180;
  if (!Math.hypot) Math.hypot = function () {
    var y = 0,
        i = arguments.length;

    while (i--) {
      y += arguments[i] * arguments[i];
    }

    return Math.sqrt(y);
  };

  /**
   * 3x3 Matrix
   * @module mat3
   */

  /**
   * Creates a new identity mat3
   *
   * @returns {mat3} a new 3x3 matrix
   */

  function create$2() {
    var out = new ARRAY_TYPE(9);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }

    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }
  /**
   * Multiplies two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the first operand
   * @param {ReadonlyMat3} b the second operand
   * @returns {mat3} out
   */

  function multiply$2(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    var b00 = b[0],
        b01 = b[1],
        b02 = b[2];
    var b10 = b[3],
        b11 = b[4],
        b12 = b[5];
    var b20 = b[6],
        b21 = b[7],
        b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }

  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */

  function create$3() {
    var out = new ARRAY_TYPE(16);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }

    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a new mat4 initialized with values from an existing matrix
   *
   * @param {ReadonlyMat4} a matrix to clone
   * @returns {mat4} a new 4x4 matrix
   */

  function clone$3(a) {
    var out = new ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */

  function identity$3(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Transpose the values of a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */

  function transpose$2(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
      var a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      var a12 = a[6],
          a13 = a[7];
      var a23 = a[11];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a01;
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a[0];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a[1];
      out[5] = a[5];
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a[2];
      out[9] = a[6];
      out[10] = a[10];
      out[11] = a[14];
      out[12] = a[3];
      out[13] = a[7];
      out[14] = a[11];
      out[15] = a[15];
    }

    return out;
  }
  /**
   * Inverts a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */

  function invert$3(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  /**
   * Multiplies two mat4s
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */

  function multiply$3(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15]; // Cache only the current line of the second matrix

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  /**
   * Scales the mat4 by the dimensions in the given vec3 not using vectorization
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to scale
   * @param {ReadonlyVec3} v the vec3 to scale the matrix by
   * @returns {mat4} out
   **/

  function scale$3(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Returns the translation vector component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslation,
   *  the returned vector will be the same as the translation vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive translation component
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */

  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  /**
   * Returns the scaling factor component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslationScale
   *  with a normalized Quaternion paramter, the returned vector will be
   *  the same as the scaling vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive scaling factor component
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */

  function getScaling(out, mat) {
    var m11 = mat[0];
    var m12 = mat[1];
    var m13 = mat[2];
    var m21 = mat[4];
    var m22 = mat[5];
    var m23 = mat[6];
    var m31 = mat[8];
    var m32 = mat[9];
    var m33 = mat[10];
    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);
    return out;
  }
  /**
   * Returns a quaternion representing the rotational component
   *  of a transformation matrix. If a matrix is built with
   *  fromRotationTranslation, the returned quaternion will be the
   *  same as the quaternion originally supplied.
   * @param {quat} out Quaternion to receive the rotation component
   * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {quat} out
   */

  function getRotation(out, mat) {
    var scaling = new ARRAY_TYPE(3);
    getScaling(scaling, mat);
    var is1 = 1 / scaling[0];
    var is2 = 1 / scaling[1];
    var is3 = 1 / scaling[2];
    var sm11 = mat[0] * is1;
    var sm12 = mat[1] * is2;
    var sm13 = mat[2] * is3;
    var sm21 = mat[4] * is1;
    var sm22 = mat[5] * is2;
    var sm23 = mat[6] * is3;
    var sm31 = mat[8] * is1;
    var sm32 = mat[9] * is2;
    var sm33 = mat[10] * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }

    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {ReadonlyVec3} v Translation vector
   * @param {ReadonlyVec3} s Scaling vector
   * @returns {mat4} out
   */

  function fromRotationTranslationScale(out, q, v, s) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Generates a perspective projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
   * which matches WebGL/OpenGL's clip volume.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */

  function perspectiveNO(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;

    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }

    return out;
  }
  /**
   * Alias for {@link mat4.perspectiveNO}
   * @function
   */

  var perspective = perspectiveNO;
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis.
   * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {ReadonlyVec3} eye Position of the viewer
   * @param {ReadonlyVec3} center Point the viewer is looking at
   * @param {ReadonlyVec3} up vec3 pointing up
   * @returns {mat4} out
   */

  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];

    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
      return identity$3(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);

    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.hypot(y0, y1, y2);

    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }
  /**
   * Alias for {@link mat4.multiply}
   * @function
   */

  var mul$3 = multiply$3;

  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */

  function create$4() {
    var out = new ARRAY_TYPE(3);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec3 initialized with values from an existing vector
   *
   * @param {ReadonlyVec3} a vector to clone
   * @returns {vec3} a new 3D vector
   */

  function clone$4(a) {
    var out = new ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  /**
   * Calculates the length of a vec3
   *
   * @param {ReadonlyVec3} a vector to calculate length of
   * @returns {Number} length of a
   */

  function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return Math.hypot(x, y, z);
  }
  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */

  function fromValues$4(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Set the components of a vec3 to the given values
   *
   * @param {vec3} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} out
   */

  function set$4(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Adds two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */

  function add$4(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  /**
   * Subtracts vector b from vector a
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */

  function subtract$4(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  /**
   * Scales a vec3 by a scalar number
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec3} out
   */

  function scale$4(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  /**
   * Adds two vec3's after scaling the second operand by a scalar value
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec3} out
   */

  function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec3's
   *
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {Number} distance between a and b
   */

  function distance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return Math.hypot(x, y, z);
  }
  /**
   * Negates the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to negate
   * @returns {vec3} out
   */

  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }
  /**
   * Normalize a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to normalize
   * @returns {vec3} out
   */

  function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len = x * x + y * y + z * z;

    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }

    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec3's
   *
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {Number} dot product of a and b
   */

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  /**
   * Computes the cross product of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */

  function cross(out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    var bx = b[0],
        by = b[1],
        bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  /**
   * Transforms the vec3 with a mat4.
   * 4th vector component is implicitly '1'
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the vector to transform
   * @param {ReadonlyMat4} m matrix to transform with
   * @returns {vec3} out
   */

  function transformMat4(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  /**
   * Transforms the vec3 with a quat
   * Can also be used for dual quaternions. (Multiply it with the real part)
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the vector to transform
   * @param {ReadonlyQuat} q quaternion to transform with
   * @returns {vec3} out
   */

  function transformQuat(out, a, q) {
    // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3];
    var x = a[0],
        y = a[1],
        z = a[2]; // var qvec = [qx, qy, qz];
    // var uv = vec3.cross([], qvec, a);

    var uvx = qy * z - qz * y,
        uvy = qz * x - qx * z,
        uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

    var uuvx = qy * uvz - qz * uvy,
        uuvy = qz * uvx - qx * uvz,
        uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

    var w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2; // vec3.scale(uuv, uuv, 2);

    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  /**
   * Rotate a 3D vector around the x-axis
   * @param {vec3} out The receiving vec3
   * @param {ReadonlyVec3} a The vec3 point to rotate
   * @param {ReadonlyVec3} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec3} out
   */

  function rotateX$1(out, a, b, rad) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[0];
    r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
    r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Rotate a 3D vector around the y-axis
   * @param {vec3} out The receiving vec3
   * @param {ReadonlyVec3} a The vec3 point to rotate
   * @param {ReadonlyVec3} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec3} out
   */

  function rotateY$1(out, a, b, rad) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Alias for {@link vec3.subtract}
   * @function
   */

  var sub$4 = subtract$4;
  /**
   * Alias for {@link vec3.length}
   * @function
   */

  var len = length;
  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach = function () {
    var vec = create$4();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 3;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }

      return a;
    };
  }();

  /**
   * 4 Dimensional Vector
   * @module vec4
   */

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */

  function create$5() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec4 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} a new 4D vector
   */

  function fromValues$5(x, y, z, w) {
    var out = new ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  /**
   * Normalize a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to normalize
   * @returns {vec4} out
   */

  function normalize$1(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    var len = x * x + y * y + z * z + w * w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }

    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
    return out;
  }
  /**
   * Perform some operation over an array of vec4s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach$1 = function () {
    var vec = create$5();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 4;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }

      return a;
    };
  }();

  /**
   * Quaternion
   * @module quat
   */

  /**
   * Creates a new identity quat
   *
   * @returns {quat} a new quaternion
   */

  function create$6() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    out[3] = 1;
    return out;
  }
  /**
   * Sets a quat from the given angle and rotation axis,
   * then returns it.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyVec3} axis the axis around which to rotate
   * @param {Number} rad the angle in radians
   * @returns {quat} out
   **/

  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */

  function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    var omega, cosom, sinom, scale0, scale1; // calc cosine

    cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    } // calculate coefficients


    if (1.0 - cosom > EPSILON) {
      // standard case (slerp)
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    } // calculate final values


    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  /**
   * Creates a quaternion from the given 3x3 rotation matrix.
   *
   * NOTE: The resultant quaternion is not normalized, so you should be sure
   * to renormalize the quaternion yourself where necessary.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyMat3} m rotation matrix
   * @returns {quat} out
   * @function
   */

  function fromMat3(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if (fTrace > 0.0) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1.0); // 2w

      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot; // 1/(4w)

      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      // |w| <= 1/2
      var i = 0;
      if (m[4] > m[0]) i = 1;
      if (m[8] > m[i * 3 + i]) i = 2;
      var j = (i + 1) % 3;
      var k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
  }
  /**
   * Creates a new quat initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} a new quaternion
   * @function
   */

  var fromValues$6 = fromValues$5;
  /**
   * Normalize a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quaternion to normalize
   * @returns {quat} out
   * @function
   */

  var normalize$2 = normalize$1;
  /**
   * Sets a quaternion to represent the shortest rotation from one
   * vector to another.
   *
   * Both vectors are assumed to be unit length.
   *
   * @param {quat} out the receiving quaternion.
   * @param {ReadonlyVec3} a the initial vector
   * @param {ReadonlyVec3} b the destination vector
   * @returns {quat} out
   */

  var rotationTo = function () {
    var tmpvec3 = create$4();
    var xUnitVec3 = fromValues$4(1, 0, 0);
    var yUnitVec3 = fromValues$4(0, 1, 0);
    return function (out, a, b) {
      var dot$$1 = dot(a, b);

      if (dot$$1 < -0.999999) {
        cross(tmpvec3, xUnitVec3, a);
        if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
        normalize(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot$$1 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot$$1;
        return normalize$2(out, out);
      }
    };
  }();
  /**
   * Performs a spherical linear interpolation with two control points
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @param {ReadonlyQuat} c the third operand
   * @param {ReadonlyQuat} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */

  var sqlerp = function () {
    var temp1 = create$6();
    var temp2 = create$6();
    return function (out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  }();
  /**
   * Sets the specified quaternion with values corresponding to the given
   * axes. Each axis is a vec3 and is expected to be unit length and
   * perpendicular to all other specified axes.
   *
   * @param {ReadonlyVec3} view  the vector representing the viewing direction
   * @param {ReadonlyVec3} right the vector representing the local "right" direction
   * @param {ReadonlyVec3} up    the vector representing the local "up" direction
   * @returns {quat} out
   */

  var setAxes = function () {
    var matr = create$2();
    return function (out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize$2(out, fromMat3(out, matr));
    };
  }();

  /**
   * 2 Dimensional Vector
   * @module vec2
   */

  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */

  function create$8() {
    var out = new ARRAY_TYPE(2);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }

    return out;
  }
  /**
   * Perform some operation over an array of vec2s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach$2 = function () {
    var vec = create$8();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 2;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
      }

      return a;
    };
  }();

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var axios_min = createCommonjsModule(function (module, exports) {
  /* axios v0.18.0 | (c) 2018 by Matt Zabriskie */
  !function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1);},function(e,t,n){function r(e){var t=new s(e),n=i(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(2),i=n(3),s=n(5),u=n(6),a=r(u);a.Axios=s,a.create=function(e){return r(o.merge(u,e))},a.Cancel=n(23),a.CancelToken=n(24),a.isCancel=n(20),a.all=function(e){return Promise.all(e)},a.spread=n(25),e.exports=a,e.exports.default=a;},function(e,t,n){function r(e){return "[object Array]"===R.call(e)}function o(e){return "[object ArrayBuffer]"===R.call(e)}function i(e){return "undefined"!=typeof FormData&&e instanceof FormData}function s(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function u(e){return "string"==typeof e}function a(e){return "number"==typeof e}function c(e){return "undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function p(e){return "[object Date]"===R.call(e)}function d(e){return "[object File]"===R.call(e)}function l(e){return "[object Blob]"===R.call(e)}function h(e){return "[object Function]"===R.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return "undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function w(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function g(){return ("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function v(e,t){if(null!==e&&"undefined"!=typeof e)if("object"!=typeof e&&(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e);}function x(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=x(t[n],e):t[n]=e;}for(var t={},n=0,r=arguments.length;n<r;n++)v(arguments[n],e);return t}function b(e,t,n){return v(t,function(t,r){n&&"function"==typeof t?e[r]=E(t,n):e[r]=t;}),e}var E=n(3),C=n(4),R=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:C,isFormData:i,isArrayBufferView:s,isString:u,isNumber:a,isObject:f,isUndefined:c,isDate:p,isFile:d,isBlob:l,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:g,forEach:v,merge:x,extend:b,trim:w};},function(e,t){e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}};},function(e,t){function n(e){return !!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return "function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}/*!
  	 * Determine if an object is a Buffer
  	 *
  	 * @author   Feross Aboukhadijeh <https://feross.org>
  	 * @license  MIT
  	 */
  e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)};},function(e,t,n){function r(e){this.defaults=e,this.interceptors={request:new s,response:new s};}var o=n(6),i=n(2),s=n(17),u=n(18);r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,{method:"get"},this.defaults,e),e.method=e.method.toLowerCase();var t=[u,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected);}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected);});t.length;)n=n.then(t.shift(),t.shift());return n},i.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))};}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))};}),e.exports=r;},function(e,t,n){function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t);}function o(){var e;return "undefined"!=typeof XMLHttpRequest?e=n(8):"undefined"!=typeof process&&(e=n(8)),e}var i=n(2),s=n(7),u={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:o(),transformRequest:[function(e,t){return s(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e);}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){a.headers[e]={};}),i.forEach(["post","put","patch"],function(e){a.headers[e]=i.merge(u);}),e.exports=a;},function(e,t,n){var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r]);});};},function(e,t,n){var r=n(2),o=n(9),i=n(12),s=n(13),u=n(14),a=n(10),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(15);e.exports=function(e){return new Promise(function(t,f){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in l||u(e.url)||(l=new window.XDomainRequest,h="onload",m=!0,l.onprogress=function(){},l.ontimeout=function(){}),e.auth){var y=e.auth.username||"",w=e.auth.password||"";d.Authorization="Basic "+c(y+":"+w);}if(l.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l[h]=function(){if(l&&(4===l.readyState||m)&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in l?s(l.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?l.response:l.responseText,i={data:r,status:1223===l.status?204:l.status,statusText:1223===l.status?"No Content":l.statusText,headers:n,config:e,request:l};o(t,f,i),l=null;}},l.onerror=function(){f(a("Network Error",e,null,l)),l=null;},l.ontimeout=function(){f(a("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",l)),l=null;},r.isStandardBrowserEnv()){var g=n(16),v=(e.withCredentials||u(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;v&&(d[e.xsrfHeaderName]=v);}if("setRequestHeader"in l&&r.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e);}),e.withCredentials&&(l.withCredentials=!0),e.responseType)try{l.responseType=e.responseType;}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),f(e),l=null);}),void 0===p&&(p=null),l.send(p);})};},function(e,t,n){var r=n(10);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n);};},function(e,t,n){var r=n(11);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)};},function(e,t){e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e};},function(e,t,n){function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)?t+="[]":e=[e],o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e));}));}),i=s.join("&");}return i&&(e+=(e.indexOf("?")===-1?"?":"&")+i),e};},function(e,t,n){var r=n(2),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;"set-cookie"===t?s[t]=(s[t]?s[t]:[]).concat([n]):s[t]=s[t]?s[t]+", "+n:n;}}),s):s};},function(e,t,n){var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return !0}}();},function(e,t){function n(){this.message="String contains an invalid character";}function r(e){for(var t,r,i=String(e),s="",u=0,a=o;i.charAt(0|u)||(a="=",u%1);s+=a.charAt(63&t>>8-u%1*8)){if(r=i.charCodeAt(u+=.75),r>255)throw new n;t=t<<8|r;}return s}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",e.exports=r;},function(e,t,n){var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return {write:function(e,t,n,o,i,s){var u=[];u.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&u.push("expires="+new Date(n).toGMTString()),r.isString(o)&&u.push("path="+o),r.isString(i)&&u.push("domain="+i),s===!0&&u.push("secure"),document.cookie=u.join("; ");},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5);}}}():function(){return {write:function(){},read:function(){return null},remove:function(){}}}();},function(e,t,n){function r(){this.handlers=[];}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null);},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t);});},e.exports=r;},function(e,t,n){function r(e){e.cancelToken&&e.cancelToken.throwIfRequested();}var o=n(2),i=n(19),s=n(20),u=n(6),a=n(21),c=n(22);e.exports=function(e){r(e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t];});var t=e.adapter||u.adapter;return t(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})};},function(e,t,n){var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t);}),e};},function(e,t){e.exports=function(e){return !(!e||!e.__CANCEL__)};},function(e,t){e.exports=function(e){return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)};},function(e,t){e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e};},function(e,t){function n(e){this.message=e;}n.prototype.toString=function(){return "Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n;},function(e,t,n){function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e;});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason));});}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t;});return {token:t,cancel:e}},e.exports=r;},function(e,t){e.exports=function(e){return function(t){return e.apply(null,t)}};}])});
  });
  var axios_min_1 = axios_min.axios;

  class gltfWebGl
  {
      constructor()
      {
          this.context = undefined;
      }

      loadWebGlExtensions(webglExtensions)
      {
          for (let extension of webglExtensions)
          {
              if (WebGl.context.getExtension(extension) === null)
              {
                  console.warn("Extension " + extension + " not supported!");
              }
          }

          let EXT_texture_filter_anisotropic = WebGl.context.getExtension("EXT_texture_filter_anisotropic");

          if (EXT_texture_filter_anisotropic)
          {
              WebGl.context.anisotropy = EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT;
              WebGl.context.maxAnisotropy = WebGl.context.getParameter(EXT_texture_filter_anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
              WebGl.context.supports_EXT_texture_filter_anisotropic = true;
          }
          else
          {
              WebGl.context.supports_EXT_texture_filter_anisotropic = false;
          }
      }

      setTexture(loc, gltf, textureInfo, texSlot)
      {
          if (loc === -1)
          {
              console.warn("Tried to access unknown uniform");
              return false;
          }

          let gltfTex = gltf.textures[textureInfo.index];

          if (gltfTex === undefined)
          {
              console.warn("Texture is undefined: " + textureInfo.index);
              return false;
          }

          if (gltfTex.glTexture === undefined)
          {
              gltfTex.glTexture = WebGl.context.createTexture();
          }

          WebGl.context.activeTexture(WebGl.context.TEXTURE0 + texSlot);
          WebGl.context.bindTexture(gltfTex.type, gltfTex.glTexture);

          WebGl.context.uniform1i(loc, texSlot);

          if (!gltfTex.initialized)
          {
              const gltfSampler = gltf.samplers[gltfTex.sampler];

              if (gltfSampler === undefined)
              {
                  console.warn("Sampler is undefined for texture: " + textureInfo.index);
                  return false;
              }

              WebGl.context.pixelStorei(WebGl.context.UNPACK_FLIP_Y_WEBGL, false);

              let images = [];

              if (gltfTex.source.length !== undefined)
              {
                  // assume we have an array of textures (this is an unofficial extension to what glTF json can represent)
                  images = gltfTex.source;
              }
              else
              {
                  images = [gltfTex.source];
              }

              let generateMips = true;

              for (const src of images)
              {
                  const image = gltf.images[src];

                  if (image === undefined)
                  {
                      console.warn("Image is undefined for texture: " + gltfTex.source);
                      return false;
                  }

                  if (image.image.dataRGBE !== undefined)
                  {
                      WebGl.context.texImage2D(image.type, image.miplevel, WebGl.context.RGB, image.image.width, image.image.height, 0, WebGl.context.RGB, WebGl.context.FLOAT, image.image.dataFloat);
                  }
                  else
                  {
                      WebGl.context.texImage2D(image.type, image.miplevel, WebGl.context.RGBA, WebGl.context.RGBA, WebGl.context.UNSIGNED_BYTE, image.image);
                  }

                  generateMips = image.shouldGenerateMips();
              }

              this.setSampler(gltfSampler, gltfTex.type, generateMips);

              if (textureInfo.generateMips && generateMips)
              {
                  // Until this point, images can be assumed to be power of two.
                  switch (gltfSampler.minFilter)
                  {
                  case WebGl.context.NEAREST_MIPMAP_NEAREST:
                  case WebGl.context.NEAREST_MIPMAP_LINEAR:
                  case WebGl.context.LINEAR_MIPMAP_NEAREST:
                  case WebGl.context.LINEAR_MIPMAP_LINEAR:
                      WebGl.context.generateMipmap(gltfTex.type);
                      break;
                  default:
                      break;
                  }
              }

              gltfTex.initialized = true;
          }

          return gltfTex.initialized;
      }

      setIndices(gltf, accessorIndex)
      {
          let gltfAccessor = gltf.accessors[accessorIndex];

          if (gltfAccessor.glBuffer === undefined)
          {
              gltfAccessor.glBuffer = WebGl.context.createBuffer();

              let data = gltfAccessor.getTypedView(gltf);

              if (data === undefined)
              {
                  return false;
              }

              WebGl.context.bindBuffer(WebGl.context.ELEMENT_ARRAY_BUFFER, gltfAccessor.glBuffer);
              WebGl.context.bufferData(WebGl.context.ELEMENT_ARRAY_BUFFER, data, WebGl.context.STATIC_DRAW);
          }
          else
          {
              WebGl.context.bindBuffer(WebGl.context.ELEMENT_ARRAY_BUFFER, gltfAccessor.glBuffer);
          }

          return true;
      }

      enableAttribute(gltf, attributeLocation, gltfAccessor)
      {
          if (attributeLocation === -1)
          {
              console.warn("Tried to access unknown attribute");
              return false;
          }

          let gltfBufferView = gltf.bufferViews[gltfAccessor.bufferView];

          if (gltfAccessor.glBuffer === undefined)
          {
              gltfAccessor.glBuffer = WebGl.context.createBuffer();

              let data = gltfAccessor.getTypedView(gltf);

              if (data === undefined)
              {
                  return false;
              }

              WebGl.context.bindBuffer(WebGl.context.ARRAY_BUFFER, gltfAccessor.glBuffer);
              WebGl.context.bufferData(WebGl.context.ARRAY_BUFFER, data, WebGl.context.STATIC_DRAW);
          }
          else
          {
              WebGl.context.bindBuffer(WebGl.context.ARRAY_BUFFER, gltfAccessor.glBuffer);
          }

          WebGl.context.vertexAttribPointer(attributeLocation, gltfAccessor.getComponentCount(), gltfAccessor.componentType,
              gltfAccessor.normalized, gltfBufferView.byteStride, 0);
          WebGl.context.enableVertexAttribArray(attributeLocation);

          return true;
      }

      compileShader(shaderIdentifier, isVert, shaderSource)
      {
          const shader = WebGl.context.createShader(isVert ? WebGl.context.VERTEX_SHADER : WebGl.context.FRAGMENT_SHADER);
          WebGl.context.shaderSource(shader, shaderSource);
          WebGl.context.compileShader(shader);
          const compiled = WebGl.context.getShaderParameter(shader, WebGl.context.COMPILE_STATUS);

          if (!compiled)
          {
              // output surrounding source code
              let info = "";
              const messages = WebGl.context.getShaderInfoLog(shader).split("\n");
              for(const message of messages)
              {
                  info += message + "\n";
                  const matches = message.match(/(?:(?:WARNING)|(?:ERROR)): [0-9]*:([0-9]*).*/i);
                  if (matches && matches.length > 1)
                  {
                      const lineNumber = parseInt(matches[1]) - 1;
                      const lines = shaderSource.split("\n");

                      for(let i = Math.max(0, lineNumber - 2); i < Math.min(lines.length, lineNumber + 3); i++)
                      {
                          if (lineNumber === i)
                          {
                              info += "->";
                          }
                          info += "\t" + lines[i] + "\n";
                      }
                  }
              }

              throw new Error("Could not compile WebGL program '" + shaderIdentifier + "'. \n\n" + info);
          }

          return shader;
      }

      linkProgram(vertex, fragment)
      {
          let program = WebGl.context.createProgram();
          WebGl.context.attachShader(program, vertex);
          WebGl.context.attachShader(program, fragment);
          WebGl.context.linkProgram(program);

          if (!WebGl.context.getProgramParameter(program, WebGl.context.LINK_STATUS))
          {
              var info = WebGl.context.getProgramInfoLog(program);
              throw new Error('Could not link WebGL program. \n\n' + info);
          }

          return program;
      }

      //https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
      setSampler(gltfSamplerObj, type, generateMipmaps) // TEXTURE_2D
      {
          if (generateMipmaps)
          {
              WebGl.context.texParameteri(type, WebGl.context.TEXTURE_WRAP_S, gltfSamplerObj.wrapS);
              WebGl.context.texParameteri(type, WebGl.context.TEXTURE_WRAP_T, gltfSamplerObj.wrapT);
          }
          else
          {
              WebGl.context.texParameteri(type, WebGl.context.TEXTURE_WRAP_S, WebGl.context.CLAMP_TO_EDGE);
              WebGl.context.texParameteri(type, WebGl.context.TEXTURE_WRAP_T, WebGl.context.CLAMP_TO_EDGE);
          }

          // If not mip-mapped, force to non-mip-mapped sampler.
          if (!generateMipmaps && (gltfSamplerObj.minFilter != WebGl.context.NEAREST) && (gltfSamplerObj.minFilter != WebGl.context.LINEAR))
          {
              if ((gltfSamplerObj.minFilter == WebGl.context.NEAREST_MIPMAP_NEAREST) || (gltfSamplerObj.minFilter == WebGl.context.NEAREST_MIPMAP_LINEAR))
              {
                  WebGl.context.texParameteri(type, WebGl.context.TEXTURE_MIN_FILTER, WebGl.context.NEAREST);
              }
              else
              {
                  WebGl.context.texParameteri(type, WebGl.context.TEXTURE_MIN_FILTER, WebGl.context.LINEAR);
              }
          }
          else
          {
              WebGl.context.texParameteri(type, WebGl.context.TEXTURE_MIN_FILTER, gltfSamplerObj.minFilter);
          }
          WebGl.context.texParameteri(type, WebGl.context.TEXTURE_MAG_FILTER, gltfSamplerObj.magFilter);

          if (WebGl.context.supports_EXT_texture_filter_anisotropic)
          {
              WebGl.context.texParameterf(type, WebGl.context.anisotropy, WebGl.context.maxAnisotropy); // => 16xAF
          }
      }
  }

  const WebGl = new gltfWebGl();

  function jsToGl(array)
  {
      let tensor = new ARRAY_TYPE(array.length);

      for (let i = 0; i < array.length; ++i)
      {
          tensor[i] = array[i];
      }

      return tensor;
  }

  function jsToGlSlice(array, offset, stride)
  {
      let tensor = new ARRAY_TYPE(stride);

      for (let i = 0; i < stride; ++i)
      {
          tensor[i] = array[offset + i];
      }

      return tensor;
  }

  function initGlForMembers(gltfObj, gltf)
  {
      for (const name of Object.keys(gltfObj))
      {
          const member = gltfObj[name];

          if (member === undefined)
          {
              continue;
          }
          if (member.initGl !== undefined)
          {
              member.initGl(gltf);
          }
          if (Array.isArray(member))
          {
              for (const element of member)
              {
                  if (element !== undefined && element.initGl !== undefined)
                  {
                      element.initGl(gltf);
                  }
              }
          }
      }
  }

  function objectsFromJsons(jsonObjects, GltfType)
  {
      if (jsonObjects === undefined)
      {
          return [];
      }

      const objects = [];
      for (const jsonObject of jsonObjects)
      {
          objects.push(objectFromJson(jsonObject, GltfType));
      }
      return objects;
  }

  function objectFromJson(jsonObject, GltfType)
  {
      const object = new GltfType();
      object.fromJson(jsonObject);
      return object;
  }

  function fromKeys(target, jsonObj, ignore = [])
  {
      for(let k of Object.keys(target))
      {
          if (ignore && ignore.find(function(elem){return elem == k;}) !== undefined)
          {
              continue; // skip
          }
          if (jsonObj[k] !== undefined)
          {
              target[k] = jsonObj[k];
          }
      }
  }

  function stringHash(str$$1, seed = 0)
  {
      for(var i = 0; i < str$$1.length; ++i)
      {
          seed = Math.imul(31, seed) + str$$1.charCodeAt(i) | 0;
      }

      return seed;
  }

  function combineHashes(hash1, hash2)
  {
      return hash1 ^ (hash1 + 0x9e3779b9 + (hash2 << 6) + (hash2 >> 2));
  }

  function clamp(number, min$$1, max$$1)
  {
      return Math.min(Math.max(number, min$$1), max$$1);
  }

  function getFileName(filePath)
  {
      const split = filePath.split("/");
      return split[split.length - 1];
  }

  function getFileNameWithoutExtension(filePath)
  {
      const filename = getFileName(filePath);
      const index = filename.lastIndexOf(".");
      return filename.slice(0, index);
  }

  function getContainingFolder(filePath)
  {
      return filePath.substring(0, filePath.lastIndexOf("/") + 1);
  }

  function combinePaths()
  {
      const parts = Array.from(arguments);
      return parts.join("/");
  }

  // marker interface used to for parsing the uniforms
  class UniformStruct { }

  class AnimationTimer
  {
      constructor()
      {
          this.startTime = 0;
          this.paused = true;
          this.fixedTime = null;
          this.pausedTime = 0;
      }

      elapsedSec()
      {
          if(this.paused)
          {
              return this.pausedTime / 1000;
          }
          else
          {
              return this.fixedTime || (new Date().getTime() - this.startTime) / 1000;
          }
      }

      toggle()
      {
          if(this.paused)
          {
              this.unpause();
          }
          else
          {
              this.pause();
          }
      }

      start()
      {
          this.startTime = new Date().getTime();
          this.paused = false;
      }

      pause()
      {
          this.pausedTime = new Date().getTime() - this.startTime;
          this.paused = true;
      }

      unpause()
      {
          this.startTime += new Date().getTime() - this.startTime - this.pausedTime;
          this.paused = false;
      }

      reset()
      {
          if(!this.paused) {
              // Animation is running.
              this.startTime = new Date().getTime();
          }
          else {
              this.startTime = 0;
          }
          this.pausedTime = 0;
      }

      setFixedTime(timeInSec)
      {
          this.paused = false;
          this.fixedTime = timeInSec;
      }
  }

  // base class for all gltf objects
  class GltfObject
  {
      constructor()
      {
          this.extensions = undefined;
          this.extras = undefined;
      }

      fromJson(json)
      {
          fromKeys(this, json);
      }

      initGl(gltf)
      {
          initGlForMembers(this, gltf);
      }
  }

  class gltfAccessor extends GltfObject
  {
      constructor()
      {
          super();
          this.bufferView = undefined;
          this.byteOffset = 0;
          this.componentType = undefined;
          this.normalized = false;
          this.count = undefined;
          this.type = undefined;
          this.max = undefined;
          this.min = undefined;
          this.sparse = undefined; // CURRENTLY UNSUPPORTED
          this.name = undefined;

          // non gltf
          this.glBuffer = undefined;
          this.typedView = undefined;
      }

      getTypedView(gltf)
      {
          if (this.typedView !== undefined)
          {
              return this.typedView;
          }

          if (this.bufferView !== undefined)
          {
              const bufferView = gltf.bufferViews[this.bufferView];
              const buffer = gltf.buffers[bufferView.buffer];
              const byteOffset = this.byteOffset + bufferView.byteOffset;

              const componentSize = this.getComponentSize();
              let componentCount = this.getComponentCount();

              if(bufferView.byteStride !== 0)
              {
                  componentCount = bufferView.byteStride / componentSize;
              }

              const arrayLength = this.count * componentCount;

              switch (this.componentType)
              {
              case WebGl.context.BYTE:
                  this.typedView = new Int8Array(buffer.buffer, byteOffset, arrayLength);
                  break;
              case WebGl.context.UNSIGNED_BYTE:
                  this.typedView = new Uint8Array(buffer.buffer, byteOffset, arrayLength);
                  break;
              case WebGl.context.SHORT:
                  this.typedView = new Int16Array(buffer.buffer, byteOffset, arrayLength);
                  break;
              case WebGl.context.UNSIGNED_SHORT:
                  this.typedView = new Uint16Array(buffer.buffer, byteOffset, arrayLength);
                  break;
              case WebGl.context.UNSIGNED_INT:
                  this.typedView = new Uint32Array(buffer.buffer, byteOffset, arrayLength);
                  break;
              case WebGl.context.FLOAT:
                  this.typedView = new Float32Array(buffer.buffer, byteOffset, arrayLength);
                  break;
              }
          }

          if (this.typedView === undefined)
          {
              console.warn("Failed to convert buffer view to typed view!: " + this.bufferView);
          }

          return this.typedView;
      }

      getDeinterlacedView(gltf)
      {
          if (this.filteredView !== undefined)
          {
              return this.filteredView;
          }

          if (this.bufferView !== undefined)
          {
              const bufferView = gltf.bufferViews[this.bufferView];
              const buffer = gltf.buffers[bufferView.buffer];
              const byteOffset = this.byteOffset + bufferView.byteOffset;

              const componentSize = this.getComponentSize();
              const componentCount = this.getComponentCount();
              const arrayLength = this.count * componentCount;

              let stride = bufferView.byteStride !== 0 ? bufferView.byteStride : componentCount * componentSize;
              let dv = new DataView(buffer.buffer, byteOffset, this.count * stride);

              let func = 'getFloat32';
              switch (this.componentType)
              {
              case WebGl.context.BYTE:
                  this.filteredView = new Int8Array(arrayLength);
                  func = 'getInt8';
                  break;
              case WebGl.context.UNSIGNED_BYTE:
                  this.filteredView = new Uint8Array(arrayLength);
                  func = 'getUint8';
                  break;
              case WebGl.context.SHORT:
                  this.filteredView = new Int16Array(arrayLength);
                  func = 'getInt16';
                  break;
              case WebGl.context.UNSIGNED_SHORT:
                  this.filteredView = new Uint16Array(arrayLength);
                  func = 'getUint16';
                  break;
              case WebGl.context.UNSIGNED_INT:
                  this.filteredView = new Uint32Array(arrayLength);
                  func = 'getUint32';
                  break;
              case WebGl.context.FLOAT:
                  this.filteredView = new Float32Array(arrayLength);
                  func = 'getFloat32';
                  break;
              }

              for(let i = 0; i < arrayLength; ++i)
              {
                  let offset = Math.floor(i/componentCount) * stride + (i % componentCount) * componentSize;
                  this.filteredView[i] = dv[func](offset, true);
              }
          }

          return this.filteredView;
      }

      getComponentCount()
      {
          return CompononentCount.get(this.type);
      }

      getComponentSize()
      {
          switch (this.componentType)
          {
          case WebGl.context.BYTE:
          case WebGl.context.UNSIGNED_BYTE:
              return 1;
          case WebGl.context.SHORT:
          case WebGl.context.UNSIGNED_SHORT:
              return 2;
          case WebGl.context.UNSIGNED_INT:
          case WebGl.context.FLOAT:
              return 4;
          default:
              return 0;
          }
      }

      destroy()
      {
          if (this.glBuffer !== undefined)
          {
              WebGl.context.deleteBuffer(this.glBuffer);
          }

          this.glBuffer = undefined;
      }
  }

  const CompononentCount = new Map(
      [
          ["SCALAR", 1],
          ["VEC2", 2],
          ["VEC3", 3],
          ["VEC4", 4],
          ["MAT2", 4],
          ["MAT3", 9],
          ["MAT4", 16]
      ]
  );

  class gltfBuffer extends GltfObject
  {
      constructor()
      {
          super();
          this.uri = undefined;
          this.byteLength = undefined;
          this.name = undefined;

          // non gltf
          this.buffer = undefined; // raw data blob
      }

      load(gltf, additionalFiles = undefined)
      {
          if (this.buffer !== undefined)
          {
              console.error("buffer has already been loaded");
              return;
          }

          const self = this;
          return new Promise(function(resolve)
          {
              if (!self.setBufferFromFiles(additionalFiles, resolve) &&
                  !self.sefBufferFromUri(gltf, resolve))
              {
                  console.error("Was not able to resolve buffer with uri '%s'", self.uri);
                  resolve();
              }
          });
      }

      sefBufferFromUri(gltf, callback)
      {
          if (this.uri === undefined)
          {
              return false;
          }

          const self = this;
          axios_min.get(getContainingFolder(gltf.path) + this.uri, { responseType: 'arraybuffer'})
              .then(function(response)
              {
                  self.buffer = response.data;
                  callback();
              });
          return true;
      }

      setBufferFromFiles(files, callback)
      {
          if (this.uri === undefined || files === undefined)
          {
              return false;
          }

          const foundFile = files.find(function(file)
          {
              if (file.name === this.uri || file.fullPath === this.uri)
              {
                  return true;
              }
          }, this);

          if (foundFile === undefined)
          {
              return false;
          }

          const self = this;
          const reader = new FileReader();
          reader.onloadend = function(event)
          {
              self.buffer = event.target.result;
              callback();
          };
          reader.readAsArrayBuffer(foundFile);

          return true;
      }
  }

  class gltfBufferView extends GltfObject
  {
      constructor()
      {
          super();
          this.buffer = undefined;
          this.byteOffset = 0;
          this.byteLength = undefined;
          this.byteStride = 0;
          this.target = undefined;
          this.name = undefined;
      }
  }

  class gltfCamera extends GltfObject
  {
      constructor(
          type = "perspective",
          znear = 0.01,
          zfar = 10000.0,
          yfov = 45.0 * Math.PI / 180.0,
          aspectRatio = 16.0 / 9.0,
          xmag = 1.0,
          ymag = 1.0,
          name = undefined,
          nodeIndex = undefined)
      {
          super();
          this.type = type;
          this.znear = znear;
          this.zfar = zfar;
          this.yfov = yfov; // radians
          this.xmag = xmag;
          this.ymag = ymag;
          this.aspectRatio = aspectRatio;
          this.name = name;
          this.node = nodeIndex;
      }

      initGl(gltf)
      {
          super.initGl(gltf);

          let cameraIndex = undefined;
          for (let i = 0; i < gltf.nodes.length; i++)
          {
              cameraIndex = gltf.nodes[i].camera;
              if (cameraIndex === undefined)
              {
                  continue;
              }

              if (gltf.cameras[cameraIndex] === this)
              {
                  this.node = i;
                  break;
              }
          }

          if(this.node === undefined)
          {
              console.error("Invalid node for camera " + cameraIndex);
          }
      }

      fromJson(jsonCamera)
      {
          this.name = name;
          if(jsonCamera.perspective !== undefined)
          {
              this.type = "perspective";
              fromKeys(this, jsonCamera.perspective);
          }
          else if(jsonCamera.orthographic !== undefined)
          {
              this.type = "orthographic";
              fromKeys(this, jsonCamera.orthographic);
          }
      }

      sortPrimitivesByDepth(gltf, nodes)
      {
          // Precompute the distances to avoid their computation during sorting.
          const sortedPrimitives = [];
          for (const node of nodes.filter(node => node.mesh !== undefined))
          {
              const modelView = create$3();
              multiply$3(modelView, this.getViewMatrix(gltf), node.worldTransform);

              for(const primitive of gltf.meshes[node.mesh].primitives)
              {
                  // Transform primitive centroid to find the primitive's depth.
                  const pos = transformMat4(create$4(), clone$4(primitive.centroid), modelView);

                  sortedPrimitives.push({depth: pos[2], primitive, node});
              }
          }

          // 1. Remove primitives that are behind the camera.
          //    --> They will never be visible and it is cheap to discard them here.
          // 2. Sort primitives so that the furthest nodes are rendered first.
          //    This is required for correct transparency rendering.
          return sortedPrimitives
              .filter((a) => a.depth <= 0)
              .sort((a, b) => a.depth - b.depth);
      }

      getProjectionMatrix()
      {
          const projection$$1 = create$3();

          if (this.type === "perspective")
          {
              perspective(projection$$1, this.yfov, this.aspectRatio, this.znear, this.zfar);
          }
          else if (this.type === "orthographic")
          {
              projection$$1[0]  = 1.0 / this.xmag;
              projection$$1[5]  = 1.0 / this.ymag;
              projection$$1[10] = 2.0 / (this.znear - this.zfar);
              projection$$1[14] = (this.zfar + this.znear) / (this.znear - this.zfar);
          }

          return projection$$1;
      }

      getViewMatrix(gltf)
      {
          const view = create$3();
          const position = this.getPosition(gltf);
          const target = this.getLookAtTarget(gltf);
          lookAt(view, position, target, fromValues$4(0, 1, 0));
          return view;
      }

      getLookAtTarget(gltf)
      {
          const target = create$4();
          const position = this.getPosition(gltf);
          const lookDirection = this.getLookDirection(gltf);
          add$4(target, lookDirection, position);
          return target;
      }

      getPosition(gltf)
      {
          const position = create$4();
          const node = this.getNode(gltf);
          getTranslation(position, node.worldTransform);
          return position;
      }

      getLookDirection(gltf)
      {
          const direction = create$4();
          const rotation = this.getRotation(gltf);
          transformQuat(direction, fromValues$4(0, 0, -1), rotation);
          return direction;
      }

      getRotation(gltf)
      {
          const rotation = create$6();
          const node = this.getNode(gltf);
          getRotation(rotation, node.worldTransform);
          return rotation;
      }

      clone()
      {
          return new gltfCamera(
              this.type,
              this.znear,
              this.zfar,
              this.yfov,
              this.aspectRatio,
              this.xmag,
              this.ymag,
              this.name,
              this.node);
      }

      getNode(gltf)
      {
          return gltf.nodes[this.node];
      }
  }

  /**
   * hdrpng.js - Original code from Enki https://enkimute.github.io/hdrpng.js/
   * 
   * Refactored and simplified.
   */

  function HDRImage() {
      var res = document.createElement('canvas'), HDRdata=null;
      res.__defineGetter__('dataFloat',function(){ return rgbeToFloat(HDRdata); });
      res.__defineGetter__('dataRGBE',function(){ return HDRdata; });
      res.__defineSetter__('src',function(val){
          if (val.match(/\.hdr$/i)) loadHDR(val,function(img, width, height) {
              HDRdata = img;
              this.width  = this.style.width  = width;
              this.height = this.style.height = height;
              this.onload && this.onload();
          }.bind(res));
      });
      return res;
  }

  function m(a,b) {
      for (var i in b) a[i]=b[i];
      return a;
  }

  /** 
   * Load and parse a Radiance .HDR file. It completes with a 32bit RGBE buffer.
   * @param {URL}      url        location of .HDR file to load.
   * @param {function} completion completion callback.
   * 
   * @returns {XMLHttpRequest}    the XMLHttpRequest used to download the file.
   */
  function loadHDR(url, completion ) {
      var req = m(new XMLHttpRequest(),{responseType:"arraybuffer"});
      req.onerror = completion.bind(req,false);
      req.onload  = function() {
          if (this.status>=400) return this.onerror();
          var header='',pos=0,d8=new Uint8Array(this.response),format;
          // read header.
          while (!header.match(/\n\n[^\n]+\n/g)) header += String.fromCharCode(d8[pos++]);
          // check format.
          format = header.match(/FORMAT=(.*)$/m)[1];
          if (format!='32-bit_rle_rgbe') return console.warn('unknown format : '+format),this.onerror();
          // parse resolution
          var rez=header.split(/\n/).reverse()[1].split(' '), width=rez[3]*1, height=rez[1]*1;
          // Create image.
          var img=new Uint8Array(width*height*4),ipos=0;
          // Read all scanlines
          for (var j=0; j<height; j++) {
              var scanline = [];

              var rgbe = d8.slice(pos, pos+=4);
              const isNewRLE = (rgbe[0] == 2 && rgbe[1] == 2 && rgbe[2] == ((width >> 8) & 0xFF) && rgbe[3] == (width & 0xFF));

              if (isNewRLE && (width >= 8) && (width < 32768))
              {
                  for (var i=0; i < 4; i++)
                  {
                      var ptr = i*width, ptr_end = (i+1)*width, buf, count;
                      while (ptr<ptr_end)
                      {
                          buf = d8.slice(pos, pos+=2);
                          if (buf[0] > 128)
                          {
                              count = buf[0]-128;
                              while(count-- > 0) scanline[ptr++] = buf[1];
                          }
                          else
                          {
                              count = buf[0]-1;
                              scanline[ptr++]=buf[1];
                              while(count-- > 0) scanline[ptr++] = d8[pos++];
                          }
                      }
                  }

                  for (var i=0;i<width;i++)
                  {
                      img[ipos++] = scanline[i+0*width];
                      img[ipos++] = scanline[i+1*width];
                      img[ipos++] = scanline[i+2*width];
                      img[ipos++] = scanline[i+3*width];
                  }
              }
              else
              {
                  pos -= 4;

                  for (var i = 0; i < width; i++)
                  {
                      rgbe = d8.slice(pos, pos += 4);

                      img[ipos++] = rgbe[0];
                      img[ipos++] = rgbe[1];
                      img[ipos++] = rgbe[2];
                      img[ipos++] = rgbe[3];
                  }
              }
          }
          completion && completion(img,width,height);
      };
      req.open("GET",url,true);
      req.send(null);
      return req;
  }

  /** Convert a float buffer to a RGBE buffer.
    * @param {Float32Array} buffer Floating point input buffer (96 bits/pixel).
    * @param {Uint8Array}   [res]  Optional output buffer with 32 bit RGBE per pixel.
    * 
    * @returns {Uint8Array}        A 32bit uint8 array in RGBE
    */
  function floatToRgbe(buffer, res) {
      var r,g,b,v,s,l=(buffer.byteLength/12)|0, res=res||new Uint8Array(l*4);
      for (var i=0; i<l; i++) {
          r = buffer[i*3];
          g = buffer[i*3+1];
          b = buffer[i*3+2];

          v = Math.max(Math.max(r,g),b);

          var e = Math.ceil(Math.log2(v));
          s = Math.pow(2,e-8);
          
          res[i*4]   = (r/s)|0;
          res[i*4+1] = (g/s)|0;
          res[i*4+2] = (b/s)|0;
          res[i*4+3] = (e+128);
      }
      return res;
  }

  /** Convert an RGBE buffer to a Float buffer.
    * @param {Uint8Array}     buffer The input buffer in RGBE format. (as returned from loadHDR)
    * @param {Float32Array}   [res]  Optional result buffer containing 3 floats per pixel.
    * 
    * @returns {Float32Array}        A floating point buffer with 96 bits per pixel (32 per channel, 3 channels).
    */
  function rgbeToFloat(buffer, res) {
      var s,l=buffer.byteLength>>2, res=res||new Float32Array(l*3);
      for (var i=0; i<l; i++) {
          s = Math.pow(2,buffer[i*4+3]-(128+8));
          
          res[i*3]   = buffer[i*4]*s;
          res[i*3+1] = buffer[i*4+1]*s;
          res[i*3+2] = buffer[i*4+2]*s;
      }
      return res;
  }

  // Float/RGBE conversions.
  HDRImage.floatToRgbe = floatToRgbe;
  HDRImage.rgbeToFloat = rgbeToFloat;

  function nearestPowerOf2(n)
  {
      if (isPowerOf2(n))
      {
          return n;
      }
      return Math.pow(2.0, Math.round(Math.log(n) / Math.log(2.0)));
  }

  function isPowerOf2(n)
  {
      return n && (n & (n - 1)) === 0;
  }

  function makeEven(n)
  {
      if (n % 2 === 1)
      {
          return n + 1;
      }
      return n;
  }

  const ImageMimeType = {JPEG: "image/jpeg", PNG: "image/png", HDR: "image/vnd.radiance"};

  class gltfImage extends GltfObject
  {
      constructor(
          uri = undefined,
          type = WebGl.context.TEXTURE_2D, miplevel = 0,
          bufferView = undefined,
          name = undefined,
          mimeType = ImageMimeType.JPEG,
          image = undefined)
      {
          super();
          this.uri = uri;
          this.bufferView = bufferView;
          this.mimeType = mimeType;
          this.image = image; // javascript image
          if (this.image !== undefined)
          {
              this.image.crossOrigin = "";
          }
          this.name = name;
          this.type = type; // nonstandard
          this.miplevel = miplevel; // nonstandard
      }

      resolveRelativePath(basePath)
      {
          if (this.uri !== undefined)
          {
              this.uri = basePath + this.uri;
          }
      }

      load(gltf, additionalFiles = undefined)
      {
          if (this.image !== undefined)
          {
              console.error("image has already been loaded");
              return;
          }

          this.image = this.mimeType === ImageMimeType.HDR ? new HDRImage() : new Image();
          this.image.crossOrigin = "";
          const self = this;
          const promise = new Promise(function(resolve)
          {
              self.image.onload = resolve;
              self.image.onerror = resolve;

              if (!self.setImageFromBufferView(gltf) &&
                  !self.setImageFromFiles(additionalFiles) &&
                  !self.setImageFromUri())
              {
                  console.error("Was not able to resolve image with uri '%s'", self.uri);
                  resolve();
              }
          });

          return promise;
      }

      setImageFromUri()
      {
          if (this.uri === undefined)
          {
              return false;
          }

          this.image.src = this.uri;
          return true;
      }

      setImageFromBufferView(gltf)
      {
          const view = gltf.bufferViews[this.bufferView];
          if (view === undefined)
          {
              return false;
          }

          const buffer = gltf.buffers[view.buffer].buffer;
          const array = new Uint8Array(buffer, view.byteOffset, view.byteLength);
          const blob = new Blob([array], { "type": this.mimeType });
          this.image.src = URL.createObjectURL(blob);
          return true;
      }

      setImageFromFiles(files)
      {
          if (this.uri === undefined || files === undefined)
          {
              return false;
          }

          let foundFile = files.find(function(file)
          {
              if (file.name === this.uri || file.fullPath === this.uri)
              {
                  return true;
              }
          }, this);

          if (foundFile === undefined)
          {
              return false;
          }

          const reader = new FileReader();
          const self = this;
          reader.onloadend = function(event)
          {
              self.image.src = event.target.result;
          };
          reader.readAsDataURL(foundFile);

          return true;
      }

      shouldGenerateMips()
      {
          return (isPowerOf2(this.image.width) && isPowerOf2(this.image.height));
      }
  }

  class gltfLight extends GltfObject
  {
      constructor(
          type = "directional",
          color = [1, 1, 1],
          intensity = 1,
          innerConeAngle = 0,
          outerConeAngle = Math.PI / 4,
          range = -1,
          name = undefined,
          node = undefined)
      {
          super();
          this.type = type;
          this.color = color;
          this.intensity = intensity;
          this.innerConeAngle = innerConeAngle;
          this.outerConeAngle = outerConeAngle;
          this.range = range;
          this.name = name;
          // non gltf
          this.node = node;
      }

      initGl(gltf)
      {
          super.initGl(gltf);

          for (let i = 0; i < gltf.nodes.length; i++)
          {
              const nodeExtensions = gltf.nodes[i].extensions;
              if (nodeExtensions === undefined)
              {
                  continue;
              }

              const lightsExtension = nodeExtensions.KHR_lights_punctual;
              if (lightsExtension === undefined)
              {
                  continue;
              }

              const lightIndex = lightsExtension.light;
              if (gltf.lights[lightIndex] === this)
              {
                  this.node = i;
                  break;
              }
          }
      }
      
      fromJson(jsonLight)
      {
          super.fromJson(jsonLight);

          if(jsonLight.spot !== undefined)
          {
              fromKeys(this, jsonLight.spot);
          }
      }

      toUniform(gltf)
      {
          const uLight = new UniformLight();

          if (this.node !== undefined)
          {
              const matrix = gltf.nodes[this.node].worldTransform;

              var scale$$1 = fromValues$4(1, 1, 1);
              getScaling(scale$$1, matrix);
          
              // To extract a correct rotation, the scaling component must be eliminated.
              const mn = create$3();
              for(const col of [0, 1, 2])
              {
                  mn[col] = matrix[col] / scale$$1[0];
                  mn[col + 4] = matrix[col + 4] / scale$$1[1];
                  mn[col + 8] = matrix[col + 8] / scale$$1[2];
              }
              var rotation = create$6();
              getRotation(rotation, mn);
              normalize$2(rotation, rotation);

              const alongNegativeZ = fromValues$4(0, 0, -1);
              transformQuat(uLight.direction, alongNegativeZ, rotation);

              var translation = fromValues$4(0, 0, 0);
              getTranslation(translation, matrix);
              uLight.position = translation;
          }

          uLight.range = this.range;
          uLight.color = jsToGl(this.color);
          uLight.intensity = this.intensity;

          uLight.innerConeCos = Math.cos(this.innerConeAngle);
          uLight.outerConeCos = Math.cos(this.outerConeAngle);

          switch(this.type)
          {
          case "spot":
              uLight.type = Type_Spot;
              break;
          case "point":
              uLight.type = Type_Point;
              break;
          case "directional":
          default:
              uLight.type = Type_Directional;
              break;
          }

          return uLight;
      }
  }

  const Type_Directional = 0;
  const Type_Point = 1;
  const Type_Spot = 2;

  class UniformLight extends UniformStruct
  {
      constructor()
      {
          super();

          const defaultDirection = fromValues$4(-0.7399, -0.6428, -0.1983);
          this.direction = defaultDirection;
          this.range = -1;

          this.color = jsToGl([1, 1, 1]);
          this.intensity = 2;

          this.position = jsToGl([0, 0, 0]);
          this.innerConeCos = 0.0;

          this.outerConeCos = Math.PI / 4;
          this.type = Type_Directional;
          this.padding = create$8();
      }
  }

  class gltfTexture extends GltfObject
  {
      constructor(sampler = undefined, source = undefined, type = WebGl.context.TEXTURE_2D, texture = undefined)
      {
          super();
          this.sampler = sampler; // index to gltfSampler, default sampler ?
          this.source = source; // index to gltfImage

          // non gltf
          this.glTexture = texture;
          this.type = type;
          this.initialized = false;
      }

      initGl(gltf)
      {
          if (this.sampler === undefined)
          {
              this.sampler = gltf.samplers.length - 1;
          }

          initGlForMembers(this, gltf);
      }

      destroy()
      {
          if (this.glTexture !== undefined)
          {
              WebGl.context.deleteTexture(this.glTexture);
          }

          this.glTexture = undefined;
      }
  }

  class gltfTextureInfo
  {
      constructor(index = undefined, texCoord = 0, linear = true, samplerName = "", generateMips = true) // linear by default
      {
          this.index = index; // reference to gltfTexture
          this.texCoord = texCoord; // which UV set to use
          this.linear = linear;
          this.samplerName = samplerName;
          this.strength = 1.0; // occlusion
          this.scale = 1.0; // normal
          this.generateMips = generateMips;

          this.extensions = undefined;
      }

      initGl(gltf)
      {
          initGlForMembers(this, gltf);
      }

      fromJson(jsonTextureInfo)
      {
          fromKeys(this, jsonTextureInfo);
      }
  }

  class gltfMaterial extends GltfObject
  {
      constructor()
      {
          super();
          this.name = undefined;
          this.pbrMetallicRoughness = undefined;
          this.normalTexture = undefined;
          this.occlusionTexture = undefined;
          this.emissiveTexture = undefined;
          this.emissiveFactor = fromValues$4(0, 0, 0);
          this.alphaMode = "OPAQUE";
          this.alphaCutoff = 0.5;
          this.doubleSided = false;

          // non gltf properties
          this.type = "unlit";
          this.textures = [];
          this.properties = new Map();
          this.defines = [];
      }

      static createDefault()
      {
          const defaultMaterial = new gltfMaterial();
          defaultMaterial.type = "MR";
          defaultMaterial.name = "Default Material";
          defaultMaterial.defines.push("MATERIAL_METALLICROUGHNESS 1");
          const baseColorFactor = fromValues$5(1, 1, 1, 1);
          const metallicFactor = 1;
          const roughnessFactor = 1;
          defaultMaterial.properties.set("u_BaseColorFactor", baseColorFactor);
          defaultMaterial.properties.set("u_MetallicFactor", metallicFactor);
          defaultMaterial.properties.set("u_RoughnessFactor", roughnessFactor);
          return defaultMaterial;
      }

      getShaderIdentifier()
      {
          switch (this.type)
          {
          default:
          case "SG": // fall through till we sparate shaders
          case "MR": return "metallic-roughness.frag";
              //case "SG": return "specular-glossiness.frag" ;
          }
      }

      getDefines()
      {
          return this.defines;
      }

      getProperties()
      {
          return this.properties;
      }

      getTextures()
      {
          return this.textures;
      }

      parseTextureInfoExtensions(textureInfo, textureKey)
      {
          if(textureInfo.extensions === undefined)
          {
              return;
          }

          if(textureInfo.extensions.KHR_texture_transform !== undefined)
          {
              const uvTransform = textureInfo.extensions.KHR_texture_transform;

              // override uvset
              if(uvTransform.texCoord !== undefined)
              {
                  textureInfo.texCoord = uvTransform.texCoord;
              }

              let rotation = create$2();
              let scale$$1 = create$2();
              let translation = create$2();

              if(uvTransform.rotation !== undefined)
              {
                  const s =  Math.sin(uvTransform.rotation);
                  const c =  Math.cos(uvTransform.rotation);

                  rotation = jsToGl([
                      c, s, 0.0,
                      -s, c, 0.0,
                      0.0, 0.0, 1.0]);
              }

              if(uvTransform.scale !== undefined)
              {
                  scale$$1 = jsToGl([uvTransform.scale[0],0,0, 0,uvTransform.scale[1],0, 0,0,1]);
              }

              if(uvTransform.offset !== undefined)
              {
                  translation = jsToGl([1,0,uvTransform.offset[0], 0,1,uvTransform.offset[1], 0, 0, 1]);
              }

              let uvMatrix = create$2();
              multiply$2(uvMatrix, rotation, scale$$1);
              multiply$2(uvMatrix, uvMatrix, translation);

              this.defines.push("HAS_" + textureKey.toUpperCase() + "_UV_TRANSFORM 1");
              this.properties.set("u_" + textureKey + "UVTransform", uvMatrix);
          }
      }

      initGl(gltf)
      {
          if (this.normalTexture !== undefined)
          {
              this.normalTexture.samplerName = "u_NormalSampler";
              this.parseTextureInfoExtensions(this.normalTexture, "Normal");
              this.textures.push(this.normalTexture);
              this.defines.push("HAS_NORMAL_MAP 1");
              this.properties.set("u_NormalScale", this.normalTexture.scale);
              this.properties.set("u_NormalUVSet", this.normalTexture.texCoord);
          }

          if (this.occlusionTexture !== undefined)
          {
              this.occlusionTexture.samplerName = "u_OcclusionSampler";
              this.parseTextureInfoExtensions(this.occlusionTexture, "Occlusion");
              this.textures.push(this.occlusionTexture);
              this.defines.push("HAS_OCCLUSION_MAP 1");
              this.properties.set("u_OcclusionStrength", this.occlusionTexture.strength);
              this.properties.set("u_OcclusionUVSet", this.occlusionTexture.texCoord);
          }

          if (this.emissiveTexture !== undefined)
          {
              this.emissiveTexture.samplerName = "u_EmissiveSampler";
              this.parseTextureInfoExtensions(this.emissiveTexture, "Emissive");
              this.textures.push(this.emissiveTexture);
              this.defines.push("HAS_EMISSIVE_MAP 1");
              this.properties.set("u_EmissiveFactor", this.emissiveFactor);
              this.properties.set("u_EmissiveUVSet", this.emissiveTexture.texCoord);
          }

          if (this.baseColorTexture !== undefined)
          {
              this.baseColorTexture.samplerName = "u_BaseColorSampler";
              this.parseTextureInfoExtensions(this.baseColorTexture, "BaseColor");
              this.textures.push(this.baseColorTexture);
              this.defines.push("HAS_BASE_COLOR_MAP 1");
              this.properties.set("u_BaseColorUVSet", this.baseColorTexture.texCoord);
          }

          if (this.metallicRoughnessTexture !== undefined)
          {
              this.metallicRoughnessTexture.samplerName = "u_MetallicRoughnessSampler";
              this.parseTextureInfoExtensions(this.metallicRoughnessTexture, "MetallicRoughness");
              this.textures.push(this.metallicRoughnessTexture);
              this.defines.push("HAS_METALLIC_ROUGHNESS_MAP 1");
              this.properties.set("u_MetallicRoughnessUVSet", this.metallicRoughnessTexture.texCoord);
          }

          if (this.diffuseTexture !== undefined)
          {
              this.diffuseTexture.samplerName = "u_DiffuseSampler";
              this.parseTextureInfoExtensions(this.diffuseTexture, "Diffuse");
              this.textures.push(this.diffuseTexture);
              this.defines.push("HAS_DIFFUSE_MAP 1");
              this.properties.set("u_DiffuseUVSet", this.diffuseTexture.texCoord);
          }

          if (this.specularGlossinessTexture !== undefined)
          {
              this.specularGlossinessTexture.samplerName = "u_SpecularGlossinessSampler";
              this.parseTextureInfoExtensions(this.specularGlossinessTexture, "SpecularGlossiness");
              this.textures.push(this.specularGlossinessTexture);
              this.defines.push("HAS_SPECULAR_GLOSSINESS_MAP 1");
              this.properties.set("u_SpecularGlossinessUVSet", this.specularGlossinessTexture.texCoord);
          }

          if(this.alphaMode === 'MASK') // only set cutoff value for mask material
          {
              this.defines.push("ALPHAMODE_MASK 1");
              this.properties.set("u_AlphaCutoff", this.alphaCutoff);
          }
          else if (this.alphaMode === 'OPAQUE')
          {
              this.defines.push("ALPHAMODE_OPAQUE 1");
          }

          if (this.pbrMetallicRoughness !== undefined && this.type !== "SG")
          {
              this.defines.push("MATERIAL_METALLICROUGHNESS 1");

              let baseColorFactor = fromValues$5(1, 1, 1, 1);
              let metallicFactor = 1;
              let roughnessFactor = 1;

              if (this.pbrMetallicRoughness.baseColorFactor !== undefined)
              {
                  baseColorFactor = jsToGl(this.pbrMetallicRoughness.baseColorFactor);
              }

              if (this.pbrMetallicRoughness.metallicFactor !== undefined)
              {
                  metallicFactor = this.pbrMetallicRoughness.metallicFactor;
              }

              if (this.pbrMetallicRoughness.roughnessFactor !== undefined)
              {
                  roughnessFactor = this.pbrMetallicRoughness.roughnessFactor;
              }

              this.properties.set("u_BaseColorFactor", baseColorFactor);
              this.properties.set("u_MetallicFactor", metallicFactor);
              this.properties.set("u_RoughnessFactor", roughnessFactor);
          }

          if (this.extensions !== undefined)
          {
              if (this.extensions.KHR_materials_unlit !== undefined)
              {
                  this.defines.push("MATERIAL_UNLIT 1");
              }

              if (this.extensions.KHR_materials_pbrSpecularGlossiness !== undefined)
              {
                  this.defines.push("MATERIAL_SPECULARGLOSSINESS 1");

                  let diffuseFactor = fromValues$5(1, 1, 1, 1);
                  let specularFactor = fromValues$4(1, 1, 1);
                  let glossinessFactor = 1;

                  if (this.extensions.KHR_materials_pbrSpecularGlossiness.diffuseFactor !== undefined)
                  {
                      diffuseFactor = jsToGl(this.extensions.KHR_materials_pbrSpecularGlossiness.diffuseFactor);
                  }

                  if (this.extensions.KHR_materials_pbrSpecularGlossiness.specularFactor !== undefined)
                  {
                      specularFactor = jsToGl(this.extensions.KHR_materials_pbrSpecularGlossiness.specularFactor);
                  }

                  if (this.extensions.KHR_materials_pbrSpecularGlossiness.glossinessFactor !== undefined)
                  {
                      glossinessFactor = this.extensions.KHR_materials_pbrSpecularGlossiness.glossinessFactor;
                  }

                  this.properties.set("u_DiffuseFactor", diffuseFactor);
                  this.properties.set("u_SpecularFactor", specularFactor);
                  this.properties.set("u_GlossinessFactor", glossinessFactor);
              }
          }

          initGlForMembers(this, gltf);
      }

      fromJson(jsonMaterial)
      {
          super.fromJson(jsonMaterial);

          if (jsonMaterial.emissiveFactor !== undefined)
          {
              this.emissiveFactor = jsToGl(jsonMaterial.emissiveFactor);
          }

          if (jsonMaterial.normalTexture !== undefined)
          {
              const normalTexture = new gltfTextureInfo();
              normalTexture.fromJson(jsonMaterial.normalTexture);
              this.normalTexture = normalTexture;
          }

          if (jsonMaterial.occlusionTexture !== undefined)
          {
              const occlusionTexture = new gltfTextureInfo();
              occlusionTexture.fromJson(jsonMaterial.occlusionTexture);
              this.occlusionTexture = occlusionTexture;
          }

          if (jsonMaterial.emissiveTexture !== undefined)
          {
              const emissiveTexture = new gltfTextureInfo(undefined, 0, false);
              emissiveTexture.fromJson(jsonMaterial.emissiveTexture);
              this.emissiveTexture = emissiveTexture;
          }

          if(jsonMaterial.extensions !== undefined)
          {
              this.fromJsonMaterialExtensions(jsonMaterial.extensions);
          }

          // dont do MR if we parsed SG before
          if (jsonMaterial.pbrMetallicRoughness !== undefined && this.type !== "SG")
          {
              this.type = "MR";
              this.fromJsonMetallicRoughness(jsonMaterial.pbrMetallicRoughness);
          }
      }

      fromJsonMaterialExtensions(jsonExtensions)
      {
          if (jsonExtensions.KHR_materials_pbrSpecularGlossiness !== undefined)
          {
              this.type = "SG";
              this.fromJsonSpecularGlossiness(jsonExtensions.KHR_materials_pbrSpecularGlossiness);
          }

          if(jsonExtensions.KHR_materials_unlit !== undefined)
          {
              this.type = "unlit";
          }
      }

      fromJsonMetallicRoughness(jsonMetallicRoughness)
      {
          if (jsonMetallicRoughness.baseColorTexture !== undefined)
          {
              const baseColorTexture = new gltfTextureInfo(undefined, 0, false);
              baseColorTexture.fromJson(jsonMetallicRoughness.baseColorTexture);
              this.baseColorTexture = baseColorTexture;
          }

          if (jsonMetallicRoughness.metallicRoughnessTexture !== undefined)
          {
              const metallicRoughnessTexture = new gltfTextureInfo();
              metallicRoughnessTexture.fromJson(jsonMetallicRoughness.metallicRoughnessTexture);
              this.metallicRoughnessTexture = metallicRoughnessTexture;
          }
      }

      fromJsonSpecularGlossiness(jsonSpecularGlossiness)
      {
          if (jsonSpecularGlossiness.diffuseTexture !== undefined)
          {
              const diffuseTexture = new gltfTextureInfo(undefined, 0, false);
              diffuseTexture.fromJson(jsonSpecularGlossiness.diffuseTexture);
              this.diffuseTexture = diffuseTexture;
          }

          if (jsonSpecularGlossiness.specularGlossinessTexture !== undefined)
          {
              const specularGlossinessTexture = new gltfTextureInfo();
              specularGlossinessTexture.fromJson(jsonSpecularGlossiness.specularGlossinessTexture);
              this.specularGlossinessTexture = specularGlossinessTexture;
          }
      }
  }

  class gltfPrimitive extends GltfObject
  {
      constructor()
      {
          super();
          this.attributes = [];
          this.targets = [];
          this.indices = undefined;
          this.material = undefined;
          this.mode = WebGl.context.TRIANGLES;

          // non gltf
          this.glAttributes = [];
          this.defines = [];
          this.skip = true;
          this.hasWeights = false;
          this.hasJoints = false;

          // The primitive centroid is used for depth sorting.
          this.centroid = undefined;
      }

      initGl(gltf)
      {
          // Use the default glTF material.
          if (this.material === undefined)
          {
              this.material = gltf.materials.length - 1;
          }

          initGlForMembers(this, gltf);

          const maxAttributes = WebGl.context.getParameter(WebGl.context.MAX_VERTEX_ATTRIBS);

          // https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes

          // VERTEX ATTRIBUTES
          for (const attribute of Object.keys(this.attributes))
          {
              if(this.glAttributes.length >= maxAttributes)
              {
                  console.error("To many vertex attributes for this primitive, skipping " + attribute);
                  break;
              }

              const idx = this.attributes[attribute];
              switch (attribute)
              {
              case "POSITION":
                  this.skip = false;
                  this.glAttributes.push({ attribute: attribute, name: "a_Position", accessor: idx });
                  break;
              case "NORMAL":
                  this.defines.push("HAS_NORMALS 1");
                  this.glAttributes.push({ attribute: attribute, name: "a_Normal", accessor: idx });
                  break;
              case "TANGENT":
                  this.defines.push("HAS_TANGENTS 1");
                  this.glAttributes.push({ attribute: attribute, name: "a_Tangent", accessor: idx });
                  break;
              case "TEXCOORD_0":
                  this.defines.push("HAS_UV_SET1 1");
                  this.glAttributes.push({ attribute: attribute, name: "a_UV1", accessor: idx });
                  break;
              case "TEXCOORD_1":
                  this.defines.push("HAS_UV_SET2 1");
                  this.glAttributes.push({ attribute: attribute, name: "a_UV2", accessor: idx });
                  break;
              case "COLOR_0":
                  {
                      const accessor = gltf.accessors[idx];
                      this.defines.push("HAS_VERTEX_COLOR_" + accessor.type + " 1");
                      this.glAttributes.push({ attribute: attribute, name: "a_Color", accessor: idx });
                  }
                  break;
              case "JOINTS_0":
                  this.hasJoints = true;
                  this.defines.push("HAS_JOINT_SET1 1");
                  this.glAttributes.push({ attribute: attribute, name: "a_Joint1", accessor: idx });
                  break;
              case "WEIGHTS_0":
                  this.hasWeights = true;
                  this.defines.push("HAS_WEIGHT_SET1 1");
                  this.glAttributes.push({ attribute: attribute, name: "a_Weight1", accessor: idx });
                  break;
              case "JOINTS_1":
                  this.hasJoints = true;
                  this.defines.push("HAS_JOINT_SET2 1");
                  this.glAttributes.push({ attribute: attribute, name: "a_Joint2", accessor: idx });
                  break;
              case "WEIGHTS_1":
                  this.hasWeights = true;
                  this.defines.push("HAS_WEIGHT_SET2 1");
                  this.glAttributes.push({ attribute: attribute, name: "a_Weight2", accessor: idx });
                  break;
              default:
                  console.log("Unknown attribute: " + attribute);
              }
          }

          // MORPH TARGETS
          if (this.targets !== undefined)
          {
              let i = 0;
              for (const target of this.targets)
              {
                  if(this.glAttributes.length + 3 > maxAttributes)
                  {
                      console.error("To many vertex attributes for this primitive, skipping target " + i);
                      break;
                  }

                  for (const attribute of Object.keys(target))
                  {
                      const idx = target[attribute];

                      switch (attribute)
                      {
                      case "POSITION":
                          this.defines.push("HAS_TARGET_POSITION" + i + " 1");
                          this.glAttributes.push({ attribute: attribute, name: "a_Target_Position" + i, accessor: idx });
                          break;
                      case "NORMAL":
                          this.defines.push("HAS_TARGET_NORMAL" + i + " 1");
                          this.glAttributes.push({ attribute: attribute, name: "a_Target_Normal" + i, accessor: idx });
                          break;
                      case "TANGENT":
                          this.defines.push("HAS_TARGET_TANGENT" + i + " 1");
                          this.glAttributes.push({ attribute: attribute, name: "a_Target_Tangent" + i, accessor: idx });
                          break;
                      }
                  }

                  ++i;
              }
          }
      }

      getShaderIdentifier()
      {
          return "primitive.vert";
      }

      getDefines()
      {
          return this.defines;
      }

      setCentroid(centroid)
      {
          this.centroid = centroid;
      }
  }

  class gltfMesh extends GltfObject
  {
      constructor()
      {
          super();
          this.primitives = [];
          this.name = undefined;
          this.weights = [];
      }

      fromJson(jsonMesh)
      {
          if (jsonMesh.name !== undefined)
          {
              this.name = jsonMesh.name;
          }

          this.primitives = objectsFromJsons(jsonMesh.primitives, gltfPrimitive);

          if(jsonMesh.weights !== undefined)
          {
              this.weights = jsonMesh.weights;
          }
      }
  }

  // contain:
  // transform
  // child indices (reference to scene array of nodes)

  class gltfNode extends GltfObject {
      constructor(type) {
          super();
          this.camera = undefined;
          this.children = [];
          this.matrix = undefined;
          this.rotation = jsToGl([0, 0, 0, 1]);
          this.scale = jsToGl([1, 1, 1]);
          this.translation = jsToGl([0, 0, 0]);
          this.name = undefined;
          this.mesh = undefined;
          this.skin = undefined;

          // non gltf
          this.worldTransform = create$3();
          this.inverseWorldTransform = create$3();
          this.normalMatrix = create$3();
          this.light = undefined;
          this.changed = true;

          //defines node type
          this.type = type;

          //bounding box
          this.aabbmin = undefined;
          this.aabbmax = undefined;
          //bounding box for weapons
          this.aabbWeaponMin = create$4();
          this.aabbWeaponMax = create$4();
          this.initialRotation = this.rotation;
          this.lastTranslation = this.translation;
          this.alive = true;

      }

      initGl() {
          if (this.matrix !== undefined) {
              this.applyMatrix(this.matrix);
          } else {
              if (this.scale !== undefined) {
                  this.scale = jsToGl(this.scale);
              }

              if (this.rotation !== undefined) {
                  this.rotation = jsToGl(this.rotation);
              }

              if (this.translation !== undefined) {
                  this.translation = jsToGl(this.translation);
              }
          }
          this.changed = true;
      }

      applyMatrix(matrixData) {
          this.matrix = jsToGl(matrixData);

          getScaling(this.scale, this.matrix);

          // To extract a correct rotation, the scaling component must be eliminated.
          const mn = create$3();
          for (const col of [0, 1, 2]) {
              mn[col] = this.matrix[col] / this.scale[0];
              mn[col + 4] = this.matrix[col + 4] / this.scale[1];
              mn[col + 8] = this.matrix[col + 8] / this.scale[2];
          }
          getRotation(this.rotation, mn);
          normalize$2(this.rotation, this.rotation);

          getTranslation(this.translation, this.matrix);

          this.changed = true;
      }

      // vec3
      applyTranslation(translation) {
          this.translation = translation;
          this.changed = true;
      }

      // quat
      applyRotation(rotation) {
          this.rotation = rotation;
          this.changed = true;
      }

      // vec3
      applyScale(scale$$1) {
          this.scale = scale$$1;
          this.changed = true;
      }

      resetTransform() {
          this.rotation = jsToGl([0, 0, 0, 1]);
          this.scale = jsToGl([1, 1, 1]);
          this.translation = jsToGl([0, 0, 0]);
          this.changed = true;
      }

      getLocalTransform() {
          if (this.transform === undefined || this.changed) {
              this.transform = create$3();
              fromRotationTranslationScale(this.transform, this.rotation, this.translation, this.scale);
              this.changed = false;
          }

          return clone$3(this.transform);
      }

      //calulates new rotation array
      rotate(angle$$1) {

          angle$$1 *= 0.5;

          let qax = this.initialRotation[0], qay = this.initialRotation[1], qaz = this.initialRotation[2],
              qaw = this.initialRotation[3],
              qbx = Math.sin(angle$$1), qbw = Math.cos(angle$$1);

          this.rotation[0] = qax * qbw + qaz * qbx;
          this.rotation[1] = qay * qbw + qaw * qbx;
          this.rotation[2] = qaz * qbw - qax * qbx;
          this.rotation[3] = qaw * qbw - qay * qbx;

          this.applyRotation(this.rotation);
      };


  }

  class gltfSampler extends GltfObject
  {
      constructor(
          magFilter = WebGl.context.LINEAR,
          minFilter = WebGl.context.LINEAR_MIPMAP_LINEAR,
          wrapS = WebGl.context.REPEAT,
          wrapT = WebGl.context.REPEAT)
      {
          super();
          this.magFilter = magFilter;
          this.minFilter = minFilter;
          this.wrapS = wrapS;
          this.wrapT = wrapT;
          this.name = undefined;
      }

      static createDefault()
      {
          return new gltfSampler();
      }
  }

  class gltfScene extends GltfObject
  {
      constructor(nodes = [], name = undefined)
      {
          super();
          this.nodes = nodes;
          this.name = name;
      }

      fromJson(jsonScene)
      {
          if (jsonScene.nodes !== undefined)
          {
              this.nodes = jsonScene.nodes;
          }

          this.name = jsonScene.name;
      }

      applyTransformHierarchy(gltf, rootTransform = create$3())
      {
          function applyTransform(gltf, node, parentTransform)
          {
              multiply$3(node.worldTransform, parentTransform, node.getLocalTransform());
              invert$3(node.inverseWorldTransform, node.worldTransform);
              transpose$2(node.normalMatrix, node.inverseWorldTransform);

              for (const child of node.children)
              {
                  applyTransform(gltf, gltf.nodes[child], node.worldTransform);
              }
          }

          for (const node of this.nodes)
          {
              applyTransform(gltf, gltf.nodes[node], rootTransform);
          }
      }

      gatherNodes(gltf)
      {
          const nodes = [];

          function gatherNode(nodeIndex)
          {
              const node = gltf.nodes[nodeIndex];
              nodes.push(node);

              // recurse into children
              for(const child of node.children)
              {
                  gatherNode(child);
              }
          }

          for (const node of this.nodes)
          {
              gatherNode(node);
          }

          return nodes;
      }

      includesNode(gltf, nodeIndex)
      {
          let children = [...this.nodes];
          while(children.length > 0)
          {
              const childIndex = children.pop();

              if (childIndex === nodeIndex)
              {
                  return true;
              }

              children = children.concat(gltf.nodes[childIndex].children);
          }

          return false;
      }
  }

  class gltfAsset extends GltfObject
  {
      constructor()
      {
          super();
          this.copyright = undefined;
          this.generator = undefined;
          this.version = undefined;
          this.minVersion = undefined;
      }
  }

  class gltfAnimationChannel extends GltfObject
  {
      constructor()
      {
          super();
          this.target = {node: undefined, path: undefined};
          this.sampler = undefined;
      }
  }

  const InterpolationPath =
  {
      TRANSLATION: "translation",
      ROTATION: "rotation",
      SCALE: "scale",
      WEIGHTS: "weights"
  };

  class gltfAnimationSampler extends GltfObject
  {
      constructor()
      {
          super();
          this.input = undefined;
          this.interpolation = undefined;
          this.output = undefined;
      }
  }

  const InterpolationModes =
  {
      LINEAR: "LINEAR",
      STEP: "STEP",
      CUBICSPLINE: "CUBICSPLINE"
  };

  class gltfInterpolator
  {
      constructor()
      {
          this.prevKey = 0;
          this.prevT = 0.0;
      }

      slerpQuat(q1, q2, t)
      {
          const qn1 = create$6();
          const qn2 = create$6();

          normalize$2(qn1, q1);
          normalize$2(qn2, q2);

          const quatResult = create$6();

          slerp(quatResult, qn1, qn2, t);
          normalize$2(quatResult, quatResult);

          return quatResult;
      }

      linear(prevKey, nextKey, output, t, stride)
      {
          const result = new ARRAY_TYPE(stride);

          for(let i = 0; i < stride; ++i)
          {
              result[i] = output[prevKey * stride + i] * (1-t) + output[nextKey * stride + i] * t;
          }

          return result;
      }

      cubicSpline(prevKey, nextKey, output, keyDelta, t, stride)
      {
          // stride: Count of components (4 in a quaternion).
          // Scale by 3, because each output entry consist of two tangents and one data-point.
          const prevIndex = prevKey * stride * 3;
          const nextIndex = nextKey * stride * 3;
          const A = 0;
          const V = 1 * stride;
          const B = 2 * stride;

          const result = new ARRAY_TYPE(stride);
          const tSq = t ** 2;
          const tCub = t ** 3;

          // We assume that the components in output are laid out like this: in-tangent, point, out-tangent.
          // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#appendix-c-spline-interpolation
          for(let i = 0; i < stride; ++i)
          {
              const v0 = output[prevIndex + i + V];
              const a = keyDelta * output[nextIndex + i + A];
              const b = keyDelta * output[prevIndex + i + B];
              const v1 = output[nextIndex + i + V];

              result[i] = ((2*tCub - 3*tSq + 1) * v0) + ((tCub - 2*tSq + t) * b) + ((-2*tCub + 3*tSq) * v1) + ((tCub - tSq) * a);
          }

          return result;
      }

      resetKey()
      {
          this.prevKey = 0;
      }

      interpolate(gltf, channel, sampler, t, stride)
      {
          const input = gltf.accessors[sampler.input].getDeinterlacedView(gltf);
          const output = gltf.accessors[sampler.output].getDeinterlacedView(gltf);

          if(output.length === stride) // no interpolation for single keyFrame animations
          {
              return jsToGlSlice(output, 0, stride);
          }

          // Wrap t around, so the animation loops.
          // Make sure that t is never earlier than the first keyframe.
          t = Math.max(t % input[input.length - 1], input[0]);

          if (this.prevT > t)
          {
              this.prevKey = 0;
          }

          this.prevT = t;

          // Find next keyframe: min{ t of input | t > prevKey }
          let nextKey = null;
          for (let i = this.prevKey; i < input.length; ++i)
          {
              if (t <= input[i])
              {
                  nextKey = clamp(i, 1, input.length - 1);
                  break;
              }
          }
          this.prevKey = clamp(nextKey - 1, 0, nextKey);

          const keyDelta = input[nextKey] - input[this.prevKey];

          // Normalize t: [t0, t1] -> [0, 1]
          const tn = (t - input[this.prevKey]) / keyDelta;

          if(channel.target.path === InterpolationPath.ROTATION)
          {

              if(InterpolationModes.CUBICSPLINE === sampler.interpolation)
              {
                  // GLTF requires cubic spline interpolation for quaternions.
                  // https://github.com/KhronosGroup/glTF/issues/1386
                  const result = this.cubicSpline(this.prevKey, nextKey, output, keyDelta, tn, 4);
                  normalize$2(result, result);
                  return result;
              }
              else {
                  const q0 = this.getQuat(output, this.prevKey);
                  const q1 = this.getQuat(output, nextKey);
                  return this.slerpQuat(q0, q1, tn);
              }

          }

          switch(sampler.interpolation)
          {
          case InterpolationModes.STEP:
              return jsToGlSlice(output, this.prevKey * stride, stride); // t < 0.5 ? output[preKey] : output[nextKey]
          case InterpolationModes.CUBICSPLINE:
              return this.cubicSpline(this.prevKey, nextKey, output, keyDelta, tn, stride);
          default:
              return this.linear(this.prevKey, nextKey, output, tn, stride);
          }
      }

      getQuat(output, index)
      {
          const x = output[4 * index];
          const y = output[4 * index + 1];
          const z = output[4 * index + 2];
          const w = output[4 * index + 3];
          return fromValues$6(x, y, z, w);
      }
  }

  class gltfAnimation extends GltfObject
  {
      constructor()
      {
          super();
          this.channels = [];
          this.samplers = [];
          this.name = '';

          // not gltf
          this.interpolators = [];
      }

      fromJson(jsonAnimation)
      {
          this.channels = objectsFromJsons(jsonAnimation.channels, gltfAnimationChannel);
          this.samplers = objectsFromJsons(jsonAnimation.samplers, gltfAnimationSampler);
          this.name = jsonAnimation.name;

          if(this.channels === undefined)
          {
              console.error("No channel data found for skin");
              return;
          }

          for(let i = 0; i < this.channels.length; ++i)
          {
              this.interpolators.push(new gltfInterpolator());
          }
      }

      advance(gltf, totalTime)
      {
          if(this.channels === undefined)
          {
              return;
          }

          for(let i = 0; i < this.interpolators.length; ++i)
          {
              const channel = this.channels[i];
              const sampler = this.samplers[channel.sampler];
              const interpolator = this.interpolators[i];

              const node = gltf.nodes[channel.target.node];

              switch(channel.target.path)
              {
              case InterpolationPath.TRANSLATION:
                  node.applyTranslation(interpolator.interpolate(gltf, channel, sampler, totalTime, 3));
                  break;
              case InterpolationPath.ROTATION:
                  node.applyRotation(interpolator.interpolate(gltf, channel, sampler, totalTime, 4));
                  break;
              case InterpolationPath.SCALE:
                  node.applyScale(interpolator.interpolate(gltf, channel, sampler, totalTime, 3));
                  break;
              case InterpolationPath.WEIGHTS:
              {
                  const mesh = gltf.meshes[node.mesh];
                  mesh.weights = interpolator.interpolate(gltf, channel, sampler, totalTime, mesh.weights.length);
                  break;
              }
              }
          }
      }
  }

  class gltfSkin extends GltfObject
  {
      constructor()
      {
          super();

          this.name = "";
          this.inverseBindMatrices = undefined;
          this.joints = [];
          this.skeleton = undefined;

          // not gltf
          this.jointMatrices = [];
          this.jointNormalMatrices = [];
      }

      computeJoints(gltf, parentNode)
      {
          const ibmAccessor = gltf.accessors[this.inverseBindMatrices].getDeinterlacedView(gltf);
          this.jointMatrices = [];
          this.jointNormalMatrices = [];

          let i = 0;
          for(const joint of this.joints)
          {
              const node = gltf.nodes[joint];

              let jointMatrix = create$3();
              let ibm = jsToGlSlice(ibmAccessor, i++ * 16, 16);
              mul$3(jointMatrix, node.worldTransform, ibm);
              mul$3(jointMatrix, parentNode.inverseWorldTransform, jointMatrix);
              this.jointMatrices.push(jointMatrix);

              let normalMatrix = create$3();
              invert$3(normalMatrix, jointMatrix);
              transpose$2(normalMatrix, normalMatrix);
              this.jointNormalMatrices.push(normalMatrix);
          }
      }
  }

  const Input_ResetCamera = "r";
  const Input_RotateButton = 0;
  const Input_MoveUpButton = 'KeyW';
  const Input_MoveDownButton = 'KeyS';
  const Input_MoveLeftButton = 'KeyA';
  const Input_MoveRightButton = 'KeyD';
  const Input_AttackButton = 'Space';
  const Input_MusicButton = 'KeyM';
  let keys = [];

  const playerWeaponAudio = new Audio('assets/sounds/playerWeaponAttack.mp3');
  const playerHurtAudio = new Audio('assets/sounds/playerHurt.ogg');
  const zombieHurtAudio = new Audio('assets/sounds/zombieHurt.mp3');
  const enemyDeathAudio = new Audio('assets/sounds/enemyDeath.mp3');
  const enemyDetectionSounds = new Audio('assets/sounds/enemyDetectionSound.mp3');
  const playerWalkingSound = new Audio('assets/sounds/playerWalkingSound.mp3');
  const heartSound = new Audio('assets/sounds/heartSound.mp3');
  const combatMusic = new Audio('assets/sounds/combatMusic.mp3');
  const backgroundMusic = new Audio('assets/sounds/backgroundMusic.mp3');

  let music = false;
  let inCombat = false;


  function controlMusic() {
      music = !music;
      if (music) {
          if (inCombat){
              playCombatMusic();
          }
          else{
              playBackgroundMusic();
          }


      } else {
          stopBackgroundMusic();
          stopCombatMusic();
      }

  }


  function playBackgroundMusic() {
      inCombat = false;
      if (music) {
          backgroundMusic.loop = true;
          stopCombatMusic();
          backgroundMusic.volume = 0.2;
          backgroundMusic.play();
      }


  }

  function stopBackgroundMusic() {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;

  }

  function playCombatMusic() {
      inCombat = true;
      if (music) {
          combatMusic.loop = true;
          stopBackgroundMusic();
          combatMusic.volume = 0.05;
          combatMusic.play();
      }


  }

  function stopCombatMusic() {
      combatMusic.pause();
      combatMusic.currentTime = 0;

  }

  class colliison {
      static intervalIntersection(min1, max1, min2, max2) {
          return !(min1 > max2 || min2 > max1);
      }

      static aabbIntersection(aabb1, aabb2) {
          return this.intervalIntersection(aabb1.min[0], aabb1.max[0], aabb2.min[0], aabb2.max[0])
              // && this.intervalIntersection(aabb1.min[1], aabb1.max[1], aabb2.min[1], aabb2.max[1])
              //removed because we dont care about height
              && this.intervalIntersection(aabb1.min[2], aabb1.max[2], aabb2.min[2], aabb2.max[2]);
      }

      static resolveCollision(a, b, player) {
          //get current position
          const posa = a.translation;
          const posb = b.translation;

          //get bounding box
          const mina = add$4(create$4(), posa, a.aabbmin);
          const maxa = add$4(create$4(), posa, a.aabbmax);
          const minb = add$4(create$4(), posb, b.aabbmin);
          const maxb = add$4(create$4(), posb, b.aabbmax);

          // Check if there is collision.
          const isColliding = this.aabbIntersection({
              min: mina,
              max: maxa
          }, {
              min: minb,
              max: maxb
          });

          if (!isColliding) {
              return;
          }
          // console.log(a.name+" is colliding with "+b.name);
          // console.log(b.name);


          // Move node A minimally to avoid collision.
          const diffa = sub$4(create$4(), maxb, mina);
          const diffb = sub$4(create$4(), maxa, minb);

          let minDiff = Infinity;
          let minDirection = create$4();
          if (diffa[0] >= 0 && diffa[0] < minDiff) {
              minDiff = diffa[0];
              minDirection = [minDiff, 0, 0];
          }
          if (diffa[1] >= 0 && diffa[1] < minDiff) {
              minDiff = diffa[1];
              minDirection = [0, minDiff, 0];
          }
          if (diffa[2] >= 0 && diffa[2] < minDiff) {
              minDiff = diffa[2];
              minDirection = [0, 0, minDiff];
          }
          if (diffb[0] >= 0 && diffb[0] < minDiff) {
              minDiff = diffb[0];
              minDirection = [-minDiff, 0, 0];
          }
          if (diffb[1] >= 0 && diffb[1] < minDiff) {
              minDiff = diffb[1];
              minDirection = [0, -minDiff, 0];
          }
          if (diffb[2] >= 0 && diffb[2] < minDiff) {
              minDiff = diffb[2];
              minDirection = [0, 0, -minDiff];
          }

          add$4(a.translation, a.translation, minDirection);
          a.applyTranslation(a.translation);

          //pickup heart
          if (a.name === "player" && b.name.includes("Heart")) {
              this.resolveHeartCollision(player, b);
          }
      }

      static resolveHeartCollision(player, heart) {
          heart.alive = false;
          player.lives = 100;
          heartSound.play();
      }

      static resolveWeaponCollision(first, second, dt) {

          let a = first.node;
          let b = second.node;
          //get current position
          const posa = a.translation;
          const posb = b.translation;

          //get bounding box
          //player boudning box should be bigger
          const mina = add$4(create$4(), posa, a.aabbWeaponMin);
          const maxa = add$4(create$4(), posa, a.aabbWeaponMax);
          //enemy bounding box shouldb be the same ( scalin with big models)
          const minb = add$4(create$4(), posb, b.aabbmin);
          const maxb = add$4(create$4(), posb, b.aabbmax);

          // Check if there is collision.
          const isColliding = this.aabbIntersection({
              min: mina,
              max: maxa
          }, {
              min: minb,
              max: maxb
          });

          if (isColliding) {
              // console.log(b.name+" weaponHit");
              second.subLives();
              //prevents multiple hits.
              zombieHurtAudio.play();
              second.moveBack(dt);
          }


      }


      static checkIfEnemyCaughtPlayer(first, second) {


          let a = first.node;
          let b = second.node;
          //get current position
          const posa = a.translation;
          const posb = b.translation;

          //get bounding box
          const mina = add$4(create$4(), posa, a.aabbmin);
          const maxa = add$4(create$4(), posa, a.aabbmax);
          const minb = add$4(create$4(), posb, b.aabbmin);
          const maxb = add$4(create$4(), posb, b.aabbmax);

          // Check if there is collision.
          const isColliding = this.aabbIntersection({
              min: mina,
              max: maxa
          }, {
              min: minb,
              max: maxb
          });

          if (!isColliding) {
              return;
          }
          // console.log(b.name+" caught you!");
          second.takeAHit();


      }

      static checkIfPlayerEscaped(enemy, player, gltf) {
          if (distance(enemy.node.translation, player.node.translation) >= enemy.detectionEscapeRange) {
              enemy.playerDetection = false;
              gltf.subEnemies();
          }


      }

      static resolveEnemyDetectionRange(player, enemy, gltf) {
          if (distance(enemy.node.translation, player.node.translation) <= enemy.detectionRange) {
              enemy.playerDetection = true;
              enemyDetectionSounds.play();
              if (gltf.awakeEnemies++ === 0) {
                  playCombatMusic();
              }
          }


      }
  }

  class playerObject {
      constructor(node, gtlf, normalMaterialIndex) {
          this.node = node;
          this.gltf = gtlf;
          this.lives = 100;
          this.speed = 15;
          this.normalMaterialIndex = normalMaterialIndex;
          this.hurtMaterialIndex = undefined;
          this.numberOfHits = 0;


      }


      move(dt) {
          const right = set$4(create$4(),
              -Math.sin(this.node.initialRotation[1]), 0, -Math.cos(this.node.initialRotation[1]));
          const forward = set$4(create$4(),
              Math.cos(this.node.initialRotation[1]), 0, -Math.sin(this.node.initialRotation[1]));

          // 1: add movement acceleration
          let acc = create$4();
          //rotate
          if (keys[Input_MoveUpButton] && keys[Input_MoveLeftButton]) {
              sub$4(acc, acc, right);
              sub$4(acc, acc, forward);
              this.node.rotate(5.49779);  //315
              playerWalkingSound.play();


          } else if (keys[Input_MoveUpButton] && keys[Input_MoveRightButton]) {
              sub$4(acc, acc, forward);
              add$4(acc, acc, right);
              this.node.rotate(-2.35619);  //-135
              playerWalkingSound.play();

          } else if (keys[Input_MoveRightButton] && keys[Input_MoveDownButton]) {
              add$4(acc, acc, right);
              add$4(acc, acc, forward);
              this.node.rotate(2.35619);  //135
              playerWalkingSound.play();


          } else if (keys[Input_MoveDownButton] && keys[Input_MoveLeftButton]) {
              add$4(acc, acc, forward);
              sub$4(acc, acc, right);
              this.node.rotate(0.785398);  //45
              playerWalkingSound.play();

          } else if (keys[Input_MoveUpButton]) {
              sub$4(acc, acc, forward);
              this.node.rotate(-1.5708);  //-90
              playerWalkingSound.play();

          } else if (keys[Input_MoveDownButton]) {
              add$4(acc, acc, forward);
              this.node.rotate(1.5708);  //90
              playerWalkingSound.play();

          } else if (keys[Input_MoveRightButton]) {
              add$4(acc, acc, right);
              this.node.rotate(3.14159); //180
              playerWalkingSound.play();

          } else if (keys[Input_MoveLeftButton]) {
              sub$4(acc, acc, right);
              this.node.rotate(6.28319);  //360
              playerWalkingSound.play();
          }

          //move

          scaleAndAdd(this.node.translation, this.node.translation, acc, dt * this.speed);
          this.node.applyTranslation(this.node.translation);


      }


      update(dt) {
          this.move(dt);
          this.checkCollision();
          this.setHealtBar();
      }


      checkCollision() {
          for (var i = 0, len$$1 = this.gltf.nodes.length; i < len$$1; i++) {
              let node = this.gltf.nodes[i];
              if (this.node !== node && !node.name.includes("_floor") && node.alive) {
                  colliison.resolveCollision(this.node, node, this);
              }

          }

      }


      takeAHit() {
          playerHurtAudio.play();
          if (--this.lives <= 0) {
              window.location.replace("Game_Over.html");
          }
          this.showHurtMaterial();

      }

      setHealtBar() {
          document.getElementById("healtBar").style.width = this.lives + "%";
      }

      showNormalMaterial() {
          if (--this.numberOfHits === 0) {
              this.gltf.meshes[this.node.mesh].primitives[0].material = this.normalMaterialIndex;
          } 

      }

      showHurtMaterial() {
          this.gltf.meshes[this.node.mesh].primitives[0].material = this.hurtMaterialIndex;
          this.numberOfHits++;
          setTimeout(this.showNormalMaterial.bind(this), 2000);
      }

  }

  class enemyObject {
      constructor(node, gltf, normalMaterialIndex) {
          this.node = node;
          this.gltf = gltf;
          this.lives = 3;
          //enemy movement speed
          this.movementSpeed = 0.18;
          //if enemy detected player
          this.playerDetection = false;
          this.moveBackFactor = 50;
          this.detectionEscapeRange = 60;
          this.detectionRange = 40;
          this.normalMaterialIndex = normalMaterialIndex;
          this.hurtMaterialIndex = undefined;
          this.numberOfHits = 0;

      }

      update(dt) {
          if (this.playerDetection) {
              this.rotate();
              this.move(dt);
              colliison.checkIfEnemyCaughtPlayer(this, this.gltf.player);
              colliison.checkIfPlayerEscaped(this, this.gltf.player, this.gltf);
              this.gltf.nodes.forEach(function (node2) {
                  if (this.node !== node2 && !node2.name.includes("_floor") && node2.alive) {
                      colliison.resolveCollision(this.node, node2);
                  }


              }.bind(this));
          }

          //player attack
          if (keys[Input_AttackButton]) {
              colliison.resolveWeaponCollision(this.gltf.player, this, dt);

          }

      }


      move(dt) {
          // console.log("moving")
          let enemyVector = this.node.translation;
          let playerVector = this.gltf.player.node.translation;
          let vectorFromEnemyToPlayer = create$4();
          set$4(vectorFromEnemyToPlayer, playerVector[0] - enemyVector[0], 0, playerVector[2] - enemyVector[2]);
          scaleAndAdd(this.node.translation, this.node.translation, vectorFromEnemyToPlayer, dt * this.movementSpeed);
          this.node.applyTranslation(this.node.translation);


      }

      moveBack(dt) {
          // console.log("moving")
          let enemyVector = this.node.translation;
          let playerVector = this.gltf.player.node.translation;
          let vectorFromEnemyToPlayer = create$4();
          set$4(vectorFromEnemyToPlayer, playerVector[0] - enemyVector[0], 0, playerVector[2] - enemyVector[2]);
          negate(vectorFromEnemyToPlayer, vectorFromEnemyToPlayer);
          scaleAndAdd(this.node.translation, this.node.translation, vectorFromEnemyToPlayer, dt * this.movementSpeed * this.moveBackFactor);
          this.node.applyTranslation(this.node.translation);


      }


      rotate() {
          let enemyVector = this.node.translation;
          let playerVector = this.gltf.player.node.translation;
          let newAngle = getAngleBetweenVertices(enemyVector, playerVector);
          this.node.rotate(newAngle);

      }

      subLives() {
          if (--this.lives <= 0) {
              // console.log(this.node.name+" dead");
              this.node.alive = false;
              this.gltf.subEnemies();
              enemyDeathAudio.play();
              if (++this.gltf.killedEnemies === this.gltf.enemies.length) {
                  window.location.replace("Victory.html");
              }
          }
          this.showHurtMaterial();
      }

      showNormalMaterial() {
          if (--this.numberOfHits === 0) {
              this.gltf.meshes[this.node.mesh].primitives[0].material = this.normalMaterialIndex;
          }

      }

      showHurtMaterial() {
          this.gltf.meshes[this.node.mesh].primitives[0].material = this.hurtMaterialIndex;
          this.numberOfHits++;
          setTimeout(this.showNormalMaterial.bind(this), 2000);
      }


  }

  function normalizeAngle(angle$$1) {
      if (angle$$1 > 360) return angle$$1 - 360;
      if (angle$$1 < 0) return 360 + angle$$1;
      else return angle$$1;
  }

  function getAngleBetweenPoints(cx, cy, ex, ey) {
      let dy = ey - cy;
      let dx = ex - cx;
      let theta = Math.atan2(dy, dx);
      theta *= 180 / Math.PI;
      return theta;
  }

  function getAngleBetweenVertices(vert1, vert2) {
      return normalizeAngle(getAngleBetweenPoints(vert1[2], vert1[0], vert2[2], vert2[0])) * (Math.PI / 180);
  }

  class glTF extends GltfObject {
      constructor(file, viewer) {
          super();
          this.asset = undefined;
          this.accessors = [];
          this.nodes = [];
          this.scene = undefined; // the default scene to show.
          this.scenes = [];
          this.cameras = [];
          this.lights = [];
          this.textures = [];
          this.images = [];
          this.samplers = [];
          this.meshes = [];
          this.buffers = [];
          this.bufferViews = [];
          this.materials = [];
          this.animations = [];
          this.skins = [];
          this.path = file;
          this.player = null;
          this.viewer = viewer;
          this.playerDirectionVector = 0;
          this.playerDirection = "up";
          this.setUpAABB = true;
          this.enemies = [];
          this.killedEnemies = 0;
          this.awakeEnemies = 0;
      }

      initGl() {
          initGlForMembers(this, this);
      }

      fromJson(json) {
          super.fromJson(json);

          this.asset = objectFromJson(json.asset, gltfAsset);
          this.cameras = objectsFromJsons(json.cameras, gltfCamera);
          this.accessors = objectsFromJsons(json.accessors, gltfAccessor);
          this.meshes = objectsFromJsons(json.meshes, gltfMesh);
          this.samplers = objectsFromJsons(json.samplers, gltfSampler);
          this.materials = objectsFromJsons(json.materials, gltfMaterial);
          this.buffers = objectsFromJsons(json.buffers, gltfBuffer);
          this.bufferViews = objectsFromJsons(json.bufferViews, gltfBufferView);
          this.scenes = objectsFromJsons(json.scenes, gltfScene);
          this.textures = objectsFromJsons(json.textures, gltfTexture);
          this.nodes = objectsFromJsons(json.nodes, gltfNode);
          this.lights = objectsFromJsons(getJsonLightsFromExtensions(json.extensions), gltfLight);
          this.images = objectsFromJsons(json.images, gltfImage);
          this.animations = objectsFromJsons(json.animations, gltfAnimation);
          this.skins = objectsFromJsons(json.skins, gltfSkin);

          this.materials.push(gltfMaterial.createDefault());
          this.samplers.push(gltfSampler.createDefault());

          if (json.scenes !== undefined) {
              if (json.scene === undefined && json.scenes.length > 0) {
                  this.scene = 0;
              } else {
                  this.scene = json.scene;
              }
          }
          this.initPlayerAndEnemies();
      }

      initPlayerAndEnemies() {
          let tempHurtPlayerNode;
          let tempHurtEnemyNode;
          this.nodes.forEach(function (node) {
              //save player
              if (node.name === "player") {
                  let primitive = this.meshes[node.mesh].primitives[0];
                  let material = primitive.material;
                  this.player = new playerObject(node, this, material);

              } else if (node.name.includes("enemy")) {
                  let primitive = this.meshes[node.mesh].primitives[0];
                  let material = primitive.material;
                  this.enemies.push(new enemyObject(node, this, material));
              }
              else if (node.name === "player_hurt_floor"){
                  tempHurtPlayerNode = node;
                  node.alive = false;
              }
              else if (node.name === "Goblin_hurt_floor"){
                  tempHurtEnemyNode = node;
                  node.alive = false;
              }

          }.bind(this));

          //save red player
          let primitive = this.meshes[tempHurtPlayerNode.mesh].primitives[0];
          this.player.hurtMaterialIndex = primitive.material;

          //save red enemy
          primitive = this.meshes[tempHurtEnemyNode.mesh].primitives[0];
          this.enemies.forEach(function (enemy) {
              enemy.hurtMaterialIndex = primitive.material;
          }.bind(this));


      }

      initAABB() {
          let weaponScalingFactor = 2.2;     //for weapon collsion
          this.nodes.forEach(function (node2) {
              // copy AABB
              if (typeof this.meshes[node2.mesh] !== 'undefined' && this.meshes[node2.mesh].primitives !== 'undefined') {
                  let accesorNumber = this.meshes[node2.mesh].primitives[0].attributes.POSITION;
                  node2.aabbmin = this.accessors[accesorNumber].min;
                  node2.aabbmax = this.accessors[accesorNumber].max;
                  //setup wepon aabb
                  //weapon has a range equal to boundingbox * weaponScalingFactor
                  scale$4(node2.aabbWeaponMin, this.accessors[accesorNumber].min, weaponScalingFactor);
                  scale$4(node2.aabbWeaponMax, this.accessors[accesorNumber].max, weaponScalingFactor);
                  this.setUpAABB = false;

              }
          }.bind(this));


      }


      updateEnemies(dt) {
          for (var i = 0, len$$1 = this.enemies.length; i < len$$1; i++) {
              let enemy = this.enemies[i];
              if (!enemy.playerDetection) {
                  colliison.resolveEnemyDetectionRange(this.player, enemy, this);
              } else if (enemy.node.alive) {
                  enemy.update( dt);
              }


          }
          keys[Input_AttackButton] = false;
      }


      update(dt) {

          if (this.setUpAABB) {
              this.initAABB();
          }

          this.player.update(dt);
          this.updateEnemies(dt);
      }

      subEnemies(){
          if (--this.awakeEnemies === 0){
              playBackgroundMusic();
          }
      }




  }

  function getJsonLightsFromExtensions(extensions) {
      if (extensions === undefined) {
          return [];
      }
      if (extensions.KHR_lights_punctual === undefined) {
          return [];
      }
      return extensions.KHR_lights_punctual.lights;
  }

  class gltfImageProcessor
  {
      processImages(gltf)
      {
          for (const gltfImage of gltf.images)
          {
              const image = gltfImage.image;
              if (image instanceof HDRImage)
              {
                  continue;
              }

              let newDimensions = undefined;

              if (image.width === image.height)
              {
                  newDimensions = this.processSquareImage(image);
              }
              else
              {
                  newDimensions = this.processNonSquareImage(image);
              }

              if (newDimensions.width === image.width && newDimensions.height === image.height)
              {
                  continue;
              }

              this.resizeImage(image, newDimensions);
          }
      }

      processSquareImage(image)
      {
          const power = nearestPowerOf2(image.height);
          return { width: power, height: power };
      }

      processNonSquareImage(image)
      {
          return { width: nearestPowerOf2(makeEven(image.width)), height: nearestPowerOf2(makeEven(image.height)) };
      }

      resizeImage(image, newDimensions)
      {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = newDimensions.width;
          canvas.height = newDimensions.height;
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          image.src = canvas.toDataURL("image/png");
      }
  }

  class gltfLoader
  {
      static load(gltf, appendix = undefined)
      {
          const buffers = gltfLoader.getBuffers(appendix);
          const additionalFiles = gltfLoader.getAdditionalFiles(appendix);

          const buffersPromise = gltfLoader.loadBuffers(gltf, buffers, additionalFiles);
          const imagesPromise = gltfLoader.loadImages(gltf, additionalFiles)
              .then(() => gltfLoader.processImages(gltf));

          const initGlPromise = Promise.all([buffersPromise, imagesPromise])
              .then(() => gltf.initGl());

          return initGlPromise;
      }

      static unload(gltf)
      {
          for (let image of gltf.images)
          {
              image.image = undefined;
          }
          gltf.images = [];

          for (let texture of gltf.textures)
          {
              texture.destroy();
          }
          gltf.textures = [];

          for (let accessor of gltf.accessors)
          {
              accessor.destroy();
          }
          gltf.accessors = [];
      }

      static getBuffers(appendix)
      {
          return gltfLoader.getTypedAppendix(appendix, ArrayBuffer);
      }

      static getAdditionalFiles(appendix)
      {
          return gltfLoader.getTypedAppendix(appendix, File);
      }

      static getTypedAppendix(appendix, Type)
      {
          if (appendix && appendix.length > 0)
          {
              if (appendix[0] instanceof Type)
              {
                  return appendix;
              }
          }
      }

      static loadBuffers(gltf, buffers, additionalFiles)
      {
          const promises = [];
          if (buffers)
          {
              const count = Math.min(buffers.length, gltf.buffers.length);
              for (let i = 0; i < count; ++i)
              {
                  gltf.buffers[i].buffer = buffers[i];
              }
          }
          else
          {
              for (const buffer of gltf.buffers)
              {
                  promises.push(buffer.load(gltf, additionalFiles));
              }
          }
          return Promise.all(promises);
      }

      static loadImages(gltf, additionalFiles)
      {
          const imagePromises = [];
          for (let image of gltf.images)
          {
              imagePromises.push(image.load(gltf, additionalFiles));
          }
          return Promise.all(imagePromises);
      }

      static processImages(gltf)
      {
          const imageProcessor = new gltfImageProcessor();
          imageProcessor.processImages(gltf);
      }
  }

  class gltfModelPathProvider
  {
      constructor(modelIndexerPath, ignoredVariants = ["glTF-Draco", "glTF-Embedded"])
      {
          this.modelIndexerPath = modelIndexerPath;
          this.ignoredVariants = ignoredVariants;
          this.modelsDictionary = undefined;
      }

      initialize()
      {
          const self = this;
          return axios_min.get(this.modelIndexerPath).then(response =>
          {
              const modelIndexer = response.data;
              self.populateDictionary(modelIndexer);
          });
      }

      resolve(modelKey)
      {
          return this.modelsDictionary[modelKey];
      }

      getAllKeys()
      {
          return Object.keys(this.modelsDictionary);
      }

      pathExists(path)
      {
          return Object.values(this.modelsDictionary).find(p => p === path);
      }

      populateDictionary(modelIndexer)
      {
          const modelsFolder = getContainingFolder(this.modelIndexerPath);
          this.modelsDictionary = {};
          for (const entry of modelIndexer)
          {
              if (entry.variants === undefined)
              {
                  continue;
              }

              for (const variant of Object.keys(entry.variants))
              {
                  if (this.ignoredVariants.includes(variant))
                  {
                      continue;
                  }

                  const fileName = entry.variants[variant];
                  const modelPath = combinePaths(modelsFolder, entry.name, variant, fileName);
                  let modelKey = getFileNameWithoutExtension(fileName);
                  if (variant !== "glTF")
                  {
                      modelKey += " (" + variant.replace("glTF-", "") + ")";
                  }
                  this.modelsDictionary[modelKey] = modelPath;
              }
          }
      }
  }

  class gltfShader
  {
      constructor(program, hash)
      {
          this.program = program;
          this.hash = hash;
          this.uniforms = new Map();
          this.attributes = new Map();
          this.unknownAttributes = [];
          this.unknownUniforms = [];

          if(this.program !== undefined)
          {
              const uniformCount = WebGl.context.getProgramParameter(this.program, WebGl.context.ACTIVE_UNIFORMS);
              for(let i = 0; i < uniformCount; ++i)
              {
                  const info = WebGl.context.getActiveUniform(this.program, i);
                  const loc = WebGl.context.getUniformLocation(this.program, info.name);
                  this.uniforms.set(info.name, {type: info.type, loc: loc});
              }

              const attribCount = WebGl.context.getProgramParameter(this.program, WebGl.context.ACTIVE_ATTRIBUTES);
              for(let i = 0; i < attribCount; ++i)
              {
                  const info = WebGl.context.getActiveAttrib(this.program, i);
                  const loc = WebGl.context.getAttribLocation(this.program, info.name);
                  this.attributes.set(info.name, loc);
              }
          }
      }

      destroy()
      {
          if (this.program !== undefined)
          {
              this.deleteProgram(this.program);
          }

          this.program = undefined;
      }

      getAttributeLocation(name)
      {
          const loc = this.attributes.get(name);
          if (loc === undefined)
          {
              if (this.unknownAttributes.find(n => n === name) === undefined)
              {
                  console.log("Attribute '%s' does not exist", name);
                  this.unknownAttributes.push(name);
              }
              return -1;
          }
          return loc;
      }

      getUniformLocation(name)
      {
          const uniform = this.uniforms.get(name);
          if (uniform === undefined)
          {
              if (this.unknownUniforms.find(n => n === name) === undefined)
              {
                  console.log("Uniform '%s' does not exist", name);
                  this.unknownUniforms.push(name);
              }
              return -1;
          }
          return uniform.loc;
      }

      updateUniform(objectName, object, log = true)
      {
          if (object instanceof UniformStruct)
          {
              this.updateUniformStruct(objectName, object, log);
          }
          else if (Array.isArray(object))
          {
              this.updateUniformArray(objectName, object, log);
          }
          else
          {
              this.updateUniformValue(objectName, object, log);
          }
      }

      updateUniformArray(arrayName, array, log)
      {
          if(array[0] instanceof UniformStruct)
          {
              for (let i = 0; i < array.length; ++i)
              {
                  let element = array[i];
                  let uniformName = arrayName + "[" + i + "]";
                  this.updateUniform(uniformName, element, log);
              }
          }else{
              let uniformName = arrayName + "[0]";

              let flat = [];

              if(Array.isArray(array[0]) || array[0].length !== undefined)
              {
                  for (let i = 0; i < array.length; ++i)
                  {
                      flat.push.apply(flat, Array.from(array[i]));
                  }
              }
              else
              {
                  flat = array;
              }

              if(flat.length === 0)
              {
                  console.error("Failed to flatten uniform array " + uniformName);
                  return;
              }

              this.updateUniformValue(uniformName, flat, log);
          }
      }

      updateUniformStruct(structName, object, log)
      {
          let memberNames = Object.keys(object);
          for (let memberName of memberNames)
          {
              let uniformName = structName + "." + memberName;
              this.updateUniform(uniformName, object[memberName], log);
          }
      }

      // upload the values of a uniform with the given name using type resolve to get correct function call
      updateUniformValue(uniformName, value, log)
      {
          const uniform = this.uniforms.get(uniformName);

          if(uniform !== undefined)
          {
              switch (uniform.type) {
              case WebGl.context.FLOAT:
              {
                  if(Array.isArray(value) || value instanceof Float32Array)
                  {
                      WebGl.context.uniform1fv(uniform.loc, value);
                  }else{
                      WebGl.context.uniform1f(uniform.loc, value);
                  }
                  break;
              }
              case WebGl.context.FLOAT_VEC2: WebGl.context.uniform2fv(uniform.loc, value); break;
              case WebGl.context.FLOAT_VEC3: WebGl.context.uniform3fv(uniform.loc, value); break;
              case WebGl.context.FLOAT_VEC4: WebGl.context.uniform4fv(uniform.loc, value); break;

              case WebGl.context.INT:
              {
                  if(Array.isArray(value) || value instanceof Uint32Array || value instanceof Int32Array)
                  {
                      WebGl.context.uniform1iv(uniform.loc, value);
                  }else{
                      WebGl.context.uniform1i(uniform.loc, value);
                  }
                  break;
              }
              case WebGl.context.INT_VEC2: WebGl.context.uniform2iv(uniform.loc, value); break;
              case WebGl.context.INT_VEC3: WebGl.context.uniform3iv(uniform.loc, value); break;
              case WebGl.context.INT_VEC4: WebGl.context.uniform4iv(uniform.loc, value); break;

              case WebGl.context.FLOAT_MAT2: WebGl.context.uniformMatrix2fv(uniform.loc, false, value); break;
              case WebGl.context.FLOAT_MAT3: WebGl.context.uniformMatrix3fv(uniform.loc, false, value); break;
              case WebGl.context.FLOAT_MAT4: WebGl.context.uniformMatrix4fv(uniform.loc, false, value); break;
              }
          }
          else if(log)
          {
              console.warn("Unkown uniform: " + uniformName);
          }
      }
  }

  // THis class generates and caches the shader source text for a given permutation
  class ShaderCache
  {
      constructor(sources)
      {
          this.sources  = sources; // shader name -> source code
          this.shaders  = new Map(); // name & permutations hashed -> compiled shader
          this.programs = new Map(); // (vertex shader, fragment shader) -> program

          // TODO: remove any // or /* style comments

          // resovle / expande sources (TODO: break include cycles)
          for (let [key, src] of this.sources)
          {
              let changed = false;
              for (let [includeName, includeSource] of this.sources)
              {
                  //var pattern = RegExp(/#include</ + includeName + />/);
                  const pattern = "#include <" + includeName + ">";

                  if(src.includes(pattern))
                  {
                      // only replace the first occurance
                      src = src.replace(pattern, includeSource);

                      // remove the others
                      while (src.includes(pattern))
                      {
                          src = src.replace(pattern, "");
                      }

                      changed = true;
                  }
              }

              if(changed)
              {
                  this.sources.set(key, src);
              }
          }
      }

      destroy()
      {
          for (let [, shader] of this.shaders.entries())
          {
              WebGl.context.deleteShader(shader);
              shader = undefined;
          }

          this.shaders.clear();

          for (let [, program] of this.programs)
          {
              program.destroy();
          }

          this.programs.clear();
      }

      // example args: "pbr.vert", ["NORMALS", "TANGENTS"]
      selectShader(shaderIdentifier, permutationDefines)
      {
          // first check shaders for the exact permutation
          // if not present, check sources and compile it
          // if not present, return null object

          const src = this.sources.get(shaderIdentifier);
          if(src === undefined)
          {
              console.log("Shader source for " + shaderIdentifier + " not found");
              return null;
          }

          const isVert = shaderIdentifier.endsWith(".vert");
          let hash = stringHash(shaderIdentifier);

          // console.log(shaderIdentifier);

          let defines = "";
          for(let define of permutationDefines)
          {
              // console.log(define);
              hash ^= stringHash(define);
              defines += "#define " + define + "\n";
          }

          let shader = this.shaders.get(hash);

          if(shader === undefined)
          {
              // console.log(defines);
              // compile this variant
              shader = WebGl.compileShader(shaderIdentifier, isVert, defines + src);
              this.shaders.set(hash, shader);
          }

          return hash;
      }

      getShaderProgram(vertexShaderHash, fragmentShaderHash)
      {
          const hash = combineHashes(vertexShaderHash, fragmentShaderHash);

          let program = this.programs.get(hash);

          if (program) // program already linked
          {
              return program;
          }
          else // link this shader program type!
          {
              let linkedProg = WebGl.linkProgram(this.shaders.get(vertexShaderHash), this.shaders.get(fragmentShaderHash));
              if(linkedProg)
              {
                  let program = new gltfShader(linkedProg, hash);
                  this.programs.set(hash, program);
                  return program;
              }
          }

          return undefined;
      }
  }

  const UserCameraIndex = "orbit camera";

  class gltfRenderingParameters
  {
      constructor()
      {
          this.environmentName = "Courtyard of the Doge's palace";
          this.useIBL = true;
          this.usePunctual = true;
          this.exposure = 1.0;
          this.clearColor = [169,228,232];
          this.toneMap = "Linear";
          this.useShaderLoD = true;
          this.debugOutput = "None";
          this.sceneIndex = 0;
          this.cameraIndex = UserCameraIndex;
          this.animationTimer = new AnimationTimer();
          this.animationIndex = "all";
          this.skinning = true;
          this.morphing = true;
      }

      userCameraActive()
      {
          return this.cameraIndex === UserCameraIndex;
      }
  }



  const Environments =
  {
      "Courtyard of the Doge's palace": { folder: "doge2", mipLevel: 11, type: ImageMimeType.HDR }
  };

  var metallicRoughnessShader = "\n#ifdef USE_TEX_LOD\n#extension GL_EXT_shader_texture_lod: enable\n#endif\n#extension GL_OES_standard_derivatives : enable\n#ifdef USE_HDR\n#extension GL_OES_texture_float : enable\n#extension GL_OES_texture_float_linear : enable\n#endif\nprecision highp float;\n#define GLSLIFY 1\n#include <tonemapping.glsl>\n#include <textures.glsl>\n#include <functions.glsl>\nstruct Light{vec3 direction;float range;vec3 color;float intensity;vec3 position;float innerConeCos;float outerConeCos;int type;vec2 padding;};const int LightType_Directional=0;const int LightType_Point=1;const int LightType_Spot=2;\n#ifdef USE_PUNCTUAL\nuniform Light u_Lights[LIGHT_COUNT];\n#endif\n#if defined(MATERIAL_SPECULARGLOSSINESS) || defined(MATERIAL_METALLICROUGHNESS)\nuniform float u_MetallicFactor;uniform float u_RoughnessFactor;uniform vec4 u_BaseColorFactor;\n#endif\n#ifdef MATERIAL_SPECULARGLOSSINESS\nuniform vec3 u_SpecularFactor;uniform vec4 u_DiffuseFactor;uniform float u_GlossinessFactor;\n#endif\n#ifdef ALPHAMODE_MASK\nuniform float u_AlphaCutoff;\n#endif\nuniform vec3 u_Camera;uniform int u_MipCount;struct MaterialInfo{float perceptualRoughness;vec3 reflectance0;float alphaRoughness;vec3 diffuseColor;vec3 reflectance90;vec3 specularColor;};\n#ifdef USE_IBL\nvec3 getIBLContribution(MaterialInfo materialInfo,vec3 n,vec3 v){float NdotV=clamp(dot(n,v),0.0,1.0);float lod=clamp(materialInfo.perceptualRoughness*float(u_MipCount),0.0,float(u_MipCount));vec3 reflection=normalize(reflect(-v,n));vec2 brdfSamplePoint=clamp(vec2(NdotV,materialInfo.perceptualRoughness),vec2(0.0,0.0),vec2(1.0,1.0));vec2 brdf=texture2D(u_brdfLUT,brdfSamplePoint).rg;vec4 diffuseSample=textureCube(u_DiffuseEnvSampler,n);\n#ifdef USE_TEX_LOD\nvec4 specularSample=textureCubeLodEXT(u_SpecularEnvSampler,reflection,lod);\n#else\nvec4 specularSample=textureCube(u_SpecularEnvSampler,reflection);\n#endif\n#ifdef USE_HDR\nvec3 diffuseLight=diffuseSample.rgb;vec3 specularLight=specularSample.rgb;\n#else\nvec3 diffuseLight=SRGBtoLINEAR(diffuseSample).rgb;vec3 specularLight=SRGBtoLINEAR(specularSample).rgb;\n#endif\nvec3 diffuse=diffuseLight*materialInfo.diffuseColor;vec3 specular=specularLight*(materialInfo.specularColor*brdf.x+brdf.y);return diffuse+specular;}\n#endif\nvec3 diffuse(MaterialInfo materialInfo){return materialInfo.diffuseColor/M_PI;}vec3 specularReflection(MaterialInfo materialInfo,AngularInfo angularInfo){return materialInfo.reflectance0+(materialInfo.reflectance90-materialInfo.reflectance0)*pow(clamp(1.0-angularInfo.VdotH,0.0,1.0),5.0);}float visibilityOcclusion(MaterialInfo materialInfo,AngularInfo angularInfo){float NdotL=angularInfo.NdotL;float NdotV=angularInfo.NdotV;float alphaRoughnessSq=materialInfo.alphaRoughness*materialInfo.alphaRoughness;float GGXV=NdotL*sqrt(NdotV*NdotV*(1.0-alphaRoughnessSq)+alphaRoughnessSq);float GGXL=NdotV*sqrt(NdotL*NdotL*(1.0-alphaRoughnessSq)+alphaRoughnessSq);float GGX=GGXV+GGXL;if(GGX>0.0){return 0.5/GGX;}return 0.0;}float microfacetDistribution(MaterialInfo materialInfo,AngularInfo angularInfo){float alphaRoughnessSq=materialInfo.alphaRoughness*materialInfo.alphaRoughness;float f=(angularInfo.NdotH*alphaRoughnessSq-angularInfo.NdotH)*angularInfo.NdotH+1.0;return alphaRoughnessSq/(M_PI*f*f);}vec3 getPointShade(vec3 pointToLight,MaterialInfo materialInfo,vec3 normal,vec3 view){AngularInfo angularInfo=getAngularInfo(pointToLight,normal,view);if(angularInfo.NdotL>0.0||angularInfo.NdotV>0.0){vec3 F=specularReflection(materialInfo,angularInfo);float Vis=visibilityOcclusion(materialInfo,angularInfo);float D=microfacetDistribution(materialInfo,angularInfo);vec3 diffuseContrib=(1.0-F)*diffuse(materialInfo);vec3 specContrib=F*Vis*D;return angularInfo.NdotL*(diffuseContrib+specContrib);}return vec3(0.0,0.0,0.0);}float getRangeAttenuation(float range,float distance){if(range<=0.0){return 1.0;}return max(min(1.0-pow(distance/range,4.0),1.0),0.0)/pow(distance,2.0);}float getSpotAttenuation(vec3 pointToLight,vec3 spotDirection,float outerConeCos,float innerConeCos){float actualCos=dot(normalize(spotDirection),normalize(-pointToLight));if(actualCos>outerConeCos){if(actualCos<innerConeCos){return smoothstep(outerConeCos,innerConeCos,actualCos);}return 1.0;}return 0.0;}vec3 applyDirectionalLight(Light light,MaterialInfo materialInfo,vec3 normal,vec3 view){vec3 pointToLight=-light.direction;vec3 shade=getPointShade(pointToLight,materialInfo,normal,view);return light.intensity*light.color*shade;}vec3 applyPointLight(Light light,MaterialInfo materialInfo,vec3 normal,vec3 view){vec3 pointToLight=light.position-v_Position;float distance=length(pointToLight);float attenuation=getRangeAttenuation(light.range,distance);vec3 shade=getPointShade(pointToLight,materialInfo,normal,view);return attenuation*light.intensity*light.color*shade;}vec3 applySpotLight(Light light,MaterialInfo materialInfo,vec3 normal,vec3 view){vec3 pointToLight=light.position-v_Position;float distance=length(pointToLight);float rangeAttenuation=getRangeAttenuation(light.range,distance);float spotAttenuation=getSpotAttenuation(pointToLight,light.direction,light.outerConeCos,light.innerConeCos);vec3 shade=getPointShade(pointToLight,materialInfo,normal,view);return rangeAttenuation*spotAttenuation*light.intensity*light.color*shade;}void main(){float perceptualRoughness=0.0;float metallic=0.0;vec4 baseColor=vec4(0.0,0.0,0.0,1.0);vec3 diffuseColor=vec3(0.0);vec3 specularColor=vec3(0.0);vec3 f0=vec3(0.04);\n#ifdef MATERIAL_SPECULARGLOSSINESS\n#ifdef HAS_SPECULAR_GLOSSINESS_MAP\nvec4 sgSample=SRGBtoLINEAR(texture2D(u_SpecularGlossinessSampler,getSpecularGlossinessUV()));perceptualRoughness=(1.0-sgSample.a*u_GlossinessFactor);f0=sgSample.rgb*u_SpecularFactor;\n#else\nf0=u_SpecularFactor;perceptualRoughness=1.0-u_GlossinessFactor;\n#endif\n#ifdef HAS_DIFFUSE_MAP\nbaseColor=SRGBtoLINEAR(texture2D(u_DiffuseSampler,getDiffuseUV()))*u_DiffuseFactor;\n#else\nbaseColor=u_DiffuseFactor;\n#endif\nbaseColor*=getVertexColor();specularColor=f0;float oneMinusSpecularStrength=1.0-max(max(f0.r,f0.g),f0.b);diffuseColor=baseColor.rgb*oneMinusSpecularStrength;\n#ifdef DEBUG_METALLIC\nmetallic=solveMetallic(baseColor.rgb,specularColor,oneMinusSpecularStrength);\n#endif\n#endif\n#ifdef MATERIAL_METALLICROUGHNESS\n#ifdef HAS_METALLIC_ROUGHNESS_MAP\nvec4 mrSample=texture2D(u_MetallicRoughnessSampler,getMetallicRoughnessUV());perceptualRoughness=mrSample.g*u_RoughnessFactor;metallic=mrSample.b*u_MetallicFactor;\n#else\nmetallic=u_MetallicFactor;perceptualRoughness=u_RoughnessFactor;\n#endif\n#ifdef HAS_BASE_COLOR_MAP\nbaseColor=SRGBtoLINEAR(texture2D(u_BaseColorSampler,getBaseColorUV()))*u_BaseColorFactor;\n#else\nbaseColor=u_BaseColorFactor;\n#endif\nbaseColor*=getVertexColor();diffuseColor=baseColor.rgb*(vec3(1.0)-f0)*(1.0-metallic);specularColor=mix(f0,baseColor.rgb,metallic);\n#endif\n#ifdef ALPHAMODE_MASK\nif(baseColor.a<u_AlphaCutoff){discard;}baseColor.a=1.0;\n#endif\n#ifdef ALPHAMODE_OPAQUE\nbaseColor.a=1.0;\n#endif\n#ifdef MATERIAL_UNLIT\ngl_FragColor=vec4(LINEARtoSRGB(baseColor.rgb),baseColor.a);return;\n#endif\nperceptualRoughness=clamp(perceptualRoughness,0.0,1.0);metallic=clamp(metallic,0.0,1.0);float alphaRoughness=perceptualRoughness*perceptualRoughness;float reflectance=max(max(specularColor.r,specularColor.g),specularColor.b);vec3 specularEnvironmentR0=specularColor.rgb;vec3 specularEnvironmentR90=vec3(clamp(reflectance*50.0,0.0,1.0));MaterialInfo materialInfo=MaterialInfo(perceptualRoughness,specularEnvironmentR0,alphaRoughness,diffuseColor,specularEnvironmentR90,specularColor);vec3 color=vec3(0.0,0.0,0.0);vec3 normal=getNormal();vec3 view=normalize(u_Camera-v_Position);\n#ifdef USE_PUNCTUAL\nfor(int i=0;i<LIGHT_COUNT;++i){Light light=u_Lights[i];if(light.type==LightType_Directional){color+=applyDirectionalLight(light,materialInfo,normal,view);}else if(light.type==LightType_Point){color+=applyPointLight(light,materialInfo,normal,view);}else if(light.type==LightType_Spot){color+=applySpotLight(light,materialInfo,normal,view);}}\n#endif\n#ifdef USE_IBL\ncolor+=getIBLContribution(materialInfo,normal,view);\n#endif\nfloat ao=1.0;\n#ifdef HAS_OCCLUSION_MAP\nao=texture2D(u_OcclusionSampler,getOcclusionUV()).r;color=mix(color,color*ao,u_OcclusionStrength);\n#endif\nvec3 emissive=vec3(0);\n#ifdef HAS_EMISSIVE_MAP\nemissive=SRGBtoLINEAR(texture2D(u_EmissiveSampler,getEmissiveUV())).rgb*u_EmissiveFactor;color+=emissive;\n#endif\n#ifndef DEBUG_OUTPUT\ngl_FragColor=vec4(toneMap(color),baseColor.a);\n#else\n#ifdef DEBUG_METALLIC\ngl_FragColor.rgb=vec3(metallic);\n#endif\n#ifdef DEBUG_ROUGHNESS\ngl_FragColor.rgb=vec3(perceptualRoughness);\n#endif\n#ifdef DEBUG_NORMAL\n#ifdef HAS_NORMAL_MAP\ngl_FragColor.rgb=texture2D(u_NormalSampler,getNormalUV()).rgb;\n#else\ngl_FragColor.rgb=vec3(0.5,0.5,1.0);\n#endif\n#endif\n#ifdef DEBUG_BASECOLOR\ngl_FragColor.rgb=LINEARtoSRGB(baseColor.rgb);\n#endif\n#ifdef DEBUG_OCCLUSION\ngl_FragColor.rgb=vec3(ao);\n#endif\n#ifdef DEBUG_EMISSIVE\ngl_FragColor.rgb=LINEARtoSRGB(emissive);\n#endif\n#ifdef DEBUG_F0\ngl_FragColor.rgb=vec3(f0);\n#endif\n#ifdef DEBUG_ALPHA\ngl_FragColor.rgb=vec3(baseColor.a);\n#endif\ngl_FragColor.a=1.0;\n#endif\n}"; // eslint-disable-line

  var primitiveShader = "#define GLSLIFY 1\n#include <animation.glsl>\nattribute vec4 a_Position;varying vec3 v_Position;\n#ifdef HAS_NORMALS\nattribute vec4 a_Normal;\n#endif\n#ifdef HAS_TANGENTS\nattribute vec4 a_Tangent;\n#endif\n#ifdef HAS_NORMALS\n#ifdef HAS_TANGENTS\nvarying mat3 v_TBN;\n#else\nvarying vec3 v_Normal;\n#endif\n#endif\n#ifdef HAS_UV_SET1\nattribute vec2 a_UV1;\n#endif\n#ifdef HAS_UV_SET2\nattribute vec2 a_UV2;\n#endif\nvarying vec2 v_UVCoord1;varying vec2 v_UVCoord2;\n#ifdef HAS_VERTEX_COLOR_VEC3\nattribute vec3 a_Color;varying vec3 v_Color;\n#endif\n#ifdef HAS_VERTEX_COLOR_VEC4\nattribute vec4 a_Color;varying vec4 v_Color;\n#endif\nuniform mat4 u_ViewProjectionMatrix;uniform mat4 u_ModelMatrix;uniform mat4 u_NormalMatrix;vec4 getPosition(){vec4 pos=a_Position;\n#ifdef USE_MORPHING\npos+=getTargetPosition();\n#endif\n#ifdef USE_SKINNING\npos=getSkinningMatrix()*pos;\n#endif\nreturn pos;}\n#ifdef HAS_NORMALS\nvec4 getNormal(){vec4 normal=a_Normal;\n#ifdef USE_MORPHING\nnormal+=getTargetNormal();\n#endif\n#ifdef USE_SKINNING\nnormal=getSkinningNormalMatrix()*normal;\n#endif\nreturn normalize(normal);}\n#endif\n#ifdef HAS_TANGENTS\nvec4 getTangent(){vec4 tangent=a_Tangent;\n#ifdef USE_MORPHING\ntangent+=getTargetTangent();\n#endif\n#ifdef USE_SKINNING\ntangent=getSkinningMatrix()*tangent;\n#endif\nreturn normalize(tangent);}\n#endif\nvoid main(){vec4 pos=u_ModelMatrix*getPosition();v_Position=vec3(pos.xyz)/pos.w;\n#ifdef HAS_NORMALS\n#ifdef HAS_TANGENTS\nvec4 tangent=getTangent();vec3 normalW=normalize(vec3(u_NormalMatrix*vec4(getNormal().xyz,0.0)));vec3 tangentW=normalize(vec3(u_ModelMatrix*vec4(tangent.xyz,0.0)));vec3 bitangentW=cross(normalW,tangentW)*tangent.w;v_TBN=mat3(tangentW,bitangentW,normalW);\n#else\nv_Normal=normalize(vec3(u_NormalMatrix*vec4(getNormal().xyz,0.0)));\n#endif\n#endif\nv_UVCoord1=vec2(0.0,0.0);v_UVCoord2=vec2(0.0,0.0);\n#ifdef HAS_UV_SET1\nv_UVCoord1=a_UV1;\n#endif\n#ifdef HAS_UV_SET2\nv_UVCoord2=a_UV2;\n#endif\n#if defined(HAS_VERTEX_COLOR_VEC3) || defined(HAS_VERTEX_COLOR_VEC4)\nv_Color=a_Color;\n#endif\ngl_Position=u_ViewProjectionMatrix*pos;}"; // eslint-disable-line

  var texturesShader = "#define GLSLIFY 1\nvarying vec2 v_UVCoord1;varying vec2 v_UVCoord2;\n#ifdef HAS_NORMAL_MAP\nuniform sampler2D u_NormalSampler;uniform float u_NormalScale;uniform int u_NormalUVSet;uniform mat3 u_NormalUVTransform;\n#endif\n#ifdef HAS_EMISSIVE_MAP\nuniform sampler2D u_EmissiveSampler;uniform int u_EmissiveUVSet;uniform vec3 u_EmissiveFactor;uniform mat3 u_EmissiveUVTransform;\n#endif\n#ifdef HAS_OCCLUSION_MAP\nuniform sampler2D u_OcclusionSampler;uniform int u_OcclusionUVSet;uniform float u_OcclusionStrength;uniform mat3 u_OcclusionUVTransform;\n#endif\n#ifdef HAS_BASE_COLOR_MAP\nuniform sampler2D u_BaseColorSampler;uniform int u_BaseColorUVSet;uniform mat3 u_BaseColorUVTransform;\n#endif\n#ifdef HAS_METALLIC_ROUGHNESS_MAP\nuniform sampler2D u_MetallicRoughnessSampler;uniform int u_MetallicRoughnessUVSet;uniform mat3 u_MetallicRoughnessUVTransform;\n#endif\n#ifdef HAS_DIFFUSE_MAP\nuniform sampler2D u_DiffuseSampler;uniform int u_DiffuseUVSet;uniform mat3 u_DiffuseUVTransform;\n#endif\n#ifdef HAS_SPECULAR_GLOSSINESS_MAP\nuniform sampler2D u_SpecularGlossinessSampler;uniform int u_SpecularGlossinessUVSet;uniform mat3 u_SpecularGlossinessUVTransform;\n#endif\n#ifdef USE_IBL\nuniform samplerCube u_DiffuseEnvSampler;uniform samplerCube u_SpecularEnvSampler;uniform sampler2D u_brdfLUT;\n#endif\nvec2 getNormalUV(){vec3 uv=vec3(v_UVCoord1,1.0);\n#ifdef HAS_NORMAL_MAP\nuv.xy=u_NormalUVSet<1 ? v_UVCoord1 : v_UVCoord2;\n#ifdef HAS_NORMAL_UV_TRANSFORM\nuv*=u_NormalUVTransform;\n#endif\n#endif\nreturn uv.xy;}vec2 getEmissiveUV(){vec3 uv=vec3(v_UVCoord1,1.0);\n#ifdef HAS_EMISSIVE_MAP\nuv.xy=u_EmissiveUVSet<1 ? v_UVCoord1 : v_UVCoord2;\n#ifdef HAS_EMISSIVE_UV_TRANSFORM\nuv*=u_EmissiveUVTransform;\n#endif\n#endif\nreturn uv.xy;}vec2 getOcclusionUV(){vec3 uv=vec3(v_UVCoord1,1.0);\n#ifdef HAS_OCCLUSION_MAP\nuv.xy=u_OcclusionUVSet<1 ? v_UVCoord1 : v_UVCoord2;\n#ifdef HAS_OCCLSION_UV_TRANSFORM\nuv*=u_OcclusionUVTransform;\n#endif\n#endif\nreturn uv.xy;}vec2 getBaseColorUV(){vec3 uv=vec3(v_UVCoord1,1.0);\n#ifdef HAS_BASE_COLOR_MAP\nuv.xy=u_BaseColorUVSet<1 ? v_UVCoord1 : v_UVCoord2;\n#ifdef HAS_BASECOLOR_UV_TRANSFORM\nuv*=u_BaseColorUVTransform;\n#endif\n#endif\nreturn uv.xy;}vec2 getMetallicRoughnessUV(){vec3 uv=vec3(v_UVCoord1,1.0);\n#ifdef HAS_METALLIC_ROUGHNESS_MAP\nuv.xy=u_MetallicRoughnessUVSet<1 ? v_UVCoord1 : v_UVCoord2;\n#ifdef HAS_METALLICROUGHNESS_UV_TRANSFORM\nuv*=u_MetallicRoughnessUVTransform;\n#endif\n#endif\nreturn uv.xy;}vec2 getSpecularGlossinessUV(){vec3 uv=vec3(v_UVCoord1,1.0);\n#ifdef HAS_SPECULAR_GLOSSINESS_MAP\nuv.xy=u_SpecularGlossinessUVSet<1 ? v_UVCoord1 : v_UVCoord2;\n#ifdef HAS_SPECULARGLOSSINESS_UV_TRANSFORM\nuv*=u_SpecularGlossinessUVTransform;\n#endif\n#endif\nreturn uv.xy;}vec2 getDiffuseUV(){vec3 uv=vec3(v_UVCoord1,1.0);\n#ifdef HAS_DIFFUSE_MAP\nuv.xy=u_DiffuseUVSet<1 ? v_UVCoord1 : v_UVCoord2;\n#ifdef HAS_DIFFUSE_UV_TRANSFORM\nuv*=u_DiffuseUVTransform;\n#endif\n#endif\nreturn uv.xy;}"; // eslint-disable-line

  var tonemappingShader = "#define GLSLIFY 1\nuniform float u_Exposure;const float GAMMA=2.2;const float INV_GAMMA=1.0/GAMMA;vec3 LINEARtoSRGB(vec3 color){return pow(color,vec3(INV_GAMMA));}vec4 SRGBtoLINEAR(vec4 srgbIn){return vec4(pow(srgbIn.xyz,vec3(GAMMA)),srgbIn.w);}vec3 toneMapUncharted2Impl(vec3 color){const float A=0.15;const float B=0.50;const float C=0.10;const float D=0.20;const float E=0.02;const float F=0.30;return((color*(A*color+C*B)+D*E)/(color*(A*color+B)+D*F))-E/F;}vec3 toneMapUncharted(vec3 color){const float W=11.2;color=toneMapUncharted2Impl(color*2.0);vec3 whiteScale=1.0/toneMapUncharted2Impl(vec3(W));return LINEARtoSRGB(color*whiteScale);}vec3 toneMapHejlRichard(vec3 color){color=max(vec3(0.0),color-vec3(0.004));return(color*(6.2*color+.5))/(color*(6.2*color+1.7)+0.06);}vec3 toneMapACES(vec3 color){const float A=2.51;const float B=0.03;const float C=2.43;const float D=0.59;const float E=0.14;return LINEARtoSRGB(clamp((color*(A*color+B))/(color*(C*color+D)+E),0.0,1.0));}vec3 toneMap(vec3 color){color*=u_Exposure;\n#ifdef TONEMAP_UNCHARTED\nreturn toneMapUncharted(color);\n#endif\n#ifdef TONEMAP_HEJLRICHARD\nreturn toneMapHejlRichard(color);\n#endif\n#ifdef TONEMAP_ACES\nreturn toneMapACES(color);\n#endif\nreturn LINEARtoSRGB(color);}"; // eslint-disable-line

  var shaderFunctions = "#define GLSLIFY 1\nconst float M_PI=3.141592653589793;const float c_MinReflectance=0.04;varying vec3 v_Position;\n#ifdef HAS_NORMALS\n#ifdef HAS_TANGENTS\nvarying mat3 v_TBN;\n#else\nvarying vec3 v_Normal;\n#endif\n#endif\n#ifdef HAS_VERTEX_COLOR_VEC3\nvarying vec3 v_Color;\n#endif\n#ifdef HAS_VERTEX_COLOR_VEC4\nvarying vec4 v_Color;\n#endif\nstruct AngularInfo{float NdotL;float NdotV;float NdotH;float LdotH;float VdotH;vec3 padding;};vec4 getVertexColor(){vec4 color=vec4(1.0,1.0,1.0,1.0);\n#ifdef HAS_VERTEX_COLOR_VEC3\ncolor.rgb=v_Color;\n#endif\n#ifdef HAS_VERTEX_COLOR_VEC4\ncolor=v_Color;\n#endif\nreturn color;}vec3 getNormal(){vec2 UV=getNormalUV();\n#ifndef HAS_TANGENTS\nvec3 pos_dx=dFdx(v_Position);vec3 pos_dy=dFdy(v_Position);vec3 tex_dx=dFdx(vec3(UV,0.0));vec3 tex_dy=dFdy(vec3(UV,0.0));vec3 t=(tex_dy.t*pos_dx-tex_dx.t*pos_dy)/(tex_dx.s*tex_dy.t-tex_dy.s*tex_dx.t);\n#ifdef HAS_NORMALS\nvec3 ng=normalize(v_Normal);\n#else\nvec3 ng=cross(pos_dx,pos_dy);\n#endif\nt=normalize(t-ng*dot(ng,t));vec3 b=normalize(cross(ng,t));mat3 tbn=mat3(t,b,ng);\n#else\nmat3 tbn=v_TBN;\n#endif\n#ifdef HAS_NORMAL_MAP\nvec3 n=texture2D(u_NormalSampler,UV).rgb;n=normalize(tbn*((2.0*n-1.0)*vec3(u_NormalScale,u_NormalScale,1.0)));\n#else\nvec3 n=normalize(tbn[2].xyz);\n#endif\nreturn n;}float getPerceivedBrightness(vec3 vector){return sqrt(0.299*vector.r*vector.r+0.587*vector.g*vector.g+0.114*vector.b*vector.b);}float solveMetallic(vec3 diffuse,vec3 specular,float oneMinusSpecularStrength){float specularBrightness=getPerceivedBrightness(specular);if(specularBrightness<c_MinReflectance){return 0.0;}float diffuseBrightness=getPerceivedBrightness(diffuse);float a=c_MinReflectance;float b=diffuseBrightness*oneMinusSpecularStrength/(1.0-c_MinReflectance)+specularBrightness-2.0*c_MinReflectance;float c=c_MinReflectance-specularBrightness;float D=b*b-4.0*a*c;return clamp((-b+sqrt(D))/(2.0*a),0.0,1.0);}AngularInfo getAngularInfo(vec3 pointToLight,vec3 normal,vec3 view){vec3 n=normalize(normal);vec3 v=normalize(view);vec3 l=normalize(pointToLight);vec3 h=normalize(l+v);float NdotL=clamp(dot(n,l),0.0,1.0);float NdotV=clamp(dot(n,v),0.0,1.0);float NdotH=clamp(dot(n,h),0.0,1.0);float LdotH=clamp(dot(l,h),0.0,1.0);float VdotH=clamp(dot(v,h),0.0,1.0);return AngularInfo(NdotL,NdotV,NdotH,LdotH,VdotH,vec3(0,0,0));}"; // eslint-disable-line

  var animationShader = "#define GLSLIFY 1\n#ifdef HAS_TARGET_POSITION0\nattribute vec3 a_Target_Position0;\n#endif\n#ifdef HAS_TARGET_POSITION1\nattribute vec3 a_Target_Position1;\n#endif\n#ifdef HAS_TARGET_POSITION2\nattribute vec3 a_Target_Position2;\n#endif\n#ifdef HAS_TARGET_POSITION3\nattribute vec3 a_Target_Position3;\n#endif\n#ifdef HAS_TARGET_POSITION4\nattribute vec3 a_Target_Position4;\n#endif\n#ifdef HAS_TARGET_POSITION5\nattribute vec3 a_Target_Position5;\n#endif\n#ifdef HAS_TARGET_POSITION6\nattribute vec3 a_Target_Position6;\n#endif\n#ifdef HAS_TARGET_POSITION7\nattribute vec3 a_Target_Position7;\n#endif\n#ifdef HAS_TARGET_NORMAL0\nattribute vec3 a_Target_Normal0;\n#endif\n#ifdef HAS_TARGET_NORMAL1\nattribute vec3 a_Target_Normal1;\n#endif\n#ifdef HAS_TARGET_NORMAL2\nattribute vec3 a_Target_Normal2;\n#endif\n#ifdef HAS_TARGET_NORMAL3\nattribute vec3 a_Target_Normal3;\n#endif\n#ifdef HAS_TARGET_TANGENT0\nattribute vec3 a_Target_Tangent0;\n#endif\n#ifdef HAS_TARGET_TANGENT1\nattribute vec3 a_Target_Tangent1;\n#endif\n#ifdef HAS_TARGET_TANGENT2\nattribute vec3 a_Target_Tangent2;\n#endif\n#ifdef HAS_TARGET_TANGENT3\nattribute vec3 a_Target_Tangent3;\n#endif\n#ifdef USE_MORPHING\nuniform float u_morphWeights[WEIGHT_COUNT];\n#endif\n#ifdef HAS_JOINT_SET1\nattribute vec4 a_Joint1;\n#endif\n#ifdef HAS_JOINT_SET2\nattribute vec4 a_Joint2;\n#endif\n#ifdef HAS_WEIGHT_SET1\nattribute vec4 a_Weight1;\n#endif\n#ifdef HAS_WEIGHT_SET2\nattribute vec4 a_Weight2;\n#endif\n#ifdef USE_SKINNING\nuniform mat4 u_jointMatrix[JOINT_COUNT];uniform mat4 u_jointNormalMatrix[JOINT_COUNT];\n#endif\n#ifdef USE_SKINNING\nmat4 getSkinningMatrix(){mat4 skin=mat4(0);\n#if defined(HAS_WEIGHT_SET1) && defined(HAS_JOINT_SET1)\nskin+=a_Weight1.x*u_jointMatrix[int(a_Joint1.x)]+a_Weight1.y*u_jointMatrix[int(a_Joint1.y)]+a_Weight1.z*u_jointMatrix[int(a_Joint1.z)]+a_Weight1.w*u_jointMatrix[int(a_Joint1.w)];\n#endif\n#if defined(HAS_WEIGHT_SET2) && defined(HAS_JOINT_SET2)\nskin+=a_Weight2.x*u_jointMatrix[int(a_Joint2.x)]+a_Weight2.y*u_jointMatrix[int(a_Joint2.y)]+a_Weight2.z*u_jointMatrix[int(a_Joint2.z)]+a_Weight2.w*u_jointMatrix[int(a_Joint2.w)];\n#endif\nreturn skin;}mat4 getSkinningNormalMatrix(){mat4 skin=mat4(0);\n#if defined(HAS_WEIGHT_SET1) && defined(HAS_JOINT_SET1)\nskin+=a_Weight1.x*u_jointNormalMatrix[int(a_Joint1.x)]+a_Weight1.y*u_jointNormalMatrix[int(a_Joint1.y)]+a_Weight1.z*u_jointNormalMatrix[int(a_Joint1.z)]+a_Weight1.w*u_jointNormalMatrix[int(a_Joint1.w)];\n#endif\n#if defined(HAS_WEIGHT_SET2) && defined(HAS_JOINT_SET2)\nskin+=a_Weight2.x*u_jointNormalMatrix[int(a_Joint2.x)]+a_Weight2.y*u_jointNormalMatrix[int(a_Joint2.y)]+a_Weight2.z*u_jointNormalMatrix[int(a_Joint2.z)]+a_Weight2.w*u_jointNormalMatrix[int(a_Joint2.w)];\n#endif\nreturn skin;}\n#endif\n#ifdef USE_MORPHING\nvec4 getTargetPosition(){vec4 pos=vec4(0);\n#ifdef HAS_TARGET_POSITION0\npos.xyz+=u_morphWeights[0]*a_Target_Position0;\n#endif\n#ifdef HAS_TARGET_POSITION1\npos.xyz+=u_morphWeights[1]*a_Target_Position1;\n#endif\n#ifdef HAS_TARGET_POSITION2\npos.xyz+=u_morphWeights[2]*a_Target_Position2;\n#endif\n#ifdef HAS_TARGET_POSITION3\npos.xyz+=u_morphWeights[3]*a_Target_Position3;\n#endif\n#ifdef HAS_TARGET_POSITION4\npos.xyz+=u_morphWeights[4]*a_Target_Position4;\n#endif\nreturn pos;}vec4 getTargetNormal(){vec4 normal=vec4(0);\n#ifdef HAS_TARGET_NORMAL0\nnormal.xyz+=u_morphWeights[0]*a_Target_Normal0;\n#endif\n#ifdef HAS_TARGET_NORMAL1\nnormal.xyz+=u_morphWeights[1]*a_Target_Normal1;\n#endif\n#ifdef HAS_TARGET_NORMAL2\nnormal.xyz+=u_morphWeights[2]*a_Target_Normal2;\n#endif\n#ifdef HAS_TARGET_NORMAL3\nnormal.xyz+=u_morphWeights[3]*a_Target_Normal3;\n#endif\n#ifdef HAS_TARGET_NORMAL4\nnormal.xyz+=u_morphWeights[4]*a_Target_Normal4;\n#endif\nreturn normal;}vec4 getTargetTangent(){vec4 tangent=vec4(0);\n#ifdef HAS_TARGET_TANGENT0\ntangent.xyz+=u_morphWeights[0]*a_Target_Tangent0;\n#endif\n#ifdef HAS_TARGET_TANGENT1\ntangent.xyz+=u_morphWeights[1]*a_Target_Tangent1;\n#endif\n#ifdef HAS_TARGET_TANGENT2\ntangent.xyz+=u_morphWeights[2]*a_Target_Tangent2;\n#endif\n#ifdef HAS_TARGET_TANGENT3\ntangent.xyz+=u_morphWeights[3]*a_Target_Tangent3;\n#endif\n#ifdef HAS_TARGET_TANGENT4\ntangent.xyz+=u_morphWeights[4]*a_Target_Tangent4;\n#endif\nreturn tangent;}\n#endif\n"; // eslint-disable-line

  class gltfRenderer {
      constructor(canvas, defaultCamera, parameters) {
          this.canvas = canvas;
          this.defaultCamera = defaultCamera;
          this.parameters = parameters;
          this.shader = undefined; // current shader

          this.currentWidth = 0;
          this.currentHeight = 0;

          const shaderSources = new Map();
          shaderSources.set("primitive.vert", primitiveShader);
          shaderSources.set("metallic-roughness.frag", metallicRoughnessShader);
          shaderSources.set("tonemapping.glsl", tonemappingShader);
          shaderSources.set("textures.glsl", texturesShader);
          shaderSources.set("functions.glsl", shaderFunctions);
          shaderSources.set("animation.glsl", animationShader);

          this.shaderCache = new ShaderCache(shaderSources);

          let requiredWebglExtensions = [
              "EXT_shader_texture_lod",
              "OES_standard_derivatives",
              "OES_element_index_uint",
              "EXT_texture_filter_anisotropic",
              "OES_texture_float",
              "OES_texture_float_linear"
          ];

          WebGl.loadWebGlExtensions(requiredWebglExtensions);
          // use shader lod ext if requested and supported
          this.parameters.useShaderLoD = this.parameters.useShaderLoD && WebGl.context.getExtension("EXT_shader_texture_lod") !== null;

          this.visibleLights = [];

          this.viewMatrix = create$3();
          this.projMatrix = create$3();
          this.viewProjectionMatrix = create$3();

          this.currentCameraPosition = create$4();

          this.init();
          this.resize(canvas.clientWidth, canvas.clientHeight);
      }

      /////////////////////////////////////////////////////////////////////
      // Render glTF scene graph
      /////////////////////////////////////////////////////////////////////

      // app state
      init() {
          if (!this.parameters.useShaderLoD) {
              this.parameters.useIBL = false;
              this.parameters.usePunctual = true;
          }

          //TODO: To achieve correct rendering, WebGL runtimes must disable such conversions by setting UNPACK_COLORSPACE_CONVERSION_WEBGL flag to NONE
          WebGl.context.enable(WebGl.context.DEPTH_TEST);
          WebGl.context.depthFunc(WebGl.context.LEQUAL);
          WebGl.context.colorMask(true, true, true, true);
          WebGl.context.clearDepth(1.0);
      }

      resize(width, height) {
          if (this.currentWidth !== width || this.currentHeight !== height) {
              this.canvas.width = width;
              this.canvas.height = height;
              this.currentHeight = height;
              this.currentWidth = width;
              WebGl.context.viewport(0, 0, width, height);
          }
      }

      // frame state
      newFrame() {
          WebGl.context.clearColor(this.parameters.clearColor[0] / 255.0, this.parameters.clearColor[1] / 255.0, this.parameters.clearColor[2] / 255.0, 1.0);
          WebGl.context.clear(WebGl.context.COLOR_BUFFER_BIT | WebGl.context.DEPTH_BUFFER_BIT);
      }

      // render complete gltf scene with given camera
      drawScene(gltf, scene, sortByDepth, predicateDrawPrimivitve) {
          let currentCamera = undefined;

          if (!this.parameters.userCameraActive()) {
              currentCamera = gltf.cameras[this.parameters.cameraIndex].clone();
          } else {
              currentCamera = this.defaultCamera;
          }

          currentCamera.aspectRatio = this.currentWidth / this.currentHeight;

          this.projMatrix = currentCamera.getProjectionMatrix();
          this.viewMatrix = currentCamera.getViewMatrix(gltf);
          this.currentCameraPosition = currentCamera.getPosition(gltf);

          this.visibleLights = this.getVisibleLights(gltf, scene);

          multiply$3(this.viewProjectionMatrix, this.projMatrix, this.viewMatrix);

          const nodes = scene.gatherNodes(gltf);

          // Update skins.
          for (const node of nodes) {
              if (node.mesh !== undefined && node.skin !== undefined) {
                  this.updateSkin(gltf, node);
              }
          }

          if (!sortByDepth) {
              for (const node of nodes) {
                  let mesh = gltf.meshes[node.mesh];
                  if (node.alive) {
                      if (mesh !== undefined) {
                          for (let primitive of mesh.primitives) {
                              if (predicateDrawPrimivitve ? predicateDrawPrimivitve(primitive) : true) {
                                  this.drawPrimitive(gltf, primitive, node, this.viewProjectionMatrix);
                              }
                          }
                      }
                  }

              }
          } else {
              const sortedPrimitives = currentCamera.sortPrimitivesByDepth(gltf, nodes);

              for (const sortedPrimitive of sortedPrimitives) {
                  if (predicateDrawPrimivitve ? predicateDrawPrimivitve(sortedPrimitive.primitive) : true) {
                      this.drawPrimitive(gltf, sortedPrimitive.primitive, sortedPrimitive.node, this.viewProjectionMatrix);
                  }
              }
          }
      }

      // vertices with given material
      drawPrimitive(gltf, primitive, node, viewProjectionMatrix) {
          if (primitive.skip) return;

          const material = gltf.materials[primitive.material];

          //select shader permutation, compile and link program.

          let vertDefines = [];
          this.pushVertParameterDefines(vertDefines, gltf, node, primitive);
          vertDefines = primitive.getDefines().concat(vertDefines);

          let fragDefines = material.getDefines().concat(vertDefines);
          this.pushFragParameterDefines(fragDefines);

          const fragmentHash = this.shaderCache.selectShader(material.getShaderIdentifier(), fragDefines);
          const vertexHash = this.shaderCache.selectShader(primitive.getShaderIdentifier(), vertDefines);

          if (fragmentHash && vertexHash) {
              this.shader = this.shaderCache.getShaderProgram(fragmentHash, vertexHash);
          }

          if (this.shader === undefined) {
              return;
          }

          WebGl.context.useProgram(this.shader.program);

          if (this.parameters.usePunctual) {
              this.applyLights(gltf);
          }

          // update model dependant matrices once per node
          this.shader.updateUniform("u_ViewProjectionMatrix", viewProjectionMatrix);
          this.shader.updateUniform("u_ModelMatrix", node.worldTransform);
          this.shader.updateUniform("u_NormalMatrix", node.normalMatrix, false);
          this.shader.updateUniform("u_Exposure", this.parameters.exposure, false);
          this.shader.updateUniform("u_Camera", this.currentCameraPosition, false);

          this.updateAnimationUniforms(gltf, node, primitive);

          if (material.doubleSided) {
              WebGl.context.disable(WebGl.context.CULL_FACE);
          } else {
              WebGl.context.enable(WebGl.context.CULL_FACE);
          }

          if (material.alphaMode === 'BLEND') {
              WebGl.context.enable(WebGl.context.BLEND);
              WebGl.context.blendFuncSeparate(WebGl.context.SRC_ALPHA, WebGl.context.ONE_MINUS_SRC_ALPHA, WebGl.context.ONE, WebGl.context.ONE_MINUS_SRC_ALPHA);
              WebGl.context.blendEquation(WebGl.context.FUNC_ADD);
          } else {
              WebGl.context.disable(WebGl.context.BLEND);
          }

          const drawIndexed = primitive.indices !== undefined;
          if (drawIndexed) {
              if (!WebGl.setIndices(gltf, primitive.indices)) {
                  return;
              }
          }

          let vertexCount = 0;
          for (const attribute of primitive.glAttributes) {
              const gltfAccessor = gltf.accessors[attribute.accessor];
              vertexCount = gltfAccessor.count;

              const location = this.shader.getAttributeLocation(attribute.name);
              if (location < 0) {
                  continue; // only skip this attribute
              }
              if (!WebGl.enableAttribute(gltf, location, gltfAccessor)) {
                  return; // skip this primitive
              }
          }

          for (let [uniform, val] of material.getProperties().entries()) {
              this.shader.updateUniform(uniform, val);
          }

          for (let i = 0; i < material.textures.length; ++i) {
              let info = material.textures[i];
              const location = this.shader.getUniformLocation(info.samplerName);
              if (location < 0) {
                  continue; // only skip this texture
              }
              if (!WebGl.setTexture(location, gltf, info, i)) // binds texture and sampler
              {
                  return; // skip this material
              }
          }

          if (this.parameters.useIBL) {
              this.applyEnvironmentMap(gltf, material.textures.length);
          }

          if (drawIndexed) {
              const indexAccessor = gltf.accessors[primitive.indices];
              WebGl.context.drawElements(primitive.mode, indexAccessor.count, indexAccessor.componentType, 0);
          } else {
              WebGl.context.drawArrays(primitive.mode, 0, vertexCount);
          }

          for (const attribute of primitive.glAttributes) {
              const location = this.shader.getAttributeLocation(attribute.name);
              if (location < 0) {
                  continue; // skip this attribute
              }
              WebGl.context.disableVertexAttribArray(location);
          }
      }

      // returns all lights that are relevant for rendering or the default light if there are none
      getVisibleLights(gltf, scene) {
          let lights = [];
          for (let light of gltf.lights) {
              if (light.node !== undefined) {
                  if (scene.includesNode(gltf, light.node)) {
                      lights.push(light);
                  }
              }
          }
          return lights.length > 0 ? lights : [new gltfLight()];
      }

      updateSkin(gltf, node) {
          if (this.parameters.skinning && gltf.skins !== undefined) // && !this.parameters.animationTimer.paused
          {
              const skin = gltf.skins[node.skin];
              skin.computeJoints(gltf, node);
          }
      }

      pushVertParameterDefines(vertDefines, gltf, node, primitive) {
          // skinning
          if (this.parameters.skinning && node.skin !== undefined && primitive.hasWeights && primitive.hasJoints) {
              const skin = gltf.skins[node.skin];

              vertDefines.push("USE_SKINNING 1");
              vertDefines.push("JOINT_COUNT " + skin.jointMatrices.length);
          }

          // morphing
          if (this.parameters.morphing && node.mesh !== undefined && primitive.targets.length > 0) {
              const mesh = gltf.meshes[node.mesh];
              if (mesh.weights !== undefined && mesh.weights.length > 0) {
                  vertDefines.push("USE_MORPHING 1");
                  vertDefines.push("WEIGHT_COUNT " + Math.min(mesh.weights.length, 8));
              }
          }
      }

      updateAnimationUniforms(gltf, node, primitive) {
          if (this.parameters.skinning && node.skin !== undefined && primitive.hasWeights && primitive.hasJoints) {
              const skin = gltf.skins[node.skin];

              this.shader.updateUniform("u_jointMatrix", skin.jointMatrices);
              this.shader.updateUniform("u_jointNormalMatrix", skin.jointNormalMatrices);
          }

          if (this.parameters.morphing && node.mesh !== undefined && primitive.targets.length > 0) {
              const mesh = gltf.meshes[node.mesh];
              if (mesh.weights !== undefined && mesh.weights.length > 0) {
                  this.shader.updateUniformArray("u_morphWeights", mesh.weights);
              }
          }
      }

      pushFragParameterDefines(fragDefines) {
          if (this.parameters.usePunctual) {
              fragDefines.push("USE_PUNCTUAL 1");
              fragDefines.push("LIGHT_COUNT " + this.visibleLights.length);
          }

          if (this.parameters.useIBL) {
              fragDefines.push("USE_IBL 1");
          }

          if (this.parameters.useShaderLoD) {
              fragDefines.push("USE_TEX_LOD 1");
          }

          if (Environments[this.parameters.environmentName].type === ImageMimeType.HDR) {
              fragDefines.push("USE_HDR 1");
          }


      }

      applyLights(gltf) {
          let uniformLights = [];
          for (let light of this.visibleLights) {
              uniformLights.push(light.toUniform(gltf));
          }

          this.shader.updateUniform("u_Lights", uniformLights);
      }

      applyEnvironmentMap(gltf, texSlotOffset) {
          if (gltf.envData === undefined) {
              let linear = true;
              if (Environments[this.parameters.environmentName].type !== ImageMimeType.HDR) {
                  linear = false;
              }

              gltf.envData = {};
              gltf.envData.diffuseEnvMap = new gltfTextureInfo(gltf.textures.length - 3, 0, linear);
              gltf.envData.specularEnvMap = new gltfTextureInfo(gltf.textures.length - 2, 0, linear);
              gltf.envData.lut = new gltfTextureInfo(gltf.textures.length - 1);
              gltf.envData.specularEnvMap.generateMips = false;
              gltf.envData.lut.generateMips = false;
          }

          WebGl.setTexture(this.shader.getUniformLocation("u_DiffuseEnvSampler"), gltf, gltf.envData.diffuseEnvMap, texSlotOffset);
          WebGl.setTexture(this.shader.getUniformLocation("u_SpecularEnvSampler"), gltf, gltf.envData.specularEnvMap, texSlotOffset + 1);
          WebGl.setTexture(this.shader.getUniformLocation("u_brdfLUT"), gltf, gltf.envData.lut, texSlotOffset + 2);

          const mipCount = Environments[this.parameters.environmentName].mipLevel;
          this.shader.updateUniform("u_MipCount", mipCount);
      }

      destroy() {
          this.shaderCache.destroy();
      }
  }

  const VecZero = create$4();

  class UserCamera extends gltfCamera {
      constructor(
          viewer,
          position = [0, 0, 0],
          target = [0, 0, 0],
          up = [0, 1, 0],
          xRot = 0,
          yRot = 0,
          //how much we zoom in
          zoom) {
          super();

          this.position = jsToGl(position);
          this.target = jsToGl(target);
          this.up = jsToGl(up);
          this.xRot = xRot;
          this.yRot = yRot;
          //zoom at the begining
          this.initialZoom = 0.022;
          this.zoom = this.initialZoom;
          this.zoomFactor = 1.04;
          this.rotateSpeed = 1 / 180;
          this.scaleFactor = 100;
          this.viewer = viewer;
          //scaler for player translation
          this.scale = 0.00183;
      }

      updatePosition() {

          this.moveTarget();
          //camera direction
          const direction = fromValues$4(1, 0.3, 0);
          this.toLocalRotation(direction);

          const position = create$4();
          scale$4(position, direction, this.zoom);
          add$4(position, position, this.target);

          this.position = position;
      }

      reset() {
          this.xRot = 0;
          this.yRot = 0;
          this.zoom = this.initialZoom;
      }

      zoomIn(value) {
          if (value > 0) {
              this.zoom *= this.zoomFactor;
          } else {
              this.zoom /= this.zoomFactor;
          }
      }

      rotate(x, y) {
          const yMax = Math.PI / 2 - 0.01;
          this.xRot += (x * this.rotateSpeed);
          this.yRot += (y * this.rotateSpeed);
          this.yRot = clamp(this.yRot, -yMax, yMax);
      }


      fitViewToScene() {
          this.moveTarget();
      }

      toLocalRotation(vector) {
          rotateX$1(vector, vector, VecZero, -this.yRot);
          rotateY$1(vector, vector, VecZero, -this.xRot);
      }

      getLookAtTarget() {
          return this.target;
      }

      getPosition() {
          return this.position;
      }


      moveTarget() {
          ///move camera as player moves
          scale$4(this.target, this.viewer.gltf.player.node.translation, this.scale);
      }


  }

  class gltfEnvironmentLoader
  {
      constructor()
      {
      }

      addEnvironmentMap(gltf, environment)
      {
          let extension;
          switch (environment.type)
          {
          case (ImageMimeType.HDR):
              extension = ".hdr";
              break;
          case (ImageMimeType.PNG):
              extension = ".png";
              break;
          case (ImageMimeType.JPEG):
          default:
              extension = ".jpg";
              break;
          }

          const imagesFolder =   "assets/environments/" + environment.folder + "/";
          const diffusePrefix = imagesFolder + "diffuse/diffuse_";
          const diffuseSuffix = "_0" + extension;
          const specularPrefix = imagesFolder + "specular/specular_";
          const specularSuffix = "_";

          const CubeMapSides =
          [
              { name: "right", type: WebGl.context.TEXTURE_CUBE_MAP_POSITIVE_X },
              { name: "left", type: WebGl.context.TEXTURE_CUBE_MAP_NEGATIVE_X },
              { name: "top", type: WebGl.context.TEXTURE_CUBE_MAP_POSITIVE_Y },
              { name: "bottom", type: WebGl.context.TEXTURE_CUBE_MAP_NEGATIVE_Y },
              { name: "front", type: WebGl.context.TEXTURE_CUBE_MAP_POSITIVE_Z },
              { name: "back", type: WebGl.context.TEXTURE_CUBE_MAP_NEGATIVE_Z },
          ];

          gltf.samplers.push(new gltfSampler(WebGl.context.LINEAR, WebGl.context.LINEAR, WebGl.context.CLAMP_TO_EDGE, WebGl.context.CLAMP_TO_EDGE, "DiffuseCubeMapSampler"));
          const diffuseCubeSamplerIdx = gltf.samplers.length - 1;

          gltf.samplers.push(new gltfSampler(WebGl.context.LINEAR, WebGl.context.LINEAR_MIPMAP_LINEAR, WebGl.context.CLAMP_TO_EDGE, WebGl.context.CLAMP_TO_EDGE, "SpecularCubeMapSampler"));
          const specularCubeSamplerIdx = gltf.samplers.length - 1;

          gltf.samplers.push(new gltfSampler(WebGl.context.LINEAR, WebGl.context.LINEAR, WebGl.context.CLAMP_TO_EDGE, WebGl.context.CLAMP_TO_EDGE, "LUTSampler"));
          const lutSamplerIdx = gltf.samplers.length - 1;

          let imageIdx = gltf.images.length;

          // u_DiffuseEnvSampler faces
          for (const side of CubeMapSides)
          {
              const imagePath = diffusePrefix + side.name + diffuseSuffix;
              const image = new gltfImage(imagePath, side.type);
              image.mimeType = environment.type;
              gltf.images.push(image);
          }

          // u_DiffuseEnvSampler tex
          gltf.textures.push(new gltfTexture(diffuseCubeSamplerIdx, [imageIdx, ++imageIdx, ++imageIdx, ++imageIdx, ++imageIdx, ++imageIdx], WebGl.context.TEXTURE_CUBE_MAP));

          const indices = [];
          function addSide(basePath, side, mipLevel)
          {
              for (let i = 0; i < mipLevel; i++)
              {
                  const imagePath = basePath + i + extension;
                  const image = new gltfImage(imagePath, side, i);
                  image.mimeType = environment.type;
                  gltf.images.push(image);
                  indices.push(++imageIdx);
              }
          }

          // u_SpecularEnvSampler tex
          for (const side of CubeMapSides)
          {
              addSide(specularPrefix + side.name + specularSuffix, side.type, environment.mipLevel);
          }

          gltf.textures.push(new gltfTexture(specularCubeSamplerIdx, indices, WebGl.context.TEXTURE_CUBE_MAP));

          gltf.images.push(new gltfImage( "assets/images/brdfLUT.png", WebGl.context.TEXTURE_2D));

          // u_brdfLUT tex
          gltf.textures.push(new gltfTexture(lutSamplerIdx, [++imageIdx], WebGl.context.TEXTURE_2D));
      }
  }

  function getSceneExtends(gltf, sceneIndex, outMin, outMax)
  {
      for (const i of [0, 1, 2])
      {
          outMin[i] = Number.POSITIVE_INFINITY;
          outMax[i] = Number.NEGATIVE_INFINITY;
      }

      const scene = gltf.scenes[sceneIndex];

      let nodeIndices = scene.nodes.slice();
      while(nodeIndices.length > 0)
      {
          const node = gltf.nodes[nodeIndices.pop()];
          nodeIndices = nodeIndices.concat(node.children);

          if (node.mesh === undefined)
          {
              continue;
          }

          const mesh = gltf.meshes[node.mesh];
          if (mesh.primitives === undefined)
          {
              continue;
          }

          for (const primitive of mesh.primitives)
          {
              const attribute = primitive.glAttributes.find(a => a.attribute == "POSITION");
              if (attribute === undefined)
              {
                  continue;
              }

              const accessor = gltf.accessors[attribute.accessor];
              const assetMin = create$4();
              const assetMax = create$4();
              getExtendsFromAccessor(accessor, node.worldTransform, assetMin, assetMax);

              for (const i of [0, 1, 2])
              {
                  outMin[i] = Math.min(outMin[i], assetMin[i]);
                  outMax[i] = Math.max(outMax[i], assetMax[i]);
              }
          }
      }
  }

  function getExtendsFromAccessor(accessor, worldTransform, outMin, outMax)
  {
      const boxMin = create$4();
      transformMat4(boxMin, jsToGl(accessor.min), worldTransform);

      const boxMax = create$4();
      transformMat4(boxMax, jsToGl(accessor.max), worldTransform);

      const center = create$4();
      add$4(center, boxMax, boxMin);
      scale$4(center, center, 0.5);

      const centerToSurface = create$4();
      sub$4(centerToSurface, boxMax, center);

      const radius = length(centerToSurface);

      for (const i of [1, 2, 3])
      {
          outMin[i] = center[i] - radius;
          outMax[i] = center[i] + radius;
      }
  }

  function getScaleFactor(gltf, sceneIndex)
  {
      const min$$1 = create$4();
      const max$$1 = create$4();
      getSceneExtends(gltf, sceneIndex, min$$1, max$$1);
      const minValue = Math.min(min$$1[0], Math.min(min$$1[1], min$$1[2]));
      const maxValue = Math.max(max$$1[0], Math.max(max$$1[1], max$$1[2]));
      const deltaValue = maxValue - minValue;
      return 1.0 / deltaValue;
  }

  function computePrimitiveCentroids(gltf)
  {
      const meshes = gltf.nodes.filter(node => node.mesh !== undefined).map(node => gltf.meshes[node.mesh]);
      const primitives = meshes.reduce((acc, mesh) => acc.concat(mesh.primitives), []);
      for(const primitive of primitives) {

          const positionsAccessor = gltf.accessors[primitive.attributes.POSITION];
          const positions = positionsAccessor.getTypedView(gltf);

          if(primitive.indices !== undefined)
          {
              // Primitive has indices.

              const indicesAccessor = gltf.accessors[primitive.indices];

              const indices = indicesAccessor.getTypedView(gltf);

              const acc = new Float32Array(3);

              for(let i = 0; i < indices.length; i++) {
                  const offset = 3 * indices[i];
                  acc[0] += positions[offset];
                  acc[1] += positions[offset + 1];
                  acc[2] += positions[offset + 2];
              }

              const centroid = new Float32Array([
                  acc[0] / indices.length,
                  acc[1] / indices.length,
                  acc[2] / indices.length,
              ]);

              primitive.setCentroid(centroid);
          }
          else
          {
              // Primitive does not have indices.

              const acc = new Float32Array(3);

              for(let i = 0; i < positions.length; i += 3) {
                  acc[0] += positions[i];
                  acc[1] += positions[i + 1];
                  acc[2] += positions[i + 2];
              }

              const positionVectors = positions.length / 3;

              const centroid = new Float32Array([
                  acc[0] / positionVectors,
                  acc[1] / positionVectors,
                  acc[2] / positionVectors,
              ]);

              primitive.setCentroid(centroid);
          }

      }
  }

  class gameObject
  {
      constructor(
          canvas,
          modelIndex,
          input)
      {
          this.onRendererReady = undefined;
          this.initialModel = "map";
          this.time = Date.now();
          this.startTime = this.time;

          this.canvas = canvas;
          this.canvas.style.cursor = "grab";

          this.gltf = undefined;

          this.scaledSceneIndex = 0;
          this.scaledGltfChanged = true;
          this.sceneScaleFactor = 1;

          this.renderingParameters = new gltfRenderingParameters();
          this.userCamera = new UserCamera(this);
          this.currentlyRendering = false;
          this.renderer = new gltfRenderer(canvas, this.userCamera, this.renderingParameters);






          this.setupInputBindings(input);

          const self = this;
          this.pathProvider = new gltfModelPathProvider( modelIndex);
          this.pathProvider.initialize().then(() =>
          {
              self.loadFromPath(self.pathProvider.resolve(self.initialModel),undefined);
          });

          this.render(); // Starts a rendering loop.
      }



      setCamera(eye = [0.0, 0.0, 0.05], target = [0.0, 0.0, 0.0], up = [0.0, 1.0, 0.0],
          type = "perspective",
          znear = 0.01, zfar = 10000.0,
          yfov = 45.0 * Math.PI / 180.0, aspectRatio = 16.0 / 9.0,
          xmag = 1.0, ymag = 1.0)
      {
          this.renderingParameters.cameraIndex = UserCameraIndex; // force use default camera

          this.userCamera.target = jsToGl(target);
          this.userCamera.up = jsToGl(up);
          this.userCamera.position = jsToGl(eye);
          this.userCamera.type = type;
          this.userCamera.znear = znear;
          this.userCamera.zfar = zfar;
          this.userCamera.yfov = yfov;
          this.userCamera.aspectRatio = aspectRatio;
          this.userCamera.xmag = xmag;
          this.userCamera.ymag = ymag;
      }

      setAnimation(animationIndex = 'all', play = false, timeInSec = undefined)
      {
          this.renderingParameters.animationIndex = animationIndex;
          if(timeInSec !== undefined)
          {
              this.renderingParameters.animationTimer.setFixedTime(timeInSec);
          }
          else if(play)
          {
              this.renderingParameters.animationTimer.start();
          }
      }


      setupInputBindings(input)
      {
          const self = this;
          input.onRotate = (deltaX, deltaY) =>
          {
              if (this.renderingParameters.userCameraActive())
              {
                  this.userCamera.rotate(deltaX, deltaY);
              }
          };
          input.onZoom = (delta) =>
          {
              if (this.renderingParameters.userCameraActive())
              {
                  this.userCamera.zoomIn(delta);
              }
          };
          input.onResetCamera = () =>
          {
              if (this.renderingParameters.userCameraActive())
              {
                  self.userCamera.reset(self.gltf, self.renderingParameters.sceneIndex);
              }
          };

      }


      loadFromPath(gltfFile)
      {


          this.notifyLoadingStarted(gltfFile);


          const self = this;
          return axios_min.get(gltfFile, { responseType:  "json" }).then(function(response)
          {
              let json = response.data;
              let buffers = undefined;
              return self.createGltf(gltfFile, json, buffers);
          }).catch(function(error)
          {
              console.error(error.stack);
              self.hideSpinner();
          });
      }

      createGltf(path, json, buffers)
      {
          this.currentlyRendering = false;

          // unload previous scene
          if (this.gltf !== undefined)
          {
              gltfLoader.unload(this.gltf);
              this.gltf = undefined;
          }

          const gltf = new glTF(path, this);
          gltf.fromJson(json);

          this.injectEnvironment(gltf);

          const self = this;
          return gltfLoader.load(gltf, buffers)
              .then(() => self.startRendering(gltf));
      }

      injectEnvironment(gltf)
      {
          // this is hacky, because we inject stuff into the gltf

          // because the environment loader adds images with paths that are not relative
          // to the gltf, we have to resolve all image paths before that
          for (const image of gltf.images)
          {
              image.resolveRelativePath(getContainingFolder(gltf.path));
          }

          const environment = Environments[this.renderingParameters.environmentName];
          new gltfEnvironmentLoader().addEnvironmentMap(gltf, environment);
      }

      startRendering(gltf)
      {
          this.notifyLoadingEnded(gltf.path);

          if (gltf.scenes.length === 0)
          {
              throw "No scenes in the gltf";
          }

          this.renderingParameters.cameraIndex = UserCameraIndex;
          this.renderingParameters.sceneIndex = gltf.scene ? gltf.scene : 0;
          this.renderingParameters.animationTimer.reset();
          this.renderingParameters.animationIndex = "all";


          this.gltf = gltf;
          this.currentlyRendering = true;
          this.scaledGltfChanged = true;

          this.prepareSceneForRendering(gltf);
          this.userCamera.fitViewToScene(gltf, this.renderingParameters.sceneIndex);

          computePrimitiveCentroids(gltf);
      }

      render()
      {
          const self = this;
          function renderFrame()
          {




              if (self.currentlyRendering)
              {
                  self.prepareSceneForRendering(self.gltf);

                  self.renderer.resize(self.canvas.clientWidth, self.canvas.clientHeight);
                  self.renderer.newFrame();

                  if (self.gltf.scenes.length !== 0)
                  {
                      self.userCamera.updatePosition();

                      const scene = self.gltf.scenes[self.renderingParameters.sceneIndex];

                      // Check if scene contains transparent primitives.

                      const nodes = scene.gatherNodes(self.gltf);

                      const alphaModes = nodes
                          .filter(n => n.mesh !== undefined) //return only defined ones
                          .reduce((acc, n) => acc.concat(self.gltf.meshes[n.mesh].primitives), [])
                          .map(p => self.gltf.materials[p.material].alphaMode); //create new array

                      let hasBlendPrimitives = false;
                      for(const alphaMode of alphaModes)
                      {
                          if(alphaMode === "BLEND")
                          {
                              hasBlendPrimitives = true;
                              break;
                          }
                      }

                      if(hasBlendPrimitives)
                      {
                          // Draw all opaque and masked primitives. Depth sort is not yet required.
                          self.renderer.drawScene(self.gltf, scene, false, primitive => self.gltf.materials[primitive.material].alphaMode !== "BLEND");

                          // Draw all transparent primitives. Depth sort is required.
                          self.renderer.drawScene(self.gltf, scene, true, primitive => self.gltf.materials[primitive.material].alphaMode === "BLEND");
                      }
                      else
                      {
                          // Simply draw all primitives.
                          self.renderer.drawScene(self.gltf, scene, false);
                      }
                  }

                  if (self.onRendererReady)
                  {
                      self.onRendererReady();
                  }
              }


              window.requestAnimationFrame(renderFrame);
          }

          // After this start executing render loop.
          window.requestAnimationFrame(renderFrame);
      }

      prepareSceneForRendering(gltf )
      {
          const scene = gltf.scenes[this.renderingParameters.sceneIndex];

          this.time = Date.now();
          const dt = (this.time - this.startTime) * 0.001;
          this.startTime = this.time;

          gltf.update(dt);


          scene.applyTransformHierarchy(gltf);

          const transform = create$3();

          let scaled = false;
          if (this.renderingParameters.userCameraActive() && (this.scaledGltfChanged || this.scaledSceneIndex !== this.renderingParameters.sceneIndex ))
          {
              this.sceneScaleFactor = getScaleFactor(gltf, this.renderingParameters.sceneIndex);

              scaled = true;
              this.scaledGltfChanged = false;
              this.scaledSceneIndex = this.renderingParameters.sceneIndex;
          }
          else if(!this.renderingParameters.userCameraActive() )
          {
              this.sceneScaleFactor = 1;
          }


          scale$3(transform, transform, fromValues$4(this.sceneScaleFactor,  this.sceneScaleFactor,  this.sceneScaleFactor));
          scene.applyTransformHierarchy(gltf, transform);

          if(scaled)
          {
              this.userCamera.fitViewToScene(gltf, this.renderingParameters.sceneIndex);
          }
      }



      notifyLoadingStarted()
      {

          this.showSpinner();
      }

      notifyLoadingEnded()
      {

          this.hideSpinner();
          this.showLoadingBar();

      }

      showSpinner()
      {
          let spinner = document.getElementById("loadSpinner");
          if (spinner !== undefined)
          {
              spinner.style.display = "block";
          }
      }

      hideSpinner()
      {
          let spinner = document.getElementById("loadSpinner");
          if (spinner !== undefined)
          {
              spinner.style.display = "none";
          }
      }

      showLoadingBar()
      {
          let bar = document.getElementById("health_bar");
          if (bar !== undefined)
          {
              bar.style.display = "block";
          }
      }


  }

  const ZoomThreshold = 1.0;

  class gltfMouseInput {
      constructor(canvas) {
          this.canvas = canvas;

          this.onZoom = () => {
          };
          this.onRotate = () => {
          };
          this.onPan = () => {
          };

          this.mouseDown = false;
          this.pressedButton = undefined;
          this.lastMouseX = 0;
          this.lastMouseY = 0;
      }

      setupGlobalInputBindings(document) {
          document.onmouseup = this.mouseUpHandler.bind(this);
          document.onmousemove = this.mouseMoveHandler.bind(this);
      }

      setupCanvasInputBindings(canvas) {
          canvas.onmousedown = this.mouseDownHandler.bind(this);
          canvas.onwheel = this.mouseWheelHandler.bind(this);
      }

      mouseDownHandler(event) {
          this.mouseDown = true;
          this.pressedButton = event.button;
          this.lastMouseX = event.clientX;
          this.lastMouseY = event.clientY;
          this.canvas.style.cursor = "none";
      }

      mouseUpHandler() {
          this.mouseDown = false;
          this.canvas.style.cursor = "grab";
      }

      mouseMoveHandler(event) {
          event.preventDefault();

          if (!this.mouseDown) {
              this.canvas.style.cursor = "grab";
              return;
          }

          const deltaX = event.clientX - this.lastMouseX;
          const deltaY = event.clientY - this.lastMouseY;

          this.lastMouseX = event.clientX;
          this.lastMouseY = event.clientY;

          switch (this.pressedButton) {
          case Input_RotateButton:
              this.onRotate(deltaX, deltaY);
              break;
          }
      }

      mouseWheelHandler(event) {
          event.preventDefault();

          if (Math.abs(event.deltaY) < ZoomThreshold) {
              return;
          }

          this.canvas.style.cursor = "none";
          this.onZoom(event.deltaY);
      }
  }

  class gltfKeyboardInput {
      constructor() {
          this.onResetCamera = () => {
          };
      }

      setupGlobalInputBindings(document) {
          document.onkeydown = this.keyDownHandler.bind(this);
          document.onkeyup = this.keyUpHandler.bind(this);
      }

      setupCanvasInputBindings() {
      }

      keyDownHandler(event) {
          if (event.key === Input_ResetCamera) {
              this.onResetCamera();
          }
          keys[event.code] = true;
          if (event.code === Input_AttackButton) {
              playerWeaponAudio.play();
          } else if (event.code === Input_MusicButton) {
              controlMusic();
          }
      }

      keyUpHandler(event) {
          keys[event.code] = false;
      }
  }

  class gltfInput
  {
      constructor(canvas)
      {
          this.mouseInput = new gltfMouseInput(canvas);
          this.keyboardInput = new gltfKeyboardInput();

          this.onZoom = () => { };
          this.onRotate = () => { };
          this.onPan = () => { };
          this.onDropFiles = () => { };
          this.onResetCamera = () => { };

          this.mouseInput.onZoom = (delta => this.onZoom(delta)).bind(this);
          this.mouseInput.onRotate = ((x, y) => this.onRotate(x, y)).bind(this);
          this.mouseInput.onPan = ((x, y) => this.onPan(x, y)).bind(this);
          this.keyboardInput.onResetCamera = (() => this.onResetCamera()).bind(this);
      }

      setupGlobalInputBindings(document)
      {
          this.mouseInput.setupGlobalInputBindings(document);
          this.keyboardInput.setupGlobalInputBindings(document);
      }

      setupCanvasInputBindings(canvas)
      {
          this.mouseInput.setupCanvasInputBindings(canvas);
          this.keyboardInput.setupCanvasInputBindings(canvas);
      }
  }

  function main()
  {
      const canvasId = 'canvas';
      const jsonIndex = 'assets/models/model-index.json';

      const canvas = document.getElementById(canvasId);
      if (!canvas)
      {
          console.warn("Failed to retrieve the WebGL canvas!");
          return null;
      }

      WebGl.context = getWebGlContext(canvas);
      if (!WebGl.context)
      {
          console.warn("Failed to get an WebGL rendering context!");
          return null;
      }

      const input = new gltfInput(canvas);
      input.setupGlobalInputBindings(document);
      input.setupCanvasInputBindings(canvas);

      new gameObject(canvas, jsonIndex, input);


  }

  function getWebGlContext(canvas)
  {
      const parameters = { alpha: false, antialias: true };
      const contextTypes = [ "webgl", "experimental-webgl" ];

      let context;

      for (const contextType of contextTypes)
      {
          context = canvas.getContext(contextType, parameters);
          if (context)
          {
              return context;
          }
      }
  }

  exports.main = main;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=PolyKingdom.umd.js.map
