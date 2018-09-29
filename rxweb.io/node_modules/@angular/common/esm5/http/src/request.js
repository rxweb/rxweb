/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HttpHeaders } from './headers';
import { HttpParams } from './params';
/**
 * Determine whether the given HTTP method may include a body.
 */
function mightHaveBody(method) {
    switch (method) {
        case 'DELETE':
        case 'GET':
        case 'HEAD':
        case 'OPTIONS':
        case 'JSONP':
            return false;
        default:
            return true;
    }
}
/**
 * Safely assert whether the given value is an ArrayBuffer.
 *
 * In some execution environments ArrayBuffer is not defined.
 */
function isArrayBuffer(value) {
    return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
}
/**
 * Safely assert whether the given value is a Blob.
 *
 * In some execution environments Blob is not defined.
 */
function isBlob(value) {
    return typeof Blob !== 'undefined' && value instanceof Blob;
}
/**
 * Safely assert whether the given value is a FormData instance.
 *
 * In some execution environments FormData is not defined.
 */
function isFormData(value) {
    return typeof FormData !== 'undefined' && value instanceof FormData;
}
/**
 * An outgoing HTTP request with an optional typed body.
 *
 * `HttpRequest` represents an outgoing request, including URL, method,
 * headers, body, and other request configuration options. Instances should be
 * assumed to be immutable. To modify a `HttpRequest`, the `clone`
 * method should be used.
 *
 *
 */
var HttpRequest = /** @class */ (function () {
    function HttpRequest(method, url, third, fourth) {
        this.url = url;
        /**
         * The request body, or `null` if one isn't set.
         *
         * Bodies are not enforced to be immutable, as they can include a reference to any
         * user-defined data type. However, interceptors should take care to preserve
         * idempotence by treating them as such.
         */
        this.body = null;
        /**
         * Whether this request should be made in a way that exposes progress events.
         *
         * Progress events are expensive (change detection runs on each event) and so
         * they should only be requested if the consumer intends to monitor them.
         */
        this.reportProgress = false;
        /**
         * Whether this request should be sent with outgoing credentials (cookies).
         */
        this.withCredentials = false;
        /**
         * The expected response type of the server.
         *
         * This is used to parse the response appropriately before returning it to
         * the requestee.
         */
        this.responseType = 'json';
        this.method = method.toUpperCase();
        // Next, need to figure out which argument holds the HttpRequestInit
        // options, if any.
        var options;
        // Check whether a body argument is expected. The only valid way to omit
        // the body argument is to use a known no-body method like GET.
        if (mightHaveBody(this.method) || !!fourth) {
            // Body is the third argument, options are the fourth.
            this.body = (third !== undefined) ? third : null;
            options = fourth;
        }
        else {
            // No body required, options are the third argument. The body stays null.
            options = third;
        }
        // If options have been passed, interpret them.
        if (options) {
            // Normalize reportProgress and withCredentials.
            this.reportProgress = !!options.reportProgress;
            this.withCredentials = !!options.withCredentials;
            // Override default response type of 'json' if one is provided.
            if (!!options.responseType) {
                this.responseType = options.responseType;
            }
            // Override headers if they're provided.
            if (!!options.headers) {
                this.headers = options.headers;
            }
            if (!!options.params) {
                this.params = options.params;
            }
        }
        // If no headers have been passed in, construct a new HttpHeaders instance.
        if (!this.headers) {
            this.headers = new HttpHeaders();
        }
        // If no parameters have been passed in, construct a new HttpUrlEncodedParams instance.
        if (!this.params) {
            this.params = new HttpParams();
            this.urlWithParams = url;
        }
        else {
            // Encode the parameters to a string in preparation for inclusion in the URL.
            var params = this.params.toString();
            if (params.length === 0) {
                // No parameters, the visible URL is just the URL given at creation time.
                this.urlWithParams = url;
            }
            else {
                // Does the URL already have query parameters? Look for '?'.
                var qIdx = url.indexOf('?');
                // There are 3 cases to handle:
                // 1) No existing parameters -> append '?' followed by params.
                // 2) '?' exists and is followed by existing query string ->
                //    append '&' followed by params.
                // 3) '?' exists at the end of the url -> append params directly.
                // This basically amounts to determining the character, if any, with
                // which to join the URL and parameters.
                var sep = qIdx === -1 ? '?' : (qIdx < url.length - 1 ? '&' : '');
                this.urlWithParams = url + sep + params;
            }
        }
    }
    /**
     * Transform the free-form body into a serialized format suitable for
     * transmission to the server.
     */
    HttpRequest.prototype.serializeBody = function () {
        // If no body is present, no need to serialize it.
        if (this.body === null) {
            return null;
        }
        // Check whether the body is already in a serialized form. If so,
        // it can just be returned directly.
        if (isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) ||
            typeof this.body === 'string') {
            return this.body;
        }
        // Check whether the body is an instance of HttpUrlEncodedParams.
        if (this.body instanceof HttpParams) {
            return this.body.toString();
        }
        // Check whether the body is an object or array, and serialize with JSON if so.
        if (typeof this.body === 'object' || typeof this.body === 'boolean' ||
            Array.isArray(this.body)) {
            return JSON.stringify(this.body);
        }
        // Fall back on toString() for everything else.
        return this.body.toString();
    };
    /**
     * Examine the body and attempt to infer an appropriate MIME type
     * for it.
     *
     * If no such type can be inferred, this method will return `null`.
     */
    HttpRequest.prototype.detectContentTypeHeader = function () {
        // An empty body has no content type.
        if (this.body === null) {
            return null;
        }
        // FormData bodies rely on the browser's content type assignment.
        if (isFormData(this.body)) {
            return null;
        }
        // Blobs usually have their own content type. If it doesn't, then
        // no type can be inferred.
        if (isBlob(this.body)) {
            return this.body.type || null;
        }
        // Array buffers have unknown contents and thus no type can be inferred.
        if (isArrayBuffer(this.body)) {
            return null;
        }
        // Technically, strings could be a form of JSON data, but it's safe enough
        // to assume they're plain strings.
        if (typeof this.body === 'string') {
            return 'text/plain';
        }
        // `HttpUrlEncodedParams` has its own content-type.
        if (this.body instanceof HttpParams) {
            return 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        // Arrays, objects, and numbers will be encoded as JSON.
        if (typeof this.body === 'object' || typeof this.body === 'number' ||
            Array.isArray(this.body)) {
            return 'application/json';
        }
        // No type could be inferred.
        return null;
    };
    HttpRequest.prototype.clone = function (update) {
        if (update === void 0) { update = {}; }
        // For method, url, and responseType, take the current value unless
        // it is overridden in the update hash.
        var method = update.method || this.method;
        var url = update.url || this.url;
        var responseType = update.responseType || this.responseType;
        // The body is somewhat special - a `null` value in update.body means
        // whatever current body is present is being overridden with an empty
        // body, whereas an `undefined` value in update.body implies no
        // override.
        var body = (update.body !== undefined) ? update.body : this.body;
        // Carefully handle the boolean options to differentiate between
        // `false` and `undefined` in the update args.
        var withCredentials = (update.withCredentials !== undefined) ? update.withCredentials : this.withCredentials;
        var reportProgress = (update.reportProgress !== undefined) ? update.reportProgress : this.reportProgress;
        // Headers and params may be appended to if `setHeaders` or
        // `setParams` are used.
        var headers = update.headers || this.headers;
        var params = update.params || this.params;
        // Check whether the caller has asked to add headers.
        if (update.setHeaders !== undefined) {
            // Set every requested header.
            headers =
                Object.keys(update.setHeaders)
                    .reduce(function (headers, name) { return headers.set(name, update.setHeaders[name]); }, headers);
        }
        // Check whether the caller has asked to set params.
        if (update.setParams) {
            // Set every requested param.
            params = Object.keys(update.setParams)
                .reduce(function (params, param) { return params.set(param, update.setParams[param]); }, params);
        }
        // Finally, construct the new HttpRequest using the pieces from above.
        return new HttpRequest(method, url, body, {
            params: params, headers: headers, reportProgress: reportProgress, responseType: responseType, withCredentials: withCredentials,
        });
    };
    return HttpRequest;
}());
export { HttpRequest };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3NyYy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQWVwQzs7R0FFRztBQUNILHVCQUF1QixNQUFjO0lBQ25DLFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxRQUFRLENBQUM7UUFDZCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxTQUFTLENBQUM7UUFDZixLQUFLLE9BQU87WUFDVixPQUFPLEtBQUssQ0FBQztRQUNmO1lBQ0UsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNILENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsdUJBQXVCLEtBQVU7SUFDL0IsT0FBTyxPQUFPLFdBQVcsS0FBSyxXQUFXLElBQUksS0FBSyxZQUFZLFdBQVcsQ0FBQztBQUM1RSxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILGdCQUFnQixLQUFVO0lBQ3hCLE9BQU8sT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLEtBQUssWUFBWSxJQUFJLENBQUM7QUFDOUQsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxvQkFBb0IsS0FBVTtJQUM1QixPQUFPLE9BQU8sUUFBUSxLQUFLLFdBQVcsSUFBSSxLQUFLLFlBQVksUUFBUSxDQUFDO0FBQ3RFLENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSDtJQTBFRSxxQkFDSSxNQUFjLEVBQVcsR0FBVyxFQUFFLEtBTWhDLEVBQ04sTUFNQztRQWJ3QixRQUFHLEdBQUgsR0FBRyxDQUFRO1FBMUV4Qzs7Ozs7O1dBTUc7UUFDTSxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBUTdCOzs7OztXQUtH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QVMsQ0FBQztpQkFDeEIsTUFBTSxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUssSUFBSyxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBNUMsQ0FBNEMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMvRjtRQUVELHNFQUFzRTtRQUN0RSxPQUFPLElBQUksV0FBVyxDQUNsQixNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtZQUNJLE1BQU0sUUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLGNBQWMsZ0JBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxlQUFlLGlCQUFBO1NBQ2pFLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBclRELElBcVRDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0h0dHBIZWFkZXJzfSBmcm9tICcuL2hlYWRlcnMnO1xuaW1wb3J0IHtIdHRwUGFyYW1zfSBmcm9tICcuL3BhcmFtcyc7XG5cbi8qKlxuICogQ29uc3RydWN0aW9uIGludGVyZmFjZSBmb3IgYEh0dHBSZXF1ZXN0YHMuXG4gKlxuICogQWxsIHZhbHVlcyBhcmUgb3B0aW9uYWwgYW5kIHdpbGwgb3ZlcnJpZGUgZGVmYXVsdCB2YWx1ZXMgaWYgcHJvdmlkZWQuXG4gKi9cbmludGVyZmFjZSBIdHRwUmVxdWVzdEluaXQge1xuICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG4gIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbjtcbiAgcGFyYW1zPzogSHR0cFBhcmFtcztcbiAgcmVzcG9uc2VUeXBlPzogJ2FycmF5YnVmZmVyJ3wnYmxvYid8J2pzb24nfCd0ZXh0JztcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgZ2l2ZW4gSFRUUCBtZXRob2QgbWF5IGluY2x1ZGUgYSBib2R5LlxuICovXG5mdW5jdGlvbiBtaWdodEhhdmVCb2R5KG1ldGhvZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgY2FzZSAnREVMRVRFJzpcbiAgICBjYXNlICdHRVQnOlxuICAgIGNhc2UgJ0hFQUQnOlxuICAgIGNhc2UgJ09QVElPTlMnOlxuICAgIGNhc2UgJ0pTT05QJzpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiBTYWZlbHkgYXNzZXJ0IHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLlxuICpcbiAqIEluIHNvbWUgZXhlY3V0aW9uIGVudmlyb25tZW50cyBBcnJheUJ1ZmZlciBpcyBub3QgZGVmaW5lZC5cbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWx1ZTogYW55KTogdmFsdWUgaXMgQXJyYXlCdWZmZXIge1xuICByZXR1cm4gdHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xufVxuXG4vKipcbiAqIFNhZmVseSBhc3NlcnQgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBCbG9iLlxuICpcbiAqIEluIHNvbWUgZXhlY3V0aW9uIGVudmlyb25tZW50cyBCbG9iIGlzIG5vdCBkZWZpbmVkLlxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsdWU6IGFueSk6IHZhbHVlIGlzIEJsb2Ige1xuICByZXR1cm4gdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQmxvYjtcbn1cblxuLyoqXG4gKiBTYWZlbHkgYXNzZXJ0IHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIGEgRm9ybURhdGEgaW5zdGFuY2UuXG4gKlxuICogSW4gc29tZSBleGVjdXRpb24gZW52aXJvbm1lbnRzIEZvcm1EYXRhIGlzIG5vdCBkZWZpbmVkLlxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBGb3JtRGF0YSB7XG4gIHJldHVybiB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgRm9ybURhdGE7XG59XG5cbi8qKlxuICogQW4gb3V0Z29pbmcgSFRUUCByZXF1ZXN0IHdpdGggYW4gb3B0aW9uYWwgdHlwZWQgYm9keS5cbiAqXG4gKiBgSHR0cFJlcXVlc3RgIHJlcHJlc2VudHMgYW4gb3V0Z29pbmcgcmVxdWVzdCwgaW5jbHVkaW5nIFVSTCwgbWV0aG9kLFxuICogaGVhZGVycywgYm9keSwgYW5kIG90aGVyIHJlcXVlc3QgY29uZmlndXJhdGlvbiBvcHRpb25zLiBJbnN0YW5jZXMgc2hvdWxkIGJlXG4gKiBhc3N1bWVkIHRvIGJlIGltbXV0YWJsZS4gVG8gbW9kaWZ5IGEgYEh0dHBSZXF1ZXN0YCwgdGhlIGBjbG9uZWBcbiAqIG1ldGhvZCBzaG91bGQgYmUgdXNlZC5cbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgSHR0cFJlcXVlc3Q8VD4ge1xuICAvKipcbiAgICogVGhlIHJlcXVlc3QgYm9keSwgb3IgYG51bGxgIGlmIG9uZSBpc24ndCBzZXQuXG4gICAqXG4gICAqIEJvZGllcyBhcmUgbm90IGVuZm9yY2VkIHRvIGJlIGltbXV0YWJsZSwgYXMgdGhleSBjYW4gaW5jbHVkZSBhIHJlZmVyZW5jZSB0byBhbnlcbiAgICogdXNlci1kZWZpbmVkIGRhdGEgdHlwZS4gSG93ZXZlciwgaW50ZXJjZXB0b3JzIHNob3VsZCB0YWtlIGNhcmUgdG8gcHJlc2VydmVcbiAgICogaWRlbXBvdGVuY2UgYnkgdHJlYXRpbmcgdGhlbSBhcyBzdWNoLlxuICAgKi9cbiAgcmVhZG9ubHkgYm9keTogVHxudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogT3V0Z29pbmcgaGVhZGVycyBmb3IgdGhpcyByZXF1ZXN0LlxuICAgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHJlYWRvbmx5IGhlYWRlcnMgITogSHR0cEhlYWRlcnM7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhpcyByZXF1ZXN0IHNob3VsZCBiZSBtYWRlIGluIGEgd2F5IHRoYXQgZXhwb3NlcyBwcm9ncmVzcyBldmVudHMuXG4gICAqXG4gICAqIFByb2dyZXNzIGV2ZW50cyBhcmUgZXhwZW5zaXZlIChjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMgb24gZWFjaCBldmVudCkgYW5kIHNvXG4gICAqIHRoZXkgc2hvdWxkIG9ubHkgYmUgcmVxdWVzdGVkIGlmIHRoZSBjb25zdW1lciBpbnRlbmRzIHRvIG1vbml0b3IgdGhlbS5cbiAgICovXG4gIHJlYWRvbmx5IHJlcG9ydFByb2dyZXNzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhpcyByZXF1ZXN0IHNob3VsZCBiZSBzZW50IHdpdGggb3V0Z29pbmcgY3JlZGVudGlhbHMgKGNvb2tpZXMpLlxuICAgKi9cbiAgcmVhZG9ubHkgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBleHBlY3RlZCByZXNwb25zZSB0eXBlIG9mIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZCB0byBwYXJzZSB0aGUgcmVzcG9uc2UgYXBwcm9wcmlhdGVseSBiZWZvcmUgcmV0dXJuaW5nIGl0IHRvXG4gICAqIHRoZSByZXF1ZXN0ZWUuXG4gICAqL1xuICByZWFkb25seSByZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcid8J2Jsb2InfCdqc29uJ3wndGV4dCcgPSAnanNvbic7XG5cbiAgLyoqXG4gICAqIFRoZSBvdXRnb2luZyBIVFRQIHJlcXVlc3QgbWV0aG9kLlxuICAgKi9cbiAgcmVhZG9ubHkgbWV0aG9kOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIE91dGdvaW5nIFVSTCBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHJlYWRvbmx5IHBhcmFtcyAhOiBIdHRwUGFyYW1zO1xuXG4gIC8qKlxuICAgKiBUaGUgb3V0Z29pbmcgVVJMIHdpdGggYWxsIFVSTCBwYXJhbWV0ZXJzIHNldC5cbiAgICovXG4gIHJlYWRvbmx5IHVybFdpdGhQYXJhbXM6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihtZXRob2Q6ICdERUxFVEUnfCdHRVQnfCdIRUFEJ3wnSlNPTlAnfCdPUFRJT05TJywgdXJsOiBzdHJpbmcsIGluaXQ/OiB7XG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLFxuICAgIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbixcbiAgICBwYXJhbXM/OiBIdHRwUGFyYW1zLFxuICAgIHJlc3BvbnNlVHlwZT86ICdhcnJheWJ1ZmZlcid8J2Jsb2InfCdqc29uJ3wndGV4dCcsXG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbixcbiAgfSk7XG4gIGNvbnN0cnVjdG9yKG1ldGhvZDogJ1BPU1QnfCdQVVQnfCdQQVRDSCcsIHVybDogc3RyaW5nLCBib2R5OiBUfG51bGwsIGluaXQ/OiB7XG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLFxuICAgIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbixcbiAgICBwYXJhbXM/OiBIdHRwUGFyYW1zLFxuICAgIHJlc3BvbnNlVHlwZT86ICdhcnJheWJ1ZmZlcid8J2Jsb2InfCdqc29uJ3wndGV4dCcsXG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbixcbiAgfSk7XG4gIGNvbnN0cnVjdG9yKG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgYm9keTogVHxudWxsLCBpbml0Pzoge1xuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcbiAgICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sXG4gICAgcGFyYW1zPzogSHR0cFBhcmFtcyxcbiAgICByZXNwb25zZVR5cGU/OiAnYXJyYXlidWZmZXInfCdibG9iJ3wnanNvbid8J3RleHQnLFxuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW4sXG4gIH0pO1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIG1ldGhvZDogc3RyaW5nLCByZWFkb25seSB1cmw6IHN0cmluZywgdGhpcmQ/OiBUfHtcbiAgICAgICAgaGVhZGVycz86IEh0dHBIZWFkZXJzLFxuICAgICAgICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sXG4gICAgICAgIHBhcmFtcz86IEh0dHBQYXJhbXMsXG4gICAgICAgIHJlc3BvbnNlVHlwZT86ICdhcnJheWJ1ZmZlcid8J2Jsb2InfCdqc29uJ3wndGV4dCcsXG4gICAgICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW4sXG4gICAgICB9fG51bGwsXG4gICAgICBmb3VydGg/OiB7XG4gICAgICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcbiAgICAgICAgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuLFxuICAgICAgICBwYXJhbXM/OiBIdHRwUGFyYW1zLFxuICAgICAgICByZXNwb25zZVR5cGU/OiAnYXJyYXlidWZmZXInfCdibG9iJ3wnanNvbid8J3RleHQnLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuLFxuICAgICAgfSkge1xuICAgIHRoaXMubWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgLy8gTmV4dCwgbmVlZCB0byBmaWd1cmUgb3V0IHdoaWNoIGFyZ3VtZW50IGhvbGRzIHRoZSBIdHRwUmVxdWVzdEluaXRcbiAgICAvLyBvcHRpb25zLCBpZiBhbnkuXG4gICAgbGV0IG9wdGlvbnM6IEh0dHBSZXF1ZXN0SW5pdHx1bmRlZmluZWQ7XG5cbiAgICAvLyBDaGVjayB3aGV0aGVyIGEgYm9keSBhcmd1bWVudCBpcyBleHBlY3RlZC4gVGhlIG9ubHkgdmFsaWQgd2F5IHRvIG9taXRcbiAgICAvLyB0aGUgYm9keSBhcmd1bWVudCBpcyB0byB1c2UgYSBrbm93biBuby1ib2R5IG1ldGhvZCBsaWtlIEdFVC5cbiAgICBpZiAobWlnaHRIYXZlQm9keSh0aGlzLm1ldGhvZCkgfHwgISFmb3VydGgpIHtcbiAgICAgIC8vIEJvZHkgaXMgdGhlIHRoaXJkIGFyZ3VtZW50LCBvcHRpb25zIGFyZSB0aGUgZm91cnRoLlxuICAgICAgdGhpcy5ib2R5ID0gKHRoaXJkICE9PSB1bmRlZmluZWQpID8gdGhpcmQgYXMgVCA6IG51bGw7XG4gICAgICBvcHRpb25zID0gZm91cnRoO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyBib2R5IHJlcXVpcmVkLCBvcHRpb25zIGFyZSB0aGUgdGhpcmQgYXJndW1lbnQuIFRoZSBib2R5IHN0YXlzIG51bGwuXG4gICAgICBvcHRpb25zID0gdGhpcmQgYXMgSHR0cFJlcXVlc3RJbml0O1xuICAgIH1cblxuICAgIC8vIElmIG9wdGlvbnMgaGF2ZSBiZWVuIHBhc3NlZCwgaW50ZXJwcmV0IHRoZW0uXG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIC8vIE5vcm1hbGl6ZSByZXBvcnRQcm9ncmVzcyBhbmQgd2l0aENyZWRlbnRpYWxzLlxuICAgICAgdGhpcy5yZXBvcnRQcm9ncmVzcyA9ICEhb3B0aW9ucy5yZXBvcnRQcm9ncmVzcztcbiAgICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gISFvcHRpb25zLndpdGhDcmVkZW50aWFscztcblxuICAgICAgLy8gT3ZlcnJpZGUgZGVmYXVsdCByZXNwb25zZSB0eXBlIG9mICdqc29uJyBpZiBvbmUgaXMgcHJvdmlkZWQuXG4gICAgICBpZiAoISFvcHRpb25zLnJlc3BvbnNlVHlwZSkge1xuICAgICAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlO1xuICAgICAgfVxuXG4gICAgICAvLyBPdmVycmlkZSBoZWFkZXJzIGlmIHRoZXkncmUgcHJvdmlkZWQuXG4gICAgICBpZiAoISFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xuICAgICAgfVxuXG4gICAgICBpZiAoISFvcHRpb25zLnBhcmFtcykge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIG5vIGhlYWRlcnMgaGF2ZSBiZWVuIHBhc3NlZCBpbiwgY29uc3RydWN0IGEgbmV3IEh0dHBIZWFkZXJzIGluc3RhbmNlLlxuICAgIGlmICghdGhpcy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICB9XG5cbiAgICAvLyBJZiBubyBwYXJhbWV0ZXJzIGhhdmUgYmVlbiBwYXNzZWQgaW4sIGNvbnN0cnVjdCBhIG5ldyBIdHRwVXJsRW5jb2RlZFBhcmFtcyBpbnN0YW5jZS5cbiAgICBpZiAoIXRoaXMucGFyYW1zKSB7XG4gICAgICB0aGlzLnBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICB0aGlzLnVybFdpdGhQYXJhbXMgPSB1cmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEVuY29kZSB0aGUgcGFyYW1ldGVycyB0byBhIHN0cmluZyBpbiBwcmVwYXJhdGlvbiBmb3IgaW5jbHVzaW9uIGluIHRoZSBVUkwuXG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnBhcmFtcy50b1N0cmluZygpO1xuICAgICAgaWYgKHBhcmFtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gTm8gcGFyYW1ldGVycywgdGhlIHZpc2libGUgVVJMIGlzIGp1c3QgdGhlIFVSTCBnaXZlbiBhdCBjcmVhdGlvbiB0aW1lLlxuICAgICAgICB0aGlzLnVybFdpdGhQYXJhbXMgPSB1cmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBEb2VzIHRoZSBVUkwgYWxyZWFkeSBoYXZlIHF1ZXJ5IHBhcmFtZXRlcnM/IExvb2sgZm9yICc/Jy5cbiAgICAgICAgY29uc3QgcUlkeCA9IHVybC5pbmRleE9mKCc/Jyk7XG4gICAgICAgIC8vIFRoZXJlIGFyZSAzIGNhc2VzIHRvIGhhbmRsZTpcbiAgICAgICAgLy8gMSkgTm8gZXhpc3RpbmcgcGFyYW1ldGVycyAtPiBhcHBlbmQgJz8nIGZvbGxvd2VkIGJ5IHBhcmFtcy5cbiAgICAgICAgLy8gMikgJz8nIGV4aXN0cyBhbmQgaXMgZm9sbG93ZWQgYnkgZXhpc3RpbmcgcXVlcnkgc3RyaW5nIC0+XG4gICAgICAgIC8vICAgIGFwcGVuZCAnJicgZm9sbG93ZWQgYnkgcGFyYW1zLlxuICAgICAgICAvLyAzKSAnPycgZXhpc3RzIGF0IHRoZSBlbmQgb2YgdGhlIHVybCAtPiBhcHBlbmQgcGFyYW1zIGRpcmVjdGx5LlxuICAgICAgICAvLyBUaGlzIGJhc2ljYWxseSBhbW91bnRzIHRvIGRldGVybWluaW5nIHRoZSBjaGFyYWN0ZXIsIGlmIGFueSwgd2l0aFxuICAgICAgICAvLyB3aGljaCB0byBqb2luIHRoZSBVUkwgYW5kIHBhcmFtZXRlcnMuXG4gICAgICAgIGNvbnN0IHNlcDogc3RyaW5nID0gcUlkeCA9PT0gLTEgPyAnPycgOiAocUlkeCA8IHVybC5sZW5ndGggLSAxID8gJyYnIDogJycpO1xuICAgICAgICB0aGlzLnVybFdpdGhQYXJhbXMgPSB1cmwgKyBzZXAgKyBwYXJhbXM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSB0aGUgZnJlZS1mb3JtIGJvZHkgaW50byBhIHNlcmlhbGl6ZWQgZm9ybWF0IHN1aXRhYmxlIGZvclxuICAgKiB0cmFuc21pc3Npb24gdG8gdGhlIHNlcnZlci5cbiAgICovXG4gIHNlcmlhbGl6ZUJvZHkoKTogQXJyYXlCdWZmZXJ8QmxvYnxGb3JtRGF0YXxzdHJpbmd8bnVsbCB7XG4gICAgLy8gSWYgbm8gYm9keSBpcyBwcmVzZW50LCBubyBuZWVkIHRvIHNlcmlhbGl6ZSBpdC5cbiAgICBpZiAodGhpcy5ib2R5ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgYm9keSBpcyBhbHJlYWR5IGluIGEgc2VyaWFsaXplZCBmb3JtLiBJZiBzbyxcbiAgICAvLyBpdCBjYW4ganVzdCBiZSByZXR1cm5lZCBkaXJlY3RseS5cbiAgICBpZiAoaXNBcnJheUJ1ZmZlcih0aGlzLmJvZHkpIHx8IGlzQmxvYih0aGlzLmJvZHkpIHx8IGlzRm9ybURhdGEodGhpcy5ib2R5KSB8fFxuICAgICAgICB0eXBlb2YgdGhpcy5ib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuYm9keTtcbiAgICB9XG4gICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgYm9keSBpcyBhbiBpbnN0YW5jZSBvZiBIdHRwVXJsRW5jb2RlZFBhcmFtcy5cbiAgICBpZiAodGhpcy5ib2R5IGluc3RhbmNlb2YgSHR0cFBhcmFtcykge1xuICAgICAgcmV0dXJuIHRoaXMuYm9keS50b1N0cmluZygpO1xuICAgIH1cbiAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBib2R5IGlzIGFuIG9iamVjdCBvciBhcnJheSwgYW5kIHNlcmlhbGl6ZSB3aXRoIEpTT04gaWYgc28uXG4gICAgaWYgKHR5cGVvZiB0aGlzLmJvZHkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB0aGlzLmJvZHkgPT09ICdib29sZWFuJyB8fFxuICAgICAgICBBcnJheS5pc0FycmF5KHRoaXMuYm9keSkpIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmJvZHkpO1xuICAgIH1cbiAgICAvLyBGYWxsIGJhY2sgb24gdG9TdHJpbmcoKSBmb3IgZXZlcnl0aGluZyBlbHNlLlxuICAgIHJldHVybiAodGhpcy5ib2R5IGFzIGFueSkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGFtaW5lIHRoZSBib2R5IGFuZCBhdHRlbXB0IHRvIGluZmVyIGFuIGFwcHJvcHJpYXRlIE1JTUUgdHlwZVxuICAgKiBmb3IgaXQuXG4gICAqXG4gICAqIElmIG5vIHN1Y2ggdHlwZSBjYW4gYmUgaW5mZXJyZWQsIHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGBudWxsYC5cbiAgICovXG4gIGRldGVjdENvbnRlbnRUeXBlSGVhZGVyKCk6IHN0cmluZ3xudWxsIHtcbiAgICAvLyBBbiBlbXB0eSBib2R5IGhhcyBubyBjb250ZW50IHR5cGUuXG4gICAgaWYgKHRoaXMuYm9keSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIEZvcm1EYXRhIGJvZGllcyByZWx5IG9uIHRoZSBicm93c2VyJ3MgY29udGVudCB0eXBlIGFzc2lnbm1lbnQuXG4gICAgaWYgKGlzRm9ybURhdGEodGhpcy5ib2R5KSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIEJsb2JzIHVzdWFsbHkgaGF2ZSB0aGVpciBvd24gY29udGVudCB0eXBlLiBJZiBpdCBkb2Vzbid0LCB0aGVuXG4gICAgLy8gbm8gdHlwZSBjYW4gYmUgaW5mZXJyZWQuXG4gICAgaWYgKGlzQmxvYih0aGlzLmJvZHkpKSB7XG4gICAgICByZXR1cm4gdGhpcy5ib2R5LnR5cGUgfHwgbnVsbDtcbiAgICB9XG4gICAgLy8gQXJyYXkgYnVmZmVycyBoYXZlIHVua25vd24gY29udGVudHMgYW5kIHRodXMgbm8gdHlwZSBjYW4gYmUgaW5mZXJyZWQuXG4gICAgaWYgKGlzQXJyYXlCdWZmZXIodGhpcy5ib2R5KSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIFRlY2huaWNhbGx5LCBzdHJpbmdzIGNvdWxkIGJlIGEgZm9ybSBvZiBKU09OIGRhdGEsIGJ1dCBpdCdzIHNhZmUgZW5vdWdoXG4gICAgLy8gdG8gYXNzdW1lIHRoZXkncmUgcGxhaW4gc3RyaW5ncy5cbiAgICBpZiAodHlwZW9mIHRoaXMuYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiAndGV4dC9wbGFpbic7XG4gICAgfVxuICAgIC8vIGBIdHRwVXJsRW5jb2RlZFBhcmFtc2AgaGFzIGl0cyBvd24gY29udGVudC10eXBlLlxuICAgIGlmICh0aGlzLmJvZHkgaW5zdGFuY2VvZiBIdHRwUGFyYW1zKSB7XG4gICAgICByZXR1cm4gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JztcbiAgICB9XG4gICAgLy8gQXJyYXlzLCBvYmplY3RzLCBhbmQgbnVtYmVycyB3aWxsIGJlIGVuY29kZWQgYXMgSlNPTi5cbiAgICBpZiAodHlwZW9mIHRoaXMuYm9keSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHRoaXMuYm9keSA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgQXJyYXkuaXNBcnJheSh0aGlzLmJvZHkpKSB7XG4gICAgICByZXR1cm4gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgIH1cbiAgICAvLyBObyB0eXBlIGNvdWxkIGJlIGluZmVycmVkLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY2xvbmUoKTogSHR0cFJlcXVlc3Q8VD47XG4gIGNsb25lKHVwZGF0ZToge1xuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcbiAgICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sXG4gICAgcGFyYW1zPzogSHR0cFBhcmFtcyxcbiAgICByZXNwb25zZVR5cGU/OiAnYXJyYXlidWZmZXInfCdibG9iJ3wnanNvbid8J3RleHQnLFxuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW4sXG4gICAgYm9keT86IFR8bnVsbCxcbiAgICBtZXRob2Q/OiBzdHJpbmcsXG4gICAgdXJsPzogc3RyaW5nLFxuICAgIHNldEhlYWRlcnM/OiB7W25hbWU6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdfSxcbiAgICBzZXRQYXJhbXM/OiB7W3BhcmFtOiBzdHJpbmddOiBzdHJpbmd9LFxuICB9KTogSHR0cFJlcXVlc3Q8VD47XG4gIGNsb25lPFY+KHVwZGF0ZToge1xuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcbiAgICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sXG4gICAgcGFyYW1zPzogSHR0cFBhcmFtcyxcbiAgICByZXNwb25zZVR5cGU/OiAnYXJyYXlidWZmZXInfCdibG9iJ3wnanNvbid8J3RleHQnLFxuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW4sXG4gICAgYm9keT86IFZ8bnVsbCxcbiAgICBtZXRob2Q/OiBzdHJpbmcsXG4gICAgdXJsPzogc3RyaW5nLFxuICAgIHNldEhlYWRlcnM/OiB7W25hbWU6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdfSxcbiAgICBzZXRQYXJhbXM/OiB7W3BhcmFtOiBzdHJpbmddOiBzdHJpbmd9LFxuICB9KTogSHR0cFJlcXVlc3Q8Vj47XG4gIGNsb25lKHVwZGF0ZToge1xuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyxcbiAgICByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sXG4gICAgcGFyYW1zPzogSHR0cFBhcmFtcyxcbiAgICByZXNwb25zZVR5cGU/OiAnYXJyYXlidWZmZXInfCdibG9iJ3wnanNvbid8J3RleHQnLFxuICAgIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW4sXG4gICAgYm9keT86IGFueXxudWxsLFxuICAgIG1ldGhvZD86IHN0cmluZyxcbiAgICB1cmw/OiBzdHJpbmcsXG4gICAgc2V0SGVhZGVycz86IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW119LFxuICAgIHNldFBhcmFtcz86IHtbcGFyYW06IHN0cmluZ106IHN0cmluZ307XG4gIH0gPSB7fSk6IEh0dHBSZXF1ZXN0PGFueT4ge1xuICAgIC8vIEZvciBtZXRob2QsIHVybCwgYW5kIHJlc3BvbnNlVHlwZSwgdGFrZSB0aGUgY3VycmVudCB2YWx1ZSB1bmxlc3NcbiAgICAvLyBpdCBpcyBvdmVycmlkZGVuIGluIHRoZSB1cGRhdGUgaGFzaC5cbiAgICBjb25zdCBtZXRob2QgPSB1cGRhdGUubWV0aG9kIHx8IHRoaXMubWV0aG9kO1xuICAgIGNvbnN0IHVybCA9IHVwZGF0ZS51cmwgfHwgdGhpcy51cmw7XG4gICAgY29uc3QgcmVzcG9uc2VUeXBlID0gdXBkYXRlLnJlc3BvbnNlVHlwZSB8fCB0aGlzLnJlc3BvbnNlVHlwZTtcblxuICAgIC8vIFRoZSBib2R5IGlzIHNvbWV3aGF0IHNwZWNpYWwgLSBhIGBudWxsYCB2YWx1ZSBpbiB1cGRhdGUuYm9keSBtZWFuc1xuICAgIC8vIHdoYXRldmVyIGN1cnJlbnQgYm9keSBpcyBwcmVzZW50IGlzIGJlaW5nIG92ZXJyaWRkZW4gd2l0aCBhbiBlbXB0eVxuICAgIC8vIGJvZHksIHdoZXJlYXMgYW4gYHVuZGVmaW5lZGAgdmFsdWUgaW4gdXBkYXRlLmJvZHkgaW1wbGllcyBub1xuICAgIC8vIG92ZXJyaWRlLlxuICAgIGNvbnN0IGJvZHkgPSAodXBkYXRlLmJvZHkgIT09IHVuZGVmaW5lZCkgPyB1cGRhdGUuYm9keSA6IHRoaXMuYm9keTtcblxuICAgIC8vIENhcmVmdWxseSBoYW5kbGUgdGhlIGJvb2xlYW4gb3B0aW9ucyB0byBkaWZmZXJlbnRpYXRlIGJldHdlZW5cbiAgICAvLyBgZmFsc2VgIGFuZCBgdW5kZWZpbmVkYCBpbiB0aGUgdXBkYXRlIGFyZ3MuXG4gICAgY29uc3Qgd2l0aENyZWRlbnRpYWxzID1cbiAgICAgICAgKHVwZGF0ZS53aXRoQ3JlZGVudGlhbHMgIT09IHVuZGVmaW5lZCkgPyB1cGRhdGUud2l0aENyZWRlbnRpYWxzIDogdGhpcy53aXRoQ3JlZGVudGlhbHM7XG4gICAgY29uc3QgcmVwb3J0UHJvZ3Jlc3MgPVxuICAgICAgICAodXBkYXRlLnJlcG9ydFByb2dyZXNzICE9PSB1bmRlZmluZWQpID8gdXBkYXRlLnJlcG9ydFByb2dyZXNzIDogdGhpcy5yZXBvcnRQcm9ncmVzcztcblxuICAgIC8vIEhlYWRlcnMgYW5kIHBhcmFtcyBtYXkgYmUgYXBwZW5kZWQgdG8gaWYgYHNldEhlYWRlcnNgIG9yXG4gICAgLy8gYHNldFBhcmFtc2AgYXJlIHVzZWQuXG4gICAgbGV0IGhlYWRlcnMgPSB1cGRhdGUuaGVhZGVycyB8fCB0aGlzLmhlYWRlcnM7XG4gICAgbGV0IHBhcmFtcyA9IHVwZGF0ZS5wYXJhbXMgfHwgdGhpcy5wYXJhbXM7XG5cbiAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBjYWxsZXIgaGFzIGFza2VkIHRvIGFkZCBoZWFkZXJzLlxuICAgIGlmICh1cGRhdGUuc2V0SGVhZGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBTZXQgZXZlcnkgcmVxdWVzdGVkIGhlYWRlci5cbiAgICAgIGhlYWRlcnMgPVxuICAgICAgICAgIE9iamVjdC5rZXlzKHVwZGF0ZS5zZXRIZWFkZXJzKVxuICAgICAgICAgICAgICAucmVkdWNlKChoZWFkZXJzLCBuYW1lKSA9PiBoZWFkZXJzLnNldChuYW1lLCB1cGRhdGUuc2V0SGVhZGVycyAhW25hbWVdKSwgaGVhZGVycyk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgY2FsbGVyIGhhcyBhc2tlZCB0byBzZXQgcGFyYW1zLlxuICAgIGlmICh1cGRhdGUuc2V0UGFyYW1zKSB7XG4gICAgICAvLyBTZXQgZXZlcnkgcmVxdWVzdGVkIHBhcmFtLlxuICAgICAgcGFyYW1zID0gT2JqZWN0LmtleXModXBkYXRlLnNldFBhcmFtcylcbiAgICAgICAgICAgICAgICAgICAucmVkdWNlKChwYXJhbXMsIHBhcmFtKSA9PiBwYXJhbXMuc2V0KHBhcmFtLCB1cGRhdGUuc2V0UGFyYW1zICFbcGFyYW1dKSwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICAvLyBGaW5hbGx5LCBjb25zdHJ1Y3QgdGhlIG5ldyBIdHRwUmVxdWVzdCB1c2luZyB0aGUgcGllY2VzIGZyb20gYWJvdmUuXG4gICAgcmV0dXJuIG5ldyBIdHRwUmVxdWVzdChcbiAgICAgICAgbWV0aG9kLCB1cmwsIGJvZHksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMsIGhlYWRlcnMsIHJlcG9ydFByb2dyZXNzLCByZXNwb25zZVR5cGUsIHdpdGhDcmVkZW50aWFscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG59XG4iXX0=