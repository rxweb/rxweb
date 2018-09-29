/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { logging } from '@angular-devkit/core';
export interface CommandConstructor {
    new (context: CommandContext, logger: logging.Logger): Command;
    readonly name: string;
    aliases: string[];
    scope: CommandScope;
}
export declare enum CommandScope {
    everywhere = 0,
    inProject = 1,
    outsideProject = 2,
}
export declare enum ArgumentStrategy {
    MapToOptions = 0,
    Nothing = 1,
}
export declare abstract class Command<T = any> {
    protected _rawArgs: string[];
    allowMissingWorkspace: boolean;
    constructor(context: CommandContext, logger: logging.Logger);
    initializeRaw(args: string[]): Promise<any>;
    initialize(_options: any): Promise<void>;
    validate(_options: T): boolean | Promise<boolean>;
    printHelp(_options: T): void;
    protected printHelpUsage(name: string, args: string[], options: Option[]): void;
    protected printHelpOptions(options: Option[]): void;
    abstract run(options: T): number | void | Promise<number | void>;
    readonly abstract name: string;
    readonly abstract description: string;
    readonly abstract arguments: string[];
    readonly abstract options: Option[];
    argStrategy: ArgumentStrategy;
    hidden: boolean;
    unknown: boolean;
    static scope: CommandScope;
    static aliases: string[];
    protected readonly logger: logging.Logger;
    protected readonly project: any;
}
export interface CommandContext {
    project: any;
}
export declare abstract class Option {
    readonly abstract name: string;
    readonly abstract description: string;
    readonly default?: string | number | boolean;
    readonly required?: boolean;
    readonly abstract aliases?: string[];
    readonly abstract type: any;
    readonly format?: string;
    readonly values?: any[];
    readonly hidden?: boolean;
}
