/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NumberFormatStyle, NumberSymbol, getLocaleNumberFormat, getLocaleNumberSymbol, getNumberOfCurrencyDigits } from './locale_data_api';
/** @type {?} */
export const NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
/** @type {?} */
const MAX_DIGITS = 22;
/** @type {?} */
const DECIMAL_SEP = '.';
/** @type {?} */
const ZERO_CHAR = '0';
/** @type {?} */
const PATTERN_SEP = ';';
/** @type {?} */
const GROUP_SEP = ',';
/** @type {?} */
const DIGIT_CHAR = '#';
/** @type {?} */
const CURRENCY_CHAR = '¤';
/** @type {?} */
const PERCENT_CHAR = '%';
/**
 * Transforms a number to a locale string based on a style and a format
 * @param {?} value
 * @param {?} pattern
 * @param {?} locale
 * @param {?} groupSymbol
 * @param {?} decimalSymbol
 * @param {?=} digitsInfo
 * @param {?=} isPercent
 * @return {?}
 */
function formatNumberToLocaleString(value, pattern, locale, groupSymbol, decimalSymbol, digitsInfo, isPercent = false) {
    /** @type {?} */
    let formattedText = '';
    /** @type {?} */
    let isZero = false;
    if (!isFinite(value)) {
        formattedText = getLocaleNumberSymbol(locale, NumberSymbol.Infinity);
    }
    else {
        /** @type {?} */
        let parsedNumber = parseNumber(value);
        if (isPercent) {
            parsedNumber = toPercent(parsedNumber);
        }
        /** @type {?} */
        let minInt = pattern.minInt;
        /** @type {?} */
        let minFraction = pattern.minFrac;
        /** @type {?} */
        let maxFraction = pattern.maxFrac;
        if (digitsInfo) {
            /** @type {?} */
            const parts = digitsInfo.match(NUMBER_FORMAT_REGEXP);
            if (parts === null) {
                throw new Error(`${digitsInfo} is not a valid digit info`);
            }
            /** @type {?} */
            const minIntPart = parts[1];
            /** @type {?} */
            const minFractionPart = parts[3];
            /** @type {?} */
            const maxFractionPart = parts[5];
            if (minIntPart != null) {
                minInt = parseIntAutoRadix(minIntPart);
            }
            if (minFractionPart != null) {
                minFraction = parseIntAutoRadix(minFractionPart);
            }
            if (maxFractionPart != null) {
                maxFraction = parseIntAutoRadix(maxFractionPart);
            }
            else if (minFractionPart != null && minFraction > maxFraction) {
                maxFraction = minFraction;
            }
        }
        roundNumber(parsedNumber, minFraction, maxFraction);
        /** @type {?} */
        let digits = parsedNumber.digits;
        /** @type {?} */
        let integerLen = parsedNumber.integerLen;
        /** @type {?} */
        const exponent = parsedNumber.exponent;
        /** @type {?} */
        let decimals = [];
        isZero = digits.every(d => !d);
        // pad zeros for small numbers
        for (; integerLen < minInt; integerLen++) {
            digits.unshift(0);
        }
        // pad zeros for small numbers
        for (; integerLen < 0; integerLen++) {
            digits.unshift(0);
        }
        // extract decimals digits
        if (integerLen > 0) {
            decimals = digits.splice(integerLen, digits.length);
        }
        else {
            decimals = digits;
            digits = [0];
        }
        /** @type {?} */
        const groups = [];
        if (digits.length >= pattern.lgSize) {
            groups.unshift(digits.splice(-pattern.lgSize, digits.length).join(''));
        }
        while (digits.length > pattern.gSize) {
            groups.unshift(digits.splice(-pattern.gSize, digits.length).join(''));
        }
        if (digits.length) {
            groups.unshift(digits.join(''));
        }
        formattedText = groups.join(getLocaleNumberSymbol(locale, groupSymbol));
        // append the decimal digits
        if (decimals.length) {
            formattedText += getLocaleNumberSymbol(locale, decimalSymbol) + decimals.join('');
        }
        if (exponent) {
            formattedText += getLocaleNumberSymbol(locale, NumberSymbol.Exponential) + '+' + exponent;
        }
    }
    if (value < 0 && !isZero) {
        formattedText = pattern.negPre + formattedText + pattern.negSuf;
    }
    else {
        formattedText = pattern.posPre + formattedText + pattern.posSuf;
    }
    return formattedText;
}
/**
 * \@ngModule CommonModule
 * \@description
 *
 * Formats a number as currency using locale rules.
 *
 * Use `currency` to format a number as currency.
 *
 * Where:
 * - `value` is a number.
 * - `locale` is a `string` defining the locale to use.
 * - `currency` is the string that represents the currency, it can be its symbol or its name.
 * - `currencyCode` is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code, such
 *    as `USD` for the US dollar and `EUR` for the euro.
 * - `digitInfo` See {\@link DecimalPipe} for more details.
 *
 *
 * @param {?} value
 * @param {?} locale
 * @param {?} currency
 * @param {?=} currencyCode
 * @param {?=} digitsInfo
 * @return {?}
 */
export function formatCurrency(value, locale, currency, currencyCode, digitsInfo) {
    /** @type {?} */
    const format = getLocaleNumberFormat(locale, NumberFormatStyle.Currency);
    /** @type {?} */
    const pattern = parseNumberFormat(format, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign));
    pattern.minFrac = getNumberOfCurrencyDigits(/** @type {?} */ ((currencyCode)));
    pattern.maxFrac = pattern.minFrac;
    /** @type {?} */
    const res = formatNumberToLocaleString(value, pattern, locale, NumberSymbol.CurrencyGroup, NumberSymbol.CurrencyDecimal, digitsInfo);
    return res
        .replace(CURRENCY_CHAR, currency)
        // if we have 2 time the currency character, the second one is ignored
        .replace(CURRENCY_CHAR, '');
}
/**
 * \@ngModule CommonModule
 * \@description
 *
 * Formats a number as a percentage according to locale rules.
 *
 * Where:
 * - `value` is a number.
 * - `locale` is a `string` defining the locale to use.
 * - `digitInfo` See {\@link DecimalPipe} for more details.
 *
 *
 * @param {?} value
 * @param {?} locale
 * @param {?=} digitsInfo
 * @return {?}
 */
export function formatPercent(value, locale, digitsInfo) {
    /** @type {?} */
    const format = getLocaleNumberFormat(locale, NumberFormatStyle.Percent);
    /** @type {?} */
    const pattern = parseNumberFormat(format, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign));
    /** @type {?} */
    const res = formatNumberToLocaleString(value, pattern, locale, NumberSymbol.Group, NumberSymbol.Decimal, digitsInfo, true);
    return res.replace(new RegExp(PERCENT_CHAR, 'g'), getLocaleNumberSymbol(locale, NumberSymbol.PercentSign));
}
/**
 * \@ngModule CommonModule
 * \@description
 *
 * Formats a number as text. Group sizing and separator and other locale-specific
 * configurations are based on the locale.
 *
 * Where:
 * - `value` is a number.
 * - `locale` is a `string` defining the locale to use.
 * - `digitInfo` See {\@link DecimalPipe} for more details.
 *
 *
 * @param {?} value
 * @param {?} locale
 * @param {?=} digitsInfo
 * @return {?}
 */
export function formatNumber(value, locale, digitsInfo) {
    /** @type {?} */
    const format = getLocaleNumberFormat(locale, NumberFormatStyle.Decimal);
    /** @type {?} */
    const pattern = parseNumberFormat(format, getLocaleNumberSymbol(locale, NumberSymbol.MinusSign));
    return formatNumberToLocaleString(value, pattern, locale, NumberSymbol.Group, NumberSymbol.Decimal, digitsInfo);
}
/**
 * @record
 */
function ParsedNumberFormat() { }
/** @type {?} */
ParsedNumberFormat.prototype.minInt;
/** @type {?} */
ParsedNumberFormat.prototype.minFrac;
/** @type {?} */
ParsedNumberFormat.prototype.maxFrac;
/** @type {?} */
ParsedNumberFormat.prototype.posPre;
/** @type {?} */
ParsedNumberFormat.prototype.posSuf;
/** @type {?} */
ParsedNumberFormat.prototype.negPre;
/** @type {?} */
ParsedNumberFormat.prototype.negSuf;
/** @type {?} */
ParsedNumberFormat.prototype.gSize;
/** @type {?} */
ParsedNumberFormat.prototype.lgSize;
/**
 * @param {?} format
 * @param {?=} minusSign
 * @return {?}
 */
function parseNumberFormat(format, minusSign = '-') {
    /** @type {?} */
    const p = {
        minInt: 1,
        minFrac: 0,
        maxFrac: 0,
        posPre: '',
        posSuf: '',
        negPre: '',
        negSuf: '',
        gSize: 0,
        lgSize: 0
    };
    /** @type {?} */
    const patternParts = format.split(PATTERN_SEP);
    /** @type {?} */
    const positive = patternParts[0];
    /** @type {?} */
    const negative = patternParts[1];
    /** @type {?} */
    const positiveParts = positive.indexOf(DECIMAL_SEP) !== -1 ?
        positive.split(DECIMAL_SEP) :
        [
            positive.substring(0, positive.lastIndexOf(ZERO_CHAR) + 1),
            positive.substring(positive.lastIndexOf(ZERO_CHAR) + 1)
        ];
    /** @type {?} */
    const integer = positiveParts[0];
    /** @type {?} */
    const fraction = positiveParts[1] || '';
    p.posPre = integer.substr(0, integer.indexOf(DIGIT_CHAR));
    for (let i = 0; i < fraction.length; i++) {
        /** @type {?} */
        const ch = fraction.charAt(i);
        if (ch === ZERO_CHAR) {
            p.minFrac = p.maxFrac = i + 1;
        }
        else if (ch === DIGIT_CHAR) {
            p.maxFrac = i + 1;
        }
        else {
            p.posSuf += ch;
        }
    }
    /** @type {?} */
    const groups = integer.split(GROUP_SEP);
    p.gSize = groups[1] ? groups[1].length : 0;
    p.lgSize = (groups[2] || groups[1]) ? (groups[2] || groups[1]).length : 0;
    if (negative) {
        /** @type {?} */
        const trunkLen = positive.length - p.posPre.length - p.posSuf.length;
        /** @type {?} */
        const pos = negative.indexOf(DIGIT_CHAR);
        p.negPre = negative.substr(0, pos).replace(/'/g, '');
        p.negSuf = negative.substr(pos + trunkLen).replace(/'/g, '');
    }
    else {
        p.negPre = minusSign + p.posPre;
        p.negSuf = p.posSuf;
    }
    return p;
}
/**
 * @record
 */
function ParsedNumber() { }
/** @type {?} */
ParsedNumber.prototype.digits;
/** @type {?} */
ParsedNumber.prototype.exponent;
/** @type {?} */
ParsedNumber.prototype.integerLen;
/**
 * @param {?} parsedNumber
 * @return {?}
 */
function toPercent(parsedNumber) {
    // if the number is 0, don't do anything
    if (parsedNumber.digits[0] === 0) {
        return parsedNumber;
    }
    /** @type {?} */
    const fractionLen = parsedNumber.digits.length - parsedNumber.integerLen;
    if (parsedNumber.exponent) {
        parsedNumber.exponent += 2;
    }
    else {
        if (fractionLen === 0) {
            parsedNumber.digits.push(0, 0);
        }
        else if (fractionLen === 1) {
            parsedNumber.digits.push(0);
        }
        parsedNumber.integerLen += 2;
    }
    return parsedNumber;
}
/**
 * Parses a number.
 * Significant bits of this parse algorithm came from https://github.com/MikeMcl/big.js/
 * @param {?} num
 * @return {?}
 */
function parseNumber(num) {
    /** @type {?} */
    let numStr = Math.abs(num) + '';
    /** @type {?} */
    let exponent = 0;
    /** @type {?} */
    let digits;
    /** @type {?} */
    let integerLen;
    /** @type {?} */
    let i;
    /** @type {?} */
    let j;
    /** @type {?} */
    let zeros;
    // Decimal point?
    if ((integerLen = numStr.indexOf(DECIMAL_SEP)) > -1) {
        numStr = numStr.replace(DECIMAL_SEP, '');
    }
    // Exponential form?
    if ((i = numStr.search(/e/i)) > 0) {
        // Work out the exponent.
        if (integerLen < 0)
            integerLen = i;
        integerLen += +numStr.slice(i + 1);
        numStr = numStr.substring(0, i);
    }
    else if (integerLen < 0) {
        // There was no decimal point or exponent so it is an integer.
        integerLen = numStr.length;
    }
    // Count the number of leading zeros.
    for (i = 0; numStr.charAt(i) === ZERO_CHAR; i++) { /* empty */
        /* empty */
    }
    if (i === (zeros = numStr.length)) {
        // The digits are all zero.
        digits = [0];
        integerLen = 1;
    }
    else {
        // Count the number of trailing zeros
        zeros--;
        while (numStr.charAt(zeros) === ZERO_CHAR)
            zeros--;
        // Trailing zeros are insignificant so ignore them
        integerLen -= i;
        digits = [];
        // Convert string to array of digits without leading/trailing zeros.
        for (j = 0; i <= zeros; i++, j++) {
            digits[j] = Number(numStr.charAt(i));
        }
    }
    // If the number overflows the maximum allowed digits then use an exponent.
    if (integerLen > MAX_DIGITS) {
        digits = digits.splice(0, MAX_DIGITS - 1);
        exponent = integerLen - 1;
        integerLen = 1;
    }
    return { digits, exponent, integerLen };
}
/**
 * Round the parsed number to the specified number of decimal places
 * This function changes the parsedNumber in-place
 * @param {?} parsedNumber
 * @param {?} minFrac
 * @param {?} maxFrac
 * @return {?}
 */
function roundNumber(parsedNumber, minFrac, maxFrac) {
    if (minFrac > maxFrac) {
        throw new Error(`The minimum number of digits after fraction (${minFrac}) is higher than the maximum (${maxFrac}).`);
    }
    /** @type {?} */
    let digits = parsedNumber.digits;
    /** @type {?} */
    let fractionLen = digits.length - parsedNumber.integerLen;
    /** @type {?} */
    const fractionSize = Math.min(Math.max(minFrac, fractionLen), maxFrac);
    /** @type {?} */
    let roundAt = fractionSize + parsedNumber.integerLen;
    /** @type {?} */
    let digit = digits[roundAt];
    if (roundAt > 0) {
        // Drop fractional digits beyond `roundAt`
        digits.splice(Math.max(parsedNumber.integerLen, roundAt));
        // Set non-fractional digits beyond `roundAt` to 0
        for (let j = roundAt; j < digits.length; j++) {
            digits[j] = 0;
        }
    }
    else {
        // We rounded to zero so reset the parsedNumber
        fractionLen = Math.max(0, fractionLen);
        parsedNumber.integerLen = 1;
        digits.length = Math.max(1, roundAt = fractionSize + 1);
        digits[0] = 0;
        for (let i = 1; i < roundAt; i++)
            digits[i] = 0;
    }
    if (digit >= 5) {
        if (roundAt - 1 < 0) {
            for (let k = 0; k > roundAt; k--) {
                digits.unshift(0);
                parsedNumber.integerLen++;
            }
            digits.unshift(1);
            parsedNumber.integerLen++;
        }
        else {
            digits[roundAt - 1]++;
        }
    }
    // Pad out with zeros to get the required fraction length
    for (; fractionLen < Math.max(0, fractionSize); fractionLen++)
        digits.push(0);
    /** @type {?} */
    let dropTrailingZeros = fractionSize !== 0;
    /** @type {?} */
    const minLen = minFrac + parsedNumber.integerLen;
    /** @type {?} */
    const carry = digits.reduceRight(function (carry, d, i, digits) {
        d = d + carry;
        digits[i] = d < 10 ? d : d - 10; // d % 10
        if (dropTrailingZeros) {
            // Do not keep meaningless fractional trailing zeros (e.g. 15.52000 --> 15.52)
            if (digits[i] === 0 && i >= minLen) {
                digits.pop();
            }
            else {
                dropTrailingZeros = false;
            }
        }
        return d >= 10 ? 1 : 0; // Math.floor(d / 10);
    }, 0);
    if (carry) {
        digits.unshift(carry);
        parsedNumber.integerLen++;
    }
}
/**
 * @param {?} text
 * @return {?}
 */
export function parseIntAutoRadix(text) {
    /** @type {?} */
    const result = parseInt(text);
    if (isNaN(result)) {
        throw new Error('Invalid integer literal when parsing ' + text);
    }
    return result;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0X251bWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9zcmMvaTE4bi9mb3JtYXRfbnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSx5QkFBeUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDOztBQUUzSSxhQUFhLG9CQUFvQixHQUFHLDZCQUE2QixDQUFDOztBQUNsRSxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBQ3RCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQzs7QUFDeEIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDOztBQUN0QixNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7O0FBQ3hCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQzs7QUFDdEIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDOztBQUN2QixNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUM7O0FBQzFCLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7O0FBS3pCLG9DQUNJLEtBQWEsRUFBRSxPQUEyQixFQUFFLE1BQWMsRUFBRSxXQUF5QixFQUNyRixhQUEyQixFQUFFLFVBQW1CLEVBQUUsU0FBUyxHQUFHLEtBQUs7O0lBQ3JFLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQzs7SUFDdkIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRW5CLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDcEIsYUFBYSxHQUFHLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDdEU7U0FBTTs7UUFDTCxJQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEMsSUFBSSxTQUFTLEVBQUU7WUFDYixZQUFZLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3hDOztRQUVELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7O1FBQzVCLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7O1FBQ2xDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFFbEMsSUFBSSxVQUFVLEVBQUU7O1lBQ2QsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3JELElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLFVBQVUsNEJBQTRCLENBQUMsQ0FBQzthQUM1RDs7WUFDRCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQzVCLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDakMsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtnQkFDdEIsTUFBTSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsSUFBSSxlQUFlLElBQUksSUFBSSxFQUFFO2dCQUMzQixXQUFXLEdBQUcsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDbEQ7WUFDRCxJQUFJLGVBQWUsSUFBSSxJQUFJLEVBQUU7Z0JBQzNCLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNsRDtpQkFBTSxJQUFJLGVBQWUsSUFBSSxJQUFJLElBQUksV0FBVyxHQUFHLFdBQVcsRUFBRTtnQkFDL0QsV0FBVyxHQUFHLFdBQVcsQ0FBQzthQUMzQjtTQUNGO1FBRUQsV0FBVyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7O1FBRXBELElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7O1FBQ2pDLElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUM7O1FBQ3pDLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7O1FBQ3ZDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBRy9CLE9BQU8sVUFBVSxHQUFHLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRTtZQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25COztRQUdELE9BQU8sVUFBVSxHQUFHLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRTtZQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25COztRQUdELElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JEO2FBQU07WUFDTCxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ2xCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2Q7O1FBR0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsT0FBTyxNQUFNLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdkU7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDakM7UUFFRCxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQzs7UUFHeEUsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ25CLGFBQWEsSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuRjtRQUVELElBQUksUUFBUSxFQUFFO1lBQ1osYUFBYSxJQUFJLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQztTQUMzRjtLQUNGO0lBRUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ3hCLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0tBQ2pFO1NBQU07UUFDTCxhQUFhLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxhQUFhLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztLQUNqRTtJQUVELE9BQU8sYUFBYSxDQUFDO0NBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JELE1BQU0seUJBQ0YsS0FBYSxFQUFFLE1BQWMsRUFBRSxRQUFnQixFQUFFLFlBQXFCLEVBQ3RFLFVBQW1COztJQUNyQixNQUFNLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7O0lBQ3pFLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFFakcsT0FBTyxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsb0JBQUMsWUFBWSxHQUFHLENBQUM7SUFDNUQsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDOztJQUVsQyxNQUFNLEdBQUcsR0FBRywwQkFBMEIsQ0FDbEMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xHLE9BQU8sR0FBRztTQUNMLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO1FBQ2pDLHNFQUFzRTtTQUNyRSxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ2pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlRCxNQUFNLHdCQUF3QixLQUFhLEVBQUUsTUFBYyxFQUFFLFVBQW1COztJQUM5RSxNQUFNLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7O0lBQ3hFLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O0lBQ2pHLE1BQU0sR0FBRyxHQUFHLDBCQUEwQixDQUNsQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hGLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FDZCxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLEVBQUUscUJBQXFCLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0NBQzdGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JELE1BQU0sdUJBQXVCLEtBQWEsRUFBRSxNQUFjLEVBQUUsVUFBbUI7O0lBQzdFLE1BQU0sTUFBTSxHQUFHLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7SUFDeEUsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNqRyxPQUFPLDBCQUEwQixDQUM3QixLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7Q0FDbkY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkQsMkJBQTJCLE1BQWMsRUFBRSxTQUFTLEdBQUcsR0FBRzs7SUFDeEQsTUFBTSxDQUFDLEdBQUc7UUFDUixNQUFNLEVBQUUsQ0FBQztRQUNULE9BQU8sRUFBRSxDQUFDO1FBQ1YsT0FBTyxFQUFFLENBQUM7UUFDVixNQUFNLEVBQUUsRUFBRTtRQUNWLE1BQU0sRUFBRSxFQUFFO1FBQ1YsTUFBTSxFQUFFLEVBQUU7UUFDVixNQUFNLEVBQUUsRUFBRTtRQUNWLEtBQUssRUFBRSxDQUFDO1FBQ1IsTUFBTSxFQUFFLENBQUM7S0FDVixDQUFDOztJQUVGLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7O0lBQy9DLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFDakMsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUVqQyxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzdCO1lBQ0UsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4RCxDQUMrRDs7SUFOcEUsTUFNTSxPQUFPLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFvQzs7SUFOcEUsTUFNa0MsUUFBUSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFcEUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFFMUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O1FBQ3hDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQ3BCLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO2FBQU0sSUFBSSxFQUFFLEtBQUssVUFBVSxFQUFFO1lBQzVCLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQjthQUFNO1lBQ0wsQ0FBQyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7U0FDaEI7S0FDRjs7SUFFRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFMUUsSUFBSSxRQUFRLEVBQUU7O1FBQ1osTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDM0I7O1FBRHpDLE1BQ00sR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFekMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM5RDtTQUFNO1FBQ0wsQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDckI7SUFFRCxPQUFPLENBQUMsQ0FBQztDQUNWOzs7Ozs7Ozs7Ozs7Ozs7QUFZRCxtQkFBbUIsWUFBMEI7O0lBRTNDLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDaEMsT0FBTyxZQUFZLENBQUM7S0FDckI7O0lBR0QsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQztJQUN6RSxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUU7UUFDekIsWUFBWSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7S0FDNUI7U0FBTTtRQUNMLElBQUksV0FBVyxLQUFLLENBQUMsRUFBRTtZQUNyQixZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDaEM7YUFBTSxJQUFJLFdBQVcsS0FBSyxDQUFDLEVBQUU7WUFDNUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0I7UUFDRCxZQUFZLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQztLQUM5QjtJQUVELE9BQU8sWUFBWSxDQUFDO0NBQ3JCOzs7Ozs7O0FBTUQscUJBQXFCLEdBQVc7O0lBQzlCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOztJQUNoQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQXFCOztJQUFyQyxJQUFrQixNQUFNLENBQWE7O0lBQXJDLElBQTBCLFVBQVUsQ0FBQzs7SUFDckMsSUFBSSxDQUFDLENBQVc7O0lBQWhCLElBQU8sQ0FBQyxDQUFROztJQUFoQixJQUFVLEtBQUssQ0FBQzs7SUFHaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDbkQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzFDOztJQUdELElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTs7UUFFakMsSUFBSSxVQUFVLEdBQUcsQ0FBQztZQUFFLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDbkMsVUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2pDO1NBQU0sSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFOztRQUV6QixVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUM1Qjs7SUFHRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxXQUFXOztLQUM3RDtJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTs7UUFFakMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixVQUFVLEdBQUcsQ0FBQyxDQUFDO0tBQ2hCO1NBQU07O1FBRUwsS0FBSyxFQUFFLENBQUM7UUFDUixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUztZQUFFLEtBQUssRUFBRSxDQUFDOztRQUduRCxVQUFVLElBQUksQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sR0FBRyxFQUFFLENBQUM7O1FBRVosS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEM7S0FDRjs7SUFHRCxJQUFJLFVBQVUsR0FBRyxVQUFVLEVBQUU7UUFDM0IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxQyxRQUFRLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUMxQixVQUFVLEdBQUcsQ0FBQyxDQUFDO0tBQ2hCO0lBRUQsT0FBTyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLENBQUM7Q0FDdkM7Ozs7Ozs7OztBQU1ELHFCQUFxQixZQUEwQixFQUFFLE9BQWUsRUFBRSxPQUFlO0lBQy9FLElBQUksT0FBTyxHQUFHLE9BQU8sRUFBRTtRQUNyQixNQUFNLElBQUksS0FBSyxDQUNYLGdEQUFnRCxPQUFPLGlDQUFpQyxPQUFPLElBQUksQ0FBQyxDQUFDO0tBQzFHOztJQUVELElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7O0lBQ2pDLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQzs7SUFDMUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQzs7SUFHdkUsSUFBSSxPQUFPLEdBQUcsWUFBWSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUM7O0lBQ3JELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU1QixJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUU7O1FBRWYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQzs7UUFHMUQsS0FBSyxJQUFJLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNmO0tBQ0Y7U0FBTTs7UUFFTCxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdkMsWUFBWSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakQ7SUFFRCxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7UUFDZCxJQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUMzQjtZQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzNCO2FBQU07WUFDTCxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDdkI7S0FDRjs7SUFHRCxPQUFPLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsRUFBRSxXQUFXLEVBQUU7UUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUU5RSxJQUFJLGlCQUFpQixHQUFHLFlBQVksS0FBSyxDQUFDLENBQUM7O0lBRzNDLE1BQU0sTUFBTSxHQUFHLE9BQU8sR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDOztJQUVqRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTTtRQUMzRCxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxpQkFBaUIsRUFBRTs7WUFFckIsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNkO2lCQUFNO2dCQUNMLGlCQUFpQixHQUFHLEtBQUssQ0FBQzthQUMzQjtTQUNGO1FBQ0QsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ04sSUFBSSxLQUFLLEVBQUU7UUFDVCxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUMzQjtDQUNGOzs7OztBQUVELE1BQU0sNEJBQTRCLElBQVk7O0lBQzVDLE1BQU0sTUFBTSxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ2pFO0lBQ0QsT0FBTyxNQUFNLENBQUM7Q0FDZiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOdW1iZXJGb3JtYXRTdHlsZSwgTnVtYmVyU3ltYm9sLCBnZXRMb2NhbGVOdW1iZXJGb3JtYXQsIGdldExvY2FsZU51bWJlclN5bWJvbCwgZ2V0TnVtYmVyT2ZDdXJyZW5jeURpZ2l0c30gZnJvbSAnLi9sb2NhbGVfZGF0YV9hcGknO1xuXG5leHBvcnQgY29uc3QgTlVNQkVSX0ZPUk1BVF9SRUdFWFAgPSAvXihcXGQrKT9cXC4oKFxcZCspKC0oXFxkKykpPyk/JC87XG5jb25zdCBNQVhfRElHSVRTID0gMjI7XG5jb25zdCBERUNJTUFMX1NFUCA9ICcuJztcbmNvbnN0IFpFUk9fQ0hBUiA9ICcwJztcbmNvbnN0IFBBVFRFUk5fU0VQID0gJzsnO1xuY29uc3QgR1JPVVBfU0VQID0gJywnO1xuY29uc3QgRElHSVRfQ0hBUiA9ICcjJztcbmNvbnN0IENVUlJFTkNZX0NIQVIgPSAnwqQnO1xuY29uc3QgUEVSQ0VOVF9DSEFSID0gJyUnO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSBudW1iZXIgdG8gYSBsb2NhbGUgc3RyaW5nIGJhc2VkIG9uIGEgc3R5bGUgYW5kIGEgZm9ybWF0XG4gKi9cbmZ1bmN0aW9uIGZvcm1hdE51bWJlclRvTG9jYWxlU3RyaW5nKFxuICAgIHZhbHVlOiBudW1iZXIsIHBhdHRlcm46IFBhcnNlZE51bWJlckZvcm1hdCwgbG9jYWxlOiBzdHJpbmcsIGdyb3VwU3ltYm9sOiBOdW1iZXJTeW1ib2wsXG4gICAgZGVjaW1hbFN5bWJvbDogTnVtYmVyU3ltYm9sLCBkaWdpdHNJbmZvPzogc3RyaW5nLCBpc1BlcmNlbnQgPSBmYWxzZSk6IHN0cmluZyB7XG4gIGxldCBmb3JtYXR0ZWRUZXh0ID0gJyc7XG4gIGxldCBpc1plcm8gPSBmYWxzZTtcblxuICBpZiAoIWlzRmluaXRlKHZhbHVlKSkge1xuICAgIGZvcm1hdHRlZFRleHQgPSBnZXRMb2NhbGVOdW1iZXJTeW1ib2wobG9jYWxlLCBOdW1iZXJTeW1ib2wuSW5maW5pdHkpO1xuICB9IGVsc2Uge1xuICAgIGxldCBwYXJzZWROdW1iZXIgPSBwYXJzZU51bWJlcih2YWx1ZSk7XG5cbiAgICBpZiAoaXNQZXJjZW50KSB7XG4gICAgICBwYXJzZWROdW1iZXIgPSB0b1BlcmNlbnQocGFyc2VkTnVtYmVyKTtcbiAgICB9XG5cbiAgICBsZXQgbWluSW50ID0gcGF0dGVybi5taW5JbnQ7XG4gICAgbGV0IG1pbkZyYWN0aW9uID0gcGF0dGVybi5taW5GcmFjO1xuICAgIGxldCBtYXhGcmFjdGlvbiA9IHBhdHRlcm4ubWF4RnJhYztcblxuICAgIGlmIChkaWdpdHNJbmZvKSB7XG4gICAgICBjb25zdCBwYXJ0cyA9IGRpZ2l0c0luZm8ubWF0Y2goTlVNQkVSX0ZPUk1BVF9SRUdFWFApO1xuICAgICAgaWYgKHBhcnRzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtkaWdpdHNJbmZvfSBpcyBub3QgYSB2YWxpZCBkaWdpdCBpbmZvYCk7XG4gICAgICB9XG4gICAgICBjb25zdCBtaW5JbnRQYXJ0ID0gcGFydHNbMV07XG4gICAgICBjb25zdCBtaW5GcmFjdGlvblBhcnQgPSBwYXJ0c1szXTtcbiAgICAgIGNvbnN0IG1heEZyYWN0aW9uUGFydCA9IHBhcnRzWzVdO1xuICAgICAgaWYgKG1pbkludFBhcnQgIT0gbnVsbCkge1xuICAgICAgICBtaW5JbnQgPSBwYXJzZUludEF1dG9SYWRpeChtaW5JbnRQYXJ0KTtcbiAgICAgIH1cbiAgICAgIGlmIChtaW5GcmFjdGlvblBhcnQgIT0gbnVsbCkge1xuICAgICAgICBtaW5GcmFjdGlvbiA9IHBhcnNlSW50QXV0b1JhZGl4KG1pbkZyYWN0aW9uUGFydCk7XG4gICAgICB9XG4gICAgICBpZiAobWF4RnJhY3Rpb25QYXJ0ICE9IG51bGwpIHtcbiAgICAgICAgbWF4RnJhY3Rpb24gPSBwYXJzZUludEF1dG9SYWRpeChtYXhGcmFjdGlvblBhcnQpO1xuICAgICAgfSBlbHNlIGlmIChtaW5GcmFjdGlvblBhcnQgIT0gbnVsbCAmJiBtaW5GcmFjdGlvbiA+IG1heEZyYWN0aW9uKSB7XG4gICAgICAgIG1heEZyYWN0aW9uID0gbWluRnJhY3Rpb247XG4gICAgICB9XG4gICAgfVxuXG4gICAgcm91bmROdW1iZXIocGFyc2VkTnVtYmVyLCBtaW5GcmFjdGlvbiwgbWF4RnJhY3Rpb24pO1xuXG4gICAgbGV0IGRpZ2l0cyA9IHBhcnNlZE51bWJlci5kaWdpdHM7XG4gICAgbGV0IGludGVnZXJMZW4gPSBwYXJzZWROdW1iZXIuaW50ZWdlckxlbjtcbiAgICBjb25zdCBleHBvbmVudCA9IHBhcnNlZE51bWJlci5leHBvbmVudDtcbiAgICBsZXQgZGVjaW1hbHMgPSBbXTtcbiAgICBpc1plcm8gPSBkaWdpdHMuZXZlcnkoZCA9PiAhZCk7XG5cbiAgICAvLyBwYWQgemVyb3MgZm9yIHNtYWxsIG51bWJlcnNcbiAgICBmb3IgKDsgaW50ZWdlckxlbiA8IG1pbkludDsgaW50ZWdlckxlbisrKSB7XG4gICAgICBkaWdpdHMudW5zaGlmdCgwKTtcbiAgICB9XG5cbiAgICAvLyBwYWQgemVyb3MgZm9yIHNtYWxsIG51bWJlcnNcbiAgICBmb3IgKDsgaW50ZWdlckxlbiA8IDA7IGludGVnZXJMZW4rKykge1xuICAgICAgZGlnaXRzLnVuc2hpZnQoMCk7XG4gICAgfVxuXG4gICAgLy8gZXh0cmFjdCBkZWNpbWFscyBkaWdpdHNcbiAgICBpZiAoaW50ZWdlckxlbiA+IDApIHtcbiAgICAgIGRlY2ltYWxzID0gZGlnaXRzLnNwbGljZShpbnRlZ2VyTGVuLCBkaWdpdHMubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVjaW1hbHMgPSBkaWdpdHM7XG4gICAgICBkaWdpdHMgPSBbMF07XG4gICAgfVxuXG4gICAgLy8gZm9ybWF0IHRoZSBpbnRlZ2VyIGRpZ2l0cyB3aXRoIGdyb3VwaW5nIHNlcGFyYXRvcnNcbiAgICBjb25zdCBncm91cHMgPSBbXTtcbiAgICBpZiAoZGlnaXRzLmxlbmd0aCA+PSBwYXR0ZXJuLmxnU2l6ZSkge1xuICAgICAgZ3JvdXBzLnVuc2hpZnQoZGlnaXRzLnNwbGljZSgtcGF0dGVybi5sZ1NpemUsIGRpZ2l0cy5sZW5ndGgpLmpvaW4oJycpKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoZGlnaXRzLmxlbmd0aCA+IHBhdHRlcm4uZ1NpemUpIHtcbiAgICAgIGdyb3Vwcy51bnNoaWZ0KGRpZ2l0cy5zcGxpY2UoLXBhdHRlcm4uZ1NpemUsIGRpZ2l0cy5sZW5ndGgpLmpvaW4oJycpKTtcbiAgICB9XG5cbiAgICBpZiAoZGlnaXRzLmxlbmd0aCkge1xuICAgICAgZ3JvdXBzLnVuc2hpZnQoZGlnaXRzLmpvaW4oJycpKTtcbiAgICB9XG5cbiAgICBmb3JtYXR0ZWRUZXh0ID0gZ3JvdXBzLmpvaW4oZ2V0TG9jYWxlTnVtYmVyU3ltYm9sKGxvY2FsZSwgZ3JvdXBTeW1ib2wpKTtcblxuICAgIC8vIGFwcGVuZCB0aGUgZGVjaW1hbCBkaWdpdHNcbiAgICBpZiAoZGVjaW1hbHMubGVuZ3RoKSB7XG4gICAgICBmb3JtYXR0ZWRUZXh0ICs9IGdldExvY2FsZU51bWJlclN5bWJvbChsb2NhbGUsIGRlY2ltYWxTeW1ib2wpICsgZGVjaW1hbHMuam9pbignJyk7XG4gICAgfVxuXG4gICAgaWYgKGV4cG9uZW50KSB7XG4gICAgICBmb3JtYXR0ZWRUZXh0ICs9IGdldExvY2FsZU51bWJlclN5bWJvbChsb2NhbGUsIE51bWJlclN5bWJvbC5FeHBvbmVudGlhbCkgKyAnKycgKyBleHBvbmVudDtcbiAgICB9XG4gIH1cblxuICBpZiAodmFsdWUgPCAwICYmICFpc1plcm8pIHtcbiAgICBmb3JtYXR0ZWRUZXh0ID0gcGF0dGVybi5uZWdQcmUgKyBmb3JtYXR0ZWRUZXh0ICsgcGF0dGVybi5uZWdTdWY7XG4gIH0gZWxzZSB7XG4gICAgZm9ybWF0dGVkVGV4dCA9IHBhdHRlcm4ucG9zUHJlICsgZm9ybWF0dGVkVGV4dCArIHBhdHRlcm4ucG9zU3VmO1xuICB9XG5cbiAgcmV0dXJuIGZvcm1hdHRlZFRleHQ7XG59XG5cbi8qKlxuICogQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogRm9ybWF0cyBhIG51bWJlciBhcyBjdXJyZW5jeSB1c2luZyBsb2NhbGUgcnVsZXMuXG4gKlxuICogVXNlIGBjdXJyZW5jeWAgdG8gZm9ybWF0IGEgbnVtYmVyIGFzIGN1cnJlbmN5LlxuICpcbiAqIFdoZXJlOlxuICogLSBgdmFsdWVgIGlzIGEgbnVtYmVyLlxuICogLSBgbG9jYWxlYCBpcyBhIGBzdHJpbmdgIGRlZmluaW5nIHRoZSBsb2NhbGUgdG8gdXNlLlxuICogLSBgY3VycmVuY3lgIGlzIHRoZSBzdHJpbmcgdGhhdCByZXByZXNlbnRzIHRoZSBjdXJyZW5jeSwgaXQgY2FuIGJlIGl0cyBzeW1ib2wgb3IgaXRzIG5hbWUuXG4gKiAtIGBjdXJyZW5jeUNvZGVgIGlzIHRoZSBbSVNPIDQyMTddKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT180MjE3KSBjdXJyZW5jeSBjb2RlLCBzdWNoXG4gKiAgICBhcyBgVVNEYCBmb3IgdGhlIFVTIGRvbGxhciBhbmQgYEVVUmAgZm9yIHRoZSBldXJvLlxuICogLSBgZGlnaXRJbmZvYCBTZWUge0BsaW5rIERlY2ltYWxQaXBlfSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRDdXJyZW5jeShcbiAgICB2YWx1ZTogbnVtYmVyLCBsb2NhbGU6IHN0cmluZywgY3VycmVuY3k6IHN0cmluZywgY3VycmVuY3lDb2RlPzogc3RyaW5nLFxuICAgIGRpZ2l0c0luZm8/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBmb3JtYXQgPSBnZXRMb2NhbGVOdW1iZXJGb3JtYXQobG9jYWxlLCBOdW1iZXJGb3JtYXRTdHlsZS5DdXJyZW5jeSk7XG4gIGNvbnN0IHBhdHRlcm4gPSBwYXJzZU51bWJlckZvcm1hdChmb3JtYXQsIGdldExvY2FsZU51bWJlclN5bWJvbChsb2NhbGUsIE51bWJlclN5bWJvbC5NaW51c1NpZ24pKTtcblxuICBwYXR0ZXJuLm1pbkZyYWMgPSBnZXROdW1iZXJPZkN1cnJlbmN5RGlnaXRzKGN1cnJlbmN5Q29kZSAhKTtcbiAgcGF0dGVybi5tYXhGcmFjID0gcGF0dGVybi5taW5GcmFjO1xuXG4gIGNvbnN0IHJlcyA9IGZvcm1hdE51bWJlclRvTG9jYWxlU3RyaW5nKFxuICAgICAgdmFsdWUsIHBhdHRlcm4sIGxvY2FsZSwgTnVtYmVyU3ltYm9sLkN1cnJlbmN5R3JvdXAsIE51bWJlclN5bWJvbC5DdXJyZW5jeURlY2ltYWwsIGRpZ2l0c0luZm8pO1xuICByZXR1cm4gcmVzXG4gICAgICAucmVwbGFjZShDVVJSRU5DWV9DSEFSLCBjdXJyZW5jeSlcbiAgICAgIC8vIGlmIHdlIGhhdmUgMiB0aW1lIHRoZSBjdXJyZW5jeSBjaGFyYWN0ZXIsIHRoZSBzZWNvbmQgb25lIGlzIGlnbm9yZWRcbiAgICAgIC5yZXBsYWNlKENVUlJFTkNZX0NIQVIsICcnKTtcbn1cblxuLyoqXG4gKiBAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBGb3JtYXRzIGEgbnVtYmVyIGFzIGEgcGVyY2VudGFnZSBhY2NvcmRpbmcgdG8gbG9jYWxlIHJ1bGVzLlxuICpcbiAqIFdoZXJlOlxuICogLSBgdmFsdWVgIGlzIGEgbnVtYmVyLlxuICogLSBgbG9jYWxlYCBpcyBhIGBzdHJpbmdgIGRlZmluaW5nIHRoZSBsb2NhbGUgdG8gdXNlLlxuICogLSBgZGlnaXRJbmZvYCBTZWUge0BsaW5rIERlY2ltYWxQaXBlfSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRQZXJjZW50KHZhbHVlOiBudW1iZXIsIGxvY2FsZTogc3RyaW5nLCBkaWdpdHNJbmZvPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZm9ybWF0ID0gZ2V0TG9jYWxlTnVtYmVyRm9ybWF0KGxvY2FsZSwgTnVtYmVyRm9ybWF0U3R5bGUuUGVyY2VudCk7XG4gIGNvbnN0IHBhdHRlcm4gPSBwYXJzZU51bWJlckZvcm1hdChmb3JtYXQsIGdldExvY2FsZU51bWJlclN5bWJvbChsb2NhbGUsIE51bWJlclN5bWJvbC5NaW51c1NpZ24pKTtcbiAgY29uc3QgcmVzID0gZm9ybWF0TnVtYmVyVG9Mb2NhbGVTdHJpbmcoXG4gICAgICB2YWx1ZSwgcGF0dGVybiwgbG9jYWxlLCBOdW1iZXJTeW1ib2wuR3JvdXAsIE51bWJlclN5bWJvbC5EZWNpbWFsLCBkaWdpdHNJbmZvLCB0cnVlKTtcbiAgcmV0dXJuIHJlcy5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChQRVJDRU5UX0NIQVIsICdnJyksIGdldExvY2FsZU51bWJlclN5bWJvbChsb2NhbGUsIE51bWJlclN5bWJvbC5QZXJjZW50U2lnbikpO1xufVxuXG4vKipcbiAqIEBuZ01vZHVsZSBDb21tb25Nb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIEZvcm1hdHMgYSBudW1iZXIgYXMgdGV4dC4gR3JvdXAgc2l6aW5nIGFuZCBzZXBhcmF0b3IgYW5kIG90aGVyIGxvY2FsZS1zcGVjaWZpY1xuICogY29uZmlndXJhdGlvbnMgYXJlIGJhc2VkIG9uIHRoZSBsb2NhbGUuXG4gKlxuICogV2hlcmU6XG4gKiAtIGB2YWx1ZWAgaXMgYSBudW1iZXIuXG4gKiAtIGBsb2NhbGVgIGlzIGEgYHN0cmluZ2AgZGVmaW5pbmcgdGhlIGxvY2FsZSB0byB1c2UuXG4gKiAtIGBkaWdpdEluZm9gIFNlZSB7QGxpbmsgRGVjaW1hbFBpcGV9IGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE51bWJlcih2YWx1ZTogbnVtYmVyLCBsb2NhbGU6IHN0cmluZywgZGlnaXRzSW5mbz86IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGZvcm1hdCA9IGdldExvY2FsZU51bWJlckZvcm1hdChsb2NhbGUsIE51bWJlckZvcm1hdFN0eWxlLkRlY2ltYWwpO1xuICBjb25zdCBwYXR0ZXJuID0gcGFyc2VOdW1iZXJGb3JtYXQoZm9ybWF0LCBnZXRMb2NhbGVOdW1iZXJTeW1ib2wobG9jYWxlLCBOdW1iZXJTeW1ib2wuTWludXNTaWduKSk7XG4gIHJldHVybiBmb3JtYXROdW1iZXJUb0xvY2FsZVN0cmluZyhcbiAgICAgIHZhbHVlLCBwYXR0ZXJuLCBsb2NhbGUsIE51bWJlclN5bWJvbC5Hcm91cCwgTnVtYmVyU3ltYm9sLkRlY2ltYWwsIGRpZ2l0c0luZm8pO1xufVxuXG5pbnRlcmZhY2UgUGFyc2VkTnVtYmVyRm9ybWF0IHtcbiAgbWluSW50OiBudW1iZXI7XG4gIC8vIHRoZSBtaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgcmVxdWlyZWQgaW4gdGhlIGZyYWN0aW9uIHBhcnQgb2YgdGhlIG51bWJlclxuICBtaW5GcmFjOiBudW1iZXI7XG4gIC8vIHRoZSBtYXhpbXVtIG51bWJlciBvZiBkaWdpdHMgcmVxdWlyZWQgaW4gdGhlIGZyYWN0aW9uIHBhcnQgb2YgdGhlIG51bWJlclxuICBtYXhGcmFjOiBudW1iZXI7XG4gIC8vIHRoZSBwcmVmaXggZm9yIGEgcG9zaXRpdmUgbnVtYmVyXG4gIHBvc1ByZTogc3RyaW5nO1xuICAvLyB0aGUgc3VmZml4IGZvciBhIHBvc2l0aXZlIG51bWJlclxuICBwb3NTdWY6IHN0cmluZztcbiAgLy8gdGhlIHByZWZpeCBmb3IgYSBuZWdhdGl2ZSBudW1iZXIgKGUuZy4gYC1gIG9yIGAoYCkpXG4gIG5lZ1ByZTogc3RyaW5nO1xuICAvLyB0aGUgc3VmZml4IGZvciBhIG5lZ2F0aXZlIG51bWJlciAoZS5nLiBgKWApXG4gIG5lZ1N1Zjogc3RyaW5nO1xuICAvLyBudW1iZXIgb2YgZGlnaXRzIGluIGVhY2ggZ3JvdXAgb2Ygc2VwYXJhdGVkIGRpZ2l0c1xuICBnU2l6ZTogbnVtYmVyO1xuICAvLyBudW1iZXIgb2YgZGlnaXRzIGluIHRoZSBsYXN0IGdyb3VwIG9mIGRpZ2l0cyBiZWZvcmUgdGhlIGRlY2ltYWwgc2VwYXJhdG9yXG4gIGxnU2l6ZTogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBwYXJzZU51bWJlckZvcm1hdChmb3JtYXQ6IHN0cmluZywgbWludXNTaWduID0gJy0nKTogUGFyc2VkTnVtYmVyRm9ybWF0IHtcbiAgY29uc3QgcCA9IHtcbiAgICBtaW5JbnQ6IDEsXG4gICAgbWluRnJhYzogMCxcbiAgICBtYXhGcmFjOiAwLFxuICAgIHBvc1ByZTogJycsXG4gICAgcG9zU3VmOiAnJyxcbiAgICBuZWdQcmU6ICcnLFxuICAgIG5lZ1N1ZjogJycsXG4gICAgZ1NpemU6IDAsXG4gICAgbGdTaXplOiAwXG4gIH07XG5cbiAgY29uc3QgcGF0dGVyblBhcnRzID0gZm9ybWF0LnNwbGl0KFBBVFRFUk5fU0VQKTtcbiAgY29uc3QgcG9zaXRpdmUgPSBwYXR0ZXJuUGFydHNbMF07XG4gIGNvbnN0IG5lZ2F0aXZlID0gcGF0dGVyblBhcnRzWzFdO1xuXG4gIGNvbnN0IHBvc2l0aXZlUGFydHMgPSBwb3NpdGl2ZS5pbmRleE9mKERFQ0lNQUxfU0VQKSAhPT0gLTEgP1xuICAgICAgcG9zaXRpdmUuc3BsaXQoREVDSU1BTF9TRVApIDpcbiAgICAgIFtcbiAgICAgICAgcG9zaXRpdmUuc3Vic3RyaW5nKDAsIHBvc2l0aXZlLmxhc3RJbmRleE9mKFpFUk9fQ0hBUikgKyAxKSxcbiAgICAgICAgcG9zaXRpdmUuc3Vic3RyaW5nKHBvc2l0aXZlLmxhc3RJbmRleE9mKFpFUk9fQ0hBUikgKyAxKVxuICAgICAgXSxcbiAgICAgICAgaW50ZWdlciA9IHBvc2l0aXZlUGFydHNbMF0sIGZyYWN0aW9uID0gcG9zaXRpdmVQYXJ0c1sxXSB8fCAnJztcblxuICBwLnBvc1ByZSA9IGludGVnZXIuc3Vic3RyKDAsIGludGVnZXIuaW5kZXhPZihESUdJVF9DSEFSKSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoID0gZnJhY3Rpb24uY2hhckF0KGkpO1xuICAgIGlmIChjaCA9PT0gWkVST19DSEFSKSB7XG4gICAgICBwLm1pbkZyYWMgPSBwLm1heEZyYWMgPSBpICsgMTtcbiAgICB9IGVsc2UgaWYgKGNoID09PSBESUdJVF9DSEFSKSB7XG4gICAgICBwLm1heEZyYWMgPSBpICsgMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcC5wb3NTdWYgKz0gY2g7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ3JvdXBzID0gaW50ZWdlci5zcGxpdChHUk9VUF9TRVApO1xuICBwLmdTaXplID0gZ3JvdXBzWzFdID8gZ3JvdXBzWzFdLmxlbmd0aCA6IDA7XG4gIHAubGdTaXplID0gKGdyb3Vwc1syXSB8fCBncm91cHNbMV0pID8gKGdyb3Vwc1syXSB8fCBncm91cHNbMV0pLmxlbmd0aCA6IDA7XG5cbiAgaWYgKG5lZ2F0aXZlKSB7XG4gICAgY29uc3QgdHJ1bmtMZW4gPSBwb3NpdGl2ZS5sZW5ndGggLSBwLnBvc1ByZS5sZW5ndGggLSBwLnBvc1N1Zi5sZW5ndGgsXG4gICAgICAgICAgcG9zID0gbmVnYXRpdmUuaW5kZXhPZihESUdJVF9DSEFSKTtcblxuICAgIHAubmVnUHJlID0gbmVnYXRpdmUuc3Vic3RyKDAsIHBvcykucmVwbGFjZSgvJy9nLCAnJyk7XG4gICAgcC5uZWdTdWYgPSBuZWdhdGl2ZS5zdWJzdHIocG9zICsgdHJ1bmtMZW4pLnJlcGxhY2UoLycvZywgJycpO1xuICB9IGVsc2Uge1xuICAgIHAubmVnUHJlID0gbWludXNTaWduICsgcC5wb3NQcmU7XG4gICAgcC5uZWdTdWYgPSBwLnBvc1N1ZjtcbiAgfVxuXG4gIHJldHVybiBwO1xufVxuXG5pbnRlcmZhY2UgUGFyc2VkTnVtYmVyIHtcbiAgLy8gYW4gYXJyYXkgb2YgZGlnaXRzIGNvbnRhaW5pbmcgbGVhZGluZyB6ZXJvcyBhcyBuZWNlc3NhcnlcbiAgZGlnaXRzOiBudW1iZXJbXTtcbiAgLy8gdGhlIGV4cG9uZW50IGZvciBudW1iZXJzIHRoYXQgd291bGQgbmVlZCBtb3JlIHRoYW4gYE1BWF9ESUdJVFNgIGRpZ2l0cyBpbiBgZGBcbiAgZXhwb25lbnQ6IG51bWJlcjtcbiAgLy8gdGhlIG51bWJlciBvZiB0aGUgZGlnaXRzIGluIGBkYCB0aGF0IGFyZSB0byB0aGUgbGVmdCBvZiB0aGUgZGVjaW1hbCBwb2ludFxuICBpbnRlZ2VyTGVuOiBudW1iZXI7XG59XG5cbi8vIFRyYW5zZm9ybXMgYSBwYXJzZWQgbnVtYmVyIGludG8gYSBwZXJjZW50YWdlIGJ5IG11bHRpcGx5aW5nIGl0IGJ5IDEwMFxuZnVuY3Rpb24gdG9QZXJjZW50KHBhcnNlZE51bWJlcjogUGFyc2VkTnVtYmVyKTogUGFyc2VkTnVtYmVyIHtcbiAgLy8gaWYgdGhlIG51bWJlciBpcyAwLCBkb24ndCBkbyBhbnl0aGluZ1xuICBpZiAocGFyc2VkTnVtYmVyLmRpZ2l0c1swXSA9PT0gMCkge1xuICAgIHJldHVybiBwYXJzZWROdW1iZXI7XG4gIH1cblxuICAvLyBHZXR0aW5nIHRoZSBjdXJyZW50IG51bWJlciBvZiBkZWNpbWFsc1xuICBjb25zdCBmcmFjdGlvbkxlbiA9IHBhcnNlZE51bWJlci5kaWdpdHMubGVuZ3RoIC0gcGFyc2VkTnVtYmVyLmludGVnZXJMZW47XG4gIGlmIChwYXJzZWROdW1iZXIuZXhwb25lbnQpIHtcbiAgICBwYXJzZWROdW1iZXIuZXhwb25lbnQgKz0gMjtcbiAgfSBlbHNlIHtcbiAgICBpZiAoZnJhY3Rpb25MZW4gPT09IDApIHtcbiAgICAgIHBhcnNlZE51bWJlci5kaWdpdHMucHVzaCgwLCAwKTtcbiAgICB9IGVsc2UgaWYgKGZyYWN0aW9uTGVuID09PSAxKSB7XG4gICAgICBwYXJzZWROdW1iZXIuZGlnaXRzLnB1c2goMCk7XG4gICAgfVxuICAgIHBhcnNlZE51bWJlci5pbnRlZ2VyTGVuICs9IDI7XG4gIH1cblxuICByZXR1cm4gcGFyc2VkTnVtYmVyO1xufVxuXG4vKipcbiAqIFBhcnNlcyBhIG51bWJlci5cbiAqIFNpZ25pZmljYW50IGJpdHMgb2YgdGhpcyBwYXJzZSBhbGdvcml0aG0gY2FtZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWtlTWNsL2JpZy5qcy9cbiAqL1xuZnVuY3Rpb24gcGFyc2VOdW1iZXIobnVtOiBudW1iZXIpOiBQYXJzZWROdW1iZXIge1xuICBsZXQgbnVtU3RyID0gTWF0aC5hYnMobnVtKSArICcnO1xuICBsZXQgZXhwb25lbnQgPSAwLCBkaWdpdHMsIGludGVnZXJMZW47XG4gIGxldCBpLCBqLCB6ZXJvcztcblxuICAvLyBEZWNpbWFsIHBvaW50P1xuICBpZiAoKGludGVnZXJMZW4gPSBudW1TdHIuaW5kZXhPZihERUNJTUFMX1NFUCkpID4gLTEpIHtcbiAgICBudW1TdHIgPSBudW1TdHIucmVwbGFjZShERUNJTUFMX1NFUCwgJycpO1xuICB9XG5cbiAgLy8gRXhwb25lbnRpYWwgZm9ybT9cbiAgaWYgKChpID0gbnVtU3RyLnNlYXJjaCgvZS9pKSkgPiAwKSB7XG4gICAgLy8gV29yayBvdXQgdGhlIGV4cG9uZW50LlxuICAgIGlmIChpbnRlZ2VyTGVuIDwgMCkgaW50ZWdlckxlbiA9IGk7XG4gICAgaW50ZWdlckxlbiArPSArbnVtU3RyLnNsaWNlKGkgKyAxKTtcbiAgICBudW1TdHIgPSBudW1TdHIuc3Vic3RyaW5nKDAsIGkpO1xuICB9IGVsc2UgaWYgKGludGVnZXJMZW4gPCAwKSB7XG4gICAgLy8gVGhlcmUgd2FzIG5vIGRlY2ltYWwgcG9pbnQgb3IgZXhwb25lbnQgc28gaXQgaXMgYW4gaW50ZWdlci5cbiAgICBpbnRlZ2VyTGVuID0gbnVtU3RyLmxlbmd0aDtcbiAgfVxuXG4gIC8vIENvdW50IHRoZSBudW1iZXIgb2YgbGVhZGluZyB6ZXJvcy5cbiAgZm9yIChpID0gMDsgbnVtU3RyLmNoYXJBdChpKSA9PT0gWkVST19DSEFSOyBpKyspIHsgLyogZW1wdHkgKi9cbiAgfVxuXG4gIGlmIChpID09PSAoemVyb3MgPSBudW1TdHIubGVuZ3RoKSkge1xuICAgIC8vIFRoZSBkaWdpdHMgYXJlIGFsbCB6ZXJvLlxuICAgIGRpZ2l0cyA9IFswXTtcbiAgICBpbnRlZ2VyTGVuID0gMTtcbiAgfSBlbHNlIHtcbiAgICAvLyBDb3VudCB0aGUgbnVtYmVyIG9mIHRyYWlsaW5nIHplcm9zXG4gICAgemVyb3MtLTtcbiAgICB3aGlsZSAobnVtU3RyLmNoYXJBdCh6ZXJvcykgPT09IFpFUk9fQ0hBUikgemVyb3MtLTtcblxuICAgIC8vIFRyYWlsaW5nIHplcm9zIGFyZSBpbnNpZ25pZmljYW50IHNvIGlnbm9yZSB0aGVtXG4gICAgaW50ZWdlckxlbiAtPSBpO1xuICAgIGRpZ2l0cyA9IFtdO1xuICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIGFycmF5IG9mIGRpZ2l0cyB3aXRob3V0IGxlYWRpbmcvdHJhaWxpbmcgemVyb3MuXG4gICAgZm9yIChqID0gMDsgaSA8PSB6ZXJvczsgaSsrLCBqKyspIHtcbiAgICAgIGRpZ2l0c1tqXSA9IE51bWJlcihudW1TdHIuY2hhckF0KGkpKTtcbiAgICB9XG4gIH1cblxuICAvLyBJZiB0aGUgbnVtYmVyIG92ZXJmbG93cyB0aGUgbWF4aW11bSBhbGxvd2VkIGRpZ2l0cyB0aGVuIHVzZSBhbiBleHBvbmVudC5cbiAgaWYgKGludGVnZXJMZW4gPiBNQVhfRElHSVRTKSB7XG4gICAgZGlnaXRzID0gZGlnaXRzLnNwbGljZSgwLCBNQVhfRElHSVRTIC0gMSk7XG4gICAgZXhwb25lbnQgPSBpbnRlZ2VyTGVuIC0gMTtcbiAgICBpbnRlZ2VyTGVuID0gMTtcbiAgfVxuXG4gIHJldHVybiB7ZGlnaXRzLCBleHBvbmVudCwgaW50ZWdlckxlbn07XG59XG5cbi8qKlxuICogUm91bmQgdGhlIHBhcnNlZCBudW1iZXIgdG8gdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcbiAqIFRoaXMgZnVuY3Rpb24gY2hhbmdlcyB0aGUgcGFyc2VkTnVtYmVyIGluLXBsYWNlXG4gKi9cbmZ1bmN0aW9uIHJvdW5kTnVtYmVyKHBhcnNlZE51bWJlcjogUGFyc2VkTnVtYmVyLCBtaW5GcmFjOiBudW1iZXIsIG1heEZyYWM6IG51bWJlcikge1xuICBpZiAobWluRnJhYyA+IG1heEZyYWMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBUaGUgbWluaW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGZyYWN0aW9uICgke21pbkZyYWN9KSBpcyBoaWdoZXIgdGhhbiB0aGUgbWF4aW11bSAoJHttYXhGcmFjfSkuYCk7XG4gIH1cblxuICBsZXQgZGlnaXRzID0gcGFyc2VkTnVtYmVyLmRpZ2l0cztcbiAgbGV0IGZyYWN0aW9uTGVuID0gZGlnaXRzLmxlbmd0aCAtIHBhcnNlZE51bWJlci5pbnRlZ2VyTGVuO1xuICBjb25zdCBmcmFjdGlvblNpemUgPSBNYXRoLm1pbihNYXRoLm1heChtaW5GcmFjLCBmcmFjdGlvbkxlbiksIG1heEZyYWMpO1xuXG4gIC8vIFRoZSBpbmRleCBvZiB0aGUgZGlnaXQgdG8gd2hlcmUgcm91bmRpbmcgaXMgdG8gb2NjdXJcbiAgbGV0IHJvdW5kQXQgPSBmcmFjdGlvblNpemUgKyBwYXJzZWROdW1iZXIuaW50ZWdlckxlbjtcbiAgbGV0IGRpZ2l0ID0gZGlnaXRzW3JvdW5kQXRdO1xuXG4gIGlmIChyb3VuZEF0ID4gMCkge1xuICAgIC8vIERyb3AgZnJhY3Rpb25hbCBkaWdpdHMgYmV5b25kIGByb3VuZEF0YFxuICAgIGRpZ2l0cy5zcGxpY2UoTWF0aC5tYXgocGFyc2VkTnVtYmVyLmludGVnZXJMZW4sIHJvdW5kQXQpKTtcblxuICAgIC8vIFNldCBub24tZnJhY3Rpb25hbCBkaWdpdHMgYmV5b25kIGByb3VuZEF0YCB0byAwXG4gICAgZm9yIChsZXQgaiA9IHJvdW5kQXQ7IGogPCBkaWdpdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGRpZ2l0c1tqXSA9IDA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFdlIHJvdW5kZWQgdG8gemVybyBzbyByZXNldCB0aGUgcGFyc2VkTnVtYmVyXG4gICAgZnJhY3Rpb25MZW4gPSBNYXRoLm1heCgwLCBmcmFjdGlvbkxlbik7XG4gICAgcGFyc2VkTnVtYmVyLmludGVnZXJMZW4gPSAxO1xuICAgIGRpZ2l0cy5sZW5ndGggPSBNYXRoLm1heCgxLCByb3VuZEF0ID0gZnJhY3Rpb25TaXplICsgMSk7XG4gICAgZGlnaXRzWzBdID0gMDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHJvdW5kQXQ7IGkrKykgZGlnaXRzW2ldID0gMDtcbiAgfVxuXG4gIGlmIChkaWdpdCA+PSA1KSB7XG4gICAgaWYgKHJvdW5kQXQgLSAxIDwgMCkge1xuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPiByb3VuZEF0OyBrLS0pIHtcbiAgICAgICAgZGlnaXRzLnVuc2hpZnQoMCk7XG4gICAgICAgIHBhcnNlZE51bWJlci5pbnRlZ2VyTGVuKys7XG4gICAgICB9XG4gICAgICBkaWdpdHMudW5zaGlmdCgxKTtcbiAgICAgIHBhcnNlZE51bWJlci5pbnRlZ2VyTGVuKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpZ2l0c1tyb3VuZEF0IC0gMV0rKztcbiAgICB9XG4gIH1cblxuICAvLyBQYWQgb3V0IHdpdGggemVyb3MgdG8gZ2V0IHRoZSByZXF1aXJlZCBmcmFjdGlvbiBsZW5ndGhcbiAgZm9yICg7IGZyYWN0aW9uTGVuIDwgTWF0aC5tYXgoMCwgZnJhY3Rpb25TaXplKTsgZnJhY3Rpb25MZW4rKykgZGlnaXRzLnB1c2goMCk7XG5cbiAgbGV0IGRyb3BUcmFpbGluZ1plcm9zID0gZnJhY3Rpb25TaXplICE9PSAwO1xuICAvLyBNaW5pbWFsIGxlbmd0aCA9IG5iIG9mIGRlY2ltYWxzIHJlcXVpcmVkICsgY3VycmVudCBuYiBvZiBpbnRlZ2Vyc1xuICAvLyBBbnkgbnVtYmVyIGJlc2lkZXMgdGhhdCBpcyBvcHRpb25hbCBhbmQgY2FuIGJlIHJlbW92ZWQgaWYgaXQncyBhIHRyYWlsaW5nIDBcbiAgY29uc3QgbWluTGVuID0gbWluRnJhYyArIHBhcnNlZE51bWJlci5pbnRlZ2VyTGVuO1xuICAvLyBEbyBhbnkgY2FycnlpbmcsIGUuZy4gYSBkaWdpdCB3YXMgcm91bmRlZCB1cCB0byAxMFxuICBjb25zdCBjYXJyeSA9IGRpZ2l0cy5yZWR1Y2VSaWdodChmdW5jdGlvbihjYXJyeSwgZCwgaSwgZGlnaXRzKSB7XG4gICAgZCA9IGQgKyBjYXJyeTtcbiAgICBkaWdpdHNbaV0gPSBkIDwgMTAgPyBkIDogZCAtIDEwOyAgLy8gZCAlIDEwXG4gICAgaWYgKGRyb3BUcmFpbGluZ1plcm9zKSB7XG4gICAgICAvLyBEbyBub3Qga2VlcCBtZWFuaW5nbGVzcyBmcmFjdGlvbmFsIHRyYWlsaW5nIHplcm9zIChlLmcuIDE1LjUyMDAwIC0tPiAxNS41MilcbiAgICAgIGlmIChkaWdpdHNbaV0gPT09IDAgJiYgaSA+PSBtaW5MZW4pIHtcbiAgICAgICAgZGlnaXRzLnBvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHJvcFRyYWlsaW5nWmVyb3MgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGQgPj0gMTAgPyAxIDogMDsgIC8vIE1hdGguZmxvb3IoZCAvIDEwKTtcbiAgfSwgMCk7XG4gIGlmIChjYXJyeSkge1xuICAgIGRpZ2l0cy51bnNoaWZ0KGNhcnJ5KTtcbiAgICBwYXJzZWROdW1iZXIuaW50ZWdlckxlbisrO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUludEF1dG9SYWRpeCh0ZXh0OiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCByZXN1bHQ6IG51bWJlciA9IHBhcnNlSW50KHRleHQpO1xuICBpZiAoaXNOYU4ocmVzdWx0KSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnRlZ2VyIGxpdGVyYWwgd2hlbiBwYXJzaW5nICcgKyB0ZXh0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIl19