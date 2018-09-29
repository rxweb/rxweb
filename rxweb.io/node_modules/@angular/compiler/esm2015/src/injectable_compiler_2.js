/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Identifiers } from './identifiers';
import * as o from './output/output_ast';
import { compileFactoryFunction } from './render3/r3_factory';
import { mapToMapExpression } from './render3/util';
export function compileInjectable(meta) {
    let factory = o.NULL_EXPR;
    function makeFn(ret) {
        return o.fn([], [new o.ReturnStatement(ret)], undefined, undefined, `${meta.name}_Factory`);
    }
    if (meta.useClass !== undefined || meta.useFactory !== undefined) {
        // First, handle useClass and useFactory together, since both involve a similar call to
        // `compileFactoryFunction`. Either dependencies are explicitly specified, in which case
        // a factory function call is generated, or they're not specified and the calls are special-
        // cased.
        if (meta.deps !== undefined) {
            // Either call `new meta.useClass(...)` or `meta.useFactory(...)`.
            const fnOrClass = meta.useClass || meta.useFactory;
            // useNew: true if meta.useClass, false for meta.useFactory.
            const useNew = meta.useClass !== undefined;
            factory = compileFactoryFunction({
                name: meta.name,
                fnOrClass,
                useNew,
                injectFn: Identifiers.inject,
                deps: meta.deps,
            });
        }
        else if (meta.useClass !== undefined) {
            // Special case for useClass where the factory from the class's ngInjectableDef is used.
            if (meta.useClass.isEquivalent(meta.type)) {
                // For the injectable compiler, useClass represents a foreign type that should be
                // instantiated to satisfy construction of the given type. It's not valid to specify
                // useClass === type, since the useClass type is expected to already be compiled.
                throw new Error(`useClass is the same as the type, but no deps specified, which is invalid.`);
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
        factory = makeFn(o.importExpr(Identifiers.inject).callFn([meta.useExisting]));
    }
    else {
        // A strict type is compiled according to useClass semantics, except the dependencies are
        // required.
        if (meta.deps === undefined) {
            throw new Error(`Type compilation of an injectable requires dependencies.`);
        }
        factory = compileFactoryFunction({
            name: meta.name,
            fnOrClass: meta.type,
            useNew: true,
            injectFn: Identifiers.inject,
            deps: meta.deps,
        });
    }
    const token = meta.type;
    const providedIn = meta.providedIn;
    const expression = o.importExpr(Identifiers.defineInjectable).callFn([mapToMapExpression({ token, factory, providedIn })]);
    const type = new o.ExpressionType(o.importExpr(Identifiers.InjectableDef, [new o.ExpressionType(meta.type)]));
    return {
        expression, type,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0YWJsZV9jb21waWxlcl8yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL2luamVjdGFibGVfY29tcGlsZXJfMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sS0FBSyxDQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxFQUF1QixzQkFBc0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBa0JsRCxNQUFNLDRCQUE0QixJQUEwQjtJQUMxRCxJQUFJLE9BQU8sR0FBaUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUV4QyxnQkFBZ0IsR0FBaUI7UUFDL0IsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtRQUNoRSx1RkFBdUY7UUFDdkYsd0ZBQXdGO1FBQ3hGLDRGQUE0RjtRQUM1RixTQUFTO1FBQ1QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUMzQixrRUFBa0U7WUFDbEUsTUFBTSxTQUFTLEdBQWlCLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVksQ0FBQztZQUVuRSw0REFBNEQ7WUFDNUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUM7WUFFM0MsT0FB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LCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0RmxhZ3N9IGZyb20gJy4vY29yZSc7XG5pbXBvcnQge0lkZW50aWZpZXJzfSBmcm9tICcuL2lkZW50aWZpZXJzJztcbmltcG9ydCAqIGFzIG8gZnJvbSAnLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge1IzRGVwZW5kZW5jeU1ldGFkYXRhLCBjb21waWxlRmFjdG9yeUZ1bmN0aW9ufSBmcm9tICcuL3JlbmRlcjMvcjNfZmFjdG9yeSc7XG5pbXBvcnQge21hcFRvTWFwRXhwcmVzc2lvbn0gZnJvbSAnLi9yZW5kZXIzL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGVEZWYge1xuICBleHByZXNzaW9uOiBvLkV4cHJlc3Npb247XG4gIHR5cGU6IG8uVHlwZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0luamVjdGFibGVNZXRhZGF0YSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogby5FeHByZXNzaW9uO1xuICBwcm92aWRlZEluOiBvLkV4cHJlc3Npb247XG4gIHVzZUNsYXNzPzogby5FeHByZXNzaW9uO1xuICB1c2VGYWN0b3J5Pzogby5FeHByZXNzaW9uO1xuICB1c2VFeGlzdGluZz86IG8uRXhwcmVzc2lvbjtcbiAgdXNlVmFsdWU/OiBvLkV4cHJlc3Npb247XG4gIGRlcHM/OiBSM0RlcGVuZGVuY3lNZXRhZGF0YVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZUluamVjdGFibGUobWV0YTogUjNJbmplY3RhYmxlTWV0YWRhdGEpOiBJbmplY3RhYmxlRGVmIHtcbiAgbGV0IGZhY3Rvcnk6IG8uRXhwcmVzc2lvbiA9IG8uTlVMTF9FWFBSO1xuXG4gIGZ1bmN0aW9uIG1ha2VGbihyZXQ6IG8uRXhwcmVzc2lvbik6IG8uRXhwcmVzc2lvbiB7XG4gICAgcmV0dXJuIG8uZm4oW10sIFtuZXcgby5SZXR1cm5TdGF0ZW1lbnQocmV0KV0sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBgJHttZXRhLm5hbWV9X0ZhY3RvcnlgKTtcbiAgfVxuXG4gIGlmIChtZXRhLnVzZUNsYXNzICE9PSB1bmRlZmluZWQgfHwgbWV0YS51c2VGYWN0b3J5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBGaXJzdCwgaGFuZGxlIHVzZUNsYXNzIGFuZCB1c2VGYWN0b3J5IHRvZ2V0aGVyLCBzaW5jZSBib3RoIGludm9sdmUgYSBzaW1pbGFyIGNhbGwgdG9cbiAgICAvLyBgY29tcGlsZUZhY3RvcnlGdW5jdGlvbmAuIEVpdGhlciBkZXBlbmRlbmNpZXMgYXJlIGV4cGxpY2l0bHkgc3BlY2lmaWVkLCBpbiB3aGljaCBjYXNlXG4gICAgLy8gYSBmYWN0b3J5IGZ1bmN0aW9uIGNhbGwgaXMgZ2VuZXJhdGVkLCBvciB0aGV5J3JlIG5vdCBzcGVjaWZpZWQgYW5kIHRoZSBjYWxscyBhcmUgc3BlY2lhbC1cbiAgICAvLyBjYXNlZC5cbiAgICBpZiAobWV0YS5kZXBzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEVpdGhlciBjYWxsIGBuZXcgbWV0YS51c2VDbGFzcyguLi4pYCBvciBgbWV0YS51c2VGYWN0b3J5KC4uLilgLlxuICAgICAgY29uc3QgZm5PckNsYXNzOiBvLkV4cHJlc3Npb24gPSBtZXRhLnVzZUNsYXNzIHx8IG1ldGEudXNlRmFjdG9yeSAhO1xuXG4gICAgICAvLyB1c2VOZXc6IHRydWUgaWYgbWV0YS51c2VDbGFzcywgZmFsc2UgZm9yIG1ldGEudXNlRmFjdG9yeS5cbiAgICAgIGNvbnN0IHVzZU5ldyA9IG1ldGEudXNlQ2xhc3MgIT09IHVuZGVmaW5lZDtcblxuICAgICAgZmFjdG9yeSA9IGNvbXBpbGVGYWN0b3J5RnVuY3Rpb24oe1xuICAgICAgICBuYW1lOiBtZXRhLm5hbWUsXG4gICAgICAgIGZuT3JDbGFzcyxcbiAgICAgICAgdXNlTmV3LFxuICAgICAgICBpbmplY3RGbjogSWRlbnRpZmllcnMuaW5qZWN0LFxuICAgICAgICBkZXBzOiBtZXRhLmRlcHMsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKG1ldGEudXNlQ2xhc3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciB1c2VDbGFzcyB3aGVyZSB0aGUgZmFjdG9yeSBmcm9tIHRoZSBjbGFzcydzIG5nSW5qZWN0YWJsZURlZiBpcyB1c2VkLlxuICAgICAgaWYgKG1ldGEudXNlQ2xhc3MuaXNFcXVpdmFsZW50KG1ldGEudHlwZSkpIHtcbiAgICAgICAgLy8gRm9yIHRoZSBpbmplY3RhYmxlIGNvbXBpbGVyLCB1c2VDbGFzcyByZXByZXNlbnRzIGEgZm9yZWlnbiB0eXBlIHRoYXQgc2hvdWxkIGJlXG4gICAgICAgIC8vIGluc3RhbnRpYXRlZCB0byBzYXRpc2Z5IGNvbnN0cnVjdGlvbiBvZiB0aGUgZ2l2ZW4gdHlwZS4gSXQncyBub3QgdmFsaWQgdG8gc3BlY2lmeVxuICAgICAgICAvLyB1c2VDbGFzcyA9PT0gdHlwZSwgc2luY2UgdGhlIHVzZUNsYXNzIHR5cGUgaXMgZXhwZWN0ZWQgdG8gYWxyZWFkeSBiZSBjb21waWxlZC5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYHVzZUNsYXNzIGlzIHRoZSBzYW1lIGFzIHRoZSB0eXBlLCBidXQgbm8gZGVwcyBzcGVjaWZpZWQsIHdoaWNoIGlzIGludmFsaWQuYCk7XG4gICAgICB9XG4gICAgICBmYWN0b3J5ID1cbiAgICAgICAgICBtYWtlRm4obmV3IG8uUmVhZFByb3BFeHByKG5ldyBvLlJlYWRQcm9wRXhwcihtZXRhLnVzZUNsYXNzLCAnbmdJbmplY3RhYmxlRGVmJyksICdmYWN0b3J5JylcbiAgICAgICAgICAgICAgICAgICAgIC5jYWxsRm4oW10pKTtcbiAgICB9IGVsc2UgaWYgKG1ldGEudXNlRmFjdG9yeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIHVzZUZhY3Rvcnkgd2hlcmUgbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQuXG4gICAgICBmYWN0b3J5ID0gbWV0YS51c2VGYWN0b3J5LmNhbGxGbihbXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENhbid0IGhhcHBlbiAtIG91dGVyIGNvbmRpdGlvbmFsIGd1YXJkcyBhZ2FpbnN0IGJvdGggdXNlQ2xhc3MgYW5kIHVzZUZhY3RvcnkgYmVpbmdcbiAgICAgIC8vIHVuZGVmaW5lZC5cbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVhY2hlZCB1bnJlYWNoYWJsZSBibG9jayBpbiBpbmplY3RhYmxlIGNvbXBpbGVyLicpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChtZXRhLnVzZVZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBOb3RlOiBpdCdzIHNhZmUgdG8gdXNlIGBtZXRhLnVzZVZhbHVlYCBpbnN0ZWFkIG9mIHRoZSBgVVNFX1ZBTFVFIGluIG1ldGFgIGNoZWNrIHVzZWQgZm9yXG4gICAgLy8gY2xpZW50IGNvZGUgYmVjYXVzZSBtZXRhLnVzZVZhbHVlIGlzIGFuIEV4cHJlc3Npb24gd2hpY2ggd2lsbCBiZSBkZWZpbmVkIGV2ZW4gaWYgdGhlIGFjdHVhbFxuICAgIC8vIHZhbHVlIGlzIHVuZGVmaW5lZC5cbiAgICBmYWN0b3J5ID0gbWFrZUZuKG1ldGEudXNlVmFsdWUpO1xuICB9IGVsc2UgaWYgKG1ldGEudXNlRXhpc3RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIHVzZUV4aXN0aW5nIGlzIGFuIGBpbmplY3RgIGNhbGwgb24gdGhlIGV4aXN0aW5nIHRva2VuLlxuICAgIGZhY3RvcnkgPSBtYWtlRm4oby5pbXBvcnRFeHByKElkZW50aWZpZXJzLmluamVjdCkuY2FsbEZuKFttZXRhLnVzZUV4aXN0aW5nXSkpO1xuICB9IGVsc2Uge1xuICAgIC8vIEEgc3RyaWN0IHR5cGUgaXMgY29tcGlsZWQgYWNjb3JkaW5nIHRvIHVzZUNsYXNzIHNlbWFudGljcywgZXhjZXB0IHRoZSBkZXBlbmRlbmNpZXMgYXJlXG4gICAgLy8gcmVxdWlyZWQuXG4gICAgaWYgKG1ldGEuZGVwcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgY29tcGlsYXRpb24gb2YgYW4gaW5qZWN0YWJsZSByZXF1aXJlcyBkZXBlbmRlbmNpZXMuYCk7XG4gICAgfVxuICAgIGZhY3RvcnkgPSBjb21waWxlRmFjdG9yeUZ1bmN0aW9uKHtcbiAgICAgIG5hbWU6IG1ldGEubmFtZSxcbiAgICAgIGZuT3JDbGFzczogbWV0YS50eXBlLFxuICAgICAgdXNlTmV3OiB0cnVlLFxuICAgICAgaW5qZWN0Rm46IElkZW50aWZpZXJzLmluamVjdCxcbiAgICAgIGRlcHM6IG1ldGEuZGVwcyxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHRva2VuID0gbWV0YS50eXBlO1xuICBjb25zdCBwcm92aWRlZEluID0gbWV0YS5wcm92aWRlZEluO1xuXG4gIGNvbnN0IGV4cHJlc3Npb24gPSBvLmltcG9ydEV4cHIoSWRlbnRpZmllcnMuZGVmaW5lSW5qZWN0YWJsZSkuY2FsbEZuKFttYXBUb01hcEV4cHJlc3Npb24oXG4gICAgICB7dG9rZW4sIGZhY3RvcnksIHByb3ZpZGVkSW59KV0pO1xuICBjb25zdCB0eXBlID0gbmV3IG8uRXhwcmVzc2lvblR5cGUoXG4gICAgICBvLmltcG9ydEV4cHIoSWRlbnRpZmllcnMuSW5qZWN0YWJsZURlZiwgW25ldyBvLkV4cHJlc3Npb25UeXBlKG1ldGEudHlwZSldKSk7XG5cbiAgcmV0dXJuIHtcbiAgICAgIGV4cHJlc3Npb24sIHR5cGUsXG4gIH07XG59XG4iXX0=