/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ngc from '@angular/compiler-cli';
import * as ngtools from '@angular/compiler-cli/ngtools2';
import * as ts from 'typescript';
export declare const DEFAULT_ERROR_CODE = 100;
export declare const UNKNOWN_ERROR_CODE = 500;
export declare const SOURCE: "angular";
export declare type CompilerOptions = ngc.CompilerOptions;
export declare type CompilerHost = ngtools.CompilerHost;
export declare type Program = ngtools.Program;
export declare type Diagnostic = ngtools.Diagnostic;
export declare type Diagnostics = ReadonlyArray<ts.Diagnostic | Diagnostic>;
export declare function CompilerCliIsSupported(): void;
export declare const VERSION: typeof ngc.VERSION;
export declare const __NGTOOLS_PRIVATE_API_2: any;
export declare const readConfiguration: typeof ngc.readConfiguration;
export declare const createProgram: typeof ngtools.createProgram;
export declare const createCompilerHost: typeof ngtools.createCompilerHost;
export declare const formatDiagnostics: typeof ngtools.formatDiagnostics;
export declare const EmitFlags: typeof ngtools.EmitFlags;
