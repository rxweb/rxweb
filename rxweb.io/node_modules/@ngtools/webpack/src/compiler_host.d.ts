/// <reference types="node" />
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Path, virtualFs } from '@angular-devkit/core';
import * as fs from 'fs';
import * as ts from 'typescript';
import { WebpackResourceLoader } from './resource_loader';
export interface OnErrorFn {
    (message: string): void;
}
export declare class VirtualStats implements fs.Stats {
    protected _path: string;
    protected _ctime: Date;
    protected _mtime: Date;
    protected _atime: Date;
    protected _btime: Date;
    protected _dev: number;
    protected _ino: number;
    protected _mode: number;
    protected _uid: number;
    protected _gid: number;
    constructor(_path: string);
    isFile(): boolean;
    isDirectory(): boolean;
    isBlockDevice(): boolean;
    isCharacterDevice(): boolean;
    isSymbolicLink(): boolean;
    isFIFO(): boolean;
    isSocket(): boolean;
    readonly dev: number;
    readonly ino: number;
    readonly mode: number;
    readonly nlink: number;
    readonly uid: number;
    readonly gid: number;
    readonly rdev: number;
    readonly size: number;
    readonly blksize: number;
    readonly blocks: number;
    readonly atime: Date;
    readonly atimeMs: number;
    readonly mtime: Date;
    readonly mtimeMs: number;
    readonly ctime: Date;
    readonly ctimeMs: number;
    readonly birthtime: Date;
    readonly birthtimeMs: number;
}
export declare class VirtualDirStats extends VirtualStats {
    constructor(_fileName: string);
    isDirectory(): boolean;
    readonly size: number;
}
export declare class VirtualFileStats extends VirtualStats {
    private _sourceFile;
    private _content;
    private _bufferContent;
    constructor(_fileName: string);
    static createFromString(_fileName: string, _content: string): VirtualFileStats;
    static createFromBuffer(_fileName: string, _buffer: virtualFs.FileBuffer): VirtualFileStats;
    content: string;
    bufferContent: virtualFs.FileBuffer;
    setSourceFile(sourceFile: ts.SourceFile): void;
    getSourceFile(languageVersion: ts.ScriptTarget, setParentNodes: boolean): ts.SourceFile;
    private resetMetadata();
    isFile(): boolean;
    readonly size: number;
}
export declare class WebpackCompilerHost implements ts.CompilerHost {
    private _options;
    private _host;
    private _syncHost;
    private _files;
    private _directories;
    private _changedFiles;
    private _changedDirs;
    private _basePath;
    private _setParentNodes;
    private _cache;
    private _resourceLoader?;
    constructor(_options: ts.CompilerOptions, basePath: string, _host?: virtualFs.Host<fs.Stats>);
    private _normalizePath(path);
    denormalizePath(path: string): string;
    resolve(path: string): Path;
    private _cacheFile(fileName, stats);
    readonly dirty: boolean;
    enableCaching(): void;
    resetChangedFileTracker(): void;
    getChangedFilePaths(): string[];
    getNgFactoryPaths(): string[];
    invalidate(fileName: string): void;
    fileExists(fileName: string, delegate?: boolean): boolean;
    readFile(fileName: string): string | undefined;
    readFileBuffer(fileName: string): Buffer | undefined;
    private findVirtualFile(fileName);
    stat(path: string): VirtualStats | null;
    directoryExists(directoryName: string, delegate?: boolean): boolean;
    getFiles(path: string): string[];
    getDirectories(path: string): string[];
    getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, _onError?: OnErrorFn): ts.SourceFile | undefined;
    readonly getCancellationToken: undefined;
    getDefaultLibFileName(options: ts.CompilerOptions): string;
    readonly writeFile: (fileName: string, data: string, _writeByteOrderMark: boolean, _onError?: ((message: string) => void) | undefined, _sourceFiles?: ReadonlyArray<ts.SourceFile> | undefined) => void;
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
    setResourceLoader(resourceLoader: WebpackResourceLoader): void;
    readResource(fileName: string): string | Promise<string> | undefined;
}
export declare function workaroundResolve(path: Path | string): string;
