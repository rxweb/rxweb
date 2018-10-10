/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Command, Option } from '../models/command';
export interface Options {
    keyword: string;
    search?: boolean;
}
export declare class GetSetCommand extends Command {
    readonly name: string;
    readonly description: string;
    readonly arguments: string[];
    readonly options: Option[];
    readonly hidden: boolean;
    run(_options: Options): Promise<void>;
}
