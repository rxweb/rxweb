import { Command, Option } from '../models/command';
export interface ConfigOptions {
    jsonPath: string;
    value?: string;
    global?: boolean;
}
export declare class ConfigCommand extends Command {
    readonly name: string;
    readonly description: string;
    readonly arguments: string[];
    readonly options: Option[];
    run(options: ConfigOptions): 1 | undefined;
    private get(config, options);
    private set(options);
}
