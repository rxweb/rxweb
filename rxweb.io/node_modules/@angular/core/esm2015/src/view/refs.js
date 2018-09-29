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
import { Injector } from '../di/injector';
import { ComponentFactory, ComponentRef } from '../linker/component_factory';
import { ComponentFactoryBoundToModule, ComponentFactoryResolver } from '../linker/component_factory_resolver';
import { ElementRef } from '../linker/element_ref';
import { NgModuleRef } from '../linker/ng_module_factory';
import { TemplateRef } from '../linker/template_ref';
import { stringify } from '../util';
import { VERSION } from '../version';
import { callNgModuleLifecycle, initNgModule, resolveNgModuleDep } from './ng_module';
import { Services, asElementData, asProviderData, asTextData } from './types';
import { markParentViewsForCheck, resolveDefinition, rootRenderNodes, splitNamespace, tokenKey, viewParentEl } from './util';
import { attachEmbeddedView, detachEmbeddedView, moveEmbeddedView, renderDetachView } from './view_attach';
/** @type {?} */
const EMPTY_CONTEXT = new Object();
/**
 * @param {?} selector
 * @param {?} componentType
 * @param {?} viewDefFactory
 * @param {?} inputs
 * @param {?} outputs
 * @param {?} ngContentSelectors
 * @return {?}
 */
export function createComponentFactory(selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors) {
    return new ComponentFactory_(selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors);
}
/**
 * @param {?} componentFactory
 * @return {?}
 */
export function getComponentViewDefinitionFactory(componentFactory) {
    return (/** @type {?} */ (componentFactory)).viewDefFactory;
}
class ComponentFactory_ extends ComponentFactory {
    /**
     * @param {?} selector
     * @param {?} componentType
     * @param {?} viewDefFactory
     * @param {?} _inputs
     * @param {?} _outputs
     * @param {?} ngContentSelectors
     */
    constructor(selector, componentType, viewDefFactory, _inputs, _outputs, ngContentSelectors) {
        // Attention: this ctor is called as top level function.
        // Putting any logic in here will destroy closure tree shaking!
        super();
        this.selector = selector;
        this.componentType = componentType;
        this._inputs = _inputs;
        this._outputs = _outputs;
        this.ngContentSelectors = ngContentSelectors;
        this.viewDefFactory = viewDefFactory;
    }
    /**
     * @return {?}
     */
    get inputs() {
        /** @type {?} */
        const inputsArr = [];
        /** @type {?} */
        const inputs = /** @type {?} */ ((this._inputs));
        for (let propName in inputs) {
            /** @type {?} */
            const templateName = inputs[propName];
            inputsArr.push({ propName, templateName });
        }
        return inputsArr;
    }
    /**
     * @return {?}
     */
    get outputs() {
        /** @type {?} */
        const outputsArr = [];
        for (let propName in this._outputs) {
            /** @type {?} */
            const templateName = this._outputs[propName];
            outputsArr.push({ propName, templateName });
        }
        return outputsArr;
    }
    /**
     * Creates a new component.
     * @param {?} injector
     * @param {?=} projectableNodes
     * @param {?=} rootSelectorOrNode
     * @param {?=} ngModule
     * @return {?}
     */
    create(injector, projectableNodes, rootSelectorOrNode, ngModule) {
        if (!ngModule) {
            throw new Error('ngModule should be provided');
        }
        /** @type {?} */
        const viewDef = resolveDefinition(this.viewDefFactory);
        /** @type {?} */
        const componentNodeIndex = /** @type {?} */ ((/** @type {?} */ ((viewDef.nodes[0].element)).componentProvider)).nodeIndex;
        /** @type {?} */
        const view = Services.createRootView(injector, projectableNodes || [], rootSelectorOrNode, viewDef, ngModule, EMPTY_CONTEXT);
        /** @type {?} */
        const component = asProviderData(view, componentNodeIndex).instance;
        if (rootSelectorOrNode) {
            view.renderer.setAttribute(asElementData(view, 0).renderElement, 'ng-version', VERSION.full);
        }
        return new ComponentRef_(view, new ViewRef_(view), component);
    }
}
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    ComponentFactory_.prototype.viewDefFactory;
    /** @type {?} */
    ComponentFactory_.prototype.selector;
    /** @type {?} */
    ComponentFactory_.prototype.componentType;
    /** @type {?} */
    ComponentFactory_.prototype._inputs;
    /** @type {?} */
    ComponentFactory_.prototype._outputs;
    /** @type {?} */
    ComponentFactory_.prototype.ngContentSelectors;
}
class ComponentRef_ extends ComponentRef {
    /**
     * @param {?} _view
     * @param {?} _viewRef
     * @param {?} _component
     */
    constructor(_view, _viewRef, _component) {
        super();
        this._view = _view;
        this._viewRef = _viewRef;
        this._component = _component;
        this._elDef = this._view.def.nodes[0];
        this.hostView = _viewRef;
        this.changeDetectorRef = _viewRef;
        this.instance = _component;
    }
    /**
     * @return {?}
     */
    get location() {
        return new ElementRef(asElementData(this._view, this._elDef.nodeIndex).renderElement);
    }
    /**
     * @return {?}
     */
    get injector() { return new Injector_(this._view, this._elDef); }
    /**
     * @return {?}
     */
    get componentType() { return /** @type {?} */ (this._component.constructor); }
    /**
     * @return {?}
     */
    destroy() { this._viewRef.destroy(); }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { this._viewRef.onDestroy(callback); }
}
if (false) {
    /** @type {?} */
    ComponentRef_.prototype.hostView;
    /** @type {?} */
    ComponentRef_.prototype.instance;
    /** @type {?} */
    ComponentRef_.prototype.changeDetectorRef;
    /** @type {?} */
    ComponentRef_.prototype._elDef;
    /** @type {?} */
    ComponentRef_.prototype._view;
    /** @type {?} */
    ComponentRef_.prototype._viewRef;
    /** @type {?} */
    ComponentRef_.prototype._component;
}
/**
 * @param {?} view
 * @param {?} elDef
 * @param {?} elData
 * @return {?}
 */
export function createViewContainerData(view, elDef, elData) {
    return new ViewContainerRef_(view, elDef, elData);
}
class ViewContainerRef_ {
    /**
     * @param {?} _view
     * @param {?} _elDef
     * @param {?} _data
     */
    constructor(_view, _elDef, _data) {
        this._view = _view;
        this._elDef = _elDef;
        this._data = _data;
        /**
         * \@internal
         */
        this._embeddedViews = [];
    }
    /**
     * @return {?}
     */
    get element() { return new ElementRef(this._data.renderElement); }
    /**
     * @return {?}
     */
    get injector() { return new Injector_(this._view, this._elDef); }
    /**
     * @return {?}
     */
    get parentInjector() {
        /** @type {?} */
        let view = this._view;
        /** @type {?} */
        let elDef = this._elDef.parent;
        while (!elDef && view) {
            elDef = viewParentEl(view);
            view = /** @type {?} */ ((view.parent));
        }
        return view ? new Injector_(view, elDef) : new Injector_(this._view, null);
    }
    /**
     * @return {?}
     */
    clear() {
        /** @type {?} */
        const len = this._embeddedViews.length;
        for (let i = len - 1; i >= 0; i--) {
            /** @type {?} */
            const view = /** @type {?} */ ((detachEmbeddedView(this._data, i)));
            Services.destroyView(view);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    get(index) {
        /** @type {?} */
        const view = this._embeddedViews[index];
        if (view) {
            /** @type {?} */
            const ref = new ViewRef_(view);
            ref.attachToViewContainerRef(this);
            return ref;
        }
        return null;
    }
    /**
     * @return {?}
     */
    get length() { return this._embeddedViews.length; }
    /**
     * @template C
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    createEmbeddedView(templateRef, context, index) {
        /** @type {?} */
        const viewRef = templateRef.createEmbeddedView(context || /** @type {?} */ ({}));
        this.insert(viewRef, index);
        return viewRef;
    }
    /**
     * @template C
     * @param {?} componentFactory
     * @param {?=} index
     * @param {?=} injector
     * @param {?=} projectableNodes
     * @param {?=} ngModuleRef
     * @return {?}
     */
    createComponent(componentFactory, index, injector, projectableNodes, ngModuleRef) {
        /** @type {?} */
        const contextInjector = injector || this.parentInjector;
        if (!ngModuleRef && !(componentFactory instanceof ComponentFactoryBoundToModule)) {
            ngModuleRef = contextInjector.get(NgModuleRef);
        }
        /** @type {?} */
        const componentRef = componentFactory.create(contextInjector, projectableNodes, undefined, ngModuleRef);
        this.insert(componentRef.hostView, index);
        return componentRef;
    }
    /**
     * @param {?} viewRef
     * @param {?=} index
     * @return {?}
     */
    insert(viewRef, index) {
        if (viewRef.destroyed) {
            throw new Error('Cannot insert a destroyed View in a ViewContainer!');
        }
        /** @type {?} */
        const viewRef_ = /** @type {?} */ (viewRef);
        /** @type {?} */
        const viewData = viewRef_._view;
        attachEmbeddedView(this._view, this._data, index, viewData);
        viewRef_.attachToViewContainerRef(this);
        return viewRef;
    }
    /**
     * @param {?} viewRef
     * @param {?} currentIndex
     * @return {?}
     */
    move(viewRef, currentIndex) {
        if (viewRef.destroyed) {
            throw new Error('Cannot move a destroyed View in a ViewContainer!');
        }
        /** @type {?} */
        const previousIndex = this._embeddedViews.indexOf(viewRef._view);
        moveEmbeddedView(this._data, previousIndex, currentIndex);
        return viewRef;
    }
    /**
     * @param {?} viewRef
     * @return {?}
     */
    indexOf(viewRef) {
        return this._embeddedViews.indexOf((/** @type {?} */ (viewRef))._view);
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    remove(index) {
        /** @type {?} */
        const viewData = detachEmbeddedView(this._data, index);
        if (viewData) {
            Services.destroyView(viewData);
        }
    }
    /**
     * @param {?=} index
     * @return {?}
     */
    detach(index) {
        /** @type {?} */
        const view = detachEmbeddedView(this._data, index);
        return view ? new ViewRef_(view) : null;
    }
}
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    ViewContainerRef_.prototype._embeddedViews;
    /** @type {?} */
    ViewContainerRef_.prototype._view;
    /** @type {?} */
    ViewContainerRef_.prototype._elDef;
    /** @type {?} */
    ViewContainerRef_.prototype._data;
}
/**
 * @param {?} view
 * @return {?}
 */
export function createChangeDetectorRef(view) {
    return new ViewRef_(view);
}
export class ViewRef_ {
    /**
     * @param {?} _view
     */
    constructor(_view) {
        this._view = _view;
        this._viewContainerRef = null;
        this._appRef = null;
    }
    /**
     * @return {?}
     */
    get rootNodes() { return rootRenderNodes(this._view); }
    /**
     * @return {?}
     */
    get context() { return this._view.context; }
    /**
     * @return {?}
     */
    get destroyed() { return (this._view.state & 128 /* Destroyed */) !== 0; }
    /**
     * @return {?}
     */
    markForCheck() { markParentViewsForCheck(this._view); }
    /**
     * @return {?}
     */
    detach() { this._view.state &= ~4 /* Attached */; }
    /**
     * @return {?}
     */
    detectChanges() {
        /** @type {?} */
        const fs = this._view.root.rendererFactory;
        if (fs.begin) {
            fs.begin();
        }
        try {
            Services.checkAndUpdateView(this._view);
        }
        finally {
            if (fs.end) {
                fs.end();
            }
        }
    }
    /**
     * @return {?}
     */
    checkNoChanges() { Services.checkNoChangesView(this._view); }
    /**
     * @return {?}
     */
    reattach() { this._view.state |= 4 /* Attached */; }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) {
        if (!this._view.disposables) {
            this._view.disposables = [];
        }
        this._view.disposables.push(/** @type {?} */ (callback));
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this._appRef) {
            this._appRef.detachView(this);
        }
        else if (this._viewContainerRef) {
            this._viewContainerRef.detach(this._viewContainerRef.indexOf(this));
        }
        Services.destroyView(this._view);
    }
    /**
     * @return {?}
     */
    detachFromAppRef() {
        this._appRef = null;
        renderDetachView(this._view);
        Services.dirtyParentQueries(this._view);
    }
    /**
     * @param {?} appRef
     * @return {?}
     */
    attachToAppRef(appRef) {
        if (this._viewContainerRef) {
            throw new Error('This view is already attached to a ViewContainer!');
        }
        this._appRef = appRef;
    }
    /**
     * @param {?} vcRef
     * @return {?}
     */
    attachToViewContainerRef(vcRef) {
        if (this._appRef) {
            throw new Error('This view is already attached directly to the ApplicationRef!');
        }
        this._viewContainerRef = vcRef;
    }
}
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    ViewRef_.prototype._view;
    /** @type {?} */
    ViewRef_.prototype._viewContainerRef;
    /** @type {?} */
    ViewRef_.prototype._appRef;
}
/**
 * @param {?} view
 * @param {?} def
 * @return {?}
 */
export function createTemplateData(view, def) {
    return new TemplateRef_(view, def);
}
class TemplateRef_ extends TemplateRef {
    /**
     * @param {?} _parentView
     * @param {?} _def
     */
    constructor(_parentView, _def) {
        super();
        this._parentView = _parentView;
        this._def = _def;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    createEmbeddedView(context) {
        return new ViewRef_(Services.createEmbeddedView(this._parentView, this._def, /** @type {?} */ ((/** @type {?} */ ((this._def.element)).template)), context));
    }
    /**
     * @return {?}
     */
    get elementRef() {
        return new ElementRef(asElementData(this._parentView, this._def.nodeIndex).renderElement);
    }
}
if (false) {
    /**
     * \@internal
     * @type {?}
     */
    TemplateRef_.prototype._projectedViews;
    /** @type {?} */
    TemplateRef_.prototype._parentView;
    /** @type {?} */
    TemplateRef_.prototype._def;
}
/**
 * @param {?} view
 * @param {?} elDef
 * @return {?}
 */
export function createInjector(view, elDef) {
    return new Injector_(view, elDef);
}
class Injector_ {
    /**
     * @param {?} view
     * @param {?} elDef
     */
    constructor(view, elDef) {
        this.view = view;
        this.elDef = elDef;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = Injector.THROW_IF_NOT_FOUND) {
        /** @type {?} */
        const allowPrivateServices = this.elDef ? (this.elDef.flags & 33554432 /* ComponentView */) !== 0 : false;
        return Services.resolveDep(this.view, this.elDef, allowPrivateServices, { flags: 0 /* None */, token, tokenKey: tokenKey(token) }, notFoundValue);
    }
}
if (false) {
    /** @type {?} */
    Injector_.prototype.view;
    /** @type {?} */
    Injector_.prototype.elDef;
}
/**
 * @param {?} view
 * @param {?} index
 * @return {?}
 */
export function nodeValue(view, index) {
    /** @type {?} */
    const def = view.def.nodes[index];
    if (def.flags & 1 /* TypeElement */) {
        /** @type {?} */
        const elData = asElementData(view, def.nodeIndex);
        return /** @type {?} */ ((def.element)).template ? elData.template : elData.renderElement;
    }
    else if (def.flags & 2 /* TypeText */) {
        return asTextData(view, def.nodeIndex).renderText;
    }
    else if (def.flags & (20224 /* CatProvider */ | 16 /* TypePipe */)) {
        return asProviderData(view, def.nodeIndex).instance;
    }
    throw new Error(`Illegal state: read nodeValue for node index ${index}`);
}
/**
 * @param {?} view
 * @return {?}
 */
export function createRendererV1(view) {
    return new RendererAdapter(view.renderer);
}
class RendererAdapter {
    /**
     * @param {?} delegate
     */
    constructor(delegate) {
        this.delegate = delegate;
    }
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    selectRootElement(selectorOrNode) {
        return this.delegate.selectRootElement(selectorOrNode);
    }
    /**
     * @param {?} parent
     * @param {?} namespaceAndName
     * @return {?}
     */
    createElement(parent, namespaceAndName) {
        const [ns, name] = splitNamespace(namespaceAndName);
        /** @type {?} */
        const el = this.delegate.createElement(name, ns);
        if (parent) {
            this.delegate.appendChild(parent, el);
        }
        return el;
    }
    /**
     * @param {?} hostElement
     * @return {?}
     */
    createViewRoot(hostElement) { return hostElement; }
    /**
     * @param {?} parentElement
     * @return {?}
     */
    createTemplateAnchor(parentElement) {
        /** @type {?} */
        const comment = this.delegate.createComment('');
        if (parentElement) {
            this.delegate.appendChild(parentElement, comment);
        }
        return comment;
    }
    /**
     * @param {?} parentElement
     * @param {?} value
     * @return {?}
     */
    createText(parentElement, value) {
        /** @type {?} */
        const node = this.delegate.createText(value);
        if (parentElement) {
            this.delegate.appendChild(parentElement, node);
        }
        return node;
    }
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    projectNodes(parentElement, nodes) {
        for (let i = 0; i < nodes.length; i++) {
            this.delegate.appendChild(parentElement, nodes[i]);
        }
    }
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    attachViewAfter(node, viewRootNodes) {
        /** @type {?} */
        const parentElement = this.delegate.parentNode(node);
        /** @type {?} */
        const nextSibling = this.delegate.nextSibling(node);
        for (let i = 0; i < viewRootNodes.length; i++) {
            this.delegate.insertBefore(parentElement, viewRootNodes[i], nextSibling);
        }
    }
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    detachView(viewRootNodes) {
        for (let i = 0; i < viewRootNodes.length; i++) {
            /** @type {?} */
            const node = viewRootNodes[i];
            /** @type {?} */
            const parentElement = this.delegate.parentNode(node);
            this.delegate.removeChild(parentElement, node);
        }
    }
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    destroyView(hostElement, viewAllNodes) {
        for (let i = 0; i < viewAllNodes.length; i++) {
            /** @type {?} */ ((this.delegate.destroyNode))(viewAllNodes[i]);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listen(renderElement, name, callback) {
        return this.delegate.listen(renderElement, name, /** @type {?} */ (callback));
    }
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listenGlobal(target, name, callback) {
        return this.delegate.listen(target, name, /** @type {?} */ (callback));
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setElementProperty(renderElement, propertyName, propertyValue) {
        this.delegate.setProperty(renderElement, propertyName, propertyValue);
    }
    /**
     * @param {?} renderElement
     * @param {?} namespaceAndName
     * @param {?} attributeValue
     * @return {?}
     */
    setElementAttribute(renderElement, namespaceAndName, attributeValue) {
        const [ns, name] = splitNamespace(namespaceAndName);
        if (attributeValue != null) {
            this.delegate.setAttribute(renderElement, name, attributeValue, ns);
        }
        else {
            this.delegate.removeAttribute(renderElement, name, ns);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setBindingDebugInfo(renderElement, propertyName, propertyValue) { }
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    setElementClass(renderElement, className, isAdd) {
        if (isAdd) {
            this.delegate.addClass(renderElement, className);
        }
        else {
            this.delegate.removeClass(renderElement, className);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setElementStyle(renderElement, styleName, styleValue) {
        if (styleValue != null) {
            this.delegate.setStyle(renderElement, styleName, styleValue);
        }
        else {
            this.delegate.removeStyle(renderElement, styleName);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invokeElementMethod(renderElement, methodName, args) {
        (/** @type {?} */ (renderElement))[methodName].apply(renderElement, args);
    }
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    setText(renderNode, text) { this.delegate.setValue(renderNode, text); }
    /**
     * @return {?}
     */
    animate() { throw new Error('Renderer.animate is no longer supported!'); }
}
if (false) {
    /** @type {?} */
    RendererAdapter.prototype.delegate;
}
/**
 * @param {?} moduleType
 * @param {?} parent
 * @param {?} bootstrapComponents
 * @param {?} def
 * @return {?}
 */
export function createNgModuleRef(moduleType, parent, bootstrapComponents, def) {
    return new NgModuleRef_(moduleType, parent, bootstrapComponents, def);
}
class NgModuleRef_ {
    /**
     * @param {?} _moduleType
     * @param {?} _parent
     * @param {?} _bootstrapComponents
     * @param {?} _def
     */
    constructor(_moduleType, _parent, _bootstrapComponents, _def) {
        this._moduleType = _moduleType;
        this._parent = _parent;
        this._bootstrapComponents = _bootstrapComponents;
        this._def = _def;
        this._destroyListeners = [];
        this._destroyed = false;
        this.injector = this;
        initNgModule(this);
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} injectFlags
     * @return {?}
     */
    get(token, notFoundValue = Injector.THROW_IF_NOT_FOUND, injectFlags = 0 /* Default */) {
        /** @type {?} */
        let flags = 0 /* None */;
        if (injectFlags & 4 /* SkipSelf */) {
            flags |= 1 /* SkipSelf */;
        }
        else if (injectFlags & 2 /* Self */) {
            flags |= 4 /* Self */;
        }
        return resolveNgModuleDep(this, { token: token, tokenKey: tokenKey(token), flags: flags }, notFoundValue);
    }
    /**
     * @return {?}
     */
    get instance() { return this.get(this._moduleType); }
    /**
     * @return {?}
     */
    get componentFactoryResolver() { return this.get(ComponentFactoryResolver); }
    /**
     * @return {?}
     */
    destroy() {
        if (this._destroyed) {
            throw new Error(`The ng module ${stringify(this.instance.constructor)} has already been destroyed.`);
        }
        this._destroyed = true;
        callNgModuleLifecycle(this, 131072 /* OnDestroy */);
        this._destroyListeners.forEach((listener) => listener());
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDestroy(callback) { this._destroyListeners.push(callback); }
}
if (false) {
    /** @type {?} */
    NgModuleRef_.prototype._destroyListeners;
    /** @type {?} */
    NgModuleRef_.prototype._destroyed;
    /**
     * \@internal
     * @type {?}
     */
    NgModuleRef_.prototype._providers;
    /**
     * \@internal
     * @type {?}
     */
    NgModuleRef_.prototype._modules;
    /** @type {?} */
    NgModuleRef_.prototype.injector;
    /** @type {?} */
    NgModuleRef_.prototype._moduleType;
    /** @type {?} */
    NgModuleRef_.prototype._parent;
    /** @type {?} */
    NgModuleRef_.prototype._bootstrapComponents;
    /** @type {?} */
    NgModuleRef_.prototype._def;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3ZpZXcvcmVmcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVVBLE9BQU8sRUFBYyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsWUFBWSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDM0UsT0FBTyxFQUFDLDZCQUE2QixFQUFFLHdCQUF3QixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDN0csT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBc0IsV0FBVyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDN0UsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBS25ELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUVuQyxPQUFPLEVBQUMscUJBQXFCLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3BGLE9BQU8sRUFBOEUsUUFBUSxFQUErRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUN0TyxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzNILE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFekcsTUFBTSxhQUFhLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7OztBQUluQyxNQUFNLGlDQUNGLFFBQWdCLEVBQUUsYUFBd0IsRUFBRSxjQUFxQyxFQUNqRixNQUEyQyxFQUFFLE9BQXFDLEVBQ2xGLGtCQUE0QjtJQUM5QixPQUFPLElBQUksaUJBQWlCLENBQ3hCLFFBQVEsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztDQUNuRjs7Ozs7QUFFRCxNQUFNLDRDQUE0QyxnQkFBdUM7SUFFdkYsT0FBTyxtQkFBQyxnQkFBcUMsRUFBQyxDQUFDLGNBQWMsQ0FBQztDQUMvRDtBQUVELHVCQUF3QixTQUFRLGdCQUFxQjs7Ozs7Ozs7O0lBTW5ELFlBQ1csVUFBeUIsYUFBd0IsRUFDeEQsY0FBcUMsRUFBVSxPQUEwQyxFQUNqRixVQUErQyxrQkFBNEI7OztRQUdyRixLQUFLLEVBQUUsQ0FBQztRQUxDLGFBQVEsR0FBUixRQUFRO1FBQWlCLGtCQUFhLEdBQWIsYUFBYSxDQUFXO1FBQ1QsWUFBTyxHQUFQLE9BQU8sQ0FBbUM7UUFDakYsYUFBUSxHQUFSLFFBQVE7UUFBdUMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFVO1FBSXJGLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0tBQ3RDOzs7O0lBRUQsSUFBSSxNQUFNOztRQUNSLE1BQU0sU0FBUyxHQUErQyxFQUFFLENBQUM7O1FBQ2pFLE1BQU0sTUFBTSxzQkFBRyxJQUFJLENBQUMsT0FBTyxHQUFHO1FBQzlCLEtBQUssSUFBSSxRQUFRLElBQUksTUFBTSxFQUFFOztZQUMzQixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxTQUFTLENBQUM7S0FDbEI7Ozs7SUFFRCxJQUFJLE9BQU87O1FBQ1QsTUFBTSxVQUFVLEdBQStDLEVBQUUsQ0FBQztRQUNsRSxLQUFLLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7O1lBQ2xDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsT0FBTyxVQUFVLENBQUM7S0FDbkI7Ozs7Ozs7OztJQUtELE1BQU0sQ0FDRixRQUFrQixFQUFFLGdCQUEwQixFQUFFLGtCQUErQixFQUMvRSxRQUEyQjtRQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1NBQ2hEOztRQUNELE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs7UUFDdkQsTUFBTSxrQkFBa0IseUNBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLEdBQUcsU0FBUyxDQUFDOztRQUNwRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUNoQyxRQUFRLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7O1FBQzVGLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDcEUsSUFBSSxrQkFBa0IsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlGO1FBRUQsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDL0Q7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsbUJBQW9CLFNBQVEsWUFBaUI7Ozs7OztJQUszQyxZQUFvQixLQUFlLEVBQVUsUUFBaUIsRUFBVSxVQUFlO1FBQ3JGLEtBQUssRUFBRSxDQUFDO1FBRFUsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVM7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFLO1FBRXJGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7S0FDNUI7Ozs7SUFDRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDdkY7Ozs7SUFDRCxJQUFJLFFBQVEsS0FBZSxPQUFPLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7Ozs7SUFDM0UsSUFBSSxhQUFhLEtBQWdCLHlCQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFDLEVBQUU7Ozs7SUFFM0UsT0FBTyxLQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTs7Ozs7SUFDNUMsU0FBUyxDQUFDLFFBQWtCLElBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRTtDQUMzRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxNQUFNLGtDQUNGLElBQWMsRUFBRSxLQUFjLEVBQUUsTUFBbUI7SUFDckQsT0FBTyxJQUFJLGlCQUFpQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDbkQ7QUFFRDs7Ozs7O0lBS0UsWUFBb0IsS0FBZSxFQUFVLE1BQWUsRUFBVSxLQUFrQjtRQUFwRSxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUztRQUFVLFVBQUssR0FBTCxLQUFLLENBQWE7Ozs7OEJBRDNELEVBQUU7S0FDNkQ7Ozs7SUFFNUYsSUFBSSxPQUFPLEtBQWlCLE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFOzs7O0lBRTlFLElBQUksUUFBUSxLQUFlLE9BQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTs7OztJQUUzRSxJQUFJLGNBQWM7O1FBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O1FBQ3RCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ3JCLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsSUFBSSxzQkFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEI7UUFFRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzVFOzs7O0lBRUQsS0FBSzs7UUFDSCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUN2QyxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7WUFDakMsTUFBTSxJQUFJLHNCQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUc7WUFDakQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtLQUNGOzs7OztJQUVELEdBQUcsQ0FBQyxLQUFhOztRQUNmLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxJQUFJLEVBQUU7O1lBQ1IsTUFBTSxHQUFHLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsR0FBRyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7O0lBRUQsSUFBSSxNQUFNLEtBQWEsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFOzs7Ozs7OztJQUUzRCxrQkFBa0IsQ0FBSSxXQUEyQixFQUFFLE9BQVcsRUFBRSxLQUFjOztRQUU1RSxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsa0JBQWtCLENBQUMsT0FBTyxzQkFBUyxFQUFFLENBQUEsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVCLE9BQU8sT0FBTyxDQUFDO0tBQ2hCOzs7Ozs7Ozs7O0lBRUQsZUFBZSxDQUNYLGdCQUFxQyxFQUFFLEtBQWMsRUFBRSxRQUFtQixFQUMxRSxnQkFBMEIsRUFBRSxXQUE4Qjs7UUFDNUQsTUFBTSxlQUFlLEdBQUcsUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDeEQsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLFlBQVksNkJBQTZCLENBQUMsRUFBRTtZQUNoRixXQUFXLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNoRDs7UUFDRCxNQUFNLFlBQVksR0FDZCxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsT0FBTyxZQUFZLENBQUM7S0FDckI7Ozs7OztJQUVELE1BQU0sQ0FBQyxPQUFnQixFQUFFLEtBQWM7UUFDckMsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztTQUN2RTs7UUFDRCxNQUFNLFFBQVEscUJBQWEsT0FBTyxFQUFDOztRQUNuQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2hDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDNUQsUUFBUSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sT0FBTyxDQUFDO0tBQ2hCOzs7Ozs7SUFFRCxJQUFJLENBQUMsT0FBaUIsRUFBRSxZQUFvQjtRQUMxQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ3JFOztRQUNELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMxRCxPQUFPLE9BQU8sQ0FBQztLQUNoQjs7Ozs7SUFFRCxPQUFPLENBQUMsT0FBZ0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBVyxPQUFPLEVBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMvRDs7Ozs7SUFFRCxNQUFNLENBQUMsS0FBYzs7UUFDbkIsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RCxJQUFJLFFBQVEsRUFBRTtZQUNaLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7S0FDRjs7Ozs7SUFFRCxNQUFNLENBQUMsS0FBYzs7UUFDbkIsTUFBTSxJQUFJLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUN6QztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxNQUFNLGtDQUFrQyxJQUFjO0lBQ3BELE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDM0I7QUFFRCxNQUFNOzs7O0lBTUosWUFBWSxLQUFlO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7S0FDckI7Ozs7SUFFRCxJQUFJLFNBQVMsS0FBWSxPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs7OztJQUU5RCxJQUFJLE9BQU8sS0FBSyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7Ozs7SUFFNUMsSUFBSSxTQUFTLEtBQWMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOzs7O0lBRW5GLFlBQVksS0FBVyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs7OztJQUM3RCxNQUFNLEtBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksaUJBQW1CLENBQUMsRUFBRTs7OztJQUMzRCxhQUFhOztRQUNYLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUMzQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUU7WUFDWixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDWjtRQUNELElBQUk7WUFDRixRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pDO2dCQUFTO1lBQ1IsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFO2dCQUNWLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNWO1NBQ0Y7S0FDRjs7OztJQUNELGNBQWMsS0FBVyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFbkUsUUFBUSxLQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxvQkFBc0IsQ0FBQyxFQUFFOzs7OztJQUM1RCxTQUFTLENBQUMsUUFBa0I7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztTQUM3QjtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksbUJBQU0sUUFBUSxFQUFDLENBQUM7S0FDNUM7Ozs7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO2FBQU0sSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDckU7UUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsQzs7OztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3pDOzs7OztJQUVELGNBQWMsQ0FBQyxNQUFzQjtRQUNuQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7U0FDdEU7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztLQUN2Qjs7Ozs7SUFFRCx3QkFBd0IsQ0FBQyxLQUF1QjtRQUM5QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1NBQ2xGO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztLQUNoQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVELE1BQU0sNkJBQTZCLElBQWMsRUFBRSxHQUFZO0lBQzdELE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ3BDO0FBRUQsa0JBQW1CLFNBQVEsV0FBZ0I7Ozs7O0lBT3pDLFlBQW9CLFdBQXFCLEVBQVUsSUFBYTtRQUFJLEtBQUssRUFBRSxDQUFDO1FBQXhELGdCQUFXLEdBQVgsV0FBVyxDQUFVO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUztLQUFjOzs7OztJQUU5RSxrQkFBa0IsQ0FBQyxPQUFZO1FBQzdCLE9BQU8sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUMzQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLHdDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQzVFOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQzNGO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsTUFBTSx5QkFBeUIsSUFBYyxFQUFFLEtBQWM7SUFDM0QsT0FBTyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDbkM7QUFFRDs7Ozs7SUFDRSxZQUFvQixJQUFjLEVBQVUsS0FBbUI7UUFBM0MsU0FBSSxHQUFKLElBQUksQ0FBVTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWM7S0FBSTs7Ozs7O0lBQ25FLEdBQUcsQ0FBQyxLQUFVLEVBQUUsZ0JBQXFCLFFBQVEsQ0FBQyxrQkFBa0I7O1FBQzlELE1BQU0sb0JBQW9CLEdBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLCtCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDNUUsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsb0JBQW9CLEVBQzNDLEVBQUMsS0FBSyxjQUFlLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztLQUM5RTtDQUNGOzs7Ozs7Ozs7Ozs7QUFFRCxNQUFNLG9CQUFvQixJQUFjLEVBQUUsS0FBYTs7SUFDckQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsSUFBSSxHQUFHLENBQUMsS0FBSyxzQkFBd0IsRUFBRTs7UUFDckMsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsMEJBQU8sR0FBRyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7S0FDeEU7U0FBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLG1CQUFxQixFQUFFO1FBQ3pDLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDO0tBQ25EO1NBQU0sSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsMkNBQTBDLENBQUMsRUFBRTtRQUNuRSxPQUFPLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztLQUNyRDtJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELEtBQUssRUFBRSxDQUFDLENBQUM7Q0FDMUU7Ozs7O0FBRUQsTUFBTSwyQkFBMkIsSUFBYztJQUM3QyxPQUFPLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUMzQztBQUVEOzs7O0lBQ0UsWUFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztLQUFJOzs7OztJQUMzQyxpQkFBaUIsQ0FBQyxjQUE4QjtRQUM5QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDeEQ7Ozs7OztJQUVELGFBQWEsQ0FBQyxNQUFnQyxFQUFFLGdCQUF3QjtRQUN0RSxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztRQUNwRCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakQsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdkM7UUFDRCxPQUFPLEVBQUUsQ0FBQztLQUNYOzs7OztJQUVELGNBQWMsQ0FBQyxXQUFvQixJQUE4QixPQUFPLFdBQVcsQ0FBQyxFQUFFOzs7OztJQUV0RixvQkFBb0IsQ0FBQyxhQUF1Qzs7UUFDMUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEQsSUFBSSxhQUFhLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsT0FBTyxPQUFPLENBQUM7S0FDaEI7Ozs7OztJQUVELFVBQVUsQ0FBQyxhQUF1QyxFQUFFLEtBQWE7O1FBQy9ELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksYUFBYSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNoRDtRQUNELE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7OztJQUVELFlBQVksQ0FBQyxhQUF1QyxFQUFFLEtBQWE7UUFDakUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO0tBQ0Y7Ozs7OztJQUVELGVBQWUsQ0FBQyxJQUFVLEVBQUUsYUFBcUI7O1FBQy9DLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUNyRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQzFFO0tBQ0Y7Ozs7O0lBRUQsVUFBVSxDQUFDLGFBQXVDO1FBQ2hELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztZQUM3QyxNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQzlCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNoRDtLQUNGOzs7Ozs7SUFFRCxXQUFXLENBQUMsV0FBcUMsRUFBRSxZQUFvQjtRQUNyRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTsrQkFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUM1QztLQUNGOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLGFBQWtCLEVBQUUsSUFBWSxFQUFFLFFBQWtCO1FBQ3pELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksb0JBQU8sUUFBUSxFQUFDLENBQUM7S0FDakU7Ozs7Ozs7SUFFRCxZQUFZLENBQUMsTUFBYyxFQUFFLElBQVksRUFBRSxRQUFrQjtRQUMzRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLG9CQUFPLFFBQVEsRUFBQyxDQUFDO0tBQzFEOzs7Ozs7O0lBRUQsa0JBQWtCLENBQ2QsYUFBdUMsRUFBRSxZQUFvQixFQUFFLGFBQWtCO1FBQ25GLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDdkU7Ozs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxhQUFzQixFQUFFLGdCQUF3QixFQUFFLGNBQXNCO1FBRTFGLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEQsSUFBSSxjQUFjLElBQUksSUFBSSxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3JFO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO0tBQ0Y7Ozs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxhQUFzQixFQUFFLFlBQW9CLEVBQUUsYUFBcUIsS0FBVTs7Ozs7OztJQUVqRyxlQUFlLENBQUMsYUFBc0IsRUFBRSxTQUFpQixFQUFFLEtBQWM7UUFDdkUsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDbEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNyRDtLQUNGOzs7Ozs7O0lBRUQsZUFBZSxDQUFDLGFBQTBCLEVBQUUsU0FBaUIsRUFBRSxVQUFrQjtRQUMvRSxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUM5RDthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3JEO0tBQ0Y7Ozs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxhQUFzQixFQUFFLFVBQWtCLEVBQUUsSUFBVztRQUN6RSxtQkFBQyxhQUFvQixFQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMvRDs7Ozs7O0lBRUQsT0FBTyxDQUFDLFVBQWdCLEVBQUUsSUFBWSxJQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7O0lBRTNGLE9BQU8sS0FBVSxNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUMsRUFBRTtDQUNoRjs7Ozs7Ozs7Ozs7O0FBR0QsTUFBTSw0QkFDRixVQUFxQixFQUFFLE1BQWdCLEVBQUUsbUJBQWdDLEVBQ3pFLEdBQXVCO0lBQ3pCLE9BQU8sSUFBSSxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUN2RTtBQUVEOzs7Ozs7O0lBWUUsWUFDWSxhQUErQixPQUFpQixFQUNqRCxzQkFBMEMsSUFBd0I7UUFEakUsZ0JBQVcsR0FBWCxXQUFXO1FBQW9CLFlBQU8sR0FBUCxPQUFPLENBQVU7UUFDakQseUJBQW9CLEdBQXBCLG9CQUFvQjtRQUFzQixTQUFJLEdBQUosSUFBSSxDQUFvQjtpQ0FiakMsRUFBRTswQkFDaEIsS0FBSzt3QkFRTCxJQUFJO1FBS2hDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwQjs7Ozs7OztJQUVELEdBQUcsQ0FBQyxLQUFVLEVBQUUsZ0JBQXFCLFFBQVEsQ0FBQyxrQkFBa0IsRUFDNUQsNkJBQThDOztRQUNoRCxJQUFJLEtBQUssZ0JBQWlCO1FBQzFCLElBQUksV0FBVyxtQkFBdUIsRUFBRTtZQUN0QyxLQUFLLG9CQUFxQixDQUFDO1NBQzVCO2FBQU0sSUFBSSxXQUFXLGVBQW1CLEVBQUU7WUFDekMsS0FBSyxnQkFBaUIsQ0FBQztTQUN4QjtRQUNELE9BQU8sa0JBQWtCLENBQ3JCLElBQUksRUFBRSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDbkY7Ozs7SUFFRCxJQUFJLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFckQsSUFBSSx3QkFBd0IsS0FBSyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxFQUFFOzs7O0lBRTdFLE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FDWCxpQkFBaUIsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLDhCQUE4QixDQUFDLENBQUM7U0FDMUY7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixxQkFBcUIsQ0FBQyxJQUFJLHlCQUFzQixDQUFDO1FBQ2pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDMUQ7Ozs7O0lBRUQsU0FBUyxDQUFDLFFBQW9CLElBQVUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO0NBQ2pGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FwcGxpY2F0aW9uUmVmfSBmcm9tICcuLi9hcHBsaWNhdGlvbl9yZWYnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7SW5qZWN0RmxhZ3MsIEluamVjdG9yfSBmcm9tICcuLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge0NvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZn0gZnJvbSAnLi4vbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeUJvdW5kVG9Nb2R1bGUsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcn0gZnJvbSAnLi4vbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5X3Jlc29sdmVyJztcbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSAnLi4vbGlua2VyL2VsZW1lbnRfcmVmJztcbmltcG9ydCB7SW50ZXJuYWxOZ01vZHVsZVJlZiwgTmdNb2R1bGVSZWZ9IGZyb20gJy4uL2xpbmtlci9uZ19tb2R1bGVfZmFjdG9yeSc7XG5pbXBvcnQge1RlbXBsYXRlUmVmfSBmcm9tICcuLi9saW5rZXIvdGVtcGxhdGVfcmVmJztcbmltcG9ydCB7Vmlld0NvbnRhaW5lclJlZn0gZnJvbSAnLi4vbGlua2VyL3ZpZXdfY29udGFpbmVyX3JlZic7XG5pbXBvcnQge0VtYmVkZGVkVmlld1JlZiwgSW50ZXJuYWxWaWV3UmVmLCBWaWV3UmVmfSBmcm9tICcuLi9saW5rZXIvdmlld19yZWYnO1xuaW1wb3J0IHtSZW5kZXJlciBhcyBSZW5kZXJlclYxLCBSZW5kZXJlcjJ9IGZyb20gJy4uL3JlbmRlci9hcGknO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7c3RyaW5naWZ5fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VkVSU0lPTn0gZnJvbSAnLi4vdmVyc2lvbic7XG5cbmltcG9ydCB7Y2FsbE5nTW9kdWxlTGlmZWN5Y2xlLCBpbml0TmdNb2R1bGUsIHJlc29sdmVOZ01vZHVsZURlcH0gZnJvbSAnLi9uZ19tb2R1bGUnO1xuaW1wb3J0IHtEZXBGbGFncywgRWxlbWVudERhdGEsIE5nTW9kdWxlRGF0YSwgTmdNb2R1bGVEZWZpbml0aW9uLCBOb2RlRGVmLCBOb2RlRmxhZ3MsIFNlcnZpY2VzLCBUZW1wbGF0ZURhdGEsIFZpZXdDb250YWluZXJEYXRhLCBWaWV3RGF0YSwgVmlld0RlZmluaXRpb25GYWN0b3J5LCBWaWV3U3RhdGUsIGFzRWxlbWVudERhdGEsIGFzUHJvdmlkZXJEYXRhLCBhc1RleHREYXRhfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7bWFya1BhcmVudFZpZXdzRm9yQ2hlY2ssIHJlc29sdmVEZWZpbml0aW9uLCByb290UmVuZGVyTm9kZXMsIHNwbGl0TmFtZXNwYWNlLCB0b2tlbktleSwgdmlld1BhcmVudEVsfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHthdHRhY2hFbWJlZGRlZFZpZXcsIGRldGFjaEVtYmVkZGVkVmlldywgbW92ZUVtYmVkZGVkVmlldywgcmVuZGVyRGV0YWNoVmlld30gZnJvbSAnLi92aWV3X2F0dGFjaCc7XG5cbmNvbnN0IEVNUFRZX0NPTlRFWFQgPSBuZXcgT2JqZWN0KCk7XG5cbi8vIEF0dGVudGlvbjogdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgYXMgdG9wIGxldmVsIGZ1bmN0aW9uLlxuLy8gUHV0dGluZyBhbnkgbG9naWMgaW4gaGVyZSB3aWxsIGRlc3Ryb3kgY2xvc3VyZSB0cmVlIHNoYWtpbmchXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50RmFjdG9yeShcbiAgICBzZWxlY3Rvcjogc3RyaW5nLCBjb21wb25lbnRUeXBlOiBUeXBlPGFueT4sIHZpZXdEZWZGYWN0b3J5OiBWaWV3RGVmaW5pdGlvbkZhY3RvcnksXG4gICAgaW5wdXRzOiB7W3Byb3BOYW1lOiBzdHJpbmddOiBzdHJpbmd9IHwgbnVsbCwgb3V0cHV0czoge1twcm9wTmFtZTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBuZ0NvbnRlbnRTZWxlY3RvcnM6IHN0cmluZ1tdKTogQ29tcG9uZW50RmFjdG9yeTxhbnk+IHtcbiAgcmV0dXJuIG5ldyBDb21wb25lbnRGYWN0b3J5XyhcbiAgICAgIHNlbGVjdG9yLCBjb21wb25lbnRUeXBlLCB2aWV3RGVmRmFjdG9yeSwgaW5wdXRzLCBvdXRwdXRzLCBuZ0NvbnRlbnRTZWxlY3RvcnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50Vmlld0RlZmluaXRpb25GYWN0b3J5KGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55Pik6XG4gICAgVmlld0RlZmluaXRpb25GYWN0b3J5IHtcbiAgcmV0dXJuIChjb21wb25lbnRGYWN0b3J5IGFzIENvbXBvbmVudEZhY3RvcnlfKS52aWV3RGVmRmFjdG9yeTtcbn1cblxuY2xhc3MgQ29tcG9uZW50RmFjdG9yeV8gZXh0ZW5kcyBDb21wb25lbnRGYWN0b3J5PGFueT4ge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICB2aWV3RGVmRmFjdG9yeTogVmlld0RlZmluaXRpb25GYWN0b3J5O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHNlbGVjdG9yOiBzdHJpbmcsIHB1YmxpYyBjb21wb25lbnRUeXBlOiBUeXBlPGFueT4sXG4gICAgICB2aWV3RGVmRmFjdG9yeTogVmlld0RlZmluaXRpb25GYWN0b3J5LCBwcml2YXRlIF9pbnB1dHM6IHtbcHJvcE5hbWU6IHN0cmluZ106IHN0cmluZ318bnVsbCxcbiAgICAgIHByaXZhdGUgX291dHB1dHM6IHtbcHJvcE5hbWU6IHN0cmluZ106IHN0cmluZ30sIHB1YmxpYyBuZ0NvbnRlbnRTZWxlY3RvcnM6IHN0cmluZ1tdKSB7XG4gICAgLy8gQXR0ZW50aW9uOiB0aGlzIGN0b3IgaXMgY2FsbGVkIGFzIHRvcCBsZXZlbCBmdW5jdGlvbi5cbiAgICAvLyBQdXR0aW5nIGFueSBsb2dpYyBpbiBoZXJlIHdpbGwgZGVzdHJveSBjbG9zdXJlIHRyZWUgc2hha2luZyFcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudmlld0RlZkZhY3RvcnkgPSB2aWV3RGVmRmFjdG9yeTtcbiAgfVxuXG4gIGdldCBpbnB1dHMoKSB7XG4gICAgY29uc3QgaW5wdXRzQXJyOiB7cHJvcE5hbWU6IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmd9W10gPSBbXTtcbiAgICBjb25zdCBpbnB1dHMgPSB0aGlzLl9pbnB1dHMgITtcbiAgICBmb3IgKGxldCBwcm9wTmFtZSBpbiBpbnB1dHMpIHtcbiAgICAgIGNvbnN0IHRlbXBsYXRlTmFtZSA9IGlucHV0c1twcm9wTmFtZV07XG4gICAgICBpbnB1dHNBcnIucHVzaCh7cHJvcE5hbWUsIHRlbXBsYXRlTmFtZX0pO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXRzQXJyO1xuICB9XG5cbiAgZ2V0IG91dHB1dHMoKSB7XG4gICAgY29uc3Qgb3V0cHV0c0Fycjoge3Byb3BOYW1lOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nfVtdID0gW107XG4gICAgZm9yIChsZXQgcHJvcE5hbWUgaW4gdGhpcy5fb3V0cHV0cykge1xuICAgICAgY29uc3QgdGVtcGxhdGVOYW1lID0gdGhpcy5fb3V0cHV0c1twcm9wTmFtZV07XG4gICAgICBvdXRwdXRzQXJyLnB1c2goe3Byb3BOYW1lLCB0ZW1wbGF0ZU5hbWV9KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dHNBcnI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjb21wb25lbnQuXG4gICAqL1xuICBjcmVhdGUoXG4gICAgICBpbmplY3RvcjogSW5qZWN0b3IsIHByb2plY3RhYmxlTm9kZXM/OiBhbnlbXVtdLCByb290U2VsZWN0b3JPck5vZGU/OiBzdHJpbmd8YW55LFxuICAgICAgbmdNb2R1bGU/OiBOZ01vZHVsZVJlZjxhbnk+KTogQ29tcG9uZW50UmVmPGFueT4ge1xuICAgIGlmICghbmdNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmdNb2R1bGUgc2hvdWxkIGJlIHByb3ZpZGVkJyk7XG4gICAgfVxuICAgIGNvbnN0IHZpZXdEZWYgPSByZXNvbHZlRGVmaW5pdGlvbih0aGlzLnZpZXdEZWZGYWN0b3J5KTtcbiAgICBjb25zdCBjb21wb25lbnROb2RlSW5kZXggPSB2aWV3RGVmLm5vZGVzWzBdLmVsZW1lbnQgIS5jb21wb25lbnRQcm92aWRlciAhLm5vZGVJbmRleDtcbiAgICBjb25zdCB2aWV3ID0gU2VydmljZXMuY3JlYXRlUm9vdFZpZXcoXG4gICAgICAgIGluamVjdG9yLCBwcm9qZWN0YWJsZU5vZGVzIHx8IFtdLCByb290U2VsZWN0b3JPck5vZGUsIHZpZXdEZWYsIG5nTW9kdWxlLCBFTVBUWV9DT05URVhUKTtcbiAgICBjb25zdCBjb21wb25lbnQgPSBhc1Byb3ZpZGVyRGF0YSh2aWV3LCBjb21wb25lbnROb2RlSW5kZXgpLmluc3RhbmNlO1xuICAgIGlmIChyb290U2VsZWN0b3JPck5vZGUpIHtcbiAgICAgIHZpZXcucmVuZGVyZXIuc2V0QXR0cmlidXRlKGFzRWxlbWVudERhdGEodmlldywgMCkucmVuZGVyRWxlbWVudCwgJ25nLXZlcnNpb24nLCBWRVJTSU9OLmZ1bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29tcG9uZW50UmVmXyh2aWV3LCBuZXcgVmlld1JlZl8odmlldyksIGNvbXBvbmVudCk7XG4gIH1cbn1cblxuY2xhc3MgQ29tcG9uZW50UmVmXyBleHRlbmRzIENvbXBvbmVudFJlZjxhbnk+IHtcbiAgcHVibGljIHJlYWRvbmx5IGhvc3RWaWV3OiBWaWV3UmVmO1xuICBwdWJsaWMgcmVhZG9ubHkgaW5zdGFuY2U6IGFueTtcbiAgcHVibGljIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZjtcbiAgcHJpdmF0ZSBfZWxEZWY6IE5vZGVEZWY7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZpZXc6IFZpZXdEYXRhLCBwcml2YXRlIF92aWV3UmVmOiBWaWV3UmVmLCBwcml2YXRlIF9jb21wb25lbnQ6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZWxEZWYgPSB0aGlzLl92aWV3LmRlZi5ub2Rlc1swXTtcbiAgICB0aGlzLmhvc3RWaWV3ID0gX3ZpZXdSZWY7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZiA9IF92aWV3UmVmO1xuICAgIHRoaXMuaW5zdGFuY2UgPSBfY29tcG9uZW50O1xuICB9XG4gIGdldCBsb2NhdGlvbigpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gbmV3IEVsZW1lbnRSZWYoYXNFbGVtZW50RGF0YSh0aGlzLl92aWV3LCB0aGlzLl9lbERlZi5ub2RlSW5kZXgpLnJlbmRlckVsZW1lbnQpO1xuICB9XG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiBuZXcgSW5qZWN0b3JfKHRoaXMuX3ZpZXcsIHRoaXMuX2VsRGVmKTsgfVxuICBnZXQgY29tcG9uZW50VHlwZSgpOiBUeXBlPGFueT4geyByZXR1cm4gPGFueT50aGlzLl9jb21wb25lbnQuY29uc3RydWN0b3I7IH1cblxuICBkZXN0cm95KCk6IHZvaWQgeyB0aGlzLl92aWV3UmVmLmRlc3Ryb3koKTsgfVxuICBvbkRlc3Ryb3koY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7IHRoaXMuX3ZpZXdSZWYub25EZXN0cm95KGNhbGxiYWNrKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmlld0NvbnRhaW5lckRhdGEoXG4gICAgdmlldzogVmlld0RhdGEsIGVsRGVmOiBOb2RlRGVmLCBlbERhdGE6IEVsZW1lbnREYXRhKTogVmlld0NvbnRhaW5lckRhdGEge1xuICByZXR1cm4gbmV3IFZpZXdDb250YWluZXJSZWZfKHZpZXcsIGVsRGVmLCBlbERhdGEpO1xufVxuXG5jbGFzcyBWaWV3Q29udGFpbmVyUmVmXyBpbXBsZW1lbnRzIFZpZXdDb250YWluZXJEYXRhIHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2VtYmVkZGVkVmlld3M6IFZpZXdEYXRhW10gPSBbXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmlldzogVmlld0RhdGEsIHByaXZhdGUgX2VsRGVmOiBOb2RlRGVmLCBwcml2YXRlIF9kYXRhOiBFbGVtZW50RGF0YSkge31cblxuICBnZXQgZWxlbWVudCgpOiBFbGVtZW50UmVmIHsgcmV0dXJuIG5ldyBFbGVtZW50UmVmKHRoaXMuX2RhdGEucmVuZGVyRWxlbWVudCk7IH1cblxuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gbmV3IEluamVjdG9yXyh0aGlzLl92aWV3LCB0aGlzLl9lbERlZik7IH1cblxuICBnZXQgcGFyZW50SW5qZWN0b3IoKTogSW5qZWN0b3Ige1xuICAgIGxldCB2aWV3ID0gdGhpcy5fdmlldztcbiAgICBsZXQgZWxEZWYgPSB0aGlzLl9lbERlZi5wYXJlbnQ7XG4gICAgd2hpbGUgKCFlbERlZiAmJiB2aWV3KSB7XG4gICAgICBlbERlZiA9IHZpZXdQYXJlbnRFbCh2aWV3KTtcbiAgICAgIHZpZXcgPSB2aWV3LnBhcmVudCAhO1xuICAgIH1cblxuICAgIHJldHVybiB2aWV3ID8gbmV3IEluamVjdG9yXyh2aWV3LCBlbERlZikgOiBuZXcgSW5qZWN0b3JfKHRoaXMuX3ZpZXcsIG51bGwpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgY29uc3QgbGVuID0gdGhpcy5fZW1iZWRkZWRWaWV3cy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IGxlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCB2aWV3ID0gZGV0YWNoRW1iZWRkZWRWaWV3KHRoaXMuX2RhdGEsIGkpICE7XG4gICAgICBTZXJ2aWNlcy5kZXN0cm95Vmlldyh2aWV3KTtcbiAgICB9XG4gIH1cblxuICBnZXQoaW5kZXg6IG51bWJlcik6IFZpZXdSZWZ8bnVsbCB7XG4gICAgY29uc3QgdmlldyA9IHRoaXMuX2VtYmVkZGVkVmlld3NbaW5kZXhdO1xuICAgIGlmICh2aWV3KSB7XG4gICAgICBjb25zdCByZWYgPSBuZXcgVmlld1JlZl8odmlldyk7XG4gICAgICByZWYuYXR0YWNoVG9WaWV3Q29udGFpbmVyUmVmKHRoaXMpO1xuICAgICAgcmV0dXJuIHJlZjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9lbWJlZGRlZFZpZXdzLmxlbmd0aDsgfVxuXG4gIGNyZWF0ZUVtYmVkZGVkVmlldzxDPih0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8Qz4sIGNvbnRleHQ/OiBDLCBpbmRleD86IG51bWJlcik6XG4gICAgICBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgIGNvbnN0IHZpZXdSZWYgPSB0ZW1wbGF0ZVJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoY29udGV4dCB8fCA8YW55Pnt9KTtcbiAgICB0aGlzLmluc2VydCh2aWV3UmVmLCBpbmRleCk7XG4gICAgcmV0dXJuIHZpZXdSZWY7XG4gIH1cblxuICBjcmVhdGVDb21wb25lbnQ8Qz4oXG4gICAgICBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PEM+LCBpbmRleD86IG51bWJlciwgaW5qZWN0b3I/OiBJbmplY3RvcixcbiAgICAgIHByb2plY3RhYmxlTm9kZXM/OiBhbnlbXVtdLCBuZ01vZHVsZVJlZj86IE5nTW9kdWxlUmVmPGFueT4pOiBDb21wb25lbnRSZWY8Qz4ge1xuICAgIGNvbnN0IGNvbnRleHRJbmplY3RvciA9IGluamVjdG9yIHx8IHRoaXMucGFyZW50SW5qZWN0b3I7XG4gICAgaWYgKCFuZ01vZHVsZVJlZiAmJiAhKGNvbXBvbmVudEZhY3RvcnkgaW5zdGFuY2VvZiBDb21wb25lbnRGYWN0b3J5Qm91bmRUb01vZHVsZSkpIHtcbiAgICAgIG5nTW9kdWxlUmVmID0gY29udGV4dEluamVjdG9yLmdldChOZ01vZHVsZVJlZik7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9XG4gICAgICAgIGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKGNvbnRleHRJbmplY3RvciwgcHJvamVjdGFibGVOb2RlcywgdW5kZWZpbmVkLCBuZ01vZHVsZVJlZik7XG4gICAgdGhpcy5pbnNlcnQoY29tcG9uZW50UmVmLmhvc3RWaWV3LCBpbmRleCk7XG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcbiAgfVxuXG4gIGluc2VydCh2aWV3UmVmOiBWaWV3UmVmLCBpbmRleD86IG51bWJlcik6IFZpZXdSZWYge1xuICAgIGlmICh2aWV3UmVmLmRlc3Ryb3llZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW5zZXJ0IGEgZGVzdHJveWVkIFZpZXcgaW4gYSBWaWV3Q29udGFpbmVyIScpO1xuICAgIH1cbiAgICBjb25zdCB2aWV3UmVmXyA9IDxWaWV3UmVmXz52aWV3UmVmO1xuICAgIGNvbnN0IHZpZXdEYXRhID0gdmlld1JlZl8uX3ZpZXc7XG4gICAgYXR0YWNoRW1iZWRkZWRWaWV3KHRoaXMuX3ZpZXcsIHRoaXMuX2RhdGEsIGluZGV4LCB2aWV3RGF0YSk7XG4gICAgdmlld1JlZl8uYXR0YWNoVG9WaWV3Q29udGFpbmVyUmVmKHRoaXMpO1xuICAgIHJldHVybiB2aWV3UmVmO1xuICB9XG5cbiAgbW92ZSh2aWV3UmVmOiBWaWV3UmVmXywgY3VycmVudEluZGV4OiBudW1iZXIpOiBWaWV3UmVmIHtcbiAgICBpZiAodmlld1JlZi5kZXN0cm95ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IG1vdmUgYSBkZXN0cm95ZWQgVmlldyBpbiBhIFZpZXdDb250YWluZXIhJyk7XG4gICAgfVxuICAgIGNvbnN0IHByZXZpb3VzSW5kZXggPSB0aGlzLl9lbWJlZGRlZFZpZXdzLmluZGV4T2Yodmlld1JlZi5fdmlldyk7XG4gICAgbW92ZUVtYmVkZGVkVmlldyh0aGlzLl9kYXRhLCBwcmV2aW91c0luZGV4LCBjdXJyZW50SW5kZXgpO1xuICAgIHJldHVybiB2aWV3UmVmO1xuICB9XG5cbiAgaW5kZXhPZih2aWV3UmVmOiBWaWV3UmVmKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZW1iZWRkZWRWaWV3cy5pbmRleE9mKCg8Vmlld1JlZl8+dmlld1JlZikuX3ZpZXcpO1xuICB9XG5cbiAgcmVtb3ZlKGluZGV4PzogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgdmlld0RhdGEgPSBkZXRhY2hFbWJlZGRlZFZpZXcodGhpcy5fZGF0YSwgaW5kZXgpO1xuICAgIGlmICh2aWV3RGF0YSkge1xuICAgICAgU2VydmljZXMuZGVzdHJveVZpZXcodmlld0RhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGRldGFjaChpbmRleD86IG51bWJlcik6IFZpZXdSZWZ8bnVsbCB7XG4gICAgY29uc3QgdmlldyA9IGRldGFjaEVtYmVkZGVkVmlldyh0aGlzLl9kYXRhLCBpbmRleCk7XG4gICAgcmV0dXJuIHZpZXcgPyBuZXcgVmlld1JlZl8odmlldykgOiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaGFuZ2VEZXRlY3RvclJlZih2aWV3OiBWaWV3RGF0YSk6IENoYW5nZURldGVjdG9yUmVmIHtcbiAgcmV0dXJuIG5ldyBWaWV3UmVmXyh2aWV3KTtcbn1cblxuZXhwb3J0IGNsYXNzIFZpZXdSZWZfIGltcGxlbWVudHMgRW1iZWRkZWRWaWV3UmVmPGFueT4sIEludGVybmFsVmlld1JlZiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ZpZXc6IFZpZXdEYXRhO1xuICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmfG51bGw7XG4gIHByaXZhdGUgX2FwcFJlZjogQXBwbGljYXRpb25SZWZ8bnVsbDtcblxuICBjb25zdHJ1Y3RvcihfdmlldzogVmlld0RhdGEpIHtcbiAgICB0aGlzLl92aWV3ID0gX3ZpZXc7XG4gICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZiA9IG51bGw7XG4gICAgdGhpcy5fYXBwUmVmID0gbnVsbDtcbiAgfVxuXG4gIGdldCByb290Tm9kZXMoKTogYW55W10geyByZXR1cm4gcm9vdFJlbmRlck5vZGVzKHRoaXMuX3ZpZXcpOyB9XG5cbiAgZ2V0IGNvbnRleHQoKSB7IHJldHVybiB0aGlzLl92aWV3LmNvbnRleHQ7IH1cblxuICBnZXQgZGVzdHJveWVkKCk6IGJvb2xlYW4geyByZXR1cm4gKHRoaXMuX3ZpZXcuc3RhdGUgJiBWaWV3U3RhdGUuRGVzdHJveWVkKSAhPT0gMDsgfVxuXG4gIG1hcmtGb3JDaGVjaygpOiB2b2lkIHsgbWFya1BhcmVudFZpZXdzRm9yQ2hlY2sodGhpcy5fdmlldyk7IH1cbiAgZGV0YWNoKCk6IHZvaWQgeyB0aGlzLl92aWV3LnN0YXRlICY9IH5WaWV3U3RhdGUuQXR0YWNoZWQ7IH1cbiAgZGV0ZWN0Q2hhbmdlcygpOiB2b2lkIHtcbiAgICBjb25zdCBmcyA9IHRoaXMuX3ZpZXcucm9vdC5yZW5kZXJlckZhY3Rvcnk7XG4gICAgaWYgKGZzLmJlZ2luKSB7XG4gICAgICBmcy5iZWdpbigpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgU2VydmljZXMuY2hlY2tBbmRVcGRhdGVWaWV3KHRoaXMuX3ZpZXcpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoZnMuZW5kKSB7XG4gICAgICAgIGZzLmVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGVja05vQ2hhbmdlcygpOiB2b2lkIHsgU2VydmljZXMuY2hlY2tOb0NoYW5nZXNWaWV3KHRoaXMuX3ZpZXcpOyB9XG5cbiAgcmVhdHRhY2goKTogdm9pZCB7IHRoaXMuX3ZpZXcuc3RhdGUgfD0gVmlld1N0YXRlLkF0dGFjaGVkOyB9XG4gIG9uRGVzdHJveShjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBpZiAoIXRoaXMuX3ZpZXcuZGlzcG9zYWJsZXMpIHtcbiAgICAgIHRoaXMuX3ZpZXcuZGlzcG9zYWJsZXMgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5fdmlldy5kaXNwb3NhYmxlcy5wdXNoKDxhbnk+Y2FsbGJhY2spO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fYXBwUmVmKSB7XG4gICAgICB0aGlzLl9hcHBSZWYuZGV0YWNoVmlldyh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYuZGV0YWNoKHRoaXMuX3ZpZXdDb250YWluZXJSZWYuaW5kZXhPZih0aGlzKSk7XG4gICAgfVxuICAgIFNlcnZpY2VzLmRlc3Ryb3lWaWV3KHRoaXMuX3ZpZXcpO1xuICB9XG5cbiAgZGV0YWNoRnJvbUFwcFJlZigpIHtcbiAgICB0aGlzLl9hcHBSZWYgPSBudWxsO1xuICAgIHJlbmRlckRldGFjaFZpZXcodGhpcy5fdmlldyk7XG4gICAgU2VydmljZXMuZGlydHlQYXJlbnRRdWVyaWVzKHRoaXMuX3ZpZXcpO1xuICB9XG5cbiAgYXR0YWNoVG9BcHBSZWYoYXBwUmVmOiBBcHBsaWNhdGlvblJlZikge1xuICAgIGlmICh0aGlzLl92aWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgdmlldyBpcyBhbHJlYWR5IGF0dGFjaGVkIHRvIGEgVmlld0NvbnRhaW5lciEnKTtcbiAgICB9XG4gICAgdGhpcy5fYXBwUmVmID0gYXBwUmVmO1xuICB9XG5cbiAgYXR0YWNoVG9WaWV3Q29udGFpbmVyUmVmKHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgaWYgKHRoaXMuX2FwcFJlZikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHZpZXcgaXMgYWxyZWFkeSBhdHRhY2hlZCBkaXJlY3RseSB0byB0aGUgQXBwbGljYXRpb25SZWYhJyk7XG4gICAgfVxuICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYgPSB2Y1JlZjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGVEYXRhKHZpZXc6IFZpZXdEYXRhLCBkZWY6IE5vZGVEZWYpOiBUZW1wbGF0ZURhdGEge1xuICByZXR1cm4gbmV3IFRlbXBsYXRlUmVmXyh2aWV3LCBkZWYpO1xufVxuXG5jbGFzcyBUZW1wbGF0ZVJlZl8gZXh0ZW5kcyBUZW1wbGF0ZVJlZjxhbnk+IGltcGxlbWVudHMgVGVtcGxhdGVEYXRhIHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIF9wcm9qZWN0ZWRWaWV3cyAhOiBWaWV3RGF0YVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhcmVudFZpZXc6IFZpZXdEYXRhLCBwcml2YXRlIF9kZWY6IE5vZGVEZWYpIHsgc3VwZXIoKTsgfVxuXG4gIGNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZXh0OiBhbnkpOiBFbWJlZGRlZFZpZXdSZWY8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBWaWV3UmVmXyhTZXJ2aWNlcy5jcmVhdGVFbWJlZGRlZFZpZXcoXG4gICAgICAgIHRoaXMuX3BhcmVudFZpZXcsIHRoaXMuX2RlZiwgdGhpcy5fZGVmLmVsZW1lbnQgIS50ZW1wbGF0ZSAhLCBjb250ZXh0KSk7XG4gIH1cblxuICBnZXQgZWxlbWVudFJlZigpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gbmV3IEVsZW1lbnRSZWYoYXNFbGVtZW50RGF0YSh0aGlzLl9wYXJlbnRWaWV3LCB0aGlzLl9kZWYubm9kZUluZGV4KS5yZW5kZXJFbGVtZW50KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5qZWN0b3IodmlldzogVmlld0RhdGEsIGVsRGVmOiBOb2RlRGVmKTogSW5qZWN0b3Ige1xuICByZXR1cm4gbmV3IEluamVjdG9yXyh2aWV3LCBlbERlZik7XG59XG5cbmNsYXNzIEluamVjdG9yXyBpbXBsZW1lbnRzIEluamVjdG9yIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3OiBWaWV3RGF0YSwgcHJpdmF0ZSBlbERlZjogTm9kZURlZnxudWxsKSB7fVxuICBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZTogYW55ID0gSW5qZWN0b3IuVEhST1dfSUZfTk9UX0ZPVU5EKTogYW55IHtcbiAgICBjb25zdCBhbGxvd1ByaXZhdGVTZXJ2aWNlcyA9XG4gICAgICAgIHRoaXMuZWxEZWYgPyAodGhpcy5lbERlZi5mbGFncyAmIE5vZGVGbGFncy5Db21wb25lbnRWaWV3KSAhPT0gMCA6IGZhbHNlO1xuICAgIHJldHVybiBTZXJ2aWNlcy5yZXNvbHZlRGVwKFxuICAgICAgICB0aGlzLnZpZXcsIHRoaXMuZWxEZWYsIGFsbG93UHJpdmF0ZVNlcnZpY2VzLFxuICAgICAgICB7ZmxhZ3M6IERlcEZsYWdzLk5vbmUsIHRva2VuLCB0b2tlbktleTogdG9rZW5LZXkodG9rZW4pfSwgbm90Rm91bmRWYWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGVWYWx1ZSh2aWV3OiBWaWV3RGF0YSwgaW5kZXg6IG51bWJlcik6IGFueSB7XG4gIGNvbnN0IGRlZiA9IHZpZXcuZGVmLm5vZGVzW2luZGV4XTtcbiAgaWYgKGRlZi5mbGFncyAmIE5vZGVGbGFncy5UeXBlRWxlbWVudCkge1xuICAgIGNvbnN0IGVsRGF0YSA9IGFzRWxlbWVudERhdGEodmlldywgZGVmLm5vZGVJbmRleCk7XG4gICAgcmV0dXJuIGRlZi5lbGVtZW50ICEudGVtcGxhdGUgPyBlbERhdGEudGVtcGxhdGUgOiBlbERhdGEucmVuZGVyRWxlbWVudDtcbiAgfSBlbHNlIGlmIChkZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuVHlwZVRleHQpIHtcbiAgICByZXR1cm4gYXNUZXh0RGF0YSh2aWV3LCBkZWYubm9kZUluZGV4KS5yZW5kZXJUZXh0O1xuICB9IGVsc2UgaWYgKGRlZi5mbGFncyAmIChOb2RlRmxhZ3MuQ2F0UHJvdmlkZXIgfCBOb2RlRmxhZ3MuVHlwZVBpcGUpKSB7XG4gICAgcmV0dXJuIGFzUHJvdmlkZXJEYXRhKHZpZXcsIGRlZi5ub2RlSW5kZXgpLmluc3RhbmNlO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgSWxsZWdhbCBzdGF0ZTogcmVhZCBub2RlVmFsdWUgZm9yIG5vZGUgaW5kZXggJHtpbmRleH1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlbmRlcmVyVjEodmlldzogVmlld0RhdGEpOiBSZW5kZXJlclYxIHtcbiAgcmV0dXJuIG5ldyBSZW5kZXJlckFkYXB0ZXIodmlldy5yZW5kZXJlcik7XG59XG5cbmNsYXNzIFJlbmRlcmVyQWRhcHRlciBpbXBsZW1lbnRzIFJlbmRlcmVyVjEge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlbGVnYXRlOiBSZW5kZXJlcjIpIHt9XG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8RWxlbWVudCk6IEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQocGFyZW50OiBFbGVtZW50fERvY3VtZW50RnJhZ21lbnQsIG5hbWVzcGFjZUFuZE5hbWU6IHN0cmluZyk6IEVsZW1lbnQge1xuICAgIGNvbnN0IFtucywgbmFtZV0gPSBzcGxpdE5hbWVzcGFjZShuYW1lc3BhY2VBbmROYW1lKTtcbiAgICBjb25zdCBlbCA9IHRoaXMuZGVsZWdhdGUuY3JlYXRlRWxlbWVudChuYW1lLCBucyk7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRDaGlsZChwYXJlbnQsIGVsKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgY3JlYXRlVmlld1Jvb3QoaG9zdEVsZW1lbnQ6IEVsZW1lbnQpOiBFbGVtZW50fERvY3VtZW50RnJhZ21lbnQgeyByZXR1cm4gaG9zdEVsZW1lbnQ7IH1cblxuICBjcmVhdGVUZW1wbGF0ZUFuY2hvcihwYXJlbnRFbGVtZW50OiBFbGVtZW50fERvY3VtZW50RnJhZ21lbnQpOiBDb21tZW50IHtcbiAgICBjb25zdCBjb21tZW50ID0gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVDb21tZW50KCcnKTtcbiAgICBpZiAocGFyZW50RWxlbWVudCkge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRDaGlsZChwYXJlbnRFbGVtZW50LCBjb21tZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbW1lbnQ7XG4gIH1cblxuICBjcmVhdGVUZXh0KHBhcmVudEVsZW1lbnQ6IEVsZW1lbnR8RG9jdW1lbnRGcmFnbWVudCwgdmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuZGVsZWdhdGUuY3JlYXRlVGV4dCh2YWx1ZSk7XG4gICAgaWYgKHBhcmVudEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kQ2hpbGQocGFyZW50RWxlbWVudCwgbm9kZSk7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgcHJvamVjdE5vZGVzKHBhcmVudEVsZW1lbnQ6IEVsZW1lbnR8RG9jdW1lbnRGcmFnbWVudCwgbm9kZXM6IE5vZGVbXSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kQ2hpbGQocGFyZW50RWxlbWVudCwgbm9kZXNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFZpZXdBZnRlcihub2RlOiBOb2RlLCB2aWV3Um9vdE5vZGVzOiBOb2RlW10pIHtcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gdGhpcy5kZWxlZ2F0ZS5wYXJlbnROb2RlKG5vZGUpO1xuICAgIGNvbnN0IG5leHRTaWJsaW5nID0gdGhpcy5kZWxlZ2F0ZS5uZXh0U2libGluZyhub2RlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZXdSb290Tm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuaW5zZXJ0QmVmb3JlKHBhcmVudEVsZW1lbnQsIHZpZXdSb290Tm9kZXNbaV0sIG5leHRTaWJsaW5nKTtcbiAgICB9XG4gIH1cblxuICBkZXRhY2hWaWV3KHZpZXdSb290Tm9kZXM6IChFbGVtZW50fFRleHR8Q29tbWVudClbXSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlld1Jvb3ROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgbm9kZSA9IHZpZXdSb290Tm9kZXNbaV07XG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gdGhpcy5kZWxlZ2F0ZS5wYXJlbnROb2RlKG5vZGUpO1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDaGlsZChwYXJlbnRFbGVtZW50LCBub2RlKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95Vmlldyhob3N0RWxlbWVudDogRWxlbWVudHxEb2N1bWVudEZyYWdtZW50LCB2aWV3QWxsTm9kZXM6IE5vZGVbXSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlld0FsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLmRlc3Ryb3lOb2RlICEodmlld0FsbE5vZGVzW2ldKTtcbiAgICB9XG4gIH1cblxuICBsaXN0ZW4ocmVuZGVyRWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5saXN0ZW4ocmVuZGVyRWxlbWVudCwgbmFtZSwgPGFueT5jYWxsYmFjayk7XG4gIH1cblxuICBsaXN0ZW5HbG9iYWwodGFyZ2V0OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmxpc3Rlbih0YXJnZXQsIG5hbWUsIDxhbnk+Y2FsbGJhY2spO1xuICB9XG5cbiAgc2V0RWxlbWVudFByb3BlcnR5KFxuICAgICAgcmVuZGVyRWxlbWVudDogRWxlbWVudHxEb2N1bWVudEZyYWdtZW50LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRQcm9wZXJ0eShyZW5kZXJFbGVtZW50LCBwcm9wZXJ0eU5hbWUsIHByb3BlcnR5VmFsdWUpO1xuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50OiBFbGVtZW50LCBuYW1lc3BhY2VBbmROYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZVZhbHVlOiBzdHJpbmcpOlxuICAgICAgdm9pZCB7XG4gICAgY29uc3QgW25zLCBuYW1lXSA9IHNwbGl0TmFtZXNwYWNlKG5hbWVzcGFjZUFuZE5hbWUpO1xuICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnNldEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50LCBuYW1lLCBhdHRyaWJ1dGVWYWx1ZSwgbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZUF0dHJpYnV0ZShyZW5kZXJFbGVtZW50LCBuYW1lLCBucyk7XG4gICAgfVxuICB9XG5cbiAgc2V0QmluZGluZ0RlYnVnSW5mbyhyZW5kZXJFbGVtZW50OiBFbGVtZW50LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogc3RyaW5nKTogdm9pZCB7fVxuXG4gIHNldEVsZW1lbnRDbGFzcyhyZW5kZXJFbGVtZW50OiBFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNBZGQpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuYWRkQ2xhc3MocmVuZGVyRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDbGFzcyhyZW5kZXJFbGVtZW50LCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldEVsZW1lbnRTdHlsZShyZW5kZXJFbGVtZW50OiBIVE1MRWxlbWVudCwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChzdHlsZVZhbHVlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuc2V0U3R5bGUocmVuZGVyRWxlbWVudCwgc3R5bGVOYW1lLCBzdHlsZVZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVTdHlsZShyZW5kZXJFbGVtZW50LCBzdHlsZU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyRWxlbWVudDogRWxlbWVudCwgbWV0aG9kTmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgIChyZW5kZXJFbGVtZW50IGFzIGFueSlbbWV0aG9kTmFtZV0uYXBwbHkocmVuZGVyRWxlbWVudCwgYXJncyk7XG4gIH1cblxuICBzZXRUZXh0KHJlbmRlck5vZGU6IFRleHQsIHRleHQ6IHN0cmluZyk6IHZvaWQgeyB0aGlzLmRlbGVnYXRlLnNldFZhbHVlKHJlbmRlck5vZGUsIHRleHQpOyB9XG5cbiAgYW5pbWF0ZSgpOiBhbnkgeyB0aHJvdyBuZXcgRXJyb3IoJ1JlbmRlcmVyLmFuaW1hdGUgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCEnKTsgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOZ01vZHVsZVJlZihcbiAgICBtb2R1bGVUeXBlOiBUeXBlPGFueT4sIHBhcmVudDogSW5qZWN0b3IsIGJvb3RzdHJhcENvbXBvbmVudHM6IFR5cGU8YW55PltdLFxuICAgIGRlZjogTmdNb2R1bGVEZWZpbml0aW9uKTogTmdNb2R1bGVSZWY8YW55PiB7XG4gIHJldHVybiBuZXcgTmdNb2R1bGVSZWZfKG1vZHVsZVR5cGUsIHBhcmVudCwgYm9vdHN0cmFwQ29tcG9uZW50cywgZGVmKTtcbn1cblxuY2xhc3MgTmdNb2R1bGVSZWZfIGltcGxlbWVudHMgTmdNb2R1bGVEYXRhLCBJbnRlcm5hbE5nTW9kdWxlUmVmPGFueT4ge1xuICBwcml2YXRlIF9kZXN0cm95TGlzdGVuZXJzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuICBwcml2YXRlIF9kZXN0cm95ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgX3Byb3ZpZGVycyAhOiBhbnlbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgX21vZHVsZXMgITogYW55W107XG5cbiAgcmVhZG9ubHkgaW5qZWN0b3I6IEluamVjdG9yID0gdGhpcztcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX21vZHVsZVR5cGU6IFR5cGU8YW55PiwgcHVibGljIF9wYXJlbnQ6IEluamVjdG9yLFxuICAgICAgcHVibGljIF9ib290c3RyYXBDb21wb25lbnRzOiBUeXBlPGFueT5bXSwgcHVibGljIF9kZWY6IE5nTW9kdWxlRGVmaW5pdGlvbikge1xuICAgIGluaXROZ01vZHVsZSh0aGlzKTtcbiAgfVxuXG4gIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlOiBhbnkgPSBJbmplY3Rvci5USFJPV19JRl9OT1RfRk9VTkQsXG4gICAgICBpbmplY3RGbGFnczogSW5qZWN0RmxhZ3MgPSBJbmplY3RGbGFncy5EZWZhdWx0KTogYW55IHtcbiAgICBsZXQgZmxhZ3MgPSBEZXBGbGFncy5Ob25lO1xuICAgIGlmIChpbmplY3RGbGFncyAmIEluamVjdEZsYWdzLlNraXBTZWxmKSB7XG4gICAgICBmbGFncyB8PSBEZXBGbGFncy5Ta2lwU2VsZjtcbiAgICB9IGVsc2UgaWYgKGluamVjdEZsYWdzICYgSW5qZWN0RmxhZ3MuU2VsZikge1xuICAgICAgZmxhZ3MgfD0gRGVwRmxhZ3MuU2VsZjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc29sdmVOZ01vZHVsZURlcChcbiAgICAgICAgdGhpcywge3Rva2VuOiB0b2tlbiwgdG9rZW5LZXk6IHRva2VuS2V5KHRva2VuKSwgZmxhZ3M6IGZsYWdzfSwgbm90Rm91bmRWYWx1ZSk7XG4gIH1cblxuICBnZXQgaW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLmdldCh0aGlzLl9tb2R1bGVUeXBlKTsgfVxuXG4gIGdldCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIoKSB7IHJldHVybiB0aGlzLmdldChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpOyB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFRoZSBuZyBtb2R1bGUgJHtzdHJpbmdpZnkodGhpcy5pbnN0YW5jZS5jb25zdHJ1Y3Rvcil9IGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkLmApO1xuICAgIH1cbiAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICAgIGNhbGxOZ01vZHVsZUxpZmVjeWNsZSh0aGlzLCBOb2RlRmxhZ3MuT25EZXN0cm95KTtcbiAgICB0aGlzLl9kZXN0cm95TGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcigpKTtcbiAgfVxuXG4gIG9uRGVzdHJveShjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLl9kZXN0cm95TGlzdGVuZXJzLnB1c2goY2FsbGJhY2spOyB9XG59XG4iXX0=