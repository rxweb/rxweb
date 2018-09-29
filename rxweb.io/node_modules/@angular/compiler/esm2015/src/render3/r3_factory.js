/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { StaticSymbol } from '../aot/static_symbol';
import { tokenReference } from '../compile_metadata';
import { Identifiers } from '../identifiers';
import * as o from '../output/output_ast';
import { Identifiers as R3 } from '../render3/r3_identifiers';
import { unsupported } from './view/util';
/**
 * Resolved type of a dependency.
 *
 * Occasionally, dependencies will have special significance which is known statically. In that
 * case the `R3ResolvedDependencyType` informs the factory generator that a particular dependency
 * should be generated specially (usually by calling a special injection function instead of the
 * standard one).
 */
export var R3ResolvedDependencyType;
(function (R3ResolvedDependencyType) {
    /**
     * A normal token dependency.
     */
    R3ResolvedDependencyType[R3ResolvedDependencyType["Token"] = 0] = "Token";
    /**
     * The dependency is for an attribute.
     *
     * The token expression is a string representing the attribute name.
     */
    R3ResolvedDependencyType[R3ResolvedDependencyType["Attribute"] = 1] = "Attribute";
    /**
     * The dependency is for the `Injector` type itself.
     */
    R3ResolvedDependencyType[R3ResolvedDependencyType["Injector"] = 2] = "Injector";
    /**
     * The dependency is for `ElementRef`.
     */
    R3ResolvedDependencyType[R3ResolvedDependencyType["ElementRef"] = 3] = "ElementRef";
    /**
     * The dependency is for `TemplateRef`.
     */
    R3ResolvedDependencyType[R3ResolvedDependencyType["TemplateRef"] = 4] = "TemplateRef";
    /**
     * The dependency is for `ViewContainerRef`.
     */
    R3ResolvedDependencyType[R3ResolvedDependencyType["ViewContainerRef"] = 5] = "ViewContainerRef";
    /**
     * The dependency is for `ChangeDetectorRef`.
     */
    R3ResolvedDependencyType[R3ResolvedDependencyType["ChangeDetectorRef"] = 6] = "ChangeDetectorRef";
})(R3ResolvedDependencyType || (R3ResolvedDependencyType = {}));
/**
 * Construct a factory function expression for the given `R3FactoryMetadata`.
 */
export function compileFactoryFunction(meta) {
    // Each dependency becomes an invocation of an inject*() function.
    const args = meta.deps.map(dep => compileInjectDependency(dep, meta.injectFn));
    // The overall result depends on whether this is construction or function invocation.
    const expr = meta.useNew ? new o.InstantiateExpr(meta.fnOrClass, args) :
        new o.InvokeFunctionExpr(meta.fnOrClass, args);
    return o.fn([], [new o.ReturnStatement(expr)], o.INFERRED_TYPE, undefined, `${meta.name}_Factory`);
}
function compileInjectDependency(dep, injectFn) {
    // Interpret the dependency according to its resolved type.
    switch (dep.resolved) {
        case R3ResolvedDependencyType.Token:
        case R3ResolvedDependencyType.Injector: {
            // Build up the injection flags according to the metadata.
            const flags = 0 /* Default */ | (dep.self ? 2 /* Self */ : 0) |
                (dep.skipSelf ? 4 /* SkipSelf */ : 0) | (dep.host ? 1 /* Host */ : 0) |
                (dep.optional ? 8 /* Optional */ : 0);
            // Determine the token used for injection. In almost all cases this is the given token, but
            // if the dependency is resolved to the `Injector` then the special `INJECTOR` token is used
            // instead.
            let token = dep.token;
            if (dep.resolved === R3ResolvedDependencyType.Injector) {
                token = o.importExpr(Identifiers.INJECTOR);
            }
            // Build up the arguments to the injectFn call.
            const injectArgs = [token];
            // If this dependency is optional or otherwise has non-default flags, then additional
            // parameters describing how to inject the dependency must be passed to the inject function
            // that's being used.
            if (flags !== 0 /* Default */ || dep.optional) {
                injectArgs.push(o.literal(flags));
            }
            return o.importExpr(injectFn).callFn(injectArgs);
        }
        case R3ResolvedDependencyType.Attribute:
            // In the case of attributes, the attribute name in question is given as the token.
            return o.importExpr(R3.injectAttribute).callFn([dep.token]);
        case R3ResolvedDependencyType.ElementRef:
            return o.importExpr(R3.injectElementRef).callFn([]);
        case R3ResolvedDependencyType.TemplateRef:
            return o.importExpr(R3.injectTemplateRef).callFn([]);
        case R3ResolvedDependencyType.ViewContainerRef:
            return o.importExpr(R3.injectViewContainerRef).callFn([]);
        case R3ResolvedDependencyType.ChangeDetectorRef:
            return o.importExpr(R3.injectChangeDetectorRef).callFn([]);
        default:
            return unsupported(`Unknown R3ResolvedDependencyType: ${R3ResolvedDependencyType[dep.resolved]}`);
    }
}
/**
 * A helper function useful for extracting `R3DependencyMetadata` from a Render2
 * `CompileTypeMetadata` instance.
 */
export function dependenciesFromGlobalMetadata(type, outputCtx, reflector) {
    // Use the `CompileReflector` to look up references to some well-known Angular types. These will
    // be compared with the token to statically determine whether the token has significance to
    // Angular, and set the correct `R3ResolvedDependencyType` as a result.
    const elementRef = reflector.resolveExternalReference(Identifiers.ElementRef);
    const templateRef = reflector.resolveExternalReference(Identifiers.TemplateRef);
    const viewContainerRef = reflector.resolveExternalReference(Identifiers.ViewContainerRef);
    const injectorRef = reflector.resolveExternalReference(Identifiers.Injector);
    // Iterate through the type's DI dependencies and produce `R3DependencyMetadata` for each of them.
    const deps = [];
    for (let dependency of type.diDeps) {
        if (dependency.token) {
            const tokenRef = tokenReference(dependency.token);
            let resolved = R3ResolvedDependencyType.Token;
            if (tokenRef === elementRef) {
                resolved = R3ResolvedDependencyType.ElementRef;
            }
            else if (tokenRef === templateRef) {
                resolved = R3ResolvedDependencyType.TemplateRef;
            }
            else if (tokenRef === viewContainerRef) {
                resolved = R3ResolvedDependencyType.ViewContainerRef;
            }
            else if (tokenRef === injectorRef) {
                resolved = R3ResolvedDependencyType.Injector;
            }
            else if (dependency.isAttribute) {
                resolved = R3ResolvedDependencyType.Attribute;
            }
            // In the case of most dependencies, the token will be a reference to a type. Sometimes,
            // however, it can be a string, in the case of older Angular code or @Attribute injection.
            const token = tokenRef instanceof StaticSymbol ? outputCtx.importExpr(tokenRef) : o.literal(tokenRef);
            // Construct the dependency.
            deps.push({
                token,
                resolved,
                host: !!dependency.isHost,
                optional: !!dependency.isOptional,
                self: !!dependency.isSelf,
                skipSelf: !!dependency.isSkipSelf,
            });
        }
        else {
            unsupported('dependency without a token');
        }
    }
    return deps;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBc0IsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFHeEUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sS0FBSyxDQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDMUMsT0FBTyxFQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUc1RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBeUN4Qzs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxDQUFOLElBQVksd0JBcUNYO0FBckNELFdBQVksd0JBQXdCO0lBQ2xDOztPQUVHO0lBQ0gseUVBQVMsQ0FBQTtJQUVUOzs7O09BSUc7SUFDSCxpRkFBYSxDQUFBO0lBRWI7O09BRUc7SUFDSCwrRUFBWSxDQUFBO0lBRVo7O09BRUc7SUFDSCxtRkFBYyxDQUFBO0lBRWQ7O09BRUc7SUFDSCxxRkFBZSxDQUFBO0lBRWY7O09BRUc7SUFDSCwrRkFBb0IsQ0FBQTtJQUVwQjs7T0FFRztJQUNILGlHQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFyQ1csd0JBQXdCLEtBQXhCLHdCQUF3QixRQXFDbkM7QUFzQ0Q7O0dBRUc7QUFDSCxNQUFNLGlDQUFpQyxJQUF1QjtJQUM1RCxrRUFBa0U7SUFDbEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFL0UscUZBQXFGO0lBQ3JGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUUxRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQ1AsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBRUQsaUNBQ0ksR0FBeUIsRUFBRSxRQUE2QjtJQUMxRCwyREFBMkQ7SUFDM0QsUUFBUSxHQUFHLENBQUMsUUFBUSxFQUFFO1FBQ3BCLEtBQUssd0JBQXdCLENBQUMsS0FBSyxDQUFDO1FBQ3BDLEtBQUssd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsMERBQTBEO1lBQzFELE1BQU0sS0FBSyxHQUFHLGtCQUFzQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxrQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGtCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsMkZBQTJGO1lBQzNGLDRGQUE0RjtZQUM1RixXQUFXO1lBQ1gsSUFBSSxLQUFLLEdBQWlCLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDcEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLHdCQUF3QixDQUFDLFFBQVEsRUFBRTtnQkFDdEQsS0FBSyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzVDO1lBRUQsK0NBQStDO1lBQy9DLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IscUZBQXFGO1lBQ3JGLDJGQUEyRjtZQUMzRixxQkFBcUI7WUFDckIsSUFBSSxLQUFLLG9CQUF3QixJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pELFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNsRDtRQUNELEtBQUssd0JBQXdCLENBQUMsU0FBUztZQUNyQyxtRkFBbUY7WUFDbkYsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM5RCxLQUFLLHdCQUF3QixDQUFDLFVBQVU7WUFDdEMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0RCxLQUFLLHdCQUF3QixDQUFDLFdBQVc7WUFDdkMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2RCxLQUFLLHdCQUF3QixDQUFDLGdCQUFnQjtZQUM1QyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLHNCQUFzQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVELEtBQUssd0JBQXdCLENBQUMsaUJBQWlCO1lBQzdDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0Q7WUFDRSxPQUFPLFdBQVcsQ0FDZCxxQ0FBcUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN0RjtBQUNILENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLHlDQUNGLElBQXlCLEVBQUUsU0FBd0IsRUFDbkQsU0FBMkI7SUFDN0IsZ0dBQWdHO0lBQ2hHLDJGQUEyRjtJQUMzRix1RUFBdUU7SUFDdkUsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5RSxNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsd0JBQXdCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hGLE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFGLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFN0Usa0dBQWtHO0lBQ2xHLE1BQU0sSUFBSSxHQUEyQixFQUFFLENBQUM7SUFDeEMsS0FBSyxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ2xDLElBQUksVUFBVSxDQUFDLEtBQUssRUFBRTtZQUNwQixNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELElBQUksUUFBUSxHQUE2Qix3QkFBd0IsQ0FBQyxLQUFLLENBQUM7WUFDeEUsSUFBSSxRQUFRLEtBQUssVUFBVSxFQUFFO2dCQUMzQixRQUFRLEdBQUcsd0JBQXdCLENBQUMsVUFBVSxDQUFDO2FBQ2hEO2lCQUFNLElBQUksUUFBUSxLQUFLLFdBQVcsRUFBRTtnQkFDbkMsUUFBUSxHQUFHLHdCQUF3QixDQUFDLFdBQVcsQ0FBQzthQUNqRDtpQkFBTSxJQUFJLFFBQVEsS0FBSyxnQkFBZ0IsRUFBRTtnQkFDeEMsUUFBUSxHQUFHLHdCQUF3QixDQUFDLGdCQUFnQixDQUFDO2FBQ3REO2lCQUFNLElBQUksUUFBUSxLQUFLLFdBQVcsRUFBRTtnQkFDbkMsUUFBUSxHQUFHLHdCQUF3QixDQUFDLFFBQVEsQ0FBQzthQUM5QztpQkFBTSxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2pDLFFBQVEsR0FBRyx3QkFBd0IsQ0FBQyxTQUFTLENBQUM7YUFDL0M7WUFFRCx3RkFBd0Y7WUFDeEYsMEZBQTBGO1lBQzFGLE1BQU0sS0FBSyxHQUNQLFFBQVEsWUFBWSxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFNUYsNEJBQTRCO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ1IsS0FBSztnQkFDTCxRQUFRO2dCQUNSLElBQUksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU07Z0JBQ3pCLFFBQVEsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVU7Z0JBQ2pDLElBQUksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU07Z0JBQ3pCLFFBQVEsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVU7YUFDbEMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLFdBQVcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQzNDO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7U3RhdGljU3ltYm9sfSBmcm9tICcuLi9hb3Qvc3RhdGljX3N5bWJvbCc7XG5pbXBvcnQge0NvbXBpbGVUeXBlTWV0YWRhdGEsIHRva2VuUmVmZXJlbmNlfSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7Q29tcGlsZVJlZmxlY3Rvcn0gZnJvbSAnLi4vY29tcGlsZV9yZWZsZWN0b3InO1xuaW1wb3J0IHtJbmplY3RGbGFnc30gZnJvbSAnLi4vY29yZSc7XG5pbXBvcnQge0lkZW50aWZpZXJzfSBmcm9tICcuLi9pZGVudGlmaWVycyc7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4uL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7SWRlbnRpZmllcnMgYXMgUjN9IGZyb20gJy4uL3JlbmRlcjMvcjNfaWRlbnRpZmllcnMnO1xuaW1wb3J0IHtPdXRwdXRDb250ZXh0fSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHt1bnN1cHBvcnRlZH0gZnJvbSAnLi92aWV3L3V0aWwnO1xuXG4vKipcbiAqIE1ldGFkYXRhIHJlcXVpcmVkIGJ5IHRoZSBmYWN0b3J5IGdlbmVyYXRvciB0byBnZW5lcmF0ZSBhIGBmYWN0b3J5YCBmdW5jdGlvbiBmb3IgYSB0eXBlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFIzRmFjdG9yeU1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIFN0cmluZyBuYW1lIG9mIHRoZSB0eXBlIGJlaW5nIGdlbmVyYXRlZCAodXNlZCB0byBuYW1lIHRoZSBmYWN0b3J5IGZ1bmN0aW9uKS5cbiAgICovXG4gIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogQW4gZXhwcmVzc2lvbiByZXByZXNlbnRpbmcgdGhlIGZ1bmN0aW9uIChvciBjb25zdHJ1Y3Rvcikgd2hpY2ggd2lsbCBpbnN0YW50aWF0ZSB0aGUgcmVxdWVzdGVkXG4gICAqIHR5cGUuXG4gICAqXG4gICAqIFRoaXMgY291bGQgYmUgYSByZWZlcmVuY2UgdG8gYSBjb25zdHJ1Y3RvciB0eXBlLCBvciB0byBhIHVzZXItZGVmaW5lZCBmYWN0b3J5IGZ1bmN0aW9uLiBUaGVcbiAgICogYHVzZU5ld2AgcHJvcGVydHkgZGV0ZXJtaW5lcyB3aGV0aGVyIGl0IHdpbGwgYmUgY2FsbGVkIGFzIGEgY29uc3RydWN0b3Igb3Igbm90LlxuICAgKi9cbiAgZm5PckNsYXNzOiBvLkV4cHJlc3Npb247XG5cbiAgLyoqXG4gICAqIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBgZm5PckNsYXNzYCBpcyBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIG9yIGEgdXNlci1kZWZpbmVkIGZhY3RvcnksIGl0XG4gICAqIG1heSBoYXZlIDAgb3IgbW9yZSBwYXJhbWV0ZXJzLCB3aGljaCB3aWxsIGJlIGluamVjdGVkIGFjY29yZGluZyB0byB0aGUgYFIzRGVwZW5kZW5jeU1ldGFkYXRhYFxuICAgKiBmb3IgdGhvc2UgcGFyYW1ldGVycy5cbiAgICovXG4gIGRlcHM6IFIzRGVwZW5kZW5jeU1ldGFkYXRhW107XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gaW50ZXJwcmV0IGBmbk9yQ2xhc3NgIGFzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gKGB1c2VOZXc6IHRydWVgKSBvciBhcyBhIGZhY3RvcnlcbiAgICogKGB1c2VOZXc6IGZhbHNlYCkuXG4gICAqL1xuICB1c2VOZXc6IGJvb2xlYW47XG5cblxuICAvKipcbiAgICogQW4gZXhwcmVzc2lvbiBmb3IgdGhlIGZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgdXNlZCB0byBpbmplY3QgZGVwZW5kZW5jaWVzLiBUaGUgQVBJIG9mIHRoaXNcbiAgICogZnVuY3Rpb24gY291bGQgYmUgZGlmZmVyZW50LCBhbmQgb3RoZXIgb3B0aW9ucyBjb250cm9sIGhvdyBpdCB3aWxsIGJlIGludm9rZWQuXG4gICAqL1xuICBpbmplY3RGbjogby5FeHRlcm5hbFJlZmVyZW5jZTtcbn1cblxuLyoqXG4gKiBSZXNvbHZlZCB0eXBlIG9mIGEgZGVwZW5kZW5jeS5cbiAqXG4gKiBPY2Nhc2lvbmFsbHksIGRlcGVuZGVuY2llcyB3aWxsIGhhdmUgc3BlY2lhbCBzaWduaWZpY2FuY2Ugd2hpY2ggaXMga25vd24gc3RhdGljYWxseS4gSW4gdGhhdFxuICogY2FzZSB0aGUgYFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZWAgaW5mb3JtcyB0aGUgZmFjdG9yeSBnZW5lcmF0b3IgdGhhdCBhIHBhcnRpY3VsYXIgZGVwZW5kZW5jeVxuICogc2hvdWxkIGJlIGdlbmVyYXRlZCBzcGVjaWFsbHkgKHVzdWFsbHkgYnkgY2FsbGluZyBhIHNwZWNpYWwgaW5qZWN0aW9uIGZ1bmN0aW9uIGluc3RlYWQgb2YgdGhlXG4gKiBzdGFuZGFyZCBvbmUpLlxuICovXG5leHBvcnQgZW51bSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUge1xuICAvKipcbiAgICogQSBub3JtYWwgdG9rZW4gZGVwZW5kZW5jeS5cbiAgICovXG4gIFRva2VuID0gMCxcblxuICAvKipcbiAgICogVGhlIGRlcGVuZGVuY3kgaXMgZm9yIGFuIGF0dHJpYnV0ZS5cbiAgICpcbiAgICogVGhlIHRva2VuIGV4cHJlc3Npb24gaXMgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBhdHRyaWJ1dGUgbmFtZS5cbiAgICovXG4gIEF0dHJpYnV0ZSA9IDEsXG5cbiAgLyoqXG4gICAqIFRoZSBkZXBlbmRlbmN5IGlzIGZvciB0aGUgYEluamVjdG9yYCB0eXBlIGl0c2VsZi5cbiAgICovXG4gIEluamVjdG9yID0gMixcblxuICAvKipcbiAgICogVGhlIGRlcGVuZGVuY3kgaXMgZm9yIGBFbGVtZW50UmVmYC5cbiAgICovXG4gIEVsZW1lbnRSZWYgPSAzLFxuXG4gIC8qKlxuICAgKiBUaGUgZGVwZW5kZW5jeSBpcyBmb3IgYFRlbXBsYXRlUmVmYC5cbiAgICovXG4gIFRlbXBsYXRlUmVmID0gNCxcblxuICAvKipcbiAgICogVGhlIGRlcGVuZGVuY3kgaXMgZm9yIGBWaWV3Q29udGFpbmVyUmVmYC5cbiAgICovXG4gIFZpZXdDb250YWluZXJSZWYgPSA1LFxuXG4gIC8qKlxuICAgKiBUaGUgZGVwZW5kZW5jeSBpcyBmb3IgYENoYW5nZURldGVjdG9yUmVmYC5cbiAgICovXG4gIENoYW5nZURldGVjdG9yUmVmID0gNixcbn1cblxuLyoqXG4gKiBNZXRhZGF0YSByZXByZXNlbnRpbmcgYSBzaW5nbGUgZGVwZW5kZW5jeSB0byBiZSBpbmplY3RlZCBpbnRvIGEgY29uc3RydWN0b3Igb3IgZnVuY3Rpb24gY2FsbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSM0RlcGVuZGVuY3lNZXRhZGF0YSB7XG4gIC8qKlxuICAgKiBBbiBleHByZXNzaW9uIHJlcHJlc2VudGluZyB0aGUgdG9rZW4gb3IgdmFsdWUgdG8gYmUgaW5qZWN0ZWQuXG4gICAqL1xuICB0b2tlbjogby5FeHByZXNzaW9uO1xuXG4gIC8qKlxuICAgKiBBbiBlbnVtIGluZGljYXRpbmcgd2hldGhlciB0aGlzIGRlcGVuZGVuY3kgaGFzIHNwZWNpYWwgbWVhbmluZyB0byBBbmd1bGFyIGFuZCBuZWVkcyB0byBiZVxuICAgKiBpbmplY3RlZCBzcGVjaWFsbHkuXG4gICAqL1xuICByZXNvbHZlZDogUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkZXBlbmRlbmN5IGhhcyBhbiBASG9zdCBxdWFsaWZpZXIuXG4gICAqL1xuICBob3N0OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkZXBlbmRlbmN5IGhhcyBhbiBAT3B0aW9uYWwgcXVhbGlmaWVyLlxuICAgKi9cbiAgb3B0aW9uYWw6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRlcGVuZGVuY3kgaGFzIGFuIEBTZWxmIHF1YWxpZmllci5cbiAgICovXG4gIHNlbGY6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRlcGVuZGVuY3kgaGFzIGFuIEBTa2lwU2VsZiBxdWFsaWZpZXIuXG4gICAqL1xuICBza2lwU2VsZjogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3QgYSBmYWN0b3J5IGZ1bmN0aW9uIGV4cHJlc3Npb24gZm9yIHRoZSBnaXZlbiBgUjNGYWN0b3J5TWV0YWRhdGFgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZUZhY3RvcnlGdW5jdGlvbihtZXRhOiBSM0ZhY3RvcnlNZXRhZGF0YSk6IG8uRXhwcmVzc2lvbiB7XG4gIC8vIEVhY2ggZGVwZW5kZW5jeSBiZWNvbWVzIGFuIGludm9jYXRpb24gb2YgYW4gaW5qZWN0KigpIGZ1bmN0aW9uLlxuICBjb25zdCBhcmdzID0gbWV0YS5kZXBzLm1hcChkZXAgPT4gY29tcGlsZUluamVjdERlcGVuZGVuY3koZGVwLCBtZXRhLmluamVjdEZuKSk7XG5cbiAgLy8gVGhlIG92ZXJhbGwgcmVzdWx0IGRlcGVuZHMgb24gd2hldGhlciB0aGlzIGlzIGNvbnN0cnVjdGlvbiBvciBmdW5jdGlvbiBpbnZvY2F0aW9uLlxuICBjb25zdCBleHByID0gbWV0YS51c2VOZXcgPyBuZXcgby5JbnN0YW50aWF0ZUV4cHIobWV0YS5mbk9yQ2xhc3MsIGFyZ3MpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IG8uSW52b2tlRnVuY3Rpb25FeHByKG1ldGEuZm5PckNsYXNzLCBhcmdzKTtcblxuICByZXR1cm4gby5mbihcbiAgICAgIFtdLCBbbmV3IG8uUmV0dXJuU3RhdGVtZW50KGV4cHIpXSwgby5JTkZFUlJFRF9UWVBFLCB1bmRlZmluZWQsIGAke21ldGEubmFtZX1fRmFjdG9yeWApO1xufVxuXG5mdW5jdGlvbiBjb21waWxlSW5qZWN0RGVwZW5kZW5jeShcbiAgICBkZXA6IFIzRGVwZW5kZW5jeU1ldGFkYXRhLCBpbmplY3RGbjogby5FeHRlcm5hbFJlZmVyZW5jZSk6IG8uRXhwcmVzc2lvbiB7XG4gIC8vIEludGVycHJldCB0aGUgZGVwZW5kZW5jeSBhY2NvcmRpbmcgdG8gaXRzIHJlc29sdmVkIHR5cGUuXG4gIHN3aXRjaCAoZGVwLnJlc29sdmVkKSB7XG4gICAgY2FzZSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuVG9rZW46XG4gICAgY2FzZSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuSW5qZWN0b3I6IHtcbiAgICAgIC8vIEJ1aWxkIHVwIHRoZSBpbmplY3Rpb24gZmxhZ3MgYWNjb3JkaW5nIHRvIHRoZSBtZXRhZGF0YS5cbiAgICAgIGNvbnN0IGZsYWdzID0gSW5qZWN0RmxhZ3MuRGVmYXVsdCB8IChkZXAuc2VsZiA/IEluamVjdEZsYWdzLlNlbGYgOiAwKSB8XG4gICAgICAgICAgKGRlcC5za2lwU2VsZiA/IEluamVjdEZsYWdzLlNraXBTZWxmIDogMCkgfCAoZGVwLmhvc3QgPyBJbmplY3RGbGFncy5Ib3N0IDogMCkgfFxuICAgICAgICAgIChkZXAub3B0aW9uYWwgPyBJbmplY3RGbGFncy5PcHRpb25hbCA6IDApO1xuICAgICAgLy8gRGV0ZXJtaW5lIHRoZSB0b2tlbiB1c2VkIGZvciBpbmplY3Rpb24uIEluIGFsbW9zdCBhbGwgY2FzZXMgdGhpcyBpcyB0aGUgZ2l2ZW4gdG9rZW4sIGJ1dFxuICAgICAgLy8gaWYgdGhlIGRlcGVuZGVuY3kgaXMgcmVzb2x2ZWQgdG8gdGhlIGBJbmplY3RvcmAgdGhlbiB0aGUgc3BlY2lhbCBgSU5KRUNUT1JgIHRva2VuIGlzIHVzZWRcbiAgICAgIC8vIGluc3RlYWQuXG4gICAgICBsZXQgdG9rZW46IG8uRXhwcmVzc2lvbiA9IGRlcC50b2tlbjtcbiAgICAgIGlmIChkZXAucmVzb2x2ZWQgPT09IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5JbmplY3Rvcikge1xuICAgICAgICB0b2tlbiA9IG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5JTkpFQ1RPUik7XG4gICAgICB9XG5cbiAgICAgIC8vIEJ1aWxkIHVwIHRoZSBhcmd1bWVudHMgdG8gdGhlIGluamVjdEZuIGNhbGwuXG4gICAgICBjb25zdCBpbmplY3RBcmdzID0gW3Rva2VuXTtcbiAgICAgIC8vIElmIHRoaXMgZGVwZW5kZW5jeSBpcyBvcHRpb25hbCBvciBvdGhlcndpc2UgaGFzIG5vbi1kZWZhdWx0IGZsYWdzLCB0aGVuIGFkZGl0aW9uYWxcbiAgICAgIC8vIHBhcmFtZXRlcnMgZGVzY3JpYmluZyBob3cgdG8gaW5qZWN0IHRoZSBkZXBlbmRlbmN5IG11c3QgYmUgcGFzc2VkIHRvIHRoZSBpbmplY3QgZnVuY3Rpb25cbiAgICAgIC8vIHRoYXQncyBiZWluZyB1c2VkLlxuICAgICAgaWYgKGZsYWdzICE9PSBJbmplY3RGbGFncy5EZWZhdWx0IHx8IGRlcC5vcHRpb25hbCkge1xuICAgICAgICBpbmplY3RBcmdzLnB1c2goby5saXRlcmFsKGZsYWdzKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKGluamVjdEZuKS5jYWxsRm4oaW5qZWN0QXJncyk7XG4gICAgfVxuICAgIGNhc2UgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLkF0dHJpYnV0ZTpcbiAgICAgIC8vIEluIHRoZSBjYXNlIG9mIGF0dHJpYnV0ZXMsIHRoZSBhdHRyaWJ1dGUgbmFtZSBpbiBxdWVzdGlvbiBpcyBnaXZlbiBhcyB0aGUgdG9rZW4uXG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKFIzLmluamVjdEF0dHJpYnV0ZSkuY2FsbEZuKFtkZXAudG9rZW5dKTtcbiAgICBjYXNlIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5FbGVtZW50UmVmOlxuICAgICAgcmV0dXJuIG8uaW1wb3J0RXhwcihSMy5pbmplY3RFbGVtZW50UmVmKS5jYWxsRm4oW10pO1xuICAgIGNhc2UgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLlRlbXBsYXRlUmVmOlxuICAgICAgcmV0dXJuIG8uaW1wb3J0RXhwcihSMy5pbmplY3RUZW1wbGF0ZVJlZikuY2FsbEZuKFtdKTtcbiAgICBjYXNlIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5WaWV3Q29udGFpbmVyUmVmOlxuICAgICAgcmV0dXJuIG8uaW1wb3J0RXhwcihSMy5pbmplY3RWaWV3Q29udGFpbmVyUmVmKS5jYWxsRm4oW10pO1xuICAgIGNhc2UgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLkNoYW5nZURldGVjdG9yUmVmOlxuICAgICAgcmV0dXJuIG8uaW1wb3J0RXhwcihSMy5pbmplY3RDaGFuZ2VEZXRlY3RvclJlZikuY2FsbEZuKFtdKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuc3VwcG9ydGVkKFxuICAgICAgICAgIGBVbmtub3duIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZTogJHtSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGVbZGVwLnJlc29sdmVkXX1gKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgaGVscGVyIGZ1bmN0aW9uIHVzZWZ1bCBmb3IgZXh0cmFjdGluZyBgUjNEZXBlbmRlbmN5TWV0YWRhdGFgIGZyb20gYSBSZW5kZXIyXG4gKiBgQ29tcGlsZVR5cGVNZXRhZGF0YWAgaW5zdGFuY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXBlbmRlbmNpZXNGcm9tR2xvYmFsTWV0YWRhdGEoXG4gICAgdHlwZTogQ29tcGlsZVR5cGVNZXRhZGF0YSwgb3V0cHV0Q3R4OiBPdXRwdXRDb250ZXh0LFxuICAgIHJlZmxlY3RvcjogQ29tcGlsZVJlZmxlY3Rvcik6IFIzRGVwZW5kZW5jeU1ldGFkYXRhW10ge1xuICAvLyBVc2UgdGhlIGBDb21waWxlUmVmbGVjdG9yYCB0byBsb29rIHVwIHJlZmVyZW5jZXMgdG8gc29tZSB3ZWxsLWtub3duIEFuZ3VsYXIgdHlwZXMuIFRoZXNlIHdpbGxcbiAgLy8gYmUgY29tcGFyZWQgd2l0aCB0aGUgdG9rZW4gdG8gc3RhdGljYWxseSBkZXRlcm1pbmUgd2hldGhlciB0aGUgdG9rZW4gaGFzIHNpZ25pZmljYW5jZSB0b1xuICAvLyBBbmd1bGFyLCBhbmQgc2V0IHRoZSBjb3JyZWN0IGBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGVgIGFzIGEgcmVzdWx0LlxuICBjb25zdCBlbGVtZW50UmVmID0gcmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShJZGVudGlmaWVycy5FbGVtZW50UmVmKTtcbiAgY29uc3QgdGVtcGxhdGVSZWYgPSByZWZsZWN0b3IucmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKElkZW50aWZpZXJzLlRlbXBsYXRlUmVmKTtcbiAgY29uc3Qgdmlld0NvbnRhaW5lclJlZiA9IHJlZmxlY3Rvci5yZXNvbHZlRXh0ZXJuYWxSZWZlcmVuY2UoSWRlbnRpZmllcnMuVmlld0NvbnRhaW5lclJlZik7XG4gIGNvbnN0IGluamVjdG9yUmVmID0gcmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShJZGVudGlmaWVycy5JbmplY3Rvcik7XG5cbiAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSB0eXBlJ3MgREkgZGVwZW5kZW5jaWVzIGFuZCBwcm9kdWNlIGBSM0RlcGVuZGVuY3lNZXRhZGF0YWAgZm9yIGVhY2ggb2YgdGhlbS5cbiAgY29uc3QgZGVwczogUjNEZXBlbmRlbmN5TWV0YWRhdGFbXSA9IFtdO1xuICBmb3IgKGxldCBkZXBlbmRlbmN5IG9mIHR5cGUuZGlEZXBzKSB7XG4gICAgaWYgKGRlcGVuZGVuY3kudG9rZW4pIHtcbiAgICAgIGNvbnN0IHRva2VuUmVmID0gdG9rZW5SZWZlcmVuY2UoZGVwZW5kZW5jeS50b2tlbik7XG4gICAgICBsZXQgcmVzb2x2ZWQ6IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZSA9IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5Ub2tlbjtcbiAgICAgIGlmICh0b2tlblJlZiA9PT0gZWxlbWVudFJlZikge1xuICAgICAgICByZXNvbHZlZCA9IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5FbGVtZW50UmVmO1xuICAgICAgfSBlbHNlIGlmICh0b2tlblJlZiA9PT0gdGVtcGxhdGVSZWYpIHtcbiAgICAgICAgcmVzb2x2ZWQgPSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuVGVtcGxhdGVSZWY7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuUmVmID09PSB2aWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICAgIHJlc29sdmVkID0gUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLlZpZXdDb250YWluZXJSZWY7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuUmVmID09PSBpbmplY3RvclJlZikge1xuICAgICAgICByZXNvbHZlZCA9IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5JbmplY3RvcjtcbiAgICAgIH0gZWxzZSBpZiAoZGVwZW5kZW5jeS5pc0F0dHJpYnV0ZSkge1xuICAgICAgICByZXNvbHZlZCA9IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5BdHRyaWJ1dGU7XG4gICAgICB9XG5cbiAgICAgIC8vIEluIHRoZSBjYXNlIG9mIG1vc3QgZGVwZW5kZW5jaWVzLCB0aGUgdG9rZW4gd2lsbCBiZSBhIHJlZmVyZW5jZSB0byBhIHR5cGUuIFNvbWV0aW1lcyxcbiAgICAgIC8vIGhvd2V2ZXIsIGl0IGNhbiBiZSBhIHN0cmluZywgaW4gdGhlIGNhc2Ugb2Ygb2xkZXIgQW5ndWxhciBjb2RlIG9yIEBBdHRyaWJ1dGUgaW5qZWN0aW9uLlxuICAgICAgY29uc3QgdG9rZW4gPVxuICAgICAgICAgIHRva2VuUmVmIGluc3RhbmNlb2YgU3RhdGljU3ltYm9sID8gb3V0cHV0Q3R4LmltcG9ydEV4cHIodG9rZW5SZWYpIDogby5saXRlcmFsKHRva2VuUmVmKTtcblxuICAgICAgLy8gQ29uc3RydWN0IHRoZSBkZXBlbmRlbmN5LlxuICAgICAgZGVwcy5wdXNoKHtcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIHJlc29sdmVkLFxuICAgICAgICBob3N0OiAhIWRlcGVuZGVuY3kuaXNIb3N0LFxuICAgICAgICBvcHRpb25hbDogISFkZXBlbmRlbmN5LmlzT3B0aW9uYWwsXG4gICAgICAgIHNlbGY6ICEhZGVwZW5kZW5jeS5pc1NlbGYsXG4gICAgICAgIHNraXBTZWxmOiAhIWRlcGVuZGVuY3kuaXNTa2lwU2VsZixcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1bnN1cHBvcnRlZCgnZGVwZW5kZW5jeSB3aXRob3V0IGEgdG9rZW4nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGVwcztcbn1cbiJdfQ==