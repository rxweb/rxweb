/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { areAllEquivalent } from '../output/output_ast';
import { TypeScriptEmitter } from '../output/ts_emitter';
export class GeneratedFile {
    constructor(srcFileUrl, genFileUrl, sourceOrStmts) {
        this.srcFileUrl = srcFileUrl;
        this.genFileUrl = genFileUrl;
        if (typeof sourceOrStmts === 'string') {
            this.source = sourceOrStmts;
            this.stmts = null;
        }
        else {
            this.source = null;
            this.stmts = sourceOrStmts;
        }
    }
    isEquivalent(other) {
        if (this.genFileUrl !== other.genFileUrl) {
            return false;
        }
        if (this.source) {
            return this.source === other.source;
        }
        if (other.stmts == null) {
            return false;
        }
        // Note: the constructor guarantees that if this.source is not filled,
        // then this.stmts is.
        return areAllEquivalent(this.stmts, other.stmts);
    }
}
export function toTypeScript(file, preamble = '') {
    if (!file.stmts) {
        throw new Error(`Illegal state: No stmts present on GeneratedFile ${file.genFileUrl}`);
    }
    return new TypeScriptEmitter().emitStatements(file.genFileUrl, file.stmts, preamble);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkX2ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvYW90L2dlbmVyYXRlZF9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBWSxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE1BQU07SUFJSixZQUNXLFVBQWtCLEVBQVMsVUFBa0IsRUFBRSxhQUFpQztRQUFoRixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN0RCxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRTtZQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNuQjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQW9CO1FBQy9CLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ3hDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNyQztRQUNELElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDdkIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELHNFQUFzRTtRQUN0RSxzQkFBc0I7UUFDdEIsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFPLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLHVCQUF1QixJQUFtQixFQUFFLFdBQW1CLEVBQUU7SUFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDZixNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztLQUN4RjtJQUNELE9BQU8sSUFBSSxpQkFBaUIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTdGF0ZW1lbnQsIGFyZUFsbEVxdWl2YWxlbnR9IGZyb20gJy4uL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7VHlwZVNjcmlwdEVtaXR0ZXJ9IGZyb20gJy4uL291dHB1dC90c19lbWl0dGVyJztcblxuZXhwb3J0IGNsYXNzIEdlbmVyYXRlZEZpbGUge1xuICBwdWJsaWMgc291cmNlOiBzdHJpbmd8bnVsbDtcbiAgcHVibGljIHN0bXRzOiBTdGF0ZW1lbnRbXXxudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHNyY0ZpbGVVcmw6IHN0cmluZywgcHVibGljIGdlbkZpbGVVcmw6IHN0cmluZywgc291cmNlT3JTdG10czogc3RyaW5nfFN0YXRlbWVudFtdKSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2VPclN0bXRzID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2VPclN0bXRzO1xuICAgICAgdGhpcy5zdG10cyA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc291cmNlID0gbnVsbDtcbiAgICAgIHRoaXMuc3RtdHMgPSBzb3VyY2VPclN0bXRzO1xuICAgIH1cbiAgfVxuXG4gIGlzRXF1aXZhbGVudChvdGhlcjogR2VuZXJhdGVkRmlsZSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmdlbkZpbGVVcmwgIT09IG90aGVyLmdlbkZpbGVVcmwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2UgPT09IG90aGVyLnNvdXJjZTtcbiAgICB9XG4gICAgaWYgKG90aGVyLnN0bXRzID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gTm90ZTogdGhlIGNvbnN0cnVjdG9yIGd1YXJhbnRlZXMgdGhhdCBpZiB0aGlzLnNvdXJjZSBpcyBub3QgZmlsbGVkLFxuICAgIC8vIHRoZW4gdGhpcy5zdG10cyBpcy5cbiAgICByZXR1cm4gYXJlQWxsRXF1aXZhbGVudCh0aGlzLnN0bXRzICEsIG90aGVyLnN0bXRzICEpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1R5cGVTY3JpcHQoZmlsZTogR2VuZXJhdGVkRmlsZSwgcHJlYW1ibGU6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcbiAgaWYgKCFmaWxlLnN0bXRzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbGxlZ2FsIHN0YXRlOiBObyBzdG10cyBwcmVzZW50IG9uIEdlbmVyYXRlZEZpbGUgJHtmaWxlLmdlbkZpbGVVcmx9YCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBUeXBlU2NyaXB0RW1pdHRlcigpLmVtaXRTdGF0ZW1lbnRzKGZpbGUuZ2VuRmlsZVVybCwgZmlsZS5zdG10cywgcHJlYW1ibGUpO1xufVxuIl19