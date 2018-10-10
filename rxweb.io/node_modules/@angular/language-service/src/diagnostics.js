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
        define("@angular/language-service/src/diagnostics", ["require", "exports", "tslib", "@angular/compiler-cli/src/language_services", "@angular/language-service/src/types", "@angular/language-service/src/utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var language_services_1 = require("@angular/compiler-cli/src/language_services");
    var types_1 = require("@angular/language-service/src/types");
    var utils_1 = require("@angular/language-service/src/utils");
    function getTemplateDiagnostics(fileName, astProvider, templates) {
        var e_1, _a;
        var results = [];
        var _loop_1 = function (template) {
            var ast = astProvider.getTemplateAst(template, fileName);
            if (ast) {
                if (ast.parseErrors && ast.parseErrors.length) {
                    results.push.apply(results, tslib_1.__spread(ast.parseErrors.map(function (e) { return ({
                        kind: types_1.DiagnosticKind.Error,
                        span: utils_1.offsetSpan(utils_1.spanOf(e.span), template.span.start),
                        message: e.msg
                    }); })));
                }
                else if (ast.templateAst && ast.htmlAst) {
                    var info = {
                        templateAst: ast.templateAst,
                        htmlAst: ast.htmlAst,
                        offset: template.span.start,
                        query: template.query,
                        members: template.members
                    };
                    var expressionDiagnostics = language_services_1.getTemplateExpressionDiagnostics(info);
                    results.push.apply(results, tslib_1.__spread(expressionDiagnostics));
                }
                if (ast.errors) {
                    results.push.apply(results, tslib_1.__spread(ast.errors.map(function (e) { return ({ kind: e.kind, span: e.span || template.span, message: e.message }); })));
                }
            }
        };
        try {
            for (var templates_1 = tslib_1.__values(templates), templates_1_1 = templates_1.next(); !templates_1_1.done; templates_1_1 = templates_1.next()) {
                var template = templates_1_1.value;
                _loop_1(template);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (templates_1_1 && !templates_1_1.done && (_a = templates_1.return)) _a.call(templates_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return results;
    }
    exports.getTemplateDiagnostics = getTemplateDiagnostics;
    function getDeclarationDiagnostics(declarations, modules) {
        var e_2, _a;
        var results = [];
        var directives = undefined;
        var _loop_2 = function (declaration) {
            var e_3, _a;
            var report = function (message, span) {
                results.push({
                    kind: types_1.DiagnosticKind.Error,
                    span: span || declaration.declarationSpan, message: message
                });
            };
            try {
                for (var _b = tslib_1.__values(declaration.errors), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var error = _c.value;
                    report(error.message, error.span);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (declaration.metadata) {
                if (declaration.metadata.isComponent) {
                    if (!modules.ngModuleByPipeOrDirective.has(declaration.type)) {
                        report("Component '" + declaration.type.name + "' is not included in a module and will not be available inside a template. Consider adding it to a NgModule declaration");
                    }
                    var _d = declaration.metadata.template, template = _d.template, templateUrl = _d.templateUrl;
                    if (template === null && !templateUrl) {
                        report("Component '" + declaration.type.name + "' must have a template or templateUrl");
                    }
                    else if (template && templateUrl) {
                        report("Component '" + declaration.type.name + "' must not have both template and templateUrl");
                    }
                }
                else {
                    if (!directives) {
                        directives = new Set();
                        modules.ngModules.forEach(function (module) {
                            module.declaredDirectives.forEach(function (directive) { directives.add(directive.reference); });
                        });
                    }
                    if (!directives.has(declaration.type)) {
                        report("Directive '" + declaration.type.name + "' is not included in a module and will not be available inside a template. Consider adding it to a NgModule declaration");
                    }
                }
            }
        };
        try {
            for (var declarations_1 = tslib_1.__values(declarations), declarations_1_1 = declarations_1.next(); !declarations_1_1.done; declarations_1_1 = declarations_1.next()) {
                var declaration = declarations_1_1.value;
                _loop_2(declaration);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (declarations_1_1 && !declarations_1_1.done && (_a = declarations_1.return)) _a.call(declarations_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return results;
    }
    exports.getDeclarationDiagnostics = getDeclarationDiagnostics;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhZ25vc3RpY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sYW5ndWFnZS1zZXJ2aWNlL3NyYy9kaWFnbm9zdGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFHSCxpRkFBcUg7SUFHckgsNkRBQTRIO0lBQzVILDZEQUEyQztJQU0zQyxnQ0FDSSxRQUFnQixFQUFFLFdBQXdCLEVBQUUsU0FBMkI7O1FBQ3pFLElBQU0sT0FBTyxHQUFnQixFQUFFLENBQUM7Z0NBQ3JCLFFBQVE7WUFDakIsSUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0QsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSSxHQUFHLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO29CQUM3QyxPQUFPLENBQUMsSUFBSSxPQUFaLE9BQU8sbUJBQVMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQy9CLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQzt3QkFDSixJQUFJLEVBQUUsc0JBQWMsQ0FBQyxLQUFLO3dCQUMxQixJQUFJLEVBQUUsa0JBQVUsQ0FBQyxjQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNyRCxPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUc7cUJBQ2YsQ0FBQyxFQUpHLENBSUgsQ0FBQyxHQUFFO2lCQUNWO3FCQUFNLElBQUksR0FBRyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO29CQUN6QyxJQUFNLElBQUksR0FBMkI7d0JBQ25DLFdBQVcsRUFBRSxHQUFHLENBQUMsV0FBVzt3QkFDNUIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO3dCQUNwQixNQUFNLEVBQUUsUUFBUSxD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QyxDQUFDLENBQUM7d0JBQy9ELENBQUMsQ0FBQyxDQUFDO3FCQUNKO29CQUNELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDckMsTUFBTSxDQUNGLGdCQUFjLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSw0SEFBeUgsQ0FBQyxDQUFDO3FCQUNuSztpQkFDRjthQUNGOzs7WUFwQ0gsS0FBMEIsSUFBQSxpQkFBQSxpQkFBQSxZQUFZLENBQUEsMENBQUE7Z0JBQWpDLElBQU0sV0FBVyx5QkFBQTt3QkFBWCxXQUFXO2FBcUNyQjs7Ozs7Ozs7O1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQTdDRCw4REE2Q0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdBbmFseXplZE1vZHVsZXMsIFN0YXRpY1N5bWJvbH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHtEaWFnbm9zdGljVGVtcGxhdGVJbmZvLCBnZXRUZW1wbGF0ZUV4cHJlc3Npb25EaWFnbm9zdGljc30gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXItY2xpL3NyYy9sYW5ndWFnZV9zZXJ2aWNlcyc7XG5cbmltcG9ydCB7QXN0UmVzdWx0fSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQge0RlY2xhcmF0aW9ucywgRGlhZ25vc3RpYywgRGlhZ25vc3RpY0tpbmQsIERpYWdub3N0aWNNZXNzYWdlQ2hhaW4sIERpYWdub3N0aWNzLCBTcGFuLCBUZW1wbGF0ZVNvdXJjZX0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge29mZnNldFNwYW4sIHNwYW5PZn0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXN0UHJvdmlkZXIge1xuICBnZXRUZW1wbGF0ZUFzdCh0ZW1wbGF0ZTogVGVtcGxhdGVTb3VyY2UsIGZpbGVOYW1lOiBzdHJpbmcpOiBBc3RSZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZW1wbGF0ZURpYWdub3N0aWNzKFxuICAgIGZpbGVOYW1lOiBzdHJpbmcsIGFzdFByb3ZpZGVyOiBBc3RQcm92aWRlciwgdGVtcGxhdGVzOiBUZW1wbGF0ZVNvdXJjZVtdKTogRGlhZ25vc3RpY3Mge1xuICBjb25zdCByZXN1bHRzOiBEaWFnbm9zdGljcyA9IFtdO1xuICBmb3IgKGNvbnN0IHRlbXBsYXRlIG9mIHRlbXBsYXRlcykge1xuICAgIGNvbnN0IGFzdCA9IGFzdFByb3ZpZGVyLmdldFRlbXBsYXRlQXN0KHRlbXBsYXRlLCBmaWxlTmFtZSk7XG4gICAgaWYgKGFzdCkge1xuICAgICAgaWYgKGFzdC5wYXJzZUVycm9ycyAmJiBhc3QucGFyc2VFcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaCguLi5hc3QucGFyc2VFcnJvcnMubWFwPERpYWdub3N0aWM+KFxuICAgICAgICAgICAgZSA9PiAoe1xuICAgICAgICAgICAgICBraW5kOiBEaWFnbm9zdGljS2luZC5FcnJvcixcbiAgICAgICAgICAgICAgc3Bhbjogb2Zmc2V0U3BhbihzcGFuT2YoZS5zcGFuKSwgdGVtcGxhdGUuc3Bhbi5zdGFydCksXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IGUubXNnXG4gICAgICAgICAgICB9KSkpO1xuICAgICAgfSBlbHNlIGlmIChhc3QudGVtcGxhdGVBc3QgJiYgYXN0Lmh0bWxBc3QpIHtcbiAgICAgICAgY29uc3QgaW5mbzogRGlhZ25vc3RpY1RlbXBsYXRlSW5mbyA9IHtcbiAgICAgICAgICB0ZW1wbGF0ZUFzdDogYXN0LnRlbXBsYXRlQXN0LFxuICAgICAgICAgIGh0bWxBc3Q6IGFzdC5odG1sQXN0LFxuICAgICAgICAgIG9mZnNldDogdGVtcGxhdGUuc3Bhbi5zdGFydCxcbiAgICAgICAgICBxdWVyeTogdGVtcGxhdGUucXVlcnksXG4gICAgICAgICAgbWVtYmVyczogdGVtcGxhdGUubWVtYmVyc1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBleHByZXNzaW9uRGlhZ25vc3RpY3MgPSBnZXRUZW1wbGF0ZUV4cHJlc3Npb25EaWFnbm9zdGljcyhpbmZvKTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKC4uLmV4cHJlc3Npb25EaWFnbm9zdGljcyk7XG4gICAgICB9XG4gICAgICBpZiAoYXN0LmVycm9ycykge1xuICAgICAgICByZXN1bHRzLnB1c2goLi4uYXN0LmVycm9ycy5tYXA8RGlhZ25vc3RpYz4oXG4gICAgICAgICAgICBlID0+ICh7a2luZDogZS5raW5kLCBzcGFuOiBlLnNwYW4gfHwgdGVtcGxhdGUuc3BhbiwgbWVzc2FnZTogZS5tZXNzYWdlfSkpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWNsYXJhdGlvbkRpYWdub3N0aWNzKFxuICAgIGRlY2xhcmF0aW9uczogRGVjbGFyYXRpb25zLCBtb2R1bGVzOiBOZ0FuYWx5emVkTW9kdWxlcyk6IERpYWdub3N0aWNzIHtcbiAgY29uc3QgcmVzdWx0czogRGlhZ25vc3RpY3MgPSBbXTtcblxuICBsZXQgZGlyZWN0aXZlczogU2V0PFN0YXRpY1N5bWJvbD58dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBmb3IgKGNvbnN0IGRlY2xhcmF0aW9uIG9mIGRlY2xhcmF0aW9ucykge1xuICAgIGNvbnN0IHJlcG9ydCA9IChtZXNzYWdlOiBzdHJpbmcgfCBEaWFnbm9zdGljTWVzc2FnZUNoYWluLCBzcGFuPzogU3BhbikgPT4ge1xuICAgICAgcmVzdWx0cy5wdXNoKDxEaWFnbm9zdGljPntcbiAgICAgICAga2luZDogRGlhZ25vc3RpY0tpbmQuRXJyb3IsXG4gICAgICAgIHNwYW46IHNwYW4gfHwgZGVjbGFyYXRpb24uZGVjbGFyYXRpb25TcGFuLCBtZXNzYWdlXG4gICAgICB9KTtcbiAgICB9O1xuICAgIGZvciAoY29uc3QgZXJyb3Igb2YgZGVjbGFyYXRpb24uZXJyb3JzKSB7XG4gICAgICByZXBvcnQoZXJyb3IubWVzc2FnZSwgZXJyb3Iuc3Bhbik7XG4gICAgfVxuICAgIGlmIChkZWNsYXJhdGlvbi5tZXRhZGF0YSkge1xuICAgICAgaWYgKGRlY2xhcmF0aW9uLm1ldGFkYXRhLmlzQ29tcG9uZW50KSB7XG4gICAgICAgIGlmICghbW9kdWxlcy5uZ01vZHVsZUJ5UGlwZU9yRGlyZWN0aXZlLmhhcyhkZWNsYXJhdGlvbi50eXBlKSkge1xuICAgICAgICAgIHJlcG9ydChcbiAgICAgICAgICAgICAgYENvbXBvbmVudCAnJHtkZWNsYXJhdGlvbi50eXBlLm5hbWV9JyBpcyBub3QgaW5jbHVkZWQgaW4gYSBtb2R1bGUgYW5kIHdpbGwgbm90IGJlIGF2YWlsYWJsZSBpbnNpZGUgYSB0ZW1wbGF0ZS4gQ29uc2lkZXIgYWRkaW5nIGl0IHRvIGEgTmdNb2R1bGUgZGVjbGFyYXRpb25gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7dGVtcGxhdGUsIHRlbXBsYXRlVXJsfSA9IGRlY2xhcmF0aW9uLm1ldGFkYXRhLnRlbXBsYXRlICE7XG4gICAgICAgIGlmICh0ZW1wbGF0ZSA9PT0gbnVsbCAmJiAhdGVtcGxhdGVVcmwpIHtcbiAgICAgICAgICByZXBvcnQoYENvbXBvbmVudCAnJHtkZWNsYXJhdGlvbi50eXBlLm5hbWV9JyBtdXN0IGhhdmUgYSB0ZW1wbGF0ZSBvciB0ZW1wbGF0ZVVybGApO1xuICAgICAgICB9IGVsc2UgaWYgKHRlbXBsYXRlICYmIHRlbXBsYXRlVXJsKSB7XG4gICAgICAgICAgcmVwb3J0KFxuICAgICAgICAgICAgICBgQ29tcG9uZW50ICcke2RlY2xhcmF0aW9uLnR5cGUubmFtZX0nIG11c3Qgbm90IGhhdmUgYm90aCB0ZW1wbGF0ZSBhbmQgdGVtcGxhdGVVcmxgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFkaXJlY3RpdmVzKSB7XG4gICAgICAgICAgZGlyZWN0aXZlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICBtb2R1bGVzLm5nTW9kdWxlcy5mb3JFYWNoKG1vZHVsZSA9PiB7XG4gICAgICAgICAgICBtb2R1bGUuZGVjbGFyZWREaXJlY3RpdmVzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlID0+IHsgZGlyZWN0aXZlcyAhLmFkZChkaXJlY3RpdmUucmVmZXJlbmNlKTsgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkaXJlY3RpdmVzLmhhcyhkZWNsYXJhdGlvbi50eXBlKSkge1xuICAgICAgICAgIHJlcG9ydChcbiAgICAgICAgICAgICAgYERpcmVjdGl2ZSAnJHtkZWNsYXJhdGlvbi50eXBlLm5hbWV9JyBpcyBub3QgaW5jbHVkZWQgaW4gYSBtb2R1bGUgYW5kIHdpbGwgbm90IGJlIGF2YWlsYWJsZSBpbnNpZGUgYSB0ZW1wbGF0ZS4gQ29uc2lkZXIgYWRkaW5nIGl0IHRvIGEgTmdNb2R1bGUgZGVjbGFyYXRpb25gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRzO1xufVxuIl19