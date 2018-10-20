"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const exception_1 = require("../exception/exception");
const filtered_1 = require("../tree/filtered");
const host_tree_1 = require("../tree/host-tree");
const interface_1 = require("../tree/interface");
const static_1 = require("../tree/static");
const virtual_1 = require("../tree/virtual");
const call_1 = require("./call");
/**
 * A Source that returns an tree as its single value.
 */
function source(tree) {
    return () => tree;
}
exports.source = source;
/**
 * A source that returns an empty tree.
 */
function empty() {
    return () => static_1.empty();
}
exports.empty = empty;
/**
 * Chain multiple rules into a single rule.
 */
function chain(rules) {
    return (tree, context) => {
        return rules.reduce((acc, curr) => {
            return call_1.callRule(curr, acc, context);
        }, rxjs_1.of(tree));
    };
}
exports.chain = chain;
/**
 * Apply multiple rules to a source, and returns the source transformed.
 */
function apply(source, rules) {
    return (context) => {
        return call_1.callRule(chain([
            ...rules,
            // Optimize the tree. Since this is a source tree, there's not much harm here and this might
            // avoid further issues.
            tree => {
                if (tree instanceof virtual_1.VirtualTree) {
                    tree.optimize();
                    return tree;
                }
                else if (tree.actions.length != 0) {
                    return static_1.optimize(tree);
                }
                else {
                    return tree;
                }
            },
        ]), call_1.callSource(source, context), context);
    };
}
exports.apply = apply;
/**
 * Merge an input tree with the source passed in.
 */
function mergeWith(source, strategy = interface_1.MergeStrategy.Default) {
    return (tree, context) => {
        const result = call_1.callSource(source, context);
        return result.pipe(operators_1.map(other => static_1.merge(tree, other, strategy || context.strategy)));
    };
}
exports.mergeWith = mergeWith;
function noop() {
    return (tree, _context) => tree;
}
exports.noop = noop;
function filter(predicate) {
    return ((tree) => {
        // TODO: Remove VirtualTree usage in 7.0
        if (virtual_1.VirtualTree.isVirtualTree(tree)) {
            return new filtered_1.FilteredTree(tree, predicate);
        }
        else if (host_tree_1.HostTree.isHostTree(tree)) {
            return new host_tree_1.FilterHostTree(tree, predicate);
        }
        else {
            throw new exception_1.SchematicsException('Tree type is not supported.');
        }
    });
}
exports.filter = filter;
function asSource(rule) {
    return apply(empty(), [rule]);
}
exports.asSource = asSource;
function branchAndMerge(rule, strategy = interface_1.MergeStrategy.Default) {
    return (tree, context) => {
        const branchedTree = static_1.branch(tree);
        return call_1.callRule(rule, rxjs_1.of(branchedTree), context)
            .pipe(operators_1.last(), operators_1.map(t => static_1.merge(tree, t, strategy)));
    };
}
exports.branchAndMerge = branchAndMerge;
function when(predicate, operator) {
    return (entry) => {
        if (predicate(entry.path, entry)) {
            return operator(entry);
        }
        else {
            return entry;
        }
    };
}
exports.when = when;
function partitionApplyMerge(predicate, ruleYes, ruleNo) {
    return (tree, context) => {
        const [yes, no] = static_1.partition(tree, predicate);
        if (!ruleNo) {
            // Shortcut.
            return call_1.callRule(ruleYes, rxjs_1.of(static_1.partition(tree, predicate)[0]), context)
                .pipe(operators_1.map(yesTree => static_1.merge(yesTree, no, context.strategy)));
        }
        return call_1.callRule(ruleYes, rxjs_1.of(yes), context)
            .pipe(operators_1.concatMap(yesTree => {
            return call_1.callRule(ruleNo, rxjs_1.of(no), context)
                .pipe(operators_1.map(noTree => static_1.merge(yesTree, noTree, context.strategy)));
        }));
    };
}
exports.partitionApplyMerge = partitionApplyMerge;
function forEach(operator) {
    return (tree) => {
        tree.visit((path, entry) => {
            if (!entry) {
                return;
            }
            const newEntry = operator(entry);
            if (newEntry === entry) {
                return;
            }
            if (newEntry === null) {
                tree.delete(path);
                return;
            }
            if (newEntry.path != path) {
                tree.rename(path, newEntry.path);
            }
            if (!newEntry.content.equals(entry.content)) {
                tree.overwrite(newEntry.path, newEntry.content);
            }
        });
        return tree;
    };
}
exports.forEach = forEach;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvcnVsZXMvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtCQUFzRDtBQUN0RCw4Q0FBc0Q7QUFFdEQsc0RBQTZEO0FBQzdELCtDQUFnRDtBQUNoRCxpREFBNkQ7QUFDN0QsaURBQWtGO0FBQ2xGLDJDQU13QjtBQUN4Qiw2Q0FBOEM7QUFDOUMsaUNBQThDO0FBRzlDOztHQUVHO0FBQ0gsZ0JBQXVCLElBQVU7SUFDL0IsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7QUFDcEIsQ0FBQztBQUZELHdCQUVDO0FBR0Q7O0dBRUc7QUFDSDtJQUNFLE9BQU8sR0FBRyxFQUFFLENBQUMsY0FBVyxFQUFFLENBQUM7QUFDN0IsQ0FBQztBQUZELHNCQUVDO0FBR0Q7O0dBRUc7QUFDSCxlQUFzQixLQUFhO0lBQ2pDLE9BQU8sQ0FBQyxJQUFVLEVBQUUsT0FBeUIsRUFBRSxFQUFFO1FBQy9DLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQXFCLEVBQUUsSUFBVSxFQUFFLEVBQUU7WUFDeEQsT0FBTyxlQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQUUsU0FBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQU5ELHNCQU1DO0FBR0Q7O0dBRUc7QUFDSCxlQUFzQixNQUFjLEVBQUUsS0FBYTtJQUNqRCxPQUFPLENBQUMsT0FBeUIsRUFBRSxFQUFFO1FBQ25DLE9BQU8sZUFBUSxDQUFDLEtBQUssQ0FBQztZQUNwQixHQUFHLEtBQUs7WUFDUiw0RkFBNEY7WUFDNUYsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxFQUFFO2dCQUNMLElBQUksSUFBSSxZQUFZLHFCQUFXLEVBQUU7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QVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxJQUFJLFFBQVEsS0FBSyxLQUFLLEVBQUU7Z0JBQ3RCLE9BQU87YUFDUjtZQUNELElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbEIsT0FBTzthQUNSO1lBQ0QsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNqRDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUM7QUFDSixDQUFDO0FBekJELDBCQXlCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY29uY2F0TWFwLCBsYXN0LCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBGaWxlT3BlcmF0b3IsIFJ1bGUsIFNjaGVtYXRpY0NvbnRleHQsIFNvdXJjZSB9IGZyb20gJy4uL2VuZ2luZS9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2NoZW1hdGljc0V4Y2VwdGlvbiB9IGZyb20gJy4uL2V4Y2VwdGlvbi9leGNlcHRpb24nO1xuaW1wb3J0IHsgRmlsdGVyZWRUcmVlIH0gZnJvbSAnLi4vdHJlZS9maWx0ZXJlZCc7XG5pbXBvcnQgeyBGaWx0ZXJIb3N0VHJlZSwgSG9zdFRyZWUgfSBmcm9tICcuLi90cmVlL2hvc3QtdHJlZSc7XG5pbXBvcnQgeyBGaWxlRW50cnksIEZpbGVQcmVkaWNhdGUsIE1lcmdlU3RyYXRlZ3ksIFRyZWUgfSBmcm9tICcuLi90cmVlL2ludGVyZmFjZSc7XG5pbXBvcnQge1xuICBicmFuY2gsXG4gIGVtcHR5IGFzIHN0YXRpY0VtcHR5LFxuICBtZXJnZSBhcyBzdGF0aWNNZXJnZSxcbiAgb3B0aW1pemUgYXMgc3RhdGljT3B0aW1pemUsXG4gIHBhcnRpdGlvbiBhcyBzdGF0aWNQYXJ0aXRpb24sXG59IGZyb20gJy4uL3RyZWUvc3RhdGljJztcbmltcG9ydCB7IFZpcnR1YWxUcmVlIH0gZnJvbSAnLi4vdHJlZS92aXJ0dWFsJztcbmltcG9ydCB7IGNhbGxSdWxlLCBjYWxsU291cmNlIH0gZnJvbSAnLi9jYWxsJztcblxuXG4vKipcbiAqIEEgU291cmNlIHRoYXQgcmV0dXJucyBhbiB0cmVlIGFzIGl0cyBzaW5nbGUgdmFsdWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3VyY2UodHJlZTogVHJlZSk6IFNvdXJjZSB7XG4gIHJldHVybiAoKSA9PiB0cmVlO1xufVxuXG5cbi8qKlxuICogQSBzb3VyY2UgdGhhdCByZXR1cm5zIGFuIGVtcHR5IHRyZWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbXB0eSgpOiBTb3VyY2Uge1xuICByZXR1cm4gKCkgPT4gc3RhdGljRW1wdHkoKTtcbn1cblxuXG4vKipcbiAqIENoYWluIG11bHRpcGxlIHJ1bGVzIGludG8gYSBzaW5nbGUgcnVsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoYWluKHJ1bGVzOiBSdWxlW10pOiBSdWxlIHtcbiAgcmV0dXJuICh0cmVlOiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgcmV0dXJuIHJ1bGVzLnJlZHVjZSgoYWNjOiBPYnNlcnZhYmxlPFRyZWU+LCBjdXJyOiBSdWxlKSA9PiB7XG4gICAgICByZXR1cm4gY2FsbFJ1bGUoY3VyciwgYWNjLCBjb250ZXh0KTtcbiAgICB9LCBvYnNlcnZhYmxlT2YodHJlZSkpO1xuICB9O1xufVxuXG5cbi8qKlxuICogQXBwbHkgbXVsdGlwbGUgcnVsZXMgdG8gYSBzb3VyY2UsIGFuZCByZXR1cm5zIHRoZSBzb3VyY2UgdHJhbnNmb3JtZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseShzb3VyY2U6IFNvdXJjZSwgcnVsZXM6IFJ1bGVbXSk6IFNvdXJjZSB7XG4gIHJldHVybiAoY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIHJldHVybiBjYWxsUnVsZShjaGFpbihbXG4gICAgICAuLi5ydWxlcyxcbiAgICAgIC8vIE9wdGltaXplIHRoZSB0cmVlLiBTaW5jZSB0aGlzIGlzIGEgc291cmNlIHRyZWUsIHRoZXJlJ3Mgbm90IG11Y2ggaGFybSBoZXJlIGFuZCB0aGlzIG1pZ2h0XG4gICAgICAvLyBhdm9pZCBmdXJ0aGVyIGlzc3Vlcy5cbiAgICAgIHRyZWUgPT4ge1xuICAgICAgICBpZiAodHJlZSBpbnN0YW5jZW9mIFZpcnR1YWxUcmVlKSB7XG4gICAgICAgICAgdHJlZS5vcHRpbWl6ZSgpO1xuXG4gICAgICAgICAgcmV0dXJuIHRyZWU7XG4gICAgICAgIH0gZWxzZSBpZiAodHJlZS5hY3Rpb25zLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRpY09wdGltaXplKHRyZWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cmVlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIF0pLCBjYWxsU291cmNlKHNvdXJjZSwgY29udGV4dCksIGNvbnRleHQpO1xuICB9O1xufVxuXG5cbi8qKlxuICogTWVyZ2UgYW4gaW5wdXQgdHJlZSB3aXRoIHRoZSBzb3VyY2UgcGFzc2VkIGluLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VXaXRoKHNvdXJjZTogU291cmNlLCBzdHJhdGVneTogTWVyZ2VTdHJhdGVneSA9IE1lcmdlU3RyYXRlZ3kuRGVmYXVsdCk6IFJ1bGUge1xuICByZXR1cm4gKHRyZWU6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBjYWxsU291cmNlKHNvdXJjZSwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gcmVzdWx0LnBpcGUobWFwKG90aGVyID0+IHN0YXRpY01lcmdlKHRyZWUsIG90aGVyLCBzdHJhdGVneSB8fCBjb250ZXh0LnN0cmF0ZWd5KSkpO1xuICB9O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKCk6IFJ1bGUge1xuICByZXR1cm4gKHRyZWU6IFRyZWUsIF9jb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB0cmVlO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXIocHJlZGljYXRlOiBGaWxlUHJlZGljYXRlPGJvb2xlYW4+KTogUnVsZSB7XG4gIHJldHVybiAoKHRyZWU6IFRyZWUpID0+IHtcbiAgICAvLyBUT0RPOiBSZW1vdmUgVmlydHVhbFRyZWUgdXNhZ2UgaW4gNy4wXG4gICAgaWYgKFZpcnR1YWxUcmVlLmlzVmlydHVhbFRyZWUodHJlZSkpIHtcbiAgICAgIHJldHVybiBuZXcgRmlsdGVyZWRUcmVlKHRyZWUsIHByZWRpY2F0ZSk7XG4gICAgfSBlbHNlIGlmIChIb3N0VHJlZS5pc0hvc3RUcmVlKHRyZWUpKSB7XG4gICAgICByZXR1cm4gbmV3IEZpbHRlckhvc3RUcmVlKHRyZWUsIHByZWRpY2F0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKCdUcmVlIHR5cGUgaXMgbm90IHN1cHBvcnRlZC4nKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBhc1NvdXJjZShydWxlOiBSdWxlKTogU291cmNlIHtcbiAgcmV0dXJuIGFwcGx5KGVtcHR5KCksIFtydWxlXSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGJyYW5jaEFuZE1lcmdlKHJ1bGU6IFJ1bGUsIHN0cmF0ZWd5ID0gTWVyZ2VTdHJhdGVneS5EZWZhdWx0KTogUnVsZSB7XG4gIHJldHVybiAodHJlZTogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIGNvbnN0IGJyYW5jaGVkVHJlZSA9IGJyYW5jaCh0cmVlKTtcblxuICAgIHJldHVybiBjYWxsUnVsZShydWxlLCBvYnNlcnZhYmxlT2YoYnJhbmNoZWRUcmVlKSwgY29udGV4dClcbiAgICAgIC5waXBlKFxuICAgICAgICBsYXN0KCksXG4gICAgICAgIG1hcCh0ID0+IHN0YXRpY01lcmdlKHRyZWUsIHQsIHN0cmF0ZWd5KSksXG4gICAgICApO1xuICB9O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuKHByZWRpY2F0ZTogRmlsZVByZWRpY2F0ZTxib29sZWFuPiwgb3BlcmF0b3I6IEZpbGVPcGVyYXRvcik6IEZpbGVPcGVyYXRvciB7XG4gIHJldHVybiAoZW50cnk6IEZpbGVFbnRyeSkgPT4ge1xuICAgIGlmIChwcmVkaWNhdGUoZW50cnkucGF0aCwgZW50cnkpKSB7XG4gICAgICByZXR1cm4gb3BlcmF0b3IoZW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZW50cnk7XG4gICAgfVxuICB9O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJ0aXRpb25BcHBseU1lcmdlKFxuICBwcmVkaWNhdGU6IEZpbGVQcmVkaWNhdGU8Ym9vbGVhbj4sXG4gIHJ1bGVZZXM6IFJ1bGUsXG4gIHJ1bGVObz86IFJ1bGUsXG4pOiBSdWxlIHtcbiAgcmV0dXJuICh0cmVlOiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgY29uc3QgW3llcywgbm9dID0gc3RhdGljUGFydGl0aW9uKHRyZWUsIHByZWRpY2F0ZSk7XG5cbiAgICBpZiAoIXJ1bGVObykge1xuICAgICAgLy8gU2hvcnRjdXQuXG4gICAgICByZXR1cm4gY2FsbFJ1bGUocnVsZVllcywgb2JzZXJ2YWJsZU9mKHN0YXRpY1BhcnRpdGlvbih0cmVlLCBwcmVkaWNhdGUpWzBdKSwgY29udGV4dClcbiAgICAgICAgLnBpcGUobWFwKHllc1RyZWUgPT4gc3RhdGljTWVyZ2UoeWVzVHJlZSwgbm8sIGNvbnRleHQuc3RyYXRlZ3kpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbGxSdWxlKHJ1bGVZZXMsIG9ic2VydmFibGVPZih5ZXMpLCBjb250ZXh0KVxuICAgICAgLnBpcGUoY29uY2F0TWFwKHllc1RyZWUgPT4ge1xuICAgICAgICByZXR1cm4gY2FsbFJ1bGUocnVsZU5vLCBvYnNlcnZhYmxlT2Yobm8pLCBjb250ZXh0KVxuICAgICAgICAgIC5waXBlKG1hcChub1RyZWUgPT4gc3RhdGljTWVyZ2UoeWVzVHJlZSwgbm9UcmVlLCBjb250ZXh0LnN0cmF0ZWd5KSkpO1xuICAgICAgfSkpO1xuICB9O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoKG9wZXJhdG9yOiBGaWxlT3BlcmF0b3IpOiBSdWxlIHtcbiAgcmV0dXJuICh0cmVlOiBUcmVlKSA9PiB7XG4gICAgdHJlZS52aXNpdCgocGF0aCwgZW50cnkpID0+IHtcbiAgICAgIGlmICghZW50cnkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3RW50cnkgPSBvcGVyYXRvcihlbnRyeSk7XG4gICAgICBpZiAobmV3RW50cnkgPT09IGVudHJ5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChuZXdFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICB0cmVlLmRlbGV0ZShwYXRoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAobmV3RW50cnkucGF0aCAhPSBwYXRoKSB7XG4gICAgICAgIHRyZWUucmVuYW1lKHBhdGgsIG5ld0VudHJ5LnBhdGgpO1xuICAgICAgfVxuICAgICAgaWYgKCFuZXdFbnRyeS5jb250ZW50LmVxdWFscyhlbnRyeS5jb250ZW50KSkge1xuICAgICAgICB0cmVlLm92ZXJ3cml0ZShuZXdFbnRyeS5wYXRoLCBuZXdFbnRyeS5jb250ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0cmVlO1xuICB9O1xufVxuIl19