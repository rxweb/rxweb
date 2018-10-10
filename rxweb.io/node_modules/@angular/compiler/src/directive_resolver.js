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
        define("@angular/compiler/src/directive_resolver", ["require", "exports", "tslib", "@angular/compiler/src/core", "@angular/compiler/src/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var core_1 = require("@angular/compiler/src/core");
    var util_1 = require("@angular/compiler/src/util");
    var QUERY_METADATA_IDENTIFIERS = [
        core_1.createViewChild,
        core_1.createViewChildren,
        core_1.createContentChild,
        core_1.createContentChildren,
    ];
    /*
     * Resolve a `Type` for {@link Directive}.
     *
     * This interface can be overridden by the application developer to create custom behavior.
     *
     * See {@link Compiler}
     */
    var DirectiveResolver = /** @class */ (function () {
        function DirectiveResolver(_reflector) {
            this._reflector = _reflector;
        }
        DirectiveResolver.prototype.isDirective = function (type) {
            var typeMetadata = this._reflector.annotations(util_1.resolveForwardRef(type));
            return typeMetadata && typeMetadata.some(isDirectiveMetadata);
        };
        DirectiveResolver.prototype.resolve = function (type, throwIfNotFound) {
            if (throwIfNotFound === void 0) { throwIfNotFound = true; }
            var typeMetadata = this._reflector.annotations(util_1.resolveForwardRef(type));
            if (typeMetadata) {
                var metadata = findLast(typeMetadata, isDirectiveMetadata);
                if (metadata) {
                    var propertyMetadata = this._reflector.propMetadata(type);
                    var guards = this._reflector.guards(type);
                    return this._mergeWithPropertyMetadata(metadata, propertyMetadata, guards, type);
                }
            }
            if (throwIfNotFound) {
                throw new Error("No Directive annotation found on " + util_1.stringify(type));
            }
            return null;
        };
        DirectiveResolver.prototype._mergeWithPropertyMetadata = function (dm, propertyMetadata, guards, directiveType) {
            var inputs = [];
            var outputs = [];
            var host = {};
            var queries = {};
            Object.keys(propertyMetadata).forEach(function (propName) {
                var input = findLast(propertyMetadata[propName], function (a) { return core_1.createInput.isTypeOf(a); });
                if (input) {
                    if (input.bindingPropertyName) {
                        inputs.push(propName + ": " + input.bindingPropertyName);
                    }
                    else {
                        inputs.push(propName);
                    }
                }
                var output = findLast(propertyMetadata[propName], function (a) { return core_1.createOutput.isTypeOf(a); });
                if (output) {
                    if (output.bindingPropertyName) {
                        outputs.push(propName + ": " + output.bindingPropertyName);
                    }
                    else {
                        outputs.push(propName);
                    }
                }
                var hostBindings = propertyMetadata[propName].filter(function (a) { return core_1.createHostBinding.isTypeOf(a); });
                hostBindings.forEach(function (hostBinding) {
                    if (hostBinding.hostPropertyName) {
                        var startWith = hostBinding.hostPropertyName[0];
                        if (startWith === '(') {
                            throw new Error("@HostBinding can not bind to events. Use @HostListener instead.");
                        }
                        else if (startWith === '[') {
                            throw new Error("@HostBinding parameter should be a property name, 'class.<name>', or 'attr.<name>'.");
                        }
                        host["[" + hostBinding.hostPropertyName + "]"] = propName;
                    }
                    else {
                        host["[" + propName + "]"] = propName;
                    }
                });
                var hostListeners = propertyMetadata[propName].filter(function (a) { return core_1.createHostListener.isTypeOf(a); });
                hostListeners.forEach(function (hostListener) {
                    var args = hostListener.args || [];
                    host["(" + hostListener.eventName + ")"] = propName + "(" + args.join(',') + ")";
                });
                var query = findLast(propertyMetadata[propName], function (a) { return QUERY_METADATA_IDENTIFIERS.some(function (i) { return i.isTypeOf(a); }); });
                if (query) {
                    queries[propName] = query;
                }
            });
            return this._merge(dm, inputs, outputs, host, queries, guards, directiveType);
        };
        DirectiveResolver.prototype._extractPublicName = function (def) { return util_1.splitAtColon(def, [null, def])[1].trim(); };
        DirectiveResolver.prototype._dedupeBindings = function (bindings) {
            var names = new Set();
            var publicNames = new Set();
            var reversedResult = [];
            // go last to first to allow later entries to overwrite previous entries
            for (var i = bindings.length - 1; i >= 0; i--) {
                var binding = bindings[i];
                var name_1 = this._extractPublicName(binding);
                publicNames.add(name_1);
                if (!names.has(name_1)) {
                    names.add(name_1);
                    reversedResult.push(binding);
                }
            }
            return reversedResult.reverse();
        };
        DirectiveResolver.prototype._merge = function (directive, inputs, outputs, host, queries, guards, directiveType) {
            var mergedInputs = this._dedupeBindings(directive.inputs ? directive.inputs.concat(inputs) : inputs);
            var mergedOutputs = this._dedupeBindings(directive.outputs ? directive.outputs.concat(outputs) : outputs);
            var mergedHost = directive.host ? tslib_1.__assign({}, directive.host, host) : host;
            var mergedQueries = directive.queries ? tslib_1.__assign({}, directive.queries, queries) : queries;
            if (core_1.createComponent.isTypeOf(directive)) {
                var comp = directive;
                return core_1.createComponent({
                    selector: comp.selector,
                    inputs: mergedInputs,
                    outputs: mergedOutputs,
                    host: mergedHost,
                    exportAs: comp.exportAs,
                    moduleId: comp.moduleId,
                    queries: mergedQueries,
                    changeDetection: comp.changeDetection,
                    providers: comp.providers,
                    viewProviders: comp.viewProviders,
                    entryComponents: comp.entryComponents,
                    template: comp.template,
                    templateUrl: comp.templateUrl,
                    styles: comp.styles,
                    styleUrls: comp.styleUrls,
                    encapsulation: comp.encapsulation,
                    animations: comp.animations,
                    interpolation: comp.interpolation,
                    preserveWhitespaces: directive.preserveWhitespaces,
                });
            }
            else {
                return core_1.createDirective({
                    selector: directive.selector,
                    inputs: mergedInputs,
                    outputs: mergedOutputs,
                    host: mergedHost,
                    exportAs: directive.exportAs,
                    queries: mergedQueries,
                    providers: directive.providers, guards: guards
                });
            }
        };
        return DirectiveResolver;
    }());
    exports.DirectiveResolver = DirectiveResolver;
    function isDirectiveMetadata(type) {
        return core_1.createDirective.isTypeOf(type) || core_1.createComponent.isTypeOf(type);
    }
    function findLast(arr, condition) {
        for (var i = arr.length - 1; i >= 0; i--) {
            if (condition(arr[i])) {
                return arr[i];
            }
        }
        return null;
    }
    exports.findLast = findLast;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL2RpcmVjdGl2ZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFHSCxtREFBc087SUFDdE8sbURBQWtFO0lBRWxFLElBQU0sMEJBQTBCLEdBQUc7UUFDakMsc0JBQWU7UUFDZix5QkFBa0I7UUFDbEIseUJBQWtCO1FBQ2xCLDRCQUFxQjtLQUN0QixDQUFDO0lBRUY7Ozs7OztPQU1HO0lBQ0g7UUFDRSwyQkFBb0IsVUFBNEI7WUFBNUIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFBRyxDQUFDO1FBRXBELHVDQUFXLEdBQVgsVUFBWSxJQUFVO1lBQ3BCLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLHdCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUUsT0FBTyxZQUFZLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFRRCxtQ0FBTyxHQUFQLFVBQVEsSUFBVSxFQUFFLGVBQXNCO1lBQXRCLGdDQUFBLEVBQUEsc0JBQXNCO1lBQ3hDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLHdCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUUsSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxRQUFRLEVBQUU7b0JBQ1osSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUs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QUFTLENBQUMsUUFBUTtvQkFDNUIsTUFBTSxFQUFFLFlBQVk7b0JBQ3BCLE9BQU8sRUFBRSxhQUFhO29CQUN0QixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRO29CQUM1QixPQUFPLEVBQUUsYUFBYTtvQkFDdEIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxRQUFBO2lCQUN2QyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7UUFDSCx3QkFBQztJQUFELENBQUMsQUFwSkQsSUFvSkM7SUFwSlksOENBQWlCO0lBc0o5Qiw2QkFBNkIsSUFBUztRQUNwQyxPQUFPLHNCQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLHNCQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxrQkFBNEIsR0FBUSxFQUFFLFNBQWdDO1FBQ3BFLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDckIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDZjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBUEQsNEJBT0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tcGlsZVJlZmxlY3Rvcn0gZnJvbSAnLi9jb21waWxlX3JlZmxlY3Rvcic7XG5pbXBvcnQge0NvbXBvbmVudCwgRGlyZWN0aXZlLCBUeXBlLCBjcmVhdGVDb21wb25lbnQsIGNyZWF0ZUNvbnRlbnRDaGlsZCwgY3JlYXRlQ29udGVudENoaWxkcmVuLCBjcmVhdGVEaXJlY3RpdmUsIGNyZWF0ZUhvc3RCaW5kaW5nLCBjcmVhdGVIb3N0TGlzdGVuZXIsIGNyZWF0ZUlucHV0LCBjcmVhdGVPdXRwdXQsIGNyZWF0ZVZpZXdDaGlsZCwgY3JlYXRlVmlld0NoaWxkcmVufSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZiwgc3BsaXRBdENvbG9uLCBzdHJpbmdpZnl9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IFFVRVJZX01FVEFEQVRBX0lERU5USUZJRVJTID0gW1xuICBjcmVhdGVWaWV3Q2hpbGQsXG4gIGNyZWF0ZVZpZXdDaGlsZHJlbixcbiAgY3JlYXRlQ29udGVudENoaWxkLFxuICBjcmVhdGVDb250ZW50Q2hpbGRyZW4sXG5dO1xuXG4vKlxuICogUmVzb2x2ZSBhIGBUeXBlYCBmb3Ige0BsaW5rIERpcmVjdGl2ZX0uXG4gKlxuICogVGhpcyBpbnRlcmZhY2UgY2FuIGJlIG92ZXJyaWRkZW4gYnkgdGhlIGFwcGxpY2F0aW9uIGRldmVsb3BlciB0byBjcmVhdGUgY3VzdG9tIGJlaGF2aW9yLlxuICpcbiAqIFNlZSB7QGxpbmsgQ29tcGlsZXJ9XG4gKi9cbmV4cG9ydCBjbGFzcyBEaXJlY3RpdmVSZXNvbHZlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlZmxlY3RvcjogQ29tcGlsZVJlZmxlY3Rvcikge31cblxuICBpc0RpcmVjdGl2ZSh0eXBlOiBUeXBlKSB7XG4gICAgY29uc3QgdHlwZU1ldGFkYXRhID0gdGhpcy5fcmVmbGVjdG9yLmFubm90YXRpb25zKHJlc29sdmVGb3J3YXJkUmVmKHR5cGUpKTtcbiAgICByZXR1cm4gdHlwZU1ldGFkYXRhICYmIHR5cGVNZXRhZGF0YS5zb21lKGlzRGlyZWN0aXZlTWV0YWRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB7QGxpbmsgRGlyZWN0aXZlfSBmb3IgYSBnaXZlbiBgVHlwZWAuXG4gICAqL1xuICByZXNvbHZlKHR5cGU6IFR5cGUpOiBEaXJlY3RpdmU7XG4gIHJlc29sdmUodHlwZTogVHlwZSwgdGhyb3dJZk5vdEZvdW5kOiB0cnVlKTogRGlyZWN0aXZlO1xuICByZXNvbHZlKHR5cGU6IFR5cGUsIHRocm93SWZOb3RGb3VuZDogYm9vbGVhbik6IERpcmVjdGl2ZXxudWxsO1xuICByZXNvbHZlKHR5cGU6IFR5cGUsIHRocm93SWZOb3RGb3VuZCA9IHRydWUpOiBEaXJlY3RpdmV8bnVsbCB7XG4gICAgY29uc3QgdHlwZU1ldGFkYXRhID0gdGhpcy5fcmVmbGVjdG9yLmFubm90YXRpb25zKHJlc29sdmVGb3J3YXJkUmVmKHR5cGUpKTtcbiAgICBpZiAodHlwZU1ldGFkYXRhKSB7XG4gICAgICBjb25zdCBtZXRhZGF0YSA9IGZpbmRMYXN0KHR5cGVNZXRhZGF0YSwgaXNEaXJlY3RpdmVNZXRhZGF0YSk7XG4gICAgICBpZiAobWV0YWRhdGEpIHtcbiAgICAgICAgY29uc3QgcHJvcGVydHlNZXRhZGF0YSA9IHRoaXMuX3JlZmxlY3Rvci5wcm9wTWV0YWRhdGEodHlwZSk7XG4gICAgICAgIGNvbnN0IGd1YXJkcyA9IHRoaXMuX3JlZmxlY3Rvci5ndWFyZHModHlwZSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXJnZVdpdGhQcm9wZXJ0eU1ldGFkYXRhKG1ldGFkYXRhLCBwcm9wZXJ0eU1ldGFkYXRhLCBndWFyZHMsIHR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aHJvd0lmTm90Rm91bmQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gRGlyZWN0aXZlIGFubm90YXRpb24gZm91bmQgb24gJHtzdHJpbmdpZnkodHlwZSl9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9tZXJnZVdpdGhQcm9wZXJ0eU1ldGFkYXRhKFxuICAgICAgZG06IERpcmVjdGl2ZSwgcHJvcGVydHlNZXRhZGF0YToge1trZXk6IHN0cmluZ106IGFueVtdfSwgZ3VhcmRzOiB7W2tleTogc3RyaW5nXTogYW55fSxcbiAgICAgIGRpcmVjdGl2ZVR5cGU6IFR5cGUpOiBEaXJlY3RpdmUge1xuICAgIGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBvdXRwdXRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGhvc3Q6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgY29uc3QgcXVlcmllczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICBPYmplY3Qua2V5cyhwcm9wZXJ0eU1ldGFkYXRhKS5mb3JFYWNoKChwcm9wTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IGZpbmRMYXN0KHByb3BlcnR5TWV0YWRhdGFbcHJvcE5hbWVdLCAoYSkgPT4gY3JlYXRlSW5wdXQuaXNUeXBlT2YoYSkpO1xuICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5iaW5kaW5nUHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgaW5wdXRzLnB1c2goYCR7cHJvcE5hbWV9OiAke2lucHV0LmJpbmRpbmdQcm9wZXJ0eU5hbWV9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5wdXRzLnB1c2gocHJvcE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBvdXRwdXQgPSBmaW5kTGFzdChwcm9wZXJ0eU1ldGFkYXRhW3Byb3BOYW1lXSwgKGEpID0+IGNyZWF0ZU91dHB1dC5pc1R5cGVPZihhKSk7XG4gICAgICBpZiAob3V0cHV0KSB7XG4gICAgICAgIGlmIChvdXRwdXQuYmluZGluZ1Byb3BlcnR5TmFtZSkge1xuICAgICAgICAgIG91dHB1dHMucHVzaChgJHtwcm9wTmFtZX06ICR7b3V0cHV0LmJpbmRpbmdQcm9wZXJ0eU5hbWV9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3V0cHV0cy5wdXNoKHByb3BOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgaG9zdEJpbmRpbmdzID0gcHJvcGVydHlNZXRhZGF0YVtwcm9wTmFtZV0uZmlsdGVyKGEgPT4gY3JlYXRlSG9zdEJpbmRpbmcuaXNUeXBlT2YoYSkpO1xuICAgICAgaG9zdEJpbmRpbmdzLmZvckVhY2goaG9zdEJpbmRpbmcgPT4ge1xuICAgICAgICBpZiAoaG9zdEJpbmRpbmcuaG9zdFByb3BlcnR5TmFtZSkge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0V2l0aCA9IGhvc3RCaW5kaW5nLmhvc3RQcm9wZXJ0eU5hbWVbMF07XG4gICAgICAgICAgaWYgKHN0YXJ0V2l0aCA9PT0gJygnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEBIb3N0QmluZGluZyBjYW4gbm90IGJpbmQgdG8gZXZlbnRzLiBVc2UgQEhvc3RMaXN0ZW5lciBpbnN0ZWFkLmApO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRXaXRoID09PSAnWycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgQEhvc3RCaW5kaW5nIHBhcmFtZXRlciBzaG91bGQgYmUgYSBwcm9wZXJ0eSBuYW1lLCAnY2xhc3MuPG5hbWU+Jywgb3IgJ2F0dHIuPG5hbWU+Jy5gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaG9zdFtgWyR7aG9zdEJpbmRpbmcuaG9zdFByb3BlcnR5TmFtZX1dYF0gPSBwcm9wTmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBob3N0W2BbJHtwcm9wTmFtZX1dYF0gPSBwcm9wTmFtZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb25zdCBob3N0TGlzdGVuZXJzID0gcHJvcGVydHlNZXRhZGF0YVtwcm9wTmFtZV0uZmlsdGVyKGEgPT4gY3JlYXRlSG9zdExpc3RlbmVyLmlzVHlwZU9mKGEpKTtcbiAgICAgIGhvc3RMaXN0ZW5lcnMuZm9yRWFjaChob3N0TGlzdGVuZXIgPT4ge1xuICAgICAgICBjb25zdCBhcmdzID0gaG9zdExpc3RlbmVyLmFyZ3MgfHwgW107XG4gICAgICAgIGhvc3RbYCgke2hvc3RMaXN0ZW5lci5ldmVudE5hbWV9KWBdID0gYCR7cHJvcE5hbWV9KCR7YXJncy5qb2luKCcsJyl9KWA7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZmluZExhc3QoXG4gICAgICAgICAgcHJvcGVydHlNZXRhZGF0YVtwcm9wTmFtZV0sIChhKSA9PiBRVUVSWV9NRVRBREFUQV9JREVOVElGSUVSUy5zb21lKGkgPT4gaS5pc1R5cGVPZihhKSkpO1xuICAgICAgaWYgKHF1ZXJ5KSB7XG4gICAgICAgIHF1ZXJpZXNbcHJvcE5hbWVdID0gcXVlcnk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX21lcmdlKGRtLCBpbnB1dHMsIG91dHB1dHMsIGhvc3QsIHF1ZXJpZXMsIGd1YXJkcywgZGlyZWN0aXZlVHlwZSk7XG4gIH1cblxuICBwcml2YXRlIF9leHRyYWN0UHVibGljTmFtZShkZWY6IHN0cmluZykgeyByZXR1cm4gc3BsaXRBdENvbG9uKGRlZiwgW251bGwgISwgZGVmXSlbMV0udHJpbSgpOyB9XG5cbiAgcHJpdmF0ZSBfZGVkdXBlQmluZGluZ3MoYmluZGluZ3M6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IG5hbWVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgY29uc3QgcHVibGljTmFtZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBjb25zdCByZXZlcnNlZFJlc3VsdDogc3RyaW5nW10gPSBbXTtcbiAgICAvLyBnbyBsYXN0IHRvIGZpcnN0IHRvIGFsbG93IGxhdGVyIGVudHJpZXMgdG8gb3ZlcndyaXRlIHByZXZpb3VzIGVudHJpZXNcbiAgICBmb3IgKGxldCBpID0gYmluZGluZ3MubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGJpbmRpbmcgPSBiaW5kaW5nc1tpXTtcbiAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9leHRyYWN0UHVibGljTmFtZShiaW5kaW5nKTtcbiAgICAgIHB1YmxpY05hbWVzLmFkZChuYW1lKTtcbiAgICAgIGlmICghbmFtZXMuaGFzKG5hbWUpKSB7XG4gICAgICAgIG5hbWVzLmFkZChuYW1lKTtcbiAgICAgICAgcmV2ZXJzZWRSZXN1bHQucHVzaChiaW5kaW5nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldmVyc2VkUmVzdWx0LnJldmVyc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX21lcmdlKFxuICAgICAgZGlyZWN0aXZlOiBEaXJlY3RpdmUsIGlucHV0czogc3RyaW5nW10sIG91dHB1dHM6IHN0cmluZ1tdLCBob3N0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICAgIHF1ZXJpZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBndWFyZHM6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBkaXJlY3RpdmVUeXBlOiBUeXBlKTogRGlyZWN0aXZlIHtcbiAgICBjb25zdCBtZXJnZWRJbnB1dHMgPVxuICAgICAgICB0aGlzLl9kZWR1cGVCaW5kaW5ncyhkaXJlY3RpdmUuaW5wdXRzID8gZGlyZWN0aXZlLmlucHV0cy5jb25jYXQoaW5wdXRzKSA6IGlucHV0cyk7XG4gICAgY29uc3QgbWVyZ2VkT3V0cHV0cyA9XG4gICAgICAgIHRoaXMuX2RlZHVwZUJpbmRpbmdzKGRpcmVjdGl2ZS5vdXRwdXRzID8gZGlyZWN0aXZlLm91dHB1dHMuY29uY2F0KG91dHB1dHMpIDogb3V0cHV0cyk7XG4gICAgY29uc3QgbWVyZ2VkSG9zdCA9IGRpcmVjdGl2ZS5ob3N0ID8gey4uLmRpcmVjdGl2ZS5ob3N0LCAuLi5ob3N0fSA6IGhvc3Q7XG4gICAgY29uc3QgbWVyZ2VkUXVlcmllcyA9IGRpcmVjdGl2ZS5xdWVyaWVzID8gey4uLmRpcmVjdGl2ZS5xdWVyaWVzLCAuLi5xdWVyaWVzfSA6IHF1ZXJpZXM7XG4gICAgaWYgKGNyZWF0ZUNvbXBvbmVudC5pc1R5cGVPZihkaXJlY3RpdmUpKSB7XG4gICAgICBjb25zdCBjb21wID0gZGlyZWN0aXZlIGFzIENvbXBvbmVudDtcbiAgICAgIHJldHVybiBjcmVhdGVDb21wb25lbnQoe1xuICAgICAgICBzZWxlY3RvcjogY29tcC5zZWxlY3RvcixcbiAgICAgICAgaW5wdXRzOiBtZXJnZWRJbnB1dHMsXG4gICAgICAgIG91dHB1dHM6IG1lcmdlZE91dHB1dHMsXG4gICAgICAgIGhvc3Q6IG1lcmdlZEhvc3QsXG4gICAgICAgIGV4cG9ydEFzOiBjb21wLmV4cG9ydEFzLFxuICAgICAgICBtb2R1bGVJZDogY29tcC5tb2R1bGVJZCxcbiAgICAgICAgcXVlcmllczogbWVyZ2VkUXVlcmllcyxcbiAgICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBjb21wLmNoYW5nZURldGVjdGlvbixcbiAgICAgICAgcHJvdmlkZXJzOiBjb21wLnByb3ZpZGVycyxcbiAgICAgICAgdmlld1Byb3ZpZGVyczogY29tcC52aWV3UHJvdmlkZXJzLFxuICAgICAgICBlbnRyeUNvbXBvbmVudHM6IGNvbXAuZW50cnlDb21wb25lbnRzLFxuICAgICAgICB0ZW1wbGF0ZTogY29tcC50ZW1wbGF0ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6IGNvbXAudGVtcGxhdGVVcmwsXG4gICAgICAgIHN0eWxlczogY29tcC5zdHlsZXMsXG4gICAgICAgIHN0eWxlVXJsczogY29tcC5zdHlsZVVybHMsXG4gICAgICAgIGVuY2Fwc3VsYXRpb246IGNvbXAuZW5jYXBzdWxhdGlvbixcbiAgICAgICAgYW5pbWF0aW9uczogY29tcC5hbmltYXRpb25zLFxuICAgICAgICBpbnRlcnBvbGF0aW9uOiBjb21wLmludGVycG9sYXRpb24sXG4gICAgICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGRpcmVjdGl2ZS5wcmVzZXJ2ZVdoaXRlc3BhY2VzLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjcmVhdGVEaXJlY3RpdmUoe1xuICAgICAgICBzZWxlY3RvcjogZGlyZWN0aXZlLnNlbGVjdG9yLFxuICAgICAgICBpbnB1dHM6IG1lcmdlZElucHV0cyxcbiAgICAgICAgb3V0cHV0czogbWVyZ2VkT3V0cHV0cyxcbiAgICAgICAgaG9zdDogbWVyZ2VkSG9zdCxcbiAgICAgICAgZXhwb3J0QXM6IGRpcmVjdGl2ZS5leHBvcnRBcyxcbiAgICAgICAgcXVlcmllczogbWVyZ2VkUXVlcmllcyxcbiAgICAgICAgcHJvdmlkZXJzOiBkaXJlY3RpdmUucHJvdmlkZXJzLCBndWFyZHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc0RpcmVjdGl2ZU1ldGFkYXRhKHR5cGU6IGFueSk6IHR5cGUgaXMgRGlyZWN0aXZlIHtcbiAgcmV0dXJuIGNyZWF0ZURpcmVjdGl2ZS5pc1R5cGVPZih0eXBlKSB8fCBjcmVhdGVDb21wb25lbnQuaXNUeXBlT2YodHlwZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTGFzdDxUPihhcnI6IFRbXSwgY29uZGl0aW9uOiAodmFsdWU6IFQpID0+IGJvb2xlYW4pOiBUfG51bGwge1xuICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGNvbmRpdGlvbihhcnJbaV0pKSB7XG4gICAgICByZXR1cm4gYXJyW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbiJdfQ==