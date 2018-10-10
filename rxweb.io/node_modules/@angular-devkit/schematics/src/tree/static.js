"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const exception_1 = require("../exception/exception");
const filtered_1 = require("./filtered");
const host_tree_1 = require("./host-tree");
const interface_1 = require("./interface");
const virtual_1 = require("./virtual");
function empty() {
    return new host_tree_1.HostTree();
}
exports.empty = empty;
function branch(tree) {
    // TODO: Remove VirtualTree usage in 7.0
    if (tree instanceof virtual_1.VirtualTree) {
        return virtual_1.VirtualTree.branch(tree);
    }
    return tree.branch();
}
exports.branch = branch;
function merge(tree, other, strategy = interface_1.MergeStrategy.Default) {
    // TODO: Remove VirtualTree usage in 7.0
    if (tree instanceof virtual_1.VirtualTree) {
        return virtual_1.VirtualTree.merge(tree, other, strategy);
    }
    tree.merge(other, strategy);
    return tree;
}
exports.merge = merge;
function partition(tree, predicate) {
    // TODO: Remove VirtualTree usage in 7.0
    if (tree instanceof virtual_1.VirtualTree) {
        return [
            new filtered_1.FilteredTree(tree, predicate),
            new filtered_1.FilteredTree(tree, (path, entry) => !predicate(path, entry)),
        ];
    }
    else if (tree instanceof host_tree_1.HostTree) {
        return [
            new host_tree_1.FilterHostTree(tree, predicate),
            new host_tree_1.FilterHostTree(tree, (path, entry) => !predicate(path, entry)),
        ];
    }
    else {
        throw new exception_1.SchematicsException('Tree type is not supported.');
    }
}
exports.partition = partition;
function optimize(tree) {
    // TODO: Remove VirtualTree usage in 7.0
    if (tree instanceof virtual_1.VirtualTree) {
        return virtual_1.VirtualTree.optimize(tree);
    }
    return tree;
}
exports.optimize = optimize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3NyYy90cmVlL3N0YXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILHNEQUE2RDtBQUM3RCx5Q0FBMEM7QUFDMUMsMkNBQXVEO0FBQ3ZELDJDQUFpRTtBQUNqRSx1Q0FBd0M7QUFHeEM7SUFDRSxNQUFNLENBQUMsSUFBSSxvQkFBUSxFQUFFLENBQUM7QUFDeEIsQ0FBQztBQUZELHNCQUVDO0FBRUQsZ0JBQXVCLElBQVU7SUFDL0Isd0NBQXdDO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxxQkFBVyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMscUJBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdkIsQ0FBQztBQVBELHdCQU9DO0FBRUQsZUFBc0IsSUFBVSxFQUFFLEtBQVcsRUFBRSxXQUEwQix5QkFBYSxDQUFDLE9BQU87SUFDNUYsd0NBQXdDO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxxQkFBVyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMscUJBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFNUIsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNkLENBQUM7QUFURCxzQkFTQztBQUVELG1CQUEwQixJQUFVLEVBQUUsU0FBaUM7SUFDckUsd0NBQXdDO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxxQkFBVyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUM7WUFDTCxJQUFJLHVCQUFZLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQztZQUNqQyxJQUFJLHVCQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2pFLENBQUM7SUFDSixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxvQkFBUSxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUM7WUFDTCxJQUFJLDBCQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQztZQUNuQyxJQUFJLDBCQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ25FLENBQUM7SUFDSixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLElBQUksK0JBQW1CLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0FBQ0gsQ0FBQztBQWZELDhCQWVDO0FBRUQsa0JBQXlCLElBQVU7SUFDakMsd0NBQXdDO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxxQkFBVyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMscUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBUEQsNEJBT0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBTY2hlbWF0aWNzRXhjZXB0aW9uIH0gZnJvbSAnLi4vZXhjZXB0aW9uL2V4Y2VwdGlvbic7XG5pbXBvcnQgeyBGaWx0ZXJlZFRyZWUgfSBmcm9tICcuL2ZpbHRlcmVkJztcbmltcG9ydCB7IEZpbHRlckhvc3RUcmVlLCBIb3N0VHJlZSB9IGZyb20gJy4vaG9zdC10cmVlJztcbmltcG9ydCB7IEZpbGVQcmVkaWNhdGUsIE1lcmdlU3RyYXRlZ3ksIFRyZWUgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBWaXJ0dWFsVHJlZSB9IGZyb20gJy4vdmlydHVhbCc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KCkge1xuICByZXR1cm4gbmV3IEhvc3RUcmVlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicmFuY2godHJlZTogVHJlZSkge1xuICAvLyBUT0RPOiBSZW1vdmUgVmlydHVhbFRyZWUgdXNhZ2UgaW4gNy4wXG4gIGlmICh0cmVlIGluc3RhbmNlb2YgVmlydHVhbFRyZWUpIHtcbiAgICByZXR1cm4gVmlydHVhbFRyZWUuYnJhbmNoKHRyZWUpO1xuICB9XG5cbiAgcmV0dXJuIHRyZWUuYnJhbmNoKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZSh0cmVlOiBUcmVlLCBvdGhlcjogVHJlZSwgc3RyYXRlZ3k6IE1lcmdlU3RyYXRlZ3kgPSBNZXJnZVN0cmF0ZWd5LkRlZmF1bHQpIHtcbiAgLy8gVE9ETzogUmVtb3ZlIFZpcnR1YWxUcmVlIHVzYWdlIGluIDcuMFxuICBpZiAodHJlZSBpbnN0YW5jZW9mIFZpcnR1YWxUcmVlKSB7XG4gICAgcmV0dXJuIFZpcnR1YWxUcmVlLm1lcmdlKHRyZWUsIG90aGVyLCBzdHJhdGVneSk7XG4gIH1cblxuICB0cmVlLm1lcmdlKG90aGVyLCBzdHJhdGVneSk7XG5cbiAgcmV0dXJuIHRyZWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJ0aXRpb24odHJlZTogVHJlZSwgcHJlZGljYXRlOiBGaWxlUHJlZGljYXRlPGJvb2xlYW4+KTogW1RyZWUsIFRyZWVdIHtcbiAgLy8gVE9ETzogUmVtb3ZlIFZpcnR1YWxUcmVlIHVzYWdlIGluIDcuMFxuICBpZiAodHJlZSBpbnN0YW5jZW9mIFZpcnR1YWxUcmVlKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBGaWx0ZXJlZFRyZWUodHJlZSwgcHJlZGljYXRlKSxcbiAgICAgIG5ldyBGaWx0ZXJlZFRyZWUodHJlZSwgKHBhdGgsIGVudHJ5KSA9PiAhcHJlZGljYXRlKHBhdGgsIGVudHJ5KSksXG4gICAgXTtcbiAgfSBlbHNlIGlmICh0cmVlIGluc3RhbmNlb2YgSG9zdFRyZWUpIHtcbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEZpbHRlckhvc3RUcmVlKHRyZWUsIHByZWRpY2F0ZSksXG4gICAgICBuZXcgRmlsdGVySG9zdFRyZWUodHJlZSwgKHBhdGgsIGVudHJ5KSA9PiAhcHJlZGljYXRlKHBhdGgsIGVudHJ5KSksXG4gICAgXTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbignVHJlZSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQuJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wdGltaXplKHRyZWU6IFRyZWUpIHtcbiAgLy8gVE9ETzogUmVtb3ZlIFZpcnR1YWxUcmVlIHVzYWdlIGluIDcuMFxuICBpZiAodHJlZSBpbnN0YW5jZW9mIFZpcnR1YWxUcmVlKSB7XG4gICAgcmV0dXJuIFZpcnR1YWxUcmVlLm9wdGltaXplKHRyZWUpO1xuICB9XG5cbiAgcmV0dXJuIHRyZWU7XG59XG4iXX0=