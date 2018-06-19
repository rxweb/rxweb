import { CreditCardRegex } from './credit-card-regex'

export const RegExRule: { [key: string]: any } = {

    alpha: /^[a-zA-Z]+$/,

    alphaWithSpace: /^[a-zA-Z\s]+$/,

    onlyDigit: /^[0-9]+$/,

    isDigitExits: /\d/g,

    lowerCase: /[a-z]/g,

    upperCase: /[A-Z]/g,

    specialCharacter: /[!@#$%^&*(),.?":{}|<>]/g,

    advancedEmail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

    basicEmail: /^(([^<>()\[\]\\.,,:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    alphaNumeric: /^[0-9a-zA-Z]+$/,
    
    alphaNumericWithSpace: /^[0-9a-zA-Z\s]+$/,

    hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/igm,

    float: /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,

    decimal: /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/,

    hexaDecimal: /^[0-9A-F]+$/i,

    date:/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,

    creditCard: new CreditCardRegex(),
}


