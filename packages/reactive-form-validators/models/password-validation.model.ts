export interface PasswordValidation {

    digit?: boolean;

    alphabet?: boolean;

    contains?: string;

    lowerCase?: boolean;

    upperCase?: boolean;

    specialCharacter?: boolean;

    minLength?: number;

    maxLength?: number;
}
export interface PasswordValidationMessage {

    digit?: string;

    alphabet?: string;

    contains?: string;

    lowerCase?: string;

    upperCase?: string;

    specialCharacter?: string;

    minLength?: string;

    maxLength?: string;
}
