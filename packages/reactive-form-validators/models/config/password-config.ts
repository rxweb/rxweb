import { PasswordValidation } from "../index";
import { PasswordValidationMessage } from "../password-validation.model";
export interface PasswordConfig {
    validation?: PasswordValidation;
    conditionalExpression?: string | Function;
    message?: PasswordValidationMessage;
    messageKey?: PasswordValidationMessage;
    dynamicConfig?: (
        parent: { [key: string]: any },
        root: { [key: string]: any },
        config: any) => any
}
