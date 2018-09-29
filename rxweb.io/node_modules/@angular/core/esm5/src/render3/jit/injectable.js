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
 */
export function compileInjectable(type, meta) {
    // TODO(alxhub): handle JIT of bare @Injectable().
    if (!meta) {
        return;
    }
    var def = null;
    Object.defineProperty(type, NG_INJECTABLE_DEF, {
        get: function () {
            if (def === null) {
                // Check whether the injectable metadata includes a provider specification.
                var hasAProvider = isUseClassProvider(meta) || isUseFactoryProvider(meta) ||
                    isUseValueProvider(meta) || isUseExistingProvider(meta);
                var deps = undefined;
                if (!hasAProvider || (isUseClassProvider(meta) && type === meta.useClass)) {
                    deps = reflectDependencies(type);
                }
                else if (isUseClassProvider(meta)) {
                    deps = meta.deps && convertDependencies(meta.deps);
                }
                else if (isUseFactoryProvider(meta)) {
                    deps = meta.deps && convertDependencies(meta.deps) || [];
                }
                // Decide which flavor of factory to generate, based on the provider specified.
                // Only one of the use* fields should be set.
                var useClass = undefined;
                var useFactory = undefined;
                var useValue = undefined;
                var useExisting = undefined;
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
                    throw new Error("Unreachable state.");
                }
                var expression = compileR3Injectable({
                    name: type.name,
                    type: new WrappedNodeExpr(type),
                    providedIn: computeProvidedIn(meta.providedIn),
                    useClass: useClass,
                    useFactory: useFactory,
                    useValue: useValue,
                    useExisting: useExisting,
                    deps: deps,
                }).expression;
                def = jitExpression(expression, angularCoreEnv, "ng://" + type.name + "/ngInjectableDef.js");
            }
            return def;
        },
    });
}
function computeProvidedIn(providedIn) {
    if (providedIn == null || typeof providedIn === 'string') {
        return new LiteralExpr(providedIn);
    }
    else {
        return new WrappedNodeExpr(providedIn);
    }
}
function isUseClassProvider(meta) {
    return meta.useClass !== undefined;
}
var GET_PROPERTY_NAME = {};
var ɵ0 = GET_PROPERTY_NAME;
var USE_VALUE = getClosureSafeProperty({ provide: String, useValue: ɵ0 }, GET_PROPERTY_NAME);
function isUseValueProvider(meta) {
    return USE_VALUE in meta;
}
function isUseFactoryProvider(meta) {
    return meta.useFactory !== undefined;
}
function isUseExistingProvider(meta) {
    return meta.useExisting !== undefined;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaml0L2luamVjdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFhLFdBQVcsRUFBd0IsZUFBZSxFQUFFLGlCQUFpQixJQUFJLG1CQUFtQixFQUFFLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBSzFKLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRTNELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUdoRTs7O0dBR0c7QUFDSCxNQUFNLDRCQUE0QixJQUFlLEVBQUUsSUFBaUI7SUFDbEUsa0RBQWtEO0lBQ2xELElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxPQUFPO0tBQ1I7SUFFRCxJQUFJLEdBQUcsR0FBUSxJQUFJLENBQUM7SUFDcEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7UUFDN0MsR0FBRyxFQUFFO1lBQ0gsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO2dCQUNoQiwyRUFBMkU7Z0JBQzNFLElBQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQztvQkFDdkUsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTVELElBQUksSUFBSSxHQUFxQyxTQUFTLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN6RSxJQUFJLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2xDO3FCQUFNLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ25DLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDcEQ7cUJBQU0sSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDckMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDMUQ7Z0JBRUQsK0VBQStFO2dCQUMvRSw2Q0FBNkM7Z0JBQzdDLElBQUksUUFBUSxHQUF5QixTQUFTLENBQUM7Z0JBQy9DLElBQUksVUFBVSxHQUF5QixTQUFTLENBQUM7Z0JBQ2pELElBQUksUUFBUSxHQUF5QixTQUFTLENBQUM7Z0JBQy9DLElBQUksV0FBVyxHQUF5QixTQUFTLENBQUM7Z0JBRWxELElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ2pCLHlGQUF5RjtvQkFDekYsc0ZBQXNGO29CQUN0RixVQUFVO29CQUNWLHNDQUFzQztvQkFDdEMsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN0QztxQkFBTSxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNuQyxpRkFBaUY7b0JBQ2pGLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQy9DO3FCQUFNLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ25DLDBDQUEwQztvQkFDMUMsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDL0M7cUJBQU0sSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDckMsNENBQTRDO29CQUM1QyxVQUFVLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNuRDtxQkFBTSxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN0Qyw2Q0FBNkM7b0JBQzdDLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3JEO3FCQUFNO29CQUNMLHlGQUF5RjtvQkFDekYsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2lCQUN2QztnQkFFTSxJQUFBOzs7Ozs7Ozs7NkJBQVUsQ0FTZDtnQkFFSCxHQUFHLEdBQUcsYUFBYSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBUSxJQUFJLENBQUMsSUFBSSx3QkFBcUIsQ0FBQyxDQUFDO2FBQ3pGO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELDJCQUEyQixVQUFnRDtJQUN6RSxJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1FBQ3hELE9BQU8sSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDcEM7U0FBTTtRQUNMLE9BQU8sSUFBSSxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDeEM7QUFDSCxDQUFDO0FBSUQsNEJBQTRCLElBQWdCO0lBQzFDLE9BQVEsSUFBeUIsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDO0FBQzNELENBQUM7QUFFRCxJQUFNLGlCQUFpQixHQUFHLEVBQVMsQ0FBQztTQUVKLGlCQUFpQjtBQURqRCxJQUFNLFNBQVMsR0FBRyxzQkFBc0IsQ0FDcEMsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsSUFBbUIsRUFBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFFdkUsNEJBQTRCLElBQWdCO0lBQzFDLE9BQU8sU0FBUyxJQUFJLElBQUksQ0FBQztBQUMzQixDQUFDO0FBRUQsOEJBQThCLElBQWdCO0lBQzVDLE9BQVEsSUFBNEIsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDO0FBQ2hFLENBQUM7QUFFRCwrQkFBK0IsSUFBZ0I7SUFDN0MsT0FBUSxJQUE2QixDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUM7QUFDbEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFeHByZXNzaW9uLCBMaXRlcmFsRXhwciwgUjNEZXBlbmRlbmN5TWV0YWRhdGEsIFdyYXBwZWROb2RlRXhwciwgY29tcGlsZUluamVjdGFibGUgYXMgY29tcGlsZVIzSW5qZWN0YWJsZSwgaml0RXhwcmVzc2lvbn0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJy4uLy4uL2RpL2luamVjdGFibGUnO1xuaW1wb3J0IHtDbGFzc1NhbnNQcm92aWRlciwgRXhpc3RpbmdTYW5zUHJvdmlkZXIsIEZhY3RvcnlTYW5zUHJvdmlkZXIsIFN0YXRpY0NsYXNzU2Fuc1Byb3ZpZGVyLCBWYWx1ZVByb3ZpZGVyLCBWYWx1ZVNhbnNQcm92aWRlcn0gZnJvbSAnLi4vLi4vZGkvcHJvdmlkZXInO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi8uLi90eXBlJztcbmltcG9ydCB7Z2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0gZnJvbSAnLi4vLi4vdXRpbC9wcm9wZXJ0eSc7XG5cbmltcG9ydCB7YW5ndWxhckNvcmVFbnZ9IGZyb20gJy4vZW52aXJvbm1lbnQnO1xuaW1wb3J0IHtOR19JTkpFQ1RBQkxFX0RFRn0gZnJvbSAnLi9maWVsZHMnO1xuaW1wb3J0IHtjb252ZXJ0RGVwZW5kZW5jaWVzLCByZWZsZWN0RGVwZW5kZW5jaWVzfSBmcm9tICcuL3V0aWwnO1xuXG5cbi8qKlxuICogQ29tcGlsZSBhbiBBbmd1bGFyIGluamVjdGFibGUgYWNjb3JkaW5nIHRvIGl0cyBgSW5qZWN0YWJsZWAgbWV0YWRhdGEsIGFuZCBwYXRjaCB0aGUgcmVzdWx0aW5nXG4gKiBgbmdJbmplY3RhYmxlRGVmYCBvbnRvIHRoZSBpbmplY3RhYmxlIHR5cGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlSW5qZWN0YWJsZSh0eXBlOiBUeXBlPGFueT4sIG1ldGE/OiBJbmplY3RhYmxlKTogdm9pZCB7XG4gIC8vIFRPRE8oYWx4aHViKTogaGFuZGxlIEpJVCBvZiBiYXJlIEBJbmplY3RhYmxlKCkuXG4gIGlmICghbWV0YSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBkZWY6IGFueSA9IG51bGw7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLCBOR19JTkpFQ1RBQkxFX0RFRiwge1xuICAgIGdldDogKCkgPT4ge1xuICAgICAgaWYgKGRlZiA9PT0gbnVsbCkge1xuICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBpbmplY3RhYmxlIG1ldGFkYXRhIGluY2x1ZGVzIGEgcHJvdmlkZXIgc3BlY2lmaWNhdGlvbi5cbiAgICAgICAgY29uc3QgaGFzQVByb3ZpZGVyID0gaXNVc2VDbGFzc1Byb3ZpZGVyKG1ldGEpIHx8IGlzVXNlRmFjdG9yeVByb3ZpZGVyKG1ldGEpIHx8XG4gICAgICAgICAgICBpc1VzZVZhbHVlUHJvdmlkZXIobWV0YSkgfHwgaXNVc2VFeGlzdGluZ1Byb3ZpZGVyKG1ldGEpO1xuXG4gICAgICAgIGxldCBkZXBzOiBSM0RlcGVuZGVuY3lNZXRhZGF0YVtdfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCFoYXNBUHJvdmlkZXIgfHwgKGlzVXNlQ2xhc3NQcm92aWRlcihtZXRhKSAmJiB0eXBlID09PSBtZXRhLnVzZUNsYXNzKSkge1xuICAgICAgICAgIGRlcHMgPSByZWZsZWN0RGVwZW5kZW5jaWVzKHR5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzVXNlQ2xhc3NQcm92aWRlcihtZXRhKSkge1xuICAgICAgICAgIGRlcHMgPSBtZXRhLmRlcHMgJiYgY29udmVydERlcGVuZGVuY2llcyhtZXRhLmRlcHMpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzVXNlRmFjdG9yeVByb3ZpZGVyKG1ldGEpKSB7XG4gICAgICAgICAgZGVwcyA9IG1ldGEuZGVwcyAmJiBjb252ZXJ0RGVwZW5kZW5jaWVzKG1ldGEuZGVwcykgfHwgW107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZWNpZGUgd2hpY2ggZmxhdm9yIG9mIGZhY3RvcnkgdG8gZ2VuZXJhdGUsIGJhc2VkIG9uIHRoZSBwcm92aWRlciBzcGVjaWZpZWQuXG4gICAgICAgIC8vIE9ubHkgb25lIG9mIHRoZSB1c2UqIGZpZWxkcyBzaG91bGQgYmUgc2V0LlxuICAgICAgICBsZXQgdXNlQ2xhc3M6IEV4cHJlc3Npb258dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgdXNlRmFjdG9yeTogRXhwcmVzc2lvbnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCB1c2VWYWx1ZTogRXhwcmVzc2lvbnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCB1c2VFeGlzdGluZzogRXhwcmVzc2lvbnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKCFoYXNBUHJvdmlkZXIpIHtcbiAgICAgICAgICAvLyBJbiB0aGUgY2FzZSB0aGUgdXNlciBzcGVjaWZpZXMgYSB0eXBlIHByb3ZpZGVyLCB0cmVhdCBpdCBhcyB7cHJvdmlkZTogWCwgdXNlQ2xhc3M6IFh9LlxuICAgICAgICAgIC8vIFRoZSBkZXBzIHdpbGwgaGF2ZSBiZWVuIHJlZmxlY3RlZCBhYm92ZSwgY2F1c2luZyB0aGUgZmFjdG9yeSB0byBjcmVhdGUgdGhlIGNsYXNzIGJ5XG4gICAgICAgICAgLy8gY2FsbGluZ1xuICAgICAgICAgIC8vIGl0cyBjb25zdHJ1Y3RvciB3aXRoIGluamVjdGVkIGRlcHMuXG4gICAgICAgICAgdXNlQ2xhc3MgPSBuZXcgV3JhcHBlZE5vZGVFeHByKHR5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzVXNlQ2xhc3NQcm92aWRlcihtZXRhKSkge1xuICAgICAgICAgIC8vIFRoZSB1c2VyIGV4cGxpY2l0bHkgc3BlY2lmaWVkIHVzZUNsYXNzLCBhbmQgbWF5IG9yIG1heSBub3QgaGF2ZSBwcm92aWRlZCBkZXBzLlxuICAgICAgICAgIHVzZUNsYXNzID0gbmV3IFdyYXBwZWROb2RlRXhwcihtZXRhLnVzZUNsYXNzKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1VzZVZhbHVlUHJvdmlkZXIobWV0YSkpIHtcbiAgICAgICAgICAvLyBUaGUgdXNlciBleHBsaWNpdGx5IHNwZWNpZmllZCB1c2VWYWx1ZS5cbiAgICAgICAgICB1c2VWYWx1ZSA9IG5ldyBXcmFwcGVkTm9kZUV4cHIobWV0YS51c2VWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNVc2VGYWN0b3J5UHJvdmlkZXIobWV0YSkpIHtcbiAgICAgICAgICAvLyBUaGUgdXNlciBleHBsaWNpdGx5IHNwZWNpZmllZCB1c2VGYWN0b3J5LlxuICAgICAgICAgIHVzZUZhY3RvcnkgPSBuZXcgV3JhcHBlZE5vZGVFeHByKG1ldGEudXNlRmFjdG9yeSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNVc2VFeGlzdGluZ1Byb3ZpZGVyKG1ldGEpKSB7XG4gICAgICAgICAgLy8gVGhlIHVzZXIgZXhwbGljaXRseSBzcGVjaWZpZWQgdXNlRXhpc3RpbmcuXG4gICAgICAgICAgdXNlRXhpc3RpbmcgPSBuZXcgV3JhcHBlZE5vZGVFeHByKG1ldGEudXNlRXhpc3RpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIENhbid0IGhhcHBlbiAtIGVpdGhlciBoYXNBUHJvdmlkZXIgd2lsbCBiZSBmYWxzZSwgb3Igb25lIG9mIHRoZSBwcm92aWRlcnMgd2lsbCBiZSBzZXQuXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnJlYWNoYWJsZSBzdGF0ZS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHtleHByZXNzaW9ufSA9IGNvbXBpbGVSM0luamVjdGFibGUoe1xuICAgICAgICAgIG5hbWU6IHR5cGUubmFtZSxcbiAgICAgICAgICB0eXBlOiBuZXcgV3JhcHBlZE5vZGVFeHByKHR5cGUpLFxuICAgICAgICAgIHByb3ZpZGVkSW46IGNvbXB1dGVQcm92aWRlZEluKG1ldGEucHJvdmlkZWRJbiksXG4gICAgICAgICAgdXNlQ2xhc3MsXG4gICAgICAgICAgdXNlRmFjdG9yeSxcbiAgICAgICAgICB1c2VWYWx1ZSxcbiAgICAgICAgICB1c2VFeGlzdGluZyxcbiAgICAgICAgICBkZXBzLFxuICAgICAgICB9KTtcblxuICAgICAgICBkZWYgPSBqaXRFeHByZXNzaW9uKGV4cHJlc3Npb24sIGFuZ3VsYXJDb3JlRW52LCBgbmc6Ly8ke3R5cGUubmFtZX0vbmdJbmplY3RhYmxlRGVmLmpzYCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmO1xuICAgIH0sXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjb21wdXRlUHJvdmlkZWRJbihwcm92aWRlZEluOiBUeXBlPGFueT58IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBFeHByZXNzaW9uIHtcbiAgaWYgKHByb3ZpZGVkSW4gPT0gbnVsbCB8fCB0eXBlb2YgcHJvdmlkZWRJbiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV3IExpdGVyYWxFeHByKHByb3ZpZGVkSW4pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgV3JhcHBlZE5vZGVFeHByKHByb3ZpZGVkSW4pO1xuICB9XG59XG5cbnR5cGUgVXNlQ2xhc3NQcm92aWRlciA9IEluamVjdGFibGUgJiBDbGFzc1NhbnNQcm92aWRlciAmIHtkZXBzPzogYW55W119O1xuXG5mdW5jdGlvbiBpc1VzZUNsYXNzUHJvdmlkZXIobWV0YTogSW5qZWN0YWJsZSk6IG1ldGEgaXMgVXNlQ2xhc3NQcm92aWRlciB7XG4gIHJldHVybiAobWV0YSBhcyBVc2VDbGFzc1Byb3ZpZGVyKS51c2VDbGFzcyAhPT0gdW5kZWZpbmVkO1xufVxuXG5jb25zdCBHRVRfUFJPUEVSVFlfTkFNRSA9IHt9IGFzIGFueTtcbmNvbnN0IFVTRV9WQUxVRSA9IGdldENsb3N1cmVTYWZlUHJvcGVydHk8VmFsdWVQcm92aWRlcj4oXG4gICAge3Byb3ZpZGU6IFN0cmluZywgdXNlVmFsdWU6IEdFVF9QUk9QRVJUWV9OQU1FfSwgR0VUX1BST1BFUlRZX05BTUUpO1xuXG5mdW5jdGlvbiBpc1VzZVZhbHVlUHJvdmlkZXIobWV0YTogSW5qZWN0YWJsZSk6IG1ldGEgaXMgSW5qZWN0YWJsZSZWYWx1ZVNhbnNQcm92aWRlciB7XG4gIHJldHVybiBVU0VfVkFMVUUgaW4gbWV0YTtcbn1cblxuZnVuY3Rpb24gaXNVc2VGYWN0b3J5UHJvdmlkZXIobWV0YTogSW5qZWN0YWJsZSk6IG1ldGEgaXMgSW5qZWN0YWJsZSZGYWN0b3J5U2Fuc1Byb3ZpZGVyIHtcbiAgcmV0dXJuIChtZXRhIGFzIEZhY3RvcnlTYW5zUHJvdmlkZXIpLnVzZUZhY3RvcnkgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNVc2VFeGlzdGluZ1Byb3ZpZGVyKG1ldGE6IEluamVjdGFibGUpOiBtZXRhIGlzIEluamVjdGFibGUmRXhpc3RpbmdTYW5zUHJvdmlkZXIge1xuICByZXR1cm4gKG1ldGEgYXMgRXhpc3RpbmdTYW5zUHJvdmlkZXIpLnVzZUV4aXN0aW5nICE9PSB1bmRlZmluZWQ7XG59XG4iXX0=