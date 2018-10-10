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
        define("@angular/language-service/src/utils", ["require", "exports", "tslib", "@angular/compiler", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var compiler_1 = require("@angular/compiler");
    var ts = require("typescript");
    function isParseSourceSpan(value) {
        return value && !!value.start;
    }
    exports.isParseSourceSpan = isParseSourceSpan;
    function spanOf(span) {
        if (!span)
            return undefined;
        if (isParseSourceSpan(span)) {
            return { start: span.start.offset, end: span.end.offset };
        }
        else {
            if (span.endSourceSpan) {
                return { start: span.sourceSpan.start.offset, end: span.endSourceSpan.end.offset };
            }
            else if (span.children && span.children.length) {
                return {
                    start: span.sourceSpan.start.offset,
                    end: spanOf(span.children[span.children.length - 1]).end
                };
            }
            return { start: span.sourceSpan.start.offset, end: span.sourceSpan.end.offset };
        }
    }
    exports.spanOf = spanOf;
    function inSpan(position, span, exclusive) {
        return span != null && (exclusive ? position >= span.start && position < span.end :
            position >= span.start && position <= span.end);
    }
    exports.inSpan = inSpan;
    function offsetSpan(span, amount) {
        return { start: span.start + amount, end: span.end + amount };
    }
    exports.offsetSpan = offsetSpan;
    function isNarrower(spanA, spanB) {
        return spanA.start >= spanB.start && spanA.end <= spanB.end;
    }
    exports.isNarrower = isNarrower;
    function hasTemplateReference(type) {
        var e_1, _a;
        if (type.diDeps) {
            try {
                for (var _b = tslib_1.__values(type.diDeps), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var diDep = _c.value;
                    if (diDep.token && diDep.token.identifier &&
                        compiler_1.identifierName(diDep.token.identifier) == 'TemplateRef')
                        return true;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return false;
    }
    exports.hasTemplateReference = hasTemplateReference;
    function getSelectors(info) {
        var map = new Map();
        var selectors = flatten(info.directives.map(function (directive) {
            var selectors = compiler_1.CssSelector.parse(directive.selector);
            selectors.forEach(function (selector) { return map.set(selector, directive); });
            return selectors;
        }));
        return { selectors: selectors, map: map };
    }
    exports.getSelectors = getSelectors;
    function flatten(a) {
        var _a;
        return (_a = []).concat.apply(_a, tslib_1.__spread(a));
    }
    exports.flatten = flatten;
    function removeSuffix(value, suffix) {
        if (value.endsWith(suffix))
            return value.substring(0, value.length - suffix.length);
        return value;
    }
    exports.removeSuffix = removeSuffix;
    function uniqueByName(elements) {
        var e_2, _a;
        if (elements) {
            var result = [];
            var set = new Set();
            try {
                for (var elements_1 = tslib_1.__values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                    var element = elements_1_1.value;
                    if (!set.has(element.name)) {
                        set.add(element.name);
                        result.push(element);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return result;
        }
    }
    exports.uniqueByName = uniqueByName;
    function isTypescriptVersion(low, high) {
        var version = ts.version;
        if (version.substring(0, low.length) < low)
            return false;
        if (high && (version.substring(0, high.length) > high))
            return false;
        return true;
    }
    exports.isTypescriptVersion = isTypescriptVersion;
    function diagnosticInfoFromTemplateInfo(info) {
        return {
            fileName: info.fileName,
            offset: info.template.span.start,
            query: info.template.query,
            members: info.template.members,
            htmlAst: info.htmlAst,
            templateAst: info.templateAst
        };
    }
    exports.diagnosticInfoFromTemplateInfo = diagnosticInfoFromTemplateInfo;
    function findTemplateAstAt(ast, position, allowWidening) {
        if (allowWidening === void 0) { allowWidening = false; }
        var path = [];
        var visitor = new /** @class */ (function (_super) {
            tslib_1.__extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.visit = function (ast, context) {
                var span = spanOf(ast);
                if (inSpan(position, span)) {
                    var len = path.length;
                    if (!len || allowWidening || isNarrower(span, spanOf(path[len - 1]))) {
                        path.push(ast);
                    }
                }
                else {
                    // Returning a value here will result in the children being skipped.
                    return true;
                }
            };
            class_1.prototype.visitEmbeddedTemplate = function (ast, context) {
                return this.visitChildren(context, function (visit) {
                    // Ignore reference, variable and providers
                    visit(ast.attrs);
                    visit(ast.directives);
                    visit(ast.children);
                });
            };
            class_1.prototype.visitElement = function (ast, context) {
                return this.visitChildren(context, function (visit) {
                    // Ingnore providers
                    visit(ast.attrs);
                    visit(ast.inputs);
                    visit(ast.outputs);
                    visit(ast.references);
                    visit(ast.directives);
                    visit(ast.children);
                });
            };
            class_1.prototype.visitDirective = function (ast, context) {
                // Ignore the host properties of a directive
                var result = this.visitChildren(context, function (visit) { visit(ast.inputs); });
                // We never care about the diretive itself, just its inputs.
                if (path[path.length - 1] == ast) {
                    path.pop();
                }
                return result;
            };
            return class_1;
        }(compiler_1.RecursiveTemplateAstVisitor));
        compiler_1.templateVisitAll(visitor, ast);
        return new compiler_1.AstPath(path, position);
    }
    exports.findTemplateAstAt = findTemplateAstAt;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sYW5ndWFnZS1zZXJ2aWNlL3NyYy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFFSCw4Q0FBNlQ7SUFFN1QsK0JBQWlDO0lBV2pDLDJCQUFrQyxLQUFVO1FBQzFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFGRCw4Q0FFQztJQUtELGdCQUF1QixJQUFtQztRQUN4RCxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sU0FBUyxDQUFDO1FBQzVCLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQztTQUN6RDthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN0QixPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLENBQUM7YUFDbEY7aUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUNoRCxPQUFPO29CQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNO29CQUNuQyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUcsQ0FBQyxHQUFHO2lCQUMzRCxDQUFDO2FBQ0g7WUFDRCxP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LENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxVQUFBLEtBQUs7b0JBQ3RDLG9CQUFvQjtvQkFDcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbkIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsZ0NBQWMsR0FBZCxVQUFlLEdBQWlCLEVBQUUsT0FBWTtnQkFDNUMsNENBQTRDO2dCQUM1QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxVQUFBLEtBQUssSUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLDREQUE0RDtnQkFDNUQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDWjtnQkFDRCxPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDO1lBQ0gsY0FBQztRQUFELENBQUMsQUE1Q21CLENBQWMsc0NBQTJCLEVBNEM1RCxDQUFDO1FBRUYsMkJBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRS9CLE9BQU8sSUFBSSxrQkFBTyxDQUFjLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBcERELDhDQW9EQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBc3RQYXRoLCBDb21waWxlRGlyZWN0aXZlU3VtbWFyeSwgQ29tcGlsZVR5cGVNZXRhZGF0YSwgQ3NzU2VsZWN0b3IsIERpcmVjdGl2ZUFzdCwgRWxlbWVudEFzdCwgRW1iZWRkZWRUZW1wbGF0ZUFzdCwgSHRtbEFzdFBhdGgsIE5vZGUgYXMgSHRtbE5vZGUsIFBhcnNlU291cmNlU3BhbiwgUmVjdXJzaXZlVGVtcGxhdGVBc3RWaXNpdG9yLCBSZWN1cnNpdmVWaXNpdG9yLCBUZW1wbGF0ZUFzdCwgVGVtcGxhdGVBc3RQYXRoLCBpZGVudGlmaWVyTmFtZSwgdGVtcGxhdGVWaXNpdEFsbCwgdmlzaXRBbGx9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmltcG9ydCB7RGlhZ25vc3RpY1RlbXBsYXRlSW5mb30gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXItY2xpL3NyYy9sYW5ndWFnZV9zZXJ2aWNlcyc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuaW1wb3J0IHtTZWxlY3RvckluZm8sIFRlbXBsYXRlSW5mb30gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHtTcGFufSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTcGFuSG9sZGVyIHtcbiAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuO1xuICBlbmRTb3VyY2VTcGFuPzogUGFyc2VTb3VyY2VTcGFufG51bGw7XG4gIGNoaWxkcmVuPzogU3BhbkhvbGRlcltdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQYXJzZVNvdXJjZVNwYW4odmFsdWU6IGFueSk6IHZhbHVlIGlzIFBhcnNlU291cmNlU3BhbiB7XG4gIHJldHVybiB2YWx1ZSAmJiAhIXZhbHVlLnN0YXJ0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3Bhbk9mKHNwYW46IFNwYW5Ib2xkZXIpOiBTcGFuO1xuZXhwb3J0IGZ1bmN0aW9uIHNwYW5PZihzcGFuOiBQYXJzZVNvdXJjZVNwYW4pOiBTcGFuO1xuZXhwb3J0IGZ1bmN0aW9uIHNwYW5PZihzcGFuOiBTcGFuSG9sZGVyIHwgUGFyc2VTb3VyY2VTcGFuIHwgdW5kZWZpbmVkKTogU3Bhbnx1bmRlZmluZWQ7XG5leHBvcnQgZnVuY3Rpb24gc3Bhbk9mKHNwYW4/OiBTcGFuSG9sZGVyIHwgUGFyc2VTb3VyY2VTcGFuKTogU3Bhbnx1bmRlZmluZWQge1xuICBpZiAoIXNwYW4pIHJldHVybiB1bmRlZmluZWQ7XG4gIGlmIChpc1BhcnNlU291cmNlU3BhbihzcGFuKSkge1xuICAgIHJldHVybiB7c3RhcnQ6IHNwYW4uc3RhcnQub2Zmc2V0LCBlbmQ6IHNwYW4uZW5kLm9mZnNldH07XG4gIH0gZWxzZSB7XG4gICAgaWYgKHNwYW4uZW5kU291cmNlU3Bhbikge1xuICAgICAgcmV0dXJuIHtzdGFydDogc3Bhbi5zb3VyY2VTcGFuLnN0YXJ0Lm9mZnNldCwgZW5kOiBzcGFuLmVuZFNvdXJjZVNwYW4uZW5kLm9mZnNldH07XG4gICAgfSBlbHNlIGlmIChzcGFuLmNoaWxkcmVuICYmIHNwYW4uY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogc3Bhbi5zb3VyY2VTcGFuLnN0YXJ0Lm9mZnNldCxcbiAgICAgICAgZW5kOiBzcGFuT2Yoc3Bhbi5jaGlsZHJlbltzcGFuLmNoaWxkcmVuLmxlbmd0aCAtIDFdKSAhLmVuZFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtzdGFydDogc3Bhbi5zb3VyY2VTcGFuLnN0YXJ0Lm9mZnNldCwgZW5kOiBzcGFuLnNvdXJjZVNwYW4uZW5kLm9mZnNldH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluU3Bhbihwb3NpdGlvbjogbnVtYmVyLCBzcGFuPzogU3BhbiwgZXhjbHVzaXZlPzogYm9vbGVhbik6IGJvb2xlYW4ge1xuICByZXR1cm4gc3BhbiAhPSBudWxsICYmIChleGNsdXNpdmUgPyBwb3NpdGlvbiA+PSBzcGFuLnN0YXJ0ICYmIHBvc2l0aW9uIDwgc3Bhbi5lbmQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA+PSBzcGFuLnN0YXJ0ICYmIHBvc2l0aW9uIDw9IHNwYW4uZW5kKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZnNldFNwYW4oc3BhbjogU3BhbiwgYW1vdW50OiBudW1iZXIpOiBTcGFuIHtcbiAgcmV0dXJuIHtzdGFydDogc3Bhbi5zdGFydCArIGFtb3VudCwgZW5kOiBzcGFuLmVuZCArIGFtb3VudH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc05hcnJvd2VyKHNwYW5BOiBTcGFuLCBzcGFuQjogU3Bhbik6IGJvb2xlYW4ge1xuICByZXR1cm4gc3BhbkEuc3RhcnQgPj0gc3BhbkIuc3RhcnQgJiYgc3BhbkEuZW5kIDw9IHNwYW5CLmVuZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1RlbXBsYXRlUmVmZXJlbmNlKHR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGEpOiBib29sZWFuIHtcbiAgaWYgKHR5cGUuZGlEZXBzKSB7XG4gICAgZm9yIChsZXQgZGlEZXAgb2YgdHlwZS5kaURlcHMpIHtcbiAgICAgIGlmIChkaURlcC50b2tlbiAmJiBkaURlcC50b2tlbi5pZGVudGlmaWVyICYmXG4gICAgICAgICAgaWRlbnRpZmllck5hbWUoZGlEZXAudG9rZW4gIS5pZGVudGlmaWVyICEpID09ICdUZW1wbGF0ZVJlZicpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWxlY3RvcnMoaW5mbzogVGVtcGxhdGVJbmZvKTogU2VsZWN0b3JJbmZvIHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxDc3NTZWxlY3RvciwgQ29tcGlsZURpcmVjdGl2ZVN1bW1hcnk+KCk7XG4gIGNvbnN0IHNlbGVjdG9yczogQ3NzU2VsZWN0b3JbXSA9IGZsYXR0ZW4oaW5mby5kaXJlY3RpdmVzLm1hcChkaXJlY3RpdmUgPT4ge1xuICAgIGNvbnN0IHNlbGVjdG9yczogQ3NzU2VsZWN0b3JbXSA9IENzc1NlbGVjdG9yLnBhcnNlKGRpcmVjdGl2ZS5zZWxlY3RvciAhKTtcbiAgICBzZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiBtYXAuc2V0KHNlbGVjdG9yLCBkaXJlY3RpdmUpKTtcbiAgICByZXR1cm4gc2VsZWN0b3JzO1xuICB9KSk7XG4gIHJldHVybiB7c2VsZWN0b3JzLCBtYXB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbjxUPihhOiBUW11bXSkge1xuICByZXR1cm4gKDxUW10+W10pLmNvbmNhdCguLi5hKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVN1ZmZpeCh2YWx1ZTogc3RyaW5nLCBzdWZmaXg6IHN0cmluZykge1xuICBpZiAodmFsdWUuZW5kc1dpdGgoc3VmZml4KSkgcmV0dXJuIHZhbHVlLnN1YnN0cmluZygwLCB2YWx1ZS5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlQnlOYW1lIDwgVCBleHRlbmRzIHtcbiAgbmFtZTogc3RyaW5nO1xufVxuPiAoZWxlbWVudHM6IFRbXSB8IHVuZGVmaW5lZCk6IFRbXXx1bmRlZmluZWQge1xuICBpZiAoZWxlbWVudHMpIHtcbiAgICBjb25zdCByZXN1bHQ6IFRbXSA9IFtdO1xuICAgIGNvbnN0IHNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgICAgaWYgKCFzZXQuaGFzKGVsZW1lbnQubmFtZSkpIHtcbiAgICAgICAgc2V0LmFkZChlbGVtZW50Lm5hbWUpO1xuICAgICAgICByZXN1bHQucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUeXBlc2NyaXB0VmVyc2lvbihsb3c6IHN0cmluZywgaGlnaD86IHN0cmluZykge1xuICBjb25zdCB2ZXJzaW9uID0gdHMudmVyc2lvbjtcblxuICBpZiAodmVyc2lvbi5zdWJzdHJpbmcoMCwgbG93Lmxlbmd0aCkgPCBsb3cpIHJldHVybiBmYWxzZTtcblxuICBpZiAoaGlnaCAmJiAodmVyc2lvbi5zdWJzdHJpbmcoMCwgaGlnaC5sZW5ndGgpID4gaGlnaCkpIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpYWdub3N0aWNJbmZvRnJvbVRlbXBsYXRlSW5mbyhpbmZvOiBUZW1wbGF0ZUluZm8pOiBEaWFnbm9zdGljVGVtcGxhdGVJbmZvIHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlTmFtZTogaW5mby5maWxlTmFtZSxcbiAgICBvZmZzZXQ6IGluZm8udGVtcGxhdGUuc3Bhbi5zdGFydCxcbiAgICBxdWVyeTogaW5mby50ZW1wbGF0ZS5xdWVyeSxcbiAgICBtZW1iZXJzOiBpbmZvLnRlbXBsYXRlLm1lbWJlcnMsXG4gICAgaHRtbEFzdDogaW5mby5odG1sQXN0LFxuICAgIHRlbXBsYXRlQXN0OiBpbmZvLnRlbXBsYXRlQXN0XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kVGVtcGxhdGVBc3RBdChcbiAgICBhc3Q6IFRlbXBsYXRlQXN0W10sIHBvc2l0aW9uOiBudW1iZXIsIGFsbG93V2lkZW5pbmc6IGJvb2xlYW4gPSBmYWxzZSk6IFRlbXBsYXRlQXN0UGF0aCB7XG4gIGNvbnN0IHBhdGg6IFRlbXBsYXRlQXN0W10gPSBbXTtcbiAgY29uc3QgdmlzaXRvciA9IG5ldyBjbGFzcyBleHRlbmRzIFJlY3Vyc2l2ZVRlbXBsYXRlQXN0VmlzaXRvciB7XG4gICAgdmlzaXQoYXN0OiBUZW1wbGF0ZUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICAgIGxldCBzcGFuID0gc3Bhbk9mKGFzdCk7XG4gICAgICBpZiAoaW5TcGFuKHBvc2l0aW9uLCBzcGFuKSkge1xuICAgICAgICBjb25zdCBsZW4gPSBwYXRoLmxlbmd0aDtcbiAgICAgICAgaWYgKCFsZW4gfHwgYWxsb3dXaWRlbmluZyB8fCBpc05hcnJvd2VyKHNwYW4sIHNwYW5PZihwYXRoW2xlbiAtIDFdKSkpIHtcbiAgICAgICAgICBwYXRoLnB1c2goYXN0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmV0dXJuaW5nIGEgdmFsdWUgaGVyZSB3aWxsIHJlc3VsdCBpbiB0aGUgY2hpbGRyZW4gYmVpbmcgc2tpcHBlZC5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmlzaXRFbWJlZGRlZFRlbXBsYXRlKGFzdDogRW1iZWRkZWRUZW1wbGF0ZUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICAgIHJldHVybiB0aGlzLnZpc2l0Q2hpbGRyZW4oY29udGV4dCwgdmlzaXQgPT4ge1xuICAgICAgICAvLyBJZ25vcmUgcmVmZXJlbmNlLCB2YXJpYWJsZSBhbmQgcHJvdmlkZXJzXG4gICAgICAgIHZpc2l0KGFzdC5hdHRycyk7XG4gICAgICAgIHZpc2l0KGFzdC5kaXJlY3RpdmVzKTtcbiAgICAgICAgdmlzaXQoYXN0LmNoaWxkcmVuKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpc2l0RWxlbWVudChhc3Q6IEVsZW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgICByZXR1cm4gdGhpcy52aXNpdENoaWxkcmVuKGNvbnRleHQsIHZpc2l0ID0+IHtcbiAgICAgICAgLy8gSW5nbm9yZSBwcm92aWRlcnNcbiAgICAgICAgdmlzaXQoYXN0LmF0dHJzKTtcbiAgICAgICAgdmlzaXQoYXN0LmlucHV0cyk7XG4gICAgICAgIHZpc2l0KGFzdC5vdXRwdXRzKTtcbiAgICAgICAgdmlzaXQoYXN0LnJlZmVyZW5jZXMpO1xuICAgICAgICB2aXNpdChhc3QuZGlyZWN0aXZlcyk7XG4gICAgICAgIHZpc2l0KGFzdC5jaGlsZHJlbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2aXNpdERpcmVjdGl2ZShhc3Q6IERpcmVjdGl2ZUFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICAgIC8vIElnbm9yZSB0aGUgaG9zdCBwcm9wZXJ0aWVzIG9mIGEgZGlyZWN0aXZlXG4gICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpc2l0Q2hpbGRyZW4oY29udGV4dCwgdmlzaXQgPT4geyB2aXNpdChhc3QuaW5wdXRzKTsgfSk7XG4gICAgICAvLyBXZSBuZXZlciBjYXJlIGFib3V0IHRoZSBkaXJldGl2ZSBpdHNlbGYsIGp1c3QgaXRzIGlucHV0cy5cbiAgICAgIGlmIChwYXRoW3BhdGgubGVuZ3RoIC0gMV0gPT0gYXN0KSB7XG4gICAgICAgIHBhdGgucG9wKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcblxuICB0ZW1wbGF0ZVZpc2l0QWxsKHZpc2l0b3IsIGFzdCk7XG5cbiAgcmV0dXJuIG5ldyBBc3RQYXRoPFRlbXBsYXRlQXN0PihwYXRoLCBwb3NpdGlvbik7XG59XG4iXX0=