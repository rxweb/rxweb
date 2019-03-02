import {DateProvider} from './date-provider'
import { ApplicationUtil } from './app-util';

function isNotBlank(value:any) {
    return (value !== undefined && value !== null && value !== "");
}
function trim(value:any){
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.trim();
    return value;
};

function ltrim(value:any){
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.replace(/^\s+/g, '');
    return value;
}

function rtrim(value:any){
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.replace(/\s+$/g, '');
    return value;
}

function blacklist(value: any, chars) {
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.replace(new RegExp('[$' + chars + ']+','g'), '');
    return value;
};

function stripLow(value:any,keepNewLines:boolean){
    let chars:String = keepNewLines === true ? '\x00-\x09\x0B\x0C\x0E-\x1F\x7F' : '\x00-\x1F\x7F';
    return blacklist(value,chars);
}

function toBoolean(value:any,strict:boolean){
    if (isNotBlank(value)){
        if (strict) {
            return value === '1' || value === 'true';
          }
          return value !== '0' && value !== 'false' && value !== '';
    }
    return value;
}

function toFloat(value:any){
    if (isNotBlank(value) )
        if(ApplicationUtil.isNumeric(value))
            return parseFloat(value)
    return null;
}
function toDouble(value:any){
        return toFloat(value)
}

function toInt(value:any,radix:number){
    if (isNotBlank(value))
        if( ApplicationUtil.isNumeric(value))
            return parseInt(value, radix || 10);
    return null;
}

function toString(value:any,radix:number){
    if (isNotBlank(value))
        return String(value);
    return value;
}
function whitelist(value:any,chars:string){
    if (isNotBlank(value))
    if (typeof value === "string")
        return value.replace(new RegExp(`[^${chars}]+`, 'g'), '');
    return value;
}

function toDate(value:any){
    var dateProvider = new DateProvider();
    if(isNotBlank(value))
        if(typeof value === "string" && dateProvider.isValid(value)){
            value = dateProvider.getDate(value);
            return value;
        }
    return null;
}

export const SANITIZERS: { [key: string]: Function } = {

    trim:trim,

    ltrim:ltrim,

    rtrim:rtrim,

    blacklist:blacklist,

    stripLow:stripLow,

    toBoolean:toBoolean,

    toDouble:toDouble,

    toFloat:toFloat,

    toInt:toInt,

    'toString':toString,

    whitelist:whitelist,

    toDate:toDate

}