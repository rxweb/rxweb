/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as o from './output/output_ast';
import { R3DependencyMetadata } from './render3/r3_factory';
export interface InjectableDef {
    expression: o.Expression;
    type: o.Type;
}
export interface R3InjectableMetadata {
    name: string;
    type: o.Expression;
    providedIn: o.Expression;
    useClass?: o.Expression;
    useFactory?: o.Expression;
    useExisting?: o.Expression;
    useValue?: o.Expression;
    deps?: R3DependencyMetadata[];
}
export declare function compileInjectable(meta: R3InjectableMetadata): InjectableDef;
