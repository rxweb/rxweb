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
        define("@angular/compiler/src/style_compiler", ["require", "exports", "@angular/compiler/src/compile_metadata", "@angular/compiler/src/core", "@angular/compiler/src/output/output_ast", "@angular/compiler/src/shadow_css"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var compile_metadata_1 = require("@angular/compiler/src/compile_metadata");
    var core_1 = require("@angular/compiler/src/core");
    var o = require("@angular/compiler/src/output/output_ast");
    var shadow_css_1 = require("@angular/compiler/src/shadow_css");
    var COMPONENT_VARIABLE = '%COMP%';
    var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
    var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
    var StylesCompileDependency = /** @class */ (function () {
        function StylesCompileDependency(name, moduleUrl, setValue) {
            this.name = name;
            this.moduleUrl = moduleUrl;
            this.setValue = setValue;
        }
        return StylesCompileDependency;
    }());
    exports.StylesCompileDependency = StylesCompileDependency;
    var CompiledStylesheet = /** @class */ (function () {
        function CompiledStylesheet(outputCtx, stylesVar, dependencies, isShimmed, meta) {
            this.outputCtx = outputCtx;
            this.stylesVar = stylesVar;
            this.dependencies = dependencies;
            this.isShimmed = isShimmed;
            this.meta = meta;
        }
        return CompiledStylesheet;
    }());
    exports.CompiledStylesheet = CompiledStylesheet;
    var StyleCompiler = /** @class */ (function () {
        function StyleCompiler(_urlResolver) {
            this._urlResolver = _urlResolver;
            this._shadowCss = new shadow_css_1.ShadowCss();
        }
        StyleCompiler.prototype.compileComponent = function (outputCtx, comp) {
            var template = comp.template;
            return this._compileStyles(outputCtx, comp, new compile_metadata_1.CompileStylesheetMetadata({
                styles: template.styles,
                styleUrls: template.styleUrls,
                moduleUrl: compile_metadata_1.identifierModuleUrl(comp.type)
            }), this.needsStyleShim(comp), true);
        };
        StyleCompiler.prototype.compileStyles = function (outputCtx, comp, stylesheet, shim) {
            if (shim === void 0) { shim = this.needsStyleShim(comp); }
            return this._compileStyles(outputCtx, comp, stylesheet, shim, false);
        };
        StyleCompiler.prototype.needsStyleShim = function (comp) {
            return comp.template.encapsulation === core_1.ViewEncapsulation.Emulated;
        };
        StyleCompiler.prototype._compileStyles = function (outputCtx, comp, stylesheet, shim, isComponentStylesheet) {
            var _this = this;
            var styleExpressions = stylesheet.styles.map(function (plainStyle) { return o.literal(_this._shimIfNeeded(plainStyle, shim)); });
            var dependencies = [];
            stylesheet.styleUrls.forEach(function (styleUrl) {
                var exprIndex = styleExpressions.length;
                // Note: This placeholder will be filled later.
                styleExpressions.push(null);
                dependencies.push(new StylesCompileDependency(getStylesVarName(null), styleUrl, function (value) { return styleExpressions[exprIndex] = outputCtx.importExpr(value); }));
            });
            // styles variable contains plain strings and arrays of other styles arrays (recursive),
            // so we set its type to dynamic.
            var stylesVar = getStylesVarName(isComponentStylesheet ? comp : null);
            var stmt = o.variable(stylesVar)
                .set(o.literalArr(styleExpressions, new o.ArrayType(o.DYNAMIC_TYPE, [o.TypeModifier.Const])))
                .toDeclStmt(null, isComponentStylesheet ? [o.StmtModifier.Final] : [
                o.StmtModifier.Final, o.StmtModifier.Exported
            ]);
            outputCtx.statements.push(stmt);
            return new CompiledStylesheet(outputCtx, stylesVar, dependencies, shim, stylesheet);
        };
        StyleCompiler.prototype._shimIfNeeded = function (style, shim) {
            return shim ? this._shadowCss.shimCssText(style, CONTENT_ATTR, HOST_ATTR) : style;
        };
        return StyleCompiler;
    }());
    exports.StyleCompiler = StyleCompiler;
    function getStylesVarName(component) {
        var result = "styles";
        if (component) {
            result += "_" + compile_metadata_1.identifierName(component.type);
        }
        return result;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVfY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvc3R5bGVfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCwyRUFBdUo7SUFDdkosbURBQXlDO0lBQ3pDLDJEQUF5QztJQUN6QywrREFBdUM7SUFJdkMsSUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUM7SUFDcEMsSUFBTSxTQUFTLEdBQUcsYUFBVyxrQkFBb0IsQ0FBQztJQUNsRCxJQUFNLFlBQVksR0FBRyxnQkFBYyxrQkFBb0IsQ0FBQztJQUV4RDtRQUNFLGlDQUNXLElBQVksRUFBUyxTQUFpQixFQUFTLFFBQThCO1lBQTdFLFNBQUksR0FBSixJQUFJLENBQVE7WUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFRO1lBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFBRyxDQUFDO1FBQzlGLDhCQUFDO0lBQUQsQ0FBQyxBQUhELElBR0M7SUFIWSwwREFBdUI7SUFLcEM7UUFDRSw0QkFDVyxTQUF3QixFQUFTLFNBQWlCLEVBQ2xELFlBQXVDLEVBQVMsU0FBa0IsRUFDbEUsSUFBK0I7WUFGL0IsY0FBUyxHQUFULFNBQVMsQ0FBZTtZQUFTLGNBQVMsR0FBVCxTQUFTLENBQVE7WUFDbEQsaUJBQVksR0FBWixZQUFZLENBQTJCO1lBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUztZQUNsRSxTQUFJLEdBQUosSUFBSSxDQUEyQjtRQUFHLENBQUM7UUFDaEQseUJBQUM7SUFBRCxDQUFDLEFBTEQsSUFLQztJQUxZLGdEQUFrQjtJQU8vQjtRQUdFLHVCQUFvQixZQUF5QjtZQUF6QixpQkFBWSxHQUFaLFlBQVksQ0FBYTtZQUZyQyxlQUFVLEdBQWMsSUFBSSxzQkFBUyxFQUFFLENBQUM7UUFFQSxDQUFDO1FBRWpELHdDQUFnQixHQUFoQixVQUFpQixTQUF3QixFQUFF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T0FBTyxJQUFJLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBRU8scUNBQWEsR0FBckIsVUFBc0IsS0FBYSxFQUFFLElBQWE7WUFDaEQsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNwRixDQUFDO1FBQ0gsb0JBQUM7SUFBRCxDQUFDLEFBMURELElBMERDO0lBMURZLHNDQUFhO0lBNEQxQiwwQkFBMEIsU0FBMEM7UUFDbEUsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3RCLElBQUksU0FBUyxFQUFFO1lBQ2IsTUFBTSxJQUFJLE1BQUksaUNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFHLENBQUM7U0FDaEQ7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSwgQ29tcGlsZVN0eWxlc2hlZXRNZXRhZGF0YSwgaWRlbnRpZmllck1vZHVsZVVybCwgaWRlbnRpZmllck5hbWV9IGZyb20gJy4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7U2hhZG93Q3NzfSBmcm9tICcuL3NoYWRvd19jc3MnO1xuaW1wb3J0IHtVcmxSZXNvbHZlcn0gZnJvbSAnLi91cmxfcmVzb2x2ZXInO1xuaW1wb3J0IHtPdXRwdXRDb250ZXh0fSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBDT01QT05FTlRfVkFSSUFCTEUgPSAnJUNPTVAlJztcbmNvbnN0IEhPU1RfQVRUUiA9IGBfbmdob3N0LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5jb25zdCBDT05URU5UX0FUVFIgPSBgX25nY29udGVudC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuXG5leHBvcnQgY2xhc3MgU3R5bGVzQ29tcGlsZURlcGVuZGVuY3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBtb2R1bGVVcmw6IHN0cmluZywgcHVibGljIHNldFZhbHVlOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge31cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVkU3R5bGVzaGVldCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgcHVibGljIHN0eWxlc1Zhcjogc3RyaW5nLFxuICAgICAgcHVibGljIGRlcGVuZGVuY2llczogU3R5bGVzQ29tcGlsZURlcGVuZGVuY3lbXSwgcHVibGljIGlzU2hpbW1lZDogYm9vbGVhbixcbiAgICAgIHB1YmxpYyBtZXRhOiBDb21waWxlU3R5bGVzaGVldE1ldGFkYXRhKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgU3R5bGVDb21waWxlciB7XG4gIHByaXZhdGUgX3NoYWRvd0NzczogU2hhZG93Q3NzID0gbmV3IFNoYWRvd0NzcygpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3VybFJlc29sdmVyOiBVcmxSZXNvbHZlcikge31cblxuICBjb21waWxlQ29tcG9uZW50KG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgY29tcDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhKTogQ29tcGlsZWRTdHlsZXNoZWV0IHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IGNvbXAudGVtcGxhdGUgITtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZVN0eWxlcyhcbiAgICAgICAgb3V0cHV0Q3R4LCBjb21wLCBuZXcgQ29tcGlsZVN0eWxlc2hlZXRNZXRhZGF0YSh7XG4gICAgICAgICAgc3R5bGVzOiB0ZW1wbGF0ZS5zdHlsZXMsXG4gICAgICAgICAgc3R5bGVVcmxzOiB0ZW1wbGF0ZS5zdHlsZVVybHMsXG4gICAgICAgICAgbW9kdWxlVXJsOiBpZGVudGlmaWVyTW9kdWxlVXJsKGNvbXAudHlwZSlcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMubmVlZHNTdHlsZVNoaW0oY29tcCksIHRydWUpO1xuICB9XG5cbiAgY29tcGlsZVN0eWxlcyhcbiAgICAgIG91dHB1dEN0eDogT3V0cHV0Q29udGV4dCwgY29tcDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgc3R5bGVzaGVldDogQ29tcGlsZVN0eWxlc2hlZXRNZXRhZGF0YSxcbiAgICAgIHNoaW06IGJvb2xlYW4gPSB0aGlzLm5lZWRzU3R5bGVTaGltKGNvbXApKTogQ29tcGlsZWRTdHlsZXNoZWV0IHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZVN0eWxlcyhvdXRwdXRDdHgsIGNvbXAsIHN0eWxlc2hlZXQsIHNoaW0sIGZhbHNlKTtcbiAgfVxuXG4gIG5lZWRzU3R5bGVTaGltKGNvbXA6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb21wLnRlbXBsYXRlICEuZW5jYXBzdWxhdGlvbiA9PT0gVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWQ7XG4gIH1cblxuICBwcml2YXRlIF9jb21waWxlU3R5bGVzKFxuICAgICAgb3V0cHV0Q3R4OiBPdXRwdXRDb250ZXh0LCBjb21wOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICBzdHlsZXNoZWV0OiBDb21waWxlU3R5bGVzaGVldE1ldGFkYXRhLCBzaGltOiBib29sZWFuLFxuICAgICAgaXNDb21wb25lbnRTdHlsZXNoZWV0OiBib29sZWFuKTogQ29tcGlsZWRTdHlsZXNoZWV0IHtcbiAgICBjb25zdCBzdHlsZUV4cHJlc3Npb25zOiBvLkV4cHJlc3Npb25bXSA9XG4gICAgICAgIHN0eWxlc2hlZXQuc3R5bGVzLm1hcChwbGFpblN0eWxlID0+IG8ubGl0ZXJhbCh0aGlzLl9zaGltSWZOZWVkZWQocGxhaW5TdHlsZSwgc2hpbSkpKTtcbiAgICBjb25zdCBkZXBlbmRlbmNpZXM6IFN0eWxlc0NvbXBpbGVEZXBlbmRlbmN5W10gPSBbXTtcbiAgICBzdHlsZXNoZWV0LnN0eWxlVXJscy5mb3JFYWNoKChzdHlsZVVybCkgPT4ge1xuICAgICAgY29uc3QgZXhwckluZGV4ID0gc3R5bGVFeHByZXNzaW9ucy5sZW5ndGg7XG4gICAgICAvLyBOb3RlOiBUaGlzIHBsYWNlaG9sZGVyIHdpbGwgYmUgZmlsbGVkIGxhdGVyLlxuICAgICAgc3R5bGVFeHByZXNzaW9ucy5wdXNoKG51bGwgISk7XG4gICAgICBkZXBlbmRlbmNpZXMucHVzaChuZXcgU3R5bGVzQ29tcGlsZURlcGVuZGVuY3koXG4gICAgICAgICAgZ2V0U3R5bGVzVmFyTmFtZShudWxsKSwgc3R5bGVVcmwsXG4gICAgICAgICAgKHZhbHVlKSA9PiBzdHlsZUV4cHJlc3Npb25zW2V4cHJJbmRleF0gPSBvdXRwdXRDdHguaW1wb3J0RXhwcih2YWx1ZSkpKTtcbiAgICB9KTtcbiAgICAvLyBzdHlsZXMgdmFyaWFibGUgY29udGFpbnMgcGxhaW4gc3RyaW5ncyBhbmQgYXJyYXlzIG9mIG90aGVyIHN0eWxlcyBhcnJheXMgKHJlY3Vyc2l2ZSksXG4gICAgLy8gc28gd2Ugc2V0IGl0cyB0eXBlIHRvIGR5bmFtaWMuXG4gICAgY29uc3Qgc3R5bGVzVmFyID0gZ2V0U3R5bGVzVmFyTmFtZShpc0NvbXBvbmVudFN0eWxlc2hlZXQgPyBjb21wIDogbnVsbCk7XG4gICAgY29uc3Qgc3RtdCA9IG8udmFyaWFibGUoc3R5bGVzVmFyKVxuICAgICAgICAgICAgICAgICAgICAgLnNldChvLmxpdGVyYWxBcnIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVFeHByZXNzaW9ucywgbmV3IG8uQXJyYXlUeXBlKG8uRFlOQU1JQ19UWVBFLCBbby5UeXBlTW9kaWZpZXIuQ29uc3RdKSkpXG4gICAgICAgICAgICAgICAgICAgICAudG9EZWNsU3RtdChudWxsLCBpc0NvbXBvbmVudFN0eWxlc2hlZXQgPyBbby5TdG10TW9kaWZpZXIuRmluYWxdIDogW1xuICAgICAgICAgICAgICAgICAgICAgICBvLlN0bXRNb2RpZmllci5GaW5hbCwgby5TdG10TW9kaWZpZXIuRXhwb3J0ZWRcbiAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgIG91dHB1dEN0eC5zdGF0ZW1lbnRzLnB1c2goc3RtdCk7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlZFN0eWxlc2hlZXQob3V0cHV0Q3R4LCBzdHlsZXNWYXIsIGRlcGVuZGVuY2llcywgc2hpbSwgc3R5bGVzaGVldCk7XG4gIH1cblxuICBwcml2YXRlIF9zaGltSWZOZWVkZWQoc3R5bGU6IHN0cmluZywgc2hpbTogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHNoaW0gPyB0aGlzLl9zaGFkb3dDc3Muc2hpbUNzc1RleHQoc3R5bGUsIENPTlRFTlRfQVRUUiwgSE9TVF9BVFRSKSA6IHN0eWxlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFN0eWxlc1Zhck5hbWUoY29tcG9uZW50OiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEgfCBudWxsKTogc3RyaW5nIHtcbiAgbGV0IHJlc3VsdCA9IGBzdHlsZXNgO1xuICBpZiAoY29tcG9uZW50KSB7XG4gICAgcmVzdWx0ICs9IGBfJHtpZGVudGlmaWVyTmFtZShjb21wb25lbnQudHlwZSl9YDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIl19