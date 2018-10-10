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
import { RequestMethod } from './enums';
/**
 * @param {?} method
 * @return {?}
 */
export function normalizeMethodName(method) {
    if (typeof method !== 'string')
        return method;
    switch (method.toUpperCase()) {
        case 'GET':
            return RequestMethod.Get;
        case 'POST':
            return RequestMethod.Post;
        case 'PUT':
            return RequestMethod.Put;
        case 'DELETE':
            return RequestMethod.Delete;
        case 'OPTIONS':
            return RequestMethod.Options;
        case 'HEAD':
            return RequestMethod.Head;
        case 'PATCH':
            return RequestMethod.Patch;
    }
    throw new Error(`Invalid request method. The method "${method}" is not supported.`);
}
/** @type {?} */
export const isSuccess = (status) => (status >= 200 && status < 300);
/**
 * @param {?} xhr
 * @return {?}
 */
export function getResponseURL(xhr) {
    if ('responseURL' in xhr) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return null;
}
/**
 * @param {?} input
 * @return {?}
 */
export function stringToArrayBuffer8(input) {
    /** @type {?} */
    const view = new Uint8Array(input.length);
    for (let i = 0, strLen = input.length; i < strLen; i++) {
        view[i] = input.charCodeAt(i);
    }
    return view.buffer;
}
/**
 * @param {?} input
 * @return {?}
 */
export function stringToArrayBuffer(input) {
    /** @type {?} */
    const view = new Uint16Array(input.length);
    for (let i = 0, strLen = input.length; i < strLen; i++) {
        view[i] = input.charCodeAt(i);
    }
    return view.buffer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF91dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2h0dHBfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sU0FBUyxDQUFDOzs7OztBQUV0QyxNQUFNLDhCQUE4QixNQUE4QjtJQUNoRSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUU5QyxRQUFRLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUM1QixLQUFLLEtBQUs7WUFDUixPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDM0IsS0FBSyxNQUFNO1lBQ1QsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQzVCLEtBQUssS0FBSztZQUNSLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQztRQUMzQixLQUFLLFFBQVE7WUFDWCxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDOUIsS0FBSyxTQUFTO1lBQ1osT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQy9CLEtBQUssTUFBTTtZQUNULE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQztRQUM1QixLQUFLLE9BQU87WUFDVixPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUM7S0FDOUI7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxNQUFNLHFCQUFxQixDQUFDLENBQUM7Q0FDckY7O0FBRUQsYUFBYSxTQUFTLEdBQUcsQ0FBQyxNQUFjLEVBQVcsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7Ozs7O0FBRXRGLE1BQU0seUJBQXlCLEdBQVE7SUFDckMsSUFBSSxhQUFhLElBQUksR0FBRyxFQUFFO1FBQ3hCLE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQztLQUN4QjtJQUNELElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEVBQUU7UUFDeEQsT0FBTyxHQUFHLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDL0M7SUFDRCxPQUFPLElBQUksQ0FBQztDQUNiOzs7OztBQUVELE1BQU0sK0JBQStCLEtBQWE7O0lBQ2hELE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQ3BCOzs7OztBQUdELE1BQU0sOEJBQThCLEtBQWE7O0lBQy9DLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1JlcXVlc3RNZXRob2R9IGZyb20gJy4vZW51bXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kTmFtZShtZXRob2Q6IHN0cmluZyB8IFJlcXVlc3RNZXRob2QpOiBSZXF1ZXN0TWV0aG9kIHtcbiAgaWYgKHR5cGVvZiBtZXRob2QgIT09ICdzdHJpbmcnKSByZXR1cm4gbWV0aG9kO1xuXG4gIHN3aXRjaCAobWV0aG9kLnRvVXBwZXJDYXNlKCkpIHtcbiAgICBjYXNlICdHRVQnOlxuICAgICAgcmV0dXJuIFJlcXVlc3RNZXRob2QuR2V0O1xuICAgIGNhc2UgJ1BPU1QnOlxuICAgICAgcmV0dXJuIFJlcXVlc3RNZXRob2QuUG9zdDtcbiAgICBjYXNlICdQVVQnOlxuICAgICAgcmV0dXJuIFJlcXVlc3RNZXRob2QuUHV0O1xuICAgIGNhc2UgJ0RFTEVURSc6XG4gICAgICByZXR1cm4gUmVxdWVzdE1ldGhvZC5EZWxldGU7XG4gICAgY2FzZSAnT1BUSU9OUyc6XG4gICAgICByZXR1cm4gUmVxdWVzdE1ldGhvZC5PcHRpb25zO1xuICAgIGNhc2UgJ0hFQUQnOlxuICAgICAgcmV0dXJuIFJlcXVlc3RNZXRob2QuSGVhZDtcbiAgICBjYXNlICdQQVRDSCc6XG4gICAgICByZXR1cm4gUmVxdWVzdE1ldGhvZC5QYXRjaDtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmVxdWVzdCBtZXRob2QuIFRoZSBtZXRob2QgXCIke21ldGhvZH1cIiBpcyBub3Qgc3VwcG9ydGVkLmApO1xufVxuXG5leHBvcnQgY29uc3QgaXNTdWNjZXNzID0gKHN0YXR1czogbnVtYmVyKTogYm9vbGVhbiA9PiAoc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDApO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVzcG9uc2VVUkwoeGhyOiBhbnkpOiBzdHJpbmd8bnVsbCB7XG4gIGlmICgncmVzcG9uc2VVUkwnIGluIHhocikge1xuICAgIHJldHVybiB4aHIucmVzcG9uc2VVUkw7XG4gIH1cbiAgaWYgKC9eWC1SZXF1ZXN0LVVSTDovbS50ZXN0KHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkpIHtcbiAgICByZXR1cm4geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdYLVJlcXVlc3QtVVJMJyk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb0FycmF5QnVmZmVyOChpbnB1dDogU3RyaW5nKTogQXJyYXlCdWZmZXIge1xuICBjb25zdCB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoaW5wdXQubGVuZ3RoKTtcbiAgZm9yIChsZXQgaSA9IDAsIHN0ckxlbiA9IGlucHV0Lmxlbmd0aDsgaSA8IHN0ckxlbjsgaSsrKSB7XG4gICAgdmlld1tpXSA9IGlucHV0LmNoYXJDb2RlQXQoaSk7XG4gIH1cbiAgcmV0dXJuIHZpZXcuYnVmZmVyO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb0FycmF5QnVmZmVyKGlucHV0OiBTdHJpbmcpOiBBcnJheUJ1ZmZlciB7XG4gIGNvbnN0IHZpZXcgPSBuZXcgVWludDE2QXJyYXkoaW5wdXQubGVuZ3RoKTtcbiAgZm9yIChsZXQgaSA9IDAsIHN0ckxlbiA9IGlucHV0Lmxlbmd0aDsgaSA8IHN0ckxlbjsgaSsrKSB7XG4gICAgdmlld1tpXSA9IGlucHV0LmNoYXJDb2RlQXQoaSk7XG4gIH1cbiAgcmV0dXJuIHZpZXcuYnVmZmVyO1xufVxuIl19