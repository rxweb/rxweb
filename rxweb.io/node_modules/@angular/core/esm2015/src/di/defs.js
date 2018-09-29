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
/**
 * Information about how a type or `InjectionToken` interfaces with the DI system.
 *
 * At a minimum, this includes a `factory` which defines how to create the given type `T`, possibly
 * requesting injection of other types if necessary.
 *
 * Optionally, a `providedIn` parameter specifies that the given type belongs to a particular
 * `InjectorDef`, `NgModule`, or a special scope (e.g. `'root'`). A value of `null` indicates
 * that the injectable does not belong to any scope.
 *
 * NOTE: This is a private type and should not be exported
 * @record
 * @template T
 */
export function InjectableDef() { }
/**
 * Specifies that the given type belongs to a particular injector:
 * - `InjectorType` such as `NgModule`,
 * - `'root'` the root injector
 * - `'any'` all injectors.
 * - `null`, does not belong to any injector. Must be explicitly listed in the injector
 *   `providers`.
 * @type {?}
 */
InjectableDef.prototype.providedIn;
/**
 * Factory method to execute to create an instance of the injectable.
 * @type {?}
 */
InjectableDef.prototype.factory;
/**
 * In a case of no explicit injector, a location where the instance of the injectable is stored.
 * @type {?}
 */
InjectableDef.prototype.value;
/**
 * Information about the providers to be included in an `Injector` as well as how the given type
 * which carries the information should be created by the DI system.
 *
 * An `InjectorDef` can import other types which have `InjectorDefs`, forming a deep nested
 * structure of providers with a defined priority (identically to how `NgModule`s also have
 * an import/dependency structure).
 *
 * NOTE: This is a private type and should not be exported
 * @record
 * @template T
 */
export function InjectorDef() { }
/** @type {?} */
InjectorDef.prototype.factory;
/** @type {?} */
InjectorDef.prototype.providers;
/** @type {?} */
InjectorDef.prototype.imports;
/**
 * A `Type` which has an `InjectableDef` static field.
 *
 * `InjectableDefType`s contain their own Dependency Injection metadata and are usable in an
 * `InjectorDef`-based `StaticInjector.
 *
 * \@experimental
 * @record
 * @template T
 */
export function InjectableType() { }
/**
 * Opaque type whose structure is highly version dependent. Do not rely on any properties.
 * @type {?}
 */
InjectableType.prototype.ngInjectableDef;
/**
 * A type which has an `InjectorDef` static field.
 *
 * `InjectorDefTypes` can be used to configure a `StaticInjector`.
 *
 * \@experimental
 * @record
 * @template T
 */
export function InjectorType() { }
/**
 * Opaque type whose structure is highly version dependent. Do not rely on any properties.
 * @type {?}
 */
InjectorType.prototype.ngInjectorDef;
/**
 * Describes the `InjectorDef` equivalent of a `ModuleWithProviders`, an `InjectorDefType` with an
 * associated array of providers.
 *
 * Objects of this type can be listed in the imports section of an `InjectorDef`.
 *
 * NOTE: This is a private type and should not be exported
 * @record
 * @template T
 */
export function InjectorTypeWithProviders() { }
/** @type {?} */
InjectorTypeWithProviders.prototype.ngModule;
/** @type {?|undefined} */
InjectorTypeWithProviders.prototype.providers;
/**
 * Construct an `InjectableDef` which defines how a token will be constructed by the DI system, and
 * in which injectors (if any) it will be available.
 *
 * This should be assigned to a static `ngInjectableDef` field on a type, which will then be an
 * `InjectableType`.
 *
 * Options:
 * * `providedIn` determines which injectors will include the injectable, by either associating it
 *   with an `\@NgModule` or other `InjectorType`, or by specifying that this injectable should be
 *   provided in the `'root'` injector, which will be the application-level injector in most apps.
 * * `factory` gives the zero argument function which will create an instance of the injectable.
 *   The factory can call `inject` to access the `Injector` and request injection of dependencies.
 *
 * \@experimental
 * @template T
 * @param {?} opts
 * @return {?}
 */
export function defineInjectable(opts) {
    return /** @type {?} */ ((/** @type {?} */ ({
        providedIn: /** @type {?} */ (opts.providedIn) || null, factory: opts.factory, value: undefined,
    })));
}
/**
 * Construct an `InjectorDef` which configures an injector.
 *
 * This should be assigned to a static `ngInjectorDef` field on a type, which will then be an
 * `InjectorType`.
 *
 * Options:
 *
 * * `factory`: an `InjectorType` is an instantiable type, so a zero argument `factory` function to
 *   create the type must be provided. If that factory function needs to inject arguments, it can
 *   use the `inject` function.
 * * `providers`: an optional array of providers to add to the injector. Each provider must
 *   either have a factory or point to a type which has an `ngInjectableDef` static property (the
 *   type must be an `InjectableType`).
 * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
 *   whose providers will also be added to the injector. Locally provided types will override
 *   providers from imports.
 *
 * \@experimental
 * @param {?} options
 * @return {?}
 */
export function defineInjector(options) {
    return /** @type {?} */ ((/** @type {?} */ ({
        factory: options.factory, providers: options.providers || [], imports: options.imports || [],
    })));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStIQSxNQUFNLDJCQUE4QixJQUduQztJQUNDLHlCQUFPLG1CQUFDO1FBQ04sVUFBVSxvQkFBRSxJQUFJLENBQUMsVUFBaUIsS0FBSSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVM7S0FDaEUsRUFBVSxFQUFDO0NBQ2pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCRCxNQUFNLHlCQUF5QixPQUFpRTtJQUU5Rix5QkFBTyxtQkFBQztRQUNOLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFO0tBQ3pFLEVBQVUsRUFBQztDQUNqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi90eXBlJztcblxuaW1wb3J0IHtDbGFzc1Byb3ZpZGVyLCBDbGFzc1NhbnNQcm92aWRlciwgQ29uc3RydWN0b3JQcm92aWRlciwgQ29uc3RydWN0b3JTYW5zUHJvdmlkZXIsIEV4aXN0aW5nUHJvdmlkZXIsIEV4aXN0aW5nU2Fuc1Byb3ZpZGVyLCBGYWN0b3J5UHJvdmlkZXIsIEZhY3RvcnlTYW5zUHJvdmlkZXIsIFN0YXRpY0NsYXNzUHJvdmlkZXIsIFN0YXRpY0NsYXNzU2Fuc1Byb3ZpZGVyLCBWYWx1ZVByb3ZpZGVyLCBWYWx1ZVNhbnNQcm92aWRlcn0gZnJvbSAnLi9wcm92aWRlcic7XG5cbi8qKlxuICogSW5mb3JtYXRpb24gYWJvdXQgaG93IGEgdHlwZSBvciBgSW5qZWN0aW9uVG9rZW5gIGludGVyZmFjZXMgd2l0aCB0aGUgREkgc3lzdGVtLlxuICpcbiAqIEF0IGEgbWluaW11bSwgdGhpcyBpbmNsdWRlcyBhIGBmYWN0b3J5YCB3aGljaCBkZWZpbmVzIGhvdyB0byBjcmVhdGUgdGhlIGdpdmVuIHR5cGUgYFRgLCBwb3NzaWJseVxuICogcmVxdWVzdGluZyBpbmplY3Rpb24gb2Ygb3RoZXIgdHlwZXMgaWYgbmVjZXNzYXJ5LlxuICpcbiAqIE9wdGlvbmFsbHksIGEgYHByb3ZpZGVkSW5gIHBhcmFtZXRlciBzcGVjaWZpZXMgdGhhdCB0aGUgZ2l2ZW4gdHlwZSBiZWxvbmdzIHRvIGEgcGFydGljdWxhclxuICogYEluamVjdG9yRGVmYCwgYE5nTW9kdWxlYCwgb3IgYSBzcGVjaWFsIHNjb3BlIChlLmcuIGAncm9vdCdgKS4gQSB2YWx1ZSBvZiBgbnVsbGAgaW5kaWNhdGVzXG4gKiB0aGF0IHRoZSBpbmplY3RhYmxlIGRvZXMgbm90IGJlbG9uZyB0byBhbnkgc2NvcGUuXG4gKlxuICogTk9URTogVGhpcyBpcyBhIHByaXZhdGUgdHlwZSBhbmQgc2hvdWxkIG5vdCBiZSBleHBvcnRlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGVEZWY8VD4ge1xuICAvKipcbiAgICogU3BlY2lmaWVzIHRoYXQgdGhlIGdpdmVuIHR5cGUgYmVsb25ncyB0byBhIHBhcnRpY3VsYXIgaW5qZWN0b3I6XG4gICAqIC0gYEluamVjdG9yVHlwZWAgc3VjaCBhcyBgTmdNb2R1bGVgLFxuICAgKiAtIGAncm9vdCdgIHRoZSByb290IGluamVjdG9yXG4gICAqIC0gYCdhbnknYCBhbGwgaW5qZWN0b3JzLlxuICAgKiAtIGBudWxsYCwgZG9lcyBub3QgYmVsb25nIHRvIGFueSBpbmplY3Rvci4gTXVzdCBiZSBleHBsaWNpdGx5IGxpc3RlZCBpbiB0aGUgaW5qZWN0b3JcbiAgICogICBgcHJvdmlkZXJzYC5cbiAgICovXG4gIHByb3ZpZGVkSW46IEluamVjdG9yVHlwZTxhbnk+fCdyb290J3wnYW55J3xudWxsO1xuXG4gIC8qKlxuICAgKiBGYWN0b3J5IG1ldGhvZCB0byBleGVjdXRlIHRvIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgaW5qZWN0YWJsZS5cbiAgICovXG4gIGZhY3Rvcnk6ICgpID0+IFQ7XG5cbiAgLyoqXG4gICAqIEluIGEgY2FzZSBvZiBubyBleHBsaWNpdCBpbmplY3RvciwgYSBsb2NhdGlvbiB3aGVyZSB0aGUgaW5zdGFuY2Ugb2YgdGhlIGluamVjdGFibGUgaXMgc3RvcmVkLlxuICAgKi9cbiAgdmFsdWU6IFR8dW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIEluZm9ybWF0aW9uIGFib3V0IHRoZSBwcm92aWRlcnMgdG8gYmUgaW5jbHVkZWQgaW4gYW4gYEluamVjdG9yYCBhcyB3ZWxsIGFzIGhvdyB0aGUgZ2l2ZW4gdHlwZVxuICogd2hpY2ggY2FycmllcyB0aGUgaW5mb3JtYXRpb24gc2hvdWxkIGJlIGNyZWF0ZWQgYnkgdGhlIERJIHN5c3RlbS5cbiAqXG4gKiBBbiBgSW5qZWN0b3JEZWZgIGNhbiBpbXBvcnQgb3RoZXIgdHlwZXMgd2hpY2ggaGF2ZSBgSW5qZWN0b3JEZWZzYCwgZm9ybWluZyBhIGRlZXAgbmVzdGVkXG4gKiBzdHJ1Y3R1cmUgb2YgcHJvdmlkZXJzIHdpdGggYSBkZWZpbmVkIHByaW9yaXR5IChpZGVudGljYWxseSB0byBob3cgYE5nTW9kdWxlYHMgYWxzbyBoYXZlXG4gKiBhbiBpbXBvcnQvZGVwZW5kZW5jeSBzdHJ1Y3R1cmUpLlxuICpcbiAqIE5PVEU6IFRoaXMgaXMgYSBwcml2YXRlIHR5cGUgYW5kIHNob3VsZCBub3QgYmUgZXhwb3J0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3RvckRlZjxUPiB7XG4gIGZhY3Rvcnk6ICgpID0+IFQ7XG5cbiAgLy8gVE9ETyhhbHhodWIpOiBOYXJyb3cgZG93biB0aGUgdHlwZSBoZXJlIG9uY2UgZGVjb3JhdG9ycyBwcm9wZXJseSBjaGFuZ2UgdGhlIHJldHVybiB0eXBlIG9mIHRoZVxuICAvLyBjbGFzcyB0aGV5IGFyZSBkZWNvcmF0aW5nICh0byBhZGQgdGhlIG5nSW5qZWN0YWJsZURlZiBwcm9wZXJ0eSBmb3IgZXhhbXBsZSkuXG4gIHByb3ZpZGVyczogKFR5cGU8YW55PnxWYWx1ZVByb3ZpZGVyfEV4aXN0aW5nUHJvdmlkZXJ8RmFjdG9yeVByb3ZpZGVyfENvbnN0cnVjdG9yUHJvdmlkZXJ8XG4gICAgICAgICAgICAgIFN0YXRpY0NsYXNzUHJvdmlkZXJ8Q2xhc3NQcm92aWRlcnxhbnlbXSlbXTtcblxuICBpbXBvcnRzOiAoSW5qZWN0b3JUeXBlPGFueT58SW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczxhbnk+KVtdO1xufVxuXG4vKipcbiAqIEEgYFR5cGVgIHdoaWNoIGhhcyBhbiBgSW5qZWN0YWJsZURlZmAgc3RhdGljIGZpZWxkLlxuICpcbiAqIGBJbmplY3RhYmxlRGVmVHlwZWBzIGNvbnRhaW4gdGhlaXIgb3duIERlcGVuZGVuY3kgSW5qZWN0aW9uIG1ldGFkYXRhIGFuZCBhcmUgdXNhYmxlIGluIGFuXG4gKiBgSW5qZWN0b3JEZWZgLWJhc2VkIGBTdGF0aWNJbmplY3Rvci5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0YWJsZVR5cGU8VD4gZXh0ZW5kcyBUeXBlPFQ+IHtcbiAgLyoqXG4gICAqIE9wYXF1ZSB0eXBlIHdob3NlIHN0cnVjdHVyZSBpcyBoaWdobHkgdmVyc2lvbiBkZXBlbmRlbnQuIERvIG5vdCByZWx5IG9uIGFueSBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgbmdJbmplY3RhYmxlRGVmOiBuZXZlcjtcbn1cblxuLyoqXG4gKiBBIHR5cGUgd2hpY2ggaGFzIGFuIGBJbmplY3RvckRlZmAgc3RhdGljIGZpZWxkLlxuICpcbiAqIGBJbmplY3RvckRlZlR5cGVzYCBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgYSBgU3RhdGljSW5qZWN0b3JgLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3RvclR5cGU8VD4gZXh0ZW5kcyBUeXBlPFQ+IHtcbiAgLyoqXG4gICAqIE9wYXF1ZSB0eXBlIHdob3NlIHN0cnVjdHVyZSBpcyBoaWdobHkgdmVyc2lvbiBkZXBlbmRlbnQuIERvIG5vdCByZWx5IG9uIGFueSBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgbmdJbmplY3RvckRlZjogbmV2ZXI7XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBgSW5qZWN0b3JEZWZgIGVxdWl2YWxlbnQgb2YgYSBgTW9kdWxlV2l0aFByb3ZpZGVyc2AsIGFuIGBJbmplY3RvckRlZlR5cGVgIHdpdGggYW5cbiAqIGFzc29jaWF0ZWQgYXJyYXkgb2YgcHJvdmlkZXJzLlxuICpcbiAqIE9iamVjdHMgb2YgdGhpcyB0eXBlIGNhbiBiZSBsaXN0ZWQgaW4gdGhlIGltcG9ydHMgc2VjdGlvbiBvZiBhbiBgSW5qZWN0b3JEZWZgLlxuICpcbiAqIE5PVEU6IFRoaXMgaXMgYSBwcml2YXRlIHR5cGUgYW5kIHNob3VsZCBub3QgYmUgZXhwb3J0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3RvclR5cGVXaXRoUHJvdmlkZXJzPFQ+IHtcbiAgbmdNb2R1bGU6IEluamVjdG9yVHlwZTxUPjtcbiAgcHJvdmlkZXJzPzogKFR5cGU8YW55PnxWYWx1ZVByb3ZpZGVyfEV4aXN0aW5nUHJvdmlkZXJ8RmFjdG9yeVByb3ZpZGVyfENvbnN0cnVjdG9yUHJvdmlkZXJ8XG4gICAgICAgICAgICAgICBTdGF0aWNDbGFzc1Byb3ZpZGVyfENsYXNzUHJvdmlkZXJ8YW55W10pW107XG59XG5cblxuLyoqXG4gKiBDb25zdHJ1Y3QgYW4gYEluamVjdGFibGVEZWZgIHdoaWNoIGRlZmluZXMgaG93IGEgdG9rZW4gd2lsbCBiZSBjb25zdHJ1Y3RlZCBieSB0aGUgREkgc3lzdGVtLCBhbmRcbiAqIGluIHdoaWNoIGluamVjdG9ycyAoaWYgYW55KSBpdCB3aWxsIGJlIGF2YWlsYWJsZS5cbiAqXG4gKiBUaGlzIHNob3VsZCBiZSBhc3NpZ25lZCB0byBhIHN0YXRpYyBgbmdJbmplY3RhYmxlRGVmYCBmaWVsZCBvbiBhIHR5cGUsIHdoaWNoIHdpbGwgdGhlbiBiZSBhblxuICogYEluamVjdGFibGVUeXBlYC5cbiAqXG4gKiBPcHRpb25zOlxuICogKiBgcHJvdmlkZWRJbmAgZGV0ZXJtaW5lcyB3aGljaCBpbmplY3RvcnMgd2lsbCBpbmNsdWRlIHRoZSBpbmplY3RhYmxlLCBieSBlaXRoZXIgYXNzb2NpYXRpbmcgaXRcbiAqICAgd2l0aCBhbiBgQE5nTW9kdWxlYCBvciBvdGhlciBgSW5qZWN0b3JUeXBlYCwgb3IgYnkgc3BlY2lmeWluZyB0aGF0IHRoaXMgaW5qZWN0YWJsZSBzaG91bGQgYmVcbiAqICAgcHJvdmlkZWQgaW4gdGhlIGAncm9vdCdgIGluamVjdG9yLCB3aGljaCB3aWxsIGJlIHRoZSBhcHBsaWNhdGlvbi1sZXZlbCBpbmplY3RvciBpbiBtb3N0IGFwcHMuXG4gKiAqIGBmYWN0b3J5YCBnaXZlcyB0aGUgemVybyBhcmd1bWVudCBmdW5jdGlvbiB3aGljaCB3aWxsIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgaW5qZWN0YWJsZS5cbiAqICAgVGhlIGZhY3RvcnkgY2FuIGNhbGwgYGluamVjdGAgdG8gYWNjZXNzIHRoZSBgSW5qZWN0b3JgIGFuZCByZXF1ZXN0IGluamVjdGlvbiBvZiBkZXBlbmRlbmNpZXMuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lSW5qZWN0YWJsZTxUPihvcHRzOiB7XG4gIHByb3ZpZGVkSW4/OiBUeXBlPGFueT58ICdyb290JyB8ICdhbnknIHwgbnVsbCxcbiAgZmFjdG9yeTogKCkgPT4gVCxcbn0pOiBuZXZlciB7XG4gIHJldHVybiAoe1xuICAgIHByb3ZpZGVkSW46IG9wdHMucHJvdmlkZWRJbiBhcyBhbnkgfHwgbnVsbCwgZmFjdG9yeTogb3B0cy5mYWN0b3J5LCB2YWx1ZTogdW5kZWZpbmVkLFxuICB9IGFzIEluamVjdGFibGVEZWY8VD4pIGFzIG5ldmVyO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdCBhbiBgSW5qZWN0b3JEZWZgIHdoaWNoIGNvbmZpZ3VyZXMgYW4gaW5qZWN0b3IuXG4gKlxuICogVGhpcyBzaG91bGQgYmUgYXNzaWduZWQgdG8gYSBzdGF0aWMgYG5nSW5qZWN0b3JEZWZgIGZpZWxkIG9uIGEgdHlwZSwgd2hpY2ggd2lsbCB0aGVuIGJlIGFuXG4gKiBgSW5qZWN0b3JUeXBlYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICogYGZhY3RvcnlgOiBhbiBgSW5qZWN0b3JUeXBlYCBpcyBhbiBpbnN0YW50aWFibGUgdHlwZSwgc28gYSB6ZXJvIGFyZ3VtZW50IGBmYWN0b3J5YCBmdW5jdGlvbiB0b1xuICogICBjcmVhdGUgdGhlIHR5cGUgbXVzdCBiZSBwcm92aWRlZC4gSWYgdGhhdCBmYWN0b3J5IGZ1bmN0aW9uIG5lZWRzIHRvIGluamVjdCBhcmd1bWVudHMsIGl0IGNhblxuICogICB1c2UgdGhlIGBpbmplY3RgIGZ1bmN0aW9uLlxuICogKiBgcHJvdmlkZXJzYDogYW4gb3B0aW9uYWwgYXJyYXkgb2YgcHJvdmlkZXJzIHRvIGFkZCB0byB0aGUgaW5qZWN0b3IuIEVhY2ggcHJvdmlkZXIgbXVzdFxuICogICBlaXRoZXIgaGF2ZSBhIGZhY3Rvcnkgb3IgcG9pbnQgdG8gYSB0eXBlIHdoaWNoIGhhcyBhbiBgbmdJbmplY3RhYmxlRGVmYCBzdGF0aWMgcHJvcGVydHkgKHRoZVxuICogICB0eXBlIG11c3QgYmUgYW4gYEluamVjdGFibGVUeXBlYCkuXG4gKiAqIGBpbXBvcnRzYDogYW4gb3B0aW9uYWwgYXJyYXkgb2YgaW1wb3J0cyBvZiBvdGhlciBgSW5qZWN0b3JUeXBlYHMgb3IgYEluamVjdG9yVHlwZVdpdGhNb2R1bGVgc1xuICogICB3aG9zZSBwcm92aWRlcnMgd2lsbCBhbHNvIGJlIGFkZGVkIHRvIHRoZSBpbmplY3Rvci4gTG9jYWxseSBwcm92aWRlZCB0eXBlcyB3aWxsIG92ZXJyaWRlXG4gKiAgIHByb3ZpZGVycyBmcm9tIGltcG9ydHMuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lSW5qZWN0b3Iob3B0aW9uczoge2ZhY3Rvcnk6ICgpID0+IGFueSwgcHJvdmlkZXJzPzogYW55W10sIGltcG9ydHM/OiBhbnlbXX0pOlxuICAgIG5ldmVyIHtcbiAgcmV0dXJuICh7XG4gICAgZmFjdG9yeTogb3B0aW9ucy5mYWN0b3J5LCBwcm92aWRlcnM6IG9wdGlvbnMucHJvdmlkZXJzIHx8IFtdLCBpbXBvcnRzOiBvcHRpb25zLmltcG9ydHMgfHwgW10sXG4gIH0gYXMgSW5qZWN0b3JEZWY8YW55PikgYXMgbmV2ZXI7XG59XG4iXX0=