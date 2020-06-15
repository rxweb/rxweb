import { ErrorMessageBindingStrategy } from "../enums/error-message-binding-strategy";
import { I18nPackage } from '../enums/i18n-package'
export interface FormErrorMessageModuleConfig {
    bindingStrategy?: ErrorMessageBindingStrategy;
    i18n?: I18nPackage;
    messagePath: string;
    language?: string;
    data?: { [key: string]: any }
}