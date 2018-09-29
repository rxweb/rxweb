/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, LOCALE_ID, Pipe } from '@angular/core';
import { formatCurrency, formatNumber, formatPercent } from '../i18n/format_number';
import { getCurrencySymbol } from '../i18n/locale_data_api';
import { invalidPipeArgumentError } from './invalid_pipe_argument_error';
/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms a number into a string,
 * formatted according to locale rules that determine group sizing and
 * separator, decimal-point character, and other locale-specific
 * configurations.
 *
 * If no parameters are specified, the function rounds off to the nearest value using this
 * [rounding method](https://en.wikibooks.org/wiki/Arithmetic/Rounding).
 * The behavior differs from that of the JavaScript ```Math.round()``` function.
 * In the following case for example, the pipe rounds down where
 * ```Math.round()``` rounds up:
 *
 * ```html
 * -2.5 | number:'1.0-0'
 * > -3
 * Math.round(-2.5)
 * > -2
 * ```
 *
 * @see `formatNumber()`
 *
 * @usageNotes
 * The following code shows how the pipe transforms numbers
 * into text strings, according to various format specifications,
 * where the caller's default locale is `en-US`.
 *
 * ### Example
 *
 * <code-example path="common/pipes/ts/number_pipe.ts" region='NumberPipe'></code-example>
 *
 */
var DecimalPipe = /** @class */ (function () {
    function DecimalPipe(_locale) {
        this._locale = _locale;
    }
    /**
     * @param value The number to be formatted.
     * @param digitsInfo Decimal representation options, specified by a string
     * in the following format:<br>
     * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
     *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
     * Default is `1`.
     *   - `minFractionDigits`: The minimum number of digits after the decimal point.
     * Default is `0`.
     *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
     * Default is `3`.
     * @param locale A locale code for the locale format rules to use.
     * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
     * See [Setting your app locale](guide/i18n#setting-up-the-locale-of-your-app).
     */
    DecimalPipe.prototype.transform = function (value, digitsInfo, locale) {
        if (isEmpty(value))
            return null;
        locale = locale || this._locale;
        try {
            var num = strToNumber(value);
            return formatNumber(num, locale, digitsInfo);
        }
        catch (error) {
            throw invalidPipeArgumentError(DecimalPipe, error.message);
        }
    };
    DecimalPipe.decorators = [
        { type: Pipe, args: [{ name: 'number' },] }
    ];
    /** @nocollapse */
    DecimalPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return DecimalPipe;
}());
export { DecimalPipe };
/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms a number to a percentage
 * string, formatted according to locale rules that determine group sizing and
 * separator, decimal-point character, and other locale-specific
 * configurations.
 *
 * @see `formatPercent()`
 *
 * @usageNotes
 * The following code shows how the pipe transforms numbers
 * into text strings, according to various format specifications,
 * where the caller's default locale is `en-US`.
 *
 * <code-example path="common/pipes/ts/percent_pipe.ts" region='PercentPipe'></code-example>
 *
 *
 */
var PercentPipe = /** @class */ (function () {
    function PercentPipe(_locale) {
        this._locale = _locale;
    }
    /**
     *
     * @param value The number to be formatted as a percentage.
     * @param digitsInfo Decimal representation options, specified by a string
     * in the following format:<br>
     * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
     *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
     * Default is `1`.
     *   - `minFractionDigits`: The minimum number of digits after the decimal point.
     * Default is `0`.
     *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
     * Default is `3`.
     * @param locale A locale code for the locale format rules to use.
     * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
     * See [Setting your app locale](guide/i18n#setting-up-the-locale-of-your-app).
     */
    PercentPipe.prototype.transform = function (value, digitsInfo, locale) {
        if (isEmpty(value))
            return null;
        locale = locale || this._locale;
        try {
            var num = strToNumber(value);
            return formatPercent(num, locale, digitsInfo);
        }
        catch (error) {
            throw invalidPipeArgumentError(PercentPipe, error.message);
        }
    };
    PercentPipe.decorators = [
        { type: Pipe, args: [{ name: 'percent' },] }
    ];
    /** @nocollapse */
    PercentPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return PercentPipe;
}());
export { PercentPipe };
/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms a number to a currency string, formatted according to locale rules
 * that determine group sizing and separator, decimal-point character,
 * and other locale-specific configurations.
 *
 * @see `getCurrencySymbol()`
 * @see `formatCurrency()`
 *
 * @usageNotes
 * The following code shows how the pipe transforms numbers
 * into text strings, according to various format specifications,
 * where the caller's default locale is `en-US`.
 *
 * <code-example path="common/pipes/ts/currency_pipe.ts" region='CurrencyPipe'></code-example>
 *
 *
 */
var CurrencyPipe = /** @class */ (function () {
    function CurrencyPipe(_locale) {
        this._locale = _locale;
    }
    /**
     *
     * @param value The number to be formatted as currency.
     * @param currencyCode The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code,
     * such as `USD` for the US dollar and `EUR` for the euro.
     * @param display The format for the currency indicator. One of the following:
     *   - `code`: Show the code (such as `USD`).
     *   - `symbol`(default): Show the symbol (such as `$`).
     *   - `symbol-narrow`: Use the narrow symbol for locales that have two symbols for their
     * currency.
     * For example, the Canadian dollar CAD has the symbol `CA$` and the symbol-narrow `$`. If the
     * locale has no narrow symbol, uses the standard symbol for the locale.
     *   - String: Use the given string value instead of a code or a symbol.
     *   - Boolean (marked deprecated in v5): `true` for symbol and false for `code`.
     *
     * @param digitsInfo Decimal representation options, specified by a string
     * in the following format:<br>
     * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
     *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
     * Default is `1`.
     *   - `minFractionDigits`: The minimum number of digits after the decimal point.
     * Default is `0`.
     *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
     * Default is `3`.
     * If not provided, the number will be formatted with the proper amount of digits,
     * depending on what the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) specifies.
     * For example, the Canadian dollar has 2 digits, whereas the Chilean peso has none.
     * @param locale A locale code for the locale format rules to use.
     * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
     * See [Setting your app locale](guide/i18n#setting-up-the-locale-of-your-app).
     */
    CurrencyPipe.prototype.transform = function (value, currencyCode, display, digitsInfo, locale) {
        if (display === void 0) { display = 'symbol'; }
        if (isEmpty(value))
            return null;
        locale = locale || this._locale;
        if (typeof display === 'boolean') {
            if (console && console.warn) {
                console.warn("Warning: the currency pipe has been changed in Angular v5. The symbolDisplay option (third parameter) is now a string instead of a boolean. The accepted values are \"code\", \"symbol\" or \"symbol-narrow\".");
            }
            display = display ? 'symbol' : 'code';
        }
        var currency = currencyCode || 'USD';
        if (display !== 'code') {
            if (display === 'symbol' || display === 'symbol-narrow') {
                currency = getCurrencySymbol(currency, display === 'symbol' ? 'wide' : 'narrow', locale);
            }
            else {
                currency = display;
            }
        }
        try {
            var num = strToNumber(value);
            return formatCurrency(num, locale, currency, currencyCode, digitsInfo);
        }
        catch (error) {
            throw invalidPipeArgumentError(CurrencyPipe, error.message);
        }
    };
    CurrencyPipe.decorators = [
        { type: Pipe, args: [{ name: 'currency' },] }
    ];
    /** @nocollapse */
    CurrencyPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return CurrencyPipe;
}());
export { CurrencyPipe };
function isEmpty(value) {
    return value == null || value === '' || value !== value;
}
/**
 * Transforms a string into a number (if needed).
 */
function strToNumber(value) {
    // Convert strings to numbers
    if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
        return Number(value);
    }
    if (typeof value !== 'number') {
        throw new Error(value + " is not a number");
    }
    return value;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyX3BpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL3BpcGVzL251bWJlcl9waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFdkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNIO0lBRUUscUJBQXVDLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO0lBQUcsQ0FBQztJQUUxRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILCtCQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsVUFBbUIsRUFBRSxNQUFlO1FBQ3hELElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRWhDLE1BQU0sR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVoQyxJQUFJO1lBQ0YsSUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLE9BQU8sWUFBWSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDOUM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE1BQU0sd0JBQXdCLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1RDtJQUNILENBQUM7O2dCQTlCRixJQUFJLFNBQUMsRUFBQyxJQUFJLEVB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b0V6QixpQkFBaUIsS0FBVTtJQUN6QixPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDO0FBQzFELENBQUM7QUFFRDs7R0FFRztBQUNILHFCQUFxQixLQUFzQjtJQUN6Qyw2QkFBNkI7SUFDN0IsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFFLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RCO0lBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBSSxLQUFLLHFCQUFrQixDQUFDLENBQUM7S0FDN0M7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0LCBMT0NBTEVfSUQsIFBpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmb3JtYXRDdXJyZW5jeSwgZm9ybWF0TnVtYmVyLCBmb3JtYXRQZXJjZW50fSBmcm9tICcuLi9pMThuL2Zvcm1hdF9udW1iZXInO1xuaW1wb3J0IHtnZXRDdXJyZW5jeVN5bWJvbH0gZnJvbSAnLi4vaTE4bi9sb2NhbGVfZGF0YV9hcGknO1xuaW1wb3J0IHtpbnZhbGlkUGlwZUFyZ3VtZW50RXJyb3J9IGZyb20gJy4vaW52YWxpZF9waXBlX2FyZ3VtZW50X2Vycm9yJztcblxuLyoqXG4gKiBAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUcmFuc2Zvcm1zIGEgbnVtYmVyIGludG8gYSBzdHJpbmcsXG4gKiBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvIGxvY2FsZSBydWxlcyB0aGF0IGRldGVybWluZSBncm91cCBzaXppbmcgYW5kXG4gKiBzZXBhcmF0b3IsIGRlY2ltYWwtcG9pbnQgY2hhcmFjdGVyLCBhbmQgb3RoZXIgbG9jYWxlLXNwZWNpZmljXG4gKiBjb25maWd1cmF0aW9ucy5cbiAqXG4gKiBJZiBubyBwYXJhbWV0ZXJzIGFyZSBzcGVjaWZpZWQsIHRoZSBmdW5jdGlvbiByb3VuZHMgb2ZmIHRvIHRoZSBuZWFyZXN0IHZhbHVlIHVzaW5nIHRoaXNcbiAqIFtyb3VuZGluZyBtZXRob2RdKGh0dHBzOi8vZW4ud2lraWJvb2tzLm9yZy93aWtpL0FyaXRobWV0aWMvUm91bmRpbmcpLlxuICogVGhlIGJlaGF2aW9yIGRpZmZlcnMgZnJvbSB0aGF0IG9mIHRoZSBKYXZhU2NyaXB0IGBgYE1hdGgucm91bmQoKWBgYCBmdW5jdGlvbi5cbiAqIEluIHRoZSBmb2xsb3dpbmcgY2FzZSBmb3IgZXhhbXBsZSwgdGhlIHBpcGUgcm91bmRzIGRvd24gd2hlcmVcbiAqIGBgYE1hdGgucm91bmQoKWBgYCByb3VuZHMgdXA6XG4gKlxuICogYGBgaHRtbFxuICogLTIuNSB8IG51bWJlcjonMS4wLTAnXG4gKiA+IC0zXG4gKiBNYXRoLnJvdW5kKC0yLjUpXG4gKiA+IC0yXG4gKiBgYGBcbiAqXG4gKiBAc2VlIGBmb3JtYXROdW1iZXIoKWBcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVGhlIGZvbGxvd2luZyBjb2RlIHNob3dzIGhvdyB0aGUgcGlwZSB0cmFuc2Zvcm1zIG51bWJlcnNcbiAqIGludG8gdGV4dCBzdHJpbmdzLCBhY2NvcmRpbmcgdG8gdmFyaW91cyBmb3JtYXQgc3BlY2lmaWNhdGlvbnMsXG4gKiB3aGVyZSB0aGUgY2FsbGVyJ3MgZGVmYXVsdCBsb2NhbGUgaXMgYGVuLVVTYC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIDxjb2RlLWV4YW1wbGUgcGF0aD1cImNvbW1vbi9waXBlcy90cy9udW1iZXJfcGlwZS50c1wiIHJlZ2lvbj0nTnVtYmVyUGlwZSc+PC9jb2RlLWV4YW1wbGU+XG4gKlxuICovXG5AUGlwZSh7bmFtZTogJ251bWJlcid9KVxuZXhwb3J0IGNsYXNzIERlY2ltYWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIF9sb2NhbGU6IHN0cmluZykge31cblxuICAvKipcbiAgICogQHBhcmFtIHZhbHVlIFRoZSBudW1iZXIgdG8gYmUgZm9ybWF0dGVkLlxuICAgKiBAcGFyYW0gZGlnaXRzSW5mbyBEZWNpbWFsIHJlcHJlc2VudGF0aW9uIG9wdGlvbnMsIHNwZWNpZmllZCBieSBhIHN0cmluZ1xuICAgKiBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDo8YnI+XG4gICAqIDxjb2RlPnttaW5JbnRlZ2VyRGlnaXRzfS57bWluRnJhY3Rpb25EaWdpdHN9LXttYXhGcmFjdGlvbkRpZ2l0c308L2NvZGU+LlxuICAgKiAgIC0gYG1pbkludGVnZXJEaWdpdHNgOiBUaGUgbWluaW11bSBudW1iZXIgb2YgaW50ZWdlciBkaWdpdHMgYmVmb3JlIHRoZSBkZWNpbWFsIHBvaW50LlxuICAgKiBEZWZhdWx0IGlzIGAxYC5cbiAgICogICAtIGBtaW5GcmFjdGlvbkRpZ2l0c2A6IFRoZSBtaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgdGhlIGRlY2ltYWwgcG9pbnQuXG4gICAqIERlZmF1bHQgaXMgYDBgLlxuICAgKiAgIC0gYG1heEZyYWN0aW9uRGlnaXRzYDogVGhlIG1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciB0aGUgZGVjaW1hbCBwb2ludC5cbiAgICogRGVmYXVsdCBpcyBgM2AuXG4gICAqIEBwYXJhbSBsb2NhbGUgQSBsb2NhbGUgY29kZSBmb3IgdGhlIGxvY2FsZSBmb3JtYXQgcnVsZXMgdG8gdXNlLlxuICAgKiBXaGVuIG5vdCBzdXBwbGllZCwgdXNlcyB0aGUgdmFsdWUgb2YgYExPQ0FMRV9JRGAsIHdoaWNoIGlzIGBlbi1VU2AgYnkgZGVmYXVsdC5cbiAgICogU2VlIFtTZXR0aW5nIHlvdXIgYXBwIGxvY2FsZV0oZ3VpZGUvaTE4biNzZXR0aW5nLXVwLXRoZS1sb2NhbGUtb2YteW91ci1hcHApLlxuICAgKi9cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGRpZ2l0c0luZm8/OiBzdHJpbmcsIGxvY2FsZT86IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICBpZiAoaXNFbXB0eSh2YWx1ZSkpIHJldHVybiBudWxsO1xuXG4gICAgbG9jYWxlID0gbG9jYWxlIHx8IHRoaXMuX2xvY2FsZTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBudW0gPSBzdHJUb051bWJlcih2YWx1ZSk7XG4gICAgICByZXR1cm4gZm9ybWF0TnVtYmVyKG51bSwgbG9jYWxlLCBkaWdpdHNJbmZvKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgaW52YWxpZFBpcGVBcmd1bWVudEVycm9yKERlY2ltYWxQaXBlLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUcmFuc2Zvcm1zIGEgbnVtYmVyIHRvIGEgcGVyY2VudGFnZVxuICogc3RyaW5nLCBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvIGxvY2FsZSBydWxlcyB0aGF0IGRldGVybWluZSBncm91cCBzaXppbmcgYW5kXG4gKiBzZXBhcmF0b3IsIGRlY2ltYWwtcG9pbnQgY2hhcmFjdGVyLCBhbmQgb3RoZXIgbG9jYWxlLXNwZWNpZmljXG4gKiBjb25maWd1cmF0aW9ucy5cbiAqXG4gKiBAc2VlIGBmb3JtYXRQZXJjZW50KClgXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIFRoZSBmb2xsb3dpbmcgY29kZSBzaG93cyBob3cgdGhlIHBpcGUgdHJhbnNmb3JtcyBudW1iZXJzXG4gKiBpbnRvIHRleHQgc3RyaW5ncywgYWNjb3JkaW5nIHRvIHZhcmlvdXMgZm9ybWF0IHNwZWNpZmljYXRpb25zLFxuICogd2hlcmUgdGhlIGNhbGxlcidzIGRlZmF1bHQgbG9jYWxlIGlzIGBlbi1VU2AuXG4gKlxuICogPGNvZGUtZXhhbXBsZSBwYXRoPVwiY29tbW9uL3BpcGVzL3RzL3BlcmNlbnRfcGlwZS50c1wiIHJlZ2lvbj0nUGVyY2VudFBpcGUnPjwvY29kZS1leGFtcGxlPlxuICpcbiAqXG4gKi9cbkBQaXBlKHtuYW1lOiAncGVyY2VudCd9KVxuZXhwb3J0IGNsYXNzIFBlcmNlbnRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIF9sb2NhbGU6IHN0cmluZykge31cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIFRoZSBudW1iZXIgdG8gYmUgZm9ybWF0dGVkIGFzIGEgcGVyY2VudGFnZS5cbiAgICogQHBhcmFtIGRpZ2l0c0luZm8gRGVjaW1hbCByZXByZXNlbnRhdGlvbiBvcHRpb25zLCBzcGVjaWZpZWQgYnkgYSBzdHJpbmdcbiAgICogaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6PGJyPlxuICAgKiA8Y29kZT57bWluSW50ZWdlckRpZ2l0c30ue21pbkZyYWN0aW9uRGlnaXRzfS17bWF4RnJhY3Rpb25EaWdpdHN9PC9jb2RlPi5cbiAgICogICAtIGBtaW5JbnRlZ2VyRGlnaXRzYDogVGhlIG1pbmltdW0gbnVtYmVyIG9mIGludGVnZXIgZGlnaXRzIGJlZm9yZSB0aGUgZGVjaW1hbCBwb2ludC5cbiAgICogRGVmYXVsdCBpcyBgMWAuXG4gICAqICAgLSBgbWluRnJhY3Rpb25EaWdpdHNgOiBUaGUgbWluaW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIHRoZSBkZWNpbWFsIHBvaW50LlxuICAgKiBEZWZhdWx0IGlzIGAwYC5cbiAgICogICAtIGBtYXhGcmFjdGlvbkRpZ2l0c2A6IFRoZSBtYXhpbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgdGhlIGRlY2ltYWwgcG9pbnQuXG4gICAqIERlZmF1bHQgaXMgYDNgLlxuICAgKiBAcGFyYW0gbG9jYWxlIEEgbG9jYWxlIGNvZGUgZm9yIHRoZSBsb2NhbGUgZm9ybWF0IHJ1bGVzIHRvIHVzZS5cbiAgICogV2hlbiBub3Qgc3VwcGxpZWQsIHVzZXMgdGhlIHZhbHVlIG9mIGBMT0NBTEVfSURgLCB3aGljaCBpcyBgZW4tVVNgIGJ5IGRlZmF1bHQuXG4gICAqIFNlZSBbU2V0dGluZyB5b3VyIGFwcCBsb2NhbGVdKGd1aWRlL2kxOG4jc2V0dGluZy11cC10aGUtbG9jYWxlLW9mLXlvdXItYXBwKS5cbiAgICovXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBkaWdpdHNJbmZvPzogc3RyaW5nLCBsb2NhbGU/OiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gICAgaWYgKGlzRW1wdHkodmFsdWUpKSByZXR1cm4gbnVsbDtcblxuICAgIGxvY2FsZSA9IGxvY2FsZSB8fCB0aGlzLl9sb2NhbGU7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgbnVtID0gc3RyVG9OdW1iZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIGZvcm1hdFBlcmNlbnQobnVtLCBsb2NhbGUsIGRpZ2l0c0luZm8pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBpbnZhbGlkUGlwZUFyZ3VtZW50RXJyb3IoUGVyY2VudFBpcGUsIGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBuZ01vZHVsZSBDb21tb25Nb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRyYW5zZm9ybXMgYSBudW1iZXIgdG8gYSBjdXJyZW5jeSBzdHJpbmcsIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG8gbG9jYWxlIHJ1bGVzXG4gKiB0aGF0IGRldGVybWluZSBncm91cCBzaXppbmcgYW5kIHNlcGFyYXRvciwgZGVjaW1hbC1wb2ludCBjaGFyYWN0ZXIsXG4gKiBhbmQgb3RoZXIgbG9jYWxlLXNwZWNpZmljIGNvbmZpZ3VyYXRpb25zLlxuICpcbiAqIEBzZWUgYGdldEN1cnJlbmN5U3ltYm9sKClgXG4gKiBAc2VlIGBmb3JtYXRDdXJyZW5jeSgpYFxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBUaGUgZm9sbG93aW5nIGNvZGUgc2hvd3MgaG93IHRoZSBwaXBlIHRyYW5zZm9ybXMgbnVtYmVyc1xuICogaW50byB0ZXh0IHN0cmluZ3MsIGFjY29yZGluZyB0byB2YXJpb3VzIGZvcm1hdCBzcGVjaWZpY2F0aW9ucyxcbiAqIHdoZXJlIHRoZSBjYWxsZXIncyBkZWZhdWx0IGxvY2FsZSBpcyBgZW4tVVNgLlxuICpcbiAqIDxjb2RlLWV4YW1wbGUgcGF0aD1cImNvbW1vbi9waXBlcy90cy9jdXJyZW5jeV9waXBlLnRzXCIgcmVnaW9uPSdDdXJyZW5jeVBpcGUnPjwvY29kZS1leGFtcGxlPlxuICpcbiAqXG4gKi9cbkBQaXBlKHtuYW1lOiAnY3VycmVuY3knfSlcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgX2xvY2FsZTogc3RyaW5nKSB7fVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIG51bWJlciB0byBiZSBmb3JtYXR0ZWQgYXMgY3VycmVuY3kuXG4gICAqIEBwYXJhbSBjdXJyZW5jeUNvZGUgVGhlIFtJU08gNDIxN10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPXzQyMTcpIGN1cnJlbmN5IGNvZGUsXG4gICAqIHN1Y2ggYXMgYFVTRGAgZm9yIHRoZSBVUyBkb2xsYXIgYW5kIGBFVVJgIGZvciB0aGUgZXVyby5cbiAgICogQHBhcmFtIGRpc3BsYXkgVGhlIGZvcm1hdCBmb3IgdGhlIGN1cnJlbmN5IGluZGljYXRvci4gT25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAqICAgLSBgY29kZWA6IFNob3cgdGhlIGNvZGUgKHN1Y2ggYXMgYFVTRGApLlxuICAgKiAgIC0gYHN5bWJvbGAoZGVmYXVsdCk6IFNob3cgdGhlIHN5bWJvbCAoc3VjaCBhcyBgJGApLlxuICAgKiAgIC0gYHN5bWJvbC1uYXJyb3dgOiBVc2UgdGhlIG5hcnJvdyBzeW1ib2wgZm9yIGxvY2FsZXMgdGhhdCBoYXZlIHR3byBzeW1ib2xzIGZvciB0aGVpclxuICAgKiBjdXJyZW5jeS5cbiAgICogRm9yIGV4YW1wbGUsIHRoZSBDYW5hZGlhbiBkb2xsYXIgQ0FEIGhhcyB0aGUgc3ltYm9sIGBDQSRgIGFuZCB0aGUgc3ltYm9sLW5hcnJvdyBgJGAuIElmIHRoZVxuICAgKiBsb2NhbGUgaGFzIG5vIG5hcnJvdyBzeW1ib2wsIHVzZXMgdGhlIHN0YW5kYXJkIHN5bWJvbCBmb3IgdGhlIGxvY2FsZS5cbiAgICogICAtIFN0cmluZzogVXNlIHRoZSBnaXZlbiBzdHJpbmcgdmFsdWUgaW5zdGVhZCBvZiBhIGNvZGUgb3IgYSBzeW1ib2wuXG4gICAqICAgLSBCb29sZWFuIChtYXJrZWQgZGVwcmVjYXRlZCBpbiB2NSk6IGB0cnVlYCBmb3Igc3ltYm9sIGFuZCBmYWxzZSBmb3IgYGNvZGVgLlxuICAgKlxuICAgKiBAcGFyYW0gZGlnaXRzSW5mbyBEZWNpbWFsIHJlcHJlc2VudGF0aW9uIG9wdGlvbnMsIHNwZWNpZmllZCBieSBhIHN0cmluZ1xuICAgKiBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDo8YnI+XG4gICAqIDxjb2RlPnttaW5JbnRlZ2VyRGlnaXRzfS57bWluRnJhY3Rpb25EaWdpdHN9LXttYXhGcmFjdGlvbkRpZ2l0c308L2NvZGU+LlxuICAgKiAgIC0gYG1pbkludGVnZXJEaWdpdHNgOiBUaGUgbWluaW11bSBudW1iZXIgb2YgaW50ZWdlciBkaWdpdHMgYmVmb3JlIHRoZSBkZWNpbWFsIHBvaW50LlxuICAgKiBEZWZhdWx0IGlzIGAxYC5cbiAgICogICAtIGBtaW5GcmFjdGlvbkRpZ2l0c2A6IFRoZSBtaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgdGhlIGRlY2ltYWwgcG9pbnQuXG4gICAqIERlZmF1bHQgaXMgYDBgLlxuICAgKiAgIC0gYG1heEZyYWN0aW9uRGlnaXRzYDogVGhlIG1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciB0aGUgZGVjaW1hbCBwb2ludC5cbiAgICogRGVmYXVsdCBpcyBgM2AuXG4gICAqIElmIG5vdCBwcm92aWRlZCwgdGhlIG51bWJlciB3aWxsIGJlIGZvcm1hdHRlZCB3aXRoIHRoZSBwcm9wZXIgYW1vdW50IG9mIGRpZ2l0cyxcbiAgICogZGVwZW5kaW5nIG9uIHdoYXQgdGhlIFtJU08gNDIxN10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPXzQyMTcpIHNwZWNpZmllcy5cbiAgICogRm9yIGV4YW1wbGUsIHRoZSBDYW5hZGlhbiBkb2xsYXIgaGFzIDIgZGlnaXRzLCB3aGVyZWFzIHRoZSBDaGlsZWFuIHBlc28gaGFzIG5vbmUuXG4gICAqIEBwYXJhbSBsb2NhbGUgQSBsb2NhbGUgY29kZSBmb3IgdGhlIGxvY2FsZSBmb3JtYXQgcnVsZXMgdG8gdXNlLlxuICAgKiBXaGVuIG5vdCBzdXBwbGllZCwgdXNlcyB0aGUgdmFsdWUgb2YgYExPQ0FMRV9JRGAsIHdoaWNoIGlzIGBlbi1VU2AgYnkgZGVmYXVsdC5cbiAgICogU2VlIFtTZXR0aW5nIHlvdXIgYXBwIGxvY2FsZV0oZ3VpZGUvaTE4biNzZXR0aW5nLXVwLXRoZS1sb2NhbGUtb2YteW91ci1hcHApLlxuICAgKi9cbiAgdHJhbnNmb3JtKFxuICAgICAgdmFsdWU6IGFueSwgY3VycmVuY3lDb2RlPzogc3RyaW5nLFxuICAgICAgZGlzcGxheTogJ2NvZGUnfCdzeW1ib2wnfCdzeW1ib2wtbmFycm93J3xzdHJpbmd8Ym9vbGVhbiA9ICdzeW1ib2wnLCBkaWdpdHNJbmZvPzogc3RyaW5nLFxuICAgICAgbG9jYWxlPzogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIGlmIChpc0VtcHR5KHZhbHVlKSkgcmV0dXJuIG51bGw7XG5cbiAgICBsb2NhbGUgPSBsb2NhbGUgfHwgdGhpcy5fbG9jYWxlO1xuXG4gICAgaWYgKHR5cGVvZiBkaXNwbGF5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIGlmICg8YW55PmNvbnNvbGUgJiYgPGFueT5jb25zb2xlLndhcm4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFdhcm5pbmc6IHRoZSBjdXJyZW5jeSBwaXBlIGhhcyBiZWVuIGNoYW5nZWQgaW4gQW5ndWxhciB2NS4gVGhlIHN5bWJvbERpc3BsYXkgb3B0aW9uICh0aGlyZCBwYXJhbWV0ZXIpIGlzIG5vdyBhIHN0cmluZyBpbnN0ZWFkIG9mIGEgYm9vbGVhbi4gVGhlIGFjY2VwdGVkIHZhbHVlcyBhcmUgXCJjb2RlXCIsIFwic3ltYm9sXCIgb3IgXCJzeW1ib2wtbmFycm93XCIuYCk7XG4gICAgICB9XG4gICAgICBkaXNwbGF5ID0gZGlzcGxheSA/ICdzeW1ib2wnIDogJ2NvZGUnO1xuICAgIH1cblxuICAgIGxldCBjdXJyZW5jeTogc3RyaW5nID0gY3VycmVuY3lDb2RlIHx8ICdVU0QnO1xuICAgIGlmIChkaXNwbGF5ICE9PSAnY29kZScpIHtcbiAgICAgIGlmIChkaXNwbGF5ID09PSAnc3ltYm9sJyB8fCBkaXNwbGF5ID09PSAnc3ltYm9sLW5hcnJvdycpIHtcbiAgICAgICAgY3VycmVuY3kgPSBnZXRDdXJyZW5jeVN5bWJvbChjdXJyZW5jeSwgZGlzcGxheSA9PT0gJ3N5bWJvbCcgPyAnd2lkZScgOiAnbmFycm93JywgbG9jYWxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbmN5ID0gZGlzcGxheTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgbnVtID0gc3RyVG9OdW1iZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIGZvcm1hdEN1cnJlbmN5KG51bSwgbG9jYWxlLCBjdXJyZW5jeSwgY3VycmVuY3lDb2RlLCBkaWdpdHNJbmZvKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgaW52YWxpZFBpcGVBcmd1bWVudEVycm9yKEN1cnJlbmN5UGlwZSwgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycgfHwgdmFsdWUgIT09IHZhbHVlO1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSBzdHJpbmcgaW50byBhIG51bWJlciAoaWYgbmVlZGVkKS5cbiAqL1xuZnVuY3Rpb24gc3RyVG9OdW1iZXIodmFsdWU6IG51bWJlciB8IHN0cmluZyk6IG51bWJlciB7XG4gIC8vIENvbnZlcnQgc3RyaW5ncyB0byBudW1iZXJzXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmICFpc05hTihOdW1iZXIodmFsdWUpIC0gcGFyc2VGbG9hdCh2YWx1ZSkpKSB7XG4gICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dmFsdWV9IGlzIG5vdCBhIG51bWJlcmApO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cbiJdfQ==