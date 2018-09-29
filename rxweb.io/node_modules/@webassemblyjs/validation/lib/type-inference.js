"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeEq = typeEq;
exports.getType = getType;

var _ast = require("@webassemblyjs/ast");

function typeEq(l, r) {
  if (l.length !== r.length) {
    return false;
  }

  for (var i = 0; i < l.length; i++) {
    if (l[i] != r[i]) {
      return false;
    }
  }

  return true;
}

function getType(instrs) {
  if (instrs.length === 0) {
    return;
  } // FIXME(sven): this shoudln't be needed, we need to inject our end
  // instructions after the validations


  var last = instrs[instrs.length - 1];

  if (last.id === "end") {
    last = instrs[instrs.length - 2];
  } // It's a ObjectInstruction


  if (typeof last.object === "string") {
    // u32 are in fact i32
    // $FlowIgnore
    if (last.object === "u32") {
      // $FlowIgnore
      last.object = "i32";
    } // $FlowIgnore


    var opName = "".concat(last.object, ".").concat(last.id);
    var signature = _ast.signatures[opName];

    if (typeof signature === "undefined") {
      throw new Error("Unknow type signature for instruction: " + opName);
    }

    return signature[1];
  } // Can't infer it, need to interpreter it


  if (last.id === "get_global" || last.id === "get_local") {
    return;
  }

  if (last.type === "LoopInstruction") {
    // $FlowIgnore: if id is `loop` we can assume it's a LoopInstruction
    var loop = last;

    if (loop.resulttype != null) {
      return [loop.resulttype];
    }
  }

  if (last.type === "IfInstruction") {
    // $FlowIgnore: if id is `loop` we can assume it's a LoopInstruction
    var ifInstruction = last;
    var res = []; // The type is known

    if (typeof ifInstruction.result === "string") {
      res = [ifInstruction.result];
    } // Continue on the branches


    var leftType = getType(ifInstruction.consequent) || [];
    var rightType = getType(ifInstruction.alternate) || [];

    if (typeEq(leftType, res) === false || typeEq(rightType, res) === false) {
      throw new Error("type mismatch in if branches");
    }

    return res;
  }
}