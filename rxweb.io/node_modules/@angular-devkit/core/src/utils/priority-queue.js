"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Naive priority queue; not intended for large datasets */
class PriorityQueue {
    constructor(_comparator) {
        this._comparator = _comparator;
        this._items = new Array();
    }
    clear() {
        this._items = new Array();
    }
    push(item) {
        const index = this._items.findIndex(existing => this._comparator(item, existing) <= 0);
        if (index === -1) {
            this._items.push(item);
        }
        else {
            this._items.splice(index, 0, item);
        }
    }
    pop() {
        if (this._items.length === 0) {
            return undefined;
        }
        return this._items.splice(0, 1)[0];
    }
    peek() {
        if (this._items.length === 0) {
            return undefined;
        }
        return this._items[0];
    }
    get size() {
        return this._items.length;
    }
    toArray() {
        return this._items.slice();
    }
}
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpb3JpdHktcXVldWUuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvc3JjL3V0aWxzL3ByaW9yaXR5LXF1ZXVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsNERBQTREO0FBQzVEO0lBR0UsWUFBb0IsV0FBbUM7UUFBbkMsZ0JBQVcsR0FBWCxXQUFXLENBQXdCO1FBRi9DLFdBQU0sR0FBRyxJQUFJLEtBQUssRUFBSyxDQUFDO0lBRTBCLENBQUM7SUFFM0QsS0FBSztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUssQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxDQUFDLElBQU87UUFDVixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXZGLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUVELEdBQUc7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBMUNELHNDQTBDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqIE5haXZlIHByaW9yaXR5IHF1ZXVlOyBub3QgaW50ZW5kZWQgZm9yIGxhcmdlIGRhdGFzZXRzICovXG5leHBvcnQgY2xhc3MgUHJpb3JpdHlRdWV1ZTxUPiB7XG4gIHByaXZhdGUgX2l0ZW1zID0gbmV3IEFycmF5PFQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29tcGFyYXRvcjogKHg6IFQsIHk6IFQpID0+IG51bWJlcikge31cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9pdGVtcyA9IG5ldyBBcnJheTxUPigpO1xuICB9XG5cbiAgcHVzaChpdGVtOiBUKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9pdGVtcy5maW5kSW5kZXgoZXhpc3RpbmcgPT4gdGhpcy5fY29tcGFyYXRvcihpdGVtLCBleGlzdGluZykgPD0gMCk7XG5cbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICB0aGlzLl9pdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pdGVtcy5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIHBvcCgpOiBUIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5faXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9pdGVtcy5zcGxpY2UoMCwgMSlbMF07XG4gIH1cblxuICBwZWVrKCk6IFQgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zWzBdO1xuICB9XG5cbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgdG9BcnJheSgpOiBBcnJheTxUPiB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zLnNsaWNlKCk7XG4gIH1cbn1cbiJdfQ==