"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Internal benchmark reporting flag.
// Use with CLI --no-progress flag for best results.
// This should be false for commited code.
const _benchmark = false;
function time(label) {
    if (_benchmark) {
        console.time(label);
    }
}
exports.time = time;
function timeEnd(label) {
    if (_benchmark) {
        console.timeEnd(label);
    }
}
exports.timeEnd = timeEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVuY2htYXJrLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9uZ3Rvb2xzL3dlYnBhY2svc3JjL2JlbmNobWFyay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILHFDQUFxQztBQUNyQyxvREFBb0Q7QUFDcEQsMENBQTBDO0FBQzFDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQztBQUV6QixjQUFxQixLQUFhO0lBQ2hDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RCLENBQUM7QUFDSCxDQUFDO0FBSkQsb0JBSUM7QUFFRCxpQkFBd0IsS0FBYTtJQUNuQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0FBQ0gsQ0FBQztBQUpELDBCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuLy8gSW50ZXJuYWwgYmVuY2htYXJrIHJlcG9ydGluZyBmbGFnLlxuLy8gVXNlIHdpdGggQ0xJIC0tbm8tcHJvZ3Jlc3MgZmxhZyBmb3IgYmVzdCByZXN1bHRzLlxuLy8gVGhpcyBzaG91bGQgYmUgZmFsc2UgZm9yIGNvbW1pdGVkIGNvZGUuXG5jb25zdCBfYmVuY2htYXJrID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lKGxhYmVsOiBzdHJpbmcpIHtcbiAgaWYgKF9iZW5jaG1hcmspIHtcbiAgICBjb25zb2xlLnRpbWUobGFiZWwpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lRW5kKGxhYmVsOiBzdHJpbmcpIHtcbiAgaWYgKF9iZW5jaG1hcmspIHtcbiAgICBjb25zb2xlLnRpbWVFbmQobGFiZWwpO1xuICB9XG59XG4iXX0=