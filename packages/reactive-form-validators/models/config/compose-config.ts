import {
    ValidatorFn
} from "@angular/forms";
import { BaseConfig } from './base-config';

export interface ComposeConfig extends BaseConfig {
  validators:ValidatorFn[];
  messageKey?: string;
}
