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
        define("@angular/compiler/src/i18n/serializers/xliff", ["require", "exports", "tslib", "@angular/compiler/src/ml_parser/ast", "@angular/compiler/src/ml_parser/xml_parser", "@angular/compiler/src/i18n/digest", "@angular/compiler/src/i18n/i18n_ast", "@angular/compiler/src/i18n/parse_util", "@angular/compiler/src/i18n/serializers/serializer", "@angular/compiler/src/i18n/serializers/xml_helper"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var ml = require("@angular/compiler/src/ml_parser/ast");
    var xml_parser_1 = require("@angular/compiler/src/ml_parser/xml_parser");
    var digest_1 = require("@angular/compiler/src/i18n/digest");
    var i18n = require("@angular/compiler/src/i18n/i18n_ast");
    var parse_util_1 = require("@angular/compiler/src/i18n/parse_util");
    var serializer_1 = require("@angular/compiler/src/i18n/serializers/serializer");
    var xml = require("@angular/compiler/src/i18n/serializers/xml_helper");
    var _VERSION = '1.2';
    var _XMLNS = 'urn:oasis:names:tc:xliff:document:1.2';
    // TODO(vicb): make this a param (s/_/-/)
    var _DEFAULT_SOURCE_LANG = 'en';
    var _PLACEHOLDER_TAG = 'x';
    var _MARKER_TAG = 'mrk';
    var _FILE_TAG = 'file';
    var _SOURCE_TAG = 'source';
    var _SEGMENT_SOURCE_TAG = 'seg-source';
    var _TARGET_TAG = 'target';
    var _UNIT_TAG = 'trans-unit';
    var _CONTEXT_GROUP_TAG = 'context-group';
    var _CONTEXT_TAG = 'context';
    // http://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html
    // http://docs.oasis-open.org/xliff/v1.2/xliff-profile-html/xliff-profile-html-1.2.html
    var Xliff = /** @class */ (function (_super) {
        tslib_1.__extends(Xliff, _super);
        function Xliff() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Xliff.prototype.write = function (messages, locale) {
            var visitor = new _WriteVisitor();
            var transUnits = [];
            messages.forEach(function (message) {
                var _a;
                var contextTags = [];
                message.sources.forEach(function (source) {
                    var contextGroupTag = new xml.Tag(_CONTEXT_GROUP_TAG, { purpose: 'location' });
                    contextGroupTag.children.push(new xml.CR(10), new xml.Tag(_CONTEXT_TAG, { 'context-type': 'sourcefile' }, [new xml.Text(source.filePath)]), new xml.CR(10), new xml.Tag(_CONTEXT_TAG, { 'context-type': 'linenumber' }, [new xml.Text("" + source.startLine)]), new xml.CR(8));
                    contextTags.push(new xml.CR(8), contextGroupTag);
                });
                var transUnit = new xml.Tag(_UNIT_TAG, { id: message.id, datatype: 'html' });
                (_a = transUnit.children).push.apply(_a, tslib_1.__spread([new xml.CR(8), new xml.Tag(_SOURCE_TAG, {}, visitor.serialize(message.nodes))], contextTags));
                if (message.description) {
                    transUnit.children.push(new xml.CR(8), new xml.Tag('note', { priority: '1', from: 'description' }, [new xml.Text(message.description)]));
                }
                if (message.meaning) {
                    transUnit.children.push(new xml.CR(8), new xml.Tag('note', { priority: '1', from: 'meaning' }, [new xml.Text(message.meaning)]));
                }
                transUnit.children.push(new xml.CR(6));
                transUnits.push(new xml.CR(6), transUnit);
            });
            var body = new xml.Tag('body', {}, tslib_1.__spread(transUnits, [new xml.CR(4)]));
            var file = new xml.Tag('file', {
                'source-language': locale || _DEFAULT_SOURCE_LANG,
                datatype: 'plaintext',
                original: 'ng2.template',
            }, [new xml.CR(4), body, new xml.CR(2)]);
            var xliff = new xml.Tag('xliff', { version: _VERSION, xmlns: _XMLNS }, [new xml.CR(2), file, new xml.CR()]);
            return xml.serialize([
                new xml.Declaration({ version: '1.0', encoding: 'UTF-8' }), new xml.CR(), xliff, new xml.CR()
            ]);
        };
        Xliff.prototype.load = function (content, url) {
            // xliff to xml nodes
            var xliffParser = new XliffParser();
            var _a = xliffParser.parse(content, url), locale = _a.locale, msgIdToHtml = _a.msgIdToHtml, errors = _a.errors;
            // xml nodes to i18n nodes
            var i18nNodesByMsgId = {};
            var converter = new XmlToI18n();
            Object.keys(msgIdToHtml).forEach(function (msgId) {
                var _a = converter.convert(msgIdToHtml[msgId], url), i18nNodes = _a.i18nNodes, e = _a.errors;
                errors.push.apply(errors, tslib_1.__spread(e));
                i18nNodesByMsgId[msgId] = i18nNodes;
            });
            if (errors.length) {
                throw new Error("xliff parse errors:\n" + errors.join('\n'));
            }
            return { locale: locale, i18nNodesByMsgId: i18nNodesByMsgId };
        };
        Xliff.prototype.digest = function (message) { return digest_1.digest(message); };
        return Xliff;
    }(serializer_1.Serializer));
    exports.Xliff = Xliff;
    var _WriteVisitor = /** @class */ (function () {
        function _WriteVisitor() {
        }
        _WriteVisitor.prototype.visitText = function (text, context) { return [new xml.Text(text.value)]; };
        _WriteVisitor.prototype.visitContainer = function (container, context) {
            var _this = this;
            var nodes = [];
            container.children.forEach(function (node) { return nodes.push.apply(nodes, tslib_1.__spread(node.visit(_this))); });
            return nodes;
        };
        _WriteVisitor.prototype.visitIcu = function (icu, context) {
            var _this = this;
            var nodes = [new xml.Text("{" + icu.expressionPlaceholder + ", " + icu.type + ", ")];
            Object.keys(icu.cases).forEach(function (c) {
                nodes.push.apply(nodes, tslib_1.__spread([new xml.Text(c + " {")], icu.cases[c].visit(_this), [new xml.Text("} ")]));
            });
            nodes.push(new xml.Text("}"));
            return nodes;
        };
        _WriteVisitor.prototype.visitTagPlaceholder = function (ph, context) {
            var ctype = getCtypeForTag(ph.tag);
            if (ph.isVoid) {
                // void tags have no children nor closing tags
                return [new xml.Tag(_PLACEHOLDER_TAG, { id: ph.startName, ctype: ctype, 'equiv-text': "<" + ph.tag + "/>" })];
            }
            var startTagPh = new xml.Tag(_PLACEHOLDER_TAG, { id: ph.startName, ctype: ctype, 'equiv-text': "<" + ph.tag + ">" });
            var closeTagPh = new xml.Tag(_PLACEHOLDER_TAG, { id: ph.closeName, ctype: ctype, 'equiv-text': "</" + ph.tag + ">" });
            return tslib_1.__spread([startTagPh], this.serialize(ph.children), [closeTagPh]);
        };
        _WriteVisitor.prototype.visitPlaceholder = function (ph, context) {
            return [new xml.Tag(_PLACEHOLDER_TAG, { id: ph.name, 'equiv-text': "{{" + ph.value + "}}" })];
        };
        _WriteVisitor.prototype.visitIcuPlaceholder = function (ph, context) {
            var equivText = "{" + ph.value.expression + ", " + ph.value.type + ", " + Object.keys(ph.value.cases).map(function (value) { return value + ' {...}'; }).join(' ') + "}";
            return [new xml.Tag(_PLACEHOLDER_TAG, { id: ph.name, 'equiv-text': equivText })];
        };
        _WriteVisitor.prototype.serialize = function (nodes) {
            var _this = this;
            return [].concat.apply([], tslib_1.__spread(nodes.map(function (node) { return node.visit(_this); })));
        };
        return _WriteVisitor;
    }());
    // TODO(vicb): add error management (structure)
    // Extract messages as xml nodes from the xliff file
    var XliffParser = /** @class */ (function () {
        function XliffParser() {
            this._locale = null;
        }
        XliffParser.prototype.parse = function (xliff, url) {
            this._unitMlString = null;
            this._msgIdToHtml = {};
            var xml = new xml_parser_1.XmlParser().parse(xliff, url, false);
            this._errors = xml.errors;
            ml.visitAll(this, xml.rootNodes, null);
            return {
                msgIdToHtml: this._msgIdToHtml,
                errors: this._errors,
                locale: this._locale,
            };
        };
        XliffParser.prototype.visitElement = function (element, context) {
            switch (element.name) {
                case _UNIT_TAG:
                    this._unitMlString = null;
                    var idAttr = element.attrs.find(function (attr) { return attr.name === 'id'; });
                    if (!idAttr) {
                        this._addError(element, "<" + _UNIT_TAG + "> misses the \"id\" attribute");
                    }
                    else {
                        var id = idAttr.value;
                        if (this._msgIdToHtml.hasOwnProperty(id)) {
                            this._addError(element, "Duplicated translations for msg " + id);
                        }
                        else {
                            ml.visitAll(this, element.children, null);
                            if (typeof this._unitMlString === 'string') {
                                this._msgIdToHtml[id] = this._unitMlString;
                            }
                            else {
                                this._addError(element, "Message " + id + " misses a translation");
                            }
                        }
                    }
                    break;
                // ignore those tags
                case _SOURCE_TAG:
                case _SEGMENT_SOURCE_TAG:
                    break;
                case _TARGET_TAG:
                    var innerTextStart = element.startSourceSpan.end.offset;
                    var innerTextEnd = element.endSourceSpan.start.offset;
                    var content = element.startSourceSpan.start.file.content;
                    var innerText = content.slice(innerTextStart, innerTextEnd);
                    this._unitMlString = innerText;
                    break;
                case _FILE_TAG:
                    var localeAttr = element.attrs.find(function (attr) { return attr.name === 'target-language'; });
                    if (localeAttr) {
                        this._locale = localeAttr.value;
                    }
                    ml.visitAll(this, element.children, null);
                    break;
                default:
                    // TODO(vicb): assert file structure, xliff version
                    // For now only recurse on unhandled nodes
                    ml.visitAll(this, element.children, null);
            }
        };
        XliffParser.prototype.visitAttribute = function (attribute, context) { };
        XliffParser.prototype.visitText = function (text, context) { };
        XliffParser.prototype.visitComment = function (comment, context) { };
        XliffParser.prototype.visitExpansion = function (expansion, context) { };
        XliffParser.prototype.visitExpansionCase = function (expansionCase, context) { };
        XliffParser.prototype._addError = function (node, message) {
            this._errors.push(new parse_util_1.I18nError(node.sourceSpan, message));
        };
        return XliffParser;
    }());
    // Convert ml nodes (xliff syntax) to i18n nodes
    var XmlToI18n = /** @class */ (function () {
        function XmlToI18n() {
        }
        XmlToI18n.prototype.convert = function (message, url) {
            var xmlIcu = new xml_parser_1.XmlParser().parse(message, url, true);
            this._errors = xmlIcu.errors;
            var i18nNodes = this._errors.length > 0 || xmlIcu.rootNodes.length == 0 ?
                [] : [].concat.apply([], tslib_1.__spread(ml.visitAll(this, xmlIcu.rootNodes)));
            return {
                i18nNodes: i18nNodes,
                errors: this._errors,
            };
        };
        XmlToI18n.prototype.visitText = function (text, context) { return new i18n.Text(text.value, text.sourceSpan); };
        XmlToI18n.prototype.visitElement = function (el, context) {
            if (el.name === _PLACEHOLDER_TAG) {
                var nameAttr = el.attrs.find(function (attr) { return attr.name === 'id'; });
                if (nameAttr) {
                    return new i18n.Placeholder('', nameAttr.value, el.sourceSpan);
                }
                this._addError(el, "<" + _PLACEHOLDER_TAG + "> misses the \"id\" attribute");
                return null;
            }
            if (el.name === _MARKER_TAG) {
                return [].concat.apply([], tslib_1.__spread(ml.visitAll(this, el.children)));
            }
            this._addError(el, "Unexpected tag");
            return null;
        };
        XmlToI18n.prototype.visitExpansion = function (icu, context) {
            var caseMap = {};
            ml.visitAll(this, icu.cases).forEach(function (c) {
                caseMap[c.value] = new i18n.Container(c.nodes, icu.sourceSpan);
            });
            return new i18n.Icu(icu.switchValue, icu.type, caseMap, icu.sourceSpan);
        };
        XmlToI18n.prototype.visitExpansionCase = function (icuCase, context) {
            return {
                value: icuCase.value,
                nodes: ml.visitAll(this, icuCase.expression),
            };
        };
        XmlToI18n.prototype.visitComment = function (comment, context) { };
        XmlToI18n.prototype.visitAttribute = function (attribute, context) { };
        XmlToI18n.prototype._addError = function (node, message) {
            this._errors.push(new parse_util_1.I18nError(node.sourceSpan, message));
        };
        return XmlToI18n;
    }());
    function getCtypeForTag(tag) {
        switch (tag.toLowerCase()) {
            case 'br':
                return 'lb';
            case 'img':
                return 'image';
            default:
                return "x-" + tag;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvaTE4bi9zZXJpYWxpemVycy94bGlmZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFFSCx3REFBMEM7SUFDMUMseUVBQXFEO0lBQ3JELDREQUFpQztJQUNqQywwREFBb0M7SUFDcEMsb0VBQXdDO0lBRXhDLGdGQUF3QztJQUN4Qyx1RUFBb0M7SUFFcEMsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLElBQU0sTUFBTSxHQUFHLHVDQUF1QyxDQUFDO0lBQ3ZELHlDQUF5QztJQUN6QyxJQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQztJQUNsQyxJQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztJQUM3QixJQUFNLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFFMUIsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQztJQUM3QixJQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQztJQUN6QyxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUM7SUFDN0IsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDO0lBQy9CLElBQU0sa0JBQWtCLEdBQUcsZUFBZSxDQUFDO0lBQzNDLElBQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQztJQUUvQiwyREFBMkQ7SUFDM0QsdUZBQXVGO0lBQ3ZGO1FBQTJCLGlDQUFVO1FBQXJDOztRQW1GQSxDQUFDO1FBbEZDLHFCQUFLLEdBQUwsVUFBTSxRQUF3QixFQUFFLE1BQW1CO1lBQ2pELElBQU0sT0FBTyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFDcEMsSUFBTSxVQUFVLEdBQWUsRUFBRSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPOztnQkFDdEIsSUFBSSxXQUFXLEdBQWUs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LENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVELHNDQUFrQixHQUFsQixVQUFtQixPQUF5QixFQUFFLE9BQVk7WUFDeEQsT0FBTztnQkFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0JBQ3BCLEtBQUssRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDO2FBQzdDLENBQUM7UUFDSixDQUFDO1FBRUQsZ0NBQVksR0FBWixVQUFhLE9BQW1CLEVBQUUsT0FBWSxJQUFHLENBQUM7UUFFbEQsa0NBQWMsR0FBZCxVQUFlLFNBQXVCLEVBQUUsT0FBWSxJQUFHLENBQUM7UUFFaEQsNkJBQVMsR0FBakIsVUFBa0IsSUFBYSxFQUFFLE9BQWU7WUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxzQkFBUyxDQUFDLElBQUksQ0FBQyxVQUFZLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQ0gsZ0JBQUM7SUFBRCxDQUFDLEFBL0RELElBK0RDO0lBRUQsd0JBQXdCLEdBQVc7UUFDakMsUUFBUSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDekIsS0FBSyxJQUFJO2dCQUNQLE9BQU8sSUFBSSxDQUFDO1lBQ2QsS0FBSyxLQUFLO2dCQUNSLE9BQU8sT0FBTyxDQUFDO1lBQ2pCO2dCQUNFLE9BQU8sT0FBSyxHQUFLLENBQUM7U0FDckI7SUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyBtbCBmcm9tICcuLi8uLi9tbF9wYXJzZXIvYXN0JztcbmltcG9ydCB7WG1sUGFyc2VyfSBmcm9tICcuLi8uLi9tbF9wYXJzZXIveG1sX3BhcnNlcic7XG5pbXBvcnQge2RpZ2VzdH0gZnJvbSAnLi4vZGlnZXN0JztcbmltcG9ydCAqIGFzIGkxOG4gZnJvbSAnLi4vaTE4bl9hc3QnO1xuaW1wb3J0IHtJMThuRXJyb3J9IGZyb20gJy4uL3BhcnNlX3V0aWwnO1xuXG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gJy4vc2VyaWFsaXplcic7XG5pbXBvcnQgKiBhcyB4bWwgZnJvbSAnLi94bWxfaGVscGVyJztcblxuY29uc3QgX1ZFUlNJT04gPSAnMS4yJztcbmNvbnN0IF9YTUxOUyA9ICd1cm46b2FzaXM6bmFtZXM6dGM6eGxpZmY6ZG9jdW1lbnQ6MS4yJztcbi8vIFRPRE8odmljYik6IG1ha2UgdGhpcyBhIHBhcmFtIChzL18vLS8pXG5jb25zdCBfREVGQVVMVF9TT1VSQ0VfTEFORyA9ICdlbic7XG5jb25zdCBfUExBQ0VIT0xERVJfVEFHID0gJ3gnO1xuY29uc3QgX01BUktFUl9UQUcgPSAnbXJrJztcblxuY29uc3QgX0ZJTEVfVEFHID0gJ2ZpbGUnO1xuY29uc3QgX1NPVVJDRV9UQUcgPSAnc291cmNlJztcbmNvbnN0IF9TRUdNRU5UX1NPVVJDRV9UQUcgPSAnc2VnLXNvdXJjZSc7XG5jb25zdCBfVEFSR0VUX1RBRyA9ICd0YXJnZXQnO1xuY29uc3QgX1VOSVRfVEFHID0gJ3RyYW5zLXVuaXQnO1xuY29uc3QgX0NPTlRFWFRfR1JPVVBfVEFHID0gJ2NvbnRleHQtZ3JvdXAnO1xuY29uc3QgX0NPTlRFWFRfVEFHID0gJ2NvbnRleHQnO1xuXG4vLyBodHRwOi8vZG9jcy5vYXNpcy1vcGVuLm9yZy94bGlmZi92MS4yL29zL3hsaWZmLWNvcmUuaHRtbFxuLy8gaHR0cDovL2RvY3Mub2FzaXMtb3Blbi5vcmcveGxpZmYvdjEuMi94bGlmZi1wcm9maWxlLWh0bWwveGxpZmYtcHJvZmlsZS1odG1sLTEuMi5odG1sXG5leHBvcnQgY2xhc3MgWGxpZmYgZXh0ZW5kcyBTZXJpYWxpemVyIHtcbiAgd3JpdGUobWVzc2FnZXM6IGkxOG4uTWVzc2FnZVtdLCBsb2NhbGU6IHN0cmluZ3xudWxsKTogc3RyaW5nIHtcbiAgICBjb25zdCB2aXNpdG9yID0gbmV3IF9Xcml0ZVZpc2l0b3IoKTtcbiAgICBjb25zdCB0cmFuc1VuaXRzOiB4bWwuTm9kZVtdID0gW107XG5cbiAgICBtZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgbGV0IGNvbnRleHRUYWdzOiB4bWwuTm9kZVtdID0gW107XG4gICAgICBtZXNzYWdlLnNvdXJjZXMuZm9yRWFjaCgoc291cmNlOiBpMThuLk1lc3NhZ2VTcGFuKSA9PiB7XG4gICAgICAgIGxldCBjb250ZXh0R3JvdXBUYWcgPSBuZXcgeG1sLlRhZyhfQ09OVEVYVF9HUk9VUF9UQUcsIHtwdXJwb3NlOiAnbG9jYXRpb24nfSk7XG4gICAgICAgIGNvbnRleHRHcm91cFRhZy5jaGlsZHJlbi5wdXNoKFxuICAgICAgICAgICAgbmV3IHhtbC5DUigxMCksXG4gICAgICAgICAgICBuZXcgeG1sLlRhZyhcbiAgICAgICAgICAgICAgICBfQ09OVEVYVF9UQUcsIHsnY29udGV4dC10eXBlJzogJ3NvdXJjZWZpbGUnfSwgW25ldyB4bWwuVGV4dChzb3VyY2UuZmlsZVBhdGgpXSksXG4gICAgICAgICAgICBuZXcgeG1sLkNSKDEwKSwgbmV3IHhtbC5UYWcoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9DT05URVhUX1RBRywgeydjb250ZXh0LXR5cGUnOiAnbGluZW51bWJlcid9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmV3IHhtbC5UZXh0KGAke3NvdXJjZS5zdGFydExpbmV9YCldKSxcbiAgICAgICAgICAgIG5ldyB4bWwuQ1IoOCkpO1xuICAgICAgICBjb250ZXh0VGFncy5wdXNoKG5ldyB4bWwuQ1IoOCksIGNvbnRleHRHcm91cFRhZyk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdHJhbnNVbml0ID0gbmV3IHhtbC5UYWcoX1VOSVRfVEFHLCB7aWQ6IG1lc3NhZ2UuaWQsIGRhdGF0eXBlOiAnaHRtbCd9KTtcbiAgICAgIHRyYW5zVW5pdC5jaGlsZHJlbi5wdXNoKFxuICAgICAgICAgIG5ldyB4bWwuQ1IoOCksIG5ldyB4bWwuVGFnKF9TT1VSQ0VfVEFHLCB7fSwgdmlzaXRvci5zZXJpYWxpemUobWVzc2FnZS5ub2RlcykpLFxuICAgICAgICAgIC4uLmNvbnRleHRUYWdzKTtcblxuICAgICAgaWYgKG1lc3NhZ2UuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdHJhbnNVbml0LmNoaWxkcmVuLnB1c2goXG4gICAgICAgICAgICBuZXcgeG1sLkNSKDgpLFxuICAgICAgICAgICAgbmV3IHhtbC5UYWcoXG4gICAgICAgICAgICAgICAgJ25vdGUnLCB7cHJpb3JpdHk6ICcxJywgZnJvbTogJ2Rlc2NyaXB0aW9uJ30sIFtuZXcgeG1sLlRleHQobWVzc2FnZS5kZXNjcmlwdGlvbildKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZXNzYWdlLm1lYW5pbmcpIHtcbiAgICAgICAgdHJhbnNVbml0LmNoaWxkcmVuLnB1c2goXG4gICAgICAgICAgICBuZXcgeG1sLkNSKDgpLFxuICAgICAgICAgICAgbmV3IHhtbC5UYWcoJ25vdGUnLCB7cHJpb3JpdHk6ICcxJywgZnJvbTogJ21lYW5pbmcnfSwgW25ldyB4bWwuVGV4dChtZXNzYWdlLm1lYW5pbmcpXSkpO1xuICAgICAgfVxuXG4gICAgICB0cmFuc1VuaXQuY2hpbGRyZW4ucHVzaChuZXcgeG1sLkNSKDYpKTtcblxuICAgICAgdHJhbnNVbml0cy5wdXNoKG5ldyB4bWwuQ1IoNiksIHRyYW5zVW5pdCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBib2R5ID0gbmV3IHhtbC5UYWcoJ2JvZHknLCB7fSwgWy4uLnRyYW5zVW5pdHMsIG5ldyB4bWwuQ1IoNCldKTtcbiAgICBjb25zdCBmaWxlID0gbmV3IHhtbC5UYWcoXG4gICAgICAgICdmaWxlJywge1xuICAgICAgICAgICdzb3VyY2UtbGFuZ3VhZ2UnOiBsb2NhbGUgfHwgX0RFRkFVTFRfU09VUkNFX0xBTkcsXG4gICAgICAgICAgZGF0YXR5cGU6ICdwbGFpbnRleHQnLFxuICAgICAgICAgIG9yaWdpbmFsOiAnbmcyLnRlbXBsYXRlJyxcbiAgICAgICAgfSxcbiAgICAgICAgW25ldyB4bWwuQ1IoNCksIGJvZHksIG5ldyB4bWwuQ1IoMildKTtcbiAgICBjb25zdCB4bGlmZiA9IG5ldyB4bWwuVGFnKFxuICAgICAgICAneGxpZmYnLCB7dmVyc2lvbjogX1ZFUlNJT04sIHhtbG5zOiBfWE1MTlN9LCBbbmV3IHhtbC5DUigyKSwgZmlsZSwgbmV3IHhtbC5DUigpXSk7XG5cbiAgICByZXR1cm4geG1sLnNlcmlhbGl6ZShbXG4gICAgICBuZXcgeG1sLkRlY2xhcmF0aW9uKHt2ZXJzaW9uOiAnMS4wJywgZW5jb2Rpbmc6ICdVVEYtOCd9KSwgbmV3IHhtbC5DUigpLCB4bGlmZiwgbmV3IHhtbC5DUigpXG4gICAgXSk7XG4gIH1cblxuICBsb2FkKGNvbnRlbnQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOlxuICAgICAge2xvY2FsZTogc3RyaW5nLCBpMThuTm9kZXNCeU1zZ0lkOiB7W21zZ0lkOiBzdHJpbmddOiBpMThuLk5vZGVbXX19IHtcbiAgICAvLyB4bGlmZiB0byB4bWwgbm9kZXNcbiAgICBjb25zdCB4bGlmZlBhcnNlciA9IG5ldyBYbGlmZlBhcnNlcigpO1xuICAgIGNvbnN0IHtsb2NhbGUsIG1zZ0lkVG9IdG1sLCBlcnJvcnN9ID0geGxpZmZQYXJzZXIucGFyc2UoY29udGVudCwgdXJsKTtcblxuICAgIC8vIHhtbCBub2RlcyB0byBpMThuIG5vZGVzXG4gICAgY29uc3QgaTE4bk5vZGVzQnlNc2dJZDoge1ttc2dJZDogc3RyaW5nXTogaTE4bi5Ob2RlW119ID0ge307XG4gICAgY29uc3QgY29udmVydGVyID0gbmV3IFhtbFRvSTE4bigpO1xuXG4gICAgT2JqZWN0LmtleXMobXNnSWRUb0h0bWwpLmZvckVhY2gobXNnSWQgPT4ge1xuICAgICAgY29uc3Qge2kxOG5Ob2RlcywgZXJyb3JzOiBlfSA9IGNvbnZlcnRlci5jb252ZXJ0KG1zZ0lkVG9IdG1sW21zZ0lkXSwgdXJsKTtcbiAgICAgIGVycm9ycy5wdXNoKC4uLmUpO1xuICAgICAgaTE4bk5vZGVzQnlNc2dJZFttc2dJZF0gPSBpMThuTm9kZXM7XG4gICAgfSk7XG5cbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB4bGlmZiBwYXJzZSBlcnJvcnM6XFxuJHtlcnJvcnMuam9pbignXFxuJyl9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtsb2NhbGU6IGxvY2FsZSAhLCBpMThuTm9kZXNCeU1zZ0lkfTtcbiAgfVxuXG4gIGRpZ2VzdChtZXNzYWdlOiBpMThuLk1lc3NhZ2UpOiBzdHJpbmcgeyByZXR1cm4gZGlnZXN0KG1lc3NhZ2UpOyB9XG59XG5cbmNsYXNzIF9Xcml0ZVZpc2l0b3IgaW1wbGVtZW50cyBpMThuLlZpc2l0b3Ige1xuICB2aXNpdFRleHQodGV4dDogaTE4bi5UZXh0LCBjb250ZXh0PzogYW55KTogeG1sLk5vZGVbXSB7IHJldHVybiBbbmV3IHhtbC5UZXh0KHRleHQudmFsdWUpXTsgfVxuXG4gIHZpc2l0Q29udGFpbmVyKGNvbnRhaW5lcjogaTE4bi5Db250YWluZXIsIGNvbnRleHQ/OiBhbnkpOiB4bWwuTm9kZVtdIHtcbiAgICBjb25zdCBub2RlczogeG1sLk5vZGVbXSA9IFtdO1xuICAgIGNvbnRhaW5lci5jaGlsZHJlbi5mb3JFYWNoKChub2RlOiBpMThuLk5vZGUpID0+IG5vZGVzLnB1c2goLi4ubm9kZS52aXNpdCh0aGlzKSkpO1xuICAgIHJldHVybiBub2RlcztcbiAgfVxuXG4gIHZpc2l0SWN1KGljdTogaTE4bi5JY3UsIGNvbnRleHQ/OiBhbnkpOiB4bWwuTm9kZVtdIHtcbiAgICBjb25zdCBub2RlcyA9IFtuZXcgeG1sLlRleHQoYHske2ljdS5leHByZXNzaW9uUGxhY2Vob2xkZXJ9LCAke2ljdS50eXBlfSwgYCldO1xuXG4gICAgT2JqZWN0LmtleXMoaWN1LmNhc2VzKS5mb3JFYWNoKChjOiBzdHJpbmcpID0+IHtcbiAgICAgIG5vZGVzLnB1c2gobmV3IHhtbC5UZXh0KGAke2N9IHtgKSwgLi4uaWN1LmNhc2VzW2NdLnZpc2l0KHRoaXMpLCBuZXcgeG1sLlRleHQoYH0gYCkpO1xuICAgIH0pO1xuXG4gICAgbm9kZXMucHVzaChuZXcgeG1sLlRleHQoYH1gKSk7XG5cbiAgICByZXR1cm4gbm9kZXM7XG4gIH1cblxuICB2aXNpdFRhZ1BsYWNlaG9sZGVyKHBoOiBpMThuLlRhZ1BsYWNlaG9sZGVyLCBjb250ZXh0PzogYW55KTogeG1sLk5vZGVbXSB7XG4gICAgY29uc3QgY3R5cGUgPSBnZXRDdHlwZUZvclRhZyhwaC50YWcpO1xuXG4gICAgaWYgKHBoLmlzVm9pZCkge1xuICAgICAgLy8gdm9pZCB0YWdzIGhhdmUgbm8gY2hpbGRyZW4gbm9yIGNsb3NpbmcgdGFnc1xuICAgICAgcmV0dXJuIFtuZXcgeG1sLlRhZyhcbiAgICAgICAgICBfUExBQ0VIT0xERVJfVEFHLCB7aWQ6IHBoLnN0YXJ0TmFtZSwgY3R5cGUsICdlcXVpdi10ZXh0JzogYDwke3BoLnRhZ30vPmB9KV07XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRUYWdQaCA9XG4gICAgICAgIG5ldyB4bWwuVGFnKF9QTEFDRUhPTERFUl9UQUcsIHtpZDogcGguc3RhcnROYW1lLCBjdHlwZSwgJ2VxdWl2LXRleHQnOiBgPCR7cGgudGFnfT5gfSk7XG4gICAgY29uc3QgY2xvc2VUYWdQaCA9XG4gICAgICAgIG5ldyB4bWwuVGFnKF9QTEFDRUhPTERFUl9UQUcsIHtpZDogcGguY2xvc2VOYW1lLCBjdHlwZSwgJ2VxdWl2LXRleHQnOiBgPC8ke3BoLnRhZ30+YH0pO1xuXG4gICAgcmV0dXJuIFtzdGFydFRhZ1BoLCAuLi50aGlzLnNlcmlhbGl6ZShwaC5jaGlsZHJlbiksIGNsb3NlVGFnUGhdO1xuICB9XG5cbiAgdmlzaXRQbGFjZWhvbGRlcihwaDogaTE4bi5QbGFjZWhvbGRlciwgY29udGV4dD86IGFueSk6IHhtbC5Ob2RlW10ge1xuICAgIHJldHVybiBbbmV3IHhtbC5UYWcoX1BMQUNFSE9MREVSX1RBRywge2lkOiBwaC5uYW1lLCAnZXF1aXYtdGV4dCc6IGB7eyR7cGgudmFsdWV9fX1gfSldO1xuICB9XG5cbiAgdmlzaXRJY3VQbGFjZWhvbGRlcihwaDogaTE4bi5JY3VQbGFjZWhvbGRlciwgY29udGV4dD86IGFueSk6IHhtbC5Ob2RlW10ge1xuICAgIGNvbnN0IGVxdWl2VGV4dCA9XG4gICAgICAgIGB7JHtwaC52YWx1ZS5leHByZXNzaW9ufSwgJHtwaC52YWx1ZS50eXBlfSwgJHtPYmplY3Qua2V5cyhwaC52YWx1ZS5jYXNlcykubWFwKCh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZSArICcgey4uLn0nKS5qb2luKCcgJyl9fWA7XG4gICAgcmV0dXJuIFtuZXcgeG1sLlRhZyhfUExBQ0VIT0xERVJfVEFHLCB7aWQ6IHBoLm5hbWUsICdlcXVpdi10ZXh0JzogZXF1aXZUZXh0fSldO1xuICB9XG5cbiAgc2VyaWFsaXplKG5vZGVzOiBpMThuLk5vZGVbXSk6IHhtbC5Ob2RlW10ge1xuICAgIHJldHVybiBbXS5jb25jYXQoLi4ubm9kZXMubWFwKG5vZGUgPT4gbm9kZS52aXNpdCh0aGlzKSkpO1xuICB9XG59XG5cbi8vIFRPRE8odmljYik6IGFkZCBlcnJvciBtYW5hZ2VtZW50IChzdHJ1Y3R1cmUpXG4vLyBFeHRyYWN0IG1lc3NhZ2VzIGFzIHhtbCBub2RlcyBmcm9tIHRoZSB4bGlmZiBmaWxlXG5jbGFzcyBYbGlmZlBhcnNlciBpbXBsZW1lbnRzIG1sLlZpc2l0b3Ige1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBfdW5pdE1sU3RyaW5nICE6IHN0cmluZyB8IG51bGw7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9lcnJvcnMgITogSTE4bkVycm9yW107XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9tc2dJZFRvSHRtbCAhOiB7W21zZ0lkOiBzdHJpbmddOiBzdHJpbmd9O1xuICBwcml2YXRlIF9sb2NhbGU6IHN0cmluZ3xudWxsID0gbnVsbDtcblxuICBwYXJzZSh4bGlmZjogc3RyaW5nLCB1cmw6IHN0cmluZykge1xuICAgIHRoaXMuX3VuaXRNbFN0cmluZyA9IG51bGw7XG4gICAgdGhpcy5fbXNnSWRUb0h0bWwgPSB7fTtcblxuICAgIGNvbnN0IHhtbCA9IG5ldyBYbWxQYXJzZXIoKS5wYXJzZSh4bGlmZiwgdXJsLCBmYWxzZSk7XG5cbiAgICB0aGlzLl9lcnJvcnMgPSB4bWwuZXJyb3JzO1xuICAgIG1sLnZpc2l0QWxsKHRoaXMsIHhtbC5yb290Tm9kZXMsIG51bGwpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1zZ0lkVG9IdG1sOiB0aGlzLl9tc2dJZFRvSHRtbCxcbiAgICAgIGVycm9yczogdGhpcy5fZXJyb3JzLFxuICAgICAgbG9jYWxlOiB0aGlzLl9sb2NhbGUsXG4gICAgfTtcbiAgfVxuXG4gIHZpc2l0RWxlbWVudChlbGVtZW50OiBtbC5FbGVtZW50LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHN3aXRjaCAoZWxlbWVudC5uYW1lKSB7XG4gICAgICBjYXNlIF9VTklUX1RBRzpcbiAgICAgICAgdGhpcy5fdW5pdE1sU3RyaW5nID0gbnVsbCAhO1xuICAgICAgICBjb25zdCBpZEF0dHIgPSBlbGVtZW50LmF0dHJzLmZpbmQoKGF0dHIpID0+IGF0dHIubmFtZSA9PT0gJ2lkJyk7XG4gICAgICAgIGlmICghaWRBdHRyKSB7XG4gICAgICAgICAgdGhpcy5fYWRkRXJyb3IoZWxlbWVudCwgYDwke19VTklUX1RBR30+IG1pc3NlcyB0aGUgXCJpZFwiIGF0dHJpYnV0ZWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGlkID0gaWRBdHRyLnZhbHVlO1xuICAgICAgICAgIGlmICh0aGlzLl9tc2dJZFRvSHRtbC5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZEVycm9yKGVsZW1lbnQsIGBEdXBsaWNhdGVkIHRyYW5zbGF0aW9ucyBmb3IgbXNnICR7aWR9YCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1sLnZpc2l0QWxsKHRoaXMsIGVsZW1lbnQuY2hpbGRyZW4sIG51bGwpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl91bml0TWxTdHJpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHRoaXMuX21zZ0lkVG9IdG1sW2lkXSA9IHRoaXMuX3VuaXRNbFN0cmluZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2FkZEVycm9yKGVsZW1lbnQsIGBNZXNzYWdlICR7aWR9IG1pc3NlcyBhIHRyYW5zbGF0aW9uYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBpZ25vcmUgdGhvc2UgdGFnc1xuICAgICAgY2FzZSBfU09VUkNFX1RBRzpcbiAgICAgIGNhc2UgX1NFR01FTlRfU09VUkNFX1RBRzpcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgX1RBUkdFVF9UQUc6XG4gICAgICAgIGNvbnN0IGlubmVyVGV4dFN0YXJ0ID0gZWxlbWVudC5zdGFydFNvdXJjZVNwYW4gIS5lbmQub2Zmc2V0O1xuICAgICAgICBjb25zdCBpbm5lclRleHRFbmQgPSBlbGVtZW50LmVuZFNvdXJjZVNwYW4gIS5zdGFydC5vZmZzZXQ7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBlbGVtZW50LnN0YXJ0U291cmNlU3BhbiAhLnN0YXJ0LmZpbGUuY29udGVudDtcbiAgICAgICAgY29uc3QgaW5uZXJUZXh0ID0gY29udGVudC5zbGljZShpbm5lclRleHRTdGFydCwgaW5uZXJUZXh0RW5kKTtcbiAgICAgICAgdGhpcy5fdW5pdE1sU3RyaW5nID0gaW5uZXJUZXh0O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBfRklMRV9UQUc6XG4gICAgICAgIGNvbnN0IGxvY2FsZUF0dHIgPSBlbGVtZW50LmF0dHJzLmZpbmQoKGF0dHIpID0+IGF0dHIubmFtZSA9PT0gJ3RhcmdldC1sYW5ndWFnZScpO1xuICAgICAgICBpZiAobG9jYWxlQXR0cikge1xuICAgICAgICAgIHRoaXMuX2xvY2FsZSA9IGxvY2FsZUF0dHIudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgbWwudmlzaXRBbGwodGhpcywgZWxlbWVudC5jaGlsZHJlbiwgbnVsbCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBUT0RPKHZpY2IpOiBhc3NlcnQgZmlsZSBzdHJ1Y3R1cmUsIHhsaWZmIHZlcnNpb25cbiAgICAgICAgLy8gRm9yIG5vdyBvbmx5IHJlY3Vyc2Ugb24gdW5oYW5kbGVkIG5vZGVzXG4gICAgICAgIG1sLnZpc2l0QWxsKHRoaXMsIGVsZW1lbnQuY2hpbGRyZW4sIG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHZpc2l0QXR0cmlidXRlKGF0dHJpYnV0ZTogbWwuQXR0cmlidXRlLCBjb250ZXh0OiBhbnkpOiBhbnkge31cblxuICB2aXNpdFRleHQodGV4dDogbWwuVGV4dCwgY29udGV4dDogYW55KTogYW55IHt9XG5cbiAgdmlzaXRDb21tZW50KGNvbW1lbnQ6IG1sLkNvbW1lbnQsIGNvbnRleHQ6IGFueSk6IGFueSB7fVxuXG4gIHZpc2l0RXhwYW5zaW9uKGV4cGFuc2lvbjogbWwuRXhwYW5zaW9uLCBjb250ZXh0OiBhbnkpOiBhbnkge31cblxuICB2aXNpdEV4cGFuc2lvbkNhc2UoZXhwYW5zaW9uQ2FzZTogbWwuRXhwYW5zaW9uQ2FzZSwgY29udGV4dDogYW55KTogYW55IHt9XG5cbiAgcHJpdmF0ZSBfYWRkRXJyb3Iobm9kZTogbWwuTm9kZSwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3JzLnB1c2gobmV3IEkxOG5FcnJvcihub2RlLnNvdXJjZVNwYW4gISwgbWVzc2FnZSkpO1xuICB9XG59XG5cbi8vIENvbnZlcnQgbWwgbm9kZXMgKHhsaWZmIHN5bnRheCkgdG8gaTE4biBub2Rlc1xuY2xhc3MgWG1sVG9JMThuIGltcGxlbWVudHMgbWwuVmlzaXRvciB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIF9lcnJvcnMgITogSTE4bkVycm9yW107XG5cbiAgY29udmVydChtZXNzYWdlOiBzdHJpbmcsIHVybDogc3RyaW5nKSB7XG4gICAgY29uc3QgeG1sSWN1ID0gbmV3IFhtbFBhcnNlcigpLnBhcnNlKG1lc3NhZ2UsIHVybCwgdHJ1ZSk7XG4gICAgdGhpcy5fZXJyb3JzID0geG1sSWN1LmVycm9ycztcblxuICAgIGNvbnN0IGkxOG5Ob2RlcyA9IHRoaXMuX2Vycm9ycy5sZW5ndGggPiAwIHx8IHhtbEljdS5yb290Tm9kZXMubGVuZ3RoID09IDAgP1xuICAgICAgICBbXSA6XG4gICAgICAgIFtdLmNvbmNhdCguLi5tbC52aXNpdEFsbCh0aGlzLCB4bWxJY3Uucm9vdE5vZGVzKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaTE4bk5vZGVzOiBpMThuTm9kZXMsXG4gICAgICBlcnJvcnM6IHRoaXMuX2Vycm9ycyxcbiAgICB9O1xuICB9XG5cbiAgdmlzaXRUZXh0KHRleHQ6IG1sLlRleHQsIGNvbnRleHQ6IGFueSkgeyByZXR1cm4gbmV3IGkxOG4uVGV4dCh0ZXh0LnZhbHVlLCB0ZXh0LnNvdXJjZVNwYW4gISk7IH1cblxuICB2aXNpdEVsZW1lbnQoZWw6IG1sLkVsZW1lbnQsIGNvbnRleHQ6IGFueSk6IGkxOG4uUGxhY2Vob2xkZXJ8bWwuTm9kZVtdfG51bGwge1xuICAgIGlmIChlbC5uYW1lID09PSBfUExBQ0VIT0xERVJfVEFHKSB7XG4gICAgICBjb25zdCBuYW1lQXR0ciA9IGVsLmF0dHJzLmZpbmQoKGF0dHIpID0+IGF0dHIubmFtZSA9PT0gJ2lkJyk7XG4gICAgICBpZiAobmFtZUF0dHIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBpMThuLlBsYWNlaG9sZGVyKCcnLCBuYW1lQXR0ci52YWx1ZSwgZWwuc291cmNlU3BhbiAhKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fYWRkRXJyb3IoZWwsIGA8JHtfUExBQ0VIT0xERVJfVEFHfT4gbWlzc2VzIHRoZSBcImlkXCIgYXR0cmlidXRlYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoZWwubmFtZSA9PT0gX01BUktFUl9UQUcpIHtcbiAgICAgIHJldHVybiBbXS5jb25jYXQoLi4ubWwudmlzaXRBbGwodGhpcywgZWwuY2hpbGRyZW4pKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hZGRFcnJvcihlbCwgYFVuZXhwZWN0ZWQgdGFnYCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2aXNpdEV4cGFuc2lvbihpY3U6IG1sLkV4cGFuc2lvbiwgY29udGV4dDogYW55KSB7XG4gICAgY29uc3QgY2FzZU1hcDoge1t2YWx1ZTogc3RyaW5nXTogaTE4bi5Ob2RlfSA9IHt9O1xuXG4gICAgbWwudmlzaXRBbGwodGhpcywgaWN1LmNhc2VzKS5mb3JFYWNoKChjOiBhbnkpID0+IHtcbiAgICAgIGNhc2VNYXBbYy52YWx1ZV0gPSBuZXcgaTE4bi5Db250YWluZXIoYy5ub2RlcywgaWN1LnNvdXJjZVNwYW4pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBpMThuLkljdShpY3Uuc3dpdGNoVmFsdWUsIGljdS50eXBlLCBjYXNlTWFwLCBpY3Uuc291cmNlU3Bhbik7XG4gIH1cblxuICB2aXNpdEV4cGFuc2lvbkNhc2UoaWN1Q2FzZTogbWwuRXhwYW5zaW9uQ2FzZSwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IGljdUNhc2UudmFsdWUsXG4gICAgICBub2RlczogbWwudmlzaXRBbGwodGhpcywgaWN1Q2FzZS5leHByZXNzaW9uKSxcbiAgICB9O1xuICB9XG5cbiAgdmlzaXRDb21tZW50KGNvbW1lbnQ6IG1sLkNvbW1lbnQsIGNvbnRleHQ6IGFueSkge31cblxuICB2aXNpdEF0dHJpYnV0ZShhdHRyaWJ1dGU6IG1sLkF0dHJpYnV0ZSwgY29udGV4dDogYW55KSB7fVxuXG4gIHByaXZhdGUgX2FkZEVycm9yKG5vZGU6IG1sLk5vZGUsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2Vycm9ycy5wdXNoKG5ldyBJMThuRXJyb3Iobm9kZS5zb3VyY2VTcGFuICEsIG1lc3NhZ2UpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDdHlwZUZvclRhZyh0YWc6IHN0cmluZyk6IHN0cmluZyB7XG4gIHN3aXRjaCAodGFnLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdicic6XG4gICAgICByZXR1cm4gJ2xiJztcbiAgICBjYXNlICdpbWcnOlxuICAgICAgcmV0dXJuICdpbWFnZSc7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBgeC0ke3RhZ31gO1xuICB9XG59XG4iXX0=