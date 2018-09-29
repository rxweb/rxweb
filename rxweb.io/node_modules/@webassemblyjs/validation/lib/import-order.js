"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validate;

var _ast = require("@webassemblyjs/ast");

// https://webassembly.github.io/spec/core/text/modules.html#text-module
//
// imports must appear before globals, memory, tables or functions. However, imports
// may be embedded within other statetemnts, or statetemnts may be embedded within imports.
// In these cases, the ordering rule is not applied
function validate(ast) {
  var errors = [];

  function isImportInstruction(path) {
    // various instructions can be embedded within an import statement. These
    // are not subject to our order validation rule
    return path.parentPath.node.type === "ModuleImport";
  }

  var noMoreImports = false;
  (0, _ast.traverse)(ast, {
    ModuleImport: function ModuleImport(path) {
      if (noMoreImports && path.parentPath.node.type !== "Global") {
        return errors.push("imports must occur before all non-import definitions");
      }
    },
    Global: function Global(path) {
      if (!isImportInstruction(path)) {
        noMoreImports = true;
      }
    },
    Memory: function Memory(path) {
      if (!isImportInstruction(path)) {
        noMoreImports = true;
      }
    },
    Table: function Table(path) {
      if (!isImportInstruction(path)) {
        noMoreImports = true;
      }
    },
    Func: function Func(path) {
      if (!isImportInstruction(path)) {
        noMoreImports = true;
      }
    }
  });
  return errors;
}