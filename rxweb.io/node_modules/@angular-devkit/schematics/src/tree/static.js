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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3NyYy90cmVlL3N0YXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILHNEQUE2RDtBQUM3RCx5Q0FBMEM7QUFDMUMsMkNBQXVEO0FBQ3ZELDJDQUFpRTtBQUNqRSx1Q0FBd0M7QUFHeEM7SUFDRSxPQUFPLElBQUksb0JBQVEsRUFBRSxDQUFDO0FBQ3hCLENBQUM7QUFGRCxzQkFFQztBQUVELGdCQUF1QixJQUFVO0lBQy9CLHdDQUF3QztJQUN4QyxJQUFJLElBQUksWUFBWSxxQkFBVyxFQUFFO1FBQy9CLE9BQU8scUJBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakM7SUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN2QixDQUFDO0FBUEQsd0JBT0M7QUFFRCxlQUFzQixJQUFVLEVBQUUsS0FBVyxFQUFFLFdBQTBCLHlCQUFhLENBQUMsT0FBTztJQUM1Rix3Q0FBd0M7SUFDeEMsSUFBSSxJQUFJLFlBQVkscUJBQVcsRUFBRTtRQUMvQixPQUFPLHFCQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDakQ7SUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUU1QixPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFURCxzQkFTQztBQUVELG1CQUEwQixJQUFVLEVBQUUsU0FBaUM7SUFDckUsd0NBQXdDO0lBQ3hDLElBQUksSUFBSSxZQUFZLHFCQUFXLEVBQUU7UUFDL0IsT0FBTztZQUNMLElBQUksdUJBQVksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO1lBQ2pDLElBQUksdUJBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDakUsQ0FBQztLQUNIO1NBQU0sSUFBSSxJQUFJLFlBQVksb0JBQVEsRUFBRTtRQUNuQyxPQUFPO1lBQ0wsSUFBSSwwQkFBYyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUM7WUFDbkMsSUFBSSwwQkFBYyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNuRSxDQUFDO0tBQ0g7U0FBTTtRQUNMLE1BQU0sSUFBSSwrQkFBbUIsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0tBQzlEO0FBQ0gsQ0FBQztBQWZELDhCQWVDO0FBRUQsa0JBQXlCLElBQVU7SUFDakMsd0NBQXdDO0lBQ3hDLElBQUksSUFBSSxZQUFZLHFCQUFXLEVBQUU7UUFDL0IsT0FBTyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNuQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVBELDRCQU9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgU2NoZW1hdGljc0V4Y2VwdGlvbiB9IGZyb20gJy4uL2V4Y2VwdGlvbi9leGNlcHRpb24nO1xuaW1wb3J0IHsgRmlsdGVyZWRUcmVlIH0gZnJvbSAnLi9maWx0ZXJlZCc7XG5pbXBvcnQgeyBGaWx0ZXJIb3N0VHJlZSwgSG9zdFRyZWUgfSBmcm9tICcuL2hvc3QtdHJlZSc7XG5pbXBvcnQgeyBGaWxlUHJlZGljYXRlLCBNZXJnZVN0cmF0ZWd5LCBUcmVlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVmlydHVhbFRyZWUgfSBmcm9tICcuL3ZpcnR1YWwnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBlbXB0eSgpIHtcbiAgcmV0dXJuIG5ldyBIb3N0VHJlZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJhbmNoKHRyZWU6IFRyZWUpIHtcbiAgLy8gVE9ETzogUmVtb3ZlIFZpcnR1YWxUcmVlIHVzYWdlIGluIDcuMFxuICBpZiAodHJlZSBpbnN0YW5jZW9mIFZpcnR1YWxUcmVlKSB7XG4gICAgcmV0dXJuIFZpcnR1YWxUcmVlLmJyYW5jaCh0cmVlKTtcbiAgfVxuXG4gIHJldHVybiB0cmVlLmJyYW5jaCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2UodHJlZTogVHJlZSwgb3RoZXI6IFRyZWUsIHN0cmF0ZWd5OiBNZXJnZVN0cmF0ZWd5ID0gTWVyZ2VTdHJhdGVneS5EZWZhdWx0KSB7XG4gIC8vIFRPRE86IFJlbW92ZSBWaXJ0dWFsVHJlZSB1c2FnZSBpbiA3LjBcbiAgaWYgKHRyZWUgaW5zdGFuY2VvZiBWaXJ0dWFsVHJlZSkge1xuICAgIHJldHVybiBWaXJ0dWFsVHJlZS5tZXJnZSh0cmVlLCBvdGhlciwgc3RyYXRlZ3kpO1xuICB9XG5cbiAgdHJlZS5tZXJnZShvdGhlciwgc3RyYXRlZ3kpO1xuXG4gIHJldHVybiB0cmVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFydGl0aW9uKHRyZWU6IFRyZWUsIHByZWRpY2F0ZTogRmlsZVByZWRpY2F0ZTxib29sZWFuPik6IFtUcmVlLCBUcmVlXSB7XG4gIC8vIFRPRE86IFJlbW92ZSBWaXJ0dWFsVHJlZSB1c2FnZSBpbiA3LjBcbiAgaWYgKHRyZWUgaW5zdGFuY2VvZiBWaXJ0dWFsVHJlZSkge1xuICAgIHJldHVybiBbXG4gICAgICBuZXcgRmlsdGVyZWRUcmVlKHRyZWUsIHByZWRpY2F0ZSksXG4gICAgICBuZXcgRmlsdGVyZWRUcmVlKHRyZWUsIChwYXRoLCBlbnRyeSkgPT4gIXByZWRpY2F0ZShwYXRoLCBlbnRyeSkpLFxuICAgIF07XG4gIH0gZWxzZSBpZiAodHJlZSBpbnN0YW5jZW9mIEhvc3RUcmVlKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBGaWx0ZXJIb3N0VHJlZSh0cmVlLCBwcmVkaWNhdGUpLFxuICAgICAgbmV3IEZpbHRlckhvc3RUcmVlKHRyZWUsIChwYXRoLCBlbnRyeSkgPT4gIXByZWRpY2F0ZShwYXRoLCBlbnRyeSkpLFxuICAgIF07XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oJ1RyZWUgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLicpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcHRpbWl6ZSh0cmVlOiBUcmVlKSB7XG4gIC8vIFRPRE86IFJlbW92ZSBWaXJ0dWFsVHJlZSB1c2FnZSBpbiA3LjBcbiAgaWYgKHRyZWUgaW5zdGFuY2VvZiBWaXJ0dWFsVHJlZSkge1xuICAgIHJldHVybiBWaXJ0dWFsVHJlZS5vcHRpbWl6ZSh0cmVlKTtcbiAgfVxuXG4gIHJldHVybiB0cmVlO1xufVxuIl19