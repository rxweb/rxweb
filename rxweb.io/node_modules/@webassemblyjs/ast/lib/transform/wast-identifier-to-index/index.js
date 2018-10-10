"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = transform;

var _index = require("../../index");

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

// FIXME(sven): do the same with all block instructions, must be more generic here
var t = require("../../index");

function transform(ast) {
  var functionsInProgram = [];
  var globalsInProgram = []; // First collect the indices of all the functions in the Program

  (0, _index.traverse)(ast, {
    ModuleImport: function (_ModuleImport) {
      function ModuleImport(_x) {
        return _ModuleImport.apply(this, arguments);
      }

      ModuleImport.toString = function () {
        return _ModuleImport.toString();
      };

      return ModuleImport;
    }(function (_ref) {
      var node = _ref.node;
      functionsInProgram.push(t.identifier(node.name));
    }),
    Global: function (_Global) {
      function Global(_x2) {
        return _Global.apply(this, arguments);
      }

      Global.toString = function () {
        return _Global.toString();
      };

      return Global;
    }(function (_ref2) {
      var node = _ref2.node;

      if (node.name != null) {
        globalsInProgram.push(node.name);
      }
    }),
    Func: function (_Func) {
      function Func(_x3) {
        return _Func.apply(this, arguments);
      }

      Func.toString = function () {
        return _Func.toString();
      };

      return Func;
    }(function (_ref3) {
      var node = _ref3.node;

      if (node.name == null) {
        return;
      }

      functionsInProgram.push(node.name);
    })
  }); // Transform the actual instruction in function bodies

  (0, _index.traverse)(ast, {
    Func: function (_Func2) {
      function Func(_x4) {
        return _Func2.apply(this, arguments);
      }

      Func.toString = function () {
        return _Func2.toString();
      };

      return Func;
    }(function (path) {
      transformFuncPath(path, functionsInProgram, globalsInProgram);
    }),
    Start: function (_Start) {
      function Start(_x5) {
        return _Start.apply(this, arguments);
      }

      Start.toString = function () {
        return _Start.toString();
      };

      return Start;
    }(function (path) {
      var index = path.node.index;
      var offsetInFunctionsInProgram = functionsInProgram.findIndex(function (_ref4) {
        var value = _ref4.value;
        return value === index.value;
      });

      if (offsetInFunctionsInProgram === -1) {
        throw new Error("unknown function");
      }

      var indexNode = t.indexLiteral(offsetInFunctionsInProgram); // Replace the index Identifier

      path.node.index = indexNode;
    })
  });
}

function transformFuncPath(funcPath, functionsInProgram, globalsInProgram) {
  var funcNode = funcPath.node;
  var signature = funcNode.signature;

  if (signature.type !== "Signature") {
    throw new Error("Function signatures must be denormalised before execution");
  }

  var params = signature.params;
  (0, _index.traverse)(funcNode, {
    Instr: function Instr(instrPath) {
      var instrNode = instrPath.node;

      if (instrNode.id === "get_local" || instrNode.id === "set_local" || instrNode.id === "tee_local") {
        var _instrNode$args = _slicedToArray(instrNode.args, 1),
            firstArg = _instrNode$args[0];

        if (firstArg.type === "Identifier") {
          var offsetInParams = params.findIndex(function (_ref5) {
            var id = _ref5.id;
            return id === firstArg.value;
          });

          if (offsetInParams === -1) {
            throw new Error("".concat(firstArg.value, " not found in ").concat(instrNode.id, ": not declared in func params"));
          }

          var indexNode = t.indexLiteral(offsetInParams); // Replace the Identifer node by our new NumberLiteral node

          instrNode.args[0] = indexNode;
        }
      }

      if (instrNode.id === "get_global" || instrNode.id === "set_global") {
        var _instrNode$args2 = _slicedToArray(instrNode.args, 1),
            _firstArg = _instrNode$args2[0];

        if (_firstArg.type === "Identifier") {
          var offsetInGlobalsInProgram = globalsInProgram.findIndex(function (_ref6) {
            var value = _ref6.value;
            return value === _firstArg.value;
          });

          if (offsetInGlobalsInProgram === -1) {
            throw new Error("global ".concat(_firstArg.value, " not found in module"));
          }

          var _indexNode = t.indexLiteral(offsetInGlobalsInProgram); // Replace the Identifer node by our new NumberLiteral node


          instrNode.args[0] = _indexNode;
        }
      }
    },
    CallInstruction: function (_CallInstruction) {
      function CallInstruction(_x6) {
        return _CallInstruction.apply(this, arguments);
      }

      CallInstruction.toString = function () {
        return _CallInstruction.toString();
      };

      return CallInstruction;
    }(function (_ref7) {
      var node = _ref7.node;
      var index = node.index;

      if (index.type === "Identifier") {
        var offsetInFunctionsInProgram = functionsInProgram.findIndex(function (_ref8) {
          var value = _ref8.value;
          return value === index.value;
        });

        if (offsetInFunctionsInProgram === -1) {
          throw new Error("".concat(index.value, " not found in CallInstruction: not declared in Program"));
        }

        var indexNode = t.indexLiteral(offsetInFunctionsInProgram); // Replace the index Identifier

        node.index = indexNode;
      }
    })
  });
}