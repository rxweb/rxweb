import {
    ValidatorFn
} from "@angular/forms";
import { BaseConfigFn } from './base-config-fn';

export interface ComposeConfig extends BaseConfigFn<ComposeConfig> {
  validators:ValidatorFn[];
}
