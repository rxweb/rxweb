import { ErrorMessageBindingStrategy } from '../enums/error-message-binding-strategy'
import { CondtionalStrategyOptions } from './conditional-strategy-options'
import { SanitizerConfig } from './sanitizer-config'
export interface FormControlStrategyOptions {
    conditional?: CondtionalStrategyOptions;
    messageBindingStrategy?: ErrorMessageBindingStrategy;
    sanitize?: SanitizerConfig
}