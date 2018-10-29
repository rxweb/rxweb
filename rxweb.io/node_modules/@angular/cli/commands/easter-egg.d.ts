/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Command, Option } from '../models/command';
export declare class AwesomeCommand extends Command {
    readonly name: string;
    readonly description: string;
    readonly hidden: boolean;
    readonly arguments: string[];
    readonly options: Option[];
    run(): void;
}
