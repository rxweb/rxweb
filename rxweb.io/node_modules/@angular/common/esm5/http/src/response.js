/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { HttpHeaders } from './headers';
/**
 * Type enumeration for the different kinds of `HttpEvent`.
 *
 *
 */
export var HttpEventType;
(function (HttpEventType) {
    /**
     * The request was sent out over the wire.
     */
    HttpEventType[HttpEventType["Sent"] = 0] = "Sent";
    /**
     * An upload progress event was received.
     */
    HttpEventType[HttpEventType["UploadProgress"] = 1] = "UploadProgress";
    /**
     * The response status code and headers were received.
     */
    HttpEventType[HttpEventType["ResponseHeader"] = 2] = "ResponseHeader";
    /**
     * A download progress event was received.
     */
    HttpEventType[HttpEventType["DownloadProgress"] = 3] = "DownloadProgress";
    /**
     * The full response including the body was received.
     */
    HttpEventType[HttpEventType["Response"] = 4] = "Response";
    /**
     * A custom event from an interceptor or a backend.
     */
    HttpEventType[HttpEventType["User"] = 5] = "User";
})(HttpEventType || (HttpEventType = {}));
/**
 * Base class for both `HttpResponse` and `HttpHeaderResponse`.
 *
 *
 */
var HttpResponseBase = /** @class */ (function () {
    /**
     * Super-constructor for all responses.
     *
     * The single parameter accepted is an initialization hash. Any properties
     * of the response passed there will override the default values.
     */
    function HttpResponseBase(init, defaultStatus, defaultStatusText) {
        if (defaultStatus === void 0) { defaultStatus = 200; }
        if (defaultStatusText === void 0) { defaultStatusText = 'OK'; }
        // If the hash has values passed, use them to initialize the response.
        // Otherwise use the default values.
        this.headers = init.headers || new HttpHeaders();
        this.status = init.status !== undefined ? init.status : defaultStatus;
        this.statusText = init.statusText || defaultStatusText;
        this.url = init.url || null;
        // Cache the ok value to avoid defining a getter.
        this.ok = this.status >= 200 && this.status < 300;
    }
    return HttpResponseBase;
}());
export { HttpResponseBase };
/**
 * A partial HTTP response which only includes the status and header data,
 * but no response body.
 *
 * `HttpHeaderResponse` is a `HttpEvent` available on the response
 * event stream, only when progress events are requested.
 *
 *
 */
var HttpHeaderResponse = /** @class */ (function (_super) {
    tslib_1.__extends(HttpHeaderResponse, _super);
    /**
     * Create a new `HttpHeaderResponse` with the given parameters.
     */
    function HttpHeaderResponse(init) {
        if (init === void 0) { init = {}; }
        var _this = _super.call(this, init) || this;
        _this.type = HttpEventType.ResponseHeader;
        return _this;
    }
    /**
     * Copy this `HttpHeaderResponse`, overriding its contents with the
     * given parameter hash.
     */
    HttpHeaderResponse.prototype.clone = function (update) {
        if (update === void 0) { update = {}; }
        // Perform a straightforward initialization of the new HttpHeaderResponse,
        // overriding the current parameters with new ones if given.
        return new HttpHeaderResponse({
            headers: update.headers || this.headers,
            status: update.status !== undefined ? update.status : this.status,
            statusText: update.statusText || this.statusText,
            url: update.url || this.url || undefined,
        });
    };
    return HttpHeaderResponse;
}(HttpResponseBase));
export { HttpHeaderResponse };
/**
 * A full HTTP response, including a typed response body (which may be `null`
 * if one was not returned).
 *
 * `HttpResponse` is a `HttpEvent` available on the response event
 * stream.
 *
 *
 */
var HttpResponse = /** @class */ (function (_super) {
    tslib_1.__extends(HttpResponse, _super);
    /**
     * Construct a new `HttpResponse`.
     */
    function HttpResponse(init) {
        if (init === void 0) { init = {}; }
        var _this = _super.call(this, init) || this;
        _this.type = HttpEventType.Response;
        _this.body = init.body !== undefined ? init.body : null;
        return _this;
    }
    HttpResponse.prototype.clone = function (update) {
        if (update === void 0) { update = {}; }
        return new HttpResponse({
            body: (update.body !== undefined) ? update.body : this.body,
            headers: update.headers || this.headers,
            status: (update.status !== undefined) ? update.status : this.status,
            statusText: update.statusText || this.statusText,
            url: update.url || this.url || undefined,
        });
    };
    return HttpResponse;
}(HttpResponseBase));
export { HttpResponse };
/**
 * A response that represents an error or failure, either from a
 * non-successful HTTP status, an error while executing the request,
 * or some other failure which occurred during the parsing of the response.
 *
 * Any error returned on the `Observable` response stream will be
 * wrapped in an `HttpErrorResponse` to provide additional context about
 * the state of the HTTP layer when the error occurred. The error property
 * will contain either a wrapped Error object or the error response returned
 * from the server.
 *
 *
 */
var HttpErrorResponse = /** @class */ (function (_super) {
    tslib_1.__extends(HttpErrorResponse, _super);
    function HttpErrorResponse(init) {
        var _this = 
        // Initialize with a default status of 0 / Unknown Error.
        _super.call(this, init, 0, 'Unknown Error') || this;
        _this.name = 'HttpErrorResponse';
        /**
         * Errors are never okay, even when the status code is in the 2xx success range.
         */
        _this.ok = false;
        // If the response was successful, then this was a parse error. Otherwise, it was
        // a protocol-level failure of some sort. Either the request failed in transit
        // or the server returned an unsuccessful status code.
        if (_this.status >= 200 && _this.status < 300) {
            _this.message = "Http failure during parsing for " + (init.url || '(unknown url)');
        }
        else {
            _this.message =
                "Http failure response for " + (init.url || '(unknown url)') + ": " + init.status + " " + init.statusText;
        }
        _this.error = init.error || null;
        return _this;
    }
    return HttpErrorResponse;
}(HttpResponseBase));
export { HttpErrorResponse };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vaHR0cC9zcmMvcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFdEM7Ozs7R0FJRztBQUNILE1BQU0sQ0FBTixJQUFZLGFBOEJYO0FBOUJELFdBQVksYUFBYTtJQUN2Qjs7T0FFRztJQUNILGlEQUFJLENBQUE7SUFFSjs7T0FFRztJQUNILHFFQUFjLENBQUE7SUFFZDs7T0FFRztJQUNILHFFQUFjLENBQUE7SUFFZDs7T0FFRztJQUNILHlFQUFnQixDQUFBO0lBRWhCOztPQUVHO0lBQ0gseURBQVEsQ0FBQTtJQUVSOztPQUVHO0lBQ0gsaURBQUksQ0FBQTtBQUNOLENBQUMsRUE5QlcsYUFBYSxLQUFiLGFBQWEsUUE4QnhCO0FBNEZEOzs7O0dBSUc7QUFDSDtJQWtDRTs7Ozs7T0FLRztJQUNILDBCQUNJLElBS0MsRUFDRCxhQUEyQixFQUFFLGlCQUFnQztRQUE3RCw4QkFBQSxFQUFBLG1CQUEyQjtRQUFFLGtDQUFBLEVBQUEsd0JBQWdDO1FBQy9ELHNFQUFzRTtRQUN0RSxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksV0FBVyxFQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxpQkFBaUIsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxD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LEtBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLEtBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQzNDLEtBQUksQ0FBQyxPQUFPLEdBQUcsc0NBQW1DLElBQUksQ0FBQyxHQUFHLElBQUksZUFBZSxDQUFFLENBQUM7U0FDakY7YUFBTTtZQUNMLEtBQUksQ0FBQyxPQUFPO2dCQUNSLGdDQUE2QixJQUFJLENBQUMsR0FBRyxJQUFJLGVBQWUsV0FBSyxJQUFJLENBQUMsTUFBTSxTQUFJLElBQUksQ0FBQyxVQUFZLENBQUM7U0FDbkc7UUFDRCxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDOztJQUNsQyxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBM0JELENBQXVDLGdCQUFnQixHQTJCdEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SHR0cEhlYWRlcnN9IGZyb20gJy4vaGVhZGVycyc7XG5cbi8qKlxuICogVHlwZSBlbnVtZXJhdGlvbiBmb3IgdGhlIGRpZmZlcmVudCBraW5kcyBvZiBgSHR0cEV2ZW50YC5cbiAqXG4gKlxuICovXG5leHBvcnQgZW51bSBIdHRwRXZlbnRUeXBlIHtcbiAgLyoqXG4gICAqIFRoZSByZXF1ZXN0IHdhcyBzZW50IG91dCBvdmVyIHRoZSB3aXJlLlxuICAgKi9cbiAgU2VudCxcblxuICAvKipcbiAgICogQW4gdXBsb2FkIHByb2dyZXNzIGV2ZW50IHdhcyByZWNlaXZlZC5cbiAgICovXG4gIFVwbG9hZFByb2dyZXNzLFxuXG4gIC8qKlxuICAgKiBUaGUgcmVzcG9uc2Ugc3RhdHVzIGNvZGUgYW5kIGhlYWRlcnMgd2VyZSByZWNlaXZlZC5cbiAgICovXG4gIFJlc3BvbnNlSGVhZGVyLFxuXG4gIC8qKlxuICAgKiBBIGRvd25sb2FkIHByb2dyZXNzIGV2ZW50IHdhcyByZWNlaXZlZC5cbiAgICovXG4gIERvd25sb2FkUHJvZ3Jlc3MsXG5cbiAgLyoqXG4gICAqIFRoZSBmdWxsIHJlc3BvbnNlIGluY2x1ZGluZyB0aGUgYm9keSB3YXMgcmVjZWl2ZWQuXG4gICAqL1xuICBSZXNwb25zZSxcblxuICAvKipcbiAgICogQSBjdXN0b20gZXZlbnQgZnJvbSBhbiBpbnRlcmNlcHRvciBvciBhIGJhY2tlbmQuXG4gICAqL1xuICBVc2VyLFxufVxuXG4vKipcbiAqIEJhc2UgaW50ZXJmYWNlIGZvciBwcm9ncmVzcyBldmVudHMuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIdHRwUHJvZ3Jlc3NFdmVudCB7XG4gIC8qKlxuICAgKiBQcm9ncmVzcyBldmVudCB0eXBlIGlzIGVpdGhlciB1cGxvYWQgb3IgZG93bmxvYWQuXG4gICAqL1xuICB0eXBlOiBIdHRwRXZlbnRUeXBlLkRvd25sb2FkUHJvZ3Jlc3N8SHR0cEV2ZW50VHlwZS5VcGxvYWRQcm9ncmVzcztcblxuICAvKipcbiAgICogTnVtYmVyIG9mIGJ5dGVzIHVwbG9hZGVkIG9yIGRvd25sb2FkZWQuXG4gICAqL1xuICBsb2FkZWQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVG90YWwgbnVtYmVyIG9mIGJ5dGVzIHRvIHVwbG9hZCBvciBkb3dubG9hZC4gRGVwZW5kaW5nIG9uIHRoZSByZXF1ZXN0IG9yXG4gICAqIHJlc3BvbnNlLCB0aGlzIG1heSBub3QgYmUgY29tcHV0YWJsZSBhbmQgdGh1cyBtYXkgbm90IGJlIHByZXNlbnQuXG4gICAqL1xuICB0b3RhbD86IG51bWJlcjtcbn1cblxuLyoqXG4gKiBBIGRvd25sb2FkIHByb2dyZXNzIGV2ZW50LlxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSHR0cERvd25sb2FkUHJvZ3Jlc3NFdmVudCBleHRlbmRzIEh0dHBQcm9ncmVzc0V2ZW50IHtcbiAgdHlwZTogSHR0cEV2ZW50VHlwZS5Eb3dubG9hZFByb2dyZXNzO1xuXG4gIC8qKlxuICAgKiBUaGUgcGFydGlhbCByZXNwb25zZSBib2R5IGFzIGRvd25sb2FkZWQgc28gZmFyLlxuICAgKlxuICAgKiBPbmx5IHByZXNlbnQgaWYgdGhlIHJlc3BvbnNlVHlwZSB3YXMgYHRleHRgLlxuICAgKi9cbiAgcGFydGlhbFRleHQ/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gdXBsb2FkIHByb2dyZXNzIGV2ZW50LlxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSHR0cFVwbG9hZFByb2dyZXNzRXZlbnQgZXh0ZW5kcyBIdHRwUHJvZ3Jlc3NFdmVudCB7XG4gIHR5cGU6IEh0dHBFdmVudFR5cGUuVXBsb2FkUHJvZ3Jlc3M7XG59XG5cbi8qKlxuICogQW4gZXZlbnQgaW5kaWNhdGluZyB0aGF0IHRoZSByZXF1ZXN0IHdhcyBzZW50IHRvIHRoZSBzZXJ2ZXIuIFVzZWZ1bFxuICogd2hlbiBhIHJlcXVlc3QgbWF5IGJlIHJldHJpZWQgbXVsdGlwbGUgdGltZXMsIHRvIGRpc3Rpbmd1aXNoIGJldHdlZW5cbiAqIHJldHJpZXMgb24gdGhlIGZpbmFsIGV2ZW50IHN0cmVhbS5cbiAqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEh0dHBTZW50RXZlbnQgeyB0eXBlOiBIdHRwRXZlbnRUeXBlLlNlbnQ7IH1cblxuLyoqXG4gKiBBIHVzZXItZGVmaW5lZCBldmVudC5cbiAqXG4gKiBHcm91cGluZyBhbGwgY3VzdG9tIGV2ZW50cyB1bmRlciB0aGlzIHR5cGUgZW5zdXJlcyB0aGV5IHdpbGwgYmUgaGFuZGxlZFxuICogYW5kIGZvcndhcmRlZCBieSBhbGwgaW1wbGVtZW50YXRpb25zIG9mIGludGVyY2VwdG9ycy5cbiAqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEh0dHBVc2VyRXZlbnQ8VD4geyB0eXBlOiBIdHRwRXZlbnRUeXBlLlVzZXI7IH1cblxuLyoqXG4gKiBBbiBlcnJvciB0aGF0IHJlcHJlc2VudHMgYSBmYWlsZWQgYXR0ZW1wdCB0byBKU09OLnBhcnNlIHRleHQgY29taW5nIGJhY2tcbiAqIGZyb20gdGhlIHNlcnZlci5cbiAqXG4gKiBJdCBidW5kbGVzIHRoZSBFcnJvciBvYmplY3Qgd2l0aCB0aGUgYWN0dWFsIHJlc3BvbnNlIGJvZHkgdGhhdCBmYWlsZWQgdG8gcGFyc2UuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIdHRwSnNvblBhcnNlRXJyb3Ige1xuICBlcnJvcjogRXJyb3I7XG4gIHRleHQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBVbmlvbiB0eXBlIGZvciBhbGwgcG9zc2libGUgZXZlbnRzIG9uIHRoZSByZXNwb25zZSBzdHJlYW0uXG4gKlxuICogVHlwZWQgYWNjb3JkaW5nIHRvIHRoZSBleHBlY3RlZCB0eXBlIG9mIHRoZSByZXNwb25zZS5cbiAqXG4gKlxuICovXG5leHBvcnQgdHlwZSBIdHRwRXZlbnQ8VD4gPVxuICAgIEh0dHBTZW50RXZlbnQgfCBIdHRwSGVhZGVyUmVzcG9uc2UgfCBIdHRwUmVzcG9uc2U8VD58IEh0dHBQcm9ncmVzc0V2ZW50IHwgSHR0cFVzZXJFdmVudDxUPjtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBib3RoIGBIdHRwUmVzcG9uc2VgIGFuZCBgSHR0cEhlYWRlclJlc3BvbnNlYC5cbiAqXG4gKlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSHR0cFJlc3BvbnNlQmFzZSB7XG4gIC8qKlxuICAgKiBBbGwgcmVzcG9uc2UgaGVhZGVycy5cbiAgICovXG4gIHJlYWRvbmx5IGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xuXG4gIC8qKlxuICAgKiBSZXNwb25zZSBzdGF0dXMgY29kZS5cbiAgICovXG4gIHJlYWRvbmx5IHN0YXR1czogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUZXh0dWFsIGRlc2NyaXB0aW9uIG9mIHJlc3BvbnNlIHN0YXR1cyBjb2RlLlxuICAgKlxuICAgKiBEbyBub3QgZGVwZW5kIG9uIHRoaXMuXG4gICAqL1xuICByZWFkb25seSBzdGF0dXNUZXh0OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFVSTCBvZiB0aGUgcmVzb3VyY2UgcmV0cmlldmVkLCBvciBudWxsIGlmIG5vdCBhdmFpbGFibGUuXG4gICAqL1xuICByZWFkb25seSB1cmw6IHN0cmluZ3xudWxsO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBzdGF0dXMgY29kZSBmYWxscyBpbiB0aGUgMnh4IHJhbmdlLlxuICAgKi9cbiAgcmVhZG9ubHkgb2s6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFR5cGUgb2YgdGhlIHJlc3BvbnNlLCBuYXJyb3dlZCB0byBlaXRoZXIgdGhlIGZ1bGwgcmVzcG9uc2Ugb3IgdGhlIGhlYWRlci5cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICByZWFkb25seSB0eXBlICE6IEh0dHBFdmVudFR5cGUuUmVzcG9uc2UgfCBIdHRwRXZlbnRUeXBlLlJlc3BvbnNlSGVhZGVyO1xuXG4gIC8qKlxuICAgKiBTdXBlci1jb25zdHJ1Y3RvciBmb3IgYWxsIHJlc3BvbnNlcy5cbiAgICpcbiAgICogVGhlIHNpbmdsZSBwYXJhbWV0ZXIgYWNjZXB0ZWQgaXMgYW4gaW5pdGlhbGl6YXRpb24gaGFzaC4gQW55IHByb3BlcnRpZXNcbiAgICogb2YgdGhlIHJlc3BvbnNlIHBhc3NlZCB0aGVyZSB3aWxsIG92ZXJyaWRlIHRoZSBkZWZhdWx0IHZhbHVlcy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgaW5pdDoge1xuICAgICAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXG4gICAgICAgIHN0YXR1cz86IG51bWJlcixcbiAgICAgICAgc3RhdHVzVGV4dD86IHN0cmluZyxcbiAgICAgICAgdXJsPzogc3RyaW5nLFxuICAgICAgfSxcbiAgICAgIGRlZmF1bHRTdGF0dXM6IG51bWJlciA9IDIwMCwgZGVmYXVsdFN0YXR1c1RleHQ6IHN0cmluZyA9ICdPSycpIHtcbiAgICAvLyBJZiB0aGUgaGFzaCBoYXMgdmFsdWVzIHBhc3NlZCwgdXNlIHRoZW0gdG8gaW5pdGlhbGl6ZSB0aGUgcmVzcG9uc2UuXG4gICAgLy8gT3RoZXJ3aXNlIHVzZSB0aGUgZGVmYXVsdCB2YWx1ZXMuXG4gICAgdGhpcy5oZWFkZXJzID0gaW5pdC5oZWFkZXJzIHx8IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIHRoaXMuc3RhdHVzID0gaW5pdC5zdGF0dXMgIT09IHVuZGVmaW5lZCA/IGluaXQuc3RhdHVzIDogZGVmYXVsdFN0YXR1cztcbiAgICB0aGlzLnN0YXR1c1RleHQgPSBpbml0LnN0YXR1c1RleHQgfHwgZGVmYXVsdFN0YXR1c1RleHQ7XG4gICAgdGhpcy51cmwgPSBpbml0LnVybCB8fCBudWxsO1xuXG4gICAgLy8gQ2FjaGUgdGhlIG9rIHZhbHVlIHRvIGF2b2lkIGRlZmluaW5nIGEgZ2V0dGVyLlxuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDA7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHBhcnRpYWwgSFRUUCByZXNwb25zZSB3aGljaCBvbmx5IGluY2x1ZGVzIHRoZSBzdGF0dXMgYW5kIGhlYWRlciBkYXRhLFxuICogYnV0IG5vIHJlc3BvbnNlIGJvZHkuXG4gKlxuICogYEh0dHBIZWFkZXJSZXNwb25zZWAgaXMgYSBgSHR0cEV2ZW50YCBhdmFpbGFibGUgb24gdGhlIHJlc3BvbnNlXG4gKiBldmVudCBzdHJlYW0sIG9ubHkgd2hlbiBwcm9ncmVzcyBldmVudHMgYXJlIHJlcXVlc3RlZC5cbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgSHR0cEhlYWRlclJlc3BvbnNlIGV4dGVuZHMgSHR0cFJlc3BvbnNlQmFzZSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYEh0dHBIZWFkZXJSZXNwb25zZWAgd2l0aCB0aGUgZ2l2ZW4gcGFyYW1ldGVycy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGluaXQ6IHtcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnMsXG4gICAgc3RhdHVzPzogbnVtYmVyLFxuICAgIHN0YXR1c1RleHQ/OiBzdHJpbmcsXG4gICAgdXJsPzogc3RyaW5nLFxuICB9ID0ge30pIHtcbiAgICBzdXBlcihpbml0KTtcbiAgfVxuXG4gIHJlYWRvbmx5IHR5cGU6IEh0dHBFdmVudFR5cGUuUmVzcG9uc2VIZWFkZXIgPSBIdHRwRXZlbnRUeXBlLlJlc3BvbnNlSGVhZGVyO1xuXG4gIC8qKlxuICAgKiBDb3B5IHRoaXMgYEh0dHBIZWFkZXJSZXNwb25zZWAsIG92ZXJyaWRpbmcgaXRzIGNvbnRlbnRzIHdpdGggdGhlXG4gICAqIGdpdmVuIHBhcmFtZXRlciBoYXNoLlxuICAgKi9cbiAgY2xvbmUodXBkYXRlOiB7aGVhZGVycz86IEh0dHBIZWFkZXJzOyBzdGF0dXM/OiBudW1iZXI7IHN0YXR1c1RleHQ/OiBzdHJpbmc7IHVybD86IHN0cmluZzt9ID0ge30pOlxuICAgICAgSHR0cEhlYWRlclJlc3BvbnNlIHtcbiAgICAvLyBQZXJmb3JtIGEgc3RyYWlnaHRmb3J3YXJkIGluaXRpYWxpemF0aW9uIG9mIHRoZSBuZXcgSHR0cEhlYWRlclJlc3BvbnNlLFxuICAgIC8vIG92ZXJyaWRpbmcgdGhlIGN1cnJlbnQgcGFyYW1ldGVycyB3aXRoIG5ldyBvbmVzIGlmIGdpdmVuLlxuICAgIHJldHVybiBuZXcgSHR0cEhlYWRlclJlc3BvbnNlKHtcbiAgICAgIGhlYWRlcnM6IHVwZGF0ZS5oZWFkZXJzIHx8IHRoaXMuaGVhZGVycyxcbiAgICAgIHN0YXR1czogdXBkYXRlLnN0YXR1cyAhPT0gdW5kZWZpbmVkID8gdXBkYXRlLnN0YXR1cyA6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdXBkYXRlLnN0YXR1c1RleHQgfHwgdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgdXJsOiB1cGRhdGUudXJsIHx8IHRoaXMudXJsIHx8IHVuZGVmaW5lZCxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEEgZnVsbCBIVFRQIHJlc3BvbnNlLCBpbmNsdWRpbmcgYSB0eXBlZCByZXNwb25zZSBib2R5ICh3aGljaCBtYXkgYmUgYG51bGxgXG4gKiBpZiBvbmUgd2FzIG5vdCByZXR1cm5lZCkuXG4gKlxuICogYEh0dHBSZXNwb25zZWAgaXMgYSBgSHR0cEV2ZW50YCBhdmFpbGFibGUgb24gdGhlIHJlc3BvbnNlIGV2ZW50XG4gKiBzdHJlYW0uXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEh0dHBSZXNwb25zZTxUPiBleHRlbmRzIEh0dHBSZXNwb25zZUJhc2Uge1xuICAvKipcbiAgICogVGhlIHJlc3BvbnNlIGJvZHksIG9yIGBudWxsYCBpZiBvbmUgd2FzIG5vdCByZXR1cm5lZC5cbiAgICovXG4gIHJlYWRvbmx5IGJvZHk6IFR8bnVsbDtcblxuICAvKipcbiAgICogQ29uc3RydWN0IGEgbmV3IGBIdHRwUmVzcG9uc2VgLlxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5pdDoge1xuICAgIGJvZHk/OiBUIHwgbnVsbCwgaGVhZGVycz86IEh0dHBIZWFkZXJzOyBzdGF0dXM/OiBudW1iZXI7IHN0YXR1c1RleHQ/OiBzdHJpbmc7IHVybD86IHN0cmluZztcbiAgfSA9IHt9KSB7XG4gICAgc3VwZXIoaW5pdCk7XG4gICAgdGhpcy5ib2R5ID0gaW5pdC5ib2R5ICE9PSB1bmRlZmluZWQgPyBpbml0LmJvZHkgOiBudWxsO1xuICB9XG5cbiAgcmVhZG9ubHkgdHlwZTogSHR0cEV2ZW50VHlwZS5SZXNwb25zZSA9IEh0dHBFdmVudFR5cGUuUmVzcG9uc2U7XG5cbiAgY2xvbmUoKTogSHR0cFJlc3BvbnNlPFQ+O1xuICBjbG9uZSh1cGRhdGU6IHtoZWFkZXJzPzogSHR0cEhlYWRlcnM7IHN0YXR1cz86IG51bWJlcjsgc3RhdHVzVGV4dD86IHN0cmluZzsgdXJsPzogc3RyaW5nO30pOlxuICAgICAgSHR0cFJlc3BvbnNlPFQ+O1xuICBjbG9uZTxWPih1cGRhdGU6IHtcbiAgICBib2R5PzogViB8IG51bGwsIGhlYWRlcnM/OiBIdHRwSGVhZGVyczsgc3RhdHVzPzogbnVtYmVyOyBzdGF0dXNUZXh0Pzogc3RyaW5nOyB1cmw/OiBzdHJpbmc7XG4gIH0pOiBIdHRwUmVzcG9uc2U8Vj47XG4gIGNsb25lKHVwZGF0ZToge1xuICAgIGJvZHk/OiBhbnkgfCBudWxsOyBoZWFkZXJzPzogSHR0cEhlYWRlcnM7IHN0YXR1cz86IG51bWJlcjsgc3RhdHVzVGV4dD86IHN0cmluZzsgdXJsPzogc3RyaW5nO1xuICB9ID0ge30pOiBIdHRwUmVzcG9uc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBIdHRwUmVzcG9uc2U8YW55Pih7XG4gICAgICBib2R5OiAodXBkYXRlLmJvZHkgIT09IHVuZGVmaW5lZCkgPyB1cGRhdGUuYm9keSA6IHRoaXMuYm9keSxcbiAgICAgIGhlYWRlcnM6IHVwZGF0ZS5oZWFkZXJzIHx8IHRoaXMuaGVhZGVycyxcbiAgICAgIHN0YXR1czogKHVwZGF0ZS5zdGF0dXMgIT09IHVuZGVmaW5lZCkgPyB1cGRhdGUuc3RhdHVzIDogdGhpcy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiB1cGRhdGUuc3RhdHVzVGV4dCB8fCB0aGlzLnN0YXR1c1RleHQsXG4gICAgICB1cmw6IHVwZGF0ZS51cmwgfHwgdGhpcy51cmwgfHwgdW5kZWZpbmVkLFxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQSByZXNwb25zZSB0aGF0IHJlcHJlc2VudHMgYW4gZXJyb3Igb3IgZmFpbHVyZSwgZWl0aGVyIGZyb20gYVxuICogbm9uLXN1Y2Nlc3NmdWwgSFRUUCBzdGF0dXMsIGFuIGVycm9yIHdoaWxlIGV4ZWN1dGluZyB0aGUgcmVxdWVzdCxcbiAqIG9yIHNvbWUgb3RoZXIgZmFpbHVyZSB3aGljaCBvY2N1cnJlZCBkdXJpbmcgdGhlIHBhcnNpbmcgb2YgdGhlIHJlc3BvbnNlLlxuICpcbiAqIEFueSBlcnJvciByZXR1cm5lZCBvbiB0aGUgYE9ic2VydmFibGVgIHJlc3BvbnNlIHN0cmVhbSB3aWxsIGJlXG4gKiB3cmFwcGVkIGluIGFuIGBIdHRwRXJyb3JSZXNwb25zZWAgdG8gcHJvdmlkZSBhZGRpdGlvbmFsIGNvbnRleHQgYWJvdXRcbiAqIHRoZSBzdGF0ZSBvZiB0aGUgSFRUUCBsYXllciB3aGVuIHRoZSBlcnJvciBvY2N1cnJlZC4gVGhlIGVycm9yIHByb3BlcnR5XG4gKiB3aWxsIGNvbnRhaW4gZWl0aGVyIGEgd3JhcHBlZCBFcnJvciBvYmplY3Qgb3IgdGhlIGVycm9yIHJlc3BvbnNlIHJldHVybmVkXG4gKiBmcm9tIHRoZSBzZXJ2ZXIuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEh0dHBFcnJvclJlc3BvbnNlIGV4dGVuZHMgSHR0cFJlc3BvbnNlQmFzZSBpbXBsZW1lbnRzIEVycm9yIHtcbiAgcmVhZG9ubHkgbmFtZSA9ICdIdHRwRXJyb3JSZXNwb25zZSc7XG4gIHJlYWRvbmx5IG1lc3NhZ2U6IHN0cmluZztcbiAgcmVhZG9ubHkgZXJyb3I6IGFueXxudWxsO1xuXG4gIC8qKlxuICAgKiBFcnJvcnMgYXJlIG5ldmVyIG9rYXksIGV2ZW4gd2hlbiB0aGUgc3RhdHVzIGNvZGUgaXMgaW4gdGhlIDJ4eCBzdWNjZXNzIHJhbmdlLlxuICAgKi9cbiAgcmVhZG9ubHkgb2sgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihpbml0OiB7XG4gICAgZXJyb3I/OiBhbnk7IGhlYWRlcnM/OiBIdHRwSGVhZGVyczsgc3RhdHVzPzogbnVtYmVyOyBzdGF0dXNUZXh0Pzogc3RyaW5nOyB1cmw/OiBzdHJpbmc7XG4gIH0pIHtcbiAgICAvLyBJbml0aWFsaXplIHdpdGggYSBkZWZhdWx0IHN0YXR1cyBvZiAwIC8gVW5rbm93biBFcnJvci5cbiAgICBzdXBlcihpbml0LCAwLCAnVW5rbm93biBFcnJvcicpO1xuXG4gICAgLy8gSWYgdGhlIHJlc3BvbnNlIHdhcyBzdWNjZXNzZnVsLCB0aGVuIHRoaXMgd2FzIGEgcGFyc2UgZXJyb3IuIE90aGVyd2lzZSwgaXQgd2FzXG4gICAgLy8gYSBwcm90b2NvbC1sZXZlbCBmYWlsdXJlIG9mIHNvbWUgc29ydC4gRWl0aGVyIHRoZSByZXF1ZXN0IGZhaWxlZCBpbiB0cmFuc2l0XG4gICAgLy8gb3IgdGhlIHNlcnZlciByZXR1cm5lZCBhbiB1bnN1Y2Nlc3NmdWwgc3RhdHVzIGNvZGUuXG4gICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgdGhpcy5tZXNzYWdlID0gYEh0dHAgZmFpbHVyZSBkdXJpbmcgcGFyc2luZyBmb3IgJHtpbml0LnVybCB8fCAnKHVua25vd24gdXJsKSd9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZXNzYWdlID1cbiAgICAgICAgICBgSHR0cCBmYWlsdXJlIHJlc3BvbnNlIGZvciAke2luaXQudXJsIHx8ICcodW5rbm93biB1cmwpJ306ICR7aW5pdC5zdGF0dXN9ICR7aW5pdC5zdGF0dXNUZXh0fWA7XG4gICAgfVxuICAgIHRoaXMuZXJyb3IgPSBpbml0LmVycm9yIHx8IG51bGw7XG4gIH1cbn1cbiJdfQ==