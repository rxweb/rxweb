/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
export function getTypeOf(instance /** TODO #9100 */) {
    return instance.constructor;
}
export function instantiateType(type, params) {
    if (params === void 0) { params = []; }
    var _a;
    return new ((_a = type).bind.apply(_a, tslib_1.__spread([void 0], params)))();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ191dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvbGFuZ191dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsTUFBTSxvQkFBb0IsUUFBYSxDQUFDLGlCQUFpQjtJQUN2RCxPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFDOUIsQ0FBQztBQUVELE1BQU0sMEJBQTBCLElBQWMsRUFBRSxNQUFrQjtJQUFsQix1QkFBQSxFQUFBLFdBQWtCOztJQUNoRSxZQUFXLENBQUEsS0FBTSxJQUFLLENBQUEsMkNBQUksTUFBTSxNQUFFO0FBQ3BDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlT2YoaW5zdGFuY2U6IGFueSAvKiogVE9ETyAjOTEwMCAqLykge1xuICByZXR1cm4gaW5zdGFuY2UuY29uc3RydWN0b3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW50aWF0ZVR5cGUodHlwZTogRnVuY3Rpb24sIHBhcmFtczogYW55W10gPSBbXSkge1xuICByZXR1cm4gbmV3ICg8YW55PnR5cGUpKC4uLnBhcmFtcyk7XG59XG4iXX0=