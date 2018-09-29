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
        define("@angular/compiler/testing/src/output/source_map_util", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b64 = require('base64-js');
    var SourceMapConsumer = require('source-map').SourceMapConsumer;
    function originalPositionFor(sourceMap, genPosition) {
        var smc = new SourceMapConsumer(sourceMap);
        // Note: We don't return the original object as it also contains a `name` property
        // which is always null and we don't want to include that in our assertions...
        var _a = smc.originalPositionFor(genPosition), line = _a.line, column = _a.column, source = _a.source;
        return { line: line, column: column, source: source };
    }
    exports.originalPositionFor = originalPositionFor;
    function extractSourceMap(source) {
        var idx = source.lastIndexOf('\n//#');
        if (idx == -1)
            return null;
        var smComment = source.slice(idx).trim();
        var smB64 = smComment.split('sourceMappingURL=data:application/json;base64,')[1];
        return smB64 ? JSON.parse(decodeB64String(smB64)) : null;
    }
    exports.extractSourceMap = extractSourceMap;
    function decodeB64String(s) {
        return b64.toByteArray(s).reduce(function (s, c) { return s + String.fromCharCode(c); }, '');
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlX21hcF91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvdGVzdGluZy9zcmMvb3V0cHV0L3NvdXJjZV9tYXBfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUdILElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqQyxJQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztJQVFsRSw2QkFDSSxTQUFvQixFQUNwQixXQUF5RDtRQUMzRCxJQUFNLEdBQUcsR0FBRyxJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLGtGQUFrRjtRQUNsRiw4RUFBOEU7UUFDeEUsSUFBQSx5Q0FBNkQsRUFBNUQsY0FBSSxFQUFFLGtCQUFNLEVBQUUsa0JBQU0sQ0FBeUM7UUFDcEUsT0FBTyxFQUFDLElBQUksTUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFDLENBQUM7SUFDaEMsQ0FBQztJQVJELGtEQVFDO0lBRUQsMEJBQWlDLE1BQWM7UUFDN0MsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUMzQixJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNDLElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzNELENBQUM7SUFORCw0Q0FNQztJQUVELHlCQUF5QixDQUFTO1FBQ2hDLE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFTLEVBQUUsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQTFCLENBQTBCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTb3VyY2VNYXB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcbmNvbnN0IGI2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpO1xuY29uc3QgU291cmNlTWFwQ29uc3VtZXIgPSByZXF1aXJlKCdzb3VyY2UtbWFwJykuU291cmNlTWFwQ29uc3VtZXI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlTG9jYXRpb24ge1xuICBsaW5lOiBudW1iZXI7XG4gIGNvbHVtbjogbnVtYmVyO1xuICBzb3VyY2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yaWdpbmFsUG9zaXRpb25Gb3IoXG4gICAgc291cmNlTWFwOiBTb3VyY2VNYXAsXG4gICAgZ2VuUG9zaXRpb246IHtsaW5lOiBudW1iZXIgfCBudWxsLCBjb2x1bW46IG51bWJlciB8IG51bGx9KTogU291cmNlTG9jYXRpb24ge1xuICBjb25zdCBzbWMgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIoc291cmNlTWFwKTtcbiAgLy8gTm90ZTogV2UgZG9uJ3QgcmV0dXJuIHRoZSBvcmlnaW5hbCBvYmplY3QgYXMgaXQgYWxzbyBjb250YWlucyBhIGBuYW1lYCBwcm9wZXJ0eVxuICAvLyB3aGljaCBpcyBhbHdheXMgbnVsbCBhbmQgd2UgZG9uJ3Qgd2FudCB0byBpbmNsdWRlIHRoYXQgaW4gb3VyIGFzc2VydGlvbnMuLi5cbiAgY29uc3Qge2xpbmUsIGNvbHVtbiwgc291cmNlfSA9IHNtYy5vcmlnaW5hbFBvc2l0aW9uRm9yKGdlblBvc2l0aW9uKTtcbiAgcmV0dXJuIHtsaW5lLCBjb2x1bW4sIHNvdXJjZX07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0U291cmNlTWFwKHNvdXJjZTogc3RyaW5nKTogU291cmNlTWFwfG51bGwge1xuICBsZXQgaWR4ID0gc291cmNlLmxhc3RJbmRleE9mKCdcXG4vLyMnKTtcbiAgaWYgKGlkeCA9PSAtMSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHNtQ29tbWVudCA9IHNvdXJjZS5zbGljZShpZHgpLnRyaW0oKTtcbiAgY29uc3Qgc21CNjQgPSBzbUNvbW1lbnQuc3BsaXQoJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnKVsxXTtcbiAgcmV0dXJuIHNtQjY0ID8gSlNPTi5wYXJzZShkZWNvZGVCNjRTdHJpbmcoc21CNjQpKSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGRlY29kZUI2NFN0cmluZyhzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYjY0LnRvQnl0ZUFycmF5KHMpLnJlZHVjZSgoczogc3RyaW5nLCBjOiBudW1iZXIpID0+IHMgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpLCAnJyk7XG59XG4iXX0=