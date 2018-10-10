import { Collection, Engine, Schematic } from '@angular-devkit/schematics';
import { FileSystemCollectionDesc, FileSystemSchematicDesc, NodeModulesEngineHost } from '@angular-devkit/schematics/tools';
export declare class UnknownCollectionError extends Error {
    constructor(collectionName: string);
}
export declare function getEngineHost(): NodeModulesEngineHost;
export declare function getEngine(): Engine<FileSystemCollectionDesc, FileSystemSchematicDesc>;
export declare function getCollection(collectionName: string): Collection<any, any>;
export declare function getSchematic(collection: Collection<any, any>, schematicName: string, allowPrivate?: boolean): Schematic<any, any>;
