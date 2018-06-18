import { CreditCardRegex } from './credit-card-regex'

export const RegExRule: { [key: string]: any } = {

    Alpha: /^[a-zA-Z]+$/,

    AlphaWithSpace: /^[a-zA-Z\s]+$/,

    OnlyDigit: /^[0-9]+$/,

    IsDigitExits: /\d/g,

    LowerCase: /[a-z]/g,

    UpperCase: /[A-Z]/g,

    SpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/g,

    AdvancedEmail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

    BasicEmail: /^(([^<>()\[\]\\.,,:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    AlphaNumeric: /^[0-9a-zA-Z]+$/,

    AlphaNumericWithSpace: /^[0-9a-zA-Z\s]+$/,

    HexColor: /^#?([0-9A-F]{3}|[0-9A-F]{6})$/,

    Float: /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,

    Decimal: /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/,

    HexaDecimal: /^[0-9A-F]+$/i,

    date:/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,

    CreditCard: new CreditCardRegex(),
}


