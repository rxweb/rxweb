/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_BASE_HREF, HashLocationStrategy, LOCATION_INITIALIZED, Location, LocationStrategy, PathLocationStrategy, PlatformLocation, ViewportScroller } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, ApplicationRef, Compiler, Inject, Injectable, InjectionToken, Injector, NgModule, NgModuleFactoryLoader, NgProbeToken, Optional, SkipSelf, SystemJsNgModuleLoader } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
import { Subject, of } from 'rxjs';
import { EmptyOutletComponent } from './components/empty_outlet';
import { RouterLink, RouterLinkWithHref } from './directives/router_link';
import { RouterLinkActive } from './directives/router_link_active';
import { RouterOutlet } from './directives/router_outlet';
import { RouteReuseStrategy } from './route_reuse_strategy';
import { Router } from './router';
import { ROUTES } from './router_config_loader';
import { ChildrenOutletContexts } from './router_outlet_context';
import { NoPreloading, PreloadAllModules, PreloadingStrategy, RouterPreloader } from './router_preloader';
import { RouterScroller } from './router_scroller';
import { ActivatedRoute } from './router_state';
import { UrlHandlingStrategy } from './url_handling_strategy';
import { DefaultUrlSerializer, UrlSerializer } from './url_tree';
import { flatten } from './utils/collection';
/** *
 * \@description
 *
 * Contains a list of directives
 *
 *
  @type {?} */
const ROUTER_DIRECTIVES = [RouterOutlet, RouterLink, RouterLinkWithHref, RouterLinkActive, EmptyOutletComponent];
/** *
 * \@description
 *
 * Is used in DI to configure the router.
 *
 *
  @type {?} */
export const ROUTER_CONFIGURATION = new InjectionToken('ROUTER_CONFIGURATION');
/** *
 * \@docsNotRequired
  @type {?} */
export const ROUTER_FORROOT_GUARD = new InjectionToken('ROUTER_FORROOT_GUARD');
/** @type {?} */
export const ROUTER_PROVIDERS = [
    Location,
    { provide: UrlSerializer, useClass: DefaultUrlSerializer },
    {
        provide: Router,
        useFactory: setupRouter,
        deps: [
            ApplicationRef, UrlSerializer, ChildrenOutletContexts, Location, Injector,
            NgModuleFactoryLoader, Compiler, ROUTES, ROUTER_CONFIGURATION,
            [UrlHandlingStrategy, new Optional()], [RouteReuseStrategy, new Optional()]
        ]
    },
    ChildrenOutletContexts,
    { provide: ActivatedRoute, useFactory: rootRoute, deps: [Router] },
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
    RouterPreloader,
    NoPreloading,
    PreloadAllModules,
    { provide: ROUTER_CONFIGURATION, useValue: { enableTracing: false } },
];
/**
 * @return {?}
 */
export function routerNgProbeToken() {
    return new NgProbeToken('Router', Router);
}
/**
 * \@usageNotes
 *
 * RouterModule can be imported multiple times: once per lazily-loaded bundle.
 * Since the router deals with a global shared resource--location, we cannot have
 * more than one router service active.
 *
 * That is why there are two ways to create the module: `RouterModule.forRoot` and
 * `RouterModule.forChild`.
 *
 * * `forRoot` creates a module that contains all the directives, the given routes, and the router
 *   service itself.
 * * `forChild` creates a module that contains all the directives and the given routes, but does not
 *   include the router service.
 *
 * When registered at the root, the module should be used as follows
 *
 * ```
 * \@NgModule({
 *   imports: [RouterModule.forRoot(ROUTES)]
 * })
 * class MyNgModule {}
 * ```
 *
 * For submodules and lazy loaded submodules the module should be used as follows:
 *
 * ```
 * \@NgModule({
 *   imports: [RouterModule.forChild(ROUTES)]
 * })
 * class MyNgModule {}
 * ```
 *
 * \@description
 *
 * Adds router directives and providers.
 *
 * Managing state transitions is one of the hardest parts of building applications. This is
 * especially true on the web, where you also need to ensure that the state is reflected in the URL.
 * In addition, we often want to split applications into multiple bundles and load them on demand.
 * Doing this transparently is not trivial.
 *
 * The Angular router solves these problems. Using the router, you can declaratively specify
 * application states, manage state transitions while taking care of the URL, and load bundles on
 * demand.
 *
 * [Read this developer guide](https://angular.io/docs/ts/latest/guide/router.html) to get an
 * overview of how the router should be used.
 *
 *
 */
export class RouterModule {
    /**
     * @param {?} guard
     * @param {?} router
     */
    constructor(guard, router) { }
    /**
     * Creates a module with all the router providers and directives. It also optionally sets up an
     * application listener to perform an initial navigation.
     *
     * Options (see `ExtraOptions`):
     * * `enableTracing` makes the router log all its internal events to the console.
     * * `useHash` enables the location strategy that uses the URL fragment instead of the history
     * API.
     * * `initialNavigation` disables the initial navigation.
     * * `errorHandler` provides a custom error handler.
     * * `preloadingStrategy` configures a preloading strategy (see `PreloadAllModules`).
     * * `onSameUrlNavigation` configures how the router handles navigation to the current URL. See
     * `ExtraOptions` for more details.
     * * `paramsInheritanceStrategy` defines how the router merges params, data and resolved data
     * from parent to child routes.
     * @param {?} routes
     * @param {?=} config
     * @return {?}
     */
    static forRoot(routes, config) {
        return {
            ngModule: RouterModule,
            providers: [
                ROUTER_PROVIDERS,
                provideRoutes(routes),
                {
                    provide: ROUTER_FORROOT_GUARD,
                    useFactory: provideForRootGuard,
                    deps: [[Router, new Optional(), new SkipSelf()]]
                },
                { provide: ROUTER_CONFIGURATION, useValue: config ? config : {} },
                {
                    provide: LocationStrategy,
                    useFactory: provideLocationStrategy,
                    deps: [
                        PlatformLocation, [new Inject(APP_BASE_HREF), new Optional()], ROUTER_CONFIGURATION
                    ]
                },
                {
                    provide: RouterScroller,
                    useFactory: createRouterScroller,
                    deps: [Router, ViewportScroller, ROUTER_CONFIGURATION]
                },
                {
                    provide: PreloadingStrategy,
                    useExisting: config && config.preloadingStrategy ? config.preloadingStrategy :
                        NoPreloading
                },
                { provide: NgProbeToken, multi: true, useFactory: routerNgProbeToken },
                provideRouterInitializer(),
            ],
        };
    }
    /**
     * Creates a module with all the router directives and a provider registering routes.
     * @param {?} routes
     * @return {?}
     */
    static forChild(routes) {
        return { ngModule: RouterModule, providers: [provideRoutes(routes)] };
    }
}
RouterModule.decorators = [
    { type: NgModule, args: [{
                declarations: ROUTER_DIRECTIVES,
                exports: ROUTER_DIRECTIVES,
                entryComponents: [EmptyOutletComponent]
            },] }
];
/** @nocollapse */
RouterModule.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ROUTER_FORROOT_GUARD,] }] },
    { type: Router, decorators: [{ type: Optional }] }
];
/**
 * @param {?} router
 * @param {?} viewportScroller
 * @param {?} config
 * @return {?}
 */
export function createRouterScroller(router, viewportScroller, config) {
    if (config.scrollOffset) {
        viewportScroller.setOffset(config.scrollOffset);
    }
    return new RouterScroller(router, viewportScroller, config);
}
/**
 * @param {?} platformLocationStrategy
 * @param {?} baseHref
 * @param {?=} options
 * @return {?}
 */
export function provideLocationStrategy(platformLocationStrategy, baseHref, options = {}) {
    return options.useHash ? new HashLocationStrategy(platformLocationStrategy, baseHref) :
        new PathLocationStrategy(platformLocationStrategy, baseHref);
}
/**
 * @param {?} router
 * @return {?}
 */
export function provideForRootGuard(router) {
    if (router) {
        throw new Error(`RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.`);
    }
    return 'guarded';
}
/**
 * \@description
 *
 * Registers routes.
 *
 * ### Example
 *
 * ```
 * \@NgModule({
 *   imports: [RouterModule.forChild(ROUTES)],
 *   providers: [provideRoutes(EXTRA_ROUTES)]
 * })
 * class MyNgModule {}
 * ```
 *
 *
 * @param {?} routes
 * @return {?}
 */
export function provideRoutes(routes) {
    return [
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: routes },
        { provide: ROUTES, multi: true, useValue: routes },
    ];
}
/** @typedef {?} */
var InitialNavigation;
export { InitialNavigation };
/**
 * \@description
 *
 * Represents options to configure the router.
 *
 *
 * @record
 */
export function ExtraOptions() { }
/**
 * Makes the router log all its internal events to the console.
 * @type {?|undefined}
 */
ExtraOptions.prototype.enableTracing;
/**
 * Enables the location strategy that uses the URL fragment instead of the history API.
 * @type {?|undefined}
 */
ExtraOptions.prototype.useHash;
/**
 * Disables the initial navigation.
 * @type {?|undefined}
 */
ExtraOptions.prototype.initialNavigation;
/**
 * A custom error handler.
 * @type {?|undefined}
 */
ExtraOptions.prototype.errorHandler;
/**
 * Configures a preloading strategy. See `PreloadAllModules`.
 * @type {?|undefined}
 */
ExtraOptions.prototype.preloadingStrategy;
/**
 * Define what the router should do if it receives a navigation request to the current URL.
 * By default, the router will ignore this navigation. However, this prevents features such
 * as a "refresh" button. Use this option to configure the behavior when navigating to the
 * current URL. Default is 'ignore'.
 * @type {?|undefined}
 */
ExtraOptions.prototype.onSameUrlNavigation;
/**
 * Configures if the scroll position needs to be restored when navigating back.
 *
 * * 'disabled'--does nothing (default).
 * * 'top'--set the scroll position to 0,0..
 * * 'enabled'--set the scroll position to the stored position. This option will be the default in
 * the future.
 *
 * When enabled, the router stores and restores scroll positions during navigation.
 * When navigating forward, the scroll position will be set to [0, 0], or to the anchor
 * if one is provided.
 *
 * You can implement custom scroll restoration behavior as follows.
 * ```typescript
 * class AppModule {
 *  constructor(router: Router, viewportScroller: ViewportScroller, store: Store<AppState>) {
 *    router.events.pipe(filter(e => e instanceof Scroll), switchMap(e => {
 *      return store.pipe(first(), timeout(200), map(() => e));
 *    }).subscribe(e => {
 *      if (e.position) {
 *        viewportScroller.scrollToPosition(e.position);
 *      } else if (e.anchor) {
 *        viewportScroller.scrollToAnchor(e.anchor);
 *      } else {
 *        viewportScroller.scrollToPosition([0, 0]);
 *      }
 *    });
 *  }
 * }
 * ```
 *
 * You can also implement component-specific scrolling like this:
 *
 * ```typescript
 * class ListComponent {
 *   list: any[];
 *   constructor(router: Router, viewportScroller: ViewportScroller, fetcher: ListFetcher) {
 *     const scrollEvents = router.events.filter(e => e instanceof Scroll);
 *     listFetcher.fetch().pipe(withLatestFrom(scrollEvents)).subscribe(([list, e]) => {
 *       this.list = list;
 *       if (e.position) {
 *         viewportScroller.scrollToPosition(e.position);
 *       } else {
 *         viewportScroller.scrollToPosition([0, 0]);
 *       }
 *     });
 *   }
 * }
 * @type {?|undefined}
 */
ExtraOptions.prototype.scrollPositionRestoration;
/**
 * Configures if the router should scroll to the element when the url has a fragment.
 *
 * * 'disabled'--does nothing (default).
 * * 'enabled'--scrolls to the element. This option will be the default in the future.
 *
 * Anchor scrolling does not happen on 'popstate'. Instead, we restore the position
 * that we stored or scroll to the top.
 * @type {?|undefined}
 */
ExtraOptions.prototype.anchorScrolling;
/**
 * Configures the scroll offset the router will use when scrolling to an element.
 *
 * When given a tuple with two numbers, the router will always use the numbers.
 * When given a function, the router will invoke the function every time it restores scroll
 * position.
 * @type {?|undefined}
 */
ExtraOptions.prototype.scrollOffset;
/**
 * Defines how the router merges params, data and resolved data from parent to child
 * routes. Available options are:
 *
 * - `'emptyOnly'`, the default, only inherits parent params for path-less or component-less
 *   routes.
 * - `'always'`, enables unconditional inheritance of parent params.
 * @type {?|undefined}
 */
ExtraOptions.prototype.paramsInheritanceStrategy;
/**
 * A custom malformed uri error handler function. This handler is invoked when encodedURI contains
 * invalid character sequences. The default implementation is to redirect to the root url dropping
 * any path or param info. This function passes three parameters:
 *
 * - `'URIError'` - Error thrown when parsing a bad URL
 * - `'UrlSerializer'` - UrlSerializer that’s configured with the router.
 * - `'url'` -  The malformed URL that caused the URIError
 *
 * @type {?|undefined}
 */
ExtraOptions.prototype.malformedUriErrorHandler;
/**
 * Defines when the router updates the browser URL. The default behavior is to update after
 * successful navigation. However, some applications may prefer a mode where the URL gets
 * updated at the beginning of navigation. The most common use case would be updating the
 * URL early so if navigation fails, you can show an error message with the URL that failed.
 * Available options are:
 *
 * - `'deferred'`, the default, updates the browser URL after navigation has finished.
 * - `'eager'`, updates browser URL at the beginning of navigation.
 * @type {?|undefined}
 */
ExtraOptions.prototype.urlUpdateStrategy;
/**
 * Enables a bug fix that corrects relative link resolution in components with empty paths.
 * Example:
 *
 * ```
 * const routes = [
 *   {
 *     path: '',
 *     component: ContainerComponent,
 *     children: [
 *       { path: 'a', component: AComponent },
 *       { path: 'b', component: BComponent },
 *     ]
 *   }
 * ];
 * ```
 *
 * From the `ContainerComponent`, this will not work:
 *
 * `<a [routerLink]="['./a']">Link to A</a>`
 *
 * However, this will work:
 *
 * `<a [routerLink]="['../a']">Link to A</a>`
 *
 * In other words, you're required to use `../` rather than `./`. The current default in v6
 * is `legacy`, and this option will be removed in v7 to default to the corrected behavior.
 * @type {?|undefined}
 */
ExtraOptions.prototype.relativeLinkResolution;
/**
 * @param {?} ref
 * @param {?} urlSerializer
 * @param {?} contexts
 * @param {?} location
 * @param {?} injector
 * @param {?} loader
 * @param {?} compiler
 * @param {?} config
 * @param {?=} opts
 * @param {?=} urlHandlingStrategy
 * @param {?=} routeReuseStrategy
 * @return {?}
 */
export function setupRouter(ref, urlSerializer, contexts, location, injector, loader, compiler, config, opts = {}, urlHandlingStrategy, routeReuseStrategy) {
    /** @type {?} */
    const router = new Router(null, urlSerializer, contexts, location, injector, loader, compiler, flatten(config));
    if (urlHandlingStrategy) {
        router.urlHandlingStrategy = urlHandlingStrategy;
    }
    if (routeReuseStrategy) {
        router.routeReuseStrategy = routeReuseStrategy;
    }
    if (opts.errorHandler) {
        router.errorHandler = opts.errorHandler;
    }
    if (opts.malformedUriErrorHandler) {
        router.malformedUriErrorHandler = opts.malformedUriErrorHandler;
    }
    if (opts.enableTracing) {
        /** @type {?} */
        const dom = getDOM();
        router.events.subscribe((e) => {
            dom.logGroup(`Router Event: ${((/** @type {?} */ (e.constructor))).name}`);
            dom.log(e.toString());
            dom.log(e);
            dom.logGroupEnd();
        });
    }
    if (opts.onSameUrlNavigation) {
        router.onSameUrlNavigation = opts.onSameUrlNavigation;
    }
    if (opts.paramsInheritanceStrategy) {
        router.paramsInheritanceStrategy = opts.paramsInheritanceStrategy;
    }
    if (opts.urlUpdateStrategy) {
        router.urlUpdateStrategy = opts.urlUpdateStrategy;
    }
    if (opts.relativeLinkResolution) {
        router.relativeLinkResolution = opts.relativeLinkResolution;
    }
    return router;
}
/**
 * @param {?} router
 * @return {?}
 */
export function rootRoute(router) {
    return router.routerState.root;
}
/**
 * To initialize the router properly we need to do in two steps:
 *
 * We need to start the navigation in a APP_INITIALIZER to block the bootstrap if
 * a resolver or a guards executes asynchronously. Second, we need to actually run
 * activation in a BOOTSTRAP_LISTENER. We utilize the afterPreactivation
 * hook provided by the router to do that.
 *
 * The router navigation starts, reaches the point when preactivation is done, and then
 * pauses. It waits for the hook to be resolved. We then resolve it only in a bootstrap listener.
 */
export class RouterInitializer {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
        this.initNavigation = false;
        this.resultOfPreactivationDone = new Subject();
    }
    /**
     * @return {?}
     */
    appInitializer() {
        /** @type {?} */
        const p = this.injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
        return p.then(() => {
            /** @type {?} */
            let resolve = /** @type {?} */ ((null));
            /** @type {?} */
            const res = new Promise(r => resolve = r);
            /** @type {?} */
            const router = this.injector.get(Router);
            /** @type {?} */
            const opts = this.injector.get(ROUTER_CONFIGURATION);
            if (this.isLegacyDisabled(opts) || this.isLegacyEnabled(opts)) {
                resolve(true);
            }
            else if (opts.initialNavigation === 'disabled') {
                router.setUpLocationChangeListener();
                resolve(true);
            }
            else if (opts.initialNavigation === 'enabled') {
                router.hooks.afterPreactivation = () => {
                    // only the initial navigation should be delayed
                    if (!this.initNavigation) {
                        this.initNavigation = true;
                        resolve(true);
                        return this.resultOfPreactivationDone;
                        // subsequent navigations should not be delayed
                    }
                    else {
                        return /** @type {?} */ (of(null));
                    }
                };
                router.initialNavigation();
            }
            else {
                throw new Error(`Invalid initialNavigation options: '${opts.initialNavigation}'`);
            }
            return res;
        });
    }
    /**
     * @param {?} bootstrappedComponentRef
     * @return {?}
     */
    bootstrapListener(bootstrappedComponentRef) {
        /** @type {?} */
        const opts = this.injector.get(ROUTER_CONFIGURATION);
        /** @type {?} */
        const preloader = this.injector.get(RouterPreloader);
        /** @type {?} */
        const routerScroller = this.injector.get(RouterScroller);
        /** @type {?} */
        const router = this.injector.get(Router);
        /** @type {?} */
        const ref = this.injector.get(ApplicationRef);
        if (bootstrappedComponentRef !== ref.components[0]) {
            return;
        }
        if (this.isLegacyEnabled(opts)) {
            router.initialNavigation();
        }
        else if (this.isLegacyDisabled(opts)) {
            router.setUpLocationChangeListener();
        }
        preloader.setUpPreloading();
        routerScroller.init();
        router.resetRootComponentType(ref.componentTypes[0]);
        this.resultOfPreactivationDone.next(/** @type {?} */ ((null)));
        this.resultOfPreactivationDone.complete();
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    isLegacyEnabled(opts) {
        return opts.initialNavigation === 'legacy_enabled' || opts.initialNavigation === true ||
            opts.initialNavigation === undefined;
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    isLegacyDisabled(opts) {
        return opts.initialNavigation === 'legacy_disabled' || opts.initialNavigation === false;
    }
}
RouterInitializer.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RouterInitializer.ctorParameters = () => [
    { type: Injector }
];
if (false) {
    /** @type {?} */
    RouterInitializer.prototype.initNavigation;
    /** @type {?} */
    RouterInitializer.prototype.resultOfPreactivationDone;
    /** @type {?} */
    RouterInitializer.prototype.injector;
}
/**
 * @param {?} r
 * @return {?}
 */
export function getAppInitializer(r) {
    return r.appInitializer.bind(r);
}
/**
 * @param {?} r
 * @return {?}
 */
export function getBootstrapListener(r) {
    return r.bootstrapListener.bind(r);
}
/** *
 * A token for the router initializer that will be called after the app is bootstrapped.
 *
 * \@experimental
  @type {?} */
export const ROUTER_INITIALIZER = new InjectionToken('Router Initializer');
/**
 * @return {?}
 */
export function provideRouterInitializer() {
    return [
        RouterInitializer,
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: getAppInitializer,
            deps: [RouterInitializer]
        },
        { provide: ROUTER_INITIALIZER, useFactory: getBootstrapListener, deps: [RouterInitializer] },
        { provide: APP_BOOTSTRAP_LISTENER, multi: true, useExisting: ROUTER_INITIALIZER },
    ];
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX21vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3JvdXRlci9zcmMvcm91dGVyX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDaEwsT0FBTyxFQUFDLDRCQUE0QixFQUFFLHNCQUFzQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFnQixNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQXVCLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFZLFFBQVEsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwVCxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBQyxVQUFVLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFFeEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFlLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDOUMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxhQUFhLEVBQVUsTUFBTSxZQUFZLENBQUM7QUFDeEUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7OztBQVczQyxNQUFNLGlCQUFpQixHQUNuQixDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQzs7Ozs7Ozs7QUFTM0YsYUFBYSxvQkFBb0IsR0FBRyxJQUFJLGNBQWMsQ0FBZSxzQkFBc0IsQ0FBQyxDQUFDOzs7O0FBSzdGLGFBQWEsb0JBQW9CLEdBQUcsSUFBSSxjQUFjLENBQU8sc0JBQXNCLENBQUMsQ0FBQzs7QUFFckYsYUFBYSxnQkFBZ0IsR0FBZTtJQUMxQyxRQUFRO0lBQ1IsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBQztJQUN4RDtRQUNFLE9BQU8sRUFBRSxNQUFNO1FBQ2YsVUFBVSxFQUFFLFdBQVc7UUFDdkIsSUFBSSxFQUFFO1lBQ0osY0FBYyxFQUFFLGFBQWEsRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsUUFBUTtZQUN6RSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLG9CQUFvQjtZQUM3RCxDQUFDLG1CQUFtQixFQUFFLElBQUksUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLElBQUksUUFBUSxFQUFFLENBQUM7U0FDNUU7S0FDRjtJQUNELHNCQUFzQjtJQUN0QixFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBQztJQUNoRSxFQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUM7SUFDbEUsZUFBZTtJQUNmLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBQyxFQUFDO0NBQ2xFLENBQUM7Ozs7QUFFRixNQUFNO0lBQ0osT0FBTyxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwREQsTUFBTTs7Ozs7SUFFSixZQUFzRCxLQUFVLEVBQWMsTUFBYyxLQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtCaEcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFjLEVBQUUsTUFBcUI7UUFDbEQsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxnQkFBZ0I7Z0JBQ2hCLGFBQWEsQ0FBQyxNQUFNLENBQUM7Z0JBQ3JCO29CQUNFLE9BQU8sRUFBRSxvQkFBb0I7b0JBQzdCLFVBQVUsRUFBRSxtQkFBbUI7b0JBQy9CLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2lCQUNqRDtnQkFDRCxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQztnQkFDL0Q7b0JBQ0UsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsVUFBVSxFQUFFLHVCQUF1QjtvQkFDbkMsSUFBSSxFQUFFO3dCQUNKLGdCQUFnQixFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFLG9CQUFvQjtxQkFDcEY7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFVBQVUsRUFBRSxvQkFBb0I7b0JBQ2hDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQztpQkFDdkQ7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGtCQUFrQjtvQkFDM0IsV0FBVyxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUMzQixZQUFZO2lCQUNoRTtnQkFDRCxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUM7Z0JBQ3BFLHdCQUF3QixFQUFFO2FBQzNCO1NBQ0YsQ0FBQztLQUNIOzs7Ozs7SUFLRCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQWM7UUFDNUIsT0FBTyxFQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQztLQUNyRTs7O1lBakVGLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsaUJBQWlCO2dCQUMvQixPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixlQUFlLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzthQUN4Qzs7Ozs0Q0FHYyxRQUFRLFlBQUksTUFBTSxTQUFDLG9CQUFvQjtZQXZIaEMsTUFBTSx1QkF1SHlDLFFBQVE7Ozs7Ozs7O0FBNkQ3RSxNQUFNLCtCQUNGLE1BQWMsRUFBRSxnQkFBa0MsRUFBRSxNQUFvQjtJQUMxRSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7UUFDdkIsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNqRDtJQUNELE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQzdEOzs7Ozs7O0FBRUQsTUFBTSxrQ0FDRix3QkFBMEMsRUFBRSxRQUFnQixFQUFFLFVBQXdCLEVBQUU7SUFDMUYsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLHdCQUF3QixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxvQkFBb0IsQ0FBQyx3QkFBd0IsRUFBRSxRQUFRLENBQUMsQ0FBQztDQUN2Rjs7Ozs7QUFFRCxNQUFNLDhCQUE4QixNQUFjO0lBQ2hELElBQUksTUFBTSxFQUFFO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FDWCxzR0FBc0csQ0FBQyxDQUFDO0tBQzdHO0lBQ0QsT0FBTyxTQUFTLENBQUM7Q0FDbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJELE1BQU0sd0JBQXdCLE1BQWM7SUFDMUMsT0FBTztRQUNMLEVBQUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztRQUN0RSxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO0tBQ2pELENBQUM7Q0FDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK01ELE1BQU0sc0JBQ0YsR0FBbUIsRUFBRSxhQUE0QixFQUFFLFFBQWdDLEVBQ25GLFFBQWtCLEVBQUUsUUFBa0IsRUFBRSxNQUE2QixFQUFFLFFBQWtCLEVBQ3pGLE1BQWlCLEVBQUUsT0FBcUIsRUFBRSxFQUFFLG1CQUF5QyxFQUNyRixrQkFBdUM7O0lBQ3pDLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUNyQixJQUFJLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFMUYsSUFBSSxtQkFBbUIsRUFBRTtRQUN2QixNQUFNLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7S0FDbEQ7SUFFRCxJQUFJLGtCQUFrQixFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztLQUNoRDtJQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNyQixNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDekM7SUFFRCxJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtRQUNqQyxNQUFNLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDO0tBQ2pFO0lBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFOztRQUN0QixNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQztRQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQWMsRUFBRSxFQUFFO1lBQ3pDLEdBQUcsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLG9CQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzNELEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNYLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuQixDQUFDLENBQUM7S0FDSjtJQUVELElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1FBQzVCLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7S0FDdkQ7SUFFRCxJQUFJLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtRQUNsQyxNQUFNLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDO0tBQ25FO0lBRUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7UUFDMUIsTUFBTSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztLQUNuRDtJQUVELElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1FBQy9CLE1BQU0sQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7S0FDN0Q7SUFFRCxPQUFPLE1BQU0sQ0FBQztDQUNmOzs7OztBQUVELE1BQU0sb0JBQW9CLE1BQWM7SUFDdEMsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztDQUNoQzs7Ozs7Ozs7Ozs7O0FBY0QsTUFBTTs7OztJQUlKLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7OEJBSEosS0FBSzt5Q0FDSCxJQUFJLE9BQU8sRUFBUTtLQUViOzs7O0lBRTFDLGNBQWM7O1FBQ1osTUFBTSxDQUFDLEdBQWlCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFOztZQUNqQixJQUFJLE9BQU8sc0JBQWEsSUFBSSxHQUFHOztZQUMvQixNQUFNLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQzs7WUFDMUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7O1lBQ3pDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFckQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDN0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBRWY7aUJBQU0sSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssVUFBVSxFQUFFO2dCQUNoRCxNQUFNLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztnQkFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBRWY7aUJBQU0sSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssU0FBUyxFQUFFO2dCQUMvQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLEdBQUcsRUFBRTs7b0JBRXJDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO3dCQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzt3QkFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNkLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDOztxQkFHdkM7eUJBQU07d0JBQ0wseUJBQU8sRUFBRSxDQUFFLElBQUksQ0FBUSxFQUFDO3FCQUN6QjtpQkFDRixDQUFDO2dCQUNGLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBRTVCO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7YUFDbkY7WUFFRCxPQUFPLEdBQUcsQ0FBQztTQUNaLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELGlCQUFpQixDQUFDLHdCQUEyQzs7UUFDM0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7UUFDckQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7O1FBQ3JELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztRQUN6RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFDekMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQWlCLGNBQWMsQ0FBQyxDQUFDO1FBRTlELElBQUksd0JBQXdCLEtBQUssR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUIsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7YUFBTSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QyxNQUFNLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztTQUN0QztRQUVELFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM1QixjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxvQkFBQyxJQUFJLEdBQUcsQ0FBQztRQUM1QyxJQUFJLENBQUMseUJBQXlCLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDM0M7Ozs7O0lBRU8sZUFBZSxDQUFDLElBQWtCO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixLQUFLLGdCQUFnQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxJQUFJO1lBQ2pGLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxTQUFTLENBQUM7Ozs7OztJQUduQyxnQkFBZ0IsQ0FBQyxJQUFrQjtRQUN6QyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssS0FBSyxDQUFDOzs7O1lBM0UzRixVQUFVOzs7O1lBOWZnSixRQUFROzs7Ozs7Ozs7Ozs7OztBQTZrQm5LLE1BQU0sNEJBQTRCLENBQW9CO0lBQ3BELE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDakM7Ozs7O0FBRUQsTUFBTSwrQkFBK0IsQ0FBb0I7SUFDdkQsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3BDOzs7Ozs7QUFPRCxhQUFhLGtCQUFrQixHQUMzQixJQUFJLGNBQWMsQ0FBdUMsb0JBQW9CLENBQUMsQ0FBQzs7OztBQUVuRixNQUFNO0lBQ0osT0FBTztRQUNMLGlCQUFpQjtRQUNqQjtZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsVUFBVSxFQUFFLGlCQUFpQjtZQUM3QixJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztTQUMxQjtRQUNELEVBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDO1FBQzFGLEVBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFDO0tBQ2hGLENBQUM7Q0FDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBUFBfQkFTRV9IUkVGLCBIYXNoTG9jYXRpb25TdHJhdGVneSwgTE9DQVRJT05fSU5JVElBTElaRUQsIExvY2F0aW9uLCBMb2NhdGlvblN0cmF0ZWd5LCBQYXRoTG9jYXRpb25TdHJhdGVneSwgUGxhdGZvcm1Mb2NhdGlvbiwgVmlld3BvcnRTY3JvbGxlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgQVBQX0JPT1RTVFJBUF9MSVNURU5FUiwgQVBQX0lOSVRJQUxJWkVSLCBBcHBsaWNhdGlvblJlZiwgQ29tcGlsZXIsIENvbXBvbmVudFJlZiwgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5nUHJvYmVUb2tlbiwgT3B0aW9uYWwsIFByb3ZpZGVyLCBTa2lwU2VsZiwgU3lzdGVtSnNOZ01vZHVsZUxvYWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1N1YmplY3QsIG9mIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7RW1wdHlPdXRsZXRDb21wb25lbnR9IGZyb20gJy4vY29tcG9uZW50cy9lbXB0eV9vdXRsZXQnO1xuaW1wb3J0IHtSb3V0ZSwgUm91dGVzfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge1JvdXRlckxpbmssIFJvdXRlckxpbmtXaXRoSHJlZn0gZnJvbSAnLi9kaXJlY3RpdmVzL3JvdXRlcl9saW5rJztcbmltcG9ydCB7Um91dGVyTGlua0FjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL3JvdXRlcl9saW5rX2FjdGl2ZSc7XG5pbXBvcnQge1JvdXRlck91dGxldH0gZnJvbSAnLi9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQnO1xuaW1wb3J0IHtSb3V0ZXJFdmVudH0gZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IHtSb3V0ZVJldXNlU3RyYXRlZ3l9IGZyb20gJy4vcm91dGVfcmV1c2Vfc3RyYXRlZ3knO1xuaW1wb3J0IHtFcnJvckhhbmRsZXIsIFJvdXRlcn0gZnJvbSAnLi9yb3V0ZXInO1xuaW1wb3J0IHtST1VURVN9IGZyb20gJy4vcm91dGVyX2NvbmZpZ19sb2FkZXInO1xuaW1wb3J0IHtDaGlsZHJlbk91dGxldENvbnRleHRzfSBmcm9tICcuL3JvdXRlcl9vdXRsZXRfY29udGV4dCc7XG5pbXBvcnQge05vUHJlbG9hZGluZywgUHJlbG9hZEFsbE1vZHVsZXMsIFByZWxvYWRpbmdTdHJhdGVneSwgUm91dGVyUHJlbG9hZGVyfSBmcm9tICcuL3JvdXRlcl9wcmVsb2FkZXInO1xuaW1wb3J0IHtSb3V0ZXJTY3JvbGxlcn0gZnJvbSAnLi9yb3V0ZXJfc2Nyb2xsZXInO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnLi9yb3V0ZXJfc3RhdGUnO1xuaW1wb3J0IHtVcmxIYW5kbGluZ1N0cmF0ZWd5fSBmcm9tICcuL3VybF9oYW5kbGluZ19zdHJhdGVneSc7XG5pbXBvcnQge0RlZmF1bHRVcmxTZXJpYWxpemVyLCBVcmxTZXJpYWxpemVyLCBVcmxUcmVlfSBmcm9tICcuL3VybF90cmVlJztcbmltcG9ydCB7ZmxhdHRlbn0gZnJvbSAnLi91dGlscy9jb2xsZWN0aW9uJztcblxuXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogQ29udGFpbnMgYSBsaXN0IG9mIGRpcmVjdGl2ZXNcbiAqXG4gKlxuICovXG5jb25zdCBST1VURVJfRElSRUNUSVZFUyA9XG4gICAgW1JvdXRlck91dGxldCwgUm91dGVyTGluaywgUm91dGVyTGlua1dpdGhIcmVmLCBSb3V0ZXJMaW5rQWN0aXZlLCBFbXB0eU91dGxldENvbXBvbmVudF07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogSXMgdXNlZCBpbiBESSB0byBjb25maWd1cmUgdGhlIHJvdXRlci5cbiAqXG4gKlxuICovXG5leHBvcnQgY29uc3QgUk9VVEVSX0NPTkZJR1VSQVRJT04gPSBuZXcgSW5qZWN0aW9uVG9rZW48RXh0cmFPcHRpb25zPignUk9VVEVSX0NPTkZJR1VSQVRJT04nKTtcblxuLyoqXG4gKiBAZG9jc05vdFJlcXVpcmVkXG4gKi9cbmV4cG9ydCBjb25zdCBST1VURVJfRk9SUk9PVF9HVUFSRCA9IG5ldyBJbmplY3Rpb25Ub2tlbjx2b2lkPignUk9VVEVSX0ZPUlJPT1RfR1VBUkQnKTtcblxuZXhwb3J0IGNvbnN0IFJPVVRFUl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIExvY2F0aW9uLFxuICB7cHJvdmlkZTogVXJsU2VyaWFsaXplciwgdXNlQ2xhc3M6IERlZmF1bHRVcmxTZXJpYWxpemVyfSxcbiAge1xuICAgIHByb3ZpZGU6IFJvdXRlcixcbiAgICB1c2VGYWN0b3J5OiBzZXR1cFJvdXRlcixcbiAgICBkZXBzOiBbXG4gICAgICBBcHBsaWNhdGlvblJlZiwgVXJsU2VyaWFsaXplciwgQ2hpbGRyZW5PdXRsZXRDb250ZXh0cywgTG9jYXRpb24sIEluamVjdG9yLFxuICAgICAgTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBDb21waWxlciwgUk9VVEVTLCBST1VURVJfQ09ORklHVVJBVElPTixcbiAgICAgIFtVcmxIYW5kbGluZ1N0cmF0ZWd5LCBuZXcgT3B0aW9uYWwoKV0sIFtSb3V0ZVJldXNlU3RyYXRlZ3ksIG5ldyBPcHRpb25hbCgpXVxuICAgIF1cbiAgfSxcbiAgQ2hpbGRyZW5PdXRsZXRDb250ZXh0cyxcbiAge3Byb3ZpZGU6IEFjdGl2YXRlZFJvdXRlLCB1c2VGYWN0b3J5OiByb290Um91dGUsIGRlcHM6IFtSb3V0ZXJdfSxcbiAge3Byb3ZpZGU6IE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgdXNlQ2xhc3M6IFN5c3RlbUpzTmdNb2R1bGVMb2FkZXJ9LFxuICBSb3V0ZXJQcmVsb2FkZXIsXG4gIE5vUHJlbG9hZGluZyxcbiAgUHJlbG9hZEFsbE1vZHVsZXMsXG4gIHtwcm92aWRlOiBST1VURVJfQ09ORklHVVJBVElPTiwgdXNlVmFsdWU6IHtlbmFibGVUcmFjaW5nOiBmYWxzZX19LFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJvdXRlck5nUHJvYmVUb2tlbigpIHtcbiAgcmV0dXJuIG5ldyBOZ1Byb2JlVG9rZW4oJ1JvdXRlcicsIFJvdXRlcik7XG59XG5cbi8qKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBSb3V0ZXJNb2R1bGUgY2FuIGJlIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzOiBvbmNlIHBlciBsYXppbHktbG9hZGVkIGJ1bmRsZS5cbiAqIFNpbmNlIHRoZSByb3V0ZXIgZGVhbHMgd2l0aCBhIGdsb2JhbCBzaGFyZWQgcmVzb3VyY2UtLWxvY2F0aW9uLCB3ZSBjYW5ub3QgaGF2ZVxuICogbW9yZSB0aGFuIG9uZSByb3V0ZXIgc2VydmljZSBhY3RpdmUuXG4gKlxuICogVGhhdCBpcyB3aHkgdGhlcmUgYXJlIHR3byB3YXlzIHRvIGNyZWF0ZSB0aGUgbW9kdWxlOiBgUm91dGVyTW9kdWxlLmZvclJvb3RgIGFuZFxuICogYFJvdXRlck1vZHVsZS5mb3JDaGlsZGAuXG4gKlxuICogKiBgZm9yUm9vdGAgY3JlYXRlcyBhIG1vZHVsZSB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgZGlyZWN0aXZlcywgdGhlIGdpdmVuIHJvdXRlcywgYW5kIHRoZSByb3V0ZXJcbiAqICAgc2VydmljZSBpdHNlbGYuXG4gKiAqIGBmb3JDaGlsZGAgY3JlYXRlcyBhIG1vZHVsZSB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgZGlyZWN0aXZlcyBhbmQgdGhlIGdpdmVuIHJvdXRlcywgYnV0IGRvZXMgbm90XG4gKiAgIGluY2x1ZGUgdGhlIHJvdXRlciBzZXJ2aWNlLlxuICpcbiAqIFdoZW4gcmVnaXN0ZXJlZCBhdCB0aGUgcm9vdCwgdGhlIG1vZHVsZSBzaG91bGQgYmUgdXNlZCBhcyBmb2xsb3dzXG4gKlxuICogYGBgXG4gKiBATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvclJvb3QoUk9VVEVTKV1cbiAqIH0pXG4gKiBjbGFzcyBNeU5nTW9kdWxlIHt9XG4gKiBgYGBcbiAqXG4gKiBGb3Igc3VibW9kdWxlcyBhbmQgbGF6eSBsb2FkZWQgc3VibW9kdWxlcyB0aGUgbW9kdWxlIHNob3VsZCBiZSB1c2VkIGFzIGZvbGxvd3M6XG4gKlxuICogYGBgXG4gKiBATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvckNoaWxkKFJPVVRFUyldXG4gKiB9KVxuICogY2xhc3MgTXlOZ01vZHVsZSB7fVxuICogYGBgXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogQWRkcyByb3V0ZXIgZGlyZWN0aXZlcyBhbmQgcHJvdmlkZXJzLlxuICpcbiAqIE1hbmFnaW5nIHN0YXRlIHRyYW5zaXRpb25zIGlzIG9uZSBvZiB0aGUgaGFyZGVzdCBwYXJ0cyBvZiBidWlsZGluZyBhcHBsaWNhdGlvbnMuIFRoaXMgaXNcbiAqIGVzcGVjaWFsbHkgdHJ1ZSBvbiB0aGUgd2ViLCB3aGVyZSB5b3UgYWxzbyBuZWVkIHRvIGVuc3VyZSB0aGF0IHRoZSBzdGF0ZSBpcyByZWZsZWN0ZWQgaW4gdGhlIFVSTC5cbiAqIEluIGFkZGl0aW9uLCB3ZSBvZnRlbiB3YW50IHRvIHNwbGl0IGFwcGxpY2F0aW9ucyBpbnRvIG11bHRpcGxlIGJ1bmRsZXMgYW5kIGxvYWQgdGhlbSBvbiBkZW1hbmQuXG4gKiBEb2luZyB0aGlzIHRyYW5zcGFyZW50bHkgaXMgbm90IHRyaXZpYWwuXG4gKlxuICogVGhlIEFuZ3VsYXIgcm91dGVyIHNvbHZlcyB0aGVzZSBwcm9ibGVtcy4gVXNpbmcgdGhlIHJvdXRlciwgeW91IGNhbiBkZWNsYXJhdGl2ZWx5IHNwZWNpZnlcbiAqIGFwcGxpY2F0aW9uIHN0YXRlcywgbWFuYWdlIHN0YXRlIHRyYW5zaXRpb25zIHdoaWxlIHRha2luZyBjYXJlIG9mIHRoZSBVUkwsIGFuZCBsb2FkIGJ1bmRsZXMgb25cbiAqIGRlbWFuZC5cbiAqXG4gKiBbUmVhZCB0aGlzIGRldmVsb3BlciBndWlkZV0oaHR0cHM6Ly9hbmd1bGFyLmlvL2RvY3MvdHMvbGF0ZXN0L2d1aWRlL3JvdXRlci5odG1sKSB0byBnZXQgYW5cbiAqIG92ZXJ2aWV3IG9mIGhvdyB0aGUgcm91dGVyIHNob3VsZCBiZSB1c2VkLlxuICpcbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogUk9VVEVSX0RJUkVDVElWRVMsXG4gIGV4cG9ydHM6IFJPVVRFUl9ESVJFQ1RJVkVTLFxuICBlbnRyeUNvbXBvbmVudHM6IFtFbXB0eU91dGxldENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUm91dGVyTW9kdWxlIHtcbiAgLy8gTm90ZTogV2UgYXJlIGluamVjdGluZyB0aGUgUm91dGVyIHNvIGl0IGdldHMgY3JlYXRlZCBlYWdlcmx5Li4uXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoUk9VVEVSX0ZPUlJPT1RfR1VBUkQpIGd1YXJkOiBhbnksIEBPcHRpb25hbCgpIHJvdXRlcjogUm91dGVyKSB7fVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbW9kdWxlIHdpdGggYWxsIHRoZSByb3V0ZXIgcHJvdmlkZXJzIGFuZCBkaXJlY3RpdmVzLiBJdCBhbHNvIG9wdGlvbmFsbHkgc2V0cyB1cCBhblxuICAgKiBhcHBsaWNhdGlvbiBsaXN0ZW5lciB0byBwZXJmb3JtIGFuIGluaXRpYWwgbmF2aWdhdGlvbi5cbiAgICpcbiAgICogT3B0aW9ucyAoc2VlIGBFeHRyYU9wdGlvbnNgKTpcbiAgICogKiBgZW5hYmxlVHJhY2luZ2AgbWFrZXMgdGhlIHJvdXRlciBsb2cgYWxsIGl0cyBpbnRlcm5hbCBldmVudHMgdG8gdGhlIGNvbnNvbGUuXG4gICAqICogYHVzZUhhc2hgIGVuYWJsZXMgdGhlIGxvY2F0aW9uIHN0cmF0ZWd5IHRoYXQgdXNlcyB0aGUgVVJMIGZyYWdtZW50IGluc3RlYWQgb2YgdGhlIGhpc3RvcnlcbiAgICogQVBJLlxuICAgKiAqIGBpbml0aWFsTmF2aWdhdGlvbmAgZGlzYWJsZXMgdGhlIGluaXRpYWwgbmF2aWdhdGlvbi5cbiAgICogKiBgZXJyb3JIYW5kbGVyYCBwcm92aWRlcyBhIGN1c3RvbSBlcnJvciBoYW5kbGVyLlxuICAgKiAqIGBwcmVsb2FkaW5nU3RyYXRlZ3lgIGNvbmZpZ3VyZXMgYSBwcmVsb2FkaW5nIHN0cmF0ZWd5IChzZWUgYFByZWxvYWRBbGxNb2R1bGVzYCkuXG4gICAqICogYG9uU2FtZVVybE5hdmlnYXRpb25gIGNvbmZpZ3VyZXMgaG93IHRoZSByb3V0ZXIgaGFuZGxlcyBuYXZpZ2F0aW9uIHRvIHRoZSBjdXJyZW50IFVSTC4gU2VlXG4gICAqIGBFeHRyYU9wdGlvbnNgIGZvciBtb3JlIGRldGFpbHMuXG4gICAqICogYHBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3lgIGRlZmluZXMgaG93IHRoZSByb3V0ZXIgbWVyZ2VzIHBhcmFtcywgZGF0YSBhbmQgcmVzb2x2ZWQgZGF0YVxuICAgKiBmcm9tIHBhcmVudCB0byBjaGlsZCByb3V0ZXMuXG4gICAqL1xuICBzdGF0aWMgZm9yUm9vdChyb3V0ZXM6IFJvdXRlcywgY29uZmlnPzogRXh0cmFPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVyczxSb3V0ZXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFJvdXRlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBST1VURVJfUFJPVklERVJTLFxuICAgICAgICBwcm92aWRlUm91dGVzKHJvdXRlcyksXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBST1VURVJfRk9SUk9PVF9HVUFSRCxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBwcm92aWRlRm9yUm9vdEd1YXJkLFxuICAgICAgICAgIGRlcHM6IFtbUm91dGVyLCBuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCldXVxuICAgICAgICB9LFxuICAgICAgICB7cHJvdmlkZTogUk9VVEVSX0NPTkZJR1VSQVRJT04sIHVzZVZhbHVlOiBjb25maWcgPyBjb25maWcgOiB7fX0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBMb2NhdGlvblN0cmF0ZWd5LFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IHByb3ZpZGVMb2NhdGlvblN0cmF0ZWd5LFxuICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgIFBsYXRmb3JtTG9jYXRpb24sIFtuZXcgSW5qZWN0KEFQUF9CQVNFX0hSRUYpLCBuZXcgT3B0aW9uYWwoKV0sIFJPVVRFUl9DT05GSUdVUkFUSU9OXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogUm91dGVyU2Nyb2xsZXIsXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlUm91dGVyU2Nyb2xsZXIsXG4gICAgICAgICAgZGVwczogW1JvdXRlciwgVmlld3BvcnRTY3JvbGxlciwgUk9VVEVSX0NPTkZJR1VSQVRJT05dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBQcmVsb2FkaW5nU3RyYXRlZ3ksXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6IGNvbmZpZyAmJiBjb25maWcucHJlbG9hZGluZ1N0cmF0ZWd5ID8gY29uZmlnLnByZWxvYWRpbmdTdHJhdGVneSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTm9QcmVsb2FkaW5nXG4gICAgICAgIH0sXG4gICAgICAgIHtwcm92aWRlOiBOZ1Byb2JlVG9rZW4sIG11bHRpOiB0cnVlLCB1c2VGYWN0b3J5OiByb3V0ZXJOZ1Byb2JlVG9rZW59LFxuICAgICAgICBwcm92aWRlUm91dGVySW5pdGlhbGl6ZXIoKSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbW9kdWxlIHdpdGggYWxsIHRoZSByb3V0ZXIgZGlyZWN0aXZlcyBhbmQgYSBwcm92aWRlciByZWdpc3RlcmluZyByb3V0ZXMuXG4gICAqL1xuICBzdGF0aWMgZm9yQ2hpbGQocm91dGVzOiBSb3V0ZXMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFJvdXRlck1vZHVsZT4ge1xuICAgIHJldHVybiB7bmdNb2R1bGU6IFJvdXRlck1vZHVsZSwgcHJvdmlkZXJzOiBbcHJvdmlkZVJvdXRlcyhyb3V0ZXMpXX07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvdXRlclNjcm9sbGVyKFxuICAgIHJvdXRlcjogUm91dGVyLCB2aWV3cG9ydFNjcm9sbGVyOiBWaWV3cG9ydFNjcm9sbGVyLCBjb25maWc6IEV4dHJhT3B0aW9ucyk6IFJvdXRlclNjcm9sbGVyIHtcbiAgaWYgKGNvbmZpZy5zY3JvbGxPZmZzZXQpIHtcbiAgICB2aWV3cG9ydFNjcm9sbGVyLnNldE9mZnNldChjb25maWcuc2Nyb2xsT2Zmc2V0KTtcbiAgfVxuICByZXR1cm4gbmV3IFJvdXRlclNjcm9sbGVyKHJvdXRlciwgdmlld3BvcnRTY3JvbGxlciwgY29uZmlnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVMb2NhdGlvblN0cmF0ZWd5KFxuICAgIHBsYXRmb3JtTG9jYXRpb25TdHJhdGVneTogUGxhdGZvcm1Mb2NhdGlvbiwgYmFzZUhyZWY6IHN0cmluZywgb3B0aW9uczogRXh0cmFPcHRpb25zID0ge30pIHtcbiAgcmV0dXJuIG9wdGlvbnMudXNlSGFzaCA/IG5ldyBIYXNoTG9jYXRpb25TdHJhdGVneShwbGF0Zm9ybUxvY2F0aW9uU3RyYXRlZ3ksIGJhc2VIcmVmKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0aExvY2F0aW9uU3RyYXRlZ3kocGxhdGZvcm1Mb2NhdGlvblN0cmF0ZWd5LCBiYXNlSHJlZik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlRm9yUm9vdEd1YXJkKHJvdXRlcjogUm91dGVyKTogYW55IHtcbiAgaWYgKHJvdXRlcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFJvdXRlck1vZHVsZS5mb3JSb290KCkgY2FsbGVkIHR3aWNlLiBMYXp5IGxvYWRlZCBtb2R1bGVzIHNob3VsZCB1c2UgUm91dGVyTW9kdWxlLmZvckNoaWxkKCkgaW5zdGVhZC5gKTtcbiAgfVxuICByZXR1cm4gJ2d1YXJkZWQnO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFJlZ2lzdGVycyByb3V0ZXMuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUk9VVEVTKV0sXG4gKiAgIHByb3ZpZGVyczogW3Byb3ZpZGVSb3V0ZXMoRVhUUkFfUk9VVEVTKV1cbiAqIH0pXG4gKiBjbGFzcyBNeU5nTW9kdWxlIHt9XG4gKiBgYGBcbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVJvdXRlcyhyb3V0ZXM6IFJvdXRlcyk6IGFueSB7XG4gIHJldHVybiBbXG4gICAge3Byb3ZpZGU6IEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMsIG11bHRpOiB0cnVlLCB1c2VWYWx1ZTogcm91dGVzfSxcbiAgICB7cHJvdmlkZTogUk9VVEVTLCBtdWx0aTogdHJ1ZSwgdXNlVmFsdWU6IHJvdXRlc30sXG4gIF07XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyBhbiBvcHRpb24gdG8gY29uZmlndXJlIHdoZW4gdGhlIGluaXRpYWwgbmF2aWdhdGlvbiBpcyBwZXJmb3JtZWQuXG4gKlxuICogKiAnZW5hYmxlZCcgLSB0aGUgaW5pdGlhbCBuYXZpZ2F0aW9uIHN0YXJ0cyBiZWZvcmUgdGhlIHJvb3QgY29tcG9uZW50IGlzIGNyZWF0ZWQuXG4gKiBUaGUgYm9vdHN0cmFwIGlzIGJsb2NrZWQgdW50aWwgdGhlIGluaXRpYWwgbmF2aWdhdGlvbiBpcyBjb21wbGV0ZS5cbiAqICogJ2Rpc2FibGVkJyAtIHRoZSBpbml0aWFsIG5hdmlnYXRpb24gaXMgbm90IHBlcmZvcm1lZC4gVGhlIGxvY2F0aW9uIGxpc3RlbmVyIGlzIHNldCB1cCBiZWZvcmVcbiAqIHRoZSByb290IGNvbXBvbmVudCBnZXRzIGNyZWF0ZWQuXG4gKiAqICdsZWdhY3lfZW5hYmxlZCctIHRoZSBpbml0aWFsIG5hdmlnYXRpb24gc3RhcnRzIGFmdGVyIHRoZSByb290IGNvbXBvbmVudCBoYXMgYmVlbiBjcmVhdGVkLlxuICogVGhlIGJvb3RzdHJhcCBpcyBub3QgYmxvY2tlZCB1bnRpbCB0aGUgaW5pdGlhbCBuYXZpZ2F0aW9uIGlzIGNvbXBsZXRlLiBAZGVwcmVjYXRlZFxuICogKiAnbGVnYWN5X2Rpc2FibGVkJy0gdGhlIGluaXRpYWwgbmF2aWdhdGlvbiBpcyBub3QgcGVyZm9ybWVkLiBUaGUgbG9jYXRpb24gbGlzdGVuZXIgaXMgc2V0IHVwXG4gKiBhZnRlciBAZGVwcmVjYXRlZFxuICogdGhlIHJvb3QgY29tcG9uZW50IGdldHMgY3JlYXRlZC5cbiAqICogYHRydWVgIC0gc2FtZSBhcyAnbGVnYWN5X2VuYWJsZWQnLiBAZGVwcmVjYXRlZCBzaW5jZSB2NFxuICogKiBgZmFsc2VgIC0gc2FtZSBhcyAnbGVnYWN5X2Rpc2FibGVkJy4gQGRlcHJlY2F0ZWQgc2luY2UgdjRcbiAqXG4gKiBUaGUgJ2VuYWJsZWQnIG9wdGlvbiBzaG91bGQgYmUgdXNlZCBmb3IgYXBwbGljYXRpb25zIHVubGVzcyB0aGVyZSBpcyBhIHJlYXNvbiB0byBoYXZlXG4gKiBtb3JlIGNvbnRyb2wgb3ZlciB3aGVuIHRoZSByb3V0ZXIgc3RhcnRzIGl0cyBpbml0aWFsIG5hdmlnYXRpb24gZHVlIHRvIHNvbWUgY29tcGxleFxuICogaW5pdGlhbGl6YXRpb24gbG9naWMuIEluIHRoaXMgY2FzZSwgJ2Rpc2FibGVkJyBzaG91bGQgYmUgdXNlZC5cbiAqXG4gKiBUaGUgJ2xlZ2FjeV9lbmFibGVkJyBhbmQgJ2xlZ2FjeV9kaXNhYmxlZCcgc2hvdWxkIG5vdCBiZSB1c2VkIGZvciBuZXcgYXBwbGljYXRpb25zLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IHR5cGUgSW5pdGlhbE5hdmlnYXRpb24gPVxuICAgIHRydWUgfCBmYWxzZSB8ICdlbmFibGVkJyB8ICdkaXNhYmxlZCcgfCAnbGVnYWN5X2VuYWJsZWQnIHwgJ2xlZ2FjeV9kaXNhYmxlZCc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyBvcHRpb25zIHRvIGNvbmZpZ3VyZSB0aGUgcm91dGVyLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRXh0cmFPcHRpb25zIHtcbiAgLyoqXG4gICAqIE1ha2VzIHRoZSByb3V0ZXIgbG9nIGFsbCBpdHMgaW50ZXJuYWwgZXZlbnRzIHRvIHRoZSBjb25zb2xlLlxuICAgKi9cbiAgZW5hYmxlVHJhY2luZz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgdGhlIGxvY2F0aW9uIHN0cmF0ZWd5IHRoYXQgdXNlcyB0aGUgVVJMIGZyYWdtZW50IGluc3RlYWQgb2YgdGhlIGhpc3RvcnkgQVBJLlxuICAgKi9cbiAgdXNlSGFzaD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERpc2FibGVzIHRoZSBpbml0aWFsIG5hdmlnYXRpb24uXG4gICAqL1xuICBpbml0aWFsTmF2aWdhdGlvbj86IEluaXRpYWxOYXZpZ2F0aW9uO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBlcnJvciBoYW5kbGVyLlxuICAgKi9cbiAgZXJyb3JIYW5kbGVyPzogRXJyb3JIYW5kbGVyO1xuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgcHJlbG9hZGluZyBzdHJhdGVneS4gU2VlIGBQcmVsb2FkQWxsTW9kdWxlc2AuXG4gICAqL1xuICBwcmVsb2FkaW5nU3RyYXRlZ3k/OiBhbnk7XG5cbiAgLyoqXG4gICAqIERlZmluZSB3aGF0IHRoZSByb3V0ZXIgc2hvdWxkIGRvIGlmIGl0IHJlY2VpdmVzIGEgbmF2aWdhdGlvbiByZXF1ZXN0IHRvIHRoZSBjdXJyZW50IFVSTC5cbiAgICogQnkgZGVmYXVsdCwgdGhlIHJvdXRlciB3aWxsIGlnbm9yZSB0aGlzIG5hdmlnYXRpb24uIEhvd2V2ZXIsIHRoaXMgcHJldmVudHMgZmVhdHVyZXMgc3VjaFxuICAgKiBhcyBhIFwicmVmcmVzaFwiIGJ1dHRvbi4gVXNlIHRoaXMgb3B0aW9uIHRvIGNvbmZpZ3VyZSB0aGUgYmVoYXZpb3Igd2hlbiBuYXZpZ2F0aW5nIHRvIHRoZVxuICAgKiBjdXJyZW50IFVSTC4gRGVmYXVsdCBpcyAnaWdub3JlJy5cbiAgICovXG4gIG9uU2FtZVVybE5hdmlnYXRpb24/OiAncmVsb2FkJ3wnaWdub3JlJztcblxuICAvKipcbiAgICogQ29uZmlndXJlcyBpZiB0aGUgc2Nyb2xsIHBvc2l0aW9uIG5lZWRzIHRvIGJlIHJlc3RvcmVkIHdoZW4gbmF2aWdhdGluZyBiYWNrLlxuICAgKlxuICAgKiAqICdkaXNhYmxlZCctLWRvZXMgbm90aGluZyAoZGVmYXVsdCkuXG4gICAqICogJ3RvcCctLXNldCB0aGUgc2Nyb2xsIHBvc2l0aW9uIHRvIDAsMC4uXG4gICAqICogJ2VuYWJsZWQnLS1zZXQgdGhlIHNjcm9sbCBwb3NpdGlvbiB0byB0aGUgc3RvcmVkIHBvc2l0aW9uLiBUaGlzIG9wdGlvbiB3aWxsIGJlIHRoZSBkZWZhdWx0IGluXG4gICAqIHRoZSBmdXR1cmUuXG4gICAqXG4gICAqIFdoZW4gZW5hYmxlZCwgdGhlIHJvdXRlciBzdG9yZXMgYW5kIHJlc3RvcmVzIHNjcm9sbCBwb3NpdGlvbnMgZHVyaW5nIG5hdmlnYXRpb24uXG4gICAqIFdoZW4gbmF2aWdhdGluZyBmb3J3YXJkLCB0aGUgc2Nyb2xsIHBvc2l0aW9uIHdpbGwgYmUgc2V0IHRvIFswLCAwXSwgb3IgdG8gdGhlIGFuY2hvclxuICAgKiBpZiBvbmUgaXMgcHJvdmlkZWQuXG4gICAqXG4gICAqIFlvdSBjYW4gaW1wbGVtZW50IGN1c3RvbSBzY3JvbGwgcmVzdG9yYXRpb24gYmVoYXZpb3IgYXMgZm9sbG93cy5cbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjbGFzcyBBcHBNb2R1bGUge1xuICAgKiAgY29uc3RydWN0b3Iocm91dGVyOiBSb3V0ZXIsIHZpZXdwb3J0U2Nyb2xsZXI6IFZpZXdwb3J0U2Nyb2xsZXIsIHN0b3JlOiBTdG9yZTxBcHBTdGF0ZT4pIHtcbiAgICogICAgcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihlID0+IGUgaW5zdGFuY2VvZiBTY3JvbGwpLCBzd2l0Y2hNYXAoZSA9PiB7XG4gICAqICAgICAgcmV0dXJuIHN0b3JlLnBpcGUoZmlyc3QoKSwgdGltZW91dCgyMDApLCBtYXAoKCkgPT4gZSkpO1xuICAgKiAgICB9KS5zdWJzY3JpYmUoZSA9PiB7XG4gICAqICAgICAgaWYgKGUucG9zaXRpb24pIHtcbiAgICogICAgICAgIHZpZXdwb3J0U2Nyb2xsZXIuc2Nyb2xsVG9Qb3NpdGlvbihlLnBvc2l0aW9uKTtcbiAgICogICAgICB9IGVsc2UgaWYgKGUuYW5jaG9yKSB7XG4gICAqICAgICAgICB2aWV3cG9ydFNjcm9sbGVyLnNjcm9sbFRvQW5jaG9yKGUuYW5jaG9yKTtcbiAgICogICAgICB9IGVsc2Uge1xuICAgKiAgICAgICAgdmlld3BvcnRTY3JvbGxlci5zY3JvbGxUb1Bvc2l0aW9uKFswLCAwXSk7XG4gICAqICAgICAgfVxuICAgKiAgICB9KTtcbiAgICogIH1cbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogWW91IGNhbiBhbHNvIGltcGxlbWVudCBjb21wb25lbnQtc3BlY2lmaWMgc2Nyb2xsaW5nIGxpa2UgdGhpczpcbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjbGFzcyBMaXN0Q29tcG9uZW50IHtcbiAgICogICBsaXN0OiBhbnlbXTtcbiAgICogICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlciwgdmlld3BvcnRTY3JvbGxlcjogVmlld3BvcnRTY3JvbGxlciwgZmV0Y2hlcjogTGlzdEZldGNoZXIpIHtcbiAgICogICAgIGNvbnN0IHNjcm9sbEV2ZW50cyA9IHJvdXRlci5ldmVudHMuZmlsdGVyKGUgPT4gZSBpbnN0YW5jZW9mIFNjcm9sbCk7XG4gICAqICAgICBsaXN0RmV0Y2hlci5mZXRjaCgpLnBpcGUod2l0aExhdGVzdEZyb20oc2Nyb2xsRXZlbnRzKSkuc3Vic2NyaWJlKChbbGlzdCwgZV0pID0+IHtcbiAgICogICAgICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICogICAgICAgaWYgKGUucG9zaXRpb24pIHtcbiAgICogICAgICAgICB2aWV3cG9ydFNjcm9sbGVyLnNjcm9sbFRvUG9zaXRpb24oZS5wb3NpdGlvbik7XG4gICAqICAgICAgIH0gZWxzZSB7XG4gICAqICAgICAgICAgdmlld3BvcnRTY3JvbGxlci5zY3JvbGxUb1Bvc2l0aW9uKFswLCAwXSk7XG4gICAqICAgICAgIH1cbiAgICogICAgIH0pO1xuICAgKiAgIH1cbiAgICogfVxuICAgKi9cbiAgc2Nyb2xsUG9zaXRpb25SZXN0b3JhdGlvbj86ICdkaXNhYmxlZCd8J2VuYWJsZWQnfCd0b3AnO1xuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGlmIHRoZSByb3V0ZXIgc2hvdWxkIHNjcm9sbCB0byB0aGUgZWxlbWVudCB3aGVuIHRoZSB1cmwgaGFzIGEgZnJhZ21lbnQuXG4gICAqXG4gICAqICogJ2Rpc2FibGVkJy0tZG9lcyBub3RoaW5nIChkZWZhdWx0KS5cbiAgICogKiAnZW5hYmxlZCctLXNjcm9sbHMgdG8gdGhlIGVsZW1lbnQuIFRoaXMgb3B0aW9uIHdpbGwgYmUgdGhlIGRlZmF1bHQgaW4gdGhlIGZ1dHVyZS5cbiAgICpcbiAgICogQW5jaG9yIHNjcm9sbGluZyBkb2VzIG5vdCBoYXBwZW4gb24gJ3BvcHN0YXRlJy4gSW5zdGVhZCwgd2UgcmVzdG9yZSB0aGUgcG9zaXRpb25cbiAgICogdGhhdCB3ZSBzdG9yZWQgb3Igc2Nyb2xsIHRvIHRoZSB0b3AuXG4gICAqL1xuICBhbmNob3JTY3JvbGxpbmc/OiAnZGlzYWJsZWQnfCdlbmFibGVkJztcblxuICAvKipcbiAgICogQ29uZmlndXJlcyB0aGUgc2Nyb2xsIG9mZnNldCB0aGUgcm91dGVyIHdpbGwgdXNlIHdoZW4gc2Nyb2xsaW5nIHRvIGFuIGVsZW1lbnQuXG4gICAqXG4gICAqIFdoZW4gZ2l2ZW4gYSB0dXBsZSB3aXRoIHR3byBudW1iZXJzLCB0aGUgcm91dGVyIHdpbGwgYWx3YXlzIHVzZSB0aGUgbnVtYmVycy5cbiAgICogV2hlbiBnaXZlbiBhIGZ1bmN0aW9uLCB0aGUgcm91dGVyIHdpbGwgaW52b2tlIHRoZSBmdW5jdGlvbiBldmVyeSB0aW1lIGl0IHJlc3RvcmVzIHNjcm9sbFxuICAgKiBwb3NpdGlvbi5cbiAgICovXG4gIHNjcm9sbE9mZnNldD86IFtudW1iZXIsIG51bWJlcl18KCgpID0+IFtudW1iZXIsIG51bWJlcl0pO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGhvdyB0aGUgcm91dGVyIG1lcmdlcyBwYXJhbXMsIGRhdGEgYW5kIHJlc29sdmVkIGRhdGEgZnJvbSBwYXJlbnQgdG8gY2hpbGRcbiAgICogcm91dGVzLiBBdmFpbGFibGUgb3B0aW9ucyBhcmU6XG4gICAqXG4gICAqIC0gYCdlbXB0eU9ubHknYCwgdGhlIGRlZmF1bHQsIG9ubHkgaW5oZXJpdHMgcGFyZW50IHBhcmFtcyBmb3IgcGF0aC1sZXNzIG9yIGNvbXBvbmVudC1sZXNzXG4gICAqICAgcm91dGVzLlxuICAgKiAtIGAnYWx3YXlzJ2AsIGVuYWJsZXMgdW5jb25kaXRpb25hbCBpbmhlcml0YW5jZSBvZiBwYXJlbnQgcGFyYW1zLlxuICAgKi9cbiAgcGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneT86ICdlbXB0eU9ubHknfCdhbHdheXMnO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBtYWxmb3JtZWQgdXJpIGVycm9yIGhhbmRsZXIgZnVuY3Rpb24uIFRoaXMgaGFuZGxlciBpcyBpbnZva2VkIHdoZW4gZW5jb2RlZFVSSSBjb250YWluc1xuICAgKiBpbnZhbGlkIGNoYXJhY3RlciBzZXF1ZW5jZXMuIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGlzIHRvIHJlZGlyZWN0IHRvIHRoZSByb290IHVybCBkcm9wcGluZ1xuICAgKiBhbnkgcGF0aCBvciBwYXJhbSBpbmZvLiBUaGlzIGZ1bmN0aW9uIHBhc3NlcyB0aHJlZSBwYXJhbWV0ZXJzOlxuICAgKlxuICAgKiAtIGAnVVJJRXJyb3InYCAtIEVycm9yIHRocm93biB3aGVuIHBhcnNpbmcgYSBiYWQgVVJMXG4gICAqIC0gYCdVcmxTZXJpYWxpemVyJ2AgLSBVcmxTZXJpYWxpemVyIHRoYXTigJlzIGNvbmZpZ3VyZWQgd2l0aCB0aGUgcm91dGVyLlxuICAgKiAtIGAndXJsJ2AgLSAgVGhlIG1hbGZvcm1lZCBVUkwgdGhhdCBjYXVzZWQgdGhlIFVSSUVycm9yXG4gICAqICovXG4gIG1hbGZvcm1lZFVyaUVycm9ySGFuZGxlcj86XG4gICAgICAoZXJyb3I6IFVSSUVycm9yLCB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLCB1cmw6IHN0cmluZykgPT4gVXJsVHJlZTtcblxuICAvKipcbiAgICogRGVmaW5lcyB3aGVuIHRoZSByb3V0ZXIgdXBkYXRlcyB0aGUgYnJvd3NlciBVUkwuIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIHRvIHVwZGF0ZSBhZnRlclxuICAgKiBzdWNjZXNzZnVsIG5hdmlnYXRpb24uIEhvd2V2ZXIsIHNvbWUgYXBwbGljYXRpb25zIG1heSBwcmVmZXIgYSBtb2RlIHdoZXJlIHRoZSBVUkwgZ2V0c1xuICAgKiB1cGRhdGVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgbmF2aWdhdGlvbi4gVGhlIG1vc3QgY29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHVwZGF0aW5nIHRoZVxuICAgKiBVUkwgZWFybHkgc28gaWYgbmF2aWdhdGlvbiBmYWlscywgeW91IGNhbiBzaG93IGFuIGVycm9yIG1lc3NhZ2Ugd2l0aCB0aGUgVVJMIHRoYXQgZmFpbGVkLlxuICAgKiBBdmFpbGFibGUgb3B0aW9ucyBhcmU6XG4gICAqXG4gICAqIC0gYCdkZWZlcnJlZCdgLCB0aGUgZGVmYXVsdCwgdXBkYXRlcyB0aGUgYnJvd3NlciBVUkwgYWZ0ZXIgbmF2aWdhdGlvbiBoYXMgZmluaXNoZWQuXG4gICAqIC0gYCdlYWdlcidgLCB1cGRhdGVzIGJyb3dzZXIgVVJMIGF0IHRoZSBiZWdpbm5pbmcgb2YgbmF2aWdhdGlvbi5cbiAgICovXG4gIHVybFVwZGF0ZVN0cmF0ZWd5PzogJ2RlZmVycmVkJ3wnZWFnZXInO1xuXG4gIC8qKlxuICAgKiBFbmFibGVzIGEgYnVnIGZpeCB0aGF0IGNvcnJlY3RzIHJlbGF0aXZlIGxpbmsgcmVzb2x1dGlvbiBpbiBjb21wb25lbnRzIHdpdGggZW1wdHkgcGF0aHMuXG4gICAqIEV4YW1wbGU6XG4gICAqXG4gICAqIGBgYFxuICAgKiBjb25zdCByb3V0ZXMgPSBbXG4gICAqICAge1xuICAgKiAgICAgcGF0aDogJycsXG4gICAqICAgICBjb21wb25lbnQ6IENvbnRhaW5lckNvbXBvbmVudCxcbiAgICogICAgIGNoaWxkcmVuOiBbXG4gICAqICAgICAgIHsgcGF0aDogJ2EnLCBjb21wb25lbnQ6IEFDb21wb25lbnQgfSxcbiAgICogICAgICAgeyBwYXRoOiAnYicsIGNvbXBvbmVudDogQkNvbXBvbmVudCB9LFxuICAgKiAgICAgXVxuICAgKiAgIH1cbiAgICogXTtcbiAgICogYGBgXG4gICAqXG4gICAqIEZyb20gdGhlIGBDb250YWluZXJDb21wb25lbnRgLCB0aGlzIHdpbGwgbm90IHdvcms6XG4gICAqXG4gICAqIGA8YSBbcm91dGVyTGlua109XCJbJy4vYSddXCI+TGluayB0byBBPC9hPmBcbiAgICpcbiAgICogSG93ZXZlciwgdGhpcyB3aWxsIHdvcms6XG4gICAqXG4gICAqIGA8YSBbcm91dGVyTGlua109XCJbJy4uL2EnXVwiPkxpbmsgdG8gQTwvYT5gXG4gICAqXG4gICAqIEluIG90aGVyIHdvcmRzLCB5b3UncmUgcmVxdWlyZWQgdG8gdXNlIGAuLi9gIHJhdGhlciB0aGFuIGAuL2AuIFRoZSBjdXJyZW50IGRlZmF1bHQgaW4gdjZcbiAgICogaXMgYGxlZ2FjeWAsIGFuZCB0aGlzIG9wdGlvbiB3aWxsIGJlIHJlbW92ZWQgaW4gdjcgdG8gZGVmYXVsdCB0byB0aGUgY29ycmVjdGVkIGJlaGF2aW9yLlxuICAgKi9cbiAgcmVsYXRpdmVMaW5rUmVzb2x1dGlvbj86ICdsZWdhY3knfCdjb3JyZWN0ZWQnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBSb3V0ZXIoXG4gICAgcmVmOiBBcHBsaWNhdGlvblJlZiwgdXJsU2VyaWFsaXplcjogVXJsU2VyaWFsaXplciwgY29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHMsXG4gICAgbG9jYXRpb246IExvY2F0aW9uLCBpbmplY3RvcjogSW5qZWN0b3IsIGxvYWRlcjogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBjb21waWxlcjogQ29tcGlsZXIsXG4gICAgY29uZmlnOiBSb3V0ZVtdW10sIG9wdHM6IEV4dHJhT3B0aW9ucyA9IHt9LCB1cmxIYW5kbGluZ1N0cmF0ZWd5PzogVXJsSGFuZGxpbmdTdHJhdGVneSxcbiAgICByb3V0ZVJldXNlU3RyYXRlZ3k/OiBSb3V0ZVJldXNlU3RyYXRlZ3kpIHtcbiAgY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcihcbiAgICAgIG51bGwsIHVybFNlcmlhbGl6ZXIsIGNvbnRleHRzLCBsb2NhdGlvbiwgaW5qZWN0b3IsIGxvYWRlciwgY29tcGlsZXIsIGZsYXR0ZW4oY29uZmlnKSk7XG5cbiAgaWYgKHVybEhhbmRsaW5nU3RyYXRlZ3kpIHtcbiAgICByb3V0ZXIudXJsSGFuZGxpbmdTdHJhdGVneSA9IHVybEhhbmRsaW5nU3RyYXRlZ3k7XG4gIH1cblxuICBpZiAocm91dGVSZXVzZVN0cmF0ZWd5KSB7XG4gICAgcm91dGVyLnJvdXRlUmV1c2VTdHJhdGVneSA9IHJvdXRlUmV1c2VTdHJhdGVneTtcbiAgfVxuXG4gIGlmIChvcHRzLmVycm9ySGFuZGxlcikge1xuICAgIHJvdXRlci5lcnJvckhhbmRsZXIgPSBvcHRzLmVycm9ySGFuZGxlcjtcbiAgfVxuXG4gIGlmIChvcHRzLm1hbGZvcm1lZFVyaUVycm9ySGFuZGxlcikge1xuICAgIHJvdXRlci5tYWxmb3JtZWRVcmlFcnJvckhhbmRsZXIgPSBvcHRzLm1hbGZvcm1lZFVyaUVycm9ySGFuZGxlcjtcbiAgfVxuXG4gIGlmIChvcHRzLmVuYWJsZVRyYWNpbmcpIHtcbiAgICBjb25zdCBkb20gPSBnZXRET00oKTtcbiAgICByb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoZTogUm91dGVyRXZlbnQpID0+IHtcbiAgICAgIGRvbS5sb2dHcm91cChgUm91dGVyIEV2ZW50OiAkeyg8YW55PmUuY29uc3RydWN0b3IpLm5hbWV9YCk7XG4gICAgICBkb20ubG9nKGUudG9TdHJpbmcoKSk7XG4gICAgICBkb20ubG9nKGUpO1xuICAgICAgZG9tLmxvZ0dyb3VwRW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAob3B0cy5vblNhbWVVcmxOYXZpZ2F0aW9uKSB7XG4gICAgcm91dGVyLm9uU2FtZVVybE5hdmlnYXRpb24gPSBvcHRzLm9uU2FtZVVybE5hdmlnYXRpb247XG4gIH1cblxuICBpZiAob3B0cy5wYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5KSB7XG4gICAgcm91dGVyLnBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3kgPSBvcHRzLnBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3k7XG4gIH1cblxuICBpZiAob3B0cy51cmxVcGRhdGVTdHJhdGVneSkge1xuICAgIHJvdXRlci51cmxVcGRhdGVTdHJhdGVneSA9IG9wdHMudXJsVXBkYXRlU3RyYXRlZ3k7XG4gIH1cblxuICBpZiAob3B0cy5yZWxhdGl2ZUxpbmtSZXNvbHV0aW9uKSB7XG4gICAgcm91dGVyLnJlbGF0aXZlTGlua1Jlc29sdXRpb24gPSBvcHRzLnJlbGF0aXZlTGlua1Jlc29sdXRpb247XG4gIH1cblxuICByZXR1cm4gcm91dGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm9vdFJvdXRlKHJvdXRlcjogUm91dGVyKTogQWN0aXZhdGVkUm91dGUge1xuICByZXR1cm4gcm91dGVyLnJvdXRlclN0YXRlLnJvb3Q7XG59XG5cbi8qKlxuICogVG8gaW5pdGlhbGl6ZSB0aGUgcm91dGVyIHByb3Blcmx5IHdlIG5lZWQgdG8gZG8gaW4gdHdvIHN0ZXBzOlxuICpcbiAqIFdlIG5lZWQgdG8gc3RhcnQgdGhlIG5hdmlnYXRpb24gaW4gYSBBUFBfSU5JVElBTElaRVIgdG8gYmxvY2sgdGhlIGJvb3RzdHJhcCBpZlxuICogYSByZXNvbHZlciBvciBhIGd1YXJkcyBleGVjdXRlcyBhc3luY2hyb25vdXNseS4gU2Vjb25kLCB3ZSBuZWVkIHRvIGFjdHVhbGx5IHJ1blxuICogYWN0aXZhdGlvbiBpbiBhIEJPT1RTVFJBUF9MSVNURU5FUi4gV2UgdXRpbGl6ZSB0aGUgYWZ0ZXJQcmVhY3RpdmF0aW9uXG4gKiBob29rIHByb3ZpZGVkIGJ5IHRoZSByb3V0ZXIgdG8gZG8gdGhhdC5cbiAqXG4gKiBUaGUgcm91dGVyIG5hdmlnYXRpb24gc3RhcnRzLCByZWFjaGVzIHRoZSBwb2ludCB3aGVuIHByZWFjdGl2YXRpb24gaXMgZG9uZSwgYW5kIHRoZW5cbiAqIHBhdXNlcy4gSXQgd2FpdHMgZm9yIHRoZSBob29rIHRvIGJlIHJlc29sdmVkLiBXZSB0aGVuIHJlc29sdmUgaXQgb25seSBpbiBhIGJvb3RzdHJhcCBsaXN0ZW5lci5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJvdXRlckluaXRpYWxpemVyIHtcbiAgcHJpdmF0ZSBpbml0TmF2aWdhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHJlc3VsdE9mUHJlYWN0aXZhdGlvbkRvbmUgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuXG4gIGFwcEluaXRpYWxpemVyKCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgcDogUHJvbWlzZTxhbnk+ID0gdGhpcy5pbmplY3Rvci5nZXQoTE9DQVRJT05fSU5JVElBTElaRUQsIFByb21pc2UucmVzb2x2ZShudWxsKSk7XG4gICAgcmV0dXJuIHAudGhlbigoKSA9PiB7XG4gICAgICBsZXQgcmVzb2x2ZTogRnVuY3Rpb24gPSBudWxsICE7XG4gICAgICBjb25zdCByZXMgPSBuZXcgUHJvbWlzZShyID0+IHJlc29sdmUgPSByKTtcbiAgICAgIGNvbnN0IHJvdXRlciA9IHRoaXMuaW5qZWN0b3IuZ2V0KFJvdXRlcik7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5pbmplY3Rvci5nZXQoUk9VVEVSX0NPTkZJR1VSQVRJT04pO1xuXG4gICAgICBpZiAodGhpcy5pc0xlZ2FjeURpc2FibGVkKG9wdHMpIHx8IHRoaXMuaXNMZWdhY3lFbmFibGVkKG9wdHMpKSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG5cbiAgICAgIH0gZWxzZSBpZiAob3B0cy5pbml0aWFsTmF2aWdhdGlvbiA9PT0gJ2Rpc2FibGVkJykge1xuICAgICAgICByb3V0ZXIuc2V0VXBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKCk7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG5cbiAgICAgIH0gZWxzZSBpZiAob3B0cy5pbml0aWFsTmF2aWdhdGlvbiA9PT0gJ2VuYWJsZWQnKSB7XG4gICAgICAgIHJvdXRlci5ob29rcy5hZnRlclByZWFjdGl2YXRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgLy8gb25seSB0aGUgaW5pdGlhbCBuYXZpZ2F0aW9uIHNob3VsZCBiZSBkZWxheWVkXG4gICAgICAgICAgaWYgKCF0aGlzLmluaXROYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmluaXROYXZpZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHRPZlByZWFjdGl2YXRpb25Eb25lO1xuXG4gICAgICAgICAgICAvLyBzdWJzZXF1ZW50IG5hdmlnYXRpb25zIHNob3VsZCBub3QgYmUgZGVsYXllZFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YgKG51bGwpIGFzIGFueTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJvdXRlci5pbml0aWFsTmF2aWdhdGlvbigpO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5pdGlhbE5hdmlnYXRpb24gb3B0aW9uczogJyR7b3B0cy5pbml0aWFsTmF2aWdhdGlvbn0nYCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXM7XG4gICAgfSk7XG4gIH1cblxuICBib290c3RyYXBMaXN0ZW5lcihib290c3RyYXBwZWRDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+KTogdm9pZCB7XG4gICAgY29uc3Qgb3B0cyA9IHRoaXMuaW5qZWN0b3IuZ2V0KFJPVVRFUl9DT05GSUdVUkFUSU9OKTtcbiAgICBjb25zdCBwcmVsb2FkZXIgPSB0aGlzLmluamVjdG9yLmdldChSb3V0ZXJQcmVsb2FkZXIpO1xuICAgIGNvbnN0IHJvdXRlclNjcm9sbGVyID0gdGhpcy5pbmplY3Rvci5nZXQoUm91dGVyU2Nyb2xsZXIpO1xuICAgIGNvbnN0IHJvdXRlciA9IHRoaXMuaW5qZWN0b3IuZ2V0KFJvdXRlcik7XG4gICAgY29uc3QgcmVmID0gdGhpcy5pbmplY3Rvci5nZXQ8QXBwbGljYXRpb25SZWY+KEFwcGxpY2F0aW9uUmVmKTtcblxuICAgIGlmIChib290c3RyYXBwZWRDb21wb25lbnRSZWYgIT09IHJlZi5jb21wb25lbnRzWzBdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNMZWdhY3lFbmFibGVkKG9wdHMpKSB7XG4gICAgICByb3V0ZXIuaW5pdGlhbE5hdmlnYXRpb24oKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNMZWdhY3lEaXNhYmxlZChvcHRzKSkge1xuICAgICAgcm91dGVyLnNldFVwTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHByZWxvYWRlci5zZXRVcFByZWxvYWRpbmcoKTtcbiAgICByb3V0ZXJTY3JvbGxlci5pbml0KCk7XG4gICAgcm91dGVyLnJlc2V0Um9vdENvbXBvbmVudFR5cGUocmVmLmNvbXBvbmVudFR5cGVzWzBdKTtcbiAgICB0aGlzLnJlc3VsdE9mUHJlYWN0aXZhdGlvbkRvbmUubmV4dChudWxsICEpO1xuICAgIHRoaXMucmVzdWx0T2ZQcmVhY3RpdmF0aW9uRG9uZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0xlZ2FjeUVuYWJsZWQob3B0czogRXh0cmFPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG9wdHMuaW5pdGlhbE5hdmlnYXRpb24gPT09ICdsZWdhY3lfZW5hYmxlZCcgfHwgb3B0cy5pbml0aWFsTmF2aWdhdGlvbiA9PT0gdHJ1ZSB8fFxuICAgICAgICBvcHRzLmluaXRpYWxOYXZpZ2F0aW9uID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGlzTGVnYWN5RGlzYWJsZWQob3B0czogRXh0cmFPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG9wdHMuaW5pdGlhbE5hdmlnYXRpb24gPT09ICdsZWdhY3lfZGlzYWJsZWQnIHx8IG9wdHMuaW5pdGlhbE5hdmlnYXRpb24gPT09IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcHBJbml0aWFsaXplcihyOiBSb3V0ZXJJbml0aWFsaXplcikge1xuICByZXR1cm4gci5hcHBJbml0aWFsaXplci5iaW5kKHIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm9vdHN0cmFwTGlzdGVuZXIocjogUm91dGVySW5pdGlhbGl6ZXIpIHtcbiAgcmV0dXJuIHIuYm9vdHN0cmFwTGlzdGVuZXIuYmluZChyKTtcbn1cblxuLyoqXG4gKiBBIHRva2VuIGZvciB0aGUgcm91dGVyIGluaXRpYWxpemVyIHRoYXQgd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGFwcCBpcyBib290c3RyYXBwZWQuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY29uc3QgUk9VVEVSX0lOSVRJQUxJWkVSID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48KGNvbXBSZWY6IENvbXBvbmVudFJlZjxhbnk+KSA9PiB2b2lkPignUm91dGVyIEluaXRpYWxpemVyJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUm91dGVySW5pdGlhbGl6ZXIoKSB7XG4gIHJldHVybiBbXG4gICAgUm91dGVySW5pdGlhbGl6ZXIsXG4gICAge1xuICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICB1c2VGYWN0b3J5OiBnZXRBcHBJbml0aWFsaXplcixcbiAgICAgIGRlcHM6IFtSb3V0ZXJJbml0aWFsaXplcl1cbiAgICB9LFxuICAgIHtwcm92aWRlOiBST1VURVJfSU5JVElBTElaRVIsIHVzZUZhY3Rvcnk6IGdldEJvb3RzdHJhcExpc3RlbmVyLCBkZXBzOiBbUm91dGVySW5pdGlhbGl6ZXJdfSxcbiAgICB7cHJvdmlkZTogQVBQX0JPT1RTVFJBUF9MSVNURU5FUiwgbXVsdGk6IHRydWUsIHVzZUV4aXN0aW5nOiBST1VURVJfSU5JVElBTElaRVJ9LFxuICBdO1xufVxuIl19