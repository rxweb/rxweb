import { DateProvider } from './date-provider'
import { ApplicationUtil } from './app-util';
import { SanitizeConfig } from '../models/config/sanitize-config'
import { ReactiveFormConfig } from "./reactive-form-config";

function isNotBlank(value: any) {
    return (value !== undefined && value !== null && value !== "");
}
function trim(value: any) {
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.trim();
    return value;
};

function ltrim(value: any) {
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.replace(/^\s+/g, '');
    return value;
}

function rtrim(value: any) {
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.replace(/\s+$/g, '');
    return value;
}

function blacklist(value: any, chars) {
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.replace(new RegExp('[$' + chars + ']+', 'g'), '');
    return value;
};

function stripLow(value: any, keepNewLines: boolean) {
    let chars: String = keepNewLines === true ? '\x00-\x09\x0B\x0C\x0E-\x1F\x7F' : '\x00-\x1F\x7F';
    return blacklist(value, chars);
}

function toBoolean(value: any, strict: boolean) {
    if (isNotBlank(value)) {
        if (strict) {
            return value === '1' || value === 'true';
        }
        return value !== '0' && value !== 'false' && value !== '';
    }
    return value;
}

function toFloat(value: any) {
    if (isNotBlank(value)) {
        var decimalSymbol = '.';
        if (ReactiveFormConfig && ReactiveFormConfig.number) {
            decimalSymbol = (ReactiveFormConfig.json && ReactiveFormConfig.json.allowDecimalSymbol) ? ReactiveFormConfig.json.allowDecimalSymbol : ReactiveFormConfig.number.decimalSymbol;
        }
            if (decimalSymbol == ',' && typeof value == "string")
                value = value.replace(',', '.');
            if (ApplicationUtil.isNumeric(value))
                return parseFloat(value)
    }
    return null;
}
function toDouble(value: any) {
    return toFloat(value)
}

function toInt(value: any, radix: number) {
    if (isNotBlank(value))
        if (ApplicationUtil.isNumeric(value))
            return parseInt(value, radix || 10);
    return null;
}

function toString(value: any, radix: number) {
    if (isNotBlank(value))
        return String(value);
    return value;
}
function whitelist(value: any, chars: string) {
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.replace(new RegExp(`[^${chars}]+`, 'g'), '');
    return value;
}

function toDate(value: any, config: any) {
    var dateProvider = new DateProvider();
    if (isNotBlank(value))
        if (typeof value === "string" && dateProvider.isValid(value, config)) {
            value = dateProvider.getDate(value);
            return value;
        }
    return null;
}

function escape(value: string) {
    if (isNotBlank(value))
        return (value.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\//g, '&#x2F;')
            .replace(/\\/g, '&#x5C;')
            .replace(/`/g, '&#96;'));
    return value;
}

function prefix(value: any, text: string) {
    if (isNotBlank(value))
        return `${text}${value}`;
    return value;
}

function suffix(value: any, text: string) {
    if (isNotBlank(value))
        return `${value}${text}`;
    return value;
}

function sanitize(value: any, config: SanitizeConfig) {
    return config.custom(value)
}

export const SANITIZERS: { [key: string]: Function } = {

    trim: trim,

    ltrim: ltrim,

    rtrim: rtrim,

    blacklist: blacklist,

    stripLow: stripLow,

    toBoolean: toBoolean,

    toDouble: toDouble,

    toFloat: toFloat,

    toInt: toInt,

    'toString': toString,

    whitelist: whitelist,

    toDate: toDate,

    escape: escape,

    prefix: prefix,

    suffix: suffix,

    sanitize: sanitize
}