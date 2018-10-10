/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/compiler-cli/src/ngtsc/annotations/src/component" />
import { R3ComponentMetadata } from '@angular/compiler';
import * as ts from 'typescript';
import { Decorator, ReflectionHost } from '../../host';
import { AnalysisOutput, CompileResult, DecoratorHandler } from '../../transform';
import { ResourceLoader } from './api';
import { SelectorScopeRegistry } from './selector_scope';
/**
 * `DecoratorHandler` which handles the `@Component` annotation.
 */
export declare class ComponentDecoratorHandler implements DecoratorHandler<R3ComponentMetadata> {
    private checker;
    private reflector;
    private scopeRegistry;
    private isCore;
    private resourceLoader;
    constructor(checker: ts.TypeChecker, reflector: ReflectionHost, scopeRegistry: SelectorScopeRegistry, isCore: boolean, resourceLoader: ResourceLoader);
    private literalCache;
    detect(decorators: Decorator[]): Decorator | undefined;
    preanalyze(node: ts.ClassDeclaration, decorator: Decorator): Promise<void> | undefined;
    analyze(node: ts.ClassDeclaration, decorator: Decorator): AnalysisOutput<R3ComponentMetadata>;
    compile(node: ts.ClassDeclaration, analysis: R3ComponentMetadata): CompileResult;
    private _resolveLiteral;
}
