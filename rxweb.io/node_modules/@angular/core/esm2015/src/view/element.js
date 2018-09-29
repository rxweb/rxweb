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
import { SecurityContext } from '../sanitization/security';
import { asElementData } from './types';
import { NOOP, calcBindingFlags, checkAndUpdateBinding, dispatchEvent, elementEventFullName, getParentRenderElement, resolveDefinition, resolveRendererType2, splitMatchedQueriesDsl, splitNamespace } from './util';
/**
 * @param {?} flags
 * @param {?} matchedQueriesDsl
 * @param {?} ngContentIndex
 * @param {?} childCount
 * @param {?=} handleEvent
 * @param {?=} templateFactory
 * @return {?}
 */
export function anchorDef(flags, matchedQueriesDsl, ngContentIndex, childCount, handleEvent, templateFactory) {
    flags |= 1 /* TypeElement */;
    const { matchedQueries, references, matchedQueryIds } = splitMatchedQueriesDsl(matchedQueriesDsl);
    /** @type {?} */
    const template = templateFactory ? resolveDefinition(templateFactory) : null;
    return {
        // will bet set by the view definition
        nodeIndex: -1,
        parent: null,
        renderParent: null,
        bindingIndex: -1,
        outputIndex: -1,
        // regular values
        flags,
        checkIndex: -1,
        childFlags: 0,
        directChildFlags: 0,
        childMatchedQueries: 0, matchedQueries, matchedQueryIds, references, ngContentIndex, childCount,
        bindings: [],
        bindingFlags: 0,
        outputs: [],
        element: {
            ns: null,
            name: null,
            attrs: null, template,
            componentProvider: null,
            componentView: null,
            componentRendererType: null,
            publicProviders: null,
            allProviders: null,
            handleEvent: handleEvent || NOOP
        },
        provider: null,
        text: null,
        query: null,
        ngContent: null
    };
}
/**
 * @param {?} checkIndex
 * @param {?} flags
 * @param {?} matchedQueriesDsl
 * @param {?} ngContentIndex
 * @param {?} childCount
 * @param {?} namespaceAndName
 * @param {?=} fixedAttrs
 * @param {?=} bindings
 * @param {?=} outputs
 * @param {?=} handleEvent
 * @param {?=} componentView
 * @param {?=} componentRendererType
 * @return {?}
 */
export function elementDef(checkIndex, flags, matchedQueriesDsl, ngContentIndex, childCount, namespaceAndName, fixedAttrs = [], bindings, outputs, handleEvent, componentView, componentRendererType) {
    if (!handleEvent) {
        handleEvent = NOOP;
    }
    const { matchedQueries, references, matchedQueryIds } = splitMatchedQueriesDsl(matchedQueriesDsl);
    /** @type {?} */
    let ns = /** @type {?} */ ((null));
    /** @type {?} */
    let name = /** @type {?} */ ((null));
    if (namespaceAndName) {
        [ns, name] = splitNamespace(namespaceAndName);
    }
    bindings = bindings || [];
    /** @type {?} */
    const bindingDefs = new Array(bindings.length);
    for (let i = 0; i < bindings.length; i++) {
        const [bindingFlags, namespaceAndName, suffixOrSecurityContext] = bindings[i];
        const [ns, name] = splitNamespace(namespaceAndName);
        /** @type {?} */
        let securityContext = /** @type {?} */ ((undefined));
        /** @type {?} */
        let suffix = /** @type {?} */ ((undefined));
        switch (bindingFlags & 15 /* Types */) {
            case 4 /* TypeElementStyle */:
                suffix = /** @type {?} */ (suffixOrSecurityContext);
                break;
            case 1 /* TypeElementAttribute */:
            case 8 /* TypeProperty */:
                securityContext = /** @type {?} */ (suffixOrSecurityContext);
                break;
        }
        bindingDefs[i] =
            { flags: bindingFlags, ns, name, nonMinifiedName: name, securityContext, suffix };
    }
    outputs = outputs || [];
    /** @type {?} */
    const outputDefs = new Array(outputs.length);
    for (let i = 0; i < outputs.length; i++) {
        const [target, eventName] = outputs[i];
        outputDefs[i] = {
            type: 0 /* ElementOutput */,
            target: /** @type {?} */ (target), eventName,
            propName: null
        };
    }
    fixedAttrs = fixedAttrs || [];
    /** @type {?} */
    const attrs = /** @type {?} */ (fixedAttrs.map(([namespaceAndName, value]) => {
        const [ns, name] = splitNamespace(namespaceAndName);
        return [ns, name, value];
    }));
    componentRendererType = resolveRendererType2(componentRendererType);
    if (componentView) {
        flags |= 33554432 /* ComponentView */;
    }
    flags |= 1 /* TypeElement */;
    return {
        // will bet set by the view definition
        nodeIndex: -1,
        parent: null,
        renderParent: null,
        bindingIndex: -1,
        outputIndex: -1,
        // regular values
        checkIndex,
        flags,
        childFlags: 0,
        directChildFlags: 0,
        childMatchedQueries: 0, matchedQueries, matchedQueryIds, references, ngContentIndex, childCount,
        bindings: bindingDefs,
        bindingFlags: calcBindingFlags(bindingDefs),
        outputs: outputDefs,
        element: {
            ns,
            name,
            attrs,
            template: null,
            // will bet set by the view definition
            componentProvider: null,
            componentView: componentView || null,
            componentRendererType: componentRendererType,
            publicProviders: null,
            allProviders: null,
            handleEvent: handleEvent || NOOP,
        },
        provider: null,
        text: null,
        query: null,
        ngContent: null
    };
}
/**
 * @param {?} view
 * @param {?} renderHost
 * @param {?} def
 * @return {?}
 */
export function createElement(view, renderHost, def) {
    /** @type {?} */
    const elDef = /** @type {?} */ ((def.element));
    /** @type {?} */
    const rootSelectorOrNode = view.root.selectorOrNode;
    /** @type {?} */
    const renderer = view.renderer;
    /** @type {?} */
    let el;
    if (view.parent || !rootSelectorOrNode) {
        if (elDef.name) {
            el = renderer.createElement(elDef.name, elDef.ns);
        }
        else {
            el = renderer.createComment('');
        }
        /** @type {?} */
        const parentEl = getParentRenderElement(view, renderHost, def);
        if (parentEl) {
            renderer.appendChild(parentEl, el);
        }
    }
    else {
        el = renderer.selectRootElement(rootSelectorOrNode);
    }
    if (elDef.attrs) {
        for (let i = 0; i < elDef.attrs.length; i++) {
            const [ns, name, value] = elDef.attrs[i];
            renderer.setAttribute(el, name, value, ns);
        }
    }
    return el;
}
/**
 * @param {?} view
 * @param {?} compView
 * @param {?} def
 * @param {?} el
 * @return {?}
 */
export function listenToElementOutputs(view, compView, def, el) {
    for (let i = 0; i < def.outputs.length; i++) {
        /** @type {?} */
        const output = def.outputs[i];
        /** @type {?} */
        const handleEventClosure = renderEventHandlerClosure(view, def.nodeIndex, elementEventFullName(output.target, output.eventName));
        /** @type {?} */
        let listenTarget = output.target;
        /** @type {?} */
        let listenerView = view;
        if (output.target === 'component') {
            listenTarget = null;
            listenerView = compView;
        }
        /** @type {?} */
        const disposable = /** @type {?} */ (listenerView.renderer.listen(listenTarget || el, output.eventName, handleEventClosure)); /** @type {?} */
        ((view.disposables))[def.outputIndex + i] = disposable;
    }
}
/**
 * @param {?} view
 * @param {?} index
 * @param {?} eventName
 * @return {?}
 */
function renderEventHandlerClosure(view, index, eventName) {
    return (event) => dispatchEvent(view, index, eventName, event);
}
/**
 * @param {?} view
 * @param {?} def
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
export function checkAndUpdateElementInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    /** @type {?} */
    const bindLen = def.bindings.length;
    /** @type {?} */
    let changed = false;
    if (bindLen > 0 && checkAndUpdateElementValue(view, def, 0, v0))
        changed = true;
    if (bindLen > 1 && checkAndUpdateElementValue(view, def, 1, v1))
        changed = true;
    if (bindLen > 2 && checkAndUpdateElementValue(view, def, 2, v2))
        changed = true;
    if (bindLen > 3 && checkAndUpdateElementValue(view, def, 3, v3))
        changed = true;
    if (bindLen > 4 && checkAndUpdateElementValue(view, def, 4, v4))
        changed = true;
    if (bindLen > 5 && checkAndUpdateElementValue(view, def, 5, v5))
        changed = true;
    if (bindLen > 6 && checkAndUpdateElementValue(view, def, 6, v6))
        changed = true;
    if (bindLen > 7 && checkAndUpdateElementValue(view, def, 7, v7))
        changed = true;
    if (bindLen > 8 && checkAndUpdateElementValue(view, def, 8, v8))
        changed = true;
    if (bindLen > 9 && checkAndUpdateElementValue(view, def, 9, v9))
        changed = true;
    return changed;
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} values
 * @return {?}
 */
export function checkAndUpdateElementDynamic(view, def, values) {
    /** @type {?} */
    let changed = false;
    for (let i = 0; i < values.length; i++) {
        if (checkAndUpdateElementValue(view, def, i, values[i]))
            changed = true;
    }
    return changed;
}
/**
 * @param {?} view
 * @param {?} def
 * @param {?} bindingIdx
 * @param {?} value
 * @return {?}
 */
function checkAndUpdateElementValue(view, def, bindingIdx, value) {
    if (!checkAndUpdateBinding(view, def, bindingIdx, value)) {
        return false;
    }
    /** @type {?} */
    const binding = def.bindings[bindingIdx];
    /** @type {?} */
    const elData = asElementData(view, def.nodeIndex);
    /** @type {?} */
    const renderNode = elData.renderElement;
    /** @type {?} */
    const name = /** @type {?} */ ((binding.name));
    switch (binding.flags & 15 /* Types */) {
        case 1 /* TypeElementAttribute */:
            setElementAttribute(view, binding, renderNode, binding.ns, name, value);
            break;
        case 2 /* TypeElementClass */:
            setElementClass(view, renderNode, name, value);
            break;
        case 4 /* TypeElementStyle */:
            setElementStyle(view, binding, renderNode, name, value);
            break;
        case 8 /* TypeProperty */:
            /** @type {?} */
            const bindView = (def.flags & 33554432 /* ComponentView */ &&
                binding.flags & 32 /* SyntheticHostProperty */) ?
                elData.componentView :
                view;
            setElementProperty(bindView, binding, renderNode, name, value);
            break;
    }
    return true;
}
/**
 * @param {?} view
 * @param {?} binding
 * @param {?} renderNode
 * @param {?} ns
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
function setElementAttribute(view, binding, renderNode, ns, name, value) {
    /** @type {?} */
    const securityContext = binding.securityContext;
    /** @type {?} */
    let renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
    renderValue = renderValue != null ? renderValue.toString() : null;
    /** @type {?} */
    const renderer = view.renderer;
    if (value != null) {
        renderer.setAttribute(renderNode, name, renderValue, ns);
    }
    else {
        renderer.removeAttribute(renderNode, name, ns);
    }
}
/**
 * @param {?} view
 * @param {?} renderNode
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
function setElementClass(view, renderNode, name, value) {
    /** @type {?} */
    const renderer = view.renderer;
    if (value) {
        renderer.addClass(renderNode, name);
    }
    else {
        renderer.removeClass(renderNode, name);
    }
}
/**
 * @param {?} view
 * @param {?} binding
 * @param {?} renderNode
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
function setElementStyle(view, binding, renderNode, name, value) {
    /** @type {?} */
    let renderValue = view.root.sanitizer.sanitize(SecurityContext.STYLE, /** @type {?} */ (value));
    if (renderValue != null) {
        renderValue = renderValue.toString();
        /** @type {?} */
        const unit = binding.suffix;
        if (unit != null) {
            renderValue = renderValue + unit;
        }
    }
    else {
        renderValue = null;
    }
    /** @type {?} */
    const renderer = view.renderer;
    if (renderValue != null) {
        renderer.setStyle(renderNode, name, renderValue);
    }
    else {
        renderer.removeStyle(renderNode, name);
    }
}
/**
 * @param {?} view
 * @param {?} binding
 * @param {?} renderNode
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
function setElementProperty(view, binding, renderNode, name, value) {
    /** @type {?} */
    const securityContext = binding.securityContext;
    /** @type {?} */
    let renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
    view.renderer.setProperty(renderNode, name, renderValue);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3ZpZXcvZWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVNBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RCxPQUFPLEVBQTBKLGFBQWEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUMvTCxPQUFPLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7Ozs7QUFFbk4sTUFBTSxvQkFDRixLQUFnQixFQUFFLGlCQUE2RCxFQUMvRSxjQUE2QixFQUFFLFVBQWtCLEVBQUUsV0FBeUMsRUFDNUYsZUFBdUM7SUFDekMsS0FBSyx1QkFBeUIsQ0FBQztJQUMvQixNQUFNLEVBQUMsY0FBYyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUMsR0FBRyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztJQUNoRyxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFFN0UsT0FBTzs7UUFFTCxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxFQUFFLElBQUk7UUFDWixZQUFZLEVBQUUsSUFBSTtRQUNsQixZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLFdBQVcsRUFBRSxDQUFDLENBQUM7O1FBRWYsS0FBSztRQUNMLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDZCxVQUFVLEVBQUUsQ0FBQztRQUNiLGdCQUFnQixFQUFFLENBQUM7UUFDbkIsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFLGNB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LENBQUM7UUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2hGLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2hGLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2hGLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2hGLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2hGLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2hGLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2hGLE9BQU8sT0FBTyxDQUFDO0NBQ2hCOzs7Ozs7O0FBRUQsTUFBTSx1Q0FBdUMsSUFBYyxFQUFFLEdBQVksRUFBRSxNQUFhOztJQUN0RixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBSSwwQkFBMEIsQ0FBQyxJQUFJLEVBQUUs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LFVBQVUsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7Q0FDMUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UmVuZGVyZXJUeXBlMn0gZnJvbSAnLi4vcmVuZGVyL2FwaSc7XG5pbXBvcnQge1NlY3VyaXR5Q29udGV4dH0gZnJvbSAnLi4vc2FuaXRpemF0aW9uL3NlY3VyaXR5JztcblxuaW1wb3J0IHtCaW5kaW5nRGVmLCBCaW5kaW5nRmxhZ3MsIEVsZW1lbnREYXRhLCBFbGVtZW50SGFuZGxlRXZlbnRGbiwgTm9kZURlZiwgTm9kZUZsYWdzLCBPdXRwdXREZWYsIE91dHB1dFR5cGUsIFF1ZXJ5VmFsdWVUeXBlLCBWaWV3RGF0YSwgVmlld0RlZmluaXRpb25GYWN0b3J5LCBhc0VsZW1lbnREYXRhfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7Tk9PUCwgY2FsY0JpbmRpbmdGbGFncywgY2hlY2tBbmRVcGRhdGVCaW5kaW5nLCBkaXNwYXRjaEV2ZW50LCBlbGVtZW50RXZlbnRGdWxsTmFtZSwgZ2V0UGFyZW50UmVuZGVyRWxlbWVudCwgcmVzb2x2ZURlZmluaXRpb24sIHJlc29sdmVSZW5kZXJlclR5cGUyLCBzcGxpdE1hdGNoZWRRdWVyaWVzRHNsLCBzcGxpdE5hbWVzcGFjZX0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFuY2hvckRlZihcbiAgICBmbGFnczogTm9kZUZsYWdzLCBtYXRjaGVkUXVlcmllc0RzbDogbnVsbCB8IFtzdHJpbmcgfCBudW1iZXIsIFF1ZXJ5VmFsdWVUeXBlXVtdLFxuICAgIG5nQ29udGVudEluZGV4OiBudWxsIHwgbnVtYmVyLCBjaGlsZENvdW50OiBudW1iZXIsIGhhbmRsZUV2ZW50PzogbnVsbCB8IEVsZW1lbnRIYW5kbGVFdmVudEZuLFxuICAgIHRlbXBsYXRlRmFjdG9yeT86IFZpZXdEZWZpbml0aW9uRmFjdG9yeSk6IE5vZGVEZWYge1xuICBmbGFncyB8PSBOb2RlRmxhZ3MuVHlwZUVsZW1lbnQ7XG4gIGNvbnN0IHttYXRjaGVkUXVlcmllcywgcmVmZXJlbmNlcywgbWF0Y2hlZFF1ZXJ5SWRzfSA9IHNwbGl0TWF0Y2hlZFF1ZXJpZXNEc2wobWF0Y2hlZFF1ZXJpZXNEc2wpO1xuICBjb25zdCB0ZW1wbGF0ZSA9IHRlbXBsYXRlRmFjdG9yeSA/IHJlc29sdmVEZWZpbml0aW9uKHRlbXBsYXRlRmFjdG9yeSkgOiBudWxsO1xuXG4gIHJldHVybiB7XG4gICAgLy8gd2lsbCBiZXQgc2V0IGJ5IHRoZSB2aWV3IGRlZmluaXRpb25cbiAgICBub2RlSW5kZXg6IC0xLFxuICAgIHBhcmVudDogbnVsbCxcbiAgICByZW5kZXJQYXJlbnQ6IG51bGwsXG4gICAgYmluZGluZ0luZGV4OiAtMSxcbiAgICBvdXRwdXRJbmRleDogLTEsXG4gICAgLy8gcmVndWxhciB2YWx1ZXNcbiAgICBmbGFncyxcbiAgICBjaGVja0luZGV4OiAtMSxcbiAgICBjaGlsZEZsYWdzOiAwLFxuICAgIGRpcmVjdENoaWxkRmxhZ3M6IDAsXG4gICAgY2hpbGRNYXRjaGVkUXVlcmllczogMCwgbWF0Y2hlZFF1ZXJpZXMsIG1hdGNoZWRRdWVyeUlkcywgcmVmZXJlbmNlcywgbmdDb250ZW50SW5kZXgsIGNoaWxkQ291bnQsXG4gICAgYmluZGluZ3M6IFtdLFxuICAgIGJpbmRpbmdGbGFnczogMCxcbiAgICBvdXRwdXRzOiBbXSxcbiAgICBlbGVtZW50OiB7XG4gICAgICBuczogbnVsbCxcbiAgICAgIG5hbWU6IG51bGwsXG4gICAgICBhdHRyczogbnVsbCwgdGVtcGxhdGUsXG4gICAgICBjb21wb25lbnRQcm92aWRlcjogbnVsbCxcbiAgICAgIGNvbXBvbmVudFZpZXc6IG51bGwsXG4gICAgICBjb21wb25lbnRSZW5kZXJlclR5cGU6IG51bGwsXG4gICAgICBwdWJsaWNQcm92aWRlcnM6IG51bGwsXG4gICAgICBhbGxQcm92aWRlcnM6IG51bGwsXG4gICAgICBoYW5kbGVFdmVudDogaGFuZGxlRXZlbnQgfHwgTk9PUFxuICAgIH0sXG4gICAgcHJvdmlkZXI6IG51bGwsXG4gICAgdGV4dDogbnVsbCxcbiAgICBxdWVyeTogbnVsbCxcbiAgICBuZ0NvbnRlbnQ6IG51bGxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnREZWYoXG4gICAgY2hlY2tJbmRleDogbnVtYmVyLCBmbGFnczogTm9kZUZsYWdzLFxuICAgIG1hdGNoZWRRdWVyaWVzRHNsOiBudWxsIHwgW3N0cmluZyB8IG51bWJlciwgUXVlcnlWYWx1ZVR5cGVdW10sIG5nQ29udGVudEluZGV4OiBudWxsIHwgbnVtYmVyLFxuICAgIGNoaWxkQ291bnQ6IG51bWJlciwgbmFtZXNwYWNlQW5kTmFtZTogc3RyaW5nIHwgbnVsbCwgZml4ZWRBdHRyczogbnVsbCB8IFtzdHJpbmcsIHN0cmluZ11bXSA9IFtdLFxuICAgIGJpbmRpbmdzPzogbnVsbCB8IFtCaW5kaW5nRmxhZ3MsIHN0cmluZywgc3RyaW5nIHwgU2VjdXJpdHlDb250ZXh0IHwgbnVsbF1bXSxcbiAgICBvdXRwdXRzPzogbnVsbCB8IChbc3RyaW5nLCBzdHJpbmddKVtdLCBoYW5kbGVFdmVudD86IG51bGwgfCBFbGVtZW50SGFuZGxlRXZlbnRGbixcbiAgICBjb21wb25lbnRWaWV3PzogbnVsbCB8IFZpZXdEZWZpbml0aW9uRmFjdG9yeSxcbiAgICBjb21wb25lbnRSZW5kZXJlclR5cGU/OiBSZW5kZXJlclR5cGUyIHwgbnVsbCk6IE5vZGVEZWYge1xuICBpZiAoIWhhbmRsZUV2ZW50KSB7XG4gICAgaGFuZGxlRXZlbnQgPSBOT09QO1xuICB9XG4gIGNvbnN0IHttYXRjaGVkUXVlcmllcywgcmVmZXJlbmNlcywgbWF0Y2hlZFF1ZXJ5SWRzfSA9IHNwbGl0TWF0Y2hlZFF1ZXJpZXNEc2wobWF0Y2hlZFF1ZXJpZXNEc2wpO1xuICBsZXQgbnM6IHN0cmluZyA9IG51bGwgITtcbiAgbGV0IG5hbWU6IHN0cmluZyA9IG51bGwgITtcbiAgaWYgKG5hbWVzcGFjZUFuZE5hbWUpIHtcbiAgICBbbnMsIG5hbWVdID0gc3BsaXROYW1lc3BhY2UobmFtZXNwYWNlQW5kTmFtZSk7XG4gIH1cbiAgYmluZGluZ3MgPSBiaW5kaW5ncyB8fCBbXTtcbiAgY29uc3QgYmluZGluZ0RlZnM6IEJpbmRpbmdEZWZbXSA9IG5ldyBBcnJheShiaW5kaW5ncy5sZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgW2JpbmRpbmdGbGFncywgbmFtZXNwYWNlQW5kTmFtZSwgc3VmZml4T3JTZWN1cml0eUNvbnRleHRdID0gYmluZGluZ3NbaV07XG5cbiAgICBjb25zdCBbbnMsIG5hbWVdID0gc3BsaXROYW1lc3BhY2UobmFtZXNwYWNlQW5kTmFtZSk7XG4gICAgbGV0IHNlY3VyaXR5Q29udGV4dDogU2VjdXJpdHlDb250ZXh0ID0gdW5kZWZpbmVkICE7XG4gICAgbGV0IHN1ZmZpeDogc3RyaW5nID0gdW5kZWZpbmVkICE7XG4gICAgc3dpdGNoIChiaW5kaW5nRmxhZ3MgJiBCaW5kaW5nRmxhZ3MuVHlwZXMpIHtcbiAgICAgIGNhc2UgQmluZGluZ0ZsYWdzLlR5cGVFbGVtZW50U3R5bGU6XG4gICAgICAgIHN1ZmZpeCA9IDxzdHJpbmc+c3VmZml4T3JTZWN1cml0eUNvbnRleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBCaW5kaW5nRmxhZ3MuVHlwZUVsZW1lbnRBdHRyaWJ1dGU6XG4gICAgICBjYXNlIEJpbmRpbmdGbGFncy5UeXBlUHJvcGVydHk6XG4gICAgICAgIHNlY3VyaXR5Q29udGV4dCA9IDxTZWN1cml0eUNvbnRleHQ+c3VmZml4T3JTZWN1cml0eUNvbnRleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBiaW5kaW5nRGVmc1tpXSA9XG4gICAgICAgIHtmbGFnczogYmluZGluZ0ZsYWdzLCBucywgbmFtZSwgbm9uTWluaWZpZWROYW1lOiBuYW1lLCBzZWN1cml0eUNvbnRleHQsIHN1ZmZpeH07XG4gIH1cbiAgb3V0cHV0cyA9IG91dHB1dHMgfHwgW107XG4gIGNvbnN0IG91dHB1dERlZnM6IE91dHB1dERlZltdID0gbmV3IEFycmF5KG91dHB1dHMubGVuZ3RoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgW3RhcmdldCwgZXZlbnROYW1lXSA9IG91dHB1dHNbaV07XG4gICAgb3V0cHV0RGVmc1tpXSA9IHtcbiAgICAgIHR5cGU6IE91dHB1dFR5cGUuRWxlbWVudE91dHB1dCxcbiAgICAgIHRhcmdldDogPGFueT50YXJnZXQsIGV2ZW50TmFtZSxcbiAgICAgIHByb3BOYW1lOiBudWxsXG4gICAgfTtcbiAgfVxuICBmaXhlZEF0dHJzID0gZml4ZWRBdHRycyB8fCBbXTtcbiAgY29uc3QgYXR0cnMgPSA8W3N0cmluZywgc3RyaW5nLCBzdHJpbmddW10+Zml4ZWRBdHRycy5tYXAoKFtuYW1lc3BhY2VBbmROYW1lLCB2YWx1ZV0pID0+IHtcbiAgICBjb25zdCBbbnMsIG5hbWVdID0gc3BsaXROYW1lc3BhY2UobmFtZXNwYWNlQW5kTmFtZSk7XG4gICAgcmV0dXJuIFtucywgbmFtZSwgdmFsdWVdO1xuICB9KTtcbiAgY29tcG9uZW50UmVuZGVyZXJUeXBlID0gcmVzb2x2ZVJlbmRlcmVyVHlwZTIoY29tcG9uZW50UmVuZGVyZXJUeXBlKTtcbiAgaWYgKGNvbXBvbmVudFZpZXcpIHtcbiAgICBmbGFncyB8PSBOb2RlRmxhZ3MuQ29tcG9uZW50VmlldztcbiAgfVxuICBmbGFncyB8PSBOb2RlRmxhZ3MuVHlwZUVsZW1lbnQ7XG4gIHJldHVybiB7XG4gICAgLy8gd2lsbCBiZXQgc2V0IGJ5IHRoZSB2aWV3IGRlZmluaXRpb25cbiAgICBub2RlSW5kZXg6IC0xLFxuICAgIHBhcmVudDogbnVsbCxcbiAgICByZW5kZXJQYXJlbnQ6IG51bGwsXG4gICAgYmluZGluZ0luZGV4OiAtMSxcbiAgICBvdXRwdXRJbmRleDogLTEsXG4gICAgLy8gcmVndWxhciB2YWx1ZXNcbiAgICBjaGVja0luZGV4LFxuICAgIGZsYWdzLFxuICAgIGNoaWxkRmxhZ3M6IDAsXG4gICAgZGlyZWN0Q2hpbGRGbGFnczogMCxcbiAgICBjaGlsZE1hdGNoZWRRdWVyaWVzOiAwLCBtYXRjaGVkUXVlcmllcywgbWF0Y2hlZFF1ZXJ5SWRzLCByZWZlcmVuY2VzLCBuZ0NvbnRlbnRJbmRleCwgY2hpbGRDb3VudCxcbiAgICBiaW5kaW5nczogYmluZGluZ0RlZnMsXG4gICAgYmluZGluZ0ZsYWdzOiBjYWxjQmluZGluZ0ZsYWdzKGJpbmRpbmdEZWZzKSxcbiAgICBvdXRwdXRzOiBvdXRwdXREZWZzLFxuICAgIGVsZW1lbnQ6IHtcbiAgICAgIG5zLFxuICAgICAgbmFtZSxcbiAgICAgIGF0dHJzLFxuICAgICAgdGVtcGxhdGU6IG51bGwsXG4gICAgICAvLyB3aWxsIGJldCBzZXQgYnkgdGhlIHZpZXcgZGVmaW5pdGlvblxuICAgICAgY29tcG9uZW50UHJvdmlkZXI6IG51bGwsXG4gICAgICBjb21wb25lbnRWaWV3OiBjb21wb25lbnRWaWV3IHx8IG51bGwsXG4gICAgICBjb21wb25lbnRSZW5kZXJlclR5cGU6IGNvbXBvbmVudFJlbmRlcmVyVHlwZSxcbiAgICAgIHB1YmxpY1Byb3ZpZGVyczogbnVsbCxcbiAgICAgIGFsbFByb3ZpZGVyczogbnVsbCxcbiAgICAgIGhhbmRsZUV2ZW50OiBoYW5kbGVFdmVudCB8fCBOT09QLFxuICAgIH0sXG4gICAgcHJvdmlkZXI6IG51bGwsXG4gICAgdGV4dDogbnVsbCxcbiAgICBxdWVyeTogbnVsbCxcbiAgICBuZ0NvbnRlbnQ6IG51bGxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodmlldzogVmlld0RhdGEsIHJlbmRlckhvc3Q6IGFueSwgZGVmOiBOb2RlRGVmKTogRWxlbWVudERhdGEge1xuICBjb25zdCBlbERlZiA9IGRlZi5lbGVtZW50ICE7XG4gIGNvbnN0IHJvb3RTZWxlY3Rvck9yTm9kZSA9IHZpZXcucm9vdC5zZWxlY3Rvck9yTm9kZTtcbiAgY29uc3QgcmVuZGVyZXIgPSB2aWV3LnJlbmRlcmVyO1xuICBsZXQgZWw6IGFueTtcbiAgaWYgKHZpZXcucGFyZW50IHx8ICFyb290U2VsZWN0b3JPck5vZGUpIHtcbiAgICBpZiAoZWxEZWYubmFtZSkge1xuICAgICAgZWwgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KGVsRGVmLm5hbWUsIGVsRGVmLm5zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwgPSByZW5kZXJlci5jcmVhdGVDb21tZW50KCcnKTtcbiAgICB9XG4gICAgY29uc3QgcGFyZW50RWwgPSBnZXRQYXJlbnRSZW5kZXJFbGVtZW50KHZpZXcsIHJlbmRlckhvc3QsIGRlZik7XG4gICAgaWYgKHBhcmVudEVsKSB7XG4gICAgICByZW5kZXJlci5hcHBlbmRDaGlsZChwYXJlbnRFbCwgZWwpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBlbCA9IHJlbmRlcmVyLnNlbGVjdFJvb3RFbGVtZW50KHJvb3RTZWxlY3Rvck9yTm9kZSk7XG4gIH1cbiAgaWYgKGVsRGVmLmF0dHJzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbERlZi5hdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgW25zLCBuYW1lLCB2YWx1ZV0gPSBlbERlZi5hdHRyc1tpXTtcbiAgICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUsIG5zKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuVG9FbGVtZW50T3V0cHV0cyh2aWV3OiBWaWV3RGF0YSwgY29tcFZpZXc6IFZpZXdEYXRhLCBkZWY6IE5vZGVEZWYsIGVsOiBhbnkpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWYub3V0cHV0cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG91dHB1dCA9IGRlZi5vdXRwdXRzW2ldO1xuICAgIGNvbnN0IGhhbmRsZUV2ZW50Q2xvc3VyZSA9IHJlbmRlckV2ZW50SGFuZGxlckNsb3N1cmUoXG4gICAgICAgIHZpZXcsIGRlZi5ub2RlSW5kZXgsIGVsZW1lbnRFdmVudEZ1bGxOYW1lKG91dHB1dC50YXJnZXQsIG91dHB1dC5ldmVudE5hbWUpKTtcbiAgICBsZXQgbGlzdGVuVGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3wnY29tcG9uZW50J3xudWxsID0gb3V0cHV0LnRhcmdldDtcbiAgICBsZXQgbGlzdGVuZXJWaWV3ID0gdmlldztcbiAgICBpZiAob3V0cHV0LnRhcmdldCA9PT0gJ2NvbXBvbmVudCcpIHtcbiAgICAgIGxpc3RlblRhcmdldCA9IG51bGw7XG4gICAgICBsaXN0ZW5lclZpZXcgPSBjb21wVmlldztcbiAgICB9XG4gICAgY29uc3QgZGlzcG9zYWJsZSA9XG4gICAgICAgIDxhbnk+bGlzdGVuZXJWaWV3LnJlbmRlcmVyLmxpc3RlbihsaXN0ZW5UYXJnZXQgfHwgZWwsIG91dHB1dC5ldmVudE5hbWUsIGhhbmRsZUV2ZW50Q2xvc3VyZSk7XG4gICAgdmlldy5kaXNwb3NhYmxlcyAhW2RlZi5vdXRwdXRJbmRleCArIGldID0gZGlzcG9zYWJsZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJFdmVudEhhbmRsZXJDbG9zdXJlKHZpZXc6IFZpZXdEYXRhLCBpbmRleDogbnVtYmVyLCBldmVudE5hbWU6IHN0cmluZykge1xuICByZXR1cm4gKGV2ZW50OiBhbnkpID0+IGRpc3BhdGNoRXZlbnQodmlldywgaW5kZXgsIGV2ZW50TmFtZSwgZXZlbnQpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0FuZFVwZGF0ZUVsZW1lbnRJbmxpbmUoXG4gICAgdmlldzogVmlld0RhdGEsIGRlZjogTm9kZURlZiwgdjA6IGFueSwgdjE6IGFueSwgdjI6IGFueSwgdjM6IGFueSwgdjQ6IGFueSwgdjU6IGFueSwgdjY6IGFueSxcbiAgICB2NzogYW55LCB2ODogYW55LCB2OTogYW55KTogYm9vbGVhbiB7XG4gIGNvbnN0IGJpbmRMZW4gPSBkZWYuYmluZGluZ3MubGVuZ3RoO1xuICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICBpZiAoYmluZExlbiA+IDAgJiYgY2hlY2tBbmRVcGRhdGVFbGVtZW50VmFsdWUodmlldywgZGVmLCAwLCB2MCkpIGNoYW5nZWQgPSB0cnVlO1xuICBpZiAoYmluZExlbiA+IDEgJiYgY2hlY2tBbmRVcGRhdGVFbGVtZW50VmFsdWUodmlldywgZGVmLCAxLCB2MSkpIGNoYW5nZWQgPSB0cnVlO1xuICBpZiAoYmluZExlbiA+IDIgJiYgY2hlY2tBbmRVcGRhdGVFbGVtZW50VmFsdWUodmlldywgZGVmLCAyLCB2MikpIGNoYW5nZWQgPSB0cnVlO1xuICBpZiAoYmluZExlbiA+IDMgJiYgY2hlY2tBbmRVcGRhdGVFbGVtZW50VmFsdWUodmlldywgZGVmLCAzLCB2MykpIGNoYW5nZWQgPSB0cnVlO1xuICBpZiAoYmluZExlbiA+IDQgJiYgY2hlY2tBbmRVcGRhdGVFbGVtZW50VmFsdWUodmlldywgZGVmLCA0LCB2NCkpIGNoYW5nZWQgPSB0cnVlO1xuICBpZiAoYmluZExlbiA+IDUgJiYgY2hlY2tBbmRVcGRhdGVFbGVtZW50VmFsdWUodmlldywgZGVmLCA1LCB2NSkpIGNoYW5nZWQgPSB0cnVlO1xuICBpZiAoYmluZExlbiA+IDYgJiYgY2hlY2tBbmRVcGRhdGVFbGVtZW50VmFsdWUodmlldywgZGVmLCA2LCB2NikpIGNoYW5nZWQgPSB0cnVlO1xuICBpZiAoYmluZExlbiA+IDcgJiYgY2hlY2tBbmRVcGRhdGVFbGVtZW50VmFsdWUodmlldywgZGVmLCA3LCB2NykpIGNoYW5nZWQgPSB0cnVlO1xuICBpZiAoYmluZExlbiA+IDggJiYgY2hlY2tBbmRVcGRhdGVFbGVtZW50VmFsdWUodmlldywgZGVmLCA4LCB2OCkpIGNoYW5nZWQgPSB0cnVlO1xuICBpZiAoYmluZExlbiA+IDkgJiYgY2hlY2tBbmRVcGRhdGVFbGVtZW50VmFsdWUodmlldywgZGVmLCA5LCB2OSkpIGNoYW5nZWQgPSB0cnVlO1xuICByZXR1cm4gY2hhbmdlZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQW5kVXBkYXRlRWxlbWVudER5bmFtaWModmlldzogVmlld0RhdGEsIGRlZjogTm9kZURlZiwgdmFsdWVzOiBhbnlbXSk6IGJvb2xlYW4ge1xuICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjaGVja0FuZFVwZGF0ZUVsZW1lbnRWYWx1ZSh2aWV3LCBkZWYsIGksIHZhbHVlc1tpXSkpIGNoYW5nZWQgPSB0cnVlO1xuICB9XG4gIHJldHVybiBjaGFuZ2VkO1xufVxuXG5mdW5jdGlvbiBjaGVja0FuZFVwZGF0ZUVsZW1lbnRWYWx1ZSh2aWV3OiBWaWV3RGF0YSwgZGVmOiBOb2RlRGVmLCBiaW5kaW5nSWR4OiBudW1iZXIsIHZhbHVlOiBhbnkpIHtcbiAgaWYgKCFjaGVja0FuZFVwZGF0ZUJpbmRpbmcodmlldywgZGVmLCBiaW5kaW5nSWR4LCB2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgYmluZGluZyA9IGRlZi5iaW5kaW5nc1tiaW5kaW5nSWR4XTtcbiAgY29uc3QgZWxEYXRhID0gYXNFbGVtZW50RGF0YSh2aWV3LCBkZWYubm9kZUluZGV4KTtcbiAgY29uc3QgcmVuZGVyTm9kZSA9IGVsRGF0YS5yZW5kZXJFbGVtZW50O1xuICBjb25zdCBuYW1lID0gYmluZGluZy5uYW1lICE7XG4gIHN3aXRjaCAoYmluZGluZy5mbGFncyAmIEJpbmRpbmdGbGFncy5UeXBlcykge1xuICAgIGNhc2UgQmluZGluZ0ZsYWdzLlR5cGVFbGVtZW50QXR0cmlidXRlOlxuICAgICAgc2V0RWxlbWVudEF0dHJpYnV0ZSh2aWV3LCBiaW5kaW5nLCByZW5kZXJOb2RlLCBiaW5kaW5nLm5zLCBuYW1lLCB2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEJpbmRpbmdGbGFncy5UeXBlRWxlbWVudENsYXNzOlxuICAgICAgc2V0RWxlbWVudENsYXNzKHZpZXcsIHJlbmRlck5vZGUsIG5hbWUsIHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQmluZGluZ0ZsYWdzLlR5cGVFbGVtZW50U3R5bGU6XG4gICAgICBzZXRFbGVtZW50U3R5bGUodmlldywgYmluZGluZywgcmVuZGVyTm9kZSwgbmFtZSwgdmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBCaW5kaW5nRmxhZ3MuVHlwZVByb3BlcnR5OlxuICAgICAgY29uc3QgYmluZFZpZXcgPSAoZGVmLmZsYWdzICYgTm9kZUZsYWdzLkNvbXBvbmVudFZpZXcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmRpbmcuZmxhZ3MgJiBCaW5kaW5nRmxhZ3MuU3ludGhldGljSG9zdFByb3BlcnR5KSA/XG4gICAgICAgICAgZWxEYXRhLmNvbXBvbmVudFZpZXcgOlxuICAgICAgICAgIHZpZXc7XG4gICAgICBzZXRFbGVtZW50UHJvcGVydHkoYmluZFZpZXcsIGJpbmRpbmcsIHJlbmRlck5vZGUsIG5hbWUsIHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBzZXRFbGVtZW50QXR0cmlidXRlKFxuICAgIHZpZXc6IFZpZXdEYXRhLCBiaW5kaW5nOiBCaW5kaW5nRGVmLCByZW5kZXJOb2RlOiBhbnksIG5zOiBzdHJpbmcgfCBudWxsLCBuYW1lOiBzdHJpbmcsXG4gICAgdmFsdWU6IGFueSkge1xuICBjb25zdCBzZWN1cml0eUNvbnRleHQgPSBiaW5kaW5nLnNlY3VyaXR5Q29udGV4dDtcbiAgbGV0IHJlbmRlclZhbHVlID0gc2VjdXJpdHlDb250ZXh0ID8gdmlldy5yb290LnNhbml0aXplci5zYW5pdGl6ZShzZWN1cml0eUNvbnRleHQsIHZhbHVlKSA6IHZhbHVlO1xuICByZW5kZXJWYWx1ZSA9IHJlbmRlclZhbHVlICE9IG51bGwgPyByZW5kZXJWYWx1ZS50b1N0cmluZygpIDogbnVsbDtcbiAgY29uc3QgcmVuZGVyZXIgPSB2aWV3LnJlbmRlcmVyO1xuICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgIHJlbmRlcmVyLnNldEF0dHJpYnV0ZShyZW5kZXJOb2RlLCBuYW1lLCByZW5kZXJWYWx1ZSwgbnMpO1xuICB9IGVsc2Uge1xuICAgIHJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZShyZW5kZXJOb2RlLCBuYW1lLCBucyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0RWxlbWVudENsYXNzKHZpZXc6IFZpZXdEYXRhLCByZW5kZXJOb2RlOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4pIHtcbiAgY29uc3QgcmVuZGVyZXIgPSB2aWV3LnJlbmRlcmVyO1xuICBpZiAodmFsdWUpIHtcbiAgICByZW5kZXJlci5hZGRDbGFzcyhyZW5kZXJOb2RlLCBuYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZW5kZXJlci5yZW1vdmVDbGFzcyhyZW5kZXJOb2RlLCBuYW1lKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRFbGVtZW50U3R5bGUoXG4gICAgdmlldzogVmlld0RhdGEsIGJpbmRpbmc6IEJpbmRpbmdEZWYsIHJlbmRlck5vZGU6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gIGxldCByZW5kZXJWYWx1ZTogc3RyaW5nfG51bGwgPVxuICAgICAgdmlldy5yb290LnNhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuU1RZTEUsIHZhbHVlIGFze30gfCBzdHJpbmcpO1xuICBpZiAocmVuZGVyVmFsdWUgIT0gbnVsbCkge1xuICAgIHJlbmRlclZhbHVlID0gcmVuZGVyVmFsdWUudG9TdHJpbmcoKTtcbiAgICBjb25zdCB1bml0ID0gYmluZGluZy5zdWZmaXg7XG4gICAgaWYgKHVuaXQgIT0gbnVsbCkge1xuICAgICAgcmVuZGVyVmFsdWUgPSByZW5kZXJWYWx1ZSArIHVuaXQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlbmRlclZhbHVlID0gbnVsbDtcbiAgfVxuICBjb25zdCByZW5kZXJlciA9IHZpZXcucmVuZGVyZXI7XG4gIGlmIChyZW5kZXJWYWx1ZSAhPSBudWxsKSB7XG4gICAgcmVuZGVyZXIuc2V0U3R5bGUocmVuZGVyTm9kZSwgbmFtZSwgcmVuZGVyVmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHJlbmRlcmVyLnJlbW92ZVN0eWxlKHJlbmRlck5vZGUsIG5hbWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEVsZW1lbnRQcm9wZXJ0eShcbiAgICB2aWV3OiBWaWV3RGF0YSwgYmluZGluZzogQmluZGluZ0RlZiwgcmVuZGVyTm9kZTogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgY29uc3Qgc2VjdXJpdHlDb250ZXh0ID0gYmluZGluZy5zZWN1cml0eUNvbnRleHQ7XG4gIGxldCByZW5kZXJWYWx1ZSA9IHNlY3VyaXR5Q29udGV4dCA/IHZpZXcucm9vdC5zYW5pdGl6ZXIuc2FuaXRpemUoc2VjdXJpdHlDb250ZXh0LCB2YWx1ZSkgOiB2YWx1ZTtcbiAgdmlldy5yZW5kZXJlci5zZXRQcm9wZXJ0eShyZW5kZXJOb2RlLCBuYW1lLCByZW5kZXJWYWx1ZSk7XG59XG4iXX0=