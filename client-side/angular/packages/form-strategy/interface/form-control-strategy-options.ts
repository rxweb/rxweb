import { ErrorMessageBindingStrategy } from '../enums/error-message-binding-strategy'
import { CondtionalStrategyOptions } from './conditional-strategy-options'
export interface FormControlStrategyOptions {
    conditional?: CondtionalStrategyOptions;
    binding?: ErrorMessageBindingStrategy;
}