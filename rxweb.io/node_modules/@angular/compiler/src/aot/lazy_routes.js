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
        define("@angular/compiler/src/aot/lazy_routes", ["require", "exports", "tslib", "@angular/compiler/src/compile_metadata"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var compile_metadata_1 = require("@angular/compiler/src/compile_metadata");
    function listLazyRoutes(moduleMeta, reflector) {
        var e_1, _a, e_2, _b;
        var allLazyRoutes = [];
        try {
            for (var _c = tslib_1.__values(moduleMeta.transitiveModule.providers), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = _d.value, provider = _e.provider, module = _e.module;
                if (compile_metadata_1.tokenReference(provider.token) === reflector.ROUTES) {
                    var loadChildren = _collectLoadChildren(provider.useValue);
                    try {
                        for (var loadChildren_1 = tslib_1.__values(loadChildren), loadChildren_1_1 = loadChildren_1.next(); !loadChildren_1_1.done; loadChildren_1_1 = loadChildren_1.next()) {
                            var route = loadChildren_1_1.value;
                            allLazyRoutes.push(parseLazyRoute(route, reflector, module.reference));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (loadChildren_1_1 && !loadChildren_1_1.done && (_b = loadChildren_1.return)) _b.call(loadChildren_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return allLazyRoutes;
    }
    exports.listLazyRoutes = listLazyRoutes;
    function _collectLoadChildren(routes, target) {
        if (target === void 0) { target = []; }
        var e_3, _a;
        if (typeof routes === 'string') {
            target.push(routes);
        }
        else if (Array.isArray(routes)) {
            try {
                for (var routes_1 = tslib_1.__values(routes), routes_1_1 = routes_1.next(); !routes_1_1.done; routes_1_1 = routes_1.next()) {
                    var route = routes_1_1.value;
                    _collectLoadChildren(route, target);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (routes_1_1 && !routes_1_1.done && (_a = routes_1.return)) _a.call(routes_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        else if (routes.loadChildren) {
            _collectLoadChildren(routes.loadChildren, target);
        }
        else if (routes.children) {
            _collectLoadChildren(routes.children, target);
        }
        return target;
    }
    function parseLazyRoute(route, reflector, module) {
        var _a = tslib_1.__read(route.split('#'), 2), routePath = _a[0], routeName = _a[1];
        var referencedModule = reflector.resolveExternalReference({
            moduleName: routePath,
            name: routeName,
        }, module ? module.filePath : undefined);
        return { route: route, module: module || referencedModule, referencedModule: referencedModule };
    }
    exports.parseLazyRoute = parseLazyRoute;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eV9yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvYW90L2xhenlfcm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQUVILDJFQUE0RTtJQWM1RSx3QkFDSSxVQUFtQyxFQUFFLFNBQTBCOztRQUNqRSxJQUFNLGFBQWEsR0FBZ0IsRUFBRSxDQUFDOztZQUN0QyxLQUFpQyxJQUFBLEtBQUEsaUJBQUEsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBN0QsSUFBQSxhQUFrQixFQUFqQixzQkFBUSxFQUFFLGtCQUFNO2dCQUMxQixJQUFJLGlDQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZELElBQU0sWUFBWSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7d0JBQzdELEtBQW9CLElBQUEsaUJBQUEsaUJBQUEsWUFBWSxDQUFBLDBDQUFBLG9FQUFFOzRCQUE3QixJQUFNLEtBQUsseUJBQUE7NEJBQ2QsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt5QkFDeEU7Ozs7Ozs7OztpQkFDRjthQUNGOzs7Ozs7Ozs7UUFDRCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBWkQsd0NBWUM7SUFFRCw4QkFBOEIsTUFBZ0MsRUFBRSxNQUFxQjtRQUFyQix1QkFBQSxFQUFBLFdBQXFCOztRQUNuRixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFOztnQkFDaEMsS0FBb0IsSUFBQSxXQUFBLGlCQUFBLE1BQU0sQ0FBQSw4QkFBQSxrREFBRTtvQkFBdkIsSUFBTSxLQUFLLG1CQUFBO29CQUNkLG9CQUFvQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDckM7Ozs7Ozs7OztTQUNGO2FBQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQzlCLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDbkQ7YUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDMUIsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMvQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx3QkFDSSxLQUFhLEVBQUUsU0FBMEIsRUFBRSxNQUFxQjtRQUM1RCxJQUFBLHdDQUF5QyxFQUF4QyxpQkFBUyxFQUFFLGlCQUFTLENBQXFCO1FBQ2hELElBQU0sZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLHdCQUF3QixDQUN2RDtZQUNFLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLElBQUksRUFBRSxTQUFTO1NBQ2hCLEVBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxJQUFJLGdCQUFnQixFQUFFLGdCQUFnQixrQkFBQSxFQUFDLENBQUM7SUFDOUUsQ0FBQztJQVZELHdDQVVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBpbGVOZ01vZHVsZU1ldGFkYXRhLCB0b2tlblJlZmVyZW5jZX0gZnJvbSAnLi4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge1JvdXRlfSBmcm9tICcuLi9jb3JlJztcbmltcG9ydCB7Q29tcGlsZU1ldGFkYXRhUmVzb2x2ZXJ9IGZyb20gJy4uL21ldGFkYXRhX3Jlc29sdmVyJztcblxuaW1wb3J0IHtBb3RDb21waWxlckhvc3R9IGZyb20gJy4vY29tcGlsZXJfaG9zdCc7XG5pbXBvcnQge1N0YXRpY1JlZmxlY3Rvcn0gZnJvbSAnLi9zdGF0aWNfcmVmbGVjdG9yJztcbmltcG9ydCB7U3RhdGljU3ltYm9sfSBmcm9tICcuL3N0YXRpY19zeW1ib2wnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExhenlSb3V0ZSB7XG4gIG1vZHVsZTogU3RhdGljU3ltYm9sO1xuICByb3V0ZTogc3RyaW5nO1xuICByZWZlcmVuY2VkTW9kdWxlOiBTdGF0aWNTeW1ib2w7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0TGF6eVJvdXRlcyhcbiAgICBtb2R1bGVNZXRhOiBDb21waWxlTmdNb2R1bGVNZXRhZGF0YSwgcmVmbGVjdG9yOiBTdGF0aWNSZWZsZWN0b3IpOiBMYXp5Um91dGVbXSB7XG4gIGNvbnN0IGFsbExhenlSb3V0ZXM6IExhenlSb3V0ZVtdID0gW107XG4gIGZvciAoY29uc3Qge3Byb3ZpZGVyLCBtb2R1bGV9IG9mIG1vZHVsZU1ldGEudHJhbnNpdGl2ZU1vZHVsZS5wcm92aWRlcnMpIHtcbiAgICBpZiAodG9rZW5SZWZlcmVuY2UocHJvdmlkZXIudG9rZW4pID09PSByZWZsZWN0b3IuUk9VVEVTKSB7XG4gICAgICBjb25zdCBsb2FkQ2hpbGRyZW4gPSBfY29sbGVjdExvYWRDaGlsZHJlbihwcm92aWRlci51c2VWYWx1ZSk7XG4gICAgICBmb3IgKGNvbnN0IHJvdXRlIG9mIGxvYWRDaGlsZHJlbikge1xuICAgICAgICBhbGxMYXp5Um91dGVzLnB1c2gocGFyc2VMYXp5Um91dGUocm91dGUsIHJlZmxlY3RvciwgbW9kdWxlLnJlZmVyZW5jZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYWxsTGF6eVJvdXRlcztcbn1cblxuZnVuY3Rpb24gX2NvbGxlY3RMb2FkQ2hpbGRyZW4ocm91dGVzOiBzdHJpbmcgfCBSb3V0ZSB8IFJvdXRlW10sIHRhcmdldDogc3RyaW5nW10gPSBbXSk6IHN0cmluZ1tdIHtcbiAgaWYgKHR5cGVvZiByb3V0ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgdGFyZ2V0LnB1c2gocm91dGVzKTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJvdXRlcykpIHtcbiAgICBmb3IgKGNvbnN0IHJvdXRlIG9mIHJvdXRlcykge1xuICAgICAgX2NvbGxlY3RMb2FkQ2hpbGRyZW4ocm91dGUsIHRhcmdldCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHJvdXRlcy5sb2FkQ2hpbGRyZW4pIHtcbiAgICBfY29sbGVjdExvYWRDaGlsZHJlbihyb3V0ZXMubG9hZENoaWxkcmVuLCB0YXJnZXQpO1xuICB9IGVsc2UgaWYgKHJvdXRlcy5jaGlsZHJlbikge1xuICAgIF9jb2xsZWN0TG9hZENoaWxkcmVuKHJvdXRlcy5jaGlsZHJlbiwgdGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMYXp5Um91dGUoXG4gICAgcm91dGU6IHN0cmluZywgcmVmbGVjdG9yOiBTdGF0aWNSZWZsZWN0b3IsIG1vZHVsZT86IFN0YXRpY1N5bWJvbCk6IExhenlSb3V0ZSB7XG4gIGNvbnN0IFtyb3V0ZVBhdGgsIHJvdXRlTmFtZV0gPSByb3V0ZS5zcGxpdCgnIycpO1xuICBjb25zdCByZWZlcmVuY2VkTW9kdWxlID0gcmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShcbiAgICAgIHtcbiAgICAgICAgbW9kdWxlTmFtZTogcm91dGVQYXRoLFxuICAgICAgICBuYW1lOiByb3V0ZU5hbWUsXG4gICAgICB9LFxuICAgICAgbW9kdWxlID8gbW9kdWxlLmZpbGVQYXRoIDogdW5kZWZpbmVkKTtcbiAgcmV0dXJuIHtyb3V0ZTogcm91dGUsIG1vZHVsZTogbW9kdWxlIHx8IHJlZmVyZW5jZWRNb2R1bGUsIHJlZmVyZW5jZWRNb2R1bGV9O1xufVxuIl19