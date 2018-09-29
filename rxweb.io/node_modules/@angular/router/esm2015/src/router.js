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
import { NgModuleRef, isDevMode } from '@angular/core';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { applyRedirects } from './apply_redirects';
import { standardizeConfig, validateConfig } from './config';
import { createRouterState } from './create_router_state';
import { createUrlTree } from './create_url_tree';
import { ActivationEnd, ChildActivationEnd, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, RoutesRecognized } from './events';
import { PreActivation } from './pre_activation';
import { recognize } from './recognize';
import { DefaultRouteReuseStrategy } from './route_reuse_strategy';
import { RouterConfigLoader } from './router_config_loader';
import { advanceActivatedRoute, createEmptyState } from './router_state';
import { isNavigationCancelingError } from './shared';
import { DefaultUrlHandlingStrategy } from './url_handling_strategy';
import { UrlTree, containsTree, createEmptyUrlTree } from './url_tree';
import { forEach } from './utils/collection';
import { nodeChildrenAsMap } from './utils/tree';
/**
 * \@description
 *
 * Represents the extra options used during navigation.
 *
 *
 * @record
 */
export function NavigationExtras() { }
/**
 * Enables relative navigation from the current ActivatedRoute.
 *
 * Configuration:
 *
 * ```
 * [{
 *   path: 'parent',
 *   component: ParentComponent,
 *   children: [{
 *     path: 'list',
 *     component: ListComponent
 *   },{
 *     path: 'child',
 *     component: ChildComponent
 *   }]
 * }]
 * ```
 *
 * Navigate to list route from child route:
 *
 * ```
 * \@Component({...})
 *  class ChildComponent {
 *    constructor(private router: Router, private route: ActivatedRoute) {}
 *
 *    go() {
 *      this.router.navigate(['../list'], { relativeTo: this.route });
 *    }
 *  }
 * ```
 * @type {?|undefined}
 */
NavigationExtras.prototype.relativeTo;
/**
 * Sets query parameters to the URL.
 *
 * ```
 * // Navigate to /results?page=1
 * this.router.navigate(['/results'], { queryParams: { page: 1 } });
 * ```
 * @type {?|undefined}
 */
NavigationExtras.prototype.queryParams;
/**
 * Sets the hash fragment for the URL.
 *
 * ```
 * // Navigate to /results#top
 * this.router.navigate(['/results'], { fragment: 'top' });
 * ```
 * @type {?|undefined}
 */
NavigationExtras.prototype.fragment;
/**
 * Preserves the query parameters for the next navigation.
 *
 * deprecated, use `queryParamsHandling` instead
 *
 * ```
 * // Preserve query params from /results?page=1 to /view?page=1
 * this.router.navigate(['/view'], { preserveQueryParams: true });
 * ```
 *
 * @deprecated since v4
 * @type {?|undefined}
 */
NavigationExtras.prototype.preserveQueryParams;
/**
 *  config strategy to handle the query parameters for the next navigation.
 *
 * ```
 * // from /results?page=1 to /view?page=1&page=2
 * this.router.navigate(['/view'], { queryParams: { page: 2 },  queryParamsHandling: "merge" });
 * ```
 * @type {?|undefined}
 */
NavigationExtras.prototype.queryParamsHandling;
/**
 * Preserves the fragment for the next navigation
 *
 * ```
 * // Preserve fragment from /results#top to /view#top
 * this.router.navigate(['/view'], { preserveFragment: true });
 * ```
 * @type {?|undefined}
 */
NavigationExtras.prototype.preserveFragment;
/**
 * Navigates without pushing a new state into history.
 *
 * ```
 * // Navigate silently to /view
 * this.router.navigate(['/view'], { skipLocationChange: true });
 * ```
 * @type {?|undefined}
 */
NavigationExtras.prototype.skipLocationChange;
/**
 * Navigates while replacing the current state in history.
 *
 * ```
 * // Navigate to /view
 * this.router.navigate(['/view'], { replaceUrl: true });
 * ```
 * @type {?|undefined}
 */
NavigationExtras.prototype.replaceUrl;
/** @typedef {?} */
var ErrorHandler;
export { ErrorHandler };
/**
 * @param {?} error
 * @return {?}
 */
function defaultErrorHandler(error) {
    throw error;
}
/**
 * @param {?} error
 * @param {?} urlSerializer
 * @param {?} url
 * @return {?}
 */
function defaultMalformedUriErrorHandler(error, urlSerializer, url) {
    return urlSerializer.parse('/');
}
/** @typedef {?} */
var NavStreamValue;
/** @typedef {?} */
var NavigationParams;
/** @typedef {?} */
var RouterHook;
export { RouterHook };
/**
 * \@internal
 * @param {?} snapshot
 * @param {?} runExtras
 * @return {?}
 */
function defaultRouterHook(snapshot, runExtras) {
    return /** @type {?} */ (of(null));
}
/**
 * \@description
 *
 * Provides the navigation and url manipulation capabilities.
 *
 * See `Routes` for more details and examples.
 *
 * \@ngModule RouterModule
 *
 *
 */
export class Router {
    /**
     * Creates the router service.
     * @param {?} rootComponentType
     * @param {?} urlSerializer
     * @param {?} rootContexts
     * @param {?} location
     * @param {?} injector
     * @param {?} loader
     * @param {?} compiler
     * @param {?} config
     */
    constructor(rootComponentType, urlSerializer, rootContexts, location, injector, loader, compiler, config) {
        this.rootComponentType = rootComponentType;
        this.urlSerializer = urlSerializer;
        this.rootContexts = rootContexts;
        this.location = location;
        this.config = config;
        this.navigations = new BehaviorSubject(/** @type {?} */ ((null)));
        this.navigationId = 0;
        this.events = new Subject();
        /**
         * Error handler that is invoked when a navigation errors.
         *
         * See `ErrorHandler` for more information.
         */
        this.errorHandler = defaultErrorHandler;
        /**
         * Malformed uri error handler is invoked when `Router.parseUrl(url)` throws an
         * error due to containing an invalid character. The most common case would be a `%` sign
         * that's not encoded and is not part of a percent encoded sequence.
         */
        this.malformedUriErrorHandler = defaultMalformedUriErrorHandler;
        /**
         * Indicates if at least one navigation happened.
         */
        this.navigated = false;
        this.lastSuccessfulId = -1;
        /**
         * Used by RouterModule. This allows us to
         * pause the navigation either before preactivation or after it.
         * \@internal
         */
        this.hooks = {
            beforePreactivation: defaultRouterHook,
            afterPreactivation: defaultRouterHook
        };
        /**
         * Extracts and merges URLs. Used for AngularJS to Angular migrations.
         */
        this.urlHandlingStrategy = new DefaultUrlHandlingStrategy();
        this.routeReuseStrategy = new DefaultRouteReuseStrategy();
        /**
         * Define what the router should do if it receives a navigation request to the current URL.
         * By default, the router will ignore this navigation. However, this prevents features such
         * as a "refresh" button. Use this option to configure the behavior when navigating to the
         * current URL. Default is 'ignore'.
         */
        this.onSameUrlNavigation = 'ignore';
        /**
         * Defines how the router merges params, data and resolved data from parent to child
         * routes. Available options are:
         *
         * - `'emptyOnly'`, the default, only inherits parent params for path-less or component-less
         *   routes.
         * - `'always'`, enables unconditional inheritance of parent params.
         */
        this.paramsInheritanceStrategy = 'emptyOnly';
        /**
         * Defines when the router updates the browser URL. The default behavior is to update after
         * successful navigation. However, some applications may prefer a mode where the URL gets
         * updated at the beginning of navigation. The most common use case would be updating the
         * URL early so if navigation fails, you can show an error message with the URL that failed.
         * Available options are:
         *
         * - `'deferred'`, the default, updates the browser URL after navigation has finished.
         * - `'eager'`, updates browser URL at the beginning of navigation.
         */
        this.urlUpdateStrategy = 'deferred';
        /**
         * See {\@link RouterModule} for more information.
         */
        this.relativeLinkResolution = 'legacy';
        /** @type {?} */
        const onLoadStart = (r) => this.triggerEvent(new RouteConfigLoadStart(r));
        /** @type {?} */
        const onLoadEnd = (r) => this.triggerEvent(new RouteConfigLoadEnd(r));
        this.ngModule = injector.get(NgModuleRef);
        this.resetConfig(config);
        this.currentUrlTree = createEmptyUrlTree();
        this.rawUrlTree = this.currentUrlTree;
        this.configLoader = new RouterConfigLoader(loader, compiler, onLoadStart, onLoadEnd);
        this.routerState = createEmptyState(this.currentUrlTree, this.rootComponentType);
        this.processNavigations();
    }
    /**
     * \@internal
     * TODO: this should be removed once the constructor of the router made internal
     * @param {?} rootComponentType
     * @return {?}
     */
    resetRootComponentType(rootComponentType) {
        this.rootComponentType = rootComponentType;
        // TODO: vsavkin router 4.0 should make the root component set to null
        // this will simplify the lifecycle of the router.
        this.routerState.root.component = this.rootComponentType;
    }
    /**
     * Sets up the location change listener and performs the initial navigation.
     * @return {?}
     */
    initialNavigation() {
        this.setUpLocationChangeListener();
        if (this.navigationId === 0) {
            this.navigateByUrl(this.location.path(true), { replaceUrl: true });
        }
    }
    /**
     * Sets up the location change listener.
     * @return {?}
     */
    setUpLocationChangeListener() {
        // Don't need to use Zone.wrap any more, because zone.js
        // already patch onPopState, so location change callback will
        // run into ngZone
        if (!this.locationSubscription) {
            this.locationSubscription = /** @type {?} */ (this.location.subscribe((change) => {
                /** @type {?} */
                let rawUrlTree = this.parseUrl(change['url']);
                /** @type {?} */
                const source = change['type'] === 'popstate' ? 'popstate' : 'hashchange';
                /** @type {?} */
                const state = change.state && change.state.navigationId ?
                    { navigationId: change.state.navigationId } :
                    null;
                setTimeout(() => { this.scheduleNavigation(rawUrlTree, source, state, { replaceUrl: true }); }, 0);
            }));
        }
    }
    /**
     * The current url
     * @return {?}
     */
    get url() { return this.serializeUrl(this.currentUrlTree); }
    /**
     * \@internal
     * @param {?} e
     * @return {?}
     */
    triggerEvent(e) { (/** @type {?} */ (this.events)).next(e); }
    /**
     * Resets the configuration used for navigation and generating links.
     *
     * ### Usage
     *
     * ```
     * router.resetConfig([
     *  { path: 'team/:id', component: TeamCmp, children: [
     *    { path: 'simple', component: SimpleCmp },
     *    { path: 'user/:name', component: UserCmp }
     *  ]}
     * ]);
     * ```
     * @param {?} config
     * @return {?}
     */
    resetConfig(config) {
        validateConfig(config);
        this.config = config.map(standardizeConfig);
        this.navigated = false;
        this.lastSuccessfulId = -1;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    ngOnDestroy() { this.dispose(); }
    /**
     * Disposes of the router
     * @return {?}
     */
    dispose() {
        if (this.locationSubscription) {
            this.locationSubscription.unsubscribe();
            this.locationSubscription = /** @type {?} */ ((null));
        }
    }
    /**
     * Applies an array of commands to the current url tree and creates a new url tree.
     *
     * When given an activate route, applies the given commands starting from the route.
     * When not given a route, applies the given command starting from the root.
     *
     * ### Usage
     *
     * ```
     * // create /team/33/user/11
     * router.createUrlTree(['/team', 33, 'user', 11]);
     *
     * // create /team/33;expand=true/user/11
     * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
     *
     * // you can collapse static segments like this (this works only with the first passed-in value):
     * router.createUrlTree(['/team/33/user', userId]);
     *
     * // If the first segment can contain slashes, and you do not want the router to split it, you
     * // can do the following:
     *
     * router.createUrlTree([{segmentPath: '/one/two'}]);
     *
     * // create /team/33/(user/11//right:chat)
     * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);
     *
     * // remove the right secondary node
     * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
     *
     * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
     *
     * // navigate to /team/33/user/11/details
     * router.createUrlTree(['details'], {relativeTo: route});
     *
     * // navigate to /team/33/user/22
     * router.createUrlTree(['../22'], {relativeTo: route});
     *
     * // navigate to /team/44/user/22
     * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
     * ```
     * @param {?} commands
     * @param {?=} navigationExtras
     * @return {?}
     */
    createUrlTree(commands, navigationExtras = {}) {
        const { relativeTo, queryParams, fragment, preserveQueryParams, queryParamsHandling, preserveFragment } = navigationExtras;
        if (isDevMode() && preserveQueryParams && /** @type {?} */ (console) && /** @type {?} */ (console.warn)) {
            console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
        }
        /** @type {?} */
        const a = relativeTo || this.routerState.root;
        /** @type {?} */
        const f = preserveFragment ? this.currentUrlTree.fragment : fragment;
        /** @type {?} */
        let q = null;
        if (queryParamsHandling) {
            switch (queryParamsHandling) {
                case 'merge':
                    q = Object.assign({}, this.currentUrlTree.queryParams, queryParams);
                    break;
                case 'preserve':
                    q = this.currentUrlTree.queryParams;
                    break;
                default:
                    q = queryParams || null;
            }
        }
        else {
            q = preserveQueryParams ? this.currentUrlTree.queryParams : queryParams || null;
        }
        if (q !== null) {
            q = this.removeEmptyProps(q);
        }
        return createUrlTree(a, this.currentUrlTree, commands, /** @type {?} */ ((q)), /** @type {?} */ ((f)));
    }
    /**
     * Navigate based on the provided url. This navigation is always absolute.
     *
     * Returns a promise that:
     * - resolves to 'true' when navigation succeeds,
     * - resolves to 'false' when navigation fails,
     * - is rejected when an error happens.
     *
     * ### Usage
     *
     * ```
     * router.navigateByUrl("/team/33/user/11");
     *
     * // Navigate without updating the URL
     * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
     * ```
     *
     * In opposite to `navigate`, `navigateByUrl` takes a whole URL
     * and does not apply any delta to the current one.
     * @param {?} url
     * @param {?=} extras
     * @return {?}
     */
    navigateByUrl(url, extras = { skipLocationChange: false }) {
        /** @type {?} */
        const urlTree = url instanceof UrlTree ? url : this.parseUrl(url);
        /** @type {?} */
        const mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);
        return this.scheduleNavigation(mergedTree, 'imperative', null, extras);
    }
    /**
     * Navigate based on the provided array of commands and a starting point.
     * If no starting route is provided, the navigation is absolute.
     *
     * Returns a promise that:
     * - resolves to 'true' when navigation succeeds,
     * - resolves to 'false' when navigation fails,
     * - is rejected when an error happens.
     *
     * ### Usage
     *
     * ```
     * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
     *
     * // Navigate without updating the URL
     * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
     * ```
     *
     * In opposite to `navigateByUrl`, `navigate` always takes a delta that is applied to the current
     * URL.
     * @param {?} commands
     * @param {?=} extras
     * @return {?}
     */
    navigate(commands, extras = { skipLocationChange: false }) {
        validateCommands(commands);
        return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
    }
    /**
     * Serializes a `UrlTree` into a string
     * @param {?} url
     * @return {?}
     */
    serializeUrl(url) { return this.urlSerializer.serialize(url); }
    /**
     * Parses a string into a `UrlTree`
     * @param {?} url
     * @return {?}
     */
    parseUrl(url) {
        /** @type {?} */
        let urlTree;
        try {
            urlTree = this.urlSerializer.parse(url);
        }
        catch (e) {
            urlTree = this.malformedUriErrorHandler(e, this.urlSerializer, url);
        }
        return urlTree;
    }
    /**
     * Returns whether the url is activated
     * @param {?} url
     * @param {?} exact
     * @return {?}
     */
    isActive(url, exact) {
        if (url instanceof UrlTree) {
            return containsTree(this.currentUrlTree, url, exact);
        }
        /** @type {?} */
        const urlTree = this.parseUrl(url);
        return containsTree(this.currentUrlTree, urlTree, exact);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    removeEmptyProps(params) {
        return Object.keys(params).reduce((result, key) => {
            /** @type {?} */
            const value = params[key];
            if (value !== null && value !== undefined) {
                result[key] = value;
            }
            return result;
        }, {});
    }
    /**
     * @return {?}
     */
    processNavigations() {
        this.navigations
            .pipe(concatMap((nav) => {
            if (nav) {
                this.executeScheduledNavigation(nav);
                // a failed navigation should not stop the router from processing
                // further navigations => the catch
                return nav.promise.catch(() => { });
            }
            else {
                return /** @type {?} */ (of(null));
            }
        }))
            .subscribe(() => { });
    }
    /**
     * @param {?} rawUrl
     * @param {?} source
     * @param {?} state
     * @param {?} extras
     * @return {?}
     */
    scheduleNavigation(rawUrl, source, state, extras) {
        /** @type {?} */
        const lastNavigation = this.navigations.value;
        // If the user triggers a navigation imperatively (e.g., by using navigateByUrl),
        // and that navigation results in 'replaceState' that leads to the same URL,
        // we should skip those.
        if (lastNavigation && source !== 'imperative' && lastNavigation.source === 'imperative' &&
            lastNavigation.rawUrl.toString() === rawUrl.toString()) {
            return Promise.resolve(true); // return value is not used
        }
        // Because of a bug in IE and Edge, the location class fires two events (popstate and
        // hashchange) every single time. The second one should be ignored. Otherwise, the URL will
        // flicker. Handles the case when a popstate was emitted first.
        if (lastNavigation && source == 'hashchange' && lastNavigation.source === 'popstate' &&
            lastNavigation.rawUrl.toString() === rawUrl.toString()) {
            return Promise.resolve(true); // return value is not used
        }
        // Because of a bug in IE and Edge, the location class fires two events (popstate and
        // hashchange) every single time. The second one should be ignored. Otherwise, the URL will
        // flicker. Handles the case when a hashchange was emitted first.
        if (lastNavigation && source == 'popstate' && lastNavigation.source === 'hashchange' &&
            lastNavigation.rawUrl.toString() === rawUrl.toString()) {
            return Promise.resolve(true); // return value is not used
        }
        /** @type {?} */
        let resolve = null;
        /** @type {?} */
        let reject = null;
        /** @type {?} */
        const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        /** @type {?} */
        const id = ++this.navigationId;
        this.navigations.next({ id, source, state, rawUrl, extras, resolve, reject, promise });
        // Make sure that the error is propagated even though `processNavigations` catch
        // handler does not rethrow
        return promise.catch((e) => Promise.reject(e));
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    executeScheduledNavigation({ id, rawUrl, extras, resolve, reject, source, state }) {
        /** @type {?} */
        const url = this.urlHandlingStrategy.extract(rawUrl);
        /** @type {?} */
        const urlTransition = !this.navigated || url.toString() !== this.currentUrlTree.toString();
        if ((this.onSameUrlNavigation === 'reload' ? true : urlTransition) &&
            this.urlHandlingStrategy.shouldProcessUrl(rawUrl)) {
            if (this.urlUpdateStrategy === 'eager' && !extras.skipLocationChange) {
                this.setBrowserUrl(rawUrl, !!extras.replaceUrl, id);
            }
            (/** @type {?} */ (this.events))
                .next(new NavigationStart(id, this.serializeUrl(url), source, state));
            Promise.resolve()
                .then((_) => this.runNavigate(url, rawUrl, !!extras.skipLocationChange, !!extras.replaceUrl, id, null))
                .then(resolve, reject);
            // we cannot process the current URL, but we could process the previous one =>
            // we need to do some cleanup
        }
        else if (urlTransition && this.rawUrlTree &&
            this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
            (/** @type {?} */ (this.events))
                .next(new NavigationStart(id, this.serializeUrl(url), source, state));
            Promise.resolve()
                .then((_) => this.runNavigate(url, rawUrl, false, false, id, createEmptyState(url, this.rootComponentType).snapshot))
                .then(resolve, reject);
        }
        else {
            this.rawUrlTree = rawUrl;
            resolve(null);
        }
    }
    /**
     * @param {?} url
     * @param {?} rawUrl
     * @param {?} skipLocationChange
     * @param {?} replaceUrl
     * @param {?} id
     * @param {?} precreatedState
     * @return {?}
     */
    runNavigate(url, rawUrl, skipLocationChange, replaceUrl, id, precreatedState) {
        if (id !== this.navigationId) {
            (/** @type {?} */ (this.events))
                .next(new NavigationCancel(id, this.serializeUrl(url), `Navigation ID ${id} is not equal to the current navigation id ${this.navigationId}`));
            return Promise.resolve(false);
        }
        return new Promise((resolvePromise, rejectPromise) => {
            /** @type {?} */
            let urlAndSnapshot$;
            if (!precreatedState) {
                /** @type {?} */
                const moduleInjector = this.ngModule.injector;
                /** @type {?} */
                const redirectsApplied$ = applyRedirects(moduleInjector, this.configLoader, this.urlSerializer, url, this.config);
                urlAndSnapshot$ = redirectsApplied$.pipe(mergeMap((appliedUrl) => {
                    return recognize(this.rootComponentType, this.config, appliedUrl, this.serializeUrl(appliedUrl), this.paramsInheritanceStrategy, this.relativeLinkResolution)
                        .pipe(map((snapshot) => {
                        (/** @type {?} */ (this.events))
                            .next(new RoutesRecognized(id, this.serializeUrl(url), this.serializeUrl(appliedUrl), snapshot));
                        return { appliedUrl, snapshot };
                    }));
                }));
            }
            else {
                urlAndSnapshot$ = of({ appliedUrl: url, snapshot: precreatedState });
            }
            /** @type {?} */
            const beforePreactivationDone$ = urlAndSnapshot$.pipe(mergeMap((p) => {
                if (typeof p === 'boolean')
                    return of(p);
                return this.hooks
                    .beforePreactivation(p.snapshot, {
                    navigationId: id,
                    appliedUrlTree: url,
                    rawUrlTree: rawUrl, skipLocationChange, replaceUrl,
                })
                    .pipe(map(() => p));
            }));
            /** @type {?} */
            let preActivation;
            /** @type {?} */
            const preactivationSetup$ = beforePreactivationDone$.pipe(map((p) => {
                if (typeof p === 'boolean')
                    return p;
                const { appliedUrl, snapshot } = p;
                /** @type {?} */
                const moduleInjector = this.ngModule.injector;
                preActivation = new PreActivation(snapshot, this.routerState.snapshot, moduleInjector, (evt) => this.triggerEvent(evt));
                preActivation.initialize(this.rootContexts);
                return { appliedUrl, snapshot };
            }));
            /** @type {?} */
            const preactivationCheckGuards$ = preactivationSetup$.pipe(mergeMap((p) => {
                if (typeof p === 'boolean' || this.navigationId !== id)
                    return of(false);
                const { appliedUrl, snapshot } = p;
                this.triggerEvent(new GuardsCheckStart(id, this.serializeUrl(url), this.serializeUrl(appliedUrl), snapshot));
                return preActivation.checkGuards().pipe(map((shouldActivate) => {
                    this.triggerEvent(new GuardsCheckEnd(id, this.serializeUrl(url), this.serializeUrl(appliedUrl), snapshot, shouldActivate));
                    return { appliedUrl: appliedUrl, snapshot: snapshot, shouldActivate: shouldActivate };
                }));
            }));
            /** @type {?} */
            const preactivationResolveData$ = preactivationCheckGuards$.pipe(mergeMap((p) => {
                if (typeof p === 'boolean' || this.navigationId !== id)
                    return of(false);
                if (p.shouldActivate && preActivation.isActivating()) {
                    this.triggerEvent(new ResolveStart(id, this.serializeUrl(url), this.serializeUrl(p.appliedUrl), p.snapshot));
                    return preActivation.resolveData(this.paramsInheritanceStrategy).pipe(map(() => {
                        this.triggerEvent(new ResolveEnd(id, this.serializeUrl(url), this.serializeUrl(p.appliedUrl), p.snapshot));
                        return p;
                    }));
                }
                else {
                    return of(p);
                }
            }));
            /** @type {?} */
            const preactivationDone$ = preactivationResolveData$.pipe(mergeMap((p) => {
                if (typeof p === 'boolean' || this.navigationId !== id)
                    return of(false);
                return this.hooks
                    .afterPreactivation(p.snapshot, {
                    navigationId: id,
                    appliedUrlTree: url,
                    rawUrlTree: rawUrl, skipLocationChange, replaceUrl,
                })
                    .pipe(map(() => p));
            }));
            /** @type {?} */
            const routerState$ = preactivationDone$.pipe(map((p) => {
                if (typeof p === 'boolean' || this.navigationId !== id)
                    return false;
                const { appliedUrl, snapshot, shouldActivate } = p;
                if (shouldActivate) {
                    /** @type {?} */
                    const state = createRouterState(this.routeReuseStrategy, snapshot, this.routerState);
                    return { appliedUrl, state, shouldActivate };
                }
                else {
                    return { appliedUrl, state: null, shouldActivate };
                }
            }));
            this.activateRoutes(routerState$, this.routerState, this.currentUrlTree, id, url, rawUrl, skipLocationChange, replaceUrl, resolvePromise, rejectPromise);
        });
    }
    /**
     * Performs the logic of activating routes. This is a synchronous process by default. While this
     * is a private method, it could be overridden to make activation asynchronous.
     * @param {?} state
     * @param {?} storedState
     * @param {?} storedUrl
     * @param {?} id
     * @param {?} url
     * @param {?} rawUrl
     * @param {?} skipLocationChange
     * @param {?} replaceUrl
     * @param {?} resolvePromise
     * @param {?} rejectPromise
     * @return {?}
     */
    activateRoutes(state, storedState, storedUrl, id, url, rawUrl, skipLocationChange, replaceUrl, resolvePromise, rejectPromise) {
        /** @type {?} */
        let navigationIsSuccessful;
        state
            .forEach((p) => {
            if (typeof p === 'boolean' || !p.shouldActivate || id !== this.navigationId || !p.state) {
                navigationIsSuccessful = false;
                return;
            }
            const { appliedUrl, state } = p;
            this.currentUrlTree = appliedUrl;
            this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, rawUrl);
            (/** @type {?} */ (this)).routerState = state;
            if (this.urlUpdateStrategy === 'deferred' && !skipLocationChange) {
                this.setBrowserUrl(this.rawUrlTree, replaceUrl, id);
            }
            new ActivateRoutes(this.routeReuseStrategy, state, storedState, (evt) => this.triggerEvent(evt))
                .activate(this.rootContexts);
            navigationIsSuccessful = true;
        })
            .then(() => {
            if (navigationIsSuccessful) {
                this.navigated = true;
                this.lastSuccessfulId = id;
                (/** @type {?} */ (this.events))
                    .next(new NavigationEnd(id, this.serializeUrl(url), this.serializeUrl(this.currentUrlTree)));
                resolvePromise(true);
            }
            else {
                this.resetUrlToCurrentUrlTree();
                (/** @type {?} */ (this.events))
                    .next(new NavigationCancel(id, this.serializeUrl(url), ''));
                resolvePromise(false);
            }
        }, (e) => {
            if (isNavigationCancelingError(e)) {
                this.navigated = true;
                this.resetStateAndUrl(storedState, storedUrl, rawUrl);
                (/** @type {?} */ (this.events))
                    .next(new NavigationCancel(id, this.serializeUrl(url), e.message));
                resolvePromise(false);
            }
            else {
                this.resetStateAndUrl(storedState, storedUrl, rawUrl);
                (/** @type {?} */ (this.events))
                    .next(new NavigationError(id, this.serializeUrl(url), e));
                try {
                    resolvePromise(this.errorHandler(e));
                }
                catch (ee) {
                    rejectPromise(ee);
                }
            }
        });
    }
    /**
     * @param {?} url
     * @param {?} replaceUrl
     * @param {?} id
     * @return {?}
     */
    setBrowserUrl(url, replaceUrl, id) {
        /** @type {?} */
        const path = this.urlSerializer.serialize(url);
        if (this.location.isCurrentPathEqualTo(path) || replaceUrl) {
            this.location.replaceState(path, '', { navigationId: id });
        }
        else {
            this.location.go(path, '', { navigationId: id });
        }
    }
    /**
     * @param {?} storedState
     * @param {?} storedUrl
     * @param {?} rawUrl
     * @return {?}
     */
    resetStateAndUrl(storedState, storedUrl, rawUrl) {
        (/** @type {?} */ (this)).routerState = storedState;
        this.currentUrlTree = storedUrl;
        this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, rawUrl);
        this.resetUrlToCurrentUrlTree();
    }
    /**
     * @return {?}
     */
    resetUrlToCurrentUrlTree() {
        this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), '', { navigationId: this.lastSuccessfulId });
    }
}
if (false) {
    /** @type {?} */
    Router.prototype.currentUrlTree;
    /** @type {?} */
    Router.prototype.rawUrlTree;
    /** @type {?} */
    Router.prototype.navigations;
    /** @type {?} */
    Router.prototype.locationSubscription;
    /** @type {?} */
    Router.prototype.navigationId;
    /** @type {?} */
    Router.prototype.configLoader;
    /** @type {?} */
    Router.prototype.ngModule;
    /** @type {?} */
    Router.prototype.events;
    /** @type {?} */
    Router.prototype.routerState;
    /**
     * Error handler that is invoked when a navigation errors.
     *
     * See `ErrorHandler` for more information.
     * @type {?}
     */
    Router.prototype.errorHandler;
    /**
     * Malformed uri error handler is invoked when `Router.parseUrl(url)` throws an
     * error due to containing an invalid character. The most common case would be a `%` sign
     * that's not encoded and is not part of a percent encoded sequence.
     * @type {?}
     */
    Router.prototype.malformedUriErrorHandler;
    /**
     * Indicates if at least one navigation happened.
     * @type {?}
     */
    Router.prototype.navigated;
    /** @type {?} */
    Router.prototype.lastSuccessfulId;
    /**
     * Used by RouterModule. This allows us to
     * pause the navigation either before preactivation or after it.
     * \@internal
     * @type {?}
     */
    Router.prototype.hooks;
    /**
     * Extracts and merges URLs. Used for AngularJS to Angular migrations.
     * @type {?}
     */
    Router.prototype.urlHandlingStrategy;
    /** @type {?} */
    Router.prototype.routeReuseStrategy;
    /**
     * Define what the router should do if it receives a navigation request to the current URL.
     * By default, the router will ignore this navigation. However, this prevents features such
     * as a "refresh" button. Use this option to configure the behavior when navigating to the
     * current URL. Default is 'ignore'.
     * @type {?}
     */
    Router.prototype.onSameUrlNavigation;
    /**
     * Defines how the router merges params, data and resolved data from parent to child
     * routes. Available options are:
     *
     * - `'emptyOnly'`, the default, only inherits parent params for path-less or component-less
     *   routes.
     * - `'always'`, enables unconditional inheritance of parent params.
     * @type {?}
     */
    Router.prototype.paramsInheritanceStrategy;
    /**
     * Defines when the router updates the browser URL. The default behavior is to update after
     * successful navigation. However, some applications may prefer a mode where the URL gets
     * updated at the beginning of navigation. The most common use case would be updating the
     * URL early so if navigation fails, you can show an error message with the URL that failed.
     * Available options are:
     *
     * - `'deferred'`, the default, updates the browser URL after navigation has finished.
     * - `'eager'`, updates browser URL at the beginning of navigation.
     * @type {?}
     */
    Router.prototype.urlUpdateStrategy;
    /**
     * See {\@link RouterModule} for more information.
     * @type {?}
     */
    Router.prototype.relativeLinkResolution;
    /** @type {?} */
    Router.prototype.rootComponentType;
    /** @type {?} */
    Router.prototype.urlSerializer;
    /** @type {?} */
    Router.prototype.rootContexts;
    /** @type {?} */
    Router.prototype.location;
    /** @type {?} */
    Router.prototype.config;
}
class ActivateRoutes {
    /**
     * @param {?} routeReuseStrategy
     * @param {?} futureState
     * @param {?} currState
     * @param {?} forwardEvent
     */
    constructor(routeReuseStrategy, futureState, currState, forwardEvent) {
        this.routeReuseStrategy = routeReuseStrategy;
        this.futureState = futureState;
        this.currState = currState;
        this.forwardEvent = forwardEvent;
    }
    /**
     * @param {?} parentContexts
     * @return {?}
     */
    activate(parentContexts) {
        /** @type {?} */
        const futureRoot = this.futureState._root;
        /** @type {?} */
        const currRoot = this.currState ? this.currState._root : null;
        this.deactivateChildRoutes(futureRoot, currRoot, parentContexts);
        advanceActivatedRoute(this.futureState.root);
        this.activateChildRoutes(futureRoot, currRoot, parentContexts);
    }
    /**
     * @param {?} futureNode
     * @param {?} currNode
     * @param {?} contexts
     * @return {?}
     */
    deactivateChildRoutes(futureNode, currNode, contexts) {
        /** @type {?} */
        const children = nodeChildrenAsMap(currNode);
        // Recurse on the routes active in the future state to de-activate deeper children
        futureNode.children.forEach(futureChild => {
            /** @type {?} */
            const childOutletName = futureChild.value.outlet;
            this.deactivateRoutes(futureChild, children[childOutletName], contexts);
            delete children[childOutletName];
        });
        // De-activate the routes that will not be re-used
        forEach(children, (v, childName) => {
            this.deactivateRouteAndItsChildren(v, contexts);
        });
    }
    /**
     * @param {?} futureNode
     * @param {?} currNode
     * @param {?} parentContext
     * @return {?}
     */
    deactivateRoutes(futureNode, currNode, parentContext) {
        /** @type {?} */
        const future = futureNode.value;
        /** @type {?} */
        const curr = currNode ? currNode.value : null;
        if (future === curr) {
            // Reusing the node, check to see if the children need to be de-activated
            if (future.component) {
                /** @type {?} */
                const context = parentContext.getContext(future.outlet);
                if (context) {
                    this.deactivateChildRoutes(futureNode, currNode, context.children);
                }
            }
            else {
                // if we have a componentless route, we recurse but keep the same outlet map.
                this.deactivateChildRoutes(futureNode, currNode, parentContext);
            }
        }
        else {
            if (curr) {
                // Deactivate the current route which will not be re-used
                this.deactivateRouteAndItsChildren(currNode, parentContext);
            }
        }
    }
    /**
     * @param {?} route
     * @param {?} parentContexts
     * @return {?}
     */
    deactivateRouteAndItsChildren(route, parentContexts) {
        if (this.routeReuseStrategy.shouldDetach(route.value.snapshot)) {
            this.detachAndStoreRouteSubtree(route, parentContexts);
        }
        else {
            this.deactivateRouteAndOutlet(route, parentContexts);
        }
    }
    /**
     * @param {?} route
     * @param {?} parentContexts
     * @return {?}
     */
    detachAndStoreRouteSubtree(route, parentContexts) {
        /** @type {?} */
        const context = parentContexts.getContext(route.value.outlet);
        if (context && context.outlet) {
            /** @type {?} */
            const componentRef = context.outlet.detach();
            /** @type {?} */
            const contexts = context.children.onOutletDeactivated();
            this.routeReuseStrategy.store(route.value.snapshot, { componentRef, route, contexts });
        }
    }
    /**
     * @param {?} route
     * @param {?} parentContexts
     * @return {?}
     */
    deactivateRouteAndOutlet(route, parentContexts) {
        /** @type {?} */
        const context = parentContexts.getContext(route.value.outlet);
        if (context) {
            /** @type {?} */
            const children = nodeChildrenAsMap(route);
            /** @type {?} */
            const contexts = route.value.component ? context.children : parentContexts;
            forEach(children, (v, k) => this.deactivateRouteAndItsChildren(v, contexts));
            if (context.outlet) {
                // Destroy the component
                context.outlet.deactivate();
                // Destroy the contexts for all the outlets that were in the component
                context.children.onOutletDeactivated();
            }
        }
    }
    /**
     * @param {?} futureNode
     * @param {?} currNode
     * @param {?} contexts
     * @return {?}
     */
    activateChildRoutes(futureNode, currNode, contexts) {
        /** @type {?} */
        const children = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(c => {
            this.activateRoutes(c, children[c.value.outlet], contexts);
            this.forwardEvent(new ActivationEnd(c.value.snapshot));
        });
        if (futureNode.children.length) {
            this.forwardEvent(new ChildActivationEnd(futureNode.value.snapshot));
        }
    }
    /**
     * @param {?} futureNode
     * @param {?} currNode
     * @param {?} parentContexts
     * @return {?}
     */
    activateRoutes(futureNode, currNode, parentContexts) {
        /** @type {?} */
        const future = futureNode.value;
        /** @type {?} */
        const curr = currNode ? currNode.value : null;
        advanceActivatedRoute(future);
        // reusing the node
        if (future === curr) {
            if (future.component) {
                /** @type {?} */
                const context = parentContexts.getOrCreateContext(future.outlet);
                this.activateChildRoutes(futureNode, currNode, context.children);
            }
            else {
                // if we have a componentless route, we recurse but keep the same outlet map.
                this.activateChildRoutes(futureNode, currNode, parentContexts);
            }
        }
        else {
            if (future.component) {
                /** @type {?} */
                const context = parentContexts.getOrCreateContext(future.outlet);
                if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
                    /** @type {?} */
                    const stored = (/** @type {?} */ (this.routeReuseStrategy.retrieve(future.snapshot)));
                    this.routeReuseStrategy.store(future.snapshot, null);
                    context.children.onOutletReAttached(stored.contexts);
                    context.attachRef = stored.componentRef;
                    context.route = stored.route.value;
                    if (context.outlet) {
                        // Attach right away when the outlet has already been instantiated
                        // Otherwise attach from `RouterOutlet.ngOnInit` when it is instantiated
                        context.outlet.attach(stored.componentRef, stored.route.value);
                    }
                    advanceActivatedRouteNodeAndItsChildren(stored.route);
                }
                else {
                    /** @type {?} */
                    const config = parentLoadedConfig(future.snapshot);
                    /** @type {?} */
                    const cmpFactoryResolver = config ? config.module.componentFactoryResolver : null;
                    context.route = future;
                    context.resolver = cmpFactoryResolver;
                    if (context.outlet) {
                        // Activate the outlet when it has already been instantiated
                        // Otherwise it will get activated from its `ngOnInit` when instantiated
                        context.outlet.activateWith(future, cmpFactoryResolver);
                    }
                    this.activateChildRoutes(futureNode, null, context.children);
                }
            }
            else {
                // if we have a componentless route, we recurse but keep the same outlet map.
                this.activateChildRoutes(futureNode, null, parentContexts);
            }
        }
    }
}
if (false) {
    /** @type {?} */
    ActivateRoutes.prototype.routeReuseStrategy;
    /** @type {?} */
    ActivateRoutes.prototype.futureState;
    /** @type {?} */
    ActivateRoutes.prototype.currState;
    /** @type {?} */
    ActivateRoutes.prototype.forwardEvent;
}
/**
 * @param {?} node
 * @return {?}
 */
function advanceActivatedRouteNodeAndItsChildren(node) {
    advanceActivatedRoute(node.value);
    node.children.forEach(advanceActivatedRouteNodeAndItsChildren);
}
/**
 * @param {?} snapshot
 * @return {?}
 */
function parentLoadedConfig(snapshot) {
    for (let s = snapshot.parent; s; s = s.parent) {
        /** @type {?} */
        const route = s.routeConfig;
        if (route && route._loadedConfig)
            return route._loadedConfig;
        if (route && route.component)
            return null;
    }
    return null;
}
/**
 * @param {?} commands
 * @return {?}
 */
function validateCommands(commands) {
    for (let i = 0; i < commands.length; i++) {
        /** @type {?} */
        const cmd = commands[i];
        if (cmd == null) {
            throw new Error(`The requested path contains ${cmd} segment at index ${i}`);
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFTQSxPQUFPLEVBQTRDLFdBQVcsRUFBUSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFDLGVBQWUsRUFBYyxPQUFPLEVBQWdCLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3RSxPQUFPLEVBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUF5RCxpQkFBaUIsRUFBRSxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDbkgsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQVMsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFxQixVQUFVLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hSLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sRUFBQyx5QkFBeUIsRUFBa0QsTUFBTSx3QkFBd0IsQ0FBQztBQUNsSCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUUxRCxPQUFPLEVBQTJFLHFCQUFxQixFQUFFLGdCQUFnQixFQUE2QixNQUFN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QUFVLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2FBQzVEO1NBQ0Y7O0NBRUo7Ozs7Ozs7Ozs7Ozs7OztBQUVELGlEQUFpRCxJQUE4QjtJQUM3RSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsdUNBQXVDLENBQUMsQ0FBQztDQUNoRTs7Ozs7QUFFRCw0QkFBNEIsUUFBZ0M7SUFDMUQsS0FBSyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTs7UUFDN0MsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUM1QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsYUFBYTtZQUFFLE9BQU8sS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUM3RCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDO0tBQzNDO0lBRUQsT0FBTyxJQUFJLENBQUM7Q0FDYjs7Ozs7QUFFRCwwQkFBMEIsUUFBa0I7SUFDMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O1FBQ3hDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixHQUFHLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdFO0tBQ0Y7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q29tcGlsZXIsIEluamVjdG9yLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5nTW9kdWxlUmVmLCBUeXBlLCBpc0Rldk1vZGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y29uY2F0TWFwLCBtYXAsIG1lcmdlTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7YXBwbHlSZWRpcmVjdHN9IGZyb20gJy4vYXBwbHlfcmVkaXJlY3RzJztcbmltcG9ydCB7TG9hZGVkUm91dGVyQ29uZmlnLCBRdWVyeVBhcmFtc0hhbmRsaW5nLCBSb3V0ZSwgUm91dGVzLCBzdGFuZGFyZGl6ZUNvbmZpZywgdmFsaWRhdGVDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7Y3JlYXRlUm91dGVyU3RhdGV9IGZyb20gJy4vY3JlYXRlX3JvdXRlcl9zdGF0ZSc7XG5pbXBvcnQge2NyZWF0ZVVybFRyZWV9IGZyb20gJy4vY3JlYXRlX3VybF90cmVlJztcbmltcG9ydCB7QWN0aXZhdGlvbkVuZCwgQ2hpbGRBY3RpdmF0aW9uRW5kLCBFdmVudCwgR3VhcmRzQ2hlY2tFbmQsIEd1YXJkc0NoZWNrU3RhcnQsIE5hdmlnYXRpb25DYW5jZWwsIE5hdmlnYXRpb25FbmQsIE5hdmlnYXRpb25FcnJvciwgTmF2aWdhdGlvblN0YXJ0LCBOYXZpZ2F0aW9uVHJpZ2dlciwgUmVzb2x2ZUVuZCwgUmVzb2x2ZVN0YXJ0LCBSb3V0ZUNvbmZpZ0xvYWRFbmQsIFJvdXRlQ29uZmlnTG9hZFN0YXJ0LCBSb3V0ZXNSZWNvZ25pemVkfSBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQge1ByZUFjdGl2YXRpb259IGZyb20gJy4vcHJlX2FjdGl2YXRpb24nO1xuaW1wb3J0IHtyZWNvZ25pemV9IGZyb20gJy4vcmVjb2duaXplJztcbmltcG9ydCB7RGVmYXVsdFJvdXRlUmV1c2VTdHJhdGVneSwgRGV0YWNoZWRSb3V0ZUhhbmRsZUludGVybmFsLCBSb3V0ZVJldXNlU3RyYXRlZ3l9IGZyb20gJy4vcm91dGVfcmV1c2Vfc3RyYXRlZ3knO1xuaW1wb3J0IHtSb3V0ZXJDb25maWdMb2FkZXJ9IGZyb20gJy4vcm91dGVyX2NvbmZpZ19sb2FkZXInO1xuaW1wb3J0IHtDaGlsZHJlbk91dGxldENvbnRleHRzfSBmcm9tICcuL3JvdXRlcl9vdXRsZXRfY29udGV4dCc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZSwgUm91dGVyU3RhdGVTbmFwc2hvdCwgYWR2YW5jZUFjdGl2YXRlZFJvdXRlLCBjcmVhdGVFbXB0eVN0YXRlLCBpbmhlcml0ZWRQYXJhbXNEYXRhUmVzb2x2ZX0gZnJvbSAnLi9yb3V0ZXJfc3RhdGUnO1xuaW1wb3J0IHtQYXJhbXMsIGlzTmF2aWdhdGlvbkNhbmNlbGluZ0Vycm9yfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge0RlZmF1bHRVcmxIYW5kbGluZ1N0cmF0ZWd5LCBVcmxIYW5kbGluZ1N0cmF0ZWd5fSBmcm9tICcuL3VybF9oYW5kbGluZ19zdHJhdGVneSc7XG5pbXBvcnQge1VybFNlcmlhbGl6ZXIsIFVybFRyZWUsIGNvbnRhaW5zVHJlZSwgY3JlYXRlRW1wdHlVcmxUcmVlfSBmcm9tICcuL3VybF90cmVlJztcbmltcG9ydCB7Zm9yRWFjaH0gZnJvbSAnLi91dGlscy9jb2xsZWN0aW9uJztcbmltcG9ydCB7VHJlZU5vZGUsIG5vZGVDaGlsZHJlbkFzTWFwfSBmcm9tICcuL3V0aWxzL3RyZWUnO1xuXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyB0aGUgZXh0cmEgb3B0aW9ucyB1c2VkIGR1cmluZyBuYXZpZ2F0aW9uLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmF2aWdhdGlvbkV4dHJhcyB7XG4gIC8qKlxuICAgKiBFbmFibGVzIHJlbGF0aXZlIG5hdmlnYXRpb24gZnJvbSB0aGUgY3VycmVudCBBY3RpdmF0ZWRSb3V0ZS5cbiAgICpcbiAgICogQ29uZmlndXJhdGlvbjpcbiAgICpcbiAgICogYGBgXG4gICAqIFt7XG4gICogICBwYXRoOiAncGFyZW50JyxcbiAgKiAgIGNvbXBvbmVudDogUGFyZW50Q29tcG9uZW50LFxuICAqICAgY2hpbGRyZW46IFt7XG4gICogICAgIHBhdGg6ICdsaXN0JyxcbiAgKiAgICAgY29tcG9uZW50OiBMaXN0Q29tcG9uZW50XG4gICogICB9LHtcbiAgKiAgICAgcGF0aDogJ2NoaWxkJyxcbiAgKiAgICAgY29tcG9uZW50OiBDaGlsZENvbXBvbmVudFxuICAqICAgfV1cbiAgKiB9XVxuICAgKiBgYGBcbiAgICpcbiAgICogTmF2aWdhdGUgdG8gbGlzdCByb3V0ZSBmcm9tIGNoaWxkIHJvdXRlOlxuICAgKlxuICAgKiBgYGBcbiAgICogIEBDb21wb25lbnQoey4uLn0pXG4gICAqICBjbGFzcyBDaGlsZENvbXBvbmVudCB7XG4gICogICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHt9XG4gICpcbiAgKiAgICBnbygpIHtcbiAgKiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vbGlzdCddLCB7IHJlbGF0aXZlVG86IHRoaXMucm91dGUgfSk7XG4gICogICAgfVxuICAqICB9XG4gICAqIGBgYFxuICAgKi9cbiAgcmVsYXRpdmVUbz86IEFjdGl2YXRlZFJvdXRlfG51bGw7XG5cbiAgLyoqXG4gICAqIFNldHMgcXVlcnkgcGFyYW1ldGVycyB0byB0aGUgVVJMLlxuICAgKlxuICAgKiBgYGBcbiAgICogLy8gTmF2aWdhdGUgdG8gL3Jlc3VsdHM/cGFnZT0xXG4gICAqIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3Jlc3VsdHMnXSwgeyBxdWVyeVBhcmFtczogeyBwYWdlOiAxIH0gfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgcXVlcnlQYXJhbXM/OiBQYXJhbXN8bnVsbDtcblxuICAvKipcbiAgICogU2V0cyB0aGUgaGFzaCBmcmFnbWVudCBmb3IgdGhlIFVSTC5cbiAgICpcbiAgICogYGBgXG4gICAqIC8vIE5hdmlnYXRlIHRvIC9yZXN1bHRzI3RvcFxuICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9yZXN1bHRzJ10sIHsgZnJhZ21lbnQ6ICd0b3AnIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGZyYWdtZW50Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBQcmVzZXJ2ZXMgdGhlIHF1ZXJ5IHBhcmFtZXRlcnMgZm9yIHRoZSBuZXh0IG5hdmlnYXRpb24uXG4gICAqXG4gICAqIGRlcHJlY2F0ZWQsIHVzZSBgcXVlcnlQYXJhbXNIYW5kbGluZ2AgaW5zdGVhZFxuICAgKlxuICAgKiBgYGBcbiAgICogLy8gUHJlc2VydmUgcXVlcnkgcGFyYW1zIGZyb20gL3Jlc3VsdHM/cGFnZT0xIHRvIC92aWV3P3BhZ2U9MVxuICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy92aWV3J10sIHsgcHJlc2VydmVRdWVyeVBhcmFtczogdHJ1ZSB9KTtcbiAgICogYGBgXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIHNpbmNlIHY0XG4gICAqL1xuICBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogIGNvbmZpZyBzdHJhdGVneSB0byBoYW5kbGUgdGhlIHF1ZXJ5IHBhcmFtZXRlcnMgZm9yIHRoZSBuZXh0IG5hdmlnYXRpb24uXG4gICAqXG4gICAqIGBgYFxuICAgKiAvLyBmcm9tIC9yZXN1bHRzP3BhZ2U9MSB0byAvdmlldz9wYWdlPTEmcGFnZT0yXG4gICAqIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3ZpZXcnXSwgeyBxdWVyeVBhcmFtczogeyBwYWdlOiAyIH0sICBxdWVyeVBhcmFtc0hhbmRsaW5nOiBcIm1lcmdlXCIgfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgcXVlcnlQYXJhbXNIYW5kbGluZz86IFF1ZXJ5UGFyYW1zSGFuZGxpbmd8bnVsbDtcbiAgLyoqXG4gICAqIFByZXNlcnZlcyB0aGUgZnJhZ21lbnQgZm9yIHRoZSBuZXh0IG5hdmlnYXRpb25cbiAgICpcbiAgICogYGBgXG4gICAqIC8vIFByZXNlcnZlIGZyYWdtZW50IGZyb20gL3Jlc3VsdHMjdG9wIHRvIC92aWV3I3RvcFxuICAgKiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy92aWV3J10sIHsgcHJlc2VydmVGcmFnbWVudDogdHJ1ZSB9KTtcbiAgICogYGBgXG4gICAqL1xuICBwcmVzZXJ2ZUZyYWdtZW50PzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE5hdmlnYXRlcyB3aXRob3V0IHB1c2hpbmcgYSBuZXcgc3RhdGUgaW50byBoaXN0b3J5LlxuICAgKlxuICAgKiBgYGBcbiAgICogLy8gTmF2aWdhdGUgc2lsZW50bHkgdG8gL3ZpZXdcbiAgICogdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdmlldyddLCB7IHNraXBMb2NhdGlvbkNoYW5nZTogdHJ1ZSB9KTtcbiAgICogYGBgXG4gICAqL1xuICBza2lwTG9jYXRpb25DaGFuZ2U/OiBib29sZWFuO1xuICAvKipcbiAgICogTmF2aWdhdGVzIHdoaWxlIHJlcGxhY2luZyB0aGUgY3VycmVudCBzdGF0ZSBpbiBoaXN0b3J5LlxuICAgKlxuICAgKiBgYGBcbiAgICogLy8gTmF2aWdhdGUgdG8gL3ZpZXdcbiAgICogdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdmlldyddLCB7IHJlcGxhY2VVcmw6IHRydWUgfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgcmVwbGFjZVVybD86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogRXJyb3IgaGFuZGxlciB0aGF0IGlzIGludm9rZWQgd2hlbiBhIG5hdmlnYXRpb24gZXJyb3JzLlxuICpcbiAqIElmIHRoZSBoYW5kbGVyIHJldHVybnMgYSB2YWx1ZSwgdGhlIG5hdmlnYXRpb24gcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhpcyB2YWx1ZS5cbiAqIElmIHRoZSBoYW5kbGVyIHRocm93cyBhbiBleGNlcHRpb24sIHRoZSBuYXZpZ2F0aW9uIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoXG4gKiB0aGUgZXhjZXB0aW9uLlxuICpcbiAqXG4gKi9cbmV4cG9ydCB0eXBlIEVycm9ySGFuZGxlciA9IChlcnJvcjogYW55KSA9PiBhbnk7XG5cbmZ1bmN0aW9uIGRlZmF1bHRFcnJvckhhbmRsZXIoZXJyb3I6IGFueSk6IGFueSB7XG4gIHRocm93IGVycm9yO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0TWFsZm9ybWVkVXJpRXJyb3JIYW5kbGVyKFxuICAgIGVycm9yOiBVUklFcnJvciwgdXJsU2VyaWFsaXplcjogVXJsU2VyaWFsaXplciwgdXJsOiBzdHJpbmcpOiBVcmxUcmVlIHtcbiAgcmV0dXJuIHVybFNlcmlhbGl6ZXIucGFyc2UoJy8nKTtcbn1cblxudHlwZSBOYXZTdHJlYW1WYWx1ZSA9XG4gICAgYm9vbGVhbiB8IHthcHBsaWVkVXJsOiBVcmxUcmVlLCBzbmFwc2hvdDogUm91dGVyU3RhdGVTbmFwc2hvdCwgc2hvdWxkQWN0aXZhdGU/OiBib29sZWFufTtcblxudHlwZSBOYXZpZ2F0aW9uUGFyYW1zID0ge1xuICBpZDogbnVtYmVyLFxuICByYXdVcmw6IFVybFRyZWUsXG4gIGV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyxcbiAgcmVzb2x2ZTogYW55LFxuICByZWplY3Q6IGFueSxcbiAgcHJvbWlzZTogUHJvbWlzZTxib29sZWFuPixcbiAgc291cmNlOiBOYXZpZ2F0aW9uVHJpZ2dlcixcbiAgc3RhdGU6IHtuYXZpZ2F0aW9uSWQ6IG51bWJlcn0gfCBudWxsXG59O1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgdHlwZSBSb3V0ZXJIb29rID0gKHNuYXBzaG90OiBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBydW5FeHRyYXM6IHtcbiAgYXBwbGllZFVybFRyZWU6IFVybFRyZWUsXG4gIHJhd1VybFRyZWU6IFVybFRyZWUsXG4gIHNraXBMb2NhdGlvbkNoYW5nZTogYm9vbGVhbixcbiAgcmVwbGFjZVVybDogYm9vbGVhbixcbiAgbmF2aWdhdGlvbklkOiBudW1iZXJcbn0pID0+IE9ic2VydmFibGU8dm9pZD47XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRSb3V0ZXJIb29rKHNuYXBzaG90OiBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBydW5FeHRyYXM6IHtcbiAgYXBwbGllZFVybFRyZWU6IFVybFRyZWUsXG4gIHJhd1VybFRyZWU6IFVybFRyZWUsXG4gIHNraXBMb2NhdGlvbkNoYW5nZTogYm9vbGVhbixcbiAgcmVwbGFjZVVybDogYm9vbGVhbixcbiAgbmF2aWdhdGlvbklkOiBudW1iZXJcbn0pOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgcmV0dXJuIG9mIChudWxsKSBhcyBhbnk7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUHJvdmlkZXMgdGhlIG5hdmlnYXRpb24gYW5kIHVybCBtYW5pcHVsYXRpb24gY2FwYWJpbGl0aWVzLlxuICpcbiAqIFNlZSBgUm91dGVzYCBmb3IgbW9yZSBkZXRhaWxzIGFuZCBleGFtcGxlcy5cbiAqXG4gKiBAbmdNb2R1bGUgUm91dGVyTW9kdWxlXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFJvdXRlciB7XG4gIHByaXZhdGUgY3VycmVudFVybFRyZWU6IFVybFRyZWU7XG4gIHByaXZhdGUgcmF3VXJsVHJlZTogVXJsVHJlZTtcbiAgcHJpdmF0ZSBuYXZpZ2F0aW9ucyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TmF2aWdhdGlvblBhcmFtcz4obnVsbCAhKTtcblxuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSBsb2NhdGlvblN1YnNjcmlwdGlvbiAhOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgbmF2aWdhdGlvbklkOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGNvbmZpZ0xvYWRlcjogUm91dGVyQ29uZmlnTG9hZGVyO1xuICBwcml2YXRlIG5nTW9kdWxlOiBOZ01vZHVsZVJlZjxhbnk+O1xuXG4gIHB1YmxpYyByZWFkb25seSBldmVudHM6IE9ic2VydmFibGU8RXZlbnQ+ID0gbmV3IFN1YmplY3Q8RXZlbnQ+KCk7XG4gIHB1YmxpYyByZWFkb25seSByb3V0ZXJTdGF0ZTogUm91dGVyU3RhdGU7XG5cbiAgLyoqXG4gICAqIEVycm9yIGhhbmRsZXIgdGhhdCBpcyBpbnZva2VkIHdoZW4gYSBuYXZpZ2F0aW9uIGVycm9ycy5cbiAgICpcbiAgICogU2VlIGBFcnJvckhhbmRsZXJgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIgPSBkZWZhdWx0RXJyb3JIYW5kbGVyO1xuXG4gIC8qKlxuICAgKiBNYWxmb3JtZWQgdXJpIGVycm9yIGhhbmRsZXIgaXMgaW52b2tlZCB3aGVuIGBSb3V0ZXIucGFyc2VVcmwodXJsKWAgdGhyb3dzIGFuXG4gICAqIGVycm9yIGR1ZSB0byBjb250YWluaW5nIGFuIGludmFsaWQgY2hhcmFjdGVyLiBUaGUgbW9zdCBjb21tb24gY2FzZSB3b3VsZCBiZSBhIGAlYCBzaWduXG4gICAqIHRoYXQncyBub3QgZW5jb2RlZCBhbmQgaXMgbm90IHBhcnQgb2YgYSBwZXJjZW50IGVuY29kZWQgc2VxdWVuY2UuXG4gICAqL1xuICBtYWxmb3JtZWRVcmlFcnJvckhhbmRsZXI6XG4gICAgICAoZXJyb3I6IFVSSUVycm9yLCB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLFxuICAgICAgIHVybDogc3RyaW5nKSA9PiBVcmxUcmVlID0gZGVmYXVsdE1hbGZvcm1lZFVyaUVycm9ySGFuZGxlcjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIGF0IGxlYXN0IG9uZSBuYXZpZ2F0aW9uIGhhcHBlbmVkLlxuICAgKi9cbiAgbmF2aWdhdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgbGFzdFN1Y2Nlc3NmdWxJZDogbnVtYmVyID0gLTE7XG5cbiAgLyoqXG4gICAqIFVzZWQgYnkgUm91dGVyTW9kdWxlLiBUaGlzIGFsbG93cyB1cyB0b1xuICAgKiBwYXVzZSB0aGUgbmF2aWdhdGlvbiBlaXRoZXIgYmVmb3JlIHByZWFjdGl2YXRpb24gb3IgYWZ0ZXIgaXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgaG9va3M6IHtiZWZvcmVQcmVhY3RpdmF0aW9uOiBSb3V0ZXJIb29rLCBhZnRlclByZWFjdGl2YXRpb246IFJvdXRlckhvb2t9ID0ge1xuICAgIGJlZm9yZVByZWFjdGl2YXRpb246IGRlZmF1bHRSb3V0ZXJIb29rLFxuICAgIGFmdGVyUHJlYWN0aXZhdGlvbjogZGVmYXVsdFJvdXRlckhvb2tcbiAgfTtcblxuICAvKipcbiAgICogRXh0cmFjdHMgYW5kIG1lcmdlcyBVUkxzLiBVc2VkIGZvciBBbmd1bGFySlMgdG8gQW5ndWxhciBtaWdyYXRpb25zLlxuICAgKi9cbiAgdXJsSGFuZGxpbmdTdHJhdGVneTogVXJsSGFuZGxpbmdTdHJhdGVneSA9IG5ldyBEZWZhdWx0VXJsSGFuZGxpbmdTdHJhdGVneSgpO1xuXG4gIHJvdXRlUmV1c2VTdHJhdGVneTogUm91dGVSZXVzZVN0cmF0ZWd5ID0gbmV3IERlZmF1bHRSb3V0ZVJldXNlU3RyYXRlZ3koKTtcblxuICAvKipcbiAgICogRGVmaW5lIHdoYXQgdGhlIHJvdXRlciBzaG91bGQgZG8gaWYgaXQgcmVjZWl2ZXMgYSBuYXZpZ2F0aW9uIHJlcXVlc3QgdG8gdGhlIGN1cnJlbnQgVVJMLlxuICAgKiBCeSBkZWZhdWx0LCB0aGUgcm91dGVyIHdpbGwgaWdub3JlIHRoaXMgbmF2aWdhdGlvbi4gSG93ZXZlciwgdGhpcyBwcmV2ZW50cyBmZWF0dXJlcyBzdWNoXG4gICAqIGFzIGEgXCJyZWZyZXNoXCIgYnV0dG9uLiBVc2UgdGhpcyBvcHRpb24gdG8gY29uZmlndXJlIHRoZSBiZWhhdmlvciB3aGVuIG5hdmlnYXRpbmcgdG8gdGhlXG4gICAqIGN1cnJlbnQgVVJMLiBEZWZhdWx0IGlzICdpZ25vcmUnLlxuICAgKi9cbiAgb25TYW1lVXJsTmF2aWdhdGlvbjogJ3JlbG9hZCd8J2lnbm9yZScgPSAnaWdub3JlJztcblxuICAvKipcbiAgICogRGVmaW5lcyBob3cgdGhlIHJvdXRlciBtZXJnZXMgcGFyYW1zLCBkYXRhIGFuZCByZXNvbHZlZCBkYXRhIGZyb20gcGFyZW50IHRvIGNoaWxkXG4gICAqIHJvdXRlcy4gQXZhaWxhYmxlIG9wdGlvbnMgYXJlOlxuICAgKlxuICAgKiAtIGAnZW1wdHlPbmx5J2AsIHRoZSBkZWZhdWx0LCBvbmx5IGluaGVyaXRzIHBhcmVudCBwYXJhbXMgZm9yIHBhdGgtbGVzcyBvciBjb21wb25lbnQtbGVzc1xuICAgKiAgIHJvdXRlcy5cbiAgICogLSBgJ2Fsd2F5cydgLCBlbmFibGVzIHVuY29uZGl0aW9uYWwgaW5oZXJpdGFuY2Ugb2YgcGFyZW50IHBhcmFtcy5cbiAgICovXG4gIHBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3k6ICdlbXB0eU9ubHknfCdhbHdheXMnID0gJ2VtcHR5T25seSc7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgd2hlbiB0aGUgcm91dGVyIHVwZGF0ZXMgdGhlIGJyb3dzZXIgVVJMLiBUaGUgZGVmYXVsdCBiZWhhdmlvciBpcyB0byB1cGRhdGUgYWZ0ZXJcbiAgICogc3VjY2Vzc2Z1bCBuYXZpZ2F0aW9uLiBIb3dldmVyLCBzb21lIGFwcGxpY2F0aW9ucyBtYXkgcHJlZmVyIGEgbW9kZSB3aGVyZSB0aGUgVVJMIGdldHNcbiAgICogdXBkYXRlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIG5hdmlnYXRpb24uIFRoZSBtb3N0IGNvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB1cGRhdGluZyB0aGVcbiAgICogVVJMIGVhcmx5IHNvIGlmIG5hdmlnYXRpb24gZmFpbHMsIHlvdSBjYW4gc2hvdyBhbiBlcnJvciBtZXNzYWdlIHdpdGggdGhlIFVSTCB0aGF0IGZhaWxlZC5cbiAgICogQXZhaWxhYmxlIG9wdGlvbnMgYXJlOlxuICAgKlxuICAgKiAtIGAnZGVmZXJyZWQnYCwgdGhlIGRlZmF1bHQsIHVwZGF0ZXMgdGhlIGJyb3dzZXIgVVJMIGFmdGVyIG5hdmlnYXRpb24gaGFzIGZpbmlzaGVkLlxuICAgKiAtIGAnZWFnZXInYCwgdXBkYXRlcyBicm93c2VyIFVSTCBhdCB0aGUgYmVnaW5uaW5nIG9mIG5hdmlnYXRpb24uXG4gICAqL1xuICB1cmxVcGRhdGVTdHJhdGVneTogJ2RlZmVycmVkJ3wnZWFnZXInID0gJ2RlZmVycmVkJztcblxuICAvKipcbiAgICogU2VlIHtAbGluayBSb3V0ZXJNb2R1bGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcmVsYXRpdmVMaW5rUmVzb2x1dGlvbjogJ2xlZ2FjeSd8J2NvcnJlY3RlZCcgPSAnbGVnYWN5JztcblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgcm91dGVyIHNlcnZpY2UuXG4gICAqL1xuICAvLyBUT0RPOiB2c2F2a2luIG1ha2UgaW50ZXJuYWwgYWZ0ZXIgdGhlIGZpbmFsIGlzIG91dC5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvb3RDb21wb25lbnRUeXBlOiBUeXBlPGFueT58bnVsbCwgcHJpdmF0ZSB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLFxuICAgICAgcHJpdmF0ZSByb290Q29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHMsIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICBsb2FkZXI6IE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgY29tcGlsZXI6IENvbXBpbGVyLCBwdWJsaWMgY29uZmlnOiBSb3V0ZXMpIHtcbiAgICBjb25zdCBvbkxvYWRTdGFydCA9IChyOiBSb3V0ZSkgPT4gdGhpcy50cmlnZ2VyRXZlbnQobmV3IFJvdXRlQ29uZmlnTG9hZFN0YXJ0KHIpKTtcbiAgICBjb25zdCBvbkxvYWRFbmQgPSAocjogUm91dGUpID0+IHRoaXMudHJpZ2dlckV2ZW50KG5ldyBSb3V0ZUNvbmZpZ0xvYWRFbmQocikpO1xuXG4gICAgdGhpcy5uZ01vZHVsZSA9IGluamVjdG9yLmdldChOZ01vZHVsZVJlZik7XG5cbiAgICB0aGlzLnJlc2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgdGhpcy5jdXJyZW50VXJsVHJlZSA9IGNyZWF0ZUVtcHR5VXJsVHJlZSgpO1xuICAgIHRoaXMucmF3VXJsVHJlZSA9IHRoaXMuY3VycmVudFVybFRyZWU7XG5cbiAgICB0aGlzLmNvbmZpZ0xvYWRlciA9IG5ldyBSb3V0ZXJDb25maWdMb2FkZXIobG9hZGVyLCBjb21waWxlciwgb25Mb2FkU3RhcnQsIG9uTG9hZEVuZCk7XG4gICAgdGhpcy5yb3V0ZXJTdGF0ZSA9IGNyZWF0ZUVtcHR5U3RhdGUodGhpcy5jdXJyZW50VXJsVHJlZSwgdGhpcy5yb290Q29tcG9uZW50VHlwZSk7XG4gICAgdGhpcy5wcm9jZXNzTmF2aWdhdGlvbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogVE9ETzogdGhpcyBzaG91bGQgYmUgcmVtb3ZlZCBvbmNlIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgcm91dGVyIG1hZGUgaW50ZXJuYWxcbiAgICovXG4gIHJlc2V0Um9vdENvbXBvbmVudFR5cGUocm9vdENvbXBvbmVudFR5cGU6IFR5cGU8YW55Pik6IHZvaWQge1xuICAgIHRoaXMucm9vdENvbXBvbmVudFR5cGUgPSByb290Q29tcG9uZW50VHlwZTtcbiAgICAvLyBUT0RPOiB2c2F2a2luIHJvdXRlciA0LjAgc2hvdWxkIG1ha2UgdGhlIHJvb3QgY29tcG9uZW50IHNldCB0byBudWxsXG4gICAgLy8gdGhpcyB3aWxsIHNpbXBsaWZ5IHRoZSBsaWZlY3ljbGUgb2YgdGhlIHJvdXRlci5cbiAgICB0aGlzLnJvdXRlclN0YXRlLnJvb3QuY29tcG9uZW50ID0gdGhpcy5yb290Q29tcG9uZW50VHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHVwIHRoZSBsb2NhdGlvbiBjaGFuZ2UgbGlzdGVuZXIgYW5kIHBlcmZvcm1zIHRoZSBpbml0aWFsIG5hdmlnYXRpb24uXG4gICAqL1xuICBpbml0aWFsTmF2aWdhdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnNldFVwTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcigpO1xuICAgIGlmICh0aGlzLm5hdmlnYXRpb25JZCA9PT0gMCkge1xuICAgICAgdGhpcy5uYXZpZ2F0ZUJ5VXJsKHRoaXMubG9jYXRpb24ucGF0aCh0cnVlKSwge3JlcGxhY2VVcmw6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB1cCB0aGUgbG9jYXRpb24gY2hhbmdlIGxpc3RlbmVyLlxuICAgKi9cbiAgc2V0VXBMb2NhdGlvbkNoYW5nZUxpc3RlbmVyKCk6IHZvaWQge1xuICAgIC8vIERvbid0IG5lZWQgdG8gdXNlIFpvbmUud3JhcCBhbnkgbW9yZSwgYmVjYXVzZSB6b25lLmpzXG4gICAgLy8gYWxyZWFkeSBwYXRjaCBvblBvcFN0YXRlLCBzbyBsb2NhdGlvbiBjaGFuZ2UgY2FsbGJhY2sgd2lsbFxuICAgIC8vIHJ1biBpbnRvIG5nWm9uZVxuICAgIGlmICghdGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5sb2NhdGlvblN1YnNjcmlwdGlvbiA9IDxhbnk+dGhpcy5sb2NhdGlvbi5zdWJzY3JpYmUoKGNoYW5nZTogYW55KSA9PiB7XG4gICAgICAgIGxldCByYXdVcmxUcmVlID0gdGhpcy5wYXJzZVVybChjaGFuZ2VbJ3VybCddKTtcbiAgICAgICAgY29uc3Qgc291cmNlOiBOYXZpZ2F0aW9uVHJpZ2dlciA9IGNoYW5nZVsndHlwZSddID09PSAncG9wc3RhdGUnID8gJ3BvcHN0YXRlJyA6ICdoYXNoY2hhbmdlJztcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBjaGFuZ2Uuc3RhdGUgJiYgY2hhbmdlLnN0YXRlLm5hdmlnYXRpb25JZCA/XG4gICAgICAgICAgICB7bmF2aWdhdGlvbklkOiBjaGFuZ2Uuc3RhdGUubmF2aWdhdGlvbklkfSA6XG4gICAgICAgICAgICBudWxsO1xuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgKCkgPT4geyB0aGlzLnNjaGVkdWxlTmF2aWdhdGlvbihyYXdVcmxUcmVlLCBzb3VyY2UsIHN0YXRlLCB7cmVwbGFjZVVybDogdHJ1ZX0pOyB9LCAwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGUgY3VycmVudCB1cmwgKi9cbiAgZ2V0IHVybCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5zZXJpYWxpemVVcmwodGhpcy5jdXJyZW50VXJsVHJlZSk7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIHRyaWdnZXJFdmVudChlOiBFdmVudCk6IHZvaWQgeyAodGhpcy5ldmVudHMgYXMgU3ViamVjdDxFdmVudD4pLm5leHQoZSk7IH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBjb25maWd1cmF0aW9uIHVzZWQgZm9yIG5hdmlnYXRpb24gYW5kIGdlbmVyYXRpbmcgbGlua3MuXG4gICAqXG4gICAqICMjIyBVc2FnZVxuICAgKlxuICAgKiBgYGBcbiAgICogcm91dGVyLnJlc2V0Q29uZmlnKFtcbiAgICogIHsgcGF0aDogJ3RlYW0vOmlkJywgY29tcG9uZW50OiBUZWFtQ21wLCBjaGlsZHJlbjogW1xuICAgKiAgICB7IHBhdGg6ICdzaW1wbGUnLCBjb21wb25lbnQ6IFNpbXBsZUNtcCB9LFxuICAgKiAgICB7IHBhdGg6ICd1c2VyLzpuYW1lJywgY29tcG9uZW50OiBVc2VyQ21wIH1cbiAgICogIF19XG4gICAqIF0pO1xuICAgKiBgYGBcbiAgICovXG4gIHJlc2V0Q29uZmlnKGNvbmZpZzogUm91dGVzKTogdm9pZCB7XG4gICAgdmFsaWRhdGVDb25maWcoY29uZmlnKTtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZy5tYXAoc3RhbmRhcmRpemVDb25maWcpO1xuICAgIHRoaXMubmF2aWdhdGVkID0gZmFsc2U7XG4gICAgdGhpcy5sYXN0U3VjY2Vzc2Z1bElkID0gLTE7XG4gIH1cblxuICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgdGhpcy5kaXNwb3NlKCk7IH1cblxuICAvKiogRGlzcG9zZXMgb2YgdGhlIHJvdXRlciAqL1xuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uID0gbnVsbCAhO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGFuIGFycmF5IG9mIGNvbW1hbmRzIHRvIHRoZSBjdXJyZW50IHVybCB0cmVlIGFuZCBjcmVhdGVzIGEgbmV3IHVybCB0cmVlLlxuICAgKlxuICAgKiBXaGVuIGdpdmVuIGFuIGFjdGl2YXRlIHJvdXRlLCBhcHBsaWVzIHRoZSBnaXZlbiBjb21tYW5kcyBzdGFydGluZyBmcm9tIHRoZSByb3V0ZS5cbiAgICogV2hlbiBub3QgZ2l2ZW4gYSByb3V0ZSwgYXBwbGllcyB0aGUgZ2l2ZW4gY29tbWFuZCBzdGFydGluZyBmcm9tIHRoZSByb290LlxuICAgKlxuICAgKiAjIyMgVXNhZ2VcbiAgICpcbiAgICogYGBgXG4gICAqIC8vIGNyZWF0ZSAvdGVhbS8zMy91c2VyLzExXG4gICAqIHJvdXRlci5jcmVhdGVVcmxUcmVlKFsnL3RlYW0nLCAzMywgJ3VzZXInLCAxMV0pO1xuICAgKlxuICAgKiAvLyBjcmVhdGUgL3RlYW0vMzM7ZXhwYW5kPXRydWUvdXNlci8xMVxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy90ZWFtJywgMzMsIHtleHBhbmQ6IHRydWV9LCAndXNlcicsIDExXSk7XG4gICAqXG4gICAqIC8vIHlvdSBjYW4gY29sbGFwc2Ugc3RhdGljIHNlZ21lbnRzIGxpa2UgdGhpcyAodGhpcyB3b3JrcyBvbmx5IHdpdGggdGhlIGZpcnN0IHBhc3NlZC1pbiB2YWx1ZSk6XG4gICAqIHJvdXRlci5jcmVhdGVVcmxUcmVlKFsnL3RlYW0vMzMvdXNlcicsIHVzZXJJZF0pO1xuICAgKlxuICAgKiAvLyBJZiB0aGUgZmlyc3Qgc2VnbWVudCBjYW4gY29udGFpbiBzbGFzaGVzLCBhbmQgeW91IGRvIG5vdCB3YW50IHRoZSByb3V0ZXIgdG8gc3BsaXQgaXQsIHlvdVxuICAgKiAvLyBjYW4gZG8gdGhlIGZvbGxvd2luZzpcbiAgICpcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoW3tzZWdtZW50UGF0aDogJy9vbmUvdHdvJ31dKTtcbiAgICpcbiAgICogLy8gY3JlYXRlIC90ZWFtLzMzLyh1c2VyLzExLy9yaWdodDpjaGF0KVxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy90ZWFtJywgMzMsIHtvdXRsZXRzOiB7cHJpbWFyeTogJ3VzZXIvMTEnLCByaWdodDogJ2NoYXQnfX1dKTtcbiAgICpcbiAgICogLy8gcmVtb3ZlIHRoZSByaWdodCBzZWNvbmRhcnkgbm9kZVxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy90ZWFtJywgMzMsIHtvdXRsZXRzOiB7cHJpbWFyeTogJ3VzZXIvMTEnLCByaWdodDogbnVsbH19XSk7XG4gICAqXG4gICAqIC8vIGFzc3VtaW5nIHRoZSBjdXJyZW50IHVybCBpcyBgL3RlYW0vMzMvdXNlci8xMWAgYW5kIHRoZSByb3V0ZSBwb2ludHMgdG8gYHVzZXIvMTFgXG4gICAqXG4gICAqIC8vIG5hdmlnYXRlIHRvIC90ZWFtLzMzL3VzZXIvMTEvZGV0YWlsc1xuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJ2RldGFpbHMnXSwge3JlbGF0aXZlVG86IHJvdXRlfSk7XG4gICAqXG4gICAqIC8vIG5hdmlnYXRlIHRvIC90ZWFtLzMzL3VzZXIvMjJcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWycuLi8yMiddLCB7cmVsYXRpdmVUbzogcm91dGV9KTtcbiAgICpcbiAgICogLy8gbmF2aWdhdGUgdG8gL3RlYW0vNDQvdXNlci8yMlxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy4uLy4uL3RlYW0vNDQvdXNlci8yMiddLCB7cmVsYXRpdmVUbzogcm91dGV9KTtcbiAgICogYGBgXG4gICAqL1xuICBjcmVhdGVVcmxUcmVlKGNvbW1hbmRzOiBhbnlbXSwgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHt9KTogVXJsVHJlZSB7XG4gICAgY29uc3Qge3JlbGF0aXZlVG8sICAgICAgICAgIHF1ZXJ5UGFyYW1zLCAgICAgICAgIGZyYWdtZW50LFxuICAgICAgICAgICBwcmVzZXJ2ZVF1ZXJ5UGFyYW1zLCBxdWVyeVBhcmFtc0hhbmRsaW5nLCBwcmVzZXJ2ZUZyYWdtZW50fSA9IG5hdmlnYXRpb25FeHRyYXM7XG4gICAgaWYgKGlzRGV2TW9kZSgpICYmIHByZXNlcnZlUXVlcnlQYXJhbXMgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3ByZXNlcnZlUXVlcnlQYXJhbXMgaXMgZGVwcmVjYXRlZCwgdXNlIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgY29uc3QgYSA9IHJlbGF0aXZlVG8gfHwgdGhpcy5yb3V0ZXJTdGF0ZS5yb290O1xuICAgIGNvbnN0IGYgPSBwcmVzZXJ2ZUZyYWdtZW50ID8gdGhpcy5jdXJyZW50VXJsVHJlZS5mcmFnbWVudCA6IGZyYWdtZW50O1xuICAgIGxldCBxOiBQYXJhbXN8bnVsbCA9IG51bGw7XG4gICAgaWYgKHF1ZXJ5UGFyYW1zSGFuZGxpbmcpIHtcbiAgICAgIHN3aXRjaCAocXVlcnlQYXJhbXNIYW5kbGluZykge1xuICAgICAgICBjYXNlICdtZXJnZSc6XG4gICAgICAgICAgcSA9IHsuLi50aGlzLmN1cnJlbnRVcmxUcmVlLnF1ZXJ5UGFyYW1zLCAuLi5xdWVyeVBhcmFtc307XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3ByZXNlcnZlJzpcbiAgICAgICAgICBxID0gdGhpcy5jdXJyZW50VXJsVHJlZS5xdWVyeVBhcmFtcztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBxID0gcXVlcnlQYXJhbXMgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcSA9IHByZXNlcnZlUXVlcnlQYXJhbXMgPyB0aGlzLmN1cnJlbnRVcmxUcmVlLnF1ZXJ5UGFyYW1zIDogcXVlcnlQYXJhbXMgfHwgbnVsbDtcbiAgICB9XG4gICAgaWYgKHEgIT09IG51bGwpIHtcbiAgICAgIHEgPSB0aGlzLnJlbW92ZUVtcHR5UHJvcHMocSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVVcmxUcmVlKGEsIHRoaXMuY3VycmVudFVybFRyZWUsIGNvbW1hbmRzLCBxICEsIGYgISk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGUgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHVybC4gVGhpcyBuYXZpZ2F0aW9uIGlzIGFsd2F5cyBhYnNvbHV0ZS5cbiAgICpcbiAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdDpcbiAgICogLSByZXNvbHZlcyB0byAndHJ1ZScgd2hlbiBuYXZpZ2F0aW9uIHN1Y2NlZWRzLFxuICAgKiAtIHJlc29sdmVzIHRvICdmYWxzZScgd2hlbiBuYXZpZ2F0aW9uIGZhaWxzLFxuICAgKiAtIGlzIHJlamVjdGVkIHdoZW4gYW4gZXJyb3IgaGFwcGVucy5cbiAgICpcbiAgICogIyMjIFVzYWdlXG4gICAqXG4gICAqIGBgYFxuICAgKiByb3V0ZXIubmF2aWdhdGVCeVVybChcIi90ZWFtLzMzL3VzZXIvMTFcIik7XG4gICAqXG4gICAqIC8vIE5hdmlnYXRlIHdpdGhvdXQgdXBkYXRpbmcgdGhlIFVSTFxuICAgKiByb3V0ZXIubmF2aWdhdGVCeVVybChcIi90ZWFtLzMzL3VzZXIvMTFcIiwgeyBza2lwTG9jYXRpb25DaGFuZ2U6IHRydWUgfSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBJbiBvcHBvc2l0ZSB0byBgbmF2aWdhdGVgLCBgbmF2aWdhdGVCeVVybGAgdGFrZXMgYSB3aG9sZSBVUkxcbiAgICogYW5kIGRvZXMgbm90IGFwcGx5IGFueSBkZWx0YSB0byB0aGUgY3VycmVudCBvbmUuXG4gICAqL1xuICBuYXZpZ2F0ZUJ5VXJsKHVybDogc3RyaW5nfFVybFRyZWUsIGV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtza2lwTG9jYXRpb25DaGFuZ2U6IGZhbHNlfSk6XG4gICAgICBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCB1cmxUcmVlID0gdXJsIGluc3RhbmNlb2YgVXJsVHJlZSA/IHVybCA6IHRoaXMucGFyc2VVcmwodXJsKTtcbiAgICBjb25zdCBtZXJnZWRUcmVlID0gdGhpcy51cmxIYW5kbGluZ1N0cmF0ZWd5Lm1lcmdlKHVybFRyZWUsIHRoaXMucmF3VXJsVHJlZSk7XG5cbiAgICByZXR1cm4gdGhpcy5zY2hlZHVsZU5hdmlnYXRpb24obWVyZ2VkVHJlZSwgJ2ltcGVyYXRpdmUnLCBudWxsLCBleHRyYXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBhcnJheSBvZiBjb21tYW5kcyBhbmQgYSBzdGFydGluZyBwb2ludC5cbiAgICogSWYgbm8gc3RhcnRpbmcgcm91dGUgaXMgcHJvdmlkZWQsIHRoZSBuYXZpZ2F0aW9uIGlzIGFic29sdXRlLlxuICAgKlxuICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0OlxuICAgKiAtIHJlc29sdmVzIHRvICd0cnVlJyB3aGVuIG5hdmlnYXRpb24gc3VjY2VlZHMsXG4gICAqIC0gcmVzb2x2ZXMgdG8gJ2ZhbHNlJyB3aGVuIG5hdmlnYXRpb24gZmFpbHMsXG4gICAqIC0gaXMgcmVqZWN0ZWQgd2hlbiBhbiBlcnJvciBoYXBwZW5zLlxuICAgKlxuICAgKiAjIyMgVXNhZ2VcbiAgICpcbiAgICogYGBgXG4gICAqIHJvdXRlci5uYXZpZ2F0ZShbJ3RlYW0nLCAzMywgJ3VzZXInLCAxMV0sIHtyZWxhdGl2ZVRvOiByb3V0ZX0pO1xuICAgKlxuICAgKiAvLyBOYXZpZ2F0ZSB3aXRob3V0IHVwZGF0aW5nIHRoZSBVUkxcbiAgICogcm91dGVyLm5hdmlnYXRlKFsndGVhbScsIDMzLCAndXNlcicsIDExXSwge3JlbGF0aXZlVG86IHJvdXRlLCBza2lwTG9jYXRpb25DaGFuZ2U6IHRydWV9KTtcbiAgICogYGBgXG4gICAqXG4gICAqIEluIG9wcG9zaXRlIHRvIGBuYXZpZ2F0ZUJ5VXJsYCwgYG5hdmlnYXRlYCBhbHdheXMgdGFrZXMgYSBkZWx0YSB0aGF0IGlzIGFwcGxpZWQgdG8gdGhlIGN1cnJlbnRcbiAgICogVVJMLlxuICAgKi9cbiAgbmF2aWdhdGUoY29tbWFuZHM6IGFueVtdLCBleHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7c2tpcExvY2F0aW9uQ2hhbmdlOiBmYWxzZX0pOlxuICAgICAgUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdmFsaWRhdGVDb21tYW5kcyhjb21tYW5kcyk7XG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGVCeVVybCh0aGlzLmNyZWF0ZVVybFRyZWUoY29tbWFuZHMsIGV4dHJhcyksIGV4dHJhcyk7XG4gIH1cblxuICAvKiogU2VyaWFsaXplcyBhIGBVcmxUcmVlYCBpbnRvIGEgc3RyaW5nICovXG4gIHNlcmlhbGl6ZVVybCh1cmw6IFVybFRyZWUpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy51cmxTZXJpYWxpemVyLnNlcmlhbGl6ZSh1cmwpOyB9XG5cbiAgLyoqIFBhcnNlcyBhIHN0cmluZyBpbnRvIGEgYFVybFRyZWVgICovXG4gIHBhcnNlVXJsKHVybDogc3RyaW5nKTogVXJsVHJlZSB7XG4gICAgbGV0IHVybFRyZWU6IFVybFRyZWU7XG4gICAgdHJ5IHtcbiAgICAgIHVybFRyZWUgPSB0aGlzLnVybFNlcmlhbGl6ZXIucGFyc2UodXJsKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB1cmxUcmVlID0gdGhpcy5tYWxmb3JtZWRVcmlFcnJvckhhbmRsZXIoZSwgdGhpcy51cmxTZXJpYWxpemVyLCB1cmwpO1xuICAgIH1cbiAgICByZXR1cm4gdXJsVHJlZTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHVybCBpcyBhY3RpdmF0ZWQgKi9cbiAgaXNBY3RpdmUodXJsOiBzdHJpbmd8VXJsVHJlZSwgZXhhY3Q6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBpZiAodXJsIGluc3RhbmNlb2YgVXJsVHJlZSkge1xuICAgICAgcmV0dXJuIGNvbnRhaW5zVHJlZSh0aGlzLmN1cnJlbnRVcmxUcmVlLCB1cmwsIGV4YWN0KTtcbiAgICB9XG5cbiAgICBjb25zdCB1cmxUcmVlID0gdGhpcy5wYXJzZVVybCh1cmwpO1xuICAgIHJldHVybiBjb250YWluc1RyZWUodGhpcy5jdXJyZW50VXJsVHJlZSwgdXJsVHJlZSwgZXhhY3QpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVFbXB0eVByb3BzKHBhcmFtczogUGFyYW1zKTogUGFyYW1zIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocGFyYW1zKS5yZWR1Y2UoKHJlc3VsdDogUGFyYW1zLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdmFsdWU6IGFueSA9IHBhcmFtc1trZXldO1xuICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9jZXNzTmF2aWdhdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5uYXZpZ2F0aW9uc1xuICAgICAgICAucGlwZShjb25jYXRNYXAoKG5hdjogTmF2aWdhdGlvblBhcmFtcykgPT4ge1xuICAgICAgICAgIGlmIChuYXYpIHtcbiAgICAgICAgICAgIHRoaXMuZXhlY3V0ZVNjaGVkdWxlZE5hdmlnYXRpb24obmF2KTtcbiAgICAgICAgICAgIC8vIGEgZmFpbGVkIG5hdmlnYXRpb24gc2hvdWxkIG5vdCBzdG9wIHRoZSByb3V0ZXIgZnJvbSBwcm9jZXNzaW5nXG4gICAgICAgICAgICAvLyBmdXJ0aGVyIG5hdmlnYXRpb25zID0+IHRoZSBjYXRjaFxuICAgICAgICAgICAgcmV0dXJuIG5hdi5wcm9taXNlLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDxhbnk+b2YgKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge30pO1xuICB9XG5cbiAgcHJpdmF0ZSBzY2hlZHVsZU5hdmlnYXRpb24oXG4gICAgICByYXdVcmw6IFVybFRyZWUsIHNvdXJjZTogTmF2aWdhdGlvblRyaWdnZXIsIHN0YXRlOiB7bmF2aWdhdGlvbklkOiBudW1iZXJ9fG51bGwsXG4gICAgICBleHRyYXM6IE5hdmlnYXRpb25FeHRyYXMpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBsYXN0TmF2aWdhdGlvbiA9IHRoaXMubmF2aWdhdGlvbnMudmFsdWU7XG4gICAgLy8gSWYgdGhlIHVzZXIgdHJpZ2dlcnMgYSBuYXZpZ2F0aW9uIGltcGVyYXRpdmVseSAoZS5nLiwgYnkgdXNpbmcgbmF2aWdhdGVCeVVybCksXG4gICAgLy8gYW5kIHRoYXQgbmF2aWdhdGlvbiByZXN1bHRzIGluICdyZXBsYWNlU3RhdGUnIHRoYXQgbGVhZHMgdG8gdGhlIHNhbWUgVVJMLFxuICAgIC8vIHdlIHNob3VsZCBza2lwIHRob3NlLlxuICAgIGlmIChsYXN0TmF2aWdhdGlvbiAmJiBzb3VyY2UgIT09ICdpbXBlcmF0aXZlJyAmJiBsYXN0TmF2aWdhdGlvbi5zb3VyY2UgPT09ICdpbXBlcmF0aXZlJyAmJlxuICAgICAgICBsYXN0TmF2aWdhdGlvbi5yYXdVcmwudG9TdHJpbmcoKSA9PT0gcmF3VXJsLnRvU3RyaW5nKCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7ICAvLyByZXR1cm4gdmFsdWUgaXMgbm90IHVzZWRcbiAgICB9XG5cbiAgICAvLyBCZWNhdXNlIG9mIGEgYnVnIGluIElFIGFuZCBFZGdlLCB0aGUgbG9jYXRpb24gY2xhc3MgZmlyZXMgdHdvIGV2ZW50cyAocG9wc3RhdGUgYW5kXG4gICAgLy8gaGFzaGNoYW5nZSkgZXZlcnkgc2luZ2xlIHRpbWUuIFRoZSBzZWNvbmQgb25lIHNob3VsZCBiZSBpZ25vcmVkLiBPdGhlcndpc2UsIHRoZSBVUkwgd2lsbFxuICAgIC8vIGZsaWNrZXIuIEhhbmRsZXMgdGhlIGNhc2Ugd2hlbiBhIHBvcHN0YXRlIHdhcyBlbWl0dGVkIGZpcnN0LlxuICAgIGlmIChsYXN0TmF2aWdhdGlvbiAmJiBzb3VyY2UgPT0gJ2hhc2hjaGFuZ2UnICYmIGxhc3ROYXZpZ2F0aW9uLnNvdXJjZSA9PT0gJ3BvcHN0YXRlJyAmJlxuICAgICAgICBsYXN0TmF2aWdhdGlvbi5yYXdVcmwudG9TdHJpbmcoKSA9PT0gcmF3VXJsLnRvU3RyaW5nKCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7ICAvLyByZXR1cm4gdmFsdWUgaXMgbm90IHVzZWRcbiAgICB9XG4gICAgLy8gQmVjYXVzZSBvZiBhIGJ1ZyBpbiBJRSBhbmQgRWRnZSwgdGhlIGxvY2F0aW9uIGNsYXNzIGZpcmVzIHR3byBldmVudHMgKHBvcHN0YXRlIGFuZFxuICAgIC8vIGhhc2hjaGFuZ2UpIGV2ZXJ5IHNpbmdsZSB0aW1lLiBUaGUgc2Vjb25kIG9uZSBzaG91bGQgYmUgaWdub3JlZC4gT3RoZXJ3aXNlLCB0aGUgVVJMIHdpbGxcbiAgICAvLyBmbGlja2VyLiBIYW5kbGVzIHRoZSBjYXNlIHdoZW4gYSBoYXNoY2hhbmdlIHdhcyBlbWl0dGVkIGZpcnN0LlxuICAgIGlmIChsYXN0TmF2aWdhdGlvbiAmJiBzb3VyY2UgPT0gJ3BvcHN0YXRlJyAmJiBsYXN0TmF2aWdhdGlvbi5zb3VyY2UgPT09ICdoYXNoY2hhbmdlJyAmJlxuICAgICAgICBsYXN0TmF2aWdhdGlvbi5yYXdVcmwudG9TdHJpbmcoKSA9PT0gcmF3VXJsLnRvU3RyaW5nKCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7ICAvLyByZXR1cm4gdmFsdWUgaXMgbm90IHVzZWRcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZTogYW55ID0gbnVsbDtcbiAgICBsZXQgcmVqZWN0OiBhbnkgPSBudWxsO1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXMsIHJlaikgPT4ge1xuICAgICAgcmVzb2x2ZSA9IHJlcztcbiAgICAgIHJlamVjdCA9IHJlajtcbiAgICB9KTtcblxuICAgIGNvbnN0IGlkID0gKyt0aGlzLm5hdmlnYXRpb25JZDtcbiAgICB0aGlzLm5hdmlnYXRpb25zLm5leHQoe2lkLCBzb3VyY2UsIHN0YXRlLCByYXdVcmwsIGV4dHJhcywgcmVzb2x2ZSwgcmVqZWN0LCBwcm9taXNlfSk7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgZXJyb3IgaXMgcHJvcGFnYXRlZCBldmVuIHRob3VnaCBgcHJvY2Vzc05hdmlnYXRpb25zYCBjYXRjaFxuICAgIC8vIGhhbmRsZXIgZG9lcyBub3QgcmV0aHJvd1xuICAgIHJldHVybiBwcm9taXNlLmNhdGNoKChlOiBhbnkpID0+IFByb21pc2UucmVqZWN0KGUpKTtcbiAgfVxuXG4gIHByaXZhdGUgZXhlY3V0ZVNjaGVkdWxlZE5hdmlnYXRpb24oe2lkLCByYXdVcmwsIGV4dHJhcywgcmVzb2x2ZSwgcmVqZWN0LCBzb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlfTogTmF2aWdhdGlvblBhcmFtcyk6IHZvaWQge1xuICAgIGNvbnN0IHVybCA9IHRoaXMudXJsSGFuZGxpbmdTdHJhdGVneS5leHRyYWN0KHJhd1VybCk7XG4gICAgY29uc3QgdXJsVHJhbnNpdGlvbiA9ICF0aGlzLm5hdmlnYXRlZCB8fCB1cmwudG9TdHJpbmcoKSAhPT0gdGhpcy5jdXJyZW50VXJsVHJlZS50b1N0cmluZygpO1xuXG4gICAgaWYgKCh0aGlzLm9uU2FtZVVybE5hdmlnYXRpb24gPT09ICdyZWxvYWQnID8gdHJ1ZSA6IHVybFRyYW5zaXRpb24pICYmXG4gICAgICAgIHRoaXMudXJsSGFuZGxpbmdTdHJhdGVneS5zaG91bGRQcm9jZXNzVXJsKHJhd1VybCkpIHtcbiAgICAgIGlmICh0aGlzLnVybFVwZGF0ZVN0cmF0ZWd5ID09PSAnZWFnZXInICYmICFleHRyYXMuc2tpcExvY2F0aW9uQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuc2V0QnJvd3NlclVybChyYXdVcmwsICEhZXh0cmFzLnJlcGxhY2VVcmwsIGlkKTtcbiAgICAgIH1cbiAgICAgICh0aGlzLmV2ZW50cyBhcyBTdWJqZWN0PEV2ZW50PilcbiAgICAgICAgICAubmV4dChuZXcgTmF2aWdhdGlvblN0YXJ0KGlkLCB0aGlzLnNlcmlhbGl6ZVVybCh1cmwpLCBzb3VyY2UsIHN0YXRlKSk7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAoXykgPT4gdGhpcy5ydW5OYXZpZ2F0ZShcbiAgICAgICAgICAgICAgICAgIHVybCwgcmF3VXJsLCAhIWV4dHJhcy5za2lwTG9jYXRpb25DaGFuZ2UsICEhZXh0cmFzLnJlcGxhY2VVcmwsIGlkLCBudWxsKSlcbiAgICAgICAgICAudGhlbihyZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAvLyB3ZSBjYW5ub3QgcHJvY2VzcyB0aGUgY3VycmVudCBVUkwsIGJ1dCB3ZSBjb3VsZCBwcm9jZXNzIHRoZSBwcmV2aW91cyBvbmUgPT5cbiAgICAgIC8vIHdlIG5lZWQgdG8gZG8gc29tZSBjbGVhbnVwXG4gICAgfSBlbHNlIGlmIChcbiAgICAgICAgdXJsVHJhbnNpdGlvbiAmJiB0aGlzLnJhd1VybFRyZWUgJiZcbiAgICAgICAgdGhpcy51cmxIYW5kbGluZ1N0cmF0ZWd5LnNob3VsZFByb2Nlc3NVcmwodGhpcy5yYXdVcmxUcmVlKSkge1xuICAgICAgKHRoaXMuZXZlbnRzIGFzIFN1YmplY3Q8RXZlbnQ+KVxuICAgICAgICAgIC5uZXh0KG5ldyBOYXZpZ2F0aW9uU3RhcnQoaWQsIHRoaXMuc2VyaWFsaXplVXJsKHVybCksIHNvdXJjZSwgc3RhdGUpKTtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAgIChfKSA9PiB0aGlzLnJ1bk5hdmlnYXRlKFxuICAgICAgICAgICAgICAgICAgdXJsLCByYXdVcmwsIGZhbHNlLCBmYWxzZSwgaWQsXG4gICAgICAgICAgICAgICAgICBjcmVhdGVFbXB0eVN0YXRlKHVybCwgdGhpcy5yb290Q29tcG9uZW50VHlwZSkuc25hcHNob3QpKVxuICAgICAgICAgIC50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYXdVcmxUcmVlID0gcmF3VXJsO1xuICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJ1bk5hdmlnYXRlKFxuICAgICAgdXJsOiBVcmxUcmVlLCByYXdVcmw6IFVybFRyZWUsIHNraXBMb2NhdGlvbkNoYW5nZTogYm9vbGVhbiwgcmVwbGFjZVVybDogYm9vbGVhbiwgaWQ6IG51bWJlcixcbiAgICAgIHByZWNyZWF0ZWRTdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdHxudWxsKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKGlkICE9PSB0aGlzLm5hdmlnYXRpb25JZCkge1xuICAgICAgKHRoaXMuZXZlbnRzIGFzIFN1YmplY3Q8RXZlbnQ+KVxuICAgICAgICAgIC5uZXh0KG5ldyBOYXZpZ2F0aW9uQ2FuY2VsKFxuICAgICAgICAgICAgICBpZCwgdGhpcy5zZXJpYWxpemVVcmwodXJsKSxcbiAgICAgICAgICAgICAgYE5hdmlnYXRpb24gSUQgJHtpZH0gaXMgbm90IGVxdWFsIHRvIHRoZSBjdXJyZW50IG5hdmlnYXRpb24gaWQgJHt0aGlzLm5hdmlnYXRpb25JZH1gKSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmVQcm9taXNlLCByZWplY3RQcm9taXNlKSA9PiB7XG4gICAgICAvLyBjcmVhdGUgYW4gb2JzZXJ2YWJsZSBvZiB0aGUgdXJsIGFuZCByb3V0ZSBzdGF0ZSBzbmFwc2hvdFxuICAgICAgLy8gdGhpcyBvcGVyYXRpb24gZG8gbm90IHJlc3VsdCBpbiBhbnkgc2lkZSBlZmZlY3RzXG4gICAgICBsZXQgdXJsQW5kU25hcHNob3QkOiBPYnNlcnZhYmxlPE5hdlN0cmVhbVZhbHVlPjtcbiAgICAgIGlmICghcHJlY3JlYXRlZFN0YXRlKSB7XG4gICAgICAgIGNvbnN0IG1vZHVsZUluamVjdG9yID0gdGhpcy5uZ01vZHVsZS5pbmplY3RvcjtcbiAgICAgICAgY29uc3QgcmVkaXJlY3RzQXBwbGllZCQgPVxuICAgICAgICAgICAgYXBwbHlSZWRpcmVjdHMobW9kdWxlSW5qZWN0b3IsIHRoaXMuY29uZmlnTG9hZGVyLCB0aGlzLnVybFNlcmlhbGl6ZXIsIHVybCwgdGhpcy5jb25maWcpO1xuXG4gICAgICAgIHVybEFuZFNuYXBzaG90JCA9IHJlZGlyZWN0c0FwcGxpZWQkLnBpcGUobWVyZ2VNYXAoKGFwcGxpZWRVcmw6IFVybFRyZWUpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVjb2duaXplKFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Q29tcG9uZW50VHlwZSwgdGhpcy5jb25maWcsIGFwcGxpZWRVcmwsIHRoaXMuc2VyaWFsaXplVXJsKGFwcGxpZWRVcmwpLFxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5LCB0aGlzLnJlbGF0aXZlTGlua1Jlc29sdXRpb24pXG4gICAgICAgICAgICAgIC5waXBlKG1hcCgoc25hcHNob3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICh0aGlzLmV2ZW50cyBhcyBTdWJqZWN0PEV2ZW50PilcbiAgICAgICAgICAgICAgICAgICAgLm5leHQobmV3IFJvdXRlc1JlY29nbml6ZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCwgdGhpcy5zZXJpYWxpemVVcmwodXJsKSwgdGhpcy5zZXJpYWxpemVVcmwoYXBwbGllZFVybCksIHNuYXBzaG90KSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge2FwcGxpZWRVcmwsIHNuYXBzaG90fTtcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmxBbmRTbmFwc2hvdCQgPSBvZiAoe2FwcGxpZWRVcmw6IHVybCwgc25hcHNob3Q6IHByZWNyZWF0ZWRTdGF0ZX0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiZWZvcmVQcmVhY3RpdmF0aW9uRG9uZSQgPVxuICAgICAgICAgIHVybEFuZFNuYXBzaG90JC5waXBlKG1lcmdlTWFwKChwKTogT2JzZXJ2YWJsZTxOYXZTdHJlYW1WYWx1ZT4gPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwID09PSAnYm9vbGVhbicpIHJldHVybiBvZiAocCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ob29rc1xuICAgICAgICAgICAgICAgIC5iZWZvcmVQcmVhY3RpdmF0aW9uKHAuc25hcHNob3QsIHtcbiAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25JZDogaWQsXG4gICAgICAgICAgICAgICAgICBhcHBsaWVkVXJsVHJlZTogdXJsLFxuICAgICAgICAgICAgICAgICAgcmF3VXJsVHJlZTogcmF3VXJsLCBza2lwTG9jYXRpb25DaGFuZ2UsIHJlcGxhY2VVcmwsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAucGlwZShtYXAoKCkgPT4gcCkpO1xuICAgICAgICAgIH0pKTtcblxuICAgICAgLy8gcnVuIHByZWFjdGl2YXRpb246IGd1YXJkcyBhbmQgZGF0YSByZXNvbHZlcnNcbiAgICAgIGxldCBwcmVBY3RpdmF0aW9uOiBQcmVBY3RpdmF0aW9uO1xuXG4gICAgICBjb25zdCBwcmVhY3RpdmF0aW9uU2V0dXAkID0gYmVmb3JlUHJlYWN0aXZhdGlvbkRvbmUkLnBpcGUobWFwKChwKTogTmF2U3RyZWFtVmFsdWUgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHAgPT09ICdib29sZWFuJykgcmV0dXJuIHA7XG4gICAgICAgIGNvbnN0IHthcHBsaWVkVXJsLCBzbmFwc2hvdH0gPSBwO1xuICAgICAgICBjb25zdCBtb2R1bGVJbmplY3RvciA9IHRoaXMubmdNb2R1bGUuaW5qZWN0b3I7XG4gICAgICAgIHByZUFjdGl2YXRpb24gPSBuZXcgUHJlQWN0aXZhdGlvbihcbiAgICAgICAgICAgIHNuYXBzaG90LCB0aGlzLnJvdXRlclN0YXRlLnNuYXBzaG90LCBtb2R1bGVJbmplY3RvcixcbiAgICAgICAgICAgIChldnQ6IEV2ZW50KSA9PiB0aGlzLnRyaWdnZXJFdmVudChldnQpKTtcbiAgICAgICAgcHJlQWN0aXZhdGlvbi5pbml0aWFsaXplKHRoaXMucm9vdENvbnRleHRzKTtcbiAgICAgICAgcmV0dXJuIHthcHBsaWVkVXJsLCBzbmFwc2hvdH07XG4gICAgICB9KSk7XG5cbiAgICAgIGNvbnN0IHByZWFjdGl2YXRpb25DaGVja0d1YXJkcyQgPVxuICAgICAgICAgIHByZWFjdGl2YXRpb25TZXR1cCQucGlwZShtZXJnZU1hcCgocCk6IE9ic2VydmFibGU8TmF2U3RyZWFtVmFsdWU+ID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcCA9PT0gJ2Jvb2xlYW4nIHx8IHRoaXMubmF2aWdhdGlvbklkICE9PSBpZCkgcmV0dXJuIG9mIChmYWxzZSk7XG4gICAgICAgICAgICBjb25zdCB7YXBwbGllZFVybCwgc25hcHNob3R9ID0gcDtcblxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IEd1YXJkc0NoZWNrU3RhcnQoXG4gICAgICAgICAgICAgICAgaWQsIHRoaXMuc2VyaWFsaXplVXJsKHVybCksIHRoaXMuc2VyaWFsaXplVXJsKGFwcGxpZWRVcmwpLCBzbmFwc2hvdCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJlQWN0aXZhdGlvbi5jaGVja0d1YXJkcygpLnBpcGUobWFwKChzaG91bGRBY3RpdmF0ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgR3VhcmRzQ2hlY2tFbmQoXG4gICAgICAgICAgICAgICAgICBpZCwgdGhpcy5zZXJpYWxpemVVcmwodXJsKSwgdGhpcy5zZXJpYWxpemVVcmwoYXBwbGllZFVybCksIHNuYXBzaG90LFxuICAgICAgICAgICAgICAgICAgc2hvdWxkQWN0aXZhdGUpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHthcHBsaWVkVXJsOiBhcHBsaWVkVXJsLCBzbmFwc2hvdDogc25hcHNob3QsIHNob3VsZEFjdGl2YXRlOiBzaG91bGRBY3RpdmF0ZX07XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSkpO1xuXG4gICAgICBjb25zdCBwcmVhY3RpdmF0aW9uUmVzb2x2ZURhdGEkID1cbiAgICAgICAgICBwcmVhY3RpdmF0aW9uQ2hlY2tHdWFyZHMkLnBpcGUobWVyZ2VNYXAoKHApOiBPYnNlcnZhYmxlPE5hdlN0cmVhbVZhbHVlPiA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHAgPT09ICdib29sZWFuJyB8fCB0aGlzLm5hdmlnYXRpb25JZCAhPT0gaWQpIHJldHVybiBvZiAoZmFsc2UpO1xuXG4gICAgICAgICAgICBpZiAocC5zaG91bGRBY3RpdmF0ZSAmJiBwcmVBY3RpdmF0aW9uLmlzQWN0aXZhdGluZygpKSB7XG4gICAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG5ldyBSZXNvbHZlU3RhcnQoXG4gICAgICAgICAgICAgICAgICBpZCwgdGhpcy5zZXJpYWxpemVVcmwodXJsKSwgdGhpcy5zZXJpYWxpemVVcmwocC5hcHBsaWVkVXJsKSwgcC5zbmFwc2hvdCkpO1xuICAgICAgICAgICAgICByZXR1cm4gcHJlQWN0aXZhdGlvbi5yZXNvbHZlRGF0YSh0aGlzLnBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3kpLnBpcGUobWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgUmVzb2x2ZUVuZChcbiAgICAgICAgICAgICAgICAgICAgaWQsIHRoaXMuc2VyaWFsaXplVXJsKHVybCksIHRoaXMuc2VyaWFsaXplVXJsKHAuYXBwbGllZFVybCksIHAuc25hcHNob3QpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9mIChwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG5cbiAgICAgIGNvbnN0IHByZWFjdGl2YXRpb25Eb25lJCA9XG4gICAgICAgICAgcHJlYWN0aXZhdGlvblJlc29sdmVEYXRhJC5waXBlKG1lcmdlTWFwKChwKTogT2JzZXJ2YWJsZTxOYXZTdHJlYW1WYWx1ZT4gPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwID09PSAnYm9vbGVhbicgfHwgdGhpcy5uYXZpZ2F0aW9uSWQgIT09IGlkKSByZXR1cm4gb2YgKGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhvb2tzXG4gICAgICAgICAgICAgICAgLmFmdGVyUHJlYWN0aXZhdGlvbihwLnNuYXBzaG90LCB7XG4gICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uSWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgYXBwbGllZFVybFRyZWU6IHVybCxcbiAgICAgICAgICAgICAgICAgIHJhd1VybFRyZWU6IHJhd1VybCwgc2tpcExvY2F0aW9uQ2hhbmdlLCByZXBsYWNlVXJsLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnBpcGUobWFwKCgpID0+IHApKTtcbiAgICAgICAgICB9KSk7XG5cblxuICAgICAgLy8gY3JlYXRlIHJvdXRlciBzdGF0ZVxuICAgICAgLy8gdGhpcyBvcGVyYXRpb24gaGFzIHNpZGUgZWZmZWN0cyA9PiByb3V0ZSBzdGF0ZSBpcyBiZWluZyBhZmZlY3RlZFxuICAgICAgY29uc3Qgcm91dGVyU3RhdGUkID0gcHJlYWN0aXZhdGlvbkRvbmUkLnBpcGUobWFwKChwKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgcCA9PT0gJ2Jvb2xlYW4nIHx8IHRoaXMubmF2aWdhdGlvbklkICE9PSBpZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCB7YXBwbGllZFVybCwgc25hcHNob3QsIHNob3VsZEFjdGl2YXRlfSA9IHA7XG4gICAgICAgIGlmIChzaG91bGRBY3RpdmF0ZSkge1xuICAgICAgICAgIGNvbnN0IHN0YXRlID0gY3JlYXRlUm91dGVyU3RhdGUodGhpcy5yb3V0ZVJldXNlU3RyYXRlZ3ksIHNuYXBzaG90LCB0aGlzLnJvdXRlclN0YXRlKTtcbiAgICAgICAgICByZXR1cm4ge2FwcGxpZWRVcmwsIHN0YXRlLCBzaG91bGRBY3RpdmF0ZX07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHthcHBsaWVkVXJsLCBzdGF0ZTogbnVsbCwgc2hvdWxkQWN0aXZhdGV9O1xuICAgICAgICB9XG4gICAgICB9KSk7XG5cblxuICAgICAgdGhpcy5hY3RpdmF0ZVJvdXRlcyhcbiAgICAgICAgICByb3V0ZXJTdGF0ZSQsIHRoaXMucm91dGVyU3RhdGUsIHRoaXMuY3VycmVudFVybFRyZWUsIGlkLCB1cmwsIHJhd1VybCwgc2tpcExvY2F0aW9uQ2hhbmdlLFxuICAgICAgICAgIHJlcGxhY2VVcmwsIHJlc29sdmVQcm9taXNlLCByZWplY3RQcm9taXNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyB0aGUgbG9naWMgb2YgYWN0aXZhdGluZyByb3V0ZXMuIFRoaXMgaXMgYSBzeW5jaHJvbm91cyBwcm9jZXNzIGJ5IGRlZmF1bHQuIFdoaWxlIHRoaXNcbiAgICogaXMgYSBwcml2YXRlIG1ldGhvZCwgaXQgY291bGQgYmUgb3ZlcnJpZGRlbiB0byBtYWtlIGFjdGl2YXRpb24gYXN5bmNocm9ub3VzLlxuICAgKi9cbiAgcHJpdmF0ZSBhY3RpdmF0ZVJvdXRlcyhcbiAgICAgIHN0YXRlOiBPYnNlcnZhYmxlPGZhbHNlfFxuICAgICAgICAgICAgICAgICAgICAgICAge2FwcGxpZWRVcmw6IFVybFRyZWUsIHN0YXRlOiBSb3V0ZXJTdGF0ZXxudWxsLCBzaG91bGRBY3RpdmF0ZT86IGJvb2xlYW59PixcbiAgICAgIHN0b3JlZFN0YXRlOiBSb3V0ZXJTdGF0ZSwgc3RvcmVkVXJsOiBVcmxUcmVlLCBpZDogbnVtYmVyLCB1cmw6IFVybFRyZWUsIHJhd1VybDogVXJsVHJlZSxcbiAgICAgIHNraXBMb2NhdGlvbkNoYW5nZTogYm9vbGVhbiwgcmVwbGFjZVVybDogYm9vbGVhbiwgcmVzb2x2ZVByb21pc2U6IGFueSwgcmVqZWN0UHJvbWlzZTogYW55KSB7XG4gICAgLy8gYXBwbGllZCB0aGUgbmV3IHJvdXRlciBzdGF0ZVxuICAgIC8vIHRoaXMgb3BlcmF0aW9uIGhhcyBzaWRlIGVmZmVjdHNcbiAgICBsZXQgbmF2aWdhdGlvbklzU3VjY2Vzc2Z1bDogYm9vbGVhbjtcblxuICAgIHN0YXRlXG4gICAgICAgIC5mb3JFYWNoKChwKSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBwID09PSAnYm9vbGVhbicgfHwgIXAuc2hvdWxkQWN0aXZhdGUgfHwgaWQgIT09IHRoaXMubmF2aWdhdGlvbklkIHx8ICFwLnN0YXRlKSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uSXNTdWNjZXNzZnVsID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHthcHBsaWVkVXJsLCBzdGF0ZX0gPSBwO1xuICAgICAgICAgIHRoaXMuY3VycmVudFVybFRyZWUgPSBhcHBsaWVkVXJsO1xuICAgICAgICAgIHRoaXMucmF3VXJsVHJlZSA9IHRoaXMudXJsSGFuZGxpbmdTdHJhdGVneS5tZXJnZSh0aGlzLmN1cnJlbnRVcmxUcmVlLCByYXdVcmwpO1xuXG4gICAgICAgICAgKHRoaXMgYXN7cm91dGVyU3RhdGU6IFJvdXRlclN0YXRlfSkucm91dGVyU3RhdGUgPSBzdGF0ZTtcblxuICAgICAgICAgIGlmICh0aGlzLnVybFVwZGF0ZVN0cmF0ZWd5ID09PSAnZGVmZXJyZWQnICYmICFza2lwTG9jYXRpb25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QnJvd3NlclVybCh0aGlzLnJhd1VybFRyZWUsIHJlcGxhY2VVcmwsIGlkKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXcgQWN0aXZhdGVSb3V0ZXMoXG4gICAgICAgICAgICAgIHRoaXMucm91dGVSZXVzZVN0cmF0ZWd5LCBzdGF0ZSwgc3RvcmVkU3RhdGUsIChldnQ6IEV2ZW50KSA9PiB0aGlzLnRyaWdnZXJFdmVudChldnQpKVxuICAgICAgICAgICAgICAuYWN0aXZhdGUodGhpcy5yb290Q29udGV4dHMpO1xuXG4gICAgICAgICAgbmF2aWdhdGlvbklzU3VjY2Vzc2Z1bCA9IHRydWU7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAobmF2aWdhdGlvbklzU3VjY2Vzc2Z1bCkge1xuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RTdWNjZXNzZnVsSWQgPSBpZDtcbiAgICAgICAgICAgICAgICAodGhpcy5ldmVudHMgYXMgU3ViamVjdDxFdmVudD4pXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KG5ldyBOYXZpZ2F0aW9uRW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQsIHRoaXMuc2VyaWFsaXplVXJsKHVybCksIHRoaXMuc2VyaWFsaXplVXJsKHRoaXMuY3VycmVudFVybFRyZWUpKSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UodHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFVybFRvQ3VycmVudFVybFRyZWUoKTtcbiAgICAgICAgICAgICAgICAodGhpcy5ldmVudHMgYXMgU3ViamVjdDxFdmVudD4pXG4gICAgICAgICAgICAgICAgICAgIC5uZXh0KG5ldyBOYXZpZ2F0aW9uQ2FuY2VsKGlkLCB0aGlzLnNlcmlhbGl6ZVVybCh1cmwpLCAnJykpO1xuICAgICAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGlzTmF2aWdhdGlvbkNhbmNlbGluZ0Vycm9yKGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRTdGF0ZUFuZFVybChzdG9yZWRTdGF0ZSwgc3RvcmVkVXJsLCByYXdVcmwpO1xuICAgICAgICAgICAgICAgICh0aGlzLmV2ZW50cyBhcyBTdWJqZWN0PEV2ZW50PilcbiAgICAgICAgICAgICAgICAgICAgLm5leHQobmV3IE5hdmlnYXRpb25DYW5jZWwoaWQsIHRoaXMuc2VyaWFsaXplVXJsKHVybCksIGUubWVzc2FnZSkpO1xuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UoZmFsc2UpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRTdGF0ZUFuZFVybChzdG9yZWRTdGF0ZSwgc3RvcmVkVXJsLCByYXdVcmwpO1xuICAgICAgICAgICAgICAgICh0aGlzLmV2ZW50cyBhcyBTdWJqZWN0PEV2ZW50PilcbiAgICAgICAgICAgICAgICAgICAgLm5leHQobmV3IE5hdmlnYXRpb25FcnJvcihpZCwgdGhpcy5zZXJpYWxpemVVcmwodXJsKSwgZSkpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlUHJvbWlzZSh0aGlzLmVycm9ySGFuZGxlcihlKSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZWUpIHtcbiAgICAgICAgICAgICAgICAgIHJlamVjdFByb21pc2UoZWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldEJyb3dzZXJVcmwodXJsOiBVcmxUcmVlLCByZXBsYWNlVXJsOiBib29sZWFuLCBpZDogbnVtYmVyKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMudXJsU2VyaWFsaXplci5zZXJpYWxpemUodXJsKTtcbiAgICBpZiAodGhpcy5sb2NhdGlvbi5pc0N1cnJlbnRQYXRoRXF1YWxUbyhwYXRoKSB8fCByZXBsYWNlVXJsKSB7XG4gICAgICB0aGlzLmxvY2F0aW9uLnJlcGxhY2VTdGF0ZShwYXRoLCAnJywge25hdmlnYXRpb25JZDogaWR9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2NhdGlvbi5nbyhwYXRoLCAnJywge25hdmlnYXRpb25JZDogaWR9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2V0U3RhdGVBbmRVcmwoc3RvcmVkU3RhdGU6IFJvdXRlclN0YXRlLCBzdG9yZWRVcmw6IFVybFRyZWUsIHJhd1VybDogVXJsVHJlZSk6IHZvaWQge1xuICAgICh0aGlzIGFze3JvdXRlclN0YXRlOiBSb3V0ZXJTdGF0ZX0pLnJvdXRlclN0YXRlID0gc3RvcmVkU3RhdGU7XG4gICAgdGhpcy5jdXJyZW50VXJsVHJlZSA9IHN0b3JlZFVybDtcbiAgICB0aGlzLnJhd1VybFRyZWUgPSB0aGlzLnVybEhhbmRsaW5nU3RyYXRlZ3kubWVyZ2UodGhpcy5jdXJyZW50VXJsVHJlZSwgcmF3VXJsKTtcbiAgICB0aGlzLnJlc2V0VXJsVG9DdXJyZW50VXJsVHJlZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFVybFRvQ3VycmVudFVybFRyZWUoKTogdm9pZCB7XG4gICAgdGhpcy5sb2NhdGlvbi5yZXBsYWNlU3RhdGUoXG4gICAgICAgIHRoaXMudXJsU2VyaWFsaXplci5zZXJpYWxpemUodGhpcy5yYXdVcmxUcmVlKSwgJycsIHtuYXZpZ2F0aW9uSWQ6IHRoaXMubGFzdFN1Y2Nlc3NmdWxJZH0pO1xuICB9XG59XG5cbmNsYXNzIEFjdGl2YXRlUm91dGVzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvdXRlUmV1c2VTdHJhdGVneTogUm91dGVSZXVzZVN0cmF0ZWd5LCBwcml2YXRlIGZ1dHVyZVN0YXRlOiBSb3V0ZXJTdGF0ZSxcbiAgICAgIHByaXZhdGUgY3VyclN0YXRlOiBSb3V0ZXJTdGF0ZSwgcHJpdmF0ZSBmb3J3YXJkRXZlbnQ6IChldnQ6IEV2ZW50KSA9PiB2b2lkKSB7fVxuXG4gIGFjdGl2YXRlKHBhcmVudENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzKTogdm9pZCB7XG4gICAgY29uc3QgZnV0dXJlUm9vdCA9IHRoaXMuZnV0dXJlU3RhdGUuX3Jvb3Q7XG4gICAgY29uc3QgY3VyclJvb3QgPSB0aGlzLmN1cnJTdGF0ZSA/IHRoaXMuY3VyclN0YXRlLl9yb290IDogbnVsbDtcblxuICAgIHRoaXMuZGVhY3RpdmF0ZUNoaWxkUm91dGVzKGZ1dHVyZVJvb3QsIGN1cnJSb290LCBwYXJlbnRDb250ZXh0cyk7XG4gICAgYWR2YW5jZUFjdGl2YXRlZFJvdXRlKHRoaXMuZnV0dXJlU3RhdGUucm9vdCk7XG4gICAgdGhpcy5hY3RpdmF0ZUNoaWxkUm91dGVzKGZ1dHVyZVJvb3QsIGN1cnJSb290LCBwYXJlbnRDb250ZXh0cyk7XG4gIH1cblxuICAvLyBEZS1hY3RpdmF0ZSB0aGUgY2hpbGQgcm91dGUgdGhhdCBhcmUgbm90IHJlLXVzZWQgZm9yIHRoZSBmdXR1cmUgc3RhdGVcbiAgcHJpdmF0ZSBkZWFjdGl2YXRlQ2hpbGRSb3V0ZXMoXG4gICAgICBmdXR1cmVOb2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4sIGN1cnJOb2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT58bnVsbCxcbiAgICAgIGNvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzKTogdm9pZCB7XG4gICAgY29uc3QgY2hpbGRyZW46IHtbb3V0bGV0TmFtZTogc3RyaW5nXTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+fSA9IG5vZGVDaGlsZHJlbkFzTWFwKGN1cnJOb2RlKTtcblxuICAgIC8vIFJlY3Vyc2Ugb24gdGhlIHJvdXRlcyBhY3RpdmUgaW4gdGhlIGZ1dHVyZSBzdGF0ZSB0byBkZS1hY3RpdmF0ZSBkZWVwZXIgY2hpbGRyZW5cbiAgICBmdXR1cmVOb2RlLmNoaWxkcmVuLmZvckVhY2goZnV0dXJlQ2hpbGQgPT4ge1xuICAgICAgY29uc3QgY2hpbGRPdXRsZXROYW1lID0gZnV0dXJlQ2hpbGQudmFsdWUub3V0bGV0O1xuICAgICAgdGhpcy5kZWFjdGl2YXRlUm91dGVzKGZ1dHVyZUNoaWxkLCBjaGlsZHJlbltjaGlsZE91dGxldE5hbWVdLCBjb250ZXh0cyk7XG4gICAgICBkZWxldGUgY2hpbGRyZW5bY2hpbGRPdXRsZXROYW1lXTtcbiAgICB9KTtcblxuICAgIC8vIERlLWFjdGl2YXRlIHRoZSByb3V0ZXMgdGhhdCB3aWxsIG5vdCBiZSByZS11c2VkXG4gICAgZm9yRWFjaChjaGlsZHJlbiwgKHY6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPiwgY2hpbGROYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZVJvdXRlQW5kSXRzQ2hpbGRyZW4odiwgY29udGV4dHMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWFjdGl2YXRlUm91dGVzKFxuICAgICAgZnV0dXJlTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+LCBjdXJyTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+LFxuICAgICAgcGFyZW50Q29udGV4dDogQ2hpbGRyZW5PdXRsZXRDb250ZXh0cyk6IHZvaWQge1xuICAgIGNvbnN0IGZ1dHVyZSA9IGZ1dHVyZU5vZGUudmFsdWU7XG4gICAgY29uc3QgY3VyciA9IGN1cnJOb2RlID8gY3Vyck5vZGUudmFsdWUgOiBudWxsO1xuXG4gICAgaWYgKGZ1dHVyZSA9PT0gY3Vycikge1xuICAgICAgLy8gUmV1c2luZyB0aGUgbm9kZSwgY2hlY2sgdG8gc2VlIGlmIHRoZSBjaGlsZHJlbiBuZWVkIHRvIGJlIGRlLWFjdGl2YXRlZFxuICAgICAgaWYgKGZ1dHVyZS5jb21wb25lbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIG5vcm1hbCByb3V0ZSwgd2UgbmVlZCB0byBnbyB0aHJvdWdoIGFuIG91dGxldC5cbiAgICAgICAgY29uc3QgY29udGV4dCA9IHBhcmVudENvbnRleHQuZ2V0Q29udGV4dChmdXR1cmUub3V0bGV0KTtcbiAgICAgICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVDaGlsZFJvdXRlcyhmdXR1cmVOb2RlLCBjdXJyTm9kZSwgY29udGV4dC5jaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHdlIGhhdmUgYSBjb21wb25lbnRsZXNzIHJvdXRlLCB3ZSByZWN1cnNlIGJ1dCBrZWVwIHRoZSBzYW1lIG91dGxldCBtYXAuXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZUNoaWxkUm91dGVzKGZ1dHVyZU5vZGUsIGN1cnJOb2RlLCBwYXJlbnRDb250ZXh0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGN1cnIpIHtcbiAgICAgICAgLy8gRGVhY3RpdmF0ZSB0aGUgY3VycmVudCByb3V0ZSB3aGljaCB3aWxsIG5vdCBiZSByZS11c2VkXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZVJvdXRlQW5kSXRzQ2hpbGRyZW4oY3Vyck5vZGUsIHBhcmVudENvbnRleHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGVhY3RpdmF0ZVJvdXRlQW5kSXRzQ2hpbGRyZW4oXG4gICAgICByb3V0ZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+LCBwYXJlbnRDb250ZXh0czogQ2hpbGRyZW5PdXRsZXRDb250ZXh0cyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJvdXRlUmV1c2VTdHJhdGVneS5zaG91bGREZXRhY2gocm91dGUudmFsdWUuc25hcHNob3QpKSB7XG4gICAgICB0aGlzLmRldGFjaEFuZFN0b3JlUm91dGVTdWJ0cmVlKHJvdXRlLCBwYXJlbnRDb250ZXh0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZVJvdXRlQW5kT3V0bGV0KHJvdXRlLCBwYXJlbnRDb250ZXh0cyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRhY2hBbmRTdG9yZVJvdXRlU3VidHJlZShcbiAgICAgIHJvdXRlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4sIHBhcmVudENvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzKTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dCA9IHBhcmVudENvbnRleHRzLmdldENvbnRleHQocm91dGUudmFsdWUub3V0bGV0KTtcbiAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Lm91dGxldCkge1xuICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gY29udGV4dC5vdXRsZXQuZGV0YWNoKCk7XG4gICAgICBjb25zdCBjb250ZXh0cyA9IGNvbnRleHQuY2hpbGRyZW4ub25PdXRsZXREZWFjdGl2YXRlZCgpO1xuICAgICAgdGhpcy5yb3V0ZVJldXNlU3RyYXRlZ3kuc3RvcmUocm91dGUudmFsdWUuc25hcHNob3QsIHtjb21wb25lbnRSZWYsIHJvdXRlLCBjb250ZXh0c30pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGVhY3RpdmF0ZVJvdXRlQW5kT3V0bGV0KFxuICAgICAgcm91dGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPiwgcGFyZW50Q29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHMpOiB2b2lkIHtcbiAgICBjb25zdCBjb250ZXh0ID0gcGFyZW50Q29udGV4dHMuZ2V0Q29udGV4dChyb3V0ZS52YWx1ZS5vdXRsZXQpO1xuXG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuOiB7W291dGxldE5hbWU6IHN0cmluZ106IGFueX0gPSBub2RlQ2hpbGRyZW5Bc01hcChyb3V0ZSk7XG4gICAgICBjb25zdCBjb250ZXh0cyA9IHJvdXRlLnZhbHVlLmNvbXBvbmVudCA/IGNvbnRleHQuY2hpbGRyZW4gOiBwYXJlbnRDb250ZXh0cztcblxuICAgICAgZm9yRWFjaChjaGlsZHJlbiwgKHY6IGFueSwgazogc3RyaW5nKSA9PiB0aGlzLmRlYWN0aXZhdGVSb3V0ZUFuZEl0c0NoaWxkcmVuKHYsIGNvbnRleHRzKSk7XG5cbiAgICAgIGlmIChjb250ZXh0Lm91dGxldCkge1xuICAgICAgICAvLyBEZXN0cm95IHRoZSBjb21wb25lbnRcbiAgICAgICAgY29udGV4dC5vdXRsZXQuZGVhY3RpdmF0ZSgpO1xuICAgICAgICAvLyBEZXN0cm95IHRoZSBjb250ZXh0cyBmb3IgYWxsIHRoZSBvdXRsZXRzIHRoYXQgd2VyZSBpbiB0aGUgY29tcG9uZW50XG4gICAgICAgIGNvbnRleHQuY2hpbGRyZW4ub25PdXRsZXREZWFjdGl2YXRlZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWN0aXZhdGVDaGlsZFJvdXRlcyhcbiAgICAgIGZ1dHVyZU5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPiwgY3Vyck5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPnxudWxsLFxuICAgICAgY29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHMpOiB2b2lkIHtcbiAgICBjb25zdCBjaGlsZHJlbjoge1tvdXRsZXQ6IHN0cmluZ106IGFueX0gPSBub2RlQ2hpbGRyZW5Bc01hcChjdXJyTm9kZSk7XG4gICAgZnV0dXJlTm9kZS5jaGlsZHJlbi5mb3JFYWNoKGMgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0ZVJvdXRlcyhjLCBjaGlsZHJlbltjLnZhbHVlLm91dGxldF0sIGNvbnRleHRzKTtcbiAgICAgIHRoaXMuZm9yd2FyZEV2ZW50KG5ldyBBY3RpdmF0aW9uRW5kKGMudmFsdWUuc25hcHNob3QpKTtcbiAgICB9KTtcbiAgICBpZiAoZnV0dXJlTm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZm9yd2FyZEV2ZW50KG5ldyBDaGlsZEFjdGl2YXRpb25FbmQoZnV0dXJlTm9kZS52YWx1ZS5zbmFwc2hvdCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWN0aXZhdGVSb3V0ZXMoXG4gICAgICBmdXR1cmVOb2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4sIGN1cnJOb2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4sXG4gICAgICBwYXJlbnRDb250ZXh0czogQ2hpbGRyZW5PdXRsZXRDb250ZXh0cyk6IHZvaWQge1xuICAgIGNvbnN0IGZ1dHVyZSA9IGZ1dHVyZU5vZGUudmFsdWU7XG4gICAgY29uc3QgY3VyciA9IGN1cnJOb2RlID8gY3Vyck5vZGUudmFsdWUgOiBudWxsO1xuXG4gICAgYWR2YW5jZUFjdGl2YXRlZFJvdXRlKGZ1dHVyZSk7XG5cbiAgICAvLyByZXVzaW5nIHRoZSBub2RlXG4gICAgaWYgKGZ1dHVyZSA9PT0gY3Vycikge1xuICAgICAgaWYgKGZ1dHVyZS5jb21wb25lbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIG5vcm1hbCByb3V0ZSwgd2UgbmVlZCB0byBnbyB0aHJvdWdoIGFuIG91dGxldC5cbiAgICAgICAgY29uc3QgY29udGV4dCA9IHBhcmVudENvbnRleHRzLmdldE9yQ3JlYXRlQ29udGV4dChmdXR1cmUub3V0bGV0KTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUNoaWxkUm91dGVzKGZ1dHVyZU5vZGUsIGN1cnJOb2RlLCBjb250ZXh0LmNoaWxkcmVuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHdlIGhhdmUgYSBjb21wb25lbnRsZXNzIHJvdXRlLCB3ZSByZWN1cnNlIGJ1dCBrZWVwIHRoZSBzYW1lIG91dGxldCBtYXAuXG4gICAgICAgIHRoaXMuYWN0aXZhdGVDaGlsZFJvdXRlcyhmdXR1cmVOb2RlLCBjdXJyTm9kZSwgcGFyZW50Q29udGV4dHMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZnV0dXJlLmNvbXBvbmVudCkge1xuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgbm9ybWFsIHJvdXRlLCB3ZSBuZWVkIHRvIHBsYWNlIHRoZSBjb21wb25lbnQgaW50byB0aGUgb3V0bGV0IGFuZCByZWN1cnNlLlxuICAgICAgICBjb25zdCBjb250ZXh0ID0gcGFyZW50Q29udGV4dHMuZ2V0T3JDcmVhdGVDb250ZXh0KGZ1dHVyZS5vdXRsZXQpO1xuXG4gICAgICAgIGlmICh0aGlzLnJvdXRlUmV1c2VTdHJhdGVneS5zaG91bGRBdHRhY2goZnV0dXJlLnNuYXBzaG90KSkge1xuICAgICAgICAgIGNvbnN0IHN0b3JlZCA9XG4gICAgICAgICAgICAgICg8RGV0YWNoZWRSb3V0ZUhhbmRsZUludGVybmFsPnRoaXMucm91dGVSZXVzZVN0cmF0ZWd5LnJldHJpZXZlKGZ1dHVyZS5zbmFwc2hvdCkpO1xuICAgICAgICAgIHRoaXMucm91dGVSZXVzZVN0cmF0ZWd5LnN0b3JlKGZ1dHVyZS5zbmFwc2hvdCwgbnVsbCk7XG4gICAgICAgICAgY29udGV4dC5jaGlsZHJlbi5vbk91dGxldFJlQXR0YWNoZWQoc3RvcmVkLmNvbnRleHRzKTtcbiAgICAgICAgICBjb250ZXh0LmF0dGFjaFJlZiA9IHN0b3JlZC5jb21wb25lbnRSZWY7XG4gICAgICAgICAgY29udGV4dC5yb3V0ZSA9IHN0b3JlZC5yb3V0ZS52YWx1ZTtcbiAgICAgICAgICBpZiAoY29udGV4dC5vdXRsZXQpIHtcbiAgICAgICAgICAgIC8vIEF0dGFjaCByaWdodCBhd2F5IHdoZW4gdGhlIG91dGxldCBoYXMgYWxyZWFkeSBiZWVuIGluc3RhbnRpYXRlZFxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGF0dGFjaCBmcm9tIGBSb3V0ZXJPdXRsZXQubmdPbkluaXRgIHdoZW4gaXQgaXMgaW5zdGFudGlhdGVkXG4gICAgICAgICAgICBjb250ZXh0Lm91dGxldC5hdHRhY2goc3RvcmVkLmNvbXBvbmVudFJlZiwgc3RvcmVkLnJvdXRlLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYWR2YW5jZUFjdGl2YXRlZFJvdXRlTm9kZUFuZEl0c0NoaWxkcmVuKHN0b3JlZC5yb3V0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY29uZmlnID0gcGFyZW50TG9hZGVkQ29uZmlnKGZ1dHVyZS5zbmFwc2hvdCk7XG4gICAgICAgICAgY29uc3QgY21wRmFjdG9yeVJlc29sdmVyID0gY29uZmlnID8gY29uZmlnLm1vZHVsZS5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgOiBudWxsO1xuXG4gICAgICAgICAgY29udGV4dC5yb3V0ZSA9IGZ1dHVyZTtcbiAgICAgICAgICBjb250ZXh0LnJlc29sdmVyID0gY21wRmFjdG9yeVJlc29sdmVyO1xuICAgICAgICAgIGlmIChjb250ZXh0Lm91dGxldCkge1xuICAgICAgICAgICAgLy8gQWN0aXZhdGUgdGhlIG91dGxldCB3aGVuIGl0IGhhcyBhbHJlYWR5IGJlZW4gaW5zdGFudGlhdGVkXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgaXQgd2lsbCBnZXQgYWN0aXZhdGVkIGZyb20gaXRzIGBuZ09uSW5pdGAgd2hlbiBpbnN0YW50aWF0ZWRcbiAgICAgICAgICAgIGNvbnRleHQub3V0bGV0LmFjdGl2YXRlV2l0aChmdXR1cmUsIGNtcEZhY3RvcnlSZXNvbHZlcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5hY3RpdmF0ZUNoaWxkUm91dGVzKGZ1dHVyZU5vZGUsIG51bGwsIGNvbnRleHQuY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgY29tcG9uZW50bGVzcyByb3V0ZSwgd2UgcmVjdXJzZSBidXQga2VlcCB0aGUgc2FtZSBvdXRsZXQgbWFwLlxuICAgICAgICB0aGlzLmFjdGl2YXRlQ2hpbGRSb3V0ZXMoZnV0dXJlTm9kZSwgbnVsbCwgcGFyZW50Q29udGV4dHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZHZhbmNlQWN0aXZhdGVkUm91dGVOb2RlQW5kSXRzQ2hpbGRyZW4obm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+KTogdm9pZCB7XG4gIGFkdmFuY2VBY3RpdmF0ZWRSb3V0ZShub2RlLnZhbHVlKTtcbiAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGFkdmFuY2VBY3RpdmF0ZWRSb3V0ZU5vZGVBbmRJdHNDaGlsZHJlbik7XG59XG5cbmZ1bmN0aW9uIHBhcmVudExvYWRlZENvbmZpZyhzbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IExvYWRlZFJvdXRlckNvbmZpZ3xudWxsIHtcbiAgZm9yIChsZXQgcyA9IHNuYXBzaG90LnBhcmVudDsgczsgcyA9IHMucGFyZW50KSB7XG4gICAgY29uc3Qgcm91dGUgPSBzLnJvdXRlQ29uZmlnO1xuICAgIGlmIChyb3V0ZSAmJiByb3V0ZS5fbG9hZGVkQ29uZmlnKSByZXR1cm4gcm91dGUuX2xvYWRlZENvbmZpZztcbiAgICBpZiAocm91dGUgJiYgcm91dGUuY29tcG9uZW50KSByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUNvbW1hbmRzKGNvbW1hbmRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY21kID0gY29tbWFuZHNbaV07XG4gICAgaWYgKGNtZCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSByZXF1ZXN0ZWQgcGF0aCBjb250YWlucyAke2NtZH0gc2VnbWVudCBhdCBpbmRleCAke2l9YCk7XG4gICAgfVxuICB9XG59XG4iXX0=