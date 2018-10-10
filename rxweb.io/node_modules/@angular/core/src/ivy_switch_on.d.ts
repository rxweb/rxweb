/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { compileComponent, compileDirective } from './render3/jit/directive';
import { compileInjectable } from './render3/jit/injectable';
import { compileNgModule } from './render3/jit/module';
import { compilePipe } from './render3/jit/pipe';
export declare const ivyEnabled: boolean;
export declare const R3_COMPILE_COMPONENT: typeof compileComponent;
export declare const R3_COMPILE_DIRECTIVE: typeof compileDirective;
export declare const R3_COMPILE_INJECTABLE: typeof compileInjectable;
export declare const R3_COMPILE_NGMODULE: typeof compileNgModule;
export declare const R3_COMPILE_PIPE: typeof compilePipe;
