import { Command, Option } from '../models/command';
export declare class EjectCommand extends Command {
    readonly name: string;
    readonly description: string;
    readonly arguments: string[];
    readonly options: Option[];
    static aliases: never[];
    run(): void;
}
