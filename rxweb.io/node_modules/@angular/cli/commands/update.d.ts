/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommandScope, Option } from '../models/command';
import { CoreSchematicOptions, SchematicCommand } from '../models/schematic-command';
export interface UpdateOptions extends CoreSchematicOptions {
    next: boolean;
    schematic?: boolean;
}
export declare class UpdateCommand extends SchematicCommand {
    readonly name: string;
    readonly description: string;
    static aliases: string[];
    static scope: CommandScope;
    arguments: string[];
    options: Option[];
    readonly allowMissingWorkspace: boolean;
    private collectionName;
    private schematicName;
    private initialized;
    initialize(options: any): Promise<void>;
    validate(options: any): Promise<boolean>;
    run(options: UpdateOptions): Promise<number | void>;
}
