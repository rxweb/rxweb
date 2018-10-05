import { BaseConfig } from './base-config';
export interface ChoiceConfig extends BaseConfig {
    minLength?: number;
    maxLength?: number;
}
