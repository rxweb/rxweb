"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse32F = parse32F;
exports.parse64F = parse64F;
exports.parse32I = parse32I;
exports.parseU32 = parseU32;
exports.parse64I = parse64I;
exports.isInfLiteral = isInfLiteral;
exports.isNanLiteral = isNanLiteral;

var Long = require("long");

var parseHexFloat = require("@webassemblyjs/floating-point-hex-parser");

var _require = require("webassemblyjs/lib/errors"),
    CompileError = _require.CompileError;

function parse32F(sourceString) {
  if (isHexLiteral(sourceString)) {
    return parseHexFloat(sourceString);
  }

  if (isInfLiteral(sourceString)) {
    return sourceString[0] === "-" ? -1 : 1;
  }

  if (isNanLiteral(sourceString)) {
    return (sourceString[0] === "-" ? -1 : 1) * (sourceString.includes(":") ? parseInt(sourceString.substring(sourceString.indexOf(":") + 1), 16) : 0x400000);
  }

  return parseFloat(sourceString);
}

function parse64F(sourceString) {
  if (isHexLiteral(sourceString)) {
    return parseHexFloat(sourceString);
  }

  if (isInfLiteral(sourceString)) {
    return 0;
  }

  if (isNanLiteral(sourceString)) {
    return sourceString.length > 3 ? parseInt(sourceString.substring(4), 16) : 0x400000;
  }

  if (isHexLiteral(sourceString)) {
    return parseHexFloat(sourceString);
  }

  return parseFloat(sourceString);
}

function parse32I(sourceString) {
  var value = 0;

  if (isHexLiteral(sourceString)) {
    value = ~~parseInt(sourceString, 16);
  } else if (isDecimalExponentLiteral(sourceString)) {
    throw new Error("This number literal format is yet to be implemented.");
  } else {
    value = parseInt(sourceString, 10);
  }

  return value;
}

function parseU32(sourceString) {
  var value = parse32I(sourceString);

  if (value < 0) {
    throw new CompileError("Illegal value for u32: " + sourceString);
  }

  return value;
}

function parse64I(sourceString) {
  var long;

  if (isHexLiteral(sourceString)) {
    long = Long.fromString(sourceString, false, 16);
  } else if (isDecimalExponentLiteral(sourceString)) {
    throw new Error("This number literal format is yet to be implemented.");
  } else {
    long = Long.fromString(sourceString);
  }

  return {
    high: long.high,
    low: long.low
  };
}

var NAN_WORD = /^\+?-?nan/;
var INF_WORD = /^\+?-?inf/;

function isInfLiteral(sourceString) {
  return INF_WORD.test(sourceString.toLowerCase());
}

function isNanLiteral(sourceString) {
  return NAN_WORD.test(sourceString.toLowerCase());
}

function isDecimalExponentLiteral(sourceString) {
  return !isHexLiteral(sourceString) && sourceString.toUpperCase().includes("E");
}

function isHexLiteral(sourceString) {
  return sourceString.substring(0, 2).toUpperCase() === "0X" || sourceString.substring(0, 3).toUpperCase() === "-0X";
}