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
        define("@angular/compiler/src/template_parser/template_ast", ["require", "exports", "tslib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var _a;
    /**
     * A segment of text within the template.
     */
    var TextAst = /** @class */ (function () {
        function TextAst(value, ngContentIndex, sourceSpan) {
            this.value = value;
            this.ngContentIndex = ngContentIndex;
            this.sourceSpan = sourceSpan;
        }
        TextAst.prototype.visit = function (visitor, context) { return visitor.visitText(this, context); };
        return TextAst;
    }());
    exports.TextAst = TextAst;
    /**
     * A bound expression within the text of a template.
     */
    var BoundTextAst = /** @class */ (function () {
        function BoundTextAst(value, ngContentIndex, sourceSpan) {
            this.value = value;
            this.ngContentIndex = ngContentIndex;
            this.sourceSpan = sourceSpan;
        }
        BoundTextAst.prototype.visit = function (visitor, context) {
            return visitor.visitBoundText(this, context);
        };
        return BoundTextAst;
    }());
    exports.BoundTextAst = BoundTextAst;
    /**
     * A plain attribute on an element.
     */
    var AttrAst = /** @class */ (function () {
        function AttrAst(name, value, sourceSpan) {
            this.name = name;
            this.value = value;
            this.sourceSpan = sourceSpan;
        }
        AttrAst.prototype.visit = function (visitor, context) { return visitor.visitAttr(this, context); };
        return AttrAst;
    }());
    exports.AttrAst = AttrAst;
    var BoundPropertyMapping = (_a = {},
        _a[4 /* Animation */] = 4 /* Animation */,
        _a[1 /* Attribute */] = 1 /* Attribute */,
        _a[2 /* Class */] = 2 /* Class */,
        _a[0 /* Property */] = 0 /* Property */,
        _a[3 /* Style */] = 3 /* Style */,
        _a);
    /**
     * A binding for an element property (e.g. `[property]="expression"`) or an animation trigger (e.g.
     * `[@trigger]="stateExp"`)
     */
    var BoundElementPropertyAst = /** @class */ (function () {
        function BoundElementPropertyAst(name, type, securityContext, value, unit, sourceSpan) {
            this.name = name;
            this.type = type;
            this.securityContext = securityContext;
            this.value = value;
            this.unit = unit;
            this.sourceSpan = sourceSpan;
            this.isAnimation = this.type === 4 /* Animation */;
        }
        BoundElementPropertyAst.fromBoundProperty = function (prop) {
            var type = BoundPropertyMapping[prop.type];
            return new BoundElementPropertyAst(prop.name, type, prop.securityContext, prop.value, prop.unit, prop.sourceSpan);
        };
        BoundElementPropertyAst.prototype.visit = function (visitor, context) {
            return visitor.visitElementProperty(this, context);
        };
        return BoundElementPropertyAst;
    }());
    exports.BoundElementPropertyAst = BoundElementPropertyAst;
    /**
     * A binding for an element event (e.g. `(event)="handler()"`) or an animation trigger event (e.g.
     * `(@trigger.phase)="callback($event)"`).
     */
    var BoundEventAst = /** @class */ (function () {
        function BoundEventAst(name, target, phase, handler, sourceSpan) {
            this.name = name;
            this.target = target;
            this.phase = phase;
            this.handler = handler;
            this.sourceSpan = sourceSpan;
            this.fullName = BoundEventAst.calcFullName(this.name, this.target, this.phase);
            this.isAnimation = !!this.phase;
        }
        BoundEventAst.calcFullName = function (name, target, phase) {
            if (target) {
                return target + ":" + name;
            }
            if (phase) {
                return "@" + name + "." + phase;
            }
            return name;
        };
        BoundEventAst.fromParsedEvent = function (event) {
            var target = event.type === 0 /* Regular */ ? event.targetOrPhase : null;
            var phase = event.type === 1 /* Animation */ ? event.targetOrPhase : null;
            return new BoundEventAst(event.name, target, phase, event.handler, event.sourceSpan);
        };
        BoundEventAst.prototype.visit = function (visitor, context) {
            return visitor.visitEvent(this, context);
        };
        return BoundEventAst;
    }());
    exports.BoundEventAst = BoundEventAst;
    /**
     * A reference declaration on an element (e.g. `let someName="expression"`).
     */
    var ReferenceAst = /** @class */ (function () {
        function ReferenceAst(name, value, originalValue, sourceSpan) {
            this.name = name;
            this.value = value;
            this.originalValue = originalValue;
            this.sourceSpan = sourceSpan;
        }
        ReferenceAst.prototype.visit = function (visitor, context) {
            return visitor.visitReference(this, context);
        };
        return ReferenceAst;
    }());
    exports.ReferenceAst = ReferenceAst;
    /**
     * A variable declaration on a <ng-template> (e.g. `var-someName="someLocalName"`).
     */
    var VariableAst = /** @class */ (function () {
        function VariableAst(name, value, sourceSpan) {
            this.name = name;
            this.value = value;
            this.sourceSpan = sourceSpan;
        }
        VariableAst.fromParsedVariable = function (v) {
            return new VariableAst(v.name, v.value, v.sourceSpan);
        };
        VariableAst.prototype.visit = function (visitor, context) {
            return visitor.visitVariable(this, context);
        };
        return VariableAst;
    }());
    exports.VariableAst = VariableAst;
    /**
     * An element declaration in a template.
     */
    var ElementAst = /** @class */ (function () {
        function ElementAst(name, attrs, inputs, outputs, references, directives, providers, hasViewContainer, queryMatches, children, ngContentIndex, sourceSpan, endSourceSpan) {
            this.name = name;
            this.attrs = attrs;
            this.inputs = inputs;
            this.outputs = outputs;
            this.references = references;
            this.directives = directives;
            this.providers = providers;
            this.hasViewContainer = hasViewContainer;
            this.queryMatches = queryMatches;
            this.children = children;
            this.ngContentIndex = ngContentIndex;
            this.sourceSpan = sourceSpan;
            this.endSourceSpan = endSourceSpan;
        }
        ElementAst.prototype.visit = function (visitor, context) {
            return visitor.visitElement(this, context);
        };
        return ElementAst;
    }());
    exports.ElementAst = ElementAst;
    /**
     * A `<ng-template>` element included in an Angular template.
     */
    var EmbeddedTemplateAst = /** @class */ (function () {
        function EmbeddedTemplateAst(attrs, outputs, references, variables, directives, providers, hasViewContainer, queryMatches, children, ngContentIndex, sourceSpan) {
            this.attrs = attrs;
            this.outputs = outputs;
            this.references = references;
            this.variables = variables;
            this.directives = directives;
            this.providers = providers;
            this.hasViewContainer = hasViewContainer;
            this.queryMatches = queryMatches;
            this.children = children;
            this.ngContentIndex = ngContentIndex;
            this.sourceSpan = sourceSpan;
        }
        EmbeddedTemplateAst.prototype.visit = function (visitor, context) {
            return visitor.visitEmbeddedTemplate(this, context);
        };
        return EmbeddedTemplateAst;
    }());
    exports.EmbeddedTemplateAst = EmbeddedTemplateAst;
    /**
     * A directive property with a bound value (e.g. `*ngIf="condition").
     */
    var BoundDirectivePropertyAst = /** @class */ (function () {
        function BoundDirectivePropertyAst(directiveName, templateName, value, sourceSpan) {
            this.directiveName = directiveName;
            this.templateName = templateName;
            this.value = value;
            this.sourceSpan = sourceSpan;
        }
        BoundDirectivePropertyAst.prototype.visit = function (visitor, context) {
            return visitor.visitDirectiveProperty(this, context);
        };
        return BoundDirectivePropertyAst;
    }());
    exports.BoundDirectivePropertyAst = BoundDirectivePropertyAst;
    /**
     * A directive declared on an element.
     */
    var DirectiveAst = /** @class */ (function () {
        function DirectiveAst(directive, inputs, hostProperties, hostEvents, contentQueryStartId, sourceSpan) {
            this.directive = directive;
            this.inputs = inputs;
            this.hostProperties = hostProperties;
            this.hostEvents = hostEvents;
            this.contentQueryStartId = contentQueryStartId;
            this.sourceSpan = sourceSpan;
        }
        DirectiveAst.prototype.visit = function (visitor, context) {
            return visitor.visitDirective(this, context);
        };
        return DirectiveAst;
    }());
    exports.DirectiveAst = DirectiveAst;
    /**
     * A provider declared on an element
     */
    var ProviderAst = /** @class */ (function () {
        function ProviderAst(token, multiProvider, eager, providers, providerType, lifecycleHooks, sourceSpan, isModule) {
            this.token = token;
            this.multiProvider = multiProvider;
            this.eager = eager;
            this.providers = providers;
            this.providerType = providerType;
            this.lifecycleHooks = lifecycleHooks;
            this.sourceSpan = sourceSpan;
            this.isModule = isModule;
        }
        ProviderAst.prototype.visit = function (visitor, context) {
            // No visit method in the visitor for now...
            return null;
        };
        return ProviderAst;
    }());
    exports.ProviderAst = ProviderAst;
    var ProviderAstType;
    (function (ProviderAstType) {
        ProviderAstType[ProviderAstType["PublicService"] = 0] = "PublicService";
        ProviderAstType[ProviderAstType["PrivateService"] = 1] = "PrivateService";
        ProviderAstType[ProviderAstType["Component"] = 2] = "Component";
        ProviderAstType[ProviderAstType["Directive"] = 3] = "Directive";
        ProviderAstType[ProviderAstType["Builtin"] = 4] = "Builtin";
    })(ProviderAstType = exports.ProviderAstType || (exports.ProviderAstType = {}));
    /**
     * Position where content is to be projected (instance of `<ng-content>` in a template).
     */
    var NgContentAst = /** @class */ (function () {
        function NgContentAst(index, ngContentIndex, sourceSpan) {
            this.index = index;
            this.ngContentIndex = ngContentIndex;
            this.sourceSpan = sourceSpan;
        }
        NgContentAst.prototype.visit = function (visitor, context) {
            return visitor.visitNgContent(this, context);
        };
        return NgContentAst;
    }());
    exports.NgContentAst = NgContentAst;
    /**
     * A visitor that accepts each node but doesn't do anything. It is intended to be used
     * as the base class for a visitor that is only interested in a subset of the node types.
     */
    var NullTemplateVisitor = /** @class */ (function () {
        function NullTemplateVisitor() {
        }
        NullTemplateVisitor.prototype.visitNgContent = function (ast, context) { };
        NullTemplateVisitor.prototype.visitEmbeddedTemplate = function (ast, context) { };
        NullTemplateVisitor.prototype.visitElement = function (ast, context) { };
        NullTemplateVisitor.prototype.visitReference = function (ast, context) { };
        NullTemplateVisitor.prototype.visitVariable = function (ast, context) { };
        NullTemplateVisitor.prototype.visitEvent = function (ast, context) { };
        NullTemplateVisitor.prototype.visitElementProperty = function (ast, context) { };
        NullTemplateVisitor.prototype.visitAttr = function (ast, context) { };
        NullTemplateVisitor.prototype.visitBoundText = function (ast, context) { };
        NullTemplateVisitor.prototype.visitText = function (ast, context) { };
        NullTemplateVisitor.prototype.visitDirective = function (ast, context) { };
        NullTemplateVisitor.prototype.visitDirectiveProperty = function (ast, context) { };
        return NullTemplateVisitor;
    }());
    exports.NullTemplateVisitor = NullTemplateVisitor;
    /**
     * Base class that can be used to build a visitor that visits each node
     * in an template ast recursively.
     */
    var RecursiveTemplateAstVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(RecursiveTemplateAstVisitor, _super);
        function RecursiveTemplateAstVisitor() {
            return _super.call(this) || this;
        }
        // Nodes with children
        RecursiveTemplateAstVisitor.prototype.visitEmbeddedTemplate = function (ast, context) {
            return this.visitChildren(context, function (visit) {
                visit(ast.attrs);
                visit(ast.references);
                visit(ast.variables);
                visit(ast.directives);
                visit(ast.providers);
                visit(ast.children);
            });
        };
        RecursiveTemplateAstVisitor.prototype.visitElement = function (ast, context) {
            return this.visitChildren(context, function (visit) {
                visit(ast.attrs);
                visit(ast.inputs);
                visit(ast.outputs);
                visit(ast.references);
                visit(ast.directives);
                visit(ast.providers);
                visit(ast.children);
            });
        };
        RecursiveTemplateAstVisitor.prototype.visitDirective = function (ast, context) {
            return this.visitChildren(context, function (visit) {
                visit(ast.inputs);
                visit(ast.hostProperties);
                visit(ast.hostEvents);
            });
        };
        RecursiveTemplateAstVisitor.prototype.visitChildren = function (context, cb) {
            var results = [];
            var t = this;
            function visit(children) {
                if (children && children.length)
                    results.push(templateVisitAll(t, children, context));
            }
            cb(visit);
            return [].concat.apply([], results);
        };
        return RecursiveTemplateAstVisitor;
    }(NullTemplateVisitor));
    exports.RecursiveTemplateAstVisitor = RecursiveTemplateAstVisitor;
    /**
     * Visit every node in a list of {@link TemplateAst}s with the given {@link TemplateAstVisitor}.
     */
    function templateVisitAll(visitor, asts, context) {
        if (context === void 0) { context = null; }
        var result = [];
        var visit = visitor.visit ?
            function (ast) { return visitor.visit(ast, context) || ast.visit(visitor, context); } :
            function (ast) { return ast.visit(visitor, context); };
        asts.forEach(function (ast) {
            var astResult = visit(ast);
            if (astResult) {
                result.push(astResult);
            }
        });
        return result;
    }
    exports.templateVisitAll = templateVisitAll;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVfYXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3RlbXBsYXRlX3BhcnNlci90ZW1wbGF0ZV9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7OztJQTBCSDs7T0FFRztJQUNIO1FBQ0UsaUJBQ1csS0FBYSxFQUFTLGNBQXNCLEVBQVMsVUFBMkI7WUFBaEYsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFRO1lBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFBRyxDQUFDO1FBQy9GLHVCQUFLLEdBQUwsVUFBTSxPQUEyQixFQUFFLE9BQVksSUFBUyxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRyxjQUFDO0lBQUQsQ0FBQyxBQUpELElBSUM7SUFKWSwwQkFBTztJQU1wQjs7T0FFRztJQUNIO1FBQ0Usc0JBQ1csS0FBVSxFQUFTLGNBQXNCLEVBQVMsVUFBMkI7WUFBN0UsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFRO1lBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFBRyxDQUFDO1FBQzVGLDRCQUFLLEdBQUwsVUFBTSxPQUEyQixFQUFFLE9BQVk7WUFDN0MsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0gsbUJBQUM7SUFBRCxDQUFDLEFBTkQsSUFNQztJQU5ZLG9DQUFZO0lBUXpCOztPQUVHO0lBQ0g7UUFDRSxpQkFBbUIsSUFBWSxFQUFTLEtBQWEsRUFBUyxVQUEyQjtZQUF0RSxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUFTLGVBQVUsR0FBVixVQUFVLENB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T0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEVBQTVELENBQTRELENBQUMsQ0FBQztZQUNwRixVQUFDLEdBQWdCLElBQUssT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQztRQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNkLElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixJQUFJLFNBQVMsRUFBRTtnQkFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBYkQsNENBYUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXN0UGF0aH0gZnJvbSAnLi4vYXN0X3BhdGgnO1xuaW1wb3J0IHtDb21waWxlRGlyZWN0aXZlU3VtbWFyeSwgQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGEsIENvbXBpbGVUb2tlbk1ldGFkYXRhfSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7U2VjdXJpdHlDb250ZXh0fSBmcm9tICcuLi9jb3JlJztcbmltcG9ydCB7QVNULCBCaW5kaW5nVHlwZSwgQm91bmRFbGVtZW50UHJvcGVydHksIFBhcnNlZEV2ZW50LCBQYXJzZWRFdmVudFR5cGUsIFBhcnNlZFZhcmlhYmxlfSBmcm9tICcuLi9leHByZXNzaW9uX3BhcnNlci9hc3QnO1xuaW1wb3J0IHtMaWZlY3ljbGVIb29rc30gZnJvbSAnLi4vbGlmZWN5Y2xlX3JlZmxlY3Rvcic7XG5pbXBvcnQge1BhcnNlU291cmNlU3Bhbn0gZnJvbSAnLi4vcGFyc2VfdXRpbCc7XG5cblxuXG4vKipcbiAqIEFuIEFic3RyYWN0IFN5bnRheCBUcmVlIG5vZGUgcmVwcmVzZW50aW5nIHBhcnQgb2YgYSBwYXJzZWQgQW5ndWxhciB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZW1wbGF0ZUFzdCB7XG4gIC8qKlxuICAgKiBUaGUgc291cmNlIHNwYW4gZnJvbSB3aGljaCB0aGlzIG5vZGUgd2FzIHBhcnNlZC5cbiAgICovXG4gIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbjtcblxuICAvKipcbiAgICogVmlzaXQgdGhpcyBub2RlIGFuZCBwb3NzaWJseSB0cmFuc2Zvcm0gaXQuXG4gICAqL1xuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueTtcbn1cblxuLyoqXG4gKiBBIHNlZ21lbnQgb2YgdGV4dCB3aXRoaW4gdGhlIHRlbXBsYXRlLlxuICovXG5leHBvcnQgY2xhc3MgVGV4dEFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdmFsdWU6IHN0cmluZywgcHVibGljIG5nQ29udGVudEluZGV4OiBudW1iZXIsIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0KHZpc2l0b3I6IFRlbXBsYXRlQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRUZXh0KHRoaXMsIGNvbnRleHQpOyB9XG59XG5cbi8qKlxuICogQSBib3VuZCBleHByZXNzaW9uIHdpdGhpbiB0aGUgdGV4dCBvZiBhIHRlbXBsYXRlLlxuICovXG5leHBvcnQgY2xhc3MgQm91bmRUZXh0QXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyB2YWx1ZTogQVNULCBwdWJsaWMgbmdDb250ZW50SW5kZXg6IG51bWJlciwgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Qm91bmRUZXh0KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbi8qKlxuICogQSBwbGFpbiBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEF0dHJBc3QgaW1wbGVtZW50cyBUZW1wbGF0ZUFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiB2aXNpdG9yLnZpc2l0QXR0cih0aGlzLCBjb250ZXh0KTsgfVxufVxuXG5leHBvcnQgY29uc3QgZW51bSBQcm9wZXJ0eUJpbmRpbmdUeXBlIHtcbiAgLy8gQSBub3JtYWwgYmluZGluZyB0byBhIHByb3BlcnR5IChlLmcuIGBbcHJvcGVydHldPVwiZXhwcmVzc2lvblwiYCkuXG4gIFByb3BlcnR5LFxuICAvLyBBIGJpbmRpbmcgdG8gYW4gZWxlbWVudCBhdHRyaWJ1dGUgKGUuZy4gYFthdHRyLm5hbWVdPVwiZXhwcmVzc2lvblwiYCkuXG4gIEF0dHJpYnV0ZSxcbiAgLy8gQSBiaW5kaW5nIHRvIGEgQ1NTIGNsYXNzIChlLmcuIGBbY2xhc3MubmFtZV09XCJjb25kaXRpb25cImApLlxuICBDbGFzcyxcbiAgLy8gQSBiaW5kaW5nIHRvIGEgc3R5bGUgcnVsZSAoZS5nLiBgW3N0eWxlLnJ1bGVdPVwiZXhwcmVzc2lvblwiYCkuXG4gIFN0eWxlLFxuICAvLyBBIGJpbmRpbmcgdG8gYW4gYW5pbWF0aW9uIHJlZmVyZW5jZSAoZS5nLiBgW2FuaW1hdGUua2V5XT1cImV4cHJlc3Npb25cImApLlxuICBBbmltYXRpb24sXG59XG5cbmNvbnN0IEJvdW5kUHJvcGVydHlNYXBwaW5nID0ge1xuICBbQmluZGluZ1R5cGUuQW5pbWF0aW9uXTogUHJvcGVydHlCaW5kaW5nVHlwZS5BbmltYXRpb24sXG4gIFtCaW5kaW5nVHlwZS5BdHRyaWJ1dGVdOiBQcm9wZXJ0eUJpbmRpbmdUeXBlLkF0dHJpYnV0ZSxcbiAgW0JpbmRpbmdUeXBlLkNsYXNzXTogUHJvcGVydHlCaW5kaW5nVHlwZS5DbGFzcyxcbiAgW0JpbmRpbmdUeXBlLlByb3BlcnR5XTogUHJvcGVydHlCaW5kaW5nVHlwZS5Qcm9wZXJ0eSxcbiAgW0JpbmRpbmdUeXBlLlN0eWxlXTogUHJvcGVydHlCaW5kaW5nVHlwZS5TdHlsZSxcbn07XG5cbi8qKlxuICogQSBiaW5kaW5nIGZvciBhbiBlbGVtZW50IHByb3BlcnR5IChlLmcuIGBbcHJvcGVydHldPVwiZXhwcmVzc2lvblwiYCkgb3IgYW4gYW5pbWF0aW9uIHRyaWdnZXIgKGUuZy5cbiAqIGBbQHRyaWdnZXJdPVwic3RhdGVFeHBcImApXG4gKi9cbmV4cG9ydCBjbGFzcyBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgcmVhZG9ubHkgaXNBbmltYXRpb246IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgdHlwZTogUHJvcGVydHlCaW5kaW5nVHlwZSxcbiAgICAgIHB1YmxpYyBzZWN1cml0eUNvbnRleHQ6IFNlY3VyaXR5Q29udGV4dCwgcHVibGljIHZhbHVlOiBBU1QsIHB1YmxpYyB1bml0OiBzdHJpbmd8bnVsbCxcbiAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHtcbiAgICB0aGlzLmlzQW5pbWF0aW9uID0gdGhpcy50eXBlID09PSBQcm9wZXJ0eUJpbmRpbmdUeXBlLkFuaW1hdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQm91bmRQcm9wZXJ0eShwcm9wOiBCb3VuZEVsZW1lbnRQcm9wZXJ0eSkge1xuICAgIGNvbnN0IHR5cGUgPSBCb3VuZFByb3BlcnR5TWFwcGluZ1twcm9wLnR5cGVdO1xuICAgIHJldHVybiBuZXcgQm91bmRFbGVtZW50UHJvcGVydHlBc3QoXG4gICAgICAgIHByb3AubmFtZSwgdHlwZSwgcHJvcC5zZWN1cml0eUNvbnRleHQsIHByb3AudmFsdWUsIHByb3AudW5pdCwgcHJvcC5zb3VyY2VTcGFuKTtcbiAgfVxuXG4gIHZpc2l0KHZpc2l0b3I6IFRlbXBsYXRlQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEVsZW1lbnRQcm9wZXJ0eSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG4vKipcbiAqIEEgYmluZGluZyBmb3IgYW4gZWxlbWVudCBldmVudCAoZS5nLiBgKGV2ZW50KT1cImhhbmRsZXIoKVwiYCkgb3IgYW4gYW5pbWF0aW9uIHRyaWdnZXIgZXZlbnQgKGUuZy5cbiAqIGAoQHRyaWdnZXIucGhhc2UpPVwiY2FsbGJhY2soJGV2ZW50KVwiYCkuXG4gKi9cbmV4cG9ydCBjbGFzcyBCb3VuZEV2ZW50QXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICByZWFkb25seSBmdWxsTmFtZTogc3RyaW5nO1xuICByZWFkb25seSBpc0FuaW1hdGlvbjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB0YXJnZXQ6IHN0cmluZ3xudWxsLCBwdWJsaWMgcGhhc2U6IHN0cmluZ3xudWxsLFxuICAgICAgcHVibGljIGhhbmRsZXI6IEFTVCwgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge1xuICAgIHRoaXMuZnVsbE5hbWUgPSBCb3VuZEV2ZW50QXN0LmNhbGNGdWxsTmFtZSh0aGlzLm5hbWUsIHRoaXMudGFyZ2V0LCB0aGlzLnBoYXNlKTtcbiAgICB0aGlzLmlzQW5pbWF0aW9uID0gISF0aGlzLnBoYXNlO1xuICB9XG5cbiAgc3RhdGljIGNhbGNGdWxsTmFtZShuYW1lOiBzdHJpbmcsIHRhcmdldDogc3RyaW5nfG51bGwsIHBoYXNlOiBzdHJpbmd8bnVsbCk6IHN0cmluZyB7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgcmV0dXJuIGAke3RhcmdldH06JHtuYW1lfWA7XG4gICAgfVxuICAgIGlmIChwaGFzZSkge1xuICAgICAgcmV0dXJuIGBAJHtuYW1lfS4ke3BoYXNlfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBzdGF0aWMgZnJvbVBhcnNlZEV2ZW50KGV2ZW50OiBQYXJzZWRFdmVudCkge1xuICAgIGNvbnN0IHRhcmdldDogc3RyaW5nfG51bGwgPSBldmVudC50eXBlID09PSBQYXJzZWRFdmVudFR5cGUuUmVndWxhciA/IGV2ZW50LnRhcmdldE9yUGhhc2UgOiBudWxsO1xuICAgIGNvbnN0IHBoYXNlOiBzdHJpbmd8bnVsbCA9XG4gICAgICAgIGV2ZW50LnR5cGUgPT09IFBhcnNlZEV2ZW50VHlwZS5BbmltYXRpb24gPyBldmVudC50YXJnZXRPclBoYXNlIDogbnVsbDtcbiAgICByZXR1cm4gbmV3IEJvdW5kRXZlbnRBc3QoZXZlbnQubmFtZSwgdGFyZ2V0LCBwaGFzZSwgZXZlbnQuaGFuZGxlciwgZXZlbnQuc291cmNlU3Bhbik7XG4gIH1cblxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRFdmVudCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG4vKipcbiAqIEEgcmVmZXJlbmNlIGRlY2xhcmF0aW9uIG9uIGFuIGVsZW1lbnQgKGUuZy4gYGxldCBzb21lTmFtZT1cImV4cHJlc3Npb25cImApLlxuICovXG5leHBvcnQgY2xhc3MgUmVmZXJlbmNlQXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB2YWx1ZTogQ29tcGlsZVRva2VuTWV0YWRhdGEsIHB1YmxpYyBvcmlnaW5hbFZhbHVlOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRSZWZlcmVuY2UodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHZhcmlhYmxlIGRlY2xhcmF0aW9uIG9uIGEgPG5nLXRlbXBsYXRlPiAoZS5nLiBgdmFyLXNvbWVOYW1lPVwic29tZUxvY2FsTmFtZVwiYCkuXG4gKi9cbmV4cG9ydCBjbGFzcyBWYXJpYWJsZUFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHZhbHVlOiBzdHJpbmcsIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG5cbiAgc3RhdGljIGZyb21QYXJzZWRWYXJpYWJsZSh2OiBQYXJzZWRWYXJpYWJsZSkge1xuICAgIHJldHVybiBuZXcgVmFyaWFibGVBc3Qodi5uYW1lLCB2LnZhbHVlLCB2LnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0VmFyaWFibGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBlbGVtZW50IGRlY2xhcmF0aW9uIGluIGEgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBFbGVtZW50QXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBhdHRyczogQXR0ckFzdFtdLCBwdWJsaWMgaW5wdXRzOiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdFtdLFxuICAgICAgcHVibGljIG91dHB1dHM6IEJvdW5kRXZlbnRBc3RbXSwgcHVibGljIHJlZmVyZW5jZXM6IFJlZmVyZW5jZUFzdFtdLFxuICAgICAgcHVibGljIGRpcmVjdGl2ZXM6IERpcmVjdGl2ZUFzdFtdLCBwdWJsaWMgcHJvdmlkZXJzOiBQcm92aWRlckFzdFtdLFxuICAgICAgcHVibGljIGhhc1ZpZXdDb250YWluZXI6IGJvb2xlYW4sIHB1YmxpYyBxdWVyeU1hdGNoZXM6IFF1ZXJ5TWF0Y2hbXSxcbiAgICAgIHB1YmxpYyBjaGlsZHJlbjogVGVtcGxhdGVBc3RbXSwgcHVibGljIG5nQ29udGVudEluZGV4OiBudW1iZXJ8bnVsbCxcbiAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBlbmRTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW58bnVsbCkge31cblxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRFbGVtZW50KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbi8qKlxuICogQSBgPG5nLXRlbXBsYXRlPmAgZWxlbWVudCBpbmNsdWRlZCBpbiBhbiBBbmd1bGFyIHRlbXBsYXRlLlxuICovXG5leHBvcnQgY2xhc3MgRW1iZWRkZWRUZW1wbGF0ZUFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgYXR0cnM6IEF0dHJBc3RbXSwgcHVibGljIG91dHB1dHM6IEJvdW5kRXZlbnRBc3RbXSwgcHVibGljIHJlZmVyZW5jZXM6IFJlZmVyZW5jZUFzdFtdLFxuICAgICAgcHVibGljIHZhcmlhYmxlczogVmFyaWFibGVBc3RbXSwgcHVibGljIGRpcmVjdGl2ZXM6IERpcmVjdGl2ZUFzdFtdLFxuICAgICAgcHVibGljIHByb3ZpZGVyczogUHJvdmlkZXJBc3RbXSwgcHVibGljIGhhc1ZpZXdDb250YWluZXI6IGJvb2xlYW4sXG4gICAgICBwdWJsaWMgcXVlcnlNYXRjaGVzOiBRdWVyeU1hdGNoW10sIHB1YmxpYyBjaGlsZHJlbjogVGVtcGxhdGVBc3RbXSxcbiAgICAgIHB1YmxpYyBuZ0NvbnRlbnRJbmRleDogbnVtYmVyLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuXG4gIHZpc2l0KHZpc2l0b3I6IFRlbXBsYXRlQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEVtYmVkZGVkVGVtcGxhdGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSBwcm9wZXJ0eSB3aXRoIGEgYm91bmQgdmFsdWUgKGUuZy4gYCpuZ0lmPVwiY29uZGl0aW9uXCIpLlxuICovXG5leHBvcnQgY2xhc3MgQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgZGlyZWN0aXZlTmFtZTogc3RyaW5nLCBwdWJsaWMgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHB1YmxpYyB2YWx1ZTogQVNULFxuICAgICAgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RGlyZWN0aXZlUHJvcGVydHkodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSBkZWNsYXJlZCBvbiBhbiBlbGVtZW50LlxuICovXG5leHBvcnQgY2xhc3MgRGlyZWN0aXZlQXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBkaXJlY3RpdmU6IENvbXBpbGVEaXJlY3RpdmVTdW1tYXJ5LCBwdWJsaWMgaW5wdXRzOiBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0W10sXG4gICAgICBwdWJsaWMgaG9zdFByb3BlcnRpZXM6IEJvdW5kRWxlbWVudFByb3BlcnR5QXN0W10sIHB1YmxpYyBob3N0RXZlbnRzOiBCb3VuZEV2ZW50QXN0W10sXG4gICAgICBwdWJsaWMgY29udGVudFF1ZXJ5U3RhcnRJZDogbnVtYmVyLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXREaXJlY3RpdmUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHByb3ZpZGVyIGRlY2xhcmVkIG9uIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFByb3ZpZGVyQXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyB0b2tlbjogQ29tcGlsZVRva2VuTWV0YWRhdGEsIHB1YmxpYyBtdWx0aVByb3ZpZGVyOiBib29sZWFuLCBwdWJsaWMgZWFnZXI6IGJvb2xlYW4sXG4gICAgICBwdWJsaWMgcHJvdmlkZXJzOiBDb21waWxlUHJvdmlkZXJNZXRhZGF0YVtdLCBwdWJsaWMgcHJvdmlkZXJUeXBlOiBQcm92aWRlckFzdFR5cGUsXG4gICAgICBwdWJsaWMgbGlmZWN5Y2xlSG9va3M6IExpZmVjeWNsZUhvb2tzW10sIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICByZWFkb25seSBpc01vZHVsZTogYm9vbGVhbikge31cblxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgLy8gTm8gdmlzaXQgbWV0aG9kIGluIHRoZSB2aXNpdG9yIGZvciBub3cuLi5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZW51bSBQcm92aWRlckFzdFR5cGUge1xuICBQdWJsaWNTZXJ2aWNlLFxuICBQcml2YXRlU2VydmljZSxcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEJ1aWx0aW5cbn1cblxuLyoqXG4gKiBQb3NpdGlvbiB3aGVyZSBjb250ZW50IGlzIHRvIGJlIHByb2plY3RlZCAoaW5zdGFuY2Ugb2YgYDxuZy1jb250ZW50PmAgaW4gYSB0ZW1wbGF0ZSkuXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ0NvbnRlbnRBc3QgaW1wbGVtZW50cyBUZW1wbGF0ZUFzdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGluZGV4OiBudW1iZXIsIHB1YmxpYyBuZ0NvbnRlbnRJbmRleDogbnVtYmVyLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXROZ0NvbnRlbnQodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeU1hdGNoIHtcbiAgcXVlcnlJZDogbnVtYmVyO1xuICB2YWx1ZTogQ29tcGlsZVRva2VuTWV0YWRhdGE7XG59XG5cbi8qKlxuICogQSB2aXNpdG9yIGZvciB7QGxpbmsgVGVtcGxhdGVBc3R9IHRyZWVzIHRoYXQgd2lsbCBwcm9jZXNzIGVhY2ggbm9kZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZW1wbGF0ZUFzdFZpc2l0b3Ige1xuICAvLyBSZXR1cm5pbmcgYSB0cnV0aHkgdmFsdWUgZnJvbSBgdmlzaXQoKWAgd2lsbCBwcmV2ZW50IGB0ZW1wbGF0ZVZpc2l0QWxsKClgIGZyb20gdGhlIGNhbGwgdG9cbiAgLy8gdGhlIHR5cGVkIG1ldGhvZCBhbmQgcmVzdWx0IHJldHVybmVkIHdpbGwgYmVjb21lIHRoZSByZXN1bHQgaW5jbHVkZWQgaW4gYHZpc2l0QWxsKClgc1xuICAvLyByZXN1bHQgYXJyYXkuXG4gIHZpc2l0Pyhhc3Q6IFRlbXBsYXRlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG5cbiAgdmlzaXROZ0NvbnRlbnQoYXN0OiBOZ0NvbnRlbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRFbWJlZGRlZFRlbXBsYXRlKGFzdDogRW1iZWRkZWRUZW1wbGF0ZUFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEVsZW1lbnQoYXN0OiBFbGVtZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0UmVmZXJlbmNlKGFzdDogUmVmZXJlbmNlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0VmFyaWFibGUoYXN0OiBWYXJpYWJsZUFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEV2ZW50KGFzdDogQm91bmRFdmVudEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEVsZW1lbnRQcm9wZXJ0eShhc3Q6IEJvdW5kRWxlbWVudFByb3BlcnR5QXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0QXR0cihhc3Q6IEF0dHJBc3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRCb3VuZFRleHQoYXN0OiBCb3VuZFRleHRBc3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRUZXh0KGFzdDogVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdERpcmVjdGl2ZShhc3Q6IERpcmVjdGl2ZUFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdERpcmVjdGl2ZVByb3BlcnR5KGFzdDogQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCwgY29udGV4dDogYW55KTogYW55O1xufVxuXG4vKipcbiAqIEEgdmlzaXRvciB0aGF0IGFjY2VwdHMgZWFjaCBub2RlIGJ1dCBkb2Vzbid0IGRvIGFueXRoaW5nLiBJdCBpcyBpbnRlbmRlZCB0byBiZSB1c2VkXG4gKiBhcyB0aGUgYmFzZSBjbGFzcyBmb3IgYSB2aXNpdG9yIHRoYXQgaXMgb25seSBpbnRlcmVzdGVkIGluIGEgc3Vic2V0IG9mIHRoZSBub2RlIHR5cGVzLlxuICovXG5leHBvcnQgY2xhc3MgTnVsbFRlbXBsYXRlVmlzaXRvciBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0VmlzaXRvciB7XG4gIHZpc2l0TmdDb250ZW50KGFzdDogTmdDb250ZW50QXN0LCBjb250ZXh0OiBhbnkpOiB2b2lkIHt9XG4gIHZpc2l0RW1iZWRkZWRUZW1wbGF0ZShhc3Q6IEVtYmVkZGVkVGVtcGxhdGVBc3QsIGNvbnRleHQ6IGFueSk6IHZvaWQge31cbiAgdmlzaXRFbGVtZW50KGFzdDogRWxlbWVudEFzdCwgY29udGV4dDogYW55KTogdm9pZCB7fVxuICB2aXNpdFJlZmVyZW5jZShhc3Q6IFJlZmVyZW5jZUFzdCwgY29udGV4dDogYW55KTogdm9pZCB7fVxuICB2aXNpdFZhcmlhYmxlKGFzdDogVmFyaWFibGVBc3QsIGNvbnRleHQ6IGFueSk6IHZvaWQge31cbiAgdmlzaXRFdmVudChhc3Q6IEJvdW5kRXZlbnRBc3QsIGNvbnRleHQ6IGFueSk6IHZvaWQge31cbiAgdmlzaXRFbGVtZW50UHJvcGVydHkoYXN0OiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdCwgY29udGV4dDogYW55KTogdm9pZCB7fVxuICB2aXNpdEF0dHIoYXN0OiBBdHRyQXN0LCBjb250ZXh0OiBhbnkpOiB2b2lkIHt9XG4gIHZpc2l0Qm91bmRUZXh0KGFzdDogQm91bmRUZXh0QXN0LCBjb250ZXh0OiBhbnkpOiB2b2lkIHt9XG4gIHZpc2l0VGV4dChhc3Q6IFRleHRBc3QsIGNvbnRleHQ6IGFueSk6IHZvaWQge31cbiAgdmlzaXREaXJlY3RpdmUoYXN0OiBEaXJlY3RpdmVBc3QsIGNvbnRleHQ6IGFueSk6IHZvaWQge31cbiAgdmlzaXREaXJlY3RpdmVQcm9wZXJ0eShhc3Q6IEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3QsIGNvbnRleHQ6IGFueSk6IHZvaWQge31cbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIHRoYXQgY2FuIGJlIHVzZWQgdG8gYnVpbGQgYSB2aXNpdG9yIHRoYXQgdmlzaXRzIGVhY2ggbm9kZVxuICogaW4gYW4gdGVtcGxhdGUgYXN0IHJlY3Vyc2l2ZWx5LlxuICovXG5leHBvcnQgY2xhc3MgUmVjdXJzaXZlVGVtcGxhdGVBc3RWaXNpdG9yIGV4dGVuZHMgTnVsbFRlbXBsYXRlVmlzaXRvciBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0VmlzaXRvciB7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XG5cbiAgLy8gTm9kZXMgd2l0aCBjaGlsZHJlblxuICB2aXNpdEVtYmVkZGVkVGVtcGxhdGUoYXN0OiBFbWJlZGRlZFRlbXBsYXRlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnZpc2l0Q2hpbGRyZW4oY29udGV4dCwgdmlzaXQgPT4ge1xuICAgICAgdmlzaXQoYXN0LmF0dHJzKTtcbiAgICAgIHZpc2l0KGFzdC5yZWZlcmVuY2VzKTtcbiAgICAgIHZpc2l0KGFzdC52YXJpYWJsZXMpO1xuICAgICAgdmlzaXQoYXN0LmRpcmVjdGl2ZXMpO1xuICAgICAgdmlzaXQoYXN0LnByb3ZpZGVycyk7XG4gICAgICB2aXNpdChhc3QuY2hpbGRyZW4pO1xuICAgIH0pO1xuICB9XG5cbiAgdmlzaXRFbGVtZW50KGFzdDogRWxlbWVudEFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy52aXNpdENoaWxkcmVuKGNvbnRleHQsIHZpc2l0ID0+IHtcbiAgICAgIHZpc2l0KGFzdC5hdHRycyk7XG4gICAgICB2aXNpdChhc3QuaW5wdXRzKTtcbiAgICAgIHZpc2l0KGFzdC5vdXRwdXRzKTtcbiAgICAgIHZpc2l0KGFzdC5yZWZlcmVuY2VzKTtcbiAgICAgIHZpc2l0KGFzdC5kaXJlY3RpdmVzKTtcbiAgICAgIHZpc2l0KGFzdC5wcm92aWRlcnMpO1xuICAgICAgdmlzaXQoYXN0LmNoaWxkcmVuKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZpc2l0RGlyZWN0aXZlKGFzdDogRGlyZWN0aXZlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnZpc2l0Q2hpbGRyZW4oY29udGV4dCwgdmlzaXQgPT4ge1xuICAgICAgdmlzaXQoYXN0LmlucHV0cyk7XG4gICAgICB2aXNpdChhc3QuaG9zdFByb3BlcnRpZXMpO1xuICAgICAgdmlzaXQoYXN0Lmhvc3RFdmVudHMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHZpc2l0Q2hpbGRyZW48VCBleHRlbmRzIFRlbXBsYXRlQXN0PihcbiAgICAgIGNvbnRleHQ6IGFueSxcbiAgICAgIGNiOiAodmlzaXQ6ICg8ViBleHRlbmRzIFRlbXBsYXRlQXN0PihjaGlsZHJlbjogVltdfHVuZGVmaW5lZCkgPT4gdm9pZCkpID0+IHZvaWQpIHtcbiAgICBsZXQgcmVzdWx0czogYW55W11bXSA9IFtdO1xuICAgIGxldCB0ID0gdGhpcztcbiAgICBmdW5jdGlvbiB2aXNpdDxUIGV4dGVuZHMgVGVtcGxhdGVBc3Q+KGNoaWxkcmVuOiBUW10gfCB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpIHJlc3VsdHMucHVzaCh0ZW1wbGF0ZVZpc2l0QWxsKHQsIGNoaWxkcmVuLCBjb250ZXh0KSk7XG4gICAgfVxuICAgIGNiKHZpc2l0KTtcbiAgICByZXR1cm4gW10uY29uY2F0LmFwcGx5KFtdLCByZXN1bHRzKTtcbiAgfVxufVxuXG4vKipcbiAqIFZpc2l0IGV2ZXJ5IG5vZGUgaW4gYSBsaXN0IG9mIHtAbGluayBUZW1wbGF0ZUFzdH1zIHdpdGggdGhlIGdpdmVuIHtAbGluayBUZW1wbGF0ZUFzdFZpc2l0b3J9LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGVWaXNpdEFsbChcbiAgICB2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGFzdHM6IFRlbXBsYXRlQXN0W10sIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnlbXSB7XG4gIGNvbnN0IHJlc3VsdDogYW55W10gPSBbXTtcbiAgY29uc3QgdmlzaXQgPSB2aXNpdG9yLnZpc2l0ID9cbiAgICAgIChhc3Q6IFRlbXBsYXRlQXN0KSA9PiB2aXNpdG9yLnZpc2l0ICEoYXN0LCBjb250ZXh0KSB8fCBhc3QudmlzaXQodmlzaXRvciwgY29udGV4dCkgOlxuICAgICAgKGFzdDogVGVtcGxhdGVBc3QpID0+IGFzdC52aXNpdCh2aXNpdG9yLCBjb250ZXh0KTtcbiAgYXN0cy5mb3JFYWNoKGFzdCA9PiB7XG4gICAgY29uc3QgYXN0UmVzdWx0ID0gdmlzaXQoYXN0KTtcbiAgICBpZiAoYXN0UmVzdWx0KSB7XG4gICAgICByZXN1bHQucHVzaChhc3RSZXN1bHQpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCB0eXBlIFRlbXBsYXRlQXN0UGF0aCA9IEFzdFBhdGg8VGVtcGxhdGVBc3Q+O1xuIl19