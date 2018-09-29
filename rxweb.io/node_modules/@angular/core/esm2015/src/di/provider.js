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
 * Configures the `Injector` to return a value for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ValueSansProvider'}
 *
 * \@experimental
 * @record
 */
export function ValueSansProvider() { }
/**
 * The value to inject.
 * @type {?}
 */
ValueSansProvider.prototype.useValue;
/**
 * Configures the `Injector` to return a value for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ValueProvider'}
 *
 * ### Multi-value example
 *
 * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 * @record
 */
export function ValueProvider() { }
/**
 * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
 * @type {?}
 */
ValueProvider.prototype.provide;
/**
 * If true, then injector returns an array of instances. This is useful to allow multiple
 * providers spread across many files to provide configuration information to a common token.
 * @type {?|undefined}
 */
ValueProvider.prototype.multi;
/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='StaticClassSansProvider'}
 *
 * \@experimental
 * @record
 */
export function StaticClassSansProvider() { }
/**
 * An optional class to instantiate for the `token`. (If not provided `provide` is assumed to be a
 * class to instantiate)
 * @type {?}
 */
StaticClassSansProvider.prototype.useClass;
/**
 * A list of `token`s which need to be resolved by the injector. The list of values is then
 * used as arguments to the `useClass` constructor.
 * @type {?}
 */
StaticClassSansProvider.prototype.deps;
/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='StaticClassProvider'}
 *
 * Note that following two providers are not equal:
 *
 * {\@example core/di/ts/provider_spec.ts region='StaticClassProviderDifference'}
 *
 * ### Multi-value example
 *
 * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 * @record
 */
export function StaticClassProvider() { }
/**
 * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
 * @type {?}
 */
StaticClassProvider.prototype.provide;
/**
 * If true, then injector returns an array of instances. This is useful to allow multiple
 * providers spread across many files to provide configuration information to a common token.
 * @type {?|undefined}
 */
StaticClassProvider.prototype.multi;
/**
 * Configures the `Injector` to return an instance of a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * ```
 * \@Injectable(SomeModule, {deps: []})
 * class MyService {}
 * ```
 *
 * \@experimental
 * @record
 */
export function ConstructorSansProvider() { }
/**
 * A list of `token`s which need to be resolved by the injector. The list of values is then
 * used as arguments to the `useClass` constructor.
 * @type {?|undefined}
 */
ConstructorSansProvider.prototype.deps;
/**
 * Configures the `Injector` to return an instance of a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
 *
 * ### Multi-value example
 *
 * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 * @record
 */
export function ConstructorProvider() { }
/**
 * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
 * @type {?}
 */
ConstructorProvider.prototype.provide;
/**
 * If true, then injector returns an array of instances. This is useful to allow multiple
 * providers spread across many files to provide configuration information to a common token.
 * @type {?|undefined}
 */
ConstructorProvider.prototype.multi;
/**
 * Configures the `Injector` to return a value of another `useExisting` token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ExistingSansProvider'}
 * @record
 */
export function ExistingSansProvider() { }
/**
 * Existing `token` to return. (equivalent to `injector.get(useExisting)`)
 * @type {?}
 */
ExistingSansProvider.prototype.useExisting;
/**
 * Configures the `Injector` to return a value of another `useExisting` token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ExistingProvider'}
 *
 * ### Multi-value example
 *
 * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 * @record
 */
export function ExistingProvider() { }
/**
 * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
 * @type {?}
 */
ExistingProvider.prototype.provide;
/**
 * If true, then injector returns an array of instances. This is useful to allow multiple
 * providers spread across many files to provide configuration information to a common token.
 * @type {?|undefined}
 */
ExistingProvider.prototype.multi;
/**
 * Configures the `Injector` to return a value by invoking a `useFactory` function.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='FactorySansProvider'}
 *
 * \@experimental
 * @record
 */
export function FactorySansProvider() { }
/**
 * A function to invoke to create a value for this `token`. The function is invoked with
 * resolved values of `token`s in the `deps` field.
 * @type {?}
 */
FactorySansProvider.prototype.useFactory;
/**
 * A list of `token`s which need to be resolved by the injector. The list of values is then
 * used as arguments to the `useFactory` function.
 * @type {?|undefined}
 */
FactorySansProvider.prototype.deps;
/**
 * Configures the `Injector` to return a value by invoking a `useFactory` function.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='FactoryProvider'}
 *
 * Dependencies can also be marked as optional:
 *
 * {\@example core/di/ts/provider_spec.ts region='FactoryProviderOptionalDeps'}
 *
 * ### Multi-value example
 *
 * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 * @record
 */
export function FactoryProvider() { }
/**
 * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
 * @type {?}
 */
FactoryProvider.prototype.provide;
/**
 * If true, then injector returns an array of instances. This is useful to allow multiple
 * providers spread across many files to provide configuration information to a common token.
 * @type {?|undefined}
 */
FactoryProvider.prototype.multi;
/** @typedef {?} */
var StaticProvider;
export { StaticProvider };
/**
 * Configures the `Injector` to return an instance of `Type` when `Type' is used as the token.
 *
 * Create an instance by invoking the `new` operator and supplying additional arguments.
 * This form is a short form of `TypeProvider`;
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='TypeProvider'}
 * @record
 */
export function TypeProvider() { }
/**
 * Configures the `Injector` to return a value by invoking a `useClass` function.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ClassSansProvider'}
 *
 * \@experimental
 * @record
 */
export function ClassSansProvider() { }
/**
 * Class to instantiate for the `token`.
 * @type {?}
 */
ClassSansProvider.prototype.useClass;
/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/provider_spec.ts region='ClassProvider'}
 *
 * Note that following two providers are not equal:
 *
 * {\@example core/di/ts/provider_spec.ts region='ClassProviderDifference'}
 *
 * ### Multi-value example
 *
 * {\@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 * @record
 */
export function ClassProvider() { }
/**
 * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
 * @type {?}
 */
ClassProvider.prototype.provide;
/**
 * If true, then injector returns an array of instances. This is useful to allow multiple
 * providers spread across many files to provide configuration information to a common token.
 * @type {?|undefined}
 */
ClassProvider.prototype.multi;
/** @typedef {?} */
var Provider;
export { Provider };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuXG4vKipcbiAqIENvbmZpZ3VyZXMgdGhlIGBJbmplY3RvcmAgdG8gcmV0dXJuIGEgdmFsdWUgZm9yIGEgdG9rZW4uXG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J1ZhbHVlU2Fuc1Byb3ZpZGVyJ31cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsdWVTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogVGhlIHZhbHVlIHRvIGluamVjdC5cbiAgICovXG4gIHVzZVZhbHVlOiBhbnk7XG59XG5cbi8qKlxuICogQ29uZmlndXJlcyB0aGUgYEluamVjdG9yYCB0byByZXR1cm4gYSB2YWx1ZSBmb3IgYSB0b2tlbi5cbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIFtcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nVmFsdWVQcm92aWRlcid9XG4gKlxuICogIyMjIE11bHRpLXZhbHVlIGV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nTXVsdGlQcm92aWRlckFzcGVjdCd9XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsdWVQcm92aWRlciBleHRlbmRzIFZhbHVlU2Fuc1Byb3ZpZGVyIHtcbiAgLyoqXG4gICAqIEFuIGluamVjdGlvbiB0b2tlbi4gKFR5cGljYWxseSBhbiBpbnN0YW5jZSBvZiBgVHlwZWAgb3IgYEluamVjdGlvblRva2VuYCwgYnV0IGNhbiBiZSBgYW55YCkuXG4gICAqL1xuICBwcm92aWRlOiBhbnk7XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIHRoZW4gaW5qZWN0b3IgcmV0dXJucyBhbiBhcnJheSBvZiBpbnN0YW5jZXMuIFRoaXMgaXMgdXNlZnVsIHRvIGFsbG93IG11bHRpcGxlXG4gICAqIHByb3ZpZGVycyBzcHJlYWQgYWNyb3NzIG1hbnkgZmlsZXMgdG8gcHJvdmlkZSBjb25maWd1cmF0aW9uIGluZm9ybWF0aW9uIHRvIGEgY29tbW9uIHRva2VuLlxuICAgKi9cbiAgbXVsdGk/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIENvbmZpZ3VyZXMgdGhlIGBJbmplY3RvcmAgdG8gcmV0dXJuIGFuIGluc3RhbmNlIG9mIGB1c2VDbGFzc2AgZm9yIGEgdG9rZW4uXG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J1N0YXRpY0NsYXNzU2Fuc1Byb3ZpZGVyJ31cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogQW4gb3B0aW9uYWwgY2xhc3MgdG8gaW5zdGFudGlhdGUgZm9yIHRoZSBgdG9rZW5gLiAoSWYgbm90IHByb3ZpZGVkIGBwcm92aWRlYCBpcyBhc3N1bWVkIHRvIGJlIGFcbiAgICogY2xhc3MgdG8gaW5zdGFudGlhdGUpXG4gICAqL1xuICB1c2VDbGFzczogVHlwZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgYHRva2VuYHMgd2hpY2ggbmVlZCB0byBiZSByZXNvbHZlZCBieSB0aGUgaW5qZWN0b3IuIFRoZSBsaXN0IG9mIHZhbHVlcyBpcyB0aGVuXG4gICAqIHVzZWQgYXMgYXJndW1lbnRzIHRvIHRoZSBgdXNlQ2xhc3NgIGNvbnN0cnVjdG9yLlxuICAgKi9cbiAgZGVwczogYW55W107XG59XG5cbi8qKlxuICogQ29uZmlndXJlcyB0aGUgYEluamVjdG9yYCB0byByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgYHVzZUNsYXNzYCBmb3IgYSB0b2tlbi5cbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIFtcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nU3RhdGljQ2xhc3NQcm92aWRlcid9XG4gKlxuICogTm90ZSB0aGF0IGZvbGxvd2luZyB0d28gcHJvdmlkZXJzIGFyZSBub3QgZXF1YWw6XG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J1N0YXRpY0NsYXNzUHJvdmlkZXJEaWZmZXJlbmNlJ31cbiAqXG4gKiAjIyMgTXVsdGktdmFsdWUgZXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdNdWx0aVByb3ZpZGVyQXNwZWN0J31cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdGF0aWNDbGFzc1Byb3ZpZGVyIGV4dGVuZHMgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogQW4gaW5qZWN0aW9uIHRva2VuLiAoVHlwaWNhbGx5IGFuIGluc3RhbmNlIG9mIGBUeXBlYCBvciBgSW5qZWN0aW9uVG9rZW5gLCBidXQgY2FuIGJlIGBhbnlgKS5cbiAgICovXG4gIHByb3ZpZGU6IGFueTtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlbiBpbmplY3RvciByZXR1cm5zIGFuIGFycmF5IG9mIGluc3RhbmNlcy4gVGhpcyBpcyB1c2VmdWwgdG8gYWxsb3cgbXVsdGlwbGVcbiAgICogcHJvdmlkZXJzIHNwcmVhZCBhY3Jvc3MgbWFueSBmaWxlcyB0byBwcm92aWRlIGNvbmZpZ3VyYXRpb24gaW5mb3JtYXRpb24gdG8gYSBjb21tb24gdG9rZW4uXG4gICAqL1xuICBtdWx0aT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQ29uZmlndXJlcyB0aGUgYEluamVjdG9yYCB0byByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgYSB0b2tlbi5cbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIFtcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIEBJbmplY3RhYmxlKFNvbWVNb2R1bGUsIHtkZXBzOiBbXX0pXG4gKiBjbGFzcyBNeVNlcnZpY2Uge31cbiAqIGBgYFxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb25zdHJ1Y3RvclNhbnNQcm92aWRlciB7XG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgYHRva2VuYHMgd2hpY2ggbmVlZCB0byBiZSByZXNvbHZlZCBieSB0aGUgaW5qZWN0b3IuIFRoZSBsaXN0IG9mIHZhbHVlcyBpcyB0aGVuXG4gICAqIHVzZWQgYXMgYXJndW1lbnRzIHRvIHRoZSBgdXNlQ2xhc3NgIGNvbnN0cnVjdG9yLlxuICAgKi9cbiAgZGVwcz86IGFueVtdO1xufVxuXG4vKipcbiAqIENvbmZpZ3VyZXMgdGhlIGBJbmplY3RvcmAgdG8gcmV0dXJuIGFuIGluc3RhbmNlIG9mIGEgdG9rZW4uXG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J0NvbnN0cnVjdG9yUHJvdmlkZXInfVxuICpcbiAqICMjIyBNdWx0aS12YWx1ZSBleGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J011bHRpUHJvdmlkZXJBc3BlY3QnfVxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbnN0cnVjdG9yUHJvdmlkZXIgZXh0ZW5kcyBDb25zdHJ1Y3RvclNhbnNQcm92aWRlciB7XG4gIC8qKlxuICAgKiBBbiBpbmplY3Rpb24gdG9rZW4uIChUeXBpY2FsbHkgYW4gaW5zdGFuY2Ugb2YgYFR5cGVgIG9yIGBJbmplY3Rpb25Ub2tlbmAsIGJ1dCBjYW4gYmUgYGFueWApLlxuICAgKi9cbiAgcHJvdmlkZTogVHlwZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGVuIGluamVjdG9yIHJldHVybnMgYW4gYXJyYXkgb2YgaW5zdGFuY2VzLiBUaGlzIGlzIHVzZWZ1bCB0byBhbGxvdyBtdWx0aXBsZVxuICAgKiBwcm92aWRlcnMgc3ByZWFkIGFjcm9zcyBtYW55IGZpbGVzIHRvIHByb3ZpZGUgY29uZmlndXJhdGlvbiBpbmZvcm1hdGlvbiB0byBhIGNvbW1vbiB0b2tlbi5cbiAgICovXG4gIG11bHRpPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBDb25maWd1cmVzIHRoZSBgSW5qZWN0b3JgIHRvIHJldHVybiBhIHZhbHVlIG9mIGFub3RoZXIgYHVzZUV4aXN0aW5nYCB0b2tlbi5cbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIFtcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nRXhpc3RpbmdTYW5zUHJvdmlkZXInfVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4aXN0aW5nU2Fuc1Byb3ZpZGVyIHtcbiAgLyoqXG4gICAqIEV4aXN0aW5nIGB0b2tlbmAgdG8gcmV0dXJuLiAoZXF1aXZhbGVudCB0byBgaW5qZWN0b3IuZ2V0KHVzZUV4aXN0aW5nKWApXG4gICAqL1xuICB1c2VFeGlzdGluZzogYW55O1xufVxuXG4vKipcbiAqIENvbmZpZ3VyZXMgdGhlIGBJbmplY3RvcmAgdG8gcmV0dXJuIGEgdmFsdWUgb2YgYW5vdGhlciBgdXNlRXhpc3RpbmdgIHRva2VuLlxuICpcbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUgW1wiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIl0oZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24pLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdFeGlzdGluZ1Byb3ZpZGVyJ31cbiAqXG4gKiAjIyMgTXVsdGktdmFsdWUgZXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdNdWx0aVByb3ZpZGVyQXNwZWN0J31cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFeGlzdGluZ1Byb3ZpZGVyIGV4dGVuZHMgRXhpc3RpbmdTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogQW4gaW5qZWN0aW9uIHRva2VuLiAoVHlwaWNhbGx5IGFuIGluc3RhbmNlIG9mIGBUeXBlYCBvciBgSW5qZWN0aW9uVG9rZW5gLCBidXQgY2FuIGJlIGBhbnlgKS5cbiAgICovXG4gIHByb3ZpZGU6IGFueTtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlbiBpbmplY3RvciByZXR1cm5zIGFuIGFycmF5IG9mIGluc3RhbmNlcy4gVGhpcyBpcyB1c2VmdWwgdG8gYWxsb3cgbXVsdGlwbGVcbiAgICogcHJvdmlkZXJzIHNwcmVhZCBhY3Jvc3MgbWFueSBmaWxlcyB0byBwcm92aWRlIGNvbmZpZ3VyYXRpb24gaW5mb3JtYXRpb24gdG8gYSBjb21tb24gdG9rZW4uXG4gICAqL1xuICBtdWx0aT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQ29uZmlndXJlcyB0aGUgYEluamVjdG9yYCB0byByZXR1cm4gYSB2YWx1ZSBieSBpbnZva2luZyBhIGB1c2VGYWN0b3J5YCBmdW5jdGlvbi5cbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIFtcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nRmFjdG9yeVNhbnNQcm92aWRlcid9XG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhY3RvcnlTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogQSBmdW5jdGlvbiB0byBpbnZva2UgdG8gY3JlYXRlIGEgdmFsdWUgZm9yIHRoaXMgYHRva2VuYC4gVGhlIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aFxuICAgKiByZXNvbHZlZCB2YWx1ZXMgb2YgYHRva2VuYHMgaW4gdGhlIGBkZXBzYCBmaWVsZC5cbiAgICovXG4gIHVzZUZhY3Rvcnk6IEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgYHRva2VuYHMgd2hpY2ggbmVlZCB0byBiZSByZXNvbHZlZCBieSB0aGUgaW5qZWN0b3IuIFRoZSBsaXN0IG9mIHZhbHVlcyBpcyB0aGVuXG4gICAqIHVzZWQgYXMgYXJndW1lbnRzIHRvIHRoZSBgdXNlRmFjdG9yeWAgZnVuY3Rpb24uXG4gICAqL1xuICBkZXBzPzogYW55W107XG59XG5cbi8qKlxuICogQ29uZmlndXJlcyB0aGUgYEluamVjdG9yYCB0byByZXR1cm4gYSB2YWx1ZSBieSBpbnZva2luZyBhIGB1c2VGYWN0b3J5YCBmdW5jdGlvbi5cbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIFtcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nRmFjdG9yeVByb3ZpZGVyJ31cbiAqXG4gKiBEZXBlbmRlbmNpZXMgY2FuIGFsc28gYmUgbWFya2VkIGFzIG9wdGlvbmFsOlxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdGYWN0b3J5UHJvdmlkZXJPcHRpb25hbERlcHMnfVxuICpcbiAqICMjIyBNdWx0aS12YWx1ZSBleGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J011bHRpUHJvdmlkZXJBc3BlY3QnfVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhY3RvcnlQcm92aWRlciBleHRlbmRzIEZhY3RvcnlTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogQW4gaW5qZWN0aW9uIHRva2VuLiAoVHlwaWNhbGx5IGFuIGluc3RhbmNlIG9mIGBUeXBlYCBvciBgSW5qZWN0aW9uVG9rZW5gLCBidXQgY2FuIGJlIGBhbnlgKS5cbiAgICovXG4gIHByb3ZpZGU6IGFueTtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlbiBpbmplY3RvciByZXR1cm5zIGFuIGFycmF5IG9mIGluc3RhbmNlcy4gVGhpcyBpcyB1c2VmdWwgdG8gYWxsb3cgbXVsdGlwbGVcbiAgICogcHJvdmlkZXJzIHNwcmVhZCBhY3Jvc3MgbWFueSBmaWxlcyB0byBwcm92aWRlIGNvbmZpZ3VyYXRpb24gaW5mb3JtYXRpb24gdG8gYSBjb21tb24gdG9rZW4uXG4gICAqL1xuICBtdWx0aT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIGhvdyB0aGUgYEluamVjdG9yYCBzaG91bGQgYmUgY29uZmlndXJlZCBpbiBhIHN0YXRpYyB3YXkgKFdpdGhvdXQgcmVmbGVjdGlvbikuXG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gKlxuICogQHNlZSBgVmFsdWVQcm92aWRlcmBcbiAqIEBzZWUgYEV4aXN0aW5nUHJvdmlkZXJgXG4gKiBAc2VlIGBGYWN0b3J5UHJvdmlkZXJgXG4gKi9cbmV4cG9ydCB0eXBlIFN0YXRpY1Byb3ZpZGVyID0gVmFsdWVQcm92aWRlciB8IEV4aXN0aW5nUHJvdmlkZXIgfCBTdGF0aWNDbGFzc1Byb3ZpZGVyIHxcbiAgICBDb25zdHJ1Y3RvclByb3ZpZGVyIHwgRmFjdG9yeVByb3ZpZGVyIHwgYW55W107XG5cblxuLyoqXG4gKiBDb25maWd1cmVzIHRoZSBgSW5qZWN0b3JgIHRvIHJldHVybiBhbiBpbnN0YW5jZSBvZiBgVHlwZWAgd2hlbiBgVHlwZScgaXMgdXNlZCBhcyB0aGUgdG9rZW4uXG4gKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIGJ5IGludm9raW5nIHRoZSBgbmV3YCBvcGVyYXRvciBhbmQgc3VwcGx5aW5nIGFkZGl0aW9uYWwgYXJndW1lbnRzLlxuICogVGhpcyBmb3JtIGlzIGEgc2hvcnQgZm9ybSBvZiBgVHlwZVByb3ZpZGVyYDtcbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIFtcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nVHlwZVByb3ZpZGVyJ31cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUeXBlUHJvdmlkZXIgZXh0ZW5kcyBUeXBlPGFueT4ge31cblxuLyoqXG4gKiBDb25maWd1cmVzIHRoZSBgSW5qZWN0b3JgIHRvIHJldHVybiBhIHZhbHVlIGJ5IGludm9raW5nIGEgYHVzZUNsYXNzYCBmdW5jdGlvbi5cbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIFtcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nQ2xhc3NTYW5zUHJvdmlkZXInfVxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDbGFzc1NhbnNQcm92aWRlciB7XG4gIC8qKlxuICAgKiBDbGFzcyB0byBpbnN0YW50aWF0ZSBmb3IgdGhlIGB0b2tlbmAuXG4gICAqL1xuICB1c2VDbGFzczogVHlwZTxhbnk+O1xufVxuXG4vKipcbiAqIENvbmZpZ3VyZXMgdGhlIGBJbmplY3RvcmAgdG8gcmV0dXJuIGFuIGluc3RhbmNlIG9mIGB1c2VDbGFzc2AgZm9yIGEgdG9rZW4uXG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J0NsYXNzUHJvdmlkZXInfVxuICpcbiAqIE5vdGUgdGhhdCBmb2xsb3dpbmcgdHdvIHByb3ZpZGVycyBhcmUgbm90IGVxdWFsOlxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdDbGFzc1Byb3ZpZGVyRGlmZmVyZW5jZSd9XG4gKlxuICogIyMjIE11bHRpLXZhbHVlIGV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nTXVsdGlQcm92aWRlckFzcGVjdCd9XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2xhc3NQcm92aWRlciBleHRlbmRzIENsYXNzU2Fuc1Byb3ZpZGVyIHtcbiAgLyoqXG4gICAqIEFuIGluamVjdGlvbiB0b2tlbi4gKFR5cGljYWxseSBhbiBpbnN0YW5jZSBvZiBgVHlwZWAgb3IgYEluamVjdGlvblRva2VuYCwgYnV0IGNhbiBiZSBgYW55YCkuXG4gICAqL1xuICBwcm92aWRlOiBhbnk7XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIHRoZW4gaW5qZWN0b3IgcmV0dXJucyBhbiBhcnJheSBvZiBpbnN0YW5jZXMuIFRoaXMgaXMgdXNlZnVsIHRvIGFsbG93IG11bHRpcGxlXG4gICAqIHByb3ZpZGVycyBzcHJlYWQgYWNyb3NzIG1hbnkgZmlsZXMgdG8gcHJvdmlkZSBjb25maWd1cmF0aW9uIGluZm9ybWF0aW9uIHRvIGEgY29tbW9uIHRva2VuLlxuICAgKi9cbiAgbXVsdGk/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyBob3cgdGhlIGBJbmplY3RvcmAgc2hvdWxkIGJlIGNvbmZpZ3VyZWQuXG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gKlxuICogQHNlZSBgVHlwZVByb3ZpZGVyYFxuICogQHNlZSBgQ2xhc3NQcm92aWRlcmBcbiAqIEBzZWUgYFN0YXRpY1Byb3ZpZGVyYFxuICovXG5leHBvcnQgdHlwZSBQcm92aWRlciA9IFR5cGVQcm92aWRlciB8IFZhbHVlUHJvdmlkZXIgfCBDbGFzc1Byb3ZpZGVyIHwgQ29uc3RydWN0b3JQcm92aWRlciB8XG4gICAgRXhpc3RpbmdQcm92aWRlciB8IEZhY3RvcnlQcm92aWRlciB8IGFueVtdO1xuIl19