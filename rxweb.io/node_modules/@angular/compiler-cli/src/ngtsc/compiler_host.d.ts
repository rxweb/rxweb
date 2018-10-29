/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/compiler-cli/src/ngtsc/compiler_host" />
import * as ts from 'typescript';
/**
 * The TypeScript compiler host used by `ngtsc`.
 *
 * It's mostly identical to the native `CompilerHost`, but also includes the ability to
 * asynchronously resolve resources.
 */
export interface CompilerHost extends ts.CompilerHost {
    /**
     * Begin processing a resource file.
     *
     * When the returned Promise resolves, `loadResource` should be able to synchronously produce a
     * `string` for the given file.
     */
    preloadResource(file: string): Promise<void>;
    /**
     * Like `readFile`, but reads the contents of a resource file which may have been pre-processed
     * by `preloadResource`.
     */
    loadResource(file: string): string | undefined;
}
/**
 * Implementation of `CompilerHost` which delegates to a native TypeScript host in most cases.
 */
export declare class NgtscCompilerHost implements CompilerHost {
    private delegate;
    constructor(delegate: ts.CompilerHost);
    resolveTypeReferenceDirectives?: (names: string[], containingFile: string) => ts.ResolvedTypeReferenceDirective[];
    getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: ((message: string) => void) | undefined, shouldCreateNewSourceFile?: boolean | undefined): ts.SourceFile | undefined;
    getDefaultLibFileName(options: ts.CompilerOptions): string;
    writeFile(fileName: string, data: string, writeByteOrderMark: boolean, onError: ((message: string) => void) | undefined, sourceFiles: ReadonlyArray<ts.SourceFile>): void;
    getCurrentDirectory(): string;
    getDirectories(path: string): string[];
    getCanonicalFileName(fileName: string): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
    fileExists(fileName: string): boolean;
    readFile(fileName: string): string | undefined;
    loadResource(file: string): string | undefined;
    preloadResource(file: string): Promise<void>;
}
