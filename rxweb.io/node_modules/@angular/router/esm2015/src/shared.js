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
/** *
 * \@description
 *
 * Name of the primary outlet.
 *
 *
  @type {?} */
export const PRIMARY_OUTLET = 'primary';
/** @typedef {?} */
var Params;
export { Params };
/**
 * Matrix and Query parameters.
 *
 * `ParamMap` makes it easier to work with parameters as they could have either a single value or
 * multiple value. Because this should be known by the user, calling `get` or `getAll` returns the
 * correct type (either `string` or `string[]`).
 *
 * The API is inspired by the URLSearchParams interface.
 * see https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 *
 *
 * @record
 */
export function ParamMap() { }
/** @type {?} */
ParamMap.prototype.has;
/**
 * Return a single value for the given parameter name:
 * - the value when the parameter has a single value,
 * - the first value if the parameter has multiple values,
 * - `null` when there is no such parameter.
 * @type {?}
 */
ParamMap.prototype.get;
/**
 * Return an array of values for the given parameter name.
 *
 * If there is no such parameter, an empty array is returned.
 * @type {?}
 */
ParamMap.prototype.getAll;
/**
 * Name of the parameters
 * @type {?}
 */
ParamMap.prototype.keys;
class ParamsAsMap {
    /**
     * @param {?} params
     */
    constructor(params) { this.params = params || {}; }
    /**
     * @param {?} name
     * @return {?}
     */
    has(name) { return this.params.hasOwnProperty(name); }
    /**
     * @param {?} name
     * @return {?}
     */
    get(name) {
        if (this.has(name)) {
            /** @type {?} */
            const v = this.params[name];
            return Array.isArray(v) ? v[0] : v;
        }
        return null;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getAll(name) {
        if (this.has(name)) {
            /** @type {?} */
            const v = this.params[name];
            return Array.isArray(v) ? v : [v];
        }
        return [];
    }
    /**
     * @return {?}
     */
    get keys() { return Object.keys(this.params); }
}
if (false) {
    /** @type {?} */
    ParamsAsMap.prototype.params;
}
/**
 * Convert a `Params` instance to a `ParamMap`.
 *
 *
 * @param {?} params
 * @return {?}
 */
export function convertToParamMap(params) {
    return new ParamsAsMap(params);
}
/** @type {?} */
const NAVIGATION_CANCELING_ERROR = 'ngNavigationCancelingError';
/**
 * @param {?} message
 * @return {?}
 */
export function navigationCancelingError(message) {
    /** @type {?} */
    const error = Error('NavigationCancelingError: ' + message);
    (/** @type {?} */ (error))[NAVIGATION_CANCELING_ERROR] = true;
    return error;
}
/**
 * @param {?} error
 * @return {?}
 */
export function isNavigationCancelingError(error) {
    return error && (/** @type {?} */ (error))[NAVIGATION_CANCELING_ERROR];
}
/**
 * @param {?} segments
 * @param {?} segmentGroup
 * @param {?} route
 * @return {?}
 */
export function defaultUrlMatcher(segments, segmentGroup, route) {
    /** @type {?} */
    const parts = /** @type {?} */ ((route.path)).split('/');
    if (parts.length > segments.length) {
        // The actual URL is shorter than the config, no match
        return null;
    }
    if (route.pathMatch === 'full' &&
        (segmentGroup.hasChildren() || parts.length < segments.length)) {
        // The config is longer than the actual URL but we are looking for a full match, return null
        return null;
    }
    /** @type {?} */
    const posParams = {};
    // Check each config part against the actual URL
    for (let index = 0; index < parts.length; index++) {
        /** @type {?} */
        const part = parts[index];
        /** @type {?} */
        const segment = segments[index];
        /** @type {?} */
        const isParameter = part.startsWith(':');
        if (isParameter) {
            posParams[part.substring(1)] = segment;
        }
        else if (part !== segment.path) {
            // The actual URL part does not match the config, no match
            return null;
        }
    }
    return { consumed: segments.slice(0, parts.length), posParams };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcm91dGVyL3NyYy9zaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLGFBQWEsY0FBYyxHQUFHLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJDeEM7Ozs7SUFHRSxZQUFZLE1BQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFM0QsR0FBRyxDQUFDLElBQVksSUFBYSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRXZFLEdBQUcsQ0FBQyxJQUFZO1FBQ2QsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFOztZQUNsQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFFRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7OztJQUVELE1BQU0sQ0FBQyxJQUFZO1FBQ2pCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTs7WUFDbEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU8sRUFBRSxDQUFDO0tBQ1g7Ozs7SUFFRCxJQUFJLElBQUksS0FBZSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7Q0FDMUQ7Ozs7Ozs7Ozs7OztBQU9ELE1BQU0sNEJBQTRCLE1BQWM7SUFDOUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNoQzs7QUFFRCxNQUFNLDBCQUEwQixHQUFHLDRCQUE0QixDQUFDOzs7OztBQUVoRSxNQUFNLG1DQUFtQyxPQUFlOztJQUN0RCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsNEJBQTRCLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDNUQsbUJBQUMsS0FBWSxFQUFDLENBQUMsMEJBQTBCLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDbEQsT0FBTyxLQUFLLENBQUM7Q0FDZDs7Ozs7QUFFRCxNQUFNLHFDQUFxQyxLQUFZO0lBQ3JELE9BQU8sS0FBSyxJQUFJLG1CQUFDLEtBQVksRUFBQyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Q0FDNUQ7Ozs7Ozs7QUFHRCxNQUFNLDRCQUNGLFFBQXNCLEVBQUUsWUFBNkIsRUFBRSxLQUFZOztJQUNyRSxNQUFNLEtBQUssc0JBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFO0lBRXRDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFOztRQUVsQyxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLE1BQU07UUFDMUIsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7O1FBRWxFLE9BQU8sSUFBSSxDQUFDO0tBQ2I7O0lBRUQsTUFBTSxTQUFTLEdBQWdDLEVBQUUsQ0FBQzs7SUFHbEQsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7O1FBQ2pELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFDMUIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUNoQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksV0FBVyxFQUFFO1lBQ2YsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7U0FDeEM7YUFBTSxJQUFJLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxFQUFFOztZQUVoQyxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFFRCxPQUFPLEVBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUMsQ0FBQztDQUMvRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSb3V0ZSwgVXJsTWF0Y2hSZXN1bHR9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7VXJsU2VnbWVudCwgVXJsU2VnbWVudEdyb3VwfSBmcm9tICcuL3VybF90cmVlJztcblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIE5hbWUgb2YgdGhlIHByaW1hcnkgb3V0bGV0LlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBQUklNQVJZX09VVExFVCA9ICdwcmltYXJ5JztcblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2YgcGFyYW1ldGVycy5cbiAqXG4gKlxuICovXG5leHBvcnQgdHlwZSBQYXJhbXMgPSB7XG4gIFtrZXk6IHN0cmluZ106IGFueVxufTtcblxuLyoqXG4gKiBNYXRyaXggYW5kIFF1ZXJ5IHBhcmFtZXRlcnMuXG4gKlxuICogYFBhcmFtTWFwYCBtYWtlcyBpdCBlYXNpZXIgdG8gd29yayB3aXRoIHBhcmFtZXRlcnMgYXMgdGhleSBjb3VsZCBoYXZlIGVpdGhlciBhIHNpbmdsZSB2YWx1ZSBvclxuICogbXVsdGlwbGUgdmFsdWUuIEJlY2F1c2UgdGhpcyBzaG91bGQgYmUga25vd24gYnkgdGhlIHVzZXIsIGNhbGxpbmcgYGdldGAgb3IgYGdldEFsbGAgcmV0dXJucyB0aGVcbiAqIGNvcnJlY3QgdHlwZSAoZWl0aGVyIGBzdHJpbmdgIG9yIGBzdHJpbmdbXWApLlxuICpcbiAqIFRoZSBBUEkgaXMgaW5zcGlyZWQgYnkgdGhlIFVSTFNlYXJjaFBhcmFtcyBpbnRlcmZhY2UuXG4gKiBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTFNlYXJjaFBhcmFtc1xuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGFyYW1NYXAge1xuICBoYXMobmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFJldHVybiBhIHNpbmdsZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIHBhcmFtZXRlciBuYW1lOlxuICAgKiAtIHRoZSB2YWx1ZSB3aGVuIHRoZSBwYXJhbWV0ZXIgaGFzIGEgc2luZ2xlIHZhbHVlLFxuICAgKiAtIHRoZSBmaXJzdCB2YWx1ZSBpZiB0aGUgcGFyYW1ldGVyIGhhcyBtdWx0aXBsZSB2YWx1ZXMsXG4gICAqIC0gYG51bGxgIHdoZW4gdGhlcmUgaXMgbm8gc3VjaCBwYXJhbWV0ZXIuXG4gICAqL1xuICBnZXQobmFtZTogc3RyaW5nKTogc3RyaW5nfG51bGw7XG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gYXJyYXkgb2YgdmFsdWVzIGZvciB0aGUgZ2l2ZW4gcGFyYW1ldGVyIG5hbWUuXG4gICAqXG4gICAqIElmIHRoZXJlIGlzIG5vIHN1Y2ggcGFyYW1ldGVyLCBhbiBlbXB0eSBhcnJheSBpcyByZXR1cm5lZC5cbiAgICovXG4gIGdldEFsbChuYW1lOiBzdHJpbmcpOiBzdHJpbmdbXTtcblxuICAvKiogTmFtZSBvZiB0aGUgcGFyYW1ldGVycyAqL1xuICByZWFkb25seSBrZXlzOiBzdHJpbmdbXTtcbn1cblxuY2xhc3MgUGFyYW1zQXNNYXAgaW1wbGVtZW50cyBQYXJhbU1hcCB7XG4gIHByaXZhdGUgcGFyYW1zOiBQYXJhbXM7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiBQYXJhbXMpIHsgdGhpcy5wYXJhbXMgPSBwYXJhbXMgfHwge307IH1cblxuICBoYXMobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShuYW1lKTsgfVxuXG4gIGdldChuYW1lOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gICAgaWYgKHRoaXMuaGFzKG5hbWUpKSB7XG4gICAgICBjb25zdCB2ID0gdGhpcy5wYXJhbXNbbmFtZV07XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2KSA/IHZbMF0gOiB2O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0QWxsKG5hbWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5oYXMobmFtZSkpIHtcbiAgICAgIGNvbnN0IHYgPSB0aGlzLnBhcmFtc1tuYW1lXTtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHYpID8gdiA6IFt2XTtcbiAgICB9XG5cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXQga2V5cygpOiBzdHJpbmdbXSB7IHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnBhcmFtcyk7IH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgYFBhcmFtc2AgaW5zdGFuY2UgdG8gYSBgUGFyYW1NYXBgLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9QYXJhbU1hcChwYXJhbXM6IFBhcmFtcyk6IFBhcmFtTWFwIHtcbiAgcmV0dXJuIG5ldyBQYXJhbXNBc01hcChwYXJhbXMpO1xufVxuXG5jb25zdCBOQVZJR0FUSU9OX0NBTkNFTElOR19FUlJPUiA9ICduZ05hdmlnYXRpb25DYW5jZWxpbmdFcnJvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW9uQ2FuY2VsaW5nRXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gIGNvbnN0IGVycm9yID0gRXJyb3IoJ05hdmlnYXRpb25DYW5jZWxpbmdFcnJvcjogJyArIG1lc3NhZ2UpO1xuICAoZXJyb3IgYXMgYW55KVtOQVZJR0FUSU9OX0NBTkNFTElOR19FUlJPUl0gPSB0cnVlO1xuICByZXR1cm4gZXJyb3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc05hdmlnYXRpb25DYW5jZWxpbmdFcnJvcihlcnJvcjogRXJyb3IpIHtcbiAgcmV0dXJuIGVycm9yICYmIChlcnJvciBhcyBhbnkpW05BVklHQVRJT05fQ0FOQ0VMSU5HX0VSUk9SXTtcbn1cblxuLy8gTWF0Y2hlcyB0aGUgcm91dGUgY29uZmlndXJhdGlvbiAoYHJvdXRlYCkgYWdhaW5zdCB0aGUgYWN0dWFsIFVSTCAoYHNlZ21lbnRzYCkuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFVybE1hdGNoZXIoXG4gICAgc2VnbWVudHM6IFVybFNlZ21lbnRbXSwgc2VnbWVudEdyb3VwOiBVcmxTZWdtZW50R3JvdXAsIHJvdXRlOiBSb3V0ZSk6IFVybE1hdGNoUmVzdWx0fG51bGwge1xuICBjb25zdCBwYXJ0cyA9IHJvdXRlLnBhdGggIS5zcGxpdCgnLycpO1xuXG4gIGlmIChwYXJ0cy5sZW5ndGggPiBzZWdtZW50cy5sZW5ndGgpIHtcbiAgICAvLyBUaGUgYWN0dWFsIFVSTCBpcyBzaG9ydGVyIHRoYW4gdGhlIGNvbmZpZywgbm8gbWF0Y2hcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChyb3V0ZS5wYXRoTWF0Y2ggPT09ICdmdWxsJyAmJlxuICAgICAgKHNlZ21lbnRHcm91cC5oYXNDaGlsZHJlbigpIHx8IHBhcnRzLmxlbmd0aCA8IHNlZ21lbnRzLmxlbmd0aCkpIHtcbiAgICAvLyBUaGUgY29uZmlnIGlzIGxvbmdlciB0aGFuIHRoZSBhY3R1YWwgVVJMIGJ1dCB3ZSBhcmUgbG9va2luZyBmb3IgYSBmdWxsIG1hdGNoLCByZXR1cm4gbnVsbFxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgcG9zUGFyYW1zOiB7W2tleTogc3RyaW5nXTogVXJsU2VnbWVudH0gPSB7fTtcblxuICAvLyBDaGVjayBlYWNoIGNvbmZpZyBwYXJ0IGFnYWluc3QgdGhlIGFjdHVhbCBVUkxcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHBhcnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IHBhcnQgPSBwYXJ0c1tpbmRleF07XG4gICAgY29uc3Qgc2VnbWVudCA9IHNlZ21lbnRzW2luZGV4XTtcbiAgICBjb25zdCBpc1BhcmFtZXRlciA9IHBhcnQuc3RhcnRzV2l0aCgnOicpO1xuICAgIGlmIChpc1BhcmFtZXRlcikge1xuICAgICAgcG9zUGFyYW1zW3BhcnQuc3Vic3RyaW5nKDEpXSA9IHNlZ21lbnQ7XG4gICAgfSBlbHNlIGlmIChwYXJ0ICE9PSBzZWdtZW50LnBhdGgpIHtcbiAgICAgIC8vIFRoZSBhY3R1YWwgVVJMIHBhcnQgZG9lcyBub3QgbWF0Y2ggdGhlIGNvbmZpZywgbm8gbWF0Y2hcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7Y29uc3VtZWQ6IHNlZ21lbnRzLnNsaWNlKDAsIHBhcnRzLmxlbmd0aCksIHBvc1BhcmFtc307XG59XG4iXX0=