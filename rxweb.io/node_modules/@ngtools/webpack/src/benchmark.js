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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVuY2htYXJrLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9uZ3Rvb2xzL3dlYnBhY2svc3JjL2JlbmNobWFyay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILHFDQUFxQztBQUNyQyxvREFBb0Q7QUFDcEQsMENBQTBDO0FBQzFDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQztBQUV6QixjQUFxQixLQUFhO0lBQ2hDLElBQUksVUFBVSxFQUFFO1FBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNyQjtBQUNILENBQUM7QUFKRCxvQkFJQztBQUVELGlCQUF3QixLQUFhO0lBQ25DLElBQUksVUFBVSxFQUFFO1FBQ2QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4QjtBQUNILENBQUM7QUFKRCwwQkFJQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8vIEludGVybmFsIGJlbmNobWFyayByZXBvcnRpbmcgZmxhZy5cbi8vIFVzZSB3aXRoIENMSSAtLW5vLXByb2dyZXNzIGZsYWcgZm9yIGJlc3QgcmVzdWx0cy5cbi8vIFRoaXMgc2hvdWxkIGJlIGZhbHNlIGZvciBjb21taXRlZCBjb2RlLlxuY29uc3QgX2JlbmNobWFyayA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZShsYWJlbDogc3RyaW5nKSB7XG4gIGlmIChfYmVuY2htYXJrKSB7XG4gICAgY29uc29sZS50aW1lKGxhYmVsKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGltZUVuZChsYWJlbDogc3RyaW5nKSB7XG4gIGlmIChfYmVuY2htYXJrKSB7XG4gICAgY29uc29sZS50aW1lRW5kKGxhYmVsKTtcbiAgfVxufVxuIl19