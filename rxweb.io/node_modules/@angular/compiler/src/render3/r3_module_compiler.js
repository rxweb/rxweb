/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/render3/r3_module_compiler", ["require", "exports", "tslib", "@angular/compiler/src/compile_metadata", "@angular/compiler/src/output/map_util", "@angular/compiler/src/output/output_ast", "@angular/compiler/src/render3/r3_factory", "@angular/compiler/src/render3/r3_identifiers", "@angular/compiler/src/render3/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var compile_metadata_1 = require("@angular/compiler/src/compile_metadata");
    var map_util_1 = require("@angular/compiler/src/output/map_util");
    var o = require("@angular/compiler/src/output/output_ast");
    var r3_factory_1 = require("@angular/compiler/src/render3/r3_factory");
    var r3_identifiers_1 = require("@angular/compiler/src/render3/r3_identifiers");
    var util_1 = require("@angular/compiler/src/render3/util");
    /**
     * Construct an `R3NgModuleDef` for the given `R3NgModuleMetadata`.
     */
    function compileNgModule(meta) {
        var moduleType = meta.type, bootstrap = meta.bootstrap, declarations = meta.declarations, imports = meta.imports, exports = meta.exports;
        var expression = o.importExpr(r3_identifiers_1.Identifiers.defineNgModule).callFn([util_1.mapToMapExpression({
                type: moduleType,
                bootstrap: o.literalArr(bootstrap),
                declarations: o.literalArr(declarations),
                imports: o.literalArr(imports),
                exports: o.literalArr(exports),
            })]);
        var type = new o.ExpressionType(o.importExpr(r3_identifiers_1.Identifiers.NgModuleDef, [
            new o.ExpressionType(moduleType), tupleTypeOf(declarations), tupleTypeOf(imports),
            tupleTypeOf(exports)
        ]));
        var additionalStatements = [];
        return { expression: expression, type: type, additionalStatements: additionalStatements };
    }
    exports.compileNgModule = compileNgModule;
    function compileInjector(meta) {
        var expression = o.importExpr(r3_identifiers_1.Identifiers.defineInjector).callFn([util_1.mapToMapExpression({
                factory: r3_factory_1.compileFactoryFunction({
                    name: meta.name,
                    fnOrClass: meta.type,
                    deps: meta.deps,
                    useNew: true,
                    injectFn: r3_identifiers_1.Identifiers.inject,
                }),
                providers: meta.providers,
                imports: meta.imports,
            })]);
        var type = new o.ExpressionType(o.importExpr(r3_identifiers_1.Identifiers.InjectorDef, [new o.ExpressionType(meta.type)]));
        return { expression: expression, type: type };
    }
    exports.compileInjector = compileInjector;
    // TODO(alxhub): integrate this with `compileNgModule`. Currently the two are separate operations.
    function compileNgModuleFromRender2(ctx, ngModule, injectableCompiler) {
        var className = compile_metadata_1.identifierName(ngModule.type);
        var rawImports = ngModule.rawImports ? [ngModule.rawImports] : [];
        var rawExports = ngModule.rawExports ? [ngModule.rawExports] : [];
        var injectorDefArg = map_util_1.mapLiteral({
            'factory': injectableCompiler.factoryFor({ type: ngModule.type, symbol: ngModule.type.reference }, ctx),
            'providers': util_1.convertMetaToOutput(ngModule.rawProviders, ctx),
            'imports': util_1.convertMetaToOutput(tslib_1.__spread(rawImports, rawExports), ctx),
        });
        var injectorDef = o.importExpr(r3_identifiers_1.Identifiers.defineInjector).callFn([injectorDefArg]);
        ctx.statements.push(new o.ClassStmt(
        /* name */ className, 
        /* parent */ null, 
        /* fields */ [new o.ClassField(
            /* name */ 'ngInjectorDef', 
            /* type */ o.INFERRED_TYPE, 
            /* modifiers */ [o.StmtModifier.Static], 
            /* initializer */ injectorDef)], 
        /* getters */ [], 
        /* constructorMethod */ new o.ClassMethod(null, [], []), 
        /* methods */ []));
    }
    exports.compileNgModuleFromRender2 = compileNgModuleFromRender2;
    function accessExportScope(module) {
        var selectorScope = new o.ReadPropExpr(module, 'ngModuleDef');
        return new o.ReadPropExpr(selectorScope, 'exported');
    }
    function tupleTypeOf(exp) {
        var types = exp.map(function (type) { return o.typeofExpr(type); });
        return exp.length > 0 ? o.expressionType(o.literalArr(types)) : o.NONE_TYPE;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfbW9kdWxlX2NvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3JlbmRlcjMvcjNfbW9kdWxlX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7OztJQUdILDJFQUFpRjtJQUVqRixrRUFBOEM7SUFDOUMsMkRBQTBDO0lBRzFDLHVFQUEwRTtJQUMxRSwrRUFBbUQ7SUFDbkQsMkRBQStEO0lBNkMvRDs7T0FFRztJQUNILHlCQUFnQyxJQUF3QjtRQUMvQyxJQUFBLHNCQUFnQixFQUFFLDBCQUFTLEVBQUUsZ0NBQVksRUFBRSxzQkFBTyxFQUFFLHNCQUFPLENBQVM7UUFDM0UsSUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyw0QkFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLHlCQUFrQixDQUFDO2dCQUM1RSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsU0FBUyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUNsQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3hDLE9BQU8sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDOUIsT0FBTyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2FBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFTCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyw0QkFBRSxDQUFDLFdBQVcsRUFBRTtZQUM3RCxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUM7WUFDakYsV0FBVyxDQUFDLE9BQU8s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LENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3ZELGFBQWEsQ0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUE1QkQsZ0VBNEJDO0lBRUQsMkJBQTJCLE1BQW9CO1FBQzdDLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxxQkFBcUIsR0FBbUI7UUFDdEMsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztRQUNsRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUM5RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1N0YXRpY1N5bWJvbH0gZnJvbSAnLi4vYW90L3N0YXRpY19zeW1ib2wnO1xuaW1wb3J0IHtDb21waWxlU2hhbGxvd01vZHVsZU1ldGFkYXRhLCBpZGVudGlmaWVyTmFtZX0gZnJvbSAnLi4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge0luamVjdGFibGVDb21waWxlcn0gZnJvbSAnLi4vaW5qZWN0YWJsZV9jb21waWxlcic7XG5pbXBvcnQge21hcExpdGVyYWx9IGZyb20gJy4uL291dHB1dC9tYXBfdXRpbCc7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4uL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7T3V0cHV0Q29udGV4dH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7UjNEZXBlbmRlbmN5TWV0YWRhdGEsIGNvbXBpbGVGYWN0b3J5RnVuY3Rpb259IGZyb20gJy4vcjNfZmFjdG9yeSc7XG5pbXBvcnQge0lkZW50aWZpZXJzIGFzIFIzfSBmcm9tICcuL3IzX2lkZW50aWZpZXJzJztcbmltcG9ydCB7Y29udmVydE1ldGFUb091dHB1dCwgbWFwVG9NYXBFeHByZXNzaW9ufSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFIzTmdNb2R1bGVEZWYge1xuICBleHByZXNzaW9uOiBvLkV4cHJlc3Npb247XG4gIHR5cGU6IG8uVHlwZTtcbiAgYWRkaXRpb25hbFN0YXRlbWVudHM6IG8uU3RhdGVtZW50W107XG59XG5cbi8qKlxuICogTWV0YWRhdGEgcmVxdWlyZWQgYnkgdGhlIG1vZHVsZSBjb21waWxlciB0byBnZW5lcmF0ZSBhIGBuZ01vZHVsZURlZmAgZm9yIGEgdHlwZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSM05nTW9kdWxlTWV0YWRhdGEge1xuICAvKipcbiAgICogQW4gZXhwcmVzc2lvbiByZXByZXNlbnRpbmcgdGhlIG1vZHVsZSB0eXBlIGJlaW5nIGNvbXBpbGVkLlxuICAgKi9cbiAgdHlwZTogby5FeHByZXNzaW9uO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBleHByZXNzaW9ucyByZXByZXNlbnRpbmcgdGhlIGJvb3RzdHJhcCBjb21wb25lbnRzIHNwZWNpZmllZCBieSB0aGUgbW9kdWxlLlxuICAgKi9cbiAgYm9vdHN0cmFwOiBvLkV4cHJlc3Npb25bXTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZXhwcmVzc2lvbnMgcmVwcmVzZW50aW5nIHRoZSBkaXJlY3RpdmVzIGFuZCBwaXBlcyBkZWNsYXJlZCBieSB0aGUgbW9kdWxlLlxuICAgKi9cbiAgZGVjbGFyYXRpb25zOiBvLkV4cHJlc3Npb25bXTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZXhwcmVzc2lvbnMgcmVwcmVzZW50aW5nIHRoZSBpbXBvcnRzIG9mIHRoZSBtb2R1bGUuXG4gICAqL1xuICBpbXBvcnRzOiBvLkV4cHJlc3Npb25bXTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZXhwcmVzc2lvbnMgcmVwcmVzZW50aW5nIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGUuXG4gICAqL1xuICBleHBvcnRzOiBvLkV4cHJlc3Npb25bXTtcblxuICAvKipcbiAgICogV2hldGhlciB0byBlbWl0IHRoZSBzZWxlY3RvciBzY29wZSB2YWx1ZXMgKGRlY2xhcmF0aW9ucywgaW1wb3J0cywgZXhwb3J0cykgaW5saW5lIGludG8gdGhlXG4gICAqIG1vZHVsZSBkZWZpbml0aW9uLCBvciB0byBnZW5lcmF0ZSBhZGRpdGlvbmFsIHN0YXRlbWVudHMgd2hpY2ggcGF0Y2ggdGhlbSBvbi4gSW5saW5lIGVtaXNzaW9uXG4gICAqIGRvZXMgbm90IGFsbG93IGNvbXBvbmVudHMgdG8gYmUgdHJlZS1zaGFrZW4sIGJ1dCBpcyB1c2VmdWwgZm9yIEpJVCBtb2RlLlxuICAgKi9cbiAgZW1pdElubGluZTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3QgYW4gYFIzTmdNb2R1bGVEZWZgIGZvciB0aGUgZ2l2ZW4gYFIzTmdNb2R1bGVNZXRhZGF0YWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlTmdNb2R1bGUobWV0YTogUjNOZ01vZHVsZU1ldGFkYXRhKTogUjNOZ01vZHVsZURlZiB7XG4gIGNvbnN0IHt0eXBlOiBtb2R1bGVUeXBlLCBib290c3RyYXAsIGRlY2xhcmF0aW9ucywgaW1wb3J0cywgZXhwb3J0c30gPSBtZXRhO1xuICBjb25zdCBleHByZXNzaW9uID0gby5pbXBvcnRFeHByKFIzLmRlZmluZU5nTW9kdWxlKS5jYWxsRm4oW21hcFRvTWFwRXhwcmVzc2lvbih7XG4gICAgdHlwZTogbW9kdWxlVHlwZSxcbiAgICBib290c3RyYXA6IG8ubGl0ZXJhbEFycihib290c3RyYXApLFxuICAgIGRlY2xhcmF0aW9uczogby5saXRlcmFsQXJyKGRlY2xhcmF0aW9ucyksXG4gICAgaW1wb3J0czogby5saXRlcmFsQXJyKGltcG9ydHMpLFxuICAgIGV4cG9ydHM6IG8ubGl0ZXJhbEFycihleHBvcnRzKSxcbiAgfSldKTtcblxuICBjb25zdCB0eXBlID0gbmV3IG8uRXhwcmVzc2lvblR5cGUoby5pbXBvcnRFeHByKFIzLk5nTW9kdWxlRGVmLCBbXG4gICAgbmV3IG8uRXhwcmVzc2lvblR5cGUobW9kdWxlVHlwZSksIHR1cGxlVHlwZU9mKGRlY2xhcmF0aW9ucyksIHR1cGxlVHlwZU9mKGltcG9ydHMpLFxuICAgIHR1cGxlVHlwZU9mKGV4cG9ydHMpXG4gIF0pKTtcblxuICBjb25zdCBhZGRpdGlvbmFsU3RhdGVtZW50czogby5TdGF0ZW1lbnRbXSA9IFtdO1xuICByZXR1cm4ge2V4cHJlc3Npb24sIHR5cGUsIGFkZGl0aW9uYWxTdGF0ZW1lbnRzfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0luamVjdG9yRGVmIHtcbiAgZXhwcmVzc2lvbjogby5FeHByZXNzaW9uO1xuICB0eXBlOiBvLlR5cGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNJbmplY3Rvck1ldGFkYXRhIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBvLkV4cHJlc3Npb247XG4gIGRlcHM6IFIzRGVwZW5kZW5jeU1ldGFkYXRhW107XG4gIHByb3ZpZGVyczogby5FeHByZXNzaW9uO1xuICBpbXBvcnRzOiBvLkV4cHJlc3Npb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlSW5qZWN0b3IobWV0YTogUjNJbmplY3Rvck1ldGFkYXRhKTogUjNJbmplY3RvckRlZiB7XG4gIGNvbnN0IGV4cHJlc3Npb24gPSBvLmltcG9ydEV4cHIoUjMuZGVmaW5lSW5qZWN0b3IpLmNhbGxGbihbbWFwVG9NYXBFeHByZXNzaW9uKHtcbiAgICBmYWN0b3J5OiBjb21waWxlRmFjdG9yeUZ1bmN0aW9uKHtcbiAgICAgIG5hbWU6IG1ldGEubmFtZSxcbiAgICAgIGZuT3JDbGFzczogbWV0YS50eXBlLFxuICAgICAgZGVwczogbWV0YS5kZXBzLFxuICAgICAgdXNlTmV3OiB0cnVlLFxuICAgICAgaW5qZWN0Rm46IFIzLmluamVjdCxcbiAgICB9KSxcbiAgICBwcm92aWRlcnM6IG1ldGEucHJvdmlkZXJzLFxuICAgIGltcG9ydHM6IG1ldGEuaW1wb3J0cyxcbiAgfSldKTtcbiAgY29uc3QgdHlwZSA9XG4gICAgICBuZXcgby5FeHByZXNzaW9uVHlwZShvLmltcG9ydEV4cHIoUjMuSW5qZWN0b3JEZWYsIFtuZXcgby5FeHByZXNzaW9uVHlwZShtZXRhLnR5cGUpXSkpO1xuICByZXR1cm4ge2V4cHJlc3Npb24sIHR5cGV9O1xufVxuXG4vLyBUT0RPKGFseGh1Yik6IGludGVncmF0ZSB0aGlzIHdpdGggYGNvbXBpbGVOZ01vZHVsZWAuIEN1cnJlbnRseSB0aGUgdHdvIGFyZSBzZXBhcmF0ZSBvcGVyYXRpb25zLlxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVOZ01vZHVsZUZyb21SZW5kZXIyKFxuICAgIGN0eDogT3V0cHV0Q29udGV4dCwgbmdNb2R1bGU6IENvbXBpbGVTaGFsbG93TW9kdWxlTWV0YWRhdGEsXG4gICAgaW5qZWN0YWJsZUNvbXBpbGVyOiBJbmplY3RhYmxlQ29tcGlsZXIpOiB2b2lkIHtcbiAgY29uc3QgY2xhc3NOYW1lID0gaWRlbnRpZmllck5hbWUobmdNb2R1bGUudHlwZSkgITtcblxuICBjb25zdCByYXdJbXBvcnRzID0gbmdNb2R1bGUucmF3SW1wb3J0cyA/IFtuZ01vZHVsZS5yYXdJbXBvcnRzXSA6IFtdO1xuICBjb25zdCByYXdFeHBvcnRzID0gbmdNb2R1bGUucmF3RXhwb3J0cyA/IFtuZ01vZHVsZS5yYXdFeHBvcnRzXSA6IFtdO1xuXG4gIGNvbnN0IGluamVjdG9yRGVmQXJnID0gbWFwTGl0ZXJhbCh7XG4gICAgJ2ZhY3RvcnknOlxuICAgICAgICBpbmplY3RhYmxlQ29tcGlsZXIuZmFjdG9yeUZvcih7dHlwZTogbmdNb2R1bGUudHlwZSwgc3ltYm9sOiBuZ01vZHVsZS50eXBlLnJlZmVyZW5jZX0sIGN0eCksXG4gICAgJ3Byb3ZpZGVycyc6IGNvbnZlcnRNZXRhVG9PdXRwdXQobmdNb2R1bGUucmF3UHJvdmlkZXJzLCBjdHgpLFxuICAgICdpbXBvcnRzJzogY29udmVydE1ldGFUb091dHB1dChbLi4ucmF3SW1wb3J0cywgLi4ucmF3RXhwb3J0c10sIGN0eCksXG4gIH0pO1xuXG4gIGNvbnN0IGluamVjdG9yRGVmID0gby5pbXBvcnRFeHByKFIzLmRlZmluZUluamVjdG9yKS5jYWxsRm4oW2luamVjdG9yRGVmQXJnXSk7XG5cbiAgY3R4LnN0YXRlbWVudHMucHVzaChuZXcgby5DbGFzc1N0bXQoXG4gICAgICAvKiBuYW1lICovIGNsYXNzTmFtZSxcbiAgICAgIC8qIHBhcmVudCAqLyBudWxsLFxuICAgICAgLyogZmllbGRzICovW25ldyBvLkNsYXNzRmllbGQoXG4gICAgICAgICAgLyogbmFtZSAqLyAnbmdJbmplY3RvckRlZicsXG4gICAgICAgICAgLyogdHlwZSAqLyBvLklORkVSUkVEX1RZUEUsXG4gICAgICAgICAgLyogbW9kaWZpZXJzICovW28uU3RtdE1vZGlmaWVyLlN0YXRpY10sXG4gICAgICAgICAgLyogaW5pdGlhbGl6ZXIgKi8gaW5qZWN0b3JEZWYsICldLFxuICAgICAgLyogZ2V0dGVycyAqL1tdLFxuICAgICAgLyogY29uc3RydWN0b3JNZXRob2QgKi8gbmV3IG8uQ2xhc3NNZXRob2QobnVsbCwgW10sIFtdKSxcbiAgICAgIC8qIG1ldGhvZHMgKi9bXSkpO1xufVxuXG5mdW5jdGlvbiBhY2Nlc3NFeHBvcnRTY29wZShtb2R1bGU6IG8uRXhwcmVzc2lvbik6IG8uRXhwcmVzc2lvbiB7XG4gIGNvbnN0IHNlbGVjdG9yU2NvcGUgPSBuZXcgby5SZWFkUHJvcEV4cHIobW9kdWxlLCAnbmdNb2R1bGVEZWYnKTtcbiAgcmV0dXJuIG5ldyBvLlJlYWRQcm9wRXhwcihzZWxlY3RvclNjb3BlLCAnZXhwb3J0ZWQnKTtcbn1cblxuZnVuY3Rpb24gdHVwbGVUeXBlT2YoZXhwOiBvLkV4cHJlc3Npb25bXSk6IG8uVHlwZSB7XG4gIGNvbnN0IHR5cGVzID0gZXhwLm1hcCh0eXBlID0+IG8udHlwZW9mRXhwcih0eXBlKSk7XG4gIHJldHVybiBleHAubGVuZ3RoID4gMCA/IG8uZXhwcmVzc2lvblR5cGUoby5saXRlcmFsQXJyKHR5cGVzKSkgOiBvLk5PTkVfVFlQRTtcbn0iXX0=