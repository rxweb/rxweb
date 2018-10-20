/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommandScope, Option } from '../models/command';
import { SchematicCommand } from '../models/schematic-command';
export declare class NewCommand extends SchematicCommand {
    readonly name: string;
    readonly description: string;
    static aliases: string[];
    static scope: CommandScope;
    readonly allowMissingWorkspace: boolean;
    arguments: string[];
    options: Option[];
    private schematicName;
    private initialized;
    initialize(options: any): Promise<void>;
    run(options: any): Promise<number | void>;
    private parseCollectionName;
    private removeLocalOptions;
}
