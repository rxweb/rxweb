"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;

var _numberLiterals = require("./number-literals");

var _stringLiterals = require("./string-literals");

var _helperCodeFrame = require("@webassemblyjs/helper-code-frame");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var t = require("@webassemblyjs/ast");

var _require = require("./tokenizer"),
    tokens = _require.tokens,
    keywords = _require.keywords;

function hasPlugin(name) {
  if (name !== "wast") throw new Error("unknow plugin");
  return true;
}

function isKeyword(token, id) {
  return token.type === tokens.keyword && token.value === id;
}

function tokenToString(token) {
  if (token.type === "keyword") {
    return "keyword (".concat(token.value, ")");
  }

  return token.type;
}

function parse(tokensList, source) {
  var current = 0;
  var getUniqueName = t.getUniqueNameGenerator();
  var state = {
    registredExportedElements: []
  }; // But this time we're going to use recursion instead of a `while` loop. So we
  // define a `walk` function.

  function walk() {
    var token = tokensList[current];

    function eatToken() {
      token = tokensList[++current];
    }

    function eatTokenOfType(type) {
      if (token.type !== type) {
        throw new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "Assertion error: expected token of type " + type + ", given " + tokenToString(token));
      }

      eatToken();
    }

    function parseExportIdentifier(token, prefix) {
      var index;

      if (token.type === tokens.identifier) {
        index = t.identifier(token.value);
        eatToken();
      } else if (token.type === tokens.number) {
        index = t.identifier(prefix + "_" + token.value);
        index = t.withRaw(index, String(token.value));
        eatToken();
      }

      return index;
    }

    function lookaheadAndCheck() {
      var len = arguments.length;

      for (var i = 0; i < len; i++) {
        var tokenAhead = tokensList[current + i];
        var expectedToken = i < 0 || arguments.length <= i ? undefined : arguments[i];

        if (tokenAhead.type === "keyword") {
          if (isKeyword(tokenAhead, expectedToken) === false) {
            return false;
          }
        } else if (expectedToken !== tokenAhead.type) {
          return false;
        }
      }

      return true;
    } // TODO(sven): there is probably a better way to do this
    // can refactor it if it get out of hands


    function maybeIgnoreComment() {
      if (token.type === tokens.comment) {
        eatToken();
      }
    }
    /**
     * Parses a memory instruction
     *
     * WAST:
     *
     * memory:  ( memory <name>? <memory_sig> )
     *          ( memory <name>? ( export <string> ) <...> )
     *          ( memory <name>? ( import <string> <string> ) <memory_sig> )
     *          ( memory <name>? ( export <string> )* ( data <string>* )
     * memory_sig: <nat> <nat>?
     *
     */


    function parseMemory() {
      var id = t.identifier(getUniqueName("memory"));
      var limits = t.limits(0);

      if (token.type === tokens.string || token.type === tokens.identifier) {
        id = t.identifier(token.value);
        eatToken();
      } else {
        id = t.withRaw(id, ""); // preserve anonymous
      }
      /**
       * Maybe data
       */


      if (lookaheadAndCheck(tokens.openParen, keywords.data)) {
        eatToken(); // (

        eatToken(); // data
        // TODO(sven): do something with the data collected here

        var stringInitializer = token.value;
        eatTokenOfType(tokens.string); // Update limits accordingly

        limits = t.limits(stringInitializer.length);
        eatTokenOfType(tokens.closeParen);
      }
      /**
       * Maybe export
       */


      if (lookaheadAndCheck(tokens.openParen, keywords.export)) {
        eatToken(); // (

        eatToken(); // export

        if (token.type !== tokens.string) {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Expected string in export" + ", given " + tokenToString(token));
          }();
        }

        var _name = token.value;
        eatToken();
        state.registredExportedElements.push({
          exportType: "Memory",
          name: _name,
          id: id
        });
        eatTokenOfType(tokens.closeParen);
      }
      /**
       * Memory signature
       */


      if (token.type === tokens.number) {
        limits = t.limits((0, _numberLiterals.parse32I)(token.value));
        eatToken();

        if (token.type === tokens.number) {
          limits.max = (0, _numberLiterals.parse32I)(token.value);
          eatToken();
        }
      }

      return t.memory(limits, id);
    }
    /**
     * Parses a data section
     * https://webassembly.github.io/spec/core/text/modules.html#data-segments
     *
     * WAST:
     *
     * data:  ( data <index>? <offset> <string> )
     */


    function parseData() {
      // optional memory index
      var memidx = 0;

      if (token.type === tokens.number) {
        memidx = token.value;
        eatTokenOfType(tokens.number); // .
      }

      eatTokenOfType(tokens.openParen);
      var offset;

      if (token.type === tokens.valtype) {
        eatTokenOfType(tokens.valtype); // i32

        eatTokenOfType(tokens.dot); // .

        if (token.value !== "const") {
          throw new Error("constant expression required");
        }

        eatTokenOfType(tokens.name); // const

        var numberLiteral = t.numberLiteral(token.value, "i32");
        offset = t.objectInstruction("const", "i32", [numberLiteral]);
        eatToken();
        eatTokenOfType(tokens.closeParen);
      } else {
        eatTokenOfType(tokens.name); // get_global

        var _numberLiteral = t.numberLiteral(token.value, "i32");

        offset = t.instruction("get_global", [_numberLiteral]);
        eatToken();
        eatTokenOfType(tokens.closeParen);
      }

      var byteArray = (0, _stringLiterals.parseString)(token.value);
      eatToken(); // "string"

      return t.data(t.memIndexLiteral(memidx), offset, t.byteArray(byteArray));
    }
    /**
     * Parses a table instruction
     *
     * WAST:
     *
     * table:   ( table <name>? <table_type> )
     *          ( table <name>? ( export <string> ) <...> )
     *          ( table <name>? ( import <string> <string> ) <table_type> )
     *          ( table <name>? ( export <string> )* <elem_type> ( elem <var>* ) )
     *
     * table_type:  <nat> <nat>? <elem_type>
     * elem_type: anyfunc
     *
     * elem:    ( elem <var>? (offset <instr>* ) <var>* )
     *          ( elem <var>? <expr> <var>* )
     */


    function parseTable() {
      var name = t.identifier(getUniqueName("table"));
      var limit = t.limits(0);
      var elemIndices = [];
      var elemType = "anyfunc";

      if (token.type === tokens.string || token.type === tokens.identifier) {
        name = t.identifier(token.value);
        eatToken();
      } else {
        name = t.withRaw(name, ""); // preserve anonymous
      }

      while (token.type !== tokens.closeParen) {
        /**
         * Maybe export
         */
        if (lookaheadAndCheck(tokens.openParen, keywords.elem)) {
          eatToken(); // (

          eatToken(); // elem

          while (token.type === tokens.identifier) {
            elemIndices.push(t.identifier(token.value));
            eatToken();
          }

          eatTokenOfType(tokens.closeParen);
        } else if (lookaheadAndCheck(tokens.openParen, keywords.export)) {
          eatToken(); // (

          eatToken(); // export

          if (token.type !== tokens.string) {
            throw function () {
              return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Expected string in export" + ", given " + tokenToString(token));
            }();
          }

          var exportName = token.value;
          eatToken();
          state.registredExportedElements.push({
            exportType: "Table",
            name: exportName,
            id: name
          });
          eatTokenOfType(tokens.closeParen);
        } else if (isKeyword(token, keywords.anyfunc)) {
          // It's the default value, we can ignore it
          eatToken(); // anyfunc
        } else if (token.type === tokens.number) {
          /**
           * Table type
           */
          var min = parseInt(token.value);
          eatToken();

          if (token.type === tokens.number) {
            var max = parseInt(token.value);
            eatToken();
            limit = t.limits(min, max);
          } else {
            limit = t.limits(min);
          }

          eatToken();
        } else {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token" + ", given " + tokenToString(token));
          }();
        }
      }

      if (elemIndices.length > 0) {
        return t.table(elemType, limit, name, elemIndices);
      } else {
        return t.table(elemType, limit, name);
      }
    }
    /**
     * Parses an import statement
     *
     * WAST:
     *
     * import:  ( import <string> <string> <imkind> )
     * imkind:  ( func <name>? <func_sig> )
     *          ( global <name>? <global_sig> )
     *          ( table <name>? <table_sig> )
     *          ( memory <name>? <memory_sig> )
     *
     * global_sig: <type> | ( mut <type> )
     */


    function parseImport() {
      if (token.type !== tokens.string) {
        throw new Error("Expected a string, " + token.type + " given.");
      }

      var moduleName = token.value;
      eatToken();

      if (token.type !== tokens.string) {
        throw new Error("Expected a string, " + token.type + " given.");
      }

      var name = token.value;
      var fnName = t.identifier("".concat(moduleName, ".").concat(name));
      eatToken();
      eatTokenOfType(tokens.openParen);
      var descr;

      if (isKeyword(token, keywords.func)) {
        eatToken(); // keyword

        var fnParams = [];
        var fnResult = [];

        if (token.type === tokens.identifier) {
          fnName = t.identifier(token.value);
          eatToken();
        }

        while (token.type === tokens.openParen) {
          eatToken();

          if (lookaheadAndCheck(keywords.param) === true) {
            eatToken();
            fnParams.push.apply(fnParams, _toConsumableArray(parseFuncParam()));
          } else if (lookaheadAndCheck(keywords.result) === true) {
            eatToken();
            fnResult.push.apply(fnResult, _toConsumableArray(parseFuncResult()));
          } else {
            throw function () {
              return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in import of type" + ", given " + tokenToString(token));
            }();
          }

          eatTokenOfType(tokens.closeParen);
        }

        if (typeof fnName === "undefined") {
          throw new Error("Imported function must have a name");
        }

        descr = t.funcImportDescr(fnName, fnParams, fnResult);
      } else if (isKeyword(token, keywords.global)) {
        eatToken(); // keyword

        if (token.type === tokens.openParen) {
          eatToken(); // (

          eatTokenOfType(tokens.keyword); // mut keyword

          var valtype = token.value;
          eatToken();
          descr = t.globalImportDescr(valtype, "var");
          eatTokenOfType(tokens.closeParen);
        } else {
          var _valtype = token.value;
          eatTokenOfType(tokens.valtype);
          descr = t.globalImportDescr(_valtype, "const");
        }
      } else if (isKeyword(token, keywords.memory) === true) {
        eatToken(); // Keyword

        descr = parseMemory();
      } else if (isKeyword(token, keywords.table) === true) {
        eatToken(); // Keyword

        descr = parseTable();
      } else {
        throw new Error("Unsupported import type: " + tokenToString(token));
      }

      eatTokenOfType(tokens.closeParen);
      eatTokenOfType(tokens.closeParen);
      return t.moduleImport(moduleName, name, descr);
    }
    /**
     * Parses a block instruction
     *
     * WAST:
     *
     * expr: ( block <name>? <block_sig> <instr>* )
     * instr: block <name>? <block_sig> <instr>* end <name>?
     * block_sig : ( result <type>* )*
     *
     */


    function parseBlock() {
      var label = t.identifier(getUniqueName("block"));
      var blockResult = null;
      var instr = [];

      if (token.type === tokens.identifier) {
        label = t.identifier(token.value);
        eatToken();
      } else {
        label = t.withRaw(label, ""); // preserve anonymous
      }

      while (token.type === tokens.openParen) {
        eatToken();

        if (lookaheadAndCheck(keywords.result) === true) {
          eatToken();
          blockResult = token.value;
          eatToken();
        } else if (lookaheadAndCheck(tokens.name) === true || lookaheadAndCheck(tokens.valtype) === true || token.type === "keyword" // is any keyword
        ) {
            // Instruction
            instr.push(parseFuncInstr());
          } else {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in block body of type" + ", given " + tokenToString(token));
          }();
        }

        eatTokenOfType(tokens.closeParen);
      }

      return t.blockInstruction(label, instr, blockResult);
    }
    /**
     * Parses a if instruction
     *
     * WAST:
     *
     * expr:
     * ( if <name>? <block_sig> ( then <instr>* ) ( else <instr>* )? )
     * ( if <name>? <block_sig> <expr>+ ( then <instr>* ) ( else <instr>* )? )
     *
     * instr:
     * if <name>? <block_sig> <instr>* end <name>?
     * if <name>? <block_sig> <instr>* else <name>? <instr>* end <name>?
     *
     * block_sig : ( result <type>* )*
     *
     */


    function parseIf() {
      var blockResult;
      var label = t.identifier(getUniqueName("if"));
      var testInstrs = [];
      var consequent = [];
      var alternate = [];

      if (token.type === tokens.identifier) {
        label = t.identifier(token.value);
        eatToken();
      } else {
        label = t.withRaw(label, ""); // preserve anonymous
      }

      while (token.type === tokens.openParen) {
        eatToken(); // (

        /**
         * Block signature
         */

        if (isKeyword(token, keywords.result) === true) {
          eatToken();
          blockResult = token.value;
          eatTokenOfType(tokens.valtype);
          eatTokenOfType(tokens.closeParen);
          continue;
        }
        /**
         * Then
         */


        if (isKeyword(token, keywords.then) === true) {
          eatToken(); // then

          while (token.type === tokens.openParen) {
            eatToken(); // Instruction

            if (lookaheadAndCheck(tokens.name) === true || lookaheadAndCheck(tokens.valtype) === true || token.type === "keyword" // is any keyword
            ) {
                consequent.push(parseFuncInstr());
              } else {
              throw function () {
                return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in consequent body of type" + ", given " + tokenToString(token));
              }();
            }

            eatTokenOfType(tokens.closeParen);
          }

          eatTokenOfType(tokens.closeParen);
          continue;
        }
        /**
         * Alternate
         */


        if (isKeyword(token, keywords.else)) {
          eatToken(); // else

          while (token.type === tokens.openParen) {
            eatToken(); // Instruction

            if (lookaheadAndCheck(tokens.name) === true || lookaheadAndCheck(tokens.valtype) === true || token.type === "keyword" // is any keyword
            ) {
                alternate.push(parseFuncInstr());
              } else {
              throw function () {
                return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in alternate body of type" + ", given " + tokenToString(token));
              }();
            }

            eatTokenOfType(tokens.closeParen);
          }

          eatTokenOfType(tokens.closeParen);
          continue;
        }
        /**
         * Test instruction
         */


        if (lookaheadAndCheck(tokens.name) === true || lookaheadAndCheck(tokens.valtype) === true || token.type === "keyword" // is any keyword
        ) {
            testInstrs.push(parseFuncInstr());
            eatTokenOfType(tokens.closeParen);
            continue;
          }

        throw function () {
          return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in if body" + ", given " + tokenToString(token));
        }();
      }

      return t.ifInstruction(label, blockResult, testInstrs, consequent, alternate);
    }
    /**
     * Parses a loop instruction
     *
     * WAT:
     *
     * blockinstr :: 'loop' I:label rt:resulttype (in:instr*) 'end' id?
     *
     * WAST:
     *
     * instr     :: loop <name>? <block_sig> <instr>* end <name>?
     * expr      :: ( loop <name>? <block_sig> <instr>* )
     * block_sig :: ( result <type>* )*
     *
     */


    function parseLoop() {
      var label = t.identifier(getUniqueName("loop"));
      var blockResult;
      var instr = [];

      if (token.type === tokens.identifier) {
        label = t.identifier(token.value);
        eatToken();
      } else {
        label = t.withRaw(label, ""); // preserve anonymous
      }

      while (token.type === tokens.openParen) {
        eatToken();

        if (lookaheadAndCheck(keywords.result) === true) {
          eatToken();
          blockResult = token.value;
          eatToken();
        } else if (lookaheadAndCheck(tokens.name) === true || lookaheadAndCheck(tokens.valtype) === true || token.type === "keyword" // is any keyword
        ) {
            // Instruction
            instr.push(parseFuncInstr());
          } else {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in loop body" + ", given " + tokenToString(token));
          }();
        }

        eatTokenOfType(tokens.closeParen);
      }

      return t.loopInstruction(label, blockResult, instr);
    }

    function parseCallIndirect() {
      var typeRef;
      var params = [];
      var results = [];
      var instrs = [];

      while (token.type !== tokens.closeParen) {
        if (lookaheadAndCheck(tokens.openParen, keywords.type)) {
          eatToken(); // (

          eatToken(); // type

          typeRef = parseTypeReference();
        } else if (lookaheadAndCheck(tokens.openParen, keywords.param)) {
          eatToken(); // (

          eatToken(); // param

          /**
           * Params can be empty:
           * (params)`
           */

          if (token.type !== tokens.closeParen) {
            params.push.apply(params, _toConsumableArray(parseFuncParam()));
          }
        } else if (lookaheadAndCheck(tokens.openParen, keywords.result)) {
          eatToken(); // (

          eatToken(); // result

          /**
           * Results can be empty:
           * (result)`
           */

          if (token.type !== tokens.closeParen) {
            results.push.apply(results, _toConsumableArray(parseFuncResult()));
          }
        } else {
          eatTokenOfType(tokens.openParen);
          instrs.push(parseFuncInstr());
        }

        eatTokenOfType(tokens.closeParen);
      }

      if (typeRef !== undefined) {
        return t.callIndirectInstructionWithTypeRef(typeRef, instrs);
      } else {
        return t.callIndirectInstruction(params, results, instrs);
      }
    }
    /**
     * Parses an export instruction
     *
     * WAT:
     *
     * export:  ( export <string> <exkind> )
     * exkind:  ( func <var> )
     *          ( global <var> )
     *          ( table <var> )
     *          ( memory <var> )
     * var:    <nat> | <name>
     *
     */


    function parseExport() {
      if (token.type !== tokens.string) {
        throw new Error("Expected string after export, got: " + token.type);
      }

      var name = token.value;
      eatToken();
      var type = "";
      var index;

      if (token.type === tokens.openParen) {
        eatToken();

        while (token.type !== tokens.closeParen) {
          if (isKeyword(token, keywords.func)) {
            type = "Func";
            eatToken();
            index = parseExportIdentifier(token, "func");
          } else if (isKeyword(token, keywords.table)) {
            type = "Table";
            eatToken();
            index = parseExportIdentifier(token, "table");
          } else if (isKeyword(token, keywords.global)) {
            type = "Global";
            eatToken();
            index = parseExportIdentifier(token, "global");
          } else if (isKeyword(token, keywords.memory)) {
            type = "Memory";
            eatToken();
            index = parseExportIdentifier(token, "memory");
          }

          eatToken();
        }
      }

      if (type === "") {
        throw new Error("Unknown export type");
      }

      if (index === undefined) {
        throw new Error("Exported function must have a name");
      }

      eatTokenOfType(tokens.closeParen);
      return t.moduleExport(name, type, index);
    }

    function parseModule() {
      var name = null;
      var isBinary = false;
      var isQuote = false;
      var moduleFields = [];

      if (token.type === tokens.identifier) {
        name = token.value;
        eatToken();
      }

      if (hasPlugin("wast") && token.type === tokens.name && token.value === "binary") {
        eatToken();
        isBinary = true;
      }

      if (hasPlugin("wast") && token.type === tokens.name && token.value === "quote") {
        eatToken();
        isQuote = true;
      }

      if (isBinary === true) {
        var blob = [];

        while (token.type === tokens.string) {
          blob.push(token.value);
          eatToken();
          maybeIgnoreComment();
          maybeIgnoreComment();
        }

        eatTokenOfType(tokens.closeParen);
        return t.binaryModule(name, blob);
      }

      if (isQuote === true) {
        var string = [];

        while (token.type === tokens.string) {
          string.push(token.value);
          eatToken();
        }

        eatTokenOfType(tokens.closeParen);
        return t.quoteModule(name, string);
      }

      while (token.type !== tokens.closeParen) {
        moduleFields.push(walk());

        if (state.registredExportedElements.length > 0) {
          state.registredExportedElements.forEach(function (decl) {
            moduleFields.push(t.moduleExport(decl.name, decl.exportType, decl.id));
          });
          state.registredExportedElements = [];
        }

        token = tokensList[current];
      }

      eatTokenOfType(tokens.closeParen);
      return t.module(name, moduleFields);
    }
    /**
     * Parses the arguments of an instruction
     */


    function parseFuncInstrArguments(signature) {
      var args = [];
      var namedArgs = {};
      var signaturePtr = 0;

      while (token.type === tokens.name || isKeyword(token, keywords.offset)) {
        var key = token.value;
        eatToken();
        eatTokenOfType(tokens.equal);
        var value = void 0;

        if (token.type === tokens.number) {
          value = t.numberLiteral(token.value);
        } else {
          throw new Error("Unexpected type for argument: " + token.type);
        }

        namedArgs[key] = value;
        eatToken();
      }

      while (token.type !== tokens.closeParen) {
        if (token.type === tokens.identifier) {
          args.push(t.identifier(token.value));
          eatToken();
        } else if (token.type === tokens.valtype) {
          // Handle locals
          args.push(t.valtype(token.value));
          eatToken();
        } else if (token.type === tokens.string) {
          args.push(t.stringLiteral(token.value));
          eatToken();
        } else if (token.type === tokens.number) {
          args.push( // TODO(sven): refactor the type signature handling
          // https://github.com/xtuc/webassemblyjs/pull/129 is a good start
          // $FlowIgnore
          t.numberLiteral(token.value, signature[signaturePtr++] || "f64"));
          eatToken();
        } else if (token.type === tokens.openParen) {
          /**
           * Maybe some nested instructions
           */
          eatToken(); // Instruction

          if (lookaheadAndCheck(tokens.name) === true || lookaheadAndCheck(tokens.valtype) === true || token.type === "keyword" // is any keyword
          ) {
              args.push(parseFuncInstr());
            } else {
            throw function () {
              return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in nested instruction" + ", given " + tokenToString(token));
            }();
          }

          if (token.type === tokens.closeParen) {
            eatToken();
          }
        } else {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in instruction argument" + ", given " + tokenToString(token));
          }();
        }
      }

      return {
        args: args,
        namedArgs: namedArgs
      };
    }
    /**
     * Parses an instruction
     *
     * WAT:
     *
     * instr      :: plaininst
     *               blockinstr
     *
     * blockinstr :: 'block' I:label rt:resulttype (in:instr*) 'end' id?
     *               'loop' I:label rt:resulttype (in:instr*) 'end' id?
     *               'if' I:label rt:resulttype (in:instr*) 'else' id? (in2:intr*) 'end' id?
     *
     * plaininst  :: 'unreachable'
     *               'nop'
     *               'br' l:labelidx
     *               'br_if' l:labelidx
     *               'br_table' l*:vec(labelidx) ln:labelidx
     *               'return'
     *               'call' x:funcidx
     *               'call_indirect' x, I:typeuse
     *
     * WAST:
     *
     * instr:
     *   <expr>
     *   <op>
     *   block <name>? <block_sig> <instr>* end <name>?
     *   loop <name>? <block_sig> <instr>* end <name>?
     *   if <name>? <block_sig> <instr>* end <name>?
     *   if <name>? <block_sig> <instr>* else <name>? <instr>* end <name>?
     *
     * expr:
     *   ( <op> )
     *   ( <op> <expr>+ )
     *   ( block <name>? <block_sig> <instr>* )
     *   ( loop <name>? <block_sig> <instr>* )
     *   ( if <name>? <block_sig> ( then <instr>* ) ( else <instr>* )? )
     *   ( if <name>? <block_sig> <expr>+ ( then <instr>* ) ( else <instr>* )? )
     *
     * op:
     *   unreachable
     *   nop
     *   br <var>
     *   br_if <var>
     *   br_table <var>+
     *   return
     *   call <var>
     *   call_indirect <func_sig>
     *   drop
     *   select
     *   get_local <var>
     *   set_local <var>
     *   tee_local <var>
     *   get_global <var>
     *   set_global <var>
     *   <type>.load((8|16|32)_<sign>)? <offset>? <align>?
     *   <type>.store(8|16|32)? <offset>? <align>?
     *   current_memory
     *   grow_memory
     *   <type>.const <value>
     *   <type>.<unop>
     *   <type>.<binop>
     *   <type>.<testop>
     *   <type>.<relop>
     *   <type>.<cvtop>/<type>
     *
     * func_type:   ( type <var> )? <param>* <result>*
     */


    function parseFuncInstr() {
      var startLoc = token.loc.start;
      /**
       * A simple instruction
       */

      if (token.type === tokens.name || token.type === tokens.valtype) {
        var _name2 = token.value;
        var object;
        eatToken();

        if (token.type === tokens.dot) {
          object = _name2;
          eatToken();

          if (token.type !== tokens.name) {
            throw new TypeError("Unknown token: " + token.type + ", name expected");
          }

          _name2 = token.value;
          eatToken();
        }

        if (token.type === tokens.closeParen) {
          var _endLoc = token.loc.end;

          if (typeof object === "undefined") {
            return t.withLoc(t.instruction(_name2), _endLoc, startLoc);
          } else {
            return t.withLoc(t.objectInstruction(_name2, object, []), _endLoc, startLoc);
          }
        }

        var signature = t.signature(object || "", _name2);

        var _parseFuncInstrArgume = parseFuncInstrArguments(signature),
            _args = _parseFuncInstrArgume.args,
            _namedArgs = _parseFuncInstrArgume.namedArgs;

        var endLoc = token.loc.end;

        if (typeof object === "undefined") {
          return t.withLoc(t.instruction(_name2, _args, _namedArgs), endLoc, startLoc);
        } else {
          return t.withLoc(t.objectInstruction(_name2, object, _args, _namedArgs), endLoc, startLoc);
        }
      } else if (isKeyword(token, keywords.loop)) {
        /**
         * Else a instruction with a keyword (loop or block)
         */
        eatToken(); // keyword

        return parseLoop();
      } else if (isKeyword(token, keywords.block)) {
        eatToken(); // keyword

        return parseBlock();
      } else if (isKeyword(token, keywords.call_indirect)) {
        eatToken(); // keyword

        return parseCallIndirect();
      } else if (isKeyword(token, keywords.call)) {
        eatToken(); // keyword

        var index;

        if (token.type === tokens.identifier) {
          index = t.identifier(token.value);
          eatToken();
        } else if (token.type === tokens.number) {
          index = t.indexLiteral(token.value);
          eatToken();
        }

        var instrArgs = []; // Nested instruction

        while (token.type === tokens.openParen) {
          eatToken();
          instrArgs.push(parseFuncInstr());
          eatTokenOfType(tokens.closeParen);
        }

        if (typeof index === "undefined") {
          throw new Error("Missing argument in call instruciton");
        }

        if (instrArgs.length > 0) {
          return t.callInstruction(index, instrArgs);
        } else {
          return t.callInstruction(index);
        }
      } else if (isKeyword(token, keywords.if)) {
        eatToken(); // Keyword

        return parseIf();
      } else if (isKeyword(token, keywords.module) && hasPlugin("wast")) {
        eatToken(); // In WAST you can have a module as an instruction's argument
        // we will cast it into a instruction to not break the flow
        // $FlowIgnore

        var module = parseModule();
        return module;
      } else {
        throw function () {
          return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected instruction in function body" + ", given " + tokenToString(token));
        }();
      }
    }
    /*
     * Parses a function
     *
     * WAT:
     *
     * functype :: ( 'func' t1:vec(param) t2:vec(result) )
     * param    :: ( 'param' id? t:valtype )
     * result   :: ( 'result' t:valtype )
     *
     * WAST:
     *
     * func     :: ( func <name>? <func_sig> <local>* <instr>* )
     *             ( func <name>? ( export <string> ) <...> )
     *             ( func <name>? ( import <string> <string> ) <func_sig> )
     * func_sig :: ( type <var> )? <param>* <result>*
     * param    :: ( param <type>* ) | ( param <name> <type> )
     * result   :: ( result <type>* )
     * local    :: ( local <type>* ) | ( local <name> <type> )
     *
     */


    function parseFunc() {
      var fnName = t.identifier(getUniqueName("func"));
      var typeRef;
      var fnBody = [];
      var fnParams = [];
      var fnResult = []; // name

      if (token.type === tokens.identifier) {
        fnName = t.identifier(token.value);
        eatToken();
      } else {
        fnName = t.withRaw(fnName, ""); // preserve anonymous
      }

      maybeIgnoreComment();

      while (token.type === tokens.openParen) {
        eatToken();

        if (lookaheadAndCheck(keywords.param) === true) {
          eatToken();
          fnParams.push.apply(fnParams, _toConsumableArray(parseFuncParam()));
        } else if (lookaheadAndCheck(keywords.result) === true) {
          eatToken();
          fnResult.push.apply(fnResult, _toConsumableArray(parseFuncResult()));
        } else if (lookaheadAndCheck(keywords.export) === true) {
          eatToken();
          parseFuncExport(fnName);
        } else if (lookaheadAndCheck(keywords.type) === true) {
          eatToken();
          typeRef = parseTypeReference();
        } else if (lookaheadAndCheck(tokens.name) === true || lookaheadAndCheck(tokens.valtype) === true || token.type === "keyword" // is any keyword
        ) {
            // Instruction
            fnBody.push(parseFuncInstr());
          } else {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in func body" + ", given " + tokenToString(token));
          }();
        }

        eatTokenOfType(tokens.closeParen);
      }

      if (typeRef !== undefined) {
        return t.funcWithTypeRef(fnName, typeRef, fnBody);
      } else {
        return t.func(fnName, fnParams, fnResult, fnBody);
      }
    }
    /**
     * Parses shorthand export in func
     *
     * export :: ( export <string> )
     */


    function parseFuncExport(funcId) {
      if (token.type !== tokens.string) {
        throw function () {
          return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Function export expected a string" + ", given " + tokenToString(token));
        }();
      }

      var name = token.value;
      eatToken();
      /**
       * Func export shorthand, we trait it as a syntaxic sugar.
       * A export ModuleField will be added later.
       *
       * We give the anonymous function a generated name and export it.
       */

      var id = t.identifier(funcId.value);
      state.registredExportedElements.push({
        exportType: "Func",
        name: name,
        id: id
      });
    }
    /**
     * Parses a type instruction
     *
     * WAST:
     *
     * typedef: ( type <name>? ( func <param>* <result>* ) )
     */


    function parseType() {
      var id;
      var params = [];
      var result = [];

      if (token.type === tokens.identifier) {
        id = t.identifier(token.value);
        eatToken();
      }

      if (lookaheadAndCheck(tokens.openParen, keywords.func)) {
        eatToken(); // (

        eatToken(); // func

        if (token.type === tokens.closeParen) {
          eatToken(); // function with an empty signature, we can abort here

          return t.typeInstructionFunc([], [], id);
        }

        if (lookaheadAndCheck(tokens.openParen, keywords.param)) {
          eatToken(); // (

          eatToken(); // param

          params = parseFuncParam();
          eatTokenOfType(tokens.closeParen);
        }

        if (lookaheadAndCheck(tokens.openParen, keywords.result)) {
          eatToken(); // (

          eatToken(); // param

          result = parseFuncResult();
          eatTokenOfType(tokens.closeParen);
        }

        eatTokenOfType(tokens.closeParen);
      }

      return t.typeInstructionFunc(params, result, id);
    }
    /**
     * Parses a function result
     *
     * WAST:
     *
     * result :: ( result <type>* )
     */


    function parseFuncResult() {
      var results = [];

      if (token.type !== tokens.valtype) {
        throw function () {
          return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unexpected token in func result" + ", given " + tokenToString(token));
        }();
      }

      var valtype = token.value;
      eatToken();
      results.push(valtype);
      return results;
    }
    /**
     * Parses a type reference
     *
     */


    function parseTypeReference() {
      var ref;

      if (token.type === tokens.identifier) {
        ref = t.identifier(token.value);
        eatToken();
      } else if (token.type === tokens.number) {
        ref = t.numberLiteral(token.value);
        eatToken();
      }

      return ref;
    }
    /**
     * Parses a global instruction
     *
     * WAST:
     *
     * global:  ( global <name>? <global_sig> <instr>* )
     *          ( global <name>? ( export <string> ) <...> )
     *          ( global <name>? ( import <string> <string> ) <global_sig> )
     *
     * global_sig: <type> | ( mut <type> )
     *
     */


    function parseGlobal() {
      var name = t.identifier(getUniqueName("global"));
      var type; // Keep informations in case of a shorthand import

      var importing = null;
      maybeIgnoreComment();

      if (token.type === tokens.identifier) {
        name = t.identifier(token.value);
        eatToken();
      } else {
        name = t.withRaw(name, ""); // preserve anonymous
      }
      /**
       * maybe export
       */


      if (lookaheadAndCheck(tokens.openParen, keywords.export)) {
        eatToken(); // (

        eatToken(); // export

        var exportName = token.value;
        eatTokenOfType(tokens.string);
        state.registredExportedElements.push({
          exportType: "Global",
          name: exportName,
          id: name
        });
        eatTokenOfType(tokens.closeParen);
      }
      /**
       * maybe import
       */


      if (lookaheadAndCheck(tokens.openParen, keywords.import)) {
        eatToken(); // (

        eatToken(); // import

        var moduleName = token.value;
        eatTokenOfType(tokens.string);
        var _name3 = token.value;
        eatTokenOfType(tokens.string);
        importing = {
          module: moduleName,
          name: _name3,
          descr: undefined
        };
        eatTokenOfType(tokens.closeParen);
      }
      /**
       * global_sig
       */


      if (token.type === tokens.valtype) {
        type = t.globalImportDescr(token.value, "const");
        eatToken();
      } else if (token.type === tokens.openParen) {
        eatToken(); // (

        if (isKeyword(token, keywords.mut) === false) {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unsupported global type, expected mut" + ", given " + tokenToString(token));
          }();
        }

        eatToken(); // mut

        type = t.globalType(token.value, "var");
        eatToken();
        eatTokenOfType(tokens.closeParen);
      }

      if (type === undefined) {
        throw function () {
          return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Could not determine global type" + ", given " + tokenToString(token));
        }();
      }

      maybeIgnoreComment();
      var init = [];

      if (importing != null) {
        importing.descr = type;
        init.push(t.moduleImport(importing.module, importing.name, importing.descr));
      }
      /**
       * instr*
       */


      while (token.type === tokens.openParen) {
        eatToken();
        init.push(parseFuncInstr());
        eatTokenOfType(tokens.closeParen);
      }

      return t.global(type, init, name);
    }
    /**
     * Parses a function param
     *
     * WAST:
     *
     * param    :: ( param <type>* ) | ( param <name> <type> )
     */


    function parseFuncParam() {
      var params = [];
      var id;
      var valtype;

      if (token.type === tokens.identifier) {
        id = token.value;
        eatToken();
      }

      if (token.type === tokens.valtype) {
        valtype = token.value;
        eatToken();
        params.push({
          id: id,
          valtype: valtype
        });
        /**
         * Shorthand notation for multiple anonymous parameters
         * @see https://webassembly.github.io/spec/core/text/types.html#function-types
         * @see https://github.com/xtuc/webassemblyjs/issues/6
         */

        if (id === undefined) {
          while (token.type === tokens.valtype) {
            valtype = token.value;
            eatToken();
            params.push({
              id: undefined,
              valtype: valtype
            });
          }
        }
      } else {
        throw new Error("Function param has no valtype");
      }

      return params;
    }
    /**
     * Parses an element segments instruction
     *
     * WAST:
     *
     * elem:    ( elem <var>? (offset <instr>* ) <var>* )
     *          ( elem <var>? <expr> <var>* )
     *
     * var:    <nat> | <name>
     */


    function parseElem() {
      var tableIndex;
      var offset = [];
      var funcs = [];

      if (token.type === tokens.identifier) {
        tableIndex = t.identifier(token.value);
        eatToken();
      }

      if (token.type === tokens.number) {
        tableIndex = t.indexLiteral(token.value);
        eatToken();
      }

      while (token.type !== tokens.closeParen) {
        if (lookaheadAndCheck(tokens.openParen, keywords.offset)) {
          eatToken(); // (

          eatToken(); // offset

          while (token.type !== tokens.closeParen) {
            eatTokenOfType(tokens.openParen);
            offset.push(parseFuncInstr());
            eatTokenOfType(tokens.closeParen);
          }

          eatTokenOfType(tokens.closeParen);
        } else if (token.type === tokens.identifier) {
          funcs.push(t.identifier(token.value));
          eatToken();
        } else if (token.type === tokens.number) {
          funcs.push(t.indexLiteral(token.value));
          eatToken();
        } else if (token.type === tokens.openParen) {
          eatToken(); // (

          offset.push(parseFuncInstr());
          eatTokenOfType(tokens.closeParen);
        } else {
          throw function () {
            return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unsupported token in elem" + ", given " + tokenToString(token));
          }();
        }
      }

      return t.elem(tableIndex, offset, funcs);
    }
    /**
     * Parses the start instruction in a module
     *
     * WAST:
     *
     * start:   ( start <var> )
     * var:    <nat> | <name>
     *
     * WAT:
     * start ::= ‘(’ ‘start’  x:funcidx ‘)’
     */


    function parseStart() {
      if (token.type === tokens.identifier) {
        var index = t.identifier(token.value);
        eatToken();
        return t.start(index);
      }

      if (token.type === tokens.number) {
        var _index = t.indexLiteral(token.value);

        eatToken();
        return t.start(_index);
      }

      throw new Error("Unknown start, token: " + tokenToString(token));
    }

    if (token.type === tokens.openParen) {
      eatToken();

      if (isKeyword(token, keywords.export)) {
        eatToken();
        return parseExport();
      }

      if (isKeyword(token, keywords.loop)) {
        eatToken();
        return parseLoop();
      }

      if (isKeyword(token, keywords.func)) {
        eatToken();
        var node = parseFunc();
        eatTokenOfType(tokens.closeParen);
        return node;
      }

      if (isKeyword(token, keywords.module)) {
        eatToken();
        return parseModule();
      }

      if (isKeyword(token, keywords.import)) {
        eatToken();
        return parseImport();
      }

      if (isKeyword(token, keywords.block)) {
        eatToken();

        var _node = parseBlock();

        eatTokenOfType(tokens.closeParen);
        return _node;
      }

      if (isKeyword(token, keywords.memory)) {
        eatToken();

        var _node2 = parseMemory();

        eatTokenOfType(tokens.closeParen);
        return _node2;
      }

      if (isKeyword(token, keywords.data)) {
        eatToken();

        var _node3 = parseData();

        eatTokenOfType(tokens.closeParen);
        return _node3;
      }

      if (isKeyword(token, keywords.table)) {
        eatToken();

        var _node4 = parseTable();

        eatTokenOfType(tokens.closeParen);
        return _node4;
      }

      if (isKeyword(token, keywords.global)) {
        eatToken();

        var _node5 = parseGlobal();

        eatTokenOfType(tokens.closeParen);
        return _node5;
      }

      if (isKeyword(token, keywords.type)) {
        eatToken();

        var _node6 = parseType();

        eatTokenOfType(tokens.closeParen);
        return _node6;
      }

      if (isKeyword(token, keywords.start)) {
        eatToken();

        var _node7 = parseStart();

        eatTokenOfType(tokens.closeParen);
        return _node7;
      }

      if (isKeyword(token, keywords.elem)) {
        eatToken();

        var _node8 = parseElem();

        eatTokenOfType(tokens.closeParen);
        return _node8;
      }

      var instruction = parseFuncInstr();

      if (_typeof(instruction) === "object") {
        eatTokenOfType(tokens.closeParen);
        return instruction;
      }
    }

    if (token.type === tokens.comment) {
      var builder = token.opts.type === "leading" ? t.leadingComment : t.blockComment;

      var _node9 = builder(token.value);

      eatToken();
      return _node9;
    }

    throw function () {
      return new Error("\n" + (0, _helperCodeFrame.codeFrameFromSource)(source, token.loc) + "\n" + "Unknown token" + ", given " + tokenToString(token));
    }();
  }

  var body = [];

  while (current < tokensList.length) {
    body.push(walk());
  }

  return t.program(body);
}