
import { BaseConfigFn } from './base-config-fn';
import { ValidatorFn } from '../interface/validator-fn';

export interface ComposeConfig extends BaseConfigFn<ComposeConfig> {
  validators:ValidatorFn[];
}
