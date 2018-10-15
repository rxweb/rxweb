import { PasswordValidation } from "../index";

export interface PasswordConfig {
    validation: PasswordValidation;
    message?: string;
}
