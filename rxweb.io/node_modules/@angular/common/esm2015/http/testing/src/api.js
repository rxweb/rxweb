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
 * Defines a matcher for requests based on URL, method, or both.
 *
 *
 * @record
 */
export function RequestMatch() { }
/** @type {?|undefined} */
RequestMatch.prototype.method;
/** @type {?|undefined} */
RequestMatch.prototype.url;
/**
 * Controller to be injected into tests, that allows for mocking and flushing
 * of requests.
 *
 *
 * @abstract
 */
export class HttpTestingController {
}
if (false) {
    /**
     * Search for requests that match the given parameter, without any expectations.
     * @abstract
     * @param {?} match
     * @return {?}
     */
    HttpTestingController.prototype.match = function (match) { };
    /**
     * Expect that a single request has been made which matches the given URL, and return its
     * mock.
     *
     * If no such request has been made, or more than one such request has been made, fail with an
     * error message including the given request description, if any.
     * @abstract
     * @param {?} url
     * @param {?=} description
     * @return {?}
     */
    HttpTestingController.prototype.expectOne = function (url, description) { };
    /**
     * Expect that a single request has been made which matches the given parameters, and return
     * its mock.
     *
     * If no such request has been made, or more than one such request has been made, fail with an
     * error message including the given request description, if any.
     * @abstract
     * @param {?} params
     * @param {?=} description
     * @return {?}
     */
    HttpTestingController.prototype.expectOne = function (params, description) { };
    /**
     * Expect that a single request has been made which matches the given predicate function, and
     * return its mock.
     *
     * If no such request has been made, or more than one such request has been made, fail with an
     * error message including the given request description, if any.
     * @abstract
     * @param {?} matchFn
     * @param {?=} description
     * @return {?}
     */
    HttpTestingController.prototype.expectOne = function (matchFn, description) { };
    /**
     * Expect that a single request has been made which matches the given condition, and return
     * its mock.
     *
     * If no such request has been made, or more than one such request has been made, fail with an
     * error message including the given request description, if any.
     * @abstract
     * @param {?} match
     * @param {?=} description
     * @return {?}
     */
    HttpTestingController.prototype.expectOne = function (match, description) { };
    /**
     * Expect that no requests have been made which match the given URL.
     *
     * If a matching request has been made, fail with an error message including the given request
     * description, if any.
     * @abstract
     * @param {?} url
     * @param {?=} description
     * @return {?}
     */
    HttpTestingController.prototype.expectNone = function (url, description) { };
    /**
     * Expect that no requests have been made which match the given parameters.
     *
     * If a matching request has been made, fail with an error message including the given request
     * description, if any.
     * @abstract
     * @param {?} params
     * @param {?=} description
     * @return {?}
     */
    HttpTestingController.prototype.expectNone = function (params, description) { };
    /**
     * Expect that no requests have been made which match the given predicate function.
     *
     * If a matching request has been made, fail with an error message including the given request
     * description, if any.
     * @abstract
     * @param {?} matchFn
     * @param {?=} description
     * @return {?}
     */
    HttpTestingController.prototype.expectNone = function (matchFn, description) { };
    /**
     * Expect that no requests have been made which match the given condition.
     *
     * If a matching request has been made, fail with an error message including the given request
     * description, if any.
     * @abstract
     * @param {?} match
     * @param {?=} description
     * @return {?}
     */
    HttpTestingController.prototype.expectNone = function (match, description) { };
    /**
     * Verify that no unmatched requests are outstanding.
     *
     * If any requests are outstanding, fail with an error message indicating which requests were not
     * handled.
     *
     * If `ignoreCancelled` is not set (the default), `verify()` will also fail if cancelled requests
     * were not explicitly matched.
     * @abstract
     * @param {?=} opts
     * @return {?}
     */
    HttpTestingController.prototype.verify = function (opts) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tbW9uL2h0dHAvdGVzdGluZy9zcmMvYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLE1BQU07Q0F3RkwiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SHR0cFJlcXVlc3R9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHtUZXN0UmVxdWVzdH0gZnJvbSAnLi9yZXF1ZXN0JztcblxuLyoqXG4gKiBEZWZpbmVzIGEgbWF0Y2hlciBmb3IgcmVxdWVzdHMgYmFzZWQgb24gVVJMLCBtZXRob2QsIG9yIGJvdGguXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0TWF0Y2gge1xuICBtZXRob2Q/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBDb250cm9sbGVyIHRvIGJlIGluamVjdGVkIGludG8gdGVzdHMsIHRoYXQgYWxsb3dzIGZvciBtb2NraW5nIGFuZCBmbHVzaGluZ1xuICogb2YgcmVxdWVzdHMuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh0dHBUZXN0aW5nQ29udHJvbGxlciB7XG4gIC8qKlxuICAgKiBTZWFyY2ggZm9yIHJlcXVlc3RzIHRoYXQgbWF0Y2ggdGhlIGdpdmVuIHBhcmFtZXRlciwgd2l0aG91dCBhbnkgZXhwZWN0YXRpb25zLlxuICAgKi9cbiAgYWJzdHJhY3QgbWF0Y2gobWF0Y2g6IHN0cmluZ3xSZXF1ZXN0TWF0Y2h8KChyZXE6IEh0dHBSZXF1ZXN0PGFueT4pID0+IGJvb2xlYW4pKTogVGVzdFJlcXVlc3RbXTtcblxuICAvKipcbiAgICogRXhwZWN0IHRoYXQgYSBzaW5nbGUgcmVxdWVzdCBoYXMgYmVlbiBtYWRlIHdoaWNoIG1hdGNoZXMgdGhlIGdpdmVuIFVSTCwgYW5kIHJldHVybiBpdHNcbiAgICogbW9jay5cbiAgICpcbiAgICogSWYgbm8gc3VjaCByZXF1ZXN0IGhhcyBiZWVuIG1hZGUsIG9yIG1vcmUgdGhhbiBvbmUgc3VjaCByZXF1ZXN0IGhhcyBiZWVuIG1hZGUsIGZhaWwgd2l0aCBhblxuICAgKiBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZ2l2ZW4gcmVxdWVzdCBkZXNjcmlwdGlvbiwgaWYgYW55LlxuICAgKi9cbiAgYWJzdHJhY3QgZXhwZWN0T25lKHVybDogc3RyaW5nLCBkZXNjcmlwdGlvbj86IHN0cmluZyk6IFRlc3RSZXF1ZXN0O1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhhdCBhIHNpbmdsZSByZXF1ZXN0IGhhcyBiZWVuIG1hZGUgd2hpY2ggbWF0Y2hlcyB0aGUgZ2l2ZW4gcGFyYW1ldGVycywgYW5kIHJldHVyblxuICAgKiBpdHMgbW9jay5cbiAgICpcbiAgICogSWYgbm8gc3VjaCByZXF1ZXN0IGhhcyBiZWVuIG1hZGUsIG9yIG1vcmUgdGhhbiBvbmUgc3VjaCByZXF1ZXN0IGhhcyBiZWVuIG1hZGUsIGZhaWwgd2l0aCBhblxuICAgKiBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZ2l2ZW4gcmVxdWVzdCBkZXNjcmlwdGlvbiwgaWYgYW55LlxuICAgKi9cbiAgYWJzdHJhY3QgZXhwZWN0T25lKHBhcmFtczogUmVxdWVzdE1hdGNoLCBkZXNjcmlwdGlvbj86IHN0cmluZyk6IFRlc3RSZXF1ZXN0O1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhhdCBhIHNpbmdsZSByZXF1ZXN0IGhhcyBiZWVuIG1hZGUgd2hpY2ggbWF0Y2hlcyB0aGUgZ2l2ZW4gcHJlZGljYXRlIGZ1bmN0aW9uLCBhbmRcbiAgICogcmV0dXJuIGl0cyBtb2NrLlxuICAgKlxuICAgKiBJZiBubyBzdWNoIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgb3IgbW9yZSB0aGFuIG9uZSBzdWNoIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgZmFpbCB3aXRoIGFuXG4gICAqIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBnaXZlbiByZXF1ZXN0IGRlc2NyaXB0aW9uLCBpZiBhbnkuXG4gICAqL1xuICBhYnN0cmFjdCBleHBlY3RPbmUobWF0Y2hGbjogKChyZXE6IEh0dHBSZXF1ZXN0PGFueT4pID0+IGJvb2xlYW4pLCBkZXNjcmlwdGlvbj86IHN0cmluZyk6XG4gICAgICBUZXN0UmVxdWVzdDtcblxuICAvKipcbiAgICogRXhwZWN0IHRoYXQgYSBzaW5nbGUgcmVxdWVzdCBoYXMgYmVlbiBtYWRlIHdoaWNoIG1hdGNoZXMgdGhlIGdpdmVuIGNvbmRpdGlvbiwgYW5kIHJldHVyblxuICAgKiBpdHMgbW9jay5cbiAgICpcbiAgICogSWYgbm8gc3VjaCByZXF1ZXN0IGhhcyBiZWVuIG1hZGUsIG9yIG1vcmUgdGhhbiBvbmUgc3VjaCByZXF1ZXN0IGhhcyBiZWVuIG1hZGUsIGZhaWwgd2l0aCBhblxuICAgKiBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZ2l2ZW4gcmVxdWVzdCBkZXNjcmlwdGlvbiwgaWYgYW55LlxuICAgKi9cbiAgYWJzdHJhY3QgZXhwZWN0T25lKFxuICAgICAgbWF0Y2g6IHN0cmluZ3xSZXF1ZXN0TWF0Y2h8KChyZXE6IEh0dHBSZXF1ZXN0PGFueT4pID0+IGJvb2xlYW4pLFxuICAgICAgZGVzY3JpcHRpb24/OiBzdHJpbmcpOiBUZXN0UmVxdWVzdDtcblxuICAvKipcbiAgICogRXhwZWN0IHRoYXQgbm8gcmVxdWVzdHMgaGF2ZSBiZWVuIG1hZGUgd2hpY2ggbWF0Y2ggdGhlIGdpdmVuIFVSTC5cbiAgICpcbiAgICogSWYgYSBtYXRjaGluZyByZXF1ZXN0IGhhcyBiZWVuIG1hZGUsIGZhaWwgd2l0aCBhbiBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZ2l2ZW4gcmVxdWVzdFxuICAgKiBkZXNjcmlwdGlvbiwgaWYgYW55LlxuICAgKi9cbiAgYWJzdHJhY3QgZXhwZWN0Tm9uZSh1cmw6IHN0cmluZywgZGVzY3JpcHRpb24/OiBzdHJpbmcpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhhdCBubyByZXF1ZXN0cyBoYXZlIGJlZW4gbWFkZSB3aGljaCBtYXRjaCB0aGUgZ2l2ZW4gcGFyYW1ldGVycy5cbiAgICpcbiAgICogSWYgYSBtYXRjaGluZyByZXF1ZXN0IGhhcyBiZWVuIG1hZGUsIGZhaWwgd2l0aCBhbiBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZ2l2ZW4gcmVxdWVzdFxuICAgKiBkZXNjcmlwdGlvbiwgaWYgYW55LlxuICAgKi9cbiAgYWJzdHJhY3QgZXhwZWN0Tm9uZShwYXJhbXM6IFJlcXVlc3RNYXRjaCwgZGVzY3JpcHRpb24/OiBzdHJpbmcpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhhdCBubyByZXF1ZXN0cyBoYXZlIGJlZW4gbWFkZSB3aGljaCBtYXRjaCB0aGUgZ2l2ZW4gcHJlZGljYXRlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBJZiBhIG1hdGNoaW5nIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgZmFpbCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBnaXZlbiByZXF1ZXN0XG4gICAqIGRlc2NyaXB0aW9uLCBpZiBhbnkuXG4gICAqL1xuICBhYnN0cmFjdCBleHBlY3ROb25lKG1hdGNoRm46ICgocmVxOiBIdHRwUmVxdWVzdDxhbnk+KSA9PiBib29sZWFuKSwgZGVzY3JpcHRpb24/OiBzdHJpbmcpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhhdCBubyByZXF1ZXN0cyBoYXZlIGJlZW4gbWFkZSB3aGljaCBtYXRjaCB0aGUgZ2l2ZW4gY29uZGl0aW9uLlxuICAgKlxuICAgKiBJZiBhIG1hdGNoaW5nIHJlcXVlc3QgaGFzIGJlZW4gbWFkZSwgZmFpbCB3aXRoIGFuIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBnaXZlbiByZXF1ZXN0XG4gICAqIGRlc2NyaXB0aW9uLCBpZiBhbnkuXG4gICAqL1xuICBhYnN0cmFjdCBleHBlY3ROb25lKFxuICAgICAgbWF0Y2g6IHN0cmluZ3xSZXF1ZXN0TWF0Y2h8KChyZXE6IEh0dHBSZXF1ZXN0PGFueT4pID0+IGJvb2xlYW4pLCBkZXNjcmlwdGlvbj86IHN0cmluZyk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFZlcmlmeSB0aGF0IG5vIHVubWF0Y2hlZCByZXF1ZXN0cyBhcmUgb3V0c3RhbmRpbmcuXG4gICAqXG4gICAqIElmIGFueSByZXF1ZXN0cyBhcmUgb3V0c3RhbmRpbmcsIGZhaWwgd2l0aCBhbiBlcnJvciBtZXNzYWdlIGluZGljYXRpbmcgd2hpY2ggcmVxdWVzdHMgd2VyZSBub3RcbiAgICogaGFuZGxlZC5cbiAgICpcbiAgICogSWYgYGlnbm9yZUNhbmNlbGxlZGAgaXMgbm90IHNldCAodGhlIGRlZmF1bHQpLCBgdmVyaWZ5KClgIHdpbGwgYWxzbyBmYWlsIGlmIGNhbmNlbGxlZCByZXF1ZXN0c1xuICAgKiB3ZXJlIG5vdCBleHBsaWNpdGx5IG1hdGNoZWQuXG4gICAqL1xuICBhYnN0cmFjdCB2ZXJpZnkob3B0cz86IHtpZ25vcmVDYW5jZWxsZWQ/OiBib29sZWFufSk6IHZvaWQ7XG59XG4iXX0=