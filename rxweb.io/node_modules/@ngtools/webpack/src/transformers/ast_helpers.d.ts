/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';
import { WebpackCompilerHost } from '../compiler_host';
export declare function collectDeepNodes<T extends ts.Node>(node: ts.Node, kind: ts.SyntaxKind): T[];
export declare function getFirstNode(sourceFile: ts.SourceFile): ts.Node;
export declare function getLastNode(sourceFile: ts.SourceFile): ts.Node | null;
export declare function createTypescriptContext(content: string): {
    compilerHost: WebpackCompilerHost;
    program: ts.Program;
};
export declare function transformTypescript(content: string | undefined, transformers: ts.TransformerFactory<ts.SourceFile>[], program?: ts.Program, compilerHost?: WebpackCompilerHost): string | null | undefined;
