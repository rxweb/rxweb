import { CommandScope, Option } from '../models/command';
import { SchematicCommand } from '../models/schematic-command';
export declare class AddCommand extends SchematicCommand {
    readonly name: string;
    readonly description: string;
    readonly allowPrivateSchematics: boolean;
    static aliases: never[];
    static scope: CommandScope;
    arguments: string[];
    options: Option[];
    private _parseSchematicOptions(collectionName);
    validate(options: any): boolean;
    run(options: any): Promise<number | void>;
}
