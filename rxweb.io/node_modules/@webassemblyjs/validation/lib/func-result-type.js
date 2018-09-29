"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validate;

var _errors = require("webassemblyjs/lib/errors");

var _ast = require("@webassemblyjs/ast");

var _require = require("./type-inference"),
    getType = _require.getType,
    typeEq = _require.typeEq;

function validate(ast) {
  var errors = [];
  (0, _ast.traverse)(ast, {
    Func: function (_Func) {
      function Func(_x) {
        return _Func.apply(this, arguments);
      }

      Func.toString = function () {
        return _Func.toString();
      };

      return Func;
    }(function (_ref) {
      var node = _ref.node;

      if (node.signature.type !== "Signature") {
        throw new _errors.RuntimeError("Function signatures must be denormalised before execution");
      }

      var signature = node.signature; // Since only one return is allowed at the moment, we don't need to check
      // them all.

      var resultType = signature.results;
      var inferedResultType = getType(node.body); // Type is unknown, we can not verify the result type

      if (typeof inferedResultType === "undefined") {
        return;
      } // $FlowIgnore


      if (typeEq(resultType, inferedResultType) === false) {
        var name = "anonymous";

        if (node.name != null) {
          name = node.name.value;
        }

        errors.push("- Type mismatch: function '".concat(name, "' expected result type ").concat(JSON.stringify(resultType), ",") + " but ".concat(JSON.stringify(inferedResultType), " given."));
        return;
      }
    })
  });
  return errors;
}