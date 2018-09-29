/**
*@license
*Copyright Google Inc. All Rights Reserved.
*
*Use of this source code is governed by an MIT-style license that can be
*found in the LICENSE file at https://angular.io/license
*/
import * as tslib_1 from "tslib";
import { Compiler, Injectable, Injector, NgModuleFactoryLoader, NgModuleRef } from '@angular/core';
import { from, of } from 'rxjs';
import { catchError, concatMap, filter, map, mergeAll, mergeMap } from 'rxjs/operators';
import { NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart } from './events';
import { Router } from './router';
import { RouterConfigLoader } from './router_config_loader';
/**
 * @description
 *
 * Provides a preloading strategy.
 *
 * @experimental
 */
var PreloadingStrategy = /** @class */ (function () {
    function PreloadingStrategy() {
    }
    return PreloadingStrategy;
}());
export { PreloadingStrategy };
/**
 * @description
 *
 * Provides a preloading strategy that preloads all modules as quickly as possible.
 *
 * ```
 * RouteModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
 * ```
 *
 * @experimental
 */
var PreloadAllModules = /** @class */ (function () {
    function PreloadAllModules() {
    }
    PreloadAllModules.prototype.preload = function (route, fn) {
        return fn().pipe(catchError(function () { return of(null); }));
    };
    return PreloadAllModules;
}());
export { PreloadAllModules };
/**
 * @description
 *
 * Provides a preloading strategy that does not preload any modules.
 *
 * This strategy is enabled by default.
 *
 * @experimental
 */
var NoPreloading = /** @class */ (function () {
    function NoPreloading() {
    }
    NoPreloading.prototype.preload = function (route, fn) { return of(null); };
    return NoPreloading;
}());
export { NoPreloading };
/**
 * The preloader optimistically loads all router configurations to
 * make navigations into lazily-loaded sections of the application faster.
 *
 * The preloader runs in the background. When the router bootstraps, the preloader
 * starts listening to all navigation events. After every such event, the preloader
 * will check if any configurations can be loaded lazily.
 *
 * If a route is protected by `canLoad` guards, the preloaded will not load it.
 *
 *
 */
var RouterPreloader = /** @class */ (function () {
    function RouterPreloader(router, moduleLoader, compiler, injector, preloadingStrategy) {
        this.router = router;
        this.injector = injector;
        this.preloadingStrategy = preloadingStrategy;
        var onStartLoad = function (r) { return router.triggerEvent(new RouteConfigLoadStart(r)); };
        var onEndLoad = function (r) { return router.triggerEvent(new RouteConfigLoadEnd(r)); };
        this.loader = new RouterConfigLoader(moduleLoader, compiler, onStartLoad, onEndLoad);
    }
    RouterPreloader.prototype.setUpPreloading = function () {
        var _this = this;
        this.subscription =
            this.router.events
                .pipe(filter(function (e) { return e instanceof NavigationEnd; }), concatMap(function () { return _this.preload(); }))
                .subscribe(function () { });
    };
    RouterPreloader.prototype.preload = function () {
        var ngModule = this.injector.get(NgModuleRef);
        return this.processRoutes(ngModule, this.router.config);
    };
    // TODO(jasonaden): This class relies on code external to the class to call setUpPreloading. If
    // this hasn't been done, ngOnDestroy will fail as this.subscription will be undefined. This
    // should be refactored.
    RouterPreloader.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
    RouterPreloader.prototype.processRoutes = function (ngModule, routes) {
        var e_1, _a;
        var res = [];
        try {
            for (var routes_1 = tslib_1.__values(routes), routes_1_1 = routes_1.next(); !routes_1_1.done; routes_1_1 = routes_1.next()) {
                var route = routes_1_1.value;
                // we already have the config loaded, just recurse
                if (route.loadChildren && !route.canLoad && route._loadedConfig) {
                    var childConfig = route._loadedConfig;
                    res.push(this.processRoutes(childConfig.module, childConfig.routes));
                    // no config loaded, fetch the config
                }
                else if (route.loadChildren && !route.canLoad) {
                    res.push(this.preloadConfig(ngModule, route));
                    // recurse into children
                }
                else if (route.children) {
                    res.push(this.processRoutes(ngModule, route.children));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (routes_1_1 && !routes_1_1.done && (_a = routes_1.return)) _a.call(routes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return from(res).pipe(mergeAll(), map(function (_) { return void 0; }));
    };
    RouterPreloader.prototype.preloadConfig = function (ngModule, route) {
        var _this = this;
        return this.preloadingStrategy.preload(route, function () {
            var loaded$ = _this.loader.load(ngModule.injector, route);
            return loaded$.pipe(mergeMap(function (config) {
                route._loadedConfig = config;
                return _this.processRoutes(config.module, config.routes);
            }));
        });
    };
    RouterPreloader.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    RouterPreloader.ctorParameters = function () { return [
        { type: Router },
        { type: NgModuleFactoryLoader },
        { type: Compiler },
        { type: Injector },
        { type: PreloadingStrategy }
    ]; };
    return RouterPreloader;
}());
export { RouterPreloader };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3ByZWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3JvdXRlci9zcmMvcm91dGVyX3ByZWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0VBTUU7O0FBRUYsT0FBTyxFQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFLFdBQVcsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQTJCLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEYsT0FBTyxFQUFRLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUN4RixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRzFEOzs7Ozs7R0FNRztBQUNIO0lBQUE7SUFFQSxDQUFDO0lBQUQseUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0g7SUFBQTtJQUlBLENBQUM7SUFIQyxtQ0FBTyxHQUFQLFVBQVEsS0FBWSxFQUFFLEVBQXlCO1FBQzdDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsRUFBRSxDQUFFLElBQUksQ0FBQyxFQUFULENBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7O0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSDtJQUFBO0lBRUEsQ0FBQztJQURDLDhCQUFPLEdBQVAsVUFB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eEQ7YUFDRjs7Ozs7Ozs7O1FBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUssQ0FBQyxFQUFOLENBQU0sQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVPLHVDQUFhLEdBQXJCLFVBQXNCLFFBQTBCLEVBQUUsS0FBWTtRQUE5RCxpQkFRQztRQVBDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDNUMsSUFBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQUMsTUFBMEI7Z0JBQ3RELEtBQUssQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO2dCQUM3QixPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBNURGLFVBQVU7Ozs7Z0JBekRILE1BQU07Z0JBTjBCLHFCQUFxQjtnQkFBckQsUUFBUTtnQkFBYyxRQUFRO2dCQXVFd0Isa0JBQWtCOztJQXFEaEYsc0JBQUM7Q0FBQSxBQTdERCxJQTZEQztTQTVEWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qQGxpY2Vuc2VcbipDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbipcbipVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuKmZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiovXG5cbmltcG9ydCB7Q29tcGlsZXIsIEluamVjdGFibGUsIEluamVjdG9yLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5nTW9kdWxlUmVmLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NhdGNoRXJyb3IsIGNvbmNhdE1hcCwgZmlsdGVyLCBtYXAsIG1lcmdlQWxsLCBtZXJnZU1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0xvYWRlZFJvdXRlckNvbmZpZywgUm91dGUsIFJvdXRlc30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtFdmVudCwgTmF2aWdhdGlvbkVuZCwgUm91dGVDb25maWdMb2FkRW5kLCBSb3V0ZUNvbmZpZ0xvYWRTdGFydH0gZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJy4vcm91dGVyJztcbmltcG9ydCB7Um91dGVyQ29uZmlnTG9hZGVyfSBmcm9tICcuL3JvdXRlcl9jb25maWdfbG9hZGVyJztcblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFByb3ZpZGVzIGEgcHJlbG9hZGluZyBzdHJhdGVneS5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQcmVsb2FkaW5nU3RyYXRlZ3kge1xuICBhYnN0cmFjdCBwcmVsb2FkKHJvdXRlOiBSb3V0ZSwgZm46ICgpID0+IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8YW55Pjtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBQcm92aWRlcyBhIHByZWxvYWRpbmcgc3RyYXRlZ3kgdGhhdCBwcmVsb2FkcyBhbGwgbW9kdWxlcyBhcyBxdWlja2x5IGFzIHBvc3NpYmxlLlxuICpcbiAqIGBgYFxuICogUm91dGVNb2R1bGUuZm9yUm9vdChST1VURVMsIHtwcmVsb2FkaW5nU3RyYXRlZ3k6IFByZWxvYWRBbGxNb2R1bGVzfSlcbiAqIGBgYFxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNsYXNzIFByZWxvYWRBbGxNb2R1bGVzIGltcGxlbWVudHMgUHJlbG9hZGluZ1N0cmF0ZWd5IHtcbiAgcHJlbG9hZChyb3V0ZTogUm91dGUsIGZuOiAoKSA9PiBPYnNlcnZhYmxlPGFueT4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBmbigpLnBpcGUoY2F0Y2hFcnJvcigoKSA9PiBvZiAobnVsbCkpKTtcbiAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFByb3ZpZGVzIGEgcHJlbG9hZGluZyBzdHJhdGVneSB0aGF0IGRvZXMgbm90IHByZWxvYWQgYW55IG1vZHVsZXMuXG4gKlxuICogVGhpcyBzdHJhdGVneSBpcyBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY2xhc3MgTm9QcmVsb2FkaW5nIGltcGxlbWVudHMgUHJlbG9hZGluZ1N0cmF0ZWd5IHtcbiAgcHJlbG9hZChyb3V0ZTogUm91dGUsIGZuOiAoKSA9PiBPYnNlcnZhYmxlPGFueT4pOiBPYnNlcnZhYmxlPGFueT4geyByZXR1cm4gb2YgKG51bGwpOyB9XG59XG5cbi8qKlxuICogVGhlIHByZWxvYWRlciBvcHRpbWlzdGljYWxseSBsb2FkcyBhbGwgcm91dGVyIGNvbmZpZ3VyYXRpb25zIHRvXG4gKiBtYWtlIG5hdmlnYXRpb25zIGludG8gbGF6aWx5LWxvYWRlZCBzZWN0aW9ucyBvZiB0aGUgYXBwbGljYXRpb24gZmFzdGVyLlxuICpcbiAqIFRoZSBwcmVsb2FkZXIgcnVucyBpbiB0aGUgYmFja2dyb3VuZC4gV2hlbiB0aGUgcm91dGVyIGJvb3RzdHJhcHMsIHRoZSBwcmVsb2FkZXJcbiAqIHN0YXJ0cyBsaXN0ZW5pbmcgdG8gYWxsIG5hdmlnYXRpb24gZXZlbnRzLiBBZnRlciBldmVyeSBzdWNoIGV2ZW50LCB0aGUgcHJlbG9hZGVyXG4gKiB3aWxsIGNoZWNrIGlmIGFueSBjb25maWd1cmF0aW9ucyBjYW4gYmUgbG9hZGVkIGxhemlseS5cbiAqXG4gKiBJZiBhIHJvdXRlIGlzIHByb3RlY3RlZCBieSBgY2FuTG9hZGAgZ3VhcmRzLCB0aGUgcHJlbG9hZGVkIHdpbGwgbm90IGxvYWQgaXQuXG4gKlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvdXRlclByZWxvYWRlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgbG9hZGVyOiBSb3V0ZXJDb25maWdMb2FkZXI7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBwcml2YXRlIHN1YnNjcmlwdGlvbiAhOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBtb2R1bGVMb2FkZXI6IE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgY29tcGlsZXI6IENvbXBpbGVyLFxuICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgcHJlbG9hZGluZ1N0cmF0ZWd5OiBQcmVsb2FkaW5nU3RyYXRlZ3kpIHtcbiAgICBjb25zdCBvblN0YXJ0TG9hZCA9IChyOiBSb3V0ZSkgPT4gcm91dGVyLnRyaWdnZXJFdmVudChuZXcgUm91dGVDb25maWdMb2FkU3RhcnQocikpO1xuICAgIGNvbnN0IG9uRW5kTG9hZCA9IChyOiBSb3V0ZSkgPT4gcm91dGVyLnRyaWdnZXJFdmVudChuZXcgUm91dGVDb25maWdMb2FkRW5kKHIpKTtcblxuICAgIHRoaXMubG9hZGVyID0gbmV3IFJvdXRlckNvbmZpZ0xvYWRlcihtb2R1bGVMb2FkZXIsIGNvbXBpbGVyLCBvblN0YXJ0TG9hZCwgb25FbmRMb2FkKTtcbiAgfVxuXG4gIHNldFVwUHJlbG9hZGluZygpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9XG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKChlOiBFdmVudCkgPT4gZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpLCBjb25jYXRNYXAoKCkgPT4gdGhpcy5wcmVsb2FkKCkpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7fSk7XG4gIH1cblxuICBwcmVsb2FkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgY29uc3QgbmdNb2R1bGUgPSB0aGlzLmluamVjdG9yLmdldChOZ01vZHVsZVJlZik7XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc1JvdXRlcyhuZ01vZHVsZSwgdGhpcy5yb3V0ZXIuY29uZmlnKTtcbiAgfVxuXG4gIC8vIFRPRE8oamFzb25hZGVuKTogVGhpcyBjbGFzcyByZWxpZXMgb24gY29kZSBleHRlcm5hbCB0byB0aGUgY2xhc3MgdG8gY2FsbCBzZXRVcFByZWxvYWRpbmcuIElmXG4gIC8vIHRoaXMgaGFzbid0IGJlZW4gZG9uZSwgbmdPbkRlc3Ryb3kgd2lsbCBmYWlsIGFzIHRoaXMuc3Vic2NyaXB0aW9uIHdpbGwgYmUgdW5kZWZpbmVkLiBUaGlzXG4gIC8vIHNob3VsZCBiZSByZWZhY3RvcmVkLlxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTsgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc1JvdXRlcyhuZ01vZHVsZTogTmdNb2R1bGVSZWY8YW55Piwgcm91dGVzOiBSb3V0ZXMpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBjb25zdCByZXM6IE9ic2VydmFibGU8YW55PltdID0gW107XG4gICAgZm9yIChjb25zdCByb3V0ZSBvZiByb3V0ZXMpIHtcbiAgICAgIC8vIHdlIGFscmVhZHkgaGF2ZSB0aGUgY29uZmlnIGxvYWRlZCwganVzdCByZWN1cnNlXG4gICAgICBpZiAocm91dGUubG9hZENoaWxkcmVuICYmICFyb3V0ZS5jYW5Mb2FkICYmIHJvdXRlLl9sb2FkZWRDb25maWcpIHtcbiAgICAgICAgY29uc3QgY2hpbGRDb25maWcgPSByb3V0ZS5fbG9hZGVkQ29uZmlnO1xuICAgICAgICByZXMucHVzaCh0aGlzLnByb2Nlc3NSb3V0ZXMoY2hpbGRDb25maWcubW9kdWxlLCBjaGlsZENvbmZpZy5yb3V0ZXMpKTtcblxuICAgICAgICAvLyBubyBjb25maWcgbG9hZGVkLCBmZXRjaCB0aGUgY29uZmlnXG4gICAgICB9IGVsc2UgaWYgKHJvdXRlLmxvYWRDaGlsZHJlbiAmJiAhcm91dGUuY2FuTG9hZCkge1xuICAgICAgICByZXMucHVzaCh0aGlzLnByZWxvYWRDb25maWcobmdNb2R1bGUsIHJvdXRlKSk7XG5cbiAgICAgICAgLy8gcmVjdXJzZSBpbnRvIGNoaWxkcmVuXG4gICAgICB9IGVsc2UgaWYgKHJvdXRlLmNoaWxkcmVuKSB7XG4gICAgICAgIHJlcy5wdXNoKHRoaXMucHJvY2Vzc1JvdXRlcyhuZ01vZHVsZSwgcm91dGUuY2hpbGRyZW4pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZyb20ocmVzKS5waXBlKG1lcmdlQWxsKCksIG1hcCgoXykgPT4gdm9pZCAwKSk7XG4gIH1cblxuICBwcml2YXRlIHByZWxvYWRDb25maWcobmdNb2R1bGU6IE5nTW9kdWxlUmVmPGFueT4sIHJvdXRlOiBSb3V0ZSk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnByZWxvYWRpbmdTdHJhdGVneS5wcmVsb2FkKHJvdXRlLCAoKSA9PiB7XG4gICAgICBjb25zdCBsb2FkZWQkID0gdGhpcy5sb2FkZXIubG9hZChuZ01vZHVsZS5pbmplY3Rvciwgcm91dGUpO1xuICAgICAgcmV0dXJuIGxvYWRlZCQucGlwZShtZXJnZU1hcCgoY29uZmlnOiBMb2FkZWRSb3V0ZXJDb25maWcpID0+IHtcbiAgICAgICAgcm91dGUuX2xvYWRlZENvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1JvdXRlcyhjb25maWcubW9kdWxlLCBjb25maWcucm91dGVzKTtcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxufVxuIl19