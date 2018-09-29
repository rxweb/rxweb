/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/compiler-cli/src/ngtsc/annotations/src/util" />
import { Expression, R3DependencyMetadata } from '@angular/compiler';
import * as ts from 'typescript';
import { Decorator, ReflectionHost } from '../../host';
import { Reference } from '../../metadata';
export declare function getConstructorDependencies(clazz: ts.ClassDeclaration, reflector: ReflectionHost, isCore: boolean): R3DependencyMetadata[];
export declare function referenceToExpression(ref: Reference, context: ts.SourceFile): Expression;
export declare function isAngularCore(decorator: Decorator): boolean;
/**
 * Unwrap a `ts.Expression`, removing outer type-casts or parentheses until the expression is in its
 * lowest level form.
 *
 * For example, the expression "(foo as Type)" unwraps to "foo".
 */
export declare function unwrapExpression(node: ts.Expression): ts.Expression;
