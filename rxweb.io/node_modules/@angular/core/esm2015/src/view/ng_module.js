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
import { resolveForwardRef } from '../di/forward_ref';
import { INJECTOR, Injector, setCurrentInjector } from '../di/injector';
import { APP_ROOT } from '../di/scope';
import { NgModuleRef } from '../linker/ng_module_factory';
import { stringify } from '../util';
import { splitDepsDsl, tokenKey } from './util';
/** @type {?} */
const UNDEFINED_VALUE = new Object();
/** @type {?} */
const InjectorRefTokenKey = tokenKey(Injector);
/** @type {?} */
const INJECTORRefTokenKey = tokenKey(INJECTOR);
/** @type {?} */
const NgModuleRefTokenKey = tokenKey(NgModuleRef);
/**
 * @param {?} flags
 * @param {?} token
 * @param {?} value
 * @param {?} deps
 * @return {?}
 */
export function moduleProvideDef(flags, token, value, deps) {
    // Need to resolve forwardRefs as e.g. for `useValue` we
    // lowered the expression and then stopped evaluating it,
    // i.e. also didn't unwrap it.
    value = resolveForwardRef(value);
    /** @type {?} */
    const depDefs = splitDepsDsl(deps, stringify(token));
    return {
        // will bet set by the module definition
        index: -1,
        deps: depDefs, flags, token, value
    };
}
/**
 * @param {?} providers
 * @return {?}
 */
export function moduleDef(providers) {
    /** @type {?} */
    const providersByKey = {};
    /** @type {?} */
    const modules = [];
    /** @type {?} */
    let isRoot = false;
    for (let i = 0; i < providers.length; i++) {
        /** @type {?} */
        const provider = providers[i];
        if (provider.token === APP_ROOT && provider.value === true) {
            isRoot = true;
        }
        if (provider.flags & 1073741824 /* TypeNgModule */) {
            modules.push(provider.token);
        }
        provider.index = i;
        providersByKey[tokenKey(provider.token)] = provider;
    }
    return {
        // Will be filled later...
        factory: null,
        providersByKey,
        providers,
        modules,
        isRoot,
    };
}
/**
 * @param {?} data
 * @return {?}
 */
export function initNgModule(data) {
    /** @type {?} */
    const def = data._def;
    /** @type {?} */
    const providers = data._providers = new Array(def.providers.length);
    for (let i = 0; i < def.providers.length; i++) {
        /** @type {?} */
        const provDef = def.providers[i];
        if (!(provDef.flags & 4096 /* LazyProvider */)) {
            // Make sure the provider has not been already initialized outside this loop.
            if (providers[i] === undefined) {
                providers[i] = _createProviderInstance(data, provDef);
            }
        }
    }
}
/**
 * @param {?} data
 * @param {?} depDef
 * @param {?=} notFoundValue
 * @return {?}
 */
export function resolveNgModuleDep(data, depDef, notFoundValue = Injector.THROW_IF_NOT_FOUND) {
    /** @type {?} */
    const former = setCurrentInjector(data);
    try {
        if (depDef.flags & 8 /* Value */) {
            return depDef.token;
        }
        if (depDef.flags & 2 /* Optional */) {
            notFoundValue = null;
        }
        if (depDef.flags & 1 /* SkipSelf */) {
            return data._parent.get(depDef.token, notFoundValue);
        }
        /** @type {?} */
        const tokenKey = depDef.tokenKey;
        switch (tokenKey) {
            case InjectorRefTokenKey:
            case INJECTORRefTokenKey:
            case NgModuleRefTokenKey:
                return data;
        }
        /** @type {?} */
        const providerDef = data._def.providersByKey[tokenKey];
        if (providerDef) {
            /** @type {?} */
            let providerInstance = data._providers[providerDef.index];
            if (providerInstance === undefined) {
                providerInstance = data._providers[providerDef.index] =
                    _createProviderInstance(data, providerDef);
            }
            return providerInstance === UNDEFINED_VALUE ? undefined : providerInstance;
        }
        else if (depDef.token.ngInjectableDef && targetsModule(data, depDef.token.ngInjectableDef)) {
            /** @type {?} */
            const injectableDef = /** @type {?} */ (depDef.token.ngInjectableDef);
            /** @type {?} */
            const key = tokenKey;
            /** @type {?} */
            const index = data._providers.length;
            data._def.providersByKey[depDef.tokenKey] = {
                flags: 1024 /* TypeFactoryProvider */ | 4096 /* LazyProvider */,
                value: injectableDef.factory,
                deps: [], index,
                token: depDef.token,
            };
            data._providers[index] = UNDEFINED_VALUE;
            return (data._providers[index] =
                _createProviderInstance(data, data._def.providersByKey[depDef.tokenKey]));
        }
        else if (depDef.flags & 4 /* Self */) {
            return notFoundValue;
        }
        return data._parent.get(depDef.token, notFoundValue);
    }
    finally {
        setCurrentInjector(former);
    }
}
/**
 * @param {?} ngModule
 * @param {?} scope
 * @return {?}
 */
function moduleTransitivelyPresent(ngModule, scope) {
    return ngModule._def.modules.indexOf(scope) > -1;
}
/**
 * @param {?} ngModule
 * @param {?} def
 * @return {?}
 */
function targetsModule(ngModule, def) {
    return def.providedIn != null && (moduleTransitivelyPresent(ngModule, def.providedIn) ||
        def.providedIn === 'root' && ngModule._def.isRoot);
}
/**
 * @param {?} ngModule
 * @param {?} providerDef
 * @return {?}
 */
function _createProviderInstance(ngModule, providerDef) {
    /** @type {?} */
    let injectable;
    switch (providerDef.flags & 201347067 /* Types */) {
        case 512 /* TypeClassProvider */:
            injectable = _createClass(ngModule, providerDef.value, providerDef.deps);
            break;
        case 1024 /* TypeFactoryProvider */:
            injectable = _callFactory(ngModule, providerDef.value, providerDef.deps);
            break;
        case 2048 /* TypeUseExistingProvider */:
            injectable = resolveNgModuleDep(ngModule, providerDef.deps[0]);
            break;
        case 256 /* TypeValueProvider */:
            injectable = providerDef.value;
            break;
    }
    // The read of `ngOnDestroy` here is slightly expensive as it's megamorphic, so it should be
    // avoided if possible. The sequence of checks here determines whether ngOnDestroy needs to be
    // checked. It might not if the `injectable` isn't an object or if NodeFlags.OnDestroy is already
    // set (ngOnDestroy was detected statically).
    if (injectable !== UNDEFINED_VALUE && injectable != null && typeof injectable === 'object' &&
        !(providerDef.flags & 131072 /* OnDestroy */) && typeof injectable.ngOnDestroy === 'function') {
        providerDef.flags |= 131072 /* OnDestroy */;
    }
    return injectable === undefined ? UNDEFINED_VALUE : injectable;
}
/**
 * @param {?} ngModule
 * @param {?} ctor
 * @param {?} deps
 * @return {?}
 */
function _createClass(ngModule, ctor, deps) {
    /** @type {?} */
    const len = deps.length;
    switch (len) {
        case 0:
            return new ctor();
        case 1:
            return new ctor(resolveNgModuleDep(ngModule, deps[0]));
        case 2:
            return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));
        case 3:
            return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));
        default:
            /** @type {?} */
            const depValues = new Array(len);
            for (let i = 0; i < len; i++) {
                depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
            }
            return new ctor(...depValues);
    }
}
/**
 * @param {?} ngModule
 * @param {?} factory
 * @param {?} deps
 * @return {?}
 */
function _callFactory(ngModule, factory, deps) {
    /** @type {?} */
    const len = deps.length;
    switch (len) {
        case 0:
            return factory();
        case 1:
            return factory(resolveNgModuleDep(ngModule, deps[0]));
        case 2:
            return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));
        case 3:
            return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));
        default:
            /** @type {?} */
            const depValues = Array(len);
            for (let i = 0; i < len; i++) {
                depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
            }
            return factory(...depValues);
    }
}
/**
 * @param {?} ngModule
 * @param {?} lifecycles
 * @return {?}
 */
export function callNgModuleLifecycle(ngModule, lifecycles) {
    /** @type {?} */
    const def = ngModule._def;
    /** @type {?} */
    const destroyed = new Set();
    for (let i = 0; i < def.providers.length; i++) {
        /** @type {?} */
        const provDef = def.providers[i];
        if (provDef.flags & 131072 /* OnDestroy */) {
            /** @type {?} */
            const instance = ngModule._providers[i];
            if (instance && instance !== UNDEFINED_VALUE) {
                /** @type {?} */
                const onDestroy = instance.ngOnDestroy;
                if (typeof onDestroy === 'function' && !destroyed.has(instance)) {
                    onDestroy.apply(instance);
                    destroyed.add(instance);
                }
            }
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvdmlldy9uZ19tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFTQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsUUFBUSxFQUFlLFFBQVEsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25GLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFHbEMsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUMsTUFBTSxRQUFRLENBQUM7O0FBRTlDLE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7O0FBRXJDLE1BQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUMvQyxNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFDL0MsTUFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7O0FBRWxELE1BQU0sMkJBQ0YsS0FBZ0IsRUFBRSxLQUFVLEVBQUUsS0FBVSxFQUN4QyxJQUErQjs7OztJQUlqQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7O0lBQ2pDLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckQsT0FBTzs7UUFFTCxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7S0FD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KiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGVEZWZ9IGZyb20gJy4uL2RpL2RlZnMnO1xuaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnLi4vZGkvZm9yd2FyZF9yZWYnO1xuaW1wb3J0IHtJTkpFQ1RPUiwgSW5qZWN0RmxhZ3MsIEluamVjdG9yLCBzZXRDdXJyZW50SW5qZWN0b3J9IGZyb20gJy4uL2RpL2luamVjdG9yJztcbmltcG9ydCB7QVBQX1JPT1R9IGZyb20gJy4uL2RpL3Njb3BlJztcbmltcG9ydCB7TmdNb2R1bGVSZWZ9IGZyb20gJy4uL2xpbmtlci9uZ19tb2R1bGVfZmFjdG9yeSc7XG5pbXBvcnQge3N0cmluZ2lmeX0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7RGVwRGVmLCBEZXBGbGFncywgTmdNb2R1bGVEYXRhLCBOZ01vZHVsZURlZmluaXRpb24sIE5nTW9kdWxlUHJvdmlkZXJEZWYsIE5vZGVGbGFnc30gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge3NwbGl0RGVwc0RzbCwgdG9rZW5LZXl9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IFVOREVGSU5FRF9WQUxVRSA9IG5ldyBPYmplY3QoKTtcblxuY29uc3QgSW5qZWN0b3JSZWZUb2tlbktleSA9IHRva2VuS2V5KEluamVjdG9yKTtcbmNvbnN0IElOSkVDVE9SUmVmVG9rZW5LZXkgPSB0b2tlbktleShJTkpFQ1RPUik7XG5jb25zdCBOZ01vZHVsZVJlZlRva2VuS2V5ID0gdG9rZW5LZXkoTmdNb2R1bGVSZWYpO1xuXG5leHBvcnQgZnVuY3Rpb24gbW9kdWxlUHJvdmlkZURlZihcbiAgICBmbGFnczogTm9kZUZsYWdzLCB0b2tlbjogYW55LCB2YWx1ZTogYW55LFxuICAgIGRlcHM6IChbRGVwRmxhZ3MsIGFueV0gfCBhbnkpW10pOiBOZ01vZHVsZVByb3ZpZGVyRGVmIHtcbiAgLy8gTmVlZCB0byByZXNvbHZlIGZvcndhcmRSZWZzIGFzIGUuZy4gZm9yIGB1c2VWYWx1ZWAgd2VcbiAgLy8gbG93ZXJlZCB0aGUgZXhwcmVzc2lvbiBhbmQgdGhlbiBzdG9wcGVkIGV2YWx1YXRpbmcgaXQsXG4gIC8vIGkuZS4gYWxzbyBkaWRuJ3QgdW53cmFwIGl0LlxuICB2YWx1ZSA9IHJlc29sdmVGb3J3YXJkUmVmKHZhbHVlKTtcbiAgY29uc3QgZGVwRGVmcyA9IHNwbGl0RGVwc0RzbChkZXBzLCBzdHJpbmdpZnkodG9rZW4pKTtcbiAgcmV0dXJuIHtcbiAgICAvLyB3aWxsIGJldCBzZXQgYnkgdGhlIG1vZHVsZSBkZWZpbml0aW9uXG4gICAgaW5kZXg6IC0xLFxuICAgIGRlcHM6IGRlcERlZnMsIGZsYWdzLCB0b2tlbiwgdmFsdWVcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vZHVsZURlZihwcm92aWRlcnM6IE5nTW9kdWxlUHJvdmlkZXJEZWZbXSk6IE5nTW9kdWxlRGVmaW5pdGlvbiB7XG4gIGNvbnN0IHByb3ZpZGVyc0J5S2V5OiB7W2tleTogc3RyaW5nXTogTmdNb2R1bGVQcm92aWRlckRlZn0gPSB7fTtcbiAgY29uc3QgbW9kdWxlcyA9IFtdO1xuICBsZXQgaXNSb290OiBib29sZWFuID0gZmFsc2U7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBwcm92aWRlcnNbaV07XG4gICAgaWYgKHByb3ZpZGVyLnRva2VuID09PSBBUFBfUk9PVCAmJiBwcm92aWRlci52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaXNSb290ID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHByb3ZpZGVyLmZsYWdzICYgTm9kZUZsYWdzLlR5cGVOZ01vZHVsZSkge1xuICAgICAgbW9kdWxlcy5wdXNoKHByb3ZpZGVyLnRva2VuKTtcbiAgICB9XG4gICAgcHJvdmlkZXIuaW5kZXggPSBpO1xuICAgIHByb3ZpZGVyc0J5S2V5W3Rva2VuS2V5KHByb3ZpZGVyLnRva2VuKV0gPSBwcm92aWRlcjtcbiAgfVxuICByZXR1cm4ge1xuICAgIC8vIFdpbGwgYmUgZmlsbGVkIGxhdGVyLi4uXG4gICAgZmFjdG9yeTogbnVsbCxcbiAgICBwcm92aWRlcnNCeUtleSxcbiAgICBwcm92aWRlcnMsXG4gICAgbW9kdWxlcyxcbiAgICBpc1Jvb3QsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0TmdNb2R1bGUoZGF0YTogTmdNb2R1bGVEYXRhKSB7XG4gIGNvbnN0IGRlZiA9IGRhdGEuX2RlZjtcbiAgY29uc3QgcHJvdmlkZXJzID0gZGF0YS5fcHJvdmlkZXJzID0gbmV3IEFycmF5KGRlZi5wcm92aWRlcnMubGVuZ3RoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWYucHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJvdkRlZiA9IGRlZi5wcm92aWRlcnNbaV07XG4gICAgaWYgKCEocHJvdkRlZi5mbGFncyAmIE5vZGVGbGFncy5MYXp5UHJvdmlkZXIpKSB7XG4gICAgICAvLyBNYWtlIHN1cmUgdGhlIHByb3ZpZGVyIGhhcyBub3QgYmVlbiBhbHJlYWR5IGluaXRpYWxpemVkIG91dHNpZGUgdGhpcyBsb29wLlxuICAgICAgaWYgKHByb3ZpZGVyc1tpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3ZpZGVyc1tpXSA9IF9jcmVhdGVQcm92aWRlckluc3RhbmNlKGRhdGEsIHByb3ZEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZU5nTW9kdWxlRGVwKFxuICAgIGRhdGE6IE5nTW9kdWxlRGF0YSwgZGVwRGVmOiBEZXBEZWYsIG5vdEZvdW5kVmFsdWU6IGFueSA9IEluamVjdG9yLlRIUk9XX0lGX05PVF9GT1VORCk6IGFueSB7XG4gIGNvbnN0IGZvcm1lciA9IHNldEN1cnJlbnRJbmplY3RvcihkYXRhKTtcbiAgdHJ5IHtcbiAgICBpZiAoZGVwRGVmLmZsYWdzICYgRGVwRmxhZ3MuVmFsdWUpIHtcbiAgICAgIHJldHVybiBkZXBEZWYudG9rZW47XG4gICAgfVxuICAgIGlmIChkZXBEZWYuZmxhZ3MgJiBEZXBGbGFncy5PcHRpb25hbCkge1xuICAgICAgbm90Rm91bmRWYWx1ZSA9IG51bGw7XG4gICAgfVxuICAgIGlmIChkZXBEZWYuZmxhZ3MgJiBEZXBGbGFncy5Ta2lwU2VsZikge1xuICAgICAgcmV0dXJuIGRhdGEuX3BhcmVudC5nZXQoZGVwRGVmLnRva2VuLCBub3RGb3VuZFZhbHVlKTtcbiAgICB9XG4gICAgY29uc3QgdG9rZW5LZXkgPSBkZXBEZWYudG9rZW5LZXk7XG4gICAgc3dpdGNoICh0b2tlbktleSkge1xuICAgICAgY2FzZSBJbmplY3RvclJlZlRva2VuS2V5OlxuICAgICAgY2FzZSBJTkpFQ1RPUlJlZlRva2VuS2V5OlxuICAgICAgY2FzZSBOZ01vZHVsZVJlZlRva2VuS2V5OlxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgY29uc3QgcHJvdmlkZXJEZWYgPSBkYXRhLl9kZWYucHJvdmlkZXJzQnlLZXlbdG9rZW5LZXldO1xuICAgIGlmIChwcm92aWRlckRlZikge1xuICAgICAgbGV0IHByb3ZpZGVySW5zdGFuY2UgPSBkYXRhLl9wcm92aWRlcnNbcHJvdmlkZXJEZWYuaW5kZXhdO1xuICAgICAgaWYgKHByb3ZpZGVySW5zdGFuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm92aWRlckluc3RhbmNlID0gZGF0YS5fcHJvdmlkZXJzW3Byb3ZpZGVyRGVmLmluZGV4XSA9XG4gICAgICAgICAgICBfY3JlYXRlUHJvdmlkZXJJbnN0YW5jZShkYXRhLCBwcm92aWRlckRlZik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvdmlkZXJJbnN0YW5jZSA9PT0gVU5ERUZJTkVEX1ZBTFVFID8gdW5kZWZpbmVkIDogcHJvdmlkZXJJbnN0YW5jZTtcbiAgICB9IGVsc2UgaWYgKGRlcERlZi50b2tlbi5uZ0luamVjdGFibGVEZWYgJiYgdGFyZ2V0c01vZHVsZShkYXRhLCBkZXBEZWYudG9rZW4ubmdJbmplY3RhYmxlRGVmKSkge1xuICAgICAgY29uc3QgaW5qZWN0YWJsZURlZiA9IGRlcERlZi50b2tlbi5uZ0luamVjdGFibGVEZWYgYXMgSW5qZWN0YWJsZURlZjxhbnk+O1xuICAgICAgY29uc3Qga2V5ID0gdG9rZW5LZXk7XG4gICAgICBjb25zdCBpbmRleCA9IGRhdGEuX3Byb3ZpZGVycy5sZW5ndGg7XG4gICAgICBkYXRhLl9kZWYucHJvdmlkZXJzQnlLZXlbZGVwRGVmLnRva2VuS2V5XSA9IHtcbiAgICAgICAgZmxhZ3M6IE5vZGVGbGFncy5UeXBlRmFjdG9yeVByb3ZpZGVyIHwgTm9kZUZsYWdzLkxhenlQcm92aWRlcixcbiAgICAgICAgdmFsdWU6IGluamVjdGFibGVEZWYuZmFjdG9yeSxcbiAgICAgICAgZGVwczogW10sIGluZGV4LFxuICAgICAgICB0b2tlbjogZGVwRGVmLnRva2VuLFxuICAgICAgfTtcbiAgICAgIGRhdGEuX3Byb3ZpZGVyc1tpbmRleF0gPSBVTkRFRklORURfVkFMVUU7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIGRhdGEuX3Byb3ZpZGVyc1tpbmRleF0gPVxuICAgICAgICAgICAgICBfY3JlYXRlUHJvdmlkZXJJbnN0YW5jZShkYXRhLCBkYXRhLl9kZWYucHJvdmlkZXJzQnlLZXlbZGVwRGVmLnRva2VuS2V5XSkpO1xuICAgIH0gZWxzZSBpZiAoZGVwRGVmLmZsYWdzICYgRGVwRmxhZ3MuU2VsZikge1xuICAgICAgcmV0dXJuIG5vdEZvdW5kVmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBkYXRhLl9wYXJlbnQuZ2V0KGRlcERlZi50b2tlbiwgbm90Rm91bmRWYWx1ZSk7XG4gIH0gZmluYWxseSB7XG4gICAgc2V0Q3VycmVudEluamVjdG9yKGZvcm1lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW9kdWxlVHJhbnNpdGl2ZWx5UHJlc2VudChuZ01vZHVsZTogTmdNb2R1bGVEYXRhLCBzY29wZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBuZ01vZHVsZS5fZGVmLm1vZHVsZXMuaW5kZXhPZihzY29wZSkgPiAtMTtcbn1cblxuZnVuY3Rpb24gdGFyZ2V0c01vZHVsZShuZ01vZHVsZTogTmdNb2R1bGVEYXRhLCBkZWY6IEluamVjdGFibGVEZWY8YW55Pik6IGJvb2xlYW4ge1xuICByZXR1cm4gZGVmLnByb3ZpZGVkSW4gIT0gbnVsbCAmJiAobW9kdWxlVHJhbnNpdGl2ZWx5UHJlc2VudChuZ01vZHVsZSwgZGVmLnByb3ZpZGVkSW4pIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucHJvdmlkZWRJbiA9PT0gJ3Jvb3QnICYmIG5nTW9kdWxlLl9kZWYuaXNSb290KTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVByb3ZpZGVySW5zdGFuY2UobmdNb2R1bGU6IE5nTW9kdWxlRGF0YSwgcHJvdmlkZXJEZWY6IE5nTW9kdWxlUHJvdmlkZXJEZWYpOiBhbnkge1xuICBsZXQgaW5qZWN0YWJsZTogYW55O1xuICBzd2l0Y2ggKHByb3ZpZGVyRGVmLmZsYWdzICYgTm9kZUZsYWdzLlR5cGVzKSB7XG4gICAgY2FzZSBOb2RlRmxhZ3MuVHlwZUNsYXNzUHJvdmlkZXI6XG4gICAgICBpbmplY3RhYmxlID0gX2NyZWF0ZUNsYXNzKG5nTW9kdWxlLCBwcm92aWRlckRlZi52YWx1ZSwgcHJvdmlkZXJEZWYuZGVwcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIE5vZGVGbGFncy5UeXBlRmFjdG9yeVByb3ZpZGVyOlxuICAgICAgaW5qZWN0YWJsZSA9IF9jYWxsRmFjdG9yeShuZ01vZHVsZSwgcHJvdmlkZXJEZWYudmFsdWUsIHByb3ZpZGVyRGVmLmRlcHMpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBOb2RlRmxhZ3MuVHlwZVVzZUV4aXN0aW5nUHJvdmlkZXI6XG4gICAgICBpbmplY3RhYmxlID0gcmVzb2x2ZU5nTW9kdWxlRGVwKG5nTW9kdWxlLCBwcm92aWRlckRlZi5kZXBzWzBdKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTm9kZUZsYWdzLlR5cGVWYWx1ZVByb3ZpZGVyOlxuICAgICAgaW5qZWN0YWJsZSA9IHByb3ZpZGVyRGVmLnZhbHVlO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICAvLyBUaGUgcmVhZCBvZiBgbmdPbkRlc3Ryb3lgIGhlcmUgaXMgc2xpZ2h0bHkgZXhwZW5zaXZlIGFzIGl0J3MgbWVnYW1vcnBoaWMsIHNvIGl0IHNob3VsZCBiZVxuICAvLyBhdm9pZGVkIGlmIHBvc3NpYmxlLiBUaGUgc2VxdWVuY2Ugb2YgY2hlY2tzIGhlcmUgZGV0ZXJtaW5lcyB3aGV0aGVyIG5nT25EZXN0cm95IG5lZWRzIHRvIGJlXG4gIC8vIGNoZWNrZWQuIEl0IG1pZ2h0IG5vdCBpZiB0aGUgYGluamVjdGFibGVgIGlzbid0IGFuIG9iamVjdCBvciBpZiBOb2RlRmxhZ3MuT25EZXN0cm95IGlzIGFscmVhZHlcbiAgLy8gc2V0IChuZ09uRGVzdHJveSB3YXMgZGV0ZWN0ZWQgc3RhdGljYWxseSkuXG4gIGlmIChpbmplY3RhYmxlICE9PSBVTkRFRklORURfVkFMVUUgJiYgaW5qZWN0YWJsZSAhPSBudWxsICYmIHR5cGVvZiBpbmplY3RhYmxlID09PSAnb2JqZWN0JyAmJlxuICAgICAgIShwcm92aWRlckRlZi5mbGFncyAmIE5vZGVGbGFncy5PbkRlc3Ryb3kpICYmIHR5cGVvZiBpbmplY3RhYmxlLm5nT25EZXN0cm95ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcHJvdmlkZXJEZWYuZmxhZ3MgfD0gTm9kZUZsYWdzLk9uRGVzdHJveTtcbiAgfVxuICByZXR1cm4gaW5qZWN0YWJsZSA9PT0gdW5kZWZpbmVkID8gVU5ERUZJTkVEX1ZBTFVFIDogaW5qZWN0YWJsZTtcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKG5nTW9kdWxlOiBOZ01vZHVsZURhdGEsIGN0b3I6IGFueSwgZGVwczogRGVwRGVmW10pOiBhbnkge1xuICBjb25zdCBsZW4gPSBkZXBzLmxlbmd0aDtcbiAgc3dpdGNoIChsZW4pIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gbmV3IGN0b3IoKTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gbmV3IGN0b3IocmVzb2x2ZU5nTW9kdWxlRGVwKG5nTW9kdWxlLCBkZXBzWzBdKSk7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIG5ldyBjdG9yKHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1swXSksIHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1sxXSkpO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBuZXcgY3RvcihcbiAgICAgICAgICByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMF0pLCByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMV0pLFxuICAgICAgICAgIHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1syXSkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICBjb25zdCBkZXBWYWx1ZXMgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZGVwVmFsdWVzW2ldID0gcmVzb2x2ZU5nTW9kdWxlRGVwKG5nTW9kdWxlLCBkZXBzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgY3RvciguLi5kZXBWYWx1ZXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jYWxsRmFjdG9yeShuZ01vZHVsZTogTmdNb2R1bGVEYXRhLCBmYWN0b3J5OiBhbnksIGRlcHM6IERlcERlZltdKTogYW55IHtcbiAgY29uc3QgbGVuID0gZGVwcy5sZW5ndGg7XG4gIHN3aXRjaCAobGVuKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIGZhY3RvcnkoKTtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gZmFjdG9yeShyZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMF0pKTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gZmFjdG9yeShyZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMF0pLCByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMV0pKTtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gZmFjdG9yeShcbiAgICAgICAgICByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMF0pLCByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbMV0pLFxuICAgICAgICAgIHJlc29sdmVOZ01vZHVsZURlcChuZ01vZHVsZSwgZGVwc1syXSkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICBjb25zdCBkZXBWYWx1ZXMgPSBBcnJheShsZW4pO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBkZXBWYWx1ZXNbaV0gPSByZXNvbHZlTmdNb2R1bGVEZXAobmdNb2R1bGUsIGRlcHNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhY3RvcnkoLi4uZGVwVmFsdWVzKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsbE5nTW9kdWxlTGlmZWN5Y2xlKG5nTW9kdWxlOiBOZ01vZHVsZURhdGEsIGxpZmVjeWNsZXM6IE5vZGVGbGFncykge1xuICBjb25zdCBkZWYgPSBuZ01vZHVsZS5fZGVmO1xuICBjb25zdCBkZXN0cm95ZWQgPSBuZXcgU2V0PGFueT4oKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWYucHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJvdkRlZiA9IGRlZi5wcm92aWRlcnNbaV07XG4gICAgaWYgKHByb3ZEZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuT25EZXN0cm95KSB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5nTW9kdWxlLl9wcm92aWRlcnNbaV07XG4gICAgICBpZiAoaW5zdGFuY2UgJiYgaW5zdGFuY2UgIT09IFVOREVGSU5FRF9WQUxVRSkge1xuICAgICAgICBjb25zdCBvbkRlc3Ryb3k6IEZ1bmN0aW9ufHVuZGVmaW5lZCA9IGluc3RhbmNlLm5nT25EZXN0cm95O1xuICAgICAgICBpZiAodHlwZW9mIG9uRGVzdHJveSA9PT0gJ2Z1bmN0aW9uJyAmJiAhZGVzdHJveWVkLmhhcyhpbnN0YW5jZSkpIHtcbiAgICAgICAgICBvbkRlc3Ryb3kuYXBwbHkoaW5zdGFuY2UpO1xuICAgICAgICAgIGRlc3Ryb3llZC5hZGQoaW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=