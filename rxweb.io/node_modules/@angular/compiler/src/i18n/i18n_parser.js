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
        define("@angular/compiler/src/i18n/i18n_parser", ["require", "exports", "@angular/compiler/src/expression_parser/lexer", "@angular/compiler/src/expression_parser/parser", "@angular/compiler/src/ml_parser/ast", "@angular/compiler/src/ml_parser/html_tags", "@angular/compiler/src/i18n/i18n_ast", "@angular/compiler/src/i18n/serializers/placeholder"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lexer_1 = require("@angular/compiler/src/expression_parser/lexer");
    var parser_1 = require("@angular/compiler/src/expression_parser/parser");
    var html = require("@angular/compiler/src/ml_parser/ast");
    var html_tags_1 = require("@angular/compiler/src/ml_parser/html_tags");
    var i18n = require("@angular/compiler/src/i18n/i18n_ast");
    var placeholder_1 = require("@angular/compiler/src/i18n/serializers/placeholder");
    var _expParser = new parser_1.Parser(new lexer_1.Lexer());
    /**
     * Returns a function converting html nodes to an i18n Message given an interpolationConfig
     */
    function createI18nMessageFactory(interpolationConfig) {
        var visitor = new _I18nVisitor(_expParser, interpolationConfig);
        return function (nodes, meaning, description, id) {
            return visitor.toI18nMessage(nodes, meaning, description, id);
        };
    }
    exports.createI18nMessageFactory = createI18nMessageFactory;
    var _I18nVisitor = /** @class */ (function () {
        function _I18nVisitor(_expressionParser, _interpolationConfig) {
            this._expressionParser = _expressionParser;
            this._interpolationConfig = _interpolationConfig;
        }
        _I18nVisitor.prototype.toI18nMessage = function (nodes, meaning, description, id) {
            this._isIcu = nodes.length == 1 && nodes[0] instanceof html.Expansion;
            this._icuDepth = 0;
            this._placeholderRegistry = new placeholder_1.PlaceholderRegistry();
            this._placeholderToContent = {};
            this._placeholderToMessage = {};
            var i18nodes = html.visitAll(this, nodes, {});
            return new i18n.Message(i18nodes, this._placeholderToContent, this._placeholderToMessage, meaning, description, id);
        };
        _I18nVisitor.prototype.visitElement = function (el, context) {
            var children = html.visitAll(this, el.children);
            var attrs = {};
            el.attrs.forEach(function (attr) {
                // Do not visit the attributes, translatable ones are top-level ASTs
                attrs[attr.name] = attr.value;
            });
            var isVoid = html_tags_1.getHtmlTagDefinition(el.name).isVoid;
            var startPhName = this._placeholderRegistry.getStartTagPlaceholderName(el.name, attrs, isVoid);
            this._placeholderToContent[startPhName] = el.sourceSpan.toString();
            var closePhName = '';
            if (!isVoid) {
                closePhName = this._placeholderRegistry.getCloseTagPlaceholderName(el.name);
                this._placeholderToContent[closePhName] = "</" + el.name + ">";
            }
            return new i18n.TagPlaceholder(el.name, attrs, startPhName, closePhName, children, isVoid, el.sourceSpan);
        };
        _I18nVisitor.prototype.visitAttribute = function (attribute, context) {
            return this._visitTextWithInterpolation(attribute.value, attribute.sourceSpan);
        };
        _I18nVisitor.prototype.visitText = function (text, context) {
            return this._visitTextWithInterpolation(text.value, text.sourceSpan);
        };
        _I18nVisitor.prototype.visitComment = function (comment, context) { return null; };
        _I18nVisitor.prototype.visitExpansion = function (icu, context) {
            var _this = this;
            this._icuDepth++;
            var i18nIcuCases = {};
            var i18nIcu = new i18n.Icu(icu.switchValue, icu.type, i18nIcuCases, icu.sourceSpan);
            icu.cases.forEach(function (caze) {
                i18nIcuCases[caze.value] = new i18n.Container(caze.expression.map(function (node) { return node.visit(_this, {}); }), caze.expSourceSpan);
            });
            this._icuDepth--;
            if (this._isIcu || this._icuDepth > 0) {
                // Returns an ICU node when:
                // - the message (vs a part of the message) is an ICU message, or
                // - the ICU message is nested.
                var expPh = this._placeholderRegistry.getUniquePlaceholder("VAR_" + icu.type);
                i18nIcu.expressionPlaceholder = expPh;
                this._placeholderToContent[expPh] = icu.switchValue;
                return i18nIcu;
            }
            // Else returns a placeholder
            // ICU placeholders should not be replaced with their original content but with the their
            // translations. We need to create a new visitor (they are not re-entrant) to compute the
            // message id.
            // TODO(vicb): add a html.Node -> i18n.Message cache to avoid having to re-create the msg
            var phName = this._placeholderRegistry.getPlaceholderName('ICU', icu.sourceSpan.toString());
            var visitor = new _I18nVisitor(this._expressionParser, this._interpolationConfig);
            this._placeholderToMessage[phName] = visitor.toI18nMessage([icu], '', '', '');
            return new i18n.IcuPlaceholder(i18nIcu, phName, icu.sourceSpan);
        };
        _I18nVisitor.prototype.visitExpansionCase = function (icuCase, context) {
            throw new Error('Unreachable code');
        };
        _I18nVisitor.prototype._visitTextWithInterpolation = function (text, sourceSpan) {
            var splitInterpolation = this._expressionParser.splitInterpolation(text, sourceSpan.start.toString(), this._interpolationConfig);
            if (!splitInterpolation) {
                // No expression, return a single text
                return new i18n.Text(text, sourceSpan);
            }
            // Return a group of text + expressions
            var nodes = [];
            var container = new i18n.Container(nodes, sourceSpan);
            var _a = this._interpolationConfig, sDelimiter = _a.start, eDelimiter = _a.end;
            for (var i = 0; i < splitInterpolation.strings.length - 1; i++) {
                var expression = splitInterpolation.expressions[i];
                var baseName = _extractPlaceholderName(expression) || 'INTERPOLATION';
                var phName = this._placeholderRegistry.getPlaceholderName(baseName, expression);
                if (splitInterpolation.strings[i].length) {
                    // No need to add empty strings
                    nodes.push(new i18n.Text(splitInterpolation.strings[i], sourceSpan));
                }
                nodes.push(new i18n.Placeholder(expression, phName, sourceSpan));
                this._placeholderToContent[phName] = sDelimiter + expression + eDelimiter;
            }
            // The last index contains no expression
            var lastStringIdx = splitInterpolation.strings.length - 1;
            if (splitInterpolation.strings[lastStringIdx].length) {
                nodes.push(new i18n.Text(splitInterpolation.strings[lastStringIdx], sourceSpan));
            }
            return container;
        };
        return _I18nVisitor;
    }());
    var _CUSTOM_PH_EXP = /\/\/[\s\S]*i18n[\s\S]*\([\s\S]*ph[\s\S]*=[\s\S]*("|')([\s\S]*?)\1[\s\S]*\)/g;
    function _extractPlaceholderName(input) {
        return input.split(_CUSTOM_PH_EXP)[2];
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9wYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvaTE4bi9pMThuX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHVFQUFvRTtJQUNwRSx5RUFBdUU7SUFDdkUsMERBQXlDO0lBQ3pDLHVFQUE0RDtJQUk1RCwwREFBbUM7SUFDbkMsa0ZBQThEO0lBRTlELElBQU0sVUFBVSxHQUFHLElBQUksZUFBZ0IsQ0FBQyxJQUFJLGFBQWUsRUFBRSxDQUFDLENBQUM7SUFFL0Q7O09BRUc7SUFDSCxrQ0FBeUMsbUJBQXdDO1FBRS9FLElBQU0sT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBRWxFLE9BQU8sVUFBQyxLQUFrQixFQUFFLE9BQWUsRUFBRSxXQUFtQixFQUFFLEVBQVU7WUFDakUsT0FBQSxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQztRQUF0RCxDQUFzRCxDQUFDO0lBQ3BFLENBQUM7SUFORCw0REFNQztJQUVEO1FBWUUsc0JBQ1ksaUJBQW1DLEVBQ25DLG9CQUF5QztZQUR6QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1lBQ25DLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFBRyxDQUFDO1FBRWxELG9DQUFhLEdBQXBCLFVBQXFCLEtBQWtCLEVBQUUsT0FBZSxFQUFFLFdBQW1CLEVBQUUsRUFBVTtZQUV2RixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxv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Ii8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMZXhlciBhcyBFeHByZXNzaW9uTGV4ZXJ9IGZyb20gJy4uL2V4cHJlc3Npb25fcGFyc2VyL2xleGVyJztcbmltcG9ydCB7UGFyc2VyIGFzIEV4cHJlc3Npb25QYXJzZXJ9IGZyb20gJy4uL2V4cHJlc3Npb25fcGFyc2VyL3BhcnNlcic7XG5pbXBvcnQgKiBhcyBodG1sIGZyb20gJy4uL21sX3BhcnNlci9hc3QnO1xuaW1wb3J0IHtnZXRIdG1sVGFnRGVmaW5pdGlvbn0gZnJvbSAnLi4vbWxfcGFyc2VyL2h0bWxfdGFncyc7XG5pbXBvcnQge0ludGVycG9sYXRpb25Db25maWd9IGZyb20gJy4uL21sX3BhcnNlci9pbnRlcnBvbGF0aW9uX2NvbmZpZyc7XG5pbXBvcnQge1BhcnNlU291cmNlU3Bhbn0gZnJvbSAnLi4vcGFyc2VfdXRpbCc7XG5cbmltcG9ydCAqIGFzIGkxOG4gZnJvbSAnLi9pMThuX2FzdCc7XG5pbXBvcnQge1BsYWNlaG9sZGVyUmVnaXN0cnl9IGZyb20gJy4vc2VyaWFsaXplcnMvcGxhY2Vob2xkZXInO1xuXG5jb25zdCBfZXhwUGFyc2VyID0gbmV3IEV4cHJlc3Npb25QYXJzZXIobmV3IEV4cHJlc3Npb25MZXhlcigpKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gY29udmVydGluZyBodG1sIG5vZGVzIHRvIGFuIGkxOG4gTWVzc2FnZSBnaXZlbiBhbiBpbnRlcnBvbGF0aW9uQ29uZmlnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJMThuTWVzc2FnZUZhY3RvcnkoaW50ZXJwb2xhdGlvbkNvbmZpZzogSW50ZXJwb2xhdGlvbkNvbmZpZyk6IChcbiAgICBub2RlczogaHRtbC5Ob2RlW10sIG1lYW5pbmc6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgaWQ6IHN0cmluZykgPT4gaTE4bi5NZXNzYWdlIHtcbiAgY29uc3QgdmlzaXRvciA9IG5ldyBfSTE4blZpc2l0b3IoX2V4cFBhcnNlciwgaW50ZXJwb2xhdGlvbkNvbmZpZyk7XG5cbiAgcmV0dXJuIChub2RlczogaHRtbC5Ob2RlW10sIG1lYW5pbmc6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgaWQ6IHN0cmluZykgPT5cbiAgICAgICAgICAgICB2aXNpdG9yLnRvSTE4bk1lc3NhZ2Uobm9kZXMsIG1lYW5pbmcsIGRlc2NyaXB0aW9uLCBpZCk7XG59XG5cbmNsYXNzIF9JMThuVmlzaXRvciBpbXBsZW1lbnRzIGh0bWwuVmlzaXRvciB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9pc0ljdSAhOiBib29sZWFuO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfaWN1RGVwdGggITogbnVtYmVyO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfcGxhY2Vob2xkZXJSZWdpc3RyeSAhOiBQbGFjZWhvbGRlclJlZ2lzdHJ5O1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfcGxhY2Vob2xkZXJUb0NvbnRlbnQgIToge1twaE5hbWU6IHN0cmluZ106IHN0cmluZ307XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9wbGFjZWhvbGRlclRvTWVzc2FnZSAhOiB7W3BoTmFtZTogc3RyaW5nXTogaTE4bi5NZXNzYWdlfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2V4cHJlc3Npb25QYXJzZXI6IEV4cHJlc3Npb25QYXJzZXIsXG4gICAgICBwcml2YXRlIF9pbnRlcnBvbGF0aW9uQ29uZmlnOiBJbnRlcnBvbGF0aW9uQ29uZmlnKSB7fVxuXG4gIHB1YmxpYyB0b0kxOG5NZXNzYWdlKG5vZGVzOiBodG1sLk5vZGVbXSwgbWVhbmluZzogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBpZDogc3RyaW5nKTpcbiAgICAgIGkxOG4uTWVzc2FnZSB7XG4gICAgdGhpcy5faXNJY3UgPSBub2Rlcy5sZW5ndGggPT0gMSAmJiBub2Rlc1swXSBpbnN0YW5jZW9mIGh0bWwuRXhwYW5zaW9uO1xuICAgIHRoaXMuX2ljdURlcHRoID0gMDtcbiAgICB0aGlzLl9wbGFjZWhvbGRlclJlZ2lzdHJ5ID0gbmV3IFBsYWNlaG9sZGVyUmVnaXN0cnkoKTtcbiAgICB0aGlzLl9wbGFjZWhvbGRlclRvQ29udGVudCA9IHt9O1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyVG9NZXNzYWdlID0ge307XG5cbiAgICBjb25zdCBpMThub2RlczogaTE4bi5Ob2RlW10gPSBodG1sLnZpc2l0QWxsKHRoaXMsIG5vZGVzLCB7fSk7XG5cbiAgICByZXR1cm4gbmV3IGkxOG4uTWVzc2FnZShcbiAgICAgICAgaTE4bm9kZXMsIHRoaXMuX3BsYWNlaG9sZGVyVG9Db250ZW50LCB0aGlzLl9wbGFjZWhvbGRlclRvTWVzc2FnZSwgbWVhbmluZywgZGVzY3JpcHRpb24sIGlkKTtcbiAgfVxuXG4gIHZpc2l0RWxlbWVudChlbDogaHRtbC5FbGVtZW50LCBjb250ZXh0OiBhbnkpOiBpMThuLk5vZGUge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gaHRtbC52aXNpdEFsbCh0aGlzLCBlbC5jaGlsZHJlbik7XG4gICAgY29uc3QgYXR0cnM6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIGVsLmF0dHJzLmZvckVhY2goYXR0ciA9PiB7XG4gICAgICAvLyBEbyBub3QgdmlzaXQgdGhlIGF0dHJpYnV0ZXMsIHRyYW5zbGF0YWJsZSBvbmVzIGFyZSB0b3AtbGV2ZWwgQVNUc1xuICAgICAgYXR0cnNbYXR0ci5uYW1lXSA9IGF0dHIudmFsdWU7XG4gICAgfSk7XG5cbiAgICBjb25zdCBpc1ZvaWQ6IGJvb2xlYW4gPSBnZXRIdG1sVGFnRGVmaW5pdGlvbihlbC5uYW1lKS5pc1ZvaWQ7XG4gICAgY29uc3Qgc3RhcnRQaE5hbWUgPVxuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlclJlZ2lzdHJ5LmdldFN0YXJ0VGFnUGxhY2Vob2xkZXJOYW1lKGVsLm5hbWUsIGF0dHJzLCBpc1ZvaWQpO1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyVG9Db250ZW50W3N0YXJ0UGhOYW1lXSA9IGVsLnNvdXJjZVNwYW4gIS50b1N0cmluZygpO1xuXG4gICAgbGV0IGNsb3NlUGhOYW1lID0gJyc7XG5cbiAgICBpZiAoIWlzVm9pZCkge1xuICAgICAgY2xvc2VQaE5hbWUgPSB0aGlzLl9wbGFjZWhvbGRlclJlZ2lzdHJ5LmdldENsb3NlVGFnUGxhY2Vob2xkZXJOYW1lKGVsLm5hbWUpO1xuICAgICAgdGhpcy5fcGxhY2Vob2xkZXJUb0NvbnRlbnRbY2xvc2VQaE5hbWVdID0gYDwvJHtlbC5uYW1lfT5gO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgaTE4bi5UYWdQbGFjZWhvbGRlcihcbiAgICAgICAgZWwubmFtZSwgYXR0cnMsIHN0YXJ0UGhOYW1lLCBjbG9zZVBoTmFtZSwgY2hpbGRyZW4sIGlzVm9pZCwgZWwuc291cmNlU3BhbiAhKTtcbiAgfVxuXG4gIHZpc2l0QXR0cmlidXRlKGF0dHJpYnV0ZTogaHRtbC5BdHRyaWJ1dGUsIGNvbnRleHQ6IGFueSk6IGkxOG4uTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX3Zpc2l0VGV4dFdpdGhJbnRlcnBvbGF0aW9uKGF0dHJpYnV0ZS52YWx1ZSwgYXR0cmlidXRlLnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXRUZXh0KHRleHQ6IGh0bWwuVGV4dCwgY29udGV4dDogYW55KTogaTE4bi5Ob2RlIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzaXRUZXh0V2l0aEludGVycG9sYXRpb24odGV4dC52YWx1ZSwgdGV4dC5zb3VyY2VTcGFuICEpO1xuICB9XG5cbiAgdmlzaXRDb21tZW50KGNvbW1lbnQ6IGh0bWwuQ29tbWVudCwgY29udGV4dDogYW55KTogaTE4bi5Ob2RlfG51bGwgeyByZXR1cm4gbnVsbDsgfVxuXG4gIHZpc2l0RXhwYW5zaW9uKGljdTogaHRtbC5FeHBhbnNpb24sIGNvbnRleHQ6IGFueSk6IGkxOG4uTm9kZSB7XG4gICAgdGhpcy5faWN1RGVwdGgrKztcbiAgICBjb25zdCBpMThuSWN1Q2FzZXM6IHtbazogc3RyaW5nXTogaTE4bi5Ob2RlfSA9IHt9O1xuICAgIGNvbnN0IGkxOG5JY3UgPSBuZXcgaTE4bi5JY3UoaWN1LnN3aXRjaFZhbHVlLCBpY3UudHlwZSwgaTE4bkljdUNhc2VzLCBpY3Uuc291cmNlU3Bhbik7XG4gICAgaWN1LmNhc2VzLmZvckVhY2goKGNhemUpOiB2b2lkID0+IHtcbiAgICAgIGkxOG5JY3VDYXNlc1tjYXplLnZhbHVlXSA9IG5ldyBpMThuLkNvbnRhaW5lcihcbiAgICAgICAgICBjYXplLmV4cHJlc3Npb24ubWFwKChub2RlKSA9PiBub2RlLnZpc2l0KHRoaXMsIHt9KSksIGNhemUuZXhwU291cmNlU3Bhbik7XG4gICAgfSk7XG4gICAgdGhpcy5faWN1RGVwdGgtLTtcblxuICAgIGlmICh0aGlzLl9pc0ljdSB8fCB0aGlzLl9pY3VEZXB0aCA+IDApIHtcbiAgICAgIC8vIFJldHVybnMgYW4gSUNVIG5vZGUgd2hlbjpcbiAgICAgIC8vIC0gdGhlIG1lc3NhZ2UgKHZzIGEgcGFydCBvZiB0aGUgbWVzc2FnZSkgaXMgYW4gSUNVIG1lc3NhZ2UsIG9yXG4gICAgICAvLyAtIHRoZSBJQ1UgbWVzc2FnZSBpcyBuZXN0ZWQuXG4gICAgICBjb25zdCBleHBQaCA9IHRoaXMuX3BsYWNlaG9sZGVyUmVnaXN0cnkuZ2V0VW5pcXVlUGxhY2Vob2xkZXIoYFZBUl8ke2ljdS50eXBlfWApO1xuICAgICAgaTE4bkljdS5leHByZXNzaW9uUGxhY2Vob2xkZXIgPSBleHBQaDtcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyVG9Db250ZW50W2V4cFBoXSA9IGljdS5zd2l0Y2hWYWx1ZTtcblxuICAgICAgcmV0dXJuIGkxOG5JY3U7XG4gICAgfVxuXG4gICAgLy8gRWxzZSByZXR1cm5zIGEgcGxhY2Vob2xkZXJcbiAgICAvLyBJQ1UgcGxhY2Vob2xkZXJzIHNob3VsZCBub3QgYmUgcmVwbGFjZWQgd2l0aCB0aGVpciBvcmlnaW5hbCBjb250ZW50IGJ1dCB3aXRoIHRoZSB0aGVpclxuICAgIC8vIHRyYW5zbGF0aW9ucy4gV2UgbmVlZCB0byBjcmVhdGUgYSBuZXcgdmlzaXRvciAodGhleSBhcmUgbm90IHJlLWVudHJhbnQpIHRvIGNvbXB1dGUgdGhlXG4gICAgLy8gbWVzc2FnZSBpZC5cbiAgICAvLyBUT0RPKHZpY2IpOiBhZGQgYSBodG1sLk5vZGUgLT4gaTE4bi5NZXNzYWdlIGNhY2hlIHRvIGF2b2lkIGhhdmluZyB0byByZS1jcmVhdGUgdGhlIG1zZ1xuICAgIGNvbnN0IHBoTmFtZSA9IHRoaXMuX3BsYWNlaG9sZGVyUmVnaXN0cnkuZ2V0UGxhY2Vob2xkZXJOYW1lKCdJQ1UnLCBpY3Uuc291cmNlU3Bhbi50b1N0cmluZygpKTtcbiAgICBjb25zdCB2aXNpdG9yID0gbmV3IF9JMThuVmlzaXRvcih0aGlzLl9leHByZXNzaW9uUGFyc2VyLCB0aGlzLl9pbnRlcnBvbGF0aW9uQ29uZmlnKTtcbiAgICB0aGlzLl9wbGFjZWhvbGRlclRvTWVzc2FnZVtwaE5hbWVdID0gdmlzaXRvci50b0kxOG5NZXNzYWdlKFtpY3VdLCAnJywgJycsICcnKTtcbiAgICByZXR1cm4gbmV3IGkxOG4uSWN1UGxhY2Vob2xkZXIoaTE4bkljdSwgcGhOYW1lLCBpY3Uuc291cmNlU3Bhbik7XG4gIH1cblxuICB2aXNpdEV4cGFuc2lvbkNhc2UoaWN1Q2FzZTogaHRtbC5FeHBhbnNpb25DYXNlLCBjb250ZXh0OiBhbnkpOiBpMThuLk5vZGUge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5yZWFjaGFibGUgY29kZScpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlzaXRUZXh0V2l0aEludGVycG9sYXRpb24odGV4dDogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pOiBpMThuLk5vZGUge1xuICAgIGNvbnN0IHNwbGl0SW50ZXJwb2xhdGlvbiA9IHRoaXMuX2V4cHJlc3Npb25QYXJzZXIuc3BsaXRJbnRlcnBvbGF0aW9uKFxuICAgICAgICB0ZXh0LCBzb3VyY2VTcGFuLnN0YXJ0LnRvU3RyaW5nKCksIHRoaXMuX2ludGVycG9sYXRpb25Db25maWcpO1xuXG4gICAgaWYgKCFzcGxpdEludGVycG9sYXRpb24pIHtcbiAgICAgIC8vIE5vIGV4cHJlc3Npb24sIHJldHVybiBhIHNpbmdsZSB0ZXh0XG4gICAgICByZXR1cm4gbmV3IGkxOG4uVGV4dCh0ZXh0LCBzb3VyY2VTcGFuKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSBncm91cCBvZiB0ZXh0ICsgZXhwcmVzc2lvbnNcbiAgICBjb25zdCBub2RlczogaTE4bi5Ob2RlW10gPSBbXTtcbiAgICBjb25zdCBjb250YWluZXIgPSBuZXcgaTE4bi5Db250YWluZXIobm9kZXMsIHNvdXJjZVNwYW4pO1xuICAgIGNvbnN0IHtzdGFydDogc0RlbGltaXRlciwgZW5kOiBlRGVsaW1pdGVyfSA9IHRoaXMuX2ludGVycG9sYXRpb25Db25maWc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0SW50ZXJwb2xhdGlvbi5zdHJpbmdzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgY29uc3QgZXhwcmVzc2lvbiA9IHNwbGl0SW50ZXJwb2xhdGlvbi5leHByZXNzaW9uc1tpXTtcbiAgICAgIGNvbnN0IGJhc2VOYW1lID0gX2V4dHJhY3RQbGFjZWhvbGRlck5hbWUoZXhwcmVzc2lvbikgfHwgJ0lOVEVSUE9MQVRJT04nO1xuICAgICAgY29uc3QgcGhOYW1lID0gdGhpcy5fcGxhY2Vob2xkZXJSZWdpc3RyeS5nZXRQbGFjZWhvbGRlck5hbWUoYmFzZU5hbWUsIGV4cHJlc3Npb24pO1xuXG4gICAgICBpZiAoc3BsaXRJbnRlcnBvbGF0aW9uLnN0cmluZ3NbaV0ubGVuZ3RoKSB7XG4gICAgICAgIC8vIE5vIG5lZWQgdG8gYWRkIGVtcHR5IHN0cmluZ3NcbiAgICAgICAgbm9kZXMucHVzaChuZXcgaTE4bi5UZXh0KHNwbGl0SW50ZXJwb2xhdGlvbi5zdHJpbmdzW2ldLCBzb3VyY2VTcGFuKSk7XG4gICAgICB9XG5cbiAgICAgIG5vZGVzLnB1c2gobmV3IGkxOG4uUGxhY2Vob2xkZXIoZXhwcmVzc2lvbiwgcGhOYW1lLCBzb3VyY2VTcGFuKSk7XG4gICAgICB0aGlzLl9wbGFjZWhvbGRlclRvQ29udGVudFtwaE5hbWVdID0gc0RlbGltaXRlciArIGV4cHJlc3Npb24gKyBlRGVsaW1pdGVyO1xuICAgIH1cblxuICAgIC8vIFRoZSBsYXN0IGluZGV4IGNvbnRhaW5zIG5vIGV4cHJlc3Npb25cbiAgICBjb25zdCBsYXN0U3RyaW5nSWR4ID0gc3BsaXRJbnRlcnBvbGF0aW9uLnN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgICBpZiAoc3BsaXRJbnRlcnBvbGF0aW9uLnN0cmluZ3NbbGFzdFN0cmluZ0lkeF0ubGVuZ3RoKSB7XG4gICAgICBub2Rlcy5wdXNoKG5ldyBpMThuLlRleHQoc3BsaXRJbnRlcnBvbGF0aW9uLnN0cmluZ3NbbGFzdFN0cmluZ0lkeF0sIHNvdXJjZVNwYW4pKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgfVxufVxuXG5jb25zdCBfQ1VTVE9NX1BIX0VYUCA9XG4gICAgL1xcL1xcL1tcXHNcXFNdKmkxOG5bXFxzXFxTXSpcXChbXFxzXFxTXSpwaFtcXHNcXFNdKj1bXFxzXFxTXSooXCJ8JykoW1xcc1xcU10qPylcXDFbXFxzXFxTXSpcXCkvZztcblxuZnVuY3Rpb24gX2V4dHJhY3RQbGFjZWhvbGRlck5hbWUoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBpbnB1dC5zcGxpdChfQ1VTVE9NX1BIX0VYUClbMl07XG59XG4iXX0=