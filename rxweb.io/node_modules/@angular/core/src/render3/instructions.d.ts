/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import './ng_dev_mode';
import { QueryList } from '../linker';
import { Sanitizer } from '../sanitization/security';
import { StyleSanitizeFn } from '../sanitization/style_sanitizer';
import { LContainer } from './interfaces/container';
import { ComponentDefInternal, ComponentQuery, ComponentTemplate, DirectiveDefInternal, DirectiveDefListOrFactory, InitialStylingFlags, PipeDefListOrFactory, RenderFlags } from './interfaces/definition';
import { LInjector } from './interfaces/injector';
import { LContainerNode, LElementNode, LNode, LProjectionNode, LTextNode, LViewNode, TAttributes, TContainerNode, TElementNode, TNode, TNodeType } from './interfaces/node';
import { CssSelectorList } from './interfaces/projection';
import { LQueries } from './interfaces/query';
import { RComment, RElement, RText, Renderer3, RendererFactory3 } from './interfaces/renderer';
import { CurrentMatchesList, LViewData, LViewFlags, RootContext, TView } from './interfaces/view';
/**
 * Directive (D) sets a property on all component instances using this constant as a key and the
 * component's host node (LElement) as the value. This is used in methods like detectChanges to
 * facilitate jumping from an instance to the host node.
 */
export declare const NG_HOST_SYMBOL = "__ngHostLNode__";
/**
 * Function used to sanitize the value before writing it into the renderer.
 */
export declare type SanitizerFn = (value: any) => string;
/**
 * Token set in currentMatches while dependencies are being resolved.
 *
 * If we visit a directive that has a value set to CIRCULAR, we know we've
 * already seen it, and thus have a circular dependency.
 */
export declare const CIRCULAR = "__CIRCULAR__";
export declare function getRenderer(): Renderer3;
export declare function getCurrentSanitizer(): Sanitizer | null;
export declare function getViewData(): LViewData;
export declare function getPreviousOrParentNode(): LNode;
/**
 * Query instructions can ask for "current queries" in 2 different cases:
 * - when creating view queries (at the root of a component view, before any node is created - in
 * this case currentQueries points to view queries)
 * - when creating content queries (inb this previousOrParentNode points to a node on which we
 * create content queries).
 */
export declare function getCurrentQueries(QueryType: {
    new (): LQueries;
}): LQueries;
export declare function getCreationMode(): boolean;
/**
 * Swap the current state with a new state.
 *
 * For performance reasons we store the state in the top level of the module.
 * This way we minimize the number of properties to read. Whenever a new view
 * is entered we have to store the state for later, and when the view is
 * exited the state has to be restored
 *
 * @param newView New state to become active
 * @param host Element to which the View is a child of
 * @returns the previous state;
 */
export declare function enterView(newView: LViewData, host: LElementNode | LViewNode | null): LViewData;
/**
 * Used in lieu of enterView to make it clear when we are exiting a child view. This makes
 * the direction of traversal (up or down the view tree) a bit clearer.
 *
 * @param newView New state to become active
 * @param creationOnly An optional boolean to indicate that the view was processed in creation mode
 * only, i.e. the first update will be done later. Only possible for dynamically created views.
 */
export declare function leaveView(newView: LViewData, creationOnly?: boolean): void;
/** Sets the host bindings for the current view. */
export declare function setHostBindings(bindings: number[] | null): void;
export declare function executeInitAndContentHooks(): void;
export declare function createLViewData<T>(renderer: Renderer3, tView: TView, context: T | null, flags: LViewFlags, sanitizer?: Sanitizer | null): LViewData;
/**
 * Creation of LNode object is extracted to a separate function so we always create LNode object
 * with the same shape
 * (same properties assigned in the same order).
 */
export declare function createLNodeObject(type: TNodeType, currentView: LViewData, parent: LNode | null, native: RText | RElement | RComment | null, state: any, queries: LQueries | null): LElementNode & LTextNode & LViewNode & LContainerNode & LProjectionNode;
/**
 * A common way of creating the LNode to make sure that all of them have same shape to
 * keep the execution code monomorphic and fast.
 *
 * @param index The index at which the LNode should be saved (null if view, since they are not
 * saved).
 * @param type The type of LNode to create
 * @param native The native element for this LNode, if applicable
 * @param name The tag name of the associated native element, if applicable
 * @param attrs Any attrs for the native element, if applicable
 * @param data Any data that should be saved on the LNode
 */
export declare function createLNode(index: number, type: TNodeType.Element, native: RElement | RText | null, name: string | null, attrs: TAttributes | null, lViewData?: LViewData | null): LElementNode;
export declare function createLNode(index: number, type: TNodeType.View, native: null, name: null, attrs: null, lViewData: LViewData): LViewNode;
export declare function createLNode(index: number, type: TNodeType.Container, native: RComment, name: string | null, attrs: TAttributes | null, lContainer: LContainer): LContainerNode;
export declare function createLNode(index: number, type: TNodeType.Projection, native: null, name: null, attrs: TAttributes | null, lProjection: null): LProjectionNode;
/**
 * Resets the application state.
 */
export declare function resetApplicationState(): void;
/**
 *
 * @param hostNode Existing node to render into.
 * @param template Template function with the instructions.
 * @param context to pass into the template.
 * @param providedRendererFactory renderer factory to use
 * @param host The host element node to use
 * @param directives Directive defs that should be used for matching
 * @param pipes Pipe defs that should be used for matching
 */
export declare function renderTemplate<T>(hostNode: RElement, template: ComponentTemplate<T>, context: T, providedRendererFactory: RendererFactory3, host: LElementNode | null, directives?: DirectiveDefListOrFactory | null, pipes?: PipeDefListOrFactory | null, sanitizer?: Sanitizer | null): LElementNode;
/**
 * Used for creating the LViewNode of a dynamic embedded view,
 * either through ViewContainerRef.createEmbeddedView() or TemplateRef.createEmbeddedView().
 * Such lViewNode will then be renderer with renderEmbeddedTemplate() (see below).
 */
export declare function createEmbeddedViewNode<T>(tView: TView, context: T, renderer: Renderer3, queries?: LQueries | null): LViewNode;
/**
 * Used for rendering embedded views (e.g. dynamically created views)
 *
 * Dynamically created views must store/retrieve their TViews differently from component views
 * because their template functions are nested in the template functions of their hosts, creating
 * closures. If their host template happens to be an embedded template in a loop (e.g. ngFor inside
 * an ngFor), the nesting would mean we'd have multiple instances of the template function, so we
 * can't store TViews in the template function itself (as we do for comps). Instead, we store the
 * TView for dynamically created views on their host TNode, which only has one instance.
 */
export declare function renderEmbeddedTemplate<T>(viewNode: LViewNode | LElementNode, tView: TView, context: T, rf: RenderFlags): LViewNode | LElementNode;
export declare function renderComponentOrTemplate<T>(node: LElementNode, hostView: LViewData, componentOrContext: T, template?: ComponentTemplate<T>): void;
export declare function namespaceSVG(): void;
export declare function namespaceMathML(): void;
export declare function namespaceHTML(): void;
/**
 * Creates an empty element using {@link elementStart} and {@link elementEnd}
 *
 * @param index Index of the element in the data array
 * @param name Name of the DOM Node
 * @param attrs Statically bound set of attributes to be written into the DOM element on creation.
 * @param localRefs A set of local reference bindings on the element.
 */
export declare function element(index: number, name: string, attrs?: TAttributes | null, localRefs?: string[] | null): void;
/**
 * Create DOM element. The instruction must later be followed by `elementEnd()` call.
 *
 * @param index Index of the element in the LViewData array
 * @param name Name of the DOM Node
 * @param attrs Statically bound set of attributes to be written into the DOM element on creation.
 * @param localRefs A set of local reference bindings on the element.
 *
 * Attributes and localRefs are passed as an array of strings where elements with an even index
 * hold an attribute name and elements with an odd index hold an attribute value, ex.:
 * ['id', 'warning5', 'class', 'alert']
 */
export declare function elementStart(index: number, name: string, attrs?: TAttributes | null, localRefs?: string[] | null): RElement;
/**
 * Creates a native element from a tag name, using a renderer.
 * @param name the tag name
 * @param overriddenRenderer Optional A renderer to override the default one
 * @returns the element created
 */
export declare function elementCreate(name: string, overriddenRenderer?: Renderer3): RElement;
export declare function resolveDirective(def: DirectiveDefInternal<any>, valueIndex: number, matches: CurrentMatchesList, tView: TView): any;
/** Sets the context for a ChangeDetectorRef to the given instance. */
export declare function initChangeDetectorIfExisting(injector: LInjector | null, instance: any, view: LViewData): void;
export declare function isComponent(tNode: TNode): boolean;
/**
 * Creates a TView instance
 *
 * @param viewIndex The viewBlockId for inline views, or -1 if it's a component/dynamic
 * @param directives Registry of directives for this view
 * @param pipes Registry of pipes for this view
 */
export declare function createTView(viewIndex: number, template: ComponentTemplate<any> | null, directives: DirectiveDefListOrFactory | null, pipes: PipeDefListOrFactory | null, viewQuery: ComponentQuery<any> | null): TView;
export declare function createError(text: string, token: any): Error;
/**
 * Locates the host native element, used for bootstrapping existing nodes into rendering pipeline.
 *
 * @param elementOrSelector Render element or CSS selector to locate the element.
 */
export declare function locateHostElement(factory: RendererFactory3, elementOrSelector: RElement | string): RElement | null;
/**
 * Creates the host LNode.
 *
 * @param rNode Render host element.
 * @param def ComponentDef
 *
 * @returns LElementNode created
 */
export declare function hostElement(tag: string, rNode: RElement | null, def: ComponentDefInternal<any>, sanitizer?: Sanitizer | null): LElementNode;
/**
 * Adds an event listener to the current node.
 *
 * If an output exists on one of the node's directives, it also subscribes to the output
 * and saves the subscription for later cleanup.
 *
 * @param eventName Name of the event
 * @param listenerFn The function to be called when event emits
 * @param useCapture Whether or not to use capture in event listener.
 */
export declare function listener(eventName: string, listenerFn: (e?: any) => any, useCapture?: boolean): void;
/**
 * Saves context for this cleanup function in LView.cleanupInstances.
 *
 * On the first template pass, saves in TView:
 * - Cleanup function
 * - Index of context we just saved in LView.cleanupInstances
 */
export declare function storeCleanupWithContext(view: LViewData | null, context: any, cleanupFn: Function): void;
/**
 * Saves the cleanup function itself in LView.cleanupInstances.
 *
 * This is necessary for functions that are wrapped with their contexts, like in renderer2
 * listeners.
 *
 * On the first template pass, the index of the cleanup function is saved in TView.
 */
export declare function storeCleanupFn(view: LViewData, cleanupFn: Function): void;
/** Mark the end of the element. */
export declare function elementEnd(): void;
/**
 * Updates the value of removes an attribute on an Element.
 *
 * @param number index The index of the element in the data array
 * @param name name The name of the attribute.
 * @param value value The attribute is removed when value is `null` or `undefined`.
 *                  Otherwise the attribute value is set to the stringified value.
 * @param sanitizer An optional function used to sanitize the value.
 */
export declare function elementAttribute(index: number, name: string, value: any, sanitizer?: SanitizerFn): void;
/**
 * Update a property on an Element.
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new @Inputs don't have to be re-compiled.
 *
 * @param index The index of the element to update in the data array
 * @param propName Name of property. Because it is going to DOM, this is not subject to
 *        renaming as part of minification.
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 */
export declare function elementProperty<T>(index: number, propName: string, value: T | NO_CHANGE, sanitizer?: SanitizerFn): void;
/**
 * Constructs a TNode object from the arguments.
 *
 * @param type The type of the node
 * @param adjustedIndex The index of the TNode in TView.data, adjusted for HEADER_OFFSET
 * @param tagName The tag name of the node
 * @param attrs The attributes defined on this node
 * @param parent The parent of this node
 * @param tViews Any TViews attached to this node
 * @returns the TNode object
 */
export declare function createTNode(type: TNodeType, adjustedIndex: number, tagName: string | null, attrs: TAttributes | null, parent: TElementNode | TContainerNode | null, tViews: TView[] | null): TNode;
/**
 * Add or remove a class in a `classList` on a DOM element.
 *
 * This instruction is meant to handle the [class.foo]="exp" case
 *
 * @param index The index of the element to update in the data array
 * @param className Name of class to toggle. Because it is going to DOM, this is not subject to
 *        renaming as part of minification.
 * @param value A value indicating if a given class should be added or removed.
 */
export declare function elementClassProp<T>(index: number, stylingIndex: number, value: T | NO_CHANGE): void;
/**
 * Assign any inline style values to the element during creation mode.
 *
 * This instruction is meant to be called during creation mode to apply all styling
 * (e.g. `style="..."`) values to the element. This is also where the provided index
 * value is allocated for the styling details for its corresponding element (the element
 * index is the previous index value from this one).
 *
 * (Note this function calls `elementStylingApply` immediately when called.)
 *
 *
 * @param index Index value which will be allocated to store styling data for the element.
 *        (Note that this is not the element index, but rather an index value allocated
 *        specifically for element styling--the index must be the next index after the element
 *        index.)
 * @param classDeclarations A key/value array of CSS classes that will be registered on the element.
 *   Each individual style will be used on the element as long as it is not overridden
 *   by any classes placed on the element by multiple (`[class]`) or singular (`[class.named]`)
 *   bindings. If a class binding changes its value to a falsy value then the matching initial
 *   class value that are passed in here will be applied to the element (if matched).
 * @param styleDeclarations A key/value array of CSS styles that will be registered on the element.
 *   Each individual style will be used on the element as long as it is not overridden
 *   by any styles placed on the element by multiple (`[style]`) or singular (`[style.prop]`)
 *   bindings. If a style binding changes its value to null then the initial styling
 *   values that are passed in here will be applied to the element (if matched).
 * @param styleSanitizer An optional sanitizer function that will be used (if provided)
 *   to sanitize the any CSS property values that are applied to the element (during rendering).
 */
export declare function elementStyling<T>(classDeclarations?: (string | boolean | InitialStylingFlags)[] | null, styleDeclarations?: (string | boolean | InitialStylingFlags)[] | null, styleSanitizer?: StyleSanitizeFn | null): void;
/**
 * Apply all styling values to the element which have been queued by any styling instructions.
 *
 * This instruction is meant to be run once one or more `elementStyle` and/or `elementStyleProp`
 * have been issued against the element. This function will also determine if any styles have
 * changed and will then skip the operation if there is nothing new to render.
 *
 * Once called then all queued styles will be flushed.
 *
 * @param index Index of the element's styling storage that will be rendered.
 *        (Note that this is not the element index, but rather an index value allocated
 *        specifically for element styling--the index must be the next index after the element
 *        index.)
 */
export declare function elementStylingApply<T>(index: number): void;
/**
 * Queue a given style to be rendered on an Element.
 *
 * If the style value is `null` then it will be removed from the element
 * (or assigned a different value depending if there are any styles placed
 * on the element with `elementStyle` or any styles that are present
 * from when the element was created (with `elementStyling`).
 *
 * (Note that the styling instruction will not be applied until `elementStylingApply` is called.)
 *
 * @param index Index of the element's styling storage to change in the data array.
 *        (Note that this is not the element index, but rather an index value allocated
 *        specifically for element styling--the index must be the next index after the element
 *        index.)
 * @param styleIndex Index of the style property on this element. (Monotonically increasing.)
 * @param styleName Name of property. Because it is going to DOM this is not subject to
 *        renaming as part of minification.
 * @param value New value to write (null to remove).
 * @param suffix Optional suffix. Used with scalar values to add unit such as `px`.
 *        Note that when a suffix is provided then the underlying sanitizer will
 *        be ignored.
 */
export declare function elementStyleProp<T>(index: number, styleIndex: number, value: T | null, suffix?: string): void;
/**
 * Queue a key/value map of styles to be rendered on an Element.
 *
 * This instruction is meant to handle the `[style]="exp"` usage. When styles are applied to
 * the Element they will then be placed with respect to any styles set with `elementStyleProp`.
 * If any styles are set to `null` then they will be removed from the element (unless the same
 * style properties have been assigned to the element during creation using `elementStyling`).
 *
 * (Note that the styling instruction will not be applied until `elementStylingApply` is called.)
 *
 * @param index Index of the element's styling storage to change in the data array.
 *        (Note that this is not the element index, but rather an index value allocated
 *        specifically for element styling--the index must be the next index after the element
 *        index.)
 * @param classes A key/value style map of CSS classes that will be added to the given element.
 *        Any missing classes (that have already been applied to the element beforehand) will be
 *        removed (unset) from the element's list of CSS classes.
 * @param styles A key/value style map of the styles that will be applied to the given element.
 *        Any missing styles (that have already been applied to the element beforehand) will be
 *        removed (unset) from the element's styling.
 */
export declare function elementStylingMap<T>(index: number, classes: {
    [key: string]: any;
} | string | null, styles?: {
    [styleName: string]: any;
} | null): void;
/**
 * Create static text node
 *
 * @param index Index of the node in the data array
 * @param value Value to write. This value will be stringified.
 */
export declare function text(index: number, value?: any): void;
/**
 * Create text node with binding
 * Bindings should be handled externally with the proper interpolation(1-8) method
 *
 * @param index Index of the node in the data array.
 * @param value Stringified value to write.
 */
export declare function textBinding<T>(index: number, value: T | NO_CHANGE): void;
/**
 * Create a directive and their associated content queries.
 *
 * NOTE: directives can be created in order other than the index order. They can also
 *       be retrieved before they are created in which case the value will be null.
 *
 * @param directive The directive instance.
 * @param directiveDef DirectiveDef object which contains information about the template.
 */
export declare function directiveCreate<T>(directiveDefIdx: number, directive: T, directiveDef: DirectiveDefInternal<T> | ComponentDefInternal<T>): T;
/**
 * A lighter version of directiveCreate() that is used for the root component
 *
 * This version does not contain features that we don't already support at root in
 * current Angular. Example: local refs and inputs on root component.
 */
export declare function baseDirectiveCreate<T>(index: number, directive: T, directiveDef: DirectiveDefInternal<T> | ComponentDefInternal<T>): T;
/**
 * Creates a LContainer, either from a container instruction, or for a ViewContainerRef.
 *
 * @param parentLNode the LNode in which the container's content will be rendered
 * @param currentView The parent view of the LContainer
 * @param isForViewContainerRef Optional a flag indicating the ViewContainerRef case
 * @returns LContainer
 */
export declare function createLContainer(parentLNode: LNode, currentView: LViewData, isForViewContainerRef?: boolean): LContainer;
/**
 * Creates an LContainerNode.
 *
 * Only `LViewNodes` can go into `LContainerNodes`.
 *
 * @param index The index of the container in the data array
 * @param template Optional inline template
 * @param tagName The name of the container element, if applicable
 * @param attrs The attrs attached to the container, if applicable
 * @param localRefs A set of local reference bindings on the element.
 */
export declare function container(index: number, template?: ComponentTemplate<any>, tagName?: string | null, attrs?: TAttributes, localRefs?: string[] | null): void;
/**
 * Sets a container up to receive views.
 *
 * @param index The index of the container in the data array
 */
export declare function containerRefreshStart(index: number): void;
/**
 * Marks the end of the LContainerNode.
 *
 * Marking the end of LContainerNode is the time when to child Views get inserted or removed.
 */
export declare function containerRefreshEnd(): void;
/**
 * Marks the start of an embedded view.
 *
 * @param viewBlockId The ID of this view
 * @return boolean Whether or not this view is in creation mode
 */
export declare function embeddedViewStart(viewBlockId: number): RenderFlags;
/** Marks the end of an embedded view. */
export declare function embeddedViewEnd(): void;
/**
 * Refreshes components by entering the component view and processing its bindings, queries, etc.
 *
 * @param directiveIndex Directive index in LViewData[DIRECTIVES]
 * @param adjustedElementIndex  Element index in LViewData[] (adjusted for HEADER_OFFSET)
 */
export declare function componentRefresh<T>(directiveIndex: number, adjustedElementIndex: number): void;
/** Returns a boolean for whether the view is attached */
export declare function viewAttached(view: LViewData): boolean;
/**
 * Instruction to distribute projectable nodes among <ng-content> occurrences in a given template.
 * It takes all the selectors from the entire component's template and decides where
 * each projected node belongs (it re-distributes nodes among "buckets" where each "bucket" is
 * backed by a selector).
 *
 * This function requires CSS selectors to be provided in 2 forms: parsed (by a compiler) and text,
 * un-parsed form.
 *
 * The parsed form is needed for efficient matching of a node against a given CSS selector.
 * The un-parsed, textual form is needed for support of the ngProjectAs attribute.
 *
 * Having a CSS selector in 2 different formats is not ideal, but alternatives have even more
 * drawbacks:
 * - having only a textual form would require runtime parsing of CSS selectors;
 * - we can't have only a parsed as we can't re-construct textual form from it (as entered by a
 * template author).
 *
 * @param selectors A collection of parsed CSS selectors
 * @param rawSelectors A collection of CSS selectors in the raw, un-parsed form
 */
export declare function projectionDef(selectors?: CssSelectorList[], textSelectors?: string[]): void;
/**
 * Inserts previously re-distributed projected nodes. This instruction must be preceded by a call
 * to the projectionDef instruction.
 *
 * @param nodeIndex
 * @param selectorIndex:
 *        - 0 when the selector is `*` (or unspecified as this is the default value),
 *        - 1 based index of the selector from the {@link projectionDef}
 */
export declare function projection(nodeIndex: number, selectorIndex?: number, attrs?: string[]): void;
/**
 * Adds LViewData or LContainer to the end of the current view tree.
 *
 * This structure will be used to traverse through nested views to remove listeners
 * and call onDestroy callbacks.
 *
 * @param currentView The view where LViewData or LContainer should be added
 * @param adjustedHostIndex Index of the view's host node in LViewData[], adjusted for header
 * @param state The LViewData or LContainer to add to the view tree
 * @returns The state passed in
 */
export declare function addToViewTree<T extends LViewData | LContainer>(currentView: LViewData, adjustedHostIndex: number, state: T): T;
/** If node is an OnPush component, marks its LViewData dirty. */
export declare function markDirtyIfOnPush(node: LElementNode): void;
/**
 * Wraps an event listener so its host view and its ancestor views will be marked dirty
 * whenever the event fires. Necessary to support OnPush components.
 */
export declare function wrapListenerWithDirtyLogic(view: LViewData, listenerFn: (e?: any) => any): (e: Event) => any;
/**
 * Wraps an event listener so its host view and its ancestor views will be marked dirty
 * whenever the event fires. Also wraps with preventDefault behavior.
 */
export declare function wrapListenerWithDirtyAndDefault(view: LViewData, listenerFn: (e?: any) => any): EventListener;
/** Marks current view and all ancestors dirty */
export declare function markViewDirty(view: LViewData): void;
/**
 * Used to schedule change detection on the whole application.
 *
 * Unlike `tick`, `scheduleTick` coalesces multiple calls into one change detection run.
 * It is usually called indirectly by calling `markDirty` when the view needs to be
 * re-rendered.
 *
 * Typically `scheduleTick` uses `requestAnimationFrame` to coalesce multiple
 * `scheduleTick` requests. The scheduling function can be overridden in
 * `renderComponent`'s `scheduler` option.
 */
export declare function scheduleTick<T>(rootContext: RootContext): void;
/**
 * Used to perform change detection on the whole application.
 *
 * This is equivalent to `detectChanges`, but invoked on root component. Additionally, `tick`
 * executes lifecycle hooks and conditionally checks components based on their
 * `ChangeDetectionStrategy` and dirtiness.
 *
 * The preferred way to trigger change detection is to call `markDirty`. `markDirty` internally
 * schedules `tick` using a scheduler in order to coalesce multiple `markDirty` calls into a
 * single change detection run. By default, the scheduler is `requestAnimationFrame`, but can
 * be changed when calling `renderComponent` and providing the `scheduler` option.
 */
export declare function tick<T>(component: T): void;
/**
 * Retrieve the root view from any component by walking the parent `LViewData` until
 * reaching the root `LViewData`.
 *
 * @param component any component
 */
export declare function getRootView(component: any): LViewData;
/**
 * Synchronously perform change detection on a component (and possibly its sub-components).
 *
 * This function triggers change detection in a synchronous way on a component. There should
 * be very little reason to call this function directly since a preferred way to do change
 * detection is to {@link markDirty} the component and wait for the scheduler to call this method
 * at some future point in time. This is because a single user action often results in many
 * components being invalidated and calling change detection on each component synchronously
 * would be inefficient. It is better to wait until all components are marked as dirty and
 * then perform single change detection across all of the components
 *
 * @param component The component which the change detection should be performed on.
 */
export declare function detectChanges<T>(component: T): void;
/**
 * Checks the change detector and its children, and throws if any changes are detected.
 *
 * This is used in development mode to verify that running change detection doesn't
 * introduce other changes.
 */
export declare function checkNoChanges<T>(component: T): void;
/** Checks the view of the component provided. Does not gate on dirty checks or execute doCheck. */
export declare function detectChangesInternal<T>(hostView: LViewData, hostNode: LElementNode, component: T): void;
/**
 * Mark the component as dirty (needing change detection).
 *
 * Marking a component dirty will schedule a change detection on this
 * component at some point in the future. Marking an already dirty
 * component as dirty is a noop. Only one outstanding change detection
 * can be scheduled per component tree. (Two components bootstrapped with
 * separate `renderComponent` will have separate schedulers)
 *
 * When the root component is bootstrapped with `renderComponent`, a scheduler
 * can be provided.
 *
 * @param component Component to mark as dirty.
 */
export declare function markDirty<T>(component: T): void;
export interface NO_CHANGE {
    brand: 'NO_CHANGE';
}
/** A special value which designates that a value has not changed. */
export declare const NO_CHANGE: NO_CHANGE;
/**
 * Creates a single value binding.
 *
 * @param value Value to diff
 */
export declare function bind<T>(value: T): T | NO_CHANGE;
/**
 * Reserves slots for pure functions (`pureFunctionX` instructions)
 *
 * Bindings for pure functions are stored after the LNodes in the data array but before the binding.
 *
 *  ----------------------------------------------------------------------------
 *  |  LNodes ... | pure function bindings | regular bindings / interpolations |
 *  ----------------------------------------------------------------------------
 *                                         ^
 *                                         TView.bindingStartIndex
 *
 * Pure function instructions are given an offset from TView.bindingStartIndex.
 * Subtracting the offset from TView.bindingStartIndex gives the first index where the bindings
 * are stored.
 *
 * NOTE: reserveSlots instructions are only ever allowed at the very end of the creation block
 */
export declare function reserveSlots(numSlots: number): void;
/**
 * Sets up the binding index before executing any `pureFunctionX` instructions.
 *
 * The index must be restored after the pure function is executed
 *
 * {@link reserveSlots}
 */
export declare function moveBindingIndexToReservedSlot(offset: number): number;
/**
 * Restores the binding index to the given value.
 *
 * This function is typically used to restore the index after a `pureFunctionX` has
 * been executed.
 */
export declare function restoreBindingIndex(index: number): void;
/**
 * Create interpolation bindings with a variable number of expressions.
 *
 * If there are 1 to 8 expressions `interpolation1()` to `interpolation8()` should be used instead.
 * Those are faster because there is no need to create an array of expressions and iterate over it.
 *
 * `values`:
 * - has static text at even indexes,
 * - has evaluated expressions at odd indexes.
 *
 * Returns the concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
export declare function interpolationV(values: any[]): string | NO_CHANGE;
/**
 * Creates an interpolation binding with 1 expression.
 *
 * @param prefix static value used for concatenation only.
 * @param v0 value checked for change.
 * @param suffix static value used for concatenation only.
 */
export declare function interpolation1(prefix: string, v0: any, suffix: string): string | NO_CHANGE;
/** Creates an interpolation binding with 2 expressions. */
export declare function interpolation2(prefix: string, v0: any, i0: string, v1: any, suffix: string): string | NO_CHANGE;
/** Creates an interpolation binding with 3 expressions. */
export declare function interpolation3(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, suffix: string): string | NO_CHANGE;
/** Create an interpolation binding with 4 expressions. */
export declare function interpolation4(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, suffix: string): string | NO_CHANGE;
/** Creates an interpolation binding with 5 expressions. */
export declare function interpolation5(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, suffix: string): string | NO_CHANGE;
/** Creates an interpolation binding with 6 expressions. */
export declare function interpolation6(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, suffix: string): string | NO_CHANGE;
/** Creates an interpolation binding with 7 expressions. */
export declare function interpolation7(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, suffix: string): string | NO_CHANGE;
/** Creates an interpolation binding with 8 expressions. */
export declare function interpolation8(prefix: string, v0: any, i0: string, v1: any, i1: string, v2: any, i2: string, v3: any, i3: string, v4: any, i4: string, v5: any, i5: string, v6: any, i6: string, v7: any, suffix: string): string | NO_CHANGE;
/** Store a value in the `data` at a given `index`. */
export declare function store<T>(index: number, value: T): void;
/** Retrieves a value from the `directives` array. */
export declare function loadDirective<T>(index: number): T;
export declare function loadQueryList<T>(queryListIdx: number): QueryList<T>;
/** Retrieves a value from current `viewData`. */
export declare function load<T>(index: number): T;
export declare function loadElement(index: number): LElementNode;
/** Gets the current binding value and increments the binding index. */
export declare function consumeBinding(): any;
/** Updates binding if changed, then returns whether it was updated. */
export declare function bindingUpdated(value: any): boolean;
/** Updates binding if changed, then returns the latest value. */
export declare function checkAndUpdateBinding(value: any): any;
/** Updates 2 bindings if changed, then returns whether either was updated. */
export declare function bindingUpdated2(exp1: any, exp2: any): boolean;
/** Updates 4 bindings if changed, then returns whether any was updated. */
export declare function bindingUpdated4(exp1: any, exp2: any, exp3: any, exp4: any): boolean;
export declare function getTView(): TView;
/**
 * Registers a QueryList, associated with a content query, for later refresh (part of a view
 * refresh).
 */
export declare function registerContentQuery<Q>(queryList: QueryList<Q>): void;
export declare function assertPreviousIsParent(): void;
/**
 * On the first template pass, the reserved slots should be set `NO_CHANGE`.
 *
 * If not, they might not have been actually reserved.
 */
export declare function assertReservedSlotInitialized(slotOffset: number, numSlots: number): void;
export declare function _getComponentHostLElementNode<T>(component: T): LElementNode;
export declare const CLEAN_PROMISE: Promise<null>;
export declare const ROOT_DIRECTIVE_INDICES: number[];
