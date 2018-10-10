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
var TestRequest = /** @class */ (function () {
    function TestRequest(request, observer) {
        this.request = request;
        this.observer = observer;
        /**
         * @internal set by `HttpClientTestingBackend`
         */
        this._cancelled = false;
    }
    Object.defineProperty(TestRequest.prototype, "cancelled", {
        /**
         * Whether the request was cancelled after it was sent.
         */
        get: function () { return this._cancelled; },
        enumerable: true,
        configurable: true
    });
    /**
     * Resolve the request by returning a body plus additional HTTP information (such as response
     * headers) if provided.
     *
     * Both successful and unsuccessful responses can be delivered via `flush()`.
     */
    TestRequest.prototype.flush = function (body, opts) {
        if (opts === void 0) { opts = {}; }
        if (this.cancelled) {
            throw new Error("Cannot flush a cancelled request.");
        }
        var url = this.request.urlWithParams;
        var headers = (opts.headers instanceof HttpHeaders) ? opts.headers : new HttpHeaders(opts.headers);
        body = _maybeConvertBody(this.request.responseType, body);
        var statusText = opts.statusText;
        var status = opts.status !== undefined ? opts.status : 200;
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
            this.observer.next(new HttpResponse({ body: body, headers: headers, status: status, statusText: statusText, url: url }));
            this.observer.complete();
        }
        else {
            this.observer.error(new HttpErrorResponse({ error: body, headers: headers, status: status, statusText: statusText, url: url }));
        }
    };
    /**
     * Resolve the request by returning an `ErrorEvent` (e.g. simulating a network failure).
     */
    TestRequest.prototype.error = function (error, opts) {
        if (opts === void 0) { opts = {}; }
        if (this.cancelled) {
            throw new Error("Cannot return an error for a cancelled request.");
        }
        if (opts.status && opts.status >= 200 && opts.status < 300) {
            throw new Error("error() called with a successful status.");
        }
        var headers = (opts.headers instanceof HttpHeaders) ? opts.headers : new HttpHeaders(opts.headers);
        this.observer.error(new HttpErrorResponse({
            error: error,
            headers: headers,
            status: opts.status || 0,
            statusText: opts.statusText || '',
            url: this.request.urlWithParams,
        }));
    };
    /**
     * Deliver an arbitrary `HttpEvent` (such as a progress event) on the response stream for this
     * request.
     */
    TestRequest.prototype.event = function (event) {
        if (this.cancelled) {
            throw new Error("Cannot send events to a cancelled request.");
        }
        this.observer.next(event);
    };
    return TestRequest;
}());
export { TestRequest };
/**
 * Helper function to convert a response body to an ArrayBuffer.
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
 */
function _toJsonBody(body, format) {
    if (format === void 0) { format = 'JSON'; }
    if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) {
        throw new Error("Automatic conversion to " + format + " is not supported for ArrayBuffers.");
    }
    if (typeof Blob !== 'undefined' && body instanceof Blob) {
        throw new Error("Automatic conversion to " + format + " is not supported for Blobs.");
    }
    if (typeof body === 'string' || typeof body === 'number' || typeof body === 'object' ||
        Array.isArray(body)) {
        return body;
    }
    throw new Error("Automatic conversion to " + format + " is not supported for response type.");
}
/**
 * Helper function to convert a response body to a string.
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
            throw new Error("Unsupported responseType: " + responseType);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9odHRwL3Rlc3Rpbmcvc3JjL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGlCQUFpQixFQUFhLFdBQVcsRUFBZSxZQUFZLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUcxRzs7Ozs7OztHQU9HO0FBQ0g7SUFXRSxxQkFBbUIsT0FBeUIsRUFBVSxRQUFrQztRQUFyRSxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBTHhGOztXQUVHO1FBQ0gsZUFBVSxHQUFHLEtBQUssQ0FBQztJQUV3RSxDQUFDO0lBUDVGLHNCQUFJLGtDQUFTO1FBSGI7O1dBRUc7YUFDSCxjQUEyQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQVNwRDs7Ozs7T0FLRztJQUNILDJCQUFLLEdBQUwsVUFBTSxJQUE4RSxFQUFFLElBSWhGO1FBSmdGLHFCQUFBLEVBQUEsU0FJaEY7UUFDSixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDdkMsSUFBTSxPQUFPLEdBQ1QsQ0FBQyxJQUFJLENBQUMsT0FBTyxZQUFZLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekYsSUFBSSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFELElBQUksVUFBVSxHQUFxQixJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ25ELElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbkUsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUM3QixJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLE1BQU0sR0FBRyxHQUFHLENBQUM7Z0JBQ2IsVUFBVSxHQUFHLFVBQVUsSUFBSSxZQUFZLENBQUM7YUFDekM7aUJBQU07Z0JBQ0wsVUFBVSxHQUFHLFVBQVUsSUFBSSxJQUFJLENBQUM7YUFDakM7U0FDRjtRQUNELElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDekU7UUFDRCxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBTSxFQUFDLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLFVBQVUsWUFBQSxFQUFFLEdBQUcsS0FBQSxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDMUI7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sU0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLFVBQVUsWUFBQSxFQUFFLEdBQUcsS0FBQSxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdGO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMkJBQUssR0FBTCxVQUFNLEtBQWlCLEVBQUUsSUFJbkI7UUFKbUIscUJBQUEsRUFBQSxTQUluQjtRQUNKLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7U0FDcEU7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsSUFBTSxPQUFPLEdBQ1QsQ0FBQyxJQUFJLENBQUMsT0FBTyxZQUFZLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxpQkFBaUIsQ0FBQztZQUN4QyxLQUFLLE9BQUE7WUFDTCxPQUFPLFNBQUE7WUFDUCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ3hCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUU7WUFDakMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYTtTQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDSCwyQkFBSyxHQUFMLFVBQU0sS0FBcUI7UUFDekIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztTQUMvRDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUF2RkQsSUF1RkM7O0FBR0Q7O0dBRUc7QUFDSCw0QkFDSSxJQUNtQztJQUNyQyxJQUFJLE9BQU8sV0FBVyxLQUFLLFdBQVcsRUFBRTtRQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7S0FDOUU7SUFDRCxJQUFJLElBQUksWUFBWSxXQUFXLEVBQUU7UUFDL0IsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMseUVBQXlFLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxpQkFDSSxJQUNtQztJQUNyQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsRUFBRTtRQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7S0FDdkU7SUFDRCxJQUFJLElBQUksWUFBWSxJQUFJLEVBQUU7UUFDeEIsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELElBQUksV0FBVyxJQUFJLElBQUksWUFBWSxXQUFXLEVBQUU7UUFDOUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDekI7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUM7QUFDdEYsQ0FBQztBQUVEOztHQUVHO0FBQ0gscUJBQ0ksSUFBeUYsRUFDekYsTUFBdUI7SUFBdkIsdUJBQUEsRUFBQSxlQUF1QjtJQUN6QixJQUFJLE9BQU8sV0FBVyxLQUFLLFdBQVcsSUFBSSxJQUFJLFlBQVksV0FBVyxFQUFFO1FBQ3JFLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTJCLE1BQU0sd0NBQXFDLENBQUMsQ0FBQztLQUN6RjtJQUNELElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksWUFBWSxJQUFJLEVBQUU7UUFDdkQsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBMkIsTUFBTSxpQ0FBOEIsQ0FBQyxDQUFDO0tBQ2xGO0lBQ0QsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVE7UUFDaEYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBMkIsTUFBTSx5Q0FBc0MsQ0FBQyxDQUFDO0FBQzNGLENBQUM7QUFFRDs7R0FFRztBQUNILHFCQUNJLElBQ21DO0lBQ3JDLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzVCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxJQUFJLE9BQU8sV0FBVyxLQUFLLFdBQVcsSUFBSSxJQUFJLFlBQVksV0FBVyxFQUFFO1FBQ3JFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUVBQWlFLENBQUMsQ0FBQztLQUNwRjtJQUNELElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksWUFBWSxJQUFJLEVBQUU7UUFDdkQsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO0tBQzdFO0lBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCwyQkFDSSxZQUFvQixFQUFFLElBQ3dCO0lBRWhELElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtRQUNqQixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsUUFBUSxZQUFZLEVBQUU7UUFDcEIsS0FBSyxhQUFhO1lBQ2hCLE9BQU8sa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsS0FBSyxNQUFNO1lBQ1QsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsS0FBSyxNQUFNO1lBQ1QsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsS0FBSyxNQUFNO1lBQ1QsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0I7WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUE2QixZQUFjLENBQUMsQ0FBQztLQUNoRTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SHR0cEVycm9yUmVzcG9uc2UsIEh0dHBFdmVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7T2JzZXJ2ZXJ9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIEEgbW9jayByZXF1ZXN0cyB0aGF0IHdhcyByZWNlaXZlZCBhbmQgaXMgcmVhZHkgdG8gYmUgYW5zd2VyZWQuXG4gKlxuICogVGhpcyBpbnRlcmZhY2UgYWxsb3dzIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBgSHR0cFJlcXVlc3RgLCBhbmQgYWxsb3dzXG4gKiByZXNwb25kaW5nIHdpdGggYEh0dHBFdmVudGBzIG9yIGBIdHRwRXJyb3JSZXNwb25zZWBzLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXN0UmVxdWVzdCB7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSByZXF1ZXN0IHdhcyBjYW5jZWxsZWQgYWZ0ZXIgaXQgd2FzIHNlbnQuXG4gICAqL1xuICBnZXQgY2FuY2VsbGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY2FuY2VsbGVkOyB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbCBzZXQgYnkgYEh0dHBDbGllbnRUZXN0aW5nQmFja2VuZGBcbiAgICovXG4gIF9jYW5jZWxsZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgcHJpdmF0ZSBvYnNlcnZlcjogT2JzZXJ2ZXI8SHR0cEV2ZW50PGFueT4+KSB7fVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlIHRoZSByZXF1ZXN0IGJ5IHJldHVybmluZyBhIGJvZHkgcGx1cyBhZGRpdGlvbmFsIEhUVFAgaW5mb3JtYXRpb24gKHN1Y2ggYXMgcmVzcG9uc2VcbiAgICogaGVhZGVycykgaWYgcHJvdmlkZWQuXG4gICAqXG4gICAqIEJvdGggc3VjY2Vzc2Z1bCBhbmQgdW5zdWNjZXNzZnVsIHJlc3BvbnNlcyBjYW4gYmUgZGVsaXZlcmVkIHZpYSBgZmx1c2goKWAuXG4gICAqL1xuICBmbHVzaChib2R5OiBBcnJheUJ1ZmZlcnxCbG9ifHN0cmluZ3xudW1iZXJ8T2JqZWN0fChzdHJpbmd8bnVtYmVyfE9iamVjdHxudWxsKVtdfG51bGwsIG9wdHM6IHtcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMgfCB7W25hbWU6IHN0cmluZ106IHN0cmluZyB8IHN0cmluZ1tdfSxcbiAgICBzdGF0dXM/OiBudW1iZXIsXG4gICAgc3RhdHVzVGV4dD86IHN0cmluZyxcbiAgfSA9IHt9KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FuY2VsbGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmbHVzaCBhIGNhbmNlbGxlZCByZXF1ZXN0LmApO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSB0aGlzLnJlcXVlc3QudXJsV2l0aFBhcmFtcztcbiAgICBjb25zdCBoZWFkZXJzID1cbiAgICAgICAgKG9wdHMuaGVhZGVycyBpbnN0YW5jZW9mIEh0dHBIZWFkZXJzKSA/IG9wdHMuaGVhZGVycyA6IG5ldyBIdHRwSGVhZGVycyhvcHRzLmhlYWRlcnMpO1xuICAgIGJvZHkgPSBfbWF5YmVDb252ZXJ0Qm9keSh0aGlzLnJlcXVlc3QucmVzcG9uc2VUeXBlLCBib2R5KTtcbiAgICBsZXQgc3RhdHVzVGV4dDogc3RyaW5nfHVuZGVmaW5lZCA9IG9wdHMuc3RhdHVzVGV4dDtcbiAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSBvcHRzLnN0YXR1cyAhPT0gdW5kZWZpbmVkID8gb3B0cy5zdGF0dXMgOiAyMDA7XG4gICAgaWYgKG9wdHMuc3RhdHVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChib2R5ID09PSBudWxsKSB7XG4gICAgICAgIHN0YXR1cyA9IDIwNDtcbiAgICAgICAgc3RhdHVzVGV4dCA9IHN0YXR1c1RleHQgfHwgJ05vIENvbnRlbnQnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdHVzVGV4dCA9IHN0YXR1c1RleHQgfHwgJ09LJztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN0YXR1c1RleHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdGF0dXNUZXh0IGlzIHJlcXVpcmVkIHdoZW4gc2V0dGluZyBhIGN1c3RvbSBzdGF0dXMuJyk7XG4gICAgfVxuICAgIGlmIChzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCkge1xuICAgICAgdGhpcy5vYnNlcnZlci5uZXh0KG5ldyBIdHRwUmVzcG9uc2U8YW55Pih7Ym9keSwgaGVhZGVycywgc3RhdHVzLCBzdGF0dXNUZXh0LCB1cmx9KSk7XG4gICAgICB0aGlzLm9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuZXJyb3IobmV3IEh0dHBFcnJvclJlc3BvbnNlKHtlcnJvcjogYm9keSwgaGVhZGVycywgc3RhdHVzLCBzdGF0dXNUZXh0LCB1cmx9KSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmUgdGhlIHJlcXVlc3QgYnkgcmV0dXJuaW5nIGFuIGBFcnJvckV2ZW50YCAoZS5nLiBzaW11bGF0aW5nIGEgbmV0d29yayBmYWlsdXJlKS5cbiAgICovXG4gIGVycm9yKGVycm9yOiBFcnJvckV2ZW50LCBvcHRzOiB7XG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzIHwge1tuYW1lOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXX0sXG4gICAgc3RhdHVzPzogbnVtYmVyLFxuICAgIHN0YXR1c1RleHQ/OiBzdHJpbmcsXG4gIH0gPSB7fSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhbmNlbGxlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmV0dXJuIGFuIGVycm9yIGZvciBhIGNhbmNlbGxlZCByZXF1ZXN0LmApO1xuICAgIH1cbiAgICBpZiAob3B0cy5zdGF0dXMgJiYgb3B0cy5zdGF0dXMgPj0gMjAwICYmIG9wdHMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGVycm9yKCkgY2FsbGVkIHdpdGggYSBzdWNjZXNzZnVsIHN0YXR1cy5gKTtcbiAgICB9XG4gICAgY29uc3QgaGVhZGVycyA9XG4gICAgICAgIChvcHRzLmhlYWRlcnMgaW5zdGFuY2VvZiBIdHRwSGVhZGVycykgPyBvcHRzLmhlYWRlcnMgOiBuZXcgSHR0cEhlYWRlcnMob3B0cy5oZWFkZXJzKTtcbiAgICB0aGlzLm9ic2VydmVyLmVycm9yKG5ldyBIdHRwRXJyb3JSZXNwb25zZSh7XG4gICAgICBlcnJvcixcbiAgICAgIGhlYWRlcnMsXG4gICAgICBzdGF0dXM6IG9wdHMuc3RhdHVzIHx8IDAsXG4gICAgICBzdGF0dXNUZXh0OiBvcHRzLnN0YXR1c1RleHQgfHwgJycsXG4gICAgICB1cmw6IHRoaXMucmVxdWVzdC51cmxXaXRoUGFyYW1zLFxuICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxpdmVyIGFuIGFyYml0cmFyeSBgSHR0cEV2ZW50YCAoc3VjaCBhcyBhIHByb2dyZXNzIGV2ZW50KSBvbiB0aGUgcmVzcG9uc2Ugc3RyZWFtIGZvciB0aGlzXG4gICAqIHJlcXVlc3QuXG4gICAqL1xuICBldmVudChldmVudDogSHR0cEV2ZW50PGFueT4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5jZWxsZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHNlbmQgZXZlbnRzIHRvIGEgY2FuY2VsbGVkIHJlcXVlc3QuYCk7XG4gICAgfVxuICAgIHRoaXMub2JzZXJ2ZXIubmV4dChldmVudCk7XG4gIH1cbn1cblxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjb252ZXJ0IGEgcmVzcG9uc2UgYm9keSB0byBhbiBBcnJheUJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gX3RvQXJyYXlCdWZmZXJCb2R5KFxuICAgIGJvZHk6IEFycmF5QnVmZmVyIHwgQmxvYiB8IHN0cmluZyB8IG51bWJlciB8IE9iamVjdCB8XG4gICAgKHN0cmluZyB8IG51bWJlciB8IE9iamVjdCB8IG51bGwpW10pOiBBcnJheUJ1ZmZlciB7XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBcnJheUJ1ZmZlciByZXNwb25zZXMgYXJlIG5vdCBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybS4nKTtcbiAgfVxuICBpZiAoYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdBdXRvbWF0aWMgY29udmVyc2lvbiB0byBBcnJheUJ1ZmZlciBpcyBub3Qgc3VwcG9ydGVkIGZvciByZXNwb25zZSB0eXBlLicpO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjb252ZXJ0IGEgcmVzcG9uc2UgYm9keSB0byBhIEJsb2IuXG4gKi9cbmZ1bmN0aW9uIF90b0Jsb2IoXG4gICAgYm9keTogQXJyYXlCdWZmZXIgfCBCbG9iIHwgc3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0IHxcbiAgICAoc3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0IHwgbnVsbClbXSk6IEJsb2Ige1xuICBpZiAodHlwZW9mIEJsb2IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCbG9iIHJlc3BvbnNlcyBhcmUgbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtLicpO1xuICB9XG4gIGlmIChib2R5IGluc3RhbmNlb2YgQmxvYikge1xuICAgIHJldHVybiBib2R5O1xuICB9XG4gIGlmIChBcnJheUJ1ZmZlciAmJiBib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gbmV3IEJsb2IoW2JvZHldKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ0F1dG9tYXRpYyBjb252ZXJzaW9uIHRvIEJsb2IgaXMgbm90IHN1cHBvcnRlZCBmb3IgcmVzcG9uc2UgdHlwZS4nKTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY29udmVydCBhIHJlc3BvbnNlIGJvZHkgdG8gSlNPTiBkYXRhLlxuICovXG5mdW5jdGlvbiBfdG9Kc29uQm9keShcbiAgICBib2R5OiBBcnJheUJ1ZmZlciB8IEJsb2IgfCBzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfCAoc3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0IHwgbnVsbClbXSxcbiAgICBmb3JtYXQ6IHN0cmluZyA9ICdKU09OJyk6IE9iamVjdHxzdHJpbmd8bnVtYmVyfChPYmplY3QgfCBzdHJpbmcgfCBudW1iZXIpW10ge1xuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEF1dG9tYXRpYyBjb252ZXJzaW9uIHRvICR7Zm9ybWF0fSBpcyBub3Qgc3VwcG9ydGVkIGZvciBBcnJheUJ1ZmZlcnMuYCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBib2R5IGluc3RhbmNlb2YgQmxvYikge1xuICAgIHRocm93IG5ldyBFcnJvcihgQXV0b21hdGljIGNvbnZlcnNpb24gdG8gJHtmb3JtYXR9IGlzIG5vdCBzdXBwb3J0ZWQgZm9yIEJsb2JzLmApO1xuICB9XG4gIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGJvZHkgPT09ICdudW1iZXInIHx8IHR5cGVvZiBib2R5ID09PSAnb2JqZWN0JyB8fFxuICAgICAgQXJyYXkuaXNBcnJheShib2R5KSkge1xuICAgIHJldHVybiBib2R5O1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgQXV0b21hdGljIGNvbnZlcnNpb24gdG8gJHtmb3JtYXR9IGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHJlc3BvbnNlIHR5cGUuYCk7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGNvbnZlcnQgYSByZXNwb25zZSBib2R5IHRvIGEgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBfdG9UZXh0Qm9keShcbiAgICBib2R5OiBBcnJheUJ1ZmZlciB8IEJsb2IgfCBzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfFxuICAgIChzdHJpbmcgfCBudW1iZXIgfCBPYmplY3QgfCBudWxsKVtdKTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBib2R5O1xuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGJvZHkgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHRocm93IG5ldyBFcnJvcignQXV0b21hdGljIGNvbnZlcnNpb24gdG8gdGV4dCBpcyBub3Qgc3VwcG9ydGVkIGZvciBBcnJheUJ1ZmZlcnMuJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBib2R5IGluc3RhbmNlb2YgQmxvYikge1xuICAgIHRocm93IG5ldyBFcnJvcignQXV0b21hdGljIGNvbnZlcnNpb24gdG8gdGV4dCBpcyBub3Qgc3VwcG9ydGVkIGZvciBCbG9icy4nKTtcbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoX3RvSnNvbkJvZHkoYm9keSwgJ3RleHQnKSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhIHJlc3BvbnNlIGJvZHkgdG8gdGhlIHJlcXVlc3RlZCB0eXBlLlxuICovXG5mdW5jdGlvbiBfbWF5YmVDb252ZXJ0Qm9keShcbiAgICByZXNwb25zZVR5cGU6IHN0cmluZywgYm9keTogQXJyYXlCdWZmZXIgfCBCbG9iIHwgc3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0IHxcbiAgICAgICAgKHN0cmluZyB8IG51bWJlciB8IE9iamVjdCB8IG51bGwpW10gfCBudWxsKTogQXJyYXlCdWZmZXJ8QmxvYnxzdHJpbmd8bnVtYmVyfE9iamVjdHxcbiAgICAoc3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0IHwgbnVsbClbXXxudWxsIHtcbiAgaWYgKGJvZHkgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBzd2l0Y2ggKHJlc3BvbnNlVHlwZSkge1xuICAgIGNhc2UgJ2FycmF5YnVmZmVyJzpcbiAgICAgIHJldHVybiBfdG9BcnJheUJ1ZmZlckJvZHkoYm9keSk7XG4gICAgY2FzZSAnYmxvYic6XG4gICAgICByZXR1cm4gX3RvQmxvYihib2R5KTtcbiAgICBjYXNlICdqc29uJzpcbiAgICAgIHJldHVybiBfdG9Kc29uQm9keShib2R5KTtcbiAgICBjYXNlICd0ZXh0JzpcbiAgICAgIHJldHVybiBfdG9UZXh0Qm9keShib2R5KTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCByZXNwb25zZVR5cGU6ICR7cmVzcG9uc2VUeXBlfWApO1xuICB9XG59XG4iXX0=