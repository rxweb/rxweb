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
        define("@angular/compiler/src/render3/r3_template_transform", ["require", "exports", "tslib", "@angular/compiler/src/ml_parser/ast", "@angular/compiler/src/ml_parser/html_whitespaces", "@angular/compiler/src/ml_parser/tags", "@angular/compiler/src/parse_util", "@angular/compiler/src/style_url_resolver", "@angular/compiler/src/template_parser/template_preparser", "@angular/compiler/src/util", "@angular/compiler/src/render3/r3_ast"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var html = require("@angular/compiler/src/ml_parser/ast");
    var html_whitespaces_1 = require("@angular/compiler/src/ml_parser/html_whitespaces");
    var tags_1 = require("@angular/compiler/src/ml_parser/tags");
    var parse_util_1 = require("@angular/compiler/src/parse_util");
    var style_url_resolver_1 = require("@angular/compiler/src/style_url_resolver");
    var template_preparser_1 = require("@angular/compiler/src/template_parser/template_preparser");
    var util_1 = require("@angular/compiler/src/util");
    var t = require("@angular/compiler/src/render3/r3_ast");
    var BIND_NAME_REGEXP = /^(?:(?:(?:(bind-)|(let-)|(ref-|#)|(on-)|(bindon-)|(@))(.+))|\[\(([^\)]+)\)\]|\[([^\]]+)\]|\(([^\)]+)\))$/;
    // Group 1 = "bind-"
    var KW_BIND_IDX = 1;
    // Group 2 = "let-"
    var KW_LET_IDX = 2;
    // Group 3 = "ref-/#"
    var KW_REF_IDX = 3;
    // Group 4 = "on-"
    var KW_ON_IDX = 4;
    // Group 5 = "bindon-"
    var KW_BINDON_IDX = 5;
    // Group 6 = "@"
    var KW_AT_IDX = 6;
    // Group 7 = the identifier after "bind-", "let-", "ref-/#", "on-", "bindon-" or "@"
    var IDENT_KW_IDX = 7;
    // Group 8 = identifier inside [()]
    var IDENT_BANANA_BOX_IDX = 8;
    // Group 9 = identifier inside []
    var IDENT_PROPERTY_IDX = 9;
    // Group 10 = identifier inside ()
    var IDENT_EVENT_IDX = 10;
    var TEMPLATE_ATTR_PREFIX = '*';
    var CLASS_ATTR = 'class';
    // Default selector used by `<ng-content>` if none specified
    var DEFAULT_CONTENT_SELECTOR = '*';
    function htmlAstToRender3Ast(htmlNodes, bindingParser) {
        var transformer = new HtmlAstToIvyAst(bindingParser);
        var ivyNodes = html.visitAll(transformer, htmlNodes);
        // Errors might originate in either the binding parser or the html to ivy transformer
        var allErrors = bindingParser.errors.concat(transformer.errors);
        var errors = allErrors.filter(function (e) { return e.level === parse_util_1.ParseErrorLevel.ERROR; });
        if (errors.length > 0) {
            var errorString = errors.join('\n');
            throw util_1.syntaxError("Template parse errors:\n" + errorString, errors);
        }
        return {
            nodes: ivyNodes,
            errors: allErrors,
            ngContentSelectors: transformer.ngContentSelectors,
            hasNgContent: transformer.hasNgContent,
        };
    }
    exports.htmlAstToRender3Ast = htmlAstToRender3Ast;
    var HtmlAstToIvyAst = /** @class */ (function () {
        function HtmlAstToIvyAst(bindingParser) {
            this.bindingParser = bindingParser;
            this.errors = [];
            // Selectors for the `ng-content` tags. Only non `*` selectors are recorded here
            this.ngContentSelectors = [];
            // Any `<ng-content>` in the template ?
            this.hasNgContent = false;
        }
        // HTML visitor
        HtmlAstToIvyAst.prototype.visitElement = function (element) {
            var e_1, _a;
            var preparsedElement = template_preparser_1.preparseElement(element);
            if (preparsedElement.type === template_preparser_1.PreparsedElementType.SCRIPT ||
                preparsedElement.type === template_preparser_1.PreparsedElementType.STYLE) {
                // Skipping <script> for security reasons
                // Skipping <style> as we already processed them
                // in the StyleCompiler
                return null;
            }
            if (preparsedElement.type === template_preparser_1.PreparsedElementType.STYLESHEET &&
                style_url_resolver_1.isStyleUrlResolvable(preparsedElement.hrefAttr)) {
                // Skipping stylesheets with either relative urls or package scheme as we already processed
                // them in the StyleCompiler
                return null;
            }
            // Whether the element is a `<ng-template>`
            var isTemplateElement = tags_1.isNgTemplate(element.name);
            var matchableAttributes = [];
            var parsedProperties = [];
            var boundEvents = [];
            var variables = [];
            var references = [];
            var attributes = [];
            var templateMatchableAttributes = [];
            var inlineTemplateSourceSpan;
            var templateParsedProperties = [];
            var templateVariables = [];
            // Whether the element has any *-attribute
            var elementHasInlineTemplate = false;
            try {
                for (var _b = tslib_1.__values(element.attrs), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var attribute = _c.value;
                    var hasBinding = false;
                    var normalizedName = normalizeAttributeName(attribute.name);
                    // `*attr` defines template bindings
                    var isTemplateBinding = false;
                    if (normalizedName.startsWith(TEMPLATE_ATTR_PREFIX)) {
                        if (elementHasInlineTemplate) {
                            this.reportError("Can't have multiple template bindings on one element. Use only one attribute prefixed with *", attribute.sourceSpan);
                        }
                        isTemplateBinding = true;
                        elementHasInlineTemplate = true;
                        var templateValue = attribute.value;
                        var templateKey = normalizedName.substring(TEMPLATE_ATTR_PREFIX.length);
                        inlineTemplateSourceSpan = attribute.valueSpan || attribute.sourceSpan;
                        var parsedVariables = [];
                        this.bindingParser.parseInlineTemplateBinding(templateKey, templateValue, attribute.sourceSpan, templateMatchableAttributes, templateParsedProperties, parsedVariables);
                        templateVariables.push.apply(templateVariables, tslib_1.__spread(parsedVariables.map(function (v) { return new t.Variable(v.name, v.value, v.sourceSpan); })));
                    }
                    else {
                        // Check for variables, events, property bindings, interpolation
                        hasBinding = this.parseAttribute(isTemplateElement, attribute, matchableAttributes, parsedProperties, boundEvents, variables, references);
                    }
                    if (!hasBinding && !isTemplateBinding) {
                        // don't include the bindings as attributes as well in the AST
                        attributes.push(this.visitAttribute(attribute));
                        matchableAttributes.push([attribute.name, attribute.value]);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var children = html.visitAll(preparsedElement.nonBindable ? NON_BINDABLE_VISITOR : this, element.children);
            var parsedElement;
            if (preparsedElement.type === template_preparser_1.PreparsedElementType.NG_CONTENT) {
                // `<ng-content>`
                this.hasNgContent = true;
                if (element.children && !element.children.every(isEmptyTextNode)) {
                    this.reportError("<ng-content> element cannot have content.", element.sourceSpan);
                }
                var selector = preparsedElement.selectAttr;
                var attributes_1 = element.attrs.map(function (attribute) {
                    return new t.TextAttribute(attribute.name, attribute.value, attribute.sourceSpan, attribute.valueSpan);
                });
                var selectorIndex = selector === DEFAULT_CONTENT_SELECTOR ? 0 : this.ngContentSelectors.push(selector);
                parsedElement = new t.Content(selectorIndex, attributes_1, element.sourceSpan);
            }
            else if (isTemplateElement) {
                // `<ng-template>`
                var boundAttributes = this.createBoundAttributes(element.name, parsedProperties);
                parsedElement = new t.Template(attributes, boundAttributes, children, references, variables, element.sourceSpan, element.startSourceSpan, element.endSourceSpan);
            }
            else {
                var boundAttributes = this.createBoundAttributes(element.name, parsedProperties);
                parsedElement = new t.Element(element.name, attributes, boundAttributes, boundEvents, children, references, element.sourceSpan, element.startSourceSpan, element.endSourceSpan);
            }
            if (elementHasInlineTemplate) {
                var attributes_2 = [];
                templateMatchableAttributes.forEach(function (_a) {
                    var _b = tslib_1.__read(_a, 2), name = _b[0], value = _b[1];
                    return attributes_2.push(new t.TextAttribute(name, value, inlineTemplateSourceSpan));
                });
                var boundAttributes = this.createBoundAttributes('ng-template', templateParsedProperties);
                parsedElement = new t.Template(attributes_2, boundAttributes, [parsedElement], [], templateVariables, element.sourceSpan, element.startSourceSpan, element.endSourceSpan);
            }
            return parsedElement;
        };
        HtmlAstToIvyAst.prototype.visitAttribute = function (attribute) {
            return new t.TextAttribute(attribute.name, attribute.value, attribute.sourceSpan, attribute.valueSpan);
        };
        HtmlAstToIvyAst.prototype.visitText = function (text) {
            var valueNoNgsp = html_whitespaces_1.replaceNgsp(text.value);
            var expr = this.bindingParser.parseInterpolation(valueNoNgsp, text.sourceSpan);
            return expr ? new t.BoundText(expr, text.sourceSpan) : new t.Text(valueNoNgsp, text.sourceSpan);
        };
        HtmlAstToIvyAst.prototype.visitComment = function (comment) { return null; };
        HtmlAstToIvyAst.prototype.visitExpansion = function (expansion) { return null; };
        HtmlAstToIvyAst.prototype.visitExpansionCase = function (expansionCase) { return null; };
        HtmlAstToIvyAst.prototype.createBoundAttributes = function (elementName, properties) {
            var _this = this;
            return properties.filter(function (prop) { return !prop.isLiteral; })
                .map(function (prop) { return _this.bindingParser.createBoundElementProperty(elementName, prop); })
                .map(function (prop) { return t.BoundAttribute.fromBoundElementProperty(prop); });
        };
        HtmlAstToIvyAst.prototype.parseAttribute = function (isTemplateElement, attribute, matchableAttributes, parsedProperties, boundEvents, variables, references) {
            var name = normalizeAttributeName(attribute.name);
            var value = attribute.value;
            var srcSpan = attribute.sourceSpan;
            var bindParts = name.match(BIND_NAME_REGEXP);
            var hasBinding = false;
            if (bindParts) {
                hasBinding = true;
                if (bindParts[KW_BIND_IDX] != null) {
                    this.bindingParser.parsePropertyBinding(bindParts[IDENT_KW_IDX], value, false, srcSpan, matchableAttributes, parsedProperties);
                }
                else if (bindParts[KW_LET_IDX]) {
                    if (isTemplateElement) {
                        var identifier = bindParts[IDENT_KW_IDX];
                        this.parseVariable(identifier, value, srcSpan, variables);
                    }
                    else {
                        this.reportError("\"let-\" is only supported on ng-template elements.", srcSpan);
                    }
                }
                else if (bindParts[KW_REF_IDX]) {
                    var identifier = bindParts[IDENT_KW_IDX];
                    this.parseReference(identifier, value, srcSpan, references);
                }
                else if (bindParts[KW_ON_IDX]) {
                    var events = [];
                    this.bindingParser.parseEvent(bindParts[IDENT_KW_IDX], value, srcSpan, matchableAttributes, events);
                    addEvents(events, boundEvents);
                }
                else if (bindParts[KW_BINDON_IDX]) {
                    this.bindingParser.parsePropertyBinding(bindParts[IDENT_KW_IDX], value, false, srcSpan, matchableAttributes, parsedProperties);
                    this.parseAssignmentEvent(bindParts[IDENT_KW_IDX], value, srcSpan, matchableAttributes, boundEvents);
                }
                else if (bindParts[KW_AT_IDX]) {
                    this.bindingParser.parseLiteralAttr(name, value, srcSpan, matchableAttributes, parsedProperties);
                }
                else if (bindParts[IDENT_BANANA_BOX_IDX]) {
                    this.bindingParser.parsePropertyBinding(bindParts[IDENT_BANANA_BOX_IDX], value, false, srcSpan, matchableAttributes, parsedProperties);
                    this.parseAssignmentEvent(bindParts[IDENT_BANANA_BOX_IDX], value, srcSpan, matchableAttributes, boundEvents);
                }
                else if (bindParts[IDENT_PROPERTY_IDX]) {
                    this.bindingParser.parsePropertyBinding(bindParts[IDENT_PROPERTY_IDX], value, false, srcSpan, matchableAttributes, parsedProperties);
                }
                else if (bindParts[IDENT_EVENT_IDX]) {
                    var events = [];
                    this.bindingParser.parseEvent(bindParts[IDENT_EVENT_IDX], value, srcSpan, matchableAttributes, events);
                    addEvents(events, boundEvents);
                }
            }
            else {
                hasBinding = this.bindingParser.parsePropertyInterpolation(name, value, srcSpan, matchableAttributes, parsedProperties);
            }
            return hasBinding;
        };
        HtmlAstToIvyAst.prototype.parseVariable = function (identifier, value, sourceSpan, variables) {
            if (identifier.indexOf('-') > -1) {
                this.reportError("\"-\" is not allowed in variable names", sourceSpan);
            }
            variables.push(new t.Variable(identifier, value, sourceSpan));
        };
        HtmlAstToIvyAst.prototype.parseReference = function (identifier, value, sourceSpan, references) {
            if (identifier.indexOf('-') > -1) {
                this.reportError("\"-\" is not allowed in reference names", sourceSpan);
            }
            references.push(new t.Reference(identifier, value, sourceSpan));
        };
        HtmlAstToIvyAst.prototype.parseAssignmentEvent = function (name, expression, sourceSpan, targetMatchableAttrs, boundEvents) {
            var events = [];
            this.bindingParser.parseEvent(name + "Change", expression + "=$event", sourceSpan, targetMatchableAttrs, events);
            addEvents(events, boundEvents);
        };
        HtmlAstToIvyAst.prototype.reportError = function (message, sourceSpan, level) {
            if (level === void 0) { level = parse_util_1.ParseErrorLevel.ERROR; }
            this.errors.push(new parse_util_1.ParseError(sourceSpan, message, level));
        };
        return HtmlAstToIvyAst;
    }());
    var NonBindableVisitor = /** @class */ (function () {
        function NonBindableVisitor() {
        }
        NonBindableVisitor.prototype.visitElement = function (ast) {
            var preparsedElement = template_preparser_1.preparseElement(ast);
            if (preparsedElement.type === template_preparser_1.PreparsedElementType.SCRIPT ||
                preparsedElement.type === template_preparser_1.PreparsedElementType.STYLE ||
                preparsedElement.type === template_preparser_1.PreparsedElementType.STYLESHEET) {
                // Skipping <script> for security reasons
                // Skipping <style> and stylesheets as we already processed them
                // in the StyleCompiler
                return null;
            }
            var children = html.visitAll(this, ast.children, null);
            return new t.Element(ast.name, html.visitAll(this, ast.attrs), 
            /* inputs */ [], /* outputs */ [], children, /* references */ [], ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan);
        };
        NonBindableVisitor.prototype.visitComment = function (comment) { return null; };
        NonBindableVisitor.prototype.visitAttribute = function (attribute) {
            return new t.TextAttribute(attribute.name, attribute.value, attribute.sourceSpan);
        };
        NonBindableVisitor.prototype.visitText = function (text) { return new t.Text(text.value, text.sourceSpan); };
        NonBindableVisitor.prototype.visitExpansion = function (expansion) { return null; };
        NonBindableVisitor.prototype.visitExpansionCase = function (expansionCase) { return null; };
        return NonBindableVisitor;
    }());
    var NON_BINDABLE_VISITOR = new NonBindableVisitor();
    function normalizeAttributeName(attrName) {
        return /^data-/i.test(attrName) ? attrName.substring(5) : attrName;
    }
    function addEvents(events, boundEvents) {
        boundEvents.push.apply(boundEvents, tslib_1.__spread(events.map(function (e) { return t.BoundEvent.fromParsedEvent(e); })));
    }
    function isEmptyTextNode(node) {
        return node instanceof html.Text && node.value.trim().length == 0;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfdGVtcGxhdGVfdHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3JlbmRlcjMvcjNfdGVtcGxhdGVfdHJhbnNmb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQUdILDBEQUF5QztJQUN6QyxxRkFBMEQ7SUFDMUQsNkRBQStDO0lBQy9DLCtEQUEyRTtJQUMzRSwrRUFBMkQ7SUFFM0QsK0ZBQTRGO0lBQzVGLG1EQUFvQztJQUNwQyx3REFBOEI7SUFHOUIsSUFBTSxnQkFBZ0IsR0FDbEIsMEdBQTBHLENBQUM7SUFFL0csb0JBQW9CO0lBQ3BCLElBQU0sV0FBVyxHQUFHLENBQUMsQ0FBQztJQUN0QixtQkFBbUI7SUFDbkIsSUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLHFCQUFxQjtJQUNyQixJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDckIsa0JBQWtCO0lBQ2xCLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNwQixzQkFBc0I7SUFDdEIsSUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLGdCQUFnQjtJQUNoQixJQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDcEIsb0ZBQW9GO0lBQ3BGLElBQU0sWUFBWSxHQUFHLENBQUMsQ0FBQztJQUN2QixtQ0FBbUM7SUFDbkMsSUFBTSxvQkFBb0IsR0FBRyxDQUFDLENBQUM7SUFDL0IsaUNBQWlDO0lBQ2pDLElBQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLGtDQUFrQztJQUNsQyxJQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFFM0IsSUFBTSxvQkFBb0IsR0FBRyxHQUFHLENBQUM7SUFDakMsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDO0lBQzNCLDREQUE0RDtJQUM1RCxJQUFNLHdCQUF3QixHQUFHLEdBQUcsQ0FBQztJQVdy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TUFBcUIsRUFBRSxXQUEyQjtRQUNuRSxXQUFXLENBQUMsSUFBSSxPQUFoQixXQUFXLG1CQUFTLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxHQUFFO0lBQ3hFLENBQUM7SUFFRCx5QkFBeUIsSUFBZTtRQUN0QyxPQUFPLElBQUksWUFBWSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUNwRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BhcnNlZEV2ZW50LCBQYXJzZWRQcm9wZXJ0eSwgUGFyc2VkVmFyaWFibGUsIFBhcnNlckVycm9yfSBmcm9tICcuLi9leHByZXNzaW9uX3BhcnNlci9hc3QnO1xuaW1wb3J0ICogYXMgaHRtbCBmcm9tICcuLi9tbF9wYXJzZXIvYXN0JztcbmltcG9ydCB7cmVwbGFjZU5nc3B9IGZyb20gJy4uL21sX3BhcnNlci9odG1sX3doaXRlc3BhY2VzJztcbmltcG9ydCB7aXNOZ1RlbXBsYXRlfSBmcm9tICcuLi9tbF9wYXJzZXIvdGFncyc7XG5pbXBvcnQge1BhcnNlRXJyb3IsIFBhcnNlRXJyb3JMZXZlbCwgUGFyc2VTb3VyY2VTcGFufSBmcm9tICcuLi9wYXJzZV91dGlsJztcbmltcG9ydCB7aXNTdHlsZVVybFJlc29sdmFibGV9IGZyb20gJy4uL3N0eWxlX3VybF9yZXNvbHZlcic7XG5pbXBvcnQge0JpbmRpbmdQYXJzZXJ9IGZyb20gJy4uL3RlbXBsYXRlX3BhcnNlci9iaW5kaW5nX3BhcnNlcic7XG5pbXBvcnQge1ByZXBhcnNlZEVsZW1lbnRUeXBlLCBwcmVwYXJzZUVsZW1lbnR9IGZyb20gJy4uL3RlbXBsYXRlX3BhcnNlci90ZW1wbGF0ZV9wcmVwYXJzZXInO1xuaW1wb3J0IHtzeW50YXhFcnJvcn0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgKiBhcyB0IGZyb20gJy4vcjNfYXN0JztcblxuXG5jb25zdCBCSU5EX05BTUVfUkVHRVhQID1cbiAgICAvXig/Oig/Oig/OihiaW5kLSl8KGxldC0pfChyZWYtfCMpfChvbi0pfChiaW5kb24tKXwoQCkpKC4rKSl8XFxbXFwoKFteXFwpXSspXFwpXFxdfFxcWyhbXlxcXV0rKVxcXXxcXCgoW15cXCldKylcXCkpJC87XG5cbi8vIEdyb3VwIDEgPSBcImJpbmQtXCJcbmNvbnN0IEtXX0JJTkRfSURYID0gMTtcbi8vIEdyb3VwIDIgPSBcImxldC1cIlxuY29uc3QgS1dfTEVUX0lEWCA9IDI7XG4vLyBHcm91cCAzID0gXCJyZWYtLyNcIlxuY29uc3QgS1dfUkVGX0lEWCA9IDM7XG4vLyBHcm91cCA0ID0gXCJvbi1cIlxuY29uc3QgS1dfT05fSURYID0gNDtcbi8vIEdyb3VwIDUgPSBcImJpbmRvbi1cIlxuY29uc3QgS1dfQklORE9OX0lEWCA9IDU7XG4vLyBHcm91cCA2ID0gXCJAXCJcbmNvbnN0IEtXX0FUX0lEWCA9IDY7XG4vLyBHcm91cCA3ID0gdGhlIGlkZW50aWZpZXIgYWZ0ZXIgXCJiaW5kLVwiLCBcImxldC1cIiwgXCJyZWYtLyNcIiwgXCJvbi1cIiwgXCJiaW5kb24tXCIgb3IgXCJAXCJcbmNvbnN0IElERU5UX0tXX0lEWCA9IDc7XG4vLyBHcm91cCA4ID0gaWRlbnRpZmllciBpbnNpZGUgWygpXVxuY29uc3QgSURFTlRfQkFOQU5BX0JPWF9JRFggPSA4O1xuLy8gR3JvdXAgOSA9IGlkZW50aWZpZXIgaW5zaWRlIFtdXG5jb25zdCBJREVOVF9QUk9QRVJUWV9JRFggPSA5O1xuLy8gR3JvdXAgMTAgPSBpZGVudGlmaWVyIGluc2lkZSAoKVxuY29uc3QgSURFTlRfRVZFTlRfSURYID0gMTA7XG5cbmNvbnN0IFRFTVBMQVRFX0FUVFJfUFJFRklYID0gJyonO1xuY29uc3QgQ0xBU1NfQVRUUiA9ICdjbGFzcyc7XG4vLyBEZWZhdWx0IHNlbGVjdG9yIHVzZWQgYnkgYDxuZy1jb250ZW50PmAgaWYgbm9uZSBzcGVjaWZpZWRcbmNvbnN0IERFRkFVTFRfQ09OVEVOVF9TRUxFQ1RPUiA9ICcqJztcblxuLy8gUmVzdWx0IG9mIHRoZSBodG1sIEFTVCB0byBJdnkgQVNUIHRyYW5zZm9ybWF0aW9uXG5leHBvcnQgdHlwZSBSZW5kZXIzUGFyc2VSZXN1bHQgPSB7XG4gIG5vZGVzOiB0Lk5vZGVbXTsgZXJyb3JzOiBQYXJzZUVycm9yW107XG4gIC8vIEFueSBub24gZGVmYXVsdCAoZW1wdHkgb3IgJyonKSBzZWxlY3RvciBmb3VuZCBpbiB0aGUgdGVtcGxhdGVcbiAgbmdDb250ZW50U2VsZWN0b3JzOiBzdHJpbmdbXTtcbiAgLy8gV2V0aGVyIHRoZSB0ZW1wbGF0ZSBjb250YWlucyBhbnkgYDxuZy1jb250ZW50PmBcbiAgaGFzTmdDb250ZW50OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGh0bWxBc3RUb1JlbmRlcjNBc3QoXG4gICAgaHRtbE5vZGVzOiBodG1sLk5vZGVbXSwgYmluZGluZ1BhcnNlcjogQmluZGluZ1BhcnNlcik6IFJlbmRlcjNQYXJzZVJlc3VsdCB7XG4gIGNvbnN0IHRyYW5zZm9ybWVyID0gbmV3IEh0bWxBc3RUb0l2eUFzdChiaW5kaW5nUGFyc2VyKTtcbiAgY29uc3QgaXZ5Tm9kZXMgPSBodG1sLnZpc2l0QWxsKHRyYW5zZm9ybWVyLCBodG1sTm9kZXMpO1xuXG4gIC8vIEVycm9ycyBtaWdodCBvcmlnaW5hdGUgaW4gZWl0aGVyIHRoZSBiaW5kaW5nIHBhcnNlciBvciB0aGUgaHRtbCB0byBpdnkgdHJhbnNmb3JtZXJcbiAgY29uc3QgYWxsRXJyb3JzID0gYmluZGluZ1BhcnNlci5lcnJvcnMuY29uY2F0KHRyYW5zZm9ybWVyLmVycm9ycyk7XG4gIGNvbnN0IGVycm9yczogUGFyc2VFcnJvcltdID0gYWxsRXJyb3JzLmZpbHRlcihlID0+IGUubGV2ZWwgPT09IFBhcnNlRXJyb3JMZXZlbC5FUlJPUik7XG5cbiAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZXJyb3JTdHJpbmcgPSBlcnJvcnMuam9pbignXFxuJyk7XG4gICAgdGhyb3cgc3ludGF4RXJyb3IoYFRlbXBsYXRlIHBhcnNlIGVycm9yczpcXG4ke2Vycm9yU3RyaW5nfWAsIGVycm9ycyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5vZGVzOiBpdnlOb2RlcyxcbiAgICBlcnJvcnM6IGFsbEVycm9ycyxcbiAgICBuZ0NvbnRlbnRTZWxlY3RvcnM6IHRyYW5zZm9ybWVyLm5nQ29udGVudFNlbGVjdG9ycyxcbiAgICBoYXNOZ0NvbnRlbnQ6IHRyYW5zZm9ybWVyLmhhc05nQ29udGVudCxcbiAgfTtcbn1cblxuY2xhc3MgSHRtbEFzdFRvSXZ5QXN0IGltcGxlbWVudHMgaHRtbC5WaXNpdG9yIHtcbiAgZXJyb3JzOiBQYXJzZUVycm9yW10gPSBbXTtcbiAgLy8gU2VsZWN0b3JzIGZvciB0aGUgYG5nLWNvbnRlbnRgIHRhZ3MuIE9ubHkgbm9uIGAqYCBzZWxlY3RvcnMgYXJlIHJlY29yZGVkIGhlcmVcbiAgbmdDb250ZW50U2VsZWN0b3JzOiBzdHJpbmdbXSA9IFtdO1xuICAvLyBBbnkgYDxuZy1jb250ZW50PmAgaW4gdGhlIHRlbXBsYXRlID9cbiAgaGFzTmdDb250ZW50ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiaW5kaW5nUGFyc2VyOiBCaW5kaW5nUGFyc2VyKSB7fVxuXG4gIC8vIEhUTUwgdmlzaXRvclxuICB2aXNpdEVsZW1lbnQoZWxlbWVudDogaHRtbC5FbGVtZW50KTogdC5Ob2RlfG51bGwge1xuICAgIGNvbnN0IHByZXBhcnNlZEVsZW1lbnQgPSBwcmVwYXJzZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgaWYgKHByZXBhcnNlZEVsZW1lbnQudHlwZSA9PT0gUHJlcGFyc2VkRWxlbWVudFR5cGUuU0NSSVBUIHx8XG4gICAgICAgIHByZXBhcnNlZEVsZW1lbnQudHlwZSA9PT0gUHJlcGFyc2VkRWxlbWVudFR5cGUuU1RZTEUpIHtcbiAgICAgIC8vIFNraXBwaW5nIDxzY3JpcHQ+IGZvciBzZWN1cml0eSByZWFzb25zXG4gICAgICAvLyBTa2lwcGluZyA8c3R5bGU+IGFzIHdlIGFscmVhZHkgcHJvY2Vzc2VkIHRoZW1cbiAgICAgIC8vIGluIHRoZSBTdHlsZUNvbXBpbGVyXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHByZXBhcnNlZEVsZW1lbnQudHlwZSA9PT0gUHJlcGFyc2VkRWxlbWVudFR5cGUuU1RZTEVTSEVFVCAmJlxuICAgICAgICBpc1N0eWxlVXJsUmVzb2x2YWJsZShwcmVwYXJzZWRFbGVtZW50LmhyZWZBdHRyKSkge1xuICAgICAgLy8gU2tpcHBpbmcgc3R5bGVzaGVldHMgd2l0aCBlaXRoZXIgcmVsYXRpdmUgdXJscyBvciBwYWNrYWdlIHNjaGVtZSBhcyB3ZSBhbHJlYWR5IHByb2Nlc3NlZFxuICAgICAgLy8gdGhlbSBpbiB0aGUgU3R5bGVDb21waWxlclxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gV2hldGhlciB0aGUgZWxlbWVudCBpcyBhIGA8bmctdGVtcGxhdGU+YFxuICAgIGNvbnN0IGlzVGVtcGxhdGVFbGVtZW50ID0gaXNOZ1RlbXBsYXRlKGVsZW1lbnQubmFtZSk7XG5cbiAgICBjb25zdCBtYXRjaGFibGVBdHRyaWJ1dGVzOiBbc3RyaW5nLCBzdHJpbmddW10gPSBbXTtcbiAgICBjb25zdCBwYXJzZWRQcm9wZXJ0aWVzOiBQYXJzZWRQcm9wZXJ0eVtdID0gW107XG4gICAgY29uc3QgYm91bmRFdmVudHM6IHQuQm91bmRFdmVudFtdID0gW107XG4gICAgY29uc3QgdmFyaWFibGVzOiB0LlZhcmlhYmxlW10gPSBbXTtcbiAgICBjb25zdCByZWZlcmVuY2VzOiB0LlJlZmVyZW5jZVtdID0gW107XG4gICAgY29uc3QgYXR0cmlidXRlczogdC5UZXh0QXR0cmlidXRlW10gPSBbXTtcblxuICAgIGNvbnN0IHRlbXBsYXRlTWF0Y2hhYmxlQXR0cmlidXRlczogW3N0cmluZywgc3RyaW5nXVtdID0gW107XG4gICAgbGV0IGlubGluZVRlbXBsYXRlU291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuO1xuICAgIGNvbnN0IHRlbXBsYXRlUGFyc2VkUHJvcGVydGllczogUGFyc2VkUHJvcGVydHlbXSA9IFtdO1xuICAgIGNvbnN0IHRlbXBsYXRlVmFyaWFibGVzOiB0LlZhcmlhYmxlW10gPSBbXTtcblxuICAgIC8vIFdoZXRoZXIgdGhlIGVsZW1lbnQgaGFzIGFueSAqLWF0dHJpYnV0ZVxuICAgIGxldCBlbGVtZW50SGFzSW5saW5lVGVtcGxhdGUgPSBmYWxzZTtcblxuICAgIGZvciAoY29uc3QgYXR0cmlidXRlIG9mIGVsZW1lbnQuYXR0cnMpIHtcbiAgICAgIGxldCBoYXNCaW5kaW5nID0gZmFsc2U7XG4gICAgICBjb25zdCBub3JtYWxpemVkTmFtZSA9IG5vcm1hbGl6ZUF0dHJpYnV0ZU5hbWUoYXR0cmlidXRlLm5hbWUpO1xuXG4gICAgICAvLyBgKmF0dHJgIGRlZmluZXMgdGVtcGxhdGUgYmluZGluZ3NcbiAgICAgIGxldCBpc1RlbXBsYXRlQmluZGluZyA9IGZhbHNlO1xuXG4gICAgICBpZiAobm9ybWFsaXplZE5hbWUuc3RhcnRzV2l0aChURU1QTEFURV9BVFRSX1BSRUZJWCkpIHtcbiAgICAgICAgaWYgKGVsZW1lbnRIYXNJbmxpbmVUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMucmVwb3J0RXJyb3IoXG4gICAgICAgICAgICAgIGBDYW4ndCBoYXZlIG11bHRpcGxlIHRlbXBsYXRlIGJpbmRpbmdzIG9uIG9uZSBlbGVtZW50LiBVc2Ugb25seSBvbmUgYXR0cmlidXRlIHByZWZpeGVkIHdpdGggKmAsXG4gICAgICAgICAgICAgIGF0dHJpYnV0ZS5zb3VyY2VTcGFuKTtcbiAgICAgICAgfVxuICAgICAgICBpc1RlbXBsYXRlQmluZGluZyA9IHRydWU7XG4gICAgICAgIGVsZW1lbnRIYXNJbmxpbmVUZW1wbGF0ZSA9IHRydWU7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlVmFsdWUgPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlS2V5ID0gbm9ybWFsaXplZE5hbWUuc3Vic3RyaW5nKFRFTVBMQVRFX0FUVFJfUFJFRklYLmxlbmd0aCk7XG5cbiAgICAgICAgaW5saW5lVGVtcGxhdGVTb3VyY2VTcGFuID0gYXR0cmlidXRlLnZhbHVlU3BhbiB8fCBhdHRyaWJ1dGUuc291cmNlU3BhbjtcblxuICAgICAgICBjb25zdCBwYXJzZWRWYXJpYWJsZXM6IFBhcnNlZFZhcmlhYmxlW10gPSBbXTtcbiAgICAgICAgdGhpcy5iaW5kaW5nUGFyc2VyLnBhcnNlSW5saW5lVGVtcGxhdGVCaW5kaW5nKFxuICAgICAgICAgICAgdGVtcGxhdGVLZXksIHRlbXBsYXRlVmFsdWUsIGF0dHJpYnV0ZS5zb3VyY2VTcGFuLCB0ZW1wbGF0ZU1hdGNoYWJsZUF0dHJpYnV0ZXMsXG4gICAgICAgICAgICB0ZW1wbGF0ZVBhcnNlZFByb3BlcnRpZXMsIHBhcnNlZFZhcmlhYmxlcyk7XG4gICAgICAgIHRlbXBsYXRlVmFyaWFibGVzLnB1c2goXG4gICAgICAgICAgICAuLi5wYXJzZWRWYXJpYWJsZXMubWFwKHYgPT4gbmV3IHQuVmFyaWFibGUodi5uYW1lLCB2LnZhbHVlLCB2LnNvdXJjZVNwYW4pKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDaGVjayBmb3IgdmFyaWFibGVzLCBldmVudHMsIHByb3BlcnR5IGJpbmRpbmdzLCBpbnRlcnBvbGF0aW9uXG4gICAgICAgIGhhc0JpbmRpbmcgPSB0aGlzLnBhcnNlQXR0cmlidXRlKFxuICAgICAgICAgICAgaXNUZW1wbGF0ZUVsZW1lbnQsIGF0dHJpYnV0ZSwgbWF0Y2hhYmxlQXR0cmlidXRlcywgcGFyc2VkUHJvcGVydGllcywgYm91bmRFdmVudHMsXG4gICAgICAgICAgICB2YXJpYWJsZXMsIHJlZmVyZW5jZXMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWhhc0JpbmRpbmcgJiYgIWlzVGVtcGxhdGVCaW5kaW5nKSB7XG4gICAgICAgIC8vIGRvbid0IGluY2x1ZGUgdGhlIGJpbmRpbmdzIGFzIGF0dHJpYnV0ZXMgYXMgd2VsbCBpbiB0aGUgQVNUXG4gICAgICAgIGF0dHJpYnV0ZXMucHVzaCh0aGlzLnZpc2l0QXR0cmlidXRlKGF0dHJpYnV0ZSkgYXMgdC5UZXh0QXR0cmlidXRlKTtcbiAgICAgICAgbWF0Y2hhYmxlQXR0cmlidXRlcy5wdXNoKFthdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hpbGRyZW46IHQuTm9kZVtdID1cbiAgICAgICAgaHRtbC52aXNpdEFsbChwcmVwYXJzZWRFbGVtZW50Lm5vbkJpbmRhYmxlID8gTk9OX0JJTkRBQkxFX1ZJU0lUT1IgOiB0aGlzLCBlbGVtZW50LmNoaWxkcmVuKTtcblxuICAgIGxldCBwYXJzZWRFbGVtZW50OiB0Lk5vZGV8dW5kZWZpbmVkO1xuICAgIGlmIChwcmVwYXJzZWRFbGVtZW50LnR5cGUgPT09IFByZXBhcnNlZEVsZW1lbnRUeXBlLk5HX0NPTlRFTlQpIHtcbiAgICAgIC8vIGA8bmctY29udGVudD5gXG4gICAgICB0aGlzLmhhc05nQ29udGVudCA9IHRydWU7XG5cbiAgICAgIGlmIChlbGVtZW50LmNoaWxkcmVuICYmICFlbGVtZW50LmNoaWxkcmVuLmV2ZXJ5KGlzRW1wdHlUZXh0Tm9kZSkpIHtcbiAgICAgICAgdGhpcy5yZXBvcnRFcnJvcihgPG5nLWNvbnRlbnQ+IGVsZW1lbnQgY2Fubm90IGhhdmUgY29udGVudC5gLCBlbGVtZW50LnNvdXJjZVNwYW4pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzZWxlY3RvciA9IHByZXBhcnNlZEVsZW1lbnQuc2VsZWN0QXR0cjtcblxuICAgICAgbGV0IGF0dHJpYnV0ZXM6IHQuVGV4dEF0dHJpYnV0ZVtdID0gZWxlbWVudC5hdHRycy5tYXAoYXR0cmlidXRlID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyB0LlRleHRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlLCBhdHRyaWJ1dGUuc291cmNlU3BhbiwgYXR0cmlidXRlLnZhbHVlU3Bhbik7XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2VsZWN0b3JJbmRleCA9XG4gICAgICAgICAgc2VsZWN0b3IgPT09IERFRkFVTFRfQ09OVEVOVF9TRUxFQ1RPUiA/IDAgOiB0aGlzLm5nQ29udGVudFNlbGVjdG9ycy5wdXNoKHNlbGVjdG9yKTtcbiAgICAgIHBhcnNlZEVsZW1lbnQgPSBuZXcgdC5Db250ZW50KHNlbGVjdG9ySW5kZXgsIGF0dHJpYnV0ZXMsIGVsZW1lbnQuc291cmNlU3Bhbik7XG4gICAgfSBlbHNlIGlmIChpc1RlbXBsYXRlRWxlbWVudCkge1xuICAgICAgLy8gYDxuZy10ZW1wbGF0ZT5gXG4gICAgICBjb25zdCBib3VuZEF0dHJpYnV0ZXMgPSB0aGlzLmNyZWF0ZUJvdW5kQXR0cmlidXRlcyhlbGVtZW50Lm5hbWUsIHBhcnNlZFByb3BlcnRpZXMpO1xuICAgICAgcGFyc2VkRWxlbWVudCA9IG5ldyB0LlRlbXBsYXRlKFxuICAgICAgICAgIGF0dHJpYnV0ZXMsIGJvdW5kQXR0cmlidXRlcywgY2hpbGRyZW4sIHJlZmVyZW5jZXMsIHZhcmlhYmxlcywgZWxlbWVudC5zb3VyY2VTcGFuLFxuICAgICAgICAgIGVsZW1lbnQuc3RhcnRTb3VyY2VTcGFuLCBlbGVtZW50LmVuZFNvdXJjZVNwYW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBib3VuZEF0dHJpYnV0ZXMgPSB0aGlzLmNyZWF0ZUJvdW5kQXR0cmlidXRlcyhlbGVtZW50Lm5hbWUsIHBhcnNlZFByb3BlcnRpZXMpO1xuXG4gICAgICBwYXJzZWRFbGVtZW50ID0gbmV3IHQuRWxlbWVudChcbiAgICAgICAgICBlbGVtZW50Lm5hbWUsIGF0dHJpYnV0ZXMsIGJvdW5kQXR0cmlidXRlcywgYm91bmRFdmVudHMsIGNoaWxkcmVuLCByZWZlcmVuY2VzLFxuICAgICAgICAgIGVsZW1lbnQuc291cmNlU3BhbiwgZWxlbWVudC5zdGFydFNvdXJjZVNwYW4sIGVsZW1lbnQuZW5kU291cmNlU3Bhbik7XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnRIYXNJbmxpbmVUZW1wbGF0ZSkge1xuICAgICAgY29uc3QgYXR0cmlidXRlczogdC5UZXh0QXR0cmlidXRlW10gPSBbXTtcblxuICAgICAgdGVtcGxhdGVNYXRjaGFibGVBdHRyaWJ1dGVzLmZvckVhY2goXG4gICAgICAgICAgKFtuYW1lLCB2YWx1ZV0pID0+XG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuZXcgdC5UZXh0QXR0cmlidXRlKG5hbWUsIHZhbHVlLCBpbmxpbmVUZW1wbGF0ZVNvdXJjZVNwYW4pKSk7XG5cbiAgICAgIGNvbnN0IGJvdW5kQXR0cmlidXRlcyA9IHRoaXMuY3JlYXRlQm91bmRBdHRyaWJ1dGVzKCduZy10ZW1wbGF0ZScsIHRlbXBsYXRlUGFyc2VkUHJvcGVydGllcyk7XG4gICAgICBwYXJzZWRFbGVtZW50ID0gbmV3IHQuVGVtcGxhdGUoXG4gICAgICAgICAgYXR0cmlidXRlcywgYm91bmRBdHRyaWJ1dGVzLCBbcGFyc2VkRWxlbWVudF0sIFtdLCB0ZW1wbGF0ZVZhcmlhYmxlcywgZWxlbWVudC5zb3VyY2VTcGFuLFxuICAgICAgICAgIGVsZW1lbnQuc3RhcnRTb3VyY2VTcGFuLCBlbGVtZW50LmVuZFNvdXJjZVNwYW4pO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VkRWxlbWVudDtcbiAgfVxuXG4gIHZpc2l0QXR0cmlidXRlKGF0dHJpYnV0ZTogaHRtbC5BdHRyaWJ1dGUpOiB0Lk5vZGUge1xuICAgIHJldHVybiBuZXcgdC5UZXh0QXR0cmlidXRlKFxuICAgICAgICBhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlLCBhdHRyaWJ1dGUuc291cmNlU3BhbiwgYXR0cmlidXRlLnZhbHVlU3Bhbik7XG4gIH1cblxuICB2aXNpdFRleHQodGV4dDogaHRtbC5UZXh0KTogdC5Ob2RlIHtcbiAgICBjb25zdCB2YWx1ZU5vTmdzcCA9IHJlcGxhY2VOZ3NwKHRleHQudmFsdWUpO1xuICAgIGNvbnN0IGV4cHIgPSB0aGlzLmJpbmRpbmdQYXJzZXIucGFyc2VJbnRlcnBvbGF0aW9uKHZhbHVlTm9OZ3NwLCB0ZXh0LnNvdXJjZVNwYW4pO1xuICAgIHJldHVybiBleHByID8gbmV3IHQuQm91bmRUZXh0KGV4cHIsIHRleHQuc291cmNlU3BhbikgOiBuZXcgdC5UZXh0KHZhbHVlTm9OZ3NwLCB0ZXh0LnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXRDb21tZW50KGNvbW1lbnQ6IGh0bWwuQ29tbWVudCk6IG51bGwgeyByZXR1cm4gbnVsbDsgfVxuXG4gIHZpc2l0RXhwYW5zaW9uKGV4cGFuc2lvbjogaHRtbC5FeHBhbnNpb24pOiBudWxsIHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdEV4cGFuc2lvbkNhc2UoZXhwYW5zaW9uQ2FzZTogaHRtbC5FeHBhbnNpb25DYXNlKTogbnVsbCB7IHJldHVybiBudWxsOyB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCb3VuZEF0dHJpYnV0ZXMoZWxlbWVudE5hbWU6IHN0cmluZywgcHJvcGVydGllczogUGFyc2VkUHJvcGVydHlbXSk6XG4gICAgICB0LkJvdW5kQXR0cmlidXRlW10ge1xuICAgIHJldHVybiBwcm9wZXJ0aWVzLmZpbHRlcihwcm9wID0+ICFwcm9wLmlzTGl0ZXJhbClcbiAgICAgICAgLm1hcChwcm9wID0+IHRoaXMuYmluZGluZ1BhcnNlci5jcmVhdGVCb3VuZEVsZW1lbnRQcm9wZXJ0eShlbGVtZW50TmFtZSwgcHJvcCkpXG4gICAgICAgIC5tYXAocHJvcCA9PiB0LkJvdW5kQXR0cmlidXRlLmZyb21Cb3VuZEVsZW1lbnRQcm9wZXJ0eShwcm9wKSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQXR0cmlidXRlKFxuICAgICAgaXNUZW1wbGF0ZUVsZW1lbnQ6IGJvb2xlYW4sIGF0dHJpYnV0ZTogaHRtbC5BdHRyaWJ1dGUsIG1hdGNoYWJsZUF0dHJpYnV0ZXM6IHN0cmluZ1tdW10sXG4gICAgICBwYXJzZWRQcm9wZXJ0aWVzOiBQYXJzZWRQcm9wZXJ0eVtdLCBib3VuZEV2ZW50czogdC5Cb3VuZEV2ZW50W10sIHZhcmlhYmxlczogdC5WYXJpYWJsZVtdLFxuICAgICAgcmVmZXJlbmNlczogdC5SZWZlcmVuY2VbXSkge1xuICAgIGNvbnN0IG5hbWUgPSBub3JtYWxpemVBdHRyaWJ1dGVOYW1lKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICBjb25zdCBzcmNTcGFuID0gYXR0cmlidXRlLnNvdXJjZVNwYW47XG5cbiAgICBjb25zdCBiaW5kUGFydHMgPSBuYW1lLm1hdGNoKEJJTkRfTkFNRV9SRUdFWFApO1xuICAgIGxldCBoYXNCaW5kaW5nID0gZmFsc2U7XG5cbiAgICBpZiAoYmluZFBhcnRzKSB7XG4gICAgICBoYXNCaW5kaW5nID0gdHJ1ZTtcbiAgICAgIGlmIChiaW5kUGFydHNbS1dfQklORF9JRFhdICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5iaW5kaW5nUGFyc2VyLnBhcnNlUHJvcGVydHlCaW5kaW5nKFxuICAgICAgICAgICAgYmluZFBhcnRzW0lERU5UX0tXX0lEWF0sIHZhbHVlLCBmYWxzZSwgc3JjU3BhbiwgbWF0Y2hhYmxlQXR0cmlidXRlcywgcGFyc2VkUHJvcGVydGllcyk7XG5cbiAgICAgIH0gZWxzZSBpZiAoYmluZFBhcnRzW0tXX0xFVF9JRFhdKSB7XG4gICAgICAgIGlmIChpc1RlbXBsYXRlRWxlbWVudCkge1xuICAgICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSBiaW5kUGFydHNbSURFTlRfS1dfSURYXTtcbiAgICAgICAgICB0aGlzLnBhcnNlVmFyaWFibGUoaWRlbnRpZmllciwgdmFsdWUsIHNyY1NwYW4sIHZhcmlhYmxlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZXBvcnRFcnJvcihgXCJsZXQtXCIgaXMgb25seSBzdXBwb3J0ZWQgb24gbmctdGVtcGxhdGUgZWxlbWVudHMuYCwgc3JjU3Bhbik7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIGlmIChiaW5kUGFydHNbS1dfUkVGX0lEWF0pIHtcbiAgICAgICAgY29uc3QgaWRlbnRpZmllciA9IGJpbmRQYXJ0c1tJREVOVF9LV19JRFhdO1xuICAgICAgICB0aGlzLnBhcnNlUmVmZXJlbmNlKGlkZW50aWZpZXIsIHZhbHVlLCBzcmNTcGFuLCByZWZlcmVuY2VzKTtcblxuICAgICAgfSBlbHNlIGlmIChiaW5kUGFydHNbS1dfT05fSURYXSkge1xuICAgICAgICBjb25zdCBldmVudHM6IFBhcnNlZEV2ZW50W10gPSBbXTtcbiAgICAgICAgdGhpcy5iaW5kaW5nUGFyc2VyLnBhcnNlRXZlbnQoXG4gICAgICAgICAgICBiaW5kUGFydHNbSURFTlRfS1dfSURYXSwgdmFsdWUsIHNyY1NwYW4sIG1hdGNoYWJsZUF0dHJpYnV0ZXMsIGV2ZW50cyk7XG4gICAgICAgIGFkZEV2ZW50cyhldmVudHMsIGJvdW5kRXZlbnRzKTtcbiAgICAgIH0gZWxzZSBpZiAoYmluZFBhcnRzW0tXX0JJTkRPTl9JRFhdKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ1BhcnNlci5wYXJzZVByb3BlcnR5QmluZGluZyhcbiAgICAgICAgICAgIGJpbmRQYXJ0c1tJREVOVF9LV19JRFhdLCB2YWx1ZSwgZmFsc2UsIHNyY1NwYW4sIG1hdGNoYWJsZUF0dHJpYnV0ZXMsIHBhcnNlZFByb3BlcnRpZXMpO1xuICAgICAgICB0aGlzLnBhcnNlQXNzaWdubWVudEV2ZW50KFxuICAgICAgICAgICAgYmluZFBhcnRzW0lERU5UX0tXX0lEWF0sIHZhbHVlLCBzcmNTcGFuLCBtYXRjaGFibGVBdHRyaWJ1dGVzLCBib3VuZEV2ZW50cyk7XG4gICAgICB9IGVsc2UgaWYgKGJpbmRQYXJ0c1tLV19BVF9JRFhdKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ1BhcnNlci5wYXJzZUxpdGVyYWxBdHRyKFxuICAgICAgICAgICAgbmFtZSwgdmFsdWUsIHNyY1NwYW4sIG1hdGNoYWJsZUF0dHJpYnV0ZXMsIHBhcnNlZFByb3BlcnRpZXMpO1xuXG4gICAgICB9IGVsc2UgaWYgKGJpbmRQYXJ0c1tJREVOVF9CQU5BTkFfQk9YX0lEWF0pIHtcbiAgICAgICAgdGhpcy5iaW5kaW5nUGFyc2VyLnBhcnNlUHJvcGVydHlCaW5kaW5nKFxuICAgICAgICAgICAgYmluZFBhcnRzW0lERU5UX0JBTkFOQV9CT1hfSURYXSwgdmFsdWUsIGZhbHNlLCBzcmNTcGFuLCBtYXRjaGFibGVBdHRyaWJ1dGVzLFxuICAgICAgICAgICAgcGFyc2VkUHJvcGVydGllcyk7XG4gICAgICAgIHRoaXMucGFyc2VBc3NpZ25tZW50RXZlbnQoXG4gICAgICAgICAgICBiaW5kUGFydHNbSURFTlRfQkFOQU5BX0JPWF9JRFhdLCB2YWx1ZSwgc3JjU3BhbiwgbWF0Y2hhYmxlQXR0cmlidXRlcywgYm91bmRFdmVudHMpO1xuXG4gICAgICB9IGVsc2UgaWYgKGJpbmRQYXJ0c1tJREVOVF9QUk9QRVJUWV9JRFhdKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ1BhcnNlci5wYXJzZVByb3BlcnR5QmluZGluZyhcbiAgICAgICAgICAgIGJpbmRQYXJ0c1tJREVOVF9QUk9QRVJUWV9JRFhdLCB2YWx1ZSwgZmFsc2UsIHNyY1NwYW4sIG1hdGNoYWJsZUF0dHJpYnV0ZXMsXG4gICAgICAgICAgICBwYXJzZWRQcm9wZXJ0aWVzKTtcblxuICAgICAgfSBlbHNlIGlmIChiaW5kUGFydHNbSURFTlRfRVZFTlRfSURYXSkge1xuICAgICAgICBjb25zdCBldmVudHM6IFBhcnNlZEV2ZW50W10gPSBbXTtcbiAgICAgICAgdGhpcy5iaW5kaW5nUGFyc2VyLnBhcnNlRXZlbnQoXG4gICAgICAgICAgICBiaW5kUGFydHNbSURFTlRfRVZFTlRfSURYXSwgdmFsdWUsIHNyY1NwYW4sIG1hdGNoYWJsZUF0dHJpYnV0ZXMsIGV2ZW50cyk7XG4gICAgICAgIGFkZEV2ZW50cyhldmVudHMsIGJvdW5kRXZlbnRzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGFzQmluZGluZyA9IHRoaXMuYmluZGluZ1BhcnNlci5wYXJzZVByb3BlcnR5SW50ZXJwb2xhdGlvbihcbiAgICAgICAgICBuYW1lLCB2YWx1ZSwgc3JjU3BhbiwgbWF0Y2hhYmxlQXR0cmlidXRlcywgcGFyc2VkUHJvcGVydGllcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhc0JpbmRpbmc7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlVmFyaWFibGUoXG4gICAgICBpZGVudGlmaWVyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgdmFyaWFibGVzOiB0LlZhcmlhYmxlW10pIHtcbiAgICBpZiAoaWRlbnRpZmllci5pbmRleE9mKCctJykgPiAtMSkge1xuICAgICAgdGhpcy5yZXBvcnRFcnJvcihgXCItXCIgaXMgbm90IGFsbG93ZWQgaW4gdmFyaWFibGUgbmFtZXNgLCBzb3VyY2VTcGFuKTtcbiAgICB9XG4gICAgdmFyaWFibGVzLnB1c2gobmV3IHQuVmFyaWFibGUoaWRlbnRpZmllciwgdmFsdWUsIHNvdXJjZVNwYW4pKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VSZWZlcmVuY2UoXG4gICAgICBpZGVudGlmaWVyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgcmVmZXJlbmNlczogdC5SZWZlcmVuY2VbXSkge1xuICAgIGlmIChpZGVudGlmaWVyLmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICB0aGlzLnJlcG9ydEVycm9yKGBcIi1cIiBpcyBub3QgYWxsb3dlZCBpbiByZWZlcmVuY2UgbmFtZXNgLCBzb3VyY2VTcGFuKTtcbiAgICB9XG5cbiAgICByZWZlcmVuY2VzLnB1c2gobmV3IHQuUmVmZXJlbmNlKGlkZW50aWZpZXIsIHZhbHVlLCBzb3VyY2VTcGFuKSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQXNzaWdubWVudEV2ZW50KFxuICAgICAgbmFtZTogc3RyaW5nLCBleHByZXNzaW9uOiBzdHJpbmcsIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIHRhcmdldE1hdGNoYWJsZUF0dHJzOiBzdHJpbmdbXVtdLCBib3VuZEV2ZW50czogdC5Cb3VuZEV2ZW50W10pIHtcbiAgICBjb25zdCBldmVudHM6IFBhcnNlZEV2ZW50W10gPSBbXTtcbiAgICB0aGlzLmJpbmRpbmdQYXJzZXIucGFyc2VFdmVudChcbiAgICAgICAgYCR7bmFtZX1DaGFuZ2VgLCBgJHtleHByZXNzaW9ufT0kZXZlbnRgLCBzb3VyY2VTcGFuLCB0YXJnZXRNYXRjaGFibGVBdHRycywgZXZlbnRzKTtcbiAgICBhZGRFdmVudHMoZXZlbnRzLCBib3VuZEV2ZW50cyk7XG4gIH1cblxuICBwcml2YXRlIHJlcG9ydEVycm9yKFxuICAgICAgbWVzc2FnZTogc3RyaW5nLCBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICBsZXZlbDogUGFyc2VFcnJvckxldmVsID0gUGFyc2VFcnJvckxldmVsLkVSUk9SKSB7XG4gICAgdGhpcy5lcnJvcnMucHVzaChuZXcgUGFyc2VFcnJvcihzb3VyY2VTcGFuLCBtZXNzYWdlLCBsZXZlbCkpO1xuICB9XG59XG5cbmNsYXNzIE5vbkJpbmRhYmxlVmlzaXRvciBpbXBsZW1lbnRzIGh0bWwuVmlzaXRvciB7XG4gIHZpc2l0RWxlbWVudChhc3Q6IGh0bWwuRWxlbWVudCk6IHQuRWxlbWVudHxudWxsIHtcbiAgICBjb25zdCBwcmVwYXJzZWRFbGVtZW50ID0gcHJlcGFyc2VFbGVtZW50KGFzdCk7XG4gICAgaWYgKHByZXBhcnNlZEVsZW1lbnQudHlwZSA9PT0gUHJlcGFyc2VkRWxlbWVudFR5cGUuU0NSSVBUIHx8XG4gICAgICAgIHByZXBhcnNlZEVsZW1lbnQudHlwZSA9PT0gUHJlcGFyc2VkRWxlbWVudFR5cGUuU1RZTEUgfHxcbiAgICAgICAgcHJlcGFyc2VkRWxlbWVudC50eXBlID09PSBQcmVwYXJzZWRFbGVtZW50VHlwZS5TVFlMRVNIRUVUKSB7XG4gICAgICAvLyBTa2lwcGluZyA8c2NyaXB0PiBmb3Igc2VjdXJpdHkgcmVhc29uc1xuICAgICAgLy8gU2tpcHBpbmcgPHN0eWxlPiBhbmQgc3R5bGVzaGVldHMgYXMgd2UgYWxyZWFkeSBwcm9jZXNzZWQgdGhlbVxuICAgICAgLy8gaW4gdGhlIFN0eWxlQ29tcGlsZXJcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuOiB0Lk5vZGVbXSA9IGh0bWwudmlzaXRBbGwodGhpcywgYXN0LmNoaWxkcmVuLCBudWxsKTtcbiAgICByZXR1cm4gbmV3IHQuRWxlbWVudChcbiAgICAgICAgYXN0Lm5hbWUsIGh0bWwudmlzaXRBbGwodGhpcywgYXN0LmF0dHJzKSBhcyB0LlRleHRBdHRyaWJ1dGVbXSxcbiAgICAgICAgLyogaW5wdXRzICovW10sIC8qIG91dHB1dHMgKi9bXSwgY2hpbGRyZW4swqAgLyogcmVmZXJlbmNlcyAqL1tdLCBhc3Quc291cmNlU3BhbixcbiAgICAgICAgYXN0LnN0YXJ0U291cmNlU3BhbiwgYXN0LmVuZFNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXRDb21tZW50KGNvbW1lbnQ6IGh0bWwuQ29tbWVudCk6IGFueSB7IHJldHVybiBudWxsOyB9XG5cbiAgdmlzaXRBdHRyaWJ1dGUoYXR0cmlidXRlOiBodG1sLkF0dHJpYnV0ZSk6IHQuVGV4dEF0dHJpYnV0ZSB7XG4gICAgcmV0dXJuIG5ldyB0LlRleHRBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZS52YWx1ZSwgYXR0cmlidXRlLnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXRUZXh0KHRleHQ6IGh0bWwuVGV4dCk6IHQuVGV4dCB7IHJldHVybiBuZXcgdC5UZXh0KHRleHQudmFsdWUsIHRleHQuc291cmNlU3Bhbik7IH1cblxuICB2aXNpdEV4cGFuc2lvbihleHBhbnNpb246IGh0bWwuRXhwYW5zaW9uKTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdEV4cGFuc2lvbkNhc2UoZXhwYW5zaW9uQ2FzZTogaHRtbC5FeHBhbnNpb25DYXNlKTogYW55IHsgcmV0dXJuIG51bGw7IH1cbn1cblxuY29uc3QgTk9OX0JJTkRBQkxFX1ZJU0lUT1IgPSBuZXcgTm9uQmluZGFibGVWaXNpdG9yKCk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUF0dHJpYnV0ZU5hbWUoYXR0ck5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiAvXmRhdGEtL2kudGVzdChhdHRyTmFtZSkgPyBhdHRyTmFtZS5zdWJzdHJpbmcoNSkgOiBhdHRyTmFtZTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRzKGV2ZW50czogUGFyc2VkRXZlbnRbXSwgYm91bmRFdmVudHM6IHQuQm91bmRFdmVudFtdKSB7XG4gIGJvdW5kRXZlbnRzLnB1c2goLi4uZXZlbnRzLm1hcChlID0+IHQuQm91bmRFdmVudC5mcm9tUGFyc2VkRXZlbnQoZSkpKTtcbn1cblxuZnVuY3Rpb24gaXNFbXB0eVRleHROb2RlKG5vZGU6IGh0bWwuTm9kZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIGh0bWwuVGV4dCAmJiBub2RlLnZhbHVlLnRyaW0oKS5sZW5ndGggPT0gMDtcbn1cbiJdfQ==