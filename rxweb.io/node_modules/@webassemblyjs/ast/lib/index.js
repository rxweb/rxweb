"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signature = signature;
exports.moduleNameMetadata = moduleNameMetadata;
exports.functionNameMetadata = functionNameMetadata;
exports.localNameMetadata = localNameMetadata;
exports.moduleMetadata = moduleMetadata;
exports.identifier = identifier;
exports.valtype = valtype;
exports.stringLiteral = stringLiteral;
exports.program = program;
exports.module = _module;
exports.sectionMetadata = sectionMetadata;
exports.binaryModule = binaryModule;
exports.quoteModule = quoteModule;
exports.moduleExport = moduleExport;
exports.functionSignature = functionSignature;
exports.func = func;
exports.funcWithTypeRef = funcWithTypeRef;
exports.objectInstruction = objectInstruction;
exports.instruction = instruction;
exports.loopInstruction = loopInstruction;
exports.blockInstruction = blockInstruction;
exports.numberLiteral = numberLiteral;
exports.getUniqueNameGenerator = getUniqueNameGenerator;
exports.callInstruction = callInstruction;
exports.ifInstruction = ifInstruction;
exports.withLoc = withLoc;
exports.withRaw = withRaw;
exports.moduleImport = moduleImport;
exports.globalImportDescr = globalImportDescr;
exports.funcParam = funcParam;
exports.funcImportDescr = funcImportDescr;
exports.table = table;
exports.limits = limits;
exports.memory = memory;
exports.data = data;
exports.global = global;
exports.globalType = globalType;
exports.byteArray = byteArray;
exports.leadingComment = leadingComment;
exports.blockComment = blockComment;
exports.indexLiteral = indexLiteral;
exports.memIndexLiteral = memIndexLiteral;
exports.typeInstructionFunc = typeInstructionFunc;
exports.callIndirectInstruction = callIndirectInstruction;
exports.callIndirectInstructionWithTypeRef = callIndirectInstructionWithTypeRef;
exports.start = start;
exports.elem = elem;
exports.indexInFuncSection = indexInFuncSection;
exports.isAnonymous = isAnonymous;
Object.defineProperty(exports, "traverse", {
  enumerable: true,
  get: function () {
    return _traverse.traverse;
  }
});
Object.defineProperty(exports, "traverseWithHooks", {
  enumerable: true,
  get: function () {
    return _traverse.traverseWithHooks;
  }
});
Object.defineProperty(exports, "signatures", {
  enumerable: true,
  get: function () {
    return _signatures.signatures;
  }
});
Object.defineProperty(exports, "isInstruction", {
  enumerable: true,
  get: function () {
    return _utils.isInstruction;
  }
});
Object.defineProperty(exports, "getSectionMetadata", {
  enumerable: true,
  get: function () {
    return _utils.getSectionMetadata;
  }
});
Object.defineProperty(exports, "sortSectionMetadata", {
  enumerable: true,
  get: function () {
    return _utils.sortSectionMetadata;
  }
});
Object.defineProperty(exports, "orderedInsertNode", {
  enumerable: true,
  get: function () {
    return _utils.orderedInsertNode;
  }
});
Object.defineProperty(exports, "assertHasLoc", {
  enumerable: true,
  get: function () {
    return _utils.assertHasLoc;
  }
});
Object.defineProperty(exports, "getEndOfSection", {
  enumerable: true,
  get: function () {
    return _utils.getEndOfSection;
  }
});
Object.defineProperty(exports, "shiftSection", {
  enumerable: true,
  get: function () {
    return _utils.shiftSection;
  }
});
Object.defineProperty(exports, "shiftLoc", {
  enumerable: true,
  get: function () {
    return _utils.shiftLoc;
  }
});
Object.defineProperty(exports, "cloneNode", {
  enumerable: true,
  get: function () {
    return _clone.cloneNode;
  }
});

var _traverse = require("./traverse");

var _signatures = require("./signatures");

var _utils = require("./utils");

var _clone = require("./clone");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = require("@webassemblyjs/wast-parser/lib/number-literals"),
    parse32F = _require.parse32F,
    parse64F = _require.parse64F,
    parse32I = _require.parse32I,
    parse64I = _require.parse64I,
    parseU32 = _require.parseU32,
    isNanLiteral = _require.isNanLiteral,
    isInfLiteral = _require.isInfLiteral;

var _require2 = require("./signatures"),
    signatures = _require2.signatures;

function assert(cond) {
  if (!cond) {
    throw new Error("assertion error");
  }
}

function signature(object, name) {
  var opcodeName = name;

  if (object !== undefined && object !== "") {
    opcodeName = object + "." + name;
  }

  var sign = signatures[opcodeName];

  if (sign == undefined) {
    // TODO: Uncomment this when br_table and others has been done
    //throw new Error("Invalid opcode: "+opcodeName);
    return [object, object];
  }

  return sign[0];
}

function moduleNameMetadata(value) {
  return {
    type: "ModuleNameMetadata",
    value: value
  };
}

function functionNameMetadata(value, index) {
  return {
    type: "FunctionNameMetadata",
    value: value,
    index: index
  };
}

function localNameMetadata(value, localIndex, functionIndex) {
  return {
    type: "LocalNameMetadata",
    value: value,
    localIndex: localIndex,
    functionIndex: functionIndex
  };
}

function moduleMetadata(sections, functionNames, localNames) {
  var n = {
    type: "ModuleMetadata",
    sections: sections
  };

  if (functionNames.length) {
    n.functionNames = functionNames;
  }

  if (localNames.length) {
    n.localNames = localNames;
  }

  return n;
}

function identifier(value) {
  return {
    type: "Identifier",
    value: value
  };
}

function valtype(name) {
  return {
    type: "ValtypeLiteral",
    name: name
  };
}

function stringLiteral(value) {
  return {
    type: "StringLiteral",
    value: value
  };
}

function program(body) {
  return {
    type: "Program",
    body: body
  };
}

function _module(id, fields, metadata) {
  if (id != null) {
    assert(typeof id === "string");
  }

  assert(_typeof(fields) === "object" && typeof fields.length !== "undefined");
  var n = {
    type: "Module",
    id: id,
    fields: fields
  };

  if (typeof metadata !== "undefined") {
    n.metadata = metadata;
  }

  return n;
}

function sectionMetadata(section, startOffset, size) {
  var vectorOfSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : numberLiteral(-1);
  assert(size.type === "NumberLiteral");
  assert(vectorOfSize.type === "NumberLiteral");
  return {
    type: "SectionMetadata",
    section: section,
    startOffset: startOffset,
    size: size,
    vectorOfSize: vectorOfSize
  };
}

function binaryModule(id, blob) {
  return {
    type: "BinaryModule",
    blob: blob,
    id: id,
    fields: []
  };
}

function quoteModule(id, string) {
  return {
    type: "QuoteModule",
    string: string,
    id: id,
    fields: []
  };
}

function moduleExport(name, exportType, id) {
  return {
    type: "ModuleExport",
    name: name,
    descr: {
      type: "ModuleExportDescr",
      exportType: exportType,
      id: id
    }
  };
}

function functionSignature(params, results) {
  return {
    type: "Signature",
    params: params,
    results: results
  };
}

function func(name, params, results, body) {
  assert(_typeof(params) === "object" && typeof params.length !== "undefined");
  assert(_typeof(results) === "object" && typeof results.length !== "undefined");
  assert(_typeof(body) === "object" && typeof body.length !== "undefined");
  assert(typeof name !== "string");
  return {
    type: "Func",
    name: name,
    signature: functionSignature(params, results),
    body: body
  };
}

function funcWithTypeRef(name, typeRef, body) {
  assert(_typeof(body) === "object" && typeof body.length !== "undefined");
  assert(typeof name !== "string");
  return {
    type: "Func",
    name: name,
    signature: typeRef,
    body: body
  };
}

function objectInstruction(id, object) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var namedArgs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  assert(_typeof(args) === "object" && typeof args.length !== "undefined");
  assert(typeof object === "string");
  var n = {
    type: "Instr",
    id: id,
    object: object,
    args: args
  };

  if (Object.keys(namedArgs).length !== 0) {
    n.namedArgs = namedArgs;
  }

  return n;
}

function instruction(id) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var namedArgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  assert(_typeof(args) === "object" && typeof args.length !== "undefined");
  assert(id !== "block");
  assert(id !== "if");
  assert(id !== "loop");
  var n = {
    type: "Instr",
    id: id,
    args: args
  };

  if (Object.keys(namedArgs).length !== 0) {
    n.namedArgs = namedArgs;
  }

  return n;
}

function loopInstruction(label, resulttype, instr) {
  assert(label !== null);
  assert(_typeof(instr) === "object" && typeof instr.length !== "undefined");
  return {
    type: "LoopInstruction",
    id: "loop",
    label: label,
    resulttype: resulttype,
    instr: instr
  };
}

function blockInstruction(label, instr, result) {
  assert(typeof label !== "undefined");
  assert(typeof label.type === "string");
  assert(_typeof(instr) === "object" && typeof instr.length !== "undefined");
  return {
    type: "BlockInstruction",
    id: "block",
    label: label,
    instr: instr,
    result: result
  };
}

function numberLiteral(rawValue) {
  var instructionType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "i32";
  var value;
  var nan = false;
  var inf = false;
  var type = "NumberLiteral";
  var original = rawValue; // Remove numeric separators _

  if (typeof rawValue === "string") {
    rawValue = rawValue.replace(/_/g, "");
  }

  if (typeof rawValue === "number") {
    value = rawValue;
  } else {
    switch (instructionType) {
      case "i32":
        {
          value = parse32I(rawValue);
          break;
        }

      case "u32":
        {
          value = parseU32(rawValue);
          break;
        }

      case "i64":
        {
          type = "LongNumberLiteral";
          value = parse64I(rawValue);
          break;
        }

      case "f32":
        {
          type = "FloatLiteral";
          value = parse32F(rawValue);
          nan = isNanLiteral(rawValue);
          inf = isInfLiteral(rawValue);
          break;
        }
      // f64

      default:
        {
          type = "FloatLiteral";
          value = parse64F(rawValue);
          nan = isNanLiteral(rawValue);
          inf = isInfLiteral(rawValue);
          break;
        }
    }
  } // This is a hack to avoid rewriting all tests to have a "isnan: false" field
  // $FlowIgnore: this is correct, but flow doesn't like mutations like this


  var x = {
    type: type,
    value: value
  };

  if (nan === true) {
    // $FlowIgnore
    x.nan = true;
  }

  if (inf === true) {
    // $FlowIgnore
    x.inf = true;
  }

  x.raw = String(original);
  return x;
}

function getUniqueNameGenerator() {
  var inc = {};
  return function () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "temp";

    if (!(prefix in inc)) {
      inc[prefix] = 0;
    } else {
      inc[prefix] = inc[prefix] + 1;
    }

    return prefix + "_" + inc[prefix];
  };
}

function callInstruction(index, instrArgs) {
  assert(typeof index.type === "string");
  var n = {
    type: "CallInstruction",
    id: "call",
    index: index
  };

  if (_typeof(instrArgs) === "object") {
    n.instrArgs = instrArgs;
  }

  return n;
}

function ifInstruction(testLabel, result, test, consequent, alternate) {
  assert(typeof testLabel.type === "string");
  return {
    type: "IfInstruction",
    id: "if",
    testLabel: testLabel,
    test: test,
    result: result,
    consequent: consequent,
    alternate: alternate
  };
}
/**
 * Decorators
 */


function withLoc(n, end, start) {
  var loc = {
    start: start,
    end: end
  };
  n.loc = loc;
  return n;
}

function withRaw(n, raw) {
  // $FlowIgnore
  n.raw = raw;
  return n;
}
/**
 * Import
 */


function moduleImport(module, name, descr) {
  return {
    type: "ModuleImport",
    module: module,
    name: name,
    descr: descr
  };
}

function globalImportDescr(valtype, mutability) {
  return {
    type: "GlobalType",
    valtype: valtype,
    mutability: mutability
  };
}

function funcParam(valtype, id) {
  return {
    id: id,
    valtype: valtype
  };
}

function funcImportDescr(id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var results = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  assert(_typeof(params) === "object" && typeof params.length !== "undefined");
  assert(_typeof(results) === "object" && typeof results.length !== "undefined");
  return {
    type: "FuncImportDescr",
    id: id,
    signature: functionSignature(params, results)
  };
}

function table(elementType, limits, name, elements) {
  var n = {
    type: "Table",
    elementType: elementType,
    limits: limits,
    name: name
  };

  if (_typeof(elements) === "object") {
    n.elements = elements;
  }

  return n;
}

function limits(min, max) {
  assert(typeof min === "number");

  if (typeof max !== "undefined") {
    assert(typeof max === "number");
  }

  return {
    type: "Limit",
    min: min,
    max: max
  };
}

function memory(limits, id) {
  return {
    type: "Memory",
    limits: limits,
    id: id
  };
}

function data(memoryIndex, offset, init) {
  return {
    type: "Data",
    memoryIndex: memoryIndex,
    offset: offset,
    init: init
  };
}

function global(globalType, init, name) {
  return {
    type: "Global",
    globalType: globalType,
    init: init,
    name: name
  };
}

function globalType(valtype, mutability) {
  return {
    type: "GlobalType",
    valtype: valtype,
    mutability: mutability
  };
}

function byteArray(values) {
  return {
    type: "Bytes",
    values: values
  };
}

function leadingComment(value) {
  return {
    type: "LeadingComment",
    value: value
  };
}

function blockComment(value) {
  return {
    type: "BlockComment",
    value: value
  };
}

function indexLiteral(value) {
  // $FlowIgnore
  var x = numberLiteral(value, "u32");
  return x;
}

function memIndexLiteral(value) {
  // $FlowIgnore
  var x = numberLiteral(value, "u32");
  return x;
}

function typeInstructionFunc() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var results = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var id = arguments.length > 2 ? arguments[2] : undefined;
  return {
    type: "TypeInstruction",
    id: id,
    functype: functionSignature(params, results)
  };
}

function callIndirectInstruction(params, results, intrs) {
  return {
    type: "CallIndirectInstruction",
    signature: functionSignature(params, results),
    intrs: intrs
  };
}

function callIndirectInstructionWithTypeRef(typeRef, intrs) {
  return {
    type: "CallIndirectInstruction",
    signature: typeRef,
    intrs: intrs
  };
}

function start(index) {
  return {
    type: "Start",
    index: index
  };
}

function elem() {
  var table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : indexLiteral(0);
  var offset = arguments.length > 1 ? arguments[1] : undefined;
  var funcs = arguments.length > 2 ? arguments[2] : undefined;
  return {
    type: "Elem",
    table: table,
    offset: offset,
    funcs: funcs
  };
}

function indexInFuncSection(index) {
  return {
    type: "IndexInFuncSection",
    index: index
  };
}

function isAnonymous(ident) {
  return ident.raw === "";
}