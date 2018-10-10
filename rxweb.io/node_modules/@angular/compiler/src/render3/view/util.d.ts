/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ConstantPool } from '../../constant_pool';
import * as o from '../../output/output_ast';
import * as t from '../r3_ast';
import { R3QueryMetadata } from './api';
/** Name of the temporary to use during data binding */
export declare const TEMPORARY_NAME = "_t";
/** Name of the context parameter passed into a template function */
export declare const CONTEXT_NAME = "ctx";
/** Name of the RenderFlag passed into a template function */
export declare const RENDER_FLAGS = "rf";
/** The prefix reference variables */
export declare const REFERENCE_PREFIX = "_r";
/** The name of the implicit context reference */
export declare const IMPLICIT_REFERENCE = "$implicit";
/** Name of the i18n attributes **/
export declare const I18N_ATTR = "i18n";
export declare const I18N_ATTR_PREFIX = "i18n-";
/** I18n separators for metadata **/
export declare const MEANING_SEPARATOR = "|";
export declare const ID_SEPARATOR = "@@";
/**
 * Creates an allocator for a temporary variable.
 *
 * A variable declaration is added to the statements the first time the allocator is invoked.
 */
export declare function temporaryAllocator(statements: o.Statement[], name: string): () => o.ReadVarExpr;
export declare function unsupported(feature: string): never;
export declare function invalid<T>(arg: o.Expression | o.Statement | t.Node): never;
export declare function asLiteral(value: any): o.Expression;
export declare function conditionallyCreateMapObjectLiteral(keys: {
    [key: string]: string;
}): o.Expression | null;
export declare function mapToExpression(map: {
    [key: string]: any;
}, quoted?: boolean): o.Expression;
/**
 *  Remove trailing null nodes as they are implied.
 */
export declare function trimTrailingNulls(parameters: o.Expression[]): o.Expression[];
export declare function getQueryPredicate(query: R3QueryMetadata, constantPool: ConstantPool): o.Expression;
export declare function noop(): void;
export declare class DefinitionMap {
    values: {
        key: string;
        quoted: boolean;
        value: o.Expression;
    }[];
    set(key: string, value: o.Expression | null): void;
    toLiteralMap(): o.LiteralMapExpr;
}
