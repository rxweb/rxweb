/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
 * `HttpResponse`.
 *
 * `HttpHandler` is injectable. When injected, the handler instance dispatches requests to the
 * first interceptor in the chain, which dispatches to the second, etc, eventually reaching the
 * `HttpBackend`.
 *
 * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
 *
 *
 */
var HttpHandler = /** @class */ (function () {
    function HttpHandler() {
    }
    return HttpHandler;
}());
export { HttpHandler };
/**
 * A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.
 *
 * Interceptors sit between the `HttpClient` interface and the `HttpBackend`.
 *
 * When injected, `HttpBackend` dispatches requests directly to the backend, without going
 * through the interceptor chain.
 *
 *
 */
var HttpBackend = /** @class */ (function () {
    function HttpBackend() {
    }
    return HttpBackend;
}());
export { HttpBackend };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3NyYy9iYWNrZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQU1IOzs7Ozs7Ozs7OztHQVdHO0FBQ0g7SUFBQTtJQUVBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFGRCxJQUVDOztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNIO0lBQUE7SUFFQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7SHR0cFJlcXVlc3R9IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQge0h0dHBFdmVudH0gZnJvbSAnLi9yZXNwb25zZSc7XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhbiBgSHR0cFJlcXVlc3RgIGludG8gYSBzdHJlYW0gb2YgYEh0dHBFdmVudGBzLCBvbmUgb2Ygd2hpY2ggd2lsbCBsaWtlbHkgYmUgYVxuICogYEh0dHBSZXNwb25zZWAuXG4gKlxuICogYEh0dHBIYW5kbGVyYCBpcyBpbmplY3RhYmxlLiBXaGVuIGluamVjdGVkLCB0aGUgaGFuZGxlciBpbnN0YW5jZSBkaXNwYXRjaGVzIHJlcXVlc3RzIHRvIHRoZVxuICogZmlyc3QgaW50ZXJjZXB0b3IgaW4gdGhlIGNoYWluLCB3aGljaCBkaXNwYXRjaGVzIHRvIHRoZSBzZWNvbmQsIGV0YywgZXZlbnR1YWxseSByZWFjaGluZyB0aGVcbiAqIGBIdHRwQmFja2VuZGAuXG4gKlxuICogSW4gYW4gYEh0dHBJbnRlcmNlcHRvcmAsIHRoZSBgSHR0cEhhbmRsZXJgIHBhcmFtZXRlciBpcyB0aGUgbmV4dCBpbnRlcmNlcHRvciBpbiB0aGUgY2hhaW4uXG4gKlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh0dHBIYW5kbGVyIHtcbiAgYWJzdHJhY3QgaGFuZGxlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+O1xufVxuXG4vKipcbiAqIEEgZmluYWwgYEh0dHBIYW5kbGVyYCB3aGljaCB3aWxsIGRpc3BhdGNoIHRoZSByZXF1ZXN0IHZpYSBicm93c2VyIEhUVFAgQVBJcyB0byBhIGJhY2tlbmQuXG4gKlxuICogSW50ZXJjZXB0b3JzIHNpdCBiZXR3ZWVuIHRoZSBgSHR0cENsaWVudGAgaW50ZXJmYWNlIGFuZCB0aGUgYEh0dHBCYWNrZW5kYC5cbiAqXG4gKiBXaGVuIGluamVjdGVkLCBgSHR0cEJhY2tlbmRgIGRpc3BhdGNoZXMgcmVxdWVzdHMgZGlyZWN0bHkgdG8gdGhlIGJhY2tlbmQsIHdpdGhvdXQgZ29pbmdcbiAqIHRocm91Z2ggdGhlIGludGVyY2VwdG9yIGNoYWluLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBIdHRwQmFja2VuZCBpbXBsZW1lbnRzIEh0dHBIYW5kbGVyIHtcbiAgYWJzdHJhY3QgaGFuZGxlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+O1xufVxuIl19