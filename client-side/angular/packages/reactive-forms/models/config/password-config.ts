import { PasswordValidation } from "../index";
import { BaseConfigFn } from './base-config-fn';
export interface PasswordConfig extends BaseConfigFn<PasswordConfig>  {
    validation?: PasswordValidation;
}
