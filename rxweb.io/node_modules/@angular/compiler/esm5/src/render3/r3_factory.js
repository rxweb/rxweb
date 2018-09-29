/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
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
    var args = meta.deps.map(function (dep) { return compileInjectDependency(dep, meta.injectFn); });
    // The overall result depends on whether this is construction or function invocation.
    var expr = meta.useNew ? new o.InstantiateExpr(meta.fnOrClass, args) :
        new o.InvokeFunctionExpr(meta.fnOrClass, args);
    return o.fn([], [new o.ReturnStatement(expr)], o.INFERRED_TYPE, undefined, meta.name + "_Factory");
}
function compileInjectDependency(dep, injectFn) {
    // Interpret the dependency according to its resolved type.
    switch (dep.resolved) {
        case R3ResolvedDependencyType.Token:
        case R3ResolvedDependencyType.Injector: {
            // Build up the injection flags according to the metadata.
            var flags = 0 /* Default */ | (dep.self ? 2 /* Self */ : 0) |
                (dep.skipSelf ? 4 /* SkipSelf */ : 0) | (dep.host ? 1 /* Host */ : 0) |
                (dep.optional ? 8 /* Optional */ : 0);
            // Determine the token used for injection. In almost all cases this is the given token, but
            // if the dependency is resolved to the `Injector` then the special `INJECTOR` token is used
            // instead.
            var token = dep.token;
            if (dep.resolved === R3ResolvedDependencyType.Injector) {
                token = o.importExpr(Identifiers.INJECTOR);
            }
            // Build up the arguments to the injectFn call.
            var injectArgs = [token];
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
            return unsupported("Unknown R3ResolvedDependencyType: " + R3ResolvedDependencyType[dep.resolved]);
    }
}
/**
 * A helper function useful for extracting `R3DependencyMetadata` from a Render2
 * `CompileTypeMetadata` instance.
 */
export function dependenciesFromGlobalMetadata(type, outputCtx, reflector) {
    var e_1, _a;
    // Use the `CompileReflector` to look up references to some well-known Angular types. These will
    // be compared with the token to statically determine whether the token has significance to
    // Angular, and set the correct `R3ResolvedDependencyType` as a result.
    var elementRef = reflector.resolveExternalReference(Identifiers.ElementRef);
    var templateRef = reflector.resolveExternalReference(Identifiers.TemplateRef);
    var viewContainerRef = reflector.resolveExternalReference(Identifiers.ViewContainerRef);
    var injectorRef = reflector.resolveExternalReference(Identifiers.Injector);
    // Iterate through the type's DI dependencies and produce `R3DependencyMetadata` for each of them.
    var deps = [];
    try {
        for (var _b = tslib_1.__values(type.diDeps), _c = _b.next(); !_c.done; _c = _b.next()) {
            var dependency = _c.value;
            if (dependency.token) {
                var tokenRef = tokenReference(dependency.token);
                var resolved = R3ResolvedDependencyType.Token;
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
                var token = tokenRef instanceof StaticSymbol ? outputCtx.importExpr(tokenRef) : o.literal(tokenRef);
                // Construct the dependency.
                deps.push({
                    token: token,
                    resolved: resolved,
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
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return deps;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3IzX2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQXNCLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBR3hFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxXQUFXLElBQUksRUFBRSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFHNUQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQXlDeEM7Ozs7Ozs7R0FPRztBQUNILE1BQU0sQ0FBTixJQUFZLHdCQXFDWDtBQXJDRCxXQUFZLHdCQUF3QjtJQUNsQzs7T0FFRztJQUNILHlFQUFTLENBQUE7SUFFVDs7OztPQUlHO0lBQ0gsaUZBQWEsQ0FBQTtJQUViOztPQUVHO0lBQ0gsK0VBQVksQ0FBQTtJQUVaOztPQUVHO0lBQ0gsbUZBQWMsQ0FBQTtJQUVkOztPQUVHO0lBQ0gscUZBQWUsQ0FBQTtJQUVmOztPQUVHO0lBQ0gsK0ZBQW9CLENBQUE7SUFFcEI7O09BRUc7SUFDSCxpR0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBckNXLHdCQUF3QixLQUF4Qix3QkFBd0IsUUFxQ25DO0FBc0NEOztHQUVHO0FBQ0gsTUFBTSxpQ0FBaUMsSUFBdUI7SUFDNUQsa0VBQWtFO0lBQ2xFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsdUJBQXVCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENB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QU0sSUFBSSxRQUFRLEtBQUssV0FBVyxFQUFFO29CQUNuQyxRQUFRLEdBQUcsd0JBQXdCLENBQUMsV0FBVyxDQUFDO2lCQUNqRDtxQkFBTSxJQUFJLFFBQVEsS0FBSyxnQkFBZ0IsRUFBRTtvQkFDeEMsUUFBUSxHQUFHLHdCQUF3QixDQUFDLGdCQUFnQixDQUFDO2lCQUN0RDtxQkFBTSxJQUFJLFFBQVEsS0FBSyxXQUFXLEVBQUU7b0JBQ25DLFFBQVEsR0FBRyx3QkFBd0IsQ0FBQyxRQUFRLENBQUM7aUJBQzlDO3FCQUFNLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRTtvQkFDakMsUUFBUSxHQUFHLHdCQUF3QixDQUFDLFNBQVMsQ0FBQztpQkFDL0M7Z0JBRUQsd0ZBQXdGO2dCQUN4RiwwRkFBMEY7Z0JBQzFGLElBQU0sS0FBSyxHQUNQLFFBQVEsWUFBWSxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRTVGLDRCQUE0QjtnQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDUixLQUFLLE9BQUE7b0JBQ0wsUUFBUSxVQUFBO29CQUNSLElBQUksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU07b0JBQ3pCLFFBQVEsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVU7b0JBQ2pDLElBQUksRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU07b0JBQ3pCLFFBQVEsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVU7aUJBQ2xDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLFdBQVcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2FBQzNDO1NBQ0Y7Ozs7Ozs7OztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTdGF0aWNTeW1ib2x9IGZyb20gJy4uL2FvdC9zdGF0aWNfc3ltYm9sJztcbmltcG9ydCB7Q29tcGlsZVR5cGVNZXRhZGF0YSwgdG9rZW5SZWZlcmVuY2V9IGZyb20gJy4uL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtDb21waWxlUmVmbGVjdG9yfSBmcm9tICcuLi9jb21waWxlX3JlZmxlY3Rvcic7XG5pbXBvcnQge0luamVjdEZsYWdzfSBmcm9tICcuLi9jb3JlJztcbmltcG9ydCB7SWRlbnRpZmllcnN9IGZyb20gJy4uL2lkZW50aWZpZXJzJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtJZGVudGlmaWVycyBhcyBSM30gZnJvbSAnLi4vcmVuZGVyMy9yM19pZGVudGlmaWVycyc7XG5pbXBvcnQge091dHB1dENvbnRleHR9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge3Vuc3VwcG9ydGVkfSBmcm9tICcuL3ZpZXcvdXRpbCc7XG5cbi8qKlxuICogTWV0YWRhdGEgcmVxdWlyZWQgYnkgdGhlIGZhY3RvcnkgZ2VuZXJhdG9yIHRvIGdlbmVyYXRlIGEgYGZhY3RvcnlgIGZ1bmN0aW9uIGZvciBhIHR5cGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUjNGYWN0b3J5TWV0YWRhdGEge1xuICAvKipcbiAgICogU3RyaW5nIG5hbWUgb2YgdGhlIHR5cGUgYmVpbmcgZ2VuZXJhdGVkICh1c2VkIHRvIG5hbWUgdGhlIGZhY3RvcnkgZnVuY3Rpb24pLlxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBbiBleHByZXNzaW9uIHJlcHJlc2VudGluZyB0aGUgZnVuY3Rpb24gKG9yIGNvbnN0cnVjdG9yKSB3aGljaCB3aWxsIGluc3RhbnRpYXRlIHRoZSByZXF1ZXN0ZWRcbiAgICogdHlwZS5cbiAgICpcbiAgICogVGhpcyBjb3VsZCBiZSBhIHJlZmVyZW5jZSB0byBhIGNvbnN0cnVjdG9yIHR5cGUsIG9yIHRvIGEgdXNlci1kZWZpbmVkIGZhY3RvcnkgZnVuY3Rpb24uIFRoZVxuICAgKiBgdXNlTmV3YCBwcm9wZXJ0eSBkZXRlcm1pbmVzIHdoZXRoZXIgaXQgd2lsbCBiZSBjYWxsZWQgYXMgYSBjb25zdHJ1Y3RvciBvciBub3QuXG4gICAqL1xuICBmbk9yQ2xhc3M6IG8uRXhwcmVzc2lvbjtcblxuICAvKipcbiAgICogUmVnYXJkbGVzcyBvZiB3aGV0aGVyIGBmbk9yQ2xhc3NgIGlzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gb3IgYSB1c2VyLWRlZmluZWQgZmFjdG9yeSwgaXRcbiAgICogbWF5IGhhdmUgMCBvciBtb3JlIHBhcmFtZXRlcnMsIHdoaWNoIHdpbGwgYmUgaW5qZWN0ZWQgYWNjb3JkaW5nIHRvIHRoZSBgUjNEZXBlbmRlbmN5TWV0YWRhdGFgXG4gICAqIGZvciB0aG9zZSBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgZGVwczogUjNEZXBlbmRlbmN5TWV0YWRhdGFbXTtcblxuICAvKipcbiAgICogV2hldGhlciB0byBpbnRlcnByZXQgYGZuT3JDbGFzc2AgYXMgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbiAoYHVzZU5ldzogdHJ1ZWApIG9yIGFzIGEgZmFjdG9yeVxuICAgKiAoYHVzZU5ldzogZmFsc2VgKS5cbiAgICovXG4gIHVzZU5ldzogYm9vbGVhbjtcblxuXG4gIC8qKlxuICAgKiBBbiBleHByZXNzaW9uIGZvciB0aGUgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGluamVjdCBkZXBlbmRlbmNpZXMuIFRoZSBBUEkgb2YgdGhpc1xuICAgKiBmdW5jdGlvbiBjb3VsZCBiZSBkaWZmZXJlbnQsIGFuZCBvdGhlciBvcHRpb25zIGNvbnRyb2wgaG93IGl0IHdpbGwgYmUgaW52b2tlZC5cbiAgICovXG4gIGluamVjdEZuOiBvLkV4dGVybmFsUmVmZXJlbmNlO1xufVxuXG4vKipcbiAqIFJlc29sdmVkIHR5cGUgb2YgYSBkZXBlbmRlbmN5LlxuICpcbiAqIE9jY2FzaW9uYWxseSwgZGVwZW5kZW5jaWVzIHdpbGwgaGF2ZSBzcGVjaWFsIHNpZ25pZmljYW5jZSB3aGljaCBpcyBrbm93biBzdGF0aWNhbGx5LiBJbiB0aGF0XG4gKiBjYXNlIHRoZSBgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlYCBpbmZvcm1zIHRoZSBmYWN0b3J5IGdlbmVyYXRvciB0aGF0IGEgcGFydGljdWxhciBkZXBlbmRlbmN5XG4gKiBzaG91bGQgYmUgZ2VuZXJhdGVkIHNwZWNpYWxseSAodXN1YWxseSBieSBjYWxsaW5nIGEgc3BlY2lhbCBpbmplY3Rpb24gZnVuY3Rpb24gaW5zdGVhZCBvZiB0aGVcbiAqIHN0YW5kYXJkIG9uZSkuXG4gKi9cbmV4cG9ydCBlbnVtIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZSB7XG4gIC8qKlxuICAgKiBBIG5vcm1hbCB0b2tlbiBkZXBlbmRlbmN5LlxuICAgKi9cbiAgVG9rZW4gPSAwLFxuXG4gIC8qKlxuICAgKiBUaGUgZGVwZW5kZW5jeSBpcyBmb3IgYW4gYXR0cmlidXRlLlxuICAgKlxuICAgKiBUaGUgdG9rZW4gZXhwcmVzc2lvbiBpcyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGF0dHJpYnV0ZSBuYW1lLlxuICAgKi9cbiAgQXR0cmlidXRlID0gMSxcblxuICAvKipcbiAgICogVGhlIGRlcGVuZGVuY3kgaXMgZm9yIHRoZSBgSW5qZWN0b3JgIHR5cGUgaXRzZWxmLlxuICAgKi9cbiAgSW5qZWN0b3IgPSAyLFxuXG4gIC8qKlxuICAgKiBUaGUgZGVwZW5kZW5jeSBpcyBmb3IgYEVsZW1lbnRSZWZgLlxuICAgKi9cbiAgRWxlbWVudFJlZiA9IDMsXG5cbiAgLyoqXG4gICAqIFRoZSBkZXBlbmRlbmN5IGlzIGZvciBgVGVtcGxhdGVSZWZgLlxuICAgKi9cbiAgVGVtcGxhdGVSZWYgPSA0LFxuXG4gIC8qKlxuICAgKiBUaGUgZGVwZW5kZW5jeSBpcyBmb3IgYFZpZXdDb250YWluZXJSZWZgLlxuICAgKi9cbiAgVmlld0NvbnRhaW5lclJlZiA9IDUsXG5cbiAgLyoqXG4gICAqIFRoZSBkZXBlbmRlbmN5IGlzIGZvciBgQ2hhbmdlRGV0ZWN0b3JSZWZgLlxuICAgKi9cbiAgQ2hhbmdlRGV0ZWN0b3JSZWYgPSA2LFxufVxuXG4vKipcbiAqIE1ldGFkYXRhIHJlcHJlc2VudGluZyBhIHNpbmdsZSBkZXBlbmRlbmN5IHRvIGJlIGluamVjdGVkIGludG8gYSBjb25zdHJ1Y3RvciBvciBmdW5jdGlvbiBjYWxsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVwZW5kZW5jeU1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIEFuIGV4cHJlc3Npb24gcmVwcmVzZW50aW5nIHRoZSB0b2tlbiBvciB2YWx1ZSB0byBiZSBpbmplY3RlZC5cbiAgICovXG4gIHRva2VuOiBvLkV4cHJlc3Npb247XG5cbiAgLyoqXG4gICAqIEFuIGVudW0gaW5kaWNhdGluZyB3aGV0aGVyIHRoaXMgZGVwZW5kZW5jeSBoYXMgc3BlY2lhbCBtZWFuaW5nIHRvIEFuZ3VsYXIgYW5kIG5lZWRzIHRvIGJlXG4gICAqIGluamVjdGVkIHNwZWNpYWxseS5cbiAgICovXG4gIHJlc29sdmVkOiBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGU7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRlcGVuZGVuY3kgaGFzIGFuIEBIb3N0IHF1YWxpZmllci5cbiAgICovXG4gIGhvc3Q6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRlcGVuZGVuY3kgaGFzIGFuIEBPcHRpb25hbCBxdWFsaWZpZXIuXG4gICAqL1xuICBvcHRpb25hbDogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZGVwZW5kZW5jeSBoYXMgYW4gQFNlbGYgcXVhbGlmaWVyLlxuICAgKi9cbiAgc2VsZjogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgZGVwZW5kZW5jeSBoYXMgYW4gQFNraXBTZWxmIHF1YWxpZmllci5cbiAgICovXG4gIHNraXBTZWxmOiBib29sZWFuO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdCBhIGZhY3RvcnkgZnVuY3Rpb24gZXhwcmVzc2lvbiBmb3IgdGhlIGdpdmVuIGBSM0ZhY3RvcnlNZXRhZGF0YWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlRmFjdG9yeUZ1bmN0aW9uKG1ldGE6IFIzRmFjdG9yeU1ldGFkYXRhKTogby5FeHByZXNzaW9uIHtcbiAgLy8gRWFjaCBkZXBlbmRlbmN5IGJlY29tZXMgYW4gaW52b2NhdGlvbiBvZiBhbiBpbmplY3QqKCkgZnVuY3Rpb24uXG4gIGNvbnN0IGFyZ3MgPSBtZXRhLmRlcHMubWFwKGRlcCA9PiBjb21waWxlSW5qZWN0RGVwZW5kZW5jeShkZXAsIG1ldGEuaW5qZWN0Rm4pKTtcblxuICAvLyBUaGUgb3ZlcmFsbCByZXN1bHQgZGVwZW5kcyBvbiB3aGV0aGVyIHRoaXMgaXMgY29uc3RydWN0aW9uIG9yIGZ1bmN0aW9uIGludm9jYXRpb24uXG4gIGNvbnN0IGV4cHIgPSBtZXRhLnVzZU5ldyA/IG5ldyBvLkluc3RhbnRpYXRlRXhwcihtZXRhLmZuT3JDbGFzcywgYXJncykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgby5JbnZva2VGdW5jdGlvbkV4cHIobWV0YS5mbk9yQ2xhc3MsIGFyZ3MpO1xuXG4gIHJldHVybiBvLmZuKFxuICAgICAgW10sIFtuZXcgby5SZXR1cm5TdGF0ZW1lbnQoZXhwcildLCBvLklORkVSUkVEX1RZUEUsIHVuZGVmaW5lZCwgYCR7bWV0YS5uYW1lfV9GYWN0b3J5YCk7XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVJbmplY3REZXBlbmRlbmN5KFxuICAgIGRlcDogUjNEZXBlbmRlbmN5TWV0YWRhdGEsIGluamVjdEZuOiBvLkV4dGVybmFsUmVmZXJlbmNlKTogby5FeHByZXNzaW9uIHtcbiAgLy8gSW50ZXJwcmV0IHRoZSBkZXBlbmRlbmN5IGFjY29yZGluZyB0byBpdHMgcmVzb2x2ZWQgdHlwZS5cbiAgc3dpdGNoIChkZXAucmVzb2x2ZWQpIHtcbiAgICBjYXNlIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5Ub2tlbjpcbiAgICBjYXNlIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5JbmplY3Rvcjoge1xuICAgICAgLy8gQnVpbGQgdXAgdGhlIGluamVjdGlvbiBmbGFncyBhY2NvcmRpbmcgdG8gdGhlIG1ldGFkYXRhLlxuICAgICAgY29uc3QgZmxhZ3MgPSBJbmplY3RGbGFncy5EZWZhdWx0IHwgKGRlcC5zZWxmID8gSW5qZWN0RmxhZ3MuU2VsZiA6IDApIHxcbiAgICAgICAgICAoZGVwLnNraXBTZWxmID8gSW5qZWN0RmxhZ3MuU2tpcFNlbGYgOiAwKSB8IChkZXAuaG9zdCA/IEluamVjdEZsYWdzLkhvc3QgOiAwKSB8XG4gICAgICAgICAgKGRlcC5vcHRpb25hbCA/IEluamVjdEZsYWdzLk9wdGlvbmFsIDogMCk7XG4gICAgICAvLyBEZXRlcm1pbmUgdGhlIHRva2VuIHVzZWQgZm9yIGluamVjdGlvbi4gSW4gYWxtb3N0IGFsbCBjYXNlcyB0aGlzIGlzIHRoZSBnaXZlbiB0b2tlbiwgYnV0XG4gICAgICAvLyBpZiB0aGUgZGVwZW5kZW5jeSBpcyByZXNvbHZlZCB0byB0aGUgYEluamVjdG9yYCB0aGVuIHRoZSBzcGVjaWFsIGBJTkpFQ1RPUmAgdG9rZW4gaXMgdXNlZFxuICAgICAgLy8gaW5zdGVhZC5cbiAgICAgIGxldCB0b2tlbjogby5FeHByZXNzaW9uID0gZGVwLnRva2VuO1xuICAgICAgaWYgKGRlcC5yZXNvbHZlZCA9PT0gUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLkluamVjdG9yKSB7XG4gICAgICAgIHRva2VuID0gby5pbXBvcnRFeHByKElkZW50aWZpZXJzLklOSkVDVE9SKTtcbiAgICAgIH1cblxuICAgICAgLy8gQnVpbGQgdXAgdGhlIGFyZ3VtZW50cyB0byB0aGUgaW5qZWN0Rm4gY2FsbC5cbiAgICAgIGNvbnN0IGluamVjdEFyZ3MgPSBbdG9rZW5dO1xuICAgICAgLy8gSWYgdGhpcyBkZXBlbmRlbmN5IGlzIG9wdGlvbmFsIG9yIG90aGVyd2lzZSBoYXMgbm9uLWRlZmF1bHQgZmxhZ3MsIHRoZW4gYWRkaXRpb25hbFxuICAgICAgLy8gcGFyYW1ldGVycyBkZXNjcmliaW5nIGhvdyB0byBpbmplY3QgdGhlIGRlcGVuZGVuY3kgbXVzdCBiZSBwYXNzZWQgdG8gdGhlIGluamVjdCBmdW5jdGlvblxuICAgICAgLy8gdGhhdCdzIGJlaW5nIHVzZWQuXG4gICAgICBpZiAoZmxhZ3MgIT09IEluamVjdEZsYWdzLkRlZmF1bHQgfHwgZGVwLm9wdGlvbmFsKSB7XG4gICAgICAgIGluamVjdEFyZ3MucHVzaChvLmxpdGVyYWwoZmxhZ3MpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvLmltcG9ydEV4cHIoaW5qZWN0Rm4pLmNhbGxGbihpbmplY3RBcmdzKTtcbiAgICB9XG4gICAgY2FzZSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuQXR0cmlidXRlOlxuICAgICAgLy8gSW4gdGhlIGNhc2Ugb2YgYXR0cmlidXRlcywgdGhlIGF0dHJpYnV0ZSBuYW1lIGluIHF1ZXN0aW9uIGlzIGdpdmVuIGFzIHRoZSB0b2tlbi5cbiAgICAgIHJldHVybiBvLmltcG9ydEV4cHIoUjMuaW5qZWN0QXR0cmlidXRlKS5jYWxsRm4oW2RlcC50b2tlbl0pO1xuICAgIGNhc2UgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLkVsZW1lbnRSZWY6XG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKFIzLmluamVjdEVsZW1lbnRSZWYpLmNhbGxGbihbXSk7XG4gICAgY2FzZSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuVGVtcGxhdGVSZWY6XG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKFIzLmluamVjdFRlbXBsYXRlUmVmKS5jYWxsRm4oW10pO1xuICAgIGNhc2UgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLlZpZXdDb250YWluZXJSZWY6XG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKFIzLmluamVjdFZpZXdDb250YWluZXJSZWYpLmNhbGxGbihbXSk7XG4gICAgY2FzZSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuQ2hhbmdlRGV0ZWN0b3JSZWY6XG4gICAgICByZXR1cm4gby5pbXBvcnRFeHByKFIzLmluamVjdENoYW5nZURldGVjdG9yUmVmKS5jYWxsRm4oW10pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5zdXBwb3J0ZWQoXG4gICAgICAgICAgYFVua25vd24gUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlOiAke1IzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZVtkZXAucmVzb2x2ZWRdfWApO1xuICB9XG59XG5cbi8qKlxuICogQSBoZWxwZXIgZnVuY3Rpb24gdXNlZnVsIGZvciBleHRyYWN0aW5nIGBSM0RlcGVuZGVuY3lNZXRhZGF0YWAgZnJvbSBhIFJlbmRlcjJcbiAqIGBDb21waWxlVHlwZU1ldGFkYXRhYCBpbnN0YW5jZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlcGVuZGVuY2llc0Zyb21HbG9iYWxNZXRhZGF0YShcbiAgICB0eXBlOiBDb21waWxlVHlwZU1ldGFkYXRhLCBvdXRwdXRDdHg6IE91dHB1dENvbnRleHQsXG4gICAgcmVmbGVjdG9yOiBDb21waWxlUmVmbGVjdG9yKTogUjNEZXBlbmRlbmN5TWV0YWRhdGFbXSB7XG4gIC8vIFVzZSB0aGUgYENvbXBpbGVSZWZsZWN0b3JgIHRvIGxvb2sgdXAgcmVmZXJlbmNlcyB0byBzb21lIHdlbGwta25vd24gQW5ndWxhciB0eXBlcy4gVGhlc2Ugd2lsbFxuICAvLyBiZSBjb21wYXJlZCB3aXRoIHRoZSB0b2tlbiB0byBzdGF0aWNhbGx5IGRldGVybWluZSB3aGV0aGVyIHRoZSB0b2tlbiBoYXMgc2lnbmlmaWNhbmNlIHRvXG4gIC8vIEFuZ3VsYXIsIGFuZCBzZXQgdGhlIGNvcnJlY3QgYFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZWAgYXMgYSByZXN1bHQuXG4gIGNvbnN0IGVsZW1lbnRSZWYgPSByZWZsZWN0b3IucmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKElkZW50aWZpZXJzLkVsZW1lbnRSZWYpO1xuICBjb25zdCB0ZW1wbGF0ZVJlZiA9IHJlZmxlY3Rvci5yZXNvbHZlRXh0ZXJuYWxSZWZlcmVuY2UoSWRlbnRpZmllcnMuVGVtcGxhdGVSZWYpO1xuICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gcmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShJZGVudGlmaWVycy5WaWV3Q29udGFpbmVyUmVmKTtcbiAgY29uc3QgaW5qZWN0b3JSZWYgPSByZWZsZWN0b3IucmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKElkZW50aWZpZXJzLkluamVjdG9yKTtcblxuICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIHR5cGUncyBESSBkZXBlbmRlbmNpZXMgYW5kIHByb2R1Y2UgYFIzRGVwZW5kZW5jeU1ldGFkYXRhYCBmb3IgZWFjaCBvZiB0aGVtLlxuICBjb25zdCBkZXBzOiBSM0RlcGVuZGVuY3lNZXRhZGF0YVtdID0gW107XG4gIGZvciAobGV0IGRlcGVuZGVuY3kgb2YgdHlwZS5kaURlcHMpIHtcbiAgICBpZiAoZGVwZW5kZW5jeS50b2tlbikge1xuICAgICAgY29uc3QgdG9rZW5SZWYgPSB0b2tlblJlZmVyZW5jZShkZXBlbmRlbmN5LnRva2VuKTtcbiAgICAgIGxldCByZXNvbHZlZDogUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlID0gUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLlRva2VuO1xuICAgICAgaWYgKHRva2VuUmVmID09PSBlbGVtZW50UmVmKSB7XG4gICAgICAgIHJlc29sdmVkID0gUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLkVsZW1lbnRSZWY7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuUmVmID09PSB0ZW1wbGF0ZVJlZikge1xuICAgICAgICByZXNvbHZlZCA9IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5UZW1wbGF0ZVJlZjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW5SZWYgPT09IHZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgICAgcmVzb2x2ZWQgPSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuVmlld0NvbnRhaW5lclJlZjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW5SZWYgPT09IGluamVjdG9yUmVmKSB7XG4gICAgICAgIHJlc29sdmVkID0gUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLkluamVjdG9yO1xuICAgICAgfSBlbHNlIGlmIChkZXBlbmRlbmN5LmlzQXR0cmlidXRlKSB7XG4gICAgICAgIHJlc29sdmVkID0gUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLkF0dHJpYnV0ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSW4gdGhlIGNhc2Ugb2YgbW9zdCBkZXBlbmRlbmNpZXMsIHRoZSB0b2tlbiB3aWxsIGJlIGEgcmVmZXJlbmNlIHRvIGEgdHlwZS4gU29tZXRpbWVzLFxuICAgICAgLy8gaG93ZXZlciwgaXQgY2FuIGJlIGEgc3RyaW5nLCBpbiB0aGUgY2FzZSBvZiBvbGRlciBBbmd1bGFyIGNvZGUgb3IgQEF0dHJpYnV0ZSBpbmplY3Rpb24uXG4gICAgICBjb25zdCB0b2tlbiA9XG4gICAgICAgICAgdG9rZW5SZWYgaW5zdGFuY2VvZiBTdGF0aWNTeW1ib2wgPyBvdXRwdXRDdHguaW1wb3J0RXhwcih0b2tlblJlZikgOiBvLmxpdGVyYWwodG9rZW5SZWYpO1xuXG4gICAgICAvLyBDb25zdHJ1Y3QgdGhlIGRlcGVuZGVuY3kuXG4gICAgICBkZXBzLnB1c2goe1xuICAgICAgICB0b2tlbixcbiAgICAgICAgcmVzb2x2ZWQsXG4gICAgICAgIGhvc3Q6ICEhZGVwZW5kZW5jeS5pc0hvc3QsXG4gICAgICAgIG9wdGlvbmFsOiAhIWRlcGVuZGVuY3kuaXNPcHRpb25hbCxcbiAgICAgICAgc2VsZjogISFkZXBlbmRlbmN5LmlzU2VsZixcbiAgICAgICAgc2tpcFNlbGY6ICEhZGVwZW5kZW5jeS5pc1NraXBTZWxmLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVuc3VwcG9ydGVkKCdkZXBlbmRlbmN5IHdpdGhvdXQgYSB0b2tlbicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkZXBzO1xufVxuIl19