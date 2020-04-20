import { TranslatePathConfig } from "./translate-path-config";
import { TranslateActionConfig } from "./translate-action-config";

export interface TranslateConfig{
    defaultLanguage: string;
    allowedLanguages: string[];
    path: TranslatePathConfig;
    action: TranslateActionConfig;
}
