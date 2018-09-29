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
/**
 * @template T
 */
export class Tree {
    /**
     * @param {?} root
     */
    constructor(root) { this._root = root; }
    /**
     * @return {?}
     */
    get root() { return this._root.value; }
    /**
     * \@internal
     * @param {?} t
     * @return {?}
     */
    parent(t) {
        /** @type {?} */
        const p = this.pathFromRoot(t);
        return p.length > 1 ? p[p.length - 2] : null;
    }
    /**
     * \@internal
     * @param {?} t
     * @return {?}
     */
    children(t) {
        /** @type {?} */
        const n = findNode(t, this._root);
        return n ? n.children.map(t => t.value) : [];
    }
    /**
     * \@internal
     * @param {?} t
     * @return {?}
     */
    firstChild(t) {
        /** @type {?} */
        const n = findNode(t, this._root);
        return n && n.children.length > 0 ? n.children[0].value : null;
    }
    /**
     * \@internal
     * @param {?} t
     * @return {?}
     */
    siblings(t) {
        /** @type {?} */
        const p = findPath(t, this._root);
        if (p.length < 2)
            return [];
        /** @type {?} */
        const c = p[p.length - 2].children.map(c => c.value);
        return c.filter(cc => cc !== t);
    }
    /**
     * \@internal
     * @param {?} t
     * @return {?}
     */
    pathFromRoot(t) { return findPath(t, this._root).map(s => s.value); }
}
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    Tree.prototype._root;
}
/**
 * @template T
 * @param {?} value
 * @param {?} node
 * @return {?}
 */
function findNode(value, node) {
    if (value === node.value)
        return node;
    for (const child of node.children) {
        /** @type {?} */
        const node = findNode(value, child);
        if (node)
            return node;
    }
    return null;
}
/**
 * @template T
 * @param {?} value
 * @param {?} node
 * @return {?}
 */
function findPath(value, node) {
    if (value === node.value)
        return [node];
    for (const child of node.children) {
        /** @type {?} */
        const path = findPath(value, child);
        if (path.length) {
            path.unshift(node);
            return path;
        }
    }
    return [];
}
/**
 * @template T
 */
export class TreeNode {
    /**
     * @param {?} value
     * @param {?} children
     */
    constructor(value, children) {
        this.value = value;
        this.children = children;
    }
    /**
     * @return {?}
     */
    toString() { return `TreeNode(${this.value})`; }
}
if (false) {
    /** @type {?} */
    TreeNode.prototype.value;
    /** @type {?} */
    TreeNode.prototype.children;
}
/**
 * @template T
 * @param {?} node
 * @return {?}
 */
export function nodeChildrenAsMap(node) {
    /** @type {?} */
    const map = {};
    if (node) {
        node.children.forEach(child => map[child.value.outlet] = child);
    }
    return map;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3JvdXRlci9zcmMvdXRpbHMvdHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVFBLE1BQU07Ozs7SUFJSixZQUFZLElBQWlCLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRTs7OztJQUVyRCxJQUFJLElBQUksS0FBUSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Ozs7OztJQUsxQyxNQUFNLENBQUMsQ0FBSTs7UUFDVCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDOUM7Ozs7OztJQUtELFFBQVEsQ0FBQyxDQUFJOztRQUNYLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQzlDOzs7Ozs7SUFLRCxVQUFVLENBQUMsQ0FBSTs7UUFDYixNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDaEU7Ozs7OztJQUtELFFBQVEsQ0FBQyxDQUFJOztRQUNYLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQUUsT0FBTyxFQUFFLENBQUM7O1FBRTVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ2pDOzs7Ozs7SUFLRCxZQUFZLENBQUMsQ0FBSSxJQUFTLE9BQU8sUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Q0FDOUU7Ozs7Ozs7Ozs7Ozs7O0FBSUQsa0JBQXFCLEtBQVEsRUFBRSxJQUFpQjtJQUM5QyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRXRDLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTs7UUFDakMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQztLQUN2QjtJQUVELE9BQU8sSUFBSSxDQUFDO0NBQ2I7Ozs7Ozs7QUFHRCxrQkFBcUIsS0FBUSxFQUFFLElBQWlCO0lBQzlDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXhDLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTs7UUFDakMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7S0FDRjtJQUVELE9BQU8sRUFBRSxDQUFDO0NBQ1g7Ozs7QUFFRCxNQUFNOzs7OztJQUNKLFlBQW1CLEtBQVEsRUFBUyxRQUF1QjtRQUF4QyxVQUFLLEdBQUwsS0FBSyxDQUFHO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBZTtLQUFJOzs7O0lBRS9ELFFBQVEsS0FBYSxPQUFPLFlBQVksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7Q0FDekQ7Ozs7Ozs7Ozs7OztBQUdELE1BQU0sNEJBQXVELElBQXVCOztJQUNsRixNQUFNLEdBQUcsR0FBb0MsRUFBRSxDQUFDO0lBRWhELElBQUksSUFBSSxFQUFFO1FBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztLQUNqRTtJQUVELE9BQU8sR0FBRyxDQUFDO0NBQ1oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmV4cG9ydCBjbGFzcyBUcmVlPFQ+IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcm9vdDogVHJlZU5vZGU8VD47XG5cbiAgY29uc3RydWN0b3Iocm9vdDogVHJlZU5vZGU8VD4pIHsgdGhpcy5fcm9vdCA9IHJvb3Q7IH1cblxuICBnZXQgcm9vdCgpOiBUIHsgcmV0dXJuIHRoaXMuX3Jvb3QudmFsdWU7IH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwYXJlbnQodDogVCk6IFR8bnVsbCB7XG4gICAgY29uc3QgcCA9IHRoaXMucGF0aEZyb21Sb290KHQpO1xuICAgIHJldHVybiBwLmxlbmd0aCA+IDEgPyBwW3AubGVuZ3RoIC0gMl0gOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY2hpbGRyZW4odDogVCk6IFRbXSB7XG4gICAgY29uc3QgbiA9IGZpbmROb2RlKHQsIHRoaXMuX3Jvb3QpO1xuICAgIHJldHVybiBuID8gbi5jaGlsZHJlbi5tYXAodCA9PiB0LnZhbHVlKSA6IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZmlyc3RDaGlsZCh0OiBUKTogVHxudWxsIHtcbiAgICBjb25zdCBuID0gZmluZE5vZGUodCwgdGhpcy5fcm9vdCk7XG4gICAgcmV0dXJuIG4gJiYgbi5jaGlsZHJlbi5sZW5ndGggPiAwID8gbi5jaGlsZHJlblswXS52YWx1ZSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBzaWJsaW5ncyh0OiBUKTogVFtdIHtcbiAgICBjb25zdCBwID0gZmluZFBhdGgodCwgdGhpcy5fcm9vdCk7XG4gICAgaWYgKHAubGVuZ3RoIDwgMikgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgYyA9IHBbcC5sZW5ndGggLSAyXS5jaGlsZHJlbi5tYXAoYyA9PiBjLnZhbHVlKTtcbiAgICByZXR1cm4gYy5maWx0ZXIoY2MgPT4gY2MgIT09IHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcGF0aEZyb21Sb290KHQ6IFQpOiBUW10geyByZXR1cm4gZmluZFBhdGgodCwgdGhpcy5fcm9vdCkubWFwKHMgPT4gcy52YWx1ZSk7IH1cbn1cblxuXG4vLyBERlMgZm9yIHRoZSBub2RlIG1hdGNoaW5nIHRoZSB2YWx1ZVxuZnVuY3Rpb24gZmluZE5vZGU8VD4odmFsdWU6IFQsIG5vZGU6IFRyZWVOb2RlPFQ+KTogVHJlZU5vZGU8VD58bnVsbCB7XG4gIGlmICh2YWx1ZSA9PT0gbm9kZS52YWx1ZSkgcmV0dXJuIG5vZGU7XG5cbiAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgY29uc3Qgbm9kZSA9IGZpbmROb2RlKHZhbHVlLCBjaGlsZCk7XG4gICAgaWYgKG5vZGUpIHJldHVybiBub2RlO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8vIFJldHVybiB0aGUgcGF0aCB0byB0aGUgbm9kZSB3aXRoIHRoZSBnaXZlbiB2YWx1ZSB1c2luZyBERlNcbmZ1bmN0aW9uIGZpbmRQYXRoPFQ+KHZhbHVlOiBULCBub2RlOiBUcmVlTm9kZTxUPik6IFRyZWVOb2RlPFQ+W10ge1xuICBpZiAodmFsdWUgPT09IG5vZGUudmFsdWUpIHJldHVybiBbbm9kZV07XG5cbiAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgY29uc3QgcGF0aCA9IGZpbmRQYXRoKHZhbHVlLCBjaGlsZCk7XG4gICAgaWYgKHBhdGgubGVuZ3RoKSB7XG4gICAgICBwYXRoLnVuc2hpZnQobm9kZSk7XG4gICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW107XG59XG5cbmV4cG9ydCBjbGFzcyBUcmVlTm9kZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogVCwgcHVibGljIGNoaWxkcmVuOiBUcmVlTm9kZTxUPltdKSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgVHJlZU5vZGUoJHt0aGlzLnZhbHVlfSlgOyB9XG59XG5cbi8vIFJldHVybiB0aGUgbGlzdCBvZiBUIGluZGV4ZWQgYnkgb3V0bGV0IG5hbWVcbmV4cG9ydCBmdW5jdGlvbiBub2RlQ2hpbGRyZW5Bc01hcDxUIGV4dGVuZHN7b3V0bGV0OiBzdHJpbmd9Pihub2RlOiBUcmVlTm9kZTxUPnwgbnVsbCkge1xuICBjb25zdCBtYXA6IHtbb3V0bGV0OiBzdHJpbmddOiBUcmVlTm9kZTxUPn0gPSB7fTtcblxuICBpZiAobm9kZSkge1xuICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBtYXBbY2hpbGQudmFsdWUub3V0bGV0XSA9IGNoaWxkKTtcbiAgfVxuXG4gIHJldHVybiBtYXA7XG59Il19