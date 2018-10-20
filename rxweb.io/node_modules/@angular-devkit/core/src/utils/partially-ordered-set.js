"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const exception_1 = require("../exception");
class DependencyNotFoundException extends exception_1.BaseException {
    constructor() { super('One of the dependencies is not part of the set.'); }
}
exports.DependencyNotFoundException = DependencyNotFoundException;
class CircularDependencyFoundException extends exception_1.BaseException {
    constructor() { super('Circular dependencies found.'); }
}
exports.CircularDependencyFoundException = CircularDependencyFoundException;
class PartiallyOrderedSet {
    constructor() {
        this._items = new Map();
    }
    _checkCircularDependencies(item, deps) {
        if (deps.has(item)) {
            throw new CircularDependencyFoundException();
        }
        deps.forEach(dep => this._checkCircularDependencies(item, this._items.get(dep) || new Set()));
    }
    clear() {
        this._items.clear();
    }
    has(item) {
        return this._items.has(item);
    }
    get size() {
        return this._items.size;
    }
    forEach(callbackfn, thisArg) {
        for (const x of this) {
            callbackfn.call(thisArg, x, x, this);
        }
    }
    /**
     * Returns an iterable of [v,v] pairs for every value `v` in the set.
     */
    *entries() {
        for (const item of this) {
            yield [item, item];
        }
    }
    /**
     * Despite its name, returns an iterable of the values in the set,
     */
    keys() {
        return this.values();
    }
    /**
     * Returns an iterable of values in the set.
     */
    values() {
        return this[Symbol.iterator]();
    }
    add(item, deps = new Set()) {
        if (Array.isArray(deps)) {
            deps = new Set(deps);
        }
        // Verify item is not already in the set.
        if (this._items.has(item)) {
            const itemDeps = this._items.get(item) || new Set();
            // If the dependency list is equal, just return, otherwise remove and keep going.
            let equal = true;
            for (const dep of deps) {
                if (!itemDeps.has(dep)) {
                    equal = false;
                    break;
                }
            }
            if (equal) {
                for (const dep of itemDeps) {
                    if (!deps.has(dep)) {
                        equal = false;
                        break;
                    }
                }
            }
            if (equal) {
                return this;
            }
            else {
                this._items.delete(item);
            }
        }
        // Verify all dependencies are part of the Set.
        for (const dep of deps) {
            if (!this._items.has(dep)) {
                throw new DependencyNotFoundException();
            }
        }
        // Verify there's no dependency cycle.
        this._checkCircularDependencies(item, deps);
        this._items.set(item, new Set(deps));
        return this;
    }
    delete(item) {
        if (!this._items.has(item)) {
            return false;
        }
        // Remove it from all dependencies if force == true.
        this._items.forEach(value => value.delete(item));
        return this._items.delete(item);
    }
    *[Symbol.iterator]() {
        const copy = new Map(this._items);
        for (const [key, value] of copy.entries()) {
            copy.set(key, new Set(value));
        }
        while (copy.size > 0) {
            const run = [];
            // Take the first item without dependencies.
            for (const [item, deps] of copy.entries()) {
                if (deps.size == 0) {
                    run.push(item);
                }
            }
            for (const item of run) {
                copy.forEach(s => s.delete(item));
                copy.delete(item);
                yield item;
            }
            if (run.length == 0) {
                // uh oh...
                throw new CircularDependencyFoundException();
            }
        }
    }
    get [Symbol.toStringTag]() {
        return 'Set';
    }
}
exports.PartiallyOrderedSet = PartiallyOrderedSet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGlhbGx5LW9yZGVyZWQtc2V0LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9jb3JlL3NyYy91dGlscy9wYXJ0aWFsbHktb3JkZXJlZC1zZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCw0Q0FBNkM7QUFFN0MsaUNBQXlDLFNBQVEseUJBQWE7SUFDNUQsZ0JBQWdCLEtBQUssQ0FBQyxpREFBaUQsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUM1RTtBQUZELGtFQUVDO0FBQ0Qsc0NBQThDLFNBQVEseUJBQWE7SUFDakUsZ0JBQWdCLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN6RDtBQUZELDRFQUVDO0FBRUQ7SUFBQTtRQUNVLFdBQU0sR0FBRyxJQUFJLEdBQUcsRUFBYSxDQUFDO0lBK0l4QyxDQUFDO0lBN0lXLDBCQUEwQixDQUFDLElBQU8sRUFBRSxJQUFZO1FBQ3hELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsQixNQUFNLElBQUksZ0NBQWdDLEVBQUUsQ0FBQztTQUM5QztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0QsR0FBRyxDQUFDLElBQU87UUFDVCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFN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c0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiB9IGZyb20gJy4uL2V4Y2VwdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBEZXBlbmRlbmN5Tm90Rm91bmRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCdPbmUgb2YgdGhlIGRlcGVuZGVuY2llcyBpcyBub3QgcGFydCBvZiB0aGUgc2V0LicpOyB9XG59XG5leHBvcnQgY2xhc3MgQ2lyY3VsYXJEZXBlbmRlbmN5Rm91bmRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCdDaXJjdWxhciBkZXBlbmRlbmNpZXMgZm91bmQuJyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhcnRpYWxseU9yZGVyZWRTZXQ8VD4gaW1wbGVtZW50cyBTZXQ8VD4ge1xuICBwcml2YXRlIF9pdGVtcyA9IG5ldyBNYXA8VCwgU2V0PFQ+PigpO1xuXG4gIHByb3RlY3RlZCBfY2hlY2tDaXJjdWxhckRlcGVuZGVuY2llcyhpdGVtOiBULCBkZXBzOiBTZXQ8VD4pIHtcbiAgICBpZiAoZGVwcy5oYXMoaXRlbSkpIHtcbiAgICAgIHRocm93IG5ldyBDaXJjdWxhckRlcGVuZGVuY3lGb3VuZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIGRlcHMuZm9yRWFjaChkZXAgPT4gdGhpcy5fY2hlY2tDaXJjdWxhckRlcGVuZGVuY2llcyhpdGVtLCB0aGlzLl9pdGVtcy5nZXQoZGVwKSB8fCBuZXcgU2V0KCkpKTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX2l0ZW1zLmNsZWFyKCk7XG4gIH1cbiAgaGFzKGl0ZW06IFQpIHtcbiAgICByZXR1cm4gdGhpcy5faXRlbXMuaGFzKGl0ZW0pO1xuICB9XG4gIGdldCBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9pdGVtcy5zaXplO1xuICB9XG4gIGZvckVhY2goXG4gICAgY2FsbGJhY2tmbjogKHZhbHVlOiBULCB2YWx1ZTI6IFQsIHNldDogUGFydGlhbGx5T3JkZXJlZFNldDxUPikgPT4gdm9pZCxcbiAgICB0aGlzQXJnPzogYW55LCAgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1hbnlcbiAgKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCB4IG9mIHRoaXMpIHtcbiAgICAgIGNhbGxiYWNrZm4uY2FsbCh0aGlzQXJnLCB4LCB4LCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBpdGVyYWJsZSBvZiBbdix2XSBwYWlycyBmb3IgZXZlcnkgdmFsdWUgYHZgIGluIHRoZSBzZXQuXG4gICAqL1xuICAqZW50cmllcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFtULCBUXT4ge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzKSB7XG4gICAgICB5aWVsZCBbaXRlbSwgaXRlbV07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3BpdGUgaXRzIG5hbWUsIHJldHVybnMgYW4gaXRlcmFibGUgb2YgdGhlIHZhbHVlcyBpbiB0aGUgc2V0LFxuICAgKi9cbiAga2V5cygpOiBJdGVyYWJsZUl0ZXJhdG9yPFQ+IHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGl0ZXJhYmxlIG9mIHZhbHVlcyBpbiB0aGUgc2V0LlxuICAgKi9cbiAgdmFsdWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8VD4ge1xuICAgIHJldHVybiB0aGlzW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG5cbiAgYWRkKGl0ZW06IFQsIGRlcHM6IChTZXQ8VD4gfCBUW10pID0gbmV3IFNldCgpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVwcykpIHtcbiAgICAgIGRlcHMgPSBuZXcgU2V0KGRlcHMpO1xuICAgIH1cblxuICAgIC8vIFZlcmlmeSBpdGVtIGlzIG5vdCBhbHJlYWR5IGluIHRoZSBzZXQuXG4gICAgaWYgKHRoaXMuX2l0ZW1zLmhhcyhpdGVtKSkge1xuICAgICAgY29uc3QgaXRlbURlcHMgPSB0aGlzLl9pdGVtcy5nZXQoaXRlbSkgfHwgbmV3IFNldDxUPigpO1xuXG4gICAgICAvLyBJZiB0aGUgZGVwZW5kZW5jeSBsaXN0IGlzIGVxdWFsLCBqdXN0IHJldHVybiwgb3RoZXJ3aXNlIHJlbW92ZSBhbmQga2VlcCBnb2luZy5cbiAgICAgIGxldCBlcXVhbCA9IHRydWU7XG4gICAgICBmb3IgKGNvbnN0IGRlcCBvZiBkZXBzKSB7XG4gICAgICAgIGlmICghaXRlbURlcHMuaGFzKGRlcCkpIHtcbiAgICAgICAgICBlcXVhbCA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZXF1YWwpIHtcbiAgICAgICAgZm9yIChjb25zdCBkZXAgb2YgaXRlbURlcHMpIHtcbiAgICAgICAgICBpZiAoIWRlcHMuaGFzKGRlcCkpIHtcbiAgICAgICAgICAgIGVxdWFsID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGVxdWFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faXRlbXMuZGVsZXRlKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFZlcmlmeSBhbGwgZGVwZW5kZW5jaWVzIGFyZSBwYXJ0IG9mIHRoZSBTZXQuXG4gICAgZm9yIChjb25zdCBkZXAgb2YgZGVwcykge1xuICAgICAgaWYgKCF0aGlzLl9pdGVtcy5oYXMoZGVwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRGVwZW5kZW5jeU5vdEZvdW5kRXhjZXB0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVmVyaWZ5IHRoZXJlJ3Mgbm8gZGVwZW5kZW5jeSBjeWNsZS5cbiAgICB0aGlzLl9jaGVja0NpcmN1bGFyRGVwZW5kZW5jaWVzKGl0ZW0sIGRlcHMpO1xuXG4gICAgdGhpcy5faXRlbXMuc2V0KGl0ZW0sIG5ldyBTZXQoZGVwcykpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkZWxldGUoaXRlbTogVCkge1xuICAgIGlmICghdGhpcy5faXRlbXMuaGFzKGl0ZW0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGl0IGZyb20gYWxsIGRlcGVuZGVuY2llcyBpZiBmb3JjZSA9PSB0cnVlLlxuICAgIHRoaXMuX2l0ZW1zLmZvckVhY2godmFsdWUgPT4gdmFsdWUuZGVsZXRlKGl0ZW0pKTtcblxuICAgIHJldHVybiB0aGlzLl9pdGVtcy5kZWxldGUoaXRlbSk7XG4gIH1cblxuICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgY29uc3QgY29weTogTWFwPFQsIFNldDxUPj4gPSBuZXcgTWFwKHRoaXMuX2l0ZW1zKTtcblxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGNvcHkuZW50cmllcygpKSB7XG4gICAgICBjb3B5LnNldChrZXksIG5ldyBTZXQodmFsdWUpKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoY29weS5zaXplID4gMCkge1xuICAgICAgY29uc3QgcnVuID0gW107XG4gICAgICAvLyBUYWtlIHRoZSBmaXJzdCBpdGVtIHdpdGhvdXQgZGVwZW5kZW5jaWVzLlxuICAgICAgZm9yIChjb25zdCBbaXRlbSwgZGVwc10gb2YgY29weS5lbnRyaWVzKCkpIHtcbiAgICAgICAgaWYgKGRlcHMuc2l6ZSA9PSAwKSB7XG4gICAgICAgICAgcnVuLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHJ1bikge1xuICAgICAgICBjb3B5LmZvckVhY2gocyA9PiBzLmRlbGV0ZShpdGVtKSk7XG4gICAgICAgIGNvcHkuZGVsZXRlKGl0ZW0pO1xuICAgICAgICB5aWVsZCBpdGVtO1xuICAgICAgfVxuXG4gICAgICBpZiAocnVuLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIC8vIHVoIG9oLi4uXG4gICAgICAgIHRocm93IG5ldyBDaXJjdWxhckRlcGVuZGVuY3lGb3VuZEV4Y2VwdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpOiAnU2V0JyB7XG4gICAgcmV0dXJuICdTZXQnO1xuICB9XG59XG4iXX0=