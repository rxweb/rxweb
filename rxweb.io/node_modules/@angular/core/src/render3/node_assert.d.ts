/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LNode, TNodeType } from './interfaces/node';
export declare function assertNodeType(node: LNode, type: TNodeType): void;
export declare function assertNodeOfPossibleTypes(node: LNode, ...types: TNodeType[]): void;
