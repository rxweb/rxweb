import { Command, Option } from '../models/command';
export declare class VersionCommand extends Command {
    readonly name: string;
    readonly description: string;
    static aliases: string[];
    readonly arguments: string[];
    readonly options: Option[];
    run(): void;
    private getVersion(moduleName, projectNodeModules, cliNodeModules);
}
