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
/** @enum {number} */
const TNodeType = {
    Container: 0,
    Projection: 1,
    View: 2,
    Element: 3,
    ViewOrElement: 2,
};
export { TNodeType };
/** @enum {number} */
const TNodeFlags = {
    /** The number of directives on this node is encoded on the least significant bits */
    DirectiveCountMask: 4095,
    /** This bit is set if the node is a component */
    isComponent: 4096,
    /** This bit is set if the node has been projected */
    isProjected: 8192,
    /** The index of the first directive on this node is encoded on the most significant bits  */
    DirectiveStartingIndexShift: 14,
};
export { TNodeFlags };
/**
 * LNode is an internal data structure which is used for the incremental DOM algorithm.
 * The "L" stands for "Logical" to differentiate between `RNodes` (actual rendered DOM
 * node) and our logical representation of DOM nodes, `LNodes`.
 *
 * The data structure is optimized for speed and size.
 *
 * In order to be fast, all subtypes of `LNode` should have the same shape.
 * Because size of the `LNode` matters, many fields have multiple roles depending
 * on the `LNode` subtype.
 *
 * See: https://en.wikipedia.org/wiki/Inline_caching#Monomorphic_inline_caching
 *
 * NOTE: This is a private data structure and should not be exported by any of the
 * instructions.
 * @record
 */
export function LNode() { }
/**
 * The associated DOM node. Storing this allows us to:
 *  - append children to their element parents in the DOM (e.g. `parent.native.appendChild(...)`)
 *  - retrieve the sibling elements of text nodes whose creation / insertion has been delayed
 * @type {?}
 */
LNode.prototype.native;
/**
 * If regular LElementNode, then `data` will be null.
 * If LElementNode with component, then `data` contains LView.
 * If LViewNode, then `data` contains the LView.
 * If LContainerNode, then `data` contains LContainer.
 * If LProjectionNode, then `data` contains LProjection.
 * @type {?}
 */
LNode.prototype.data;
/**
 * Each node belongs to a view.
 *
 * When the injector is walking up a tree, it needs access to the `directives` (part of view).
 * @type {?}
 */
LNode.prototype.view;
/**
 * The injector associated with this node. Necessary for DI.
 * @type {?}
 */
LNode.prototype.nodeInjector;
/**
 * Optional set of queries that track query-related events for this node.
 *
 * If present the node creation/updates are reported to the `LQueries`.
 * @type {?}
 */
LNode.prototype.queries;
/**
 * Pointer to the corresponding TNode object, which stores static
 * data about this node.
 * @type {?}
 */
LNode.prototype.tNode;
/**
 * A pointer to an LContainerNode created by directives requesting ViewContainerRef
 * @type {?}
 */
LNode.prototype.dynamicLContainerNode;
/**
 * LNode representing an element.
 * @record
 */
export function LElementNode() { }
/**
 * The DOM element associated with this node.
 * @type {?}
 */
LElementNode.prototype.native;
/**
 * If Component then data has LView (light DOM)
 * @type {?}
 */
LElementNode.prototype.data;
/**
 * LNode representing a #text node.
 * @record
 */
export function LTextNode() { }
/**
 * The text node associated with this node.
 * @type {?}
 */
LTextNode.prototype.native;
/** @type {?} */
LTextNode.prototype.data;
/** @type {?} */
LTextNode.prototype.dynamicLContainerNode;
/**
 * Abstract node which contains root nodes of a view.
 * @record
 */
export function LViewNode() { }
/** @type {?} */
LViewNode.prototype.native;
/** @type {?} */
LViewNode.prototype.data;
/** @type {?} */
LViewNode.prototype.dynamicLContainerNode;
/**
 * Abstract node container which contains other views.
 * @record
 */
export function LContainerNode() { }
/** @type {?} */
LContainerNode.prototype.native;
/** @type {?} */
LContainerNode.prototype.data;
/**
 * @record
 */
export function LProjectionNode() { }
/** @type {?} */
LProjectionNode.prototype.native;
/** @type {?} */
LProjectionNode.prototype.data;
/** @type {?} */
LProjectionNode.prototype.dynamicLContainerNode;
/** @enum {number} */
const AttributeMarker = {
    /**
       * Marker indicates that the following 3 values in the attributes array are:
       * namespaceUri, attributeName, attributeValue
       * in that order.
       */
    NamespaceURI: 0,
    /**
       * This marker indicates that the following attribute names were extracted from bindings (ex.:
       * [foo]="exp") and / or event handlers (ex. (bar)="doSth()").
       * Taking the above bindings and outputs as an example an attributes array could look as follows:
       * ['class', 'fade in', AttributeMarker.SelectOnly, 'foo', 'bar']
       */
    SelectOnly: 1,
};
export { AttributeMarker };
/** @typedef {?} */
var TAttributes;
export { TAttributes };
/**
 * LNode binding data (flyweight) for a particular node that is shared between all templates
 * of a specific type.
 *
 * If a property is:
 *    - PropertyAliases: that property's data was generated and this is it
 *    - Null: that property's data was already generated and nothing was found.
 *    - Undefined: that property's data has not yet been generated
 *
 * see: https://en.wikipedia.org/wiki/Flyweight_pattern for more on the Flyweight pattern
 * @record
 */
export function TNode() { }
/**
 * The type of the TNode. See TNodeType.
 * @type {?}
 */
TNode.prototype.type;
/**
 * Index of the TNode in TView.data and corresponding LNode in LView.data.
 *
 * This is necessary to get from any TNode to its corresponding LNode when
 * traversing the node tree.
 *
 * If index is -1, this is a dynamically created container node or embedded view node.
 * @type {?}
 */
TNode.prototype.index;
/**
 * This number stores two values using its bits:
 *
 * - the number of directives on that node (first 12 bits)
 * - the starting index of the node's directives in the directives array (last 20 bits).
 *
 * These two values are necessary so DI can effectively search the directives associated
 * with a node without searching the whole directives array.
 * @type {?}
 */
TNode.prototype.flags;
/**
 * The tag name associated with this node.
 * @type {?}
 */
TNode.prototype.tagName;
/**
 * Attributes associated with an element. We need to store attributes to support various use-cases
 * (attribute injection, content projection with selectors, directives matching).
 * Attributes are stored statically because reading them from the DOM would be way too slow for
 * content projection and queries.
 *
 * Since attrs will always be calculated first, they will never need to be marked undefined by
 * other instructions.
 *
 * For regular attributes a name of an attribute and its value alternate in the array.
 * e.g. ['role', 'checkbox']
 * This array can contain flags that will indicate "special attributes" (attributes with
 * namespaces, attributes extracted from bindings and outputs).
 * @type {?}
 */
TNode.prototype.attrs;
/**
 * A set of local names under which a given element is exported in a template and
 * visible to queries. An entry in this array can be created for different reasons:
 * - an element itself is referenced, ex.: `<div #foo>`
 * - a component is referenced, ex.: `<my-cmpt #foo>`
 * - a directive is referenced, ex.: `<my-cmpt #foo="directiveExportAs">`.
 *
 * A given element might have different local names and those names can be associated
 * with a directive. We store local names at even indexes while odd indexes are reserved
 * for directive index in a view (or `-1` if there is no associated directive).
 *
 * Some examples:
 * - `<div #foo>` => `["foo", -1]`
 * - `<my-cmpt #foo>` => `["foo", myCmptIdx]`
 * - `<my-cmpt #foo #bar="directiveExportAs">` => `["foo", myCmptIdx, "bar", directiveIdx]`
 * - `<div #foo #bar="directiveExportAs">` => `["foo", -1, "bar", directiveIdx]`
 * @type {?}
 */
TNode.prototype.localNames;
/**
 * Information about input properties that need to be set once from attribute data.
 * @type {?}
 */
TNode.prototype.initialInputs;
/**
 * Input data for all directives on this node.
 *
 * - `undefined` means that the prop has not been initialized yet,
 * - `null` means that the prop has been initialized but no inputs have been found.
 * @type {?}
 */
TNode.prototype.inputs;
/**
 * Output data for all directives on this node.
 *
 * - `undefined` means that the prop has not been initialized yet,
 * - `null` means that the prop has been initialized but no outputs have been found.
 * @type {?}
 */
TNode.prototype.outputs;
/**
 * The TView or TViews attached to this node.
 *
 * If this TNode corresponds to an LContainerNode with inline views, the container will
 * need to store separate static data for each of its view blocks (TView[]). Otherwise,
 * nodes in inline views with the same index as nodes in their parent views will overwrite
 * each other, as they are in the same template.
 *
 * Each index in this array corresponds to the static data for a certain
 * view. So if you had V(0) and V(1) in a container, you might have:
 *
 * [
 *   [{tagName: 'div', attrs: ...}, null],     // V(0) TView
 *   [{tagName: 'button', attrs ...}, null]    // V(1) TView
 *
 * If this TNode corresponds to an LContainerNode with a template (e.g. structural
 * directive), the template's TView will be stored here.
 *
 * If this TNode corresponds to an LElementNode, tViews will be null .
 * @type {?}
 */
TNode.prototype.tViews;
/**
 * The next sibling node. Necessary so we can propagate through the root nodes of a view
 * to insert them or remove them from the DOM.
 * @type {?}
 */
TNode.prototype.next;
/**
 * First child of the current node.
 *
 * For component nodes, the child will always be a ContentChild (in same view).
 * For embedded view nodes, the child will be in their child view.
 * @type {?}
 */
TNode.prototype.child;
/**
 * Parent node (in the same view only).
 *
 * We need a reference to a node's parent so we can append the node to its parent's native
 * element at the appropriate time.
 *
 * If the parent would be in a different view (e.g. component host), this property will be null.
 * It's important that we don't try to cross component boundaries when retrieving the parent
 * because the parent will change (e.g. index, attrs) depending on where the component was
 * used (and thus shouldn't be stored on TNode). In these cases, we retrieve the parent through
 * LView.node instead (which will be instance-specific).
 *
 * If this is an inline view node (V), the parent will be its container.
 * @type {?}
 */
TNode.prototype.parent;
/**
 * A pointer to a TContainerNode created by directives requesting ViewContainerRef
 * @type {?}
 */
TNode.prototype.dynamicContainerNode;
/**
 * If this node is part of an i18n block, it indicates whether this container is part of the DOM
 * If this node is not part of an i18n block, this field is null.
 * @type {?}
 */
TNode.prototype.detached;
/** @type {?} */
TNode.prototype.stylingTemplate;
/**
 * List of projected TNodes for a given component host element OR index into the said nodes.
 *
 * For easier discussion assume this example:
 * `<parent>`'s view definition:
 * ```
 * <child id="c1">content1</child>
 * <child id="c2"><span>content2</span></child>
 * ```
 * `<child>`'s view definition:
 * ```
 * <ng-content id="cont1"></ng-content>
 * ```
 *
 * If `Array.isArray(projection)` then `TNode` is a host element:
 * - `projection` stores the content nodes which are to be projected.
 *    - The nodes represent categories defined by the selector: For example:
 *      `<ng-content/><ng-content select="abc"/>` would represent the heads for `<ng-content/>`
 *      and `<ng-content select="abc"/>` respectively.
 *    - The nodes we store in `projection` are heads only, we used `.next` to get their
 *      siblings.
 *    - The nodes `.next` is sorted/rewritten as part of the projection setup.
 *    - `projection` size is equal to the number of projections `<ng-content>`. The size of
 *      `c1` will be `1` because `<child>` has only one `<ng-content>`.
 * - we store `projection` with the host (`c1`, `c2`) rather than the `<ng-content>` (`cont1`)
 *   because the same component (`<child>`) can be used in multiple locations (`c1`, `c2`) and as
 *   a result have different set of nodes to project.
 * - without `projection` it would be difficult to efficiently traverse nodes to be projected.
 *
 * If `typeof projection == 'number'` then `TNode` is a `<ng-content>` element:
 * - `projection` is an index of the host's `projection`Nodes.
 *   - This would return the first head node to project:
 *     `getHost(currentTNode).projection[currentTNode.projection]`.
 * - When projecting nodes the parent node retrieved may be a `<ng-content>` node, in which case
 *   the process is recursive in nature (not implementation).
 * @type {?}
 */
TNode.prototype.projection;
/**
 * Static data for an LElementNode
 * @record
 */
export function TElementNode() { }
/**
 * Index in the data[] array
 * @type {?}
 */
TElementNode.prototype.index;
/** @type {?} */
TElementNode.prototype.child;
/**
 * Element nodes will have parents unless they are the first node of a component or
 * embedded view (which means their parent is in a different view and must be
 * retrieved using LView.node).
 * @type {?}
 */
TElementNode.prototype.parent;
/** @type {?} */
TElementNode.prototype.tViews;
/**
 * If this is a component TNode with projection, this will be an array of projected
 * TNodes (see TNode.projection for more info). If it's a regular element node or a
 * component without projection, it will be null.
 * @type {?}
 */
TElementNode.prototype.projection;
/**
 * Static data for an LTextNode
 * @record
 */
export function TTextNode() { }
/**
 * Index in the data[] array
 * @type {?}
 */
TTextNode.prototype.index;
/** @type {?} */
TTextNode.prototype.child;
/**
 * Text nodes will have parents unless they are the first node of a component or
 * embedded view (which means their parent is in a different view and must be
 * retrieved using LView.node).
 * @type {?}
 */
TTextNode.prototype.parent;
/** @type {?} */
TTextNode.prototype.tViews;
/** @type {?} */
TTextNode.prototype.projection;
/**
 * Static data for an LContainerNode
 * @record
 */
export function TContainerNode() { }
/**
 * Index in the data[] array.
 *
 * If it's -1, this is a dynamically created container node that isn't stored in
 * data[] (e.g. when you inject ViewContainerRef) .
 * @type {?}
 */
TContainerNode.prototype.index;
/** @type {?} */
TContainerNode.prototype.child;
/**
 * Container nodes will have parents unless:
 *
 * - They are the first node of a component or embedded view
 * - They are dynamically created
 * @type {?}
 */
TContainerNode.prototype.parent;
/** @type {?} */
TContainerNode.prototype.tViews;
/** @type {?} */
TContainerNode.prototype.projection;
/**
 * Static data for an LViewNode
 * @record
 */
export function TViewNode() { }
/**
 * If -1, it's a dynamically created view. Otherwise, it is the view block ID.
 * @type {?}
 */
TViewNode.prototype.index;
/** @type {?} */
TViewNode.prototype.child;
/** @type {?} */
TViewNode.prototype.parent;
/** @type {?} */
TViewNode.prototype.tViews;
/** @type {?} */
TViewNode.prototype.projection;
/**
 * Static data for an LProjectionNode
 * @record
 */
export function TProjectionNode() { }
/**
 * Index in the data[] array
 * @type {?}
 */
TProjectionNode.prototype.child;
/**
 * Projection nodes will have parents unless they are the first node of a component
 * or embedded view (which means their parent is in a different view and must be
 * retrieved using LView.node).
 * @type {?}
 */
TProjectionNode.prototype.parent;
/** @type {?} */
TProjectionNode.prototype.tViews;
/**
 * Index of the projection node. (See TNode.projection for more info.)
 * @type {?}
 */
TProjectionNode.prototype.projection;
/** @typedef {?} */
var PropertyAliases;
export { PropertyAliases };
/** @typedef {?} */
var PropertyAliasValue;
export { PropertyAliasValue };
/** @typedef {?} */
var InitialInputData;
export { InitialInputData };
/** @typedef {?} */
var InitialInputs;
export { InitialInputs };
/** @type {?} */
export const unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUF1QkUsWUFBZ0I7SUFDaEIsYUFBaUI7SUFDakIsT0FBVztJQUNYLFVBQWM7SUFDZCxnQkFBb0I7Ozs7OztJQVFwQix3QkFBdUQ7O0lBR3ZELGlCQUFnRDs7SUFHaEQsaUJBQWdEOztJQUdoRCwrQkFBZ0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEwSGhDLGVBQWdCOzs7Ozs7O0lBUWhCLGFBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRWaEIsYUFBYSw2QkFBNkIsR0FBRyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7U3R5bGluZ0NvbnRleHR9IGZyb20gJy4uL3N0eWxpbmcnO1xuXG5pbXBvcnQge0xDb250YWluZXJ9IGZyb20gJy4vY29udGFpbmVyJztcbmltcG9ydCB7TEluamVjdG9yfSBmcm9tICcuL2luamVjdG9yJztcbmltcG9ydCB7TFF1ZXJpZXN9IGZyb20gJy4vcXVlcnknO1xuaW1wb3J0IHtSQ29tbWVudCwgUkVsZW1lbnQsIFJUZXh0fSBmcm9tICcuL3JlbmRlcmVyJztcbmltcG9ydCB7TFZpZXdEYXRhLCBUVmlld30gZnJvbSAnLi92aWV3JztcblxuXG5cbi8qKlxuICogVE5vZGVUeXBlIGNvcnJlc3BvbmRzIHRvIHRoZSBUTm9kZS50eXBlIHByb3BlcnR5LiBJdCBjb250YWlucyBpbmZvcm1hdGlvblxuICogb24gaG93IHRvIG1hcCBhIHBhcnRpY3VsYXIgc2V0IG9mIGJpdHMgaW4gTE5vZGUuZmxhZ3MgdG8gdGhlIG5vZGUgdHlwZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gVE5vZGVUeXBlIHtcbiAgQ29udGFpbmVyID0gMGIwMCxcbiAgUHJvamVjdGlvbiA9IDBiMDEsXG4gIFZpZXcgPSAwYjEwLFxuICBFbGVtZW50ID0gMGIxMSxcbiAgVmlld09yRWxlbWVudCA9IDBiMTAsXG59XG5cbi8qKlxuICogQ29ycmVzcG9uZHMgdG8gdGhlIFROb2RlLmZsYWdzIHByb3BlcnR5LlxuICovXG5leHBvcnQgY29uc3QgZW51bSBUTm9kZUZsYWdzIHtcbiAgLyoqIFRoZSBudW1iZXIgb2YgZGlyZWN0aXZlcyBvbiB0aGlzIG5vZGUgaXMgZW5jb2RlZCBvbiB0aGUgbGVhc3Qgc2lnbmlmaWNhbnQgYml0cyAqL1xuICBEaXJlY3RpdmVDb3VudE1hc2sgPSAwYjAwMDAwMDAwMDAwMDAwMDAwMDAwMTExMTExMTExMTExLFxuXG4gIC8qKiBUaGlzIGJpdCBpcyBzZXQgaWYgdGhlIG5vZGUgaXMgYSBjb21wb25lbnQgKi9cbiAgaXNDb21wb25lbnQgPSAwYjAwMDAwMDAwMDAwMDAwMDAwMDAxMDAwMDAwMDAwMDAwLFxuXG4gIC8qKiBUaGlzIGJpdCBpcyBzZXQgaWYgdGhlIG5vZGUgaGFzIGJlZW4gcHJvamVjdGVkICovXG4gIGlzUHJvamVjdGVkID0gMGIwMDAwMDAwMDAwMDAwMDAwMDAxMDAwMDAwMDAwMDAwMCxcblxuICAvKiogVGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkaXJlY3RpdmUgb24gdGhpcyBub2RlIGlzIGVuY29kZWQgb24gdGhlIG1vc3Qgc2lnbmlmaWNhbnQgYml0cyAgKi9cbiAgRGlyZWN0aXZlU3RhcnRpbmdJbmRleFNoaWZ0ID0gMTQsXG59XG5cbi8qKlxuICogTE5vZGUgaXMgYW4gaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmUgd2hpY2ggaXMgdXNlZCBmb3IgdGhlIGluY3JlbWVudGFsIERPTSBhbGdvcml0aG0uXG4gKiBUaGUgXCJMXCIgc3RhbmRzIGZvciBcIkxvZ2ljYWxcIiB0byBkaWZmZXJlbnRpYXRlIGJldHdlZW4gYFJOb2Rlc2AgKGFjdHVhbCByZW5kZXJlZCBET01cbiAqIG5vZGUpIGFuZCBvdXIgbG9naWNhbCByZXByZXNlbnRhdGlvbiBvZiBET00gbm9kZXMsIGBMTm9kZXNgLlxuICpcbiAqIFRoZSBkYXRhIHN0cnVjdHVyZSBpcyBvcHRpbWl6ZWQgZm9yIHNwZWVkIGFuZCBzaXplLlxuICpcbiAqIEluIG9yZGVyIHRvIGJlIGZhc3QsIGFsbCBzdWJ0eXBlcyBvZiBgTE5vZGVgIHNob3VsZCBoYXZlIHRoZSBzYW1lIHNoYXBlLlxuICogQmVjYXVzZSBzaXplIG9mIHRoZSBgTE5vZGVgIG1hdHRlcnMsIG1hbnkgZmllbGRzIGhhdmUgbXVsdGlwbGUgcm9sZXMgZGVwZW5kaW5nXG4gKiBvbiB0aGUgYExOb2RlYCBzdWJ0eXBlLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSW5saW5lX2NhY2hpbmcjTW9ub21vcnBoaWNfaW5saW5lX2NhY2hpbmdcbiAqXG4gKiBOT1RFOiBUaGlzIGlzIGEgcHJpdmF0ZSBkYXRhIHN0cnVjdHVyZSBhbmQgc2hvdWxkIG5vdCBiZSBleHBvcnRlZCBieSBhbnkgb2YgdGhlXG4gKiBpbnN0cnVjdGlvbnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTE5vZGUge1xuICAvKipcbiAgICogVGhlIGFzc29jaWF0ZWQgRE9NIG5vZGUuIFN0b3JpbmcgdGhpcyBhbGxvd3MgdXMgdG86XG4gICAqICAtIGFwcGVuZCBjaGlsZHJlbiB0byB0aGVpciBlbGVtZW50IHBhcmVudHMgaW4gdGhlIERPTSAoZS5nLiBgcGFyZW50Lm5hdGl2ZS5hcHBlbmRDaGlsZCguLi4pYClcbiAgICogIC0gcmV0cmlldmUgdGhlIHNpYmxpbmcgZWxlbWVudHMgb2YgdGV4dCBub2RlcyB3aG9zZSBjcmVhdGlvbiAvIGluc2VydGlvbiBoYXMgYmVlbiBkZWxheWVkXG4gICAqL1xuICByZWFkb25seSBuYXRpdmU6IFJDb21tZW50fFJFbGVtZW50fFJUZXh0fG51bGw7XG5cbiAgLyoqXG4gICAqIElmIHJlZ3VsYXIgTEVsZW1lbnROb2RlLCB0aGVuIGBkYXRhYCB3aWxsIGJlIG51bGwuXG4gICAqIElmIExFbGVtZW50Tm9kZSB3aXRoIGNvbXBvbmVudCwgdGhlbiBgZGF0YWAgY29udGFpbnMgTFZpZXcuXG4gICAqIElmIExWaWV3Tm9kZSwgdGhlbiBgZGF0YWAgY29udGFpbnMgdGhlIExWaWV3LlxuICAgKiBJZiBMQ29udGFpbmVyTm9kZSwgdGhlbiBgZGF0YWAgY29udGFpbnMgTENvbnRhaW5lci5cbiAgICogSWYgTFByb2plY3Rpb25Ob2RlLCB0aGVuIGBkYXRhYCBjb250YWlucyBMUHJvamVjdGlvbi5cbiAgICovXG4gIHJlYWRvbmx5IGRhdGE6IExWaWV3RGF0YXxMQ29udGFpbmVyfG51bGw7XG5cblxuICAvKipcbiAgICogRWFjaCBub2RlIGJlbG9uZ3MgdG8gYSB2aWV3LlxuICAgKlxuICAgKiBXaGVuIHRoZSBpbmplY3RvciBpcyB3YWxraW5nIHVwIGEgdHJlZSwgaXQgbmVlZHMgYWNjZXNzIHRvIHRoZSBgZGlyZWN0aXZlc2AgKHBhcnQgb2YgdmlldykuXG4gICAqL1xuICByZWFkb25seSB2aWV3OiBMVmlld0RhdGE7XG5cbiAgLyoqIFRoZSBpbmplY3RvciBhc3NvY2lhdGVkIHdpdGggdGhpcyBub2RlLiBOZWNlc3NhcnkgZm9yIERJLiAqL1xuICBub2RlSW5qZWN0b3I6IExJbmplY3RvcnxudWxsO1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBzZXQgb2YgcXVlcmllcyB0aGF0IHRyYWNrIHF1ZXJ5LXJlbGF0ZWQgZXZlbnRzIGZvciB0aGlzIG5vZGUuXG4gICAqXG4gICAqIElmIHByZXNlbnQgdGhlIG5vZGUgY3JlYXRpb24vdXBkYXRlcyBhcmUgcmVwb3J0ZWQgdG8gdGhlIGBMUXVlcmllc2AuXG4gICAqL1xuICBxdWVyaWVzOiBMUXVlcmllc3xudWxsO1xuXG4gIC8qKlxuICAgKiBQb2ludGVyIHRvIHRoZSBjb3JyZXNwb25kaW5nIFROb2RlIG9iamVjdCwgd2hpY2ggc3RvcmVzIHN0YXRpY1xuICAgKiBkYXRhIGFib3V0IHRoaXMgbm9kZS5cbiAgICovXG4gIHROb2RlOiBUTm9kZTtcblxuICAvKipcbiAgICogQSBwb2ludGVyIHRvIGFuIExDb250YWluZXJOb2RlIGNyZWF0ZWQgYnkgZGlyZWN0aXZlcyByZXF1ZXN0aW5nIFZpZXdDb250YWluZXJSZWZcbiAgICovXG4gIC8vIFRPRE8oa2FyYSk6IFJlbW92ZSB3aGVuIHJlbW92aW5nIExOb2Rlc1xuICBkeW5hbWljTENvbnRhaW5lck5vZGU6IExDb250YWluZXJOb2RlfG51bGw7XG59XG5cblxuLyoqIExOb2RlIHJlcHJlc2VudGluZyBhbiBlbGVtZW50LiAqL1xuZXhwb3J0IGludGVyZmFjZSBMRWxlbWVudE5vZGUgZXh0ZW5kcyBMTm9kZSB7XG4gIC8qKiBUaGUgRE9NIGVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbm9kZS4gKi9cbiAgcmVhZG9ubHkgbmF0aXZlOiBSRWxlbWVudDtcblxuICAvKiogSWYgQ29tcG9uZW50IHRoZW4gZGF0YSBoYXMgTFZpZXcgKGxpZ2h0IERPTSkgKi9cbiAgcmVhZG9ubHkgZGF0YTogTFZpZXdEYXRhfG51bGw7XG59XG5cbi8qKiBMTm9kZSByZXByZXNlbnRpbmcgYSAjdGV4dCBub2RlLiAqL1xuZXhwb3J0IGludGVyZmFjZSBMVGV4dE5vZGUgZXh0ZW5kcyBMTm9kZSB7XG4gIC8qKiBUaGUgdGV4dCBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG5vZGUuICovXG4gIG5hdGl2ZTogUlRleHQ7XG4gIHJlYWRvbmx5IGRhdGE6IG51bGw7XG4gIGR5bmFtaWNMQ29udGFpbmVyTm9kZTogbnVsbDtcbn1cblxuLyoqIEFic3RyYWN0IG5vZGUgd2hpY2ggY29udGFpbnMgcm9vdCBub2RlcyBvZiBhIHZpZXcuICovXG5leHBvcnQgaW50ZXJmYWNlIExWaWV3Tm9kZSBleHRlbmRzIExOb2RlIHtcbiAgcmVhZG9ubHkgbmF0aXZlOiBudWxsO1xuICByZWFkb25seSBkYXRhOiBMVmlld0RhdGE7XG4gIGR5bmFtaWNMQ29udGFpbmVyTm9kZTogbnVsbDtcbn1cblxuLyoqIEFic3RyYWN0IG5vZGUgY29udGFpbmVyIHdoaWNoIGNvbnRhaW5zIG90aGVyIHZpZXdzLiAqL1xuZXhwb3J0IGludGVyZmFjZSBMQ29udGFpbmVyTm9kZSBleHRlbmRzIExOb2RlIHtcbiAgLypcbiAgICogVGhpcyBjb21tZW50IG5vZGUgaXMgYXBwZW5kZWQgdG8gdGhlIGNvbnRhaW5lcidzIHBhcmVudCBlbGVtZW50IHRvIG1hcmsgd2hlcmVcbiAgICogaW4gdGhlIERPTSB0aGUgY29udGFpbmVyJ3MgY2hpbGQgdmlld3Mgc2hvdWxkIGJlIGFkZGVkLlxuICAgKlxuICAgKiBJZiB0aGUgY29udGFpbmVyIGlzIGEgcm9vdCBub2RlIG9mIGEgdmlldywgdGhpcyBjb21tZW50IHdpbGwgbm90IGJlIGFwcGVuZGVkXG4gICAqIHVudGlsIHRoZSBwYXJlbnQgdmlldyBpcyBwcm9jZXNzZWQuXG4gICAqL1xuICBuYXRpdmU6IFJDb21tZW50O1xuICByZWFkb25seSBkYXRhOiBMQ29udGFpbmVyO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgTFByb2plY3Rpb25Ob2RlIGV4dGVuZHMgTE5vZGUge1xuICByZWFkb25seSBuYXRpdmU6IG51bGw7XG4gIHJlYWRvbmx5IGRhdGE6IG51bGw7XG4gIGR5bmFtaWNMQ29udGFpbmVyTm9kZTogbnVsbDtcbn1cblxuLyoqXG4gKiBBIHNldCBvZiBtYXJrZXIgdmFsdWVzIHRvIGJlIHVzZWQgaW4gdGhlIGF0dHJpYnV0ZXMgYXJyYXlzLiBUaG9zZSBtYXJrZXJzIGluZGljYXRlIHRoYXQgc29tZVxuICogaXRlbXMgYXJlIG5vdCByZWd1bGFyIGF0dHJpYnV0ZXMgYW5kIHRoZSBwcm9jZXNzaW5nIHNob3VsZCBiZSBhZGFwdGVkIGFjY29yZGluZ2x5LlxuICovXG5leHBvcnQgY29uc3QgZW51bSBBdHRyaWJ1dGVNYXJrZXIge1xuICAvKipcbiAgICogTWFya2VyIGluZGljYXRlcyB0aGF0IHRoZSBmb2xsb3dpbmcgMyB2YWx1ZXMgaW4gdGhlIGF0dHJpYnV0ZXMgYXJyYXkgYXJlOlxuICAgKiBuYW1lc3BhY2VVcmksIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlXG4gICAqIGluIHRoYXQgb3JkZXIuXG4gICAqL1xuICBOYW1lc3BhY2VVUkkgPSAwLFxuXG4gIC8qKlxuICAgKiBUaGlzIG1hcmtlciBpbmRpY2F0ZXMgdGhhdCB0aGUgZm9sbG93aW5nIGF0dHJpYnV0ZSBuYW1lcyB3ZXJlIGV4dHJhY3RlZCBmcm9tIGJpbmRpbmdzIChleC46XG4gICAqIFtmb29dPVwiZXhwXCIpIGFuZCAvIG9yIGV2ZW50IGhhbmRsZXJzIChleC4gKGJhcik9XCJkb1N0aCgpXCIpLlxuICAgKiBUYWtpbmcgdGhlIGFib3ZlIGJpbmRpbmdzIGFuZCBvdXRwdXRzIGFzIGFuIGV4YW1wbGUgYW4gYXR0cmlidXRlcyBhcnJheSBjb3VsZCBsb29rIGFzIGZvbGxvd3M6XG4gICAqIFsnY2xhc3MnLCAnZmFkZSBpbicsIEF0dHJpYnV0ZU1hcmtlci5TZWxlY3RPbmx5LCAnZm9vJywgJ2JhciddXG4gICAqL1xuICBTZWxlY3RPbmx5ID0gMVxufVxuXG4vKipcbiAqIEEgY29tYmluYXRpb24gb2Y6XG4gKiAtIGF0dHJpYnV0ZSBuYW1lcyBhbmQgdmFsdWVzXG4gKiAtIHNwZWNpYWwgbWFya2VycyBhY3RpbmcgYXMgZmxhZ3MgdG8gYWx0ZXIgYXR0cmlidXRlcyBwcm9jZXNzaW5nLlxuICovXG5leHBvcnQgdHlwZSBUQXR0cmlidXRlcyA9IChzdHJpbmcgfCBBdHRyaWJ1dGVNYXJrZXIpW107XG5cbi8qKlxuICogTE5vZGUgYmluZGluZyBkYXRhIChmbHl3ZWlnaHQpIGZvciBhIHBhcnRpY3VsYXIgbm9kZSB0aGF0IGlzIHNoYXJlZCBiZXR3ZWVuIGFsbCB0ZW1wbGF0ZXNcbiAqIG9mIGEgc3BlY2lmaWMgdHlwZS5cbiAqXG4gKiBJZiBhIHByb3BlcnR5IGlzOlxuICogICAgLSBQcm9wZXJ0eUFsaWFzZXM6IHRoYXQgcHJvcGVydHkncyBkYXRhIHdhcyBnZW5lcmF0ZWQgYW5kIHRoaXMgaXMgaXRcbiAqICAgIC0gTnVsbDogdGhhdCBwcm9wZXJ0eSdzIGRhdGEgd2FzIGFscmVhZHkgZ2VuZXJhdGVkIGFuZCBub3RoaW5nIHdhcyBmb3VuZC5cbiAqICAgIC0gVW5kZWZpbmVkOiB0aGF0IHByb3BlcnR5J3MgZGF0YSBoYXMgbm90IHlldCBiZWVuIGdlbmVyYXRlZFxuICpcbiAqIHNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmx5d2VpZ2h0X3BhdHRlcm4gZm9yIG1vcmUgb24gdGhlIEZseXdlaWdodCBwYXR0ZXJuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVE5vZGUge1xuICAvKiogVGhlIHR5cGUgb2YgdGhlIFROb2RlLiBTZWUgVE5vZGVUeXBlLiAqL1xuICB0eXBlOiBUTm9kZVR5cGU7XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBUTm9kZSBpbiBUVmlldy5kYXRhIGFuZCBjb3JyZXNwb25kaW5nIExOb2RlIGluIExWaWV3LmRhdGEuXG4gICAqXG4gICAqIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGdldCBmcm9tIGFueSBUTm9kZSB0byBpdHMgY29ycmVzcG9uZGluZyBMTm9kZSB3aGVuXG4gICAqIHRyYXZlcnNpbmcgdGhlIG5vZGUgdHJlZS5cbiAgICpcbiAgICogSWYgaW5kZXggaXMgLTEsIHRoaXMgaXMgYSBkeW5hbWljYWxseSBjcmVhdGVkIGNvbnRhaW5lciBub2RlIG9yIGVtYmVkZGVkIHZpZXcgbm9kZS5cbiAgICovXG4gIGluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoaXMgbnVtYmVyIHN0b3JlcyB0d28gdmFsdWVzIHVzaW5nIGl0cyBiaXRzOlxuICAgKlxuICAgKiAtIHRoZSBudW1iZXIgb2YgZGlyZWN0aXZlcyBvbiB0aGF0IG5vZGUgKGZpcnN0IDEyIGJpdHMpXG4gICAqIC0gdGhlIHN0YXJ0aW5nIGluZGV4IG9mIHRoZSBub2RlJ3MgZGlyZWN0aXZlcyBpbiB0aGUgZGlyZWN0aXZlcyBhcnJheSAobGFzdCAyMCBiaXRzKS5cbiAgICpcbiAgICogVGhlc2UgdHdvIHZhbHVlcyBhcmUgbmVjZXNzYXJ5IHNvIERJIGNhbiBlZmZlY3RpdmVseSBzZWFyY2ggdGhlIGRpcmVjdGl2ZXMgYXNzb2NpYXRlZFxuICAgKiB3aXRoIGEgbm9kZSB3aXRob3V0IHNlYXJjaGluZyB0aGUgd2hvbGUgZGlyZWN0aXZlcyBhcnJheS5cbiAgICovXG4gIGZsYWdzOiBUTm9kZUZsYWdzO1xuXG4gIC8qKiBUaGUgdGFnIG5hbWUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgbm9kZS4gKi9cbiAgdGFnTmFtZTogc3RyaW5nfG51bGw7XG5cbiAgLyoqXG4gICAqIEF0dHJpYnV0ZXMgYXNzb2NpYXRlZCB3aXRoIGFuIGVsZW1lbnQuIFdlIG5lZWQgdG8gc3RvcmUgYXR0cmlidXRlcyB0byBzdXBwb3J0IHZhcmlvdXMgdXNlLWNhc2VzXG4gICAqIChhdHRyaWJ1dGUgaW5qZWN0aW9uLCBjb250ZW50IHByb2plY3Rpb24gd2l0aCBzZWxlY3RvcnMsIGRpcmVjdGl2ZXMgbWF0Y2hpbmcpLlxuICAgKiBBdHRyaWJ1dGVzIGFyZSBzdG9yZWQgc3RhdGljYWxseSBiZWNhdXNlIHJlYWRpbmcgdGhlbSBmcm9tIHRoZSBET00gd291bGQgYmUgd2F5IHRvbyBzbG93IGZvclxuICAgKiBjb250ZW50IHByb2plY3Rpb24gYW5kIHF1ZXJpZXMuXG4gICAqXG4gICAqIFNpbmNlIGF0dHJzIHdpbGwgYWx3YXlzIGJlIGNhbGN1bGF0ZWQgZmlyc3QsIHRoZXkgd2lsbCBuZXZlciBuZWVkIHRvIGJlIG1hcmtlZCB1bmRlZmluZWQgYnlcbiAgICogb3RoZXIgaW5zdHJ1Y3Rpb25zLlxuICAgKlxuICAgKiBGb3IgcmVndWxhciBhdHRyaWJ1dGVzIGEgbmFtZSBvZiBhbiBhdHRyaWJ1dGUgYW5kIGl0cyB2YWx1ZSBhbHRlcm5hdGUgaW4gdGhlIGFycmF5LlxuICAgKiBlLmcuIFsncm9sZScsICdjaGVja2JveCddXG4gICAqIFRoaXMgYXJyYXkgY2FuIGNvbnRhaW4gZmxhZ3MgdGhhdCB3aWxsIGluZGljYXRlIFwic3BlY2lhbCBhdHRyaWJ1dGVzXCIgKGF0dHJpYnV0ZXMgd2l0aFxuICAgKiBuYW1lc3BhY2VzLCBhdHRyaWJ1dGVzIGV4dHJhY3RlZCBmcm9tIGJpbmRpbmdzIGFuZCBvdXRwdXRzKS5cbiAgICovXG4gIGF0dHJzOiBUQXR0cmlidXRlc3xudWxsO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBsb2NhbCBuYW1lcyB1bmRlciB3aGljaCBhIGdpdmVuIGVsZW1lbnQgaXMgZXhwb3J0ZWQgaW4gYSB0ZW1wbGF0ZSBhbmRcbiAgICogdmlzaWJsZSB0byBxdWVyaWVzLiBBbiBlbnRyeSBpbiB0aGlzIGFycmF5IGNhbiBiZSBjcmVhdGVkIGZvciBkaWZmZXJlbnQgcmVhc29uczpcbiAgICogLSBhbiBlbGVtZW50IGl0c2VsZiBpcyByZWZlcmVuY2VkLCBleC46IGA8ZGl2ICNmb28+YFxuICAgKiAtIGEgY29tcG9uZW50IGlzIHJlZmVyZW5jZWQsIGV4LjogYDxteS1jbXB0ICNmb28+YFxuICAgKiAtIGEgZGlyZWN0aXZlIGlzIHJlZmVyZW5jZWQsIGV4LjogYDxteS1jbXB0ICNmb289XCJkaXJlY3RpdmVFeHBvcnRBc1wiPmAuXG4gICAqXG4gICAqIEEgZ2l2ZW4gZWxlbWVudCBtaWdodCBoYXZlIGRpZmZlcmVudCBsb2NhbCBuYW1lcyBhbmQgdGhvc2UgbmFtZXMgY2FuIGJlIGFzc29jaWF0ZWRcbiAgICogd2l0aCBhIGRpcmVjdGl2ZS4gV2Ugc3RvcmUgbG9jYWwgbmFtZXMgYXQgZXZlbiBpbmRleGVzIHdoaWxlIG9kZCBpbmRleGVzIGFyZSByZXNlcnZlZFxuICAgKiBmb3IgZGlyZWN0aXZlIGluZGV4IGluIGEgdmlldyAob3IgYC0xYCBpZiB0aGVyZSBpcyBubyBhc3NvY2lhdGVkIGRpcmVjdGl2ZSkuXG4gICAqXG4gICAqIFNvbWUgZXhhbXBsZXM6XG4gICAqIC0gYDxkaXYgI2Zvbz5gID0+IGBbXCJmb29cIiwgLTFdYFxuICAgKiAtIGA8bXktY21wdCAjZm9vPmAgPT4gYFtcImZvb1wiLCBteUNtcHRJZHhdYFxuICAgKiAtIGA8bXktY21wdCAjZm9vICNiYXI9XCJkaXJlY3RpdmVFeHBvcnRBc1wiPmAgPT4gYFtcImZvb1wiLCBteUNtcHRJZHgsIFwiYmFyXCIsIGRpcmVjdGl2ZUlkeF1gXG4gICAqIC0gYDxkaXYgI2ZvbyAjYmFyPVwiZGlyZWN0aXZlRXhwb3J0QXNcIj5gID0+IGBbXCJmb29cIiwgLTEsIFwiYmFyXCIsIGRpcmVjdGl2ZUlkeF1gXG4gICAqL1xuICBsb2NhbE5hbWVzOiAoc3RyaW5nfG51bWJlcilbXXxudWxsO1xuXG4gIC8qKiBJbmZvcm1hdGlvbiBhYm91dCBpbnB1dCBwcm9wZXJ0aWVzIHRoYXQgbmVlZCB0byBiZSBzZXQgb25jZSBmcm9tIGF0dHJpYnV0ZSBkYXRhLiAqL1xuICBpbml0aWFsSW5wdXRzOiBJbml0aWFsSW5wdXREYXRhfG51bGx8dW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBJbnB1dCBkYXRhIGZvciBhbGwgZGlyZWN0aXZlcyBvbiB0aGlzIG5vZGUuXG4gICAqXG4gICAqIC0gYHVuZGVmaW5lZGAgbWVhbnMgdGhhdCB0aGUgcHJvcCBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQgeWV0LFxuICAgKiAtIGBudWxsYCBtZWFucyB0aGF0IHRoZSBwcm9wIGhhcyBiZWVuIGluaXRpYWxpemVkIGJ1dCBubyBpbnB1dHMgaGF2ZSBiZWVuIGZvdW5kLlxuICAgKi9cbiAgaW5wdXRzOiBQcm9wZXJ0eUFsaWFzZXN8bnVsbHx1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIE91dHB1dCBkYXRhIGZvciBhbGwgZGlyZWN0aXZlcyBvbiB0aGlzIG5vZGUuXG4gICAqXG4gICAqIC0gYHVuZGVmaW5lZGAgbWVhbnMgdGhhdCB0aGUgcHJvcCBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQgeWV0LFxuICAgKiAtIGBudWxsYCBtZWFucyB0aGF0IHRoZSBwcm9wIGhhcyBiZWVuIGluaXRpYWxpemVkIGJ1dCBubyBvdXRwdXRzIGhhdmUgYmVlbiBmb3VuZC5cbiAgICovXG4gIG91dHB1dHM6IFByb3BlcnR5QWxpYXNlc3xudWxsfHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogVGhlIFRWaWV3IG9yIFRWaWV3cyBhdHRhY2hlZCB0byB0aGlzIG5vZGUuXG4gICAqXG4gICAqIElmIHRoaXMgVE5vZGUgY29ycmVzcG9uZHMgdG8gYW4gTENvbnRhaW5lck5vZGUgd2l0aCBpbmxpbmUgdmlld3MsIHRoZSBjb250YWluZXIgd2lsbFxuICAgKiBuZWVkIHRvIHN0b3JlIHNlcGFyYXRlIHN0YXRpYyBkYXRhIGZvciBlYWNoIG9mIGl0cyB2aWV3IGJsb2NrcyAoVFZpZXdbXSkuIE90aGVyd2lzZSxcbiAgICogbm9kZXMgaW4gaW5saW5lIHZpZXdzIHdpdGggdGhlIHNhbWUgaW5kZXggYXMgbm9kZXMgaW4gdGhlaXIgcGFyZW50IHZpZXdzIHdpbGwgb3ZlcndyaXRlXG4gICAqIGVhY2ggb3RoZXIsIGFzIHRoZXkgYXJlIGluIHRoZSBzYW1lIHRlbXBsYXRlLlxuICAgKlxuICAgKiBFYWNoIGluZGV4IGluIHRoaXMgYXJyYXkgY29ycmVzcG9uZHMgdG8gdGhlIHN0YXRpYyBkYXRhIGZvciBhIGNlcnRhaW5cbiAgICogdmlldy4gU28gaWYgeW91IGhhZCBWKDApIGFuZCBWKDEpIGluIGEgY29udGFpbmVyLCB5b3UgbWlnaHQgaGF2ZTpcbiAgICpcbiAgICogW1xuICAgKiAgIFt7dGFnTmFtZTogJ2RpdicsIGF0dHJzOiAuLi59LCBudWxsXSwgICAgIC8vIFYoMCkgVFZpZXdcbiAgICogICBbe3RhZ05hbWU6ICdidXR0b24nLCBhdHRycyAuLi59LCBudWxsXSAgICAvLyBWKDEpIFRWaWV3XG4gICAqXG4gICAqIElmIHRoaXMgVE5vZGUgY29ycmVzcG9uZHMgdG8gYW4gTENvbnRhaW5lck5vZGUgd2l0aCBhIHRlbXBsYXRlIChlLmcuIHN0cnVjdHVyYWxcbiAgICogZGlyZWN0aXZlKSwgdGhlIHRlbXBsYXRlJ3MgVFZpZXcgd2lsbCBiZSBzdG9yZWQgaGVyZS5cbiAgICpcbiAgICogSWYgdGhpcyBUTm9kZSBjb3JyZXNwb25kcyB0byBhbiBMRWxlbWVudE5vZGUsIHRWaWV3cyB3aWxsIGJlIG51bGwgLlxuICAgKi9cbiAgdFZpZXdzOiBUVmlld3xUVmlld1tdfG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBuZXh0IHNpYmxpbmcgbm9kZS4gTmVjZXNzYXJ5IHNvIHdlIGNhbiBwcm9wYWdhdGUgdGhyb3VnaCB0aGUgcm9vdCBub2RlcyBvZiBhIHZpZXdcbiAgICogdG8gaW5zZXJ0IHRoZW0gb3IgcmVtb3ZlIHRoZW0gZnJvbSB0aGUgRE9NLlxuICAgKi9cbiAgbmV4dDogVE5vZGV8bnVsbDtcblxuICAvKipcbiAgICogRmlyc3QgY2hpbGQgb2YgdGhlIGN1cnJlbnQgbm9kZS5cbiAgICpcbiAgICogRm9yIGNvbXBvbmVudCBub2RlcywgdGhlIGNoaWxkIHdpbGwgYWx3YXlzIGJlIGEgQ29udGVudENoaWxkIChpbiBzYW1lIHZpZXcpLlxuICAgKiBGb3IgZW1iZWRkZWQgdmlldyBub2RlcywgdGhlIGNoaWxkIHdpbGwgYmUgaW4gdGhlaXIgY2hpbGQgdmlldy5cbiAgICovXG4gIGNoaWxkOiBUTm9kZXxudWxsO1xuXG4gIC8qKlxuICAgKiBQYXJlbnQgbm9kZSAoaW4gdGhlIHNhbWUgdmlldyBvbmx5KS5cbiAgICpcbiAgICogV2UgbmVlZCBhIHJlZmVyZW5jZSB0byBhIG5vZGUncyBwYXJlbnQgc28gd2UgY2FuIGFwcGVuZCB0aGUgbm9kZSB0byBpdHMgcGFyZW50J3MgbmF0aXZlXG4gICAqIGVsZW1lbnQgYXQgdGhlIGFwcHJvcHJpYXRlIHRpbWUuXG4gICAqXG4gICAqIElmIHRoZSBwYXJlbnQgd291bGQgYmUgaW4gYSBkaWZmZXJlbnQgdmlldyAoZS5nLiBjb21wb25lbnQgaG9zdCksIHRoaXMgcHJvcGVydHkgd2lsbCBiZSBudWxsLlxuICAgKiBJdCdzIGltcG9ydGFudCB0aGF0IHdlIGRvbid0IHRyeSB0byBjcm9zcyBjb21wb25lbnQgYm91bmRhcmllcyB3aGVuIHJldHJpZXZpbmcgdGhlIHBhcmVudFxuICAgKiBiZWNhdXNlIHRoZSBwYXJlbnQgd2lsbCBjaGFuZ2UgKGUuZy4gaW5kZXgsIGF0dHJzKSBkZXBlbmRpbmcgb24gd2hlcmUgdGhlIGNvbXBvbmVudCB3YXNcbiAgICogdXNlZCAoYW5kIHRodXMgc2hvdWxkbid0IGJlIHN0b3JlZCBvbiBUTm9kZSkuIEluIHRoZXNlIGNhc2VzLCB3ZSByZXRyaWV2ZSB0aGUgcGFyZW50IHRocm91Z2hcbiAgICogTFZpZXcubm9kZSBpbnN0ZWFkICh3aGljaCB3aWxsIGJlIGluc3RhbmNlLXNwZWNpZmljKS5cbiAgICpcbiAgICogSWYgdGhpcyBpcyBhbiBpbmxpbmUgdmlldyBub2RlIChWKSwgdGhlIHBhcmVudCB3aWxsIGJlIGl0cyBjb250YWluZXIuXG4gICAqL1xuICBwYXJlbnQ6IFRFbGVtZW50Tm9kZXxUQ29udGFpbmVyTm9kZXxudWxsO1xuXG4gIC8qKlxuICAgKiBBIHBvaW50ZXIgdG8gYSBUQ29udGFpbmVyTm9kZSBjcmVhdGVkIGJ5IGRpcmVjdGl2ZXMgcmVxdWVzdGluZyBWaWV3Q29udGFpbmVyUmVmXG4gICAqL1xuICBkeW5hbWljQ29udGFpbmVyTm9kZTogVE5vZGV8bnVsbDtcblxuICAvKipcbiAgICogSWYgdGhpcyBub2RlIGlzIHBhcnQgb2YgYW4gaTE4biBibG9jaywgaXQgaW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBjb250YWluZXIgaXMgcGFydCBvZiB0aGUgRE9NXG4gICAqIElmIHRoaXMgbm9kZSBpcyBub3QgcGFydCBvZiBhbiBpMThuIGJsb2NrLCB0aGlzIGZpZWxkIGlzIG51bGwuXG4gICAqL1xuICBkZXRhY2hlZDogYm9vbGVhbnxudWxsO1xuXG4gIHN0eWxpbmdUZW1wbGF0ZTogU3R5bGluZ0NvbnRleHR8bnVsbDtcbiAgLyoqXG4gICAqIExpc3Qgb2YgcHJvamVjdGVkIFROb2RlcyBmb3IgYSBnaXZlbiBjb21wb25lbnQgaG9zdCBlbGVtZW50IE9SIGluZGV4IGludG8gdGhlIHNhaWQgbm9kZXMuXG4gICAqXG4gICAqIEZvciBlYXNpZXIgZGlzY3Vzc2lvbiBhc3N1bWUgdGhpcyBleGFtcGxlOlxuICAgKiBgPHBhcmVudD5gJ3MgdmlldyBkZWZpbml0aW9uOlxuICAgKiBgYGBcbiAgICogPGNoaWxkIGlkPVwiYzFcIj5jb250ZW50MTwvY2hpbGQ+XG4gICAqIDxjaGlsZCBpZD1cImMyXCI+PHNwYW4+Y29udGVudDI8L3NwYW4+PC9jaGlsZD5cbiAgICogYGBgXG4gICAqIGA8Y2hpbGQ+YCdzIHZpZXcgZGVmaW5pdGlvbjpcbiAgICogYGBgXG4gICAqIDxuZy1jb250ZW50IGlkPVwiY29udDFcIj48L25nLWNvbnRlbnQ+XG4gICAqIGBgYFxuICAgKlxuICAgKiBJZiBgQXJyYXkuaXNBcnJheShwcm9qZWN0aW9uKWAgdGhlbiBgVE5vZGVgIGlzIGEgaG9zdCBlbGVtZW50OlxuICAgKiAtIGBwcm9qZWN0aW9uYCBzdG9yZXMgdGhlIGNvbnRlbnQgbm9kZXMgd2hpY2ggYXJlIHRvIGJlIHByb2plY3RlZC5cbiAgICogICAgLSBUaGUgbm9kZXMgcmVwcmVzZW50IGNhdGVnb3JpZXMgZGVmaW5lZCBieSB0aGUgc2VsZWN0b3I6IEZvciBleGFtcGxlOlxuICAgKiAgICAgIGA8bmctY29udGVudC8+PG5nLWNvbnRlbnQgc2VsZWN0PVwiYWJjXCIvPmAgd291bGQgcmVwcmVzZW50IHRoZSBoZWFkcyBmb3IgYDxuZy1jb250ZW50Lz5gXG4gICAqICAgICAgYW5kIGA8bmctY29udGVudCBzZWxlY3Q9XCJhYmNcIi8+YCByZXNwZWN0aXZlbHkuXG4gICAqICAgIC0gVGhlIG5vZGVzIHdlIHN0b3JlIGluIGBwcm9qZWN0aW9uYCBhcmUgaGVhZHMgb25seSwgd2UgdXNlZCBgLm5leHRgIHRvIGdldCB0aGVpclxuICAgKiAgICAgIHNpYmxpbmdzLlxuICAgKiAgICAtIFRoZSBub2RlcyBgLm5leHRgIGlzIHNvcnRlZC9yZXdyaXR0ZW4gYXMgcGFydCBvZiB0aGUgcHJvamVjdGlvbiBzZXR1cC5cbiAgICogICAgLSBgcHJvamVjdGlvbmAgc2l6ZSBpcyBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIHByb2plY3Rpb25zIGA8bmctY29udGVudD5gLiBUaGUgc2l6ZSBvZlxuICAgKiAgICAgIGBjMWAgd2lsbCBiZSBgMWAgYmVjYXVzZSBgPGNoaWxkPmAgaGFzIG9ubHkgb25lIGA8bmctY29udGVudD5gLlxuICAgKiAtIHdlIHN0b3JlIGBwcm9qZWN0aW9uYCB3aXRoIHRoZSBob3N0IChgYzFgLCBgYzJgKSByYXRoZXIgdGhhbiB0aGUgYDxuZy1jb250ZW50PmAgKGBjb250MWApXG4gICAqICAgYmVjYXVzZSB0aGUgc2FtZSBjb21wb25lbnQgKGA8Y2hpbGQ+YCkgY2FuIGJlIHVzZWQgaW4gbXVsdGlwbGUgbG9jYXRpb25zIChgYzFgLCBgYzJgKSBhbmQgYXNcbiAgICogICBhIHJlc3VsdCBoYXZlIGRpZmZlcmVudCBzZXQgb2Ygbm9kZXMgdG8gcHJvamVjdC5cbiAgICogLSB3aXRob3V0IGBwcm9qZWN0aW9uYCBpdCB3b3VsZCBiZSBkaWZmaWN1bHQgdG8gZWZmaWNpZW50bHkgdHJhdmVyc2Ugbm9kZXMgdG8gYmUgcHJvamVjdGVkLlxuICAgKlxuICAgKiBJZiBgdHlwZW9mIHByb2plY3Rpb24gPT0gJ251bWJlcidgIHRoZW4gYFROb2RlYCBpcyBhIGA8bmctY29udGVudD5gIGVsZW1lbnQ6XG4gICAqIC0gYHByb2plY3Rpb25gIGlzIGFuIGluZGV4IG9mIHRoZSBob3N0J3MgYHByb2plY3Rpb25gTm9kZXMuXG4gICAqICAgLSBUaGlzIHdvdWxkIHJldHVybiB0aGUgZmlyc3QgaGVhZCBub2RlIHRvIHByb2plY3Q6XG4gICAqICAgICBgZ2V0SG9zdChjdXJyZW50VE5vZGUpLnByb2plY3Rpb25bY3VycmVudFROb2RlLnByb2plY3Rpb25dYC5cbiAgICogLSBXaGVuIHByb2plY3Rpbmcgbm9kZXMgdGhlIHBhcmVudCBub2RlIHJldHJpZXZlZCBtYXkgYmUgYSBgPG5nLWNvbnRlbnQ+YCBub2RlLCBpbiB3aGljaCBjYXNlXG4gICAqICAgdGhlIHByb2Nlc3MgaXMgcmVjdXJzaXZlIGluIG5hdHVyZSAobm90IGltcGxlbWVudGF0aW9uKS5cbiAgICovXG4gIHByb2plY3Rpb246IChUTm9kZXxudWxsKVtdfG51bWJlcnxudWxsO1xufVxuXG4vKiogU3RhdGljIGRhdGEgZm9yIGFuIExFbGVtZW50Tm9kZSAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgVEVsZW1lbnROb2RlIGV4dGVuZHMgVE5vZGUge1xuICAvKiogSW5kZXggaW4gdGhlIGRhdGFbXSBhcnJheSAqL1xuICBpbmRleDogbnVtYmVyO1xuICBjaGlsZDogVEVsZW1lbnROb2RlfFRUZXh0Tm9kZXxUQ29udGFpbmVyTm9kZXxUUHJvamVjdGlvbk5vZGV8bnVsbDtcbiAgLyoqXG4gICAqIEVsZW1lbnQgbm9kZXMgd2lsbCBoYXZlIHBhcmVudHMgdW5sZXNzIHRoZXkgYXJlIHRoZSBmaXJzdCBub2RlIG9mIGEgY29tcG9uZW50IG9yXG4gICAqIGVtYmVkZGVkIHZpZXcgKHdoaWNoIG1lYW5zIHRoZWlyIHBhcmVudCBpcyBpbiBhIGRpZmZlcmVudCB2aWV3IGFuZCBtdXN0IGJlXG4gICAqIHJldHJpZXZlZCB1c2luZyBMVmlldy5ub2RlKS5cbiAgICovXG4gIHBhcmVudDogVEVsZW1lbnROb2RlfG51bGw7XG4gIHRWaWV3czogbnVsbDtcblxuICAvKipcbiAgICogSWYgdGhpcyBpcyBhIGNvbXBvbmVudCBUTm9kZSB3aXRoIHByb2plY3Rpb24sIHRoaXMgd2lsbCBiZSBhbiBhcnJheSBvZiBwcm9qZWN0ZWRcbiAgICogVE5vZGVzIChzZWUgVE5vZGUucHJvamVjdGlvbiBmb3IgbW9yZSBpbmZvKS4gSWYgaXQncyBhIHJlZ3VsYXIgZWxlbWVudCBub2RlIG9yIGFcbiAgICogY29tcG9uZW50IHdpdGhvdXQgcHJvamVjdGlvbiwgaXQgd2lsbCBiZSBudWxsLlxuICAgKi9cbiAgcHJvamVjdGlvbjogKFROb2RlfG51bGwpW118bnVsbDtcbn1cblxuLyoqIFN0YXRpYyBkYXRhIGZvciBhbiBMVGV4dE5vZGUgICovXG5leHBvcnQgaW50ZXJmYWNlIFRUZXh0Tm9kZSBleHRlbmRzIFROb2RlIHtcbiAgLyoqIEluZGV4IGluIHRoZSBkYXRhW10gYXJyYXkgKi9cbiAgaW5kZXg6IG51bWJlcjtcbiAgY2hpbGQ6IG51bGw7XG4gIC8qKlxuICAgKiBUZXh0IG5vZGVzIHdpbGwgaGF2ZSBwYXJlbnRzIHVubGVzcyB0aGV5IGFyZSB0aGUgZmlyc3Qgbm9kZSBvZiBhIGNvbXBvbmVudCBvclxuICAgKiBlbWJlZGRlZCB2aWV3ICh3aGljaCBtZWFucyB0aGVpciBwYXJlbnQgaXMgaW4gYSBkaWZmZXJlbnQgdmlldyBhbmQgbXVzdCBiZVxuICAgKiByZXRyaWV2ZWQgdXNpbmcgTFZpZXcubm9kZSkuXG4gICAqL1xuICBwYXJlbnQ6IFRFbGVtZW50Tm9kZXxudWxsO1xuICB0Vmlld3M6IG51bGw7XG4gIHByb2plY3Rpb246IG51bGw7XG59XG5cbi8qKiBTdGF0aWMgZGF0YSBmb3IgYW4gTENvbnRhaW5lck5vZGUgKi9cbmV4cG9ydCBpbnRlcmZhY2UgVENvbnRhaW5lck5vZGUgZXh0ZW5kcyBUTm9kZSB7XG4gIC8qKlxuICAgKiBJbmRleCBpbiB0aGUgZGF0YVtdIGFycmF5LlxuICAgKlxuICAgKiBJZiBpdCdzIC0xLCB0aGlzIGlzIGEgZHluYW1pY2FsbHkgY3JlYXRlZCBjb250YWluZXIgbm9kZSB0aGF0IGlzbid0IHN0b3JlZCBpblxuICAgKiBkYXRhW10gKGUuZy4gd2hlbiB5b3UgaW5qZWN0IFZpZXdDb250YWluZXJSZWYpIC5cbiAgICovXG4gIGluZGV4OiBudW1iZXI7XG4gIGNoaWxkOiBudWxsO1xuXG4gIC8qKlxuICAgKiBDb250YWluZXIgbm9kZXMgd2lsbCBoYXZlIHBhcmVudHMgdW5sZXNzOlxuICAgKlxuICAgKiAtIFRoZXkgYXJlIHRoZSBmaXJzdCBub2RlIG9mIGEgY29tcG9uZW50IG9yIGVtYmVkZGVkIHZpZXdcbiAgICogLSBUaGV5IGFyZSBkeW5hbWljYWxseSBjcmVhdGVkXG4gICAqL1xuICBwYXJlbnQ6IFRFbGVtZW50Tm9kZXxudWxsO1xuICB0Vmlld3M6IFRWaWV3fFRWaWV3W118bnVsbDtcbiAgcHJvamVjdGlvbjogbnVsbDtcbn1cblxuLyoqIFN0YXRpYyBkYXRhIGZvciBhbiBMVmlld05vZGUgICovXG5leHBvcnQgaW50ZXJmYWNlIFRWaWV3Tm9kZSBleHRlbmRzIFROb2RlIHtcbiAgLyoqIElmIC0xLCBpdCdzIGEgZHluYW1pY2FsbHkgY3JlYXRlZCB2aWV3LiBPdGhlcndpc2UsIGl0IGlzIHRoZSB2aWV3IGJsb2NrIElELiAqL1xuICBpbmRleDogbnVtYmVyO1xuICBjaGlsZDogVEVsZW1lbnROb2RlfFRUZXh0Tm9kZXxUQ29udGFpbmVyTm9kZXxUUHJvamVjdGlvbk5vZGV8bnVsbDtcbiAgcGFyZW50OiBUQ29udGFpbmVyTm9kZXxudWxsO1xuICB0Vmlld3M6IG51bGw7XG4gIHByb2plY3Rpb246IG51bGw7XG59XG5cbi8qKiBTdGF0aWMgZGF0YSBmb3IgYW4gTFByb2plY3Rpb25Ob2RlICAqL1xuZXhwb3J0IGludGVyZmFjZSBUUHJvamVjdGlvbk5vZGUgZXh0ZW5kcyBUTm9kZSB7XG4gIC8qKiBJbmRleCBpbiB0aGUgZGF0YVtdIGFycmF5ICovXG4gIGNoaWxkOiBudWxsO1xuICAvKipcbiAgICogUHJvamVjdGlvbiBub2RlcyB3aWxsIGhhdmUgcGFyZW50cyB1bmxlc3MgdGhleSBhcmUgdGhlIGZpcnN0IG5vZGUgb2YgYSBjb21wb25lbnRcbiAgICogb3IgZW1iZWRkZWQgdmlldyAod2hpY2ggbWVhbnMgdGhlaXIgcGFyZW50IGlzIGluIGEgZGlmZmVyZW50IHZpZXcgYW5kIG11c3QgYmVcbiAgICogcmV0cmlldmVkIHVzaW5nIExWaWV3Lm5vZGUpLlxuICAgKi9cbiAgcGFyZW50OiBURWxlbWVudE5vZGV8bnVsbDtcbiAgdFZpZXdzOiBudWxsO1xuXG4gIC8qKiBJbmRleCBvZiB0aGUgcHJvamVjdGlvbiBub2RlLiAoU2VlIFROb2RlLnByb2plY3Rpb24gZm9yIG1vcmUgaW5mby4pICovXG4gIHByb2plY3Rpb246IG51bWJlcjtcbn1cblxuLyoqXG4gKiBUaGlzIG1hcHBpbmcgaXMgbmVjZXNzYXJ5IHNvIHdlIGNhbiBzZXQgaW5wdXQgcHJvcGVydGllcyBhbmQgb3V0cHV0IGxpc3RlbmVyc1xuICogcHJvcGVybHkgYXQgcnVudGltZSB3aGVuIHByb3BlcnR5IG5hbWVzIGFyZSBtaW5pZmllZCBvciBhbGlhc2VkLlxuICpcbiAqIEtleTogdW5taW5pZmllZCAvIHB1YmxpYyBpbnB1dCBvciBvdXRwdXQgbmFtZVxuICogVmFsdWU6IGFycmF5IGNvbnRhaW5pbmcgbWluaWZpZWQgLyBpbnRlcm5hbCBuYW1lIGFuZCByZWxhdGVkIGRpcmVjdGl2ZSBpbmRleFxuICpcbiAqIFRoZSB2YWx1ZSBtdXN0IGJlIGFuIGFycmF5IHRvIHN1cHBvcnQgaW5wdXRzIGFuZCBvdXRwdXRzIHdpdGggdGhlIHNhbWUgbmFtZVxuICogb24gdGhlIHNhbWUgbm9kZS5cbiAqL1xuZXhwb3J0IHR5cGUgUHJvcGVydHlBbGlhc2VzID0ge1xuICAvLyBUaGlzIHVzZXMgYW4gb2JqZWN0IG1hcCBiZWNhdXNlIHVzaW5nIHRoZSBNYXAgdHlwZSB3b3VsZCBiZSB0b28gc2xvd1xuICBba2V5OiBzdHJpbmddOiBQcm9wZXJ0eUFsaWFzVmFsdWVcbn07XG5cbi8qKlxuICogU3RvcmUgdGhlIHJ1bnRpbWUgaW5wdXQgb3Igb3V0cHV0IG5hbWVzIGZvciBhbGwgdGhlIGRpcmVjdGl2ZXMuXG4gKlxuICogLSBFdmVuIGluZGljZXM6IGRpcmVjdGl2ZSBpbmRleFxuICogLSBPZGQgaW5kaWNlczogbWluaWZpZWQgLyBpbnRlcm5hbCBuYW1lXG4gKlxuICogZS5nLiBbMCwgJ2NoYW5nZS1taW5pZmllZCddXG4gKi9cbmV4cG9ydCB0eXBlIFByb3BlcnR5QWxpYXNWYWx1ZSA9IChudW1iZXIgfCBzdHJpbmcpW107XG5cblxuLyoqXG4gKiBUaGlzIGFycmF5IGNvbnRhaW5zIGluZm9ybWF0aW9uIGFib3V0IGlucHV0IHByb3BlcnRpZXMgdGhhdFxuICogbmVlZCB0byBiZSBzZXQgb25jZSBmcm9tIGF0dHJpYnV0ZSBkYXRhLiBJdCdzIG9yZGVyZWQgYnlcbiAqIGRpcmVjdGl2ZSBpbmRleCAocmVsYXRpdmUgdG8gZWxlbWVudCkgc28gaXQncyBzaW1wbGUgdG9cbiAqIGxvb2sgdXAgYSBzcGVjaWZpYyBkaXJlY3RpdmUncyBpbml0aWFsIGlucHV0IGRhdGEuXG4gKlxuICogV2l0aGluIGVhY2ggc3ViLWFycmF5OlxuICpcbiAqIEV2ZW4gaW5kaWNlczogbWluaWZpZWQvaW50ZXJuYWwgaW5wdXQgbmFtZVxuICogT2RkIGluZGljZXM6IGluaXRpYWwgdmFsdWVcbiAqXG4gKiBJZiBhIGRpcmVjdGl2ZSBvbiBhIG5vZGUgZG9lcyBub3QgaGF2ZSBhbnkgaW5wdXQgcHJvcGVydGllc1xuICogdGhhdCBzaG91bGQgYmUgc2V0IGZyb20gYXR0cmlidXRlcywgaXRzIGluZGV4IGlzIHNldCB0byBudWxsXG4gKiB0byBhdm9pZCBhIHNwYXJzZSBhcnJheS5cbiAqXG4gKiBlLmcuIFtudWxsLCBbJ3JvbGUtbWluJywgJ2J1dHRvbiddXVxuICovXG5leHBvcnQgdHlwZSBJbml0aWFsSW5wdXREYXRhID0gKEluaXRpYWxJbnB1dHMgfCBudWxsKVtdO1xuXG4vKipcbiAqIFVzZWQgYnkgSW5pdGlhbElucHV0RGF0YSB0byBzdG9yZSBpbnB1dCBwcm9wZXJ0aWVzXG4gKiB0aGF0IHNob3VsZCBiZSBzZXQgb25jZSBmcm9tIGF0dHJpYnV0ZXMuXG4gKlxuICogRXZlbiBpbmRpY2VzOiBtaW5pZmllZC9pbnRlcm5hbCBpbnB1dCBuYW1lXG4gKiBPZGQgaW5kaWNlczogaW5pdGlhbCB2YWx1ZVxuICpcbiAqIGUuZy4gWydyb2xlLW1pbicsICdidXR0b24nXVxuICovXG5leHBvcnQgdHlwZSBJbml0aWFsSW5wdXRzID0gc3RyaW5nW107XG5cbi8vIE5vdGU6IFRoaXMgaGFjayBpcyBuZWNlc3Nhcnkgc28gd2UgZG9uJ3QgZXJyb25lb3VzbHkgZ2V0IGEgY2lyY3VsYXIgZGVwZW5kZW5jeVxuLy8gZmFpbHVyZSBiYXNlZCBvbiB0eXBlcy5cbmV4cG9ydCBjb25zdCB1bnVzZWRWYWx1ZUV4cG9ydFRvUGxhY2F0ZUFqZCA9IDE7XG4iXX0=