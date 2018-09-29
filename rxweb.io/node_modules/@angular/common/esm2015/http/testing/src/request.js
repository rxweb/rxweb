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
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
/**
 * A mock requests that was received and is ready to be answered.
 *
 * This interface allows access to the underlying `HttpRequest`, and allows
 * responding with `HttpEvent`s or `HttpErrorResponse`s.
 *
 *
 */
export class TestRequest {
    /**
     * @param {?} request
     * @param {?} observer
     */
    constructor(request, observer) {
        this.request = request;
        this.observer = observer;
        /**
         * \@internal set by `HttpClientTestingBackend`
         */
        this._cancelled = false;
    }
    /**
     * Whether the request was cancelled after it was sent.
     * @return {?}
     */
    get cancelled() { return this._cancelled; }
    /**
     * Resolve the request by returning a body plus additional HTTP information (such as response
     * headers) if provided.
     *
     * Both successful and unsuccessful responses can be delivered via `flush()`.
     * @param {?} body
     * @param {?=} opts
     * @return {?}
     */
    flush(body, opts = {}) {
        if (this.cancelled) {
            throw new Error(`Cannot flush a cancelled request.`);
        }
        /** @type {?} */
        const url = this.request.urlWithParams;
        /** @type {?} */
        const headers = (opts.headers instanceof HttpHeaders) ? opts.headers : new HttpHeaders(opts.headers);
        body = _maybeConvertBody(this.request.responseType, body);
        /** @type {?} */
        let statusText = opts.statusText;
        /** @type {?} */
        let status = opts.status !== undefined ? opts.status : 200;
        if (opts.status === undefined) {
            if (body === null) {
                status = 204;
                statusText = statusText || 'No Content';
            }
            else {
                statusText = statusText || 'OK';
            }
        }
        if (statusText === undefined) {
            throw new Error('statusText is required when setting a custom status.');
        }
        if (status >= 200 && status < 300) {
            this.observer.next(new HttpResponse({ body, headers, status, statusText, url }));
            this.observer.complete();
        }
        else {
            this.observer.error(new HttpErrorResponse({ error: body, headers, status, statusText, url }));
        }
    }
    /**
     * Resolve the request by returning an `ErrorEvent` (e.g. simulating a network failure).
     * @param {?} error
     * @param {?=} opts
     * @return {?}
     */
    error(error, opts = {}) {
        if (this.cancelled) {
            throw new Error(`Cannot return an error for a cancelled request.`);
        }
        if (opts.status && opts.status >= 200 && opts.status < 300) {
            throw new Error(`error() called with a successful status.`);
        }
        /** @type {?} */
        const headers = (opts.headers instanceof HttpHeaders) ? opts.headers : new HttpHeaders(opts.headers);
        this.observer.error(new HttpErrorResponse({
            error,
            headers,
            status: opts.status || 0,
            statusText: opts.statusText || '',
            url: this.request.urlWithParams,
        }));
    }
    /**
     * Deliver an arbitrary `HttpEvent` (such as a progress event) on the response stream for this
     * request.
     * @param {?} event
     * @return {?}
     */
    event(event) {
        if (this.cancelled) {
            throw new Error(`Cannot send events to a cancelled request.`);
        }
        this.observer.next(event);
    }
}
if (false) {
    /**
     * \@internal set by `HttpClientTestingBackend`
     * @type {?}
     */
    TestRequest.prototype._cancelled;
    /** @type {?} */
    TestRequest.prototype.request;
    /** @type {?} */
    TestRequest.prototype.observer;
}
/**
 * Helper function to convert a response body to an ArrayBuffer.
 * @param {?} body
 * @return {?}
 */
function _toArrayBufferBody(body) {
    if (typeof ArrayBuffer === 'undefined') {
        throw new Error('ArrayBuffer responses are not supported on this platform.');
    }
    if (body instanceof ArrayBuffer) {
        return body;
    }
    throw new Error('Automatic conversion to ArrayBuffer is not supported for response type.');
}
/**
 * Helper function to convert a response body to a Blob.
 * @param {?} body
 * @return {?}
 */
function _toBlob(body) {
    if (typeof Blob === 'undefined') {
        throw new Error('Blob responses are not supported on this platform.');
    }
    if (body instanceof Blob) {
        return body;
    }
    if (ArrayBuffer && body instanceof ArrayBuffer) {
        return new Blob([body]);
    }
    throw new Error('Automatic conversion to Blob is not supported for response type.');
}
/**
 * Helper function to convert a response body to JSON data.
 * @param {?} body
 * @param {?=} format
 * @return {?}
 */
function _toJsonBody(body, format = 'JSON') {
    if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) {
        throw new Error(`Automatic conversion to ${format} is not supported for ArrayBuffers.`);
    }
    if (typeof Blob !== 'undefined' && body instanceof Blob) {
        throw new Error(`Automatic conversion to ${format} is not supported for Blobs.`);
    }
    if (typeof body === 'string' || typeof body === 'number' || typeof body === 'object' ||
        Array.isArray(body)) {
        return body;
    }
    throw new Error(`Automatic conversion to ${format} is not supported for response type.`);
}
/**
 * Helper function to convert a response body to a string.
 * @param {?} body
 * @return {?}
 */
function _toTextBody(body) {
    if (typeof body === 'string') {
        return body;
    }
    if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) {
        throw new Error('Automatic conversion to text is not supported for ArrayBuffers.');
    }
    if (typeof Blob !== 'undefined' && body instanceof Blob) {
        throw new Error('Automatic conversion to text is not supported for Blobs.');
    }
    return JSON.stringify(_toJsonBody(body, 'text'));
}
/**
 * Convert a response body to the requested type.
 * @param {?} responseType
 * @param {?} body
 * @return {?}
 */
function _maybeConvertBody(responseType, body) {
    if (body === null) {
        return null;
    }
    switch (responseType) {
        case 'arraybuffer':
            return _toArrayBufferBody(body);
        case 'blob':
            return _toBlob(body);
        case 'json':
            return _toJsonBody(body);
        case 'text':
            return _toTextBody(body);
        default:
            throw new Error(`Unsupported responseType: ${responseType}`);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3Rlc3Rpbmcvc3JjL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsaUJBQWlCLEVBQWEsV0FBVyxFQUFlLFlBQVksRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7Ozs7QUFXMUcsTUFBTTs7Ozs7SUFXSixZQUFtQixPQUF5QixFQUFVLFFBQWtDO1FBQXJFLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7Ozs7MEJBRjNFLEtBQUs7S0FFMEU7Ozs7O0lBUDVGLElBQUksU0FBUyxLQUFjLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFOzs7Ozs7Ozs7O0lBZXBELEtBQUssQ0FBQyxJQUE4RSxFQUFFLE9BSWxGLEVBQUU7UUFDSixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ3REOztRQUNELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDOztRQUN2QyxNQUFNLE9BQU8sR0FDVCxDQUFDLElBQUksQ0FBQyxPQUFPLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RixJQUFJLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7O1FBQzFELElBQUksVUFBVSxHQUFxQixJQUFJLENBQUMsVUFBVSxDQUFDOztRQUNuRCxJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFD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V0FBVyxJQUFJLElBQUksWUFBWSxJQUFJLEVBQUU7UUFDdkQsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO0tBQzdFO0lBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztDQUNsRDs7Ozs7OztBQUtELDJCQUNJLFlBQW9CLEVBQUUsSUFDd0I7SUFFaEQsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxRQUFRLFlBQVksRUFBRTtRQUNwQixLQUFLLGFBQWE7WUFDaEIsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxLQUFLLE1BQU07WUFDVCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixLQUFLLE1BQU07WUFDVCxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixLQUFLLE1BQU07WUFDVCxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLFlBQVksRUFBRSxDQUFDLENBQUM7S0FDaEU7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtIdHRwRXJyb3JSZXNwb25zZSwgSHR0cEV2ZW50LCBIdHRwSGVhZGVycywgSHR0cFJlcXVlc3QsIEh0dHBSZXNwb25zZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtPYnNlcnZlcn0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogQSBtb2NrIHJlcXVlc3RzIHRoYXQgd2FzIHJlY2VpdmVkIGFuZCBpcyByZWFkeSB0byBiZSBhbnN3ZXJlZC5cbiAqXG4gKiBUaGlzIGludGVyZmFjZSBhbGxvd3MgYWNjZXNzIHRvIHRoZSB1bmRlcmx5aW5nIGBIdHRwUmVxdWVzdGAsIGFuZCBhbGxvd3NcbiAqIHJlc3BvbmRpbmcgd2l0aCBgSHR0cEV2ZW50YHMgb3IgYEh0dHBFcnJvclJlc3BvbnNlYHMuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFRlc3RSZXF1ZXN0IHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHJlcXVlc3Qgd2FzIGNhbmNlbGxlZCBhZnRlciBpdCB3YXMgc2VudC5cbiAgICovXG4gIGdldCBjYW5jZWxsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jYW5jZWxsZWQ7IH1cblxuICAvKipcbiAgICogQGludGVybmFsIHNldCBieSBgSHR0cENsaWVudFRlc3RpbmdCYWNrZW5kYFxuICAgKi9cbiAgX2NhbmNlbGxlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBwcml2YXRlIG9ic2VydmVyOiBPYnNlcnZlcjxIdHRwRXZlbnQ8YW55Pj4pIHt9XG5cbiAgLyoqXG4gICAqIFJlc29sdmUgdGhlIHJlcXVlc3QgYnkgcmV0dXJuaW5nIGEgYm9keSBwbHVzIGFkZGl0aW9uYWwgSFRUUCBpbmZvcm1hdGlvbiAoc3VjaCBhcyByZXNwb25zZVxuICAgKiBoZWFkZXJzKSBpZiBwcm92aWRlZC5cbiAgICpcbiAgICogQm90aCBzdWNjZXNzZnVsIGFuZCB1bnN1Y2Nlc3NmdWwgcmVzcG9uc2VzIGNhbiBiZSBkZWxpdmVyZWQgdmlhIGBmbHVzaCgpYC5cbiAgICovXG4gIGZsdXNoKGJvZHk6IEFycmF5QnVmZmVyfEJsb2J8c3RyaW5nfG51bWJlcnxPYmplY3R8KHN0cmluZ3xudW1iZXJ8T2JqZWN0fG51bGwpW118bnVsbCwgb3B0czoge1xuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycyB8IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW119LFxuICAgIHN0YXR1cz86IG51bWJlcixcbiAgICBzdGF0dXNUZXh0Pzogc3RyaW5nLFxuICB9ID0ge30pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5jZWxsZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZsdXNoIGEgY2FuY2VsbGVkIHJlcXVlc3QuYCk7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IHRoaXMucmVxdWVzdC51cmxXaXRoUGFyYW1zO1xuICAgIGNvbnN0IGhlYWRlcnMgPVxuICAgICAgICAob3B0cy5oZWFkZXJzIGluc3RhbmNlb2YgSHR0cEhlYWRlcnMpID8gb3B0cy5oZWFkZXJzIDogbmV3IEh0dHBIZWFkZXJzKG9wdHMuaGVhZGVycyk7XG4gICAgYm9keSA9IF9tYXliZUNvbnZlcnRCb2R5KHRoaXMucmVxdWVzdC5yZXNwb25zZVR5cGUsIGJvZHkpO1xuICAgIGxldCBzdGF0dXNUZXh0OiBzdHJpbmd8dW5kZWZpbmVkID0gb3B0cy5zdGF0dXNUZXh0O1xuICAgIGxldCBzdGF0dXM6IG51bWJlciA9IG9wdHMuc3RhdHVzICE9PSB1bmRlZmluZWQgPyBvcHRzLnN0YXR1cyA6IDIwMDtcbiAgICBpZiAob3B0cy5zdGF0dXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGJvZHkgPT09IG51bGwpIHtcbiAgICAgICAgc3RhdHVzID0gMjA0O1xuICAgICAgICBzdGF0dXNUZXh0ID0gc3RhdHVzVGV4dCB8fCAnTm8gQ29udGVudCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0dXNUZXh0ID0gc3RhdHVzVGV4dCB8fCAnT0snO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RhdHVzVGV4dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0YXR1c1RleHQgaXMgcmVxdWlyZWQgd2hlbiBzZXR0aW5nIGEgY3VzdG9tIHN0YXR1cy4nKTtcbiAgICB9XG4gICAgaWYgKHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwKSB7XG4gICAgICB0aGlzLm9ic2VydmVyLm5leHQobmV3IEh0dHBSZXNwb25zZTxhbnk+KHtib2R5LCBoZWFkZXJzLCBzdGF0dXMsIHN0YXR1c1RleHQsIHVybH0pKTtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vYnNlcnZlci5lcnJvcihuZXcgSHR0cEVycm9yUmVzcG9uc2Uoe2Vycm9yOiBib2R5LCBoZWFkZXJzLCBzdGF0dXMsIHN0YXR1c1RleHQsIHVybH0pKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZSB0aGUgcmVxdWVzdCBieSByZXR1cm5pbmcgYW4gYEVycm9yRXZlbnRgIChlLmcuIHNpbXVsYXRpbmcgYSBuZXR3b3JrIGZhaWx1cmUpLlxuICAgKi9cbiAgZXJyb3IoZXJyb3I6IEVycm9yRXZlbnQsIG9wdHM6IHtcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMgfCB7W25hbWU6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdfSxcbiAgICBzdGF0dXM/OiBudW1iZXIsXG4gICAgc3RhdHVzVGV4dD86IHN0cmluZyxcbiAgfSA9IHt9KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FuY2VsbGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCByZXR1cm4gYW4gZXJyb3IgZm9yIGEgY2FuY2VsbGVkIHJlcXVlc3QuYCk7XG4gICAgfVxuICAgIGlmIChvcHRzLnN0YXR1cyAmJiBvcHRzLnN0YXR1cyA+PSAyMDAgJiYgb3B0cy5zdGF0dXMgPCAzMDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgZXJyb3IoKSBjYWxsZWQgd2l0aCBhIHN1Y2Nlc3NmdWwgc3RhdHVzLmApO1xuICAgIH1cbiAgICBjb25zdCBoZWFkZXJzID1cbiAgICAgICAgKG9wdHMuaGVhZGVycyBpbnN0YW5jZW9mIEh0dHBIZWFkZXJzKSA/IG9wdHMuaGVhZGVycyA6IG5ldyBIdHRwSGVhZGVycyhvcHRzLmhlYWRlcnMpO1xuICAgIHRoaXMub2JzZXJ2ZXIuZXJyb3IobmV3IEh0dHBFcnJvclJlc3BvbnNlKHtcbiAgICAgIGVycm9yLFxuICAgICAgaGVhZGVycyxcbiAgICAgIHN0YXR1czogb3B0cy5zdGF0dXMgfHwgMCxcbiAgICAgIHN0YXR1c1RleHQ6IG9wdHMuc3RhdHVzVGV4dCB8fCAnJyxcbiAgICAgIHVybDogdGhpcy5yZXF1ZXN0LnVybFdpdGhQYXJhbXMsXG4gICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGl2ZXIgYW4gYXJiaXRyYXJ5IGBIdHRwRXZlbnRgIChzdWNoIGFzIGEgcHJvZ3Jlc3MgZXZlbnQpIG9uIHRoZSByZXNwb25zZSBzdHJlYW0gZm9yIHRoaXNcbiAgICogcmVxdWVzdC5cbiAgICovXG4gIGV2ZW50KGV2ZW50OiBIdHRwRXZlbnQ8YW55Pik6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhbmNlbGxlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3Qgc2VuZCBldmVudHMgdG8gYSBjYW5jZWxsZWQgcmVxdWVzdC5gKTtcbiAgICB9XG4gICAgdGhpcy5vYnNlcnZlci5uZXh0KGV2ZW50KTtcbiAgfVxufVxuXG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNvbnZlcnQgYSByZXNwb25zZSBib2R5IHRvIGFuIEFycmF5QnVmZmVyLlxuICovXG5mdW5jdGlvbiBfdG9BcnJheUJ1ZmZlckJvZHkoXG4gICAgYm9keTogQXJyYXlCdWZmZXIgfCBCbG9iIHwgc3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0IHxcbiAgICAoc3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0IHwgbnVsbClbXSk6IEFycmF5QnVmZmVyIHtcbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FycmF5QnVmZmVyIHJlc3BvbnNlcyBhcmUgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicpO1xuICB9XG4gIGlmIChib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gYm9keTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ0F1dG9tYXRpYyBjb252ZXJzaW9uIHRvIEFycmF5QnVmZmVyIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHJlc3BvbnNlIHR5cGUuJyk7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNvbnZlcnQgYSByZXNwb25zZSBib2R5IHRvIGEgQmxvYi5cbiAqL1xuZnVuY3Rpb24gX3RvQmxvYihcbiAgICBib2R5OiBBcnJheUJ1ZmZlciB8IEJsb2IgfCBzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfFxuICAgIChzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfCBudWxsKVtdKTogQmxvYiB7XG4gIGlmICh0eXBlb2YgQmxvYiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jsb2IgcmVzcG9uc2VzIGFyZSBub3Qgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0uJyk7XG4gIH1cbiAgaWYgKGJvZHkgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cbiAgaWYgKEFycmF5QnVmZmVyICYmIGJvZHkgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBuZXcgQmxvYihbYm9keV0pO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignQXV0b21hdGljIGNvbnZlcnNpb24gdG8gQmxvYiBpcyBub3Qgc3VwcG9ydGVkIGZvciByZXNwb25zZSB0eXBlLicpO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjb252ZXJ0IGEgcmVzcG9uc2UgYm9keSB0byBKU09OIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIF90b0pzb25Cb2R5KFxuICAgIGJvZHk6IEFycmF5QnVmZmVyIHwgQmxvYiB8IHN0cmluZyB8IG51bWJlciB8IE9iamVjdCB8IChzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfCBudWxsKVtdLFxuICAgIGZvcm1hdDogc3RyaW5nID0gJ0pTT04nKTogT2JqZWN0fHN0cmluZ3xudW1iZXJ8KE9iamVjdCB8IHN0cmluZyB8IG51bWJlcilbXSB7XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGJvZHkgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHRocm93IG5ldyBFcnJvcihgQXV0b21hdGljIGNvbnZlcnNpb24gdG8gJHtmb3JtYXR9IGlzIG5vdCBzdXBwb3J0ZWQgZm9yIEFycmF5QnVmZmVycy5gKTtcbiAgfVxuICBpZiAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGJvZHkgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBBdXRvbWF0aWMgY29udmVyc2lvbiB0byAke2Zvcm1hdH0gaXMgbm90IHN1cHBvcnRlZCBmb3IgQmxvYnMuYCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgYm9keSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIGJvZHkgPT09ICdvYmplY3QnIHx8XG4gICAgICBBcnJheS5pc0FycmF5KGJvZHkpKSB7XG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBBdXRvbWF0aWMgY29udmVyc2lvbiB0byAke2Zvcm1hdH0gaXMgbm90IHN1cHBvcnRlZCBmb3IgcmVzcG9uc2UgdHlwZS5gKTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY29udmVydCBhIHJlc3BvbnNlIGJvZHkgdG8gYSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIF90b1RleHRCb2R5KFxuICAgIGJvZHk6IEFycmF5QnVmZmVyIHwgQmxvYiB8IHN0cmluZyB8IG51bWJlciB8IE9iamVjdCB8XG4gICAgKHN0cmluZyB8IG51bWJlciB8IE9iamVjdCB8IG51bGwpW10pOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBdXRvbWF0aWMgY29udmVyc2lvbiB0byB0ZXh0IGlzIG5vdCBzdXBwb3J0ZWQgZm9yIEFycmF5QnVmZmVycy4nKTtcbiAgfVxuICBpZiAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGJvZHkgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBdXRvbWF0aWMgY29udmVyc2lvbiB0byB0ZXh0IGlzIG5vdCBzdXBwb3J0ZWQgZm9yIEJsb2JzLicpO1xuICB9XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShfdG9Kc29uQm9keShib2R5LCAndGV4dCcpKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgcmVzcG9uc2UgYm9keSB0byB0aGUgcmVxdWVzdGVkIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIF9tYXliZUNvbnZlcnRCb2R5KFxuICAgIHJlc3BvbnNlVHlwZTogc3RyaW5nLCBib2R5OiBBcnJheUJ1ZmZlciB8IEJsb2IgfCBzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfFxuICAgICAgICAoc3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0IHwgbnVsbClbXSB8IG51bGwpOiBBcnJheUJ1ZmZlcnxCbG9ifHN0cmluZ3xudW1iZXJ8T2JqZWN0fFxuICAgIChzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfCBudWxsKVtdfG51bGwge1xuICBpZiAoYm9keSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN3aXRjaCAocmVzcG9uc2VUeXBlKSB7XG4gICAgY2FzZSAnYXJyYXlidWZmZXInOlxuICAgICAgcmV0dXJuIF90b0FycmF5QnVmZmVyQm9keShib2R5KTtcbiAgICBjYXNlICdibG9iJzpcbiAgICAgIHJldHVybiBfdG9CbG9iKGJvZHkpO1xuICAgIGNhc2UgJ2pzb24nOlxuICAgICAgcmV0dXJuIF90b0pzb25Cb2R5KGJvZHkpO1xuICAgIGNhc2UgJ3RleHQnOlxuICAgICAgcmV0dXJuIF90b1RleHRCb2R5KGJvZHkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIHJlc3BvbnNlVHlwZTogJHtyZXNwb25zZVR5cGV9YCk7XG4gIH1cbn1cbiJdfQ==