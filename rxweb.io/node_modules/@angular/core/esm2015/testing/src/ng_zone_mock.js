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
import { EventEmitter, Injectable, NgZone } from '@angular/core';
/**
 * A mock implementation of {\@link NgZone}.
 */
export class MockNgZone extends NgZone {
    constructor() {
        super({ enableLongStackTrace: false });
        this.onStable = new EventEmitter(false);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    run(fn) { return fn(); }
    /**
     * @param {?} fn
     * @return {?}
     */
    runOutsideAngular(fn) { return fn(); }
    /**
     * @return {?}
     */
    simulateZoneExit() { this.onStable.emit(null); }
}
MockNgZone.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockNgZone.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    MockNgZone.prototype.onStable;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfem9uZV9tb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS90ZXN0aW5nL3NyYy9uZ196b25lX21vY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7QUFPL0QsTUFBTSxpQkFBa0IsU0FBUSxNQUFNO0lBR3BDO1FBQWdCLEtBQUssQ0FBQyxFQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7d0JBRnZCLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztLQUVFOzs7OztJQUV2RCxHQUFHLENBQUMsRUFBWSxJQUFTLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFdkMsaUJBQWlCLENBQUMsRUFBWSxJQUFTLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRTs7OztJQUVyRCxnQkFBZ0IsS0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7WUFWdkQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBBIG1vY2sgaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIE5nWm9uZX0uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrTmdab25lIGV4dGVuZHMgTmdab25lIHtcbiAgb25TdGFibGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG5cbiAgY29uc3RydWN0b3IoKSB7IHN1cGVyKHtlbmFibGVMb25nU3RhY2tUcmFjZTogZmFsc2V9KTsgfVxuXG4gIHJ1bihmbjogRnVuY3Rpb24pOiBhbnkgeyByZXR1cm4gZm4oKTsgfVxuXG4gIHJ1bk91dHNpZGVBbmd1bGFyKGZuOiBGdW5jdGlvbik6IGFueSB7IHJldHVybiBmbigpOyB9XG5cbiAgc2ltdWxhdGVab25lRXhpdCgpOiB2b2lkIHsgdGhpcy5vblN0YWJsZS5lbWl0KG51bGwpOyB9XG59XG4iXX0=