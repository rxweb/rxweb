"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateAST;
Object.defineProperty(exports, "isConst", {
  enumerable: true,
  get: function get() {
    return _isConst.isConst;
  }
});
Object.defineProperty(exports, "getType", {
  enumerable: true,
  get: function get() {
    return _typeInference.getType;
  }
});
Object.defineProperty(exports, "typeEq", {
  enumerable: true,
  get: function get() {
    return _typeInference.typeEq;
  }
});

var _funcResultType = _interopRequireDefault(require("./func-result-type"));

var _mutGlobal = _interopRequireDefault(require("./mut-global"));

var _importOrder = _interopRequireDefault(require("./import-order"));

var _isConst = require("./is-const");

var _typeInference = require("./type-inference");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function validateAST(ast) {
  var errors = [];
  errors.push.apply(errors, _toConsumableArray((0, _funcResultType.default)(ast)));
  errors.push.apply(errors, _toConsumableArray((0, _mutGlobal.default)(ast)));
  errors.push.apply(errors, _toConsumableArray((0, _importOrder.default)(ast)));

  if (errors.length !== 0) {
    var errorMessage = "Validation errors:\n" + errors.join("\n");
    throw new Error(errorMessage);
  }
}