/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
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
var EMPTY_CONTEXT = new Object();
// Attention: this function is called as top level function.
// Putting any logic in here will destroy closure tree shaking!
export function createComponentFactory(selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors) {
    return new ComponentFactory_(selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors);
}
export function getComponentViewDefinitionFactory(componentFactory) {
    return componentFactory.viewDefFactory;
}
var ComponentFactory_ = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentFactory_, _super);
    function ComponentFactory_(selector, componentType, viewDefFactory, _inputs, _outputs, ngContentSelectors) {
        var _this = 
        // Attention: this ctor is called as top level function.
        // Putting any logic in here will destroy closure tree shaking!
        _super.call(this) || this;
        _this.selector = selector;
        _this.componentType = componentType;
        _this._inputs = _inputs;
        _this._outputs = _outputs;
        _this.ngContentSelectors = ngContentSelectors;
        _this.viewDefFactory = viewDefFactory;
        return _this;
    }
    Object.defineProperty(ComponentFactory_.prototype, "inputs", {
        get: function () {
            var inputsArr = [];
            var inputs = this._inputs;
            for (var propName in inputs) {
                var templateName = inputs[propName];
                inputsArr.push({ propName: propName, templateName: templateName });
            }
            return inputsArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentFactory_.prototype, "outputs", {
        get: function () {
            var outputsArr = [];
            for (var propName in this._outputs) {
                var templateName = this._outputs[propName];
                outputsArr.push({ propName: propName, templateName: templateName });
            }
            return outputsArr;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new component.
     */
    ComponentFactory_.prototype.create = function (injector, projectableNodes, rootSelectorOrNode, ngModule) {
        if (!ngModule) {
            throw new Error('ngModule should be provided');
        }
        var viewDef = resolveDefinition(this.viewDefFactory);
        var componentNodeIndex = viewDef.nodes[0].element.componentProvider.nodeIndex;
        var view = Services.createRootView(injector, projectableNodes || [], rootSelectorOrNode, viewDef, ngModule, EMPTY_CONTEXT);
        var component = asProviderData(view, componentNodeIndex).instance;
        if (rootSelectorOrNode) {
            view.renderer.setAttribute(asElementData(view, 0).renderElement, 'ng-version', VERSION.full);
        }
        return new ComponentRef_(view, new ViewRef_(view), component);
    };
    return ComponentFactory_;
}(ComponentFactory));
var ComponentRef_ = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentRef_, _super);
    function ComponentRef_(_view, _viewRef, _component) {
        var _this = _super.call(this) || this;
        _this._view = _view;
        _this._viewRef = _viewRef;
        _this._component = _component;
        _this._elDef = _this._view.def.nodes[0];
        _this.hostView = _viewRef;
        _this.changeDetectorRef = _viewRef;
        _this.instance = _component;
        return _this;
    }
    Object.defineProperty(ComponentRef_.prototype, "location", {
        get: function () {
            return new ElementRef(asElementData(this._view, this._elDef.nodeIndex).renderElement);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "injector", {
        get: function () { return new Injector_(this._view, this._elDef); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "componentType", {
        get: function () { return this._component.constructor; },
        enumerable: true,
        configurable: true
    });
    ComponentRef_.prototype.destroy = function () { this._viewRef.destroy(); };
    ComponentRef_.prototype.onDestroy = function (callback) { this._viewRef.onDestroy(callback); };
    return ComponentRef_;
}(ComponentRef));
export function createViewContainerData(view, elDef, elData) {
    return new ViewContainerRef_(view, elDef, elData);
}
var ViewContainerRef_ = /** @class */ (function () {
    function ViewContainerRef_(_view, _elDef, _data) {
        this._view = _view;
        this._elDef = _elDef;
        this._data = _data;
        /**
         * @internal
         */
        this._embeddedViews = [];
    }
    Object.defineProperty(ViewContainerRef_.prototype, "element", {
        get: function () { return new ElementRef(this._data.renderElement); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "injector", {
        get: function () { return new Injector_(this._view, this._elDef); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
        get: function () {
            var view = this._view;
            var elDef = this._elDef.parent;
            while (!elDef && view) {
                elDef = viewParentEl(view);
                view = view.parent;
            }
            return view ? new Injector_(view, elDef) : new Injector_(this._view, null);
        },
        enumerable: true,
        configurable: true
    });
    ViewContainerRef_.prototype.clear = function () {
        var len = this._embeddedViews.length;
        for (var i = len - 1; i >= 0; i--) {
            var view = detachEmbeddedView(this._data, i);
            Services.destroyView(view);
        }
    };
    ViewContainerRef_.prototype.get = function (index) {
        var view = this._embeddedViews[index];
        if (view) {
            var ref = new ViewRef_(view);
            ref.attachToViewContainerRef(this);
            return ref;
        }
        return null;
    };
    Object.defineProperty(ViewContainerRef_.prototype, "length", {
        get: function () { return this._embeddedViews.length; },
        enumerable: true,
        configurable: true
    });
    ViewContainerRef_.prototype.createEmbeddedView = function (templateRef, context, index) {
        var viewRef = templateRef.createEmbeddedView(context || {});
        this.insert(viewRef, index);
        return viewRef;
    };
    ViewContainerRef_.prototype.createComponent = function (componentFactory, index, injector, projectableNodes, ngModuleRef) {
        var contextInjector = injector || this.parentInjector;
        if (!ngModuleRef && !(componentFactory instanceof ComponentFactoryBoundToModule)) {
            ngModuleRef = contextInjector.get(NgModuleRef);
        }
        var componentRef = componentFactory.create(contextInjector, projectableNodes, undefined, ngModuleRef);
        this.insert(componentRef.hostView, index);
        return componentRef;
    };
    ViewContainerRef_.prototype.insert = function (viewRef, index) {
        if (viewRef.destroyed) {
            throw new Error('Cannot insert a destroyed View in a ViewContainer!');
        }
        var viewRef_ = viewRef;
        var viewData = viewRef_._view;
        attachEmbeddedView(this._view, this._data, index, viewData);
        viewRef_.attachToViewContainerRef(this);
        return viewRef;
    };
    ViewContainerRef_.prototype.move = function (viewRef, currentIndex) {
        if (viewRef.destroyed) {
            throw new Error('Cannot move a destroyed View in a ViewContainer!');
        }
        var previousIndex = this._embeddedViews.indexOf(viewRef._view);
        moveEmbeddedView(this._data, previousIndex, currentIndex);
        return viewRef;
    };
    ViewContainerRef_.prototype.indexOf = function (viewRef) {
        return this._embeddedViews.indexOf(viewRef._view);
    };
    ViewContainerRef_.prototype.remove = function (index) {
        var viewData = detachEmbeddedView(this._data, index);
        if (viewData) {
            Services.destroyView(viewData);
        }
    };
    ViewContainerRef_.prototype.detach = function (index) {
        var view = detachEmbeddedView(this._data, index);
        return view ? new ViewRef_(view) : null;
    };
    return ViewContainerRef_;
}());
export function createChangeDetectorRef(view) {
    return new ViewRef_(view);
}
var ViewRef_ = /** @class */ (function () {
    function ViewRef_(_view) {
        this._view = _view;
        this._viewContainerRef = null;
        this._appRef = null;
    }
    Object.defineProperty(ViewRef_.prototype, "rootNodes", {
        get: function () { return rootRenderNodes(this._view); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "context", {
        get: function () { return this._view.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "destroyed", {
        get: function () { return (this._view.state & 128 /* Destroyed */) !== 0; },
        enumerable: true,
        configurable: true
    });
    ViewRef_.prototype.markForCheck = function () { markParentViewsForCheck(this._view); };
    ViewRef_.prototype.detach = function () { this._view.state &= ~4 /* Attached */; };
    ViewRef_.prototype.detectChanges = function () {
        var fs = this._view.root.rendererFactory;
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
    };
    ViewRef_.prototype.checkNoChanges = function () { Services.checkNoChangesView(this._view); };
    ViewRef_.prototype.reattach = function () { this._view.state |= 4 /* Attached */; };
    ViewRef_.prototype.onDestroy = function (callback) {
        if (!this._view.disposables) {
            this._view.disposables = [];
        }
        this._view.disposables.push(callback);
    };
    ViewRef_.prototype.destroy = function () {
        if (this._appRef) {
            this._appRef.detachView(this);
        }
        else if (this._viewContainerRef) {
            this._viewContainerRef.detach(this._viewContainerRef.indexOf(this));
        }
        Services.destroyView(this._view);
    };
    ViewRef_.prototype.detachFromAppRef = function () {
        this._appRef = null;
        renderDetachView(this._view);
        Services.dirtyParentQueries(this._view);
    };
    ViewRef_.prototype.attachToAppRef = function (appRef) {
        if (this._viewContainerRef) {
            throw new Error('This view is already attached to a ViewContainer!');
        }
        this._appRef = appRef;
    };
    ViewRef_.prototype.attachToViewContainerRef = function (vcRef) {
        if (this._appRef) {
            throw new Error('This view is already attached directly to the ApplicationRef!');
        }
        this._viewContainerRef = vcRef;
    };
    return ViewRef_;
}());
export { ViewRef_ };
export function createTemplateData(view, def) {
    return new TemplateRef_(view, def);
}
var TemplateRef_ = /** @class */ (function (_super) {
    tslib_1.__extends(TemplateRef_, _super);
    function TemplateRef_(_parentView, _def) {
        var _this = _super.call(this) || this;
        _this._parentView = _parentView;
        _this._def = _def;
        return _this;
    }
    TemplateRef_.prototype.createEmbeddedView = function (context) {
        return new ViewRef_(Services.createEmbeddedView(this._parentView, this._def, this._def.element.template, context));
    };
    Object.defineProperty(TemplateRef_.prototype, "elementRef", {
        get: function () {
            return new ElementRef(asElementData(this._parentView, this._def.nodeIndex).renderElement);
        },
        enumerable: true,
        configurable: true
    });
    return TemplateRef_;
}(TemplateRef));
export function createInjector(view, elDef) {
    return new Injector_(view, elDef);
}
var Injector_ = /** @class */ (function () {
    function Injector_(view, elDef) {
        this.view = view;
        this.elDef = elDef;
    }
    Injector_.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
        var allowPrivateServices = this.elDef ? (this.elDef.flags & 33554432 /* ComponentView */) !== 0 : false;
        return Services.resolveDep(this.view, this.elDef, allowPrivateServices, { flags: 0 /* None */, token: token, tokenKey: tokenKey(token) }, notFoundValue);
    };
    return Injector_;
}());
export function nodeValue(view, index) {
    var def = view.def.nodes[index];
    if (def.flags & 1 /* TypeElement */) {
        var elData = asElementData(view, def.nodeIndex);
        return def.element.template ? elData.template : elData.renderElement;
    }
    else if (def.flags & 2 /* TypeText */) {
        return asTextData(view, def.nodeIndex).renderText;
    }
    else if (def.flags & (20224 /* CatProvider */ | 16 /* TypePipe */)) {
        return asProviderData(view, def.nodeIndex).instance;
    }
    throw new Error("Illegal state: read nodeValue for node index " + index);
}
export function createRendererV1(view) {
    return new RendererAdapter(view.renderer);
}
var RendererAdapter = /** @class */ (function () {
    function RendererAdapter(delegate) {
        this.delegate = delegate;
    }
    RendererAdapter.prototype.selectRootElement = function (selectorOrNode) {
        return this.delegate.selectRootElement(selectorOrNode);
    };
    RendererAdapter.prototype.createElement = function (parent, namespaceAndName) {
        var _a = tslib_1.__read(splitNamespace(namespaceAndName), 2), ns = _a[0], name = _a[1];
        var el = this.delegate.createElement(name, ns);
        if (parent) {
            this.delegate.appendChild(parent, el);
        }
        return el;
    };
    RendererAdapter.prototype.createViewRoot = function (hostElement) { return hostElement; };
    RendererAdapter.prototype.createTemplateAnchor = function (parentElement) {
        var comment = this.delegate.createComment('');
        if (parentElement) {
            this.delegate.appendChild(parentElement, comment);
        }
        return comment;
    };
    RendererAdapter.prototype.createText = function (parentElement, value) {
        var node = this.delegate.createText(value);
        if (parentElement) {
            this.delegate.appendChild(parentElement, node);
        }
        return node;
    };
    RendererAdapter.prototype.projectNodes = function (parentElement, nodes) {
        for (var i = 0; i < nodes.length; i++) {
            this.delegate.appendChild(parentElement, nodes[i]);
        }
    };
    RendererAdapter.prototype.attachViewAfter = function (node, viewRootNodes) {
        var parentElement = this.delegate.parentNode(node);
        var nextSibling = this.delegate.nextSibling(node);
        for (var i = 0; i < viewRootNodes.length; i++) {
            this.delegate.insertBefore(parentElement, viewRootNodes[i], nextSibling);
        }
    };
    RendererAdapter.prototype.detachView = function (viewRootNodes) {
        for (var i = 0; i < viewRootNodes.length; i++) {
            var node = viewRootNodes[i];
            var parentElement = this.delegate.parentNode(node);
            this.delegate.removeChild(parentElement, node);
        }
    };
    RendererAdapter.prototype.destroyView = function (hostElement, viewAllNodes) {
        for (var i = 0; i < viewAllNodes.length; i++) {
            this.delegate.destroyNode(viewAllNodes[i]);
        }
    };
    RendererAdapter.prototype.listen = function (renderElement, name, callback) {
        return this.delegate.listen(renderElement, name, callback);
    };
    RendererAdapter.prototype.listenGlobal = function (target, name, callback) {
        return this.delegate.listen(target, name, callback);
    };
    RendererAdapter.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        this.delegate.setProperty(renderElement, propertyName, propertyValue);
    };
    RendererAdapter.prototype.setElementAttribute = function (renderElement, namespaceAndName, attributeValue) {
        var _a = tslib_1.__read(splitNamespace(namespaceAndName), 2), ns = _a[0], name = _a[1];
        if (attributeValue != null) {
            this.delegate.setAttribute(renderElement, name, attributeValue, ns);
        }
        else {
            this.delegate.removeAttribute(renderElement, name, ns);
        }
    };
    RendererAdapter.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) { };
    RendererAdapter.prototype.setElementClass = function (renderElement, className, isAdd) {
        if (isAdd) {
            this.delegate.addClass(renderElement, className);
        }
        else {
            this.delegate.removeClass(renderElement, className);
        }
    };
    RendererAdapter.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        if (styleValue != null) {
            this.delegate.setStyle(renderElement, styleName, styleValue);
        }
        else {
            this.delegate.removeStyle(renderElement, styleName);
        }
    };
    RendererAdapter.prototype.invokeElementMethod = function (renderElement, methodName, args) {
        renderElement[methodName].apply(renderElement, args);
    };
    RendererAdapter.prototype.setText = function (renderNode, text) { this.delegate.setValue(renderNode, text); };
    RendererAdapter.prototype.animate = function () { throw new Error('Renderer.animate is no longer supported!'); };
    return RendererAdapter;
}());
export function createNgModuleRef(moduleType, parent, bootstrapComponents, def) {
    return new NgModuleRef_(moduleType, parent, bootstrapComponents, def);
}
var NgModuleRef_ = /** @class */ (function () {
    function NgModuleRef_(_moduleType, _parent, _bootstrapComponents, _def) {
        this._moduleType = _moduleType;
        this._parent = _parent;
        this._bootstrapComponents = _bootstrapComponents;
        this._def = _def;
        this._destroyListeners = [];
        this._destroyed = false;
        this.injector = this;
        initNgModule(this);
    }
    NgModuleRef_.prototype.get = function (token, notFoundValue, injectFlags) {
        if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
        if (injectFlags === void 0) { injectFlags = 0 /* Default */; }
        var flags = 0 /* None */;
        if (injectFlags & 4 /* SkipSelf */) {
            flags |= 1 /* SkipSelf */;
        }
        else if (injectFlags & 2 /* Self */) {
            flags |= 4 /* Self */;
        }
        return resolveNgModuleDep(this, { token: token, tokenKey: tokenKey(token), flags: flags }, notFoundValue);
    };
    Object.defineProperty(NgModuleRef_.prototype, "instance", {
        get: function () { return this.get(this._moduleType); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleRef_.prototype, "componentFactoryResolver", {
        get: function () { return this.get(ComponentFactoryResolver); },
        enumerable: true,
        configurable: true
    });
    NgModuleRef_.prototype.destroy = function () {
        if (this._destroyed) {
            throw new Error("The ng module " + stringify(this.instance.constructor) + " has already been destroyed.");
        }
        this._destroyed = true;
        callNgModuleLifecycle(this, 131072 /* OnDestroy */);
        this._destroyListeners.forEach(function (listener) { return listener(); });
    };
    NgModuleRef_.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
    return NgModuleRef_;
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3ZpZXcvcmVmcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBSUgsT0FBTyxFQUFjLFFBQVEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxZQUFZLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRSxPQUFPLEVBQUMsNkJBQTZCLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFzQixXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFLbkQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNsQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBRW5DLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDcEYsT0FBTyxFQUE4RSxRQUFRLEVBQStFLGFBQWEsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ3RPLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDM0gsT0FBTyxFQUFDLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpHLElBQU0sYUFBYSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFbkMsNERBQTREO0FBQzVELCtE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YUFBYSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELHNCQUFJLGtDQUFRO2FBQVosY0FBaUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRXJELHNCQUFJLGtEQUF3QjthQUE1QixjQUFpQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTdFLDhCQUFPLEdBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FDWCxtQkFBaUIsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLGlDQUE4QixDQUFDLENBQUM7U0FDMUY7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixxQkFBcUIsQ0FBQyxJQUFJLHlCQUFzQixDQUFDO1FBQ2pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRLElBQUssT0FBQSxRQUFRLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsZ0NBQVMsR0FBVCxVQUFVLFFBQW9CLElBQVUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEYsbUJBQUM7QUFBRCxDQUFDLEFBN0NELElBNkNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FwcGxpY2F0aW9uUmVmfSBmcm9tICcuLi9hcHBsaWNhdGlvbl9yZWYnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7SW5qZWN0RmxhZ3MsIEluamVjdG9yfSBmcm9tICcuLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge0NvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZn0gZnJvbSAnLi4vbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeUJvdW5kVG9Nb2R1bGUsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcn0gZnJvbSAnLi4vbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5X3Jlc29sdmVyJztcbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSAnLi4vbGlua2VyL2VsZW1lbnRfcmVmJztcbmltcG9ydCB7SW50ZXJuYWxOZ01vZHVsZVJlZiwgTmdNb2R1bGVSZWZ9IGZyb20gJy4uL2xpbmtlci9uZ19tb2R1bGVfZmFjdG9yeSc7XG5pbXBvcnQge1RlbXBsYXRlUmVmfSBmcm9tICcuLi9saW5rZXIvdGVtcGxhdGVfcmVmJztcbmltcG9ydCB7Vmlld0NvbnRhaW5lclJlZn0gZnJvbSAnLi4vbGlua2VyL3ZpZXdfY29udGFpbmVyX3JlZic7XG5pbXBvcnQge0VtYmVkZGVkVmlld1JlZiwgSW50ZXJuYWxWaWV3UmVmLCBWaWV3UmVmfSBmcm9tICcuLi9saW5rZXIvdmlld19yZWYnO1xuaW1wb3J0IHtSZW5kZXJlciBhcyBSZW5kZXJlclYxLCBSZW5kZXJlcjJ9IGZyb20gJy4uL3JlbmRlci9hcGknO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7c3RyaW5naWZ5fSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB7VkVSU0lPTn0gZnJvbSAnLi4vdmVyc2lvbic7XG5cbmltcG9ydCB7Y2FsbE5nTW9kdWxlTGlmZWN5Y2xlLCBpbml0TmdNb2R1bGUsIHJlc29sdmVOZ01vZHVsZURlcH0gZnJvbSAnLi9uZ19tb2R1bGUnO1xuaW1wb3J0IHtEZXBGbGFncywgRWxlbWVudERhdGEsIE5nTW9kdWxlRGF0YSwgTmdNb2R1bGVEZWZpbml0aW9uLCBOb2RlRGVmLCBOb2RlRmxhZ3MsIFNlcnZpY2VzLCBUZW1wbGF0ZURhdGEsIFZpZXdDb250YWluZXJEYXRhLCBWaWV3RGF0YSwgVmlld0RlZmluaXRpb25GYWN0b3J5LCBWaWV3U3RhdGUsIGFzRWxlbWVudERhdGEsIGFzUHJvdmlkZXJEYXRhLCBhc1RleHREYXRhfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7bWFya1BhcmVudFZpZXdzRm9yQ2hlY2ssIHJlc29sdmVEZWZpbml0aW9uLCByb290UmVuZGVyTm9kZXMsIHNwbGl0TmFtZXNwYWNlLCB0b2tlbktleSwgdmlld1BhcmVudEVsfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHthdHRhY2hFbWJlZGRlZFZpZXcsIGRldGFjaEVtYmVkZGVkVmlldywgbW92ZUVtYmVkZGVkVmlldywgcmVuZGVyRGV0YWNoVmlld30gZnJvbSAnLi92aWV3X2F0dGFjaCc7XG5cbmNvbnN0IEVNUFRZX0NPTlRFWFQgPSBuZXcgT2JqZWN0KCk7XG5cbi8vIEF0dGVudGlvbjogdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgYXMgdG9wIGxldmVsIGZ1bmN0aW9uLlxuLy8gUHV0dGluZyBhbnkgbG9naWMgaW4gaGVyZSB3aWxsIGRlc3Ryb3kgY2xvc3VyZSB0cmVlIHNoYWtpbmchXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50RmFjdG9yeShcbiAgICBzZWxlY3Rvcjogc3RyaW5nLCBjb21wb25lbnRUeXBlOiBUeXBlPGFueT4sIHZpZXdEZWZGYWN0b3J5OiBWaWV3RGVmaW5pdGlvbkZhY3RvcnksXG4gICAgaW5wdXRzOiB7W3Byb3BOYW1lOiBzdHJpbmddOiBzdHJpbmd9IHwgbnVsbCwgb3V0cHV0czoge1twcm9wTmFtZTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBuZ0NvbnRlbnRTZWxlY3RvcnM6IHN0cmluZ1tdKTogQ29tcG9uZW50RmFjdG9yeTxhbnk+IHtcbiAgcmV0dXJuIG5ldyBDb21wb25lbnRGYWN0b3J5XyhcbiAgICAgIHNlbGVjdG9yLCBjb21wb25lbnRUeXBlLCB2aWV3RGVmRmFjdG9yeSwgaW5wdXRzLCBvdXRwdXRzLCBuZ0NvbnRlbnRTZWxlY3RvcnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50Vmlld0RlZmluaXRpb25GYWN0b3J5KGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55Pik6XG4gICAgVmlld0RlZmluaXRpb25GYWN0b3J5IHtcbiAgcmV0dXJuIChjb21wb25lbnRGYWN0b3J5IGFzIENvbXBvbmVudEZhY3RvcnlfKS52aWV3RGVmRmFjdG9yeTtcbn1cblxuY2xhc3MgQ29tcG9uZW50RmFjdG9yeV8gZXh0ZW5kcyBDb21wb25lbnRGYWN0b3J5PGFueT4ge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICB2aWV3RGVmRmFjdG9yeTogVmlld0RlZmluaXRpb25GYWN0b3J5O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHNlbGVjdG9yOiBzdHJpbmcsIHB1YmxpYyBjb21wb25lbnRUeXBlOiBUeXBlPGFueT4sXG4gICAgICB2aWV3RGVmRmFjdG9yeTogVmlld0RlZmluaXRpb25GYWN0b3J5LCBwcml2YXRlIF9pbnB1dHM6IHtbcHJvcE5hbWU6IHN0cmluZ106IHN0cmluZ318bnVsbCxcbiAgICAgIHByaXZhdGUgX291dHB1dHM6IHtbcHJvcE5hbWU6IHN0cmluZ106IHN0cmluZ30sIHB1YmxpYyBuZ0NvbnRlbnRTZWxlY3RvcnM6IHN0cmluZ1tdKSB7XG4gICAgLy8gQXR0ZW50aW9uOiB0aGlzIGN0b3IgaXMgY2FsbGVkIGFzIHRvcCBsZXZlbCBmdW5jdGlvbi5cbiAgICAvLyBQdXR0aW5nIGFueSBsb2dpYyBpbiBoZXJlIHdpbGwgZGVzdHJveSBjbG9zdXJlIHRyZWUgc2hha2luZyFcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudmlld0RlZkZhY3RvcnkgPSB2aWV3RGVmRmFjdG9yeTtcbiAgfVxuXG4gIGdldCBpbnB1dHMoKSB7XG4gICAgY29uc3QgaW5wdXRzQXJyOiB7cHJvcE5hbWU6IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmd9W10gPSBbXTtcbiAgICBjb25zdCBpbnB1dHMgPSB0aGlzLl9pbnB1dHMgITtcbiAgICBmb3IgKGxldCBwcm9wTmFtZSBpbiBpbnB1dHMpIHtcbiAgICAgIGNvbnN0IHRlbXBsYXRlTmFtZSA9IGlucHV0c1twcm9wTmFtZV07XG4gICAgICBpbnB1dHNBcnIucHVzaCh7cHJvcE5hbWUsIHRlbXBsYXRlTmFtZX0pO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXRzQXJyO1xuICB9XG5cbiAgZ2V0IG91dHB1dHMoKSB7XG4gICAgY29uc3Qgb3V0cHV0c0Fycjoge3Byb3BOYW1lOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nfVtdID0gW107XG4gICAgZm9yIChsZXQgcHJvcE5hbWUgaW4gdGhpcy5fb3V0cHV0cykge1xuICAgICAgY29uc3QgdGVtcGxhdGVOYW1lID0gdGhpcy5fb3V0cHV0c1twcm9wTmFtZV07XG4gICAgICBvdXRwdXRzQXJyLnB1c2goe3Byb3BOYW1lLCB0ZW1wbGF0ZU5hbWV9KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dHNBcnI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjb21wb25lbnQuXG4gICAqL1xuICBjcmVhdGUoXG4gICAgICBpbmplY3RvcjogSW5qZWN0b3IsIHByb2plY3RhYmxlTm9kZXM/OiBhbnlbXVtdLCByb290U2VsZWN0b3JPck5vZGU/OiBzdHJpbmd8YW55LFxuICAgICAgbmdNb2R1bGU/OiBOZ01vZHVsZVJlZjxhbnk+KTogQ29tcG9uZW50UmVmPGFueT4ge1xuICAgIGlmICghbmdNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmdNb2R1bGUgc2hvdWxkIGJlIHByb3ZpZGVkJyk7XG4gICAgfVxuICAgIGNvbnN0IHZpZXdEZWYgPSByZXNvbHZlRGVmaW5pdGlvbih0aGlzLnZpZXdEZWZGYWN0b3J5KTtcbiAgICBjb25zdCBjb21wb25lbnROb2RlSW5kZXggPSB2aWV3RGVmLm5vZGVzWzBdLmVsZW1lbnQgIS5jb21wb25lbnRQcm92aWRlciAhLm5vZGVJbmRleDtcbiAgICBjb25zdCB2aWV3ID0gU2VydmljZXMuY3JlYXRlUm9vdFZpZXcoXG4gICAgICAgIGluamVjdG9yLCBwcm9qZWN0YWJsZU5vZGVzIHx8IFtdLCByb290U2VsZWN0b3JPck5vZGUsIHZpZXdEZWYsIG5nTW9kdWxlLCBFTVBUWV9DT05URVhUKTtcbiAgICBjb25zdCBjb21wb25lbnQgPSBhc1Byb3ZpZGVyRGF0YSh2aWV3LCBjb21wb25lbnROb2RlSW5kZXgpLmluc3RhbmNlO1xuICAgIGlmIChyb290U2VsZWN0b3JPck5vZGUpIHtcbiAgICAgIHZpZXcucmVuZGVyZXIuc2V0QXR0cmlidXRlKGFzRWxlbWVudERhdGEodmlldywgMCkucmVuZGVyRWxlbWVudCwgJ25nLXZlcnNpb24nLCBWRVJTSU9OLmZ1bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29tcG9uZW50UmVmXyh2aWV3LCBuZXcgVmlld1JlZl8odmlldyksIGNvbXBvbmVudCk7XG4gIH1cbn1cblxuY2xhc3MgQ29tcG9uZW50UmVmXyBleHRlbmRzIENvbXBvbmVudFJlZjxhbnk+IHtcbiAgcHVibGljIHJlYWRvbmx5IGhvc3RWaWV3OiBWaWV3UmVmO1xuICBwdWJsaWMgcmVhZG9ubHkgaW5zdGFuY2U6IGFueTtcbiAgcHVibGljIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZjtcbiAgcHJpdmF0ZSBfZWxEZWY6IE5vZGVEZWY7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZpZXc6IFZpZXdEYXRhLCBwcml2YXRlIF92aWV3UmVmOiBWaWV3UmVmLCBwcml2YXRlIF9jb21wb25lbnQ6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZWxEZWYgPSB0aGlzLl92aWV3LmRlZi5ub2Rlc1swXTtcbiAgICB0aGlzLmhvc3RWaWV3ID0gX3ZpZXdSZWY7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZiA9IF92aWV3UmVmO1xuICAgIHRoaXMuaW5zdGFuY2UgPSBfY29tcG9uZW50O1xuICB9XG4gIGdldCBsb2NhdGlvbigpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gbmV3IEVsZW1lbnRSZWYoYXNFbGVtZW50RGF0YSh0aGlzLl92aWV3LCB0aGlzLl9lbERlZi5ub2RlSW5kZXgpLnJlbmRlckVsZW1lbnQpO1xuICB9XG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiBuZXcgSW5qZWN0b3JfKHRoaXMuX3ZpZXcsIHRoaXMuX2VsRGVmKTsgfVxuICBnZXQgY29tcG9uZW50VHlwZSgpOiBUeXBlPGFueT4geyByZXR1cm4gPGFueT50aGlzLl9jb21wb25lbnQuY29uc3RydWN0b3I7IH1cblxuICBkZXN0cm95KCk6IHZvaWQgeyB0aGlzLl92aWV3UmVmLmRlc3Ryb3koKTsgfVxuICBvbkRlc3Ryb3koY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7IHRoaXMuX3ZpZXdSZWYub25EZXN0cm95KGNhbGxiYWNrKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmlld0NvbnRhaW5lckRhdGEoXG4gICAgdmlldzogVmlld0RhdGEsIGVsRGVmOiBOb2RlRGVmLCBlbERhdGE6IEVsZW1lbnREYXRhKTogVmlld0NvbnRhaW5lckRhdGEge1xuICByZXR1cm4gbmV3IFZpZXdDb250YWluZXJSZWZfKHZpZXcsIGVsRGVmLCBlbERhdGEpO1xufVxuXG5jbGFzcyBWaWV3Q29udGFpbmVyUmVmXyBpbXBsZW1lbnRzIFZpZXdDb250YWluZXJEYXRhIHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2VtYmVkZGVkVmlld3M6IFZpZXdEYXRhW10gPSBbXTtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmlldzogVmlld0RhdGEsIHByaXZhdGUgX2VsRGVmOiBOb2RlRGVmLCBwcml2YXRlIF9kYXRhOiBFbGVtZW50RGF0YSkge31cblxuICBnZXQgZWxlbWVudCgpOiBFbGVtZW50UmVmIHsgcmV0dXJuIG5ldyBFbGVtZW50UmVmKHRoaXMuX2RhdGEucmVuZGVyRWxlbWVudCk7IH1cblxuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gbmV3IEluamVjdG9yXyh0aGlzLl92aWV3LCB0aGlzLl9lbERlZik7IH1cblxuICBnZXQgcGFyZW50SW5qZWN0b3IoKTogSW5qZWN0b3Ige1xuICAgIGxldCB2aWV3ID0gdGhpcy5fdmlldztcbiAgICBsZXQgZWxEZWYgPSB0aGlzLl9lbERlZi5wYXJlbnQ7XG4gICAgd2hpbGUgKCFlbERlZiAmJiB2aWV3KSB7XG4gICAgICBlbERlZiA9IHZpZXdQYXJlbnRFbCh2aWV3KTtcbiAgICAgIHZpZXcgPSB2aWV3LnBhcmVudCAhO1xuICAgIH1cblxuICAgIHJldHVybiB2aWV3ID8gbmV3IEluamVjdG9yXyh2aWV3LCBlbERlZikgOiBuZXcgSW5qZWN0b3JfKHRoaXMuX3ZpZXcsIG51bGwpO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgY29uc3QgbGVuID0gdGhpcy5fZW1iZWRkZWRWaWV3cy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IGxlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCB2aWV3ID0gZGV0YWNoRW1iZWRkZWRWaWV3KHRoaXMuX2RhdGEsIGkpICE7XG4gICAgICBTZXJ2aWNlcy5kZXN0cm95Vmlldyh2aWV3KTtcbiAgICB9XG4gIH1cblxuICBnZXQoaW5kZXg6IG51bWJlcik6IFZpZXdSZWZ8bnVsbCB7XG4gICAgY29uc3QgdmlldyA9IHRoaXMuX2VtYmVkZGVkVmlld3NbaW5kZXhdO1xuICAgIGlmICh2aWV3KSB7XG4gICAgICBjb25zdCByZWYgPSBuZXcgVmlld1JlZl8odmlldyk7XG4gICAgICByZWYuYXR0YWNoVG9WaWV3Q29udGFpbmVyUmVmKHRoaXMpO1xuICAgICAgcmV0dXJuIHJlZjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9lbWJlZGRlZFZpZXdzLmxlbmd0aDsgfVxuXG4gIGNyZWF0ZUVtYmVkZGVkVmlldzxDPih0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8Qz4sIGNvbnRleHQ/OiBDLCBpbmRleD86IG51bWJlcik6XG4gICAgICBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgIGNvbnN0IHZpZXdSZWYgPSB0ZW1wbGF0ZVJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoY29udGV4dCB8fCA8YW55Pnt9KTtcbiAgICB0aGlzLmluc2VydCh2aWV3UmVmLCBpbmRleCk7XG4gICAgcmV0dXJuIHZpZXdSZWY7XG4gIH1cblxuICBjcmVhdGVDb21wb25lbnQ8Qz4oXG4gICAgICBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PEM+LCBpbmRleD86IG51bWJlciwgaW5qZWN0b3I/OiBJbmplY3RvcixcbiAgICAgIHByb2plY3RhYmxlTm9kZXM/OiBhbnlbXVtdLCBuZ01vZHVsZVJlZj86IE5nTW9kdWxlUmVmPGFueT4pOiBDb21wb25lbnRSZWY8Qz4ge1xuICAgIGNvbnN0IGNvbnRleHRJbmplY3RvciA9IGluamVjdG9yIHx8IHRoaXMucGFyZW50SW5qZWN0b3I7XG4gICAgaWYgKCFuZ01vZHVsZVJlZiAmJiAhKGNvbXBvbmVudEZhY3RvcnkgaW5zdGFuY2VvZiBDb21wb25lbnRGYWN0b3J5Qm91bmRUb01vZHVsZSkpIHtcbiAgICAgIG5nTW9kdWxlUmVmID0gY29udGV4dEluamVjdG9yLmdldChOZ01vZHVsZVJlZik7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9XG4gICAgICAgIGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKGNvbnRleHRJbmplY3RvciwgcHJvamVjdGFibGVOb2RlcywgdW5kZWZpbmVkLCBuZ01vZHVsZVJlZik7XG4gICAgdGhpcy5pbnNlcnQoY29tcG9uZW50UmVmLmhvc3RWaWV3LCBpbmRleCk7XG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcbiAgfVxuXG4gIGluc2VydCh2aWV3UmVmOiBWaWV3UmVmLCBpbmRleD86IG51bWJlcik6IFZpZXdSZWYge1xuICAgIGlmICh2aWV3UmVmLmRlc3Ryb3llZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW5zZXJ0IGEgZGVzdHJveWVkIFZpZXcgaW4gYSBWaWV3Q29udGFpbmVyIScpO1xuICAgIH1cbiAgICBjb25zdCB2aWV3UmVmXyA9IDxWaWV3UmVmXz52aWV3UmVmO1xuICAgIGNvbnN0IHZpZXdEYXRhID0gdmlld1JlZl8uX3ZpZXc7XG4gICAgYXR0YWNoRW1iZWRkZWRWaWV3KHRoaXMuX3ZpZXcsIHRoaXMuX2RhdGEsIGluZGV4LCB2aWV3RGF0YSk7XG4gICAgdmlld1JlZl8uYXR0YWNoVG9WaWV3Q29udGFpbmVyUmVmKHRoaXMpO1xuICAgIHJldHVybiB2aWV3UmVmO1xuICB9XG5cbiAgbW92ZSh2aWV3UmVmOiBWaWV3UmVmXywgY3VycmVudEluZGV4OiBudW1iZXIpOiBWaWV3UmVmIHtcbiAgICBpZiAodmlld1JlZi5kZXN0cm95ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IG1vdmUgYSBkZXN0cm95ZWQgVmlldyBpbiBhIFZpZXdDb250YWluZXIhJyk7XG4gICAgfVxuICAgIGNvbnN0IHByZXZpb3VzSW5kZXggPSB0aGlzLl9lbWJlZGRlZFZpZXdzLmluZGV4T2Yodmlld1JlZi5fdmlldyk7XG4gICAgbW92ZUVtYmVkZGVkVmlldyh0aGlzLl9kYXRhLCBwcmV2aW91c0luZGV4LCBjdXJyZW50SW5kZXgpO1xuICAgIHJldHVybiB2aWV3UmVmO1xuICB9XG5cbiAgaW5kZXhPZih2aWV3UmVmOiBWaWV3UmVmKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZW1iZWRkZWRWaWV3cy5pbmRleE9mKCg8Vmlld1JlZl8+dmlld1JlZikuX3ZpZXcpO1xuICB9XG5cbiAgcmVtb3ZlKGluZGV4PzogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgdmlld0RhdGEgPSBkZXRhY2hFbWJlZGRlZFZpZXcodGhpcy5fZGF0YSwgaW5kZXgpO1xuICAgIGlmICh2aWV3RGF0YSkge1xuICAgICAgU2VydmljZXMuZGVzdHJveVZpZXcodmlld0RhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGRldGFjaChpbmRleD86IG51bWJlcik6IFZpZXdSZWZ8bnVsbCB7XG4gICAgY29uc3QgdmlldyA9IGRldGFjaEVtYmVkZGVkVmlldyh0aGlzLl9kYXRhLCBpbmRleCk7XG4gICAgcmV0dXJuIHZpZXcgPyBuZXcgVmlld1JlZl8odmlldykgOiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaGFuZ2VEZXRlY3RvclJlZih2aWV3OiBWaWV3RGF0YSk6IENoYW5nZURldGVjdG9yUmVmIHtcbiAgcmV0dXJuIG5ldyBWaWV3UmVmXyh2aWV3KTtcbn1cblxuZXhwb3J0IGNsYXNzIFZpZXdSZWZfIGltcGxlbWVudHMgRW1iZWRkZWRWaWV3UmVmPGFueT4sIEludGVybmFsVmlld1JlZiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ZpZXc6IFZpZXdEYXRhO1xuICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmfG51bGw7XG4gIHByaXZhdGUgX2FwcFJlZjogQXBwbGljYXRpb25SZWZ8bnVsbDtcblxuICBjb25zdHJ1Y3RvcihfdmlldzogVmlld0RhdGEpIHtcbiAgICB0aGlzLl92aWV3ID0gX3ZpZXc7XG4gICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZiA9IG51bGw7XG4gICAgdGhpcy5fYXBwUmVmID0gbnVsbDtcbiAgfVxuXG4gIGdldCByb290Tm9kZXMoKTogYW55W10geyByZXR1cm4gcm9vdFJlbmRlck5vZGVzKHRoaXMuX3ZpZXcpOyB9XG5cbiAgZ2V0IGNvbnRleHQoKSB7IHJldHVybiB0aGlzLl92aWV3LmNvbnRleHQ7IH1cblxuICBnZXQgZGVzdHJveWVkKCk6IGJvb2xlYW4geyByZXR1cm4gKHRoaXMuX3ZpZXcuc3RhdGUgJiBWaWV3U3RhdGUuRGVzdHJveWVkKSAhPT0gMDsgfVxuXG4gIG1hcmtGb3JDaGVjaygpOiB2b2lkIHsgbWFya1BhcmVudFZpZXdzRm9yQ2hlY2sodGhpcy5fdmlldyk7IH1cbiAgZGV0YWNoKCk6IHZvaWQgeyB0aGlzLl92aWV3LnN0YXRlICY9IH5WaWV3U3RhdGUuQXR0YWNoZWQ7IH1cbiAgZGV0ZWN0Q2hhbmdlcygpOiB2b2lkIHtcbiAgICBjb25zdCBmcyA9IHRoaXMuX3ZpZXcucm9vdC5yZW5kZXJlckZhY3Rvcnk7XG4gICAgaWYgKGZzLmJlZ2luKSB7XG4gICAgICBmcy5iZWdpbigpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgU2VydmljZXMuY2hlY2tBbmRVcGRhdGVWaWV3KHRoaXMuX3ZpZXcpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoZnMuZW5kKSB7XG4gICAgICAgIGZzLmVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGVja05vQ2hhbmdlcygpOiB2b2lkIHsgU2VydmljZXMuY2hlY2tOb0NoYW5nZXNWaWV3KHRoaXMuX3ZpZXcpOyB9XG5cbiAgcmVhdHRhY2goKTogdm9pZCB7IHRoaXMuX3ZpZXcuc3RhdGUgfD0gVmlld1N0YXRlLkF0dGFjaGVkOyB9XG4gIG9uRGVzdHJveShjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBpZiAoIXRoaXMuX3ZpZXcuZGlzcG9zYWJsZXMpIHtcbiAgICAgIHRoaXMuX3ZpZXcuZGlzcG9zYWJsZXMgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5fdmlldy5kaXNwb3NhYmxlcy5wdXNoKDxhbnk+Y2FsbGJhY2spO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fYXBwUmVmKSB7XG4gICAgICB0aGlzLl9hcHBSZWYuZGV0YWNoVmlldyh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYuZGV0YWNoKHRoaXMuX3ZpZXdDb250YWluZXJSZWYuaW5kZXhPZih0aGlzKSk7XG4gICAgfVxuICAgIFNlcnZpY2VzLmRlc3Ryb3lWaWV3KHRoaXMuX3ZpZXcpO1xuICB9XG5cbiAgZGV0YWNoRnJvbUFwcFJlZigpIHtcbiAgICB0aGlzLl9hcHBSZWYgPSBudWxsO1xuICAgIHJlbmRlckRldGFjaFZpZXcodGhpcy5fdmlldyk7XG4gICAgU2VydmljZXMuZGlydHlQYXJlbnRRdWVyaWVzKHRoaXMuX3ZpZXcpO1xuICB9XG5cbiAgYXR0YWNoVG9BcHBSZWYoYXBwUmVmOiBBcHBsaWNhdGlvblJlZikge1xuICAgIGlmICh0aGlzLl92aWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgdmlldyBpcyBhbHJlYWR5IGF0dGFjaGVkIHRvIGEgVmlld0NvbnRhaW5lciEnKTtcbiAgICB9XG4gICAgdGhpcy5fYXBwUmVmID0gYXBwUmVmO1xuICB9XG5cbiAgYXR0YWNoVG9WaWV3Q29udGFpbmVyUmVmKHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgaWYgKHRoaXMuX2FwcFJlZikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHZpZXcgaXMgYWxyZWFkeSBhdHRhY2hlZCBkaXJlY3RseSB0byB0aGUgQXBwbGljYXRpb25SZWYhJyk7XG4gICAgfVxuICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYgPSB2Y1JlZjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGVEYXRhKHZpZXc6IFZpZXdEYXRhLCBkZWY6IE5vZGVEZWYpOiBUZW1wbGF0ZURhdGEge1xuICByZXR1cm4gbmV3IFRlbXBsYXRlUmVmXyh2aWV3LCBkZWYpO1xufVxuXG5jbGFzcyBUZW1wbGF0ZVJlZl8gZXh0ZW5kcyBUZW1wbGF0ZVJlZjxhbnk+IGltcGxlbWVudHMgVGVtcGxhdGVEYXRhIHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIF9wcm9qZWN0ZWRWaWV3cyAhOiBWaWV3RGF0YVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhcmVudFZpZXc6IFZpZXdEYXRhLCBwcml2YXRlIF9kZWY6IE5vZGVEZWYpIHsgc3VwZXIoKTsgfVxuXG4gIGNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZXh0OiBhbnkpOiBFbWJlZGRlZFZpZXdSZWY8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBWaWV3UmVmXyhTZXJ2aWNlcy5jcmVhdGVFbWJlZGRlZFZpZXcoXG4gICAgICAgIHRoaXMuX3BhcmVudFZpZXcsIHRoaXMuX2RlZiwgdGhpcy5fZGVmLmVsZW1lbnQgIS50ZW1wbGF0ZSAhLCBjb250ZXh0KSk7XG4gIH1cblxuICBnZXQgZWxlbWVudFJlZigpOiBFbGVtZW50UmVmIHtcbiAgICByZXR1cm4gbmV3IEVsZW1lbnRSZWYoYXNFbGVtZW50RGF0YSh0aGlzLl9wYXJlbnRWaWV3LCB0aGlzLl9kZWYubm9kZUluZGV4KS5yZW5kZXJFbGVtZW50KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5qZWN0b3IodmlldzogVmlld0RhdGEsIGVsRGVmOiBOb2RlRGVmKTogSW5qZWN0b3Ige1xuICByZXR1cm4gbmV3IEluamVjdG9yXyh2aWV3LCBlbERlZik7XG59XG5cbmNsYXNzIEluamVjdG9yXyBpbXBsZW1lbnRzIEluamVjdG9yIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3OiBWaWV3RGF0YSwgcHJpdmF0ZSBlbERlZjogTm9kZURlZnxudWxsKSB7fVxuICBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZTogYW55ID0gSW5qZWN0b3IuVEhST1dfSUZfTk9UX0ZPVU5EKTogYW55IHtcbiAgICBjb25zdCBhbGxvd1ByaXZhdGVTZXJ2aWNlcyA9XG4gICAgICAgIHRoaXMuZWxEZWYgPyAodGhpcy5lbERlZi5mbGFncyAmIE5vZGVGbGFncy5Db21wb25lbnRWaWV3KSAhPT0gMCA6IGZhbHNlO1xuICAgIHJldHVybiBTZXJ2aWNlcy5yZXNvbHZlRGVwKFxuICAgICAgICB0aGlzLnZpZXcsIHRoaXMuZWxEZWYsIGFsbG93UHJpdmF0ZVNlcnZpY2VzLFxuICAgICAgICB7ZmxhZ3M6IERlcEZsYWdzLk5vbmUsIHRva2VuLCB0b2tlbktleTogdG9rZW5LZXkodG9rZW4pfSwgbm90Rm91bmRWYWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGVWYWx1ZSh2aWV3OiBWaWV3RGF0YSwgaW5kZXg6IG51bWJlcik6IGFueSB7XG4gIGNvbnN0IGRlZiA9IHZpZXcuZGVmLm5vZGVzW2luZGV4XTtcbiAgaWYgKGRlZi5mbGFncyAmIE5vZGVGbGFncy5UeXBlRWxlbWVudCkge1xuICAgIGNvbnN0IGVsRGF0YSA9IGFzRWxlbWVudERhdGEodmlldywgZGVmLm5vZGVJbmRleCk7XG4gICAgcmV0dXJuIGRlZi5lbGVtZW50ICEudGVtcGxhdGUgPyBlbERhdGEudGVtcGxhdGUgOiBlbERhdGEucmVuZGVyRWxlbWVudDtcbiAgfSBlbHNlIGlmIChkZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuVHlwZVRleHQpIHtcbiAgICByZXR1cm4gYXNUZXh0RGF0YSh2aWV3LCBkZWYubm9kZUluZGV4KS5yZW5kZXJUZXh0O1xuICB9IGVsc2UgaWYgKGRlZi5mbGFncyAmIChOb2RlRmxhZ3MuQ2F0UHJvdmlkZXIgfCBOb2RlRmxhZ3MuVHlwZVBpcGUpKSB7XG4gICAgcmV0dXJuIGFzUHJvdmlkZXJEYXRhKHZpZXcsIGRlZi5ub2RlSW5kZXgpLmluc3RhbmNlO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgSWxsZWdhbCBzdGF0ZTogcmVhZCBub2RlVmFsdWUgZm9yIG5vZGUgaW5kZXggJHtpbmRleH1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlbmRlcmVyVjEodmlldzogVmlld0RhdGEpOiBSZW5kZXJlclYxIHtcbiAgcmV0dXJuIG5ldyBSZW5kZXJlckFkYXB0ZXIodmlldy5yZW5kZXJlcik7XG59XG5cbmNsYXNzIFJlbmRlcmVyQWRhcHRlciBpbXBsZW1lbnRzIFJlbmRlcmVyVjEge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlbGVnYXRlOiBSZW5kZXJlcjIpIHt9XG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8RWxlbWVudCk6IEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQocGFyZW50OiBFbGVtZW50fERvY3VtZW50RnJhZ21lbnQsIG5hbWVzcGFjZUFuZE5hbWU6IHN0cmluZyk6IEVsZW1lbnQge1xuICAgIGNvbnN0IFtucywgbmFtZV0gPSBzcGxpdE5hbWVzcGFjZShuYW1lc3BhY2VBbmROYW1lKTtcbiAgICBjb25zdCBlbCA9IHRoaXMuZGVsZWdhdGUuY3JlYXRlRWxlbWVudChuYW1lLCBucyk7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRDaGlsZChwYXJlbnQsIGVsKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgY3JlYXRlVmlld1Jvb3QoaG9zdEVsZW1lbnQ6IEVsZW1lbnQpOiBFbGVtZW50fERvY3VtZW50RnJhZ21lbnQgeyByZXR1cm4gaG9zdEVsZW1lbnQ7IH1cblxuICBjcmVhdGVUZW1wbGF0ZUFuY2hvcihwYXJlbnRFbGVtZW50OiBFbGVtZW50fERvY3VtZW50RnJhZ21lbnQpOiBDb21tZW50IHtcbiAgICBjb25zdCBjb21tZW50ID0gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVDb21tZW50KCcnKTtcbiAgICBpZiAocGFyZW50RWxlbWVudCkge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRDaGlsZChwYXJlbnRFbGVtZW50LCBjb21tZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbW1lbnQ7XG4gIH1cblxuICBjcmVhdGVUZXh0KHBhcmVudEVsZW1lbnQ6IEVsZW1lbnR8RG9jdW1lbnRGcmFnbWVudCwgdmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuZGVsZWdhdGUuY3JlYXRlVGV4dCh2YWx1ZSk7XG4gICAgaWYgKHBhcmVudEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kQ2hpbGQocGFyZW50RWxlbWVudCwgbm9kZSk7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgcHJvamVjdE5vZGVzKHBhcmVudEVsZW1lbnQ6IEVsZW1lbnR8RG9jdW1lbnRGcmFnbWVudCwgbm9kZXM6IE5vZGVbXSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kQ2hpbGQocGFyZW50RWxlbWVudCwgbm9kZXNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFZpZXdBZnRlcihub2RlOiBOb2RlLCB2aWV3Um9vdE5vZGVzOiBOb2RlW10pIHtcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gdGhpcy5kZWxlZ2F0ZS5wYXJlbnROb2RlKG5vZGUpO1xuICAgIGNvbnN0IG5leHRTaWJsaW5nID0gdGhpcy5kZWxlZ2F0ZS5uZXh0U2libGluZyhub2RlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZXdSb290Tm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuaW5zZXJ0QmVmb3JlKHBhcmVudEVsZW1lbnQsIHZpZXdSb290Tm9kZXNbaV0sIG5leHRTaWJsaW5nKTtcbiAgICB9XG4gIH1cblxuICBkZXRhY2hWaWV3KHZpZXdSb290Tm9kZXM6IChFbGVtZW50fFRleHR8Q29tbWVudClbXSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlld1Jvb3ROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgbm9kZSA9IHZpZXdSb290Tm9kZXNbaV07XG4gICAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gdGhpcy5kZWxlZ2F0ZS5wYXJlbnROb2RlKG5vZGUpO1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDaGlsZChwYXJlbnRFbGVtZW50LCBub2RlKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95Vmlldyhob3N0RWxlbWVudDogRWxlbWVudHxEb2N1bWVudEZyYWdtZW50LCB2aWV3QWxsTm9kZXM6IE5vZGVbXSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlld0FsbE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLmRlc3Ryb3lOb2RlICEodmlld0FsbE5vZGVzW2ldKTtcbiAgICB9XG4gIH1cblxuICBsaXN0ZW4ocmVuZGVyRWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5saXN0ZW4ocmVuZGVyRWxlbWVudCwgbmFtZSwgPGFueT5jYWxsYmFjayk7XG4gIH1cblxuICBsaXN0ZW5HbG9iYWwodGFyZ2V0OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmxpc3Rlbih0YXJnZXQsIG5hbWUsIDxhbnk+Y2FsbGJhY2spO1xuICB9XG5cbiAgc2V0RWxlbWVudFByb3BlcnR5KFxuICAgICAgcmVuZGVyRWxlbWVudDogRWxlbWVudHxEb2N1bWVudEZyYWdtZW50LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRQcm9wZXJ0eShyZW5kZXJFbGVtZW50LCBwcm9wZXJ0eU5hbWUsIHByb3BlcnR5VmFsdWUpO1xuICB9XG5cbiAgc2V0RWxlbWVudEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50OiBFbGVtZW50LCBuYW1lc3BhY2VBbmROYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZVZhbHVlOiBzdHJpbmcpOlxuICAgICAgdm9pZCB7XG4gICAgY29uc3QgW25zLCBuYW1lXSA9IHNwbGl0TmFtZXNwYWNlKG5hbWVzcGFjZUFuZE5hbWUpO1xuICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnNldEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50LCBuYW1lLCBhdHRyaWJ1dGVWYWx1ZSwgbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZUF0dHJpYnV0ZShyZW5kZXJFbGVtZW50LCBuYW1lLCBucyk7XG4gICAgfVxuICB9XG5cbiAgc2V0QmluZGluZ0RlYnVnSW5mbyhyZW5kZXJFbGVtZW50OiBFbGVtZW50LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogc3RyaW5nKTogdm9pZCB7fVxuXG4gIHNldEVsZW1lbnRDbGFzcyhyZW5kZXJFbGVtZW50OiBFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNBZGQpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuYWRkQ2xhc3MocmVuZGVyRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDbGFzcyhyZW5kZXJFbGVtZW50LCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldEVsZW1lbnRTdHlsZShyZW5kZXJFbGVtZW50OiBIVE1MRWxlbWVudCwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChzdHlsZVZhbHVlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuc2V0U3R5bGUocmVuZGVyRWxlbWVudCwgc3R5bGVOYW1lLCBzdHlsZVZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVTdHlsZShyZW5kZXJFbGVtZW50LCBzdHlsZU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyRWxlbWVudDogRWxlbWVudCwgbWV0aG9kTmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgIChyZW5kZXJFbGVtZW50IGFzIGFueSlbbWV0aG9kTmFtZV0uYXBwbHkocmVuZGVyRWxlbWVudCwgYXJncyk7XG4gIH1cblxuICBzZXRUZXh0KHJlbmRlck5vZGU6IFRleHQsIHRleHQ6IHN0cmluZyk6IHZvaWQgeyB0aGlzLmRlbGVnYXRlLnNldFZhbHVlKHJlbmRlck5vZGUsIHRleHQpOyB9XG5cbiAgYW5pbWF0ZSgpOiBhbnkgeyB0aHJvdyBuZXcgRXJyb3IoJ1JlbmRlcmVyLmFuaW1hdGUgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCEnKTsgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOZ01vZHVsZVJlZihcbiAgICBtb2R1bGVUeXBlOiBUeXBlPGFueT4sIHBhcmVudDogSW5qZWN0b3IsIGJvb3RzdHJhcENvbXBvbmVudHM6IFR5cGU8YW55PltdLFxuICAgIGRlZjogTmdNb2R1bGVEZWZpbml0aW9uKTogTmdNb2R1bGVSZWY8YW55PiB7XG4gIHJldHVybiBuZXcgTmdNb2R1bGVSZWZfKG1vZHVsZVR5cGUsIHBhcmVudCwgYm9vdHN0cmFwQ29tcG9uZW50cywgZGVmKTtcbn1cblxuY2xhc3MgTmdNb2R1bGVSZWZfIGltcGxlbWVudHMgTmdNb2R1bGVEYXRhLCBJbnRlcm5hbE5nTW9kdWxlUmVmPGFueT4ge1xuICBwcml2YXRlIF9kZXN0cm95TGlzdGVuZXJzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuICBwcml2YXRlIF9kZXN0cm95ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgX3Byb3ZpZGVycyAhOiBhbnlbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgX21vZHVsZXMgITogYW55W107XG5cbiAgcmVhZG9ubHkgaW5qZWN0b3I6IEluamVjdG9yID0gdGhpcztcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX21vZHVsZVR5cGU6IFR5cGU8YW55PiwgcHVibGljIF9wYXJlbnQ6IEluamVjdG9yLFxuICAgICAgcHVibGljIF9ib290c3RyYXBDb21wb25lbnRzOiBUeXBlPGFueT5bXSwgcHVibGljIF9kZWY6IE5nTW9kdWxlRGVmaW5pdGlvbikge1xuICAgIGluaXROZ01vZHVsZSh0aGlzKTtcbiAgfVxuXG4gIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlOiBhbnkgPSBJbmplY3Rvci5USFJPV19JRl9OT1RfRk9VTkQsXG4gICAgICBpbmplY3RGbGFnczogSW5qZWN0RmxhZ3MgPSBJbmplY3RGbGFncy5EZWZhdWx0KTogYW55IHtcbiAgICBsZXQgZmxhZ3MgPSBEZXBGbGFncy5Ob25lO1xuICAgIGlmIChpbmplY3RGbGFncyAmIEluamVjdEZsYWdzLlNraXBTZWxmKSB7XG4gICAgICBmbGFncyB8PSBEZXBGbGFncy5Ta2lwU2VsZjtcbiAgICB9IGVsc2UgaWYgKGluamVjdEZsYWdzICYgSW5qZWN0RmxhZ3MuU2VsZikge1xuICAgICAgZmxhZ3MgfD0gRGVwRmxhZ3MuU2VsZjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc29sdmVOZ01vZHVsZURlcChcbiAgICAgICAgdGhpcywge3Rva2VuOiB0b2tlbiwgdG9rZW5LZXk6IHRva2VuS2V5KHRva2VuKSwgZmxhZ3M6IGZsYWdzfSwgbm90Rm91bmRWYWx1ZSk7XG4gIH1cblxuICBnZXQgaW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLmdldCh0aGlzLl9tb2R1bGVUeXBlKTsgfVxuXG4gIGdldCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIoKSB7IHJldHVybiB0aGlzLmdldChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpOyB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFRoZSBuZyBtb2R1bGUgJHtzdHJpbmdpZnkodGhpcy5pbnN0YW5jZS5jb25zdHJ1Y3Rvcil9IGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkLmApO1xuICAgIH1cbiAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICAgIGNhbGxOZ01vZHVsZUxpZmVjeWNsZSh0aGlzLCBOb2RlRmxhZ3MuT25EZXN0cm95KTtcbiAgICB0aGlzLl9kZXN0cm95TGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcigpKTtcbiAgfVxuXG4gIG9uRGVzdHJveShjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLl9kZXN0cm95TGlzdGVuZXJzLnB1c2goY2FsbGJhY2spOyB9XG59XG4iXX0=