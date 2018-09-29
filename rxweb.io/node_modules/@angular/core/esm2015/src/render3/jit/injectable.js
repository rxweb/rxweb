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
import { LiteralExpr, WrappedNodeExpr, compileInjectable as compileR3Injectable, jitExpression } from '@angular/compiler';
import { getClosureSafeProperty } from '../../util/property';
import { angularCoreEnv } from './environment';
import { NG_INJECTABLE_DEF } from './fields';
import { convertDependencies, reflectDependencies } from './util';
/**
 * Compile an Angular injectable according to its `Injectable` metadata, and patch the resulting
 * `ngInjectableDef` onto the injectable type.
 * @param {?} type
 * @param {?=} meta
 * @return {?}
 */
export function compileInjectable(type, meta) {
    // TODO(alxhub): handle JIT of bare @Injectable().
    if (!meta) {
        return;
    }
    /** @type {?} */
    let def = null;
    Object.defineProperty(type, NG_INJECTABLE_DEF, {
        get: () => {
            if (def === null) {
                /** @type {?} */
                const hasAProvider = isUseClassProvider(meta) || isUseFactoryProvider(meta) ||
                    isUseValueProvider(meta) || isUseExistingProvider(meta);
                /** @type {?} */
                let deps = undefined;
                if (!hasAProvider || (isUseClassProvider(meta) && type === meta.useClass)) {
                    deps = reflectDependencies(type);
                }
                else if (isUseClassProvider(meta)) {
                    deps = meta.deps && convertDependencies(meta.deps);
                }
                else if (isUseFactoryProvider(meta)) {
                    deps = meta.deps && convertDependencies(meta.deps) || [];
                }
                /** @type {?} */
                let useClass = undefined;
                /** @type {?} */
                let useFactory = undefined;
                /** @type {?} */
                let useValue = undefined;
                /** @type {?} */
                let useExisting = undefined;
                if (!hasAProvider) {
                    // In the case the user specifies a type provider, treat it as {provide: X, useClass: X}.
                    // The deps will have been reflected above, causing the factory to create the class by
                    // calling
                    // its constructor with injected deps.
                    useClass = new WrappedNodeExpr(type);
                }
                else if (isUseClassProvider(meta)) {
                    // The user explicitly specified useClass, and may or may not have provided deps.
                    useClass = new WrappedNodeExpr(meta.useClass);
                }
                else if (isUseValueProvider(meta)) {
                    // The user explicitly specified useValue.
                    useValue = new WrappedNodeExpr(meta.useValue);
                }
                else if (isUseFactoryProvider(meta)) {
                    // The user explicitly specified useFactory.
                    useFactory = new WrappedNodeExpr(meta.useFactory);
                }
                else if (isUseExistingProvider(meta)) {
                    // The user explicitly specified useExisting.
                    useExisting = new WrappedNodeExpr(meta.useExisting);
                }
                else {
                    // Can't happen - either hasAProvider will be false, or one of the providers will be set.
                    throw new Error(`Unreachable state.`);
                }
                const { expression } = compileR3Injectable({
                    name: type.name,
                    type: new WrappedNodeExpr(type),
                    providedIn: computeProvidedIn(meta.providedIn),
                    useClass,
                    useFactory,
                    useValue,
                    useExisting,
                    deps,
                });
                def = jitExpression(expression, angularCoreEnv, `ng://${type.name}/ngInjectableDef.js`);
            }
            return def;
        },
    });
}
/**
 * @param {?} providedIn
 * @return {?}
 */
function computeProvidedIn(providedIn) {
    if (providedIn == null || typeof providedIn === 'string') {
        return new LiteralExpr(providedIn);
    }
    else {
        return new WrappedNodeExpr(providedIn);
    }
}
/** @typedef {?} */
var UseClassProvider;
/**
 * @param {?} meta
 * @return {?}
 */
function isUseClassProvider(meta) {
    return (/** @type {?} */ (meta)).useClass !== undefined;
}
/** @type {?} */
const GET_PROPERTY_NAME = /** @type {?} */ ({});
const ɵ0 = GET_PROPERTY_NAME;
/** @type {?} */
const USE_VALUE = getClosureSafeProperty({ provide: String, useValue: ɵ0 }, GET_PROPERTY_NAME);
/**
 * @param {?} meta
 * @return {?}
 */
function isUseValueProvider(meta) {
    return USE_VALUE in meta;
}
/**
 * @param {?} meta
 * @return {?}
 */
function isUseFactoryProvider(meta) {
    return (/** @type {?} */ (meta)).useFactory !== undefined;
}
/**
 * @param {?} meta
 * @return {?}
 */
function isUseExistingProvider(meta) {
    return (/** @type {?} */ (meta)).useExisting !== undefined;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaml0L2luamVjdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQWEsV0FBVyxFQUF3QixlQUFlLEVBQUUsaUJBQWlCLElBQUksbUJBQW1CLEVBQUUsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFLMUosT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFM0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFDLG1CQUFtQixFQUFFLG1CQUFtQixFQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7OztBQU9oRSxNQUFNLDRCQUE0QixJQUFlLEVBQUUsSUFBaUI7O0lBRWxFLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxPQUFPO0tBQ1I7O0lBRUQsSUFBSSxHQUFHLEdBQVEsSUFBSSxDQUFDO0lBQ3BCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1FBQzdDLEdBQUcsRUFBRSxHQUFHLEVBQUU7WUFDUixJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7O2dCQUVoQixNQUFNLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7b0JBQ3ZFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDOztnQkFFNUQsSUFBSSxJQUFJLEdBQXFDLFNBQVMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxJQUFJLENB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QixJQUFnQjtJQUMxQyxPQUFPLFNBQVMsSUFBSSxJQUFJLENBQUM7Q0FDMUI7Ozs7O0FBRUQsOEJBQThCLElBQWdCO0lBQzVDLE9BQU8sbUJBQUMsSUFBMkIsRUFBQyxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUM7Q0FDL0Q7Ozs7O0FBRUQsK0JBQStCLElBQWdCO0lBQzdDLE9BQU8sbUJBQUMsSUFBNEIsRUFBQyxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUM7Q0FDakUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXhwcmVzc2lvbiwgTGl0ZXJhbEV4cHIsIFIzRGVwZW5kZW5jeU1ldGFkYXRhLCBXcmFwcGVkTm9kZUV4cHIsIGNvbXBpbGVJbmplY3RhYmxlIGFzIGNvbXBpbGVSM0luamVjdGFibGUsIGppdEV4cHJlc3Npb259IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICcuLi8uLi9kaS9pbmplY3RhYmxlJztcbmltcG9ydCB7Q2xhc3NTYW5zUHJvdmlkZXIsIEV4aXN0aW5nU2Fuc1Byb3ZpZGVyLCBGYWN0b3J5U2Fuc1Byb3ZpZGVyLCBTdGF0aWNDbGFzc1NhbnNQcm92aWRlciwgVmFsdWVQcm92aWRlciwgVmFsdWVTYW5zUHJvdmlkZXJ9IGZyb20gJy4uLy4uL2RpL3Byb3ZpZGVyJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vLi4vdHlwZSc7XG5pbXBvcnQge2dldENsb3N1cmVTYWZlUHJvcGVydHl9IGZyb20gJy4uLy4uL3V0aWwvcHJvcGVydHknO1xuXG5pbXBvcnQge2FuZ3VsYXJDb3JlRW52fSBmcm9tICcuL2Vudmlyb25tZW50JztcbmltcG9ydCB7TkdfSU5KRUNUQUJMRV9ERUZ9IGZyb20gJy4vZmllbGRzJztcbmltcG9ydCB7Y29udmVydERlcGVuZGVuY2llcywgcmVmbGVjdERlcGVuZGVuY2llc30gZnJvbSAnLi91dGlsJztcblxuXG4vKipcbiAqIENvbXBpbGUgYW4gQW5ndWxhciBpbmplY3RhYmxlIGFjY29yZGluZyB0byBpdHMgYEluamVjdGFibGVgIG1ldGFkYXRhLCBhbmQgcGF0Y2ggdGhlIHJlc3VsdGluZ1xuICogYG5nSW5qZWN0YWJsZURlZmAgb250byB0aGUgaW5qZWN0YWJsZSB0eXBlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZUluamVjdGFibGUodHlwZTogVHlwZTxhbnk+LCBtZXRhPzogSW5qZWN0YWJsZSk6IHZvaWQge1xuICAvLyBUT0RPKGFseGh1Yik6IGhhbmRsZSBKSVQgb2YgYmFyZSBASW5qZWN0YWJsZSgpLlxuICBpZiAoIW1ldGEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgZGVmOiBhbnkgPSBudWxsO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgTkdfSU5KRUNUQUJMRV9ERUYsIHtcbiAgICBnZXQ6ICgpID0+IHtcbiAgICAgIGlmIChkZWYgPT09IG51bGwpIHtcbiAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgaW5qZWN0YWJsZSBtZXRhZGF0YSBpbmNsdWRlcyBhIHByb3ZpZGVyIHNwZWNpZmljYXRpb24uXG4gICAgICAgIGNvbnN0IGhhc0FQcm92aWRlciA9IGlzVXNlQ2xhc3NQcm92aWRlcihtZXRhKSB8fCBpc1VzZUZhY3RvcnlQcm92aWRlcihtZXRhKSB8fFxuICAgICAgICAgICAgaXNVc2VWYWx1ZVByb3ZpZGVyKG1ldGEpIHx8IGlzVXNlRXhpc3RpbmdQcm92aWRlcihtZXRhKTtcblxuICAgICAgICBsZXQgZGVwczogUjNEZXBlbmRlbmN5TWV0YWRhdGFbXXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghaGFzQVByb3ZpZGVyIHx8IChpc1VzZUNsYXNzUHJvdmlkZXIobWV0YSkgJiYgdHlwZSA9PT0gbWV0YS51c2VDbGFzcykpIHtcbiAgICAgICAgICBkZXBzID0gcmVmbGVjdERlcGVuZGVuY2llcyh0eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1VzZUNsYXNzUHJvdmlkZXIobWV0YSkpIHtcbiAgICAgICAgICBkZXBzID0gbWV0YS5kZXBzICYmIGNvbnZlcnREZXBlbmRlbmNpZXMobWV0YS5kZXBzKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1VzZUZhY3RvcnlQcm92aWRlcihtZXRhKSkge1xuICAgICAgICAgIGRlcHMgPSBtZXRhLmRlcHMgJiYgY29udmVydERlcGVuZGVuY2llcyhtZXRhLmRlcHMpIHx8IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVjaWRlIHdoaWNoIGZsYXZvciBvZiBmYWN0b3J5IHRvIGdlbmVyYXRlLCBiYXNlZCBvbiB0aGUgcHJvdmlkZXIgc3BlY2lmaWVkLlxuICAgICAgICAvLyBPbmx5IG9uZSBvZiB0aGUgdXNlKiBmaWVsZHMgc2hvdWxkIGJlIHNldC5cbiAgICAgICAgbGV0IHVzZUNsYXNzOiBFeHByZXNzaW9ufHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IHVzZUZhY3Rvcnk6IEV4cHJlc3Npb258dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgdXNlVmFsdWU6IEV4cHJlc3Npb258dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgdXNlRXhpc3Rpbmc6IEV4cHJlc3Npb258dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICghaGFzQVByb3ZpZGVyKSB7XG4gICAgICAgICAgLy8gSW4gdGhlIGNhc2UgdGhlIHVzZXIgc3BlY2lmaWVzIGEgdHlwZSBwcm92aWRlciwgdHJlYXQgaXQgYXMge3Byb3ZpZGU6IFgsIHVzZUNsYXNzOiBYfS5cbiAgICAgICAgICAvLyBUaGUgZGVwcyB3aWxsIGhhdmUgYmVlbiByZWZsZWN0ZWQgYWJvdmUsIGNhdXNpbmcgdGhlIGZhY3RvcnkgdG8gY3JlYXRlIHRoZSBjbGFzcyBieVxuICAgICAgICAgIC8vIGNhbGxpbmdcbiAgICAgICAgICAvLyBpdHMgY29uc3RydWN0b3Igd2l0aCBpbmplY3RlZCBkZXBzLlxuICAgICAgICAgIHVzZUNsYXNzID0gbmV3IFdyYXBwZWROb2RlRXhwcih0eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1VzZUNsYXNzUHJvdmlkZXIobWV0YSkpIHtcbiAgICAgICAgICAvLyBUaGUgdXNlciBleHBsaWNpdGx5IHNwZWNpZmllZCB1c2VDbGFzcywgYW5kIG1heSBvciBtYXkgbm90IGhhdmUgcHJvdmlkZWQgZGVwcy5cbiAgICAgICAgICB1c2VDbGFzcyA9IG5ldyBXcmFwcGVkTm9kZUV4cHIobWV0YS51c2VDbGFzcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNVc2VWYWx1ZVByb3ZpZGVyKG1ldGEpKSB7XG4gICAgICAgICAgLy8gVGhlIHVzZXIgZXhwbGljaXRseSBzcGVjaWZpZWQgdXNlVmFsdWUuXG4gICAgICAgICAgdXNlVmFsdWUgPSBuZXcgV3JhcHBlZE5vZGVFeHByKG1ldGEudXNlVmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzVXNlRmFjdG9yeVByb3ZpZGVyKG1ldGEpKSB7XG4gICAgICAgICAgLy8gVGhlIHVzZXIgZXhwbGljaXRseSBzcGVjaWZpZWQgdXNlRmFjdG9yeS5cbiAgICAgICAgICB1c2VGYWN0b3J5ID0gbmV3IFdyYXBwZWROb2RlRXhwcihtZXRhLnVzZUZhY3RvcnkpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzVXNlRXhpc3RpbmdQcm92aWRlcihtZXRhKSkge1xuICAgICAgICAgIC8vIFRoZSB1c2VyIGV4cGxpY2l0bHkgc3BlY2lmaWVkIHVzZUV4aXN0aW5nLlxuICAgICAgICAgIHVzZUV4aXN0aW5nID0gbmV3IFdyYXBwZWROb2RlRXhwcihtZXRhLnVzZUV4aXN0aW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBDYW4ndCBoYXBwZW4gLSBlaXRoZXIgaGFzQVByb3ZpZGVyIHdpbGwgYmUgZmFsc2UsIG9yIG9uZSBvZiB0aGUgcHJvdmlkZXJzIHdpbGwgYmUgc2V0LlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5yZWFjaGFibGUgc3RhdGUuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7ZXhwcmVzc2lvbn0gPSBjb21waWxlUjNJbmplY3RhYmxlKHtcbiAgICAgICAgICBuYW1lOiB0eXBlLm5hbWUsXG4gICAgICAgICAgdHlwZTogbmV3IFdyYXBwZWROb2RlRXhwcih0eXBlKSxcbiAgICAgICAgICBwcm92aWRlZEluOiBjb21wdXRlUHJvdmlkZWRJbihtZXRhLnByb3ZpZGVkSW4pLFxuICAgICAgICAgIHVzZUNsYXNzLFxuICAgICAgICAgIHVzZUZhY3RvcnksXG4gICAgICAgICAgdXNlVmFsdWUsXG4gICAgICAgICAgdXNlRXhpc3RpbmcsXG4gICAgICAgICAgZGVwcyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGVmID0gaml0RXhwcmVzc2lvbihleHByZXNzaW9uLCBhbmd1bGFyQ29yZUVudiwgYG5nOi8vJHt0eXBlLm5hbWV9L25nSW5qZWN0YWJsZURlZi5qc2ApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZjtcbiAgICB9LFxuICB9KTtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZVByb3ZpZGVkSW4ocHJvdmlkZWRJbjogVHlwZTxhbnk+fCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogRXhwcmVzc2lvbiB7XG4gIGlmIChwcm92aWRlZEluID09IG51bGwgfHwgdHlwZW9mIHByb3ZpZGVkSW4gPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG5ldyBMaXRlcmFsRXhwcihwcm92aWRlZEluKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFdyYXBwZWROb2RlRXhwcihwcm92aWRlZEluKTtcbiAgfVxufVxuXG50eXBlIFVzZUNsYXNzUHJvdmlkZXIgPSBJbmplY3RhYmxlICYgQ2xhc3NTYW5zUHJvdmlkZXIgJiB7ZGVwcz86IGFueVtdfTtcblxuZnVuY3Rpb24gaXNVc2VDbGFzc1Byb3ZpZGVyKG1ldGE6IEluamVjdGFibGUpOiBtZXRhIGlzIFVzZUNsYXNzUHJvdmlkZXIge1xuICByZXR1cm4gKG1ldGEgYXMgVXNlQ2xhc3NQcm92aWRlcikudXNlQ2xhc3MgIT09IHVuZGVmaW5lZDtcbn1cblxuY29uc3QgR0VUX1BST1BFUlRZX05BTUUgPSB7fSBhcyBhbnk7XG5jb25zdCBVU0VfVkFMVUUgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5PFZhbHVlUHJvdmlkZXI+KFxuICAgIHtwcm92aWRlOiBTdHJpbmcsIHVzZVZhbHVlOiBHRVRfUFJPUEVSVFlfTkFNRX0sIEdFVF9QUk9QRVJUWV9OQU1FKTtcblxuZnVuY3Rpb24gaXNVc2VWYWx1ZVByb3ZpZGVyKG1ldGE6IEluamVjdGFibGUpOiBtZXRhIGlzIEluamVjdGFibGUmVmFsdWVTYW5zUHJvdmlkZXIge1xuICByZXR1cm4gVVNFX1ZBTFVFIGluIG1ldGE7XG59XG5cbmZ1bmN0aW9uIGlzVXNlRmFjdG9yeVByb3ZpZGVyKG1ldGE6IEluamVjdGFibGUpOiBtZXRhIGlzIEluamVjdGFibGUmRmFjdG9yeVNhbnNQcm92aWRlciB7XG4gIHJldHVybiAobWV0YSBhcyBGYWN0b3J5U2Fuc1Byb3ZpZGVyKS51c2VGYWN0b3J5ICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzVXNlRXhpc3RpbmdQcm92aWRlcihtZXRhOiBJbmplY3RhYmxlKTogbWV0YSBpcyBJbmplY3RhYmxlJkV4aXN0aW5nU2Fuc1Byb3ZpZGVyIHtcbiAgcmV0dXJuIChtZXRhIGFzIEV4aXN0aW5nU2Fuc1Byb3ZpZGVyKS51c2VFeGlzdGluZyAhPT0gdW5kZWZpbmVkO1xufVxuIl19