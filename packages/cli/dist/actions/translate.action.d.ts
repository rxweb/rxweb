import { IoOperation } from "@rxweb/i18n";
export declare class TranslateAction {
    private args;
    constructor(args: string[]);
    perform(): Promise<void>;
    ioOperation: IoOperation;
}
