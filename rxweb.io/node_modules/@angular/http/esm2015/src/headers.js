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
/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
 *
 * The only known difference between this `Headers` implementation and the spec is the
 * lack of an `entries` method.
 *
 * ### Example
 *
 * ```
 * import {Headers} from '\@angular/http';
 *
 * var firstHeaders = new Headers();
 * firstHeaders.append('Content-Type', 'image/jpeg');
 * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
 *
 * // Create headers from Plain Old JavaScript Object
 * var secondHeaders = new Headers({
 *   'X-My-Custom-Header': 'Angular'
 * });
 * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
 *
 * var thirdHeaders = new Headers(secondHeaders);
 * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
export class Headers {
    /**
     * @param {?=} headers
     */
    constructor(headers) {
        /**
         * \@internal header names are lower case
         */
        this._headers = new Map();
        /**
         * \@internal map lower case names to actual names
         */
        this._normalizedNames = new Map();
        if (!headers) {
            return;
        }
        if (headers instanceof Headers) {
            headers.forEach((values, name) => {
                values.forEach(value => this.append(name, value));
            });
            return;
        }
        Object.keys(headers).forEach((name) => {
            /** @type {?} */
            const values = Array.isArray(headers[name]) ? headers[name] : [headers[name]];
            this.delete(name);
            values.forEach(value => this.append(name, value));
        });
    }
    /**
     * Returns a new Headers instance from the given DOMString of Response Headers
     * @param {?} headersString
     * @return {?}
     */
    static fromResponseHeaderString(headersString) {
        /** @type {?} */
        const headers = new Headers();
        headersString.split('\n').forEach(line => {
            /** @type {?} */
            const index = line.indexOf(':');
            if (index > 0) {
                /** @type {?} */
                const name = line.slice(0, index);
                /** @type {?} */
                const value = line.slice(index + 1).trim();
                headers.set(name, value);
            }
        });
        return headers;
    }
    /**
     * Appends a header to existing list of header values for a given header name.
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    append(name, value) {
        /** @type {?} */
        const values = this.getAll(name);
        if (values === null) {
            this.set(name, value);
        }
        else {
            values.push(value);
        }
    }
    /**
     * Deletes all header values for the given name.
     * @param {?} name
     * @return {?}
     */
    delete(name) {
        /** @type {?} */
        const lcName = name.toLowerCase();
        this._normalizedNames.delete(lcName);
        this._headers.delete(lcName);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEach(fn) {
        this._headers.forEach((values, lcName) => fn(values, this._normalizedNames.get(lcName), this._headers));
    }
    /**
     * Returns first header that matches given name.
     * @param {?} name
     * @return {?}
     */
    get(name) {
        /** @type {?} */
        const values = this.getAll(name);
        if (values === null) {
            return null;
        }
        return values.length > 0 ? values[0] : null;
    }
    /**
     * Checks for existence of header by given name.
     * @param {?} name
     * @return {?}
     */
    has(name) { return this._headers.has(name.toLowerCase()); }
    /**
     * Returns the names of the headers
     * @return {?}
     */
    keys() { return Array.from(this._normalizedNames.values()); }
    /**
     * Sets or overrides header value for given name.
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    set(name, value) {
        if (Array.isArray(value)) {
            if (value.length) {
                this._headers.set(name.toLowerCase(), [value.join(',')]);
            }
        }
        else {
            this._headers.set(name.toLowerCase(), [value]);
        }
        this.mayBeSetNormalizedName(name);
    }
    /**
     * Returns values of all headers.
     * @return {?}
     */
    values() { return Array.from(this._headers.values()); }
    /**
     * Returns string of all headers.
     * @return {?}
     */
    toJSON() {
        /** @type {?} */
        const serialized = {};
        this._headers.forEach((values, name) => {
            /** @type {?} */
            const split = [];
            values.forEach(v => split.push(...v.split(',')));
            serialized[/** @type {?} */ ((this._normalizedNames.get(name)))] = split;
        });
        return serialized;
    }
    /**
     * Returns list of header values for a given name.
     * @param {?} name
     * @return {?}
     */
    getAll(name) {
        return this.has(name) ? this._headers.get(name.toLowerCase()) || null : null;
    }
    /**
     * This method is not implemented.
     * @return {?}
     */
    entries() { throw new Error('"entries" method is not implemented on Headers class'); }
    /**
     * @param {?} name
     * @return {?}
     */
    mayBeSetNormalizedName(name) {
        /** @type {?} */
        const lcName = name.toLowerCase();
        if (!this._normalizedNames.has(lcName)) {
            this._normalizedNames.set(lcName, name);
        }
    }
}
if (false) {
    /**
     * \@internal header names are lower case
     * @type {?}
     */
    Headers.prototype._headers;
    /**
     * \@internal map lower case names to actual names
     * @type {?}
     */
    Headers.prototype._normalizedNames;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2hlYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0NBLE1BQU07Ozs7SUFPSixZQUFZLE9BQTRDOzs7O3dCQUx0QixJQUFJLEdBQUcsRUFBRTs7OztnQ0FFSCxJQUFJLEdBQUcsRUFBRTtRQUkvQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTztTQUNSO1FBRUQsSUFBSSxPQUFPLFlBQVksT0FBTyxFQUFFO1lBQzlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFnQixFQUFFLElBQVksRUFBRSxFQUFFO2dCQUNqRCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNuRCxDQUFDLENBQUM7WUFDSCxPQUFPO1NBQ1I7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVksRUFBRSxFQUFFOztZQUM1QyxNQUFNLE1BQU0sR0FBYSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNuRCxDQUFDLENBQUM7S0FDSjs7Ozs7O0lBS0QsTUFB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QUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6Qzs7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBQb2x5ZmlsbCBmb3IgW0hlYWRlcnNdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IZWFkZXJzL0hlYWRlcnMpLCBhc1xuICogc3BlY2lmaWVkIGluIHRoZSBbRmV0Y2ggU3BlY10oaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2hlYWRlcnMtY2xhc3MpLlxuICpcbiAqIFRoZSBvbmx5IGtub3duIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIGBIZWFkZXJzYCBpbXBsZW1lbnRhdGlvbiBhbmQgdGhlIHNwZWMgaXMgdGhlXG4gKiBsYWNrIG9mIGFuIGBlbnRyaWVzYCBtZXRob2QuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7SGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKlxuICogdmFyIGZpcnN0SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gKiBmaXJzdEhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnaW1hZ2UvanBlZycpO1xuICogY29uc29sZS5sb2coZmlyc3RIZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykpIC8vJ2ltYWdlL2pwZWcnXG4gKlxuICogLy8gQ3JlYXRlIGhlYWRlcnMgZnJvbSBQbGFpbiBPbGQgSmF2YVNjcmlwdCBPYmplY3RcbiAqIHZhciBzZWNvbmRIZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xuICogICAnWC1NeS1DdXN0b20tSGVhZGVyJzogJ0FuZ3VsYXInXG4gKiB9KTtcbiAqIGNvbnNvbGUubG9nKHNlY29uZEhlYWRlcnMuZ2V0KCdYLU15LUN1c3RvbS1IZWFkZXInKSk7IC8vJ0FuZ3VsYXInXG4gKlxuICogdmFyIHRoaXJkSGVhZGVycyA9IG5ldyBIZWFkZXJzKHNlY29uZEhlYWRlcnMpO1xuICogY29uc29sZS5sb2codGhpcmRIZWFkZXJzLmdldCgnWC1NeS1DdXN0b20tSGVhZGVyJykpOyAvLydBbmd1bGFyJ1xuICogYGBgXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbmV4cG9ydCBjbGFzcyBIZWFkZXJzIHtcbiAgLyoqIEBpbnRlcm5hbCBoZWFkZXIgbmFtZXMgYXJlIGxvd2VyIGNhc2UgKi9cbiAgX2hlYWRlcnM6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiA9IG5ldyBNYXAoKTtcbiAgLyoqIEBpbnRlcm5hbCBtYXAgbG93ZXIgY2FzZSBuYW1lcyB0byBhY3R1YWwgbmFtZXMgKi9cbiAgX25vcm1hbGl6ZWROYW1lczogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcblxuICAvLyBUT0RPKHZpY2IpOiBhbnkgLT4gc3RyaW5nfHN0cmluZ1tdXG4gIGNvbnN0cnVjdG9yKGhlYWRlcnM/OiBIZWFkZXJzfHtbbmFtZTogc3RyaW5nXTogYW55fXxudWxsKSB7XG4gICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goKHZhbHVlczogc3RyaW5nW10sIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICB2YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaCgobmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZXM6IHN0cmluZ1tdID0gQXJyYXkuaXNBcnJheShoZWFkZXJzW25hbWVdKSA/IGhlYWRlcnNbbmFtZV0gOiBbaGVhZGVyc1tuYW1lXV07XG4gICAgICB0aGlzLmRlbGV0ZShuYW1lKTtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBIZWFkZXJzIGluc3RhbmNlIGZyb20gdGhlIGdpdmVuIERPTVN0cmluZyBvZiBSZXNwb25zZSBIZWFkZXJzXG4gICAqL1xuICBzdGF0aWMgZnJvbVJlc3BvbnNlSGVhZGVyU3RyaW5nKGhlYWRlcnNTdHJpbmc6IHN0cmluZyk6IEhlYWRlcnMge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuXG4gICAgaGVhZGVyc1N0cmluZy5zcGxpdCgnXFxuJykuZm9yRWFjaChsaW5lID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBsaW5lLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBsaW5lLnNsaWNlKGluZGV4ICsgMSkudHJpbSgpO1xuICAgICAgICBoZWFkZXJzLnNldChuYW1lLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaGVhZGVycztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGEgaGVhZGVyIHRvIGV4aXN0aW5nIGxpc3Qgb2YgaGVhZGVyIHZhbHVlcyBmb3IgYSBnaXZlbiBoZWFkZXIgbmFtZS5cbiAgICovXG4gIGFwcGVuZChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmdldEFsbChuYW1lKTtcblxuICAgIGlmICh2YWx1ZXMgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFsbCBoZWFkZXIgdmFsdWVzIGZvciB0aGUgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGRlbGV0ZSAobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbGNOYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMuX25vcm1hbGl6ZWROYW1lcy5kZWxldGUobGNOYW1lKTtcbiAgICB0aGlzLl9oZWFkZXJzLmRlbGV0ZShsY05hbWUpO1xuICB9XG5cbiAgZm9yRWFjaChmbjogKHZhbHVlczogc3RyaW5nW10sIG5hbWU6IHN0cmluZ3x1bmRlZmluZWQsIGhlYWRlcnM6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPikgPT4gdm9pZCk6XG4gICAgICB2b2lkIHtcbiAgICB0aGlzLl9oZWFkZXJzLmZvckVhY2goXG4gICAgICAgICh2YWx1ZXMsIGxjTmFtZSkgPT4gZm4odmFsdWVzLCB0aGlzLl9ub3JtYWxpemVkTmFtZXMuZ2V0KGxjTmFtZSksIHRoaXMuX2hlYWRlcnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGZpcnN0IGhlYWRlciB0aGF0IG1hdGNoZXMgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGdldChuYW1lOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy5nZXRBbGwobmFtZSk7XG5cbiAgICBpZiAodmFsdWVzID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzLmxlbmd0aCA+IDAgPyB2YWx1ZXNbMF0gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBmb3IgZXhpc3RlbmNlIG9mIGhlYWRlciBieSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgaGFzKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGVhZGVycy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuYW1lcyBvZiB0aGUgaGVhZGVyc1xuICAgKi9cbiAga2V5cygpOiBzdHJpbmdbXSB7IHJldHVybiBBcnJheS5mcm9tKHRoaXMuX25vcm1hbGl6ZWROYW1lcy52YWx1ZXMoKSk7IH1cblxuICAvKipcbiAgICogU2V0cyBvciBvdmVycmlkZXMgaGVhZGVyIHZhbHVlIGZvciBnaXZlbiBuYW1lLlxuICAgKi9cbiAgc2V0KG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZ3xzdHJpbmdbXSk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9oZWFkZXJzLnNldChuYW1lLnRvTG93ZXJDYXNlKCksIFt2YWx1ZS5qb2luKCcsJyldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGVhZGVycy5zZXQobmFtZS50b0xvd2VyQ2FzZSgpLCBbdmFsdWVdKTtcbiAgICB9XG4gICAgdGhpcy5tYXlCZVNldE5vcm1hbGl6ZWROYW1lKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdmFsdWVzIG9mIGFsbCBoZWFkZXJzLlxuICAgKi9cbiAgdmFsdWVzKCk6IHN0cmluZ1tdW10geyByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9oZWFkZXJzLnZhbHVlcygpKTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHN0cmluZyBvZiBhbGwgaGVhZGVycy5cbiAgICovXG4gIC8vIFRPRE8odmljYik6IHJldHVybnMge1tuYW1lOiBzdHJpbmddOiBzdHJpbmdbXX1cbiAgdG9KU09OKCk6IHtbbmFtZTogc3RyaW5nXTogYW55fSB7XG4gICAgY29uc3Qgc2VyaWFsaXplZDoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmdbXX0gPSB7fTtcblxuICAgIHRoaXMuX2hlYWRlcnMuZm9yRWFjaCgodmFsdWVzOiBzdHJpbmdbXSwgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBzcGxpdDogc3RyaW5nW10gPSBbXTtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKHYgPT4gc3BsaXQucHVzaCguLi52LnNwbGl0KCcsJykpKTtcbiAgICAgIHNlcmlhbGl6ZWRbdGhpcy5fbm9ybWFsaXplZE5hbWVzLmdldChuYW1lKSAhXSA9IHNwbGl0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlcmlhbGl6ZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBsaXN0IG9mIGhlYWRlciB2YWx1ZXMgZm9yIGEgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGdldEFsbChuYW1lOiBzdHJpbmcpOiBzdHJpbmdbXXxudWxsIHtcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLl9oZWFkZXJzLmdldChuYW1lLnRvTG93ZXJDYXNlKCkpIHx8IG51bGwgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cbiAgICovXG4gIGVudHJpZXMoKSB7IHRocm93IG5ldyBFcnJvcignXCJlbnRyaWVzXCIgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZCBvbiBIZWFkZXJzIGNsYXNzJyk7IH1cblxuICBwcml2YXRlIG1heUJlU2V0Tm9ybWFsaXplZE5hbWUobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbGNOYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKCF0aGlzLl9ub3JtYWxpemVkTmFtZXMuaGFzKGxjTmFtZSkpIHtcbiAgICAgIHRoaXMuX25vcm1hbGl6ZWROYW1lcy5zZXQobGNOYW1lLCBuYW1lKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==