"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validate;

var _ast = require("@webassemblyjs/ast");

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function validate(ast) {
  var errors = [];
  var globalsInProgramMutability = [];
  (0, _ast.traverse)(ast, {
    Global: function (_Global) {
      function Global(_x) {
        return _Global.apply(this, arguments);
      }

      Global.toString = function () {
        return _Global.toString();
      };

      return Global;
    }(function (_ref) {
      var node = _ref.node;
      globalsInProgramMutability.push(node.globalType.mutability);
    })
  });
  (0, _ast.traverse)(ast, {
    Instr: function Instr(_ref2) {
      var node = _ref2.node;

      if (node.id === "set_global") {
        var _node$args = _slicedToArray(node.args, 1),
            index = _node$args[0]; // $FlowIgnore: it's a NumberLiteral because of set_global


        var mutability = globalsInProgramMutability[index.value];

        if (mutability !== "var") {
          return errors.push("global is immutable");
        }
      }
    }
  });
  return errors;
}