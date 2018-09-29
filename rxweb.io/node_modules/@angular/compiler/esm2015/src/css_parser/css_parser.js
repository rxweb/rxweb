/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as chars from '../chars';
import { ParseError, ParseLocation, ParseSourceFile, ParseSourceSpan } from '../parse_util';
import { BlockType, CssAst, CssAtRulePredicateAst, CssBlockAst, CssBlockDefinitionRuleAst, CssBlockRuleAst, CssDefinitionAst, CssInlineRuleAst, CssKeyframeDefinitionAst, CssKeyframeRuleAst, CssMediaQueryRuleAst, CssPseudoSelectorAst, CssSelectorAst, CssSelectorRuleAst, CssSimpleSelectorAst, CssStyleSheetAst, CssStyleValueAst, CssStylesBlockAst, CssUnknownRuleAst, CssUnknownTokenListAst, mergeTokens } from './css_ast';
import { CssLexer, CssLexerMode, CssToken, CssTokenType, generateErrorMessage, getRawMessage, isNewline } from './css_lexer';
const SPACE_OPERATOR = ' ';
export { CssToken } from './css_lexer';
export { BlockType } from './css_ast';
const SLASH_CHARACTER = '/';
const GT_CHARACTER = '>';
const TRIPLE_GT_OPERATOR_STR = '>>>';
const DEEP_OPERATOR_STR = '/deep/';
const EOF_DELIM_FLAG = 1;
const RBRACE_DELIM_FLAG = 2;
const LBRACE_DELIM_FLAG = 4;
const COMMA_DELIM_FLAG = 8;
const COLON_DELIM_FLAG = 16;
const SEMICOLON_DELIM_FLAG = 32;
const NEWLINE_DELIM_FLAG = 64;
const RPAREN_DELIM_FLAG = 128;
const LPAREN_DELIM_FLAG = 256;
const SPACE_DELIM_FLAG = 512;
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
            return isNewline(code) ? NEWLINE_DELIM_FLAG : 0;
    }
}
function characterContainsDelimiter(code, delimiters) {
    return (getDelimFromCharacter(code) & delimiters) > 0;
}
export class ParsedCssResult {
    constructor(errors, ast) {
        this.errors = errors;
        this.ast = ast;
    }
}
export class CssParser {
    constructor() {
        this._errors = [];
    }
    /**
     * @param css the CSS code that will be parsed
     * @param url the name of the CSS file containing the CSS source code
     */
    parse(css, url) {
        const lexer = new CssLexer();
        this._file = new ParseSourceFile(css, url);
        this._scanner = lexer.scan(css, false);
        const ast = this._parseStyleSheet(EOF_DELIM_FLAG);
        const errors = this._errors;
        this._errors = [];
        const result = new ParsedCssResult(errors, ast);
        this._file = null;
        this._scanner = null;
        return result;
    }
    /** @internal */
    _parseStyleSheet(delimiters) {
        const results = [];
        this._scanner.consumeEmptyStatements();
        while (this._scanner.peek != chars.$EOF) {
            this._scanner.setMode(CssLexerMode.BLOCK);
            results.push(this._parseRule(delimiters));
        }
        let span = null;
        if (results.length > 0) {
            const firstRule = results[0];
            // we collect the last token like so incase there was an
            // EOF token that was emitted sometime during the lexing
            span = this._generateSourceSpan(firstRule, this._lastToken);
        }
        return new CssStyleSheetAst(span, results);
    }
    /** @internal */
    _getSourceContent() { return this._scanner != null ? this._scanner.input : ''; }
    /** @internal */
    _extractSourceContent(start, end) {
        return this._getSourceContent().substring(start, end + 1);
    }
    /** @internal */
    _generateSourceSpan(start, end = null) {
        let startLoc;
        if (start instanceof CssAst) {
            startLoc = start.location.start;
        }
        else {
            let token = start;
            if (token == null) {
                // the data here is invalid, however, if and when this does
                // occur, any other errors associated with this will be collected
                token = this._lastToken;
            }
            startLoc = new ParseLocation(this._file, token.index, token.line, token.column);
        }
        if (end == null) {
            end = this._lastToken;
        }
        let endLine = -1;
        let endColumn = -1;
        let endIndex = -1;
        if (end instanceof CssAst) {
            endLine = end.location.end.line;
            endColumn = end.location.end.col;
            endIndex = end.location.end.offset;
        }
        else if (end instanceof CssToken) {
            endLine = end.line;
            endColumn = end.column;
            endIndex = end.index;
        }
        const endLoc = new ParseLocation(this._file, endIndex, endLine, endColumn);
        return new ParseSourceSpan(startLoc, endLoc);
    }
    /** @internal */
    _resolveBlockType(token) {
        switch (token.strValue) {
            case '@-o-keyframes':
            case '@-moz-keyframes':
            case '@-webkit-keyframes':
            case '@keyframes':
                return BlockType.Keyframes;
            case '@charset':
                return BlockType.Charset;
            case '@import':
                return BlockType.Import;
            case '@namespace':
                return BlockType.Namespace;
            case '@page':
                return BlockType.Page;
            case '@document':
                return BlockType.Document;
            case '@media':
                return BlockType.MediaQuery;
            case '@font-face':
                return BlockType.FontFace;
            case '@viewport':
                return BlockType.Viewport;
            case '@supports':
                return BlockType.Supports;
            default:
                return BlockType.Unsupported;
        }
    }
    /** @internal */
    _parseRule(delimiters) {
        if (this._scanner.peek == chars.$AT) {
            return this._parseAtRule(delimiters);
        }
        return this._parseSelectorRule(delimiters);
    }
    /** @internal */
    _parseAtRule(delimiters) {
        const start = this._getScannerIndex();
        this._scanner.setMode(CssLexerMode.BLOCK);
        const token = this._scan();
        const startToken = token;
        this._assertCondition(token.type == CssTokenType.AtKeyword, `The CSS Rule ${token.strValue} is not a valid [@] rule.`, token);
        let block;
        const type = this._resolveBlockType(token);
        let span;
        let tokens;
        let endToken;
        let end;
        let strValue;
        let query;
        switch (type) {
            case BlockType.Charset:
            case BlockType.Namespace:
            case BlockType.Import:
                let value = this._parseValue(delimiters);
                this._scanner.setMode(CssLexerMode.BLOCK);
                this._scanner.consumeEmptyStatements();
                span = this._generateSourceSpan(startToken, value);
                return new CssInlineRuleAst(span, type, value);
            case BlockType.Viewport:
            case BlockType.FontFace:
                block = this._parseStyleBlock(delimiters);
                span = this._generateSourceSpan(startToken, block);
                return new CssBlockRuleAst(span, type, block);
            case BlockType.Keyframes:
                tokens = this._collectUntilDelim(delimiters | RBRACE_DELIM_FLAG | LBRACE_DELIM_FLAG);
                // keyframes only have one identifier name
                let name = tokens[0];
                block = this._parseKeyframeBlock(delimiters);
                span = this._generateSourceSpan(startToken, block);
                return new CssKeyframeRuleAst(span, name, block);
            case BlockType.MediaQuery:
                this._scanner.setMode(CssLexerMode.MEDIA_QUERY);
                tokens = this._collectUntilDelim(delimiters | RBRACE_DELIM_FLAG | LBRACE_DELIM_FLAG);
                endToken = tokens[tokens.length - 1];
                // we do not track the whitespace after the mediaQuery predicate ends
                // so we have to calculate the end string value on our own
                end = endToken.index + endToken.strValue.length - 1;
                strValue = this._extractSourceContent(start, end);
                span = this._generateSourceSpan(startToken, endToken);
                query = new CssAtRulePredicateAst(span, strValue, tokens);
                block = this._parseBlock(delimiters);
                strValue = this._extractSourceContent(start, this._getScannerIndex() - 1);
                span = this._generateSourceSpan(startToken, block);
                return new CssMediaQueryRuleAst(span, strValue, query, block);
            case BlockType.Document:
            case BlockType.Supports:
            case BlockType.Page:
                this._scanner.setMode(CssLexerMode.AT_RULE_QUERY);
                tokens = this._collectUntilDelim(delimiters | RBRACE_DELIM_FLAG | LBRACE_DELIM_FLAG);
                endToken = tokens[tokens.length - 1];
                // we do not track the whitespace after this block rule predicate ends
                // so we have to calculate the end string value on our own
                end = endToken.index + endToken.strValue.length - 1;
                strValue = this._extractSourceContent(start, end);
                span = this._generateSourceSpan(startToken, tokens[tokens.length - 1]);
                query = new CssAtRulePredicateAst(span, strValue, tokens);
                block = this._parseBlock(delimiters);
                strValue = this._extractSourceContent(start, block.end.offset);
                span = this._generateSourceSpan(startToken, block);
                return new CssBlockDefinitionRuleAst(span, strValue, type, query, block);
            // if a custom @rule { ... } is used it should still tokenize the insides
            default:
                let listOfTokens = [];
                let tokenName = token.strValue;
                this._scanner.setMode(CssLexerMode.ALL);
                this._error(generateErrorMessage(this._getSourceContent(), `The CSS "at" rule "${tokenName}" is not allowed to used here`, token.strValue, token.index, token.line, token.column), token);
                this._collectUntilDelim(delimiters | LBRACE_DELIM_FLAG | SEMICOLON_DELIM_FLAG)
                    .forEach((token) => { listOfTokens.push(token); });
                if (this._scanner.peek == chars.$LBRACE) {
                    listOfTokens.push(this._consume(CssTokenType.Character, '{'));
                    this._collectUntilDelim(delimiters | RBRACE_DELIM_FLAG | LBRACE_DELIM_FLAG)
                        .forEach((token) => { listOfTokens.push(token); });
                    listOfTokens.push(this._consume(CssTokenType.Character, '}'));
                }
                endToken = listOfTokens[listOfTokens.length - 1];
                span = this._generateSourceSpan(startToken, endToken);
                return new CssUnknownRuleAst(span, tokenName, listOfTokens);
        }
    }
    /** @internal */
    _parseSelectorRule(delimiters) {
        const start = this._getScannerIndex();
        const selectors = this._parseSelectors(delimiters);
        const block = this._parseStyleBlock(delimiters);
        let ruleAst;
        let span;
        const startSelector = selectors[0];
        if (block != null) {
            span = this._generateSourceSpan(startSelector, block);
            ruleAst = new CssSelectorRuleAst(span, selectors, block);
        }
        else {
            const name = this._extractSourceContent(start, this._getScannerIndex() - 1);
            const innerTokens = [];
            selectors.forEach((selector) => {
                selector.selectorParts.forEach((part) => {
                    part.tokens.forEach((token) => { innerTokens.push(token); });
                });
            });
            const endToken = innerTokens[innerTokens.length - 1];
            span = this._generateSourceSpan(startSelector, endToken);
            ruleAst = new CssUnknownTokenListAst(span, name, innerTokens);
        }
        this._scanner.setMode(CssLexerMode.BLOCK);
        this._scanner.consumeEmptyStatements();
        return ruleAst;
    }
    /** @internal */
    _parseSelectors(delimiters) {
        delimiters |= LBRACE_DELIM_FLAG | SEMICOLON_DELIM_FLAG;
        const selectors = [];
        let isParsingSelectors = true;
        while (isParsingSelectors) {
            selectors.push(this._parseSelector(delimiters));
            isParsingSelectors = !characterContainsDelimiter(this._scanner.peek, delimiters);
            if (isParsingSelectors) {
                this._consume(CssTokenType.Character, ',');
                isParsingSelectors = !characterContainsDelimiter(this._scanner.peek, delimiters);
                if (isParsingSelectors) {
                    this._scanner.consumeWhitespace();
                }
            }
        }
        return selectors;
    }
    /** @internal */
    _scan() {
        const output = this._scanner.scan();
        const token = output.token;
        const error = output.error;
        if (error != null) {
            this._error(getRawMessage(error), token);
        }
        this._lastToken = token;
        return token;
    }
    /** @internal */
    _getScannerIndex() { return this._scanner.index; }
    /** @internal */
    _consume(type, value = null) {
        const output = this._scanner.consume(type, value);
        const token = output.token;
        const error = output.error;
        if (error != null) {
            this._error(getRawMessage(error), token);
        }
        this._lastToken = token;
        return token;
    }
    /** @internal */
    _parseKeyframeBlock(delimiters) {
        delimiters |= RBRACE_DELIM_FLAG;
        this._scanner.setMode(CssLexerMode.KEYFRAME_BLOCK);
        const startToken = this._consume(CssTokenType.Character, '{');
        const definitions = [];
        while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
            definitions.push(this._parseKeyframeDefinition(delimiters));
        }
        const endToken = this._consume(CssTokenType.Character, '}');
        const span = this._generateSourceSpan(startToken, endToken);
        return new CssBlockAst(span, definitions);
    }
    /** @internal */
    _parseKeyframeDefinition(delimiters) {
        const start = this._getScannerIndex();
        const stepTokens = [];
        delimiters |= LBRACE_DELIM_FLAG;
        while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
            stepTokens.push(this._parseKeyframeLabel(delimiters | COMMA_DELIM_FLAG));
            if (this._scanner.peek != chars.$LBRACE) {
                this._consume(CssTokenType.Character, ',');
            }
        }
        const stylesBlock = this._parseStyleBlock(delimiters | RBRACE_DELIM_FLAG);
        const span = this._generateSourceSpan(stepTokens[0], stylesBlock);
        const ast = new CssKeyframeDefinitionAst(span, stepTokens, stylesBlock);
        this._scanner.setMode(CssLexerMode.BLOCK);
        return ast;
    }
    /** @internal */
    _parseKeyframeLabel(delimiters) {
        this._scanner.setMode(CssLexerMode.KEYFRAME_BLOCK);
        return mergeTokens(this._collectUntilDelim(delimiters));
    }
    /** @internal */
    _parsePseudoSelector(delimiters) {
        const start = this._getScannerIndex();
        delimiters &= ~COMMA_DELIM_FLAG;
        // we keep the original value since we may use it to recurse when :not, :host are used
        const startingDelims = delimiters;
        const startToken = this._consume(CssTokenType.Character, ':');
        const tokens = [startToken];
        if (this._scanner.peek == chars.$COLON) { // ::something
            tokens.push(this._consume(CssTokenType.Character, ':'));
        }
        const innerSelectors = [];
        this._scanner.setMode(CssLexerMode.PSEUDO_SELECTOR);
        // host, host-context, lang, not, nth-child are all identifiers
        const pseudoSelectorToken = this._consume(CssTokenType.Identifier);
        const pseudoSelectorName = pseudoSelectorToken.strValue;
        tokens.push(pseudoSelectorToken);
        // host(), lang(), nth-child(), etc...
        if (this._scanner.peek == chars.$LPAREN) {
            this._scanner.setMode(CssLexerMode.PSEUDO_SELECTOR_WITH_ARGUMENTS);
            const openParenToken = this._consume(CssTokenType.Character, '(');
            tokens.push(openParenToken);
            // :host(innerSelector(s)), :not(selector), etc...
            if (_pseudoSelectorSupportsInnerSelectors(pseudoSelectorName)) {
                let innerDelims = startingDelims | LPAREN_DELIM_FLAG | RPAREN_DELIM_FLAG;
                if (pseudoSelectorName == 'not') {
                    // the inner selector inside of :not(...) can only be one
                    // CSS selector (no commas allowed) ... This is according
                    // to the CSS specification
                    innerDelims |= COMMA_DELIM_FLAG;
                }
                // :host(a, b, c) {
                this._parseSelectors(innerDelims).forEach((selector, index) => {
                    innerSelectors.push(selector);
                });
            }
            else {
                // this branch is for things like "en-us, 2k + 1, etc..."
                // which all end up in pseudoSelectors like :lang, :nth-child, etc..
                const innerValueDelims = delimiters | LBRACE_DELIM_FLAG | COLON_DELIM_FLAG |
                    RPAREN_DELIM_FLAG | LPAREN_DELIM_FLAG;
                while (!characterContainsDelimiter(this._scanner.peek, innerValueDelims)) {
                    const token = this._scan();
                    tokens.push(token);
                }
            }
            const closeParenToken = this._consume(CssTokenType.Character, ')');
            tokens.push(closeParenToken);
        }
        const end = this._getScannerIndex() - 1;
        const strValue = this._extractSourceContent(start, end);
        const endToken = tokens[tokens.length - 1];
        const span = this._generateSourceSpan(startToken, endToken);
        return new CssPseudoSelectorAst(span, strValue, pseudoSelectorName, tokens, innerSelectors);
    }
    /** @internal */
    _parseSimpleSelector(delimiters) {
        const start = this._getScannerIndex();
        delimiters |= COMMA_DELIM_FLAG;
        this._scanner.setMode(CssLexerMode.SELECTOR);
        const selectorCssTokens = [];
        const pseudoSelectors = [];
        let previousToken = undefined;
        const selectorPartDelimiters = delimiters | SPACE_DELIM_FLAG;
        let loopOverSelector = !characterContainsDelimiter(this._scanner.peek, selectorPartDelimiters);
        let hasAttributeError = false;
        while (loopOverSelector) {
            const peek = this._scanner.peek;
            switch (peek) {
                case chars.$COLON:
                    let innerPseudo = this._parsePseudoSelector(delimiters);
                    pseudoSelectors.push(innerPseudo);
                    this._scanner.setMode(CssLexerMode.SELECTOR);
                    break;
                case chars.$LBRACKET:
                    // we set the mode after the scan because attribute mode does not
                    // allow attribute [] values. And this also will catch any errors
                    // if an extra "[" is used inside.
                    selectorCssTokens.push(this._scan());
                    this._scanner.setMode(CssLexerMode.ATTRIBUTE_SELECTOR);
                    break;
                case chars.$RBRACKET:
                    if (this._scanner.getMode() != CssLexerMode.ATTRIBUTE_SELECTOR) {
                        hasAttributeError = true;
                    }
                    // we set the mode early because attribute mode does not
                    // allow attribute [] values
                    this._scanner.setMode(CssLexerMode.SELECTOR);
                    selectorCssTokens.push(this._scan());
                    break;
                default:
                    if (isSelectorOperatorCharacter(peek)) {
                        loopOverSelector = false;
                        continue;
                    }
                    let token = this._scan();
                    previousToken = token;
                    selectorCssTokens.push(token);
                    break;
            }
            loopOverSelector = !characterContainsDelimiter(this._scanner.peek, selectorPartDelimiters);
        }
        hasAttributeError =
            hasAttributeError || this._scanner.getMode() == CssLexerMode.ATTRIBUTE_SELECTOR;
        if (hasAttributeError) {
            this._error(`Unbalanced CSS attribute selector at column ${previousToken.line}:${previousToken.column}`, previousToken);
        }
        let end = this._getScannerIndex() - 1;
        // this happens if the selector is not directly followed by
        // a comma or curly brace without a space in between
        let operator = null;
        let operatorScanCount = 0;
        let lastOperatorToken = null;
        if (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
            while (operator == null && !characterContainsDelimiter(this._scanner.peek, delimiters) &&
                isSelectorOperatorCharacter(this._scanner.peek)) {
                let token = this._scan();
                const tokenOperator = token.strValue;
                operatorScanCount++;
                lastOperatorToken = token;
                if (tokenOperator != SPACE_OPERATOR) {
                    switch (tokenOperator) {
                        case SLASH_CHARACTER:
                            // /deep/ operator
                            let deepToken = this._consume(CssTokenType.Identifier);
                            let deepSlash = this._consume(CssTokenType.Character);
                            let index = lastOperatorToken.index;
                            let line = lastOperatorToken.line;
                            let column = lastOperatorToken.column;
                            if (deepToken != null && deepToken.strValue.toLowerCase() == 'deep' &&
                                deepSlash.strValue == SLASH_CHARACTER) {
                                token = new CssToken(lastOperatorToken.index, lastOperatorToken.column, lastOperatorToken.line, CssTokenType.Identifier, DEEP_OPERATOR_STR);
                            }
                            else {
                                const text = SLASH_CHARACTER + deepToken.strValue + deepSlash.strValue;
                                this._error(generateErrorMessage(this._getSourceContent(), `${text} is an invalid CSS operator`, text, index, line, column), lastOperatorToken);
                                token = new CssToken(index, column, line, CssTokenType.Invalid, text);
                            }
                            break;
                        case GT_CHARACTER:
                            // >>> operator
                            if (this._scanner.peek == chars.$GT && this._scanner.peekPeek == chars.$GT) {
                                this._consume(CssTokenType.Character, GT_CHARACTER);
                                this._consume(CssTokenType.Character, GT_CHARACTER);
                                token = new CssToken(lastOperatorToken.index, lastOperatorToken.column, lastOperatorToken.line, CssTokenType.Identifier, TRIPLE_GT_OPERATOR_STR);
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
        const strValue = this._extractSourceContent(start, end);
        // if we do come across one or more spaces inside of
        // the operators loop then an empty space is still a
        // valid operator to use if something else was not found
        if (operator == null && operatorScanCount > 0 && this._scanner.peek != chars.$LBRACE) {
            operator = lastOperatorToken;
        }
        // please note that `endToken` is reassigned multiple times below
        // so please do not optimize the if statements into if/elseif
        let startTokenOrAst = null;
        let endTokenOrAst = null;
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
        const span = this._generateSourceSpan(startTokenOrAst, endTokenOrAst);
        return new CssSimpleSelectorAst(span, selectorCssTokens, strValue, pseudoSelectors, operator);
    }
    /** @internal */
    _parseSelector(delimiters) {
        delimiters |= COMMA_DELIM_FLAG;
        this._scanner.setMode(CssLexerMode.SELECTOR);
        const simpleSelectors = [];
        while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
            simpleSelectors.push(this._parseSimpleSelector(delimiters));
            this._scanner.consumeWhitespace();
        }
        const firstSelector = simpleSelectors[0];
        const lastSelector = simpleSelectors[simpleSelectors.length - 1];
        const span = this._generateSourceSpan(firstSelector, lastSelector);
        return new CssSelectorAst(span, simpleSelectors);
    }
    /** @internal */
    _parseValue(delimiters) {
        delimiters |= RBRACE_DELIM_FLAG | SEMICOLON_DELIM_FLAG | NEWLINE_DELIM_FLAG;
        this._scanner.setMode(CssLexerMode.STYLE_VALUE);
        const start = this._getScannerIndex();
        const tokens = [];
        let wsStr = '';
        let previous = undefined;
        while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
            let token;
            if (previous != null && previous.type == CssTokenType.Identifier &&
                this._scanner.peek == chars.$LPAREN) {
                token = this._consume(CssTokenType.Character, '(');
                tokens.push(token);
                this._scanner.setMode(CssLexerMode.STYLE_VALUE_FUNCTION);
                token = this._scan();
                tokens.push(token);
                this._scanner.setMode(CssLexerMode.STYLE_VALUE);
                token = this._consume(CssTokenType.Character, ')');
                tokens.push(token);
            }
            else {
                token = this._scan();
                if (token.type == CssTokenType.Whitespace) {
                    wsStr += token.strValue;
                }
                else {
                    wsStr = '';
                    tokens.push(token);
                }
            }
            previous = token;
        }
        const end = this._getScannerIndex() - 1;
        this._scanner.consumeWhitespace();
        const code = this._scanner.peek;
        if (code == chars.$SEMICOLON) {
            this._consume(CssTokenType.Character, ';');
        }
        else if (code != chars.$RBRACE) {
            this._error(generateErrorMessage(this._getSourceContent(), `The CSS key/value definition did not end with a semicolon`, previous.strValue, previous.index, previous.line, previous.column), previous);
        }
        const strValue = this._extractSourceContent(start, end);
        const startToken = tokens[0];
        const endToken = tokens[tokens.length - 1];
        const span = this._generateSourceSpan(startToken, endToken);
        return new CssStyleValueAst(span, tokens, strValue);
    }
    /** @internal */
    _collectUntilDelim(delimiters, assertType = null) {
        const tokens = [];
        while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
            const val = assertType != null ? this._consume(assertType) : this._scan();
            tokens.push(val);
        }
        return tokens;
    }
    /** @internal */
    _parseBlock(delimiters) {
        delimiters |= RBRACE_DELIM_FLAG;
        this._scanner.setMode(CssLexerMode.BLOCK);
        const startToken = this._consume(CssTokenType.Character, '{');
        this._scanner.consumeEmptyStatements();
        const results = [];
        while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
            results.push(this._parseRule(delimiters));
        }
        const endToken = this._consume(CssTokenType.Character, '}');
        this._scanner.setMode(CssLexerMode.BLOCK);
        this._scanner.consumeEmptyStatements();
        const span = this._generateSourceSpan(startToken, endToken);
        return new CssBlockAst(span, results);
    }
    /** @internal */
    _parseStyleBlock(delimiters) {
        delimiters |= RBRACE_DELIM_FLAG | LBRACE_DELIM_FLAG;
        this._scanner.setMode(CssLexerMode.STYLE_BLOCK);
        const startToken = this._consume(CssTokenType.Character, '{');
        if (startToken.numValue != chars.$LBRACE) {
            return null;
        }
        const definitions = [];
        this._scanner.consumeEmptyStatements();
        while (!characterContainsDelimiter(this._scanner.peek, delimiters)) {
            definitions.push(this._parseDefinition(delimiters));
            this._scanner.consumeEmptyStatements();
        }
        const endToken = this._consume(CssTokenType.Character, '}');
        this._scanner.setMode(CssLexerMode.STYLE_BLOCK);
        this._scanner.consumeEmptyStatements();
        const span = this._generateSourceSpan(startToken, endToken);
        return new CssStylesBlockAst(span, definitions);
    }
    /** @internal */
    _parseDefinition(delimiters) {
        this._scanner.setMode(CssLexerMode.STYLE_BLOCK);
        let prop = this._consume(CssTokenType.Identifier);
        let parseValue = false;
        let value = null;
        let endToken = prop;
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
                let propStr = [prop.strValue];
                if (this._scanner.peek != chars.$COLON) {
                    // this will throw the error
                    const nextValue = this._consume(CssTokenType.Character, ':');
                    propStr.push(nextValue.strValue);
                    const remainingTokens = this._collectUntilDelim(delimiters | COLON_DELIM_FLAG | SEMICOLON_DELIM_FLAG, CssTokenType.Identifier);
                    if (remainingTokens.length > 0) {
                        remainingTokens.forEach((token) => { propStr.push(token.strValue); });
                    }
                    endToken = prop =
                        new CssToken(prop.index, prop.column, prop.line, prop.type, propStr.join(' '));
                }
                // this means we've reached the end of the definition and/or block
                if (this._scanner.peek == chars.$COLON) {
                    this._consume(CssTokenType.Character, ':');
                    parseValue = true;
                }
                break;
        }
        if (parseValue) {
            value = this._parseValue(delimiters);
            endToken = value;
        }
        else {
            this._error(generateErrorMessage(this._getSourceContent(), `The CSS property was not paired with a style value`, prop.strValue, prop.index, prop.line, prop.column), prop);
        }
        const span = this._generateSourceSpan(prop, endToken);
        return new CssDefinitionAst(span, prop, value);
    }
    /** @internal */
    _assertCondition(status, errorMessage, problemToken) {
        if (!status) {
            this._error(errorMessage, problemToken);
            return true;
        }
        return false;
    }
    /** @internal */
    _error(message, problemToken) {
        const length = problemToken.strValue.length;
        const error = CssParseError.create(this._file, 0, problemToken.line, problemToken.column, length, message);
        this._errors.push(error);
    }
}
export class CssParseError extends ParseError {
    static create(file, offset, line, col, length, errMsg) {
        const start = new ParseLocation(file, offset, line, col);
        const end = new ParseLocation(file, offset, line, col + length);
        const span = new ParseSourceSpan(start, end);
        return new CssParseError(span, 'CSS Parse Error: ' + errMsg);
    }
    constructor(span, message) { super(span, message); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9jc3NfcGFyc2VyL2Nzc19wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxLQUFLLEtBQUssTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUxRixPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxXQUFXLEVBQUUseUJBQXlCLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLHdCQUF3QixFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFjLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsRUFBRSxXQUFXLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDL2EsT0FBTyxFQUFDLFFBQVEsRUFBRSxZQUFZLEVBQWMsUUFBUSxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXZJLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQztBQUUzQixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFcEMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDO0FBQzVCLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztBQUN6QixNQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQztBQUNyQyxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztBQUVuQyxN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QUMzQyxNQUFNLENBQUMsTUFBTSxDQUNULElBQXFCLEVBQUUsTUFBYyxFQUFFLElBQVksRUFBRSxHQUFXLEVBQUUsTUFBYyxFQUNoRixNQUFjO1FBQ2hCLE1BQU0sS0FBSyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sR0FBRyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUNoRSxNQUFNLElBQUksR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0MsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFlBQVksSUFBcUIsRUFBRSxPQUFlLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDOUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAqIGFzIGNoYXJzIGZyb20gJy4uL2NoYXJzJztcbmltcG9ydCB7UGFyc2VFcnJvciwgUGFyc2VMb2NhdGlvbiwgUGFyc2VTb3VyY2VGaWxlLCBQYXJzZVNvdXJjZVNwYW59IGZyb20gJy4uL3BhcnNlX3V0aWwnO1xuXG5pbXBvcnQge0Jsb2NrVHlwZSwgQ3NzQXN0LCBDc3NBdFJ1bGVQcmVkaWNhdGVBc3QsIENzc0Jsb2NrQXN0LCBDc3NCbG9ja0RlZmluaXRpb25SdWxlQXN0LCBDc3NCbG9ja1J1bGVBc3QsIENzc0RlZmluaXRpb25Bc3QsIENzc0lubGluZVJ1bGVBc3QsIENzc0tleWZyYW1lRGVmaW5pdGlvbkFzdCwgQ3NzS2V5ZnJhbWVSdWxlQXN0LCBDc3NNZWRpYVF1ZXJ5UnVsZUFzdCwgQ3NzUHNldWRvU2VsZWN0b3JBc3QsIENzc1J1bGVBc3QsIENzc1NlbGVjdG9yQXN0LCBDc3NTZWxlY3RvclJ1bGVBc3QsIENzc1NpbXBsZVNlbGVjdG9yQXN0LCBDc3NTdHlsZVNoZWV0QXN0LCBDc3NTdHlsZVZhbHVlQXN0LCBDc3NTdHlsZXNCbG9ja0FzdCwgQ3NzVW5rbm93blJ1bGVBc3QsIENzc1Vua25vd25Ub2tlbkxpc3RBc3QsIG1lcmdlVG9rZW5zfSBmcm9tICcuL2Nzc19hc3QnO1xuaW1wb3J0IHtDc3NMZXhlciwgQ3NzTGV4ZXJNb2RlLCBDc3NTY2FubmVyLCBDc3NUb2tlbiwgQ3NzVG9rZW5UeXBlLCBnZW5lcmF0ZUVycm9yTWVzc2FnZSwgZ2V0UmF3TWVzc2FnZSwgaXNOZXdsaW5lfSBmcm9tICcuL2Nzc19sZXhlcic7XG5cbmNvbnN0IFNQQUNFX09QRVJBVE9SID0gJyAnO1xuXG5leHBvcnQge0Nzc1Rva2VufSBmcm9tICcuL2Nzc19sZXhlcic7XG5leHBvcnQge0Jsb2NrVHlwZX0gZnJvbSAnLi9jc3NfYXN0JztcblxuY29uc3QgU0xBU0hfQ0hBUkFDVEVSID0gJy8nO1xuY29uc3QgR1RfQ0hBUkFDVEVSID0gJz4nO1xuY29uc3QgVFJJUExFX0dUX09QRVJBVE9SX1NUUiA9ICc+Pj4nO1xuY29uc3QgREVFUF9PUEVSQVRPUl9TVFIgPSAnL2RlZXAvJztcblxuY29uc3QgRU9GX0RFTElNX0ZMQUcgPSAxO1xuY29uc3QgUkJSQUNFX0RFTElNX0ZMQUcgPSAyO1xuY29uc3QgTEJSQUNFX0RFTElNX0ZMQUcgPSA0O1xuY29uc3QgQ09NTUFfREVMSU1fRkxBRyA9IDg7XG5jb25zdCBDT0xPTl9ERUxJTV9GTEFHID0gMTY7XG5jb25zdCBTRU1JQ09MT05fREVMSU1fRkxBRyA9IDMyO1xuY29uc3QgTkVXTElORV9ERUxJTV9GTEFHID0gNjQ7XG5jb25zdCBSUEFSRU5fREVMSU1fRkxBRyA9IDEyODtcbmNvbnN0IExQQVJFTl9ERUxJTV9GTEFHID0gMjU2O1xuY29uc3QgU1BBQ0VfREVMSU1fRkxBRyA9IDUxMjtcblxuZnVuY3Rpb24gX3BzZXVkb1NlbGVjdG9yU3VwcG9ydHNJbm5lclNlbGVjdG9ycyhuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIFsnbm90JywgJ2hvc3QnLCAnaG9zdC1jb250ZXh0J10uaW5kZXhPZihuYW1lKSA+PSAwO1xufVxuXG5mdW5jdGlvbiBpc1NlbGVjdG9yT3BlcmF0b3JDaGFyYWN0ZXIoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHN3aXRjaCAoY29kZSkge1xuICAgIGNhc2UgY2hhcnMuJFNMQVNIOlxuICAgIGNhc2UgY2hhcnMuJFRJTERBOlxuICAgIGNhc2UgY2hhcnMuJFBMVVM6XG4gICAgY2FzZSBjaGFycy4kR1Q6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGNoYXJzLmlzV2hpdGVzcGFjZShjb2RlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWxpbUZyb21DaGFyYWN0ZXIoY29kZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgY2FzZSBjaGFycy4kRU9GOlxuICAgICAgcmV0dXJuIEVPRl9ERUxJTV9GTEFHO1xuICAgIGNhc2UgY2hhcnMuJENPTU1BOlxuICAgICAgcmV0dXJuIENPTU1BX0RFTElNX0ZMQUc7XG4gICAgY2FzZSBjaGFycy4kQ09MT046XG4gICAgICByZXR1cm4gQ09MT05fREVMSU1fRkxBRztcbiAgICBjYXNlIGNoYXJzLiRTRU1JQ09MT046XG4gICAgICByZXR1cm4gU0VNSUNPTE9OX0RFTElNX0ZMQUc7XG4gICAgY2FzZSBjaGFycy4kUkJSQUNFOlxuICAgICAgcmV0dXJuIFJCUkFDRV9ERUxJTV9GTEFHO1xuICAgIGNhc2UgY2hhcnMuJExCUkFDRTpcbiAgICAgIHJldHVybiBMQlJBQ0VfREVMSU1fRkxBRztcbiAgICBjYXNlIGNoYXJzLiRSUEFSRU46XG4gICAgICByZXR1cm4gUlBBUkVOX0RFTElNX0ZMQUc7XG4gICAgY2FzZSBjaGFycy4kU1BBQ0U6XG4gICAgY2FzZSBjaGFycy4kVEFCOlxuICAgICAgcmV0dXJuIFNQQUNFX0RFTElNX0ZMQUc7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBpc05ld2xpbmUoY29kZSkgPyBORVdMSU5FX0RFTElNX0ZMQUcgOiAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKGNvZGU6IG51bWJlciwgZGVsaW1pdGVyczogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiAoZ2V0RGVsaW1Gcm9tQ2hhcmFjdGVyKGNvZGUpICYgZGVsaW1pdGVycykgPiAwO1xufVxuXG5leHBvcnQgY2xhc3MgUGFyc2VkQ3NzUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVycm9yczogQ3NzUGFyc2VFcnJvcltdLCBwdWJsaWMgYXN0OiBDc3NTdHlsZVNoZWV0QXN0KSB7fVxufVxuXG5leHBvcnQgY2xhc3MgQ3NzUGFyc2VyIHtcbiAgcHJpdmF0ZSBfZXJyb3JzOiBDc3NQYXJzZUVycm9yW10gPSBbXTtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgX2ZpbGUgITogUGFyc2VTb3VyY2VGaWxlO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfc2Nhbm5lciAhOiBDc3NTY2FubmVyO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfbGFzdFRva2VuICE6IENzc1Rva2VuO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gY3NzIHRoZSBDU1MgY29kZSB0aGF0IHdpbGwgYmUgcGFyc2VkXG4gICAqIEBwYXJhbSB1cmwgdGhlIG5hbWUgb2YgdGhlIENTUyBmaWxlIGNvbnRhaW5pbmcgdGhlIENTUyBzb3VyY2UgY29kZVxuICAgKi9cbiAgcGFyc2UoY3NzOiBzdHJpbmcsIHVybDogc3RyaW5nKTogUGFyc2VkQ3NzUmVzdWx0IHtcbiAgICBjb25zdCBsZXhlciA9IG5ldyBDc3NMZXhlcigpO1xuICAgIHRoaXMuX2ZpbGUgPSBuZXcgUGFyc2VTb3VyY2VGaWxlKGNzcywgdXJsKTtcbiAgICB0aGlzLl9zY2FubmVyID0gbGV4ZXIuc2Nhbihjc3MsIGZhbHNlKTtcblxuICAgIGNvbnN0IGFzdCA9IHRoaXMuX3BhcnNlU3R5bGVTaGVldChFT0ZfREVMSU1fRkxBRyk7XG5cbiAgICBjb25zdCBlcnJvcnMgPSB0aGlzLl9lcnJvcnM7XG4gICAgdGhpcy5fZXJyb3JzID0gW107XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgUGFyc2VkQ3NzUmVzdWx0KGVycm9ycywgYXN0KTtcbiAgICB0aGlzLl9maWxlID0gbnVsbCBhcyBhbnk7XG4gICAgdGhpcy5fc2Nhbm5lciA9IG51bGwgYXMgYW55O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9wYXJzZVN0eWxlU2hlZXQoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzU3R5bGVTaGVldEFzdCB7XG4gICAgY29uc3QgcmVzdWx0czogQ3NzUnVsZUFzdFtdID0gW107XG4gICAgdGhpcy5fc2Nhbm5lci5jb25zdW1lRW1wdHlTdGF0ZW1lbnRzKCk7XG4gICAgd2hpbGUgKHRoaXMuX3NjYW5uZXIucGVlayAhPSBjaGFycy4kRU9GKSB7XG4gICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkJMT0NLKTtcbiAgICAgIHJlc3VsdHMucHVzaCh0aGlzLl9wYXJzZVJ1bGUoZGVsaW1pdGVycykpO1xuICAgIH1cbiAgICBsZXQgc3BhbjogUGFyc2VTb3VyY2VTcGFufG51bGwgPSBudWxsO1xuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGZpcnN0UnVsZSA9IHJlc3VsdHNbMF07XG4gICAgICAvLyB3ZSBjb2xsZWN0IHRoZSBsYXN0IHRva2VuIGxpa2Ugc28gaW5jYXNlIHRoZXJlIHdhcyBhblxuICAgICAgLy8gRU9GIHRva2VuIHRoYXQgd2FzIGVtaXR0ZWQgc29tZXRpbWUgZHVyaW5nIHRoZSBsZXhpbmdcbiAgICAgIHNwYW4gPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZVNwYW4oZmlyc3RSdWxlLCB0aGlzLl9sYXN0VG9rZW4pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IENzc1N0eWxlU2hlZXRBc3Qoc3BhbiAhLCByZXN1bHRzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dldFNvdXJjZUNvbnRlbnQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3NjYW5uZXIgIT0gbnVsbCA/IHRoaXMuX3NjYW5uZXIuaW5wdXQgOiAnJzsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2V4dHJhY3RTb3VyY2VDb250ZW50KHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0U291cmNlQ29udGVudCgpLnN1YnN0cmluZyhzdGFydCwgZW5kICsgMSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9nZW5lcmF0ZVNvdXJjZVNwYW4oc3RhcnQ6IENzc1Rva2VufENzc0FzdCwgZW5kOiBDc3NUb2tlbnxDc3NBc3R8bnVsbCA9IG51bGwpOiBQYXJzZVNvdXJjZVNwYW4ge1xuICAgIGxldCBzdGFydExvYzogUGFyc2VMb2NhdGlvbjtcbiAgICBpZiAoc3RhcnQgaW5zdGFuY2VvZiBDc3NBc3QpIHtcbiAgICAgIHN0YXJ0TG9jID0gc3RhcnQubG9jYXRpb24uc3RhcnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0b2tlbiA9IHN0YXJ0O1xuICAgICAgaWYgKHRva2VuID09IG51bGwpIHtcbiAgICAgICAgLy8gdGhlIGRhdGEgaGVyZSBpcyBpbnZhbGlkLCBob3dldmVyLCBpZiBhbmQgd2hlbiB0aGlzIGRvZXNcbiAgICAgICAgLy8gb2NjdXIsIGFueSBvdGhlciBlcnJvcnMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgd2lsbCBiZSBjb2xsZWN0ZWRcbiAgICAgICAgdG9rZW4gPSB0aGlzLl9sYXN0VG9rZW47XG4gICAgICB9XG4gICAgICBzdGFydExvYyA9IG5ldyBQYXJzZUxvY2F0aW9uKHRoaXMuX2ZpbGUsIHRva2VuLmluZGV4LCB0b2tlbi5saW5lLCB0b2tlbi5jb2x1bW4pO1xuICAgIH1cblxuICAgIGlmIChlbmQgPT0gbnVsbCkge1xuICAgICAgZW5kID0gdGhpcy5fbGFzdFRva2VuO1xuICAgIH1cblxuICAgIGxldCBlbmRMaW5lOiBudW1iZXIgPSAtMTtcbiAgICBsZXQgZW5kQ29sdW1uOiBudW1iZXIgPSAtMTtcbiAgICBsZXQgZW5kSW5kZXg6IG51bWJlciA9IC0xO1xuICAgIGlmIChlbmQgaW5zdGFuY2VvZiBDc3NBc3QpIHtcbiAgICAgIGVuZExpbmUgPSBlbmQubG9jYXRpb24uZW5kLmxpbmUgITtcbiAgICAgIGVuZENvbHVtbiA9IGVuZC5sb2NhdGlvbi5lbmQuY29sICE7XG4gICAgICBlbmRJbmRleCA9IGVuZC5sb2NhdGlvbi5lbmQub2Zmc2V0ICE7XG4gICAgfSBlbHNlIGlmIChlbmQgaW5zdGFuY2VvZiBDc3NUb2tlbikge1xuICAgICAgZW5kTGluZSA9IGVuZC5saW5lO1xuICAgICAgZW5kQ29sdW1uID0gZW5kLmNvbHVtbjtcbiAgICAgIGVuZEluZGV4ID0gZW5kLmluZGV4O1xuICAgIH1cblxuICAgIGNvbnN0IGVuZExvYyA9IG5ldyBQYXJzZUxvY2F0aW9uKHRoaXMuX2ZpbGUsIGVuZEluZGV4LCBlbmRMaW5lLCBlbmRDb2x1bW4pO1xuICAgIHJldHVybiBuZXcgUGFyc2VTb3VyY2VTcGFuKHN0YXJ0TG9jLCBlbmRMb2MpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVzb2x2ZUJsb2NrVHlwZSh0b2tlbjogQ3NzVG9rZW4pOiBCbG9ja1R5cGUge1xuICAgIHN3aXRjaCAodG9rZW4uc3RyVmFsdWUpIHtcbiAgICAgIGNhc2UgJ0Atby1rZXlmcmFtZXMnOlxuICAgICAgY2FzZSAnQC1tb3ota2V5ZnJhbWVzJzpcbiAgICAgIGNhc2UgJ0Atd2Via2l0LWtleWZyYW1lcyc6XG4gICAgICBjYXNlICdAa2V5ZnJhbWVzJzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5LZXlmcmFtZXM7XG5cbiAgICAgIGNhc2UgJ0BjaGFyc2V0JzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5DaGFyc2V0O1xuXG4gICAgICBjYXNlICdAaW1wb3J0JzpcbiAgICAgICAgcmV0dXJuIEJsb2NrVHlwZS5JbXBvcnQ7XG5cbiAgICAgIGNhc2UgJ0BuYW1lc3BhY2UnOlxuICAgICAgICByZXR1cm4gQmxvY2tUeXBlLk5hbWVzcGFjZTtcblxuICAgICAgY2FzZSAnQHBhZ2UnOlxuICAgICAgICByZXR1cm4gQmxvY2tUeXBlLlBhZ2U7XG5cbiAgICAgIGNhc2UgJ0Bkb2N1bWVudCc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuRG9jdW1lbnQ7XG5cbiAgICAgIGNhc2UgJ0BtZWRpYSc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuTWVkaWFRdWVyeTtcblxuICAgICAgY2FzZSAnQGZvbnQtZmFjZSc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuRm9udEZhY2U7XG5cbiAgICAgIGNhc2UgJ0B2aWV3cG9ydCc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuVmlld3BvcnQ7XG5cbiAgICAgIGNhc2UgJ0BzdXBwb3J0cyc6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuU3VwcG9ydHM7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBCbG9ja1R5cGUuVW5zdXBwb3J0ZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VSdWxlKGRlbGltaXRlcnM6IG51bWJlcik6IENzc1J1bGVBc3Qge1xuICAgIGlmICh0aGlzLl9zY2FubmVyLnBlZWsgPT0gY2hhcnMuJEFUKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcGFyc2VBdFJ1bGUoZGVsaW1pdGVycyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9wYXJzZVNlbGVjdG9yUnVsZShkZWxpbWl0ZXJzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlQXRSdWxlKGRlbGltaXRlcnM6IG51bWJlcik6IENzc1J1bGVBc3Qge1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5fZ2V0U2Nhbm5lckluZGV4KCk7XG5cbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkJMT0NLKTtcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMuX3NjYW4oKTtcbiAgICBjb25zdCBzdGFydFRva2VuID0gdG9rZW47XG5cbiAgICB0aGlzLl9hc3NlcnRDb25kaXRpb24oXG4gICAgICAgIHRva2VuLnR5cGUgPT0gQ3NzVG9rZW5UeXBlLkF0S2V5d29yZCxcbiAgICAgICAgYFRoZSBDU1MgUnVsZSAke3Rva2VuLnN0clZhbHVlfSBpcyBub3QgYSB2YWxpZCBbQF0gcnVsZS5gLCB0b2tlbik7XG5cbiAgICBsZXQgYmxvY2s6IENzc0Jsb2NrQXN0O1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLl9yZXNvbHZlQmxvY2tUeXBlKHRva2VuKTtcbiAgICBsZXQgc3BhbjogUGFyc2VTb3VyY2VTcGFuO1xuICAgIGxldCB0b2tlbnM6IENzc1Rva2VuW107XG4gICAgbGV0IGVuZFRva2VuOiBDc3NUb2tlbjtcbiAgICBsZXQgZW5kOiBudW1iZXI7XG4gICAgbGV0IHN0clZhbHVlOiBzdHJpbmc7XG4gICAgbGV0IHF1ZXJ5OiBDc3NBdFJ1bGVQcmVkaWNhdGVBc3Q7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEJsb2NrVHlwZS5DaGFyc2V0OlxuICAgICAgY2FzZSBCbG9ja1R5cGUuTmFtZXNwYWNlOlxuICAgICAgY2FzZSBCbG9ja1R5cGUuSW1wb3J0OlxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9wYXJzZVZhbHVlKGRlbGltaXRlcnMpO1xuICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkJMT0NLKTtcbiAgICAgICAgdGhpcy5fc2Nhbm5lci5jb25zdW1lRW1wdHlTdGF0ZW1lbnRzKCk7XG4gICAgICAgIHNwYW4gPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZVNwYW4oc3RhcnRUb2tlbiwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IENzc0lubGluZVJ1bGVBc3Qoc3BhbiwgdHlwZSwgdmFsdWUpO1xuXG4gICAgICBjYXNlIEJsb2NrVHlwZS5WaWV3cG9ydDpcbiAgICAgIGNhc2UgQmxvY2tUeXBlLkZvbnRGYWNlOlxuICAgICAgICBibG9jayA9IHRoaXMuX3BhcnNlU3R5bGVCbG9jayhkZWxpbWl0ZXJzKSAhO1xuICAgICAgICBzcGFuID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VTcGFuKHN0YXJ0VG9rZW4sIGJsb2NrKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDc3NCbG9ja1J1bGVBc3Qoc3BhbiwgdHlwZSwgYmxvY2spO1xuXG4gICAgICBjYXNlIEJsb2NrVHlwZS5LZXlmcmFtZXM6XG4gICAgICAgIHRva2VucyA9IHRoaXMuX2NvbGxlY3RVbnRpbERlbGltKGRlbGltaXRlcnMgfCBSQlJBQ0VfREVMSU1fRkxBRyB8IExCUkFDRV9ERUxJTV9GTEFHKTtcbiAgICAgICAgLy8ga2V5ZnJhbWVzIG9ubHkgaGF2ZSBvbmUgaWRlbnRpZmllciBuYW1lXG4gICAgICAgIGxldCBuYW1lID0gdG9rZW5zWzBdO1xuICAgICAgICBibG9jayA9IHRoaXMuX3BhcnNlS2V5ZnJhbWVCbG9jayhkZWxpbWl0ZXJzKTtcbiAgICAgICAgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGFydFRva2VuLCBibG9jayk7XG4gICAgICAgIHJldHVybiBuZXcgQ3NzS2V5ZnJhbWVSdWxlQXN0KHNwYW4sIG5hbWUsIGJsb2NrKTtcblxuICAgICAgY2FzZSBCbG9ja1R5cGUuTWVkaWFRdWVyeTpcbiAgICAgICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5NRURJQV9RVUVSWSk7XG4gICAgICAgIHRva2VucyA9IHRoaXMuX2NvbGxlY3RVbnRpbERlbGltKGRlbGltaXRlcnMgfCBSQlJBQ0VfREVMSU1fRkxBRyB8IExCUkFDRV9ERUxJTV9GTEFHKTtcbiAgICAgICAgZW5kVG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICAvLyB3ZSBkbyBub3QgdHJhY2sgdGhlIHdoaXRlc3BhY2UgYWZ0ZXIgdGhlIG1lZGlhUXVlcnkgcHJlZGljYXRlIGVuZHNcbiAgICAgICAgLy8gc28gd2UgaGF2ZSB0byBjYWxjdWxhdGUgdGhlIGVuZCBzdHJpbmcgdmFsdWUgb24gb3VyIG93blxuICAgICAgICBlbmQgPSBlbmRUb2tlbi5pbmRleCArIGVuZFRva2VuLnN0clZhbHVlLmxlbmd0aCAtIDE7XG4gICAgICAgIHN0clZhbHVlID0gdGhpcy5fZXh0cmFjdFNvdXJjZUNvbnRlbnQoc3RhcnQsIGVuZCk7XG4gICAgICAgIHNwYW4gPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZVNwYW4oc3RhcnRUb2tlbiwgZW5kVG9rZW4pO1xuICAgICAgICBxdWVyeSA9IG5ldyBDc3NBdFJ1bGVQcmVkaWNhdGVBc3Qoc3Bhbiwgc3RyVmFsdWUsIHRva2Vucyk7XG4gICAgICAgIGJsb2NrID0gdGhpcy5fcGFyc2VCbG9jayhkZWxpbWl0ZXJzKTtcbiAgICAgICAgc3RyVmFsdWUgPSB0aGlzLl9leHRyYWN0U291cmNlQ29udGVudChzdGFydCwgdGhpcy5fZ2V0U2Nhbm5lckluZGV4KCkgLSAxKTtcbiAgICAgICAgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGFydFRva2VuLCBibG9jayk7XG4gICAgICAgIHJldHVybiBuZXcgQ3NzTWVkaWFRdWVyeVJ1bGVBc3Qoc3Bhbiwgc3RyVmFsdWUsIHF1ZXJ5LCBibG9jayk7XG5cbiAgICAgIGNhc2UgQmxvY2tUeXBlLkRvY3VtZW50OlxuICAgICAgY2FzZSBCbG9ja1R5cGUuU3VwcG9ydHM6XG4gICAgICBjYXNlIEJsb2NrVHlwZS5QYWdlOlxuICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkFUX1JVTEVfUVVFUlkpO1xuICAgICAgICB0b2tlbnMgPSB0aGlzLl9jb2xsZWN0VW50aWxEZWxpbShkZWxpbWl0ZXJzIHwgUkJSQUNFX0RFTElNX0ZMQUcgfCBMQlJBQ0VfREVMSU1fRkxBRyk7XG4gICAgICAgIGVuZFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgLy8gd2UgZG8gbm90IHRyYWNrIHRoZSB3aGl0ZXNwYWNlIGFmdGVyIHRoaXMgYmxvY2sgcnVsZSBwcmVkaWNhdGUgZW5kc1xuICAgICAgICAvLyBzbyB3ZSBoYXZlIHRvIGNhbGN1bGF0ZSB0aGUgZW5kIHN0cmluZyB2YWx1ZSBvbiBvdXIgb3duXG4gICAgICAgIGVuZCA9IGVuZFRva2VuLmluZGV4ICsgZW5kVG9rZW4uc3RyVmFsdWUubGVuZ3RoIC0gMTtcbiAgICAgICAgc3RyVmFsdWUgPSB0aGlzLl9leHRyYWN0U291cmNlQ29udGVudChzdGFydCwgZW5kKTtcbiAgICAgICAgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGFydFRva2VuLCB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgcXVlcnkgPSBuZXcgQ3NzQXRSdWxlUHJlZGljYXRlQXN0KHNwYW4sIHN0clZhbHVlLCB0b2tlbnMpO1xuICAgICAgICBibG9jayA9IHRoaXMuX3BhcnNlQmxvY2soZGVsaW1pdGVycyk7XG4gICAgICAgIHN0clZhbHVlID0gdGhpcy5fZXh0cmFjdFNvdXJjZUNvbnRlbnQoc3RhcnQsIGJsb2NrLmVuZC5vZmZzZXQgISk7XG4gICAgICAgIHNwYW4gPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZVNwYW4oc3RhcnRUb2tlbiwgYmxvY2spO1xuICAgICAgICByZXR1cm4gbmV3IENzc0Jsb2NrRGVmaW5pdGlvblJ1bGVBc3Qoc3Bhbiwgc3RyVmFsdWUsIHR5cGUsIHF1ZXJ5LCBibG9jayk7XG5cbiAgICAgIC8vIGlmIGEgY3VzdG9tIEBydWxlIHsgLi4uIH0gaXMgdXNlZCBpdCBzaG91bGQgc3RpbGwgdG9rZW5pemUgdGhlIGluc2lkZXNcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxldCBsaXN0T2ZUb2tlbnM6IENzc1Rva2VuW10gPSBbXTtcbiAgICAgICAgbGV0IHRva2VuTmFtZSA9IHRva2VuLnN0clZhbHVlO1xuICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkFMTCk7XG4gICAgICAgIHRoaXMuX2Vycm9yKFxuICAgICAgICAgICAgZ2VuZXJhdGVFcnJvck1lc3NhZ2UoXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0U291cmNlQ29udGVudCgpLFxuICAgICAgICAgICAgICAgIGBUaGUgQ1NTIFwiYXRcIiBydWxlIFwiJHt0b2tlbk5hbWV9XCIgaXMgbm90IGFsbG93ZWQgdG8gdXNlZCBoZXJlYCwgdG9rZW4uc3RyVmFsdWUsXG4gICAgICAgICAgICAgICAgdG9rZW4uaW5kZXgsIHRva2VuLmxpbmUsIHRva2VuLmNvbHVtbiksXG4gICAgICAgICAgICB0b2tlbik7XG5cbiAgICAgICAgdGhpcy5fY29sbGVjdFVudGlsRGVsaW0oZGVsaW1pdGVycyB8IExCUkFDRV9ERUxJTV9GTEFHIHwgU0VNSUNPTE9OX0RFTElNX0ZMQUcpXG4gICAgICAgICAgICAuZm9yRWFjaCgodG9rZW4pID0+IHsgbGlzdE9mVG9rZW5zLnB1c2godG9rZW4pOyB9KTtcbiAgICAgICAgaWYgKHRoaXMuX3NjYW5uZXIucGVlayA9PSBjaGFycy4kTEJSQUNFKSB7XG4gICAgICAgICAgbGlzdE9mVG9rZW5zLnB1c2godGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAneycpKTtcbiAgICAgICAgICB0aGlzLl9jb2xsZWN0VW50aWxEZWxpbShkZWxpbWl0ZXJzIHwgUkJSQUNFX0RFTElNX0ZMQUcgfCBMQlJBQ0VfREVMSU1fRkxBRylcbiAgICAgICAgICAgICAgLmZvckVhY2goKHRva2VuKSA9PiB7IGxpc3RPZlRva2Vucy5wdXNoKHRva2VuKTsgfSk7XG4gICAgICAgICAgbGlzdE9mVG9rZW5zLnB1c2godGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnfScpKTtcbiAgICAgICAgfVxuICAgICAgICBlbmRUb2tlbiA9IGxpc3RPZlRva2Vuc1tsaXN0T2ZUb2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIHNwYW4gPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZVNwYW4oc3RhcnRUb2tlbiwgZW5kVG9rZW4pO1xuICAgICAgICByZXR1cm4gbmV3IENzc1Vua25vd25SdWxlQXN0KHNwYW4sIHRva2VuTmFtZSwgbGlzdE9mVG9rZW5zKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9wYXJzZVNlbGVjdG9yUnVsZShkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NSdWxlQXN0IHtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuX2dldFNjYW5uZXJJbmRleCgpO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IHRoaXMuX3BhcnNlU2VsZWN0b3JzKGRlbGltaXRlcnMpO1xuICAgIGNvbnN0IGJsb2NrID0gdGhpcy5fcGFyc2VTdHlsZUJsb2NrKGRlbGltaXRlcnMpO1xuICAgIGxldCBydWxlQXN0OiBDc3NSdWxlQXN0O1xuICAgIGxldCBzcGFuOiBQYXJzZVNvdXJjZVNwYW47XG4gICAgY29uc3Qgc3RhcnRTZWxlY3RvciA9IHNlbGVjdG9yc1swXTtcbiAgICBpZiAoYmxvY2sgIT0gbnVsbCkge1xuICAgICAgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGFydFNlbGVjdG9yLCBibG9jayk7XG4gICAgICBydWxlQXN0ID0gbmV3IENzc1NlbGVjdG9yUnVsZUFzdChzcGFuLCBzZWxlY3RvcnMsIGJsb2NrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmFtZSA9IHRoaXMuX2V4dHJhY3RTb3VyY2VDb250ZW50KHN0YXJ0LCB0aGlzLl9nZXRTY2FubmVySW5kZXgoKSAtIDEpO1xuICAgICAgY29uc3QgaW5uZXJUb2tlbnM6IENzc1Rva2VuW10gPSBbXTtcbiAgICAgIHNlbGVjdG9ycy5mb3JFYWNoKChzZWxlY3RvcjogQ3NzU2VsZWN0b3JBc3QpID0+IHtcbiAgICAgICAgc2VsZWN0b3Iuc2VsZWN0b3JQYXJ0cy5mb3JFYWNoKChwYXJ0OiBDc3NTaW1wbGVTZWxlY3RvckFzdCkgPT4ge1xuICAgICAgICAgIHBhcnQudG9rZW5zLmZvckVhY2goKHRva2VuOiBDc3NUb2tlbikgPT4geyBpbm5lclRva2Vucy5wdXNoKHRva2VuKTsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBlbmRUb2tlbiA9IGlubmVyVG9rZW5zW2lubmVyVG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGFydFNlbGVjdG9yLCBlbmRUb2tlbik7XG4gICAgICBydWxlQXN0ID0gbmV3IENzc1Vua25vd25Ub2tlbkxpc3RBc3Qoc3BhbiwgbmFtZSwgaW5uZXJUb2tlbnMpO1xuICAgIH1cbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkJMT0NLKTtcbiAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVFbXB0eVN0YXRlbWVudHMoKTtcbiAgICByZXR1cm4gcnVsZUFzdDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlU2VsZWN0b3JzKGRlbGltaXRlcnM6IG51bWJlcik6IENzc1NlbGVjdG9yQXN0W10ge1xuICAgIGRlbGltaXRlcnMgfD0gTEJSQUNFX0RFTElNX0ZMQUcgfCBTRU1JQ09MT05fREVMSU1fRkxBRztcblxuICAgIGNvbnN0IHNlbGVjdG9yczogQ3NzU2VsZWN0b3JBc3RbXSA9IFtdO1xuICAgIGxldCBpc1BhcnNpbmdTZWxlY3RvcnMgPSB0cnVlO1xuICAgIHdoaWxlIChpc1BhcnNpbmdTZWxlY3RvcnMpIHtcbiAgICAgIHNlbGVjdG9ycy5wdXNoKHRoaXMuX3BhcnNlU2VsZWN0b3IoZGVsaW1pdGVycykpO1xuXG4gICAgICBpc1BhcnNpbmdTZWxlY3RvcnMgPSAhY2hhcmFjdGVyQ29udGFpbnNEZWxpbWl0ZXIodGhpcy5fc2Nhbm5lci5wZWVrLCBkZWxpbWl0ZXJzKTtcblxuICAgICAgaWYgKGlzUGFyc2luZ1NlbGVjdG9ycykge1xuICAgICAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICcsJyk7XG4gICAgICAgIGlzUGFyc2luZ1NlbGVjdG9ycyA9ICFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpO1xuICAgICAgICBpZiAoaXNQYXJzaW5nU2VsZWN0b3JzKSB7XG4gICAgICAgICAgdGhpcy5fc2Nhbm5lci5jb25zdW1lV2hpdGVzcGFjZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdG9ycztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NjYW4oKTogQ3NzVG9rZW4ge1xuICAgIGNvbnN0IG91dHB1dCA9IHRoaXMuX3NjYW5uZXIuc2NhbigpICE7XG4gICAgY29uc3QgdG9rZW4gPSBvdXRwdXQudG9rZW47XG4gICAgY29uc3QgZXJyb3IgPSBvdXRwdXQuZXJyb3I7XG4gICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2Vycm9yKGdldFJhd01lc3NhZ2UoZXJyb3IpLCB0b2tlbik7XG4gICAgfVxuICAgIHRoaXMuX2xhc3RUb2tlbiA9IHRva2VuO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dldFNjYW5uZXJJbmRleCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2Nhbm5lci5pbmRleDsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbnN1bWUodHlwZTogQ3NzVG9rZW5UeXBlLCB2YWx1ZTogc3RyaW5nfG51bGwgPSBudWxsKTogQ3NzVG9rZW4ge1xuICAgIGNvbnN0IG91dHB1dCA9IHRoaXMuX3NjYW5uZXIuY29uc3VtZSh0eXBlLCB2YWx1ZSk7XG4gICAgY29uc3QgdG9rZW4gPSBvdXRwdXQudG9rZW47XG4gICAgY29uc3QgZXJyb3IgPSBvdXRwdXQuZXJyb3I7XG4gICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2Vycm9yKGdldFJhd01lc3NhZ2UoZXJyb3IpLCB0b2tlbik7XG4gICAgfVxuICAgIHRoaXMuX2xhc3RUb2tlbiA9IHRva2VuO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlS2V5ZnJhbWVCbG9jayhkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NCbG9ja0FzdCB7XG4gICAgZGVsaW1pdGVycyB8PSBSQlJBQ0VfREVMSU1fRkxBRztcbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLktFWUZSQU1FX0JMT0NLKTtcblxuICAgIGNvbnN0IHN0YXJ0VG9rZW4gPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICd7Jyk7XG5cbiAgICBjb25zdCBkZWZpbml0aW9uczogQ3NzS2V5ZnJhbWVEZWZpbml0aW9uQXN0W10gPSBbXTtcbiAgICB3aGlsZSAoIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycykpIHtcbiAgICAgIGRlZmluaXRpb25zLnB1c2godGhpcy5fcGFyc2VLZXlmcmFtZURlZmluaXRpb24oZGVsaW1pdGVycykpO1xuICAgIH1cblxuICAgIGNvbnN0IGVuZFRva2VuID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnfScpO1xuXG4gICAgY29uc3Qgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGFydFRva2VuLCBlbmRUb2tlbik7XG4gICAgcmV0dXJuIG5ldyBDc3NCbG9ja0FzdChzcGFuLCBkZWZpbml0aW9ucyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9wYXJzZUtleWZyYW1lRGVmaW5pdGlvbihkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NLZXlmcmFtZURlZmluaXRpb25Bc3Qge1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5fZ2V0U2Nhbm5lckluZGV4KCk7XG4gICAgY29uc3Qgc3RlcFRva2VuczogQ3NzVG9rZW5bXSA9IFtdO1xuICAgIGRlbGltaXRlcnMgfD0gTEJSQUNFX0RFTElNX0ZMQUc7XG4gICAgd2hpbGUgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpKSB7XG4gICAgICBzdGVwVG9rZW5zLnB1c2godGhpcy5fcGFyc2VLZXlmcmFtZUxhYmVsKGRlbGltaXRlcnMgfCBDT01NQV9ERUxJTV9GTEFHKSk7XG4gICAgICBpZiAodGhpcy5fc2Nhbm5lci5wZWVrICE9IGNoYXJzLiRMQlJBQ0UpIHtcbiAgICAgICAgdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnLCcpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBzdHlsZXNCbG9jayA9IHRoaXMuX3BhcnNlU3R5bGVCbG9jayhkZWxpbWl0ZXJzIHwgUkJSQUNFX0RFTElNX0ZMQUcpO1xuICAgIGNvbnN0IHNwYW4gPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZVNwYW4oc3RlcFRva2Vuc1swXSwgc3R5bGVzQmxvY2spO1xuICAgIGNvbnN0IGFzdCA9IG5ldyBDc3NLZXlmcmFtZURlZmluaXRpb25Bc3Qoc3Bhbiwgc3RlcFRva2Vucywgc3R5bGVzQmxvY2sgISk7XG5cbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkJMT0NLKTtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VLZXlmcmFtZUxhYmVsKGRlbGltaXRlcnM6IG51bWJlcik6IENzc1Rva2VuIHtcbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLktFWUZSQU1FX0JMT0NLKTtcbiAgICByZXR1cm4gbWVyZ2VUb2tlbnModGhpcy5fY29sbGVjdFVudGlsRGVsaW0oZGVsaW1pdGVycykpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VQc2V1ZG9TZWxlY3RvcihkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NQc2V1ZG9TZWxlY3RvckFzdCB7XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLl9nZXRTY2FubmVySW5kZXgoKTtcblxuICAgIGRlbGltaXRlcnMgJj0gfkNPTU1BX0RFTElNX0ZMQUc7XG5cbiAgICAvLyB3ZSBrZWVwIHRoZSBvcmlnaW5hbCB2YWx1ZSBzaW5jZSB3ZSBtYXkgdXNlIGl0IHRvIHJlY3Vyc2Ugd2hlbiA6bm90LCA6aG9zdCBhcmUgdXNlZFxuICAgIGNvbnN0IHN0YXJ0aW5nRGVsaW1zID0gZGVsaW1pdGVycztcblxuICAgIGNvbnN0IHN0YXJ0VG9rZW4gPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICc6Jyk7XG4gICAgY29uc3QgdG9rZW5zID0gW3N0YXJ0VG9rZW5dO1xuXG4gICAgaWYgKHRoaXMuX3NjYW5uZXIucGVlayA9PSBjaGFycy4kQ09MT04pIHsgIC8vIDo6c29tZXRoaW5nXG4gICAgICB0b2tlbnMucHVzaCh0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICc6JykpO1xuICAgIH1cblxuICAgIGNvbnN0IGlubmVyU2VsZWN0b3JzOiBDc3NTZWxlY3RvckFzdFtdID0gW107XG5cbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlBTRVVET19TRUxFQ1RPUik7XG5cbiAgICAvLyBob3N0LCBob3N0LWNvbnRleHQsIGxhbmcsIG5vdCwgbnRoLWNoaWxkIGFyZSBhbGwgaWRlbnRpZmllcnNcbiAgICBjb25zdCBwc2V1ZG9TZWxlY3RvclRva2VuID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuSWRlbnRpZmllcik7XG4gICAgY29uc3QgcHNldWRvU2VsZWN0b3JOYW1lID0gcHNldWRvU2VsZWN0b3JUb2tlbi5zdHJWYWx1ZTtcbiAgICB0b2tlbnMucHVzaChwc2V1ZG9TZWxlY3RvclRva2VuKTtcblxuICAgIC8vIGhvc3QoKSwgbGFuZygpLCBudGgtY2hpbGQoKSwgZXRjLi4uXG4gICAgaWYgKHRoaXMuX3NjYW5uZXIucGVlayA9PSBjaGFycy4kTFBBUkVOKSB7XG4gICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlBTRVVET19TRUxFQ1RPUl9XSVRIX0FSR1VNRU5UUyk7XG5cbiAgICAgIGNvbnN0IG9wZW5QYXJlblRva2VuID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnKCcpO1xuICAgICAgdG9rZW5zLnB1c2gob3BlblBhcmVuVG9rZW4pO1xuXG4gICAgICAvLyA6aG9zdChpbm5lclNlbGVjdG9yKHMpKSwgOm5vdChzZWxlY3RvciksIGV0Yy4uLlxuICAgICAgaWYgKF9wc2V1ZG9TZWxlY3RvclN1cHBvcnRzSW5uZXJTZWxlY3RvcnMocHNldWRvU2VsZWN0b3JOYW1lKSkge1xuICAgICAgICBsZXQgaW5uZXJEZWxpbXMgPSBzdGFydGluZ0RlbGltcyB8IExQQVJFTl9ERUxJTV9GTEFHIHwgUlBBUkVOX0RFTElNX0ZMQUc7XG4gICAgICAgIGlmIChwc2V1ZG9TZWxlY3Rvck5hbWUgPT0gJ25vdCcpIHtcbiAgICAgICAgICAvLyB0aGUgaW5uZXIgc2VsZWN0b3IgaW5zaWRlIG9mIDpub3QoLi4uKSBjYW4gb25seSBiZSBvbmVcbiAgICAgICAgICAvLyBDU1Mgc2VsZWN0b3IgKG5vIGNvbW1hcyBhbGxvd2VkKSAuLi4gVGhpcyBpcyBhY2NvcmRpbmdcbiAgICAgICAgICAvLyB0byB0aGUgQ1NTIHNwZWNpZmljYXRpb25cbiAgICAgICAgICBpbm5lckRlbGltcyB8PSBDT01NQV9ERUxJTV9GTEFHO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gOmhvc3QoYSwgYiwgYykge1xuICAgICAgICB0aGlzLl9wYXJzZVNlbGVjdG9ycyhpbm5lckRlbGltcykuZm9yRWFjaCgoc2VsZWN0b3IsIGluZGV4KSA9PiB7XG4gICAgICAgICAgaW5uZXJTZWxlY3RvcnMucHVzaChzZWxlY3Rvcik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhpcyBicmFuY2ggaXMgZm9yIHRoaW5ncyBsaWtlIFwiZW4tdXMsIDJrICsgMSwgZXRjLi4uXCJcbiAgICAgICAgLy8gd2hpY2ggYWxsIGVuZCB1cCBpbiBwc2V1ZG9TZWxlY3RvcnMgbGlrZSA6bGFuZywgOm50aC1jaGlsZCwgZXRjLi5cbiAgICAgICAgY29uc3QgaW5uZXJWYWx1ZURlbGltcyA9IGRlbGltaXRlcnMgfCBMQlJBQ0VfREVMSU1fRkxBRyB8IENPTE9OX0RFTElNX0ZMQUcgfFxuICAgICAgICAgICAgUlBBUkVOX0RFTElNX0ZMQUcgfCBMUEFSRU5fREVMSU1fRkxBRztcbiAgICAgICAgd2hpbGUgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGlubmVyVmFsdWVEZWxpbXMpKSB7XG4gICAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLl9zY2FuKCk7XG4gICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNsb3NlUGFyZW5Ub2tlbiA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJyknKTtcbiAgICAgIHRva2Vucy5wdXNoKGNsb3NlUGFyZW5Ub2tlbik7XG4gICAgfVxuXG4gICAgY29uc3QgZW5kID0gdGhpcy5fZ2V0U2Nhbm5lckluZGV4KCkgLSAxO1xuICAgIGNvbnN0IHN0clZhbHVlID0gdGhpcy5fZXh0cmFjdFNvdXJjZUNvbnRlbnQoc3RhcnQsIGVuZCk7XG5cbiAgICBjb25zdCBlbmRUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgY29uc3Qgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3BhbihzdGFydFRva2VuLCBlbmRUb2tlbik7XG4gICAgcmV0dXJuIG5ldyBDc3NQc2V1ZG9TZWxlY3RvckFzdChzcGFuLCBzdHJWYWx1ZSwgcHNldWRvU2VsZWN0b3JOYW1lLCB0b2tlbnMsIGlubmVyU2VsZWN0b3JzKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlU2ltcGxlU2VsZWN0b3IoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzU2ltcGxlU2VsZWN0b3JBc3Qge1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5fZ2V0U2Nhbm5lckluZGV4KCk7XG5cbiAgICBkZWxpbWl0ZXJzIHw9IENPTU1BX0RFTElNX0ZMQUc7XG5cbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNFTEVDVE9SKTtcbiAgICBjb25zdCBzZWxlY3RvckNzc1Rva2VuczogQ3NzVG9rZW5bXSA9IFtdO1xuICAgIGNvbnN0IHBzZXVkb1NlbGVjdG9yczogQ3NzUHNldWRvU2VsZWN0b3JBc3RbXSA9IFtdO1xuXG4gICAgbGV0IHByZXZpb3VzVG9rZW46IENzc1Rva2VuID0gdW5kZWZpbmVkICE7XG5cbiAgICBjb25zdCBzZWxlY3RvclBhcnREZWxpbWl0ZXJzID0gZGVsaW1pdGVycyB8IFNQQUNFX0RFTElNX0ZMQUc7XG4gICAgbGV0IGxvb3BPdmVyU2VsZWN0b3IgPSAhY2hhcmFjdGVyQ29udGFpbnNEZWxpbWl0ZXIodGhpcy5fc2Nhbm5lci5wZWVrLCBzZWxlY3RvclBhcnREZWxpbWl0ZXJzKTtcblxuICAgIGxldCBoYXNBdHRyaWJ1dGVFcnJvciA9IGZhbHNlO1xuICAgIHdoaWxlIChsb29wT3ZlclNlbGVjdG9yKSB7XG4gICAgICBjb25zdCBwZWVrID0gdGhpcy5fc2Nhbm5lci5wZWVrO1xuXG4gICAgICBzd2l0Y2ggKHBlZWspIHtcbiAgICAgICAgY2FzZSBjaGFycy4kQ09MT046XG4gICAgICAgICAgbGV0IGlubmVyUHNldWRvID0gdGhpcy5fcGFyc2VQc2V1ZG9TZWxlY3RvcihkZWxpbWl0ZXJzKTtcbiAgICAgICAgICBwc2V1ZG9TZWxlY3RvcnMucHVzaChpbm5lclBzZXVkbyk7XG4gICAgICAgICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5TRUxFQ1RPUik7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBjaGFycy4kTEJSQUNLRVQ6XG4gICAgICAgICAgLy8gd2Ugc2V0IHRoZSBtb2RlIGFmdGVyIHRoZSBzY2FuIGJlY2F1c2UgYXR0cmlidXRlIG1vZGUgZG9lcyBub3RcbiAgICAgICAgICAvLyBhbGxvdyBhdHRyaWJ1dGUgW10gdmFsdWVzLiBBbmQgdGhpcyBhbHNvIHdpbGwgY2F0Y2ggYW55IGVycm9yc1xuICAgICAgICAgIC8vIGlmIGFuIGV4dHJhIFwiW1wiIGlzIHVzZWQgaW5zaWRlLlxuICAgICAgICAgIHNlbGVjdG9yQ3NzVG9rZW5zLnB1c2godGhpcy5fc2NhbigpKTtcbiAgICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkFUVFJJQlVURV9TRUxFQ1RPUik7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBjaGFycy4kUkJSQUNLRVQ6XG4gICAgICAgICAgaWYgKHRoaXMuX3NjYW5uZXIuZ2V0TW9kZSgpICE9IENzc0xleGVyTW9kZS5BVFRSSUJVVEVfU0VMRUNUT1IpIHtcbiAgICAgICAgICAgIGhhc0F0dHJpYnV0ZUVycm9yID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2Ugc2V0IHRoZSBtb2RlIGVhcmx5IGJlY2F1c2UgYXR0cmlidXRlIG1vZGUgZG9lcyBub3RcbiAgICAgICAgICAvLyBhbGxvdyBhdHRyaWJ1dGUgW10gdmFsdWVzXG4gICAgICAgICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5TRUxFQ1RPUik7XG4gICAgICAgICAgc2VsZWN0b3JDc3NUb2tlbnMucHVzaCh0aGlzLl9zY2FuKCkpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKGlzU2VsZWN0b3JPcGVyYXRvckNoYXJhY3RlcihwZWVrKSkge1xuICAgICAgICAgICAgbG9vcE92ZXJTZWxlY3RvciA9IGZhbHNlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHRva2VuID0gdGhpcy5fc2NhbigpO1xuICAgICAgICAgIHByZXZpb3VzVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICBzZWxlY3RvckNzc1Rva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbG9vcE92ZXJTZWxlY3RvciA9ICFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIHNlbGVjdG9yUGFydERlbGltaXRlcnMpO1xuICAgIH1cblxuICAgIGhhc0F0dHJpYnV0ZUVycm9yID1cbiAgICAgICAgaGFzQXR0cmlidXRlRXJyb3IgfHwgdGhpcy5fc2Nhbm5lci5nZXRNb2RlKCkgPT0gQ3NzTGV4ZXJNb2RlLkFUVFJJQlVURV9TRUxFQ1RPUjtcbiAgICBpZiAoaGFzQXR0cmlidXRlRXJyb3IpIHtcbiAgICAgIHRoaXMuX2Vycm9yKFxuICAgICAgICAgIGBVbmJhbGFuY2VkIENTUyBhdHRyaWJ1dGUgc2VsZWN0b3IgYXQgY29sdW1uICR7cHJldmlvdXNUb2tlbi5saW5lfToke3ByZXZpb3VzVG9rZW4uY29sdW1ufWAsXG4gICAgICAgICAgcHJldmlvdXNUb2tlbik7XG4gICAgfVxuXG4gICAgbGV0IGVuZCA9IHRoaXMuX2dldFNjYW5uZXJJbmRleCgpIC0gMTtcblxuICAgIC8vIHRoaXMgaGFwcGVucyBpZiB0aGUgc2VsZWN0b3IgaXMgbm90IGRpcmVjdGx5IGZvbGxvd2VkIGJ5XG4gICAgLy8gYSBjb21tYSBvciBjdXJseSBicmFjZSB3aXRob3V0IGEgc3BhY2UgaW4gYmV0d2VlblxuICAgIGxldCBvcGVyYXRvcjogQ3NzVG9rZW58bnVsbCA9IG51bGw7XG4gICAgbGV0IG9wZXJhdG9yU2NhbkNvdW50ID0gMDtcbiAgICBsZXQgbGFzdE9wZXJhdG9yVG9rZW46IENzc1Rva2VufG51bGwgPSBudWxsO1xuICAgIGlmICghY2hhcmFjdGVyQ29udGFpbnNEZWxpbWl0ZXIodGhpcy5fc2Nhbm5lci5wZWVrLCBkZWxpbWl0ZXJzKSkge1xuICAgICAgd2hpbGUgKG9wZXJhdG9yID09IG51bGwgJiYgIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycykgJiZcbiAgICAgICAgICAgICBpc1NlbGVjdG9yT3BlcmF0b3JDaGFyYWN0ZXIodGhpcy5fc2Nhbm5lci5wZWVrKSkge1xuICAgICAgICBsZXQgdG9rZW4gPSB0aGlzLl9zY2FuKCk7XG4gICAgICAgIGNvbnN0IHRva2VuT3BlcmF0b3IgPSB0b2tlbi5zdHJWYWx1ZTtcbiAgICAgICAgb3BlcmF0b3JTY2FuQ291bnQrKztcbiAgICAgICAgbGFzdE9wZXJhdG9yVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgaWYgKHRva2VuT3BlcmF0b3IgIT0gU1BBQ0VfT1BFUkFUT1IpIHtcbiAgICAgICAgICBzd2l0Y2ggKHRva2VuT3BlcmF0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgU0xBU0hfQ0hBUkFDVEVSOlxuICAgICAgICAgICAgICAvLyAvZGVlcC8gb3BlcmF0b3JcbiAgICAgICAgICAgICAgbGV0IGRlZXBUb2tlbiA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLklkZW50aWZpZXIpO1xuICAgICAgICAgICAgICBsZXQgZGVlcFNsYXNoID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyKTtcbiAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbGFzdE9wZXJhdG9yVG9rZW4uaW5kZXg7XG4gICAgICAgICAgICAgIGxldCBsaW5lID0gbGFzdE9wZXJhdG9yVG9rZW4ubGluZTtcbiAgICAgICAgICAgICAgbGV0IGNvbHVtbiA9IGxhc3RPcGVyYXRvclRva2VuLmNvbHVtbjtcbiAgICAgICAgICAgICAgaWYgKGRlZXBUb2tlbiAhPSBudWxsICYmIGRlZXBUb2tlbi5zdHJWYWx1ZS50b0xvd2VyQ2FzZSgpID09ICdkZWVwJyAmJlxuICAgICAgICAgICAgICAgICAgZGVlcFNsYXNoLnN0clZhbHVlID09IFNMQVNIX0NIQVJBQ1RFUikge1xuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IENzc1Rva2VuKFxuICAgICAgICAgICAgICAgICAgICBsYXN0T3BlcmF0b3JUb2tlbi5pbmRleCwgbGFzdE9wZXJhdG9yVG9rZW4uY29sdW1uLCBsYXN0T3BlcmF0b3JUb2tlbi5saW5lLFxuICAgICAgICAgICAgICAgICAgICBDc3NUb2tlblR5cGUuSWRlbnRpZmllciwgREVFUF9PUEVSQVRPUl9TVFIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBTTEFTSF9DSEFSQUNURVIgKyBkZWVwVG9rZW4uc3RyVmFsdWUgKyBkZWVwU2xhc2guc3RyVmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRXJyb3JNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0U291cmNlQ29udGVudCgpLCBgJHt0ZXh0fSBpcyBhbiBpbnZhbGlkIENTUyBvcGVyYXRvcmAsIHRleHQsIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgY29sdW1uKSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdE9wZXJhdG9yVG9rZW4pO1xuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IENzc1Rva2VuKGluZGV4LCBjb2x1bW4sIGxpbmUsIENzc1Rva2VuVHlwZS5JbnZhbGlkLCB0ZXh0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBHVF9DSEFSQUNURVI6XG4gICAgICAgICAgICAgIC8vID4+PiBvcGVyYXRvclxuICAgICAgICAgICAgICBpZiAodGhpcy5fc2Nhbm5lci5wZWVrID09IGNoYXJzLiRHVCAmJiB0aGlzLl9zY2FubmVyLnBlZWtQZWVrID09IGNoYXJzLiRHVCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgR1RfQ0hBUkFDVEVSKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsIEdUX0NIQVJBQ1RFUik7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBuZXcgQ3NzVG9rZW4oXG4gICAgICAgICAgICAgICAgICAgIGxhc3RPcGVyYXRvclRva2VuLmluZGV4LCBsYXN0T3BlcmF0b3JUb2tlbi5jb2x1bW4sIGxhc3RPcGVyYXRvclRva2VuLmxpbmUsXG4gICAgICAgICAgICAgICAgICAgIENzc1Rva2VuVHlwZS5JZGVudGlmaWVyLCBUUklQTEVfR1RfT1BFUkFUT1JfU1RSKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvcGVyYXRvciA9IHRva2VuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHNvIGxvbmcgYXMgdGhlcmUgaXMgYW4gb3BlcmF0b3IgdGhlbiB3ZSBjYW4gaGF2ZSBhblxuICAgICAgLy8gZW5kaW5nIHZhbHVlIHRoYXQgaXMgYmV5b25kIHRoZSBzZWxlY3RvciB2YWx1ZSAuLi5cbiAgICAgIC8vIG90aGVyd2lzZSBpdCdzIGp1c3QgYSBidW5jaCBvZiB0cmFpbGluZyB3aGl0ZXNwYWNlXG4gICAgICBpZiAob3BlcmF0b3IgIT0gbnVsbCkge1xuICAgICAgICBlbmQgPSBvcGVyYXRvci5pbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVXaGl0ZXNwYWNlKCk7XG5cbiAgICBjb25zdCBzdHJWYWx1ZSA9IHRoaXMuX2V4dHJhY3RTb3VyY2VDb250ZW50KHN0YXJ0LCBlbmQpO1xuXG4gICAgLy8gaWYgd2UgZG8gY29tZSBhY3Jvc3Mgb25lIG9yIG1vcmUgc3BhY2VzIGluc2lkZSBvZlxuICAgIC8vIHRoZSBvcGVyYXRvcnMgbG9vcCB0aGVuIGFuIGVtcHR5IHNwYWNlIGlzIHN0aWxsIGFcbiAgICAvLyB2YWxpZCBvcGVyYXRvciB0byB1c2UgaWYgc29tZXRoaW5nIGVsc2Ugd2FzIG5vdCBmb3VuZFxuICAgIGlmIChvcGVyYXRvciA9PSBudWxsICYmIG9wZXJhdG9yU2NhbkNvdW50ID4gMCAmJiB0aGlzLl9zY2FubmVyLnBlZWsgIT0gY2hhcnMuJExCUkFDRSkge1xuICAgICAgb3BlcmF0b3IgPSBsYXN0T3BlcmF0b3JUb2tlbjtcbiAgICB9XG5cbiAgICAvLyBwbGVhc2Ugbm90ZSB0aGF0IGBlbmRUb2tlbmAgaXMgcmVhc3NpZ25lZCBtdWx0aXBsZSB0aW1lcyBiZWxvd1xuICAgIC8vIHNvIHBsZWFzZSBkbyBub3Qgb3B0aW1pemUgdGhlIGlmIHN0YXRlbWVudHMgaW50byBpZi9lbHNlaWZcbiAgICBsZXQgc3RhcnRUb2tlbk9yQXN0OiBDc3NUb2tlbnxDc3NBc3R8bnVsbCA9IG51bGw7XG4gICAgbGV0IGVuZFRva2VuT3JBc3Q6IENzc1Rva2VufENzc0FzdHxudWxsID0gbnVsbDtcbiAgICBpZiAoc2VsZWN0b3JDc3NUb2tlbnMubGVuZ3RoID4gMCkge1xuICAgICAgc3RhcnRUb2tlbk9yQXN0ID0gc3RhcnRUb2tlbk9yQXN0IHx8IHNlbGVjdG9yQ3NzVG9rZW5zWzBdO1xuICAgICAgZW5kVG9rZW5PckFzdCA9IHNlbGVjdG9yQ3NzVG9rZW5zW3NlbGVjdG9yQ3NzVG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgICBpZiAocHNldWRvU2VsZWN0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIHN0YXJ0VG9rZW5PckFzdCA9IHN0YXJ0VG9rZW5PckFzdCB8fCBwc2V1ZG9TZWxlY3RvcnNbMF07XG4gICAgICBlbmRUb2tlbk9yQXN0ID0gcHNldWRvU2VsZWN0b3JzW3BzZXVkb1NlbGVjdG9ycy5sZW5ndGggLSAxXTtcbiAgICB9XG4gICAgaWYgKG9wZXJhdG9yICE9IG51bGwpIHtcbiAgICAgIHN0YXJ0VG9rZW5PckFzdCA9IHN0YXJ0VG9rZW5PckFzdCB8fCBvcGVyYXRvcjtcbiAgICAgIGVuZFRva2VuT3JBc3QgPSBvcGVyYXRvcjtcbiAgICB9XG5cbiAgICBjb25zdCBzcGFuID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VTcGFuKHN0YXJ0VG9rZW5PckFzdCAhLCBlbmRUb2tlbk9yQXN0KTtcbiAgICByZXR1cm4gbmV3IENzc1NpbXBsZVNlbGVjdG9yQXN0KHNwYW4sIHNlbGVjdG9yQ3NzVG9rZW5zLCBzdHJWYWx1ZSwgcHNldWRvU2VsZWN0b3JzLCBvcGVyYXRvciAhKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlU2VsZWN0b3IoZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzU2VsZWN0b3JBc3Qge1xuICAgIGRlbGltaXRlcnMgfD0gQ09NTUFfREVMSU1fRkxBRztcbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNFTEVDVE9SKTtcblxuICAgIGNvbnN0IHNpbXBsZVNlbGVjdG9yczogQ3NzU2ltcGxlU2VsZWN0b3JBc3RbXSA9IFtdO1xuICAgIHdoaWxlICghY2hhcmFjdGVyQ29udGFpbnNEZWxpbWl0ZXIodGhpcy5fc2Nhbm5lci5wZWVrLCBkZWxpbWl0ZXJzKSkge1xuICAgICAgc2ltcGxlU2VsZWN0b3JzLnB1c2godGhpcy5fcGFyc2VTaW1wbGVTZWxlY3RvcihkZWxpbWl0ZXJzKSk7XG4gICAgICB0aGlzLl9zY2FubmVyLmNvbnN1bWVXaGl0ZXNwYWNlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RTZWxlY3RvciA9IHNpbXBsZVNlbGVjdG9yc1swXTtcbiAgICBjb25zdCBsYXN0U2VsZWN0b3IgPSBzaW1wbGVTZWxlY3RvcnNbc2ltcGxlU2VsZWN0b3JzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IHNwYW4gPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZVNwYW4oZmlyc3RTZWxlY3RvciwgbGFzdFNlbGVjdG9yKTtcbiAgICByZXR1cm4gbmV3IENzc1NlbGVjdG9yQXN0KHNwYW4sIHNpbXBsZVNlbGVjdG9ycyk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9wYXJzZVZhbHVlKGRlbGltaXRlcnM6IG51bWJlcik6IENzc1N0eWxlVmFsdWVBc3Qge1xuICAgIGRlbGltaXRlcnMgfD0gUkJSQUNFX0RFTElNX0ZMQUcgfCBTRU1JQ09MT05fREVMSU1fRkxBRyB8IE5FV0xJTkVfREVMSU1fRkxBRztcblxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU1RZTEVfVkFMVUUpO1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5fZ2V0U2Nhbm5lckluZGV4KCk7XG5cbiAgICBjb25zdCB0b2tlbnM6IENzc1Rva2VuW10gPSBbXTtcbiAgICBsZXQgd3NTdHIgPSAnJztcbiAgICBsZXQgcHJldmlvdXM6IENzc1Rva2VuID0gdW5kZWZpbmVkICE7XG4gICAgd2hpbGUgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpKSB7XG4gICAgICBsZXQgdG9rZW46IENzc1Rva2VuO1xuICAgICAgaWYgKHByZXZpb3VzICE9IG51bGwgJiYgcHJldmlvdXMudHlwZSA9PSBDc3NUb2tlblR5cGUuSWRlbnRpZmllciAmJlxuICAgICAgICAgIHRoaXMuX3NjYW5uZXIucGVlayA9PSBjaGFycy4kTFBBUkVOKSB7XG4gICAgICAgIHRva2VuID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnKCcpO1xuICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG5cbiAgICAgICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5TVFlMRV9WQUxVRV9GVU5DVElPTik7XG5cbiAgICAgICAgdG9rZW4gPSB0aGlzLl9zY2FuKCk7XG4gICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblxuICAgICAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNUWUxFX1ZBTFVFKTtcblxuICAgICAgICB0b2tlbiA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJyknKTtcbiAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9rZW4gPSB0aGlzLl9zY2FuKCk7XG4gICAgICAgIGlmICh0b2tlbi50eXBlID09IENzc1Rva2VuVHlwZS5XaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgd3NTdHIgKz0gdG9rZW4uc3RyVmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3NTdHIgPSAnJztcbiAgICAgICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHByZXZpb3VzID0gdG9rZW47XG4gICAgfVxuXG4gICAgY29uc3QgZW5kID0gdGhpcy5fZ2V0U2Nhbm5lckluZGV4KCkgLSAxO1xuICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZVdoaXRlc3BhY2UoKTtcblxuICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9zY2FubmVyLnBlZWs7XG4gICAgaWYgKGNvZGUgPT0gY2hhcnMuJFNFTUlDT0xPTikge1xuICAgICAgdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnOycpO1xuICAgIH0gZWxzZSBpZiAoY29kZSAhPSBjaGFycy4kUkJSQUNFKSB7XG4gICAgICB0aGlzLl9lcnJvcihcbiAgICAgICAgICBnZW5lcmF0ZUVycm9yTWVzc2FnZShcbiAgICAgICAgICAgICAgdGhpcy5fZ2V0U291cmNlQ29udGVudCgpLCBgVGhlIENTUyBrZXkvdmFsdWUgZGVmaW5pdGlvbiBkaWQgbm90IGVuZCB3aXRoIGEgc2VtaWNvbG9uYCxcbiAgICAgICAgICAgICAgcHJldmlvdXMuc3RyVmFsdWUsIHByZXZpb3VzLmluZGV4LCBwcmV2aW91cy5saW5lLCBwcmV2aW91cy5jb2x1bW4pLFxuICAgICAgICAgIHByZXZpb3VzKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdHJWYWx1ZSA9IHRoaXMuX2V4dHJhY3RTb3VyY2VDb250ZW50KHN0YXJ0LCBlbmQpO1xuICAgIGNvbnN0IHN0YXJ0VG9rZW4gPSB0b2tlbnNbMF07XG4gICAgY29uc3QgZW5kVG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IHNwYW4gPSB0aGlzLl9nZW5lcmF0ZVNvdXJjZVNwYW4oc3RhcnRUb2tlbiwgZW5kVG9rZW4pO1xuICAgIHJldHVybiBuZXcgQ3NzU3R5bGVWYWx1ZUFzdChzcGFuLCB0b2tlbnMsIHN0clZhbHVlKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbGxlY3RVbnRpbERlbGltKGRlbGltaXRlcnM6IG51bWJlciwgYXNzZXJ0VHlwZTogQ3NzVG9rZW5UeXBlfG51bGwgPSBudWxsKTogQ3NzVG9rZW5bXSB7XG4gICAgY29uc3QgdG9rZW5zOiBDc3NUb2tlbltdID0gW107XG4gICAgd2hpbGUgKCFjaGFyYWN0ZXJDb250YWluc0RlbGltaXRlcih0aGlzLl9zY2FubmVyLnBlZWssIGRlbGltaXRlcnMpKSB7XG4gICAgICBjb25zdCB2YWwgPSBhc3NlcnRUeXBlICE9IG51bGwgPyB0aGlzLl9jb25zdW1lKGFzc2VydFR5cGUpIDogdGhpcy5fc2NhbigpO1xuICAgICAgdG9rZW5zLnB1c2godmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlQmxvY2soZGVsaW1pdGVyczogbnVtYmVyKTogQ3NzQmxvY2tBc3Qge1xuICAgIGRlbGltaXRlcnMgfD0gUkJSQUNFX0RFTElNX0ZMQUc7XG5cbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLkJMT0NLKTtcblxuICAgIGNvbnN0IHN0YXJ0VG9rZW4gPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICd7Jyk7XG4gICAgdGhpcy5fc2Nhbm5lci5jb25zdW1lRW1wdHlTdGF0ZW1lbnRzKCk7XG5cbiAgICBjb25zdCByZXN1bHRzOiBDc3NSdWxlQXN0W10gPSBbXTtcbiAgICB3aGlsZSAoIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycykpIHtcbiAgICAgIHJlc3VsdHMucHVzaCh0aGlzLl9wYXJzZVJ1bGUoZGVsaW1pdGVycykpO1xuICAgIH1cblxuICAgIGNvbnN0IGVuZFRva2VuID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnfScpO1xuXG4gICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5CTE9DSyk7XG4gICAgdGhpcy5fc2Nhbm5lci5jb25zdW1lRW1wdHlTdGF0ZW1lbnRzKCk7XG5cbiAgICBjb25zdCBzcGFuID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VTcGFuKHN0YXJ0VG9rZW4sIGVuZFRva2VuKTtcbiAgICByZXR1cm4gbmV3IENzc0Jsb2NrQXN0KHNwYW4sIHJlc3VsdHMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcGFyc2VTdHlsZUJsb2NrKGRlbGltaXRlcnM6IG51bWJlcik6IENzc1N0eWxlc0Jsb2NrQXN0fG51bGwge1xuICAgIGRlbGltaXRlcnMgfD0gUkJSQUNFX0RFTElNX0ZMQUcgfCBMQlJBQ0VfREVMSU1fRkxBRztcblxuICAgIHRoaXMuX3NjYW5uZXIuc2V0TW9kZShDc3NMZXhlck1vZGUuU1RZTEVfQkxPQ0spO1xuXG4gICAgY29uc3Qgc3RhcnRUb2tlbiA9IHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJ3snKTtcbiAgICBpZiAoc3RhcnRUb2tlbi5udW1WYWx1ZSAhPSBjaGFycy4kTEJSQUNFKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBkZWZpbml0aW9uczogQ3NzRGVmaW5pdGlvbkFzdFtdID0gW107XG4gICAgdGhpcy5fc2Nhbm5lci5jb25zdW1lRW1wdHlTdGF0ZW1lbnRzKCk7XG5cbiAgICB3aGlsZSAoIWNoYXJhY3RlckNvbnRhaW5zRGVsaW1pdGVyKHRoaXMuX3NjYW5uZXIucGVlaywgZGVsaW1pdGVycykpIHtcbiAgICAgIGRlZmluaXRpb25zLnB1c2godGhpcy5fcGFyc2VEZWZpbml0aW9uKGRlbGltaXRlcnMpKTtcbiAgICAgIHRoaXMuX3NjYW5uZXIuY29uc3VtZUVtcHR5U3RhdGVtZW50cygpO1xuICAgIH1cblxuICAgIGNvbnN0IGVuZFRva2VuID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuQ2hhcmFjdGVyLCAnfScpO1xuXG4gICAgdGhpcy5fc2Nhbm5lci5zZXRNb2RlKENzc0xleGVyTW9kZS5TVFlMRV9CTE9DSyk7XG4gICAgdGhpcy5fc2Nhbm5lci5jb25zdW1lRW1wdHlTdGF0ZW1lbnRzKCk7XG5cbiAgICBjb25zdCBzcGFuID0gdGhpcy5fZ2VuZXJhdGVTb3VyY2VTcGFuKHN0YXJ0VG9rZW4sIGVuZFRva2VuKTtcbiAgICByZXR1cm4gbmV3IENzc1N0eWxlc0Jsb2NrQXN0KHNwYW4sIGRlZmluaXRpb25zKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3BhcnNlRGVmaW5pdGlvbihkZWxpbWl0ZXJzOiBudW1iZXIpOiBDc3NEZWZpbml0aW9uQXN0IHtcbiAgICB0aGlzLl9zY2FubmVyLnNldE1vZGUoQ3NzTGV4ZXJNb2RlLlNUWUxFX0JMT0NLKTtcblxuICAgIGxldCBwcm9wID0gdGhpcy5fY29uc3VtZShDc3NUb2tlblR5cGUuSWRlbnRpZmllcik7XG4gICAgbGV0IHBhcnNlVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBsZXQgdmFsdWU6IENzc1N0eWxlVmFsdWVBc3R8bnVsbCA9IG51bGw7XG4gICAgbGV0IGVuZFRva2VuOiBDc3NUb2tlbnxDc3NTdHlsZVZhbHVlQXN0ID0gcHJvcDtcblxuICAgIC8vIHRoZSBjb2xvbiB2YWx1ZSBzZXBhcmF0ZXMgdGhlIHByb3AgZnJvbSB0aGUgc3R5bGUuXG4gICAgLy8gdGhlcmUgYXJlIGEgZmV3IGNhc2VzIGFzIHRvIHdoYXQgY291bGQgaGFwcGVuIGlmIGl0XG4gICAgLy8gaXMgbWlzc2luZ1xuICAgIHN3aXRjaCAodGhpcy5fc2Nhbm5lci5wZWVrKSB7XG4gICAgICBjYXNlIGNoYXJzLiRTRU1JQ09MT046XG4gICAgICBjYXNlIGNoYXJzLiRSQlJBQ0U6XG4gICAgICBjYXNlIGNoYXJzLiRFT0Y6XG4gICAgICAgIHBhcnNlVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxldCBwcm9wU3RyID0gW3Byb3Auc3RyVmFsdWVdO1xuICAgICAgICBpZiAodGhpcy5fc2Nhbm5lci5wZWVrICE9IGNoYXJzLiRDT0xPTikge1xuICAgICAgICAgIC8vIHRoaXMgd2lsbCB0aHJvdyB0aGUgZXJyb3JcbiAgICAgICAgICBjb25zdCBuZXh0VmFsdWUgPSB0aGlzLl9jb25zdW1lKENzc1Rva2VuVHlwZS5DaGFyYWN0ZXIsICc6Jyk7XG4gICAgICAgICAgcHJvcFN0ci5wdXNoKG5leHRWYWx1ZS5zdHJWYWx1ZSk7XG5cbiAgICAgICAgICBjb25zdCByZW1haW5pbmdUb2tlbnMgPSB0aGlzLl9jb2xsZWN0VW50aWxEZWxpbShcbiAgICAgICAgICAgICAgZGVsaW1pdGVycyB8IENPTE9OX0RFTElNX0ZMQUcgfCBTRU1JQ09MT05fREVMSU1fRkxBRywgQ3NzVG9rZW5UeXBlLklkZW50aWZpZXIpO1xuICAgICAgICAgIGlmIChyZW1haW5pbmdUb2tlbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVtYWluaW5nVG9rZW5zLmZvckVhY2goKHRva2VuKSA9PiB7IHByb3BTdHIucHVzaCh0b2tlbi5zdHJWYWx1ZSk7IH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGVuZFRva2VuID0gcHJvcCA9XG4gICAgICAgICAgICAgIG5ldyBDc3NUb2tlbihwcm9wLmluZGV4LCBwcm9wLmNvbHVtbiwgcHJvcC5saW5lLCBwcm9wLnR5cGUsIHByb3BTdHIuam9pbignICcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoaXMgbWVhbnMgd2UndmUgcmVhY2hlZCB0aGUgZW5kIG9mIHRoZSBkZWZpbml0aW9uIGFuZC9vciBibG9ja1xuICAgICAgICBpZiAodGhpcy5fc2Nhbm5lci5wZWVrID09IGNoYXJzLiRDT0xPTikge1xuICAgICAgICAgIHRoaXMuX2NvbnN1bWUoQ3NzVG9rZW5UeXBlLkNoYXJhY3RlciwgJzonKTtcbiAgICAgICAgICBwYXJzZVZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAocGFyc2VWYWx1ZSkge1xuICAgICAgdmFsdWUgPSB0aGlzLl9wYXJzZVZhbHVlKGRlbGltaXRlcnMpO1xuICAgICAgZW5kVG9rZW4gPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZXJyb3IoXG4gICAgICAgICAgZ2VuZXJhdGVFcnJvck1lc3NhZ2UoXG4gICAgICAgICAgICAgIHRoaXMuX2dldFNvdXJjZUNvbnRlbnQoKSwgYFRoZSBDU1MgcHJvcGVydHkgd2FzIG5vdCBwYWlyZWQgd2l0aCBhIHN0eWxlIHZhbHVlYCxcbiAgICAgICAgICAgICAgcHJvcC5zdHJWYWx1ZSwgcHJvcC5pbmRleCwgcHJvcC5saW5lLCBwcm9wLmNvbHVtbiksXG4gICAgICAgICAgcHJvcCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3BhbiA9IHRoaXMuX2dlbmVyYXRlU291cmNlU3Bhbihwcm9wLCBlbmRUb2tlbik7XG4gICAgcmV0dXJuIG5ldyBDc3NEZWZpbml0aW9uQXN0KHNwYW4sIHByb3AsIHZhbHVlICEpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfYXNzZXJ0Q29uZGl0aW9uKHN0YXR1czogYm9vbGVhbiwgZXJyb3JNZXNzYWdlOiBzdHJpbmcsIHByb2JsZW1Ub2tlbjogQ3NzVG9rZW4pOiBib29sZWFuIHtcbiAgICBpZiAoIXN0YXR1cykge1xuICAgICAgdGhpcy5fZXJyb3IoZXJyb3JNZXNzYWdlLCBwcm9ibGVtVG9rZW4pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Vycm9yKG1lc3NhZ2U6IHN0cmluZywgcHJvYmxlbVRva2VuOiBDc3NUb2tlbikge1xuICAgIGNvbnN0IGxlbmd0aCA9IHByb2JsZW1Ub2tlbi5zdHJWYWx1ZS5sZW5ndGg7XG4gICAgY29uc3QgZXJyb3IgPSBDc3NQYXJzZUVycm9yLmNyZWF0ZShcbiAgICAgICAgdGhpcy5fZmlsZSwgMCwgcHJvYmxlbVRva2VuLmxpbmUsIHByb2JsZW1Ub2tlbi5jb2x1bW4sIGxlbmd0aCwgbWVzc2FnZSk7XG4gICAgdGhpcy5fZXJyb3JzLnB1c2goZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDc3NQYXJzZUVycm9yIGV4dGVuZHMgUGFyc2VFcnJvciB7XG4gIHN0YXRpYyBjcmVhdGUoXG4gICAgICBmaWxlOiBQYXJzZVNvdXJjZUZpbGUsIG9mZnNldDogbnVtYmVyLCBsaW5lOiBudW1iZXIsIGNvbDogbnVtYmVyLCBsZW5ndGg6IG51bWJlcixcbiAgICAgIGVyck1zZzogc3RyaW5nKTogQ3NzUGFyc2VFcnJvciB7XG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgUGFyc2VMb2NhdGlvbihmaWxlLCBvZmZzZXQsIGxpbmUsIGNvbCk7XG4gICAgY29uc3QgZW5kID0gbmV3IFBhcnNlTG9jYXRpb24oZmlsZSwgb2Zmc2V0LCBsaW5lLCBjb2wgKyBsZW5ndGgpO1xuICAgIGNvbnN0IHNwYW4gPSBuZXcgUGFyc2VTb3VyY2VTcGFuKHN0YXJ0LCBlbmQpO1xuICAgIHJldHVybiBuZXcgQ3NzUGFyc2VFcnJvcihzcGFuLCAnQ1NTIFBhcnNlIEVycm9yOiAnICsgZXJyTXNnKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHNwYW46IFBhcnNlU291cmNlU3BhbiwgbWVzc2FnZTogc3RyaW5nKSB7IHN1cGVyKHNwYW4sIG1lc3NhZ2UpOyB9XG59XG4iXX0=