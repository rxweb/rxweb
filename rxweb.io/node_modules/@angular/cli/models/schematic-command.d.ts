/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ArgumentStrategy, Command, Option } from './command';
export interface CoreSchematicOptions {
    dryRun: boolean;
    force: boolean;
}
export interface RunSchematicOptions {
    collectionName: string;
    schematicName: string;
    schematicOptions: any;
    debug?: boolean;
    dryRun: boolean;
    force: boolean;
    showNothingDone?: boolean;
}
export interface GetOptionsOptions {
    collectionName: string;
    schematicName: string;
}
export interface GetOptionsResult {
    options: Option[];
    arguments: Option[];
}
export declare abstract class SchematicCommand extends Command {
    readonly options: Option[];
    readonly allowPrivateSchematics: boolean;
    private _host;
    private _workspace;
    private _deAliasedName;
    private _originalOptions;
    argStrategy: ArgumentStrategy;
    protected readonly coreOptions: Option[];
    readonly arguments: string[];
    initialize(_options: any): Promise<void>;
    protected setPathOptions(options: any, workingDir: string): any;
    protected runSchematic(options: RunSchematicOptions): Promise<number | void>;
    protected removeCoreOptions(options: any): any;
    protected getOptions(options: GetOptionsOptions): Promise<GetOptionsResult>;
    private _loadWorkspace;
    private _cleanDefaults;
    private readDefaults;
}
