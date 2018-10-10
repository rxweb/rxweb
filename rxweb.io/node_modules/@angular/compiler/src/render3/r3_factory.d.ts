/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CompileTypeMetadata } from '../compile_metadata';
import { CompileReflector } from '../compile_reflector';
import * as o from '../output/output_ast';
import { OutputContext } from '../util';
/**
 * Metadata required by the factory generator to generate a `factory` function for a type.
 */
export interface R3FactoryMetadata {
    /**
     * String name of the type being generated (used to name the factory function).
     */
    name: string;
    /**
     * An expression representing the function (or constructor) which will instantiate the requested
     * type.
     *
     * This could be a reference to a constructor type, or to a user-defined factory function. The
     * `useNew` property determines whether it will be called as a constructor or not.
     */
    fnOrClass: o.Expression;
    /**
     * Regardless of whether `fnOrClass` is a constructor function or a user-defined factory, it
     * may have 0 or more parameters, which will be injected according to the `R3DependencyMetadata`
     * for those parameters.
     */
    deps: R3DependencyMetadata[];
    /**
     * Whether to interpret `fnOrClass` as a constructor function (`useNew: true`) or as a factory
     * (`useNew: false`).
     */
    useNew: boolean;
    /**
     * An expression for the function which will be used to inject dependencies. The API of this
     * function could be different, and other options control how it will be invoked.
     */
    injectFn: o.ExternalReference;
}
/**
 * Resolved type of a dependency.
 *
 * Occasionally, dependencies will have special significance which is known statically. In that
 * case the `R3ResolvedDependencyType` informs the factory generator that a particular dependency
 * should be generated specially (usually by calling a special injection function instead of the
 * standard one).
 */
export declare enum R3ResolvedDependencyType {
    /**
     * A normal token dependency.
     */
    Token = 0,
    /**
     * The dependency is for an attribute.
     *
     * The token expression is a string representing the attribute name.
     */
    Attribute = 1,
    /**
     * The dependency is for the `Injector` type itself.
     */
    Injector = 2,
    /**
     * The dependency is for `ElementRef`.
     */
    ElementRef = 3,
    /**
     * The dependency is for `TemplateRef`.
     */
    TemplateRef = 4,
    /**
     * The dependency is for `ViewContainerRef`.
     */
    ViewContainerRef = 5,
    /**
     * The dependency is for `ChangeDetectorRef`.
     */
    ChangeDetectorRef = 6
}
/**
 * Metadata representing a single dependency to be injected into a constructor or function call.
 */
export interface R3DependencyMetadata {
    /**
     * An expression representing the token or value to be injected.
     */
    token: o.Expression;
    /**
     * An enum indicating whether this dependency has special meaning to Angular and needs to be
     * injected specially.
     */
    resolved: R3ResolvedDependencyType;
    /**
     * Whether the dependency has an @Host qualifier.
     */
    host: boolean;
    /**
     * Whether the dependency has an @Optional qualifier.
     */
    optional: boolean;
    /**
     * Whether the dependency has an @Self qualifier.
     */
    self: boolean;
    /**
     * Whether the dependency has an @SkipSelf qualifier.
     */
    skipSelf: boolean;
}
/**
 * Construct a factory function expression for the given `R3FactoryMetadata`.
 */
export declare function compileFactoryFunction(meta: R3FactoryMetadata): o.Expression;
/**
 * A helper function useful for extracting `R3DependencyMetadata` from a Render2
 * `CompileTypeMetadata` instance.
 */
export declare function dependenciesFromGlobalMetadata(type: CompileTypeMetadata, outputCtx: OutputContext, reflector: CompileReflector): R3DependencyMetadata[];
