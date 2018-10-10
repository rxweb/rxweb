/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Command } from '../models/command';
export interface Options {
    keyword: string;
    search?: boolean;
}
export declare class DocCommand extends Command {
    readonly name: string;
    readonly description: string;
    static aliases: string[];
    readonly arguments: string[];
    readonly options: {
        name: string;
        aliases: string[];
        type: BooleanConstructor;
        default: boolean;
        description: string;
    }[];
    validate(options: Options): boolean;
    run(options: Options): Promise<any>;
}
