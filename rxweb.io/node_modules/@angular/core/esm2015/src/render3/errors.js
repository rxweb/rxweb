/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Called when directives inject each other (creating a circular dependency)
 * @param {?} token
 * @return {?}
 */
export function throwCyclicDependencyError(token) {
    throw new Error(`Cannot instantiate cyclic dependency! ${token}`);
}
/**
 * Called when there are multiple component selectors that match a given node
 * @param {?} tNode
 * @return {?}
 */
export function throwMultipleComponentError(tNode) {
    throw new Error(`Multiple components match node with tagname ${tNode.tagName}`);
}
/**
 * Throws an ExpressionChangedAfterChecked error if checkNoChanges mode is on.
 * @param {?} creationMode
 * @param {?} checkNoChangesMode
 * @param {?} oldValue
 * @param {?} currValue
 * @return {?}
 */
export function throwErrorIfNoChangesMode(creationMode, checkNoChangesMode, oldValue, currValue) {
    if (checkNoChangesMode) {
        /** @type {?} */
        let msg = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${oldValue}'. Current value: '${currValue}'.`;
        if (creationMode) {
            msg +=
                ` It seems like the view has been created after its parent and its children have been dirty checked.` +
                    ` Has it been created in a change detection hook ?`;
        }
        // TODO: include debug context
        throw new Error(msg);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0EsTUFBTSxxQ0FBcUMsS0FBVTtJQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0NBQ25FOzs7Ozs7QUFHRCxNQUFNLHNDQUFzQyxLQUFZO0lBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0NBQ2pGOzs7Ozs7Ozs7QUFHRCxNQUFNLG9DQUNGLFlBQXFCLEVBQUUsa0JBQTJCLEVBQUUsUUFBYSxFQUFFLFNBQWM7SUFDbkYsSUFBSSxrQkFBa0IsRUFBRTs7UUFDdEIsSUFBSSxHQUFHLEdBQ0gsOEdBQThHLFFBQVEsc0JBQXNCLFNBQVMsSUFBSSxDQUFDO1FBQzlKLElBQUksWUFBWSxFQUFFO1lBQ2hCLEdBQUc7Z0JBQ0MscUdBQXFHO29CQUNyRyxtREFBbUQsQ0FBQztTQUN6RDs7UUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3RCO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7VE5vZGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcblxuLyoqIENhbGxlZCB3aGVuIGRpcmVjdGl2ZXMgaW5qZWN0IGVhY2ggb3RoZXIgKGNyZWF0aW5nIGEgY2lyY3VsYXIgZGVwZW5kZW5jeSkgKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd0N5Y2xpY0RlcGVuZGVuY3lFcnJvcih0b2tlbjogYW55KTogbmV2ZXIge1xuICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBpbnN0YW50aWF0ZSBjeWNsaWMgZGVwZW5kZW5jeSEgJHt0b2tlbn1gKTtcbn1cblxuLyoqIENhbGxlZCB3aGVuIHRoZXJlIGFyZSBtdWx0aXBsZSBjb21wb25lbnQgc2VsZWN0b3JzIHRoYXQgbWF0Y2ggYSBnaXZlbiBub2RlICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dNdWx0aXBsZUNvbXBvbmVudEVycm9yKHROb2RlOiBUTm9kZSk6IG5ldmVyIHtcbiAgdGhyb3cgbmV3IEVycm9yKGBNdWx0aXBsZSBjb21wb25lbnRzIG1hdGNoIG5vZGUgd2l0aCB0YWduYW1lICR7dE5vZGUudGFnTmFtZX1gKTtcbn1cblxuLyoqIFRocm93cyBhbiBFeHByZXNzaW9uQ2hhbmdlZEFmdGVyQ2hlY2tlZCBlcnJvciBpZiBjaGVja05vQ2hhbmdlcyBtb2RlIGlzIG9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93RXJyb3JJZk5vQ2hhbmdlc01vZGUoXG4gICAgY3JlYXRpb25Nb2RlOiBib29sZWFuLCBjaGVja05vQ2hhbmdlc01vZGU6IGJvb2xlYW4sIG9sZFZhbHVlOiBhbnksIGN1cnJWYWx1ZTogYW55KTogbmV2ZXJ8dm9pZCB7XG4gIGlmIChjaGVja05vQ2hhbmdlc01vZGUpIHtcbiAgICBsZXQgbXNnID1cbiAgICAgICAgYEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3I6IEV4cHJlc3Npb24gaGFzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWQuIFByZXZpb3VzIHZhbHVlOiAnJHtvbGRWYWx1ZX0nLiBDdXJyZW50IHZhbHVlOiAnJHtjdXJyVmFsdWV9Jy5gO1xuICAgIGlmIChjcmVhdGlvbk1vZGUpIHtcbiAgICAgIG1zZyArPVxuICAgICAgICAgIGAgSXQgc2VlbXMgbGlrZSB0aGUgdmlldyBoYXMgYmVlbiBjcmVhdGVkIGFmdGVyIGl0cyBwYXJlbnQgYW5kIGl0cyBjaGlsZHJlbiBoYXZlIGJlZW4gZGlydHkgY2hlY2tlZC5gICtcbiAgICAgICAgICBgIEhhcyBpdCBiZWVuIGNyZWF0ZWQgaW4gYSBjaGFuZ2UgZGV0ZWN0aW9uIGhvb2sgP2A7XG4gICAgfVxuICAgIC8vIFRPRE86IGluY2x1ZGUgZGVidWcgY29udGV4dFxuICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICB9XG59XG4iXX0=