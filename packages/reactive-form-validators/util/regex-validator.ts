import { PasswordValidation } from "../models/password-validation.model";
import { RegExRule } from "./regex-rules";
import { ReactiveFormConfig } from "./reactive-form-config";

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

  static isNotBlank(value: any, isRemoveSpace: boolean = false): boolean {
    return !isRemoveSpace ?
      (value === 0) || (value !== undefined && value !== null && value !== "") :
      (value === 0) || (value !== undefined && value !== null && String(value).trim() !== "")
  }
    static isValidPassword(passwordValidation: PasswordValidation, value: string): { [key: string]: any } {
        let isValid = false;
        let jObject: { [key: string]: any } = {};
        let keyName = "status";
        let objectProperties = Object.getOwnPropertyNames(passwordValidation)
        for (let propertyName of objectProperties) {
            switch (propertyName) {
                case ALPHABET:
                    isValid = RegexValidator.isExits(value, RegExRule.alphaExits);
                    keyName = ALPHABET;
                    break;
                case DIGIT:
                    isValid = RegexValidator.isValid(value, RegExRule.isDigitExits);
                    keyName = DIGIT;
                    break;
                case CONTAINS:
                    isValid = value.indexOf(passwordValidation[CONTAINS]) != -1;
                    keyName = CONTAINS;
                    break;
                case LOWERCASE:
                    isValid = RegexValidator.isValid(value, RegExRule.lowerCase);
                    keyName = LOWERCASE;
                    break;
                case UPPERCASE:
                    isValid = RegexValidator.isValid(value, RegExRule.upperCase);
                    keyName = UPPERCASE;
                    break;
                case SPECIAL_CHARACTER:
                    isValid = RegexValidator.isExits(value, RegExRule.specialCharacter);
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

    static isZero(value: any) {
        return value == 0;
    }

    static commaRegex(): RegExp {
        return new RegExp(",", "g");
    }
}
