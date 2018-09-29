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
/** @typedef {?} */
var NavigationTrigger;
export { NavigationTrigger };
/**
 * \@description
 *
 * Base for events the Router goes through, as opposed to events tied to a specific
 * Route. `RouterEvent`s will only be fired one time for any given navigation.
 *
 * Example:
 *
 * ```
 * class MyService {
 *   constructor(public router: Router, logger: Logger) {
 *     router.events.filter(e => e instanceof RouterEvent).subscribe(e => {
 *       logger.log(e.id, e.url);
 *     });
 *   }
 * }
 * ```
 *
 * \@experimental
 */
export class RouterEvent {
    /**
     * @param {?} id
     * @param {?} url
     */
    constructor(id, url) {
        this.id = id;
        this.url = url;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    RouterEvent.prototype.id;
    /**
     * \@docsNotRequired
     * @type {?}
     */
    RouterEvent.prototype.url;
}
/**
 * \@description
 *
 * Represents an event triggered when a navigation starts.
 *
 *
 */
export class NavigationStart extends RouterEvent {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?=} navigationTrigger
     * @param {?=} restoredState
     */
    constructor(/** @docsNotRequired */
    /** @docsNotRequired */
    id, /** @docsNotRequired */
    /** @docsNotRequired */
    url, /** @docsNotRequired */
    /** @docsNotRequired */
    navigationTrigger = 'imperative', /** @docsNotRequired */
    /** @docsNotRequired */
    restoredState = null) {
        super(id, url);
        this.navigationTrigger = navigationTrigger;
        this.restoredState = restoredState;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    toString() { return `NavigationStart(id: ${this.id}, url: '${this.url}')`; }
}
if (false) {
    /**
     * Identifies the trigger of the navigation.
     *
     * * 'imperative'--triggered by `router.navigateByUrl` or `router.navigate`.
     * * 'popstate'--triggered by a popstate event
     * * 'hashchange'--triggered by a hashchange event
     * @type {?}
     */
    NavigationStart.prototype.navigationTrigger;
    /**
     * This contains the navigation id that pushed the history record that the router navigates
     * back to. This is not null only when the navigation is triggered by a popstate event.
     *
     * The router assigns a navigationId to every router transition/navigation. Even when the user
     * clicks on the back button in the browser, a new navigation id will be created. So from
     * the perspective of the router, the router never "goes back". By using the `restoredState`
     * and its navigationId, you can implement behavior that differentiates between creating new
     * states
     * and popstate events. In the latter case you can restore some remembered state (e.g., scroll
     * position).
     * @type {?}
     */
    NavigationStart.prototype.restoredState;
}
/**
 * \@description
 *
 * Represents an event triggered when a navigation ends successfully.
 *
 *
 */
export class NavigationEnd extends RouterEvent {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} urlAfterRedirects
     */
    constructor(/** @docsNotRequired */
    /** @docsNotRequired */
    id, /** @docsNotRequired */
    /** @docsNotRequired */
    url, urlAfterRedirects) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    toString() {
        return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    NavigationEnd.prototype.urlAfterRedirects;
}
/**
 * \@description
 *
 * Represents an event triggered when a navigation is canceled.
 *
 *
 */
export class NavigationCancel extends RouterEvent {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} reason
     */
    constructor(/** @docsNotRequired */
    /** @docsNotRequired */
    id, /** @docsNotRequired */
    /** @docsNotRequired */
    url, reason) {
        super(id, url);
        this.reason = reason;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    toString() { return `NavigationCancel(id: ${this.id}, url: '${this.url}')`; }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    NavigationCancel.prototype.reason;
}
/**
 * \@description
 *
 * Represents an event triggered when a navigation fails due to an unexpected error.
 *
 *
 */
export class NavigationError extends RouterEvent {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} error
     */
    constructor(/** @docsNotRequired */
    /** @docsNotRequired */
    id, /** @docsNotRequired */
    /** @docsNotRequired */
    url, error) {
        super(id, url);
        this.error = error;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    toString() {
        return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    NavigationError.prototype.error;
}
/**
 * \@description
 *
 * Represents an event triggered when routes are recognized.
 *
 *
 */
export class RoutesRecognized extends RouterEvent {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} urlAfterRedirects
     * @param {?} state
     */
    constructor(/** @docsNotRequired */
    /** @docsNotRequired */
    id, /** @docsNotRequired */
    /** @docsNotRequired */
    url, urlAfterRedirects, state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    toString() {
        return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    RoutesRecognized.prototype.urlAfterRedirects;
    /**
     * \@docsNotRequired
     * @type {?}
     */
    RoutesRecognized.prototype.state;
}
/**
 * \@description
 *
 * Represents the start of the Guard phase of routing.
 *
 * \@experimental
 */
export class GuardsCheckStart extends RouterEvent {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} urlAfterRedirects
     * @param {?} state
     */
    constructor(/** @docsNotRequired */
    /** @docsNotRequired */
    id, /** @docsNotRequired */
    /** @docsNotRequired */
    url, urlAfterRedirects, state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
    }
    /**
     * @return {?}
     */
    toString() {
        return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    GuardsCheckStart.prototype.urlAfterRedirects;
    /**
     * \@docsNotRequired
     * @type {?}
     */
    GuardsCheckStart.prototype.state;
}
/**
 * \@description
 *
 * Represents the end of the Guard phase of routing.
 *
 * \@experimental
 */
export class GuardsCheckEnd extends RouterEvent {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} urlAfterRedirects
     * @param {?} state
     * @param {?} shouldActivate
     */
    constructor(/** @docsNotRequired */
    /** @docsNotRequired */
    id, /** @docsNotRequired */
    /** @docsNotRequired */
    url, urlAfterRedirects, state, shouldActivate) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
        this.shouldActivate = shouldActivate;
    }
    /**
     * @return {?}
     */
    toString() {
        return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    GuardsCheckEnd.prototype.urlAfterRedirects;
    /**
     * \@docsNotRequired
     * @type {?}
     */
    GuardsCheckEnd.prototype.state;
    /**
     * \@docsNotRequired
     * @type {?}
     */
    GuardsCheckEnd.prototype.shouldActivate;
}
/**
 * \@description
 *
 * Represents the start of the Resolve phase of routing. The timing of this
 * event may change, thus it's experimental. In the current iteration it will run
 * in the "resolve" phase whether there's things to resolve or not. In the future this
 * behavior may change to only run when there are things to be resolved.
 *
 * \@experimental
 */
export class ResolveStart extends RouterEvent {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} urlAfterRedirects
     * @param {?} state
     */
    constructor(/** @docsNotRequired */
    /** @docsNotRequired */
    id, /** @docsNotRequired */
    /** @docsNotRequired */
    url, urlAfterRedirects, state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
    }
    /**
     * @return {?}
     */
    toString() {
        return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    ResolveStart.prototype.urlAfterRedirects;
    /**
     * \@docsNotRequired
     * @type {?}
     */
    ResolveStart.prototype.state;
}
/**
 * \@description
 *
 * Represents the end of the Resolve phase of routing. See note on
 * `ResolveStart` for use of this experimental API.
 *
 * \@experimental
 */
export class ResolveEnd extends RouterEvent {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} urlAfterRedirects
     * @param {?} state
     */
    constructor(/** @docsNotRequired */
    /** @docsNotRequired */
    id, /** @docsNotRequired */
    /** @docsNotRequired */
    url, urlAfterRedirects, state) {
        super(id, url);
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
    }
    /**
     * @return {?}
     */
    toString() {
        return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    ResolveEnd.prototype.urlAfterRedirects;
    /**
     * \@docsNotRequired
     * @type {?}
     */
    ResolveEnd.prototype.state;
}
/**
 * \@description
 *
 * Represents an event triggered before lazy loading a route config.
 *
 * \@experimental
 */
export class RouteConfigLoadStart {
    /**
     * @param {?} route
     */
    constructor(route) {
        this.route = route;
    }
    /**
     * @return {?}
     */
    toString() { return `RouteConfigLoadStart(path: ${this.route.path})`; }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    RouteConfigLoadStart.prototype.route;
}
/**
 * \@description
 *
 * Represents an event triggered when a route has been lazy loaded.
 *
 * \@experimental
 */
export class RouteConfigLoadEnd {
    /**
     * @param {?} route
     */
    constructor(route) {
        this.route = route;
    }
    /**
     * @return {?}
     */
    toString() { return `RouteConfigLoadEnd(path: ${this.route.path})`; }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    RouteConfigLoadEnd.prototype.route;
}
/**
 * \@description
 *
 * Represents the start of end of the Resolve phase of routing. See note on
 * `ChildActivationEnd` for use of this experimental API.
 *
 * \@experimental
 */
export class ChildActivationStart {
    /**
     * @param {?} snapshot
     */
    constructor(snapshot) {
        this.snapshot = snapshot;
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || '';
        return `ChildActivationStart(path: '${path}')`;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    ChildActivationStart.prototype.snapshot;
}
/**
 * \@description
 *
 * Represents the start of end of the Resolve phase of routing. See note on
 * `ChildActivationStart` for use of this experimental API.
 *
 * \@experimental
 */
export class ChildActivationEnd {
    /**
     * @param {?} snapshot
     */
    constructor(snapshot) {
        this.snapshot = snapshot;
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || '';
        return `ChildActivationEnd(path: '${path}')`;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    ChildActivationEnd.prototype.snapshot;
}
/**
 * \@description
 *
 * Represents the start of end of the Resolve phase of routing. See note on
 * `ActivationEnd` for use of this experimental API.
 *
 * \@experimental
 */
export class ActivationStart {
    /**
     * @param {?} snapshot
     */
    constructor(snapshot) {
        this.snapshot = snapshot;
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || '';
        return `ActivationStart(path: '${path}')`;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    ActivationStart.prototype.snapshot;
}
/**
 * \@description
 *
 * Represents the start of end of the Resolve phase of routing. See note on
 * `ActivationStart` for use of this experimental API.
 *
 * \@experimental
 */
export class ActivationEnd {
    /**
     * @param {?} snapshot
     */
    constructor(snapshot) {
        this.snapshot = snapshot;
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || '';
        return `ActivationEnd(path: '${path}')`;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    ActivationEnd.prototype.snapshot;
}
/**
 * \@description
 *
 * Represents a scrolling event.
 */
export class Scroll {
    /**
     * @param {?} routerEvent
     * @param {?} position
     * @param {?} anchor
     */
    constructor(/** @docsNotRequired */
    routerEvent, /** @docsNotRequired */
    position, /** @docsNotRequired */
    anchor) {
        this.routerEvent = routerEvent;
        this.position = position;
        this.anchor = anchor;
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        const pos = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
        return `Scroll(anchor: '${this.anchor}', position: '${pos}')`;
    }
}
if (false) {
    /**
     * \@docsNotRequired
     * @type {?}
     */
    Scroll.prototype.routerEvent;
    /**
     * \@docsNotRequired
     * @type {?}
     */
    Scroll.prototype.position;
    /**
     * \@docsNotRequired
     * @type {?}
     */
    Scroll.prototype.anchor;
}
/** @typedef {?} */
var Event;
export { Event };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9ldmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRDQSxNQUFNOzs7OztJQUNKLFlBRVcsSUFFQTtRQUZBLE9BQUUsR0FBRixFQUFFO1FBRUYsUUFBRyxHQUFILEdBQUc7S0FBWTtDQUMzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTRCxNQUFNLHNCQUF1QixTQUFRLFdBQVc7Ozs7Ozs7SUF3QjlDO0lBRUksQUFEQSx1QkFBdUI7SUFDdkIsRUFBVTtJQUVWLEFBREEsdUJBQXVCO0lBQ3ZCLEdBQVc7SUFFWCxBQURBLHVCQUF1QjtJQUN2QixvQkFBMEQsWUFBWTtJQUV0RSxBQURBLHVCQUF1QjtJQUN2QixnQkFBNkMsSUFBSTtRQUNuRCxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzNDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0tBQ3BDOzs7OztJQUdELFFBQVEsS0FBYSxPQUFPLHVCQUF1QixJQUFJLENBQUMsRUFBRSxXQUFXLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO0NBQ3JGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTRCxNQUFNLG9CQUFxQixTQUFRLFdBQVc7Ozs7OztJQUM1QztJQUVJLEFBREEsdUJBQXVCO0lBQ3ZCLEVBQVU7SUFFVixBQURBLHVCQUF1QjtJQUN2QixHQUFXLEVBRUo7UUFDVCxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRE4sc0JBQWlCLEdBQWpCLGlCQUFpQjtLQUUzQjs7Ozs7SUFHRCxRQUFRO1FBQ04sT0FBTyxxQkFBcUIsSUFBSSxDQUFDLEVBQUUsV0FBVyxJQUFJ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QUVhLFdBQTBCO0lBRzFCLFFBQStCO0lBRy9CLE1BQW1CO1FBTm5CLGdCQUFXLEdBQVgsV0FBVyxDQUFlO1FBRzFCLGFBQVEsR0FBUixRQUFRLENBQXVCO1FBRy9CLFdBQU0sR0FBTixNQUFNLENBQWE7S0FBSTs7OztJQUVwQyxRQUFROztRQUNOLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUM5RSxPQUFPLG1CQUFtQixJQUFJLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUM7S0FDL0Q7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSb3V0ZX0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZVNuYXBzaG90fSBmcm9tICcuL3JvdXRlcl9zdGF0ZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogSWRlbnRpZmllcyB0aGUgdHJpZ2dlciBvZiB0aGUgbmF2aWdhdGlvbi5cbiAqXG4gKiAqICdpbXBlcmF0aXZlJy0tdHJpZ2dlcmVkIGJ5IGByb3V0ZXIubmF2aWdhdGVCeVVybGAgb3IgYHJvdXRlci5uYXZpZ2F0ZWAuXG4gKiAqICdwb3BzdGF0ZSctLXRyaWdnZXJlZCBieSBhIHBvcHN0YXRlIGV2ZW50XG4gKiAqICdoYXNoY2hhbmdlJy0tdHJpZ2dlcmVkIGJ5IGEgaGFzaGNoYW5nZSBldmVudFxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IHR5cGUgTmF2aWdhdGlvblRyaWdnZXIgPSAnaW1wZXJhdGl2ZScgfCAncG9wc3RhdGUnIHwgJ2hhc2hjaGFuZ2UnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIEJhc2UgZm9yIGV2ZW50cyB0aGUgUm91dGVyIGdvZXMgdGhyb3VnaCwgYXMgb3Bwb3NlZCB0byBldmVudHMgdGllZCB0byBhIHNwZWNpZmljXG4gKiBSb3V0ZS4gYFJvdXRlckV2ZW50YHMgd2lsbCBvbmx5IGJlIGZpcmVkIG9uZSB0aW1lIGZvciBhbnkgZ2l2ZW4gbmF2aWdhdGlvbi5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogY2xhc3MgTXlTZXJ2aWNlIHtcbiAqICAgY29uc3RydWN0b3IocHVibGljIHJvdXRlcjogUm91dGVyLCBsb2dnZXI6IExvZ2dlcikge1xuICogICAgIHJvdXRlci5ldmVudHMuZmlsdGVyKGUgPT4gZSBpbnN0YW5jZW9mIFJvdXRlckV2ZW50KS5zdWJzY3JpYmUoZSA9PiB7XG4gKiAgICAgICBsb2dnZXIubG9nKGUuaWQsIGUudXJsKTtcbiAqICAgICB9KTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY2xhc3MgUm91dGVyRXZlbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gICAgICBwdWJsaWMgaWQ6IG51bWJlcixcbiAgICAgIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gICAgICBwdWJsaWMgdXJsOiBzdHJpbmcpIHt9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyBhbiBldmVudCB0cmlnZ2VyZWQgd2hlbiBhIG5hdmlnYXRpb24gc3RhcnRzLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uU3RhcnQgZXh0ZW5kcyBSb3V0ZXJFdmVudCB7XG4gIC8qKlxuICAgKiBJZGVudGlmaWVzIHRoZSB0cmlnZ2VyIG9mIHRoZSBuYXZpZ2F0aW9uLlxuICAgKlxuICAgKiAqICdpbXBlcmF0aXZlJy0tdHJpZ2dlcmVkIGJ5IGByb3V0ZXIubmF2aWdhdGVCeVVybGAgb3IgYHJvdXRlci5uYXZpZ2F0ZWAuXG4gICAqICogJ3BvcHN0YXRlJy0tdHJpZ2dlcmVkIGJ5IGEgcG9wc3RhdGUgZXZlbnRcbiAgICogKiAnaGFzaGNoYW5nZSctLXRyaWdnZXJlZCBieSBhIGhhc2hjaGFuZ2UgZXZlbnRcbiAgICovXG4gIG5hdmlnYXRpb25UcmlnZ2VyPzogJ2ltcGVyYXRpdmUnfCdwb3BzdGF0ZSd8J2hhc2hjaGFuZ2UnO1xuXG4gIC8qKlxuICAgKiBUaGlzIGNvbnRhaW5zIHRoZSBuYXZpZ2F0aW9uIGlkIHRoYXQgcHVzaGVkIHRoZSBoaXN0b3J5IHJlY29yZCB0aGF0IHRoZSByb3V0ZXIgbmF2aWdhdGVzXG4gICAqIGJhY2sgdG8uIFRoaXMgaXMgbm90IG51bGwgb25seSB3aGVuIHRoZSBuYXZpZ2F0aW9uIGlzIHRyaWdnZXJlZCBieSBhIHBvcHN0YXRlIGV2ZW50LlxuICAgKlxuICAgKiBUaGUgcm91dGVyIGFzc2lnbnMgYSBuYXZpZ2F0aW9uSWQgdG8gZXZlcnkgcm91dGVyIHRyYW5zaXRpb24vbmF2aWdhdGlvbi4gRXZlbiB3aGVuIHRoZSB1c2VyXG4gICAqIGNsaWNrcyBvbiB0aGUgYmFjayBidXR0b24gaW4gdGhlIGJyb3dzZXIsIGEgbmV3IG5hdmlnYXRpb24gaWQgd2lsbCBiZSBjcmVhdGVkLiBTbyBmcm9tXG4gICAqIHRoZSBwZXJzcGVjdGl2ZSBvZiB0aGUgcm91dGVyLCB0aGUgcm91dGVyIG5ldmVyIFwiZ29lcyBiYWNrXCIuIEJ5IHVzaW5nIHRoZSBgcmVzdG9yZWRTdGF0ZWBcbiAgICogYW5kIGl0cyBuYXZpZ2F0aW9uSWQsIHlvdSBjYW4gaW1wbGVtZW50IGJlaGF2aW9yIHRoYXQgZGlmZmVyZW50aWF0ZXMgYmV0d2VlbiBjcmVhdGluZyBuZXdcbiAgICogc3RhdGVzXG4gICAqIGFuZCBwb3BzdGF0ZSBldmVudHMuIEluIHRoZSBsYXR0ZXIgY2FzZSB5b3UgY2FuIHJlc3RvcmUgc29tZSByZW1lbWJlcmVkIHN0YXRlIChlLmcuLCBzY3JvbGxcbiAgICogcG9zaXRpb24pLlxuICAgKi9cbiAgcmVzdG9yZWRTdGF0ZT86IHtuYXZpZ2F0aW9uSWQ6IG51bWJlcn18bnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gICAgICBpZDogbnVtYmVyLFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIHVybDogc3RyaW5nLFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIG5hdmlnYXRpb25UcmlnZ2VyOiAnaW1wZXJhdGl2ZSd8J3BvcHN0YXRlJ3wnaGFzaGNoYW5nZScgPSAnaW1wZXJhdGl2ZScsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcmVzdG9yZWRTdGF0ZToge25hdmlnYXRpb25JZDogbnVtYmVyfXxudWxsID0gbnVsbCkge1xuICAgIHN1cGVyKGlkLCB1cmwpO1xuICAgIHRoaXMubmF2aWdhdGlvblRyaWdnZXIgPSBuYXZpZ2F0aW9uVHJpZ2dlcjtcbiAgICB0aGlzLnJlc3RvcmVkU3RhdGUgPSByZXN0b3JlZFN0YXRlO1xuICB9XG5cbiAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIGBOYXZpZ2F0aW9uU3RhcnQoaWQ6ICR7dGhpcy5pZH0sIHVybDogJyR7dGhpcy51cmx9JylgOyB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyBhbiBldmVudCB0cmlnZ2VyZWQgd2hlbiBhIG5hdmlnYXRpb24gZW5kcyBzdWNjZXNzZnVsbHkuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25FbmQgZXh0ZW5kcyBSb3V0ZXJFdmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIGlkOiBudW1iZXIsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgdXJsOiBzdHJpbmcsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcHVibGljIHVybEFmdGVyUmVkaXJlY3RzOiBzdHJpbmcpIHtcbiAgICBzdXBlcihpZCwgdXJsKTtcbiAgfVxuXG4gIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBOYXZpZ2F0aW9uRW5kKGlkOiAke3RoaXMuaWR9LCB1cmw6ICcke3RoaXMudXJsfScsIHVybEFmdGVyUmVkaXJlY3RzOiAnJHt0aGlzLnVybEFmdGVyUmVkaXJlY3RzfScpYDtcbiAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFJlcHJlc2VudHMgYW4gZXZlbnQgdHJpZ2dlcmVkIHdoZW4gYSBuYXZpZ2F0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uQ2FuY2VsIGV4dGVuZHMgUm91dGVyRXZlbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gICAgICBpZDogbnVtYmVyLFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIHVybDogc3RyaW5nLFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIHB1YmxpYyByZWFzb246IHN0cmluZykge1xuICAgIHN1cGVyKGlkLCB1cmwpO1xuICB9XG5cbiAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIGBOYXZpZ2F0aW9uQ2FuY2VsKGlkOiAke3RoaXMuaWR9LCB1cmw6ICcke3RoaXMudXJsfScpYDsgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFJlcHJlc2VudHMgYW4gZXZlbnQgdHJpZ2dlcmVkIHdoZW4gYSBuYXZpZ2F0aW9uIGZhaWxzIGR1ZSB0byBhbiB1bmV4cGVjdGVkIGVycm9yLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uRXJyb3IgZXh0ZW5kcyBSb3V0ZXJFdmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIGlkOiBudW1iZXIsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgdXJsOiBzdHJpbmcsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcHVibGljIGVycm9yOiBhbnkpIHtcbiAgICBzdXBlcihpZCwgdXJsKTtcbiAgfVxuXG4gIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBOYXZpZ2F0aW9uRXJyb3IoaWQ6ICR7dGhpcy5pZH0sIHVybDogJyR7dGhpcy51cmx9JywgZXJyb3I6ICR7dGhpcy5lcnJvcn0pYDtcbiAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFJlcHJlc2VudHMgYW4gZXZlbnQgdHJpZ2dlcmVkIHdoZW4gcm91dGVzIGFyZSByZWNvZ25pemVkLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBSb3V0ZXNSZWNvZ25pemVkIGV4dGVuZHMgUm91dGVyRXZlbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gICAgICBpZDogbnVtYmVyLFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIHVybDogc3RyaW5nLFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIHB1YmxpYyB1cmxBZnRlclJlZGlyZWN0czogc3RyaW5nLFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIHB1YmxpYyBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkge1xuICAgIHN1cGVyKGlkLCB1cmwpO1xuICB9XG5cbiAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFJvdXRlc1JlY29nbml6ZWQoaWQ6ICR7dGhpcy5pZH0sIHVybDogJyR7dGhpcy51cmx9JywgdXJsQWZ0ZXJSZWRpcmVjdHM6ICcke3RoaXMudXJsQWZ0ZXJSZWRpcmVjdHN9Jywgc3RhdGU6ICR7dGhpcy5zdGF0ZX0pYDtcbiAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFJlcHJlc2VudHMgdGhlIHN0YXJ0IG9mIHRoZSBHdWFyZCBwaGFzZSBvZiByb3V0aW5nLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNsYXNzIEd1YXJkc0NoZWNrU3RhcnQgZXh0ZW5kcyBSb3V0ZXJFdmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIGlkOiBudW1iZXIsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgdXJsOiBzdHJpbmcsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcHVibGljIHVybEFmdGVyUmVkaXJlY3RzOiBzdHJpbmcsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcHVibGljIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgc3VwZXIoaWQsIHVybCk7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgR3VhcmRzQ2hlY2tTdGFydChpZDogJHt0aGlzLmlkfSwgdXJsOiAnJHt0aGlzLnVybH0nLCB1cmxBZnRlclJlZGlyZWN0czogJyR7dGhpcy51cmxBZnRlclJlZGlyZWN0c30nLCBzdGF0ZTogJHt0aGlzLnN0YXRlfSlgO1xuICB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoZSBHdWFyZCBwaGFzZSBvZiByb3V0aW5nLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNsYXNzIEd1YXJkc0NoZWNrRW5kIGV4dGVuZHMgUm91dGVyRXZlbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gICAgICBpZDogbnVtYmVyLFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIHVybDogc3RyaW5nLFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIHB1YmxpYyB1cmxBZnRlclJlZGlyZWN0czogc3RyaW5nLFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIHB1YmxpYyBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCxcbiAgICAgIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gICAgICBwdWJsaWMgc2hvdWxkQWN0aXZhdGU6IGJvb2xlYW4pIHtcbiAgICBzdXBlcihpZCwgdXJsKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBHdWFyZHNDaGVja0VuZChpZDogJHt0aGlzLmlkfSwgdXJsOiAnJHt0aGlzLnVybH0nLCB1cmxBZnRlclJlZGlyZWN0czogJyR7dGhpcy51cmxBZnRlclJlZGlyZWN0c30nLCBzdGF0ZTogJHt0aGlzLnN0YXRlfSwgc2hvdWxkQWN0aXZhdGU6ICR7dGhpcy5zaG91bGRBY3RpdmF0ZX0pYDtcbiAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFJlcHJlc2VudHMgdGhlIHN0YXJ0IG9mIHRoZSBSZXNvbHZlIHBoYXNlIG9mIHJvdXRpbmcuIFRoZSB0aW1pbmcgb2YgdGhpc1xuICogZXZlbnQgbWF5IGNoYW5nZSwgdGh1cyBpdCdzIGV4cGVyaW1lbnRhbC4gSW4gdGhlIGN1cnJlbnQgaXRlcmF0aW9uIGl0IHdpbGwgcnVuXG4gKiBpbiB0aGUgXCJyZXNvbHZlXCIgcGhhc2Ugd2hldGhlciB0aGVyZSdzIHRoaW5ncyB0byByZXNvbHZlIG9yIG5vdC4gSW4gdGhlIGZ1dHVyZSB0aGlzXG4gKiBiZWhhdmlvciBtYXkgY2hhbmdlIHRvIG9ubHkgcnVuIHdoZW4gdGhlcmUgYXJlIHRoaW5ncyB0byBiZSByZXNvbHZlZC5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvbHZlU3RhcnQgZXh0ZW5kcyBSb3V0ZXJFdmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIGlkOiBudW1iZXIsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgdXJsOiBzdHJpbmcsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcHVibGljIHVybEFmdGVyUmVkaXJlY3RzOiBzdHJpbmcsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcHVibGljIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgc3VwZXIoaWQsIHVybCk7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgUmVzb2x2ZVN0YXJ0KGlkOiAke3RoaXMuaWR9LCB1cmw6ICcke3RoaXMudXJsfScsIHVybEFmdGVyUmVkaXJlY3RzOiAnJHt0aGlzLnVybEFmdGVyUmVkaXJlY3RzfScsIHN0YXRlOiAke3RoaXMuc3RhdGV9KWA7XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBSZXByZXNlbnRzIHRoZSBlbmQgb2YgdGhlIFJlc29sdmUgcGhhc2Ugb2Ygcm91dGluZy4gU2VlIG5vdGUgb25cbiAqIGBSZXNvbHZlU3RhcnRgIGZvciB1c2Ugb2YgdGhpcyBleHBlcmltZW50YWwgQVBJLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc29sdmVFbmQgZXh0ZW5kcyBSb3V0ZXJFdmVudCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIGlkOiBudW1iZXIsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgdXJsOiBzdHJpbmcsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcHVibGljIHVybEFmdGVyUmVkaXJlY3RzOiBzdHJpbmcsXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcHVibGljIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSB7XG4gICAgc3VwZXIoaWQsIHVybCk7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgUmVzb2x2ZUVuZChpZDogJHt0aGlzLmlkfSwgdXJsOiAnJHt0aGlzLnVybH0nLCB1cmxBZnRlclJlZGlyZWN0czogJyR7dGhpcy51cmxBZnRlclJlZGlyZWN0c30nLCBzdGF0ZTogJHt0aGlzLnN0YXRlfSlgO1xuICB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyBhbiBldmVudCB0cmlnZ2VyZWQgYmVmb3JlIGxhenkgbG9hZGluZyBhIHJvdXRlIGNvbmZpZy5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjbGFzcyBSb3V0ZUNvbmZpZ0xvYWRTdGFydCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIHB1YmxpYyByb3V0ZTogUm91dGUpIHt9XG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgUm91dGVDb25maWdMb2FkU3RhcnQocGF0aDogJHt0aGlzLnJvdXRlLnBhdGh9KWA7IH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBSZXByZXNlbnRzIGFuIGV2ZW50IHRyaWdnZXJlZCB3aGVuIGEgcm91dGUgaGFzIGJlZW4gbGF6eSBsb2FkZWQuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY2xhc3MgUm91dGVDb25maWdMb2FkRW5kIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcHVibGljIHJvdXRlOiBSb3V0ZSkge31cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIGBSb3V0ZUNvbmZpZ0xvYWRFbmQocGF0aDogJHt0aGlzLnJvdXRlLnBhdGh9KWA7IH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBSZXByZXNlbnRzIHRoZSBzdGFydCBvZiBlbmQgb2YgdGhlIFJlc29sdmUgcGhhc2Ugb2Ygcm91dGluZy4gU2VlIG5vdGUgb25cbiAqIGBDaGlsZEFjdGl2YXRpb25FbmRgIGZvciB1c2Ugb2YgdGhpcyBleHBlcmltZW50YWwgQVBJLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNsYXNzIENoaWxkQWN0aXZhdGlvblN0YXJ0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcHVibGljIHNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KSB7fVxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLnNuYXBzaG90LnJvdXRlQ29uZmlnICYmIHRoaXMuc25hcHNob3Qucm91dGVDb25maWcucGF0aCB8fCAnJztcbiAgICByZXR1cm4gYENoaWxkQWN0aXZhdGlvblN0YXJ0KHBhdGg6ICcke3BhdGh9JylgO1xuICB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyB0aGUgc3RhcnQgb2YgZW5kIG9mIHRoZSBSZXNvbHZlIHBoYXNlIG9mIHJvdXRpbmcuIFNlZSBub3RlIG9uXG4gKiBgQ2hpbGRBY3RpdmF0aW9uU3RhcnRgIGZvciB1c2Ugb2YgdGhpcyBleHBlcmltZW50YWwgQVBJLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNsYXNzIENoaWxkQWN0aXZhdGlvbkVuZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqIEBkb2NzTm90UmVxdWlyZWQgKi9cbiAgICAgIHB1YmxpYyBzbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCkge31cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBjb25zdCBwYXRoID0gdGhpcy5zbmFwc2hvdC5yb3V0ZUNvbmZpZyAmJiB0aGlzLnNuYXBzaG90LnJvdXRlQ29uZmlnLnBhdGggfHwgJyc7XG4gICAgcmV0dXJuIGBDaGlsZEFjdGl2YXRpb25FbmQocGF0aDogJyR7cGF0aH0nKWA7XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBSZXByZXNlbnRzIHRoZSBzdGFydCBvZiBlbmQgb2YgdGhlIFJlc29sdmUgcGhhc2Ugb2Ygcm91dGluZy4gU2VlIG5vdGUgb25cbiAqIGBBY3RpdmF0aW9uRW5kYCBmb3IgdXNlIG9mIHRoaXMgZXhwZXJpbWVudGFsIEFQSS5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjbGFzcyBBY3RpdmF0aW9uU3RhcnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gICAgICBwdWJsaWMgc25hcHNob3Q6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpIHt9XG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuc25hcHNob3Qucm91dGVDb25maWcgJiYgdGhpcy5zbmFwc2hvdC5yb3V0ZUNvbmZpZy5wYXRoIHx8ICcnO1xuICAgIHJldHVybiBgQWN0aXZhdGlvblN0YXJ0KHBhdGg6ICcke3BhdGh9JylgO1xuICB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyB0aGUgc3RhcnQgb2YgZW5kIG9mIHRoZSBSZXNvbHZlIHBoYXNlIG9mIHJvdXRpbmcuIFNlZSBub3RlIG9uXG4gKiBgQWN0aXZhdGlvblN0YXJ0YCBmb3IgdXNlIG9mIHRoaXMgZXhwZXJpbWVudGFsIEFQSS5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjbGFzcyBBY3RpdmF0aW9uRW5kIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcHVibGljIHNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KSB7fVxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLnNuYXBzaG90LnJvdXRlQ29uZmlnICYmIHRoaXMuc25hcHNob3Qucm91dGVDb25maWcucGF0aCB8fCAnJztcbiAgICByZXR1cm4gYEFjdGl2YXRpb25FbmQocGF0aDogJyR7cGF0aH0nKWA7XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBSZXByZXNlbnRzIGEgc2Nyb2xsaW5nIGV2ZW50LlxuICovXG5leHBvcnQgY2xhc3MgU2Nyb2xsIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcmVhZG9ubHkgcm91dGVyRXZlbnQ6IE5hdmlnYXRpb25FbmQsXG5cbiAgICAgIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gICAgICByZWFkb25seSBwb3NpdGlvbjogW251bWJlciwgbnVtYmVyXXxudWxsLFxuXG4gICAgICAvKiogQGRvY3NOb3RSZXF1aXJlZCAqL1xuICAgICAgcmVhZG9ubHkgYW5jaG9yOiBzdHJpbmd8bnVsbCkge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBvcyA9IHRoaXMucG9zaXRpb24gPyBgJHt0aGlzLnBvc2l0aW9uWzBdfSwgJHt0aGlzLnBvc2l0aW9uWzFdfWAgOiBudWxsO1xuICAgIHJldHVybiBgU2Nyb2xsKGFuY2hvcjogJyR7dGhpcy5hbmNob3J9JywgcG9zaXRpb246ICcke3Bvc30nKWA7XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBSZXByZXNlbnRzIGEgcm91dGVyIGV2ZW50LCBhbGxvd2luZyB5b3UgdG8gdHJhY2sgdGhlIGxpZmVjeWNsZSBvZiB0aGUgcm91dGVyLlxuICpcbiAqIFRoZSBzZXF1ZW5jZSBvZiByb3V0ZXIgZXZlbnRzIGlzOlxuICpcbiAqIC0gYE5hdmlnYXRpb25TdGFydGAsXG4gKiAtIGBSb3V0ZUNvbmZpZ0xvYWRTdGFydGAsXG4gKiAtIGBSb3V0ZUNvbmZpZ0xvYWRFbmRgLFxuICogLSBgUm91dGVzUmVjb2duaXplZGAsXG4gKiAtIGBHdWFyZHNDaGVja1N0YXJ0YCxcbiAqIC0gYENoaWxkQWN0aXZhdGlvblN0YXJ0YCxcbiAqIC0gYEFjdGl2YXRpb25TdGFydGAsXG4gKiAtIGBHdWFyZHNDaGVja0VuZGAsXG4gKiAtIGBSZXNvbHZlU3RhcnRgLFxuICogLSBgUmVzb2x2ZUVuZGAsXG4gKiAtIGBBY3RpdmF0aW9uRW5kYFxuICogLSBgQ2hpbGRBY3RpdmF0aW9uRW5kYFxuICogLSBgTmF2aWdhdGlvbkVuZGAsXG4gKiAtIGBOYXZpZ2F0aW9uQ2FuY2VsYCxcbiAqIC0gYE5hdmlnYXRpb25FcnJvcmBcbiAqIC0gYFNjcm9sbGBcbiAqXG4gKlxuICovXG5leHBvcnQgdHlwZSBFdmVudCA9IFJvdXRlckV2ZW50IHwgUm91dGVDb25maWdMb2FkU3RhcnQgfCBSb3V0ZUNvbmZpZ0xvYWRFbmQgfCBDaGlsZEFjdGl2YXRpb25TdGFydCB8XG4gICAgQ2hpbGRBY3RpdmF0aW9uRW5kIHwgQWN0aXZhdGlvblN0YXJ0IHwgQWN0aXZhdGlvbkVuZCB8IFNjcm9sbDtcbiJdfQ==