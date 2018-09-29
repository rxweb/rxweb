/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
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
 * import {Headers} from '@angular/http';
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
var Headers = /** @class */ (function () {
    // TODO(vicb): any -> string|string[]
    function Headers(headers) {
        var _this = this;
        /** @internal header names are lower case */
        this._headers = new Map();
        /** @internal map lower case names to actual names */
        this._normalizedNames = new Map();
        if (!headers) {
            return;
        }
        if (headers instanceof Headers) {
            headers.forEach(function (values, name) {
                values.forEach(function (value) { return _this.append(name, value); });
            });
            return;
        }
        Object.keys(headers).forEach(function (name) {
            var values = Array.isArray(headers[name]) ? headers[name] : [headers[name]];
            _this.delete(name);
            values.forEach(function (value) { return _this.append(name, value); });
        });
    }
    /**
     * Returns a new Headers instance from the given DOMString of Response Headers
     */
    Headers.fromResponseHeaderString = function (headersString) {
        var headers = new Headers();
        headersString.split('\n').forEach(function (line) {
            var index = line.indexOf(':');
            if (index > 0) {
                var name_1 = line.slice(0, index);
                var value = line.slice(index + 1).trim();
                headers.set(name_1, value);
            }
        });
        return headers;
    };
    /**
     * Appends a header to existing list of header values for a given header name.
     */
    Headers.prototype.append = function (name, value) {
        var values = this.getAll(name);
        if (values === null) {
            this.set(name, value);
        }
        else {
            values.push(value);
        }
    };
    /**
     * Deletes all header values for the given name.
     */
    Headers.prototype.delete = function (name) {
        var lcName = name.toLowerCase();
        this._normalizedNames.delete(lcName);
        this._headers.delete(lcName);
    };
    Headers.prototype.forEach = function (fn) {
        var _this = this;
        this._headers.forEach(function (values, lcName) { return fn(values, _this._normalizedNames.get(lcName), _this._headers); });
    };
    /**
     * Returns first header that matches given name.
     */
    Headers.prototype.get = function (name) {
        var values = this.getAll(name);
        if (values === null) {
            return null;
        }
        return values.length > 0 ? values[0] : null;
    };
    /**
     * Checks for existence of header by given name.
     */
    Headers.prototype.has = function (name) { return this._headers.has(name.toLowerCase()); };
    /**
     * Returns the names of the headers
     */
    Headers.prototype.keys = function () { return Array.from(this._normalizedNames.values()); };
    /**
     * Sets or overrides header value for given name.
     */
    Headers.prototype.set = function (name, value) {
        if (Array.isArray(value)) {
            if (value.length) {
                this._headers.set(name.toLowerCase(), [value.join(',')]);
            }
        }
        else {
            this._headers.set(name.toLowerCase(), [value]);
        }
        this.mayBeSetNormalizedName(name);
    };
    /**
     * Returns values of all headers.
     */
    Headers.prototype.values = function () { return Array.from(this._headers.values()); };
    /**
     * Returns string of all headers.
     */
    // TODO(vicb): returns {[name: string]: string[]}
    Headers.prototype.toJSON = function () {
        var _this = this;
        var serialized = {};
        this._headers.forEach(function (values, name) {
            var split = [];
            values.forEach(function (v) { return split.push.apply(split, tslib_1.__spread(v.split(','))); });
            serialized[_this._normalizedNames.get(name)] = split;
        });
        return serialized;
    };
    /**
     * Returns list of header values for a given name.
     */
    Headers.prototype.getAll = function (name) {
        return this.has(name) ? this._headers.get(name.toLowerCase()) || null : null;
    };
    /**
     * This method is not implemented.
     */
    Headers.prototype.entries = function () { throw new Error('"entries" method is not implemented on Headers class'); };
    Headers.prototype.mayBeSetNormalizedName = function (name) {
        var lcName = name.toLowerCase();
        if (!this._normalizedNames.has(lcName)) {
            this._normalizedNames.set(lcName, name);
        }
    };
    return Headers;
}());
export { Headers };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2hlYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSDtJQU1FLHFDQUFxQztJQUNyQyxpQkFBWSxPQUE0QztRQUF4RCxpQkFpQkM7UUF2QkQsNENBQTRDO1FBQzVDLGFBQVEsR0FBMEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUM1QyxxREFBcUQ7UUFDckQscUJBQWdCLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFJaEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxZQUFZLE9BQU8sRUFBRTtZQUM5QixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBZ0IsRUFBRSxJQUFZO2dCQUM3QyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU87U0FDUjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBWTtZQUN4QyxJQUFNLE1BQU0sR0FBYSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEYsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJ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TSxHQUFOLFVBQU8sSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQy9FLENBQUM7SUFFRDs7T0FFRztJQUNILHlCQUFPLEdBQVAsY0FBWSxNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTlFLHdDQUFzQixHQUE5QixVQUErQixJQUFZO1FBQ3pDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQXJKRCxJQXFKQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBQb2x5ZmlsbCBmb3IgW0hlYWRlcnNdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IZWFkZXJzL0hlYWRlcnMpLCBhc1xuICogc3BlY2lmaWVkIGluIHRoZSBbRmV0Y2ggU3BlY10oaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2hlYWRlcnMtY2xhc3MpLlxuICpcbiAqIFRoZSBvbmx5IGtub3duIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIGBIZWFkZXJzYCBpbXBsZW1lbnRhdGlvbiBhbmQgdGhlIHNwZWMgaXMgdGhlXG4gKiBsYWNrIG9mIGFuIGBlbnRyaWVzYCBtZXRob2QuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7SGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKlxuICogdmFyIGZpcnN0SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gKiBmaXJzdEhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnaW1hZ2UvanBlZycpO1xuICogY29uc29sZS5sb2coZmlyc3RIZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykpIC8vJ2ltYWdlL2pwZWcnXG4gKlxuICogLy8gQ3JlYXRlIGhlYWRlcnMgZnJvbSBQbGFpbiBPbGQgSmF2YVNjcmlwdCBPYmplY3RcbiAqIHZhciBzZWNvbmRIZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xuICogICAnWC1NeS1DdXN0b20tSGVhZGVyJzogJ0FuZ3VsYXInXG4gKiB9KTtcbiAqIGNvbnNvbGUubG9nKHNlY29uZEhlYWRlcnMuZ2V0KCdYLU15LUN1c3RvbS1IZWFkZXInKSk7IC8vJ0FuZ3VsYXInXG4gKlxuICogdmFyIHRoaXJkSGVhZGVycyA9IG5ldyBIZWFkZXJzKHNlY29uZEhlYWRlcnMpO1xuICogY29uc29sZS5sb2codGhpcmRIZWFkZXJzLmdldCgnWC1NeS1DdXN0b20tSGVhZGVyJykpOyAvLydBbmd1bGFyJ1xuICogYGBgXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbmV4cG9ydCBjbGFzcyBIZWFkZXJzIHtcbiAgLyoqIEBpbnRlcm5hbCBoZWFkZXIgbmFtZXMgYXJlIGxvd2VyIGNhc2UgKi9cbiAgX2hlYWRlcnM6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiA9IG5ldyBNYXAoKTtcbiAgLyoqIEBpbnRlcm5hbCBtYXAgbG93ZXIgY2FzZSBuYW1lcyB0byBhY3R1YWwgbmFtZXMgKi9cbiAgX25vcm1hbGl6ZWROYW1lczogTWFwPHN0cmluZywgc3RyaW5nPiA9IG5ldyBNYXAoKTtcblxuICAvLyBUT0RPKHZpY2IpOiBhbnkgLT4gc3RyaW5nfHN0cmluZ1tdXG4gIGNvbnN0cnVjdG9yKGhlYWRlcnM/OiBIZWFkZXJzfHtbbmFtZTogc3RyaW5nXTogYW55fXxudWxsKSB7XG4gICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goKHZhbHVlczogc3RyaW5nW10sIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICB2YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaCgobmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZXM6IHN0cmluZ1tdID0gQXJyYXkuaXNBcnJheShoZWFkZXJzW25hbWVdKSA/IGhlYWRlcnNbbmFtZV0gOiBbaGVhZGVyc1tuYW1lXV07XG4gICAgICB0aGlzLmRlbGV0ZShuYW1lKTtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBIZWFkZXJzIGluc3RhbmNlIGZyb20gdGhlIGdpdmVuIERPTVN0cmluZyBvZiBSZXNwb25zZSBIZWFkZXJzXG4gICAqL1xuICBzdGF0aWMgZnJvbVJlc3BvbnNlSGVhZGVyU3RyaW5nKGhlYWRlcnNTdHJpbmc6IHN0cmluZyk6IEhlYWRlcnMge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuXG4gICAgaGVhZGVyc1N0cmluZy5zcGxpdCgnXFxuJykuZm9yRWFjaChsaW5lID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBsaW5lLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBsaW5lLnNsaWNlKGluZGV4ICsgMSkudHJpbSgpO1xuICAgICAgICBoZWFkZXJzLnNldChuYW1lLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaGVhZGVycztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGEgaGVhZGVyIHRvIGV4aXN0aW5nIGxpc3Qgb2YgaGVhZGVyIHZhbHVlcyBmb3IgYSBnaXZlbiBoZWFkZXIgbmFtZS5cbiAgICovXG4gIGFwcGVuZChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmdldEFsbChuYW1lKTtcblxuICAgIGlmICh2YWx1ZXMgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFsbCBoZWFkZXIgdmFsdWVzIGZvciB0aGUgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGRlbGV0ZSAobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbGNOYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMuX25vcm1hbGl6ZWROYW1lcy5kZWxldGUobGNOYW1lKTtcbiAgICB0aGlzLl9oZWFkZXJzLmRlbGV0ZShsY05hbWUpO1xuICB9XG5cbiAgZm9yRWFjaChmbjogKHZhbHVlczogc3RyaW5nW10sIG5hbWU6IHN0cmluZ3x1bmRlZmluZWQsIGhlYWRlcnM6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPikgPT4gdm9pZCk6XG4gICAgICB2b2lkIHtcbiAgICB0aGlzLl9oZWFkZXJzLmZvckVhY2goXG4gICAgICAgICh2YWx1ZXMsIGxjTmFtZSkgPT4gZm4odmFsdWVzLCB0aGlzLl9ub3JtYWxpemVkTmFtZXMuZ2V0KGxjTmFtZSksIHRoaXMuX2hlYWRlcnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGZpcnN0IGhlYWRlciB0aGF0IG1hdGNoZXMgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGdldChuYW1lOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy5nZXRBbGwobmFtZSk7XG5cbiAgICBpZiAodmFsdWVzID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzLmxlbmd0aCA+IDAgPyB2YWx1ZXNbMF0gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBmb3IgZXhpc3RlbmNlIG9mIGhlYWRlciBieSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgaGFzKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGVhZGVycy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuYW1lcyBvZiB0aGUgaGVhZGVyc1xuICAgKi9cbiAga2V5cygpOiBzdHJpbmdbXSB7IHJldHVybiBBcnJheS5mcm9tKHRoaXMuX25vcm1hbGl6ZWROYW1lcy52YWx1ZXMoKSk7IH1cblxuICAvKipcbiAgICogU2V0cyBvciBvdmVycmlkZXMgaGVhZGVyIHZhbHVlIGZvciBnaXZlbiBuYW1lLlxuICAgKi9cbiAgc2V0KG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZ3xzdHJpbmdbXSk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9oZWFkZXJzLnNldChuYW1lLnRvTG93ZXJDYXNlKCksIFt2YWx1ZS5qb2luKCcsJyldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGVhZGVycy5zZXQobmFtZS50b0xvd2VyQ2FzZSgpLCBbdmFsdWVdKTtcbiAgICB9XG4gICAgdGhpcy5tYXlCZVNldE5vcm1hbGl6ZWROYW1lKG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdmFsdWVzIG9mIGFsbCBoZWFkZXJzLlxuICAgKi9cbiAgdmFsdWVzKCk6IHN0cmluZ1tdW10geyByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9oZWFkZXJzLnZhbHVlcygpKTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHN0cmluZyBvZiBhbGwgaGVhZGVycy5cbiAgICovXG4gIC8vIFRPRE8odmljYik6IHJldHVybnMge1tuYW1lOiBzdHJpbmddOiBzdHJpbmdbXX1cbiAgdG9KU09OKCk6IHtbbmFtZTogc3RyaW5nXTogYW55fSB7XG4gICAgY29uc3Qgc2VyaWFsaXplZDoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmdbXX0gPSB7fTtcblxuICAgIHRoaXMuX2hlYWRlcnMuZm9yRWFjaCgodmFsdWVzOiBzdHJpbmdbXSwgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBzcGxpdDogc3RyaW5nW10gPSBbXTtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKHYgPT4gc3BsaXQucHVzaCguLi52LnNwbGl0KCcsJykpKTtcbiAgICAgIHNlcmlhbGl6ZWRbdGhpcy5fbm9ybWFsaXplZE5hbWVzLmdldChuYW1lKSAhXSA9IHNwbGl0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlcmlhbGl6ZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBsaXN0IG9mIGhlYWRlciB2YWx1ZXMgZm9yIGEgZ2l2ZW4gbmFtZS5cbiAgICovXG4gIGdldEFsbChuYW1lOiBzdHJpbmcpOiBzdHJpbmdbXXxudWxsIHtcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLl9oZWFkZXJzLmdldChuYW1lLnRvTG93ZXJDYXNlKCkpIHx8IG51bGwgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cbiAgICovXG4gIGVudHJpZXMoKSB7IHRocm93IG5ldyBFcnJvcignXCJlbnRyaWVzXCIgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZCBvbiBIZWFkZXJzIGNsYXNzJyk7IH1cblxuICBwcml2YXRlIG1heUJlU2V0Tm9ybWFsaXplZE5hbWUobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbGNOYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKCF0aGlzLl9ub3JtYWxpemVkTmFtZXMuaGFzKGxjTmFtZSkpIHtcbiAgICAgIHRoaXMuX25vcm1hbGl6ZWROYW1lcy5zZXQobGNOYW1lLCBuYW1lKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==