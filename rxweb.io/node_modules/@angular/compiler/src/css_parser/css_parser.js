/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/css_parser/css_parser", ["require", "exports", "tslib", "@angular/compiler/src/chars", "@angular/compiler/src/parse_util", "@angular/compiler/src/css_parser/css_ast", "@angular/compiler/src/css_parser/css_lexer", "@angular/compiler/src/css_parser/css_lexer", "@angular/compiler/src/css_parser/css_ast"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var chars = require("@angular/compiler/src/chars");
    var parse_util_1 = require("@angular/compiler/src/parse_util");
    var css_ast_1 = require("@angular/compiler/src/css_parser/css_ast");
    var css_lexer_1 = require("@angular/compiler/src/css_parser/css_lexer");
    var SPACE_OPERATOR = ' ';
    var css_lexer_2 = require("@angular/compiler/src/css_parser/css_lexer");
    exports.CssToken = css_lexer_2.CssToken;
    var css_ast_2 = require("@angular/compiler/src/css_parser/css_ast");
    exports.BlockType = css_ast_2.BlockType;
    var SLASH_CHARACTER = '/';
    var GT_CHARACTER = '>';
    var TRIPLE_GT_OPERATOR_STR = '>>>';
    var DEEP_OPERATOR_STR = '/deep/';
    var EOF_DELIM_FLAG = 1;
    var RBRACE_DELIM_FLAG = 2;
    var LBRACE_DELIM_FLAG = 4;
    var COMMA_DELIM_FLAG = 8;
    var COLON_DELIM_FLAG = 16;
    var SEMICOLON_DELIM_FLAG = 32;
    var NEWLINE_DELIM_FLAG = 64;
    var RPAREN_DELIM_FLAG = 128;
    var LPAREN_DELIM_FLAG = 256;
    var SPACE_DELIM_FLAG = 512;
    function _pseudoSelectorSupportsInnerSelectors(name) {
        return ['not', 'host', 'host-context'].indexOf(name) >= 0;
    }
    function isSelectorOperatorCharacter(code) {
        switch (code) {
            case chars.$SLASH:
            case chars.$TILDA:
            case chars.$PLUS:
            case chars.$GT:
                return true;
            default:
                return chars.isWhitespace(code);
        }
    }
    function getDelimFromCharacter(code) {
        switch (code) {
            case chars.$EOF:
                return EOF_DELIM_FLAG;
            case chars.$COMMA:
                return COMMA_DELIM_FLAG;
            case chars.$COLON:
                return COLON_DELIM_FLAG;
            case chars.$SEMICOLON:
                return SEMICOLON_DELIM_FLAG;
            case chars.$RBRACE:
                return RBRACE_DELIM_FLAG;
            case chars.$LBRACE:
                return LBRACE_DELIM_FLAG;
            case chars.$RPAREN:
                return RPAREN_DELIM_FLAG;
            case chars.$SPACE:
            case chars.$TAB:
                return SPACE_DELIM_FLAG;
            default:
                return css_lexer_1.isNewline(code) ? NEWLINE_DELIM_FLAG : 0;
        }
    }
    function characterContainsDelimiter(code, delimiters) {
        return (getDelimFromCharacter(code) & delimiters) > 0;
    }
    var ParsedCssResult = /** @class */ (function () {
        function ParsedCssResult(errors, ast) {
            this.errors = errors;
            this.ast = ast;
        }
        return ParsedCssResult;
    }());
    exports.ParsedCssResult = ParsedCssResult;
    var CssParser = /** @class */ (function () {
        function CssParser() {
            this._errors = [];
        }
        /**
         * @param css the CSS code that will be parsed
         * @param url the name of the CSS file containing the CSS source code
         */
        CssParser.prototype.parse = function (css, url) {
            var lexer = new css_lexer_1.CssLexer();
            this._file = new parse_util_1.ParseSourceFile(css, url);
            this._scanner = lexer.scan(css, false);
            var ast = this._parseStyleSheet(EOF_DELIM_FLAG);
            var errors = this._errors;
            this._errors = [];
            var result = new ParsedCssResult(errors, ast);
            this._file = null;
            this._scanner = null;
            return result;
        };
        /** @internal */
        CssParser.prototype._parseStyleSheet = function (delimiters) {
            var results = [];
            this._scanner.consumeEmptyStatements();
            while (this._scanner.peek != chars.$EOF) {
                this._scanner.setMode(css_lexer_1.CssLexerMode.BLOCK);
                results.push(this._parseRule(delimiters));
            }
            var span = null;
            if (results.length > 0) {
                var firstRule = results[0];
                // we collect the last token like so incase there was an
                // EOF token that was emitted sometime during the lexing
                span = this._generateSourceSpan(firstRule, this._lastToken);
            }
            return new css_ast_1.CssStyleSheetAst(span, results);
        };
        /** @internal */
        CssParser.prototype._getSourceContent = function () { return this._scanner != null ? this._scanner.input : ''; };
        /** @internal */
        CssParser.prototype._extractSourceContent = function (start, end) {
            return this._getSourceContent().substring(start, end + 1);
        };
        /** @internal */
        CssParser.prototype._generateSourceSpan = function (start, end) {
            if (end === void 0) { end = null; }
            var startLoc;
            if (start instanceof css_ast_1.CssAst) {
                startLoc = start.location.start;
            }
            else {
                var token = start;
                if (token == null) {
                    // the data here is invalid, however, if and when this does
                    // occur, any other errors associated with this will be collected
                    token = this._lastToken;
                }
                startLoc = new parse_util_1.ParseLocation(this._file, token.index, token.line, token.column);
            }
            if (end == null) {
                end = this._lastToken;
            }
            var endLine = -1;
            var endColumn = -1;
            var endIndex = -1;
            if (end instanceof css_ast_1.CssAst) {
                endLine = end.location.end.line;
                endColumn = end.location.end.col;
                endIndex = end.location.end.offset;
            }
            else if (end instanceof css_lexer_1.CssToken) {
                endLine = end.line;
                endColumn = end.column;
                endIndex = end.index;
            }
            var endLoc = new parse_util_1.ParseLocation(this._file, endIndex, endLine, endColumn);
            return new parse_util_1.ParseSourceSpan(startLoc, endLoc);
        };
        /** @internal */
        CssParser.prototype._resolveBlockType = function (token) {
            switch (token.strValue) {
                case '@-o-keyframes':
                case '@-moz-keyframes':
                case '@-webkit-keyframes':
                case '@keyframes':
                    return css_ast_1.BlockType.Keyframes;
                case '@charset':
                    return css_ast_1.BlockType.Charset;
                case '@import':
                    return css_ast_1.BlockType.Import;
                case '@namespace':
                    return css_ast_1.BlockType.Namespace;
                case '@page':
                    return css_ast_1.BlockType.Page;
                case '@document':
                    return css_ast_1.BlockType.Document;
                case '@media':
                    return css_ast_1.BlockType.MediaQuery;
                case '@font-face':
                    return css_ast_1.BlockType.FontFace;
                case '@viewport':
                    return css_ast_1.BlockType.Viewport;
                case '@supports':
                    return css_ast_1.BlockType.Supports;
                default:
                    return css_ast_1.BlockType.Unsupported;
            }
        };
        /** @internal */
        CssParser.prototype._parseRule = function (delimiters) {
            if (this._scanner.peek == chars.$AT) {
                return this._parseAtRule(delimiters);
            }
            return this._parseSelectorRule(delimiters);
        };
        /** @internal */
        CssParser.prototype._parseAtRule = function (delimiters) {
            var start = this._getScannerIndex();
            this._scanner.setMode(css_lexer_1.CssLexerMode.BLOCK);
            var token = this._scan();
            var startToken = token;
            this._assertCondition(token.type == css_lexer_1.CssTokenType.AtKeyword, "The CSS Rule " + token.strValue + " is not a valid [@] rule.", token);
            var block;
            var type = this._resolveBlockType(token);
            var span;
            var tokens;
            var endToken;
            var end;
            var strValue;
            var query;
            switch (type) {
                case css_ast_1.BlockType.Charset:
                case css_ast_1.BlockType.Namespace:
                case css_ast_1.BlockType.Import:
                    var value = this._parseValue(delimiters);
                    this._scanner.setMode(css_lexer_1.CssLexerMode.BLOCK);
                    this._scanner.consumeEmptyStatements();
                    span = this._generateSourceSpan(startToken, value);
                    return new css_ast_1.CssInlineRuleAst(span, type, value);
                case css_ast_1.BlockType.Viewport:
                case css_ast_1.BlockType.FontFace:
                    block = this._parseStyleBlock(delimiters);
                    span = this._generateSourceSpan(startToken, block);
                    return new css_ast_1.CssBlockRuleAst(span, type, block);
                case css_ast_1.BlockType.Keyframes:
                    tokens = this._collectUntilDelim(delimiters | RBRACE_DELIM_FLAG | LBRACE_DELIM_FLAG);
                    // keyframes only have one identifier name
                    var name_1 = tokens[0];
                    block = this._parseKeyframeBlock(delimiters);
                    span = this._generateSourceSpan(startToken, block);
                    return new css_ast_1.CssKeyframeRuleAst(span, name_1, block);
                case css_ast_1.BlockType.MediaQuery:
                    this._scanner.setMode(css_lexer_1.CssLexerMode.MEDIA_QUERY);
                    tokens = this._collectUntilDelim(delimiters | RBRACE_DELIM_FLAG | LBRACE_DELIM_FLAG);
                    endToken = tokens[tokens.length - 1];
                    // we do not track the whitespace after the mediaQuery predicate ends
                    // so we have to calculate the end string value on our own
                    end = endToken.index + endToken.strValue.length - 1;
                    strValue = this._extractSourceContent(start, end);
                    span = this._generateSourceSpan(startToken, endToken);
                    query = new css_ast_1.CssAtRulePredicateAst(span, strValue, tokens);
                    block = this._parseBlock(delimiters);
                    strValue = this._extractSourceContent(start, this._getScannerIndex() - 1);
                    span = this._generateSourceSpan(startToken, block);
                    return new css_ast_1.CssMediaQueryRuleAst(span, strValue, query, block);
                case css_ast_1.BlockType.Document:
                case css_ast_1.BlockType.Supports:
                case css_ast_1.BlockType.Page:
                    this._scanner.setMode(css_lexer_1.CssLexerMode.AT_RULE_QUERY);
                    tokens = this._collectUntilDelim(delimiters | RBRACE_DELIM_FLAG | LBRACE_DELIM_FLAG);
                    endToken = tokens[tokens.length - 1];
                    // we do not track the whitespace after this block rule predicate ends
                    // so we have to calculate the end string value on our own
                    end = endToken.index + endToken.strValue.length - 1;
                    strValue = this._extractSourceContent(start, end);
                    span = this._generateSourceSpan(startToken, tokens[tokens.length - 1]);
                    query = new css_ast_1.CssAtRulePredicateAst(span, strValue, tokens);
                    block = this._parseBlock(delimiters);
                    strValue = this._extractSourceContent(start, block.end.offset);
                    span = this._generateSourceSpan(startToken, block);
                    return new css_ast_1.CssBlockDefinitionRuleAst(span, strValue, type, query, block);
                // if a custom @rule { ... } is used it should still tokenize the insides
                default:
                    var listOfTokens_1 = [];
                    var tokenName = token.strValue;
                    this._scanner.setMode(css_lexer_1.CssLexerMode.ALL);
                    this._error(css_lexer_1.generateErrorMessage(this._getSourceContent(), "The CSS \"at\" rule \"" + tokenName + "\" is not allowed to used here", token.strValue, token.index, token.line, token.column), token);
                    this._collectUntilDelim(delimiters | LBRACE_DELIM_FLAG | SEMICOLON_DELIM_FLAG)
                        .forEach(function (token) { listOfTokens_1.push(token); });
                    if (this._scanner.peek == chars.$LBRACE) {
                        listOfTokens_1.push(this._consume(css_lexer_1.CssTokenType.Character, '{'));
                        this._collectUntilDelim(delimiters | RBRACE_DELIM_FLAG | LBRACE_DELIM_FLAG)
                            .forEach(function (token) { listOfTokens_1.push(token); });
                        listOfTokens_1.push(this._consume(css_lexer_1.CssTokenType.Character, '}'));
                    }
                    endToken = listOfTokens_1[listOfTokens_1.length - 1];
                    span = this._generateSourceSpan(startToken, endToken);
                    return new css_ast_1.CssUnknownRuleAst(span, tokenName, listOfTokens_1);
            }
        };
        /** @internal */
        CssParser.prototype._parseSelectorRule = function (delimiters) {
            var start = this._getScannerIndex();
            var selectors = this._parseSelectors(delimiters);
            var block = this._parseStyleBlock(delimiters);
            var ruleAst;
            var span;
            var startSelector = selectors[0];
            if (block != null) {
                span = this._generateSourceSpan(startSelector, block);
                ruleAst = new css_ast_1.CssSelectorRuleAst(span, selectors, block);
            }
            else {
                var name_2 = this._extractSourceContent(start, this._getScannerIndex() - 1);
                var innerTokens_1 = [];
                selectors.forEach(function (selector) {
                    selector.selectorParts.forEach(function (part) {
                        part.tokens.forEach(function (token) { innerTokens_1.push(token); });
                    });
                });
                var endToken = innerTokens_1[innerTokens_1.length - 1];
                span = this._generateSourceSpan(startSelector, endToken);
                ruleAst = new css_ast_1.CssUnknownTokenListAst(span, name_2, innerTokens_1);
            }
            this._scanner.setMode(css_lexer_1.CssLexerMode.BLOCK);
            this._scanner.consumeEmptyStatements();
            return ruleAst;
        };
        /** @internal */
        CssParser.prototype._parseSelectors = function (delimiters) {
            delimiters |= LBRACE_DELIM_FLAG | SEMICOLON_DELIM_FLAG;
            var selectors = [];
            var isParsingSelectors = true;
            while (isParsingSelectors) {
                selectors.push(this._parseSelector(delimiters));
                isParsingSelectors = !characterContainsDelimiter(this._scanner.peek, delimiters);
                if (isParsingSelectors) {
                    this._consume(css_lexer_1.CssTokenType.Character, ',');
                    isParsingSelectors = !characterContainsDelimiter(this._scanner.peek, delimiters);
                    if (isParsingSelectors) {
                        this._scanner.consumeWhitespace();
                    }
                }
            }
            return selectors;
        };
        /** @internal */
        CssParser.prototype._scan = function () {
            var output = this._scanner.scan();
            var token = output.token;
            var error = output.error;
            if (error != null) {
                this._error(css_lexer_1.getRawMessage(error), token);
            }
            this._lastToken = token;
            return token;
        };
        /** @internal */
        CssParser.prototype._getScannerIndex = function () { return this._scanner.index; };
        /** @internal */
        CssParser.prototype._consume = function (type, value) {
            if (value === void 0) { value = null; }
            var output = this._scanner.consume(type, value);
            var token = output.token;
            var error = output.error;
            if (error != null) {
                this._error(css_lexer_1.getRawMessage(error), token);
            }
            this._lastToken = token;
            return token;
        };
        /** @internal */
        CssParser.prototype._parseKeyframeBlock = function (delimiters) {
            delimiters |= RBRACE_DELIM_FLAG;
            this._scanner.setMode(css_lexer_1.CssLexerMode.KEYFRAME_BLOCK);
            var startToken = this._consume(css_lexer_1.CssTokenType.Character, '{');
            var definitions = [];
            while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                definitions.push(this._parseKeyframeDefinition(delimiters));
            }
            var endToken = this._consume(css_lexer_1.CssTokenType.Character, '}');
            var span = this._generateSourceSpan(startToken, endToken);
            return new css_ast_1.CssBlockAst(span, definitions);
        };
        /** @internal */
        CssParser.prototype._parseKeyframeDefinition = function (delimiters) {
            var start = this._getScannerIndex();
            var stepTokens = [];
            delimiters |= LBRACE_DELIM_FLAG;
            while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                stepTokens.push(this._parseKeyframeLabel(delimiters | COMMA_DELIM_FLAG));
                if (this._scanner.peek != chars.$LBRACE) {
                    this._consume(css_lexer_1.CssTokenType.Character, ',');
                }
            }
            var stylesBlock = this._parseStyleBlock(delimiters | RBRACE_DELIM_FLAG);
            var span = this._generateSourceSpan(stepTokens[0], stylesBlock);
            var ast = new css_ast_1.CssKeyframeDefinitionAst(span, stepTokens, stylesBlock);
            this._scanner.setMode(css_lexer_1.CssLexerMode.BLOCK);
            return ast;
        };
        /** @internal */
        CssParser.prototype._parseKeyframeLabel = function (delimiters) {
            this._scanner.setMode(css_lexer_1.CssLexerMode.KEYFRAME_BLOCK);
            return css_ast_1.mergeTokens(this._collectUntilDelim(delimiters));
        };
        /** @internal */
        CssParser.prototype._parsePseudoSelector = function (delimiters) {
            var start = this._getScannerIndex();
            delimiters &= ~COMMA_DELIM_FLAG;
            // we keep the original value since we may use it to recurse when :not, :host are used
            var startingDelims = delimiters;
            var startToken = this._consume(css_lexer_1.CssTokenType.Character, ':');
            var tokens = [startToken];
            if (this._scanner.peek == chars.$COLON) { // ::something
                tokens.push(this._consume(css_lexer_1.CssTokenType.Character, ':'));
            }
            var innerSelectors = [];
            this._scanner.setMode(css_lexer_1.CssLexerMode.PSEUDO_SELECTOR);
            // host, host-context, lang, not, nth-child are all identifiers
            var pseudoSelectorToken = this._consume(css_lexer_1.CssTokenType.Identifier);
            var pseudoSelectorName = pseudoSelectorToken.strValue;
            tokens.push(pseudoSelectorToken);
            // host(), lang(), nth-child(), etc...
            if (this._scanner.peek == chars.$LPAREN) {
                this._scanner.setMode(css_lexer_1.CssLexerMode.PSEUDO_SELECTOR_WITH_ARGUMENTS);
                var openParenToken = this._consume(css_lexer_1.CssTokenType.Character, '(');
                tokens.push(openParenToken);
                // :host(innerSelector(s)), :not(selector), etc...
                if (_pseudoSelectorSupportsInnerSelectors(pseudoSelectorName)) {
                    var innerDelims = startingDelims | LPAREN_DELIM_FLAG | RPAREN_DELIM_FLAG;
                    if (pseudoSelectorName == 'not') {
                        // the inner selector inside of :not(...) can only be one
                        // CSS selector (no commas allowed) ... This is according
                        // to the CSS specification
                        innerDelims |= COMMA_DELIM_FLAG;
                    }
                    // :host(a, b, c) {
                    this._parseSelectors(innerDelims).forEach(function (selector, index) {
                        innerSelectors.push(selector);
                    });
                }
                else {
                    // this branch is for things like "en-us, 2k + 1, etc..."
                    // which all end up in pseudoSelectors like :lang, :nth-child, etc..
                    var innerValueDelims = delimiters | LBRACE_DELIM_FLAG | COLON_DELIM_FLAG |
                        RPAREN_DELIM_FLAG | LPAREN_DELIM_FLAG;
                    while (!characterContainsDelimiter(this._scanner.peek, innerValueDelims)) {
                        var token = this._scan();
                        tokens.push(token);
                    }
                }
                var closeParenToken = this._consume(css_lexer_1.CssTokenType.Character, ')');
                tokens.push(closeParenToken);
            }
            var end = this._getScannerIndex() - 1;
            var strValue = this._extractSourceContent(start, end);
            var endToken = tokens[tokens.length - 1];
            var span = this._generateSourceSpan(startToken, endToken);
            return new css_ast_1.CssPseudoSelectorAst(span, strValue, pseudoSelectorName, tokens, innerSelectors);
        };
        /** @internal */
        CssParser.prototype._parseSimpleSelector = function (delimiters) {
            var start = this._getScannerIndex();
            delimiters |= COMMA_DELIM_FLAG;
            this._scanner.setMode(css_lexer_1.CssLexerMode.SELECTOR);
            var selectorCssTokens = [];
            var pseudoSelectors = [];
            var previousToken = undefined;
            var selectorPartDelimiters = delimiters | SPACE_DELIM_FLAG;
            var loopOverSelector = !characterContainsDelimiter(this._scanner.peek, selectorPartDelimiters);
            var hasAttributeError = false;
            while (loopOverSelector) {
                var peek = this._scanner.peek;
                switch (peek) {
                    case chars.$COLON:
                        var innerPseudo = this._parsePseudoSelector(delimiters);
                        pseudoSelectors.push(innerPseudo);
                        this._scanner.setMode(css_lexer_1.CssLexerMode.SELECTOR);
                        break;
                    case chars.$LBRACKET:
                        // we set the mode after the scan because attribute mode does not
                        // allow attribute [] values. And this also will catch any errors
                        // if an extra "[" is used inside.
                        selectorCssTokens.push(this._scan());
                        this._scanner.setMode(css_lexer_1.CssLexerMode.ATTRIBUTE_SELECTOR);
                        break;
                    case chars.$RBRACKET:
                        if (this._scanner.getMode() != css_lexer_1.CssLexerMode.ATTRIBUTE_SELECTOR) {
                            hasAttributeError = true;
                        }
                        // we set the mode early because attribute mode does not
                        // allow attribute [] values
                        this._scanner.setMode(css_lexer_1.CssLexerMode.SELECTOR);
                        selectorCssTokens.push(this._scan());
                        break;
                    default:
                        if (isSelectorOperatorCharacter(peek)) {
                            loopOverSelector = false;
                            continue;
                        }
                        var token = this._scan();
                        previousToken = token;
                        selectorCssTokens.push(token);
                        break;
                }
                loopOverSelector = !characterContainsDelimiter(this._scanner.peek, selectorPartDelimiters);
            }
            hasAttributeError =
                hasAttributeError || this._scanner.getMode() == css_lexer_1.CssLexerMode.ATTRIBUTE_SELECTOR;
            if (hasAttributeError) {
                this._error("Unbalanced CSS attribute selector at column " + previousToken.line + ":" + previousToken.column, previousToken);
            }
            var end = this._getScannerIndex() - 1;
            // this happens if the selector is not directly followed by
            // a comma or curly brace without a space in between
            var operator = null;
            var operatorScanCount = 0;
            var lastOperatorToken = null;
            if (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                while (operator == null && !characterContainsDelimiter(this._scanner.peek, delimiters) &&
                    isSelectorOperatorCharacter(this._scanner.peek)) {
                    var token = this._scan();
                    var tokenOperator = token.strValue;
                    operatorScanCount++;
                    lastOperatorToken = token;
                    if (tokenOperator != SPACE_OPERATOR) {
                        switch (tokenOperator) {
                            case SLASH_CHARACTER:
                                // /deep/ operator
                                var deepToken = this._consume(css_lexer_1.CssTokenType.Identifier);
                                var deepSlash = this._consume(css_lexer_1.CssTokenType.Character);
                                var index = lastOperatorToken.index;
                                var line = lastOperatorToken.line;
                                var column = lastOperatorToken.column;
                                if (deepToken != null && deepToken.strValue.toLowerCase() == 'deep' &&
                                    deepSlash.strValue == SLASH_CHARACTER) {
                                    token = new css_lexer_1.CssToken(lastOperatorToken.index, lastOperatorToken.column, lastOperatorToken.line, css_lexer_1.CssTokenType.Identifier, DEEP_OPERATOR_STR);
                                }
                                else {
                                    var text = SLASH_CHARACTER + deepToken.strValue + deepSlash.strValue;
                                    this._error(css_lexer_1.generateErrorMessage(this._getSourceContent(), text + " is an invalid CSS operator", text, index, line, column), lastOperatorToken);
                                    token = new css_lexer_1.CssToken(index, column, line, css_lexer_1.CssTokenType.Invalid, text);
                                }
                                break;
                            case GT_CHARACTER:
                                // >>> operator
                                if (this._scanner.peek == chars.$GT && this._scanner.peekPeek == chars.$GT) {
                                    this._consume(css_lexer_1.CssTokenType.Character, GT_CHARACTER);
                                    this._consume(css_lexer_1.CssTokenType.Character, GT_CHARACTER);
                                    token = new css_lexer_1.CssToken(lastOperatorToken.index, lastOperatorToken.column, lastOperatorToken.line, css_lexer_1.CssTokenType.Identifier, TRIPLE_GT_OPERATOR_STR);
                                }
                                break;
                        }
                        operator = token;
                    }
                }
                // so long as there is an operator then we can have an
                // ending value that is beyond the selector value ...
                // otherwise it's just a bunch of trailing whitespace
                if (operator != null) {
                    end = operator.index;
                }
            }
            this._scanner.consumeWhitespace();
            var strValue = this._extractSourceContent(start, end);
            // if we do come across one or more spaces inside of
            // the operators loop then an empty space is still a
            // valid operator to use if something else was not found
            if (operator == null && operatorScanCount > 0 && this._scanner.peek != chars.$LBRACE) {
                operator = lastOperatorToken;
            }
            // please note that `endToken` is reassigned multiple times below
            // so please do not optimize the if statements into if/elseif
            var startTokenOrAst = null;
            var endTokenOrAst = null;
            if (selectorCssTokens.length > 0) {
                startTokenOrAst = startTokenOrAst || selectorCssTokens[0];
                endTokenOrAst = selectorCssTokens[selectorCssTokens.length - 1];
            }
            if (pseudoSelectors.length > 0) {
                startTokenOrAst = startTokenOrAst || pseudoSelectors[0];
                endTokenOrAst = pseudoSelectors[pseudoSelectors.length - 1];
            }
            if (operator != null) {
                startTokenOrAst = startTokenOrAst || operator;
                endTokenOrAst = operator;
            }
            var span = this._generateSourceSpan(startTokenOrAst, endTokenOrAst);
            return new css_ast_1.CssSimpleSelectorAst(span, selectorCssTokens, strValue, pseudoSelectors, operator);
        };
        /** @internal */
        CssParser.prototype._parseSelector = function (delimiters) {
            delimiters |= COMMA_DELIM_FLAG;
            this._scanner.setMode(css_lexer_1.CssLexerMode.SELECTOR);
            var simpleSelectors = [];
            while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                simpleSelectors.push(this._parseSimpleSelector(delimiters));
                this._scanner.consumeWhitespace();
            }
            var firstSelector = simpleSelectors[0];
            var lastSelector = simpleSelectors[simpleSelectors.length - 1];
            var span = this._generateSourceSpan(firstSelector, lastSelector);
            return new css_ast_1.CssSelectorAst(span, simpleSelectors);
        };
        /** @internal */
        CssParser.prototype._parseValue = function (delimiters) {
            delimiters |= RBRACE_DELIM_FLAG | SEMICOLON_DELIM_FLAG | NEWLINE_DELIM_FLAG;
            this._scanner.setMode(css_lexer_1.CssLexerMode.STYLE_VALUE);
            var start = this._getScannerIndex();
            var tokens = [];
            var wsStr = '';
            var previous = undefined;
            while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                var token = void 0;
                if (previous != null && previous.type == css_lexer_1.CssTokenType.Identifier &&
                    this._scanner.peek == chars.$LPAREN) {
                    token = this._consume(css_lexer_1.CssTokenType.Character, '(');
                    tokens.push(token);
                    this._scanner.setMode(css_lexer_1.CssLexerMode.STYLE_VALUE_FUNCTION);
                    token = this._scan();
                    tokens.push(token);
                    this._scanner.setMode(css_lexer_1.CssLexerMode.STYLE_VALUE);
                    token = this._consume(css_lexer_1.CssTokenType.Character, ')');
                    tokens.push(token);
                }
                else {
                    token = this._scan();
                    if (token.type == css_lexer_1.CssTokenType.Whitespace) {
                        wsStr += token.strValue;
                    }
                    else {
                        wsStr = '';
                        tokens.push(token);
                    }
                }
                previous = token;
            }
            var end = this._getScannerIndex() - 1;
            this._scanner.consumeWhitespace();
            var code = this._scanner.peek;
            if (code == chars.$SEMICOLON) {
                this._consume(css_lexer_1.CssTokenType.Character, ';');
            }
            else if (code != chars.$RBRACE) {
                this._error(css_lexer_1.generateErrorMessage(this._getSourceContent(), "The CSS key/value definition did not end with a semicolon", previous.strValue, previous.index, previous.line, previous.column), previous);
            }
            var strValue = this._extractSourceContent(start, end);
            var startToken = tokens[0];
            var endToken = tokens[tokens.length - 1];
            var span = this._generateSourceSpan(startToken, endToken);
            return new css_ast_1.CssStyleValueAst(span, tokens, strValue);
        };
        /** @internal */
        CssParser.prototype._collectUntilDelim = function (delimiters, assertType) {
            if (assertType === void 0) { assertType = null; }
            var tokens = [];
            while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                var val = assertType != null ? this._consume(assertType) : this._scan();
                tokens.push(val);
            }
            return tokens;
        };
        /** @internal */
        CssParser.prototype._parseBlock = function (delimiters) {
            delimiters |= RBRACE_DELIM_FLAG;
            this._scanner.setMode(css_lexer_1.CssLexerMode.BLOCK);
            var startToken = this._consume(css_lexer_1.CssTokenType.Character, '{');
            this._scanner.consumeEmptyStatements();
            var results = [];
            while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                results.push(this._parseRule(delimiters));
            }
            var endToken = this._consume(css_lexer_1.CssTokenType.Character, '}');
            this._scanner.setMode(css_lexer_1.CssLexerMode.BLOCK);
            this._scanner.consumeEmptyStatements();
            var span = this._generateSourceSpan(startToken, endToken);
            return new css_ast_1.CssBlockAst(span, results);
        };
        /** @internal */
        CssParser.prototype._parseStyleBlock = function (delimiters) {
            delimiters |= RBRACE_DELIM_FLAG | LBRACE_DELIM_FLAG;
            this._scanner.setMode(css_lexer_1.CssLexerMode.STYLE_BLOCK);
            var startToken = this._consume(css_lexer_1.CssTokenType.Character, '{');
            if (startToken.numValue != chars.$LBRACE) {
                return null;
            }
            var definitions = [];
            this._scanner.consumeEmptyStatements();
            while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
                definitions.push(this._parseDefinition(delimiters));
                this._scanner.consumeEmptyStatements();
            }
            var endToken = this._consume(css_lexer_1.CssTokenType.Character, '}');
            this._scanner.setMode(css_lexer_1.CssLexerMode.STYLE_BLOCK);
            this._scanner.consumeEmptyStatements();
            var span = this._generateSourceSpan(startToken, endToken);
            return new css_ast_1.CssStylesBlockAst(span, definitions);
        };
        /** @internal */
        CssParser.prototype._parseDefinition = function (delimiters) {
            this._scanner.setMode(css_lexer_1.CssLexerMode.STYLE_BLOCK);
            var prop = this._consume(css_lexer_1.CssTokenType.Identifier);
            var parseValue = false;
            var value = null;
            var endToken = prop;
            // the colon value separates the prop from the style.
            // there are a few cases as to what could happen if it
            // is missing
            switch (this._scanner.peek) {
                case chars.$SEMICOLON:
                case chars.$RBRACE:
                case chars.$EOF:
                    parseValue = false;
                    break;
                default:
                    var propStr_1 = [prop.strValue];
                    if (this._scanner.peek != chars.$COLON) {
                        // this will throw the error
                        var nextValue = this._consume(css_lexer_1.CssTokenType.Character, ':');
                        propStr_1.push(nextValue.strValue);
                        var remainingTokens = this._collectUntilDelim(delimiters | COLON_DELIM_FLAG | SEMICOLON_DELIM_FLAG, css_lexer_1.CssTokenType.Identifier);
                        if (remainingTokens.length > 0) {
                            remainingTokens.forEach(function (token) { propStr_1.push(token.strValue); });
                        }
                        endToken = prop =
                            new css_lexer_1.CssToken(prop.index, prop.column, prop.line, prop.type, propStr_1.join(' '));
                    }
                    // this means we've reached the end of the definition and/or block
                    if (this._scanner.peek == chars.$COLON) {
                        this._consume(css_lexer_1.CssTokenType.Character, ':');
                        parseValue = true;
                    }
                    break;
            }
            if (parseValue) {
                value = this._parseValue(delimiters);
                endToken = value;
            }
            else {
                this._error(css_lexer_1.generateErrorMessage(this._getSourceContent(), "The CSS property was not paired with a style value", prop.strValue, prop.index, prop.line, prop.column), prop);
            }
            var span = this._generateSourceSpan(prop, endToken);
            return new css_ast_1.CssDefinitionAst(span, prop, value);
        };
        /** @internal */
        CssParser.prototype._assertCondition = function (status, errorMessage, problemToken) {
            if (!status) {
                this._error(errorMessage, problemToken);
                return true;
            }
            return false;
        };
        /** @internal */
        CssParser.prototype._error = function (message, problemToken) {
            var length = problemToken.strValue.length;
            var error = CssParseError.create(this._file, 0, problemToken.line, problemToken.column, length, message);
            this._errors.push(error);
        };
        return CssParser;
    }());
    exports.CssParser = CssParser;
    var CssParseError = /** @class */ (function (_super) {
        tslib_1.__extends(CssParseError, _super);
        function CssParseError(span, message) {
            return _super.call(this, span, message) || this;
        }
        CssParseError.create = function (file, offset, line, col, length, errMsg) {
            var start = new parse_util_1.ParseLocation(file, offset, line, col);
            var end = new parse_util_1.ParseLocation(file, offset, line, col + length);
            var span = new parse_util_1.ParseSourceSpan(start, end);
            return new CssParseError(span, 'CSS Parse Error: ' + errMsg);
        };
        return CssParseError;
    }(parse_util_1.ParseError));
    exports.CssParseError = CssParseError;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9jc3NfcGFyc2VyL2Nzc19wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBRUgsbURBQWtDO0lBQ2xDLCtEQUEwRjtJQUUxRixvRUFBK2E7SUFDL2Esd0VBQXVJO0lBRXZJLElBQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQztJQUUzQix3RUFBcUM7SUFBN0IsK0JBQUEsUUFBUSxDQUFBO0lBQ2hCLG9FQUFvQztJQUE1Qiw4QkFBQSxTQUFTLENBQUE7SUFFakIsSUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDO0lBQzVCLElBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztJQUN6QixJQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQztJQUNyQyxJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztJQUVuQyxJQUFNLGNBQWMsR0FBRyxDQUFDLENBQUM7SUFDekIsSUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFDNUIsSUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFDNUIsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFDM0IsSUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDNUIsSUFBTSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7SUFDaEMsSUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7SUFDOUIsSUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUM7SUFDOUIsSUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUM7SUFDOUIsSUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7SUFFN0IsK0NBQStDLElBQVk7UUFDekQsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1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UztJQXd5QnRCO1FBQW1DLHlDQUFVO1FBVTNDLHVCQUFZLElBQXFCLEVBQUUsT0FBZTttQkFBSSxrQkFBTSxJQUFJLEVBQUUsT0FBTyxDQUFDO1FBQUUsQ0FBQztRQVR0RSxvQkFBTSxHQUFiLFVBQ0ksSUFBcUIsRUFBRSxNQUFjLEVBQUUsSUFBWSxFQUFFLEdBQVcsRUFBRSxNQUFjLEVBQ2hGLE1BQWM7WUFDaEIsSUFBTSxLQUFLLEdBQUcsSUFBSSwwQkFBYSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pELElBQU0sR0FBRyxHQUFHLElBQUksMEJBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDaEUsSUFBTSxJQUFJLEdBQUcsSUFBSSw0QkFBZSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM3QyxPQUFPLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBR0gsb0JBQUM7SUFBRCxDQUFDLEFBWEQsQ0FBbUMsdUJBQVUsR0FXNUM7SUFYWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgY2hhcnMgZnJvbSAnLi4vY2hhcnMnO1xuaW1wb3J0IHtQYXJzZUVycm9yLCBQYXJzZUxvY2F0aW9uLCBQYXJzZVNvdXJjZUZpbGUsIFBhcnNlU291cmNlU3Bhbn0gZnJvbSAnLi4vcGFyc2VfdXRpbCc7XG5cbmltcG9ydCB7QmxvY2tUeXBlLCBDc3NBc3QsIENzc0F0UnVsZVByZWRpY2F0ZUFzdCwgQ3NzQmxvY2tBc3QsIENzc0Jsb2NrRGVmaW5pdGlvblJ1bGVBc3QsIENzc0Jsb2NrUnVsZUFzdCwgQ3NzRGVmaW5pdGlvbkFzdCwgQ3NzSW5saW5lUnVsZUFzdCwgQ3NzS2V5ZnJhbWVEZWZpbml0aW9uQXN0LCBDc3NLZXlmcmFtZVJ1bGVBc3QsIENzc01lZGlhUXVlcnlSdWxlQXN0LCBDc3NQc2V1ZG9TZWxlY3RvckFzdCwgQ3NzUnVsZUFzdCwgQ3NzU2VsZWN0b3JBc3QsIENzc1NlbGVjdG9yUnVsZUFzdCwgQ3NzU2ltcGxlU2VsZWN0b3JBc3QsIENzc1N0eWxlU2hlZXRBc3QsIENzc1N0eWxlVmFsdWVBc3QsIENzc1N0eWxlc0Jsb2NrQXN0LCBDc3NVbmtub3duUnVsZUFzdCwgQ3NzVW5rbm93blRva2VuTGlzdEFzdCwgbWVyZ2VUb2tlbnN9IGZyb20gJy4vY3NzX2FzdCc7XG5pbXBvcnQge0Nzc0xleGVyLCBDc3NMZXhlck1vZGUsIENzc1NjYW5uZXIsIENzc1Rva2VuLCBDc3NUb2tlblR5cGUsIGdlbmVyYXRlRXJyb3JNZXNzYWdlLCBnZXRSYXdNZXNzYWdlLCBpc05ld2xpbmV9IGZyb20gJy4vY3NzX2xleGVyJztcblxuY29uc3QgU1BBQ0VfT1BFUkFUT1IgPSAnICc7XG5cbmV4cG9ydCB7Q3NzVG9rZW59IGZyb20gJy4vY3NzX2xleGVyJztcbmV4cG9ydCB7QmxvY2tUeXBlfSBmcm9tICcuL2Nzc19hc3QnO1xuXG5jb25zdCBTTEFTSF9DSEFSQUNURVIgPSAnLyc7XG5jb25zdCBHVF9DSEFSQUNURVIgPSAnPic7XG5jb25zdCBUUklQTEVfR1RfT1BFUkFUT1JfU1RSID0gJz4+Pic7XG5jb25zdCBERUVQX09QRVJBVE9SX1NUUiA9ICcvZGVlcC8nO1xuXG5jb25zdCBFT0ZfREVMSU1fRkxBRyA9IDE7XG5jb25zdCBSQlJBQ0VfREVMSU1fRkxBRyA9IDI7XG5jb25zdCBMQlJBQ0VfREVMSU1fRkxBRyA9IDQ7XG5jb25zdCBDT01NQV9ERUxJTV9GTEFHID0gODtcbmNvbnN0IENPTE9OX0RFTElNX0ZMQUcgPSAxNjtcbmNvbnN0IFNFTUlDT0xPTl9ERUxJTV9GTEFHID0gMzI7XG5jb25zdCBORVdMSU5FX0RFTElNX0ZMQUcgPSA2NDtcbmNvbnN0IFJQQVJFTl9ERUxJTV9GTEFHID0gMTI4O1xuY29uc3QgTFBBUkVOX0RFTElNX0ZMQUcgPSAyNTY7XG5jb25zdCBTUEFDRV9ERUxJTV9GTEFHID0gNTEyO1xuXG5mdW5jdGlvbiBfcHNldWRvU2VsZWN0b3JTdXBwb3J0c0lubmVyU2VsZWN0b3JzKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gWydub3QnLCAnaG9zdCcsICdob3N0LWNvbnRleHQnXS5pbmRleE9mKG5hbWUpID49IDA7XG59XG5cbmZ1bmN0aW9uIGlzU2VsZWN0b3JPcGVyYXRvckNoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSBjaGFycy4kU0xBU0g6XG4gICAgY2FzZSBjaGFycy4kVElMREE6XG4gICAgY2FzZSBjaGFycy4kUExVUzpcbiAgICBjYXNlIGNoYXJzLiRHVDpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gY2hhcnMuaXNXaGl0ZXNwYWNlKGNvZGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlbGltRnJvbUNoYXJhY3Rlcihjb2RlOiBudW1iZXIpOiBudW1iZXIge1xuICBzd2l0Y2ggKGNvZGUpIHtcbiAgICBjYXNlIGNoYXJzLiRFT0Y6XG4gICAgICByZXR1cm4gRU9GX0RFTElNX0ZMQUc7XG4gICAgY2FzZSBjaGFycy4kQ09NTUE6XG4gICAgICByZXR1cm4gQ09NTUFfREVMSU1fRkxBRztcbiAgICBjYXNlIGNoYXJzLiRDT0xPTjpcbiAgICAgIHJldHVybiBDT0xPTl9ERUxJTV9GTEFHO1xuICAgIGNhc2UgY2hhcnMuJFNFTUlDT0xPTjpcbiAgICAgIHJldHVybiBTRU1JQ09MT05fREVMSU1fRkxBRztcbiAgICBjYXNlIGNoYXJzLiRSQlJBQ0U6XG4gICAgICByZXR1cm4gUkJSQUNFX0RFTElNX0ZMQUc7XG4gICAgY2FzZSBjaGFycy4kTEJSQUNFOlxuICAgICAgcmV0dXJuIExCUkFDRV9ERUxJTV9GTEFHO1xuICAgIGNhc2UgY2hhcnMuJFJQQVJFTjpcbiAgICAgIHJldHVybiBSUEFSRU5fREVMSU1fRkxBRztcbiAgICBjYXNlIGNoYXJzLiRTUEFDRTpcbiAgICBjYXNlIGNoYXJzLiRUQUI6XG4gICAgICByZXR1cm4gU1BBQ0VfREVMSU1fRkxBRztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGlzTmV3bGluZShjb2RlKSA/IE5FV0xJTkVfREVMSU1fRkxBRyA6IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hhcmFjdGVyQ29udGFpbnNEZWxpbWl0ZXIoY29kZTogbnVtYmVyLCBkZWxpbWl0ZXJzOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIChnZXREZWxpbUZyb21DaGFyYWN0ZXIoY29kZSkgJiBkZWxpbWl0ZXJzKSA+IDA7XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZWRDc3NSZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZXJyb3JzOiBDc3NQYXJzZUVycm9yW10sIHB1YmxpYyBhc3Q6IENzc1N0eWxlU2hlZXRBc3QpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NQYXJzZXIge1xuICBwcml2YXRlIF9lcnJvcnM6IENzc1BhcnNlRXJyb3JbXSA9IFtdO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfZmlsZSAhOiBQYXJzZVNvdXJjZUZpbGU7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9zY2FubmVyICE6IENzc1NjYW5uZXI7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9sYXN0VG9rZW4gITogQ3NzVG9rZW47XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBjc3MgdGhlIENTUyBjb2RlIHRoYXQgd2lsbCBiZSBwYXJzZWRcbiAgICogQHBhcmFtIHVybCB0aGUgbmFtZSBvZiB0aGUgQ1NTIGZpbGUgY29udGFpbmluZyB0aGUgQ1NTIHNvdXJjZSBjb2RlXG4gICAqL1xuICBwYXJzZShjc3M6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBQYXJzZWRDc3NSZXN1bHQge1xuICAgIGNvbnN0IGxleGVyID0gbmV3IENzc0xleGVyKCk7XG4gICAgdGhpcy5fZmlsZSA9IG5ldyBQYXJzZVNvdXJjZUZpbGUoY3NzLCB1cmwpO1xuICAgIHRoaXMuX3NjYW5uZXIgPSBsZXhlci5zY2FuKGNzcywgZmFsc2UpO1xuXG4gICAgY29uc3QgYXN0ID0gdGhpcy5fcGFyc2VTdHlsZVNoZWV0KEVPRl9ERUxJTV9GTEFHKTtcblxuICAgIGNvbnN0IGVycm9ycyA9IHRoaXMuX2Vycm9ycztcbiAgICB0aGlzLl9lcnJvcnMgPSBbXTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBQYXJzZWRDc3NSZXN1bHQoZXJyb3JzLCBhc3QpO1xuICAgIHRoaXMuX2ZpbGUgPSBudWxsIGFzIGFueTtcbiAgICB0aGlzLl9zY2FubmVyID0gbnVsbCBhcyBhbnk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlU3R5bGVTaGVldChkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NTdHlsZVNoZWV0QXN0IHtcbiAgICBjb25zdCByZXN1bHRzOiBDc3NSdWxlQXN0W10gPSBbXTtcbiAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVFbXB0eVN0YXRlbWVudHMoKTtcbiAgICB3aGlsZSAodGhpcy5fc2Nhbm5lci5wZWVrICE9IGNoYXJzLiRFT0YpIHtcbiAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQkxPQ0spO1xuICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuX3BhcnNlUnVsZShkZWxpbWl0ZXJzKSk7XG4gICAgfVxuICAgIGxldCBzcGFuOiBQYXJzZVNvdXJjZVNwYW58bnVsbCA9IG51bGw7XG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZmlyc3RSdWxlID0gcmVzdWx0c1swXTtcbiAgICAgIC8vIHdlIGNvbGxlY3QgdGhlIGxhc3QgdG9rZW4gbGlrZSBzbyBpbmNhc2UgdGhlcmUgd2FzIGFuXG4gICAgICAvLyBFT0YgdG9rZW4gdGhhdCB3YXMgZW1pdHRlZCBzb21ldGltZSBkdXJpbmcgdGhlIGxleGluZ1xuICAgICAgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihmaXJzdFJ1bGUsIHRoaXMuX2xhc3RUb2tlbik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQ3NzU3R5bGVTaGVldEFzdChzcGFuICEsIHJlc3VsdHMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2V0U291cmNlQ29udGVudCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fc2Nhbm5lciAhPSBudWxsID8gdGhpcy5fc2Nhbm5lci5pbnB1dCA6ICcnOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZXh0cmFjdFNvdXJjZUNvbnRlbnQoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9nZXRTb3VyY2VDb250ZW50KCkuc3Vic3RyaW5nKHN0YXJ0LCBlbmQgKyAxKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dlbmVyYXRlU291cmNlU3BhbihzdGFydDogQ3NzVG9rZW58Q3NzQXN0LCBlbmQ6IENzc1Rva2VufENzc0FzdHxudWxsID0gbnVsbCk6IFBhcnNlU291cmNlU3BhbiB7XG4gICAgbGV0IHN0YXJ0TG9jOiBQYXJzZUxvY2F0aW9uO1xuICAgIGlmIChzdGFydCBpbnN0YW5jZW9mIENzc0FzdCkge1xuICAgICAgc3RhcnRMb2MgPSBzdGFydC5sb2NhdGlvbi5zdGFydDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRva2VuID0gc3RhcnQ7XG4gICAgICBpZiAodG9rZW4gPT0gbnVsbCkge1xuICAgICAgICAvLyB0aGUgZGF0YSBoZXJlIGlzIGludmFsaWQsIGhvd2V2ZXIsIGlmIGFuZCB3aGVuIHRoaXMgZG9lc1xuICAgICAgICAvLyBvY2N1ciwgYW55IG90aGVyIGVycm9ycyBhc3NvY2lhdGVkIHdpdGggdGhpcyB3aWxsIGJlIGNvbGxlY3RlZFxuICAgICAgICB0b2tlbiA9IHRoaXMuX2xhc3RUb2tlbjtcbiAgICAgIH1cbiAgICAgIHN0YXJ0TG9jID0gbmV3IFBhcnNlTG9jYXRpb24odGhpcy5fZmlsZSwgdG9rZW4uaW5kZXgsIHRva2VuLmxpbmUsIHRva2VuLmNvbHVtbik7XG4gICAgfVxuXG4gICAgaWYgKGVuZCA9PSBudWxsKSB7XG4gICAgICBlbmQgPSB0aGlzLl9sYXN0VG9rZW47XG4gICAgfVxuXG4gICAgbGV0IGVuZExpbmU6IG51bWJlciA9IC0xO1xuICAgIGxldCBlbmRDb2x1bW46IG51bWJlciA9IC0xO1xuICAgIGxldCBlbmRJbmRleDogbnVtYmVyID0gLTE7XG4gICAgaWYgKGVuZCBpbnN0YW5jZW9mIENzc0FzdCkge1xuICAgICAgZW5kTGluZSA9IGVuZC5sb2NhdGlvbi5lbmQubGluZSAhO1xuICAgICAgZW5kQ29sdW1uID0gZW5kLmxvY2F0aW9uLmVuZC5jb2wgITtcbiAgICAgIGVuZEluZGV4ID0gZW5kLmxvY2F0aW9uLmVuZC5vZmZzZXQgITtcbiAgICB9IGVsc2UgaWYgKGVuZCBpbnN0YW5jZW9mIENzc1Rva2VuKSB7XG4gICAgICBlbmRMaW5lID0gZW5kLmxpbmU7XG4gICAgICBlbmRDb2x1bW4gPSBlbmQuY29sdW1uO1xuICAgICAgZW5kSW5kZXggPSBlbmQuaW5kZXg7XG4gICAgfVxuXG4gICAgY29uc3QgZW5kTG9jID0gbmV3IFBhcnNlTG9jYXRpb24odGhpcy5fZmlsZSwgZW5kSW5kZXgsIGVuZExpbmUsIGVuZENvbHVtbik7XG4gICAgcmV0dXJuIG5ldyBQYXJzZVNvdXJjZVNwYW4oc3RhcnRMb2MsIGVuZExvYyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZXNvbHZlQmxvY2tUeXBlKHRva2VuOiBDc3NUb2tlbik6IEJsb2NrVHlwZSB7XG4gICAgc3dpdGNoICh0b2tlbi5zdHJWYWx1ZSkge1xuICAgICAgY2FzZSAnQC1vLWtleWZyYW1lcyc6XG4gICAgICBjYXNlICdALW1vei1rZXlmcmFtZXMnOlxuICAgICAgY2FzZSAnQC13ZWJraXQta2V5ZnJhbWVzJzpcbiAgICAgIGNhc2UgJ0BrZXlmcmFtZXMnOlxuICAgICAgICByZXR1cm4gQmxvY2tUeXBlLktleWZyYW1lcztcblxuICAgICAgY2FzZSAnQGNoYXJzZXQnOlxuICAgICAgICByZXR1cm4gQmxvY2tUeXBlLkNoYXJzZXQ7XG5cbiAgICAgIGNhc2UgJ0BpbXBvcnQnOlxuICAgICAgICByZXR1cm4gQmxvY2tUeXBlLkltcG9ydDtcblxuICAgICAgY2FzZSAnQG5hbWVzcGFjZSc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuTmFtZXNwYWNlO1xuXG4gICAgICBjYXNlICdAcGFnZSc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuUGFnZTtcblxuICAgICAgY2FzZSAnQGRvY3VtZW50JzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5Eb2N1bWVudDtcblxuICAgICAgY2FzZSAnQG1lZGlhJzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5NZWRpYVF1ZXJ5O1xuXG4gICAgICBjYXNlICdAZm9udC1mYWNlJzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5Gb250RmFjZTtcblxuICAgICAgY2FzZSAnQHZpZXdwb3J0JzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5WaWV3cG9ydDtcblxuICAgICAgY2FzZSAnQHN1cHBvcnRzJzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5TdXBwb3J0cztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5VbnN1cHBvcnRlZDtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9wYXJzZVJ1bGUoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzUnVsZUFzdCB7XG4gICAgaWYgKHRoaXMuX3NjYW5uZXIucGVlayA9PSBjaGFycy4kQVQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wYXJzZUF0UnVsZShkZWxpbWl0ZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3BhcnNlU2VsZWN0b3JSdWxlKGRlbGltaXRlcnMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VBdFJ1bGUoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzUnVsZUFzdCB7XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLl9nZXRTY2FubmVySW5kZXgoKTtcblxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQkxPQ0spO1xuICAgIGNvbnN0IHRva2VuID0gdGhpcy5fc2NhbigpO1xuICAgIGNvbnN0IHN0YXJ0VG9rZW4gPSB0b2tlbjtcblxuICAgIHRoaXMuX2Fzc2VydENvbmRpdGlvbihcbiAgICAgICAgdG9rZW4udHlwZSA9PSBDc3NUb2tlblR5cGUuQXRLZXl3b3JkLFxuICAgICAgICBgVGhlIENTUyBSdWxlICR7dG9rZW4uc3RyVmFsdWV9IGlzIG5vdCBhIHZhbGlkIFtAXSBydWxlLmAsIHRva2VuKTtcblxuICAgIGxldCBibG9jazogQ3NzQmxvY2tBc3Q7XG4gICAgY29uc3QgdHlwZSA9IHRoaXMuX3Jlc29sdmVCbG9ja1R5cGUodG9rZW4pO1xuICAgIGxldCBzcGFuOiBQYXJzZVNvdXJjZVNwYW47XG4gICAgbGV0IHRva2VuczogQ3NzVG9rZW5bXTtcbiAgICBsZXQgZW5kVG9rZW46IENzc1Rva2VuO1xuICAgIGxldCBlbmQ6IG51bWJlcjtcbiAgICBsZXQgc3RyVmFsdWU6IHN0cmluZztcbiAgICBsZXQgcXVlcnk6IENzc0F0UnVsZVByZWRpY2F0ZUFzdDtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgQmxvY2tUeXBlLkNoYXJzZXQ6XG4gICAgICBjYXNlIEJsb2NrVHlwZS5OYW1lc3BhY2U6XG4gICAgICBjYXNlIEJsb2NrVHlwZS5JbXBvcnQ6XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX3BhcnNlVmFsdWUoZGVsaW1pdGVycyk7XG4gICAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQkxPQ0spO1xuICAgICAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVFbXB0eVN0YXRlbWVudHMoKTtcbiAgICAgICAgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGFydFRva2VuLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgQ3NzSW5saW5lUnVsZUFzdChzcGFuLCB0eXBlLCB2YWx1ZSk7XG5cbiAgICAgIGNhc2UgQmxvY2tUeXBlLlZpZXdwb3J0OlxuICAgICAgY2FzZSBCbG9ja1R5cGUuRm9udEZhY2U6XG4gICAgICAgIGJsb2NrID0gdGhpcy5fcGFyc2VTdHlsZUJsb2NrKGRlbGltaXRlcnMpICE7XG4gICAgICAgIHNwYW4gPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZVNwYW4oc3RhcnRUb2tlbiwgYmxvY2spO1xuICAgICAgICByZXR1cm4gbmV3IENzc0Jsb2NrUnVsZUFzdChzcGFuLCB0eXBlLCBibG9jayk7XG5cbiAgICAgIGNhc2UgQmxvY2tUeXBlLktleWZyYW1lczpcbiAgICAgICAgdG9rZW5zID0gdGhpcy5fY29sbGVjdFVudGlsRGVsaW0oZGVsaW1pdGVycyB8IFJCUkFDRV9ERUxJTV9GTEFHIHwgTEJSQUNFX0RFTElNX0ZMQUcpO1xuICAgICAgICAvLyBrZXlmcmFtZXMgb25seSBoYXZlIG9uZSBpZGVudGlmaWVyIG5hbWVcbiAgICAgICAgbGV0IG5hbWUgPSB0b2tlbnNbMF07XG4gICAgICAgIGJsb2NrID0gdGhpcy5fcGFyc2VLZXlmcmFtZUJsb2NrKGRlbGltaXRlcnMpO1xuICAgICAgICBzcGFuID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VTcGFuKHN0YXJ0VG9rZW4sIGJsb2NrKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDc3NLZXlmcmFtZVJ1bGVBc3Qoc3BhbiwgbmFtZSwgYmxvY2spO1xuXG4gICAgICBjYXNlIEJsb2NrVHlwZS5NZWRpYVF1ZXJ5OlxuICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLk1FRElBX1FVRVJZKTtcbiAgICAgICAgdG9rZW5zID0gdGhpcy5fY29sbGVjdFVudGlsRGVsaW0oZGVsaW1pdGVycyB8IFJCUkFDRV9ERUxJTV9GTEFHIHwgTEJSQUNFX0RFTElNX0ZMQUcpO1xuICAgICAgICBlbmRUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIC8vIHdlIGRvIG5vdCB0cmFjayB0aGUgd2hpdGVzcGFjZSBhZnRlciB0aGUgbWVkaWFRdWVyeSBwcmVkaWNhdGUgZW5kc1xuICAgICAgICAvLyBzbyB3ZSBoYXZlIHRvIGNhbGN1bGF0ZSB0aGUgZW5kIHN0cmluZyB2YWx1ZSBvbiBvdXIgb3duXG4gICAgICAgIGVuZCA9IGVuZFRva2VuLmluZGV4ICsgZW5kVG9rZW4uc3RyVmFsdWUubGVuZ3RoIC0gMTtcbiAgICAgICAgc3RyVmFsdWUgPSB0aGlzLl9leHRyYWN0U291cmNlQ29udGVudChzdGFydCwgZW5kKTtcbiAgICAgICAgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGFydFRva2VuLCBlbmRUb2tlbik7XG4gICAgICAgIHF1ZXJ5ID0gbmV3IENzc0F0UnVsZVByZWRpY2F0ZUFzdChzcGFuLCBzdHJWYWx1ZSwgdG9rZW5zKTtcbiAgICAgICAgYmxvY2sgPSB0aGlzLl9wYXJzZUJsb2NrKGRlbGltaXRlcnMpO1xuICAgICAgICBzdHJWYWx1ZSA9IHRoaXMuX2V4dHJhY3RTb3VyY2VDb250ZW50KHN0YXJ0LCB0aGlzLl9nZXRTY2FubmVySW5kZXgoKSAtIDEpO1xuICAgICAgICBzcGFuID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VTcGFuKHN0YXJ0VG9rZW4sIGJsb2NrKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDc3NNZWRpYVF1ZXJ5UnVsZUFzdChzcGFuLCBzdHJWYWx1ZSwgcXVlcnksIGJsb2NrKTtcblxuICAgICAgY2FzZSBCbG9ja1R5cGUuRG9jdW1lbnQ6XG4gICAgICBjYXNlIEJsb2NrVHlwZS5TdXBwb3J0czpcbiAgICAgIGNhc2UgQmxvY2tUeXBlLlBhZ2U6XG4gICAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQVRfUlVMRV9RVUVSWSk7XG4gICAgICAgIHRva2VucyA9IHRoaXMuX2NvbGxlY3RVbnRpbERlbGltKGRlbGltaXRlcnMgfCBSQlJBQ0VfREVMSU1fRkxBRyB8IExCUkFDRV9ERUxJTV9GTEFHKTtcbiAgICAgICAgZW5kVG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICAvLyB3ZSBkbyBub3QgdHJhY2sgdGhlIHdoaXRlc3BhY2UgYWZ0ZXIgdGhpcyBibG9jayBydWxlIHByZWRpY2F0ZSBlbmRzXG4gICAgICAgIC8vIHNvIHdlIGhhdmUgdG8gY2FsY3VsYXRlIHRoZSBlbmQgc3RyaW5nIHZhbHVlIG9uIG91ciBvd25cbiAgICAgICAgZW5kID0gZW5kVG9rZW4uaW5kZXggKyBlbmRUb2tlbi5zdHJWYWx1ZS5sZW5ndGggLSAxO1xuICAgICAgICBzdHJWYWx1ZSA9IHRoaXMuX2V4dHJhY3RTb3VyY2VDb250ZW50KHN0YXJ0LCBlbmQpO1xuICAgICAgICBzcGFuID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VTcGFuKHN0YXJ0VG9rZW4sIHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0pO1xuICAgICAgICBxdWVyeSA9IG5ldyBDc3NBdFJ1bGVQcmVkaWNhdGVBc3Qoc3Bhbiwgc3RyVmFsdWUsIHRva2Vucyk7XG4gICAgICAgIGJsb2NrID0gdGhpcy5fcGFyc2VCbG9jayhkZWxpbWl0ZXJzKTtcbiAgICAgICAgc3RyVmFsdWUgPSB0aGlzLl9leHRyYWN0U291cmNlQ29udGVudChzdGFydCwgYmxvY2suZW5kLm9mZnNldCAhKTtcbiAgICAgICAgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGFydFRva2VuLCBibG9jayk7XG4gICAgICAgIHJldHVybiBuZXcgQ3NzQmxvY2tEZWZpbml0aW9uUnVsZUFzdChzcGFuLCBzdHJWYWx1ZSwgdHlwZSwgcXVlcnksIGJsb2NrKTtcblxuICAgICAgLy8gaWYgYSBjdXN0b20gQHJ1bGUgeyAuLi4gfSBpcyB1c2VkIGl0IHNob3VsZCBzdGlsbCB0b2tlbml6ZSB0aGUgaW5zaWRlc1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGV0IGxpc3RPZlRva2VuczogQ3NzVG9rZW5bXSA9IFtdO1xuICAgICAgICBsZXQgdG9rZW5OYW1lID0gdG9rZW4uc3RyVmFsdWU7XG4gICAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQUxMKTtcbiAgICAgICAgdGhpcy5fZXJyb3IoXG4gICAgICAgICAgICBnZW5lcmF0ZUVycm9yTWVzc2FnZShcbiAgICAgICAgICAgICAgICB0aGlzLl9nZXRTb3VyY2VDb250ZW50KCksXG4gICAgICAgICAgICAgICAgYFRoZSBDU1MgXCJhdFwiIHJ1bGUgXCIke3Rva2VuTmFtZX1cIiBpcyBub3QgYWxsb3dlZCB0byB1c2VkIGhlcmVgLCB0b2tlbi5zdHJWYWx1ZSxcbiAgICAgICAgICAgICAgICB0b2tlbi5pbmRleCwgdG9rZW4ubGluZSwgdG9rZW4uY29sdW1uKSxcbiAgICAgICAgICAgIHRva2VuKTtcblxuICAgICAgICB0aGlzLl9jb2xsZWN0VW50aWxEZWxpbShkZWxpbWl0ZXJzIHwgTEJSQUNFX0RFTElNX0ZMQUcgfCBTRU1JQ09MT05fREVMSU1fRkxBRylcbiAgICAgICAgICAgIC5mb3JFYWNoKCh0b2tlbikgPT4geyBsaXN0T2ZUb2tlbnMucHVzaCh0b2tlbik7IH0pO1xuICAgICAgICBpZiAodGhpcy5fc2Nhbm5lci5wZWVrID09IGNoYXJzLiRMQlJBQ0UpIHtcbiAgICAgICAgICBsaXN0T2ZUb2tlbnMucHVzaCh0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICd7JykpO1xuICAgICAgICAgIHRoaXMuX2NvbGxlY3RVbnRpbERlbGltKGRlbGltaXRlcnMgfCBSQlJBQ0VfREVMSU1fRkxBRyB8IExCUkFDRV9ERUxJTV9GTEFHKVxuICAgICAgICAgICAgICAuZm9yRWFjaCgodG9rZW4pID0+IHsgbGlzdE9mVG9rZW5zLnB1c2godG9rZW4pOyB9KTtcbiAgICAgICAgICBsaXN0T2ZUb2tlbnMucHVzaCh0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICd9JykpO1xuICAgICAgICB9XG4gICAgICAgIGVuZFRva2VuID0gbGlzdE9mVG9rZW5zW2xpc3RPZlRva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGFydFRva2VuLCBlbmRUb2tlbik7XG4gICAgICAgIHJldHVybiBuZXcgQ3NzVW5rbm93blJ1bGVBc3Qoc3BhbiwgdG9rZW5OYW1lLCBsaXN0T2ZUb2tlbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlU2VsZWN0b3JSdWxlKGRlbGltaXRlcnM6IG51bWJlcik6IENzc1J1bGVBc3Qge1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5fZ2V0U2Nhbm5lckluZGV4KCk7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gdGhpcy5fcGFyc2VTZWxlY3RvcnMoZGVsaW1pdGVycyk7XG4gICAgY29uc3QgYmxvY2sgPSB0aGlzLl9wYXJzZVN0eWxlQmxvY2soZGVsaW1pdGVycyk7XG4gICAgbGV0IHJ1bGVBc3Q6IENzc1J1bGVBc3Q7XG4gICAgbGV0IHNwYW46IFBhcnNlU291cmNlU3BhbjtcbiAgICBjb25zdCBzdGFydFNlbGVjdG9yID0gc2VsZWN0b3JzWzBdO1xuICAgIGlmIChibG9jayAhPSBudWxsKSB7XG4gICAgICBzcGFuID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VTcGFuKHN0YXJ0U2VsZWN0b3IsIGJsb2NrKTtcbiAgICAgIHJ1bGVBc3QgPSBuZXcgQ3NzU2VsZWN0b3JSdWxlQXN0KHNwYW4sIHNlbGVjdG9ycywgYmxvY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuYW1lID0gdGhpcy5fZXh0cmFjdFNvdXJjZUNvbnRlbnQoc3RhcnQsIHRoaXMuX2dldFNjYW5uZXJJbmRleCgpIC0gMSk7XG4gICAgICBjb25zdCBpbm5lclRva2VuczogQ3NzVG9rZW5bXSA9IFtdO1xuICAgICAgc2VsZWN0b3JzLmZvckVhY2goKHNlbGVjdG9yOiBDc3NTZWxlY3RvckFzdCkgPT4ge1xuICAgICAgICBzZWxlY3Rvci5zZWxlY3RvclBhcnRzLmZvckVhY2goKHBhcnQ6IENzc1NpbXBsZVNlbGVjdG9yQXN0KSA9PiB7XG4gICAgICAgICAgcGFydC50b2tlbnMuZm9yRWFjaCgodG9rZW46IENzc1Rva2VuKSA9PiB7IGlubmVyVG9rZW5zLnB1c2godG9rZW4pOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGVuZFRva2VuID0gaW5uZXJUb2tlbnNbaW5uZXJUb2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICBzcGFuID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VTcGFuKHN0YXJ0U2VsZWN0b3IsIGVuZFRva2VuKTtcbiAgICAgIHJ1bGVBc3QgPSBuZXcgQ3NzVW5rbm93blRva2VuTGlzdEFzdChzcGFuLCBuYW1lLCBpbm5lclRva2Vucyk7XG4gICAgfVxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQkxPQ0spO1xuICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZUVtcHR5U3RhdGVtZW50cygpO1xuICAgIHJldHVybiBydWxlQXN0O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VTZWxlY3RvcnMoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzU2VsZWN0b3JBc3RbXSB7XG4gICAgZGVsaW1pdGVycyB8PSBMQlJBQ0VfREVMSU1fRkxBRyB8IFNFTUlDT0xPTl9ERUxJTV9GTEFHO1xuXG4gICAgY29uc3Qgc2VsZWN0b3JzOiBDc3NTZWxlY3RvckFzdFtdID0gW107XG4gICAgbGV0IGlzUGFyc2luZ1NlbGVjdG9ycyA9IHRydWU7XG4gICAgd2hpbGUgKGlzUGFyc2luZ1NlbGVjdG9ycykge1xuICAgICAgc2VsZWN0b3JzLnB1c2godGhpcy5fcGFyc2VTZWxlY3RvcihkZWxpbWl0ZXJzKSk7XG5cbiAgICAgIGlzUGFyc2luZ1NlbGVjdG9ycyA9ICFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpO1xuXG4gICAgICBpZiAoaXNQYXJzaW5nU2VsZWN0b3JzKSB7XG4gICAgICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJywnKTtcbiAgICAgICAgaXNQYXJzaW5nU2VsZWN0b3JzID0gIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycyk7XG4gICAgICAgIGlmIChpc1BhcnNpbmdTZWxlY3RvcnMpIHtcbiAgICAgICAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVXaGl0ZXNwYWNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0b3JzO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2NhbigpOiBDc3NUb2tlbiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5fc2Nhbm5lci5zY2FuKCkgITtcbiAgICBjb25zdCB0b2tlbiA9IG91dHB1dC50b2tlbjtcbiAgICBjb25zdCBlcnJvciA9IG91dHB1dC5lcnJvcjtcbiAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZXJyb3IoZ2V0UmF3TWVzc2FnZShlcnJvciksIHRva2VuKTtcbiAgICB9XG4gICAgdGhpcy5fbGFzdFRva2VuID0gdG9rZW47XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2V0U2Nhbm5lckluZGV4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zY2FubmVyLmluZGV4OyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY29uc3VtZSh0eXBlOiBDc3NUb2tlblR5cGUsIHZhbHVlOiBzdHJpbmd8bnVsbCA9IG51bGwpOiBDc3NUb2tlbiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5fc2Nhbm5lci5jb25zdW1lKHR5cGUsIHZhbHVlKTtcbiAgICBjb25zdCB0b2tlbiA9IG91dHB1dC50b2tlbjtcbiAgICBjb25zdCBlcnJvciA9IG91dHB1dC5lcnJvcjtcbiAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZXJyb3IoZ2V0UmF3TWVzc2FnZShlcnJvciksIHRva2VuKTtcbiAgICB9XG4gICAgdGhpcy5fbGFzdFRva2VuID0gdG9rZW47XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VLZXlmcmFtZUJsb2NrKGRlbGltaXRlcnM6IG51bWJlcik6IENzc0Jsb2NrQXN0IHtcbiAgICBkZWxpbWl0ZXJzIHw9IFJCUkFDRV9ERUxJTV9GTEFHO1xuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuS0VZRlJBTUVfQkxPQ0spO1xuXG4gICAgY29uc3Qgc3RhcnRUb2tlbiA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJ3snKTtcblxuICAgIGNvbnN0IGRlZmluaXRpb25zOiBDc3NLZXlmcmFtZURlZmluaXRpb25Bc3RbXSA9IFtdO1xuICAgIHdoaWxlICghY2hhcmFjdGVyQ29udGFpbnNEZWxpbWl0ZXIodGhpcy5fc2Nhbm5lci5wZWVrLCBkZWxpbWl0ZXJzKSkge1xuICAgICAgZGVmaW5pdGlvbnMucHVzaCh0aGlzLl9wYXJzZUtleWZyYW1lRGVmaW5pdGlvbihkZWxpbWl0ZXJzKSk7XG4gICAgfVxuXG4gICAgY29uc3QgZW5kVG9rZW4gPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICd9Jyk7XG5cbiAgICBjb25zdCBzcGFuID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VTcGFuKHN0YXJ0VG9rZW4sIGVuZFRva2VuKTtcbiAgICByZXR1cm4gbmV3IENzc0Jsb2NrQXN0KHNwYW4sIGRlZmluaXRpb25zKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlS2V5ZnJhbWVEZWZpbml0aW9uKGRlbGltaXRlcnM6IG51bWJlcik6IENzc0tleWZyYW1lRGVmaW5pdGlvbkFzdCB7XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLl9nZXRTY2FubmVySW5kZXgoKTtcbiAgICBjb25zdCBzdGVwVG9rZW5zOiBDc3NUb2tlbltdID0gW107XG4gICAgZGVsaW1pdGVycyB8PSBMQlJBQ0VfREVMSU1fRkxBRztcbiAgICB3aGlsZSAoIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycykpIHtcbiAgICAgIHN0ZXBUb2tlbnMucHVzaCh0aGlzLl9wYXJzZUtleWZyYW1lTGFiZWwoZGVsaW1pdGVycyB8IENPTU1BX0RFTElNX0ZMQUcpKTtcbiAgICAgIGlmICh0aGlzLl9zY2FubmVyLnBlZWsgIT0gY2hhcnMuJExCUkFDRSkge1xuICAgICAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICcsJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHN0eWxlc0Jsb2NrID0gdGhpcy5fcGFyc2VTdHlsZUJsb2NrKGRlbGltaXRlcnMgfCBSQlJBQ0VfREVMSU1fRkxBRyk7XG4gICAgY29uc3Qgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGVwVG9rZW5zWzBdLCBzdHlsZXNCbG9jayk7XG4gICAgY29uc3QgYXN0ID0gbmV3IENzc0tleWZyYW1lRGVmaW5pdGlvbkFzdChzcGFuLCBzdGVwVG9rZW5zLCBzdHlsZXNCbG9jayAhKTtcblxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQkxPQ0spO1xuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9wYXJzZUtleWZyYW1lTGFiZWwoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzVG9rZW4ge1xuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuS0VZRlJBTUVfQkxPQ0spO1xuICAgIHJldHVybiBtZXJnZVRva2Vucyh0aGlzLl9jb2xsZWN0VW50aWxEZWxpbShkZWxpbWl0ZXJzKSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9wYXJzZVBzZXVkb1NlbGVjdG9yKGRlbGltaXRlcnM6IG51bWJlcik6IENzc1BzZXVkb1NlbGVjdG9yQXN0IHtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuX2dldFNjYW5uZXJJbmRleCgpO1xuXG4gICAgZGVsaW1pdGVycyAmPSB+Q09NTUFfREVMSU1fRkxBRztcblxuICAgIC8vIHdlIGtlZXAgdGhlIG9yaWdpbmFsIHZhbHVlIHNpbmNlIHdlIG1heSB1c2UgaXQgdG8gcmVjdXJzZSB3aGVuIDpub3QsIDpob3N0IGFyZSB1c2VkXG4gICAgY29uc3Qgc3RhcnRpbmdEZWxpbXMgPSBkZWxpbWl0ZXJzO1xuXG4gICAgY29uc3Qgc3RhcnRUb2tlbiA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJzonKTtcbiAgICBjb25zdCB0b2tlbnMgPSBbc3RhcnRUb2tlbl07XG5cbiAgICBpZiAodGhpcy5fc2Nhbm5lci5wZWVrID09IGNoYXJzLiRDT0xPTikgeyAgLy8gOjpzb21ldGhpbmdcbiAgICAgIHRva2Vucy5wdXNoKHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJzonKSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5uZXJTZWxlY3RvcnM6IENzc1NlbGVjdG9yQXN0W10gPSBbXTtcblxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuUFNFVURPX1NFTEVDVE9SKTtcblxuICAgIC8vIGhvc3QsIGhvc3QtY29udGV4dCwgbGFuZywgbm90LCBudGgtY2hpbGQgYXJlIGFsbCBpZGVudGlmaWVyc1xuICAgIGNvbnN0IHBzZXVkb1NlbGVjdG9yVG9rZW4gPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5JZGVudGlmaWVyKTtcbiAgICBjb25zdCBwc2V1ZG9TZWxlY3Rvck5hbWUgPSBwc2V1ZG9TZWxlY3RvclRva2VuLnN0clZhbHVlO1xuICAgIHRva2Vucy5wdXNoKHBzZXVkb1NlbGVjdG9yVG9rZW4pO1xuXG4gICAgLy8gaG9zdCgpLCBsYW5nKCksIG50aC1jaGlsZCgpLCBldGMuLi5cbiAgICBpZiAodGhpcy5fc2Nhbm5lci5wZWVrID09IGNoYXJzLiRMUEFSRU4pIHtcbiAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuUFNFVURPX1NFTEVDVE9SX1dJVEhfQVJHVU1FTlRTKTtcblxuICAgICAgY29uc3Qgb3BlblBhcmVuVG9rZW4gPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICcoJyk7XG4gICAgICB0b2tlbnMucHVzaChvcGVuUGFyZW5Ub2tlbik7XG5cbiAgICAgIC8vIDpob3N0KGlubmVyU2VsZWN0b3IocykpLCA6bm90KHNlbGVjdG9yKSwgZXRjLi4uXG4gICAgICBpZiAoX3BzZXVkb1NlbGVjdG9yU3VwcG9ydHNJbm5lclNlbGVjdG9ycyhwc2V1ZG9TZWxlY3Rvck5hbWUpKSB7XG4gICAgICAgIGxldCBpbm5lckRlbGltcyA9IHN0YXJ0aW5nRGVsaW1zIHwgTFBBUkVOX0RFTElNX0ZMQUcgfCBSUEFSRU5fREVMSU1fRkxBRztcbiAgICAgICAgaWYgKHBzZXVkb1NlbGVjdG9yTmFtZSA9PSAnbm90Jykge1xuICAgICAgICAgIC8vIHRoZSBpbm5lciBzZWxlY3RvciBpbnNpZGUgb2YgOm5vdCguLi4pIGNhbiBvbmx5IGJlIG9uZVxuICAgICAgICAgIC8vIENTUyBzZWxlY3RvciAobm8gY29tbWFzIGFsbG93ZWQpIC4uLiBUaGlzIGlzIGFjY29yZGluZ1xuICAgICAgICAgIC8vIHRvIHRoZSBDU1Mgc3BlY2lmaWNhdGlvblxuICAgICAgICAgIGlubmVyRGVsaW1zIHw9IENPTU1BX0RFTElNX0ZMQUc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyA6aG9zdChhLCBiLCBjKSB7XG4gICAgICAgIHRoaXMuX3BhcnNlU2VsZWN0b3JzKGlubmVyRGVsaW1zKS5mb3JFYWNoKChzZWxlY3RvciwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpbm5lclNlbGVjdG9ycy5wdXNoKHNlbGVjdG9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGlzIGJyYW5jaCBpcyBmb3IgdGhpbmdzIGxpa2UgXCJlbi11cywgMmsgKyAxLCBldGMuLi5cIlxuICAgICAgICAvLyB3aGljaCBhbGwgZW5kIHVwIGluIHBzZXVkb1NlbGVjdG9ycyBsaWtlIDpsYW5nLCA6bnRoLWNoaWxkLCBldGMuLlxuICAgICAgICBjb25zdCBpbm5lclZhbHVlRGVsaW1zID0gZGVsaW1pdGVycyB8IExCUkFDRV9ERUxJTV9GTEFHIHwgQ09MT05fREVMSU1fRkxBRyB8XG4gICAgICAgICAgICBSUEFSRU5fREVMSU1fRkxBRyB8IExQQVJFTl9ERUxJTV9GTEFHO1xuICAgICAgICB3aGlsZSAoIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgaW5uZXJWYWx1ZURlbGltcykpIHtcbiAgICAgICAgICBjb25zdCB0b2tlbiA9IHRoaXMuX3NjYW4oKTtcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY2xvc2VQYXJlblRva2VuID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnKScpO1xuICAgICAgdG9rZW5zLnB1c2goY2xvc2VQYXJlblRva2VuKTtcbiAgICB9XG5cbiAgICBjb25zdCBlbmQgPSB0aGlzLl9nZXRTY2FubmVySW5kZXgoKSAtIDE7XG4gICAgY29uc3Qgc3RyVmFsdWUgPSB0aGlzLl9leHRyYWN0U291cmNlQ29udGVudChzdGFydCwgZW5kKTtcblxuICAgIGNvbnN0IGVuZFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBzcGFuID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VTcGFuKHN0YXJ0VG9rZW4sIGVuZFRva2VuKTtcbiAgICByZXR1cm4gbmV3IENzc1BzZXVkb1NlbGVjdG9yQXN0KHNwYW4sIHN0clZhbHVlLCBwc2V1ZG9TZWxlY3Rvck5hbWUsIHRva2VucywgaW5uZXJTZWxlY3RvcnMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VTaW1wbGVTZWxlY3RvcihkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NTaW1wbGVTZWxlY3RvckFzdCB7XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLl9nZXRTY2FubmVySW5kZXgoKTtcblxuICAgIGRlbGltaXRlcnMgfD0gQ09NTUFfREVMSU1fRkxBRztcblxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU0VMRUNUT1IpO1xuICAgIGNvbnN0IHNlbGVjdG9yQ3NzVG9rZW5zOiBDc3NUb2tlbltdID0gW107XG4gICAgY29uc3QgcHNldWRvU2VsZWN0b3JzOiBDc3NQc2V1ZG9TZWxlY3RvckFzdFtdID0gW107XG5cbiAgICBsZXQgcHJldmlvdXNUb2tlbjogQ3NzVG9rZW4gPSB1bmRlZmluZWQgITtcblxuICAgIGNvbnN0IHNlbGVjdG9yUGFydERlbGltaXRlcnMgPSBkZWxpbWl0ZXJzIHwgU1BBQ0VfREVMSU1fRkxBRztcbiAgICBsZXQgbG9vcE92ZXJTZWxlY3RvciA9ICFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIHNlbGVjdG9yUGFydERlbGltaXRlcnMpO1xuXG4gICAgbGV0IGhhc0F0dHJpYnV0ZUVycm9yID0gZmFsc2U7XG4gICAgd2hpbGUgKGxvb3BPdmVyU2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IHBlZWsgPSB0aGlzLl9zY2FubmVyLnBlZWs7XG5cbiAgICAgIHN3aXRjaCAocGVlaykge1xuICAgICAgICBjYXNlIGNoYXJzLiRDT0xPTjpcbiAgICAgICAgICBsZXQgaW5uZXJQc2V1ZG8gPSB0aGlzLl9wYXJzZVBzZXVkb1NlbGVjdG9yKGRlbGltaXRlcnMpO1xuICAgICAgICAgIHBzZXVkb1NlbGVjdG9ycy5wdXNoKGlubmVyUHNldWRvKTtcbiAgICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNFTEVDVE9SKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIGNoYXJzLiRMQlJBQ0tFVDpcbiAgICAgICAgICAvLyB3ZSBzZXQgdGhlIG1vZGUgYWZ0ZXIgdGhlIHNjYW4gYmVjYXVzZSBhdHRyaWJ1dGUgbW9kZSBkb2VzIG5vdFxuICAgICAgICAgIC8vIGFsbG93IGF0dHJpYnV0ZSBbXSB2YWx1ZXMuIEFuZCB0aGlzIGFsc28gd2lsbCBjYXRjaCBhbnkgZXJyb3JzXG4gICAgICAgICAgLy8gaWYgYW4gZXh0cmEgXCJbXCIgaXMgdXNlZCBpbnNpZGUuXG4gICAgICAgICAgc2VsZWN0b3JDc3NUb2tlbnMucHVzaCh0aGlzLl9zY2FuKCkpO1xuICAgICAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQVRUUklCVVRFX1NFTEVDVE9SKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIGNoYXJzLiRSQlJBQ0tFVDpcbiAgICAgICAgICBpZiAodGhpcy5fc2Nhbm5lci5nZXRNb2RlKCkgIT0gQ3NzTGV4ZXJNb2RlLkFUVFJJQlVURV9TRUxFQ1RPUikge1xuICAgICAgICAgICAgaGFzQXR0cmlidXRlRXJyb3IgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3ZSBzZXQgdGhlIG1vZGUgZWFybHkgYmVjYXVzZSBhdHRyaWJ1dGUgbW9kZSBkb2VzIG5vdFxuICAgICAgICAgIC8vIGFsbG93IGF0dHJpYnV0ZSBbXSB2YWx1ZXNcbiAgICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNFTEVDVE9SKTtcbiAgICAgICAgICBzZWxlY3RvckNzc1Rva2Vucy5wdXNoKHRoaXMuX3NjYW4oKSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoaXNTZWxlY3Rvck9wZXJhdG9yQ2hhcmFjdGVyKHBlZWspKSB7XG4gICAgICAgICAgICBsb29wT3ZlclNlbGVjdG9yID0gZmFsc2U7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLl9zY2FuKCk7XG4gICAgICAgICAgcHJldmlvdXNUb2tlbiA9IHRva2VuO1xuICAgICAgICAgIHNlbGVjdG9yQ3NzVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBsb29wT3ZlclNlbGVjdG9yID0gIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgc2VsZWN0b3JQYXJ0RGVsaW1pdGVycyk7XG4gICAgfVxuXG4gICAgaGFzQXR0cmlidXRlRXJyb3IgPVxuICAgICAgICBoYXNBdHRyaWJ1dGVFcnJvciB8fCB0aGlzLl9zY2FubmVyLmdldE1vZGUoKSA9PSBDc3NMZXhlck1vZGUuQVRUUklCVVRFX1NFTEVDVE9SO1xuICAgIGlmIChoYXNBdHRyaWJ1dGVFcnJvcikge1xuICAgICAgdGhpcy5fZXJyb3IoXG4gICAgICAgICAgYFVuYmFsYW5jZWQgQ1NTIGF0dHJpYnV0ZSBzZWxlY3RvciBhdCBjb2x1bW4gJHtwcmV2aW91c1Rva2VuLmxpbmV9OiR7cHJldmlvdXNUb2tlbi5jb2x1bW59YCxcbiAgICAgICAgICBwcmV2aW91c1Rva2VuKTtcbiAgICB9XG5cbiAgICBsZXQgZW5kID0gdGhpcy5fZ2V0U2Nhbm5lckluZGV4KCkgLSAxO1xuXG4gICAgLy8gdGhpcyBoYXBwZW5zIGlmIHRoZSBzZWxlY3RvciBpcyBub3QgZGlyZWN0bHkgZm9sbG93ZWQgYnlcbiAgICAvLyBhIGNvbW1hIG9yIGN1cmx5IGJyYWNlIHdpdGhvdXQgYSBzcGFjZSBpbiBiZXR3ZWVuXG4gICAgbGV0IG9wZXJhdG9yOiBDc3NUb2tlbnxudWxsID0gbnVsbDtcbiAgICBsZXQgb3BlcmF0b3JTY2FuQ291bnQgPSAwO1xuICAgIGxldCBsYXN0T3BlcmF0b3JUb2tlbjogQ3NzVG9rZW58bnVsbCA9IG51bGw7XG4gICAgaWYgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpKSB7XG4gICAgICB3aGlsZSAob3BlcmF0b3IgPT0gbnVsbCAmJiAhY2hhcmFjdGVyQ29udGFpbnNEZWxpbWl0ZXIodGhpcy5fc2Nhbm5lci5wZWVrLCBkZWxpbWl0ZXJzKSAmJlxuICAgICAgICAgICAgIGlzU2VsZWN0b3JPcGVyYXRvckNoYXJhY3Rlcih0aGlzLl9zY2FubmVyLnBlZWspKSB7XG4gICAgICAgIGxldCB0b2tlbiA9IHRoaXMuX3NjYW4oKTtcbiAgICAgICAgY29uc3QgdG9rZW5PcGVyYXRvciA9IHRva2VuLnN0clZhbHVlO1xuICAgICAgICBvcGVyYXRvclNjYW5Db3VudCsrO1xuICAgICAgICBsYXN0T3BlcmF0b3JUb2tlbiA9IHRva2VuO1xuICAgICAgICBpZiAodG9rZW5PcGVyYXRvciAhPSBTUEFDRV9PUEVSQVRPUikge1xuICAgICAgICAgIHN3aXRjaCAodG9rZW5PcGVyYXRvcikge1xuICAgICAgICAgICAgY2FzZSBTTEFTSF9DSEFSQUNURVI6XG4gICAgICAgICAgICAgIC8vIC9kZWVwLyBvcGVyYXRvclxuICAgICAgICAgICAgICBsZXQgZGVlcFRva2VuID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuSWRlbnRpZmllcik7XG4gICAgICAgICAgICAgIGxldCBkZWVwU2xhc2ggPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIpO1xuICAgICAgICAgICAgICBsZXQgaW5kZXggPSBsYXN0T3BlcmF0b3JUb2tlbi5pbmRleDtcbiAgICAgICAgICAgICAgbGV0IGxpbmUgPSBsYXN0T3BlcmF0b3JUb2tlbi5saW5lO1xuICAgICAgICAgICAgICBsZXQgY29sdW1uID0gbGFzdE9wZXJhdG9yVG9rZW4uY29sdW1uO1xuICAgICAgICAgICAgICBpZiAoZGVlcFRva2VuICE9IG51bGwgJiYgZGVlcFRva2VuLnN0clZhbHVlLnRvTG93ZXJDYXNlKCkgPT0gJ2RlZXAnICYmXG4gICAgICAgICAgICAgICAgICBkZWVwU2xhc2guc3RyVmFsdWUgPT0gU0xBU0hfQ0hBUkFDVEVSKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgQ3NzVG9rZW4oXG4gICAgICAgICAgICAgICAgICAgIGxhc3RPcGVyYXRvclRva2VuLmluZGV4LCBsYXN0T3BlcmF0b3JUb2tlbi5jb2x1bW4sIGxhc3RPcGVyYXRvclRva2VuLmxpbmUsXG4gICAgICAgICAgICAgICAgICAgIENzc1Rva2VuVHlwZS5JZGVudGlmaWVyLCBERUVQX09QRVJBVE9SX1NUUik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IFNMQVNIX0NIQVJBQ1RFUiArIGRlZXBUb2tlbi5zdHJWYWx1ZSArIGRlZXBTbGFzaC5zdHJWYWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVFcnJvck1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRTb3VyY2VDb250ZW50KCksIGAke3RleHR9IGlzIGFuIGludmFsaWQgQ1NTIG9wZXJhdG9yYCwgdGV4dCwgaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lLCBjb2x1bW4pLFxuICAgICAgICAgICAgICAgICAgICBsYXN0T3BlcmF0b3JUb2tlbik7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgQ3NzVG9rZW4oaW5kZXgsIGNvbHVtbiwgbGluZSwgQ3NzVG9rZW5UeXBlLkludmFsaWQsIHRleHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEdUX0NIQVJBQ1RFUjpcbiAgICAgICAgICAgICAgLy8gPj4+IG9wZXJhdG9yXG4gICAgICAgICAgICAgIGlmICh0aGlzLl9zY2FubmVyLnBlZWsgPT0gY2hhcnMuJEdUICYmIHRoaXMuX3NjYW5uZXIucGVla1BlZWsgPT0gY2hhcnMuJEdUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCBHVF9DSEFSQUNURVIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgR1RfQ0hBUkFDVEVSKTtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBDc3NUb2tlbihcbiAgICAgICAgICAgICAgICAgICAgbGFzdE9wZXJhdG9yVG9rZW4uaW5kZXgsIGxhc3RPcGVyYXRvclRva2VuLmNvbHVtbiwgbGFzdE9wZXJhdG9yVG9rZW4ubGluZSxcbiAgICAgICAgICAgICAgICAgICAgQ3NzVG9rZW5UeXBlLklkZW50aWZpZXIsIFRSSVBMRV9HVF9PUEVSQVRPUl9TVFIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG9wZXJhdG9yID0gdG9rZW47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gc28gbG9uZyBhcyB0aGVyZSBpcyBhbiBvcGVyYXRvciB0aGVuIHdlIGNhbiBoYXZlIGFuXG4gICAgICAvLyBlbmRpbmcgdmFsdWUgdGhhdCBpcyBiZXlvbmQgdGhlIHNlbGVjdG9yIHZhbHVlIC4uLlxuICAgICAgLy8gb3RoZXJ3aXNlIGl0J3MganVzdCBhIGJ1bmNoIG9mIHRyYWlsaW5nIHdoaXRlc3BhY2VcbiAgICAgIGlmIChvcGVyYXRvciAhPSBudWxsKSB7XG4gICAgICAgIGVuZCA9IG9wZXJhdG9yLmluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZVdoaXRlc3BhY2UoKTtcblxuICAgIGNvbnN0IHN0clZhbHVlID0gdGhpcy5fZXh0cmFjdFNvdXJjZUNvbnRlbnQoc3RhcnQsIGVuZCk7XG5cbiAgICAvLyBpZiB3ZSBkbyBjb21lIGFjcm9zcyBvbmUgb3IgbW9yZSBzcGFjZXMgaW5zaWRlIG9mXG4gICAgLy8gdGhlIG9wZXJhdG9ycyBsb29wIHRoZW4gYW4gZW1wdHkgc3BhY2UgaXMgc3RpbGwgYVxuICAgIC8vIHZhbGlkIG9wZXJhdG9yIHRvIHVzZSBpZiBzb21ldGhpbmcgZWxzZSB3YXMgbm90IGZvdW5kXG4gICAgaWYgKG9wZXJhdG9yID09IG51bGwgJiYgb3BlcmF0b3JTY2FuQ291bnQgPiAwICYmIHRoaXMuX3NjYW5uZXIucGVlayAhPSBjaGFycy4kTEJSQUNFKSB7XG4gICAgICBvcGVyYXRvciA9IGxhc3RPcGVyYXRvclRva2VuO1xuICAgIH1cblxuICAgIC8vIHBsZWFzZSBub3RlIHRoYXQgYGVuZFRva2VuYCBpcyByZWFzc2lnbmVkIG11bHRpcGxlIHRpbWVzIGJlbG93XG4gICAgLy8gc28gcGxlYXNlIGRvIG5vdCBvcHRpbWl6ZSB0aGUgaWYgc3RhdGVtZW50cyBpbnRvIGlmL2Vsc2VpZlxuICAgIGxldCBzdGFydFRva2VuT3JBc3Q6IENzc1Rva2VufENzc0FzdHxudWxsID0gbnVsbDtcbiAgICBsZXQgZW5kVG9rZW5PckFzdDogQ3NzVG9rZW58Q3NzQXN0fG51bGwgPSBudWxsO1xuICAgIGlmIChzZWxlY3RvckNzc1Rva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICBzdGFydFRva2VuT3JBc3QgPSBzdGFydFRva2VuT3JBc3QgfHwgc2VsZWN0b3JDc3NUb2tlbnNbMF07XG4gICAgICBlbmRUb2tlbk9yQXN0ID0gc2VsZWN0b3JDc3NUb2tlbnNbc2VsZWN0b3JDc3NUb2tlbnMubGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIGlmIChwc2V1ZG9TZWxlY3RvcnMubGVuZ3RoID4gMCkge1xuICAgICAgc3RhcnRUb2tlbk9yQXN0ID0gc3RhcnRUb2tlbk9yQXN0IHx8IHBzZXVkb1NlbGVjdG9yc1swXTtcbiAgICAgIGVuZFRva2VuT3JBc3QgPSBwc2V1ZG9TZWxlY3RvcnNbcHNldWRvU2VsZWN0b3JzLmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgICBpZiAob3BlcmF0b3IgIT0gbnVsbCkge1xuICAgICAgc3RhcnRUb2tlbk9yQXN0ID0gc3RhcnRUb2tlbk9yQXN0IHx8IG9wZXJhdG9yO1xuICAgICAgZW5kVG9rZW5PckFzdCA9IG9wZXJhdG9yO1xuICAgIH1cblxuICAgIGNvbnN0IHNwYW4gPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZVNwYW4oc3RhcnRUb2tlbk9yQXN0ICEsIGVuZFRva2VuT3JBc3QpO1xuICAgIHJldHVybiBuZXcgQ3NzU2ltcGxlU2VsZWN0b3JBc3Qoc3Bhbiwgc2VsZWN0b3JDc3NUb2tlbnMsIHN0clZhbHVlLCBwc2V1ZG9TZWxlY3RvcnMsIG9wZXJhdG9yICEpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VTZWxlY3RvcihkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NTZWxlY3RvckFzdCB7XG4gICAgZGVsaW1pdGVycyB8PSBDT01NQV9ERUxJTV9GTEFHO1xuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU0VMRUNUT1IpO1xuXG4gICAgY29uc3Qgc2ltcGxlU2VsZWN0b3JzOiBDc3NTaW1wbGVTZWxlY3RvckFzdFtdID0gW107XG4gICAgd2hpbGUgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpKSB7XG4gICAgICBzaW1wbGVTZWxlY3RvcnMucHVzaCh0aGlzLl9wYXJzZVNpbXBsZVNlbGVjdG9yKGRlbGltaXRlcnMpKTtcbiAgICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZVdoaXRlc3BhY2UoKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFNlbGVjdG9yID0gc2ltcGxlU2VsZWN0b3JzWzBdO1xuICAgIGNvbnN0IGxhc3RTZWxlY3RvciA9IHNpbXBsZVNlbGVjdG9yc1tzaW1wbGVTZWxlY3RvcnMubGVuZ3RoIC0gMV07XG4gICAgY29uc3Qgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihmaXJzdFNlbGVjdG9yLCBsYXN0U2VsZWN0b3IpO1xuICAgIHJldHVybiBuZXcgQ3NzU2VsZWN0b3JBc3Qoc3Bhbiwgc2ltcGxlU2VsZWN0b3JzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlVmFsdWUoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzU3R5bGVWYWx1ZUFzdCB7XG4gICAgZGVsaW1pdGVycyB8PSBSQlJBQ0VfREVMSU1fRkxBRyB8IFNFTUlDT0xPTl9ERUxJTV9GTEFHIHwgTkVXTElORV9ERUxJTV9GTEFHO1xuXG4gICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5TVFlMRV9WQUxVRSk7XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLl9nZXRTY2FubmVySW5kZXgoKTtcblxuICAgIGNvbnN0IHRva2VuczogQ3NzVG9rZW5bXSA9IFtdO1xuICAgIGxldCB3c1N0ciA9ICcnO1xuICAgIGxldCBwcmV2aW91czogQ3NzVG9rZW4gPSB1bmRlZmluZWQgITtcbiAgICB3aGlsZSAoIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycykpIHtcbiAgICAgIGxldCB0b2tlbjogQ3NzVG9rZW47XG4gICAgICBpZiAocHJldmlvdXMgIT0gbnVsbCAmJiBwcmV2aW91cy50eXBlID09IENzc1Rva2VuVHlwZS5JZGVudGlmaWVyICYmXG4gICAgICAgICAgdGhpcy5fc2Nhbm5lci5wZWVrID09IGNoYXJzLiRMUEFSRU4pIHtcbiAgICAgICAgdG9rZW4gPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICcoJyk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblxuICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNUWUxFX1ZBTFVFX0ZVTkNUSU9OKTtcblxuICAgICAgICB0b2tlbiA9IHRoaXMuX3NjYW4oKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU1RZTEVfVkFMVUUpO1xuXG4gICAgICAgIHRva2VuID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnKScpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2tlbiA9IHRoaXMuX3NjYW4oKTtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT0gQ3NzVG9rZW5UeXBlLldoaXRlc3BhY2UpIHtcbiAgICAgICAgICB3c1N0ciArPSB0b2tlbi5zdHJWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3c1N0ciA9ICcnO1xuICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcHJldmlvdXMgPSB0b2tlbjtcbiAgICB9XG5cbiAgICBjb25zdCBlbmQgPSB0aGlzLl9nZXRTY2FubmVySW5kZXgoKSAtIDE7XG4gICAgdGhpcy5fc2Nhbm5lci5jb25zdW1lV2hpdGVzcGFjZSgpO1xuXG4gICAgY29uc3QgY29kZSA9IHRoaXMuX3NjYW5uZXIucGVlaztcbiAgICBpZiAoY29kZSA9PSBjaGFycy4kU0VNSUNPTE9OKSB7XG4gICAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICc7Jyk7XG4gICAgfSBlbHNlIGlmIChjb2RlICE9IGNoYXJzLiRSQlJBQ0UpIHtcbiAgICAgIHRoaXMuX2Vycm9yKFxuICAgICAgICAgIGdlbmVyYXRlRXJyb3JNZXNzYWdlKFxuICAgICAgICAgICAgICB0aGlzLl9nZXRTb3VyY2VDb250ZW50KCksIGBUaGUgQ1NTIGtleS92YWx1ZSBkZWZpbml0aW9uIGRpZCBub3QgZW5kIHdpdGggYSBzZW1pY29sb25gLFxuICAgICAgICAgICAgICBwcmV2aW91cy5zdHJWYWx1ZSwgcHJldmlvdXMuaW5kZXgsIHByZXZpb3VzLmxpbmUsIHByZXZpb3VzLmNvbHVtbiksXG4gICAgICAgICAgcHJldmlvdXMpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0clZhbHVlID0gdGhpcy5fZXh0cmFjdFNvdXJjZUNvbnRlbnQoc3RhcnQsIGVuZCk7XG4gICAgY29uc3Qgc3RhcnRUb2tlbiA9IHRva2Vuc1swXTtcbiAgICBjb25zdCBlbmRUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgY29uc3Qgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGFydFRva2VuLCBlbmRUb2tlbik7XG4gICAgcmV0dXJuIG5ldyBDc3NTdHlsZVZhbHVlQXN0KHNwYW4sIHRva2Vucywgc3RyVmFsdWUpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY29sbGVjdFVudGlsRGVsaW0oZGVsaW1pdGVyczogbnVtYmVyLCBhc3NlcnRUeXBlOiBDc3NUb2tlblR5cGV8bnVsbCA9IG51bGwpOiBDc3NUb2tlbltdIHtcbiAgICBjb25zdCB0b2tlbnM6IENzc1Rva2VuW10gPSBbXTtcbiAgICB3aGlsZSAoIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycykpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGFzc2VydFR5cGUgIT0gbnVsbCA/IHRoaXMuX2NvbnN1bWUoYXNzZXJ0VHlwZSkgOiB0aGlzLl9zY2FuKCk7XG4gICAgICB0b2tlbnMucHVzaCh2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VCbG9jayhkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NCbG9ja0FzdCB7XG4gICAgZGVsaW1pdGVycyB8PSBSQlJBQ0VfREVMSU1fRkxBRztcblxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuQkxPQ0spO1xuXG4gICAgY29uc3Qgc3RhcnRUb2tlbiA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJ3snKTtcbiAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVFbXB0eVN0YXRlbWVudHMoKTtcblxuICAgIGNvbnN0IHJlc3VsdHM6IENzc1J1bGVBc3RbXSA9IFtdO1xuICAgIHdoaWxlICghY2hhcmFjdGVyQ29udGFpbnNEZWxpbWl0ZXIodGhpcy5fc2Nhbm5lci5wZWVrLCBkZWxpbWl0ZXJzKSkge1xuICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuX3BhcnNlUnVsZShkZWxpbWl0ZXJzKSk7XG4gICAgfVxuXG4gICAgY29uc3QgZW5kVG9rZW4gPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICd9Jyk7XG5cbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkJMT0NLKTtcbiAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVFbXB0eVN0YXRlbWVudHMoKTtcblxuICAgIGNvbnN0IHNwYW4gPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZVNwYW4oc3RhcnRUb2tlbiwgZW5kVG9rZW4pO1xuICAgIHJldHVybiBuZXcgQ3NzQmxvY2tBc3Qoc3BhbiwgcmVzdWx0cyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9wYXJzZVN0eWxlQmxvY2soZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzU3R5bGVzQmxvY2tBc3R8bnVsbCB7XG4gICAgZGVsaW1pdGVycyB8PSBSQlJBQ0VfREVMSU1fRkxBRyB8IExCUkFDRV9ERUxJTV9GTEFHO1xuXG4gICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5TVFlMRV9CTE9DSyk7XG5cbiAgICBjb25zdCBzdGFydFRva2VuID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAneycpO1xuICAgIGlmIChzdGFydFRva2VuLm51bVZhbHVlICE9IGNoYXJzLiRMQlJBQ0UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmluaXRpb25zOiBDc3NEZWZpbml0aW9uQXN0W10gPSBbXTtcbiAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVFbXB0eVN0YXRlbWVudHMoKTtcblxuICAgIHdoaWxlICghY2hhcmFjdGVyQ29udGFpbnNEZWxpbWl0ZXIodGhpcy5fc2Nhbm5lci5wZWVrLCBkZWxpbWl0ZXJzKSkge1xuICAgICAgZGVmaW5pdGlvbnMucHVzaCh0aGlzLl9wYXJzZURlZmluaXRpb24oZGVsaW1pdGVycykpO1xuICAgICAgdGhpcy5fc2Nhbm5lci5jb25zdW1lRW1wdHlTdGF0ZW1lbnRzKCk7XG4gICAgfVxuXG4gICAgY29uc3QgZW5kVG9rZW4gPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICd9Jyk7XG5cbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNUWUxFX0JMT0NLKTtcbiAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVFbXB0eVN0YXRlbWVudHMoKTtcblxuICAgIGNvbnN0IHNwYW4gPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZVNwYW4oc3RhcnRUb2tlbiwgZW5kVG9rZW4pO1xuICAgIHJldHVybiBuZXcgQ3NzU3R5bGVzQmxvY2tBc3Qoc3BhbiwgZGVmaW5pdGlvbnMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VEZWZpbml0aW9uKGRlbGltaXRlcnM6IG51bWJlcik6IENzc0RlZmluaXRpb25Bc3Qge1xuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU1RZTEVfQkxPQ0spO1xuXG4gICAgbGV0IHByb3AgPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5JZGVudGlmaWVyKTtcbiAgICBsZXQgcGFyc2VWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGxldCB2YWx1ZTogQ3NzU3R5bGVWYWx1ZUFzdHxudWxsID0gbnVsbDtcbiAgICBsZXQgZW5kVG9rZW46IENzc1Rva2VufENzc1N0eWxlVmFsdWVBc3QgPSBwcm9wO1xuXG4gICAgLy8gdGhlIGNvbG9uIHZhbHVlIHNlcGFyYXRlcyB0aGUgcHJvcCBmcm9tIHRoZSBzdHlsZS5cbiAgICAvLyB0aGVyZSBhcmUgYSBmZXcgY2FzZXMgYXMgdG8gd2hhdCBjb3VsZCBoYXBwZW4gaWYgaXRcbiAgICAvLyBpcyBtaXNzaW5nXG4gICAgc3dpdGNoICh0aGlzLl9zY2FubmVyLnBlZWspIHtcbiAgICAgIGNhc2UgY2hhcnMuJFNFTUlDT0xPTjpcbiAgICAgIGNhc2UgY2hhcnMuJFJCUkFDRTpcbiAgICAgIGNhc2UgY2hhcnMuJEVPRjpcbiAgICAgICAgcGFyc2VWYWx1ZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGV0IHByb3BTdHIgPSBbcHJvcC5zdHJWYWx1ZV07XG4gICAgICAgIGlmICh0aGlzLl9zY2FubmVyLnBlZWsgIT0gY2hhcnMuJENPTE9OKSB7XG4gICAgICAgICAgLy8gdGhpcyB3aWxsIHRocm93IHRoZSBlcnJvclxuICAgICAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJzonKTtcbiAgICAgICAgICBwcm9wU3RyLnB1c2gobmV4dFZhbHVlLnN0clZhbHVlKTtcblxuICAgICAgICAgIGNvbnN0IHJlbWFpbmluZ1Rva2VucyA9IHRoaXMuX2NvbGxlY3RVbnRpbERlbGltKFxuICAgICAgICAgICAgICBkZWxpbWl0ZXJzIHwgQ09MT05fREVMSU1fRkxBRyB8IFNFTUlDT0xPTl9ERUxJTV9GTEFHLCBDc3NUb2tlblR5cGUuSWRlbnRpZmllcik7XG4gICAgICAgICAgaWYgKHJlbWFpbmluZ1Rva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZW1haW5pbmdUb2tlbnMuZm9yRWFjaCgodG9rZW4pID0+IHsgcHJvcFN0ci5wdXNoKHRva2VuLnN0clZhbHVlKTsgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZW5kVG9rZW4gPSBwcm9wID1cbiAgICAgICAgICAgICAgbmV3IENzc1Rva2VuKHByb3AuaW5kZXgsIHByb3AuY29sdW1uLCBwcm9wLmxpbmUsIHByb3AudHlwZSwgcHJvcFN0ci5qb2luKCcgJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhpcyBtZWFucyB3ZSd2ZSByZWFjaGVkIHRoZSBlbmQgb2YgdGhlIGRlZmluaXRpb24gYW5kL29yIGJsb2NrXG4gICAgICAgIGlmICh0aGlzLl9zY2FubmVyLnBlZWsgPT0gY2hhcnMuJENPTE9OKSB7XG4gICAgICAgICAgdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnOicpO1xuICAgICAgICAgIHBhcnNlVmFsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChwYXJzZVZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuX3BhcnNlVmFsdWUoZGVsaW1pdGVycyk7XG4gICAgICBlbmRUb2tlbiA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lcnJvcihcbiAgICAgICAgICBnZW5lcmF0ZUVycm9yTWVzc2FnZShcbiAgICAgICAgICAgICAgdGhpcy5fZ2V0U291cmNlQ29udGVudCgpLCBgVGhlIENTUyBwcm9wZXJ0eSB3YXMgbm90IHBhaXJlZCB3aXRoIGEgc3R5bGUgdmFsdWVgLFxuICAgICAgICAgICAgICBwcm9wLnN0clZhbHVlLCBwcm9wLmluZGV4LCBwcm9wLmxpbmUsIHByb3AuY29sdW1uKSxcbiAgICAgICAgICBwcm9wKTtcbiAgICB9XG5cbiAgICBjb25zdCBzcGFuID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VTcGFuKHByb3AsIGVuZFRva2VuKTtcbiAgICByZXR1cm4gbmV3IENzc0RlZmluaXRpb25Bc3Qoc3BhbiwgcHJvcCwgdmFsdWUgISk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9hc3NlcnRDb25kaXRpb24oc3RhdHVzOiBib29sZWFuLCBlcnJvck1lc3NhZ2U6IHN0cmluZywgcHJvYmxlbVRva2VuOiBDc3NUb2tlbik6IGJvb2xlYW4ge1xuICAgIGlmICghc3RhdHVzKSB7XG4gICAgICB0aGlzLl9lcnJvcihlcnJvck1lc3NhZ2UsIHByb2JsZW1Ub2tlbik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZXJyb3IobWVzc2FnZTogc3RyaW5nLCBwcm9ibGVtVG9rZW46IENzc1Rva2VuKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gcHJvYmxlbVRva2VuLnN0clZhbHVlLmxlbmd0aDtcbiAgICBjb25zdCBlcnJvciA9IENzc1BhcnNlRXJyb3IuY3JlYXRlKFxuICAgICAgICB0aGlzLl9maWxlLCAwLCBwcm9ibGVtVG9rZW4ubGluZSwgcHJvYmxlbVRva2VuLmNvbHVtbiwgbGVuZ3RoLCBtZXNzYWdlKTtcbiAgICB0aGlzLl9lcnJvcnMucHVzaChlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENzc1BhcnNlRXJyb3IgZXh0ZW5kcyBQYXJzZUVycm9yIHtcbiAgc3RhdGljIGNyZWF0ZShcbiAgICAgIGZpbGU6IFBhcnNlU291cmNlRmlsZSwgb2Zmc2V0OiBudW1iZXIsIGxpbmU6IG51bWJlciwgY29sOiBudW1iZXIsIGxlbmd0aDogbnVtYmVyLFxuICAgICAgZXJyTXNnOiBzdHJpbmcpOiBDc3NQYXJzZUVycm9yIHtcbiAgICBjb25zdCBzdGFydCA9IG5ldyBQYXJzZUxvY2F0aW9uKGZpbGUsIG9mZnNldCwgbGluZSwgY29sKTtcbiAgICBjb25zdCBlbmQgPSBuZXcgUGFyc2VMb2NhdGlvbihmaWxlLCBvZmZzZXQsIGxpbmUsIGNvbCArIGxlbmd0aCk7XG4gICAgY29uc3Qgc3BhbiA9IG5ldyBQYXJzZVNvdXJjZVNwYW4oc3RhcnQsIGVuZCk7XG4gICAgcmV0dXJuIG5ldyBDc3NQYXJzZUVycm9yKHNwYW4sICdDU1MgUGFyc2UgRXJyb3I6ICcgKyBlcnJNc2cpO1xuICB9XG5cbiAgY29uc3RydWN0b3Ioc3BhbjogUGFyc2VTb3VyY2VTcGFuLCBtZXNzYWdlOiBzdHJpbmcpIHsgc3VwZXIoc3BhbiwgbWVzc2FnZSk7IH1cbn1cbiJdfQ==