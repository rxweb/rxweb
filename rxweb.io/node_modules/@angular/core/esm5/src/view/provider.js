/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, SimpleChange, WrappedValue } from '../change_detection/change_detection';
import { INJECTOR, Injector, resolveForwardRef } from '../di';
import { ElementRef } from '../linker/element_ref';
import { TemplateRef } from '../linker/template_ref';
import { ViewContainerRef } from '../linker/view_container_ref';
import { Renderer as RendererV1, Renderer2 } from '../render/api';
import { stringify } from '../util';
import { createChangeDetectorRef, createInjector, createRendererV1 } from './refs';
import { Services, asElementData, asProviderData, shouldCallLifecycleInitHook } from './types';
import { calcBindingFlags, checkBinding, dispatchEvent, isComponentView, splitDepsDsl, splitMatchedQueriesDsl, tokenKey, viewParentEl } from './util';
var RendererV1TokenKey = tokenKey(RendererV1);
var Renderer2TokenKey = tokenKey(Renderer2);
var ElementRefTokenKey = tokenKey(ElementRef);
var ViewContainerRefTokenKey = tokenKey(ViewContainerRef);
var TemplateRefTokenKey = tokenKey(TemplateRef);
var ChangeDetectorRefTokenKey = tokenKey(ChangeDetectorRef);
var InjectorRefTokenKey = tokenKey(Injector);
var INJECTORRefTokenKey = tokenKey(INJECTOR);
export function directiveDef(checkIndex, flags, matchedQueries, childCount, ctor, deps, props, outputs) {
    var bindings = [];
    if (props) {
        for (var prop in props) {
            var _a = tslib_1.__read(props[prop], 2), bindingIndex = _a[0], nonMinifiedName = _a[1];
            bindings[bindingIndex] = {
                flags: 8 /* TypeProperty */,
                name: prop, nonMinifiedName: nonMinifiedName,
                ns: null,
                securityContext: null,
                suffix: null
            };
        }
    }
    var outputDefs = [];
    if (outputs) {
        for (var propName in outputs) {
            outputDefs.push({ type: 1 /* DirectiveOutput */, propName: propName, target: null, eventName: outputs[propName] });
        }
    }
    flags |= 16384 /* TypeDirective */;
    return _def(checkIndex, flags, matchedQueries, childCount, ctor, ctor, deps, bindings, outputDefs);
}
export function pipeDef(flags, ctor, deps) {
    flags |= 16 /* TypePipe */;
    return _def(-1, flags, null, 0, ctor, ctor, deps);
}
export function providerDef(flags, matchedQueries, token, value, deps) {
    return _def(-1, flags, matchedQueries, 0, token, value, deps);
}
export function _def(checkIndex, flags, matchedQueriesDsl, childCount, token, value, deps, bindings, outputs) {
    var _a = splitMatchedQueriesDsl(matchedQueriesDsl), matchedQueries = _a.matchedQueries, references = _a.references, matchedQueryIds = _a.matchedQueryIds;
    if (!outputs) {
        outputs = [];
    }
    if (!bindings) {
        bindings = [];
    }
    // Need to resolve forwardRefs as e.g. for `useValue` we
    // lowered the expression and then stopped evaluating it,
    // i.e. also didn't unwrap it.
    value = resolveForwardRef(value);
    var depDefs = splitDepsDsl(deps, stringify(token));
    return {
        // will bet set by the view definition
        nodeIndex: -1,
        parent: null,
        renderParent: null,
        bindingIndex: -1,
        outputIndex: -1,
        // regular values
        checkIndex: checkIndex,
        flags: flags,
        childFlags: 0,
        directChildFlags: 0,
        childMatchedQueries: 0, matchedQueries: matchedQueries, matchedQueryIds: matchedQueryIds, references: references,
        ngContentIndex: -1, childCount: childCount, bindings: bindings,
        bindingFlags: calcBindingFlags(bindings), outputs: outputs,
        element: null,
        provider: { token: token, value: value, deps: depDefs },
        text: null,
        query: null,
        ngContent: null
    };
}
export function createProviderInstance(view, def) {
    return _createProviderInstance(view, def);
}
export function createPipeInstance(view, def) {
    // deps are looked up from component.
    var compView = view;
    while (compView.parent && !isComponentView(compView)) {
        compView = compView.parent;
    }
    // pipes can see the private services of the component
    var allowPrivateServices = true;
    // pipes are always eager and classes!
    return createClass(compView.parent, viewParentEl(compView), allowPrivateServices, def.provider.value, def.provider.deps);
}
export function createDirectiveInstance(view, def) {
    // components can see other private services, other directives can't.
    var allowPrivateServices = (def.flags & 32768 /* Component */) > 0;
    // directives are always eager and classes!
    var instance = createClass(view, def.parent, allowPrivateServices, def.provider.value, def.provider.deps);
    if (def.outputs.length) {
        for (var i = 0; i < def.outputs.length; i++) {
            var output = def.outputs[i];
            var subscription = instance[output.propName].subscribe(eventHandlerClosure(view, def.parent.nodeIndex, output.eventName));
            view.disposables[def.outputIndex + i] = subscription.unsubscribe.bind(subscription);
        }
    }
    return instance;
}
function eventHandlerClosure(view, index, eventName) {
    return function (event) { return dispatchEvent(view, index, eventName, event); };
}
export function checkAndUpdateDirectiveInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    var providerData = asProviderData(view, def.nodeIndex);
    var directive = providerData.instance;
    var changed = false;
    var changes = undefined;
    var bindLen = def.bindings.length;
    if (bindLen > 0 && checkBinding(view, def, 0, v0)) {
        changed = true;
        changes = updateProp(view, providerData, def, 0, v0, changes);
    }
    if (bindLen > 1 && checkBinding(view, def, 1, v1)) {
        changed = true;
        changes = updateProp(view, providerData, def, 1, v1, changes);
    }
    if (bindLen > 2 && checkBinding(view, def, 2, v2)) {
        changed = true;
        changes = updateProp(view, providerData, def, 2, v2, changes);
    }
    if (bindLen > 3 && checkBinding(view, def, 3, v3)) {
        changed = true;
        changes = updateProp(view, providerData, def, 3, v3, changes);
    }
    if (bindLen > 4 && checkBinding(view, def, 4, v4)) {
        changed = true;
        changes = updateProp(view, providerData, def, 4, v4, changes);
    }
    if (bindLen > 5 && checkBinding(view, def, 5, v5)) {
        changed = true;
        changes = updateProp(view, providerData, def, 5, v5, changes);
    }
    if (bindLen > 6 && checkBinding(view, def, 6, v6)) {
        changed = true;
        changes = updateProp(view, providerData, def, 6, v6, changes);
    }
    if (bindLen > 7 && checkBinding(view, def, 7, v7)) {
        changed = true;
        changes = updateProp(view, providerData, def, 7, v7, changes);
    }
    if (bindLen > 8 && checkBinding(view, def, 8, v8)) {
        changed = true;
        changes = updateProp(view, providerData, def, 8, v8, changes);
    }
    if (bindLen > 9 && checkBinding(view, def, 9, v9)) {
        changed = true;
        changes = updateProp(view, providerData, def, 9, v9, changes);
    }
    if (changes) {
        directive.ngOnChanges(changes);
    }
    if ((def.flags & 65536 /* OnInit */) &&
        shouldCallLifecycleInitHook(view, 256 /* InitState_CallingOnInit */, def.nodeIndex)) {
        directive.ngOnInit();
    }
    if (def.flags & 262144 /* DoCheck */) {
        directive.ngDoCheck();
    }
    return changed;
}
export function checkAndUpdateDirectiveDynamic(view, def, values) {
    var providerData = asProviderData(view, def.nodeIndex);
    var directive = providerData.instance;
    var changed = false;
    var changes = undefined;
    for (var i = 0; i < values.length; i++) {
        if (checkBinding(view, def, i, values[i])) {
            changed = true;
            changes = updateProp(view, providerData, def, i, values[i], changes);
        }
    }
    if (changes) {
        directive.ngOnChanges(changes);
    }
    if ((def.flags & 65536 /* OnInit */) &&
        shouldCallLifecycleInitHook(view, 256 /* InitState_CallingOnInit */, def.nodeIndex)) {
        directive.ngOnInit();
    }
    if (def.flags & 262144 /* DoCheck */) {
        directive.ngDoCheck();
    }
    return changed;
}
function _createProviderInstance(view, def) {
    // private services can see other private services
    var allowPrivateServices = (def.flags & 8192 /* PrivateProvider */) > 0;
    var providerDef = def.provider;
    switch (def.flags & 201347067 /* Types */) {
        case 512 /* TypeClassProvider */:
            return createClass(view, def.parent, allowPrivateServices, providerDef.value, providerDef.deps);
        case 1024 /* TypeFactoryProvider */:
            return callFactory(view, def.parent, allowPrivateServices, providerDef.value, providerDef.deps);
        case 2048 /* TypeUseExistingProvider */:
            return resolveDep(view, def.parent, allowPrivateServices, providerDef.deps[0]);
        case 256 /* TypeValueProvider */:
            return providerDef.value;
    }
}
function createClass(view, elDef, allowPrivateServices, ctor, deps) {
    var len = deps.length;
    switch (len) {
        case 0:
            return new ctor();
        case 1:
            return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]));
        case 2:
            return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));
        case 3:
            return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));
        default:
            var depValues = new Array(len);
            for (var i = 0; i < len; i++) {
                depValues[i] = resolveDep(view, elDef, allowPrivateServices, deps[i]);
            }
            return new (ctor.bind.apply(ctor, tslib_1.__spread([void 0], depValues)))();
    }
}
function callFactory(view, elDef, allowPrivateServices, factory, deps) {
    var len = deps.length;
    switch (len) {
        case 0:
            return factory();
        case 1:
            return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]));
        case 2:
            return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));
        case 3:
            return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));
        default:
            var depValues = Array(len);
            for (var i = 0; i < len; i++) {
                depValues[i] = resolveDep(view, elDef, allowPrivateServices, deps[i]);
            }
            return factory.apply(void 0, tslib_1.__spread(depValues));
    }
}
// This default value is when checking the hierarchy for a token.
//
// It means both:
// - the token is not provided by the current injector,
// - only the element injectors should be checked (ie do not check module injectors
//
//          mod1
//         /
//       el1   mod2
//         \  /
//         el2
//
// When requesting el2.injector.get(token), we should check in the following order and return the
// first found value:
// - el2.injector.get(token, default)
// - el1.injector.get(token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) -> do not check the module
// - mod2.injector.get(token, default)
export var NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {};
export function resolveDep(view, elDef, allowPrivateServices, depDef, notFoundValue) {
    if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
    if (depDef.flags & 8 /* Value */) {
        return depDef.token;
    }
    var startView = view;
    if (depDef.flags & 2 /* Optional */) {
        notFoundValue = null;
    }
    var tokenKey = depDef.tokenKey;
    if (tokenKey === ChangeDetectorRefTokenKey) {
        // directives on the same element as a component should be able to control the change detector
        // of that component as well.
        allowPrivateServices = !!(elDef && elDef.element.componentView);
    }
    if (elDef && (depDef.flags & 1 /* SkipSelf */)) {
        allowPrivateServices = false;
        elDef = elDef.parent;
    }
    var searchView = view;
    while (searchView) {
        if (elDef) {
            switch (tokenKey) {
                case RendererV1TokenKey: {
                    var compView = findCompView(searchView, elDef, allowPrivateServices);
                    return createRendererV1(compView);
                }
                case Renderer2TokenKey: {
                    var compView = findCompView(searchView, elDef, allowPrivateServices);
                    return compView.renderer;
                }
                case ElementRefTokenKey:
                    return new ElementRef(asElementData(searchView, elDef.nodeIndex).renderElement);
                case ViewContainerRefTokenKey:
                    return asElementData(searchView, elDef.nodeIndex).viewContainer;
                case TemplateRefTokenKey: {
                    if (elDef.element.template) {
                        return asElementData(searchView, elDef.nodeIndex).template;
                    }
                    break;
                }
                case ChangeDetectorRefTokenKey: {
                    var cdView = findCompView(searchView, elDef, allowPrivateServices);
                    return createChangeDetectorRef(cdView);
                }
                case InjectorRefTokenKey:
                case INJECTORRefTokenKey:
                    return createInjector(searchView, elDef);
                default:
                    var providerDef_1 = (allowPrivateServices ? elDef.element.allProviders :
                        elDef.element.publicProviders)[tokenKey];
                    if (providerDef_1) {
                        var providerData = asProviderData(searchView, providerDef_1.nodeIndex);
                        if (!providerData) {
                            providerData = { instance: _createProviderInstance(searchView, providerDef_1) };
                            searchView.nodes[providerDef_1.nodeIndex] = providerData;
                        }
                        return providerData.instance;
                    }
            }
        }
        allowPrivateServices = isComponentView(searchView);
        elDef = viewParentEl(searchView);
        searchView = searchView.parent;
        if (depDef.flags & 4 /* Self */) {
            searchView = null;
        }
    }
    var value = startView.root.injector.get(depDef.token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR);
    if (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ||
        notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) {
        // Return the value from the root element injector when
        // - it provides it
        //   (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
        // - the module injector should not be checked
        //   (notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
        return value;
    }
    return startView.root.ngModule.injector.get(depDef.token, notFoundValue);
}
function findCompView(view, elDef, allowPrivateServices) {
    var compView;
    if (allowPrivateServices) {
        compView = asElementData(view, elDef.nodeIndex).componentView;
    }
    else {
        compView = view;
        while (compView.parent && !isComponentView(compView)) {
            compView = compView.parent;
        }
    }
    return compView;
}
function updateProp(view, providerData, def, bindingIdx, value, changes) {
    if (def.flags & 32768 /* Component */) {
        var compView = asElementData(view, def.parent.nodeIndex).componentView;
        if (compView.def.flags & 2 /* OnPush */) {
            compView.state |= 8 /* ChecksEnabled */;
        }
    }
    var binding = def.bindings[bindingIdx];
    var propName = binding.name;
    // Note: This is still safe with Closure Compiler as
    // the user passed in the property name as an object has to `providerDef`,
    // so Closure Compiler will have renamed the property correctly already.
    providerData.instance[propName] = value;
    if (def.flags & 524288 /* OnChanges */) {
        changes = changes || {};
        var oldValue = WrappedValue.unwrap(view.oldValues[def.bindingIndex + bindingIdx]);
        var binding_1 = def.bindings[bindingIdx];
        changes[binding_1.nonMinifiedName] =
            new SimpleChange(oldValue, value, (view.state & 2 /* FirstCheck */) !== 0);
    }
    view.oldValues[def.bindingIndex + bindingIdx] = value;
    return changes;
}
// This function calls the ngAfterContentCheck, ngAfterContentInit,
// ngAfterViewCheck, and ngAfterViewInit lifecycle hooks (depending on the node
// flags in lifecycle). Unlike ngDoCheck, ngOnChanges and ngOnInit, which are
// called during a pre-order traversal of the view tree (that is calling the
// parent hooks before the child hooks) these events are sent in using a
// post-order traversal of the tree (children before parents). This changes the
// meaning of initIndex in the view state. For ngOnInit, initIndex tracks the
// expected nodeIndex which a ngOnInit should be called. When sending
// ngAfterContentInit and ngAfterViewInit it is the expected count of
// ngAfterContentInit or ngAfterViewInit methods that have been called. This
// ensure that despite being called recursively or after picking up after an
// exception, the ngAfterContentInit or ngAfterViewInit will be called on the
// correct nodes. Consider for example, the following (where E is an element
// and D is a directive)
//  Tree:       pre-order index  post-order index
//    E1        0                6
//      E2      1                1
//       D3     2                0
//      E4      3                5
//       E5     4                4
//        E6    5                2
//        E7    6                3
// As can be seen, the post-order index has an unclear relationship to the
// pre-order index (postOrderIndex === preOrderIndex - parentCount +
// childCount). Since number of calls to ngAfterContentInit and ngAfterViewInit
// are stable (will be the same for the same view regardless of exceptions or
// recursion) we just need to count them which will roughly correspond to the
// post-order index (it skips elements and directives that do not have
// lifecycle hooks).
//
// For example, if an exception is raised in the E6.onAfterViewInit() the
// initIndex is left at 3 (by shouldCallLifecycleInitHook() which set it to
// initIndex + 1). When checkAndUpdateView() is called again D3, E2 and E6 will
// not have their ngAfterViewInit() called but, starting with E7, the rest of
// the view will begin getting ngAfterViewInit() called until a check and
// pass is complete.
//
// This algorthim also handles recursion. Consider if E4's ngAfterViewInit()
// indirectly calls E1's ChangeDetectorRef.detectChanges(). The expected
// initIndex is set to 6, the recusive checkAndUpdateView() starts walk again.
// D3, E2, E6, E7, E5 and E4 are skipped, ngAfterViewInit() is called on E1.
// When the recursion returns the initIndex will be 7 so E1 is skipped as it
// has already been called in the recursively called checkAnUpdateView().
export function callLifecycleHooksChildrenFirst(view, lifecycles) {
    if (!(view.def.nodeFlags & lifecycles)) {
        return;
    }
    var nodes = view.def.nodes;
    var initIndex = 0;
    for (var i = 0; i < nodes.length; i++) {
        var nodeDef = nodes[i];
        var parent_1 = nodeDef.parent;
        if (!parent_1 && nodeDef.flags & lifecycles) {
            // matching root node (e.g. a pipe)
            callProviderLifecycles(view, i, nodeDef.flags & lifecycles, initIndex++);
        }
        if ((nodeDef.childFlags & lifecycles) === 0) {
            // no child matches one of the lifecycles
            i += nodeDef.childCount;
        }
        while (parent_1 && (parent_1.flags & 1 /* TypeElement */) &&
            i === parent_1.nodeIndex + parent_1.childCount) {
            // last child of an element
            if (parent_1.directChildFlags & lifecycles) {
                initIndex = callElementProvidersLifecycles(view, parent_1, lifecycles, initIndex);
            }
            parent_1 = parent_1.parent;
        }
    }
}
function callElementProvidersLifecycles(view, elDef, lifecycles, initIndex) {
    for (var i = elDef.nodeIndex + 1; i <= elDef.nodeIndex + elDef.childCount; i++) {
        var nodeDef = view.def.nodes[i];
        if (nodeDef.flags & lifecycles) {
            callProviderLifecycles(view, i, nodeDef.flags & lifecycles, initIndex++);
        }
        // only visit direct children
        i += nodeDef.childCount;
    }
    return initIndex;
}
function callProviderLifecycles(view, index, lifecycles, initIndex) {
    var providerData = asProviderData(view, index);
    if (!providerData) {
        return;
    }
    var provider = providerData.instance;
    if (!provider) {
        return;
    }
    Services.setCurrentNode(view, index);
    if (lifecycles & 1048576 /* AfterContentInit */ &&
        shouldCallLifecycleInitHook(view, 512 /* InitState_CallingAfterContentInit */, initIndex)) {
        provider.ngAfterContentInit();
    }
    if (lifecycles & 2097152 /* AfterContentChecked */) {
        provider.ngAfterContentChecked();
    }
    if (lifecycles & 4194304 /* AfterViewInit */ &&
        shouldCallLifecycleInitHook(view, 768 /* InitState_CallingAfterViewInit */, initIndex)) {
        provider.ngAfterViewInit();
    }
    if (lifecycles & 8388608 /* AfterViewChecked */) {
        provider.ngAfterViewChecked();
    }
    if (lifecycles & 131072 /* OnDestroy */) {
        provider.ngOnDestroy();
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy92aWV3L3Byb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsWUFBWSxFQUFpQixZQUFZLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNsSCxPQUFPLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUM1RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBQyxRQUFRLElBQUksVUFBVSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRWxDLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDakYsT0FBTyxFQUFzSCxRQUFRLEVBQWtDLGFBQWEsRUFBRSxjQUFjLEVBQUUsMkJBQTJCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDbFAsT0FBTyxFQUFDLGdCQUFnQixFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXBKLElBQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzlDLElBQU0sa0JBQWtCLEdB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QyxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNqRCxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNqRCxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNqRCxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNqRCxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNqRCxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNqRCxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNqRCxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUNqRCxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsSUFBSSxPQUFPLEVBQUU7UUFDWCxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2hDO0lBQ0Qs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QUNELFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLElBQUksVUFBVSxpQ0FBNkI7UUFDdkMsMkJBQTJCLENBQUMsSUFBSSwrQ0FBK0MsU0FBUyxDQUFDLEVBQUU7UUFDN0YsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7S0FDL0I7SUFDRCxJQUFJLFVBQVUsb0NBQWdDLEVBQUU7UUFDOUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7S0FDbEM7SUFDRCxJQUFJLFVBQVUsOEJBQTBCO1FBQ3BDLDJCQUEyQixDQUFDLElBQUksNENBQTRDLFNBQVMsQ0FBQyxFQUFFO1FBQzFGLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztLQUM1QjtJQUNELElBQUksVUFBVSxpQ0FBNkIsRUFBRTtRQUMzQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztLQUMvQjtJQUNELElBQUksVUFBVSx5QkFBc0IsRUFBRTtRQUNwQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBTaW1wbGVDaGFuZ2UsIFNpbXBsZUNoYW5nZXMsIFdyYXBwZWRWYWx1ZX0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7SU5KRUNUT1IsIEluamVjdG9yLCByZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnLi4vZGknO1xuaW1wb3J0IHtFbGVtZW50UmVmfSBmcm9tICcuLi9saW5rZXIvZWxlbWVudF9yZWYnO1xuaW1wb3J0IHtUZW1wbGF0ZVJlZn0gZnJvbSAnLi4vbGlua2VyL3RlbXBsYXRlX3JlZic7XG5pbXBvcnQge1ZpZXdDb250YWluZXJSZWZ9IGZyb20gJy4uL2xpbmtlci92aWV3X2NvbnRhaW5lcl9yZWYnO1xuaW1wb3J0IHtSZW5kZXJlciBhcyBSZW5kZXJlclYxLCBSZW5kZXJlcjJ9IGZyb20gJy4uL3JlbmRlci9hcGknO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge2NyZWF0ZUNoYW5nZURldGVjdG9yUmVmLCBjcmVhdGVJbmplY3RvciwgY3JlYXRlUmVuZGVyZXJWMX0gZnJvbSAnLi9yZWZzJztcbmltcG9ydCB7QmluZGluZ0RlZiwgQmluZGluZ0ZsYWdzLCBEZXBEZWYsIERlcEZsYWdzLCBOb2RlRGVmLCBOb2RlRmxhZ3MsIE91dHB1dERlZiwgT3V0cHV0VHlwZSwgUHJvdmlkZXJEYXRhLCBRdWVyeVZhbHVlVHlwZSwgU2VydmljZXMsIFZpZXdEYXRhLCBWaWV3RmxhZ3MsIFZpZXdTdGF0ZSwgYXNFbGVtZW50RGF0YSwgYXNQcm92aWRlckRhdGEsIHNob3VsZENhbGxMaWZlY3ljbGVJbml0SG9va30gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge2NhbGNCaW5kaW5nRmxhZ3MsIGNoZWNrQmluZGluZywgZGlzcGF0Y2hFdmVudCwgaXNDb21wb25lbnRWaWV3LCBzcGxpdERlcHNEc2wsIHNwbGl0TWF0Y2hlZFF1ZXJpZXNEc2wsIHRva2VuS2V5LCB2aWV3UGFyZW50RWx9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IFJlbmRlcmVyVjFUb2tlbktleSA9IHRva2VuS2V5KFJlbmRlcmVyVjEpO1xuY29uc3QgUmVuZGVyZXIyVG9rZW5LZXkgPSB0b2tlbktleShSZW5kZXJlcjIpO1xuY29uc3QgRWxlbWVudFJlZlRva2VuS2V5ID0gdG9rZW5LZXkoRWxlbWVudFJlZik7XG5jb25zdCBWaWV3Q29udGFpbmVyUmVmVG9rZW5LZXkgPSB0b2tlbktleShWaWV3Q29udGFpbmVyUmVmKTtcbmNvbnN0IFRlbXBsYXRlUmVmVG9rZW5LZXkgPSB0b2tlbktleShUZW1wbGF0ZVJlZik7XG5jb25zdCBDaGFuZ2VEZXRlY3RvclJlZlRva2VuS2V5ID0gdG9rZW5LZXkoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuY29uc3QgSW5qZWN0b3JSZWZUb2tlbktleSA9IHRva2VuS2V5KEluamVjdG9yKTtcbmNvbnN0IElOSkVDVE9SUmVmVG9rZW5LZXkgPSB0b2tlbktleShJTkpFQ1RPUik7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXJlY3RpdmVEZWYoXG4gICAgY2hlY2tJbmRleDogbnVtYmVyLCBmbGFnczogTm9kZUZsYWdzLFxuICAgIG1hdGNoZWRRdWVyaWVzOiBudWxsIHwgW3N0cmluZyB8IG51bWJlciwgUXVlcnlWYWx1ZVR5cGVdW10sIGNoaWxkQ291bnQ6IG51bWJlciwgY3RvcjogYW55LFxuICAgIGRlcHM6IChbRGVwRmxhZ3MsIGFueV0gfCBhbnkpW10sIHByb3BzPzogbnVsbCB8IHtbbmFtZTogc3RyaW5nXTogW251bWJlciwgc3RyaW5nXX0sXG4gICAgb3V0cHV0cz86IG51bGwgfCB7W25hbWU6IHN0cmluZ106IHN0cmluZ30pOiBOb2RlRGVmIHtcbiAgY29uc3QgYmluZGluZ3M6IEJpbmRpbmdEZWZbXSA9IFtdO1xuICBpZiAocHJvcHMpIHtcbiAgICBmb3IgKGxldCBwcm9wIGluIHByb3BzKSB7XG4gICAgICBjb25zdCBbYmluZGluZ0luZGV4LCBub25NaW5pZmllZE5hbWVdID0gcHJvcHNbcHJvcF07XG4gICAgICBiaW5kaW5nc1tiaW5kaW5nSW5kZXhdID0ge1xuICAgICAgICBmbGFnczogQmluZGluZ0ZsYWdzLlR5cGVQcm9wZXJ0eSxcbiAgICAgICAgbmFtZTogcHJvcCwgbm9uTWluaWZpZWROYW1lLFxuICAgICAgICBuczogbnVsbCxcbiAgICAgICAgc2VjdXJpdHlDb250ZXh0OiBudWxsLFxuICAgICAgICBzdWZmaXg6IG51bGxcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGNvbnN0IG91dHB1dERlZnM6IE91dHB1dERlZltdID0gW107XG4gIGlmIChvdXRwdXRzKSB7XG4gICAgZm9yIChsZXQgcHJvcE5hbWUgaW4gb3V0cHV0cykge1xuICAgICAgb3V0cHV0RGVmcy5wdXNoKFxuICAgICAgICAgIHt0eXBlOiBPdXRwdXRUeXBlLkRpcmVjdGl2ZU91dHB1dCwgcHJvcE5hbWUsIHRhcmdldDogbnVsbCwgZXZlbnROYW1lOiBvdXRwdXRzW3Byb3BOYW1lXX0pO1xuICAgIH1cbiAgfVxuICBmbGFncyB8PSBOb2RlRmxhZ3MuVHlwZURpcmVjdGl2ZTtcbiAgcmV0dXJuIF9kZWYoXG4gICAgICBjaGVja0luZGV4LCBmbGFncywgbWF0Y2hlZFF1ZXJpZXMsIGNoaWxkQ291bnQsIGN0b3IsIGN0b3IsIGRlcHMsIGJpbmRpbmdzLCBvdXRwdXREZWZzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBpcGVEZWYoZmxhZ3M6IE5vZGVGbGFncywgY3RvcjogYW55LCBkZXBzOiAoW0RlcEZsYWdzLCBhbnldIHwgYW55KVtdKTogTm9kZURlZiB7XG4gIGZsYWdzIHw9IE5vZGVGbGFncy5UeXBlUGlwZTtcbiAgcmV0dXJuIF9kZWYoLTEsIGZsYWdzLCBudWxsLCAwLCBjdG9yLCBjdG9yLCBkZXBzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVyRGVmKFxuICAgIGZsYWdzOiBOb2RlRmxhZ3MsIG1hdGNoZWRRdWVyaWVzOiBudWxsIHwgW3N0cmluZyB8IG51bWJlciwgUXVlcnlWYWx1ZVR5cGVdW10sIHRva2VuOiBhbnksXG4gICAgdmFsdWU6IGFueSwgZGVwczogKFtEZXBGbGFncywgYW55XSB8IGFueSlbXSk6IE5vZGVEZWYge1xuICByZXR1cm4gX2RlZigtMSwgZmxhZ3MsIG1hdGNoZWRRdWVyaWVzLCAwLCB0b2tlbiwgdmFsdWUsIGRlcHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2RlZihcbiAgICBjaGVja0luZGV4OiBudW1iZXIsIGZsYWdzOiBOb2RlRmxhZ3MsXG4gICAgbWF0Y2hlZFF1ZXJpZXNEc2w6IFtzdHJpbmcgfCBudW1iZXIsIFF1ZXJ5VmFsdWVUeXBlXVtdIHwgbnVsbCwgY2hpbGRDb3VudDogbnVtYmVyLCB0b2tlbjogYW55LFxuICAgIHZhbHVlOiBhbnksIGRlcHM6IChbRGVwRmxhZ3MsIGFueV0gfCBhbnkpW10sIGJpbmRpbmdzPzogQmluZGluZ0RlZltdLFxuICAgIG91dHB1dHM/OiBPdXRwdXREZWZbXSk6IE5vZGVEZWYge1xuICBjb25zdCB7bWF0Y2hlZFF1ZXJpZXMsIHJlZmVyZW5jZXMsIG1hdGNoZWRRdWVyeUlkc30gPSBzcGxpdE1hdGNoZWRRdWVyaWVzRHNsKG1hdGNoZWRRdWVyaWVzRHNsKTtcbiAgaWYgKCFvdXRwdXRzKSB7XG4gICAgb3V0cHV0cyA9IFtdO1xuICB9XG4gIGlmICghYmluZGluZ3MpIHtcbiAgICBiaW5kaW5ncyA9IFtdO1xuICB9XG4gIC8vIE5lZWQgdG8gcmVzb2x2ZSBmb3J3YXJkUmVmcyBhcyBlLmcuIGZvciBgdXNlVmFsdWVgIHdlXG4gIC8vIGxvd2VyZWQgdGhlIGV4cHJlc3Npb24gYW5kIHRoZW4gc3RvcHBlZCBldmFsdWF0aW5nIGl0LFxuICAvLyBpLmUuIGFsc28gZGlkbid0IHVud3JhcCBpdC5cbiAgdmFsdWUgPSByZXNvbHZlRm9yd2FyZFJlZih2YWx1ZSk7XG5cbiAgY29uc3QgZGVwRGVmcyA9IHNwbGl0RGVwc0RzbChkZXBzLCBzdHJpbmdpZnkodG9rZW4pKTtcblxuICByZXR1cm4ge1xuICAgIC8vIHdpbGwgYmV0IHNldCBieSB0aGUgdmlldyBkZWZpbml0aW9uXG4gICAgbm9kZUluZGV4OiAtMSxcbiAgICBwYXJlbnQ6IG51bGwsXG4gICAgcmVuZGVyUGFyZW50OiBudWxsLFxuICAgIGJpbmRpbmdJbmRleDogLTEsXG4gICAgb3V0cHV0SW5kZXg6IC0xLFxuICAgIC8vIHJlZ3VsYXIgdmFsdWVzXG4gICAgY2hlY2tJbmRleCxcbiAgICBmbGFncyxcbiAgICBjaGlsZEZsYWdzOiAwLFxuICAgIGRpcmVjdENoaWxkRmxhZ3M6IDAsXG4gICAgY2hpbGRNYXRjaGVkUXVlcmllczogMCwgbWF0Y2hlZFF1ZXJpZXMsIG1hdGNoZWRRdWVyeUlkcywgcmVmZXJlbmNlcyxcbiAgICBuZ0NvbnRlbnRJbmRleDogLTEsIGNoaWxkQ291bnQsIGJpbmRpbmdzLFxuICAgIGJpbmRpbmdGbGFnczogY2FsY0JpbmRpbmdGbGFncyhiaW5kaW5ncyksIG91dHB1dHMsXG4gICAgZWxlbWVudDogbnVsbCxcbiAgICBwcm92aWRlcjoge3Rva2VuLCB2YWx1ZSwgZGVwczogZGVwRGVmc30sXG4gICAgdGV4dDogbnVsbCxcbiAgICBxdWVyeTogbnVsbCxcbiAgICBuZ0NvbnRlbnQ6IG51bGxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3ZpZGVySW5zdGFuY2UodmlldzogVmlld0RhdGEsIGRlZjogTm9kZURlZik6IGFueSB7XG4gIHJldHVybiBfY3JlYXRlUHJvdmlkZXJJbnN0YW5jZSh2aWV3LCBkZWYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGlwZUluc3RhbmNlKHZpZXc6IFZpZXdEYXRhLCBkZWY6IE5vZGVEZWYpOiBhbnkge1xuICAvLyBkZXBzIGFyZSBsb29rZWQgdXAgZnJvbSBjb21wb25lbnQuXG4gIGxldCBjb21wVmlldyA9IHZpZXc7XG4gIHdoaWxlIChjb21wVmlldy5wYXJlbnQgJiYgIWlzQ29tcG9uZW50Vmlldyhjb21wVmlldykpIHtcbiAgICBjb21wVmlldyA9IGNvbXBWaWV3LnBhcmVudDtcbiAgfVxuICAvLyBwaXBlcyBjYW4gc2VlIHRoZSBwcml2YXRlIHNlcnZpY2VzIG9mIHRoZSBjb21wb25lbnRcbiAgY29uc3QgYWxsb3dQcml2YXRlU2VydmljZXMgPSB0cnVlO1xuICAvLyBwaXBlcyBhcmUgYWx3YXlzIGVhZ2VyIGFuZCBjbGFzc2VzIVxuICByZXR1cm4gY3JlYXRlQ2xhc3MoXG4gICAgICBjb21wVmlldy5wYXJlbnQgISwgdmlld1BhcmVudEVsKGNvbXBWaWV3KSAhLCBhbGxvd1ByaXZhdGVTZXJ2aWNlcywgZGVmLnByb3ZpZGVyICEudmFsdWUsXG4gICAgICBkZWYucHJvdmlkZXIgIS5kZXBzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpcmVjdGl2ZUluc3RhbmNlKHZpZXc6IFZpZXdEYXRhLCBkZWY6IE5vZGVEZWYpOiBhbnkge1xuICAvLyBjb21wb25lbnRzIGNhbiBzZWUgb3RoZXIgcHJpdmF0ZSBzZXJ2aWNlcywgb3RoZXIgZGlyZWN0aXZlcyBjYW4ndC5cbiAgY29uc3QgYWxsb3dQcml2YXRlU2VydmljZXMgPSAoZGVmLmZsYWdzICYgTm9kZUZsYWdzLkNvbXBvbmVudCkgPiAwO1xuICAvLyBkaXJlY3RpdmVzIGFyZSBhbHdheXMgZWFnZXIgYW5kIGNsYXNzZXMhXG4gIGNvbnN0IGluc3RhbmNlID0gY3JlYXRlQ2xhc3MoXG4gICAgICB2aWV3LCBkZWYucGFyZW50ICEsIGFsbG93UHJpdmF0ZVNlcnZpY2VzLCBkZWYucHJvdmlkZXIgIS52YWx1ZSwgZGVmLnByb3ZpZGVyICEuZGVwcyk7XG4gIGlmIChkZWYub3V0cHV0cy5sZW5ndGgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZi5vdXRwdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBvdXRwdXQgPSBkZWYub3V0cHV0c1tpXTtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGluc3RhbmNlW291dHB1dC5wcm9wTmFtZSAhXS5zdWJzY3JpYmUoXG4gICAgICAgICAgZXZlbnRIYW5kbGVyQ2xvc3VyZSh2aWV3LCBkZWYucGFyZW50ICEubm9kZUluZGV4LCBvdXRwdXQuZXZlbnROYW1lKSk7XG4gICAgICB2aWV3LmRpc3Bvc2FibGVzICFbZGVmLm91dHB1dEluZGV4ICsgaV0gPSBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUuYmluZChzdWJzY3JpcHRpb24pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbmZ1bmN0aW9uIGV2ZW50SGFuZGxlckNsb3N1cmUodmlldzogVmlld0RhdGEsIGluZGV4OiBudW1iZXIsIGV2ZW50TmFtZTogc3RyaW5nKSB7XG4gIHJldHVybiAoZXZlbnQ6IGFueSkgPT4gZGlzcGF0Y2hFdmVudCh2aWV3LCBpbmRleCwgZXZlbnROYW1lLCBldmVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0FuZFVwZGF0ZURpcmVjdGl2ZUlubGluZShcbiAgICB2aWV3OiBWaWV3RGF0YSwgZGVmOiBOb2RlRGVmLCB2MDogYW55LCB2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55LCB2NTogYW55LCB2NjogYW55LFxuICAgIHY3OiBhbnksIHY4OiBhbnksIHY5OiBhbnkpOiBib29sZWFuIHtcbiAgY29uc3QgcHJvdmlkZXJEYXRhID0gYXNQcm92aWRlckRhdGEodmlldywgZGVmLm5vZGVJbmRleCk7XG4gIGNvbnN0IGRpcmVjdGl2ZSA9IHByb3ZpZGVyRGF0YS5pbnN0YW5jZTtcbiAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgbGV0IGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgPSB1bmRlZmluZWQgITtcbiAgY29uc3QgYmluZExlbiA9IGRlZi5iaW5kaW5ncy5sZW5ndGg7XG4gIGlmIChiaW5kTGVuID4gMCAmJiBjaGVja0JpbmRpbmcodmlldywgZGVmLCAwLCB2MCkpIHtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGFuZ2VzID0gdXBkYXRlUHJvcCh2aWV3LCBwcm92aWRlckRhdGEsIGRlZiwgMCwgdjAsIGNoYW5nZXMpO1xuICB9XG4gIGlmIChiaW5kTGVuID4gMSAmJiBjaGVja0JpbmRpbmcodmlldywgZGVmLCAxLCB2MSkpIHtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGFuZ2VzID0gdXBkYXRlUHJvcCh2aWV3LCBwcm92aWRlckRhdGEsIGRlZiwgMSwgdjEsIGNoYW5nZXMpO1xuICB9XG4gIGlmIChiaW5kTGVuID4gMiAmJiBjaGVja0JpbmRpbmcodmlldywgZGVmLCAyLCB2MikpIHtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGFuZ2VzID0gdXBkYXRlUHJvcCh2aWV3LCBwcm92aWRlckRhdGEsIGRlZiwgMiwgdjIsIGNoYW5nZXMpO1xuICB9XG4gIGlmIChiaW5kTGVuID4gMyAmJiBjaGVja0JpbmRpbmcodmlldywgZGVmLCAzLCB2MykpIHtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGFuZ2VzID0gdXBkYXRlUHJvcCh2aWV3LCBwcm92aWRlckRhdGEsIGRlZiwgMywgdjMsIGNoYW5nZXMpO1xuICB9XG4gIGlmIChiaW5kTGVuID4gNCAmJiBjaGVja0JpbmRpbmcodmlldywgZGVmLCA0LCB2NCkpIHtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGFuZ2VzID0gdXBkYXRlUHJvcCh2aWV3LCBwcm92aWRlckRhdGEsIGRlZiwgNCwgdjQsIGNoYW5nZXMpO1xuICB9XG4gIGlmIChiaW5kTGVuID4gNSAmJiBjaGVja0JpbmRpbmcodmlldywgZGVmLCA1LCB2NSkpIHtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGFuZ2VzID0gdXBkYXRlUHJvcCh2aWV3LCBwcm92aWRlckRhdGEsIGRlZiwgNSwgdjUsIGNoYW5nZXMpO1xuICB9XG4gIGlmIChiaW5kTGVuID4gNiAmJiBjaGVja0JpbmRpbmcodmlldywgZGVmLCA2LCB2NikpIHtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGFuZ2VzID0gdXBkYXRlUHJvcCh2aWV3LCBwcm92aWRlckRhdGEsIGRlZiwgNiwgdjYsIGNoYW5nZXMpO1xuICB9XG4gIGlmIChiaW5kTGVuID4gNyAmJiBjaGVja0JpbmRpbmcodmlldywgZGVmLCA3LCB2NykpIHtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGFuZ2VzID0gdXBkYXRlUHJvcCh2aWV3LCBwcm92aWRlckRhdGEsIGRlZiwgNywgdjcsIGNoYW5nZXMpO1xuICB9XG4gIGlmIChiaW5kTGVuID4gOCAmJiBjaGVja0JpbmRpbmcodmlldywgZGVmLCA4LCB2OCkpIHtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGFuZ2VzID0gdXBkYXRlUHJvcCh2aWV3LCBwcm92aWRlckRhdGEsIGRlZiwgOCwgdjgsIGNoYW5nZXMpO1xuICB9XG4gIGlmIChiaW5kTGVuID4gOSAmJiBjaGVja0JpbmRpbmcodmlldywgZGVmLCA5LCB2OSkpIHtcbiAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGFuZ2VzID0gdXBkYXRlUHJvcCh2aWV3LCBwcm92aWRlckRhdGEsIGRlZiwgOSwgdjksIGNoYW5nZXMpO1xuICB9XG4gIGlmIChjaGFuZ2VzKSB7XG4gICAgZGlyZWN0aXZlLm5nT25DaGFuZ2VzKGNoYW5nZXMpO1xuICB9XG4gIGlmICgoZGVmLmZsYWdzICYgTm9kZUZsYWdzLk9uSW5pdCkgJiZcbiAgICAgIHNob3VsZENhbGxMaWZlY3ljbGVJbml0SG9vayh2aWV3LCBWaWV3U3RhdGUuSW5pdFN0YXRlX0NhbGxpbmdPbkluaXQsIGRlZi5ub2RlSW5kZXgpKSB7XG4gICAgZGlyZWN0aXZlLm5nT25Jbml0KCk7XG4gIH1cbiAgaWYgKGRlZi5mbGFncyAmIE5vZGVGbGFncy5Eb0NoZWNrKSB7XG4gICAgZGlyZWN0aXZlLm5nRG9DaGVjaygpO1xuICB9XG4gIHJldHVybiBjaGFuZ2VkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tBbmRVcGRhdGVEaXJlY3RpdmVEeW5hbWljKFxuICAgIHZpZXc6IFZpZXdEYXRhLCBkZWY6IE5vZGVEZWYsIHZhbHVlczogYW55W10pOiBib29sZWFuIHtcbiAgY29uc3QgcHJvdmlkZXJEYXRhID0gYXNQcm92aWRlckRhdGEodmlldywgZGVmLm5vZGVJbmRleCk7XG4gIGNvbnN0IGRpcmVjdGl2ZSA9IHByb3ZpZGVyRGF0YS5pbnN0YW5jZTtcbiAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgbGV0IGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgPSB1bmRlZmluZWQgITtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoY2hlY2tCaW5kaW5nKHZpZXcsIGRlZiwgaSwgdmFsdWVzW2ldKSkge1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICBjaGFuZ2VzID0gdXBkYXRlUHJvcCh2aWV3LCBwcm92aWRlckRhdGEsIGRlZiwgaSwgdmFsdWVzW2ldLCBjaGFuZ2VzKTtcbiAgICB9XG4gIH1cbiAgaWYgKGNoYW5nZXMpIHtcbiAgICBkaXJlY3RpdmUubmdPbkNoYW5nZXMoY2hhbmdlcyk7XG4gIH1cbiAgaWYgKChkZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuT25Jbml0KSAmJlxuICAgICAgc2hvdWxkQ2FsbExpZmVjeWNsZUluaXRIb29rKHZpZXcsIFZpZXdTdGF0ZS5Jbml0U3RhdGVfQ2FsbGluZ09uSW5pdCwgZGVmLm5vZGVJbmRleCkpIHtcbiAgICBkaXJlY3RpdmUubmdPbkluaXQoKTtcbiAgfVxuICBpZiAoZGVmLmZsYWdzICYgTm9kZUZsYWdzLkRvQ2hlY2spIHtcbiAgICBkaXJlY3RpdmUubmdEb0NoZWNrKCk7XG4gIH1cbiAgcmV0dXJuIGNoYW5nZWQ7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVQcm92aWRlckluc3RhbmNlKHZpZXc6IFZpZXdEYXRhLCBkZWY6IE5vZGVEZWYpOiBhbnkge1xuICAvLyBwcml2YXRlIHNlcnZpY2VzIGNhbiBzZWUgb3RoZXIgcHJpdmF0ZSBzZXJ2aWNlc1xuICBjb25zdCBhbGxvd1ByaXZhdGVTZXJ2aWNlcyA9IChkZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuUHJpdmF0ZVByb3ZpZGVyKSA+IDA7XG4gIGNvbnN0IHByb3ZpZGVyRGVmID0gZGVmLnByb3ZpZGVyO1xuICBzd2l0Y2ggKGRlZi5mbGFncyAmIE5vZGVGbGFncy5UeXBlcykge1xuICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVDbGFzc1Byb3ZpZGVyOlxuICAgICAgcmV0dXJuIGNyZWF0ZUNsYXNzKFxuICAgICAgICAgIHZpZXcsIGRlZi5wYXJlbnQgISwgYWxsb3dQcml2YXRlU2VydmljZXMsIHByb3ZpZGVyRGVmICEudmFsdWUsIHByb3ZpZGVyRGVmICEuZGVwcyk7XG4gICAgY2FzZSBOb2RlRmxhZ3MuVHlwZUZhY3RvcnlQcm92aWRlcjpcbiAgICAgIHJldHVybiBjYWxsRmFjdG9yeShcbiAgICAgICAgICB2aWV3LCBkZWYucGFyZW50ICEsIGFsbG93UHJpdmF0ZVNlcnZpY2VzLCBwcm92aWRlckRlZiAhLnZhbHVlLCBwcm92aWRlckRlZiAhLmRlcHMpO1xuICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVVc2VFeGlzdGluZ1Byb3ZpZGVyOlxuICAgICAgcmV0dXJuIHJlc29sdmVEZXAodmlldywgZGVmLnBhcmVudCAhLCBhbGxvd1ByaXZhdGVTZXJ2aWNlcywgcHJvdmlkZXJEZWYgIS5kZXBzWzBdKTtcbiAgICBjYXNlIE5vZGVGbGFncy5UeXBlVmFsdWVQcm92aWRlcjpcbiAgICAgIHJldHVybiBwcm92aWRlckRlZiAhLnZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNsYXNzKFxuICAgIHZpZXc6IFZpZXdEYXRhLCBlbERlZjogTm9kZURlZiwgYWxsb3dQcml2YXRlU2VydmljZXM6IGJvb2xlYW4sIGN0b3I6IGFueSwgZGVwczogRGVwRGVmW10pOiBhbnkge1xuICBjb25zdCBsZW4gPSBkZXBzLmxlbmd0aDtcbiAgc3dpdGNoIChsZW4pIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gbmV3IGN0b3IoKTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gbmV3IGN0b3IocmVzb2x2ZURlcCh2aWV3LCBlbERlZiwgYWxsb3dQcml2YXRlU2VydmljZXMsIGRlcHNbMF0pKTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gbmV3IGN0b3IoXG4gICAgICAgICAgcmVzb2x2ZURlcCh2aWV3LCBlbERlZiwgYWxsb3dQcml2YXRlU2VydmljZXMsIGRlcHNbMF0pLFxuICAgICAgICAgIHJlc29sdmVEZXAodmlldywgZWxEZWYsIGFsbG93UHJpdmF0ZVNlcnZpY2VzLCBkZXBzWzFdKSk7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIG5ldyBjdG9yKFxuICAgICAgICAgIHJlc29sdmVEZXAodmlldywgZWxEZWYsIGFsbG93UHJpdmF0ZVNlcnZpY2VzLCBkZXBzWzBdKSxcbiAgICAgICAgICByZXNvbHZlRGVwKHZpZXcsIGVsRGVmLCBhbGxvd1ByaXZhdGVTZXJ2aWNlcywgZGVwc1sxXSksXG4gICAgICAgICAgcmVzb2x2ZURlcCh2aWV3LCBlbERlZiwgYWxsb3dQcml2YXRlU2VydmljZXMsIGRlcHNbMl0pKTtcbiAgICBkZWZhdWx0OlxuICAgICAgY29uc3QgZGVwVmFsdWVzID0gbmV3IEFycmF5KGxlbik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGRlcFZhbHVlc1tpXSA9IHJlc29sdmVEZXAodmlldywgZWxEZWYsIGFsbG93UHJpdmF0ZVNlcnZpY2VzLCBkZXBzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgY3RvciguLi5kZXBWYWx1ZXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxGYWN0b3J5KFxuICAgIHZpZXc6IFZpZXdEYXRhLCBlbERlZjogTm9kZURlZiwgYWxsb3dQcml2YXRlU2VydmljZXM6IGJvb2xlYW4sIGZhY3Rvcnk6IGFueSxcbiAgICBkZXBzOiBEZXBEZWZbXSk6IGFueSB7XG4gIGNvbnN0IGxlbiA9IGRlcHMubGVuZ3RoO1xuICBzd2l0Y2ggKGxlbikge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBmYWN0b3J5KCk7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGZhY3RvcnkocmVzb2x2ZURlcCh2aWV3LCBlbERlZiwgYWxsb3dQcml2YXRlU2VydmljZXMsIGRlcHNbMF0pKTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gZmFjdG9yeShcbiAgICAgICAgICByZXNvbHZlRGVwKHZpZXcsIGVsRGVmLCBhbGxvd1ByaXZhdGVTZXJ2aWNlcywgZGVwc1swXSksXG4gICAgICAgICAgcmVzb2x2ZURlcCh2aWV3LCBlbERlZiwgYWxsb3dQcml2YXRlU2VydmljZXMsIGRlcHNbMV0pKTtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gZmFjdG9yeShcbiAgICAgICAgICByZXNvbHZlRGVwKHZpZXcsIGVsRGVmLCBhbGxvd1ByaXZhdGVTZXJ2aWNlcywgZGVwc1swXSksXG4gICAgICAgICAgcmVzb2x2ZURlcCh2aWV3LCBlbERlZiwgYWxsb3dQcml2YXRlU2VydmljZXMsIGRlcHNbMV0pLFxuICAgICAgICAgIHJlc29sdmVEZXAodmlldywgZWxEZWYsIGFsbG93UHJpdmF0ZVNlcnZpY2VzLCBkZXBzWzJdKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIGNvbnN0IGRlcFZhbHVlcyA9IEFycmF5KGxlbik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGRlcFZhbHVlc1tpXSA9IHJlc29sdmVEZXAodmlldywgZWxEZWYsIGFsbG93UHJpdmF0ZVNlcnZpY2VzLCBkZXBzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWN0b3J5KC4uLmRlcFZhbHVlcyk7XG4gIH1cbn1cblxuLy8gVGhpcyBkZWZhdWx0IHZhbHVlIGlzIHdoZW4gY2hlY2tpbmcgdGhlIGhpZXJhcmNoeSBmb3IgYSB0b2tlbi5cbi8vXG4vLyBJdCBtZWFucyBib3RoOlxuLy8gLSB0aGUgdG9rZW4gaXMgbm90IHByb3ZpZGVkIGJ5IHRoZSBjdXJyZW50IGluamVjdG9yLFxuLy8gLSBvbmx5IHRoZSBlbGVtZW50IGluamVjdG9ycyBzaG91bGQgYmUgY2hlY2tlZCAoaWUgZG8gbm90IGNoZWNrIG1vZHVsZSBpbmplY3RvcnNcbi8vXG4vLyAgICAgICAgICBtb2QxXG4vLyAgICAgICAgIC9cbi8vICAgICAgIGVsMSAgIG1vZDJcbi8vICAgICAgICAgXFwgIC9cbi8vICAgICAgICAgZWwyXG4vL1xuLy8gV2hlbiByZXF1ZXN0aW5nIGVsMi5pbmplY3Rvci5nZXQodG9rZW4pLCB3ZSBzaG91bGQgY2hlY2sgaW4gdGhlIGZvbGxvd2luZyBvcmRlciBhbmQgcmV0dXJuIHRoZVxuLy8gZmlyc3QgZm91bmQgdmFsdWU6XG4vLyAtIGVsMi5pbmplY3Rvci5nZXQodG9rZW4sIGRlZmF1bHQpXG4vLyAtIGVsMS5pbmplY3Rvci5nZXQodG9rZW4sIE5PVF9GT1VORF9DSEVDS19PTkxZX0VMRU1FTlRfSU5KRUNUT1IpIC0+IGRvIG5vdCBjaGVjayB0aGUgbW9kdWxlXG4vLyAtIG1vZDIuaW5qZWN0b3IuZ2V0KHRva2VuLCBkZWZhdWx0KVxuZXhwb3J0IGNvbnN0IE5PVF9GT1VORF9DSEVDS19PTkxZX0VMRU1FTlRfSU5KRUNUT1IgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVEZXAoXG4gICAgdmlldzogVmlld0RhdGEsIGVsRGVmOiBOb2RlRGVmLCBhbGxvd1ByaXZhdGVTZXJ2aWNlczogYm9vbGVhbiwgZGVwRGVmOiBEZXBEZWYsXG4gICAgbm90Rm91bmRWYWx1ZTogYW55ID0gSW5qZWN0b3IuVEhST1dfSUZfTk9UX0ZPVU5EKTogYW55IHtcbiAgaWYgKGRlcERlZi5mbGFncyAmIERlcEZsYWdzLlZhbHVlKSB7XG4gICAgcmV0dXJuIGRlcERlZi50b2tlbjtcbiAgfVxuICBjb25zdCBzdGFydFZpZXcgPSB2aWV3O1xuICBpZiAoZGVwRGVmLmZsYWdzICYgRGVwRmxhZ3MuT3B0aW9uYWwpIHtcbiAgICBub3RGb3VuZFZhbHVlID0gbnVsbDtcbiAgfVxuICBjb25zdCB0b2tlbktleSA9IGRlcERlZi50b2tlbktleTtcblxuICBpZiAodG9rZW5LZXkgPT09IENoYW5nZURldGVjdG9yUmVmVG9rZW5LZXkpIHtcbiAgICAvLyBkaXJlY3RpdmVzIG9uIHRoZSBzYW1lIGVsZW1lbnQgYXMgYSBjb21wb25lbnQgc2hvdWxkIGJlIGFibGUgdG8gY29udHJvbCB0aGUgY2hhbmdlIGRldGVjdG9yXG4gICAgLy8gb2YgdGhhdCBjb21wb25lbnQgYXMgd2VsbC5cbiAgICBhbGxvd1ByaXZhdGVTZXJ2aWNlcyA9ICEhKGVsRGVmICYmIGVsRGVmLmVsZW1lbnQgIS5jb21wb25lbnRWaWV3KTtcbiAgfVxuXG4gIGlmIChlbERlZiAmJiAoZGVwRGVmLmZsYWdzICYgRGVwRmxhZ3MuU2tpcFNlbGYpKSB7XG4gICAgYWxsb3dQcml2YXRlU2VydmljZXMgPSBmYWxzZTtcbiAgICBlbERlZiA9IGVsRGVmLnBhcmVudCAhO1xuICB9XG5cbiAgbGV0IHNlYXJjaFZpZXc6IFZpZXdEYXRhfG51bGwgPSB2aWV3O1xuICB3aGlsZSAoc2VhcmNoVmlldykge1xuICAgIGlmIChlbERlZikge1xuICAgICAgc3dpdGNoICh0b2tlbktleSkge1xuICAgICAgICBjYXNlIFJlbmRlcmVyVjFUb2tlbktleToge1xuICAgICAgICAgIGNvbnN0IGNvbXBWaWV3ID0gZmluZENvbXBWaWV3KHNlYXJjaFZpZXcsIGVsRGVmLCBhbGxvd1ByaXZhdGVTZXJ2aWNlcyk7XG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZVJlbmRlcmVyVjEoY29tcFZpZXcpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgUmVuZGVyZXIyVG9rZW5LZXk6IHtcbiAgICAgICAgICBjb25zdCBjb21wVmlldyA9IGZpbmRDb21wVmlldyhzZWFyY2hWaWV3LCBlbERlZiwgYWxsb3dQcml2YXRlU2VydmljZXMpO1xuICAgICAgICAgIHJldHVybiBjb21wVmlldy5yZW5kZXJlcjtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEVsZW1lbnRSZWZUb2tlbktleTpcbiAgICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnRSZWYoYXNFbGVtZW50RGF0YShzZWFyY2hWaWV3LCBlbERlZi5ub2RlSW5kZXgpLnJlbmRlckVsZW1lbnQpO1xuICAgICAgICBjYXNlIFZpZXdDb250YWluZXJSZWZUb2tlbktleTpcbiAgICAgICAgICByZXR1cm4gYXNFbGVtZW50RGF0YShzZWFyY2hWaWV3LCBlbERlZi5ub2RlSW5kZXgpLnZpZXdDb250YWluZXI7XG4gICAgICAgIGNhc2UgVGVtcGxhdGVSZWZUb2tlbktleToge1xuICAgICAgICAgIGlmIChlbERlZi5lbGVtZW50ICEudGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBhc0VsZW1lbnREYXRhKHNlYXJjaFZpZXcsIGVsRGVmLm5vZGVJbmRleCkudGVtcGxhdGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hhbmdlRGV0ZWN0b3JSZWZUb2tlbktleToge1xuICAgICAgICAgIGxldCBjZFZpZXcgPSBmaW5kQ29tcFZpZXcoc2VhcmNoVmlldywgZWxEZWYsIGFsbG93UHJpdmF0ZVNlcnZpY2VzKTtcbiAgICAgICAgICByZXR1cm4gY3JlYXRlQ2hhbmdlRGV0ZWN0b3JSZWYoY2RWaWV3KTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEluamVjdG9yUmVmVG9rZW5LZXk6XG4gICAgICAgIGNhc2UgSU5KRUNUT1JSZWZUb2tlbktleTpcbiAgICAgICAgICByZXR1cm4gY3JlYXRlSW5qZWN0b3Ioc2VhcmNoVmlldywgZWxEZWYpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnN0IHByb3ZpZGVyRGVmID1cbiAgICAgICAgICAgICAgKGFsbG93UHJpdmF0ZVNlcnZpY2VzID8gZWxEZWYuZWxlbWVudCAhLmFsbFByb3ZpZGVycyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsRGVmLmVsZW1lbnQgIS5wdWJsaWNQcm92aWRlcnMpICFbdG9rZW5LZXldO1xuICAgICAgICAgIGlmIChwcm92aWRlckRlZikge1xuICAgICAgICAgICAgbGV0IHByb3ZpZGVyRGF0YSA9IGFzUHJvdmlkZXJEYXRhKHNlYXJjaFZpZXcsIHByb3ZpZGVyRGVmLm5vZGVJbmRleCk7XG4gICAgICAgICAgICBpZiAoIXByb3ZpZGVyRGF0YSkge1xuICAgICAgICAgICAgICBwcm92aWRlckRhdGEgPSB7aW5zdGFuY2U6IF9jcmVhdGVQcm92aWRlckluc3RhbmNlKHNlYXJjaFZpZXcsIHByb3ZpZGVyRGVmKX07XG4gICAgICAgICAgICAgIHNlYXJjaFZpZXcubm9kZXNbcHJvdmlkZXJEZWYubm9kZUluZGV4XSA9IHByb3ZpZGVyRGF0YSBhcyBhbnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJvdmlkZXJEYXRhLmluc3RhbmNlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhbGxvd1ByaXZhdGVTZXJ2aWNlcyA9IGlzQ29tcG9uZW50VmlldyhzZWFyY2hWaWV3KTtcbiAgICBlbERlZiA9IHZpZXdQYXJlbnRFbChzZWFyY2hWaWV3KSAhO1xuICAgIHNlYXJjaFZpZXcgPSBzZWFyY2hWaWV3LnBhcmVudCAhO1xuXG4gICAgaWYgKGRlcERlZi5mbGFncyAmIERlcEZsYWdzLlNlbGYpIHtcbiAgICAgIHNlYXJjaFZpZXcgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHZhbHVlID0gc3RhcnRWaWV3LnJvb3QuaW5qZWN0b3IuZ2V0KGRlcERlZi50b2tlbiwgTk9UX0ZPVU5EX0NIRUNLX09OTFlfRUxFTUVOVF9JTkpFQ1RPUik7XG5cbiAgaWYgKHZhbHVlICE9PSBOT1RfRk9VTkRfQ0hFQ0tfT05MWV9FTEVNRU5UX0lOSkVDVE9SIHx8XG4gICAgICBub3RGb3VuZFZhbHVlID09PSBOT1RfRk9VTkRfQ0hFQ0tfT05MWV9FTEVNRU5UX0lOSkVDVE9SKSB7XG4gICAgLy8gUmV0dXJuIHRoZSB2YWx1ZSBmcm9tIHRoZSByb290IGVsZW1lbnQgaW5qZWN0b3Igd2hlblxuICAgIC8vIC0gaXQgcHJvdmlkZXMgaXRcbiAgICAvLyAgICh2YWx1ZSAhPT0gTk9UX0ZPVU5EX0NIRUNLX09OTFlfRUxFTUVOVF9JTkpFQ1RPUilcbiAgICAvLyAtIHRoZSBtb2R1bGUgaW5qZWN0b3Igc2hvdWxkIG5vdCBiZSBjaGVja2VkXG4gICAgLy8gICAobm90Rm91bmRWYWx1ZSA9PT0gTk9UX0ZPVU5EX0NIRUNLX09OTFlfRUxFTUVOVF9JTkpFQ1RPUilcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gc3RhcnRWaWV3LnJvb3QubmdNb2R1bGUuaW5qZWN0b3IuZ2V0KGRlcERlZi50b2tlbiwgbm90Rm91bmRWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRDb21wVmlldyh2aWV3OiBWaWV3RGF0YSwgZWxEZWY6IE5vZGVEZWYsIGFsbG93UHJpdmF0ZVNlcnZpY2VzOiBib29sZWFuKSB7XG4gIGxldCBjb21wVmlldzogVmlld0RhdGE7XG4gIGlmIChhbGxvd1ByaXZhdGVTZXJ2aWNlcykge1xuICAgIGNvbXBWaWV3ID0gYXNFbGVtZW50RGF0YSh2aWV3LCBlbERlZi5ub2RlSW5kZXgpLmNvbXBvbmVudFZpZXc7XG4gIH0gZWxzZSB7XG4gICAgY29tcFZpZXcgPSB2aWV3O1xuICAgIHdoaWxlIChjb21wVmlldy5wYXJlbnQgJiYgIWlzQ29tcG9uZW50Vmlldyhjb21wVmlldykpIHtcbiAgICAgIGNvbXBWaWV3ID0gY29tcFZpZXcucGFyZW50O1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29tcFZpZXc7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVByb3AoXG4gICAgdmlldzogVmlld0RhdGEsIHByb3ZpZGVyRGF0YTogUHJvdmlkZXJEYXRhLCBkZWY6IE5vZGVEZWYsIGJpbmRpbmdJZHg6IG51bWJlciwgdmFsdWU6IGFueSxcbiAgICBjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogU2ltcGxlQ2hhbmdlcyB7XG4gIGlmIChkZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuQ29tcG9uZW50KSB7XG4gICAgY29uc3QgY29tcFZpZXcgPSBhc0VsZW1lbnREYXRhKHZpZXcsIGRlZi5wYXJlbnQgIS5ub2RlSW5kZXgpLmNvbXBvbmVudFZpZXc7XG4gICAgaWYgKGNvbXBWaWV3LmRlZi5mbGFncyAmIFZpZXdGbGFncy5PblB1c2gpIHtcbiAgICAgIGNvbXBWaWV3LnN0YXRlIHw9IFZpZXdTdGF0ZS5DaGVja3NFbmFibGVkO1xuICAgIH1cbiAgfVxuICBjb25zdCBiaW5kaW5nID0gZGVmLmJpbmRpbmdzW2JpbmRpbmdJZHhdO1xuICBjb25zdCBwcm9wTmFtZSA9IGJpbmRpbmcubmFtZSAhO1xuICAvLyBOb3RlOiBUaGlzIGlzIHN0aWxsIHNhZmUgd2l0aCBDbG9zdXJlIENvbXBpbGVyIGFzXG4gIC8vIHRoZSB1c2VyIHBhc3NlZCBpbiB0aGUgcHJvcGVydHkgbmFtZSBhcyBhbiBvYmplY3QgaGFzIHRvIGBwcm92aWRlckRlZmAsXG4gIC8vIHNvIENsb3N1cmUgQ29tcGlsZXIgd2lsbCBoYXZlIHJlbmFtZWQgdGhlIHByb3BlcnR5IGNvcnJlY3RseSBhbHJlYWR5LlxuICBwcm92aWRlckRhdGEuaW5zdGFuY2VbcHJvcE5hbWVdID0gdmFsdWU7XG4gIGlmIChkZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuT25DaGFuZ2VzKSB7XG4gICAgY2hhbmdlcyA9IGNoYW5nZXMgfHwge307XG4gICAgY29uc3Qgb2xkVmFsdWUgPSBXcmFwcGVkVmFsdWUudW53cmFwKHZpZXcub2xkVmFsdWVzW2RlZi5iaW5kaW5nSW5kZXggKyBiaW5kaW5nSWR4XSk7XG4gICAgY29uc3QgYmluZGluZyA9IGRlZi5iaW5kaW5nc1tiaW5kaW5nSWR4XTtcbiAgICBjaGFuZ2VzW2JpbmRpbmcubm9uTWluaWZpZWROYW1lICFdID1cbiAgICAgICAgbmV3IFNpbXBsZUNoYW5nZShvbGRWYWx1ZSwgdmFsdWUsICh2aWV3LnN0YXRlICYgVmlld1N0YXRlLkZpcnN0Q2hlY2spICE9PSAwKTtcbiAgfVxuICB2aWV3Lm9sZFZhbHVlc1tkZWYuYmluZGluZ0luZGV4ICsgYmluZGluZ0lkeF0gPSB2YWx1ZTtcbiAgcmV0dXJuIGNoYW5nZXM7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gY2FsbHMgdGhlIG5nQWZ0ZXJDb250ZW50Q2hlY2ssIG5nQWZ0ZXJDb250ZW50SW5pdCxcbi8vIG5nQWZ0ZXJWaWV3Q2hlY2ssIGFuZCBuZ0FmdGVyVmlld0luaXQgbGlmZWN5Y2xlIGhvb2tzIChkZXBlbmRpbmcgb24gdGhlIG5vZGVcbi8vIGZsYWdzIGluIGxpZmVjeWNsZSkuIFVubGlrZSBuZ0RvQ2hlY2ssIG5nT25DaGFuZ2VzIGFuZCBuZ09uSW5pdCwgd2hpY2ggYXJlXG4vLyBjYWxsZWQgZHVyaW5nIGEgcHJlLW9yZGVyIHRyYXZlcnNhbCBvZiB0aGUgdmlldyB0cmVlICh0aGF0IGlzIGNhbGxpbmcgdGhlXG4vLyBwYXJlbnQgaG9va3MgYmVmb3JlIHRoZSBjaGlsZCBob29rcykgdGhlc2UgZXZlbnRzIGFyZSBzZW50IGluIHVzaW5nIGFcbi8vIHBvc3Qtb3JkZXIgdHJhdmVyc2FsIG9mIHRoZSB0cmVlIChjaGlsZHJlbiBiZWZvcmUgcGFyZW50cykuIFRoaXMgY2hhbmdlcyB0aGVcbi8vIG1lYW5pbmcgb2YgaW5pdEluZGV4IGluIHRoZSB2aWV3IHN0YXRlLiBGb3IgbmdPbkluaXQsIGluaXRJbmRleCB0cmFja3MgdGhlXG4vLyBleHBlY3RlZCBub2RlSW5kZXggd2hpY2ggYSBuZ09uSW5pdCBzaG91bGQgYmUgY2FsbGVkLiBXaGVuIHNlbmRpbmdcbi8vIG5nQWZ0ZXJDb250ZW50SW5pdCBhbmQgbmdBZnRlclZpZXdJbml0IGl0IGlzIHRoZSBleHBlY3RlZCBjb3VudCBvZlxuLy8gbmdBZnRlckNvbnRlbnRJbml0IG9yIG5nQWZ0ZXJWaWV3SW5pdCBtZXRob2RzIHRoYXQgaGF2ZSBiZWVuIGNhbGxlZC4gVGhpc1xuLy8gZW5zdXJlIHRoYXQgZGVzcGl0ZSBiZWluZyBjYWxsZWQgcmVjdXJzaXZlbHkgb3IgYWZ0ZXIgcGlja2luZyB1cCBhZnRlciBhblxuLy8gZXhjZXB0aW9uLCB0aGUgbmdBZnRlckNvbnRlbnRJbml0IG9yIG5nQWZ0ZXJWaWV3SW5pdCB3aWxsIGJlIGNhbGxlZCBvbiB0aGVcbi8vIGNvcnJlY3Qgbm9kZXMuIENvbnNpZGVyIGZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nICh3aGVyZSBFIGlzIGFuIGVsZW1lbnRcbi8vIGFuZCBEIGlzIGEgZGlyZWN0aXZlKVxuLy8gIFRyZWU6ICAgICAgIHByZS1vcmRlciBpbmRleCAgcG9zdC1vcmRlciBpbmRleFxuLy8gICAgRTEgICAgICAgIDAgICAgICAgICAgICAgICAgNlxuLy8gICAgICBFMiAgICAgIDEgICAgICAgICAgICAgICAgMVxuLy8gICAgICAgRDMgICAgIDIgICAgICAgICAgICAgICAgMFxuLy8gICAgICBFNCAgICAgIDMgICAgICAgICAgICAgICAgNVxuLy8gICAgICAgRTUgICAgIDQgICAgICAgICAgICAgICAgNFxuLy8gICAgICAgIEU2ICAgIDUgICAgICAgICAgICAgICAgMlxuLy8gICAgICAgIEU3ICAgIDYgICAgICAgICAgICAgICAgM1xuLy8gQXMgY2FuIGJlIHNlZW4sIHRoZSBwb3N0LW9yZGVyIGluZGV4IGhhcyBhbiB1bmNsZWFyIHJlbGF0aW9uc2hpcCB0byB0aGVcbi8vIHByZS1vcmRlciBpbmRleCAocG9zdE9yZGVySW5kZXggPT09IHByZU9yZGVySW5kZXggLSBwYXJlbnRDb3VudCArXG4vLyBjaGlsZENvdW50KS4gU2luY2UgbnVtYmVyIG9mIGNhbGxzIHRvIG5nQWZ0ZXJDb250ZW50SW5pdCBhbmQgbmdBZnRlclZpZXdJbml0XG4vLyBhcmUgc3RhYmxlICh3aWxsIGJlIHRoZSBzYW1lIGZvciB0aGUgc2FtZSB2aWV3IHJlZ2FyZGxlc3Mgb2YgZXhjZXB0aW9ucyBvclxuLy8gcmVjdXJzaW9uKSB3ZSBqdXN0IG5lZWQgdG8gY291bnQgdGhlbSB3aGljaCB3aWxsIHJvdWdobHkgY29ycmVzcG9uZCB0byB0aGVcbi8vIHBvc3Qtb3JkZXIgaW5kZXggKGl0IHNraXBzIGVsZW1lbnRzIGFuZCBkaXJlY3RpdmVzIHRoYXQgZG8gbm90IGhhdmVcbi8vIGxpZmVjeWNsZSBob29rcykuXG4vL1xuLy8gRm9yIGV4YW1wbGUsIGlmIGFuIGV4Y2VwdGlvbiBpcyByYWlzZWQgaW4gdGhlIEU2Lm9uQWZ0ZXJWaWV3SW5pdCgpIHRoZVxuLy8gaW5pdEluZGV4IGlzIGxlZnQgYXQgMyAoYnkgc2hvdWxkQ2FsbExpZmVjeWNsZUluaXRIb29rKCkgd2hpY2ggc2V0IGl0IHRvXG4vLyBpbml0SW5kZXggKyAxKS4gV2hlbiBjaGVja0FuZFVwZGF0ZVZpZXcoKSBpcyBjYWxsZWQgYWdhaW4gRDMsIEUyIGFuZCBFNiB3aWxsXG4vLyBub3QgaGF2ZSB0aGVpciBuZ0FmdGVyVmlld0luaXQoKSBjYWxsZWQgYnV0LCBzdGFydGluZyB3aXRoIEU3LCB0aGUgcmVzdCBvZlxuLy8gdGhlIHZpZXcgd2lsbCBiZWdpbiBnZXR0aW5nIG5nQWZ0ZXJWaWV3SW5pdCgpIGNhbGxlZCB1bnRpbCBhIGNoZWNrIGFuZFxuLy8gcGFzcyBpcyBjb21wbGV0ZS5cbi8vXG4vLyBUaGlzIGFsZ29ydGhpbSBhbHNvIGhhbmRsZXMgcmVjdXJzaW9uLiBDb25zaWRlciBpZiBFNCdzIG5nQWZ0ZXJWaWV3SW5pdCgpXG4vLyBpbmRpcmVjdGx5IGNhbGxzIEUxJ3MgQ2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpLiBUaGUgZXhwZWN0ZWRcbi8vIGluaXRJbmRleCBpcyBzZXQgdG8gNiwgdGhlIHJlY3VzaXZlIGNoZWNrQW5kVXBkYXRlVmlldygpIHN0YXJ0cyB3YWxrIGFnYWluLlxuLy8gRDMsIEUyLCBFNiwgRTcsIEU1IGFuZCBFNCBhcmUgc2tpcHBlZCwgbmdBZnRlclZpZXdJbml0KCkgaXMgY2FsbGVkIG9uIEUxLlxuLy8gV2hlbiB0aGUgcmVjdXJzaW9uIHJldHVybnMgdGhlIGluaXRJbmRleCB3aWxsIGJlIDcgc28gRTEgaXMgc2tpcHBlZCBhcyBpdFxuLy8gaGFzIGFscmVhZHkgYmVlbiBjYWxsZWQgaW4gdGhlIHJlY3Vyc2l2ZWx5IGNhbGxlZCBjaGVja0FuVXBkYXRlVmlldygpLlxuZXhwb3J0IGZ1bmN0aW9uIGNhbGxMaWZlY3ljbGVIb29rc0NoaWxkcmVuRmlyc3QodmlldzogVmlld0RhdGEsIGxpZmVjeWNsZXM6IE5vZGVGbGFncykge1xuICBpZiAoISh2aWV3LmRlZi5ub2RlRmxhZ3MgJiBsaWZlY3ljbGVzKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBub2RlcyA9IHZpZXcuZGVmLm5vZGVzO1xuICBsZXQgaW5pdEluZGV4ID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG5vZGVEZWYgPSBub2Rlc1tpXTtcbiAgICBsZXQgcGFyZW50ID0gbm9kZURlZi5wYXJlbnQ7XG4gICAgaWYgKCFwYXJlbnQgJiYgbm9kZURlZi5mbGFncyAmIGxpZmVjeWNsZXMpIHtcbiAgICAgIC8vIG1hdGNoaW5nIHJvb3Qgbm9kZSAoZS5nLiBhIHBpcGUpXG4gICAgICBjYWxsUHJvdmlkZXJMaWZlY3ljbGVzKHZpZXcsIGksIG5vZGVEZWYuZmxhZ3MgJiBsaWZlY3ljbGVzLCBpbml0SW5kZXgrKyk7XG4gICAgfVxuICAgIGlmICgobm9kZURlZi5jaGlsZEZsYWdzICYgbGlmZWN5Y2xlcykgPT09IDApIHtcbiAgICAgIC8vIG5vIGNoaWxkIG1hdGNoZXMgb25lIG9mIHRoZSBsaWZlY3ljbGVzXG4gICAgICBpICs9IG5vZGVEZWYuY2hpbGRDb3VudDtcbiAgICB9XG4gICAgd2hpbGUgKHBhcmVudCAmJiAocGFyZW50LmZsYWdzICYgTm9kZUZsYWdzLlR5cGVFbGVtZW50KSAmJlxuICAgICAgICAgICBpID09PSBwYXJlbnQubm9kZUluZGV4ICsgcGFyZW50LmNoaWxkQ291bnQpIHtcbiAgICAgIC8vIGxhc3QgY2hpbGQgb2YgYW4gZWxlbWVudFxuICAgICAgaWYgKHBhcmVudC5kaXJlY3RDaGlsZEZsYWdzICYgbGlmZWN5Y2xlcykge1xuICAgICAgICBpbml0SW5kZXggPSBjYWxsRWxlbWVudFByb3ZpZGVyc0xpZmVjeWNsZXModmlldywgcGFyZW50LCBsaWZlY3ljbGVzLCBpbml0SW5kZXgpO1xuICAgICAgfVxuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEVsZW1lbnRQcm92aWRlcnNMaWZlY3ljbGVzKFxuICAgIHZpZXc6IFZpZXdEYXRhLCBlbERlZjogTm9kZURlZiwgbGlmZWN5Y2xlczogTm9kZUZsYWdzLCBpbml0SW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gIGZvciAobGV0IGkgPSBlbERlZi5ub2RlSW5kZXggKyAxOyBpIDw9IGVsRGVmLm5vZGVJbmRleCArIGVsRGVmLmNoaWxkQ291bnQ7IGkrKykge1xuICAgIGNvbnN0IG5vZGVEZWYgPSB2aWV3LmRlZi5ub2Rlc1tpXTtcbiAgICBpZiAobm9kZURlZi5mbGFncyAmIGxpZmVjeWNsZXMpIHtcbiAgICAgIGNhbGxQcm92aWRlckxpZmVjeWNsZXModmlldywgaSwgbm9kZURlZi5mbGFncyAmIGxpZmVjeWNsZXMsIGluaXRJbmRleCsrKTtcbiAgICB9XG4gICAgLy8gb25seSB2aXNpdCBkaXJlY3QgY2hpbGRyZW5cbiAgICBpICs9IG5vZGVEZWYuY2hpbGRDb3VudDtcbiAgfVxuICByZXR1cm4gaW5pdEluZGV4O1xufVxuXG5mdW5jdGlvbiBjYWxsUHJvdmlkZXJMaWZlY3ljbGVzKFxuICAgIHZpZXc6IFZpZXdEYXRhLCBpbmRleDogbnVtYmVyLCBsaWZlY3ljbGVzOiBOb2RlRmxhZ3MsIGluaXRJbmRleDogbnVtYmVyKSB7XG4gIGNvbnN0IHByb3ZpZGVyRGF0YSA9IGFzUHJvdmlkZXJEYXRhKHZpZXcsIGluZGV4KTtcbiAgaWYgKCFwcm92aWRlckRhdGEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcHJvdmlkZXIgPSBwcm92aWRlckRhdGEuaW5zdGFuY2U7XG4gIGlmICghcHJvdmlkZXIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgU2VydmljZXMuc2V0Q3VycmVudE5vZGUodmlldywgaW5kZXgpO1xuICBpZiAobGlmZWN5Y2xlcyAmIE5vZGVGbGFncy5BZnRlckNvbnRlbnRJbml0ICYmXG4gICAgICBzaG91bGRDYWxsTGlmZWN5Y2xlSW5pdEhvb2sodmlldywgVmlld1N0YXRlLkluaXRTdGF0ZV9DYWxsaW5nQWZ0ZXJDb250ZW50SW5pdCwgaW5pdEluZGV4KSkge1xuICAgIHByb3ZpZGVyLm5nQWZ0ZXJDb250ZW50SW5pdCgpO1xuICB9XG4gIGlmIChsaWZlY3ljbGVzICYgTm9kZUZsYWdzLkFmdGVyQ29udGVudENoZWNrZWQpIHtcbiAgICBwcm92aWRlci5uZ0FmdGVyQ29udGVudENoZWNrZWQoKTtcbiAgfVxuICBpZiAobGlmZWN5Y2xlcyAmIE5vZGVGbGFncy5BZnRlclZpZXdJbml0ICYmXG4gICAgICBzaG91bGRDYWxsTGlmZWN5Y2xlSW5pdEhvb2sodmlldywgVmlld1N0YXRlLkluaXRTdGF0ZV9DYWxsaW5nQWZ0ZXJWaWV3SW5pdCwgaW5pdEluZGV4KSkge1xuICAgIHByb3ZpZGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICB9XG4gIGlmIChsaWZlY3ljbGVzICYgTm9kZUZsYWdzLkFmdGVyVmlld0NoZWNrZWQpIHtcbiAgICBwcm92aWRlci5uZ0FmdGVyVmlld0NoZWNrZWQoKTtcbiAgfVxuICBpZiAobGlmZWN5Y2xlcyAmIE5vZGVGbGFncy5PbkRlc3Ryb3kpIHtcbiAgICBwcm92aWRlci5uZ09uRGVzdHJveSgpO1xuICB9XG59XG4iXX0=