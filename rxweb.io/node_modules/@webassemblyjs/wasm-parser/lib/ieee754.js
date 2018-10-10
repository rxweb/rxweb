"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decode = decode;
exports.DOUBLE_PRECISION_MANTISSA = exports.SINGLE_PRECISION_MANTISSA = exports.NUMBER_OF_BYTE_F64 = exports.NUMBER_OF_BYTE_F32 = void 0;

/**
 * Initial implementation from https://github.com/feross/ieee754
 */

/**
 * According to https://webassembly.github.io/spec/binary/values.html#binary-float
 * n = 32/8
 */
var NUMBER_OF_BYTE_F32 = 4;
/**
 * According to https://webassembly.github.io/spec/binary/values.html#binary-float
 * n = 64/8
 */

exports.NUMBER_OF_BYTE_F32 = NUMBER_OF_BYTE_F32;
var NUMBER_OF_BYTE_F64 = 8;
exports.NUMBER_OF_BYTE_F64 = NUMBER_OF_BYTE_F64;
var SINGLE_PRECISION_MANTISSA = 1 + 23;
exports.SINGLE_PRECISION_MANTISSA = SINGLE_PRECISION_MANTISSA;
var DOUBLE_PRECISION_MANTISSA = 1 + 52;
exports.DOUBLE_PRECISION_MANTISSA = DOUBLE_PRECISION_MANTISSA;

function decode(buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
}