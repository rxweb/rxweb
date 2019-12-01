import { BaseConfigFn } from './base-config-fn';
export interface ChoiceConfig extends BaseConfigFn<ChoiceConfig> {
    minLength?: number;
    maxLength?: number;
}
