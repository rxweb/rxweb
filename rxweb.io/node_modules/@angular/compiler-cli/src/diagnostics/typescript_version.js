/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/diagnostics/typescript_version", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Converts a `string` version into an array of numbers
     * @example
     * toNumbers('2.0.1'); // returns [2, 0, 1]
     */
    function toNumbers(value) {
        return value.split('.').map(Number);
    }
    exports.toNumbers = toNumbers;
    /**
     * Compares two arrays of positive numbers with lexicographical order in mind.
     *
     * However - unlike lexicographical order - for arrays of different length we consider:
     * [1, 2, 3] = [1, 2, 3, 0] instead of [1, 2, 3] < [1, 2, 3, 0]
     *
     * @param a The 'left hand' array in the comparison test
     * @param b The 'right hand' in the comparison test
     * @returns {-1|0|1} The comparison result: 1 if a is greater, -1 if b is greater, 0 is the two
     * arrays are equals
     */
    function compareNumbers(a, b) {
        var max = Math.max(a.length, b.length);
        var min = Math.min(a.length, b.length);
        for (var i = 0; i < min; i++) {
            if (a[i] > b[i])
                return 1;
            if (a[i] < b[i])
                return -1;
        }
        if (min !== max) {
            var longestArray = a.length === max ? a : b;
            // The result to return in case the to arrays are considered different (1 if a is greater,
            // -1 if b is greater)
            var comparisonResult = a.length === max ? 1 : -1;
            // Check that at least one of the remaining elements is greater than 0 to consider that the two
            // arrays are different (e.g. [1, 0] and [1] are considered the same but not [1, 0, 1] and [1])
            for (var i = min; i < max; i++) {
                if (longestArray[i] > 0) {
                    return comparisonResult;
                }
            }
        }
        return 0;
    }
    exports.compareNumbers = compareNumbers;
    /**
     * Checks if a TypeScript version is:
     * - greater or equal than the provided `low` version,
     * - lower or equal than an optional `high` version.
     *
     * @param version The TypeScript version
     * @param low The minimum version
     * @param high The maximum version
     */
    function isVersionBetween(version, low, high) {
        var tsNumbers = toNumbers(version);
        if (high !== undefined) {
            return compareNumbers(toNumbers(low), tsNumbers) <= 0 &&
                compareNumbers(toNumbers(high), tsNumbers) >= 0;
        }
        return compareNumbers(toNumbers(low), tsNumbers) <= 0;
    }
    exports.isVersionBetween = isVersionBetween;
    /**
     * Compares two versions
     *
     * @param v1 The 'left hand' version in the comparison test
     * @param v2 The 'right hand' version in the comparison test
     * @returns {-1|0|1} The comparison result: 1 if v1 is greater, -1 if v2 is greater, 0 is the two
     * versions are equals
     */
    function compareVersions(v1, v2) {
        return compareNumbers(toNumbers(v1), toNumbers(v2));
    }
    exports.compareVersions = compareVersions;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdF92ZXJzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9kaWFnbm9zdGljcy90eXBlc2NyaXB0X3ZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSDs7OztPQUlHO0lBQ0gsbUJBQTBCLEtBQWE7UUFDckMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRkQsOEJBRUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsd0JBQStCLENBQVcsRUFBRSxDQUFXO1FBQ3JELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxHQUFHLEtBQUssR0FBRyxFQUFFO1lBQ2YsSUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTlDLDBGQUEwRjtZQUMxRixzQkFBc0I7WUFDdEIsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuRCwrRkFBK0Y7WUFDL0YsK0ZBQStGO1lBQy9GLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlCLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDdkIsT0FBTyxnQkFBZ0IsQ0FBQztpQkFDekI7YUFDRjtTQUNGO1FBRUQsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBMUJELHdDQTBCQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsMEJBQWlDLE9BQWUsRUFBRSxHQUFXLEVBQUUsSUFBYTtRQUMxRSxJQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLE9BQU8sY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUNqRCxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyRDtRQUNELE9BQU8sY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQVBELDRDQU9DO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILHlCQUFnQyxFQUFVLEVBQUUsRUFBVTtRQUNwRCxPQUFPLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUZELDBDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIENvbnZlcnRzIGEgYHN0cmluZ2AgdmVyc2lvbiBpbnRvIGFuIGFycmF5IG9mIG51bWJlcnNcbiAqIEBleGFtcGxlXG4gKiB0b051bWJlcnMoJzIuMC4xJyk7IC8vIHJldHVybnMgWzIsIDAsIDFdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b051bWJlcnModmFsdWU6IHN0cmluZyk6IG51bWJlcltdIHtcbiAgcmV0dXJuIHZhbHVlLnNwbGl0KCcuJykubWFwKE51bWJlcik7XG59XG5cbi8qKlxuICogQ29tcGFyZXMgdHdvIGFycmF5cyBvZiBwb3NpdGl2ZSBudW1iZXJzIHdpdGggbGV4aWNvZ3JhcGhpY2FsIG9yZGVyIGluIG1pbmQuXG4gKlxuICogSG93ZXZlciAtIHVubGlrZSBsZXhpY29ncmFwaGljYWwgb3JkZXIgLSBmb3IgYXJyYXlzIG9mIGRpZmZlcmVudCBsZW5ndGggd2UgY29uc2lkZXI6XG4gKiBbMSwgMiwgM10gPSBbMSwgMiwgMywgMF0gaW5zdGVhZCBvZiBbMSwgMiwgM10gPCBbMSwgMiwgMywgMF1cbiAqXG4gKiBAcGFyYW0gYSBUaGUgJ2xlZnQgaGFuZCcgYXJyYXkgaW4gdGhlIGNvbXBhcmlzb24gdGVzdFxuICogQHBhcmFtIGIgVGhlICdyaWdodCBoYW5kJyBpbiB0aGUgY29tcGFyaXNvbiB0ZXN0XG4gKiBAcmV0dXJucyB7LTF8MHwxfSBUaGUgY29tcGFyaXNvbiByZXN1bHQ6IDEgaWYgYSBpcyBncmVhdGVyLCAtMSBpZiBiIGlzIGdyZWF0ZXIsIDAgaXMgdGhlIHR3b1xuICogYXJyYXlzIGFyZSBlcXVhbHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVOdW1iZXJzKGE6IG51bWJlcltdLCBiOiBudW1iZXJbXSk6IC0xfDB8MSB7XG4gIGNvbnN0IG1heCA9IE1hdGgubWF4KGEubGVuZ3RoLCBiLmxlbmd0aCk7XG4gIGNvbnN0IG1pbiA9IE1hdGgubWluKGEubGVuZ3RoLCBiLmxlbmd0aCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaW47IGkrKykge1xuICAgIGlmIChhW2ldID4gYltpXSkgcmV0dXJuIDE7XG4gICAgaWYgKGFbaV0gPCBiW2ldKSByZXR1cm4gLTE7XG4gIH1cblxuICBpZiAobWluICE9PSBtYXgpIHtcbiAgICBjb25zdCBsb25nZXN0QXJyYXkgPSBhLmxlbmd0aCA9PT0gbWF4ID8gYSA6IGI7XG5cbiAgICAvLyBUaGUgcmVzdWx0IHRvIHJldHVybiBpbiBjYXNlIHRoZSB0byBhcnJheXMgYXJlIGNvbnNpZGVyZWQgZGlmZmVyZW50ICgxIGlmIGEgaXMgZ3JlYXRlcixcbiAgICAvLyAtMSBpZiBiIGlzIGdyZWF0ZXIpXG4gICAgY29uc3QgY29tcGFyaXNvblJlc3VsdCA9IGEubGVuZ3RoID09PSBtYXggPyAxIDogLTE7XG5cbiAgICAvLyBDaGVjayB0aGF0IGF0IGxlYXN0IG9uZSBvZiB0aGUgcmVtYWluaW5nIGVsZW1lbnRzIGlzIGdyZWF0ZXIgdGhhbiAwIHRvIGNvbnNpZGVyIHRoYXQgdGhlIHR3b1xuICAgIC8vIGFycmF5cyBhcmUgZGlmZmVyZW50IChlLmcuIFsxLCAwXSBhbmQgWzFdIGFyZSBjb25zaWRlcmVkIHRoZSBzYW1lIGJ1dCBub3QgWzEsIDAsIDFdIGFuZCBbMV0pXG4gICAgZm9yIChsZXQgaSA9IG1pbjsgaSA8IG1heDsgaSsrKSB7XG4gICAgICBpZiAobG9uZ2VzdEFycmF5W2ldID4gMCkge1xuICAgICAgICByZXR1cm4gY29tcGFyaXNvblJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBUeXBlU2NyaXB0IHZlcnNpb24gaXM6XG4gKiAtIGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiB0aGUgcHJvdmlkZWQgYGxvd2AgdmVyc2lvbixcbiAqIC0gbG93ZXIgb3IgZXF1YWwgdGhhbiBhbiBvcHRpb25hbCBgaGlnaGAgdmVyc2lvbi5cbiAqXG4gKiBAcGFyYW0gdmVyc2lvbiBUaGUgVHlwZVNjcmlwdCB2ZXJzaW9uXG4gKiBAcGFyYW0gbG93IFRoZSBtaW5pbXVtIHZlcnNpb25cbiAqIEBwYXJhbSBoaWdoIFRoZSBtYXhpbXVtIHZlcnNpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmVyc2lvbkJldHdlZW4odmVyc2lvbjogc3RyaW5nLCBsb3c6IHN0cmluZywgaGlnaD86IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCB0c051bWJlcnMgPSB0b051bWJlcnModmVyc2lvbik7XG4gIGlmIChoaWdoICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gY29tcGFyZU51bWJlcnModG9OdW1iZXJzKGxvdyksIHRzTnVtYmVycykgPD0gMCAmJlxuICAgICAgICBjb21wYXJlTnVtYmVycyh0b051bWJlcnMoaGlnaCksIHRzTnVtYmVycykgPj0gMDtcbiAgfVxuICByZXR1cm4gY29tcGFyZU51bWJlcnModG9OdW1iZXJzKGxvdyksIHRzTnVtYmVycykgPD0gMDtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyB0d28gdmVyc2lvbnNcbiAqXG4gKiBAcGFyYW0gdjEgVGhlICdsZWZ0IGhhbmQnIHZlcnNpb24gaW4gdGhlIGNvbXBhcmlzb24gdGVzdFxuICogQHBhcmFtIHYyIFRoZSAncmlnaHQgaGFuZCcgdmVyc2lvbiBpbiB0aGUgY29tcGFyaXNvbiB0ZXN0XG4gKiBAcmV0dXJucyB7LTF8MHwxfSBUaGUgY29tcGFyaXNvbiByZXN1bHQ6IDEgaWYgdjEgaXMgZ3JlYXRlciwgLTEgaWYgdjIgaXMgZ3JlYXRlciwgMCBpcyB0aGUgdHdvXG4gKiB2ZXJzaW9ucyBhcmUgZXF1YWxzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlVmVyc2lvbnModjE6IHN0cmluZywgdjI6IHN0cmluZyk6IC0xfDB8MSB7XG4gIHJldHVybiBjb21wYXJlTnVtYmVycyh0b051bWJlcnModjEpLCB0b051bWJlcnModjIpKTtcbn1cbiJdfQ==