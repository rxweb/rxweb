import {Injectable } from "@angular/core"

@Injectable()
export class RegularExpression {
    isDigits(value: any): Boolean {
        return /^[0-9]$/.test(value);
    }

    isAlphabates(value: any): Boolean {
        return /^[a-zA-Z]$/.test(value)
    }

    isLowerCase(value: any): Boolean {
        return /^[a-z]$/.test(value)
    }

    isUpperCase(value: any): Boolean {
        return /^[A-Z]$/.test(value)
    }

    isAlphaNumeric(value: any): Boolean {
        return /^[0-9a-zA-Z]$/.test(value)
    }

    isZero(value: any) {
        return value == 0;
    }

    commaRegex(): RegExp {
        return new RegExp(",", "g");
    }
}
