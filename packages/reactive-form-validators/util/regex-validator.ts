import { PasswordValidation } from "../models/password-validation.model";
import { RegExRule } from "./regex-rules";

const ALPHABET: string = "alphabet";
const DIGIT: string = "digit";
const CONTAINS: string = "contains";
const LOWERCASE: string = "lowerCase";
const UPPERCASE: string = "upperCase";
const SPECIAL_CHARACTER: string = "specialCharacter";
const MIN_LENGTH: string = "minLength";
const MAX_LENGTH: string = "maxLength";


export class RegexValidator {
    static isExits(value: any, regex: RegExp): boolean {
        return value.match(regex) != null;
    }
    static isValid(value: any, regex: RegExp): boolean {
        return regex.test(value);
    }

    static isNotBlank(value: any): boolean {
        return value != undefined && value != "" && value != null && String(value).trim() != "";
    }

    static isValidPassword(passwordValidation: PasswordValidation, value: string): { [key: string]: any } {
        let isValid = false;
        let jObject: { [key: string]: any } = {};
        let keyName = "status";
        let objectProperties = Object.getOwnPropertyNames(passwordValidation)
        for (let propertyName of objectProperties) {
            switch (propertyName) {
                case ALPHABET:
                    isValid = RegexValidator.isExits(value, RegExRule.Alpha);
                    keyName = ALPHABET;
                    break;
                case DIGIT:
                    isValid = RegexValidator.isValid(value, RegExRule.IsDigitExits);
                    keyName = DIGIT;
                    break;
                case CONTAINS:
                    isValid = value.indexOf(passwordValidation[CONTAINS]) != -1;
                    keyName = CONTAINS;
                    break;
                case LOWERCASE:
                    isValid = RegexValidator.isExits(value, RegExRule.LowerCase);
                    keyName = LOWERCASE;
                    break;
                case UPPERCASE:
                    isValid = RegexValidator.isExits(value, RegExRule.UpperCase);
                    keyName = UPPERCASE;
                    break;
                case SPECIAL_CHARACTER:
                    isValid = RegexValidator.isExits(value, RegExRule.SpecialCharacter);
                    keyName = SPECIAL_CHARACTER;
                    break;
                case MIN_LENGTH:
                    isValid = value.length >= passwordValidation[propertyName];
                    keyName = MIN_LENGTH;
                    break;
                case MAX_LENGTH:
                    isValid = value.length <= passwordValidation[propertyName];
                    keyName = MAX_LENGTH;
                    break;
            }
            if (!isValid)
                break;
        }
        return { isValid: isValid, keyName: keyName }
    }
}
