/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { JsonObject } from '@angular-devkit/core';
import { Command, Option } from './command';
export interface ProjectAndConfigurationOptions {
    project?: string;
    configuration?: string;
    prod: boolean;
}
export interface TargetOptions {
    target?: string;
}
export declare type ArchitectCommandOptions = ProjectAndConfigurationOptions & TargetOptions & JsonObject;
export declare abstract class ArchitectCommand extends Command<ArchitectCommandOptions> {
    private _host;
    private _architect;
    private _workspace;
    private _logger;
    protected multiTarget: boolean;
    readonly Options: Option[];
    readonly arguments: string[];
    target: string | undefined;
    initialize(options: ArchitectCommandOptions): Promise<void>;
    validate(options: ArchitectCommandOptions): boolean;
    protected mapArchitectOptions(schema: any): void;
    protected prodOption: Option;
    protected configurationOption: Option;
    protected runArchitectTarget(options: ArchitectCommandOptions): Promise<number>;
    private getProjectNamesByTarget;
    private _loadWorkspaceAndArchitect;
    private _makeTargetSpecifier;
}
