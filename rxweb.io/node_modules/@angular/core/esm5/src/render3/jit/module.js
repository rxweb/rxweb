/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { WrappedNodeExpr, compileInjector, compileNgModule as compileR3NgModule, jitExpression } from '@angular/compiler';
import { angularCoreEnv } from './environment';
import { NG_COMPONENT_DEF, NG_DIRECTIVE_DEF, NG_INJECTOR_DEF, NG_MODULE_DEF, NG_PIPE_DEF } from './fields';
import { reflectDependencies } from './util';
var EMPTY_ARRAY = [];
export function compileNgModule(type, ngModule) {
    var declarations = flatten(ngModule.declarations || EMPTY_ARRAY);
    var ngModuleDef = null;
    Object.defineProperty(type, NG_MODULE_DEF, {
        get: function () {
            if (ngModuleDef === null) {
                var meta = {
                    type: wrap(type),
                    bootstrap: flatten(ngModule.bootstrap || EMPTY_ARRAY).map(wrap),
                    declarations: declarations.map(wrap),
                    imports: flatten(ngModule.imports || EMPTY_ARRAY).map(expandModuleWithProviders).map(wrap),
                    exports: flatten(ngModule.exports || EMPTY_ARRAY).map(expandModuleWithProviders).map(wrap),
                    emitInline: true,
                };
                var res = compileR3NgModule(meta);
                ngModuleDef =
                    jitExpression(res.expression, angularCoreEnv, "ng://" + type.name + "/ngModuleDef.js");
            }
            return ngModuleDef;
        },
    });
    var ngInjectorDef = null;
    Object.defineProperty(type, NG_INJECTOR_DEF, {
        get: function () {
            if (ngInjectorDef === null) {
                var meta = {
                    name: type.name,
                    type: wrap(type),
                    deps: reflectDependencies(type),
                    providers: new WrappedNodeExpr(ngModule.providers || EMPTY_ARRAY),
                    imports: new WrappedNodeExpr([
                        ngModule.imports || EMPTY_ARRAY,
                        ngModule.exports || EMPTY_ARRAY,
                    ]),
                };
                var res = compileInjector(meta);
                ngInjectorDef =
                    jitExpression(res.expression, angularCoreEnv, "ng://" + type.name + "/ngInjectorDef.js");
            }
            return ngInjectorDef;
        },
    });
    declarations.forEach(function (declaration) {
        // Some declared components may be compiled asynchronously, and thus may not have their
        // ngComponentDef set yet. If this is the case, then a reference to the module is written into
        // the `ngSelectorScope` property of the declared type.
        if (declaration.hasOwnProperty(NG_COMPONENT_DEF)) {
            // An `ngComponentDef` field exists - go ahead and patch the component directly.
            patchComponentDefWithScope(declaration.ngComponentDef, type);
        }
        else if (!declaration.hasOwnProperty(NG_DIRECTIVE_DEF) && !declaration.hasOwnProperty(NG_PIPE_DEF)) {
            // Set `ngSelectorScope` for future reference when the component compilation finishes.
            declaration.ngSelectorScope = type;
        }
    });
}
/**
 * Patch the definition of a component with directives and pipes from the compilation scope of
 * a given module.
 */
export function patchComponentDefWithScope(componentDef, module) {
    componentDef.directiveDefs = function () { return Array.from(transitiveScopesFor(module).compilation.directives)
        .map(function (dir) { return dir.ngDirectiveDef || dir.ngComponentDef; })
        .filter(function (def) { return !!def; }); };
    componentDef.pipeDefs = function () {
        return Array.from(transitiveScopesFor(module).compilation.pipes).map(function (pipe) { return pipe.ngPipeDef; });
    };
}
/**
 * Compute the pair of transitive scopes (compilation scope and exported scope) for a given module.
 *
 * This operation is memoized and the result is cached on the module's definition. It can be called
 * on modules with components that have not fully compiled yet, but the result should not be used
 * until they have.
 */
export function transitiveScopesFor(moduleType) {
    if (!isNgModule(moduleType)) {
        throw new Error(moduleType.name + " does not have an ngModuleDef");
    }
    var def = moduleType.ngModuleDef;
    if (def.transitiveCompileScopes !== null) {
        return def.transitiveCompileScopes;
    }
    var scopes = {
        compilation: {
            directives: new Set(),
            pipes: new Set(),
        },
        exported: {
            directives: new Set(),
            pipes: new Set(),
        },
    };
    def.declarations.forEach(function (declared) {
        var declaredWithDefs = declared;
        if (declaredWithDefs.ngPipeDef !== undefined) {
            scopes.compilation.pipes.add(declared);
        }
        else {
            // Either declared has an ngComponentDef or ngDirectiveDef, or it's a component which hasn't
            // had its template compiled yet. In either case, it gets added to the compilation's
            // directives.
            scopes.compilation.directives.add(declared);
        }
    });
    def.imports.forEach(function (imported) {
        var importedTyped = imported;
        if (!isNgModule(importedTyped)) {
            throw new Error("Importing " + importedTyped.name + " which does not have an ngModuleDef");
        }
        // When this module imports another, the imported module's exported directives and pipes are
        // added to the compilation scope of this module.
        var importedScope = transitiveScopesFor(importedTyped);
        importedScope.exported.directives.forEach(function (entry) { return scopes.compilation.directives.add(entry); });
        importedScope.exported.pipes.forEach(function (entry) { return scopes.compilation.pipes.add(entry); });
    });
    def.exports.forEach(function (exported) {
        var exportedTyped = exported;
        // Either the type is a module, a pipe, or a component/directive (which may not have an
        // ngComponentDef as it might be compiled asynchronously).
        if (isNgModule(exportedTyped)) {
            // When this module exports another, the exported module's exported directives and pipes are
            // added to both the compilation and exported scopes of this module.
            var exportedScope = transitiveScopesFor(exportedTyped);
            exportedScope.exported.directives.forEach(function (entry) {
                scopes.compilation.directives.add(entry);
                scopes.exported.directives.add(entry);
            });
            exportedScope.exported.pipes.forEach(function (entry) {
                scopes.compilation.pipes.add(entry);
                scopes.exported.pipes.add(entry);
            });
        }
        else if (exportedTyped.ngPipeDef !== undefined) {
            scopes.exported.pipes.add(exportedTyped);
        }
        else {
            scopes.exported.directives.add(exportedTyped);
        }
    });
    def.transitiveCompileScopes = scopes;
    return scopes;
}
function flatten(values) {
    var out = [];
    values.forEach(function (value) {
        if (Array.isArray(value)) {
            out.push.apply(out, tslib_1.__spread(flatten(value)));
        }
        else {
            out.push(value);
        }
    });
    return out;
}
function expandModuleWithProviders(value) {
    if (isModuleWithProviders(value)) {
        return value.ngModule;
    }
    return value;
}
function wrap(value) {
    return new WrappedNodeExpr(value);
}
function isModuleWithProviders(value) {
    return value.ngModule !== undefined;
}
function isNgModule(value) {
    return value.ngModuleDef !== undefined;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9qaXQvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQXFELGVBQWUsRUFBRSxlQUFlLEVBQUUsZUFBZSxJQUFJLGlCQUFpQixFQUFFLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBTTVLLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3pHLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUUzQyxJQUFNLFdBQVcsR0FBZ0IsRUFBRSxDQUFDO0FBRXBDLE1BQU0sMEJBQTBCLElBQWUsRUFBRSxRQUFrQjtJQUNqRSxJQUFNLFlBQVksR0FBZ0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksV0FBVyxDQUFDLENBQUM7SUFFaEYsSUFBSSxXQUFXLEdBQVEsSUFBSSxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtRQUN6QyxHQUFHLEVBQUU7WUFDSCxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7Z0JBQ3hCLElBQU0sSUFBSSxHQUF1QjtvQkFDL0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ2hCLFNBQVMsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUMvRCxZQUFZLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ3BDLE9BQU8sRUFDSCxPQUFPLENBQUMs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Q0FBQyxFQUFFO1FBQ2hDLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQztLQUN2QjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELGNBQWMsS0FBZ0I7SUFDNUIsT0FBTyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRUQsK0JBQStCLEtBQVU7SUFDdkMsT0FBUSxLQUF5QixDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUM7QUFDM0QsQ0FBQztBQUVELG9CQUF1QixLQUFjO0lBQ25DLE9BQVEsS0FBK0MsQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDO0FBQ3BGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXhwcmVzc2lvbiwgUjNJbmplY3Rvck1ldGFkYXRhLCBSM05nTW9kdWxlTWV0YWRhdGEsIFdyYXBwZWROb2RlRXhwciwgY29tcGlsZUluamVjdG9yLCBjb21waWxlTmdNb2R1bGUgYXMgY29tcGlsZVIzTmdNb2R1bGUsIGppdEV4cHJlc3Npb259IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcblxuaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgTmdNb2R1bGVEZWZJbnRlcm5hbCwgTmdNb2R1bGVUcmFuc2l0aXZlU2NvcGVzfSBmcm9tICcuLi8uLi9tZXRhZGF0YS9uZ19tb2R1bGUnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi8uLi90eXBlJztcbmltcG9ydCB7Q29tcG9uZW50RGVmSW50ZXJuYWx9IGZyb20gJy4uL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5cbmltcG9ydCB7YW5ndWxhckNvcmVFbnZ9IGZyb20gJy4vZW52aXJvbm1lbnQnO1xuaW1wb3J0IHtOR19DT01QT05FTlRfREVGLCBOR19ESVJFQ1RJVkVfREVGLCBOR19JTkpFQ1RPUl9ERUYsIE5HX01PRFVMRV9ERUYsIE5HX1BJUEVfREVGfSBmcm9tICcuL2ZpZWxkcyc7XG5pbXBvcnQge3JlZmxlY3REZXBlbmRlbmNpZXN9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IEVNUFRZX0FSUkFZOiBUeXBlPGFueT5bXSA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZU5nTW9kdWxlKHR5cGU6IFR5cGU8YW55PiwgbmdNb2R1bGU6IE5nTW9kdWxlKTogdm9pZCB7XG4gIGNvbnN0IGRlY2xhcmF0aW9uczogVHlwZTxhbnk+W10gPSBmbGF0dGVuKG5nTW9kdWxlLmRlY2xhcmF0aW9ucyB8fCBFTVBUWV9BUlJBWSk7XG5cbiAgbGV0IG5nTW9kdWxlRGVmOiBhbnkgPSBudWxsO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgTkdfTU9EVUxFX0RFRiwge1xuICAgIGdldDogKCkgPT4ge1xuICAgICAgaWYgKG5nTW9kdWxlRGVmID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IG1ldGE6IFIzTmdNb2R1bGVNZXRhZGF0YSA9IHtcbiAgICAgICAgICB0eXBlOiB3cmFwKHR5cGUpLFxuICAgICAgICAgIGJvb3RzdHJhcDogZmxhdHRlbihuZ01vZHVsZS5ib290c3RyYXAgfHwgRU1QVFlfQVJSQVkpLm1hcCh3cmFwKSxcbiAgICAgICAgICBkZWNsYXJhdGlvbnM6IGRlY2xhcmF0aW9ucy5tYXAod3JhcCksXG4gICAgICAgICAgaW1wb3J0czpcbiAgICAgICAgICAgICAgZmxhdHRlbihuZ01vZHVsZS5pbXBvcnRzIHx8IEVNUFRZX0FSUkFZKS5tYXAoZXhwYW5kTW9kdWxlV2l0aFByb3ZpZGVycykubWFwKHdyYXApLFxuICAgICAgICAgIGV4cG9ydHM6XG4gICAgICAgICAgICAgIGZsYXR0ZW4obmdNb2R1bGUuZXhwb3J0cyB8fCBFTVBUWV9BUlJBWSkubWFwKGV4cGFuZE1vZHVsZVdpdGhQcm92aWRlcnMpLm1hcCh3cmFwKSxcbiAgICAgICAgICBlbWl0SW5saW5lOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXMgPSBjb21waWxlUjNOZ01vZHVsZShtZXRhKTtcbiAgICAgICAgbmdNb2R1bGVEZWYgPVxuICAgICAgICAgICAgaml0RXhwcmVzc2lvbihyZXMuZXhwcmVzc2lvbiwgYW5ndWxhckNvcmVFbnYsIGBuZzovLyR7dHlwZS5uYW1lfS9uZ01vZHVsZURlZi5qc2ApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5nTW9kdWxlRGVmO1xuICAgIH0sXG4gIH0pO1xuXG4gIGxldCBuZ0luamVjdG9yRGVmOiBhbnkgPSBudWxsO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgTkdfSU5KRUNUT1JfREVGLCB7XG4gICAgZ2V0OiAoKSA9PiB7XG4gICAgICBpZiAobmdJbmplY3RvckRlZiA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBtZXRhOiBSM0luamVjdG9yTWV0YWRhdGEgPSB7XG4gICAgICAgICAgbmFtZTogdHlwZS5uYW1lLFxuICAgICAgICAgIHR5cGU6IHdyYXAodHlwZSksXG4gICAgICAgICAgZGVwczogcmVmbGVjdERlcGVuZGVuY2llcyh0eXBlKSxcbiAgICAgICAgICBwcm92aWRlcnM6IG5ldyBXcmFwcGVkTm9kZUV4cHIobmdNb2R1bGUucHJvdmlkZXJzIHx8IEVNUFRZX0FSUkFZKSxcbiAgICAgICAgICBpbXBvcnRzOiBuZXcgV3JhcHBlZE5vZGVFeHByKFtcbiAgICAgICAgICAgIG5nTW9kdWxlLmltcG9ydHMgfHwgRU1QVFlfQVJSQVksXG4gICAgICAgICAgICBuZ01vZHVsZS5leHBvcnRzIHx8IEVNUFRZX0FSUkFZLFxuICAgICAgICAgIF0pLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXMgPSBjb21waWxlSW5qZWN0b3IobWV0YSk7XG4gICAgICAgIG5nSW5qZWN0b3JEZWYgPVxuICAgICAgICAgICAgaml0RXhwcmVzc2lvbihyZXMuZXhwcmVzc2lvbiwgYW5ndWxhckNvcmVFbnYsIGBuZzovLyR7dHlwZS5uYW1lfS9uZ0luamVjdG9yRGVmLmpzYCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmdJbmplY3RvckRlZjtcbiAgICB9LFxuICB9KTtcblxuICBkZWNsYXJhdGlvbnMuZm9yRWFjaChkZWNsYXJhdGlvbiA9PiB7XG4gICAgLy8gU29tZSBkZWNsYXJlZCBjb21wb25lbnRzIG1heSBiZSBjb21waWxlZCBhc3luY2hyb25vdXNseSwgYW5kIHRodXMgbWF5IG5vdCBoYXZlIHRoZWlyXG4gICAgLy8gbmdDb21wb25lbnREZWYgc2V0IHlldC4gSWYgdGhpcyBpcyB0aGUgY2FzZSwgdGhlbiBhIHJlZmVyZW5jZSB0byB0aGUgbW9kdWxlIGlzIHdyaXR0ZW4gaW50b1xuICAgIC8vIHRoZSBgbmdTZWxlY3RvclNjb3BlYCBwcm9wZXJ0eSBvZiB0aGUgZGVjbGFyZWQgdHlwZS5cbiAgICBpZiAoZGVjbGFyYXRpb24uaGFzT3duUHJvcGVydHkoTkdfQ09NUE9ORU5UX0RFRikpIHtcbiAgICAgIC8vIEFuIGBuZ0NvbXBvbmVudERlZmAgZmllbGQgZXhpc3RzIC0gZ28gYWhlYWQgYW5kIHBhdGNoIHRoZSBjb21wb25lbnQgZGlyZWN0bHkuXG4gICAgICBwYXRjaENvbXBvbmVudERlZldpdGhTY29wZShcbiAgICAgICAgICAoZGVjbGFyYXRpb24gYXMgVHlwZTxhbnk+JiB7bmdDb21wb25lbnREZWY6IENvbXBvbmVudERlZkludGVybmFsPGFueT59KS5uZ0NvbXBvbmVudERlZixcbiAgICAgICAgICB0eXBlKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICAhZGVjbGFyYXRpb24uaGFzT3duUHJvcGVydHkoTkdfRElSRUNUSVZFX0RFRikgJiYgIWRlY2xhcmF0aW9uLmhhc093blByb3BlcnR5KE5HX1BJUEVfREVGKSkge1xuICAgICAgLy8gU2V0IGBuZ1NlbGVjdG9yU2NvcGVgIGZvciBmdXR1cmUgcmVmZXJlbmNlIHdoZW4gdGhlIGNvbXBvbmVudCBjb21waWxhdGlvbiBmaW5pc2hlcy5cbiAgICAgIChkZWNsYXJhdGlvbiBhcyBUeXBlPGFueT4mIHtuZ1NlbGVjdG9yU2NvcGU/OiBhbnl9KS5uZ1NlbGVjdG9yU2NvcGUgPSB0eXBlO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogUGF0Y2ggdGhlIGRlZmluaXRpb24gb2YgYSBjb21wb25lbnQgd2l0aCBkaXJlY3RpdmVzIGFuZCBwaXBlcyBmcm9tIHRoZSBjb21waWxhdGlvbiBzY29wZSBvZlxuICogYSBnaXZlbiBtb2R1bGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaENvbXBvbmVudERlZldpdGhTY29wZTxDLCBNPihcbiAgICBjb21wb25lbnREZWY6IENvbXBvbmVudERlZkludGVybmFsPEM+LCBtb2R1bGU6IFR5cGU8TT4pIHtcbiAgY29tcG9uZW50RGVmLmRpcmVjdGl2ZURlZnMgPSAoKSA9PiBBcnJheS5mcm9tKHRyYW5zaXRpdmVTY29wZXNGb3IobW9kdWxlKS5jb21waWxhdGlvbi5kaXJlY3RpdmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGRpciA9PiBkaXIubmdEaXJlY3RpdmVEZWYgfHwgZGlyLm5nQ29tcG9uZW50RGVmKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGRlZiA9PiAhIWRlZik7XG4gIGNvbXBvbmVudERlZi5waXBlRGVmcyA9ICgpID0+XG4gICAgICBBcnJheS5mcm9tKHRyYW5zaXRpdmVTY29wZXNGb3IobW9kdWxlKS5jb21waWxhdGlvbi5waXBlcykubWFwKHBpcGUgPT4gcGlwZS5uZ1BpcGVEZWYpO1xufVxuXG4vKipcbiAqIENvbXB1dGUgdGhlIHBhaXIgb2YgdHJhbnNpdGl2ZSBzY29wZXMgKGNvbXBpbGF0aW9uIHNjb3BlIGFuZCBleHBvcnRlZCBzY29wZSkgZm9yIGEgZ2l2ZW4gbW9kdWxlLlxuICpcbiAqIFRoaXMgb3BlcmF0aW9uIGlzIG1lbW9pemVkIGFuZCB0aGUgcmVzdWx0IGlzIGNhY2hlZCBvbiB0aGUgbW9kdWxlJ3MgZGVmaW5pdGlvbi4gSXQgY2FuIGJlIGNhbGxlZFxuICogb24gbW9kdWxlcyB3aXRoIGNvbXBvbmVudHMgdGhhdCBoYXZlIG5vdCBmdWxseSBjb21waWxlZCB5ZXQsIGJ1dCB0aGUgcmVzdWx0IHNob3VsZCBub3QgYmUgdXNlZFxuICogdW50aWwgdGhleSBoYXZlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNpdGl2ZVNjb3Blc0ZvcjxUPihtb2R1bGVUeXBlOiBUeXBlPFQ+KTogTmdNb2R1bGVUcmFuc2l0aXZlU2NvcGVzIHtcbiAgaWYgKCFpc05nTW9kdWxlKG1vZHVsZVR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21vZHVsZVR5cGUubmFtZX0gZG9lcyBub3QgaGF2ZSBhbiBuZ01vZHVsZURlZmApO1xuICB9XG4gIGNvbnN0IGRlZiA9IG1vZHVsZVR5cGUubmdNb2R1bGVEZWY7XG5cbiAgaWYgKGRlZi50cmFuc2l0aXZlQ29tcGlsZVNjb3BlcyAhPT0gbnVsbCkge1xuICAgIHJldHVybiBkZWYudHJhbnNpdGl2ZUNvbXBpbGVTY29wZXM7XG4gIH1cblxuICBjb25zdCBzY29wZXM6IE5nTW9kdWxlVHJhbnNpdGl2ZVNjb3BlcyA9IHtcbiAgICBjb21waWxhdGlvbjoge1xuICAgICAgZGlyZWN0aXZlczogbmV3IFNldDxhbnk+KCksXG4gICAgICBwaXBlczogbmV3IFNldDxhbnk+KCksXG4gICAgfSxcbiAgICBleHBvcnRlZDoge1xuICAgICAgZGlyZWN0aXZlczogbmV3IFNldDxhbnk+KCksXG4gICAgICBwaXBlczogbmV3IFNldDxhbnk+KCksXG4gICAgfSxcbiAgfTtcblxuICBkZWYuZGVjbGFyYXRpb25zLmZvckVhY2goZGVjbGFyZWQgPT4ge1xuICAgIGNvbnN0IGRlY2xhcmVkV2l0aERlZnMgPSBkZWNsYXJlZCBhcyBUeXBlPGFueT4mIHsgbmdQaXBlRGVmPzogYW55OyB9O1xuXG4gICAgaWYgKGRlY2xhcmVkV2l0aERlZnMubmdQaXBlRGVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjb3Blcy5jb21waWxhdGlvbi5waXBlcy5hZGQoZGVjbGFyZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBFaXRoZXIgZGVjbGFyZWQgaGFzIGFuIG5nQ29tcG9uZW50RGVmIG9yIG5nRGlyZWN0aXZlRGVmLCBvciBpdCdzIGEgY29tcG9uZW50IHdoaWNoIGhhc24ndFxuICAgICAgLy8gaGFkIGl0cyB0ZW1wbGF0ZSBjb21waWxlZCB5ZXQuIEluIGVpdGhlciBjYXNlLCBpdCBnZXRzIGFkZGVkIHRvIHRoZSBjb21waWxhdGlvbidzXG4gICAgICAvLyBkaXJlY3RpdmVzLlxuICAgICAgc2NvcGVzLmNvbXBpbGF0aW9uLmRpcmVjdGl2ZXMuYWRkKGRlY2xhcmVkKTtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZi5pbXBvcnRzLmZvckVhY2goPEk+KGltcG9ydGVkOiBUeXBlPEk+KSA9PiB7XG4gICAgbGV0IGltcG9ydGVkVHlwZWQgPSBpbXBvcnRlZCBhcyBUeXBlPEk+JiB7XG4gICAgICAvLyBJZiBpbXBvcnRlZCBpcyBhbiBATmdNb2R1bGU6XG4gICAgICBuZ01vZHVsZURlZj86IE5nTW9kdWxlRGVmSW50ZXJuYWw8ST47XG4gICAgfTtcblxuICAgIGlmICghaXNOZ01vZHVsZTxJPihpbXBvcnRlZFR5cGVkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbXBvcnRpbmcgJHtpbXBvcnRlZFR5cGVkLm5hbWV9IHdoaWNoIGRvZXMgbm90IGhhdmUgYW4gbmdNb2R1bGVEZWZgKTtcbiAgICB9XG5cbiAgICAvLyBXaGVuIHRoaXMgbW9kdWxlIGltcG9ydHMgYW5vdGhlciwgdGhlIGltcG9ydGVkIG1vZHVsZSdzIGV4cG9ydGVkIGRpcmVjdGl2ZXMgYW5kIHBpcGVzIGFyZVxuICAgIC8vIGFkZGVkIHRvIHRoZSBjb21waWxhdGlvbiBzY29wZSBvZiB0aGlzIG1vZHVsZS5cbiAgICBjb25zdCBpbXBvcnRlZFNjb3BlID0gdHJhbnNpdGl2ZVNjb3Blc0ZvcihpbXBvcnRlZFR5cGVkKTtcbiAgICBpbXBvcnRlZFNjb3BlLmV4cG9ydGVkLmRpcmVjdGl2ZXMuZm9yRWFjaChlbnRyeSA9PiBzY29wZXMuY29tcGlsYXRpb24uZGlyZWN0aXZlcy5hZGQoZW50cnkpKTtcbiAgICBpbXBvcnRlZFNjb3BlLmV4cG9ydGVkLnBpcGVzLmZvckVhY2goZW50cnkgPT4gc2NvcGVzLmNvbXBpbGF0aW9uLnBpcGVzLmFkZChlbnRyeSkpO1xuICB9KTtcblxuICBkZWYuZXhwb3J0cy5mb3JFYWNoKDxFPihleHBvcnRlZDogVHlwZTxFPikgPT4ge1xuICAgIGNvbnN0IGV4cG9ydGVkVHlwZWQgPSBleHBvcnRlZCBhcyBUeXBlPEU+JiB7XG4gICAgICAvLyBDb21wb25lbnRzLCBEaXJlY3RpdmVzLCBOZ01vZHVsZXMsIGFuZCBQaXBlcyBjYW4gYWxsIGJlIGV4cG9ydGVkLlxuICAgICAgbmdDb21wb25lbnREZWY/OiBhbnk7XG4gICAgICBuZ0RpcmVjdGl2ZURlZj86IGFueTtcbiAgICAgIG5nTW9kdWxlRGVmPzogTmdNb2R1bGVEZWZJbnRlcm5hbDxFPjtcbiAgICAgIG5nUGlwZURlZj86IGFueTtcbiAgICB9O1xuXG4gICAgLy8gRWl0aGVyIHRoZSB0eXBlIGlzIGEgbW9kdWxlLCBhIHBpcGUsIG9yIGEgY29tcG9uZW50L2RpcmVjdGl2ZSAod2hpY2ggbWF5IG5vdCBoYXZlIGFuXG4gICAgLy8gbmdDb21wb25lbnREZWYgYXMgaXQgbWlnaHQgYmUgY29tcGlsZWQgYXN5bmNocm9ub3VzbHkpLlxuICAgIGlmIChpc05nTW9kdWxlKGV4cG9ydGVkVHlwZWQpKSB7XG4gICAgICAvLyBXaGVuIHRoaXMgbW9kdWxlIGV4cG9ydHMgYW5vdGhlciwgdGhlIGV4cG9ydGVkIG1vZHVsZSdzIGV4cG9ydGVkIGRpcmVjdGl2ZXMgYW5kIHBpcGVzIGFyZVxuICAgICAgLy8gYWRkZWQgdG8gYm90aCB0aGUgY29tcGlsYXRpb24gYW5kIGV4cG9ydGVkIHNjb3BlcyBvZiB0aGlzIG1vZHVsZS5cbiAgICAgIGNvbnN0IGV4cG9ydGVkU2NvcGUgPSB0cmFuc2l0aXZlU2NvcGVzRm9yKGV4cG9ydGVkVHlwZWQpO1xuICAgICAgZXhwb3J0ZWRTY29wZS5leHBvcnRlZC5kaXJlY3RpdmVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICBzY29wZXMuY29tcGlsYXRpb24uZGlyZWN0aXZlcy5hZGQoZW50cnkpO1xuICAgICAgICBzY29wZXMuZXhwb3J0ZWQuZGlyZWN0aXZlcy5hZGQoZW50cnkpO1xuICAgICAgfSk7XG4gICAgICBleHBvcnRlZFNjb3BlLmV4cG9ydGVkLnBpcGVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICBzY29wZXMuY29tcGlsYXRpb24ucGlwZXMuYWRkKGVudHJ5KTtcbiAgICAgICAgc2NvcGVzLmV4cG9ydGVkLnBpcGVzLmFkZChlbnRyeSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGV4cG9ydGVkVHlwZWQubmdQaXBlRGVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNjb3Blcy5leHBvcnRlZC5waXBlcy5hZGQoZXhwb3J0ZWRUeXBlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjb3Blcy5leHBvcnRlZC5kaXJlY3RpdmVzLmFkZChleHBvcnRlZFR5cGVkKTtcbiAgICB9XG4gIH0pO1xuXG4gIGRlZi50cmFuc2l0aXZlQ29tcGlsZVNjb3BlcyA9IHNjb3BlcztcbiAgcmV0dXJuIHNjb3Blcztcbn1cblxuZnVuY3Rpb24gZmxhdHRlbjxUPih2YWx1ZXM6IGFueVtdKTogVFtdIHtcbiAgY29uc3Qgb3V0OiBUW10gPSBbXTtcbiAgdmFsdWVzLmZvckVhY2godmFsdWUgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgb3V0LnB1c2goLi4uZmxhdHRlbjxUPih2YWx1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gZXhwYW5kTW9kdWxlV2l0aFByb3ZpZGVycyh2YWx1ZTogVHlwZTxhbnk+fCBNb2R1bGVXaXRoUHJvdmlkZXJzKTogVHlwZTxhbnk+IHtcbiAgaWYgKGlzTW9kdWxlV2l0aFByb3ZpZGVycyh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUubmdNb2R1bGU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiB3cmFwKHZhbHVlOiBUeXBlPGFueT4pOiBFeHByZXNzaW9uIHtcbiAgcmV0dXJuIG5ldyBXcmFwcGVkTm9kZUV4cHIodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBpc01vZHVsZVdpdGhQcm92aWRlcnModmFsdWU6IGFueSk6IHZhbHVlIGlzIE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICByZXR1cm4gKHZhbHVlIGFze25nTW9kdWxlPzogYW55fSkubmdNb2R1bGUgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNOZ01vZHVsZTxUPih2YWx1ZTogVHlwZTxUPik6IHZhbHVlIGlzIFR5cGU8VD4me25nTW9kdWxlRGVmOiBOZ01vZHVsZURlZkludGVybmFsPFQ+fSB7XG4gIHJldHVybiAodmFsdWUgYXN7bmdNb2R1bGVEZWY/OiBOZ01vZHVsZURlZkludGVybmFsPFQ+fSkubmdNb2R1bGVEZWYgIT09IHVuZGVmaW5lZDtcbn1cbiJdfQ==