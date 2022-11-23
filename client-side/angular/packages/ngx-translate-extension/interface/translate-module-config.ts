import { TranslateModuleConfig as NgxTranslateModuleConfig } from '@ngx-translate/core';
import { ErrorMessageConfig } from "@rxweb/translate"
export interface TranslateModuleConfig extends NgxTranslateModuleConfig {
    globalFilePath?: string;
    filePath?: string;
    controlErrorMessage?: ErrorMessageConfig;
}