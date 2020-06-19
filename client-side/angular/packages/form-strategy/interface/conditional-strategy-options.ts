import { ErrorMessageBindingStrategy } from "../enums/error-message-binding-strategy";
export interface CondtionalStrategyOptions {
    message?: (formGroup, rootFormGroup) => boolean;
    disable?: (formGroup, rootFormGroup) => boolean;
    messageBindingStrategy?: ErrorMessageBindingStrategy
}