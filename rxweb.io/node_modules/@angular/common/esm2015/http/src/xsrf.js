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
import { DOCUMENT, ɵparseCookieValue as parseCookieValue } from '@angular/common';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
/** @type {?} */
export const XSRF_COOKIE_NAME = new InjectionToken('XSRF_COOKIE_NAME');
/** @type {?} */
export const XSRF_HEADER_NAME = new InjectionToken('XSRF_HEADER_NAME');
/**
 * Retrieves the current XSRF token to use with the next outgoing request.
 *
 *
 * @abstract
 */
export class HttpXsrfTokenExtractor {
}
if (false) {
    /**
     * Get the XSRF token to use with an outgoing request.
     *
     * Will be called for every request, so the token may change between requests.
     * @abstract
     * @return {?}
     */
    HttpXsrfTokenExtractor.prototype.getToken = function () { };
}
/**
 * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
 */
export class HttpXsrfCookieExtractor {
    /**
     * @param {?} doc
     * @param {?} platform
     * @param {?} cookieName
     */
    constructor(doc, platform, cookieName) {
        this.doc = doc;
        this.platform = platform;
        this.cookieName = cookieName;
        this.lastCookieString = '';
        this.lastToken = null;
        /**
         * \@internal for testing
         */
        this.parseCount = 0;
    }
    /**
     * @return {?}
     */
    getToken() {
        if (this.platform === 'server') {
            return null;
        }
        /** @type {?} */
        const cookieString = this.doc.cookie || '';
        if (cookieString !== this.lastCookieString) {
            this.parseCount++;
            this.lastToken = parseCookieValue(cookieString, this.cookieName);
            this.lastCookieString = cookieString;
        }
        return this.lastToken;
    }
}
HttpXsrfCookieExtractor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpXsrfCookieExtractor.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: String, decorators: [{ type: Inject, args: [XSRF_COOKIE_NAME,] }] }
];
if (false) {
    /** @type {?} */
    HttpXsrfCookieExtractor.prototype.lastCookieString;
    /** @type {?} */
    HttpXsrfCookieExtractor.prototype.lastToken;
    /**
     * \@internal for testing
     * @type {?}
     */
    HttpXsrfCookieExtractor.prototype.parseCount;
    /** @type {?} */
    HttpXsrfCookieExtractor.prototype.doc;
    /** @type {?} */
    HttpXsrfCookieExtractor.prototype.platform;
    /** @type {?} */
    HttpXsrfCookieExtractor.prototype.cookieName;
}
/**
 * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
 */
export class HttpXsrfInterceptor {
    /**
     * @param {?} tokenService
     * @param {?} headerName
     */
    constructor(tokenService, headerName) {
        this.tokenService = tokenService;
        this.headerName = headerName;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        /** @type {?} */
        const lcUrl = req.url.toLowerCase();
        // Skip both non-mutating requests and absolute URLs.
        // Non-mutating requests don't require a token, and absolute URLs require special handling
        // anyway as the cookie set
        // on our origin is not the same as the token expected by another origin.
        if (req.method === 'GET' || req.method === 'HEAD' || lcUrl.startsWith('http://') ||
            lcUrl.startsWith('https://')) {
            return next.handle(req);
        }
        /** @type {?} */
        const token = this.tokenService.getToken();
        // Be careful not to overwrite an existing header of the same name.
        if (token !== null && !req.headers.has(this.headerName)) {
            req = req.clone({ headers: req.headers.set(this.headerName, token) });
        }
        return next.handle(req);
    }
}
HttpXsrfInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpXsrfInterceptor.ctorParameters = () => [
    { type: HttpXsrfTokenExtractor },
    { type: String, decorators: [{ type: Inject, args: [XSRF_HEADER_NAME,] }] }
];
if (false) {
    /** @type {?} */
    HttpXsrfInterceptor.prototype.tokenService;
    /** @type {?} */
    HttpXsrfInterceptor.prototype.headerName;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHNyZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3NyYy94c3JmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBUTlFLGFBQWEsZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQVMsa0JBQWtCLENBQUMsQ0FBQzs7QUFDL0UsYUFBYSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBUyxrQkFBa0IsQ0FBQyxDQUFDOzs7Ozs7O0FBTy9FLE1BQU07Q0FPTDs7Ozs7Ozs7Ozs7Ozs7QUFNRCxNQUFNOzs7Ozs7SUFTSixZQUM4QixHQUFRLEVBQStCLFFBQWdCLEVBQy9DLFVBQWtCO1FBRDFCLFFBQUcsR0FBSCxHQUFHLENBQUs7UUFBK0IsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUMvQyxlQUFVLEdBQVYsVUFBVSxDQUFRO2dDQVZyQixFQUFFO3lCQUNKLElBQUk7Ozs7MEJBS2hCLENBQUM7S0FJc0M7Ozs7SUFFNUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUM7U0FDYjs7UUFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDM0MsSUFBSSxZQUFZLEtBQUssSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFlBQVksQ0FBQztTQUN0QztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN2Qjs7O1lBekJGLFVBQVU7Ozs7NENBV0osTUFBTSxTQUFDLFFBQVE7eUNBQXFCLE1BQU0sU0FBQyxXQUFXO3lDQUN0RCxNQUFNLFNBQUMsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0I5QixNQUFNOzs7OztJQUNKLFlBQ1ksY0FDMEIsVUFBa0I7UUFENUMsaUJBQVksR0FBWixZQUFZO1FBQ2MsZUFBVSxHQUFWLFVBQVUsQ0FBUTtLQUFJOzs7Ozs7SUFFNUQsU0FBUyxDQUFDLEdBQXFCLEVBQUUsSUFBaUI7O1FBQ2hELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7O1FBS3BDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDNUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekI7O1FBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFHM0MsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZELEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCOzs7WUF2QkYsVUFBVTs7OztZQUdpQixzQkFBc0I7eUNBQzNDLE1BQU0sU0FBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIMm1cGFyc2VDb29raWVWYWx1ZSBhcyBwYXJzZUNvb2tpZVZhbHVlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBQTEFURk9STV9JRH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0h0dHBIYW5kbGVyfSBmcm9tICcuL2JhY2tlbmQnO1xuaW1wb3J0IHtIdHRwSW50ZXJjZXB0b3J9IGZyb20gJy4vaW50ZXJjZXB0b3InO1xuaW1wb3J0IHtIdHRwUmVxdWVzdH0gZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7SHR0cEV2ZW50fSBmcm9tICcuL3Jlc3BvbnNlJztcblxuZXhwb3J0IGNvbnN0IFhTUkZfQ09PS0lFX05BTUUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignWFNSRl9DT09LSUVfTkFNRScpO1xuZXhwb3J0IGNvbnN0IFhTUkZfSEVBREVSX05BTUUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignWFNSRl9IRUFERVJfTkFNRScpO1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBYU1JGIHRva2VuIHRvIHVzZSB3aXRoIHRoZSBuZXh0IG91dGdvaW5nIHJlcXVlc3QuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh0dHBYc3JmVG9rZW5FeHRyYWN0b3Ige1xuICAvKipcbiAgICogR2V0IHRoZSBYU1JGIHRva2VuIHRvIHVzZSB3aXRoIGFuIG91dGdvaW5nIHJlcXVlc3QuXG4gICAqXG4gICAqIFdpbGwgYmUgY2FsbGVkIGZvciBldmVyeSByZXF1ZXN0LCBzbyB0aGUgdG9rZW4gbWF5IGNoYW5nZSBiZXR3ZWVuIHJlcXVlc3RzLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0VG9rZW4oKTogc3RyaW5nfG51bGw7XG59XG5cbi8qKlxuICogYEh0dHBYc3JmVG9rZW5FeHRyYWN0b3JgIHdoaWNoIHJldHJpZXZlcyB0aGUgdG9rZW4gZnJvbSBhIGNvb2tpZS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEh0dHBYc3JmQ29va2llRXh0cmFjdG9yIGltcGxlbWVudHMgSHR0cFhzcmZUb2tlbkV4dHJhY3RvciB7XG4gIHByaXZhdGUgbGFzdENvb2tpZVN0cmluZzogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgbGFzdFRva2VuOiBzdHJpbmd8bnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbCBmb3IgdGVzdGluZ1xuICAgKi9cbiAgcGFyc2VDb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBhbnksIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm06IHN0cmluZyxcbiAgICAgIEBJbmplY3QoWFNSRl9DT09LSUVfTkFNRSkgcHJpdmF0ZSBjb29raWVOYW1lOiBzdHJpbmcpIHt9XG5cbiAgZ2V0VG9rZW4oKTogc3RyaW5nfG51bGwge1xuICAgIGlmICh0aGlzLnBsYXRmb3JtID09PSAnc2VydmVyJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGNvb2tpZVN0cmluZyA9IHRoaXMuZG9jLmNvb2tpZSB8fCAnJztcbiAgICBpZiAoY29va2llU3RyaW5nICE9PSB0aGlzLmxhc3RDb29raWVTdHJpbmcpIHtcbiAgICAgIHRoaXMucGFyc2VDb3VudCsrO1xuICAgICAgdGhpcy5sYXN0VG9rZW4gPSBwYXJzZUNvb2tpZVZhbHVlKGNvb2tpZVN0cmluZywgdGhpcy5jb29raWVOYW1lKTtcbiAgICAgIHRoaXMubGFzdENvb2tpZVN0cmluZyA9IGNvb2tpZVN0cmluZztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubGFzdFRva2VuO1xuICB9XG59XG5cbi8qKlxuICogYEh0dHBJbnRlcmNlcHRvcmAgd2hpY2ggYWRkcyBhbiBYU1JGIHRva2VuIHRvIGVsaWdpYmxlIG91dGdvaW5nIHJlcXVlc3RzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cFhzcmZJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSB0b2tlblNlcnZpY2U6IEh0dHBYc3JmVG9rZW5FeHRyYWN0b3IsXG4gICAgICBASW5qZWN0KFhTUkZfSEVBREVSX05BTUUpIHByaXZhdGUgaGVhZGVyTmFtZTogc3RyaW5nKSB7fVxuXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IGxjVXJsID0gcmVxLnVybC50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIFNraXAgYm90aCBub24tbXV0YXRpbmcgcmVxdWVzdHMgYW5kIGFic29sdXRlIFVSTHMuXG4gICAgLy8gTm9uLW11dGF0aW5nIHJlcXVlc3RzIGRvbid0IHJlcXVpcmUgYSB0b2tlbiwgYW5kIGFic29sdXRlIFVSTHMgcmVxdWlyZSBzcGVjaWFsIGhhbmRsaW5nXG4gICAgLy8gYW55d2F5IGFzIHRoZSBjb29raWUgc2V0XG4gICAgLy8gb24gb3VyIG9yaWdpbiBpcyBub3QgdGhlIHNhbWUgYXMgdGhlIHRva2VuIGV4cGVjdGVkIGJ5IGFub3RoZXIgb3JpZ2luLlxuICAgIGlmIChyZXEubWV0aG9kID09PSAnR0VUJyB8fCByZXEubWV0aG9kID09PSAnSEVBRCcgfHwgbGNVcmwuc3RhcnRzV2l0aCgnaHR0cDovLycpIHx8XG4gICAgICAgIGxjVXJsLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vJykpIHtcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xuICAgIH1cbiAgICBjb25zdCB0b2tlbiA9IHRoaXMudG9rZW5TZXJ2aWNlLmdldFRva2VuKCk7XG5cbiAgICAvLyBCZSBjYXJlZnVsIG5vdCB0byBvdmVyd3JpdGUgYW4gZXhpc3RpbmcgaGVhZGVyIG9mIHRoZSBzYW1lIG5hbWUuXG4gICAgaWYgKHRva2VuICE9PSBudWxsICYmICFyZXEuaGVhZGVycy5oYXModGhpcy5oZWFkZXJOYW1lKSkge1xuICAgICAgcmVxID0gcmVxLmNsb25lKHtoZWFkZXJzOiByZXEuaGVhZGVycy5zZXQodGhpcy5oZWFkZXJOYW1lLCB0b2tlbil9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gIH1cbn1cbiJdfQ==