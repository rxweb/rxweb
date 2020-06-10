import { TranslateModuleConfig } from "../interface/translate-module-config";

export const configContainer:
    {
        config: TranslateModuleConfig
    } = new (class {
        config: TranslateModuleConfig;
    })();