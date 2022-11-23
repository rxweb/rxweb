import { ErrorMessageConfig } from "./error-message-config";

export class RxTranslateConfig {
    languageCode?: string;
    filePath?: string;
    cacheActiveLanguageObject?: boolean;
    cacheLanguageWiseObject?: boolean;
    globalFilePath?: string;
    preloadingStrategy?: boolean;
    controlErrorMessage?: ErrorMessageConfig;
    forNgxTranslate?: boolean;
    allowedLanguages?: string[] = [];
    loader?: any;
    isTest?: boolean;
}