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
import { EventEmitter } from '../event_emitter';
import { getSymbolIterator } from '../util';
import { assertDefined, assertEqual } from './assert';
import { ReadFromInjectorFn, getOrCreateNodeInjectorForNode } from './di';
import { assertPreviousIsParent, getCurrentQueries, store, storeCleanupWithContext } from './instructions';
import { unusedValueExportToPlacateAjd as unused1 } from './interfaces/definition';
import { unusedValueExportToPlacateAjd as unused2 } from './interfaces/injector';
import { unusedValueExportToPlacateAjd as unused3 } from './interfaces/node';
import { unusedValueExportToPlacateAjd as unused4 } from './interfaces/query';
import { DIRECTIVES, TVIEW } from './interfaces/view';
import { flatten } from './util';
/** @type {?} */
const unusedValueToPlacateAjd = unused1 + unused2 + unused3 + unused4;
/**
 * A predicate which determines if a given element/directive should be included in the query
 * results.
 * @record
 * @template T
 */
export function QueryPredicate() { }
/**
 * If looking for directives then it contains the directive type.
 * @type {?}
 */
QueryPredicate.prototype.type;
/**
 * If selector then contains local names to query for.
 * @type {?}
 */
QueryPredicate.prototype.selector;
/**
 * Indicates which token should be read from DI for this query.
 * @type {?}
 */
QueryPredicate.prototype.read;
/**
 * An object representing a query, which is a combination of:
 * - query predicate to determines if a given element/directive should be included in the query
 * - values collected based on a predicate
 * - `QueryList` to which collected values should be reported
 * @record
 * @template T
 */
export function LQuery() { }
/**
 * Next query. Used when queries are stored as a linked list in `LQueries`.
 * @type {?}
 */
LQuery.prototype.next;
/**
 * Destination to which the value should be added.
 * @type {?}
 */
LQuery.prototype.list;
/**
 * A predicate which determines if a given element/directive should be included in the query
 * results.
 * @type {?}
 */
LQuery.prototype.predicate;
/**
 * Values which have been located.
 *
 * This is what builds up the `QueryList._valuesTree`.
 * @type {?}
 */
LQuery.prototype.values;
/**
 * A pointer to an array that stores collected values from views. This is necessary so we know a
 * container into which to insert nodes collected from views.
 * @type {?}
 */
LQuery.prototype.containerValues;
export class LQueries_ {
    /**
     * @param {?=} deep
     */
    constructor(deep) {
        this.shallow = null;
        this.deep = null;
        this.deep = deep == null ? null : deep;
    }
    /**
     * @template T
     * @param {?} queryList
     * @param {?} predicate
     * @param {?=} descend
     * @param {?=} read
     * @return {?}
     */
    track(queryList, predicate, descend, read) {
        if (descend) {
            this.deep = createQuery(this.deep, queryList, predicate, read != null ? read : null);
        }
        else {
            this.shallow = createQuery(this.shallow, queryList, predicate, read != null ? read : null);
        }
    }
    /**
     * @return {?}
     */
    clone() { return this.deep ? new LQueries_(this.deep) : null; }
    /**
     * @return {?}
     */
    child() {
        if (this.deep === null) {
            // if we don't have any deep queries then no need to track anything more.
            return null;
        }
        if (this.shallow === null) {
            // DeepQuery: We can reuse the current state if the child state would be same as current
            // state.
            return this;
        }
        else {
            // We need to create new state
            return new LQueries_(this.deep);
        }
    }
    /**
     * @return {?}
     */
    container() {
        /** @type {?} */
        let result = null;
        /** @type {?} */
        let query = this.deep;
        while (query) {
            /** @type {?} */
            const containerValues = []; // prepare room for views
            query.values.push(containerValues);
            /** @type {?} */
            const clonedQuery = {
                next: null,
                list: query.list,
                predicate: query.predicate,
                values: containerValues,
                containerValues: null
            };
            clonedQuery.next = result;
            result = clonedQuery;
            query = query.next;
        }
        return result ? new LQueries_(result) : null;
    }
    /**
     * @return {?}
     */
    createView() {
        /** @type {?} */
        let result = null;
        /** @type {?} */
        let query = this.deep;
        while (query) {
            /** @type {?} */
            const clonedQuery = {
                next: null,
                list: query.list,
                predicate: query.predicate,
                values: [],
                containerValues: query.values
            };
            clonedQuery.next = result;
            result = clonedQuery;
            query = query.next;
        }
        return result ? new LQueries_(result) : null;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    insertView(index) {
        /** @type {?} */
        let query = this.deep;
        while (query) {
            ngDevMode &&
                assertDefined(query.containerValues, 'View queries need to have a pointer to container values.'); /** @type {?} */
            ((query.containerValues)).splice(index, 0, query.values);
            query = query.next;
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    addNode(node) {
        add(this.shallow, node);
        add(this.deep, node);
    }
    /**
     * @return {?}
     */
    removeView() {
        /** @type {?} */
        let query = this.deep;
        while (query) {
            ngDevMode &&
                assertDefined(query.containerValues, 'View queries need to have a pointer to container values.');
            /** @type {?} */
            const containerValues = /** @type {?} */ ((query.containerValues));
            /** @type {?} */
            const viewValuesIdx = containerValues.indexOf(query.values);
            /** @type {?} */
            const removed = containerValues.splice(viewValuesIdx, 1);
            // mark a query as dirty only when removed view had matching modes
            ngDevMode && assertEqual(removed.length, 1, 'removed.length');
            if (removed[0].length) {
                query.list.setDirty();
            }
            query = query.next;
        }
    }
}
if (false) {
    /** @type {?} */
    LQueries_.prototype.shallow;
    /** @type {?} */
    LQueries_.prototype.deep;
}
/**
 * Iterates over local names for a given node and returns directive index
 * (or -1 if a local name points to an element).
 *
 * @param {?} tNode static data of a node to check
 * @param {?} selector selector to match
 * @return {?} directive index, -1 or null if a selector didn't match any of the local names
 */
function getIdxOfMatchingSelector(tNode, selector) {
    /** @type {?} */
    const localNames = tNode.localNames;
    if (localNames) {
        for (let i = 0; i < localNames.length; i += 2) {
            if (localNames[i] === selector) {
                return /** @type {?} */ (localNames[i + 1]);
            }
        }
    }
    return null;
}
/**
 * Iterates over all the directives for a node and returns index of a directive for a given type.
 *
 * @param {?} node Node on which directives are present.
 * @param {?} type Type of a directive to look for.
 * @return {?} Index of a found directive or null when none found.
 */
function getIdxOfMatchingDirective(node, type) {
    /** @type {?} */
    const defs = /** @type {?} */ ((node.view[TVIEW].directives));
    /** @type {?} */
    const flags = node.tNode.flags;
    /** @type {?} */
    const count = flags & 4095 /* DirectiveCountMask */;
    /** @type {?} */
    const start = flags >> 14 /* DirectiveStartingIndexShift */;
    /** @type {?} */
    const end = start + count;
    for (let i = start; i < end; i++) {
        /** @type {?} */
        const def = /** @type {?} */ (defs[i]);
        if (def.type === type && def.diPublic) {
            return i;
        }
    }
    return null;
}
/**
 * @param {?} nodeInjector
 * @param {?} node
 * @param {?} read
 * @param {?} directiveIdx
 * @return {?}
 */
function readFromNodeInjector(nodeInjector, node, read, directiveIdx) {
    if (read instanceof ReadFromInjectorFn) {
        return read.read(nodeInjector, node, directiveIdx);
    }
    else {
        /** @type {?} */
        const matchingIdx = getIdxOfMatchingDirective(node, /** @type {?} */ (read));
        if (matchingIdx !== null) {
            return /** @type {?} */ ((node.view[DIRECTIVES]))[matchingIdx];
        }
    }
    return null;
}
/**
 * @param {?} query
 * @param {?} node
 * @return {?}
 */
function add(query, node) {
    /** @type {?} */
    const nodeInjector = getOrCreateNodeInjectorForNode(/** @type {?} */ (node));
    while (query) {
        /** @type {?} */
        const predicate = query.predicate;
        /** @type {?} */
        const type = predicate.type;
        if (type) {
            /** @type {?} */
            const directiveIdx = getIdxOfMatchingDirective(node, type);
            if (directiveIdx !== null) {
                /** @type {?} */
                const result = readFromNodeInjector(nodeInjector, node, predicate.read || type, directiveIdx);
                if (result !== null) {
                    addMatch(query, result);
                }
            }
        }
        else {
            /** @type {?} */
            const selector = /** @type {?} */ ((predicate.selector));
            for (let i = 0; i < selector.length; i++) {
                /** @type {?} */
                const directiveIdx = getIdxOfMatchingSelector(node.tNode, selector[i]);
                if (directiveIdx !== null) {
                    // a node is matching a predicate - determine what to read
                    // note that queries using name selector must specify read strategy
                    ngDevMode && assertDefined(predicate.read, 'the node should have a predicate');
                    /** @type {?} */
                    const result = readFromNodeInjector(nodeInjector, node, /** @type {?} */ ((predicate.read)), directiveIdx);
                    if (result !== null) {
                        addMatch(query, result);
                    }
                }
            }
        }
        query = query.next;
    }
}
/**
 * @param {?} query
 * @param {?} matchingValue
 * @return {?}
 */
function addMatch(query, matchingValue) {
    query.values.push(matchingValue);
    query.list.setDirty();
}
/**
 * @template T
 * @param {?} predicate
 * @param {?} read
 * @return {?}
 */
function createPredicate(predicate, read) {
    /** @type {?} */
    const isArray = Array.isArray(predicate);
    return {
        type: isArray ? null : /** @type {?} */ (predicate),
        selector: isArray ? /** @type {?} */ (predicate) : null,
        read: read
    };
}
/**
 * @template T
 * @param {?} previous
 * @param {?} queryList
 * @param {?} predicate
 * @param {?} read
 * @return {?}
 */
function createQuery(previous, queryList, predicate, read) {
    return {
        next: previous,
        list: queryList,
        predicate: createPredicate(predicate, read),
        values: (/** @type {?} */ ((queryList)))._valuesTree,
        containerValues: null
    };
}
/**
 * @template T
 */
class QueryList_ {
    constructor() {
        this.dirty = true;
        this.changes = new EventEmitter();
        this._values = [];
        /**
         * \@internal
         */
        this._valuesTree = [];
    }
    /**
     * @return {?}
     */
    get length() { return this._values.length; }
    /**
     * @return {?}
     */
    get first() {
        /** @type {?} */
        let values = this._values;
        return values.length ? values[0] : null;
    }
    /**
     * @return {?}
     */
    get last() {
        /** @type {?} */
        let values = this._values;
        return values.length ? values[values.length - 1] : null;
    }
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     * @template U
     * @param {?} fn
     * @return {?}
     */
    map(fn) { return this._values.map(fn); }
    /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     * @param {?} fn
     * @return {?}
     */
    filter(fn) {
        return this._values.filter(fn);
    }
    /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     * @param {?} fn
     * @return {?}
     */
    find(fn) {
        return this._values.find(fn);
    }
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     * @template U
     * @param {?} fn
     * @param {?} init
     * @return {?}
     */
    reduce(fn, init) {
        return this._values.reduce(fn, init);
    }
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     * @param {?} fn
     * @return {?}
     */
    forEach(fn) { this._values.forEach(fn); }
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     * @param {?} fn
     * @return {?}
     */
    some(fn) {
        return this._values.some(fn);
    }
    /**
     * @return {?}
     */
    toArray() { return this._values.slice(0); }
    /**
     * @return {?}
     */
    [getSymbolIterator()]() { return (/** @type {?} */ (this._values))[getSymbolIterator()](); }
    /**
     * @return {?}
     */
    toString() { return this._values.toString(); }
    /**
     * @param {?} res
     * @return {?}
     */
    reset(res) {
        this._values = flatten(res);
        (/** @type {?} */ (this)).dirty = false;
    }
    /**
     * @return {?}
     */
    notifyOnChanges() { (/** @type {?} */ (this.changes)).emit(this); }
    /**
     * @return {?}
     */
    setDirty() { (/** @type {?} */ (this)).dirty = true; }
    /**
     * @return {?}
     */
    destroy() {
        (/** @type {?} */ (this.changes)).complete();
        (/** @type {?} */ (this.changes)).unsubscribe();
    }
}
if (false) {
    /** @type {?} */
    QueryList_.prototype.dirty;
    /** @type {?} */
    QueryList_.prototype.changes;
    /** @type {?} */
    QueryList_.prototype._values;
    /**
     * \@internal
     * @type {?}
     */
    QueryList_.prototype._valuesTree;
}
/** @type {?} */
export const QueryList = /** @type {?} */ (QueryList_);
/**
 * Creates and returns a QueryList.
 *
 * @template T
 * @param {?} memoryIndex The index in memory where the QueryList should be saved. If null,
 * this is is a content query and the QueryList will be saved later through directiveCreate.
 * @param {?} predicate The type for which the query will search
 * @param {?=} descend Whether or not to descend into children
 * @param {?=} read What to save in the query
 * @return {?} QueryList<T>
 */
export function query(memoryIndex, predicate, descend, read) {
    ngDevMode && assertPreviousIsParent();
    /** @type {?} */
    const queryList = new QueryList();
    /** @type {?} */
    const queries = getCurrentQueries(LQueries_);
    queries.track(queryList, predicate, descend, read);
    storeCleanupWithContext(null, queryList, queryList.destroy);
    if (memoryIndex != null) {
        store(memoryIndex, queryList);
    }
    return queryList;
}
/**
 * Refreshes a query by combining matches from all active views and removing matches from deleted
 * views.
 * Returns true if a query got dirty during change detection, false otherwise.
 * @param {?} queryList
 * @return {?}
 */
export function queryRefresh(queryList) {
    /** @type {?} */
    const queryListImpl = (/** @type {?} */ ((queryList)));
    if (queryList.dirty) {
        queryList.reset(queryListImpl._valuesTree);
        queryList.notifyOnChanges();
        return true;
    }
    return false;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBWUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRzlDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUUxQyxPQUFPLEVBQUMsYUFBYSxFQUFFLFdBQVcsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNwRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsOEJBQThCLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDeEUsT0FBTyxFQUFDLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3pHLE9BQU8sRUFBdUIsNkJBQTZCLElBQUksT0FBTyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkcsT0FBTyxFQUFZLDZCQUE2QixJQUFJLE9BQU8sRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFGLE9BQU8sRUFBeUQsNkJBQTZCLElBQUksT0FBTyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbkksT0FBTyxFQUEwQiw2QkFBNkIsSUFBSSxPQUFPLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRyxPQUFPLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxRQUFRLENBQUM7O0FBRS9CLE1BQU0sdUJBQXVCLEdBQUcsT0FBTyxHQUFHLE9BQU8sR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNER0RSxNQUFNOzs7O0lBSUosWUFBWSxJQUFrQjt1QkFIRixJ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QyxRQUFRLEVBQUUsQ0FBQztRQUMvQyxtQkFBQyxJQUFJLENBQUMsT0FBNEIsRUFBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ25EO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7OztBQUtELGFBQWEsU0FBUyxxQkFBZ0MsVUFBaUIsRUFBQzs7Ozs7Ozs7Ozs7O0FBWXhFLE1BQU0sZ0JBQ0YsV0FBMEIsRUFBRSxTQUE4QixFQUFFLE9BQWlCLEVBQzdFLElBQWdDO0lBQ2xDLFNBQVMsSUFBSSxzQkFBc0IsRUFBRSxDQUFDOztJQUN0QyxNQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBSyxDQUFDOztJQUNyQyxNQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ELHVCQUF1QixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVELElBQUksV0FBVyxJQUFJLElBQUksRUFBRTtRQUN2QixLQUFLLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxTQUFTLENBQUM7Q0FDbEI7Ozs7Ozs7O0FBT0QsTUFBTSx1QkFBdUIsU0FBeUI7O0lBQ3BELE1BQU0sYUFBYSxHQUFHLG9CQUFDLFNBQWdCLEdBQW9CLENBQUM7SUFDNUQsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFO1FBQ25CLFNBQVMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxLQUFLLENBQUM7Q0FDZCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gV2UgYXJlIHRlbXBvcmFyaWx5IGltcG9ydGluZyB0aGUgZXhpc3Rpbmcgdmlld0VuZ2luZV9mcm9tIGNvcmUgc28gd2UgY2FuIGJlIHN1cmUgd2UgYXJlXG4vLyBjb3JyZWN0bHkgaW1wbGVtZW50aW5nIGl0cyBpbnRlcmZhY2VzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICcuLi9ldmVudF9lbWl0dGVyJztcbmltcG9ydCB7UXVlcnlMaXN0IGFzIHZpZXdFbmdpbmVfUXVlcnlMaXN0fSBmcm9tICcuLi9saW5rZXIvcXVlcnlfbGlzdCc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtnZXRTeW1ib2xJdGVyYXRvcn0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7YXNzZXJ0RGVmaW5lZCwgYXNzZXJ0RXF1YWx9IGZyb20gJy4vYXNzZXJ0JztcbmltcG9ydCB7UmVhZEZyb21JbmplY3RvckZuLCBnZXRPckNyZWF0ZU5vZGVJbmplY3RvckZvck5vZGV9IGZyb20gJy4vZGknO1xuaW1wb3J0IHthc3NlcnRQcmV2aW91c0lzUGFyZW50LCBnZXRDdXJyZW50UXVlcmllcywgc3RvcmUsIHN0b3JlQ2xlYW51cFdpdGhDb250ZXh0fSBmcm9tICcuL2luc3RydWN0aW9ucyc7XG5pbXBvcnQge0RpcmVjdGl2ZURlZkludGVybmFsLCB1bnVzZWRWYWx1ZUV4cG9ydFRvUGxhY2F0ZUFqZCBhcyB1bnVzZWQxfSBmcm9tICcuL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5pbXBvcnQge0xJbmplY3RvciwgdW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgYXMgdW51c2VkMn0gZnJvbSAnLi9pbnRlcmZhY2VzL2luamVjdG9yJztcbmltcG9ydCB7TENvbnRhaW5lck5vZGUsIExFbGVtZW50Tm9kZSwgTE5vZGUsIFROb2RlLCBUTm9kZUZsYWdzLCB1bnVzZWRWYWx1ZUV4cG9ydFRvUGxhY2F0ZUFqZCBhcyB1bnVzZWQzfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge0xRdWVyaWVzLCBRdWVyeVJlYWRUeXBlLCB1bnVzZWRWYWx1ZUV4cG9ydFRvUGxhY2F0ZUFqZCBhcyB1bnVzZWQ0fSBmcm9tICcuL2ludGVyZmFjZXMvcXVlcnknO1xuaW1wb3J0IHtESVJFQ1RJVkVTLCBUVklFV30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtmbGF0dGVufSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCB1bnVzZWRWYWx1ZVRvUGxhY2F0ZUFqZCA9IHVudXNlZDEgKyB1bnVzZWQyICsgdW51c2VkMyArIHVudXNlZDQ7XG5cbi8qKlxuICogQSBwcmVkaWNhdGUgd2hpY2ggZGV0ZXJtaW5lcyBpZiBhIGdpdmVuIGVsZW1lbnQvZGlyZWN0aXZlIHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgcXVlcnlcbiAqIHJlc3VsdHMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnlQcmVkaWNhdGU8VD4ge1xuICAvKipcbiAgICogSWYgbG9va2luZyBmb3IgZGlyZWN0aXZlcyB0aGVuIGl0IGNvbnRhaW5zIHRoZSBkaXJlY3RpdmUgdHlwZS5cbiAgICovXG4gIHR5cGU6IFR5cGU8VD58bnVsbDtcblxuICAvKipcbiAgICogSWYgc2VsZWN0b3IgdGhlbiBjb250YWlucyBsb2NhbCBuYW1lcyB0byBxdWVyeSBmb3IuXG4gICAqL1xuICBzZWxlY3Rvcjogc3RyaW5nW118bnVsbDtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoaWNoIHRva2VuIHNob3VsZCBiZSByZWFkIGZyb20gREkgZm9yIHRoaXMgcXVlcnkuXG4gICAqL1xuICByZWFkOiBRdWVyeVJlYWRUeXBlPFQ+fFR5cGU8VD58bnVsbDtcbn1cblxuLyoqXG4gKiBBbiBvYmplY3QgcmVwcmVzZW50aW5nIGEgcXVlcnksIHdoaWNoIGlzIGEgY29tYmluYXRpb24gb2Y6XG4gKiAtIHF1ZXJ5IHByZWRpY2F0ZSB0byBkZXRlcm1pbmVzIGlmIGEgZ2l2ZW4gZWxlbWVudC9kaXJlY3RpdmUgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSBxdWVyeVxuICogLSB2YWx1ZXMgY29sbGVjdGVkIGJhc2VkIG9uIGEgcHJlZGljYXRlXG4gKiAtIGBRdWVyeUxpc3RgIHRvIHdoaWNoIGNvbGxlY3RlZCB2YWx1ZXMgc2hvdWxkIGJlIHJlcG9ydGVkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTFF1ZXJ5PFQ+IHtcbiAgLyoqXG4gICAqIE5leHQgcXVlcnkuIFVzZWQgd2hlbiBxdWVyaWVzIGFyZSBzdG9yZWQgYXMgYSBsaW5rZWQgbGlzdCBpbiBgTFF1ZXJpZXNgLlxuICAgKi9cbiAgbmV4dDogTFF1ZXJ5PGFueT58bnVsbDtcblxuICAvKipcbiAgICogRGVzdGluYXRpb24gdG8gd2hpY2ggdGhlIHZhbHVlIHNob3VsZCBiZSBhZGRlZC5cbiAgICovXG4gIGxpc3Q6IFF1ZXJ5TGlzdDxUPjtcblxuICAvKipcbiAgICogQSBwcmVkaWNhdGUgd2hpY2ggZGV0ZXJtaW5lcyBpZiBhIGdpdmVuIGVsZW1lbnQvZGlyZWN0aXZlIHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgcXVlcnlcbiAgICogcmVzdWx0cy5cbiAgICovXG4gIHByZWRpY2F0ZTogUXVlcnlQcmVkaWNhdGU8VD47XG5cbiAgLyoqXG4gICAqIFZhbHVlcyB3aGljaCBoYXZlIGJlZW4gbG9jYXRlZC5cbiAgICpcbiAgICogVGhpcyBpcyB3aGF0IGJ1aWxkcyB1cCB0aGUgYFF1ZXJ5TGlzdC5fdmFsdWVzVHJlZWAuXG4gICAqL1xuICB2YWx1ZXM6IGFueVtdO1xuXG4gIC8qKlxuICAgKiBBIHBvaW50ZXIgdG8gYW4gYXJyYXkgdGhhdCBzdG9yZXMgY29sbGVjdGVkIHZhbHVlcyBmcm9tIHZpZXdzLiBUaGlzIGlzIG5lY2Vzc2FyeSBzbyB3ZSBrbm93IGFcbiAgICogY29udGFpbmVyIGludG8gd2hpY2ggdG8gaW5zZXJ0IG5vZGVzIGNvbGxlY3RlZCBmcm9tIHZpZXdzLlxuICAgKi9cbiAgY29udGFpbmVyVmFsdWVzOiBhbnlbXXxudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgTFF1ZXJpZXNfIGltcGxlbWVudHMgTFF1ZXJpZXMge1xuICBzaGFsbG93OiBMUXVlcnk8YW55PnxudWxsID0gbnVsbDtcbiAgZGVlcDogTFF1ZXJ5PGFueT58bnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoZGVlcD86IExRdWVyeTxhbnk+KSB7IHRoaXMuZGVlcCA9IGRlZXAgPT0gbnVsbCA/IG51bGwgOiBkZWVwOyB9XG5cbiAgdHJhY2s8VD4oXG4gICAgICBxdWVyeUxpc3Q6IHZpZXdFbmdpbmVfUXVlcnlMaXN0PFQ+LCBwcmVkaWNhdGU6IFR5cGU8VD58c3RyaW5nW10sIGRlc2NlbmQ/OiBib29sZWFuLFxuICAgICAgcmVhZD86IFF1ZXJ5UmVhZFR5cGU8VD58VHlwZTxUPik6IHZvaWQge1xuICAgIGlmIChkZXNjZW5kKSB7XG4gICAgICB0aGlzLmRlZXAgPSBjcmVhdGVRdWVyeSh0aGlzLmRlZXAsIHF1ZXJ5TGlzdCwgcHJlZGljYXRlLCByZWFkICE9IG51bGwgPyByZWFkIDogbnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hhbGxvdyA9IGNyZWF0ZVF1ZXJ5KHRoaXMuc2hhbGxvdywgcXVlcnlMaXN0LCBwcmVkaWNhdGUsIHJlYWQgIT0gbnVsbCA/IHJlYWQgOiBudWxsKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZSgpOiBMUXVlcmllc3xudWxsIHsgcmV0dXJuIHRoaXMuZGVlcCA/IG5ldyBMUXVlcmllc18odGhpcy5kZWVwKSA6IG51bGw7IH1cblxuICBjaGlsZCgpOiBMUXVlcmllc3xudWxsIHtcbiAgICBpZiAodGhpcy5kZWVwID09PSBudWxsKSB7XG4gICAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIGFueSBkZWVwIHF1ZXJpZXMgdGhlbiBubyBuZWVkIHRvIHRyYWNrIGFueXRoaW5nIG1vcmUuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2hhbGxvdyA9PT0gbnVsbCkge1xuICAgICAgLy8gRGVlcFF1ZXJ5OiBXZSBjYW4gcmV1c2UgdGhlIGN1cnJlbnQgc3RhdGUgaWYgdGhlIGNoaWxkIHN0YXRlIHdvdWxkIGJlIHNhbWUgYXMgY3VycmVudFxuICAgICAgLy8gc3RhdGUuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2UgbmVlZCB0byBjcmVhdGUgbmV3IHN0YXRlXG4gICAgICByZXR1cm4gbmV3IExRdWVyaWVzXyh0aGlzLmRlZXApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnRhaW5lcigpOiBMUXVlcmllc3xudWxsIHtcbiAgICBsZXQgcmVzdWx0OiBMUXVlcnk8YW55PnxudWxsID0gbnVsbDtcbiAgICBsZXQgcXVlcnkgPSB0aGlzLmRlZXA7XG5cbiAgICB3aGlsZSAocXVlcnkpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lclZhbHVlczogYW55W10gPSBbXTsgIC8vIHByZXBhcmUgcm9vbSBmb3Igdmlld3NcbiAgICAgIHF1ZXJ5LnZhbHVlcy5wdXNoKGNvbnRhaW5lclZhbHVlcyk7XG4gICAgICBjb25zdCBjbG9uZWRRdWVyeTogTFF1ZXJ5PGFueT4gPSB7XG4gICAgICAgIG5leHQ6IG51bGwsXG4gICAgICAgIGxpc3Q6IHF1ZXJ5Lmxpc3QsXG4gICAgICAgIHByZWRpY2F0ZTogcXVlcnkucHJlZGljYXRlLFxuICAgICAgICB2YWx1ZXM6IGNvbnRhaW5lclZhbHVlcyxcbiAgICAgICAgY29udGFpbmVyVmFsdWVzOiBudWxsXG4gICAgICB9O1xuICAgICAgY2xvbmVkUXVlcnkubmV4dCA9IHJlc3VsdDtcbiAgICAgIHJlc3VsdCA9IGNsb25lZFF1ZXJ5O1xuICAgICAgcXVlcnkgPSBxdWVyeS5uZXh0O1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQgPyBuZXcgTFF1ZXJpZXNfKHJlc3VsdCkgOiBudWxsO1xuICB9XG5cbiAgY3JlYXRlVmlldygpOiBMUXVlcmllc3xudWxsIHtcbiAgICBsZXQgcmVzdWx0OiBMUXVlcnk8YW55PnxudWxsID0gbnVsbDtcbiAgICBsZXQgcXVlcnkgPSB0aGlzLmRlZXA7XG5cbiAgICB3aGlsZSAocXVlcnkpIHtcbiAgICAgIGNvbnN0IGNsb25lZFF1ZXJ5OiBMUXVlcnk8YW55PiA9IHtcbiAgICAgICAgbmV4dDogbnVsbCxcbiAgICAgICAgbGlzdDogcXVlcnkubGlzdCxcbiAgICAgICAgcHJlZGljYXRlOiBxdWVyeS5wcmVkaWNhdGUsXG4gICAgICAgIHZhbHVlczogW10sXG4gICAgICAgIGNvbnRhaW5lclZhbHVlczogcXVlcnkudmFsdWVzXG4gICAgICB9O1xuICAgICAgY2xvbmVkUXVlcnkubmV4dCA9IHJlc3VsdDtcbiAgICAgIHJlc3VsdCA9IGNsb25lZFF1ZXJ5O1xuICAgICAgcXVlcnkgPSBxdWVyeS5uZXh0O1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQgPyBuZXcgTFF1ZXJpZXNfKHJlc3VsdCkgOiBudWxsO1xuICB9XG5cbiAgaW5zZXJ0VmlldyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgbGV0IHF1ZXJ5ID0gdGhpcy5kZWVwO1xuICAgIHdoaWxlIChxdWVyeSkge1xuICAgICAgbmdEZXZNb2RlICYmXG4gICAgICAgICAgYXNzZXJ0RGVmaW5lZChcbiAgICAgICAgICAgICAgcXVlcnkuY29udGFpbmVyVmFsdWVzLCAnVmlldyBxdWVyaWVzIG5lZWQgdG8gaGF2ZSBhIHBvaW50ZXIgdG8gY29udGFpbmVyIHZhbHVlcy4nKTtcbiAgICAgIHF1ZXJ5LmNvbnRhaW5lclZhbHVlcyAhLnNwbGljZShpbmRleCwgMCwgcXVlcnkudmFsdWVzKTtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkubmV4dDtcbiAgICB9XG4gIH1cblxuICBhZGROb2RlKG5vZGU6IExOb2RlKTogdm9pZCB7XG4gICAgYWRkKHRoaXMuc2hhbGxvdywgbm9kZSk7XG4gICAgYWRkKHRoaXMuZGVlcCwgbm9kZSk7XG4gIH1cblxuICByZW1vdmVWaWV3KCk6IHZvaWQge1xuICAgIGxldCBxdWVyeSA9IHRoaXMuZGVlcDtcbiAgICB3aGlsZSAocXVlcnkpIHtcbiAgICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICAgIGFzc2VydERlZmluZWQoXG4gICAgICAgICAgICAgIHF1ZXJ5LmNvbnRhaW5lclZhbHVlcywgJ1ZpZXcgcXVlcmllcyBuZWVkIHRvIGhhdmUgYSBwb2ludGVyIHRvIGNvbnRhaW5lciB2YWx1ZXMuJyk7XG5cbiAgICAgIGNvbnN0IGNvbnRhaW5lclZhbHVlcyA9IHF1ZXJ5LmNvbnRhaW5lclZhbHVlcyAhO1xuICAgICAgY29uc3Qgdmlld1ZhbHVlc0lkeCA9IGNvbnRhaW5lclZhbHVlcy5pbmRleE9mKHF1ZXJ5LnZhbHVlcyk7XG4gICAgICBjb25zdCByZW1vdmVkID0gY29udGFpbmVyVmFsdWVzLnNwbGljZSh2aWV3VmFsdWVzSWR4LCAxKTtcblxuICAgICAgLy8gbWFyayBhIHF1ZXJ5IGFzIGRpcnR5IG9ubHkgd2hlbiByZW1vdmVkIHZpZXcgaGFkIG1hdGNoaW5nIG1vZGVzXG4gICAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RXF1YWwocmVtb3ZlZC5sZW5ndGgsIDEsICdyZW1vdmVkLmxlbmd0aCcpO1xuICAgICAgaWYgKHJlbW92ZWRbMF0ubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXJ5Lmxpc3Quc2V0RGlydHkoKTtcbiAgICAgIH1cblxuICAgICAgcXVlcnkgPSBxdWVyeS5uZXh0O1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgbG9jYWwgbmFtZXMgZm9yIGEgZ2l2ZW4gbm9kZSBhbmQgcmV0dXJucyBkaXJlY3RpdmUgaW5kZXhcbiAqIChvciAtMSBpZiBhIGxvY2FsIG5hbWUgcG9pbnRzIHRvIGFuIGVsZW1lbnQpLlxuICpcbiAqIEBwYXJhbSB0Tm9kZSBzdGF0aWMgZGF0YSBvZiBhIG5vZGUgdG8gY2hlY2tcbiAqIEBwYXJhbSBzZWxlY3RvciBzZWxlY3RvciB0byBtYXRjaFxuICogQHJldHVybnMgZGlyZWN0aXZlIGluZGV4LCAtMSBvciBudWxsIGlmIGEgc2VsZWN0b3IgZGlkbid0IG1hdGNoIGFueSBvZiB0aGUgbG9jYWwgbmFtZXNcbiAqL1xuZnVuY3Rpb24gZ2V0SWR4T2ZNYXRjaGluZ1NlbGVjdG9yKHROb2RlOiBUTm9kZSwgc2VsZWN0b3I6IHN0cmluZyk6IG51bWJlcnxudWxsIHtcbiAgY29uc3QgbG9jYWxOYW1lcyA9IHROb2RlLmxvY2FsTmFtZXM7XG4gIGlmIChsb2NhbE5hbWVzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbE5hbWVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICBpZiAobG9jYWxOYW1lc1tpXSA9PT0gc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsTmFtZXNbaSArIDFdIGFzIG51bWJlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBhbGwgdGhlIGRpcmVjdGl2ZXMgZm9yIGEgbm9kZSBhbmQgcmV0dXJucyBpbmRleCBvZiBhIGRpcmVjdGl2ZSBmb3IgYSBnaXZlbiB0eXBlLlxuICpcbiAqIEBwYXJhbSBub2RlIE5vZGUgb24gd2hpY2ggZGlyZWN0aXZlcyBhcmUgcHJlc2VudC5cbiAqIEBwYXJhbSB0eXBlIFR5cGUgb2YgYSBkaXJlY3RpdmUgdG8gbG9vayBmb3IuXG4gKiBAcmV0dXJucyBJbmRleCBvZiBhIGZvdW5kIGRpcmVjdGl2ZSBvciBudWxsIHdoZW4gbm9uZSBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gZ2V0SWR4T2ZNYXRjaGluZ0RpcmVjdGl2ZShub2RlOiBMTm9kZSwgdHlwZTogVHlwZTxhbnk+KTogbnVtYmVyfG51bGwge1xuICBjb25zdCBkZWZzID0gbm9kZS52aWV3W1RWSUVXXS5kaXJlY3RpdmVzICE7XG4gIGNvbnN0IGZsYWdzID0gbm9kZS50Tm9kZS5mbGFncztcbiAgY29uc3QgY291bnQgPSBmbGFncyAmIFROb2RlRmxhZ3MuRGlyZWN0aXZlQ291bnRNYXNrO1xuICBjb25zdCBzdGFydCA9IGZsYWdzID4+IFROb2RlRmxhZ3MuRGlyZWN0aXZlU3RhcnRpbmdJbmRleFNoaWZ0O1xuICBjb25zdCBlbmQgPSBzdGFydCArIGNvdW50O1xuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIGNvbnN0IGRlZiA9IGRlZnNbaV0gYXMgRGlyZWN0aXZlRGVmSW50ZXJuYWw8YW55PjtcbiAgICBpZiAoZGVmLnR5cGUgPT09IHR5cGUgJiYgZGVmLmRpUHVibGljKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHJlYWRGcm9tTm9kZUluamVjdG9yKFxuICAgIG5vZGVJbmplY3RvcjogTEluamVjdG9yLCBub2RlOiBMTm9kZSwgcmVhZDogUXVlcnlSZWFkVHlwZTxhbnk+fCBUeXBlPGFueT4sXG4gICAgZGlyZWN0aXZlSWR4OiBudW1iZXIpOiBhbnkge1xuICBpZiAocmVhZCBpbnN0YW5jZW9mIFJlYWRGcm9tSW5qZWN0b3JGbikge1xuICAgIHJldHVybiByZWFkLnJlYWQobm9kZUluamVjdG9yLCBub2RlLCBkaXJlY3RpdmVJZHgpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG1hdGNoaW5nSWR4ID0gZ2V0SWR4T2ZNYXRjaGluZ0RpcmVjdGl2ZShub2RlLCByZWFkIGFzIFR5cGU8YW55Pik7XG4gICAgaWYgKG1hdGNoaW5nSWR4ICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbm9kZS52aWV3W0RJUkVDVElWRVNdICFbbWF0Y2hpbmdJZHhdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gYWRkKHF1ZXJ5OiBMUXVlcnk8YW55PnwgbnVsbCwgbm9kZTogTE5vZGUpIHtcbiAgY29uc3Qgbm9kZUluamVjdG9yID0gZ2V0T3JDcmVhdGVOb2RlSW5qZWN0b3JGb3JOb2RlKG5vZGUgYXMgTEVsZW1lbnROb2RlIHwgTENvbnRhaW5lck5vZGUpO1xuICB3aGlsZSAocXVlcnkpIHtcbiAgICBjb25zdCBwcmVkaWNhdGUgPSBxdWVyeS5wcmVkaWNhdGU7XG4gICAgY29uc3QgdHlwZSA9IHByZWRpY2F0ZS50eXBlO1xuICAgIGlmICh0eXBlKSB7XG4gICAgICBjb25zdCBkaXJlY3RpdmVJZHggPSBnZXRJZHhPZk1hdGNoaW5nRGlyZWN0aXZlKG5vZGUsIHR5cGUpO1xuICAgICAgaWYgKGRpcmVjdGl2ZUlkeCAhPT0gbnVsbCkge1xuICAgICAgICAvLyBhIG5vZGUgaXMgbWF0Y2hpbmcgYSBwcmVkaWNhdGUgLSBkZXRlcm1pbmUgd2hhdCB0byByZWFkXG4gICAgICAgIC8vIGlmIHJlYWQgdG9rZW4gYW5kIC8gb3Igc3RyYXRlZ3kgaXMgbm90IHNwZWNpZmllZCwgdXNlIHR5cGUgYXMgcmVhZCB0b2tlblxuICAgICAgICBjb25zdCByZXN1bHQgPVxuICAgICAgICAgICAgcmVhZEZyb21Ob2RlSW5qZWN0b3Iobm9kZUluamVjdG9yLCBub2RlLCBwcmVkaWNhdGUucmVhZCB8fCB0eXBlLCBkaXJlY3RpdmVJZHgpO1xuICAgICAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICAgICAgYWRkTWF0Y2gocXVlcnksIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBwcmVkaWNhdGUuc2VsZWN0b3IgITtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGlyZWN0aXZlSWR4ID0gZ2V0SWR4T2ZNYXRjaGluZ1NlbGVjdG9yKG5vZGUudE5vZGUsIHNlbGVjdG9yW2ldKTtcbiAgICAgICAgaWYgKGRpcmVjdGl2ZUlkeCAhPT0gbnVsbCkge1xuICAgICAgICAgIC8vIGEgbm9kZSBpcyBtYXRjaGluZyBhIHByZWRpY2F0ZSAtIGRldGVybWluZSB3aGF0IHRvIHJlYWRcbiAgICAgICAgICAvLyBub3RlIHRoYXQgcXVlcmllcyB1c2luZyBuYW1lIHNlbGVjdG9yIG11c3Qgc3BlY2lmeSByZWFkIHN0cmF0ZWd5XG4gICAgICAgICAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQocHJlZGljYXRlLnJlYWQsICd0aGUgbm9kZSBzaG91bGQgaGF2ZSBhIHByZWRpY2F0ZScpO1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlYWRGcm9tTm9kZUluamVjdG9yKG5vZGVJbmplY3Rvciwgbm9kZSwgcHJlZGljYXRlLnJlYWQgISwgZGlyZWN0aXZlSWR4KTtcbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBhZGRNYXRjaChxdWVyeSwgcmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcXVlcnkgPSBxdWVyeS5uZXh0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZE1hdGNoKHF1ZXJ5OiBMUXVlcnk8YW55PiwgbWF0Y2hpbmdWYWx1ZTogYW55KTogdm9pZCB7XG4gIHF1ZXJ5LnZhbHVlcy5wdXNoKG1hdGNoaW5nVmFsdWUpO1xuICBxdWVyeS5saXN0LnNldERpcnR5KCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByZWRpY2F0ZTxUPihcbiAgICBwcmVkaWNhdGU6IFR5cGU8VD58IHN0cmluZ1tdLCByZWFkOiBRdWVyeVJlYWRUeXBlPFQ+fCBUeXBlPFQ+fCBudWxsKTogUXVlcnlQcmVkaWNhdGU8VD4ge1xuICBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShwcmVkaWNhdGUpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGlzQXJyYXkgPyBudWxsIDogcHJlZGljYXRlIGFzIFR5cGU8VD4sXG4gICAgc2VsZWN0b3I6IGlzQXJyYXkgPyBwcmVkaWNhdGUgYXMgc3RyaW5nW10gOiBudWxsLFxuICAgIHJlYWQ6IHJlYWRcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUXVlcnk8VD4oXG4gICAgcHJldmlvdXM6IExRdWVyeTxhbnk+fCBudWxsLCBxdWVyeUxpc3Q6IFF1ZXJ5TGlzdDxUPiwgcHJlZGljYXRlOiBUeXBlPFQ+fCBzdHJpbmdbXSxcbiAgICByZWFkOiBRdWVyeVJlYWRUeXBlPFQ+fCBUeXBlPFQ+fCBudWxsKTogTFF1ZXJ5PFQ+IHtcbiAgcmV0dXJuIHtcbiAgICBuZXh0OiBwcmV2aW91cyxcbiAgICBsaXN0OiBxdWVyeUxpc3QsXG4gICAgcHJlZGljYXRlOiBjcmVhdGVQcmVkaWNhdGUocHJlZGljYXRlLCByZWFkKSxcbiAgICB2YWx1ZXM6IChxdWVyeUxpc3QgYXMgYW55IGFzIFF1ZXJ5TGlzdF88VD4pLl92YWx1ZXNUcmVlLFxuICAgIGNvbnRhaW5lclZhbHVlczogbnVsbFxuICB9O1xufVxuXG5jbGFzcyBRdWVyeUxpc3RfPFQ+LyogaW1wbGVtZW50cyB2aWV3RW5naW5lX1F1ZXJ5TGlzdDxUPiAqLyB7XG4gIHJlYWRvbmx5IGRpcnR5ID0gdHJ1ZTtcbiAgcmVhZG9ubHkgY2hhbmdlczogT2JzZXJ2YWJsZTxUPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSBfdmFsdWVzOiBUW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdmFsdWVzVHJlZTogYW55W10gPSBbXTtcblxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl92YWx1ZXMubGVuZ3RoOyB9XG5cbiAgZ2V0IGZpcnN0KCk6IFR8bnVsbCB7XG4gICAgbGV0IHZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcbiAgICByZXR1cm4gdmFsdWVzLmxlbmd0aCA/IHZhbHVlc1swXSA6IG51bGw7XG4gIH1cblxuICBnZXQgbGFzdCgpOiBUfG51bGwge1xuICAgIGxldCB2YWx1ZXMgPSB0aGlzLl92YWx1ZXM7XG4gICAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPyB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWVcbiAgICogW0FycmF5Lm1hcF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvbWFwKVxuICAgKi9cbiAgbWFwPFU+KGZuOiAoaXRlbTogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFRbXSkgPT4gVSk6IFVbXSB7IHJldHVybiB0aGlzLl92YWx1ZXMubWFwKGZuKTsgfVxuXG4gIC8qKlxuICAgKiBTZWVcbiAgICogW0FycmF5LmZpbHRlcl0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyKVxuICAgKi9cbiAgZmlsdGVyKGZuOiAoaXRlbTogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFRbXSkgPT4gYm9vbGVhbik6IFRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlcy5maWx0ZXIoZm4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlZVxuICAgKiBbQXJyYXkuZmluZF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmluZClcbiAgICovXG4gIGZpbmQoZm46IChpdGVtOiBULCBpbmRleDogbnVtYmVyLCBhcnJheTogVFtdKSA9PiBib29sZWFuKTogVHx1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZXMuZmluZChmbik7XG4gIH1cblxuICAvKipcbiAgICogU2VlXG4gICAqIFtBcnJheS5yZWR1Y2VdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZSlcbiAgICovXG4gIHJlZHVjZTxVPihmbjogKHByZXZWYWx1ZTogVSwgY3VyVmFsdWU6IFQsIGN1ckluZGV4OiBudW1iZXIsIGFycmF5OiBUW10pID0+IFUsIGluaXQ6IFUpOiBVIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVzLnJlZHVjZShmbiwgaW5pdCk7XG4gIH1cblxuICAvKipcbiAgICogU2VlXG4gICAqIFtBcnJheS5mb3JFYWNoXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9mb3JFYWNoKVxuICAgKi9cbiAgZm9yRWFjaChmbjogKGl0ZW06IFQsIGluZGV4OiBudW1iZXIsIGFycmF5OiBUW10pID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fdmFsdWVzLmZvckVhY2goZm4pOyB9XG5cbiAgLyoqXG4gICAqIFNlZVxuICAgKiBbQXJyYXkuc29tZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvc29tZSlcbiAgICovXG4gIHNvbWUoZm46ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFRbXSkgPT4gYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZXMuc29tZShmbik7XG4gIH1cblxuICB0b0FycmF5KCk6IFRbXSB7IHJldHVybiB0aGlzLl92YWx1ZXMuc2xpY2UoMCk7IH1cblxuICBbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTogSXRlcmF0b3I8VD4geyByZXR1cm4gKHRoaXMuX3ZhbHVlcyBhcyBhbnkpW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7IH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdmFsdWVzLnRvU3RyaW5nKCk7IH1cblxuICByZXNldChyZXM6IChhbnlbXXxUKVtdKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWVzID0gZmxhdHRlbihyZXMpO1xuICAgICh0aGlzIGFze2RpcnR5OiBib29sZWFufSkuZGlydHkgPSBmYWxzZTtcbiAgfVxuXG4gIG5vdGlmeU9uQ2hhbmdlcygpOiB2b2lkIHsgKHRoaXMuY2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8YW55PikuZW1pdCh0aGlzKTsgfVxuICBzZXREaXJ0eSgpOiB2b2lkIHsgKHRoaXMgYXN7ZGlydHk6IGJvb2xlYW59KS5kaXJ0eSA9IHRydWU7IH1cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAodGhpcy5jaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxhbnk+KS5jb21wbGV0ZSgpO1xuICAgICh0aGlzLmNoYW5nZXMgYXMgRXZlbnRFbWl0dGVyPGFueT4pLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuLy8gTk9URTogdGhpcyBoYWNrIGlzIGhlcmUgYmVjYXVzZSBJUXVlcnlMaXN0IGhhcyBwcml2YXRlIG1lbWJlcnMgYW5kIHRoZXJlZm9yZVxuLy8gaXQgY2FuJ3QgYmUgaW1wbGVtZW50ZWQgb25seSBleHRlbmRlZC5cbmV4cG9ydCB0eXBlIFF1ZXJ5TGlzdDxUPiA9IHZpZXdFbmdpbmVfUXVlcnlMaXN0PFQ+O1xuZXhwb3J0IGNvbnN0IFF1ZXJ5TGlzdDogdHlwZW9mIHZpZXdFbmdpbmVfUXVlcnlMaXN0ID0gUXVlcnlMaXN0XyBhcyBhbnk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIFF1ZXJ5TGlzdC5cbiAqXG4gKiBAcGFyYW0gbWVtb3J5SW5kZXggVGhlIGluZGV4IGluIG1lbW9yeSB3aGVyZSB0aGUgUXVlcnlMaXN0IHNob3VsZCBiZSBzYXZlZC4gSWYgbnVsbCxcbiAqIHRoaXMgaXMgaXMgYSBjb250ZW50IHF1ZXJ5IGFuZCB0aGUgUXVlcnlMaXN0IHdpbGwgYmUgc2F2ZWQgbGF0ZXIgdGhyb3VnaCBkaXJlY3RpdmVDcmVhdGUuXG4gKiBAcGFyYW0gcHJlZGljYXRlIFRoZSB0eXBlIGZvciB3aGljaCB0aGUgcXVlcnkgd2lsbCBzZWFyY2hcbiAqIEBwYXJhbSBkZXNjZW5kIFdoZXRoZXIgb3Igbm90IHRvIGRlc2NlbmQgaW50byBjaGlsZHJlblxuICogQHBhcmFtIHJlYWQgV2hhdCB0byBzYXZlIGluIHRoZSBxdWVyeVxuICogQHJldHVybnMgUXVlcnlMaXN0PFQ+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeTxUPihcbiAgICBtZW1vcnlJbmRleDogbnVtYmVyIHwgbnVsbCwgcHJlZGljYXRlOiBUeXBlPGFueT58IHN0cmluZ1tdLCBkZXNjZW5kPzogYm9vbGVhbixcbiAgICByZWFkPzogUXVlcnlSZWFkVHlwZTxUPnwgVHlwZTxUPik6IFF1ZXJ5TGlzdDxUPiB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRQcmV2aW91c0lzUGFyZW50KCk7XG4gIGNvbnN0IHF1ZXJ5TGlzdCA9IG5ldyBRdWVyeUxpc3Q8VD4oKTtcbiAgY29uc3QgcXVlcmllcyA9IGdldEN1cnJlbnRRdWVyaWVzKExRdWVyaWVzXyk7XG4gIHF1ZXJpZXMudHJhY2socXVlcnlMaXN0LCBwcmVkaWNhdGUsIGRlc2NlbmQsIHJlYWQpO1xuICBzdG9yZUNsZWFudXBXaXRoQ29udGV4dChudWxsLCBxdWVyeUxpc3QsIHF1ZXJ5TGlzdC5kZXN0cm95KTtcbiAgaWYgKG1lbW9yeUluZGV4ICE9IG51bGwpIHtcbiAgICBzdG9yZShtZW1vcnlJbmRleCwgcXVlcnlMaXN0KTtcbiAgfVxuICByZXR1cm4gcXVlcnlMaXN0O1xufVxuXG4vKipcbiAqIFJlZnJlc2hlcyBhIHF1ZXJ5IGJ5IGNvbWJpbmluZyBtYXRjaGVzIGZyb20gYWxsIGFjdGl2ZSB2aWV3cyBhbmQgcmVtb3ZpbmcgbWF0Y2hlcyBmcm9tIGRlbGV0ZWRcbiAqIHZpZXdzLlxuICogUmV0dXJucyB0cnVlIGlmIGEgcXVlcnkgZ290IGRpcnR5IGR1cmluZyBjaGFuZ2UgZGV0ZWN0aW9uLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVJlZnJlc2gocXVlcnlMaXN0OiBRdWVyeUxpc3Q8YW55Pik6IGJvb2xlYW4ge1xuICBjb25zdCBxdWVyeUxpc3RJbXBsID0gKHF1ZXJ5TGlzdCBhcyBhbnkgYXMgUXVlcnlMaXN0Xzxhbnk+KTtcbiAgaWYgKHF1ZXJ5TGlzdC5kaXJ0eSkge1xuICAgIHF1ZXJ5TGlzdC5yZXNldChxdWVyeUxpc3RJbXBsLl92YWx1ZXNUcmVlKTtcbiAgICBxdWVyeUxpc3Qubm90aWZ5T25DaGFuZ2VzKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19