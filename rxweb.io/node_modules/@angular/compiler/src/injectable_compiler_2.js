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
        define("@angular/compiler/src/injectable_compiler_2", ["require", "exports", "@angular/compiler/src/identifiers", "@angular/compiler/src/output/output_ast", "@angular/compiler/src/render3/r3_factory", "@angular/compiler/src/render3/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var identifiers_1 = require("@angular/compiler/src/identifiers");
    var o = require("@angular/compiler/src/output/output_ast");
    var r3_factory_1 = require("@angular/compiler/src/render3/r3_factory");
    var util_1 = require("@angular/compiler/src/render3/util");
    function compileInjectable(meta) {
        var factory = o.NULL_EXPR;
        function makeFn(ret) {
            return o.fn([], [new o.ReturnStatement(ret)], undefined, undefined, meta.name + "_Factory");
        }
        if (meta.useClass !== undefined || meta.useFactory !== undefined) {
            // First, handle useClass and useFactory together, since both involve a similar call to
            // `compileFactoryFunction`. Either dependencies are explicitly specified, in which case
            // a factory function call is generated, or they're not specified and the calls are special-
            // cased.
            if (meta.deps !== undefined) {
                // Either call `new meta.useClass(...)` or `meta.useFactory(...)`.
                var fnOrClass = meta.useClass || meta.useFactory;
                // useNew: true if meta.useClass, false for meta.useFactory.
                var useNew = meta.useClass !== undefined;
                factory = r3_factory_1.compileFactoryFunction({
                    name: meta.name,
                    fnOrClass: fnOrClass,
                    useNew: useNew,
                    injectFn: identifiers_1.Identifiers.inject,
                    deps: meta.deps,
                });
            }
            else if (meta.useClass !== undefined) {
                // Special case for useClass where the factory from the class's ngInjectableDef is used.
                if (meta.useClass.isEquivalent(meta.type)) {
                    // For the injectable compiler, useClass represents a foreign type that should be
                    // instantiated to satisfy construction of the given type. It's not valid to specify
                    // useClass === type, since the useClass type is expected to already be compiled.
                    throw new Error("useClass is the same as the type, but no deps specified, which is invalid.");
                }
                factory =
                    makeFn(new o.ReadPropExpr(new o.ReadPropExpr(meta.useClass, 'ngInjectableDef'), 'factory')
                        .callFn([]));
            }
            else if (meta.useFactory !== undefined) {
                // Special case for useFactory where no arguments are passed.
                factory = meta.useFactory.callFn([]);
            }
            else {
                // Can't happen - outer conditional guards against both useClass and useFactory being
                // undefined.
                throw new Error('Reached unreachable block in injectable compiler.');
            }
        }
        else if (meta.useValue !== undefined) {
            // Note: it's safe to use `meta.useValue` instead of the `USE_VALUE in meta` check used for
            // client code because meta.useValue is an Expression which will be defined even if the actual
            // value is undefined.
            factory = makeFn(meta.useValue);
        }
        else if (meta.useExisting !== undefined) {
            // useExisting is an `inject` call on the existing token.
            factory = makeFn(o.importExpr(identifiers_1.Identifiers.inject).callFn([meta.useExisting]));
        }
        else {
            // A strict type is compiled according to useClass semantics, except the dependencies are
            // required.
            if (meta.deps === undefined) {
                throw new Error("Type compilation of an injectable requires dependencies.");
            }
            factory = r3_factory_1.compileFactoryFunction({
                name: meta.name,
                fnOrClass: meta.type,
                useNew: true,
                injectFn: identifiers_1.Identifiers.inject,
                deps: meta.deps,
            });
        }
        var token = meta.type;
        var providedIn = meta.providedIn;
        var expression = o.importExpr(identifiers_1.Identifiers.defineInjectable).callFn([util_1.mapToMapExpression({ token: token, factory: factory, providedIn: providedIn })]);
        var type = new o.ExpressionType(o.importExpr(identifiers_1.Identifiers.InjectableDef, [new o.ExpressionType(meta.type)]));
        return {
            expression: expression, type: type,
        };
    }
    exports.compileInjectable = compileInjectable;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0YWJsZV9jb21waWxlcl8yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL2luamVjdGFibGVfY29tcGlsZXJfMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUdILGlFQUEwQztJQUMxQywyREFBeUM7SUFDekMsdUVBQWtGO0lBQ2xGLDJEQUFrRDtJQWtCbEQsMkJBQWtDLElBQTBCO1FBQzFELElBQUksT0FBTyxHQUFpQixDQUFDLENBQUMsU0FBUyxDQUFDO1FBRXhDLGdCQUFnQixHQUFpQjtZQUMvQixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBSyxJQUFJLENBQUMsSUFBSSxhQUFVLENBQUMsQ0FBQztRQUM5RixDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUNoRSx1RkFBdUY7WUFDdkYsd0ZBQXdGO1lBQ3hGLDRGQUE0RjtZQUM1RixTQUFTO1lBQ1QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDM0Isa0VBQWtFO2dCQUNsRSxJQUFNLFNBQVMsR0FBaUIsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBWSxDQUFDO2dCQUVuRSw0REFBNEQ7Z0JBQzVELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDO2dCQUUzQyxPQUFPLEdBQUcsbUNBQXNCLENBQUM7b0JBQy9CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixTQUFTLFdBQUE7b0JBQ1QsTUFBTSxRQUFBO29CQUNOLFFBQVEsRUFBRSx5QkFBVyxDQUFDLE1B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IENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RGbGFnc30gZnJvbSAnLi9jb3JlJztcbmltcG9ydCB7SWRlbnRpZmllcnN9IGZyb20gJy4vaWRlbnRpZmllcnMnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7UjNEZXBlbmRlbmN5TWV0YWRhdGEsIGNvbXBpbGVGYWN0b3J5RnVuY3Rpb259IGZyb20gJy4vcmVuZGVyMy9yM19mYWN0b3J5JztcbmltcG9ydCB7bWFwVG9NYXBFeHByZXNzaW9ufSBmcm9tICcuL3JlbmRlcjMvdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0YWJsZURlZiB7XG4gIGV4cHJlc3Npb246IG8uRXhwcmVzc2lvbjtcbiAgdHlwZTogby5UeXBlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzSW5qZWN0YWJsZU1ldGFkYXRhIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBvLkV4cHJlc3Npb247XG4gIHByb3ZpZGVkSW46IG8uRXhwcmVzc2lvbjtcbiAgdXNlQ2xhc3M/OiBvLkV4cHJlc3Npb247XG4gIHVzZUZhY3Rvcnk/OiBvLkV4cHJlc3Npb247XG4gIHVzZUV4aXN0aW5nPzogby5FeHByZXNzaW9uO1xuICB1c2VWYWx1ZT86IG8uRXhwcmVzc2lvbjtcbiAgZGVwcz86IFIzRGVwZW5kZW5jeU1ldGFkYXRhW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlSW5qZWN0YWJsZShtZXRhOiBSM0luamVjdGFibGVNZXRhZGF0YSk6IEluamVjdGFibGVEZWYge1xuICBsZXQgZmFjdG9yeTogby5FeHByZXNzaW9uID0gby5OVUxMX0VYUFI7XG5cbiAgZnVuY3Rpb24gbWFrZUZuKHJldDogby5FeHByZXNzaW9uKTogby5FeHByZXNzaW9uIHtcbiAgICByZXR1cm4gby5mbihbXSwgW25ldyBvLlJldHVyblN0YXRlbWVudChyZXQpXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGAke21ldGEubmFtZX1fRmFjdG9yeWApO1xuICB9XG5cbiAgaWYgKG1ldGEudXNlQ2xhc3MgIT09IHVuZGVmaW5lZCB8fCBtZXRhLnVzZUZhY3RvcnkgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIEZpcnN0LCBoYW5kbGUgdXNlQ2xhc3MgYW5kIHVzZUZhY3RvcnkgdG9nZXRoZXIsIHNpbmNlIGJvdGggaW52b2x2ZSBhIHNpbWlsYXIgY2FsbCB0b1xuICAgIC8vIGBjb21waWxlRmFjdG9yeUZ1bmN0aW9uYC4gRWl0aGVyIGRlcGVuZGVuY2llcyBhcmUgZXhwbGljaXRseSBzcGVjaWZpZWQsIGluIHdoaWNoIGNhc2VcbiAgICAvLyBhIGZhY3RvcnkgZnVuY3Rpb24gY2FsbCBpcyBnZW5lcmF0ZWQsIG9yIHRoZXkncmUgbm90IHNwZWNpZmllZCBhbmQgdGhlIGNhbGxzIGFyZSBzcGVjaWFsLVxuICAgIC8vIGNhc2VkLlxuICAgIGlmIChtZXRhLmRlcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gRWl0aGVyIGNhbGwgYG5ldyBtZXRhLnVzZUNsYXNzKC4uLilgIG9yIGBtZXRhLnVzZUZhY3RvcnkoLi4uKWAuXG4gICAgICBjb25zdCBmbk9yQ2xhc3M6IG8uRXhwcmVzc2lvbiA9IG1ldGEudXNlQ2xhc3MgfHwgbWV0YS51c2VGYWN0b3J5ICE7XG5cbiAgICAgIC8vIHVzZU5ldzogdHJ1ZSBpZiBtZXRhLnVzZUNsYXNzLCBmYWxzZSBmb3IgbWV0YS51c2VGYWN0b3J5LlxuICAgICAgY29uc3QgdXNlTmV3ID0gbWV0YS51c2VDbGFzcyAhPT0gdW5kZWZpbmVkO1xuXG4gICAgICBmYWN0b3J5ID0gY29tcGlsZUZhY3RvcnlGdW5jdGlvbih7XG4gICAgICAgIG5hbWU6IG1ldGEubmFtZSxcbiAgICAgICAgZm5PckNsYXNzLFxuICAgICAgICB1c2VOZXcsXG4gICAgICAgIGluamVjdEZuOiBJZGVudGlmaWVycy5pbmplY3QsXG4gICAgICAgIGRlcHM6IG1ldGEuZGVwcyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAobWV0YS51c2VDbGFzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIHVzZUNsYXNzIHdoZXJlIHRoZSBmYWN0b3J5IGZyb20gdGhlIGNsYXNzJ3MgbmdJbmplY3RhYmxlRGVmIGlzIHVzZWQuXG4gICAgICBpZiAobWV0YS51c2VDbGFzcy5pc0VxdWl2YWxlbnQobWV0YS50eXBlKSkge1xuICAgICAgICAvLyBGb3IgdGhlIGluamVjdGFibGUgY29tcGlsZXIsIHVzZUNsYXNzIHJlcHJlc2VudHMgYSBmb3JlaWduIHR5cGUgdGhhdCBzaG91bGQgYmVcbiAgICAgICAgLy8gaW5zdGFudGlhdGVkIHRvIHNhdGlzZnkgY29uc3RydWN0aW9uIG9mIHRoZSBnaXZlbiB0eXBlLiBJdCdzIG5vdCB2YWxpZCB0byBzcGVjaWZ5XG4gICAgICAgIC8vIHVzZUNsYXNzID09PSB0eXBlLCBzaW5jZSB0aGUgdXNlQ2xhc3MgdHlwZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIGNvbXBpbGVkLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgdXNlQ2xhc3MgaXMgdGhlIHNhbWUgYXMgdGhlIHR5cGUsIGJ1dCBubyBkZXBzIHNwZWNpZmllZCwgd2hpY2ggaXMgaW52YWxpZC5gKTtcbiAgICAgIH1cbiAgICAgIGZhY3RvcnkgPVxuICAgICAgICAgIG1ha2VGbihuZXcgby5SZWFkUHJvcEV4cHIobmV3IG8uUmVhZFByb3BFeHByKG1ldGEudXNlQ2xhc3MsICduZ0luamVjdGFibGVEZWYnKSwgJ2ZhY3RvcnknKVxuICAgICAgICAgICAgICAgICAgICAgLmNhbGxGbihbXSkpO1xuICAgIH0gZWxzZSBpZiAobWV0YS51c2VGYWN0b3J5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgdXNlRmFjdG9yeSB3aGVyZSBubyBhcmd1bWVudHMgYXJlIHBhc3NlZC5cbiAgICAgIGZhY3RvcnkgPSBtZXRhLnVzZUZhY3RvcnkuY2FsbEZuKFtdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ2FuJ3QgaGFwcGVuIC0gb3V0ZXIgY29uZGl0aW9uYWwgZ3VhcmRzIGFnYWluc3QgYm90aCB1c2VDbGFzcyBhbmQgdXNlRmFjdG9yeSBiZWluZ1xuICAgICAgLy8gdW5kZWZpbmVkLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWFjaGVkIHVucmVhY2hhYmxlIGJsb2NrIGluIGluamVjdGFibGUgY29tcGlsZXIuJyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKG1ldGEudXNlVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE5vdGU6IGl0J3Mgc2FmZSB0byB1c2UgYG1ldGEudXNlVmFsdWVgIGluc3RlYWQgb2YgdGhlIGBVU0VfVkFMVUUgaW4gbWV0YWAgY2hlY2sgdXNlZCBmb3JcbiAgICAvLyBjbGllbnQgY29kZSBiZWNhdXNlIG1ldGEudXNlVmFsdWUgaXMgYW4gRXhwcmVzc2lvbiB3aGljaCB3aWxsIGJlIGRlZmluZWQgZXZlbiBpZiB0aGUgYWN0dWFsXG4gICAgLy8gdmFsdWUgaXMgdW5kZWZpbmVkLlxuICAgIGZhY3RvcnkgPSBtYWtlRm4obWV0YS51c2VWYWx1ZSk7XG4gIH0gZWxzZSBpZiAobWV0YS51c2VFeGlzdGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gdXNlRXhpc3RpbmcgaXMgYW4gYGluamVjdGAgY2FsbCBvbiB0aGUgZXhpc3RpbmcgdG9rZW4uXG4gICAgZmFjdG9yeSA9IG1ha2VGbihvLmltcG9ydEV4cHIoSWRlbnRpZmllcnMuaW5qZWN0KS5jYWxsRm4oW21ldGEudXNlRXhpc3RpbmddKSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQSBzdHJpY3QgdHlwZSBpcyBjb21waWxlZCBhY2NvcmRpbmcgdG8gdXNlQ2xhc3Mgc2VtYW50aWNzLCBleGNlcHQgdGhlIGRlcGVuZGVuY2llcyBhcmVcbiAgICAvLyByZXF1aXJlZC5cbiAgICBpZiAobWV0YS5kZXBzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVHlwZSBjb21waWxhdGlvbiBvZiBhbiBpbmplY3RhYmxlIHJlcXVpcmVzIGRlcGVuZGVuY2llcy5gKTtcbiAgICB9XG4gICAgZmFjdG9yeSA9IGNvbXBpbGVGYWN0b3J5RnVuY3Rpb24oe1xuICAgICAgbmFtZTogbWV0YS5uYW1lLFxuICAgICAgZm5PckNsYXNzOiBtZXRhLnR5cGUsXG4gICAgICB1c2VOZXc6IHRydWUsXG4gICAgICBpbmplY3RGbjogSWRlbnRpZmllcnMuaW5qZWN0LFxuICAgICAgZGVwczogbWV0YS5kZXBzLFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgdG9rZW4gPSBtZXRhLnR5cGU7XG4gIGNvbnN0IHByb3ZpZGVkSW4gPSBtZXRhLnByb3ZpZGVkSW47XG5cbiAgY29uc3QgZXhwcmVzc2lvbiA9IG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5kZWZpbmVJbmplY3RhYmxlKS5jYWxsRm4oW21hcFRvTWFwRXhwcmVzc2lvbihcbiAgICAgIHt0b2tlbiwgZmFjdG9yeSwgcHJvdmlkZWRJbn0pXSk7XG4gIGNvbnN0IHR5cGUgPSBuZXcgby5FeHByZXNzaW9uVHlwZShcbiAgICAgIG8uaW1wb3J0RXhwcihJZGVudGlmaWVycy5JbmplY3RhYmxlRGVmLCBbbmV3IG8uRXhwcmVzc2lvblR5cGUobWV0YS50eXBlKV0pKTtcblxuICByZXR1cm4ge1xuICAgICAgZXhwcmVzc2lvbiwgdHlwZSxcbiAgfTtcbn1cbiJdfQ==