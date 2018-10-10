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
import { checkAndUpdateElementDynamic, checkAndUpdateElementInline, createElement, listenToElementOutputs } from './element';
import { expressionChangedAfterItHasBeenCheckedError } from './errors';
import { appendNgContent } from './ng_content';
import { callLifecycleHooksChildrenFirst, checkAndUpdateDirectiveDynamic, checkAndUpdateDirectiveInline, createDirectiveInstance, createPipeInstance, createProviderInstance } from './provider';
import { checkAndUpdatePureExpressionDynamic, checkAndUpdatePureExpressionInline, createPureExpression } from './pure_expression';
import { checkAndUpdateQuery, createQuery } from './query';
import { createTemplateData, createViewContainerData } from './refs';
import { checkAndUpdateTextDynamic, checkAndUpdateTextInline, createText } from './text';
import { Services, asElementData, asQueryList, asTextData, shiftInitState } from './types';
import { NOOP, checkBindingNoChanges, isComponentView, markParentViewsForCheckProjectedViews, resolveDefinition, tokenKey } from './util';
import { detachProjectedView } from './view_attach';
/**
 * @param {?} flags
 * @param {?} nodes
 * @param {?=} updateDirectives
 * @param {?=} updateRenderer
 * @return {?}
 */
export function viewDef(flags, nodes, updateDirectives, updateRenderer) {
    /** @type {?} */
    let viewBindingCount = 0;
    /** @type {?} */
    let viewDisposableCount = 0;
    /** @type {?} */
    let viewNodeFlags = 0;
    /** @type {?} */
    let viewRootNodeFlags = 0;
    /** @type {?} */
    let viewMatchedQueries = 0;
    /** @type {?} */
    let currentParent = null;
    /** @type {?} */
    let currentRenderParent = null;
    /** @type {?} */
    let currentElementHasPublicProviders = false;
    /** @type {?} */
    let currentElementHasPrivateProviders = false;
    /** @type {?} */
    let lastRenderRootNode = null;
    for (let i = 0; i < nodes.length; i++) {
        /** @type {?} */
        const node = nodes[i];
        node.nodeIndex = i;
        node.parent = currentParent;
        node.bindingIndex = viewBindingCount;
        node.outputIndex = viewDisposableCount;
        node.renderParent = currentRenderParent;
        viewNodeFlags |= node.flags;
        viewMatchedQueries |= node.matchedQueryIds;
        if (node.element) {
            /** @type {?} */
            const elDef = node.element;
            elDef.publicProviders =
                currentParent ? /** @type {?} */ ((currentParent.element)).publicProviders : Object.create(null);
            elDef.allProviders = elDef.publicProviders;
            // Note: We assume that all providers of an element are before any child element!
            currentElementHasPublicProviders = false;
            currentElementHasPrivateProviders = false;
            if (node.element.template) {
                viewMatchedQueries |= node.element.template.nodeMatchedQueries;
            }
        }
        validateNode(currentParent, node, nodes.length);
        viewBindingCount += node.bindings.length;
        viewDisposableCount += node.outputs.length;
        if (!currentRenderParent && (node.flags & 3 /* CatRenderNode */)) {
            lastRenderRootNode = node;
        }
        if (node.flags & 20224 /* CatProvider */) {
            if (!currentElementHasPublicProviders) {
                currentElementHasPublicProviders = true; /** @type {?} */
                ((/** @type {?} */ ((currentParent)).element)).publicProviders = Object.create(/** @type {?} */ ((/** @type {?} */ ((currentParent)).element)).publicProviders); /** @type {?} */
                ((/** @type {?} */ ((currentParent)).element)).allProviders = /** @type {?} */ ((/** @type {?} */ ((currentParent)).element)).publicProviders;
            }
            /** @type {?} */
            const isPrivateService = (node.flags & 8192 /* PrivateProvider */) !== 0;
            /** @type {?} */
            const isComponent = (node.flags & 32768 /* Component */) !== 0;
            if (!isPrivateService || isComponent) {
                /** @type {?} */ ((/** @type {?} */ ((/** @type {?} */ ((currentParent)).element)).publicProviders))[tokenKey(/** @type {?} */ ((node.provider)).token)] = node;
            }
            else {
                if (!currentElementHasPrivateProviders) {
                    currentElementHasPrivateProviders = true; /** @type {?} */
                    ((/** @type {?} */ ((currentParent)).element)).allProviders = Object.create(/** @type {?} */ ((/** @type {?} */ ((currentParent)).element)).publicProviders);
                } /** @type {?} */
                ((/** @type {?} */ ((/** @type {?} */ ((currentParent)).element)).allProviders))[tokenKey(/** @type {?} */ ((node.provider)).token)] = node;
            }
            if (isComponent) {
                /** @type {?} */ ((/** @type {?} */ ((currentParent)).element)).componentProvider = node;
            }
        }
        if (currentParent) {
            currentParent.childFlags |= node.flags;
            currentParent.directChildFlags |= node.flags;
            currentParent.childMatchedQueries |= node.matchedQueryIds;
            if (node.element && node.element.template) {
                currentParent.childMatchedQueries |= node.element.template.nodeMatchedQueries;
            }
        }
        else {
            viewRootNodeFlags |= node.flags;
        }
        if (node.childCount > 0) {
            currentParent = node;
            if (!isNgContainer(node)) {
                currentRenderParent = node;
            }
        }
        else {
            // When the current node has no children, check if it is the last children of its parent.
            // When it is, propagate the flags up.
            // The loop is required because an element could be the last transitive children of several
            // elements. We loop to either the root or the highest opened element (= with remaining
            // children)
            while (currentParent && i === currentParent.nodeIndex + currentParent.childCount) {
                /** @type {?} */
                const newParent = currentParent.parent;
                if (newParent) {
                    newParent.childFlags |= currentParent.childFlags;
                    newParent.childMatchedQueries |= currentParent.childMatchedQueries;
                }
                currentParent = newParent;
                // We also need to update the render parent & account for ng-container
                if (currentParent && isNgContainer(currentParent)) {
                    currentRenderParent = currentParent.renderParent;
                }
                else {
                    currentRenderParent = currentParent;
                }
            }
        }
    }
    /** @type {?} */
    const handleEvent = (view, nodeIndex, eventName, event) => /** @type {?} */ ((/** @type {?} */ ((nodes[nodeIndex].element)).handleEvent))(view, eventName, event);
    return {
        // Will be filled later...
        factory: null,
        nodeFlags: viewNodeFlags,
        rootNodeFlags: viewRootNodeFlags,
        nodeMatchedQueries: viewMatchedQueries, flags,
        nodes: nodes,
        updateDirectives: updateDirectives || NOOP,
        updateRenderer: updateRenderer || NOOP, handleEvent,
        bindingCount: viewBindingCount,
        outputCount: viewDisposableCount, lastRenderRootNode
    };
}
/**
 * @param {?} node
 * @return {?}
 */
function isNgContainer(node) {
    return (node.flags & 1 /* TypeElement */) !== 0 && /** @type {?} */ ((node.element)).name === null;
}
/**
 * @param {?} parent
 * @param {?} node
 * @param {?} nodeCount
 * @return {?}
 */
function validateNode(parent, node, nodeCount) {
    /** @type {?} */
    const template = node.element && node.element.template;
    if (template) {
        if (!template.lastRenderRootNode) {
            throw new Error(`Illegal State: Embedded templates without nodes are not allowed!`);
        }
        if (template.lastRenderRootNode &&
            template.lastRenderRootNode.flags & 16777216 /* EmbeddedViews */) {
            throw new Error(`Illegal State: Last root node of a template can't have embedded views, at index ${node.nodeIndex}!`);
        }
    }
    if (node.flags & 20224 /* CatProvider */) {
        /** @type {?} */
        const parentFlags = parent ? parent.flags : 0;
        if ((parentFlags & 1 /* TypeElement */) === 0) {
            throw new Error(`Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index ${node.nodeIndex}!`);
        }
    }
    if (node.query) {
        if (node.flags & 67108864 /* TypeContentQuery */ &&
            (!parent || (parent.flags & 16384 /* TypeDirective */) === 0)) {
            throw new Error(`Illegal State: Content Query nodes need to be children of directives, at index ${node.nodeIndex}!`);
        }
        if (node.flags & 134217728 /* TypeViewQuery */ && parent) {
            throw new Error(`Illegal State: View Query nodes have to be top level nodes, at index ${node.nodeIndex}!`);
        }
    }
    if (node.childCount) {
        /** @type {?} */
        const parentEnd = parent ? parent.nodeIndex + parent.childCount : nodeCount - 1;
        if (node.nodeIndex <= parentEnd && node.nodeIndex + node.childCount > parentEnd) {
            throw new Error(`Illegal State: childCount of node leads outside of parent, at index ${node.nodeIndex}!`);
        }
    }
}
/**
 * @param {?} parent
 * @param {?} anchorDef
 * @param {?} viewDef
 * @param {?=} context
 * @return {?}
 */
export function createEmbeddedView(parent, anchorDef, viewDef, context) {
    /** @type {?} */
    const view = createView(parent.root, parent.renderer, parent, anchorDef, viewDef);
    initView(view, parent.component, context);
    createViewNodes(view);
    return view;
}
/**
 * @param {?} root
 * @param {?} def
 * @param {?=} context
 * @return {?}
 */
export function createRootView(root, def, context) {
    /** @type {?} */
    const view = createView(root, root.renderer, null, null, def);
    initView(view, context, context);
    createViewNodes(view);
    return view;
}
/**
 * @param {?} parentView
 * @param {?} nodeDef
 * @param {?} viewDef
 * @param {?} hostElement
 * @return {?}
 */
export function createComponentView(parentView, nodeDef, viewDef, hostElement) {
    /** @type {?} */
    const rendererType = /** @type {?} */ ((nodeDef.element)).componentRendererType;
    /** @type {?} */
    let compRenderer;
    if (!rendererType) {
        compRenderer = parentView.root.renderer;
    }
    else {
        compRenderer = parentView.root.rendererFactory.createRenderer(hostElement, rendererType);
    }
    return createView(parentView.root, compRenderer, parentView, /** @type {?} */ ((nodeDef.element)).componentProvider, viewDef);
}
/**
 * @param {?} root
 * @param {?} renderer
 * @param {?} parent
 * @param {?} parentNodeDef
 * @param {?} def
 * @return {?}
 */
function createView(root, renderer, parent, parentNodeDef, def) {
    /** @type {?} */
    const nodes = new Array(def.nodes.length);
    /** @type {?} */
    const disposables = def.outputCount ? new Array(def.outputCount) : null;
    /** @type {?} */
    const view = {
        def,
        parent,
        viewContainerParent: null, parentNodeDef,
        context: null,
        component: null, nodes,
        state: 13 /* CatInit */, root, renderer,
        oldValues: new Array(def.bindingCount), disposables,
        initIndex: -1
    };
    return view;
}
/**
 * @param {?} view
 * @param {?} component
 * @param {?} context
 * @return {?}
 */
function initView(view, component, context) {
    view.component = component;
    view.context = context;
}
/**
 * @param {?} view
 * @return {?}
 */
function createViewNodes(view) {
    /** @type {?} */
    let renderHost;
    if (isComponentView(view)) {
        /** @type {?} */
        const hostDef = view.parentNodeDef;
        renderHost = asElementData(/** @type {?} */ ((view.parent)), /** @type {?} */ ((/** @type {?} */ ((hostDef)).parent)).nodeIndex).renderElement;
    }
    /** @type {?} */
    const def = view.def;
    /** @type {?} */
    const nodes = view.nodes;
    for (let i = 0; i < def.nodes.length; i++) {
        /** @type {?} */
        const nodeDef = def.nodes[i];
        Services.setCurrentNode(view, i);
        /** @type {?} */
        let nodeData;
        switch (nodeDef.flags & 201347067 /* Types */) {
            case 1 /* TypeElement */:
                /** @type {?} */
                const el = /** @type {?} */ (createElement(view, renderHost, nodeDef));
                /** @type {?} */
                let componentView = /** @type {?} */ ((undefined));
                if (nodeDef.flags & 33554432 /* ComponentView */) {
                    /** @type {?} */
                    const compViewDef = resolveDefinition(/** @type {?} */ ((/** @type {?} */ ((nodeDef.element)).componentView)));
                    componentView = Services.createComponentView(view, nodeDef, compViewDef, el);
                }
                listenToElementOutputs(view, componentView, nodeDef, el);
                nodeData = /** @type {?} */ ({
                    renderElement: el,
                    componentView,
                    viewContainer: null,
                    template: /** @type {?} */ ((nodeDef.element)).template ? createTemplateData(view, nodeDef) : undefined
                });
                if (nodeDef.flags & 16777216 /* EmbeddedViews */) {
                    nodeData.viewContainer = createViewContainerData(view, nodeDef, nodeData);
                }
                break;
            case 2 /* TypeText */:
                nodeData = /** @type {?} */ (createText(view, renderHost, nodeDef));
                break;
            case 512 /* TypeClassProvider */:
            case 1024 /* TypeFactoryProvider */:
            case 2048 /* TypeUseExistingProvider */:
            case 256 /* TypeValueProvider */: {
                nodeData = nodes[i];
                if (!nodeData && !(nodeDef.flags & 4096 /* LazyProvider */)) {
                    /** @type {?} */
                    const instance = createProviderInstance(view, nodeDef);
                    nodeData = /** @type {?} */ ({ instance });
                }
                break;
            }
            case 16 /* TypePipe */: {
                /** @type {?} */
                const instance = createPipeInstance(view, nodeDef);
                nodeData = /** @type {?} */ ({ instance });
                break;
            }
            case 16384 /* TypeDirective */: {
                nodeData = nodes[i];
                if (!nodeData) {
                    /** @type {?} */
                    const instance = createDirectiveInstance(view, nodeDef);
                    nodeData = /** @type {?} */ ({ instance });
                }
                if (nodeDef.flags & 32768 /* Component */) {
                    /** @type {?} */
                    const compView = asElementData(view, /** @type {?} */ ((nodeDef.parent)).nodeIndex).componentView;
                    initView(compView, nodeData.instance, nodeData.instance);
                }
                break;
            }
            case 32 /* TypePureArray */:
            case 64 /* TypePureObject */:
            case 128 /* TypePurePipe */:
                nodeData = /** @type {?} */ (createPureExpression(view, nodeDef));
                break;
            case 67108864 /* TypeContentQuery */:
            case 134217728 /* TypeViewQuery */:
                nodeData = /** @type {?} */ (createQuery());
                break;
            case 8 /* TypeNgContent */:
                appendNgContent(view, renderHost, nodeDef);
                // no runtime data needed for NgContent...
                nodeData = undefined;
                break;
        }
        nodes[i] = nodeData;
    }
    // Create the ViewData.nodes of component views after we created everything else,
    // so that e.g. ng-content works
    execComponentViewsAction(view, ViewAction.CreateViewNodes);
    // fill static content and view queries
    execQueriesAction(view, 67108864 /* TypeContentQuery */ | 134217728 /* TypeViewQuery */, 268435456 /* StaticQuery */, 0 /* CheckAndUpdate */);
}
/**
 * @param {?} view
 * @return {?}
 */
export function checkNoChangesView(view) {
    markProjectedViewsForCheck(view);
    Services.updateDirectives(view, 1 /* CheckNoChanges */);
    execEmbeddedViewsAction(view, ViewAction.CheckNoChanges);
    Services.updateRenderer(view, 1 /* CheckNoChanges */);
    execComponentViewsAction(view, ViewAction.CheckNoChanges);
    // Note: We don't check queries for changes as we didn't do this in v2.x.
    // TODO(tbosch): investigate if we can enable the check again in v5.x with a nicer error message.
    view.state &= ~(64 /* CheckProjectedViews */ | 32 /* CheckProjectedView */);
}
/**
 * @param {?} view
 * @return {?}
 */
export function checkAndUpdateView(view) {
    if (view.state & 1 /* BeforeFirstCheck */) {
        view.state &= ~1 /* BeforeFirstCheck */;
        view.state |= 2 /* FirstCheck */;
    }
    else {
        view.state &= ~2 /* FirstCheck */;
    }
    shiftInitState(view, 0 /* InitState_BeforeInit */, 256 /* InitState_CallingOnInit */);
    markProjectedViewsForCheck(view);
    Services.updateDirectives(view, 0 /* CheckAndUpdate */);
    execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate);
    execQueriesAction(view, 67108864 /* TypeContentQuery */, 536870912 /* DynamicQuery */, 0 /* CheckAndUpdate */);
    /** @type {?} */
    let callInit = shiftInitState(view, 256 /* InitState_CallingOnInit */, 512 /* InitState_CallingAfterContentInit */);
    callLifecycleHooksChildrenFirst(view, 2097152 /* AfterContentChecked */ | (callInit ? 1048576 /* AfterContentInit */ : 0));
    Services.updateRenderer(view, 0 /* CheckAndUpdate */);
    execComponentViewsAction(view, ViewAction.CheckAndUpdate);
    execQueriesAction(view, 134217728 /* TypeViewQuery */, 536870912 /* DynamicQuery */, 0 /* CheckAndUpdate */);
    callInit = shiftInitState(view, 512 /* InitState_CallingAfterContentInit */, 768 /* InitState_CallingAfterViewInit */);
    callLifecycleHooksChildrenFirst(view, 8388608 /* AfterViewChecked */ | (callInit ? 4194304 /* AfterViewInit */ : 0));
    if (view.def.flags & 2 /* OnPush */) {
        view.state &= ~8 /* ChecksEnabled */;
    }
    view.state &= ~(64 /* CheckProjectedViews */ | 32 /* CheckProjectedView */);
    shiftInitState(view, 768 /* InitState_CallingAfterViewInit */, 1024 /* InitState_AfterInit */);
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @param {?} argStyle
 * @param {?=} v0
 * @param {?=} v1
 * @param {?=} v2
 * @param {?=} v3
 * @param {?=} v4
 * @param {?=} v5
 * @param {?=} v6
 * @param {?=} v7
 * @param {?=} v8
 * @param {?=} v9
 * @return {?}
 */
export function checkAndUpdateNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    if (argStyle === 0 /* Inline */) {
        return checkAndUpdateNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    }
    else {
        return checkAndUpdateNodeDynamic(view, nodeDef, v0);
    }
}
/**
 * @param {?} view
 * @return {?}
 */
function markProjectedViewsForCheck(view) {
    /** @type {?} */
    const def = view.def;
    if (!(def.nodeFlags & 4 /* ProjectedTemplate */)) {
        return;
    }
    for (let i = 0; i < def.nodes.length; i++) {
        /** @type {?} */
        const nodeDef = def.nodes[i];
        if (nodeDef.flags & 4 /* ProjectedTemplate */) {
            /** @type {?} */
            const projectedViews = asElementData(view, i).template._projectedViews;
            if (projectedViews) {
                for (let i = 0; i < projectedViews.length; i++) {
                    /** @type {?} */
                    const projectedView = projectedViews[i];
                    projectedView.state |= 32 /* CheckProjectedView */;
                    markParentViewsForCheckProjectedViews(projectedView, view);
                }
            }
        }
        else if ((nodeDef.childFlags & 4 /* ProjectedTemplate */) === 0) {
            // a parent with leafs
            // no child is a component,
            // then skip the children
            i += nodeDef.childCount;
        }
    }
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @param {?=} v0
 * @param {?=} v1
 * @param {?=} v2
 * @param {?=} v3
 * @param {?=} v4
 * @param {?=} v5
 * @param {?=} v6
 * @param {?=} v7
 * @param {?=} v8
 * @param {?=} v9
 * @return {?}
 */
function checkAndUpdateNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    switch (nodeDef.flags & 201347067 /* Types */) {
        case 1 /* TypeElement */:
            return checkAndUpdateElementInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
        case 2 /* TypeText */:
            return checkAndUpdateTextInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
        case 16384 /* TypeDirective */:
            return checkAndUpdateDirectiveInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
        case 32 /* TypePureArray */:
        case 64 /* TypePureObject */:
        case 128 /* TypePurePipe */:
            return checkAndUpdatePureExpressionInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
        default:
            throw 'unreachable';
    }
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @param {?} values
 * @return {?}
 */
function checkAndUpdateNodeDynamic(view, nodeDef, values) {
    switch (nodeDef.flags & 201347067 /* Types */) {
        case 1 /* TypeElement */:
            return checkAndUpdateElementDynamic(view, nodeDef, values);
        case 2 /* TypeText */:
            return checkAndUpdateTextDynamic(view, nodeDef, values);
        case 16384 /* TypeDirective */:
            return checkAndUpdateDirectiveDynamic(view, nodeDef, values);
        case 32 /* TypePureArray */:
        case 64 /* TypePureObject */:
        case 128 /* TypePurePipe */:
            return checkAndUpdatePureExpressionDynamic(view, nodeDef, values);
        default:
            throw 'unreachable';
    }
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @param {?} argStyle
 * @param {?=} v0
 * @param {?=} v1
 * @param {?=} v2
 * @param {?=} v3
 * @param {?=} v4
 * @param {?=} v5
 * @param {?=} v6
 * @param {?=} v7
 * @param {?=} v8
 * @param {?=} v9
 * @return {?}
 */
export function checkNoChangesNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    if (argStyle === 0 /* Inline */) {
        checkNoChangesNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    }
    else {
        checkNoChangesNodeDynamic(view, nodeDef, v0);
    }
    // Returning false is ok here as we would have thrown in case of a change.
    return false;
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @param {?} v0
 * @param {?} v1
 * @param {?} v2
 * @param {?} v3
 * @param {?} v4
 * @param {?} v5
 * @param {?} v6
 * @param {?} v7
 * @param {?} v8
 * @param {?} v9
 * @return {?}
 */
function checkNoChangesNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    /** @type {?} */
    const bindLen = nodeDef.bindings.length;
    if (bindLen > 0)
        checkBindingNoChanges(view, nodeDef, 0, v0);
    if (bindLen > 1)
        checkBindingNoChanges(view, nodeDef, 1, v1);
    if (bindLen > 2)
        checkBindingNoChanges(view, nodeDef, 2, v2);
    if (bindLen > 3)
        checkBindingNoChanges(view, nodeDef, 3, v3);
    if (bindLen > 4)
        checkBindingNoChanges(view, nodeDef, 4, v4);
    if (bindLen > 5)
        checkBindingNoChanges(view, nodeDef, 5, v5);
    if (bindLen > 6)
        checkBindingNoChanges(view, nodeDef, 6, v6);
    if (bindLen > 7)
        checkBindingNoChanges(view, nodeDef, 7, v7);
    if (bindLen > 8)
        checkBindingNoChanges(view, nodeDef, 8, v8);
    if (bindLen > 9)
        checkBindingNoChanges(view, nodeDef, 9, v9);
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @param {?} values
 * @return {?}
 */
function checkNoChangesNodeDynamic(view, nodeDef, values) {
    for (let i = 0; i < values.length; i++) {
        checkBindingNoChanges(view, nodeDef, i, values[i]);
    }
}
/**
 * Workaround https://github.com/angular/tsickle/issues/497
 * @suppress {misplacedTypeAnnotation}
 * @param {?} view
 * @param {?} nodeDef
 * @return {?}
 */
function checkNoChangesQuery(view, nodeDef) {
    /** @type {?} */
    const queryList = asQueryList(view, nodeDef.nodeIndex);
    if (queryList.dirty) {
        throw expressionChangedAfterItHasBeenCheckedError(Services.createDebugContext(view, nodeDef.nodeIndex), `Query ${(/** @type {?} */ ((nodeDef.query))).id} not dirty`, `Query ${(/** @type {?} */ ((nodeDef.query))).id} dirty`, (view.state & 1 /* BeforeFirstCheck */) !== 0);
    }
}
/**
 * @param {?} view
 * @return {?}
 */
export function destroyView(view) {
    if (view.state & 128 /* Destroyed */) {
        return;
    }
    execEmbeddedViewsAction(view, ViewAction.Destroy);
    execComponentViewsAction(view, ViewAction.Destroy);
    callLifecycleHooksChildrenFirst(view, 131072 /* OnDestroy */);
    if (view.disposables) {
        for (let i = 0; i < view.disposables.length; i++) {
            view.disposables[i]();
        }
    }
    detachProjectedView(view);
    if (view.renderer.destroyNode) {
        destroyViewNodes(view);
    }
    if (isComponentView(view)) {
        view.renderer.destroy();
    }
    view.state |= 128 /* Destroyed */;
}
/**
 * @param {?} view
 * @return {?}
 */
function destroyViewNodes(view) {
    /** @type {?} */
    const len = view.def.nodes.length;
    for (let i = 0; i < len; i++) {
        /** @type {?} */
        const def = view.def.nodes[i];
        if (def.flags & 1 /* TypeElement */) {
            /** @type {?} */ ((view.renderer.destroyNode))(asElementData(view, i).renderElement);
        }
        else if (def.flags & 2 /* TypeText */) {
            /** @type {?} */ ((view.renderer.destroyNode))(asTextData(view, i).renderText);
        }
        else if (def.flags & 67108864 /* TypeContentQuery */ || def.flags & 134217728 /* TypeViewQuery */) {
            asQueryList(view, i).destroy();
        }
    }
}
/** @enum {number} */
const ViewAction = {
    CreateViewNodes: 0,
    CheckNoChanges: 1,
    CheckNoChangesProjectedViews: 2,
    CheckAndUpdate: 3,
    CheckAndUpdateProjectedViews: 4,
    Destroy: 5,
};
ViewAction[ViewAction.CreateViewNodes] = 'CreateViewNodes';
ViewAction[ViewAction.CheckNoChanges] = 'CheckNoChanges';
ViewAction[ViewAction.CheckNoChangesProjectedViews] = 'CheckNoChangesProjectedViews';
ViewAction[ViewAction.CheckAndUpdate] = 'CheckAndUpdate';
ViewAction[ViewAction.CheckAndUpdateProjectedViews] = 'CheckAndUpdateProjectedViews';
ViewAction[ViewAction.Destroy] = 'Destroy';
/**
 * @param {?} view
 * @param {?} action
 * @return {?}
 */
function execComponentViewsAction(view, action) {
    /** @type {?} */
    const def = view.def;
    if (!(def.nodeFlags & 33554432 /* ComponentView */)) {
        return;
    }
    for (let i = 0; i < def.nodes.length; i++) {
        /** @type {?} */
        const nodeDef = def.nodes[i];
        if (nodeDef.flags & 33554432 /* ComponentView */) {
            // a leaf
            callViewAction(asElementData(view, i).componentView, action);
        }
        else if ((nodeDef.childFlags & 33554432 /* ComponentView */) === 0) {
            // a parent with leafs
            // no child is a component,
            // then skip the children
            i += nodeDef.childCount;
        }
    }
}
/**
 * @param {?} view
 * @param {?} action
 * @return {?}
 */
function execEmbeddedViewsAction(view, action) {
    /** @type {?} */
    const def = view.def;
    if (!(def.nodeFlags & 16777216 /* EmbeddedViews */)) {
        return;
    }
    for (let i = 0; i < def.nodes.length; i++) {
        /** @type {?} */
        const nodeDef = def.nodes[i];
        if (nodeDef.flags & 16777216 /* EmbeddedViews */) {
            /** @type {?} */
            const embeddedViews = /** @type {?} */ ((asElementData(view, i).viewContainer))._embeddedViews;
            for (let k = 0; k < embeddedViews.length; k++) {
                callViewAction(embeddedViews[k], action);
            }
        }
        else if ((nodeDef.childFlags & 16777216 /* EmbeddedViews */) === 0) {
            // a parent with leafs
            // no child is a component,
            // then skip the children
            i += nodeDef.childCount;
        }
    }
}
/**
 * @param {?} view
 * @param {?} action
 * @return {?}
 */
function callViewAction(view, action) {
    /** @type {?} */
    const viewState = view.state;
    switch (action) {
        case ViewAction.CheckNoChanges:
            if ((viewState & 128 /* Destroyed */) === 0) {
                if ((viewState & 12 /* CatDetectChanges */) === 12 /* CatDetectChanges */) {
                    checkNoChangesView(view);
                }
                else if (viewState & 64 /* CheckProjectedViews */) {
                    execProjectedViewsAction(view, ViewAction.CheckNoChangesProjectedViews);
                }
            }
            break;
        case ViewAction.CheckNoChangesProjectedViews:
            if ((viewState & 128 /* Destroyed */) === 0) {
                if (viewState & 32 /* CheckProjectedView */) {
                    checkNoChangesView(view);
                }
                else if (viewState & 64 /* CheckProjectedViews */) {
                    execProjectedViewsAction(view, action);
                }
            }
            break;
        case ViewAction.CheckAndUpdate:
            if ((viewState & 128 /* Destroyed */) === 0) {
                if ((viewState & 12 /* CatDetectChanges */) === 12 /* CatDetectChanges */) {
                    checkAndUpdateView(view);
                }
                else if (viewState & 64 /* CheckProjectedViews */) {
                    execProjectedViewsAction(view, ViewAction.CheckAndUpdateProjectedViews);
                }
            }
            break;
        case ViewAction.CheckAndUpdateProjectedViews:
            if ((viewState & 128 /* Destroyed */) === 0) {
                if (viewState & 32 /* CheckProjectedView */) {
                    checkAndUpdateView(view);
                }
                else if (viewState & 64 /* CheckProjectedViews */) {
                    execProjectedViewsAction(view, action);
                }
            }
            break;
        case ViewAction.Destroy:
            // Note: destroyView recurses over all views,
            // so we don't need to special case projected views here.
            destroyView(view);
            break;
        case ViewAction.CreateViewNodes:
            createViewNodes(view);
            break;
    }
}
/**
 * @param {?} view
 * @param {?} action
 * @return {?}
 */
function execProjectedViewsAction(view, action) {
    execEmbeddedViewsAction(view, action);
    execComponentViewsAction(view, action);
}
/**
 * @param {?} view
 * @param {?} queryFlags
 * @param {?} staticDynamicQueryFlag
 * @param {?} checkType
 * @return {?}
 */
function execQueriesAction(view, queryFlags, staticDynamicQueryFlag, checkType) {
    if (!(view.def.nodeFlags & queryFlags) || !(view.def.nodeFlags & staticDynamicQueryFlag)) {
        return;
    }
    /** @type {?} */
    const nodeCount = view.def.nodes.length;
    for (let i = 0; i < nodeCount; i++) {
        /** @type {?} */
        const nodeDef = view.def.nodes[i];
        if ((nodeDef.flags & queryFlags) && (nodeDef.flags & staticDynamicQueryFlag)) {
            Services.setCurrentNode(view, nodeDef.nodeIndex);
            switch (checkType) {
                case 0 /* CheckAndUpdate */:
                    checkAndUpdateQuery(view, nodeDef);
                    break;
                case 1 /* CheckNoChanges */:
                    checkNoChangesQuery(view, nodeDef);
                    break;
            }
        }
        if (!(nodeDef.childFlags & queryFlags) || !(nodeDef.childFlags & staticDynamicQueryFlag)) {
            // no child has a matching query
            // then skip the children
            i += nodeDef.childCount;
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3ZpZXcvdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVVBLE9BQU8sRUFBQyw0QkFBNEIsRUFBRSwyQkFBMkIsRUFBRSxhQUFhLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDM0gsT0FBTyxFQUFDLDJDQUEyQyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFDLCtCQUErQixFQUFFLDhCQUE4QixFQUFFLDZCQUE2QixFQUFFLHVCQUF1QixFQUFFLGtCQUFrQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQy9MLE9BQU8sRUFBQyxtQ0FBbUMsRUFBRSxrQ0FBa0MsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2hJLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDekQsT0FBTyxFQUFDLGtCQUFrQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ25FLE9BQU8sRUFBQyx5QkFBeUIsRUFBRSx3QkFBd0IsRUFBRSxVQUFVLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDdkYsT0FBTyxFQUE2RixRQUFRLEVBQW1GLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUN0USxPQUFPLEVBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFLGVBQWUsRUFBRSxxQ0FBcUMsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDeEksT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQUVsRCxNQUFNLGtCQUNGLEtB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LEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUMvRixFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU87O0lBQzNCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3hDLElBQUksT0FBTyxHQUFHLENBQUM7UUFBRSxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RCxJQUFJLE9BQU8sR0FBRyxDQUFDO1FBQUUscUJBQXFCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0QsSUFBSSxPQUFPLEdBQUcsQ0FBQztRQUFFLHFCQUFxQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdELElBQUksT0FBTyxHQUFHLENBQUM7UUFBRSxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RCxJQUFJLE9BQU8sR0FBRyxDQUFDO1FBQUUscUJBQXFCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0QsSUFBSSxPQUFPLEdBQUcsQ0FBQztRQUFFLHFCQUFxQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdELElBQUksT0FBTyxHQUFHLENBQUM7UUFBRSxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RCxJQUFJLE9BQU8sR0FBRyxDQUFDO1FBQUUscUJBQXFCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0QsSUFBSSxPQUFPLEdBQUcsQ0FBQztRQUFFLHFCQUFxQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFF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LENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxzQkFBc0IsQ0FBQyxFQUFFOzs7WUFHeEYsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUM7U0FDekI7S0FDRjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1JlbmRlcmVyMn0gZnJvbSAnLi4vcmVuZGVyL2FwaSc7XG5cbmltcG9ydCB7Y2hlY2tBbmRVcGRhdGVFbGVtZW50RHluYW1pYywgY2hlY2tBbmRVcGRhdGVFbGVtZW50SW5saW5lLCBjcmVhdGVFbGVtZW50LCBsaXN0ZW5Ub0VsZW1lbnRPdXRwdXRzfSBmcm9tICcuL2VsZW1lbnQnO1xuaW1wb3J0IHtleHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQge2FwcGVuZE5nQ29udGVudH0gZnJvbSAnLi9uZ19jb250ZW50JztcbmltcG9ydCB7Y2FsbExpZmVjeWNsZUhvb2tzQ2hpbGRyZW5GaXJzdCwgY2hlY2tBbmRVcGRhdGVEaXJlY3RpdmVEeW5hbWljLCBjaGVja0FuZFVwZGF0ZURpcmVjdGl2ZUlubGluZSwgY3JlYXRlRGlyZWN0aXZlSW5zdGFuY2UsIGNyZWF0ZVBpcGVJbnN0YW5jZSwgY3JlYXRlUHJvdmlkZXJJbnN0YW5jZX0gZnJvbSAnLi9wcm92aWRlcic7XG5pbXBvcnQge2NoZWNrQW5kVXBkYXRlUHVyZUV4cHJlc3Npb25EeW5hbWljLCBjaGVja0FuZFVwZGF0ZVB1cmVFeHByZXNzaW9uSW5saW5lLCBjcmVhdGVQdXJlRXhwcmVzc2lvbn0gZnJvbSAnLi9wdXJlX2V4cHJlc3Npb24nO1xuaW1wb3J0IHtjaGVja0FuZFVwZGF0ZVF1ZXJ5LCBjcmVhdGVRdWVyeX0gZnJvbSAnLi9xdWVyeSc7XG5pbXBvcnQge2NyZWF0ZVRlbXBsYXRlRGF0YSwgY3JlYXRlVmlld0NvbnRhaW5lckRhdGF9IGZyb20gJy4vcmVmcyc7XG5pbXBvcnQge2NoZWNrQW5kVXBkYXRlVGV4dER5bmFtaWMsIGNoZWNrQW5kVXBkYXRlVGV4dElubGluZSwgY3JlYXRlVGV4dH0gZnJvbSAnLi90ZXh0JztcbmltcG9ydCB7QXJndW1lbnRUeXBlLCBDaGVja1R5cGUsIEVsZW1lbnREYXRhLCBOb2RlRGF0YSwgTm9kZURlZiwgTm9kZUZsYWdzLCBQcm92aWRlckRhdGEsIFJvb3REYXRhLCBTZXJ2aWNlcywgVmlld0RhdGEsIFZpZXdEZWZpbml0aW9uLCBWaWV3RmxhZ3MsIFZpZXdIYW5kbGVFdmVudEZuLCBWaWV3U3RhdGUsIFZpZXdVcGRhdGVGbiwgYXNFbGVtZW50RGF0YSwgYXNRdWVyeUxpc3QsIGFzVGV4dERhdGEsIHNoaWZ0SW5pdFN0YXRlfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7Tk9PUCwgY2hlY2tCaW5kaW5nTm9DaGFuZ2VzLCBpc0NvbXBvbmVudFZpZXcsIG1hcmtQYXJlbnRWaWV3c0ZvckNoZWNrUHJvamVjdGVkVmlld3MsIHJlc29sdmVEZWZpbml0aW9uLCB0b2tlbktleX0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7ZGV0YWNoUHJvamVjdGVkVmlld30gZnJvbSAnLi92aWV3X2F0dGFjaCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB2aWV3RGVmKFxuICAgIGZsYWdzOiBWaWV3RmxhZ3MsIG5vZGVzOiBOb2RlRGVmW10sIHVwZGF0ZURpcmVjdGl2ZXM/OiBudWxsIHwgVmlld1VwZGF0ZUZuLFxuICAgIHVwZGF0ZVJlbmRlcmVyPzogbnVsbCB8IFZpZXdVcGRhdGVGbik6IFZpZXdEZWZpbml0aW9uIHtcbiAgLy8gY2xvbmUgbm9kZXMgYW5kIHNldCBhdXRvIGNhbGN1bGF0ZWQgdmFsdWVzXG4gIGxldCB2aWV3QmluZGluZ0NvdW50ID0gMDtcbiAgbGV0IHZpZXdEaXNwb3NhYmxlQ291bnQgPSAwO1xuICBsZXQgdmlld05vZGVGbGFncyA9IDA7XG4gIGxldCB2aWV3Um9vdE5vZGVGbGFncyA9IDA7XG4gIGxldCB2aWV3TWF0Y2hlZFF1ZXJpZXMgPSAwO1xuICBsZXQgY3VycmVudFBhcmVudDogTm9kZURlZnxudWxsID0gbnVsbDtcbiAgbGV0IGN1cnJlbnRSZW5kZXJQYXJlbnQ6IE5vZGVEZWZ8bnVsbCA9IG51bGw7XG4gIGxldCBjdXJyZW50RWxlbWVudEhhc1B1YmxpY1Byb3ZpZGVycyA9IGZhbHNlO1xuICBsZXQgY3VycmVudEVsZW1lbnRIYXNQcml2YXRlUHJvdmlkZXJzID0gZmFsc2U7XG4gIGxldCBsYXN0UmVuZGVyUm9vdE5vZGU6IE5vZGVEZWZ8bnVsbCA9IG51bGw7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgbm9kZS5ub2RlSW5kZXggPSBpO1xuICAgIG5vZGUucGFyZW50ID0gY3VycmVudFBhcmVudDtcbiAgICBub2RlLmJpbmRpbmdJbmRleCA9IHZpZXdCaW5kaW5nQ291bnQ7XG4gICAgbm9kZS5vdXRwdXRJbmRleCA9IHZpZXdEaXNwb3NhYmxlQ291bnQ7XG4gICAgbm9kZS5yZW5kZXJQYXJlbnQgPSBjdXJyZW50UmVuZGVyUGFyZW50O1xuXG4gICAgdmlld05vZGVGbGFncyB8PSBub2RlLmZsYWdzO1xuICAgIHZpZXdNYXRjaGVkUXVlcmllcyB8PSBub2RlLm1hdGNoZWRRdWVyeUlkcztcblxuICAgIGlmIChub2RlLmVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGVsRGVmID0gbm9kZS5lbGVtZW50O1xuICAgICAgZWxEZWYucHVibGljUHJvdmlkZXJzID1cbiAgICAgICAgICBjdXJyZW50UGFyZW50ID8gY3VycmVudFBhcmVudC5lbGVtZW50ICEucHVibGljUHJvdmlkZXJzIDogT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIGVsRGVmLmFsbFByb3ZpZGVycyA9IGVsRGVmLnB1YmxpY1Byb3ZpZGVycztcbiAgICAgIC8vIE5vdGU6IFdlIGFzc3VtZSB0aGF0IGFsbCBwcm92aWRlcnMgb2YgYW4gZWxlbWVudCBhcmUgYmVmb3JlIGFueSBjaGlsZCBlbGVtZW50IVxuICAgICAgY3VycmVudEVsZW1lbnRIYXNQdWJsaWNQcm92aWRlcnMgPSBmYWxzZTtcbiAgICAgIGN1cnJlbnRFbGVtZW50SGFzUHJpdmF0ZVByb3ZpZGVycyA9IGZhbHNlO1xuXG4gICAgICBpZiAobm9kZS5lbGVtZW50LnRlbXBsYXRlKSB7XG4gICAgICAgIHZpZXdNYXRjaGVkUXVlcmllcyB8PSBub2RlLmVsZW1lbnQudGVtcGxhdGUubm9kZU1hdGNoZWRRdWVyaWVzO1xuICAgICAgfVxuICAgIH1cbiAgICB2YWxpZGF0ZU5vZGUoY3VycmVudFBhcmVudCwgbm9kZSwgbm9kZXMubGVuZ3RoKTtcblxuXG4gICAgdmlld0JpbmRpbmdDb3VudCArPSBub2RlLmJpbmRpbmdzLmxlbmd0aDtcbiAgICB2aWV3RGlzcG9zYWJsZUNvdW50ICs9IG5vZGUub3V0cHV0cy5sZW5ndGg7XG5cbiAgICBpZiAoIWN1cnJlbnRSZW5kZXJQYXJlbnQgJiYgKG5vZGUuZmxhZ3MgJiBOb2RlRmxhZ3MuQ2F0UmVuZGVyTm9kZSkpIHtcbiAgICAgIGxhc3RSZW5kZXJSb290Tm9kZSA9IG5vZGU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuZmxhZ3MgJiBOb2RlRmxhZ3MuQ2F0UHJvdmlkZXIpIHtcbiAgICAgIGlmICghY3VycmVudEVsZW1lbnRIYXNQdWJsaWNQcm92aWRlcnMpIHtcbiAgICAgICAgY3VycmVudEVsZW1lbnRIYXNQdWJsaWNQcm92aWRlcnMgPSB0cnVlO1xuICAgICAgICAvLyBVc2UgcHJvdG90eXBpY2FsIGluaGVyaXRhbmNlIHRvIG5vdCBnZXQgTyhuXjIpIGNvbXBsZXhpdHkuLi5cbiAgICAgICAgY3VycmVudFBhcmVudCAhLmVsZW1lbnQgIS5wdWJsaWNQcm92aWRlcnMgPVxuICAgICAgICAgICAgT2JqZWN0LmNyZWF0ZShjdXJyZW50UGFyZW50ICEuZWxlbWVudCAhLnB1YmxpY1Byb3ZpZGVycyk7XG4gICAgICAgIGN1cnJlbnRQYXJlbnQgIS5lbGVtZW50ICEuYWxsUHJvdmlkZXJzID0gY3VycmVudFBhcmVudCAhLmVsZW1lbnQgIS5wdWJsaWNQcm92aWRlcnM7XG4gICAgICB9XG4gICAgICBjb25zdCBpc1ByaXZhdGVTZXJ2aWNlID0gKG5vZGUuZmxhZ3MgJiBOb2RlRmxhZ3MuUHJpdmF0ZVByb3ZpZGVyKSAhPT0gMDtcbiAgICAgIGNvbnN0IGlzQ29tcG9uZW50ID0gKG5vZGUuZmxhZ3MgJiBOb2RlRmxhZ3MuQ29tcG9uZW50KSAhPT0gMDtcbiAgICAgIGlmICghaXNQcml2YXRlU2VydmljZSB8fCBpc0NvbXBvbmVudCkge1xuICAgICAgICBjdXJyZW50UGFyZW50ICEuZWxlbWVudCAhLnB1YmxpY1Byb3ZpZGVycyAhW3Rva2VuS2V5KG5vZGUucHJvdmlkZXIgIS50b2tlbildID0gbm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghY3VycmVudEVsZW1lbnRIYXNQcml2YXRlUHJvdmlkZXJzKSB7XG4gICAgICAgICAgY3VycmVudEVsZW1lbnRIYXNQcml2YXRlUHJvdmlkZXJzID0gdHJ1ZTtcbiAgICAgICAgICAvLyBVc2UgcHJvdG90eXBpY2FsIGluaGVyaXRhbmNlIHRvIG5vdCBnZXQgTyhuXjIpIGNvbXBsZXhpdHkuLi5cbiAgICAgICAgICBjdXJyZW50UGFyZW50ICEuZWxlbWVudCAhLmFsbFByb3ZpZGVycyA9XG4gICAgICAgICAgICAgIE9iamVjdC5jcmVhdGUoY3VycmVudFBhcmVudCAhLmVsZW1lbnQgIS5wdWJsaWNQcm92aWRlcnMpO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQYXJlbnQgIS5lbGVtZW50ICEuYWxsUHJvdmlkZXJzICFbdG9rZW5LZXkobm9kZS5wcm92aWRlciAhLnRva2VuKV0gPSBub2RlO1xuICAgICAgfVxuICAgICAgaWYgKGlzQ29tcG9uZW50KSB7XG4gICAgICAgIGN1cnJlbnRQYXJlbnQgIS5lbGVtZW50ICEuY29tcG9uZW50UHJvdmlkZXIgPSBub2RlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjdXJyZW50UGFyZW50KSB7XG4gICAgICBjdXJyZW50UGFyZW50LmNoaWxkRmxhZ3MgfD0gbm9kZS5mbGFncztcbiAgICAgIGN1cnJlbnRQYXJlbnQuZGlyZWN0Q2hpbGRGbGFncyB8PSBub2RlLmZsYWdzO1xuICAgICAgY3VycmVudFBhcmVudC5jaGlsZE1hdGNoZWRRdWVyaWVzIHw9IG5vZGUubWF0Y2hlZFF1ZXJ5SWRzO1xuICAgICAgaWYgKG5vZGUuZWxlbWVudCAmJiBub2RlLmVsZW1lbnQudGVtcGxhdGUpIHtcbiAgICAgICAgY3VycmVudFBhcmVudC5jaGlsZE1hdGNoZWRRdWVyaWVzIHw9IG5vZGUuZWxlbWVudC50ZW1wbGF0ZS5ub2RlTWF0Y2hlZFF1ZXJpZXM7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXdSb290Tm9kZUZsYWdzIHw9IG5vZGUuZmxhZ3M7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuY2hpbGRDb3VudCA+IDApIHtcbiAgICAgIGN1cnJlbnRQYXJlbnQgPSBub2RlO1xuXG4gICAgICBpZiAoIWlzTmdDb250YWluZXIobm9kZSkpIHtcbiAgICAgICAgY3VycmVudFJlbmRlclBhcmVudCA9IG5vZGU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFdoZW4gdGhlIGN1cnJlbnQgbm9kZSBoYXMgbm8gY2hpbGRyZW4sIGNoZWNrIGlmIGl0IGlzIHRoZSBsYXN0IGNoaWxkcmVuIG9mIGl0cyBwYXJlbnQuXG4gICAgICAvLyBXaGVuIGl0IGlzLCBwcm9wYWdhdGUgdGhlIGZsYWdzIHVwLlxuICAgICAgLy8gVGhlIGxvb3AgaXMgcmVxdWlyZWQgYmVjYXVzZSBhbiBlbGVtZW50IGNvdWxkIGJlIHRoZSBsYXN0IHRyYW5zaXRpdmUgY2hpbGRyZW4gb2Ygc2V2ZXJhbFxuICAgICAgLy8gZWxlbWVudHMuIFdlIGxvb3AgdG8gZWl0aGVyIHRoZSByb290IG9yIHRoZSBoaWdoZXN0IG9wZW5lZCBlbGVtZW50ICg9IHdpdGggcmVtYWluaW5nXG4gICAgICAvLyBjaGlsZHJlbilcbiAgICAgIHdoaWxlIChjdXJyZW50UGFyZW50ICYmIGkgPT09IGN1cnJlbnRQYXJlbnQubm9kZUluZGV4ICsgY3VycmVudFBhcmVudC5jaGlsZENvdW50KSB7XG4gICAgICAgIGNvbnN0IG5ld1BhcmVudDogTm9kZURlZnxudWxsID0gY3VycmVudFBhcmVudC5wYXJlbnQ7XG4gICAgICAgIGlmIChuZXdQYXJlbnQpIHtcbiAgICAgICAgICBuZXdQYXJlbnQuY2hpbGRGbGFncyB8PSBjdXJyZW50UGFyZW50LmNoaWxkRmxhZ3M7XG4gICAgICAgICAgbmV3UGFyZW50LmNoaWxkTWF0Y2hlZFF1ZXJpZXMgfD0gY3VycmVudFBhcmVudC5jaGlsZE1hdGNoZWRRdWVyaWVzO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQYXJlbnQgPSBuZXdQYXJlbnQ7XG4gICAgICAgIC8vIFdlIGFsc28gbmVlZCB0byB1cGRhdGUgdGhlIHJlbmRlciBwYXJlbnQgJiBhY2NvdW50IGZvciBuZy1jb250YWluZXJcbiAgICAgICAgaWYgKGN1cnJlbnRQYXJlbnQgJiYgaXNOZ0NvbnRhaW5lcihjdXJyZW50UGFyZW50KSkge1xuICAgICAgICAgIGN1cnJlbnRSZW5kZXJQYXJlbnQgPSBjdXJyZW50UGFyZW50LnJlbmRlclBhcmVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJyZW50UmVuZGVyUGFyZW50ID0gY3VycmVudFBhcmVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGhhbmRsZUV2ZW50OiBWaWV3SGFuZGxlRXZlbnRGbiA9ICh2aWV3LCBub2RlSW5kZXgsIGV2ZW50TmFtZSwgZXZlbnQpID0+XG4gICAgICBub2Rlc1tub2RlSW5kZXhdLmVsZW1lbnQgIS5oYW5kbGVFdmVudCAhKHZpZXcsIGV2ZW50TmFtZSwgZXZlbnQpO1xuXG4gIHJldHVybiB7XG4gICAgLy8gV2lsbCBiZSBmaWxsZWQgbGF0ZXIuLi5cbiAgICBmYWN0b3J5OiBudWxsLFxuICAgIG5vZGVGbGFnczogdmlld05vZGVGbGFncyxcbiAgICByb290Tm9kZUZsYWdzOiB2aWV3Um9vdE5vZGVGbGFncyxcbiAgICBub2RlTWF0Y2hlZFF1ZXJpZXM6IHZpZXdNYXRjaGVkUXVlcmllcywgZmxhZ3MsXG4gICAgbm9kZXM6IG5vZGVzLFxuICAgIHVwZGF0ZURpcmVjdGl2ZXM6IHVwZGF0ZURpcmVjdGl2ZXMgfHwgTk9PUCxcbiAgICB1cGRhdGVSZW5kZXJlcjogdXBkYXRlUmVuZGVyZXIgfHwgTk9PUCwgaGFuZGxlRXZlbnQsXG4gICAgYmluZGluZ0NvdW50OiB2aWV3QmluZGluZ0NvdW50LFxuICAgIG91dHB1dENvdW50OiB2aWV3RGlzcG9zYWJsZUNvdW50LCBsYXN0UmVuZGVyUm9vdE5vZGVcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNOZ0NvbnRhaW5lcihub2RlOiBOb2RlRGVmKTogYm9vbGVhbiB7XG4gIHJldHVybiAobm9kZS5mbGFncyAmIE5vZGVGbGFncy5UeXBlRWxlbWVudCkgIT09IDAgJiYgbm9kZS5lbGVtZW50ICEubmFtZSA9PT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVOb2RlKHBhcmVudDogTm9kZURlZiB8IG51bGwsIG5vZGU6IE5vZGVEZWYsIG5vZGVDb3VudDogbnVtYmVyKSB7XG4gIGNvbnN0IHRlbXBsYXRlID0gbm9kZS5lbGVtZW50ICYmIG5vZGUuZWxlbWVudC50ZW1wbGF0ZTtcbiAgaWYgKHRlbXBsYXRlKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZS5sYXN0UmVuZGVyUm9vdE5vZGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSWxsZWdhbCBTdGF0ZTogRW1iZWRkZWQgdGVtcGxhdGVzIHdpdGhvdXQgbm9kZXMgYXJlIG5vdCBhbGxvd2VkIWApO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGUubGFzdFJlbmRlclJvb3ROb2RlICYmXG4gICAgICAgIHRlbXBsYXRlLmxhc3RSZW5kZXJSb290Tm9kZS5mbGFncyAmIE5vZGVGbGFncy5FbWJlZGRlZFZpZXdzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYElsbGVnYWwgU3RhdGU6IExhc3Qgcm9vdCBub2RlIG9mIGEgdGVtcGxhdGUgY2FuJ3QgaGF2ZSBlbWJlZGRlZCB2aWV3cywgYXQgaW5kZXggJHtub2RlLm5vZGVJbmRleH0hYCk7XG4gICAgfVxuICB9XG4gIGlmIChub2RlLmZsYWdzICYgTm9kZUZsYWdzLkNhdFByb3ZpZGVyKSB7XG4gICAgY29uc3QgcGFyZW50RmxhZ3MgPSBwYXJlbnQgPyBwYXJlbnQuZmxhZ3MgOiAwO1xuICAgIGlmICgocGFyZW50RmxhZ3MgJiBOb2RlRmxhZ3MuVHlwZUVsZW1lbnQpID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYElsbGVnYWwgU3RhdGU6IFN0YXRpY1Byb3ZpZGVyL0RpcmVjdGl2ZSBub2RlcyBuZWVkIHRvIGJlIGNoaWxkcmVuIG9mIGVsZW1lbnRzIG9yIGFuY2hvcnMsIGF0IGluZGV4ICR7bm9kZS5ub2RlSW5kZXh9IWApO1xuICAgIH1cbiAgfVxuICBpZiAobm9kZS5xdWVyeSkge1xuICAgIGlmIChub2RlLmZsYWdzICYgTm9kZUZsYWdzLlR5cGVDb250ZW50UXVlcnkgJiZcbiAgICAgICAgKCFwYXJlbnQgfHwgKHBhcmVudC5mbGFncyAmIE5vZGVGbGFncy5UeXBlRGlyZWN0aXZlKSA9PT0gMCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgSWxsZWdhbCBTdGF0ZTogQ29udGVudCBRdWVyeSBub2RlcyBuZWVkIHRvIGJlIGNoaWxkcmVuIG9mIGRpcmVjdGl2ZXMsIGF0IGluZGV4ICR7bm9kZS5ub2RlSW5kZXh9IWApO1xuICAgIH1cbiAgICBpZiAobm9kZS5mbGFncyAmIE5vZGVGbGFncy5UeXBlVmlld1F1ZXJ5ICYmIHBhcmVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBJbGxlZ2FsIFN0YXRlOiBWaWV3IFF1ZXJ5IG5vZGVzIGhhdmUgdG8gYmUgdG9wIGxldmVsIG5vZGVzLCBhdCBpbmRleCAke25vZGUubm9kZUluZGV4fSFgKTtcbiAgICB9XG4gIH1cbiAgaWYgKG5vZGUuY2hpbGRDb3VudCkge1xuICAgIGNvbnN0IHBhcmVudEVuZCA9IHBhcmVudCA/IHBhcmVudC5ub2RlSW5kZXggKyBwYXJlbnQuY2hpbGRDb3VudCA6IG5vZGVDb3VudCAtIDE7XG4gICAgaWYgKG5vZGUubm9kZUluZGV4IDw9IHBhcmVudEVuZCAmJiBub2RlLm5vZGVJbmRleCArIG5vZGUuY2hpbGRDb3VudCA+IHBhcmVudEVuZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBJbGxlZ2FsIFN0YXRlOiBjaGlsZENvdW50IG9mIG5vZGUgbGVhZHMgb3V0c2lkZSBvZiBwYXJlbnQsIGF0IGluZGV4ICR7bm9kZS5ub2RlSW5kZXh9IWApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRW1iZWRkZWRWaWV3KFxuICAgIHBhcmVudDogVmlld0RhdGEsIGFuY2hvckRlZjogTm9kZURlZiwgdmlld0RlZjogVmlld0RlZmluaXRpb24sIGNvbnRleHQ/OiBhbnkpOiBWaWV3RGF0YSB7XG4gIC8vIGVtYmVkZGVkIHZpZXdzIGFyZSBzZWVuIGFzIHNpYmxpbmdzIHRvIHRoZSBhbmNob3IsIHNvIHdlIG5lZWRcbiAgLy8gdG8gZ2V0IHRoZSBwYXJlbnQgb2YgdGhlIGFuY2hvciBhbmQgdXNlIGl0IGFzIHBhcmVudEluZGV4LlxuICBjb25zdCB2aWV3ID0gY3JlYXRlVmlldyhwYXJlbnQucm9vdCwgcGFyZW50LnJlbmRlcmVyLCBwYXJlbnQsIGFuY2hvckRlZiwgdmlld0RlZik7XG4gIGluaXRWaWV3KHZpZXcsIHBhcmVudC5jb21wb25lbnQsIGNvbnRleHQpO1xuICBjcmVhdGVWaWV3Tm9kZXModmlldyk7XG4gIHJldHVybiB2aWV3O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm9vdFZpZXcocm9vdDogUm9vdERhdGEsIGRlZjogVmlld0RlZmluaXRpb24sIGNvbnRleHQ/OiBhbnkpOiBWaWV3RGF0YSB7XG4gIGNvbnN0IHZpZXcgPSBjcmVhdGVWaWV3KHJvb3QsIHJvb3QucmVuZGVyZXIsIG51bGwsIG51bGwsIGRlZik7XG4gIGluaXRWaWV3KHZpZXcsIGNvbnRleHQsIGNvbnRleHQpO1xuICBjcmVhdGVWaWV3Tm9kZXModmlldyk7XG4gIHJldHVybiB2aWV3O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50VmlldyhcbiAgICBwYXJlbnRWaWV3OiBWaWV3RGF0YSwgbm9kZURlZjogTm9kZURlZiwgdmlld0RlZjogVmlld0RlZmluaXRpb24sIGhvc3RFbGVtZW50OiBhbnkpOiBWaWV3RGF0YSB7XG4gIGNvbnN0IHJlbmRlcmVyVHlwZSA9IG5vZGVEZWYuZWxlbWVudCAhLmNvbXBvbmVudFJlbmRlcmVyVHlwZTtcbiAgbGV0IGNvbXBSZW5kZXJlcjogUmVuZGVyZXIyO1xuICBpZiAoIXJlbmRlcmVyVHlwZSkge1xuICAgIGNvbXBSZW5kZXJlciA9IHBhcmVudFZpZXcucm9vdC5yZW5kZXJlcjtcbiAgfSBlbHNlIHtcbiAgICBjb21wUmVuZGVyZXIgPSBwYXJlbnRWaWV3LnJvb3QucmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKGhvc3RFbGVtZW50LCByZW5kZXJlclR5cGUpO1xuICB9XG4gIHJldHVybiBjcmVhdGVWaWV3KFxuICAgICAgcGFyZW50Vmlldy5yb290LCBjb21wUmVuZGVyZXIsIHBhcmVudFZpZXcsIG5vZGVEZWYuZWxlbWVudCAhLmNvbXBvbmVudFByb3ZpZGVyLCB2aWV3RGVmKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmlldyhcbiAgICByb290OiBSb290RGF0YSwgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcGFyZW50OiBWaWV3RGF0YSB8IG51bGwsIHBhcmVudE5vZGVEZWY6IE5vZGVEZWYgfCBudWxsLFxuICAgIGRlZjogVmlld0RlZmluaXRpb24pOiBWaWV3RGF0YSB7XG4gIGNvbnN0IG5vZGVzOiBOb2RlRGF0YVtdID0gbmV3IEFycmF5KGRlZi5ub2Rlcy5sZW5ndGgpO1xuICBjb25zdCBkaXNwb3NhYmxlcyA9IGRlZi5vdXRwdXRDb3VudCA/IG5ldyBBcnJheShkZWYub3V0cHV0Q291bnQpIDogbnVsbDtcbiAgY29uc3QgdmlldzogVmlld0RhdGEgPSB7XG4gICAgZGVmLFxuICAgIHBhcmVudCxcbiAgICB2aWV3Q29udGFpbmVyUGFyZW50OiBudWxsLCBwYXJlbnROb2RlRGVmLFxuICAgIGNvbnRleHQ6IG51bGwsXG4gICAgY29tcG9uZW50OiBudWxsLCBub2RlcyxcbiAgICBzdGF0ZTogVmlld1N0YXRlLkNhdEluaXQsIHJvb3QsIHJlbmRlcmVyLFxuICAgIG9sZFZhbHVlczogbmV3IEFycmF5KGRlZi5iaW5kaW5nQ291bnQpLCBkaXNwb3NhYmxlcyxcbiAgICBpbml0SW5kZXg6IC0xXG4gIH07XG4gIHJldHVybiB2aWV3O1xufVxuXG5mdW5jdGlvbiBpbml0Vmlldyh2aWV3OiBWaWV3RGF0YSwgY29tcG9uZW50OiBhbnksIGNvbnRleHQ6IGFueSkge1xuICB2aWV3LmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgdmlldy5jb250ZXh0ID0gY29udGV4dDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmlld05vZGVzKHZpZXc6IFZpZXdEYXRhKSB7XG4gIGxldCByZW5kZXJIb3N0OiBhbnk7XG4gIGlmIChpc0NvbXBvbmVudFZpZXcodmlldykpIHtcbiAgICBjb25zdCBob3N0RGVmID0gdmlldy5wYXJlbnROb2RlRGVmO1xuICAgIHJlbmRlckhvc3QgPSBhc0VsZW1lbnREYXRhKHZpZXcucGFyZW50ICEsIGhvc3REZWYgIS5wYXJlbnQgIS5ub2RlSW5kZXgpLnJlbmRlckVsZW1lbnQ7XG4gIH1cbiAgY29uc3QgZGVmID0gdmlldy5kZWY7XG4gIGNvbnN0IG5vZGVzID0gdmlldy5ub2RlcztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWYubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBub2RlRGVmID0gZGVmLm5vZGVzW2ldO1xuICAgIFNlcnZpY2VzLnNldEN1cnJlbnROb2RlKHZpZXcsIGkpO1xuICAgIGxldCBub2RlRGF0YTogYW55O1xuICAgIHN3aXRjaCAobm9kZURlZi5mbGFncyAmIE5vZGVGbGFncy5UeXBlcykge1xuICAgICAgY2FzZSBOb2RlRmxhZ3MuVHlwZUVsZW1lbnQ6XG4gICAgICAgIGNvbnN0IGVsID0gY3JlYXRlRWxlbWVudCh2aWV3LCByZW5kZXJIb3N0LCBub2RlRGVmKSBhcyBhbnk7XG4gICAgICAgIGxldCBjb21wb25lbnRWaWV3OiBWaWV3RGF0YSA9IHVuZGVmaW5lZCAhO1xuICAgICAgICBpZiAobm9kZURlZi5mbGFncyAmIE5vZGVGbGFncy5Db21wb25lbnRWaWV3KSB7XG4gICAgICAgICAgY29uc3QgY29tcFZpZXdEZWYgPSByZXNvbHZlRGVmaW5pdGlvbihub2RlRGVmLmVsZW1lbnQgIS5jb21wb25lbnRWaWV3ICEpO1xuICAgICAgICAgIGNvbXBvbmVudFZpZXcgPSBTZXJ2aWNlcy5jcmVhdGVDb21wb25lbnRWaWV3KHZpZXcsIG5vZGVEZWYsIGNvbXBWaWV3RGVmLCBlbCk7XG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuVG9FbGVtZW50T3V0cHV0cyh2aWV3LCBjb21wb25lbnRWaWV3LCBub2RlRGVmLCBlbCk7XG4gICAgICAgIG5vZGVEYXRhID0gPEVsZW1lbnREYXRhPntcbiAgICAgICAgICByZW5kZXJFbGVtZW50OiBlbCxcbiAgICAgICAgICBjb21wb25lbnRWaWV3LFxuICAgICAgICAgIHZpZXdDb250YWluZXI6IG51bGwsXG4gICAgICAgICAgdGVtcGxhdGU6IG5vZGVEZWYuZWxlbWVudCAhLnRlbXBsYXRlID8gY3JlYXRlVGVtcGxhdGVEYXRhKHZpZXcsIG5vZGVEZWYpIDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIGlmIChub2RlRGVmLmZsYWdzICYgTm9kZUZsYWdzLkVtYmVkZGVkVmlld3MpIHtcbiAgICAgICAgICBub2RlRGF0YS52aWV3Q29udGFpbmVyID0gY3JlYXRlVmlld0NvbnRhaW5lckRhdGEodmlldywgbm9kZURlZiwgbm9kZURhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBOb2RlRmxhZ3MuVHlwZVRleHQ6XG4gICAgICAgIG5vZGVEYXRhID0gY3JlYXRlVGV4dCh2aWV3LCByZW5kZXJIb3N0LCBub2RlRGVmKSBhcyBhbnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBOb2RlRmxhZ3MuVHlwZUNsYXNzUHJvdmlkZXI6XG4gICAgICBjYXNlIE5vZGVGbGFncy5UeXBlRmFjdG9yeVByb3ZpZGVyOlxuICAgICAgY2FzZSBOb2RlRmxhZ3MuVHlwZVVzZUV4aXN0aW5nUHJvdmlkZXI6XG4gICAgICBjYXNlIE5vZGVGbGFncy5UeXBlVmFsdWVQcm92aWRlcjoge1xuICAgICAgICBub2RlRGF0YSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAoIW5vZGVEYXRhICYmICEobm9kZURlZi5mbGFncyAmIE5vZGVGbGFncy5MYXp5UHJvdmlkZXIpKSB7XG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBjcmVhdGVQcm92aWRlckluc3RhbmNlKHZpZXcsIG5vZGVEZWYpO1xuICAgICAgICAgIG5vZGVEYXRhID0gPFByb3ZpZGVyRGF0YT57aW5zdGFuY2V9O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBOb2RlRmxhZ3MuVHlwZVBpcGU6IHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBjcmVhdGVQaXBlSW5zdGFuY2Uodmlldywgbm9kZURlZik7XG4gICAgICAgIG5vZGVEYXRhID0gPFByb3ZpZGVyRGF0YT57aW5zdGFuY2V9O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVEaXJlY3RpdmU6IHtcbiAgICAgICAgbm9kZURhdGEgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKCFub2RlRGF0YSkge1xuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gY3JlYXRlRGlyZWN0aXZlSW5zdGFuY2Uodmlldywgbm9kZURlZik7XG4gICAgICAgICAgbm9kZURhdGEgPSA8UHJvdmlkZXJEYXRhPntpbnN0YW5jZX07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGVEZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuQ29tcG9uZW50KSB7XG4gICAgICAgICAgY29uc3QgY29tcFZpZXcgPSBhc0VsZW1lbnREYXRhKHZpZXcsIG5vZGVEZWYucGFyZW50ICEubm9kZUluZGV4KS5jb21wb25lbnRWaWV3O1xuICAgICAgICAgIGluaXRWaWV3KGNvbXBWaWV3LCBub2RlRGF0YS5pbnN0YW5jZSwgbm9kZURhdGEuaW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBOb2RlRmxhZ3MuVHlwZVB1cmVBcnJheTpcbiAgICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVQdXJlT2JqZWN0OlxuICAgICAgY2FzZSBOb2RlRmxhZ3MuVHlwZVB1cmVQaXBlOlxuICAgICAgICBub2RlRGF0YSA9IGNyZWF0ZVB1cmVFeHByZXNzaW9uKHZpZXcsIG5vZGVEZWYpIGFzIGFueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE5vZGVGbGFncy5UeXBlQ29udGVudFF1ZXJ5OlxuICAgICAgY2FzZSBOb2RlRmxhZ3MuVHlwZVZpZXdRdWVyeTpcbiAgICAgICAgbm9kZURhdGEgPSBjcmVhdGVRdWVyeSgpIGFzIGFueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE5vZGVGbGFncy5UeXBlTmdDb250ZW50OlxuICAgICAgICBhcHBlbmROZ0NvbnRlbnQodmlldywgcmVuZGVySG9zdCwgbm9kZURlZik7XG4gICAgICAgIC8vIG5vIHJ1bnRpbWUgZGF0YSBuZWVkZWQgZm9yIE5nQ29udGVudC4uLlxuICAgICAgICBub2RlRGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG5vZGVzW2ldID0gbm9kZURhdGE7XG4gIH1cbiAgLy8gQ3JlYXRlIHRoZSBWaWV3RGF0YS5ub2RlcyBvZiBjb21wb25lbnQgdmlld3MgYWZ0ZXIgd2UgY3JlYXRlZCBldmVyeXRoaW5nIGVsc2UsXG4gIC8vIHNvIHRoYXQgZS5nLiBuZy1jb250ZW50IHdvcmtzXG4gIGV4ZWNDb21wb25lbnRWaWV3c0FjdGlvbih2aWV3LCBWaWV3QWN0aW9uLkNyZWF0ZVZpZXdOb2Rlcyk7XG5cbiAgLy8gZmlsbCBzdGF0aWMgY29udGVudCBhbmQgdmlldyBxdWVyaWVzXG4gIGV4ZWNRdWVyaWVzQWN0aW9uKFxuICAgICAgdmlldywgTm9kZUZsYWdzLlR5cGVDb250ZW50UXVlcnkgfCBOb2RlRmxhZ3MuVHlwZVZpZXdRdWVyeSwgTm9kZUZsYWdzLlN0YXRpY1F1ZXJ5LFxuICAgICAgQ2hlY2tUeXBlLkNoZWNrQW5kVXBkYXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrTm9DaGFuZ2VzVmlldyh2aWV3OiBWaWV3RGF0YSkge1xuICBtYXJrUHJvamVjdGVkVmlld3NGb3JDaGVjayh2aWV3KTtcbiAgU2VydmljZXMudXBkYXRlRGlyZWN0aXZlcyh2aWV3LCBDaGVja1R5cGUuQ2hlY2tOb0NoYW5nZXMpO1xuICBleGVjRW1iZWRkZWRWaWV3c0FjdGlvbih2aWV3LCBWaWV3QWN0aW9uLkNoZWNrTm9DaGFuZ2VzKTtcbiAgU2VydmljZXMudXBkYXRlUmVuZGVyZXIodmlldywgQ2hlY2tUeXBlLkNoZWNrTm9DaGFuZ2VzKTtcbiAgZXhlY0NvbXBvbmVudFZpZXdzQWN0aW9uKHZpZXcsIFZpZXdBY3Rpb24uQ2hlY2tOb0NoYW5nZXMpO1xuICAvLyBOb3RlOiBXZSBkb24ndCBjaGVjayBxdWVyaWVzIGZvciBjaGFuZ2VzIGFzIHdlIGRpZG4ndCBkbyB0aGlzIGluIHYyLnguXG4gIC8vIFRPRE8odGJvc2NoKTogaW52ZXN0aWdhdGUgaWYgd2UgY2FuIGVuYWJsZSB0aGUgY2hlY2sgYWdhaW4gaW4gdjUueCB3aXRoIGEgbmljZXIgZXJyb3IgbWVzc2FnZS5cbiAgdmlldy5zdGF0ZSAmPSB+KFZpZXdTdGF0ZS5DaGVja1Byb2plY3RlZFZpZXdzIHwgVmlld1N0YXRlLkNoZWNrUHJvamVjdGVkVmlldyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0FuZFVwZGF0ZVZpZXcodmlldzogVmlld0RhdGEpIHtcbiAgaWYgKHZpZXcuc3RhdGUgJiBWaWV3U3RhdGUuQmVmb3JlRmlyc3RDaGVjaykge1xuICAgIHZpZXcuc3RhdGUgJj0gflZpZXdTdGF0ZS5CZWZvcmVGaXJzdENoZWNrO1xuICAgIHZpZXcuc3RhdGUgfD0gVmlld1N0YXRlLkZpcnN0Q2hlY2s7XG4gIH0gZWxzZSB7XG4gICAgdmlldy5zdGF0ZSAmPSB+Vmlld1N0YXRlLkZpcnN0Q2hlY2s7XG4gIH1cbiAgc2hpZnRJbml0U3RhdGUodmlldywgVmlld1N0YXRlLkluaXRTdGF0ZV9CZWZvcmVJbml0LCBWaWV3U3RhdGUuSW5pdFN0YXRlX0NhbGxpbmdPbkluaXQpO1xuICBtYXJrUHJvamVjdGVkVmlld3NGb3JDaGVjayh2aWV3KTtcbiAgU2VydmljZXMudXBkYXRlRGlyZWN0aXZlcyh2aWV3LCBDaGVja1R5cGUuQ2hlY2tBbmRVcGRhdGUpO1xuICBleGVjRW1iZWRkZWRWaWV3c0FjdGlvbih2aWV3LCBWaWV3QWN0aW9uLkNoZWNrQW5kVXBkYXRlKTtcbiAgZXhlY1F1ZXJpZXNBY3Rpb24oXG4gICAgICB2aWV3LCBOb2RlRmxhZ3MuVHlwZUNvbnRlbnRRdWVyeSwgTm9kZUZsYWdzLkR5bmFtaWNRdWVyeSwgQ2hlY2tUeXBlLkNoZWNrQW5kVXBkYXRlKTtcbiAgbGV0IGNhbGxJbml0ID0gc2hpZnRJbml0U3RhdGUoXG4gICAgICB2aWV3LCBWaWV3U3RhdGUuSW5pdFN0YXRlX0NhbGxpbmdPbkluaXQsIFZpZXdTdGF0ZS5Jbml0U3RhdGVfQ2FsbGluZ0FmdGVyQ29udGVudEluaXQpO1xuICBjYWxsTGlmZWN5Y2xlSG9va3NDaGlsZHJlbkZpcnN0KFxuICAgICAgdmlldywgTm9kZUZsYWdzLkFmdGVyQ29udGVudENoZWNrZWQgfCAoY2FsbEluaXQgPyBOb2RlRmxhZ3MuQWZ0ZXJDb250ZW50SW5pdCA6IDApKTtcblxuICBTZXJ2aWNlcy51cGRhdGVSZW5kZXJlcih2aWV3LCBDaGVja1R5cGUuQ2hlY2tBbmRVcGRhdGUpO1xuXG4gIGV4ZWNDb21wb25lbnRWaWV3c0FjdGlvbih2aWV3LCBWaWV3QWN0aW9uLkNoZWNrQW5kVXBkYXRlKTtcbiAgZXhlY1F1ZXJpZXNBY3Rpb24oXG4gICAgICB2aWV3LCBOb2RlRmxhZ3MuVHlwZVZpZXdRdWVyeSwgTm9kZUZsYWdzLkR5bmFtaWNRdWVyeSwgQ2hlY2tUeXBlLkNoZWNrQW5kVXBkYXRlKTtcbiAgY2FsbEluaXQgPSBzaGlmdEluaXRTdGF0ZShcbiAgICAgIHZpZXcsIFZpZXdTdGF0ZS5Jbml0U3RhdGVfQ2FsbGluZ0FmdGVyQ29udGVudEluaXQsIFZpZXdTdGF0ZS5Jbml0U3RhdGVfQ2FsbGluZ0FmdGVyVmlld0luaXQpO1xuICBjYWxsTGlmZWN5Y2xlSG9va3NDaGlsZHJlbkZpcnN0KFxuICAgICAgdmlldywgTm9kZUZsYWdzLkFmdGVyVmlld0NoZWNrZWQgfCAoY2FsbEluaXQgPyBOb2RlRmxhZ3MuQWZ0ZXJWaWV3SW5pdCA6IDApKTtcblxuICBpZiAodmlldy5kZWYuZmxhZ3MgJiBWaWV3RmxhZ3MuT25QdXNoKSB7XG4gICAgdmlldy5zdGF0ZSAmPSB+Vmlld1N0YXRlLkNoZWNrc0VuYWJsZWQ7XG4gIH1cbiAgdmlldy5zdGF0ZSAmPSB+KFZpZXdTdGF0ZS5DaGVja1Byb2plY3RlZFZpZXdzIHwgVmlld1N0YXRlLkNoZWNrUHJvamVjdGVkVmlldyk7XG4gIHNoaWZ0SW5pdFN0YXRlKHZpZXcsIFZpZXdTdGF0ZS5Jbml0U3RhdGVfQ2FsbGluZ0FmdGVyVmlld0luaXQsIFZpZXdTdGF0ZS5Jbml0U3RhdGVfQWZ0ZXJJbml0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQW5kVXBkYXRlTm9kZShcbiAgICB2aWV3OiBWaWV3RGF0YSwgbm9kZURlZjogTm9kZURlZiwgYXJnU3R5bGU6IEFyZ3VtZW50VHlwZSwgdjA/OiBhbnksIHYxPzogYW55LCB2Mj86IGFueSxcbiAgICB2Mz86IGFueSwgdjQ/OiBhbnksIHY1PzogYW55LCB2Nj86IGFueSwgdjc/OiBhbnksIHY4PzogYW55LCB2OT86IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoYXJnU3R5bGUgPT09IEFyZ3VtZW50VHlwZS5JbmxpbmUpIHtcbiAgICByZXR1cm4gY2hlY2tBbmRVcGRhdGVOb2RlSW5saW5lKHZpZXcsIG5vZGVEZWYsIHYwLCB2MSwgdjIsIHYzLCB2NCwgdjUsIHY2LCB2NywgdjgsIHY5KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY2hlY2tBbmRVcGRhdGVOb2RlRHluYW1pYyh2aWV3LCBub2RlRGVmLCB2MCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFya1Byb2plY3RlZFZpZXdzRm9yQ2hlY2sodmlldzogVmlld0RhdGEpIHtcbiAgY29uc3QgZGVmID0gdmlldy5kZWY7XG4gIGlmICghKGRlZi5ub2RlRmxhZ3MgJiBOb2RlRmxhZ3MuUHJvamVjdGVkVGVtcGxhdGUpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGVmLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgbm9kZURlZiA9IGRlZi5ub2Rlc1tpXTtcbiAgICBpZiAobm9kZURlZi5mbGFncyAmIE5vZGVGbGFncy5Qcm9qZWN0ZWRUZW1wbGF0ZSkge1xuICAgICAgY29uc3QgcHJvamVjdGVkVmlld3MgPSBhc0VsZW1lbnREYXRhKHZpZXcsIGkpLnRlbXBsYXRlLl9wcm9qZWN0ZWRWaWV3cztcbiAgICAgIGlmIChwcm9qZWN0ZWRWaWV3cykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RlZFZpZXdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgcHJvamVjdGVkVmlldyA9IHByb2plY3RlZFZpZXdzW2ldO1xuICAgICAgICAgIHByb2plY3RlZFZpZXcuc3RhdGUgfD0gVmlld1N0YXRlLkNoZWNrUHJvamVjdGVkVmlldztcbiAgICAgICAgICBtYXJrUGFyZW50Vmlld3NGb3JDaGVja1Byb2plY3RlZFZpZXdzKHByb2plY3RlZFZpZXcsIHZpZXcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgobm9kZURlZi5jaGlsZEZsYWdzICYgTm9kZUZsYWdzLlByb2plY3RlZFRlbXBsYXRlKSA9PT0gMCkge1xuICAgICAgLy8gYSBwYXJlbnQgd2l0aCBsZWFmc1xuICAgICAgLy8gbm8gY2hpbGQgaXMgYSBjb21wb25lbnQsXG4gICAgICAvLyB0aGVuIHNraXAgdGhlIGNoaWxkcmVuXG4gICAgICBpICs9IG5vZGVEZWYuY2hpbGRDb3VudDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tBbmRVcGRhdGVOb2RlSW5saW5lKFxuICAgIHZpZXc6IFZpZXdEYXRhLCBub2RlRGVmOiBOb2RlRGVmLCB2MD86IGFueSwgdjE/OiBhbnksIHYyPzogYW55LCB2Mz86IGFueSwgdjQ/OiBhbnksIHY1PzogYW55LFxuICAgIHY2PzogYW55LCB2Nz86IGFueSwgdjg/OiBhbnksIHY5PzogYW55KTogYm9vbGVhbiB7XG4gIHN3aXRjaCAobm9kZURlZi5mbGFncyAmIE5vZGVGbGFncy5UeXBlcykge1xuICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVFbGVtZW50OlxuICAgICAgcmV0dXJuIGNoZWNrQW5kVXBkYXRlRWxlbWVudElubGluZSh2aWV3LCBub2RlRGVmLCB2MCwgdjEsIHYyLCB2MywgdjQsIHY1LCB2NiwgdjcsIHY4LCB2OSk7XG4gICAgY2FzZSBOb2RlRmxhZ3MuVHlwZVRleHQ6XG4gICAgICByZXR1cm4gY2hlY2tBbmRVcGRhdGVUZXh0SW5saW5lKHZpZXcsIG5vZGVEZWYsIHYwLCB2MSwgdjIsIHYzLCB2NCwgdjUsIHY2LCB2NywgdjgsIHY5KTtcbiAgICBjYXNlIE5vZGVGbGFncy5UeXBlRGlyZWN0aXZlOlxuICAgICAgcmV0dXJuIGNoZWNrQW5kVXBkYXRlRGlyZWN0aXZlSW5saW5lKHZpZXcsIG5vZGVEZWYsIHYwLCB2MSwgdjIsIHYzLCB2NCwgdjUsIHY2LCB2NywgdjgsIHY5KTtcbiAgICBjYXNlIE5vZGVGbGFncy5UeXBlUHVyZUFycmF5OlxuICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVQdXJlT2JqZWN0OlxuICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVQdXJlUGlwZTpcbiAgICAgIHJldHVybiBjaGVja0FuZFVwZGF0ZVB1cmVFeHByZXNzaW9uSW5saW5lKFxuICAgICAgICAgIHZpZXcsIG5vZGVEZWYsIHYwLCB2MSwgdjIsIHYzLCB2NCwgdjUsIHY2LCB2NywgdjgsIHY5KTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgJ3VucmVhY2hhYmxlJztcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0FuZFVwZGF0ZU5vZGVEeW5hbWljKHZpZXc6IFZpZXdEYXRhLCBub2RlRGVmOiBOb2RlRGVmLCB2YWx1ZXM6IGFueVtdKTogYm9vbGVhbiB7XG4gIHN3aXRjaCAobm9kZURlZi5mbGFncyAmIE5vZGVGbGFncy5UeXBlcykge1xuICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVFbGVtZW50OlxuICAgICAgcmV0dXJuIGNoZWNrQW5kVXBkYXRlRWxlbWVudER5bmFtaWModmlldywgbm9kZURlZiwgdmFsdWVzKTtcbiAgICBjYXNlIE5vZGVGbGFncy5UeXBlVGV4dDpcbiAgICAgIHJldHVybiBjaGVja0FuZFVwZGF0ZVRleHREeW5hbWljKHZpZXcsIG5vZGVEZWYsIHZhbHVlcyk7XG4gICAgY2FzZSBOb2RlRmxhZ3MuVHlwZURpcmVjdGl2ZTpcbiAgICAgIHJldHVybiBjaGVja0FuZFVwZGF0ZURpcmVjdGl2ZUR5bmFtaWModmlldywgbm9kZURlZiwgdmFsdWVzKTtcbiAgICBjYXNlIE5vZGVGbGFncy5UeXBlUHVyZUFycmF5OlxuICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVQdXJlT2JqZWN0OlxuICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVQdXJlUGlwZTpcbiAgICAgIHJldHVybiBjaGVja0FuZFVwZGF0ZVB1cmVFeHByZXNzaW9uRHluYW1pYyh2aWV3LCBub2RlRGVmLCB2YWx1ZXMpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyAndW5yZWFjaGFibGUnO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja05vQ2hhbmdlc05vZGUoXG4gICAgdmlldzogVmlld0RhdGEsIG5vZGVEZWY6IE5vZGVEZWYsIGFyZ1N0eWxlOiBBcmd1bWVudFR5cGUsIHYwPzogYW55LCB2MT86IGFueSwgdjI/OiBhbnksXG4gICAgdjM/OiBhbnksIHY0PzogYW55LCB2NT86IGFueSwgdjY/OiBhbnksIHY3PzogYW55LCB2OD86IGFueSwgdjk/OiBhbnkpOiBhbnkge1xuICBpZiAoYXJnU3R5bGUgPT09IEFyZ3VtZW50VHlwZS5JbmxpbmUpIHtcbiAgICBjaGVja05vQ2hhbmdlc05vZGVJbmxpbmUodmlldywgbm9kZURlZiwgdjAsIHYxLCB2MiwgdjMsIHY0LCB2NSwgdjYsIHY3LCB2OCwgdjkpO1xuICB9IGVsc2Uge1xuICAgIGNoZWNrTm9DaGFuZ2VzTm9kZUR5bmFtaWModmlldywgbm9kZURlZiwgdjApO1xuICB9XG4gIC8vIFJldHVybmluZyBmYWxzZSBpcyBvayBoZXJlIGFzIHdlIHdvdWxkIGhhdmUgdGhyb3duIGluIGNhc2Ugb2YgYSBjaGFuZ2UuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY2hlY2tOb0NoYW5nZXNOb2RlSW5saW5lKFxuICAgIHZpZXc6IFZpZXdEYXRhLCBub2RlRGVmOiBOb2RlRGVmLCB2MDogYW55LCB2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55LCB2NTogYW55LCB2NjogYW55LFxuICAgIHY3OiBhbnksIHY4OiBhbnksIHY5OiBhbnkpOiB2b2lkIHtcbiAgY29uc3QgYmluZExlbiA9IG5vZGVEZWYuYmluZGluZ3MubGVuZ3RoO1xuICBpZiAoYmluZExlbiA+IDApIGNoZWNrQmluZGluZ05vQ2hhbmdlcyh2aWV3LCBub2RlRGVmLCAwLCB2MCk7XG4gIGlmIChiaW5kTGVuID4gMSkgY2hlY2tCaW5kaW5nTm9DaGFuZ2VzKHZpZXcsIG5vZGVEZWYsIDEsIHYxKTtcbiAgaWYgKGJpbmRMZW4gPiAyKSBjaGVja0JpbmRpbmdOb0NoYW5nZXModmlldywgbm9kZURlZiwgMiwgdjIpO1xuICBpZiAoYmluZExlbiA+IDMpIGNoZWNrQmluZGluZ05vQ2hhbmdlcyh2aWV3LCBub2RlRGVmLCAzLCB2Myk7XG4gIGlmIChiaW5kTGVuID4gNCkgY2hlY2tCaW5kaW5nTm9DaGFuZ2VzKHZpZXcsIG5vZGVEZWYsIDQsIHY0KTtcbiAgaWYgKGJpbmRMZW4gPiA1KSBjaGVja0JpbmRpbmdOb0NoYW5nZXModmlldywgbm9kZURlZiwgNSwgdjUpO1xuICBpZiAoYmluZExlbiA+IDYpIGNoZWNrQmluZGluZ05vQ2hhbmdlcyh2aWV3LCBub2RlRGVmLCA2LCB2Nik7XG4gIGlmIChiaW5kTGVuID4gNykgY2hlY2tCaW5kaW5nTm9DaGFuZ2VzKHZpZXcsIG5vZGVEZWYsIDcsIHY3KTtcbiAgaWYgKGJpbmRMZW4gPiA4KSBjaGVja0JpbmRpbmdOb0NoYW5nZXModmlldywgbm9kZURlZiwgOCwgdjgpO1xuICBpZiAoYmluZExlbiA+IDkpIGNoZWNrQmluZGluZ05vQ2hhbmdlcyh2aWV3LCBub2RlRGVmLCA5LCB2OSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrTm9DaGFuZ2VzTm9kZUR5bmFtaWModmlldzogVmlld0RhdGEsIG5vZGVEZWY6IE5vZGVEZWYsIHZhbHVlczogYW55W10pOiB2b2lkIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjaGVja0JpbmRpbmdOb0NoYW5nZXModmlldywgbm9kZURlZiwgaSwgdmFsdWVzW2ldKTtcbiAgfVxufVxuXG4vKipcbiAqIFdvcmthcm91bmQgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvdHNpY2tsZS9pc3N1ZXMvNDk3XG4gKiBAc3VwcHJlc3Mge21pc3BsYWNlZFR5cGVBbm5vdGF0aW9ufVxuICovXG5mdW5jdGlvbiBjaGVja05vQ2hhbmdlc1F1ZXJ5KHZpZXc6IFZpZXdEYXRhLCBub2RlRGVmOiBOb2RlRGVmKSB7XG4gIGNvbnN0IHF1ZXJ5TGlzdCA9IGFzUXVlcnlMaXN0KHZpZXcsIG5vZGVEZWYubm9kZUluZGV4KTtcbiAgaWYgKHF1ZXJ5TGlzdC5kaXJ0eSkge1xuICAgIHRocm93IGV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3IoXG4gICAgICAgIFNlcnZpY2VzLmNyZWF0ZURlYnVnQ29udGV4dCh2aWV3LCBub2RlRGVmLm5vZGVJbmRleCksXG4gICAgICAgIGBRdWVyeSAke25vZGVEZWYucXVlcnkhLmlkfSBub3QgZGlydHlgLCBgUXVlcnkgJHtub2RlRGVmLnF1ZXJ5IS5pZH0gZGlydHlgLFxuICAgICAgICAodmlldy5zdGF0ZSAmIFZpZXdTdGF0ZS5CZWZvcmVGaXJzdENoZWNrKSAhPT0gMCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lWaWV3KHZpZXc6IFZpZXdEYXRhKSB7XG4gIGlmICh2aWV3LnN0YXRlICYgVmlld1N0YXRlLkRlc3Ryb3llZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBleGVjRW1iZWRkZWRWaWV3c0FjdGlvbih2aWV3LCBWaWV3QWN0aW9uLkRlc3Ryb3kpO1xuICBleGVjQ29tcG9uZW50Vmlld3NBY3Rpb24odmlldywgVmlld0FjdGlvbi5EZXN0cm95KTtcbiAgY2FsbExpZmVjeWNsZUhvb2tzQ2hpbGRyZW5GaXJzdCh2aWV3LCBOb2RlRmxhZ3MuT25EZXN0cm95KTtcbiAgaWYgKHZpZXcuZGlzcG9zYWJsZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZXcuZGlzcG9zYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZpZXcuZGlzcG9zYWJsZXNbaV0oKTtcbiAgICB9XG4gIH1cbiAgZGV0YWNoUHJvamVjdGVkVmlldyh2aWV3KTtcbiAgaWYgKHZpZXcucmVuZGVyZXIuZGVzdHJveU5vZGUpIHtcbiAgICBkZXN0cm95Vmlld05vZGVzKHZpZXcpO1xuICB9XG4gIGlmIChpc0NvbXBvbmVudFZpZXcodmlldykpIHtcbiAgICB2aWV3LnJlbmRlcmVyLmRlc3Ryb3koKTtcbiAgfVxuICB2aWV3LnN0YXRlIHw9IFZpZXdTdGF0ZS5EZXN0cm95ZWQ7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3lWaWV3Tm9kZXModmlldzogVmlld0RhdGEpIHtcbiAgY29uc3QgbGVuID0gdmlldy5kZWYubm9kZXMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgZGVmID0gdmlldy5kZWYubm9kZXNbaV07XG4gICAgaWYgKGRlZi5mbGFncyAmIE5vZGVGbGFncy5UeXBlRWxlbWVudCkge1xuICAgICAgdmlldy5yZW5kZXJlci5kZXN0cm95Tm9kZSAhKGFzRWxlbWVudERhdGEodmlldywgaSkucmVuZGVyRWxlbWVudCk7XG4gICAgfSBlbHNlIGlmIChkZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuVHlwZVRleHQpIHtcbiAgICAgIHZpZXcucmVuZGVyZXIuZGVzdHJveU5vZGUgIShhc1RleHREYXRhKHZpZXcsIGkpLnJlbmRlclRleHQpO1xuICAgIH0gZWxzZSBpZiAoZGVmLmZsYWdzICYgTm9kZUZsYWdzLlR5cGVDb250ZW50UXVlcnkgfHwgZGVmLmZsYWdzICYgTm9kZUZsYWdzLlR5cGVWaWV3UXVlcnkpIHtcbiAgICAgIGFzUXVlcnlMaXN0KHZpZXcsIGkpLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cbn1cblxuZW51bSBWaWV3QWN0aW9uIHtcbiAgQ3JlYXRlVmlld05vZGVzLFxuICBDaGVja05vQ2hhbmdlcyxcbiAgQ2hlY2tOb0NoYW5nZXNQcm9qZWN0ZWRWaWV3cyxcbiAgQ2hlY2tBbmRVcGRhdGUsXG4gIENoZWNrQW5kVXBkYXRlUHJvamVjdGVkVmlld3MsXG4gIERlc3Ryb3lcbn1cblxuZnVuY3Rpb24gZXhlY0NvbXBvbmVudFZpZXdzQWN0aW9uKHZpZXc6IFZpZXdEYXRhLCBhY3Rpb246IFZpZXdBY3Rpb24pIHtcbiAgY29uc3QgZGVmID0gdmlldy5kZWY7XG4gIGlmICghKGRlZi5ub2RlRmxhZ3MgJiBOb2RlRmxhZ3MuQ29tcG9uZW50VmlldykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWYubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBub2RlRGVmID0gZGVmLm5vZGVzW2ldO1xuICAgIGlmIChub2RlRGVmLmZsYWdzICYgTm9kZUZsYWdzLkNvbXBvbmVudFZpZXcpIHtcbiAgICAgIC8vIGEgbGVhZlxuICAgICAgY2FsbFZpZXdBY3Rpb24oYXNFbGVtZW50RGF0YSh2aWV3LCBpKS5jb21wb25lbnRWaWV3LCBhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAoKG5vZGVEZWYuY2hpbGRGbGFncyAmIE5vZGVGbGFncy5Db21wb25lbnRWaWV3KSA9PT0gMCkge1xuICAgICAgLy8gYSBwYXJlbnQgd2l0aCBsZWFmc1xuICAgICAgLy8gbm8gY2hpbGQgaXMgYSBjb21wb25lbnQsXG4gICAgICAvLyB0aGVuIHNraXAgdGhlIGNoaWxkcmVuXG4gICAgICBpICs9IG5vZGVEZWYuY2hpbGRDb3VudDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhlY0VtYmVkZGVkVmlld3NBY3Rpb24odmlldzogVmlld0RhdGEsIGFjdGlvbjogVmlld0FjdGlvbikge1xuICBjb25zdCBkZWYgPSB2aWV3LmRlZjtcbiAgaWYgKCEoZGVmLm5vZGVGbGFncyAmIE5vZGVGbGFncy5FbWJlZGRlZFZpZXdzKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZi5ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG5vZGVEZWYgPSBkZWYubm9kZXNbaV07XG4gICAgaWYgKG5vZGVEZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuRW1iZWRkZWRWaWV3cykge1xuICAgICAgLy8gYSBsZWFmXG4gICAgICBjb25zdCBlbWJlZGRlZFZpZXdzID0gYXNFbGVtZW50RGF0YSh2aWV3LCBpKS52aWV3Q29udGFpbmVyICEuX2VtYmVkZGVkVmlld3M7XG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IGVtYmVkZGVkVmlld3MubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgY2FsbFZpZXdBY3Rpb24oZW1iZWRkZWRWaWV3c1trXSwgYWN0aW9uKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKChub2RlRGVmLmNoaWxkRmxhZ3MgJiBOb2RlRmxhZ3MuRW1iZWRkZWRWaWV3cykgPT09IDApIHtcbiAgICAgIC8vIGEgcGFyZW50IHdpdGggbGVhZnNcbiAgICAgIC8vIG5vIGNoaWxkIGlzIGEgY29tcG9uZW50LFxuICAgICAgLy8gdGhlbiBza2lwIHRoZSBjaGlsZHJlblxuICAgICAgaSArPSBub2RlRGVmLmNoaWxkQ291bnQ7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxWaWV3QWN0aW9uKHZpZXc6IFZpZXdEYXRhLCBhY3Rpb246IFZpZXdBY3Rpb24pIHtcbiAgY29uc3Qgdmlld1N0YXRlID0gdmlldy5zdGF0ZTtcbiAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICBjYXNlIFZpZXdBY3Rpb24uQ2hlY2tOb0NoYW5nZXM6XG4gICAgICBpZiAoKHZpZXdTdGF0ZSAmIFZpZXdTdGF0ZS5EZXN0cm95ZWQpID09PSAwKSB7XG4gICAgICAgIGlmICgodmlld1N0YXRlICYgVmlld1N0YXRlLkNhdERldGVjdENoYW5nZXMpID09PSBWaWV3U3RhdGUuQ2F0RGV0ZWN0Q2hhbmdlcykge1xuICAgICAgICAgIGNoZWNrTm9DaGFuZ2VzVmlldyh2aWV3KTtcbiAgICAgICAgfSBlbHNlIGlmICh2aWV3U3RhdGUgJiBWaWV3U3RhdGUuQ2hlY2tQcm9qZWN0ZWRWaWV3cykge1xuICAgICAgICAgIGV4ZWNQcm9qZWN0ZWRWaWV3c0FjdGlvbih2aWV3LCBWaWV3QWN0aW9uLkNoZWNrTm9DaGFuZ2VzUHJvamVjdGVkVmlld3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFZpZXdBY3Rpb24uQ2hlY2tOb0NoYW5nZXNQcm9qZWN0ZWRWaWV3czpcbiAgICAgIGlmICgodmlld1N0YXRlICYgVmlld1N0YXRlLkRlc3Ryb3llZCkgPT09IDApIHtcbiAgICAgICAgaWYgKHZpZXdTdGF0ZSAmIFZpZXdTdGF0ZS5DaGVja1Byb2plY3RlZFZpZXcpIHtcbiAgICAgICAgICBjaGVja05vQ2hhbmdlc1ZpZXcodmlldyk7XG4gICAgICAgIH0gZWxzZSBpZiAodmlld1N0YXRlICYgVmlld1N0YXRlLkNoZWNrUHJvamVjdGVkVmlld3MpIHtcbiAgICAgICAgICBleGVjUHJvamVjdGVkVmlld3NBY3Rpb24odmlldywgYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBWaWV3QWN0aW9uLkNoZWNrQW5kVXBkYXRlOlxuICAgICAgaWYgKCh2aWV3U3RhdGUgJiBWaWV3U3RhdGUuRGVzdHJveWVkKSA9PT0gMCkge1xuICAgICAgICBpZiAoKHZpZXdTdGF0ZSAmIFZpZXdTdGF0ZS5DYXREZXRlY3RDaGFuZ2VzKSA9PT0gVmlld1N0YXRlLkNhdERldGVjdENoYW5nZXMpIHtcbiAgICAgICAgICBjaGVja0FuZFVwZGF0ZVZpZXcodmlldyk7XG4gICAgICAgIH0gZWxzZSBpZiAodmlld1N0YXRlICYgVmlld1N0YXRlLkNoZWNrUHJvamVjdGVkVmlld3MpIHtcbiAgICAgICAgICBleGVjUHJvamVjdGVkVmlld3NBY3Rpb24odmlldywgVmlld0FjdGlvbi5DaGVja0FuZFVwZGF0ZVByb2plY3RlZFZpZXdzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBWaWV3QWN0aW9uLkNoZWNrQW5kVXBkYXRlUHJvamVjdGVkVmlld3M6XG4gICAgICBpZiAoKHZpZXdTdGF0ZSAmIFZpZXdTdGF0ZS5EZXN0cm95ZWQpID09PSAwKSB7XG4gICAgICAgIGlmICh2aWV3U3RhdGUgJiBWaWV3U3RhdGUuQ2hlY2tQcm9qZWN0ZWRWaWV3KSB7XG4gICAgICAgICAgY2hlY2tBbmRVcGRhdGVWaWV3KHZpZXcpO1xuICAgICAgICB9IGVsc2UgaWYgKHZpZXdTdGF0ZSAmIFZpZXdTdGF0ZS5DaGVja1Byb2plY3RlZFZpZXdzKSB7XG4gICAgICAgICAgZXhlY1Byb2plY3RlZFZpZXdzQWN0aW9uKHZpZXcsIGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgVmlld0FjdGlvbi5EZXN0cm95OlxuICAgICAgLy8gTm90ZTogZGVzdHJveVZpZXcgcmVjdXJzZXMgb3ZlciBhbGwgdmlld3MsXG4gICAgICAvLyBzbyB3ZSBkb24ndCBuZWVkIHRvIHNwZWNpYWwgY2FzZSBwcm9qZWN0ZWQgdmlld3MgaGVyZS5cbiAgICAgIGRlc3Ryb3lWaWV3KHZpZXcpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBWaWV3QWN0aW9uLkNyZWF0ZVZpZXdOb2RlczpcbiAgICAgIGNyZWF0ZVZpZXdOb2Rlcyh2aWV3KTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4ZWNQcm9qZWN0ZWRWaWV3c0FjdGlvbih2aWV3OiBWaWV3RGF0YSwgYWN0aW9uOiBWaWV3QWN0aW9uKSB7XG4gIGV4ZWNFbWJlZGRlZFZpZXdzQWN0aW9uKHZpZXcsIGFjdGlvbik7XG4gIGV4ZWNDb21wb25lbnRWaWV3c0FjdGlvbih2aWV3LCBhY3Rpb24pO1xufVxuXG5mdW5jdGlvbiBleGVjUXVlcmllc0FjdGlvbihcbiAgICB2aWV3OiBWaWV3RGF0YSwgcXVlcnlGbGFnczogTm9kZUZsYWdzLCBzdGF0aWNEeW5hbWljUXVlcnlGbGFnOiBOb2RlRmxhZ3MsXG4gICAgY2hlY2tUeXBlOiBDaGVja1R5cGUpIHtcbiAgaWYgKCEodmlldy5kZWYubm9kZUZsYWdzICYgcXVlcnlGbGFncykgfHwgISh2aWV3LmRlZi5ub2RlRmxhZ3MgJiBzdGF0aWNEeW5hbWljUXVlcnlGbGFnKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBub2RlQ291bnQgPSB2aWV3LmRlZi5ub2Rlcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUNvdW50OyBpKyspIHtcbiAgICBjb25zdCBub2RlRGVmID0gdmlldy5kZWYubm9kZXNbaV07XG4gICAgaWYgKChub2RlRGVmLmZsYWdzICYgcXVlcnlGbGFncykgJiYgKG5vZGVEZWYuZmxhZ3MgJiBzdGF0aWNEeW5hbWljUXVlcnlGbGFnKSkge1xuICAgICAgU2VydmljZXMuc2V0Q3VycmVudE5vZGUodmlldywgbm9kZURlZi5ub2RlSW5kZXgpO1xuICAgICAgc3dpdGNoIChjaGVja1R5cGUpIHtcbiAgICAgICAgY2FzZSBDaGVja1R5cGUuQ2hlY2tBbmRVcGRhdGU6XG4gICAgICAgICAgY2hlY2tBbmRVcGRhdGVRdWVyeSh2aWV3LCBub2RlRGVmKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDaGVja1R5cGUuQ2hlY2tOb0NoYW5nZXM6XG4gICAgICAgICAgY2hlY2tOb0NoYW5nZXNRdWVyeSh2aWV3LCBub2RlRGVmKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCEobm9kZURlZi5jaGlsZEZsYWdzICYgcXVlcnlGbGFncykgfHwgIShub2RlRGVmLmNoaWxkRmxhZ3MgJiBzdGF0aWNEeW5hbWljUXVlcnlGbGFnKSkge1xuICAgICAgLy8gbm8gY2hpbGQgaGFzIGEgbWF0Y2hpbmcgcXVlcnlcbiAgICAgIC8vIHRoZW4gc2tpcCB0aGUgY2hpbGRyZW5cbiAgICAgIGkgKz0gbm9kZURlZi5jaGlsZENvdW50O1xuICAgIH1cbiAgfVxufVxuIl19