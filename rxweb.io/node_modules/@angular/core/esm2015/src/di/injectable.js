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
import { R3_COMPILE_INJECTABLE } from '../ivy_switch';
import { ReflectionCapabilities } from '../reflection/reflection_capabilities';
import { makeDecorator } from '../util/decorators';
import { getClosureSafeProperty } from '../util/property';
import { defineInjectable } from './defs';
import { inject, injectArgs } from './injector';
/** @type {?} */
const GET_PROPERTY_NAME = /** @type {?} */ ({});
const ɵ0 = GET_PROPERTY_NAME;
/** @type {?} */
const USE_VALUE = getClosureSafeProperty({ provide: String, useValue: ɵ0 }, GET_PROPERTY_NAME);
/** @typedef {?} */
var InjectableProvider;
export { InjectableProvider };
/**
 * Type of the Injectable decorator / constructor function.
 * @record
 */
export function InjectableDecorator() { }
/** @type {?} */
const EMPTY_ARRAY = [];
/**
 * @param {?} type
 * @param {?=} provider
 * @return {?}
 */
export function convertInjectableProviderToFactory(type, provider) {
    if (!provider) {
        /** @type {?} */
        const reflectionCapabilities = new ReflectionCapabilities();
        /** @type {?} */
        const deps = reflectionCapabilities.parameters(type);
        // TODO - convert to flags.
        return () => new type(...injectArgs(/** @type {?} */ (deps)));
    }
    if (USE_VALUE in provider) {
        /** @type {?} */
        const valueProvider = (/** @type {?} */ (provider));
        return () => valueProvider.useValue;
    }
    else if ((/** @type {?} */ (provider)).useExisting) {
        /** @type {?} */
        const existingProvider = (/** @type {?} */ (provider));
        return () => inject(existingProvider.useExisting);
    }
    else if ((/** @type {?} */ (provider)).useFactory) {
        /** @type {?} */
        const factoryProvider = (/** @type {?} */ (provider));
        return () => factoryProvider.useFactory(...injectArgs(factoryProvider.deps || EMPTY_ARRAY));
    }
    else if ((/** @type {?} */ (provider)).useClass) {
        /** @type {?} */
        const classProvider = (/** @type {?} */ (provider));
        /** @type {?} */
        let deps = (/** @type {?} */ (provider)).deps;
        if (!deps) {
            /** @type {?} */
            const reflectionCapabilities = new ReflectionCapabilities();
            deps = reflectionCapabilities.parameters(type);
        }
        return () => new classProvider.useClass(...injectArgs(deps));
    }
    else {
        /** @type {?} */
        let deps = (/** @type {?} */ (provider)).deps;
        if (!deps) {
            /** @type {?} */
            const reflectionCapabilities = new ReflectionCapabilities();
            deps = reflectionCapabilities.parameters(type);
        }
        return () => new type(...injectArgs(/** @type {?} */ ((deps))));
    }
}
/**
 * Supports \@Injectable() in JIT mode for Render2.
 * @param {?} injectableType
 * @param {?} options
 * @return {?}
 */
function preR3InjectableCompile(injectableType, options) {
    if (options && options.providedIn !== undefined && injectableType.ngInjectableDef === undefined) {
        /** @nocollapse */ injectableType.ngInjectableDef = defineInjectable({
            providedIn: options.providedIn,
            factory: convertInjectableProviderToFactory(injectableType, options),
        });
    }
}
/** *
 * Injectable decorator and metadata.
 *
 * \@Annotation
  @type {?} */
export const Injectable = makeDecorator('Injectable', undefined, undefined, undefined, (type, meta) => (R3_COMPILE_INJECTABLE || preR3InjectableCompile)(type, meta));
/**
 * Type representing injectable service.
 *
 * \@experimental
 * @record
 * @template T
 */
export function InjectableType() { }
/** @type {?} */
InjectableType.prototype.ngInjectableDef;
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2luamVjdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFFN0UsT0FBTyxFQUFDLGFBQWEsRUFBcUIsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUV4RCxPQUFPLEVBQWdDLGdCQUFnQixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sWUFBWSxDQUFDOztBQUc5QyxNQUFNLGlCQUFpQixxQkFBRyxFQUFTLEVBQUM7V0FFSixpQkFBaUI7O0FBRGpELE1BQU0sU0FBUyxHQUFHLHNCQUFzQixDQUNwQyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxJQUFtQixFQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQTJDdkUsTUFBTSxXQUFXLEdBQVUsRUFBRSxDQUFDOzs7Ozs7QUFFOUIsTUFBTSw2Q0FDRixJQUFlLEVBQUUsUUFBNkI7SUFDaEQsSUFBSSxDQUFDLFFBQVEsRUFBRTs7UUFDYixNQUFNLHNCQUFzQixHQUFHLElBQUksc0JBQXNCLEVBQUUsQ0FBQzs7UUFDNUQsTUFBTSxJQUFJLEdBQUcsc0JBQXNCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUVyRCxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsVUFBVSxtQkFBQyxJQUFhLEVBQUMsQ0FBQyxDQUFDO0tBQ3JEO0lBRUQsSUFBSSxTQUFTLElBQUksUUFBUSxFQUFFOztRQUN6QixNQUFNLGFBQWEsR0FBRyxtQkFBQyxRQUE2QixFQUFDLENBQUM7UUFDdEQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0tBQ3JDO1NBQU0sSUFBSSxtQkFBQyxRQUFnQyxFQUFDLENBQUMsV0FBVyxFQUFFOztRQUN6RCxNQUFNLGdCQUFnQixHQUFHLG1CQUFDLFFBQWdDLEVBQUMsQ0FBQztRQUM1RCxPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNuRDtTQUFNLElBQUksbUJBQUMsUUFBK0IsRUFBQyxDQUFDLFVBQVUsRUFBRTs7UUFDdkQsTUFBTSxlQUFlLEdBQUcsbUJBQUMsUUFBK0IsRUFBQyxDQUFDO1FBQzFELE9BQU8sR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDN0Y7U0FBTSxJQUFJLG1CQUFDLFFBQXVELEVBQUMsQ0FBQyxRQUFRLEVBQUU7O1FBQzdFLE1BQU0sYUFBYSxHQUFHLG1CQUFDLFFBQXVELEVBQUMsQ0FBQzs7UUFDaEYsSUFBSSxJQUFJLEdBQUcsbUJBQUMsUUFBbUMsRUFBQyxDQUFDLElBQUksQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxFQUFFOztZQUNULE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1lBQzVELElBQUksR0FBRyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEQ7UUFDRCxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQzlEO1NBQU07O1FBQ0wsSUFBSSxJQUFJLEdBQUcsbUJBQUMsUUFBbUMsRUFBQyxDQUFDLElBQUksQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxFQUFFOztZQUNULE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1lBQzVELElBQUksR0FBRyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEQ7UUFDRCxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsVUFBVSxvQkFBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0tBQzlDO0NBQ0Y7Ozs7Ozs7QUFLRCxnQ0FDSSxjQUFtQyxFQUNuQyxPQUFxRTtJQUN2RSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxLQUFLLFNBQVMsSUFBSSxjQUFjLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBRTtRQUMvRixjQUFjLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDO1lBQ2hELFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVTtZQUM5QixPQUFPLEVBQUUsa0NBQWtDLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQztTQUNyRSxDQUFDLENBQUM7S0FDSjtDQUNGOzs7Ozs7QUFPRCxhQUFhLFVBQVUsR0FBd0IsYUFBYSxDQUN4RCxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQzdDLENBQUMsSUFBZSxFQUFFLElBQWdCLEVBQUUsRUFBRSxDQUNsQyxDQUFDLHFCQUFxQixJQUFJLHNCQUFzQixDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UjNfQ09NUElMRV9JTkpFQ1RBQkxFfSBmcm9tICcuLi9pdnlfc3dpdGNoJztcbmltcG9ydCB7UmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnLi4vcmVmbGVjdGlvbi9yZWZsZWN0aW9uX2NhcGFiaWxpdGllcyc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHttYWtlRGVjb3JhdG9yLCBtYWtlUGFyYW1EZWNvcmF0b3J9IGZyb20gJy4uL3V0aWwvZGVjb3JhdG9ycyc7XG5pbXBvcnQge2dldENsb3N1cmVTYWZlUHJvcGVydHl9IGZyb20gJy4uL3V0aWwvcHJvcGVydHknO1xuXG5pbXBvcnQge0luamVjdGFibGVEZWYsIEluamVjdGFibGVUeXBlLCBkZWZpbmVJbmplY3RhYmxlfSBmcm9tICcuL2RlZnMnO1xuaW1wb3J0IHtpbmplY3QsIGluamVjdEFyZ3N9IGZyb20gJy4vaW5qZWN0b3InO1xuaW1wb3J0IHtDbGFzc1NhbnNQcm92aWRlciwgQ29uc3RydWN0b3JQcm92aWRlciwgQ29uc3RydWN0b3JTYW5zUHJvdmlkZXIsIEV4aXN0aW5nUHJvdmlkZXIsIEV4aXN0aW5nU2Fuc1Byb3ZpZGVyLCBGYWN0b3J5UHJvdmlkZXIsIEZhY3RvcnlTYW5zUHJvdmlkZXIsIFN0YXRpY0NsYXNzUHJvdmlkZXIsIFN0YXRpY0NsYXNzU2Fuc1Byb3ZpZGVyLCBWYWx1ZVByb3ZpZGVyLCBWYWx1ZVNhbnNQcm92aWRlcn0gZnJvbSAnLi9wcm92aWRlcic7XG5cbmNvbnN0IEdFVF9QUk9QRVJUWV9OQU1FID0ge30gYXMgYW55O1xuY29uc3QgVVNFX1ZBTFVFID0gZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eTxWYWx1ZVByb3ZpZGVyPihcbiAgICB7cHJvdmlkZTogU3RyaW5nLCB1c2VWYWx1ZTogR0VUX1BST1BFUlRZX05BTUV9LCBHRVRfUFJPUEVSVFlfTkFNRSk7XG5cbi8qKlxuICogSW5qZWN0YWJsZSBwcm92aWRlcnMgdXNlZCBpbiBgQEluamVjdGFibGVgIGRlY29yYXRvci5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCB0eXBlIEluamVjdGFibGVQcm92aWRlciA9IFZhbHVlU2Fuc1Byb3ZpZGVyIHwgRXhpc3RpbmdTYW5zUHJvdmlkZXIgfFxuICAgIFN0YXRpY0NsYXNzU2Fuc1Byb3ZpZGVyIHwgQ29uc3RydWN0b3JTYW5zUHJvdmlkZXIgfCBGYWN0b3J5U2Fuc1Byb3ZpZGVyIHwgQ2xhc3NTYW5zUHJvdmlkZXI7XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgSW5qZWN0YWJsZSBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3RhYmxlRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIEEgbWFya2VyIG1ldGFkYXRhIHRoYXQgbWFya3MgYSBjbGFzcyBhcyBhdmFpbGFibGUgdG8gYEluamVjdG9yYCBmb3IgY3JlYXRpb24uXG4gICAqXG4gICAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUgW1wiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIl0oZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24pLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy9tZXRhZGF0YV9zcGVjLnRzIHJlZ2lvbj0nSW5qZWN0YWJsZSd9XG4gICAqXG4gICAqIGBJbmplY3RvcmAgd2lsbCB0aHJvdyBhbiBlcnJvciB3aGVuIHRyeWluZyB0byBpbnN0YW50aWF0ZSBhIGNsYXNzIHRoYXRcbiAgICogZG9lcyBub3QgaGF2ZSBgQEluamVjdGFibGVgIG1hcmtlciwgYXMgc2hvd24gaW4gdGhlIGV4YW1wbGUgYmVsb3cuXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL21ldGFkYXRhX3NwZWMudHMgcmVnaW9uPSdJbmplY3RhYmxlVGhyb3dzJ31cbiAgICpcbiAgICovXG4gICgpOiBhbnk7XG4gIChvcHRpb25zPzoge3Byb3ZpZGVkSW46IFR5cGU8YW55PnwgJ3Jvb3QnIHwgbnVsbH0mSW5qZWN0YWJsZVByb3ZpZGVyKTogYW55O1xuICBuZXcgKCk6IEluamVjdGFibGU7XG4gIG5ldyAob3B0aW9ucz86IHtwcm92aWRlZEluOiBUeXBlPGFueT58ICdyb290JyB8IG51bGx9JkluamVjdGFibGVQcm92aWRlcik6IEluamVjdGFibGU7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgSW5qZWN0YWJsZSBtZXRhZGF0YS5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0YWJsZSB7IHByb3ZpZGVkSW4/OiBUeXBlPGFueT58J3Jvb3QnfG51bGw7IH1cblxuY29uc3QgRU1QVFlfQVJSQVk6IGFueVtdID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0SW5qZWN0YWJsZVByb3ZpZGVyVG9GYWN0b3J5KFxuICAgIHR5cGU6IFR5cGU8YW55PiwgcHJvdmlkZXI/OiBJbmplY3RhYmxlUHJvdmlkZXIpOiAoKSA9PiBhbnkge1xuICBpZiAoIXByb3ZpZGVyKSB7XG4gICAgY29uc3QgcmVmbGVjdGlvbkNhcGFiaWxpdGllcyA9IG5ldyBSZWZsZWN0aW9uQ2FwYWJpbGl0aWVzKCk7XG4gICAgY29uc3QgZGVwcyA9IHJlZmxlY3Rpb25DYXBhYmlsaXRpZXMucGFyYW1ldGVycyh0eXBlKTtcbiAgICAvLyBUT0RPIC0gY29udmVydCB0byBmbGFncy5cbiAgICByZXR1cm4gKCkgPT4gbmV3IHR5cGUoLi4uaW5qZWN0QXJncyhkZXBzIGFzIGFueVtdKSk7XG4gIH1cblxuICBpZiAoVVNFX1ZBTFVFIGluIHByb3ZpZGVyKSB7XG4gICAgY29uc3QgdmFsdWVQcm92aWRlciA9IChwcm92aWRlciBhcyBWYWx1ZVNhbnNQcm92aWRlcik7XG4gICAgcmV0dXJuICgpID0+IHZhbHVlUHJvdmlkZXIudXNlVmFsdWU7XG4gIH0gZWxzZSBpZiAoKHByb3ZpZGVyIGFzIEV4aXN0aW5nU2Fuc1Byb3ZpZGVyKS51c2VFeGlzdGluZykge1xuICAgIGNvbnN0IGV4aXN0aW5nUHJvdmlkZXIgPSAocHJvdmlkZXIgYXMgRXhpc3RpbmdTYW5zUHJvdmlkZXIpO1xuICAgIHJldHVybiAoKSA9PiBpbmplY3QoZXhpc3RpbmdQcm92aWRlci51c2VFeGlzdGluZyk7XG4gIH0gZWxzZSBpZiAoKHByb3ZpZGVyIGFzIEZhY3RvcnlTYW5zUHJvdmlkZXIpLnVzZUZhY3RvcnkpIHtcbiAgICBjb25zdCBmYWN0b3J5UHJvdmlkZXIgPSAocHJvdmlkZXIgYXMgRmFjdG9yeVNhbnNQcm92aWRlcik7XG4gICAgcmV0dXJuICgpID0+IGZhY3RvcnlQcm92aWRlci51c2VGYWN0b3J5KC4uLmluamVjdEFyZ3MoZmFjdG9yeVByb3ZpZGVyLmRlcHMgfHwgRU1QVFlfQVJSQVkpKTtcbiAgfSBlbHNlIGlmICgocHJvdmlkZXIgYXMgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIgfCBDbGFzc1NhbnNQcm92aWRlcikudXNlQ2xhc3MpIHtcbiAgICBjb25zdCBjbGFzc1Byb3ZpZGVyID0gKHByb3ZpZGVyIGFzIFN0YXRpY0NsYXNzU2Fuc1Byb3ZpZGVyIHwgQ2xhc3NTYW5zUHJvdmlkZXIpO1xuICAgIGxldCBkZXBzID0gKHByb3ZpZGVyIGFzIFN0YXRpY0NsYXNzU2Fuc1Byb3ZpZGVyKS5kZXBzO1xuICAgIGlmICghZGVwcykge1xuICAgICAgY29uc3QgcmVmbGVjdGlvbkNhcGFiaWxpdGllcyA9IG5ldyBSZWZsZWN0aW9uQ2FwYWJpbGl0aWVzKCk7XG4gICAgICBkZXBzID0gcmVmbGVjdGlvbkNhcGFiaWxpdGllcy5wYXJhbWV0ZXJzKHR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gKCkgPT4gbmV3IGNsYXNzUHJvdmlkZXIudXNlQ2xhc3MoLi4uaW5qZWN0QXJncyhkZXBzKSk7XG4gIH0gZWxzZSB7XG4gICAgbGV0IGRlcHMgPSAocHJvdmlkZXIgYXMgQ29uc3RydWN0b3JTYW5zUHJvdmlkZXIpLmRlcHM7XG4gICAgaWYgKCFkZXBzKSB7XG4gICAgICBjb25zdCByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzID0gbmV3IFJlZmxlY3Rpb25DYXBhYmlsaXRpZXMoKTtcbiAgICAgIGRlcHMgPSByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLnBhcmFtZXRlcnModHlwZSk7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiBuZXcgdHlwZSguLi5pbmplY3RBcmdzKGRlcHMgISkpO1xuICB9XG59XG5cbi8qKlxuICogU3VwcG9ydHMgQEluamVjdGFibGUoKSBpbiBKSVQgbW9kZSBmb3IgUmVuZGVyMi5cbiAqL1xuZnVuY3Rpb24gcHJlUjNJbmplY3RhYmxlQ29tcGlsZShcbiAgICBpbmplY3RhYmxlVHlwZTogSW5qZWN0YWJsZVR5cGU8YW55PixcbiAgICBvcHRpb25zOiB7cHJvdmlkZWRJbj86IFR5cGU8YW55PnwgJ3Jvb3QnIHwgbnVsbH0gJiBJbmplY3RhYmxlUHJvdmlkZXIpOiB2b2lkIHtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5wcm92aWRlZEluICE9PSB1bmRlZmluZWQgJiYgaW5qZWN0YWJsZVR5cGUubmdJbmplY3RhYmxlRGVmID09PSB1bmRlZmluZWQpIHtcbiAgICBpbmplY3RhYmxlVHlwZS5uZ0luamVjdGFibGVEZWYgPSBkZWZpbmVJbmplY3RhYmxlKHtcbiAgICAgIHByb3ZpZGVkSW46IG9wdGlvbnMucHJvdmlkZWRJbixcbiAgICAgIGZhY3Rvcnk6IGNvbnZlcnRJbmplY3RhYmxlUHJvdmlkZXJUb0ZhY3RvcnkoaW5qZWN0YWJsZVR5cGUsIG9wdGlvbnMpLFxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuKiBJbmplY3RhYmxlIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4qXG4qIEBBbm5vdGF0aW9uXG4qL1xuZXhwb3J0IGNvbnN0IEluamVjdGFibGU6IEluamVjdGFibGVEZWNvcmF0b3IgPSBtYWtlRGVjb3JhdG9yKFxuICAgICdJbmplY3RhYmxlJywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCxcbiAgICAodHlwZTogVHlwZTxhbnk+LCBtZXRhOiBJbmplY3RhYmxlKSA9PlxuICAgICAgICAoUjNfQ09NUElMRV9JTkpFQ1RBQkxFIHx8IHByZVIzSW5qZWN0YWJsZUNvbXBpbGUpKHR5cGUsIG1ldGEpKTtcblxuLyoqXG4gKiBUeXBlIHJlcHJlc2VudGluZyBpbmplY3RhYmxlIHNlcnZpY2UuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGVUeXBlPFQ+IGV4dGVuZHMgVHlwZTxUPiB7IG5nSW5qZWN0YWJsZURlZjogSW5qZWN0YWJsZURlZjxUPjsgfVxuIl19