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
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, inheritedParamsDataResolve } from './router_state';
import { PRIMARY_OUTLET, defaultUrlMatcher } from './shared';
import { UrlSegmentGroup, mapChildrenIntoArray } from './url_tree';
import { forEach, last } from './utils/collection';
import { TreeNode } from './utils/tree';
class NoMatch {
}
/**
 * @param {?} rootComponentType
 * @param {?} config
 * @param {?} urlTree
 * @param {?} url
 * @param {?=} paramsInheritanceStrategy
 * @param {?=} relativeLinkResolution
 * @return {?}
 */
export function recognize(rootComponentType, config, urlTree, url, paramsInheritanceStrategy = 'emptyOnly', relativeLinkResolution = 'legacy') {
    return new Recognizer(rootComponentType, config, urlTree, url, paramsInheritanceStrategy, relativeLinkResolution)
        .recognize();
}
class Recognizer {
    /**
     * @param {?} rootComponentType
     * @param {?} config
     * @param {?} urlTree
     * @param {?} url
     * @param {?} paramsInheritanceStrategy
     * @param {?} relativeLinkResolution
     */
    constructor(rootComponentType, config, urlTree, url, paramsInheritanceStrategy, relativeLinkResolution) {
        this.rootComponentType = rootComponentType;
        this.config = config;
        this.urlTree = urlTree;
        this.url = url;
        this.paramsInheritanceStrategy = paramsInheritanceStrategy;
        this.relativeLinkResolution = relativeLinkResolution;
    }
    /**
     * @return {?}
     */
    recognize() {
        try {
            /** @type {?} */
            const rootSegmentGroup = split(this.urlTree.root, [], [], this.config, this.relativeLinkResolution).segmentGroup;
            /** @type {?} */
            const children = this.processSegmentGroup(this.config, rootSegmentGroup, PRIMARY_OUTLET);
            /** @type {?} */
            const root = new ActivatedRouteSnapshot([], Object.freeze({}), Object.freeze(Object.assign({}, this.urlTree.queryParams)), /** @type {?} */ ((this.urlTree.fragment)), {}, PRIMARY_OUTLET, this.rootComponentType, null, this.urlTree.root, -1, {});
            /** @type {?} */
            const rootNode = new TreeNode(root, children);
            /** @type {?} */
            const routeState = new RouterStateSnapshot(this.url, rootNode);
            this.inheritParamsAndData(routeState._root);
            return of(routeState);
        }
        catch (e) {
            return new Observable((obs) => obs.error(e));
        }
    }
    /**
     * @param {?} routeNode
     * @return {?}
     */
    inheritParamsAndData(routeNode) {
        /** @type {?} */
        const route = routeNode.value;
        /** @type {?} */
        const i = inheritedParamsDataResolve(route, this.paramsInheritanceStrategy);
        route.params = Object.freeze(i.params);
        route.data = Object.freeze(i.data);
        routeNode.children.forEach(n => this.inheritParamsAndData(n));
    }
    /**
     * @param {?} config
     * @param {?} segmentGroup
     * @param {?} outlet
     * @return {?}
     */
    processSegmentGroup(config, segmentGroup, outlet) {
        if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
            return this.processChildren(config, segmentGroup);
        }
        return this.processSegment(config, segmentGroup, segmentGroup.segments, outlet);
    }
    /**
     * @param {?} config
     * @param {?} segmentGroup
     * @return {?}
     */
    processChildren(config, segmentGroup) {
        /** @type {?} */
        const children = mapChildrenIntoArray(segmentGroup, (child, childOutlet) => this.processSegmentGroup(config, child, childOutlet));
        checkOutletNameUniqueness(children);
        sortActivatedRouteSnapshots(children);
        return children;
    }
    /**
     * @param {?} config
     * @param {?} segmentGroup
     * @param {?} segments
     * @param {?} outlet
     * @return {?}
     */
    processSegment(config, segmentGroup, segments, outlet) {
        for (const r of config) {
            try {
                return this.processSegmentAgainstRoute(r, segmentGroup, segments, outlet);
            }
            catch (e) {
                if (!(e instanceof NoMatch))
                    throw e;
            }
        }
        if (this.noLeftoversInUrl(segmentGroup, segments, outlet)) {
            return [];
        }
        throw new NoMatch();
    }
    /**
     * @param {?} segmentGroup
     * @param {?} segments
     * @param {?} outlet
     * @return {?}
     */
    noLeftoversInUrl(segmentGroup, segments, outlet) {
        return segments.length === 0 && !segmentGroup.children[outlet];
    }
    /**
     * @param {?} route
     * @param {?} rawSegment
     * @param {?} segments
     * @param {?} outlet
     * @return {?}
     */
    processSegmentAgainstRoute(route, rawSegment, segments, outlet) {
        if (route.redirectTo)
            throw new NoMatch();
        if ((route.outlet || PRIMARY_OUTLET) !== outlet)
            throw new NoMatch();
        /** @type {?} */
        let snapshot;
        /** @type {?} */
        let consumedSegments = [];
        /** @type {?} */
        let rawSlicedSegments = [];
        if (route.path === '**') {
            /** @type {?} */
            const params = segments.length > 0 ? /** @type {?} */ ((last(segments))).parameters : {};
            snapshot = new ActivatedRouteSnapshot(segments, params, Object.freeze(Object.assign({}, this.urlTree.queryParams)), /** @type {?} */ ((this.urlTree.fragment)), getData(route), outlet, /** @type {?} */ ((route.component)), route, getSourceSegmentGroup(rawSegment), getPathIndexShift(rawSegment) + segments.length, getResolve(route));
        }
        else {
            /** @type {?} */
            const result = match(rawSegment, route, segments);
            consumedSegments = result.consumedSegments;
            rawSlicedSegments = segments.slice(result.lastChild);
            snapshot = new ActivatedRouteSnapshot(consumedSegments, result.parameters, Object.freeze(Object.assign({}, this.urlTree.queryParams)), /** @type {?} */ ((this.urlTree.fragment)), getData(route), outlet, /** @type {?} */ ((route.component)), route, getSourceSegmentGroup(rawSegment), getPathIndexShift(rawSegment) + consumedSegments.length, getResolve(route));
        }
        /** @type {?} */
        const childConfig = getChildConfig(route);
        const { segmentGroup, slicedSegments } = split(rawSegment, consumedSegments, rawSlicedSegments, childConfig, this.relativeLinkResolution);
        if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
            /** @type {?} */
            const children = this.processChildren(childConfig, segmentGroup);
            return [new TreeNode(snapshot, children)];
        }
        if (childConfig.length === 0 && slicedSegments.length === 0) {
            return [new TreeNode(snapshot, [])];
        }
        /** @type {?} */
        const children = this.processSegment(childConfig, segmentGroup, slicedSegments, PRIMARY_OUTLET);
        return [new TreeNode(snapshot, children)];
    }
}
if (false) {
    /** @type {?} */
    Recognizer.prototype.rootComponentType;
    /** @type {?} */
    Recognizer.prototype.config;
    /** @type {?} */
    Recognizer.prototype.urlTree;
    /** @type {?} */
    Recognizer.prototype.url;
    /** @type {?} */
    Recognizer.prototype.paramsInheritanceStrategy;
    /** @type {?} */
    Recognizer.prototype.relativeLinkResolution;
}
/**
 * @param {?} nodes
 * @return {?}
 */
function sortActivatedRouteSnapshots(nodes) {
    nodes.sort((a, b) => {
        if (a.value.outlet === PRIMARY_OUTLET)
            return -1;
        if (b.value.outlet === PRIMARY_OUTLET)
            return 1;
        return a.value.outlet.localeCompare(b.value.outlet);
    });
}
/**
 * @param {?} route
 * @return {?}
 */
function getChildConfig(route) {
    if (route.children) {
        return route.children;
    }
    if (route.loadChildren) {
        return /** @type {?} */ ((route._loadedConfig)).routes;
    }
    return [];
}
/**
 * @record
 */
function MatchResult() { }
/** @type {?} */
MatchResult.prototype.consumedSegments;
/** @type {?} */
MatchResult.prototype.lastChild;
/** @type {?} */
MatchResult.prototype.parameters;
/**
 * @param {?} segmentGroup
 * @param {?} route
 * @param {?} segments
 * @return {?}
 */
function match(segmentGroup, route, segments) {
    if (route.path === '') {
        if (route.pathMatch === 'full' && (segmentGroup.hasChildren() || segments.length > 0)) {
            throw new NoMatch();
        }
        return { consumedSegments: [], lastChild: 0, parameters: {} };
    }
    /** @type {?} */
    const matcher = route.matcher || defaultUrlMatcher;
    /** @type {?} */
    const res = matcher(segments, segmentGroup, route);
    if (!res)
        throw new NoMatch();
    /** @type {?} */
    const posParams = {};
    forEach(/** @type {?} */ ((res.posParams)), (v, k) => { posParams[k] = v.path; });
    /** @type {?} */
    const parameters = res.consumed.length > 0 ? Object.assign({}, posParams, res.consumed[res.consumed.length - 1].parameters) :
        posParams;
    return { consumedSegments: res.consumed, lastChild: res.consumed.length, parameters };
}
/**
 * @param {?} nodes
 * @return {?}
 */
function checkOutletNameUniqueness(nodes) {
    /** @type {?} */
    const names = {};
    nodes.forEach(n => {
        /** @type {?} */
        const routeWithSameOutletName = names[n.value.outlet];
        if (routeWithSameOutletName) {
            /** @type {?} */
            const p = routeWithSameOutletName.url.map(s => s.toString()).join('/');
            /** @type {?} */
            const c = n.value.url.map(s => s.toString()).join('/');
            throw new Error(`Two segments cannot have the same outlet name: '${p}' and '${c}'.`);
        }
        names[n.value.outlet] = n.value;
    });
}
/**
 * @param {?} segmentGroup
 * @return {?}
 */
function getSourceSegmentGroup(segmentGroup) {
    /** @type {?} */
    let s = segmentGroup;
    while (s._sourceSegment) {
        s = s._sourceSegment;
    }
    return s;
}
/**
 * @param {?} segmentGroup
 * @return {?}
 */
function getPathIndexShift(segmentGroup) {
    /** @type {?} */
    let s = segmentGroup;
    /** @type {?} */
    let res = (s._segmentIndexShift ? s._segmentIndexShift : 0);
    while (s._sourceSegment) {
        s = s._sourceSegment;
        res += (s._segmentIndexShift ? s._segmentIndexShift : 0);
    }
    return res - 1;
}
/**
 * @param {?} segmentGroup
 * @param {?} consumedSegments
 * @param {?} slicedSegments
 * @param {?} config
 * @param {?} relativeLinkResolution
 * @return {?}
 */
function split(segmentGroup, consumedSegments, slicedSegments, config, relativeLinkResolution) {
    if (slicedSegments.length > 0 &&
        containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config)) {
        /** @type {?} */
        const s = new UrlSegmentGroup(consumedSegments, createChildrenForEmptyPaths(segmentGroup, consumedSegments, config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
        s._sourceSegment = segmentGroup;
        s._segmentIndexShift = consumedSegments.length;
        return { segmentGroup: s, slicedSegments: [] };
    }
    if (slicedSegments.length === 0 &&
        containsEmptyPathMatches(segmentGroup, slicedSegments, config)) {
        /** @type {?} */
        const s = new UrlSegmentGroup(segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, consumedSegments, slicedSegments, config, segmentGroup.children, relativeLinkResolution));
        s._sourceSegment = segmentGroup;
        s._segmentIndexShift = consumedSegments.length;
        return { segmentGroup: s, slicedSegments };
    }
    /** @type {?} */
    const s = new UrlSegmentGroup(segmentGroup.segments, segmentGroup.children);
    s._sourceSegment = segmentGroup;
    s._segmentIndexShift = consumedSegments.length;
    return { segmentGroup: s, slicedSegments };
}
/**
 * @param {?} segmentGroup
 * @param {?} consumedSegments
 * @param {?} slicedSegments
 * @param {?} routes
 * @param {?} children
 * @param {?} relativeLinkResolution
 * @return {?}
 */
function addEmptyPathsToChildrenIfNeeded(segmentGroup, consumedSegments, slicedSegments, routes, children, relativeLinkResolution) {
    /** @type {?} */
    const res = {};
    for (const r of routes) {
        if (emptyPathMatch(segmentGroup, slicedSegments, r) && !children[getOutlet(r)]) {
            /** @type {?} */
            const s = new UrlSegmentGroup([], {});
            s._sourceSegment = segmentGroup;
            if (relativeLinkResolution === 'legacy') {
                s._segmentIndexShift = segmentGroup.segments.length;
            }
            else {
                s._segmentIndexShift = consumedSegments.length;
            }
            res[getOutlet(r)] = s;
        }
    }
    return Object.assign({}, children, res);
}
/**
 * @param {?} segmentGroup
 * @param {?} consumedSegments
 * @param {?} routes
 * @param {?} primarySegment
 * @return {?}
 */
function createChildrenForEmptyPaths(segmentGroup, consumedSegments, routes, primarySegment) {
    /** @type {?} */
    const res = {};
    res[PRIMARY_OUTLET] = primarySegment;
    primarySegment._sourceSegment = segmentGroup;
    primarySegment._segmentIndexShift = consumedSegments.length;
    for (const r of routes) {
        if (r.path === '' && getOutlet(r) !== PRIMARY_OUTLET) {
            /** @type {?} */
            const s = new UrlSegmentGroup([], {});
            s._sourceSegment = segmentGroup;
            s._segmentIndexShift = consumedSegments.length;
            res[getOutlet(r)] = s;
        }
    }
    return res;
}
/**
 * @param {?} segmentGroup
 * @param {?} slicedSegments
 * @param {?} routes
 * @return {?}
 */
function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes) {
    return routes.some(r => emptyPathMatch(segmentGroup, slicedSegments, r) && getOutlet(r) !== PRIMARY_OUTLET);
}
/**
 * @param {?} segmentGroup
 * @param {?} slicedSegments
 * @param {?} routes
 * @return {?}
 */
function containsEmptyPathMatches(segmentGroup, slicedSegments, routes) {
    return routes.some(r => emptyPathMatch(segmentGroup, slicedSegments, r));
}
/**
 * @param {?} segmentGroup
 * @param {?} slicedSegments
 * @param {?} r
 * @return {?}
 */
function emptyPathMatch(segmentGroup, slicedSegments, r) {
    if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === 'full') {
        return false;
    }
    return r.path === '' && r.redirectTo === undefined;
}
/**
 * @param {?} route
 * @return {?}
 */
function getOutlet(route) {
    return route.outlet || PRIMARY_OUTLET;
}
/**
 * @param {?} route
 * @return {?}
 */
function getData(route) {
    return route.data || {};
}
/**
 * @param {?} route
 * @return {?}
 */
function getResolve(route) {
    return route.resolve || {};
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb2duaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9yZWNvZ25pemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFTQSxPQUFPLEVBQUMsVUFBVSxFQUFZLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUcvQyxPQUFPLEVBQUMsc0JBQXNCLEVBQTZCLG1CQUFtQixFQUFFLDBCQUEwQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEksT0FBTyxFQUFDLGNBQWMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMzRCxPQUFPLEVBQWEsZUFBZSxFQUFXLG9CQUFvQixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUV0QztDQUFnQjs7Ozs7Ozs7OztBQUVoQixNQUFNLG9CQUNGLGlCQUFrQyxFQUFFLE1BQWMsRUFBRSxPQUFnQixFQUFFLEdBQVcsRUFDakYsNEJBQXVELFdBQVcsRUFDbEUseUJBQWlELFFBQVE7SUFDM0QsT0FBTyxJQUFJLFVBQVUsQ0FDVixpQkFBaUIsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSx5QkFBeUIsRUFDbEUsc0JBQXNCLENBQUM7U0FDN0IsU0FBUyxFQUFFLENBQUM7Q0FDbEI7QUFFRDs7Ozs7Ozs7O0lBQ0UsWUFDWSxtQkFBMkMsTUFBYyxFQUFVLE9BQWdCLEVBQ25GLEtBQXFCLHlCQUFvRCxFQUN6RTtRQUZBLHNCQUFpQixHQUFqQixpQkFBaUI7UUFBMEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDbkYsUUFBRyxHQUFILEdBQUc7UUFBa0IsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEy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O0FBRUQsaUJBQWlCLEtBQVk7SUFDM0IsT0FBTyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztDQUN6Qjs7Ozs7QUFFRCxvQkFBb0IsS0FBWTtJQUM5QixPQUFPLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO0NBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1R5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBPYnNlcnZlciwgb2YgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtEYXRhLCBSZXNvbHZlRGF0YSwgUm91dGUsIFJvdXRlc30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBQYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5LCBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBpbmhlcml0ZWRQYXJhbXNEYXRhUmVzb2x2ZX0gZnJvbSAnLi9yb3V0ZXJfc3RhdGUnO1xuaW1wb3J0IHtQUklNQVJZX09VVExFVCwgZGVmYXVsdFVybE1hdGNoZXJ9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7VXJsU2VnbWVudCwgVXJsU2VnbWVudEdyb3VwLCBVcmxUcmVlLCBtYXBDaGlsZHJlbkludG9BcnJheX0gZnJvbSAnLi91cmxfdHJlZSc7XG5pbXBvcnQge2ZvckVhY2gsIGxhc3R9IGZyb20gJy4vdXRpbHMvY29sbGVjdGlvbic7XG5pbXBvcnQge1RyZWVOb2RlfSBmcm9tICcuL3V0aWxzL3RyZWUnO1xuXG5jbGFzcyBOb01hdGNoIHt9XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNvZ25pemUoXG4gICAgcm9vdENvbXBvbmVudFR5cGU6IFR5cGU8YW55PnwgbnVsbCwgY29uZmlnOiBSb3V0ZXMsIHVybFRyZWU6IFVybFRyZWUsIHVybDogc3RyaW5nLFxuICAgIHBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3k6IFBhcmFtc0luaGVyaXRhbmNlU3RyYXRlZ3kgPSAnZW1wdHlPbmx5JyxcbiAgICByZWxhdGl2ZUxpbmtSZXNvbHV0aW9uOiAnbGVnYWN5JyB8ICdjb3JyZWN0ZWQnID0gJ2xlZ2FjeScpOiBPYnNlcnZhYmxlPFJvdXRlclN0YXRlU25hcHNob3Q+IHtcbiAgcmV0dXJuIG5ldyBSZWNvZ25pemVyKFxuICAgICAgICAgICAgIHJvb3RDb21wb25lbnRUeXBlLCBjb25maWcsIHVybFRyZWUsIHVybCwgcGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneSxcbiAgICAgICAgICAgICByZWxhdGl2ZUxpbmtSZXNvbHV0aW9uKVxuICAgICAgLnJlY29nbml6ZSgpO1xufVxuXG5jbGFzcyBSZWNvZ25pemVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvb3RDb21wb25lbnRUeXBlOiBUeXBlPGFueT58bnVsbCwgcHJpdmF0ZSBjb25maWc6IFJvdXRlcywgcHJpdmF0ZSB1cmxUcmVlOiBVcmxUcmVlLFxuICAgICAgcHJpdmF0ZSB1cmw6IHN0cmluZywgcHJpdmF0ZSBwYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5OiBQYXJhbXNJbmhlcml0YW5jZVN0cmF0ZWd5LFxuICAgICAgcHJpdmF0ZSByZWxhdGl2ZUxpbmtSZXNvbHV0aW9uOiAnbGVnYWN5J3wnY29ycmVjdGVkJykge31cblxuICByZWNvZ25pemUoKTogT2JzZXJ2YWJsZTxSb3V0ZXJTdGF0ZVNuYXBzaG90PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJvb3RTZWdtZW50R3JvdXAgPVxuICAgICAgICAgIHNwbGl0KHRoaXMudXJsVHJlZS5yb290LCBbXSwgW10sIHRoaXMuY29uZmlnLCB0aGlzLnJlbGF0aXZlTGlua1Jlc29sdXRpb24pLnNlZ21lbnRHcm91cDtcblxuICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLnByb2Nlc3NTZWdtZW50R3JvdXAodGhpcy5jb25maWcsIHJvb3RTZWdtZW50R3JvdXAsIFBSSU1BUllfT1VUTEVUKTtcblxuICAgICAgY29uc3Qgcm9vdCA9IG5ldyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KFxuICAgICAgICAgIFtdLCBPYmplY3QuZnJlZXplKHt9KSwgT2JqZWN0LmZyZWV6ZSh7Li4udGhpcy51cmxUcmVlLnF1ZXJ5UGFyYW1zfSksXG4gICAgICAgICAgdGhpcy51cmxUcmVlLmZyYWdtZW50ICEsIHt9LCBQUklNQVJZX09VVExFVCwgdGhpcy5yb290Q29tcG9uZW50VHlwZSwgbnVsbCxcbiAgICAgICAgICB0aGlzLnVybFRyZWUucm9vdCwgLTEsIHt9KTtcblxuICAgICAgY29uc3Qgcm9vdE5vZGUgPSBuZXcgVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4ocm9vdCwgY2hpbGRyZW4pO1xuICAgICAgY29uc3Qgcm91dGVTdGF0ZSA9IG5ldyBSb3V0ZXJTdGF0ZVNuYXBzaG90KHRoaXMudXJsLCByb290Tm9kZSk7XG4gICAgICB0aGlzLmluaGVyaXRQYXJhbXNBbmREYXRhKHJvdXRlU3RhdGUuX3Jvb3QpO1xuICAgICAgcmV0dXJuIG9mIChyb3V0ZVN0YXRlKTtcblxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxSb3V0ZXJTdGF0ZVNuYXBzaG90PihcbiAgICAgICAgICAob2JzOiBPYnNlcnZlcjxSb3V0ZXJTdGF0ZVNuYXBzaG90PikgPT4gb2JzLmVycm9yKGUpKTtcbiAgICB9XG4gIH1cblxuICBpbmhlcml0UGFyYW1zQW5kRGF0YShyb3V0ZU5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+KTogdm9pZCB7XG4gICAgY29uc3Qgcm91dGUgPSByb3V0ZU5vZGUudmFsdWU7XG5cbiAgICBjb25zdCBpID0gaW5oZXJpdGVkUGFyYW1zRGF0YVJlc29sdmUocm91dGUsIHRoaXMucGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneSk7XG4gICAgcm91dGUucGFyYW1zID0gT2JqZWN0LmZyZWV6ZShpLnBhcmFtcyk7XG4gICAgcm91dGUuZGF0YSA9IE9iamVjdC5mcmVlemUoaS5kYXRhKTtcblxuICAgIHJvdXRlTm9kZS5jaGlsZHJlbi5mb3JFYWNoKG4gPT4gdGhpcy5pbmhlcml0UGFyYW1zQW5kRGF0YShuKSk7XG4gIH1cblxuICBwcm9jZXNzU2VnbWVudEdyb3VwKGNvbmZpZzogUm91dGVbXSwgc2VnbWVudEdyb3VwOiBVcmxTZWdtZW50R3JvdXAsIG91dGxldDogc3RyaW5nKTpcbiAgICAgIFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+W10ge1xuICAgIGlmIChzZWdtZW50R3JvdXAuc2VnbWVudHMubGVuZ3RoID09PSAwICYmIHNlZ21lbnRHcm91cC5oYXNDaGlsZHJlbigpKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9jZXNzQ2hpbGRyZW4oY29uZmlnLCBzZWdtZW50R3JvdXApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnByb2Nlc3NTZWdtZW50KGNvbmZpZywgc2VnbWVudEdyb3VwLCBzZWdtZW50R3JvdXAuc2VnbWVudHMsIG91dGxldCk7XG4gIH1cblxuICBwcm9jZXNzQ2hpbGRyZW4oY29uZmlnOiBSb3V0ZVtdLCBzZWdtZW50R3JvdXA6IFVybFNlZ21lbnRHcm91cCk6XG4gICAgICBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PltdIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IG1hcENoaWxkcmVuSW50b0FycmF5KFxuICAgICAgICBzZWdtZW50R3JvdXAsIChjaGlsZCwgY2hpbGRPdXRsZXQpID0+IHRoaXMucHJvY2Vzc1NlZ21lbnRHcm91cChjb25maWcsIGNoaWxkLCBjaGlsZE91dGxldCkpO1xuICAgIGNoZWNrT3V0bGV0TmFtZVVuaXF1ZW5lc3MoY2hpbGRyZW4pO1xuICAgIHNvcnRBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90cyhjaGlsZHJlbik7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgcHJvY2Vzc1NlZ21lbnQoXG4gICAgICBjb25maWc6IFJvdXRlW10sIHNlZ21lbnRHcm91cDogVXJsU2VnbWVudEdyb3VwLCBzZWdtZW50czogVXJsU2VnbWVudFtdLFxuICAgICAgb3V0bGV0OiBzdHJpbmcpOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PltdIHtcbiAgICBmb3IgKGNvbnN0IHIgb2YgY29uZmlnKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzU2VnbWVudEFnYWluc3RSb3V0ZShyLCBzZWdtZW50R3JvdXAsIHNlZ21lbnRzLCBvdXRsZXQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoIShlIGluc3RhbmNlb2YgTm9NYXRjaCkpIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm5vTGVmdG92ZXJzSW5Vcmwoc2VnbWVudEdyb3VwLCBzZWdtZW50cywgb3V0bGV0KSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBOb01hdGNoKCk7XG4gIH1cblxuICBwcml2YXRlIG5vTGVmdG92ZXJzSW5Vcmwoc2VnbWVudEdyb3VwOiBVcmxTZWdtZW50R3JvdXAsIHNlZ21lbnRzOiBVcmxTZWdtZW50W10sIG91dGxldDogc3RyaW5nKTpcbiAgICAgIGJvb2xlYW4ge1xuICAgIHJldHVybiBzZWdtZW50cy5sZW5ndGggPT09IDAgJiYgIXNlZ21lbnRHcm91cC5jaGlsZHJlbltvdXRsZXRdO1xuICB9XG5cbiAgcHJvY2Vzc1NlZ21lbnRBZ2FpbnN0Um91dGUoXG4gICAgICByb3V0ZTogUm91dGUsIHJhd1NlZ21lbnQ6IFVybFNlZ21lbnRHcm91cCwgc2VnbWVudHM6IFVybFNlZ21lbnRbXSxcbiAgICAgIG91dGxldDogc3RyaW5nKTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD5bXSB7XG4gICAgaWYgKHJvdXRlLnJlZGlyZWN0VG8pIHRocm93IG5ldyBOb01hdGNoKCk7XG5cbiAgICBpZiAoKHJvdXRlLm91dGxldCB8fCBQUklNQVJZX09VVExFVCkgIT09IG91dGxldCkgdGhyb3cgbmV3IE5vTWF0Y2goKTtcblxuICAgIGxldCBzbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdDtcbiAgICBsZXQgY29uc3VtZWRTZWdtZW50czogVXJsU2VnbWVudFtdID0gW107XG4gICAgbGV0IHJhd1NsaWNlZFNlZ21lbnRzOiBVcmxTZWdtZW50W10gPSBbXTtcblxuICAgIGlmIChyb3V0ZS5wYXRoID09PSAnKionKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSBzZWdtZW50cy5sZW5ndGggPiAwID8gbGFzdChzZWdtZW50cykgIS5wYXJhbWV0ZXJzIDoge307XG4gICAgICBzbmFwc2hvdCA9IG5ldyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KFxuICAgICAgICAgIHNlZ21lbnRzLCBwYXJhbXMsIE9iamVjdC5mcmVlemUoey4uLnRoaXMudXJsVHJlZS5xdWVyeVBhcmFtc30pLCB0aGlzLnVybFRyZWUuZnJhZ21lbnQgISxcbiAgICAgICAgICBnZXREYXRhKHJvdXRlKSwgb3V0bGV0LCByb3V0ZS5jb21wb25lbnQgISwgcm91dGUsIGdldFNvdXJjZVNlZ21lbnRHcm91cChyYXdTZWdtZW50KSxcbiAgICAgICAgICBnZXRQYXRoSW5kZXhTaGlmdChyYXdTZWdtZW50KSArIHNlZ21lbnRzLmxlbmd0aCwgZ2V0UmVzb2x2ZShyb3V0ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZXN1bHQ6IE1hdGNoUmVzdWx0ID0gbWF0Y2gocmF3U2VnbWVudCwgcm91dGUsIHNlZ21lbnRzKTtcbiAgICAgIGNvbnN1bWVkU2VnbWVudHMgPSByZXN1bHQuY29uc3VtZWRTZWdtZW50cztcbiAgICAgIHJhd1NsaWNlZFNlZ21lbnRzID0gc2VnbWVudHMuc2xpY2UocmVzdWx0Lmxhc3RDaGlsZCk7XG5cbiAgICAgIHNuYXBzaG90ID0gbmV3IEFjdGl2YXRlZFJvdXRlU25hcHNob3QoXG4gICAgICAgICAgY29uc3VtZWRTZWdtZW50cywgcmVzdWx0LnBhcmFtZXRlcnMsIE9iamVjdC5mcmVlemUoey4uLnRoaXMudXJsVHJlZS5xdWVyeVBhcmFtc30pLFxuICAgICAgICAgIHRoaXMudXJsVHJlZS5mcmFnbWVudCAhLCBnZXREYXRhKHJvdXRlKSwgb3V0bGV0LCByb3V0ZS5jb21wb25lbnQgISwgcm91dGUsXG4gICAgICAgICAgZ2V0U291cmNlU2VnbWVudEdyb3VwKHJhd1NlZ21lbnQpLFxuICAgICAgICAgIGdldFBhdGhJbmRleFNoaWZ0KHJhd1NlZ21lbnQpICsgY29uc3VtZWRTZWdtZW50cy5sZW5ndGgsIGdldFJlc29sdmUocm91dGUpKTtcbiAgICB9XG5cbiAgICBjb25zdCBjaGlsZENvbmZpZzogUm91dGVbXSA9IGdldENoaWxkQ29uZmlnKHJvdXRlKTtcblxuICAgIGNvbnN0IHtzZWdtZW50R3JvdXAsIHNsaWNlZFNlZ21lbnRzfSA9IHNwbGl0KFxuICAgICAgICByYXdTZWdtZW50LCBjb25zdW1lZFNlZ21lbnRzLCByYXdTbGljZWRTZWdtZW50cywgY2hpbGRDb25maWcsIHRoaXMucmVsYXRpdmVMaW5rUmVzb2x1dGlvbik7XG5cbiAgICBpZiAoc2xpY2VkU2VnbWVudHMubGVuZ3RoID09PSAwICYmIHNlZ21lbnRHcm91cC5oYXNDaGlsZHJlbigpKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMucHJvY2Vzc0NoaWxkcmVuKGNoaWxkQ29uZmlnLCBzZWdtZW50R3JvdXApO1xuICAgICAgcmV0dXJuIFtuZXcgVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4oc25hcHNob3QsIGNoaWxkcmVuKV07XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkQ29uZmlnLmxlbmd0aCA9PT0gMCAmJiBzbGljZWRTZWdtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBbbmV3IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+KHNuYXBzaG90LCBbXSldO1xuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5wcm9jZXNzU2VnbWVudChjaGlsZENvbmZpZywgc2VnbWVudEdyb3VwLCBzbGljZWRTZWdtZW50cywgUFJJTUFSWV9PVVRMRVQpO1xuICAgIHJldHVybiBbbmV3IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+KHNuYXBzaG90LCBjaGlsZHJlbildO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNvcnRBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90cyhub2RlczogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD5bXSk6IHZvaWQge1xuICBub2Rlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYgKGEudmFsdWUub3V0bGV0ID09PSBQUklNQVJZX09VVExFVCkgcmV0dXJuIC0xO1xuICAgIGlmIChiLnZhbHVlLm91dGxldCA9PT0gUFJJTUFSWV9PVVRMRVQpIHJldHVybiAxO1xuICAgIHJldHVybiBhLnZhbHVlLm91dGxldC5sb2NhbGVDb21wYXJlKGIudmFsdWUub3V0bGV0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldENoaWxkQ29uZmlnKHJvdXRlOiBSb3V0ZSk6IFJvdXRlW10ge1xuICBpZiAocm91dGUuY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gcm91dGUuY2hpbGRyZW47XG4gIH1cblxuICBpZiAocm91dGUubG9hZENoaWxkcmVuKSB7XG4gICAgcmV0dXJuIHJvdXRlLl9sb2FkZWRDb25maWcgIS5yb3V0ZXM7XG4gIH1cblxuICByZXR1cm4gW107XG59XG5cbmludGVyZmFjZSBNYXRjaFJlc3VsdCB7XG4gIGNvbnN1bWVkU2VnbWVudHM6IFVybFNlZ21lbnRbXTtcbiAgbGFzdENoaWxkOiBudW1iZXI7XG4gIHBhcmFtZXRlcnM6IGFueTtcbn1cblxuZnVuY3Rpb24gbWF0Y2goc2VnbWVudEdyb3VwOiBVcmxTZWdtZW50R3JvdXAsIHJvdXRlOiBSb3V0ZSwgc2VnbWVudHM6IFVybFNlZ21lbnRbXSk6IE1hdGNoUmVzdWx0IHtcbiAgaWYgKHJvdXRlLnBhdGggPT09ICcnKSB7XG4gICAgaWYgKHJvdXRlLnBhdGhNYXRjaCA9PT0gJ2Z1bGwnICYmIChzZWdtZW50R3JvdXAuaGFzQ2hpbGRyZW4oKSB8fCBzZWdtZW50cy5sZW5ndGggPiAwKSkge1xuICAgICAgdGhyb3cgbmV3IE5vTWF0Y2goKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge2NvbnN1bWVkU2VnbWVudHM6IFtdLCBsYXN0Q2hpbGQ6IDAsIHBhcmFtZXRlcnM6IHt9fTtcbiAgfVxuXG4gIGNvbnN0IG1hdGNoZXIgPSByb3V0ZS5tYXRjaGVyIHx8IGRlZmF1bHRVcmxNYXRjaGVyO1xuICBjb25zdCByZXMgPSBtYXRjaGVyKHNlZ21lbnRzLCBzZWdtZW50R3JvdXAsIHJvdXRlKTtcbiAgaWYgKCFyZXMpIHRocm93IG5ldyBOb01hdGNoKCk7XG5cbiAgY29uc3QgcG9zUGFyYW1zOiB7W246IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgZm9yRWFjaChyZXMucG9zUGFyYW1zICEsICh2OiBVcmxTZWdtZW50LCBrOiBzdHJpbmcpID0+IHsgcG9zUGFyYW1zW2tdID0gdi5wYXRoOyB9KTtcbiAgY29uc3QgcGFyYW1ldGVycyA9IHJlcy5jb25zdW1lZC5sZW5ndGggPiAwID9cbiAgICAgIHsuLi5wb3NQYXJhbXMsIC4uLnJlcy5jb25zdW1lZFtyZXMuY29uc3VtZWQubGVuZ3RoIC0gMV0ucGFyYW1ldGVyc30gOlxuICAgICAgcG9zUGFyYW1zO1xuXG4gIHJldHVybiB7Y29uc3VtZWRTZWdtZW50czogcmVzLmNvbnN1bWVkLCBsYXN0Q2hpbGQ6IHJlcy5jb25zdW1lZC5sZW5ndGgsIHBhcmFtZXRlcnN9O1xufVxuXG5mdW5jdGlvbiBjaGVja091dGxldE5hbWVVbmlxdWVuZXNzKG5vZGVzOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PltdKTogdm9pZCB7XG4gIGNvbnN0IG5hbWVzOiB7W2s6IHN0cmluZ106IEFjdGl2YXRlZFJvdXRlU25hcHNob3R9ID0ge307XG4gIG5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgY29uc3Qgcm91dGVXaXRoU2FtZU91dGxldE5hbWUgPSBuYW1lc1tuLnZhbHVlLm91dGxldF07XG4gICAgaWYgKHJvdXRlV2l0aFNhbWVPdXRsZXROYW1lKSB7XG4gICAgICBjb25zdCBwID0gcm91dGVXaXRoU2FtZU91dGxldE5hbWUudXJsLm1hcChzID0+IHMudG9TdHJpbmcoKSkuam9pbignLycpO1xuICAgICAgY29uc3QgYyA9IG4udmFsdWUudXJsLm1hcChzID0+IHMudG9TdHJpbmcoKSkuam9pbignLycpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUd28gc2VnbWVudHMgY2Fubm90IGhhdmUgdGhlIHNhbWUgb3V0bGV0IG5hbWU6ICcke3B9JyBhbmQgJyR7Y30nLmApO1xuICAgIH1cbiAgICBuYW1lc1tuLnZhbHVlLm91dGxldF0gPSBuLnZhbHVlO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlU2VnbWVudEdyb3VwKHNlZ21lbnRHcm91cDogVXJsU2VnbWVudEdyb3VwKTogVXJsU2VnbWVudEdyb3VwIHtcbiAgbGV0IHMgPSBzZWdtZW50R3JvdXA7XG4gIHdoaWxlIChzLl9zb3VyY2VTZWdtZW50KSB7XG4gICAgcyA9IHMuX3NvdXJjZVNlZ21lbnQ7XG4gIH1cbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGdldFBhdGhJbmRleFNoaWZ0KHNlZ21lbnRHcm91cDogVXJsU2VnbWVudEdyb3VwKTogbnVtYmVyIHtcbiAgbGV0IHMgPSBzZWdtZW50R3JvdXA7XG4gIGxldCByZXMgPSAocy5fc2VnbWVudEluZGV4U2hpZnQgPyBzLl9zZWdtZW50SW5kZXhTaGlmdCA6IDApO1xuICB3aGlsZSAocy5fc291cmNlU2VnbWVudCkge1xuICAgIHMgPSBzLl9zb3VyY2VTZWdtZW50O1xuICAgIHJlcyArPSAocy5fc2VnbWVudEluZGV4U2hpZnQgPyBzLl9zZWdtZW50SW5kZXhTaGlmdCA6IDApO1xuICB9XG4gIHJldHVybiByZXMgLSAxO1xufVxuXG5mdW5jdGlvbiBzcGxpdChcbiAgICBzZWdtZW50R3JvdXA6IFVybFNlZ21lbnRHcm91cCwgY29uc3VtZWRTZWdtZW50czogVXJsU2VnbWVudFtdLCBzbGljZWRTZWdtZW50czogVXJsU2VnbWVudFtdLFxuICAgIGNvbmZpZzogUm91dGVbXSwgcmVsYXRpdmVMaW5rUmVzb2x1dGlvbjogJ2xlZ2FjeScgfCAnY29ycmVjdGVkJykge1xuICBpZiAoc2xpY2VkU2VnbWVudHMubGVuZ3RoID4gMCAmJlxuICAgICAgY29udGFpbnNFbXB0eVBhdGhNYXRjaGVzV2l0aE5hbWVkT3V0bGV0cyhzZWdtZW50R3JvdXAsIHNsaWNlZFNlZ21lbnRzLCBjb25maWcpKSB7XG4gICAgY29uc3QgcyA9IG5ldyBVcmxTZWdtZW50R3JvdXAoXG4gICAgICAgIGNvbnN1bWVkU2VnbWVudHMsIGNyZWF0ZUNoaWxkcmVuRm9yRW1wdHlQYXRocyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnRHcm91cCwgY29uc3VtZWRTZWdtZW50cywgY29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFVybFNlZ21lbnRHcm91cChzbGljZWRTZWdtZW50cywgc2VnbWVudEdyb3VwLmNoaWxkcmVuKSkpO1xuICAgIHMuX3NvdXJjZVNlZ21lbnQgPSBzZWdtZW50R3JvdXA7XG4gICAgcy5fc2VnbWVudEluZGV4U2hpZnQgPSBjb25zdW1lZFNlZ21lbnRzLmxlbmd0aDtcbiAgICByZXR1cm4ge3NlZ21lbnRHcm91cDogcywgc2xpY2VkU2VnbWVudHM6IFtdfTtcbiAgfVxuXG4gIGlmIChzbGljZWRTZWdtZW50cy5sZW5ndGggPT09IDAgJiZcbiAgICAgIGNvbnRhaW5zRW1wdHlQYXRoTWF0Y2hlcyhzZWdtZW50R3JvdXAsIHNsaWNlZFNlZ21lbnRzLCBjb25maWcpKSB7XG4gICAgY29uc3QgcyA9IG5ldyBVcmxTZWdtZW50R3JvdXAoXG4gICAgICAgIHNlZ21lbnRHcm91cC5zZWdtZW50cywgYWRkRW1wdHlQYXRoc1RvQ2hpbGRyZW5JZk5lZWRlZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnbWVudEdyb3VwLCBjb25zdW1lZFNlZ21lbnRzLCBzbGljZWRTZWdtZW50cywgY29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50R3JvdXAuY2hpbGRyZW4sIHJlbGF0aXZlTGlua1Jlc29sdXRpb24pKTtcbiAgICBzLl9zb3VyY2VTZWdtZW50ID0gc2VnbWVudEdyb3VwO1xuICAgIHMuX3NlZ21lbnRJbmRleFNoaWZ0ID0gY29uc3VtZWRTZWdtZW50cy5sZW5ndGg7XG4gICAgcmV0dXJuIHtzZWdtZW50R3JvdXA6IHMsIHNsaWNlZFNlZ21lbnRzfTtcbiAgfVxuXG4gIGNvbnN0IHMgPSBuZXcgVXJsU2VnbWVudEdyb3VwKHNlZ21lbnRHcm91cC5zZWdtZW50cywgc2VnbWVudEdyb3VwLmNoaWxkcmVuKTtcbiAgcy5fc291cmNlU2VnbWVudCA9IHNlZ21lbnRHcm91cDtcbiAgcy5fc2VnbWVudEluZGV4U2hpZnQgPSBjb25zdW1lZFNlZ21lbnRzLmxlbmd0aDtcbiAgcmV0dXJuIHtzZWdtZW50R3JvdXA6IHMsIHNsaWNlZFNlZ21lbnRzfTtcbn1cblxuZnVuY3Rpb24gYWRkRW1wdHlQYXRoc1RvQ2hpbGRyZW5JZk5lZWRlZChcbiAgICBzZWdtZW50R3JvdXA6IFVybFNlZ21lbnRHcm91cCwgY29uc3VtZWRTZWdtZW50czogVXJsU2VnbWVudFtdLCBzbGljZWRTZWdtZW50czogVXJsU2VnbWVudFtdLFxuICAgIHJvdXRlczogUm91dGVbXSwgY2hpbGRyZW46IHtbbmFtZTogc3RyaW5nXTogVXJsU2VnbWVudEdyb3VwfSxcbiAgICByZWxhdGl2ZUxpbmtSZXNvbHV0aW9uOiAnbGVnYWN5JyB8ICdjb3JyZWN0ZWQnKToge1tuYW1lOiBzdHJpbmddOiBVcmxTZWdtZW50R3JvdXB9IHtcbiAgY29uc3QgcmVzOiB7W25hbWU6IHN0cmluZ106IFVybFNlZ21lbnRHcm91cH0gPSB7fTtcbiAgZm9yIChjb25zdCByIG9mIHJvdXRlcykge1xuICAgIGlmIChlbXB0eVBhdGhNYXRjaChzZWdtZW50R3JvdXAsIHNsaWNlZFNlZ21lbnRzLCByKSAmJiAhY2hpbGRyZW5bZ2V0T3V0bGV0KHIpXSkge1xuICAgICAgY29uc3QgcyA9IG5ldyBVcmxTZWdtZW50R3JvdXAoW10sIHt9KTtcbiAgICAgIHMuX3NvdXJjZVNlZ21lbnQgPSBzZWdtZW50R3JvdXA7XG4gICAgICBpZiAocmVsYXRpdmVMaW5rUmVzb2x1dGlvbiA9PT0gJ2xlZ2FjeScpIHtcbiAgICAgICAgcy5fc2VnbWVudEluZGV4U2hpZnQgPSBzZWdtZW50R3JvdXAuc2VnbWVudHMubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcy5fc2VnbWVudEluZGV4U2hpZnQgPSBjb25zdW1lZFNlZ21lbnRzLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIHJlc1tnZXRPdXRsZXQocildID0gcztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsuLi5jaGlsZHJlbiwgLi4ucmVzfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2hpbGRyZW5Gb3JFbXB0eVBhdGhzKFxuICAgIHNlZ21lbnRHcm91cDogVXJsU2VnbWVudEdyb3VwLCBjb25zdW1lZFNlZ21lbnRzOiBVcmxTZWdtZW50W10sIHJvdXRlczogUm91dGVbXSxcbiAgICBwcmltYXJ5U2VnbWVudDogVXJsU2VnbWVudEdyb3VwKToge1tuYW1lOiBzdHJpbmddOiBVcmxTZWdtZW50R3JvdXB9IHtcbiAgY29uc3QgcmVzOiB7W25hbWU6IHN0cmluZ106IFVybFNlZ21lbnRHcm91cH0gPSB7fTtcbiAgcmVzW1BSSU1BUllfT1VUTEVUXSA9IHByaW1hcnlTZWdtZW50O1xuICBwcmltYXJ5U2VnbWVudC5fc291cmNlU2VnbWVudCA9IHNlZ21lbnRHcm91cDtcbiAgcHJpbWFyeVNlZ21lbnQuX3NlZ21lbnRJbmRleFNoaWZ0ID0gY29uc3VtZWRTZWdtZW50cy5sZW5ndGg7XG5cbiAgZm9yIChjb25zdCByIG9mIHJvdXRlcykge1xuICAgIGlmIChyLnBhdGggPT09ICcnICYmIGdldE91dGxldChyKSAhPT0gUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgIGNvbnN0IHMgPSBuZXcgVXJsU2VnbWVudEdyb3VwKFtdLCB7fSk7XG4gICAgICBzLl9zb3VyY2VTZWdtZW50ID0gc2VnbWVudEdyb3VwO1xuICAgICAgcy5fc2VnbWVudEluZGV4U2hpZnQgPSBjb25zdW1lZFNlZ21lbnRzLmxlbmd0aDtcbiAgICAgIHJlc1tnZXRPdXRsZXQocildID0gcztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gY29udGFpbnNFbXB0eVBhdGhNYXRjaGVzV2l0aE5hbWVkT3V0bGV0cyhcbiAgICBzZWdtZW50R3JvdXA6IFVybFNlZ21lbnRHcm91cCwgc2xpY2VkU2VnbWVudHM6IFVybFNlZ21lbnRbXSwgcm91dGVzOiBSb3V0ZVtdKTogYm9vbGVhbiB7XG4gIHJldHVybiByb3V0ZXMuc29tZShcbiAgICAgIHIgPT4gZW1wdHlQYXRoTWF0Y2goc2VnbWVudEdyb3VwLCBzbGljZWRTZWdtZW50cywgcikgJiYgZ2V0T3V0bGV0KHIpICE9PSBQUklNQVJZX09VVExFVCk7XG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5zRW1wdHlQYXRoTWF0Y2hlcyhcbiAgICBzZWdtZW50R3JvdXA6IFVybFNlZ21lbnRHcm91cCwgc2xpY2VkU2VnbWVudHM6IFVybFNlZ21lbnRbXSwgcm91dGVzOiBSb3V0ZVtdKTogYm9vbGVhbiB7XG4gIHJldHVybiByb3V0ZXMuc29tZShyID0+IGVtcHR5UGF0aE1hdGNoKHNlZ21lbnRHcm91cCwgc2xpY2VkU2VnbWVudHMsIHIpKTtcbn1cblxuZnVuY3Rpb24gZW1wdHlQYXRoTWF0Y2goXG4gICAgc2VnbWVudEdyb3VwOiBVcmxTZWdtZW50R3JvdXAsIHNsaWNlZFNlZ21lbnRzOiBVcmxTZWdtZW50W10sIHI6IFJvdXRlKTogYm9vbGVhbiB7XG4gIGlmICgoc2VnbWVudEdyb3VwLmhhc0NoaWxkcmVuKCkgfHwgc2xpY2VkU2VnbWVudHMubGVuZ3RoID4gMCkgJiYgci5wYXRoTWF0Y2ggPT09ICdmdWxsJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiByLnBhdGggPT09ICcnICYmIHIucmVkaXJlY3RUbyA9PT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBnZXRPdXRsZXQocm91dGU6IFJvdXRlKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJvdXRlLm91dGxldCB8fCBQUklNQVJZX09VVExFVDtcbn1cblxuZnVuY3Rpb24gZ2V0RGF0YShyb3V0ZTogUm91dGUpOiBEYXRhIHtcbiAgcmV0dXJuIHJvdXRlLmRhdGEgfHwge307XG59XG5cbmZ1bmN0aW9uIGdldFJlc29sdmUocm91dGU6IFJvdXRlKTogUmVzb2x2ZURhdGEge1xuICByZXR1cm4gcm91dGUucmVzb2x2ZSB8fCB7fTtcbn1cbiJdfQ==