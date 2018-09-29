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
        define("@angular/compiler/src/aot/formatted_error", ["require", "exports", "@angular/compiler/src/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require("@angular/compiler/src/util");
    var FORMATTED_MESSAGE = 'ngFormattedMessage';
    function indentStr(level) {
        if (level <= 0)
            return '';
        if (level < 6)
            return ['', ' ', '  ', '   ', '    ', '     '][level];
        var half = indentStr(Math.floor(level / 2));
        return half + half + (level % 2 === 1 ? ' ' : '');
    }
    function formatChain(chain, indent) {
        if (indent === void 0) { indent = 0; }
        if (!chain)
            return '';
        var position = chain.position ?
            chain.position.fileName + "(" + (chain.position.line + 1) + "," + (chain.position.column + 1) + ")" :
            '';
        var prefix = position && indent === 0 ? position + ": " : '';
        var postfix = position && indent !== 0 ? " at " + position : '';
        var message = "" + prefix + chain.message + postfix;
        return "" + indentStr(indent) + message + ((chain.next && ('\n' + formatChain(chain.next, indent + 2))) || '');
    }
    function formattedError(chain) {
        var message = formatChain(chain) + '.';
        var error = util_1.syntaxError(message);
        error[FORMATTED_MESSAGE] = true;
        error.chain = chain;
        error.position = chain.position;
        return error;
    }
    exports.formattedError = formattedError;
    function isFormattedError(error) {
        return !!error[FORMATTED_MESSAGE];
    }
    exports.isFormattedError = isFormattedError;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVkX2Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL2FvdC9mb3JtYXR0ZWRfZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCxtREFBb0M7SUFtQnBDLElBQU0saUJBQWlCLEdBQUcsb0JBQW9CLENBQUM7SUFFL0MsbUJBQW1CLEtBQWE7UUFDOUIsSUFBSSxLQUFLLElBQUksQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzFCLElBQUksS0FBSyxHQUFHLENBQUM7WUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QyxPQUFPLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQscUJBQXFCLEtBQXdDLEVBQUUsTUFBa0I7UUFBbEIsdUJBQUEsRUFBQSxVQUFrQjtRQUMvRSxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQixLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsVUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksR0FBQyxDQUFDLFdBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxPQUFHLENBQUMsQ0FBQztZQUNuRixFQUFFLENBQUM7UUFDUCxJQUFNLE1BQU0sR0FBRyxRQUFRLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUksUUFBUSxPQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRCxJQUFNLE9BQU8sR0FBRyxRQUFRLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBTyxRQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNsRSxJQUFNLE9BQU8sR0FBRyxLQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQVMsQ0FBQztRQUV0RCxPQUFPLEtBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sSUFBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQztJQUMvRyxDQUFDO0lBRUQsd0JBQStCLEtBQTRCO1FBQ3pELElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDekMsSUFBTSxLQUFLLEdBQUcsa0JBQVcsQ0FBQyxPQUFPLENBQW1CLENBQUM7UUFDcEQsS0FBYSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3pDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNoQyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFQRCx3Q0FPQztJQUVELDBCQUFpQyxLQUFZO1FBQzNDLE9BQU8sQ0FBQyxDQUFFLEtBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFGRCw0Q0FFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtzeW50YXhFcnJvcn0gZnJvbSAnLi4vdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9zaXRpb24ge1xuICBmaWxlTmFtZTogc3RyaW5nO1xuICBsaW5lOiBudW1iZXI7XG4gIGNvbHVtbjogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1hdHRlZE1lc3NhZ2VDaGFpbiB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgcG9zaXRpb24/OiBQb3NpdGlvbjtcbiAgbmV4dD86IEZvcm1hdHRlZE1lc3NhZ2VDaGFpbjtcbn1cblxuZXhwb3J0IHR5cGUgRm9ybWF0dGVkRXJyb3IgPSBFcnJvciAmIHtcbiAgY2hhaW46IEZvcm1hdHRlZE1lc3NhZ2VDaGFpbjtcbiAgcG9zaXRpb24/OiBQb3NpdGlvbjtcbn07XG5cbmNvbnN0IEZPUk1BVFRFRF9NRVNTQUdFID0gJ25nRm9ybWF0dGVkTWVzc2FnZSc7XG5cbmZ1bmN0aW9uIGluZGVudFN0cihsZXZlbDogbnVtYmVyKTogc3RyaW5nIHtcbiAgaWYgKGxldmVsIDw9IDApIHJldHVybiAnJztcbiAgaWYgKGxldmVsIDwgNikgcmV0dXJuIFsnJywgJyAnLCAnICAnLCAnICAgJywgJyAgICAnLCAnICAgICAnXVtsZXZlbF07XG4gIGNvbnN0IGhhbGYgPSBpbmRlbnRTdHIoTWF0aC5mbG9vcihsZXZlbCAvIDIpKTtcbiAgcmV0dXJuIGhhbGYgKyBoYWxmICsgKGxldmVsICUgMiA9PT0gMSA/ICcgJyA6ICcnKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0Q2hhaW4oY2hhaW46IEZvcm1hdHRlZE1lc3NhZ2VDaGFpbiB8IHVuZGVmaW5lZCwgaW5kZW50OiBudW1iZXIgPSAwKTogc3RyaW5nIHtcbiAgaWYgKCFjaGFpbikgcmV0dXJuICcnO1xuICBjb25zdCBwb3NpdGlvbiA9IGNoYWluLnBvc2l0aW9uID9cbiAgICAgIGAke2NoYWluLnBvc2l0aW9uLmZpbGVOYW1lfSgke2NoYWluLnBvc2l0aW9uLmxpbmUrMX0sJHtjaGFpbi5wb3NpdGlvbi5jb2x1bW4rMX0pYCA6XG4gICAgICAnJztcbiAgY29uc3QgcHJlZml4ID0gcG9zaXRpb24gJiYgaW5kZW50ID09PSAwID8gYCR7cG9zaXRpb259OiBgIDogJyc7XG4gIGNvbnN0IHBvc3RmaXggPSBwb3NpdGlvbiAmJiBpbmRlbnQgIT09IDAgPyBgIGF0ICR7cG9zaXRpb259YCA6ICcnO1xuICBjb25zdCBtZXNzYWdlID0gYCR7cHJlZml4fSR7Y2hhaW4ubWVzc2FnZX0ke3Bvc3RmaXh9YDtcblxuICByZXR1cm4gYCR7aW5kZW50U3RyKGluZGVudCl9JHttZXNzYWdlfSR7KGNoYWluLm5leHQgJiYgKCdcXG4nICsgZm9ybWF0Q2hhaW4oY2hhaW4ubmV4dCwgaW5kZW50ICsgMikpKSB8fCAnJ31gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0dGVkRXJyb3IoY2hhaW46IEZvcm1hdHRlZE1lc3NhZ2VDaGFpbik6IEZvcm1hdHRlZEVycm9yIHtcbiAgY29uc3QgbWVzc2FnZSA9IGZvcm1hdENoYWluKGNoYWluKSArICcuJztcbiAgY29uc3QgZXJyb3IgPSBzeW50YXhFcnJvcihtZXNzYWdlKSBhcyBGb3JtYXR0ZWRFcnJvcjtcbiAgKGVycm9yIGFzIGFueSlbRk9STUFUVEVEX01FU1NBR0VdID0gdHJ1ZTtcbiAgZXJyb3IuY2hhaW4gPSBjaGFpbjtcbiAgZXJyb3IucG9zaXRpb24gPSBjaGFpbi5wb3NpdGlvbjtcbiAgcmV0dXJuIGVycm9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGb3JtYXR0ZWRFcnJvcihlcnJvcjogRXJyb3IpOiBlcnJvciBpcyBGb3JtYXR0ZWRFcnJvciB7XG4gIHJldHVybiAhIShlcnJvciBhcyBhbnkpW0ZPUk1BVFRFRF9NRVNTQUdFXTtcbn1cbiJdfQ==