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
