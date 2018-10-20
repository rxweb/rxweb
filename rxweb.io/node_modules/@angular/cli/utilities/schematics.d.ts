/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Collection, Engine, Schematic } from '@angular-devkit/schematics';
import { FileSystemCollectionDesc, FileSystemSchematicDesc, NodeModulesEngineHost } from '@angular-devkit/schematics/tools';
export declare class UnknownCollectionError extends Error {
    constructor(collectionName: string);
}
export declare function getEngineHost(): NodeModulesEngineHost;
export declare function getEngine(): Engine<FileSystemCollectionDesc, FileSystemSchematicDesc>;
export declare function getCollection(collectionName: string): Collection<any, any>;
export declare function getSchematic(collection: Collection<any, any>, schematicName: string, allowPrivate?: boolean): Schematic<any, any>;
