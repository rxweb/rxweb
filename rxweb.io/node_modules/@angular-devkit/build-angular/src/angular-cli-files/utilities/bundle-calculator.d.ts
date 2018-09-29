/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Budget } from '../../browser/schema';
export interface Compilation {
    assets: any;
    chunks: any[];
    warnings: string[];
    errors: string[];
}
export interface Size {
    size: number;
    label?: string;
}
export declare function calculateSizes(budget: Budget, compilation: Compilation): Size[];
export declare abstract class Calculator {
    protected budget: Budget;
    protected compilation: Compilation;
    constructor(budget: Budget, compilation: Compilation);
    abstract calculate(): Size[];
}
/**
 * Calculate the bytes given a string value.
 */
export declare function calculateBytes(val: string, baseline?: string, factor?: ('pos' | 'neg')): number;
