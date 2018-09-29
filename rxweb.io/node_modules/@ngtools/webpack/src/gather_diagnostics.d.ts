/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';
import { Diagnostics, Program } from './ngtools_api';
export declare class CancellationToken implements ts.CancellationToken {
    private _isCancelled;
    requestCancellation(): void;
    isCancellationRequested(): boolean;
    throwIfCancellationRequested(): void;
}
export declare function hasErrors(diags: Diagnostics): boolean;
export declare function gatherDiagnostics(program: ts.Program | Program, jitMode: boolean, benchmarkLabel: string, cancellationToken?: CancellationToken): Diagnostics;
