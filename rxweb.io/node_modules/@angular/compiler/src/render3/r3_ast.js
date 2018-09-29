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
        define("@angular/compiler/src/render3/r3_ast", ["require", "exports", "tslib"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var Text = /** @class */ (function () {
        function Text(value, sourceSpan) {
            this.value = value;
            this.sourceSpan = sourceSpan;
        }
        Text.prototype.visit = function (visitor) { return visitor.visitText(this); };
        return Text;
    }());
    exports.Text = Text;
    var BoundText = /** @class */ (function () {
        function BoundText(value, sourceSpan) {
            this.value = value;
            this.sourceSpan = sourceSpan;
        }
        BoundText.prototype.visit = function (visitor) { return visitor.visitBoundText(this); };
        return BoundText;
    }());
    exports.BoundText = BoundText;
    var TextAttribute = /** @class */ (function () {
        function TextAttribute(name, value, sourceSpan, valueSpan) {
            this.name = name;
            this.value = value;
            this.sourceSpan = sourceSpan;
            this.valueSpan = valueSpan;
        }
        TextAttribute.prototype.visit = function (visitor) { return visitor.visitTextAttribute(this); };
        return TextAttribute;
    }());
    exports.TextAttribute = TextAttribute;
    var BoundAttribute = /** @class */ (function () {
        function BoundAttribute(name, type, securityContext, value, unit, sourceSpan) {
            this.name = name;
            this.type = type;
            this.securityContext = securityContext;
            this.value = value;
            this.unit = unit;
            this.sourceSpan = sourceSpan;
        }
        BoundAttribute.fromBoundElementProperty = function (prop) {
            return new BoundAttribute(prop.name, prop.type, prop.securityContext, prop.value, prop.unit, prop.sourceSpan);
        };
        BoundAttribute.prototype.visit = function (visitor) { return visitor.visitBoundAttribute(this); };
        return BoundAttribute;
    }());
    exports.BoundAttribute = BoundAttribute;
    var BoundEvent = /** @class */ (function () {
        function BoundEvent(name, handler, target, phase, sourceSpan) {
            this.name = name;
            this.handler = handler;
            this.target = target;
            this.phase = phase;
            this.sourceSpan = sourceSpan;
        }
        BoundEvent.fromParsedEvent = function (event) {
            var target = event.type === 0 /* Regular */ ? event.targetOrPhase : null;
            var phase = event.type === 1 /* Animation */ ? event.targetOrPhase : null;
            return new BoundEvent(event.name, event.handler, target, phase, event.sourceSpan);
        };
        BoundEvent.prototype.visit = function (visitor) { return visitor.visitBoundEvent(this); };
        return BoundEvent;
    }());
    exports.BoundEvent = BoundEvent;
    var Element = /** @class */ (function () {
        function Element(name, attributes, inputs, outputs, children, references, sourceSpan, startSourceSpan, endSourceSpan) {
            this.name = name;
            this.attributes = attributes;
            this.inputs = inputs;
            this.outputs = outputs;
            this.children = children;
            this.references = references;
            this.sourceSpan = sourceSpan;
            this.startSourceSpan = startSourceSpan;
            this.endSourceSpan = endSourceSpan;
        }
        Element.prototype.visit = function (visitor) { return visitor.visitElement(this); };
        return Element;
    }());
    exports.Element = Element;
    var Template = /** @class */ (function () {
        function Template(attributes, inputs, children, references, variables, sourceSpan, startSourceSpan, endSourceSpan) {
            this.attributes = attributes;
            this.inputs = inputs;
            this.children = children;
            this.references = references;
            this.variables = variables;
            this.sourceSpan = sourceSpan;
            this.startSourceSpan = startSourceSpan;
            this.endSourceSpan = endSourceSpan;
        }
        Template.prototype.visit = function (visitor) { return visitor.visitTemplate(this); };
        return Template;
    }());
    exports.Template = Template;
    var Content = /** @class */ (function () {
        function Content(selectorIndex, attributes, sourceSpan) {
            this.selectorIndex = selectorIndex;
            this.attributes = attributes;
            this.sourceSpan = sourceSpan;
        }
        Content.prototype.visit = function (visitor) { return visitor.visitContent(this); };
        return Content;
    }());
    exports.Content = Content;
    var Variable = /** @class */ (function () {
        function Variable(name, value, sourceSpan) {
            this.name = name;
            this.value = value;
            this.sourceSpan = sourceSpan;
        }
        Variable.prototype.visit = function (visitor) { return visitor.visitVariable(this); };
        return Variable;
    }());
    exports.Variable = Variable;
    var Reference = /** @class */ (function () {
        function Reference(name, value, sourceSpan) {
            this.name = name;
            this.value = value;
            this.sourceSpan = sourceSpan;
        }
        Reference.prototype.visit = function (visitor) { return visitor.visitReference(this); };
        return Reference;
    }());
    exports.Reference = Reference;
    var NullVisitor = /** @class */ (function () {
        function NullVisitor() {
        }
        NullVisitor.prototype.visitElement = function (element) { };
        NullVisitor.prototype.visitTemplate = function (template) { };
        NullVisitor.prototype.visitContent = function (content) { };
        NullVisitor.prototype.visitVariable = function (variable) { };
        NullVisitor.prototype.visitReference = function (reference) { };
        NullVisitor.prototype.visitTextAttribute = function (attribute) { };
        NullVisitor.prototype.visitBoundAttribute = function (attribute) { };
        NullVisitor.prototype.visitBoundEvent = function (attribute) { };
        NullVisitor.prototype.visitText = function (text) { };
        NullVisitor.prototype.visitBoundText = function (text) { };
        return NullVisitor;
    }());
    exports.NullVisitor = NullVisitor;
    var RecursiveVisitor = /** @class */ (function () {
        function RecursiveVisitor() {
        }
        RecursiveVisitor.prototype.visitElement = function (element) {
            visitAll(this, element.attributes);
            visitAll(this, element.children);
            visitAll(this, element.references);
        };
        RecursiveVisitor.prototype.visitTemplate = function (template) {
            visitAll(this, template.attributes);
            visitAll(this, template.children);
            visitAll(this, template.references);
            visitAll(this, template.variables);
        };
        RecursiveVisitor.prototype.visitContent = function (content) { };
        RecursiveVisitor.prototype.visitVariable = function (variable) { };
        RecursiveVisitor.prototype.visitReference = function (reference) { };
        RecursiveVisitor.prototype.visitTextAttribute = function (attribute) { };
        RecursiveVisitor.prototype.visitBoundAttribute = function (attribute) { };
        RecursiveVisitor.prototype.visitBoundEvent = function (attribute) { };
        RecursiveVisitor.prototype.visitText = function (text) { };
        RecursiveVisitor.prototype.visitBoundText = function (text) { };
        return RecursiveVisitor;
    }());
    exports.RecursiveVisitor = RecursiveVisitor;
    var TransformVisitor = /** @class */ (function () {
        function TransformVisitor() {
        }
        TransformVisitor.prototype.visitElement = function (element) {
            var newAttributes = transformAll(this, element.attributes);
            var newInputs = transformAll(this, element.inputs);
            var newOutputs = transformAll(this, element.outputs);
            var newChildren = transformAll(this, element.children);
            var newReferences = transformAll(this, element.references);
            if (newAttributes != element.attributes || newInputs != element.inputs ||
                newOutputs != element.outputs || newChildren != element.children ||
                newReferences != element.references) {
                return new Element(element.name, newAttributes, newInputs, newOutputs, newChildren, newReferences, element.sourceSpan, element.startSourceSpan, element.endSourceSpan);
            }
            return element;
        };
        TransformVisitor.prototype.visitTemplate = function (template) {
            var newAttributes = transformAll(this, template.attributes);
            var newInputs = transformAll(this, template.inputs);
            var newChildren = transformAll(this, template.children);
            var newReferences = transformAll(this, template.references);
            var newVariables = transformAll(this, template.variables);
            if (newAttributes != template.attributes || newInputs != template.inputs ||
                newChildren != template.children || newVariables != template.variables ||
                newReferences != template.references) {
                return new Template(newAttributes, newInputs, newChildren, newReferences, newVariables, template.sourceSpan, template.startSourceSpan, template.endSourceSpan);
            }
            return template;
        };
        TransformVisitor.prototype.visitContent = function (content) { return content; };
        TransformVisitor.prototype.visitVariable = function (variable) { return variable; };
        TransformVisitor.prototype.visitReference = function (reference) { return reference; };
        TransformVisitor.prototype.visitTextAttribute = function (attribute) { return attribute; };
        TransformVisitor.prototype.visitBoundAttribute = function (attribute) { return attribute; };
        TransformVisitor.prototype.visitBoundEvent = function (attribute) { return attribute; };
        TransformVisitor.prototype.visitText = function (text) { return text; };
        TransformVisitor.prototype.visitBoundText = function (text) { return text; };
        return TransformVisitor;
    }());
    exports.TransformVisitor = TransformVisitor;
    function visitAll(visitor, nodes) {
        var e_1, _a, e_2, _b;
        var result = [];
        if (visitor.visit) {
            try {
                for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var node = nodes_1_1.value;
                    var newNode = visitor.visit(node) || node.visit(visitor);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            try {
                for (var nodes_2 = tslib_1.__values(nodes), nodes_2_1 = nodes_2.next(); !nodes_2_1.done; nodes_2_1 = nodes_2.next()) {
                    var node = nodes_2_1.value;
                    var newNode = node.visit(visitor);
                    if (newNode) {
                        result.push(newNode);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (nodes_2_1 && !nodes_2_1.done && (_b = nodes_2.return)) _b.call(nodes_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return result;
    }
    exports.visitAll = visitAll;
    function transformAll(visitor, nodes) {
        var e_3, _a;
        var result = [];
        var changed = false;
        try {
            for (var nodes_3 = tslib_1.__values(nodes), nodes_3_1 = nodes_3.next(); !nodes_3_1.done; nodes_3_1 = nodes_3.next()) {
                var node = nodes_3_1.value;
                var newNode = node.visit(visitor);
                if (newNode) {
                    result.push(newNode);
                }
                changed = changed || newNode != node;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (nodes_3_1 && !nodes_3_1.done && (_a = nodes_3.return)) _a.call(nodes_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return changed ? result : nodes;
    }
    exports.transformAll = transformAll;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfYXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3JlbmRlcjMvcjNfYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQVdIO1FBQ0UsY0FBbUIsS0FBYSxFQUFTLFVBQTJCO1lBQWpELFVBQUssR0FBTCxLQUFLLENBQVE7WUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQUFHLENBQUM7UUFDeEUsb0JBQUssR0FBTCxVQUFjLE9BQXdCLElBQVksT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRixXQUFDO0lBQUQsQ0FBQyxBQUhELElBR0M7SUFIWSxvQkFBSTtJQUtqQjtRQUNFLG1CQUFtQixLQUFVLEVBQVMsVUFBMkI7WUFBOUMsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUFTLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQUcsQ0FBQztRQUNyRSx5QkFBSyxHQUFMLFVBQWMsT0FBd0IsSUFBWSxPQUFPLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFGLGdCQUFDO0lBQUQsQ0FBQyxBQUhELElBR0M7SUFIWSw4QkFBUztJQUt0QjtRQUNFLHVCQUNXLElBQVksRUFBUyxLQUFhLEVBQVMsVUFBMkIsRUFDdEUsU0FBMkI7WUFEM0IsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7WUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFpQjtZQUN0RSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUFHLENBQUM7UUFDMUMsNkJBQUssR0FBTCxVQUFjLE9BQXdCLElBQVksT0FBTyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlGLG9CQUFDO0lBQUQsQ0FBQyxBQUxELElBS0M7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IENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTZWN1cml0eUNvbnRleHR9IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0IHtBU1QsIEJpbmRpbmdUeXBlLCBCb3VuZEVsZW1lbnRQcm9wZXJ0eSwgUGFyc2VkRXZlbnQsIFBhcnNlZEV2ZW50VHlwZX0gZnJvbSAnLi4vZXhwcmVzc2lvbl9wYXJzZXIvYXN0JztcbmltcG9ydCB7UGFyc2VTb3VyY2VTcGFufSBmcm9tICcuLi9wYXJzZV91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBOb2RlIHtcbiAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuO1xuICB2aXNpdDxSZXN1bHQ+KHZpc2l0b3I6IFZpc2l0b3I8UmVzdWx0Pik6IFJlc3VsdDtcbn1cblxuZXhwb3J0IGNsYXNzIFRleHQgaW1wbGVtZW50cyBOb2RlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBzdHJpbmcsIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0PFJlc3VsdD4odmlzaXRvcjogVmlzaXRvcjxSZXN1bHQ+KTogUmVzdWx0IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRUZXh0KHRoaXMpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBCb3VuZFRleHQgaW1wbGVtZW50cyBOb2RlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBBU1QsIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0PFJlc3VsdD4odmlzaXRvcjogVmlzaXRvcjxSZXN1bHQ+KTogUmVzdWx0IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRCb3VuZFRleHQodGhpcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFRleHRBdHRyaWJ1dGUgaW1wbGVtZW50cyBOb2RlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgdmFsdWU6IHN0cmluZywgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgIHB1YmxpYyB2YWx1ZVNwYW4/OiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0PFJlc3VsdD4odmlzaXRvcjogVmlzaXRvcjxSZXN1bHQ+KTogUmVzdWx0IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRUZXh0QXR0cmlidXRlKHRoaXMpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBCb3VuZEF0dHJpYnV0ZSBpbXBsZW1lbnRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB0eXBlOiBCaW5kaW5nVHlwZSwgcHVibGljIHNlY3VyaXR5Q29udGV4dDogU2VjdXJpdHlDb250ZXh0LFxuICAgICAgcHVibGljIHZhbHVlOiBBU1QsIHB1YmxpYyB1bml0OiBzdHJpbmd8bnVsbCwgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cblxuICBzdGF0aWMgZnJvbUJvdW5kRWxlbWVudFByb3BlcnR5KHByb3A6IEJvdW5kRWxlbWVudFByb3BlcnR5KSB7XG4gICAgcmV0dXJuIG5ldyBCb3VuZEF0dHJpYnV0ZShcbiAgICAgICAgcHJvcC5uYW1lLCBwcm9wLnR5cGUsIHByb3Auc2VjdXJpdHlDb250ZXh0LCBwcm9wLnZhbHVlLCBwcm9wLnVuaXQsIHByb3Auc291cmNlU3Bhbik7XG4gIH1cblxuICB2aXNpdDxSZXN1bHQ+KHZpc2l0b3I6IFZpc2l0b3I8UmVzdWx0Pik6IFJlc3VsdCB7IHJldHVybiB2aXNpdG9yLnZpc2l0Qm91bmRBdHRyaWJ1dGUodGhpcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEJvdW5kRXZlbnQgaW1wbGVtZW50cyBOb2RlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgaGFuZGxlcjogQVNULCBwdWJsaWMgdGFyZ2V0OiBzdHJpbmd8bnVsbCxcbiAgICAgIHB1YmxpYyBwaGFzZTogc3RyaW5nfG51bGwsIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG5cbiAgc3RhdGljIGZyb21QYXJzZWRFdmVudChldmVudDogUGFyc2VkRXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQ6IHN0cmluZ3xudWxsID0gZXZlbnQudHlwZSA9PT0gUGFyc2VkRXZlbnRUeXBlLlJlZ3VsYXIgPyBldmVudC50YXJnZXRPclBoYXNlIDogbnVsbDtcbiAgICBjb25zdCBwaGFzZTogc3RyaW5nfG51bGwgPVxuICAgICAgICBldmVudC50eXBlID09PSBQYXJzZWRFdmVudFR5cGUuQW5pbWF0aW9uID8gZXZlbnQudGFyZ2V0T3JQaGFzZSA6IG51bGw7XG4gICAgcmV0dXJuIG5ldyBCb3VuZEV2ZW50KGV2ZW50Lm5hbWUsIGV2ZW50LmhhbmRsZXIsIHRhcmdldCwgcGhhc2UsIGV2ZW50LnNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXQ8UmVzdWx0Pih2aXNpdG9yOiBWaXNpdG9yPFJlc3VsdD4pOiBSZXN1bHQgeyByZXR1cm4gdmlzaXRvci52aXNpdEJvdW5kRXZlbnQodGhpcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEVsZW1lbnQgaW1wbGVtZW50cyBOb2RlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgYXR0cmlidXRlczogVGV4dEF0dHJpYnV0ZVtdLCBwdWJsaWMgaW5wdXRzOiBCb3VuZEF0dHJpYnV0ZVtdLFxuICAgICAgcHVibGljIG91dHB1dHM6IEJvdW5kRXZlbnRbXSwgcHVibGljIGNoaWxkcmVuOiBOb2RlW10sIHB1YmxpYyByZWZlcmVuY2VzOiBSZWZlcmVuY2VbXSxcbiAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBzdGFydFNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbnxudWxsLFxuICAgICAgcHVibGljIGVuZFNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbnxudWxsKSB7fVxuICB2aXNpdDxSZXN1bHQ+KHZpc2l0b3I6IFZpc2l0b3I8UmVzdWx0Pik6IFJlc3VsdCB7IHJldHVybiB2aXNpdG9yLnZpc2l0RWxlbWVudCh0aGlzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGUgaW1wbGVtZW50cyBOb2RlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgYXR0cmlidXRlczogVGV4dEF0dHJpYnV0ZVtdLCBwdWJsaWMgaW5wdXRzOiBCb3VuZEF0dHJpYnV0ZVtdLCBwdWJsaWMgY2hpbGRyZW46IE5vZGVbXSxcbiAgICAgIHB1YmxpYyByZWZlcmVuY2VzOiBSZWZlcmVuY2VbXSwgcHVibGljIHZhcmlhYmxlczogVmFyaWFibGVbXSxcbiAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBzdGFydFNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbnxudWxsLFxuICAgICAgcHVibGljIGVuZFNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbnxudWxsKSB7fVxuICB2aXNpdDxSZXN1bHQ+KHZpc2l0b3I6IFZpc2l0b3I8UmVzdWx0Pik6IFJlc3VsdCB7IHJldHVybiB2aXNpdG9yLnZpc2l0VGVtcGxhdGUodGhpcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbnRlbnQgaW1wbGVtZW50cyBOb2RlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgc2VsZWN0b3JJbmRleDogbnVtYmVyLCBwdWJsaWMgYXR0cmlidXRlczogVGV4dEF0dHJpYnV0ZVtdLFxuICAgICAgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQ8UmVzdWx0Pih2aXNpdG9yOiBWaXNpdG9yPFJlc3VsdD4pOiBSZXN1bHQgeyByZXR1cm4gdmlzaXRvci52aXNpdENvbnRlbnQodGhpcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFZhcmlhYmxlIGltcGxlbWVudHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdDxSZXN1bHQ+KHZpc2l0b3I6IFZpc2l0b3I8UmVzdWx0Pik6IFJlc3VsdCB7IHJldHVybiB2aXNpdG9yLnZpc2l0VmFyaWFibGUodGhpcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlZmVyZW5jZSBpbXBsZW1lbnRzIE5vZGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgdmFsdWU6IHN0cmluZywgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQ8UmVzdWx0Pih2aXNpdG9yOiBWaXNpdG9yPFJlc3VsdD4pOiBSZXN1bHQgeyByZXR1cm4gdmlzaXRvci52aXNpdFJlZmVyZW5jZSh0aGlzKTsgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZpc2l0b3I8UmVzdWx0ID0gYW55PiB7XG4gIC8vIFJldHVybmluZyBhIHRydXRoeSB2YWx1ZSBmcm9tIGB2aXNpdCgpYCB3aWxsIHByZXZlbnQgYHZpc2l0QWxsKClgIGZyb20gdGhlIGNhbGwgdG8gdGhlIHR5cGVkXG4gIC8vIG1ldGhvZCBhbmQgcmVzdWx0IHJldHVybmVkIHdpbGwgYmVjb21lIHRoZSByZXN1bHQgaW5jbHVkZWQgaW4gYHZpc2l0QWxsKClgcyByZXN1bHQgYXJyYXkuXG4gIHZpc2l0Pyhub2RlOiBOb2RlKTogUmVzdWx0O1xuXG4gIHZpc2l0RWxlbWVudChlbGVtZW50OiBFbGVtZW50KTogUmVzdWx0O1xuICB2aXNpdFRlbXBsYXRlKHRlbXBsYXRlOiBUZW1wbGF0ZSk6IFJlc3VsdDtcbiAgdmlzaXRDb250ZW50KGNvbnRlbnQ6IENvbnRlbnQpOiBSZXN1bHQ7XG4gIHZpc2l0VmFyaWFibGUodmFyaWFibGU6IFZhcmlhYmxlKTogUmVzdWx0O1xuICB2aXNpdFJlZmVyZW5jZShyZWZlcmVuY2U6IFJlZmVyZW5jZSk6IFJlc3VsdDtcbiAgdmlzaXRUZXh0QXR0cmlidXRlKGF0dHJpYnV0ZTogVGV4dEF0dHJpYnV0ZSk6IFJlc3VsdDtcbiAgdmlzaXRCb3VuZEF0dHJpYnV0ZShhdHRyaWJ1dGU6IEJvdW5kQXR0cmlidXRlKTogUmVzdWx0O1xuICB2aXNpdEJvdW5kRXZlbnQoYXR0cmlidXRlOiBCb3VuZEV2ZW50KTogUmVzdWx0O1xuICB2aXNpdFRleHQodGV4dDogVGV4dCk6IFJlc3VsdDtcbiAgdmlzaXRCb3VuZFRleHQodGV4dDogQm91bmRUZXh0KTogUmVzdWx0O1xufVxuXG5leHBvcnQgY2xhc3MgTnVsbFZpc2l0b3IgaW1wbGVtZW50cyBWaXNpdG9yPHZvaWQ+IHtcbiAgdmlzaXRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiB2b2lkIHt9XG4gIHZpc2l0VGVtcGxhdGUodGVtcGxhdGU6IFRlbXBsYXRlKTogdm9pZCB7fVxuICB2aXNpdENvbnRlbnQoY29udGVudDogQ29udGVudCk6IHZvaWQge31cbiAgdmlzaXRWYXJpYWJsZSh2YXJpYWJsZTogVmFyaWFibGUpOiB2b2lkIHt9XG4gIHZpc2l0UmVmZXJlbmNlKHJlZmVyZW5jZTogUmVmZXJlbmNlKTogdm9pZCB7fVxuICB2aXNpdFRleHRBdHRyaWJ1dGUoYXR0cmlidXRlOiBUZXh0QXR0cmlidXRlKTogdm9pZCB7fVxuICB2aXNpdEJvdW5kQXR0cmlidXRlKGF0dHJpYnV0ZTogQm91bmRBdHRyaWJ1dGUpOiB2b2lkIHt9XG4gIHZpc2l0Qm91bmRFdmVudChhdHRyaWJ1dGU6IEJvdW5kRXZlbnQpOiB2b2lkIHt9XG4gIHZpc2l0VGV4dCh0ZXh0OiBUZXh0KTogdm9pZCB7fVxuICB2aXNpdEJvdW5kVGV4dCh0ZXh0OiBCb3VuZFRleHQpOiB2b2lkIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWN1cnNpdmVWaXNpdG9yIGltcGxlbWVudHMgVmlzaXRvcjx2b2lkPiB7XG4gIHZpc2l0RWxlbWVudChlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgdmlzaXRBbGwodGhpcywgZWxlbWVudC5hdHRyaWJ1dGVzKTtcbiAgICB2aXNpdEFsbCh0aGlzLCBlbGVtZW50LmNoaWxkcmVuKTtcbiAgICB2aXNpdEFsbCh0aGlzLCBlbGVtZW50LnJlZmVyZW5jZXMpO1xuICB9XG4gIHZpc2l0VGVtcGxhdGUodGVtcGxhdGU6IFRlbXBsYXRlKTogdm9pZCB7XG4gICAgdmlzaXRBbGwodGhpcywgdGVtcGxhdGUuYXR0cmlidXRlcyk7XG4gICAgdmlzaXRBbGwodGhpcywgdGVtcGxhdGUuY2hpbGRyZW4pO1xuICAgIHZpc2l0QWxsKHRoaXMsIHRlbXBsYXRlLnJlZmVyZW5jZXMpO1xuICAgIHZpc2l0QWxsKHRoaXMsIHRlbXBsYXRlLnZhcmlhYmxlcyk7XG4gIH1cbiAgdmlzaXRDb250ZW50KGNvbnRlbnQ6IENvbnRlbnQpOiB2b2lkIHt9XG4gIHZpc2l0VmFyaWFibGUodmFyaWFibGU6IFZhcmlhYmxlKTogdm9pZCB7fVxuICB2aXNpdFJlZmVyZW5jZShyZWZlcmVuY2U6IFJlZmVyZW5jZSk6IHZvaWQge31cbiAgdmlzaXRUZXh0QXR0cmlidXRlKGF0dHJpYnV0ZTogVGV4dEF0dHJpYnV0ZSk6IHZvaWQge31cbiAgdmlzaXRCb3VuZEF0dHJpYnV0ZShhdHRyaWJ1dGU6IEJvdW5kQXR0cmlidXRlKTogdm9pZCB7fVxuICB2aXNpdEJvdW5kRXZlbnQoYXR0cmlidXRlOiBCb3VuZEV2ZW50KTogdm9pZCB7fVxuICB2aXNpdFRleHQodGV4dDogVGV4dCk6IHZvaWQge31cbiAgdmlzaXRCb3VuZFRleHQodGV4dDogQm91bmRUZXh0KTogdm9pZCB7fVxufVxuXG5leHBvcnQgY2xhc3MgVHJhbnNmb3JtVmlzaXRvciBpbXBsZW1lbnRzIFZpc2l0b3I8Tm9kZT4ge1xuICB2aXNpdEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IE5vZGUge1xuICAgIGNvbnN0IG5ld0F0dHJpYnV0ZXMgPSB0cmFuc2Zvcm1BbGwodGhpcywgZWxlbWVudC5hdHRyaWJ1dGVzKTtcbiAgICBjb25zdCBuZXdJbnB1dHMgPSB0cmFuc2Zvcm1BbGwodGhpcywgZWxlbWVudC5pbnB1dHMpO1xuICAgIGNvbnN0IG5ld091dHB1dHMgPSB0cmFuc2Zvcm1BbGwodGhpcywgZWxlbWVudC5vdXRwdXRzKTtcbiAgICBjb25zdCBuZXdDaGlsZHJlbiA9IHRyYW5zZm9ybUFsbCh0aGlzLCBlbGVtZW50LmNoaWxkcmVuKTtcbiAgICBjb25zdCBuZXdSZWZlcmVuY2VzID0gdHJhbnNmb3JtQWxsKHRoaXMsIGVsZW1lbnQucmVmZXJlbmNlcyk7XG4gICAgaWYgKG5ld0F0dHJpYnV0ZXMgIT0gZWxlbWVudC5hdHRyaWJ1dGVzIHx8IG5ld0lucHV0cyAhPSBlbGVtZW50LmlucHV0cyB8fFxuICAgICAgICBuZXdPdXRwdXRzICE9IGVsZW1lbnQub3V0cHV0cyB8fCBuZXdDaGlsZHJlbiAhPSBlbGVtZW50LmNoaWxkcmVuIHx8XG4gICAgICAgIG5ld1JlZmVyZW5jZXMgIT0gZWxlbWVudC5yZWZlcmVuY2VzKSB7XG4gICAgICByZXR1cm4gbmV3IEVsZW1lbnQoXG4gICAgICAgICAgZWxlbWVudC5uYW1lLCBuZXdBdHRyaWJ1dGVzLCBuZXdJbnB1dHMsIG5ld091dHB1dHMsIG5ld0NoaWxkcmVuLCBuZXdSZWZlcmVuY2VzLFxuICAgICAgICAgIGVsZW1lbnQuc291cmNlU3BhbiwgZWxlbWVudC5zdGFydFNvdXJjZVNwYW4sIGVsZW1lbnQuZW5kU291cmNlU3Bhbik7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgdmlzaXRUZW1wbGF0ZSh0ZW1wbGF0ZTogVGVtcGxhdGUpOiBOb2RlIHtcbiAgICBjb25zdCBuZXdBdHRyaWJ1dGVzID0gdHJhbnNmb3JtQWxsKHRoaXMsIHRlbXBsYXRlLmF0dHJpYnV0ZXMpO1xuICAgIGNvbnN0IG5ld0lucHV0cyA9IHRyYW5zZm9ybUFsbCh0aGlzLCB0ZW1wbGF0ZS5pbnB1dHMpO1xuICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gdHJhbnNmb3JtQWxsKHRoaXMsIHRlbXBsYXRlLmNoaWxkcmVuKTtcbiAgICBjb25zdCBuZXdSZWZlcmVuY2VzID0gdHJhbnNmb3JtQWxsKHRoaXMsIHRlbXBsYXRlLnJlZmVyZW5jZXMpO1xuICAgIGNvbnN0IG5ld1ZhcmlhYmxlcyA9IHRyYW5zZm9ybUFsbCh0aGlzLCB0ZW1wbGF0ZS52YXJpYWJsZXMpO1xuICAgIGlmIChuZXdBdHRyaWJ1dGVzICE9IHRlbXBsYXRlLmF0dHJpYnV0ZXMgfHwgbmV3SW5wdXRzICE9IHRlbXBsYXRlLmlucHV0cyB8fFxuICAgICAgICBuZXdDaGlsZHJlbiAhPSB0ZW1wbGF0ZS5jaGlsZHJlbiB8fCBuZXdWYXJpYWJsZXMgIT0gdGVtcGxhdGUudmFyaWFibGVzIHx8XG4gICAgICAgIG5ld1JlZmVyZW5jZXMgIT0gdGVtcGxhdGUucmVmZXJlbmNlcykge1xuICAgICAgcmV0dXJuIG5ldyBUZW1wbGF0ZShcbiAgICAgICAgICBuZXdBdHRyaWJ1dGVzLCBuZXdJbnB1dHMsIG5ld0NoaWxkcmVuLCBuZXdSZWZlcmVuY2VzLCBuZXdWYXJpYWJsZXMsIHRlbXBsYXRlLnNvdXJjZVNwYW4sXG4gICAgICAgICAgdGVtcGxhdGUuc3RhcnRTb3VyY2VTcGFuLCB0ZW1wbGF0ZS5lbmRTb3VyY2VTcGFuKTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9XG5cbiAgdmlzaXRDb250ZW50KGNvbnRlbnQ6IENvbnRlbnQpOiBOb2RlIHsgcmV0dXJuIGNvbnRlbnQ7IH1cblxuICB2aXNpdFZhcmlhYmxlKHZhcmlhYmxlOiBWYXJpYWJsZSk6IE5vZGUgeyByZXR1cm4gdmFyaWFibGU7IH1cbiAgdmlzaXRSZWZlcmVuY2UocmVmZXJlbmNlOiBSZWZlcmVuY2UpOiBOb2RlIHsgcmV0dXJuIHJlZmVyZW5jZTsgfVxuICB2aXNpdFRleHRBdHRyaWJ1dGUoYXR0cmlidXRlOiBUZXh0QXR0cmlidXRlKTogTm9kZSB7IHJldHVybiBhdHRyaWJ1dGU7IH1cbiAgdmlzaXRCb3VuZEF0dHJpYnV0ZShhdHRyaWJ1dGU6IEJvdW5kQXR0cmlidXRlKTogTm9kZSB7IHJldHVybiBhdHRyaWJ1dGU7IH1cbiAgdmlzaXRCb3VuZEV2ZW50KGF0dHJpYnV0ZTogQm91bmRFdmVudCk6IE5vZGUgeyByZXR1cm4gYXR0cmlidXRlOyB9XG4gIHZpc2l0VGV4dCh0ZXh0OiBUZXh0KTogTm9kZSB7IHJldHVybiB0ZXh0OyB9XG4gIHZpc2l0Qm91bmRUZXh0KHRleHQ6IEJvdW5kVGV4dCk6IE5vZGUgeyByZXR1cm4gdGV4dDsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmlzaXRBbGw8UmVzdWx0Pih2aXNpdG9yOiBWaXNpdG9yPFJlc3VsdD4sIG5vZGVzOiBOb2RlW10pOiBSZXN1bHRbXSB7XG4gIGNvbnN0IHJlc3VsdDogUmVzdWx0W10gPSBbXTtcbiAgaWYgKHZpc2l0b3IudmlzaXQpIHtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIGNvbnN0IG5ld05vZGUgPSB2aXNpdG9yLnZpc2l0KG5vZGUpIHx8IG5vZGUudmlzaXQodmlzaXRvcik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgY29uc3QgbmV3Tm9kZSA9IG5vZGUudmlzaXQodmlzaXRvcik7XG4gICAgICBpZiAobmV3Tm9kZSkge1xuICAgICAgICByZXN1bHQucHVzaChuZXdOb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybUFsbDxSZXN1bHQgZXh0ZW5kcyBOb2RlPihcbiAgICB2aXNpdG9yOiBWaXNpdG9yPE5vZGU+LCBub2RlczogUmVzdWx0W10pOiBSZXN1bHRbXSB7XG4gIGNvbnN0IHJlc3VsdDogUmVzdWx0W10gPSBbXTtcbiAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgY29uc3QgbmV3Tm9kZSA9IG5vZGUudmlzaXQodmlzaXRvcik7XG4gICAgaWYgKG5ld05vZGUpIHtcbiAgICAgIHJlc3VsdC5wdXNoKG5ld05vZGUgYXMgUmVzdWx0KTtcbiAgICB9XG4gICAgY2hhbmdlZCA9IGNoYW5nZWQgfHwgbmV3Tm9kZSAhPSBub2RlO1xuICB9XG4gIHJldHVybiBjaGFuZ2VkID8gcmVzdWx0IDogbm9kZXM7XG59Il19