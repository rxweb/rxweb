/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, LOCALE_ID, Pipe } from '@angular/core';
import { NUMBER_FORMAT_REGEXP, parseIntAutoRadix } from '../../i18n/format_number';
import { NumberFormatStyle } from '../../i18n/locale_data_api';
import { invalidPipeArgumentError } from '../invalid_pipe_argument_error';
import { NumberFormatter } from './intl';
function formatNumber(pipe, locale, value, style, digits, currency, currencyAsSymbol) {
    if (currency === void 0) { currency = null; }
    if (currencyAsSymbol === void 0) { currencyAsSymbol = false; }
    if (value == null)
        return null;
    // Convert strings to numbers
    value = typeof value === 'string' && !isNaN(+value - parseFloat(value)) ? +value : value;
    if (typeof value !== 'number') {
        throw invalidPipeArgumentError(pipe, value);
    }
    var minInt;
    var minFraction;
    var maxFraction;
    if (style !== NumberFormatStyle.Currency) {
        // rely on Intl default for currency
        minInt = 1;
        minFraction = 0;
        maxFraction = 3;
    }
    if (digits) {
        var parts = digits.match(NUMBER_FORMAT_REGEXP);
        if (parts === null) {
            throw new Error(digits + " is not a valid digit info for number pipes");
        }
        if (parts[1] != null) { // min integer digits
            minInt = parseIntAutoRadix(parts[1]);
        }
        if (parts[3] != null) { // min fraction digits
            minFraction = parseIntAutoRadix(parts[3]);
        }
        if (parts[5] != null) { // max fraction digits
            maxFraction = parseIntAutoRadix(parts[5]);
        }
    }
    return NumberFormatter.format(value, locale, style, {
        minimumIntegerDigits: minInt,
        minimumFractionDigits: minFraction,
        maximumFractionDigits: maxFraction,
        currency: currency,
        currencyAsSymbol: currencyAsSymbol,
    });
}
/**
 * @ngModule CommonModule
 *
 * Formats a number as text. Group sizing and separator and other locale-specific
 * configurations are based on the active locale.
 *
 * where `expression` is a number:
 *  - `digitInfo` is a `string` which has a following format: <br>
 *     <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>
 *   - `minIntegerDigits` is the minimum number of integer digits to use. Defaults to `1`.
 *   - `minFractionDigits` is the minimum number of digits after fraction. Defaults to `0`.
 *   - `maxFractionDigits` is the maximum number of digits after fraction. Defaults to `3`.
 *
 * For more information on the acceptable range for each of these numbers and other
 * details see your native internationalization library.
 *
 * WARNING: this pipe uses the Internationalization API which is not yet available in all browsers
 * and may require a polyfill. See [Browser Support](guide/browser-support) for details.
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example common/pipes/ts/number_pipe.ts region='DeprecatedNumberPipe'}
 *
 */
var DeprecatedDecimalPipe = /** @class */ (function () {
    function DeprecatedDecimalPipe(_locale) {
        this._locale = _locale;
    }
    DeprecatedDecimalPipe.prototype.transform = function (value, digits) {
        return formatNumber(DeprecatedDecimalPipe, this._locale, value, NumberFormatStyle.Decimal, digits);
    };
    DeprecatedDecimalPipe.decorators = [
        { type: Pipe, args: [{ name: 'number' },] }
    ];
    /** @nocollapse */
    DeprecatedDecimalPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return DeprecatedDecimalPipe;
}());
export { DeprecatedDecimalPipe };
/**
 * @ngModule CommonModule
 *
 * @description
 *
 * Formats a number as percentage according to locale rules.
 *
 * - `digitInfo` See {@link DecimalPipe} for detailed description.
 *
 * WARNING: this pipe uses the Internationalization API which is not yet available in all browsers
 * and may require a polyfill. See [Browser Support](guide/browser-support) for details.
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example common/pipes/ts/percent_pipe.ts region='DeprecatedPercentPipe'}
 *
 *
 */
var DeprecatedPercentPipe = /** @class */ (function () {
    function DeprecatedPercentPipe(_locale) {
        this._locale = _locale;
    }
    DeprecatedPercentPipe.prototype.transform = function (value, digits) {
        return formatNumber(DeprecatedPercentPipe, this._locale, value, NumberFormatStyle.Percent, digits);
    };
    DeprecatedPercentPipe.decorators = [
        { type: Pipe, args: [{ name: 'percent' },] }
    ];
    /** @nocollapse */
    DeprecatedPercentPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return DeprecatedPercentPipe;
}());
export { DeprecatedPercentPipe };
/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a number as currency using locale rules.
 *
 * Use `currency` to format a number as currency.
 *
 * - `currencyCode` is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code, such
 *    as `USD` for the US dollar and `EUR` for the euro.
 * - `symbolDisplay` is a boolean indicating whether to use the currency symbol or code.
 *   - `true`: use symbol (e.g. `$`).
 *   - `false`(default): use code (e.g. `USD`).
 * - `digitInfo` See {@link DecimalPipe} for detailed description.
 *
 * WARNING: this pipe uses the Internationalization API which is not yet available in all browsers
 * and may require a polyfill. See [Browser Support](guide/browser-support) for details.
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example common/pipes/ts/currency_pipe.ts region='DeprecatedCurrencyPipe'}
 *
 *
 */
var DeprecatedCurrencyPipe = /** @class */ (function () {
    function DeprecatedCurrencyPipe(_locale) {
        this._locale = _locale;
    }
    DeprecatedCurrencyPipe.prototype.transform = function (value, currencyCode, symbolDisplay, digits) {
        if (currencyCode === void 0) { currencyCode = 'USD'; }
        if (symbolDisplay === void 0) { symbolDisplay = false; }
        return formatNumber(DeprecatedCurrencyPipe, this._locale, value, NumberFormatStyle.Currency, digits, currencyCode, symbolDisplay);
    };
    DeprecatedCurrencyPipe.decorators = [
        { type: Pipe, args: [{ name: 'currency' },] }
    ];
    /** @nocollapse */
    DeprecatedCurrencyPipe.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return DeprecatedCurrencyPipe;
}());
export { DeprecatedCurrencyPipe };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyX3BpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL3BpcGVzL2RlcHJlY2F0ZWQvbnVtYmVyX3BpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXZDLHNCQUNJLElBQWUsRUFBRSxNQUFjLEVBQUUsS0FBc0IsRUFBRSxLQUF3QixFQUNqRixNQUFzQixFQUFFLFFBQThCLEVBQ3RELGdCQUFpQztJQURULHlCQUFBLEVBQUEsZUFBOEI7SUFDdEQsaUNBQUEsRUFBQSx3QkFBaUM7SUFDbkMsSUFBSSxLQUFLLElBQUksSUFBSTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRS9CLDZCQUE2QjtJQUM3QixLQUFLLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3pGLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzdCLE1BQU0sd0JBQXdCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzdDO0lBRUQsSUFBSSxNQUF3QixDQUFDO0lBQzdCLElBQUksV0FB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WSxDQUNmLHNCQUFzQixFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQy9FLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNuQyxDQUFDOztnQkFWRixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDOzs7OzZDQUVULE1BQU0sU0FBQyxTQUFTOztJQVMvQiw2QkFBQztDQUFBLEFBWEQsSUFXQztTQVZZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIExPQ0FMRV9JRCwgUGlwZSwgUGlwZVRyYW5zZm9ybSwgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05VTUJFUl9GT1JNQVRfUkVHRVhQLCBwYXJzZUludEF1dG9SYWRpeH0gZnJvbSAnLi4vLi4vaTE4bi9mb3JtYXRfbnVtYmVyJztcbmltcG9ydCB7TnVtYmVyRm9ybWF0U3R5bGV9IGZyb20gJy4uLy4uL2kxOG4vbG9jYWxlX2RhdGFfYXBpJztcbmltcG9ydCB7aW52YWxpZFBpcGVBcmd1bWVudEVycm9yfSBmcm9tICcuLi9pbnZhbGlkX3BpcGVfYXJndW1lbnRfZXJyb3InO1xuaW1wb3J0IHtOdW1iZXJGb3JtYXR0ZXJ9IGZyb20gJy4vaW50bCc7XG5cbmZ1bmN0aW9uIGZvcm1hdE51bWJlcihcbiAgICBwaXBlOiBUeXBlPGFueT4sIGxvY2FsZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nLCBzdHlsZTogTnVtYmVyRm9ybWF0U3R5bGUsXG4gICAgZGlnaXRzPzogc3RyaW5nIHwgbnVsbCwgY3VycmVuY3k6IHN0cmluZyB8IG51bGwgPSBudWxsLFxuICAgIGN1cnJlbmN5QXNTeW1ib2w6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZ3xudWxsIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBudWxsO1xuXG4gIC8vIENvbnZlcnQgc3RyaW5ncyB0byBudW1iZXJzXG4gIHZhbHVlID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAhaXNOYU4oK3ZhbHVlIC0gcGFyc2VGbG9hdCh2YWx1ZSkpID8gK3ZhbHVlIDogdmFsdWU7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgaW52YWxpZFBpcGVBcmd1bWVudEVycm9yKHBpcGUsIHZhbHVlKTtcbiAgfVxuXG4gIGxldCBtaW5JbnQ6IG51bWJlcnx1bmRlZmluZWQ7XG4gIGxldCBtaW5GcmFjdGlvbjogbnVtYmVyfHVuZGVmaW5lZDtcbiAgbGV0IG1heEZyYWN0aW9uOiBudW1iZXJ8dW5kZWZpbmVkO1xuICBpZiAoc3R5bGUgIT09IE51bWJlckZvcm1hdFN0eWxlLkN1cnJlbmN5KSB7XG4gICAgLy8gcmVseSBvbiBJbnRsIGRlZmF1bHQgZm9yIGN1cnJlbmN5XG4gICAgbWluSW50ID0gMTtcbiAgICBtaW5GcmFjdGlvbiA9IDA7XG4gICAgbWF4RnJhY3Rpb24gPSAzO1xuICB9XG5cbiAgaWYgKGRpZ2l0cykge1xuICAgIGNvbnN0IHBhcnRzID0gZGlnaXRzLm1hdGNoKE5VTUJFUl9GT1JNQVRfUkVHRVhQKTtcbiAgICBpZiAocGFydHMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtkaWdpdHN9IGlzIG5vdCBhIHZhbGlkIGRpZ2l0IGluZm8gZm9yIG51bWJlciBwaXBlc2ApO1xuICAgIH1cbiAgICBpZiAocGFydHNbMV0gIT0gbnVsbCkgeyAgLy8gbWluIGludGVnZXIgZGlnaXRzXG4gICAgICBtaW5JbnQgPSBwYXJzZUludEF1dG9SYWRpeChwYXJ0c1sxXSk7XG4gICAgfVxuICAgIGlmIChwYXJ0c1szXSAhPSBudWxsKSB7ICAvLyBtaW4gZnJhY3Rpb24gZGlnaXRzXG4gICAgICBtaW5GcmFjdGlvbiA9IHBhcnNlSW50QXV0b1JhZGl4KHBhcnRzWzNdKTtcbiAgICB9XG4gICAgaWYgKHBhcnRzWzVdICE9IG51bGwpIHsgIC8vIG1heCBmcmFjdGlvbiBkaWdpdHNcbiAgICAgIG1heEZyYWN0aW9uID0gcGFyc2VJbnRBdXRvUmFkaXgocGFydHNbNV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBOdW1iZXJGb3JtYXR0ZXIuZm9ybWF0KHZhbHVlIGFzIG51bWJlciwgbG9jYWxlLCBzdHlsZSwge1xuICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzOiBtaW5JbnQsXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBtaW5GcmFjdGlvbixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG1heEZyYWN0aW9uLFxuICAgIGN1cnJlbmN5OiBjdXJyZW5jeSxcbiAgICBjdXJyZW5jeUFzU3ltYm9sOiBjdXJyZW5jeUFzU3ltYm9sLFxuICB9KTtcbn1cblxuLyoqXG4gKiBAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKlxuICogRm9ybWF0cyBhIG51bWJlciBhcyB0ZXh0LiBHcm91cCBzaXppbmcgYW5kIHNlcGFyYXRvciBhbmQgb3RoZXIgbG9jYWxlLXNwZWNpZmljXG4gKiBjb25maWd1cmF0aW9ucyBhcmUgYmFzZWQgb24gdGhlIGFjdGl2ZSBsb2NhbGUuXG4gKlxuICogd2hlcmUgYGV4cHJlc3Npb25gIGlzIGEgbnVtYmVyOlxuICogIC0gYGRpZ2l0SW5mb2AgaXMgYSBgc3RyaW5nYCB3aGljaCBoYXMgYSBmb2xsb3dpbmcgZm9ybWF0OiA8YnI+XG4gKiAgICAgPGNvZGU+e21pbkludGVnZXJEaWdpdHN9LnttaW5GcmFjdGlvbkRpZ2l0c30te21heEZyYWN0aW9uRGlnaXRzfTwvY29kZT5cbiAqICAgLSBgbWluSW50ZWdlckRpZ2l0c2AgaXMgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGludGVnZXIgZGlnaXRzIHRvIHVzZS4gRGVmYXVsdHMgdG8gYDFgLlxuICogICAtIGBtaW5GcmFjdGlvbkRpZ2l0c2AgaXMgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBmcmFjdGlvbi4gRGVmYXVsdHMgdG8gYDBgLlxuICogICAtIGBtYXhGcmFjdGlvbkRpZ2l0c2AgaXMgdGhlIG1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBmcmFjdGlvbi4gRGVmYXVsdHMgdG8gYDNgLlxuICpcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIHRoZSBhY2NlcHRhYmxlIHJhbmdlIGZvciBlYWNoIG9mIHRoZXNlIG51bWJlcnMgYW5kIG90aGVyXG4gKiBkZXRhaWxzIHNlZSB5b3VyIG5hdGl2ZSBpbnRlcm5hdGlvbmFsaXphdGlvbiBsaWJyYXJ5LlxuICpcbiAqIFdBUk5JTkc6IHRoaXMgcGlwZSB1c2VzIHRoZSBJbnRlcm5hdGlvbmFsaXphdGlvbiBBUEkgd2hpY2ggaXMgbm90IHlldCBhdmFpbGFibGUgaW4gYWxsIGJyb3dzZXJzXG4gKiBhbmQgbWF5IHJlcXVpcmUgYSBwb2x5ZmlsbC4gU2VlIFtCcm93c2VyIFN1cHBvcnRdKGd1aWRlL2Jyb3dzZXItc3VwcG9ydCkgZm9yIGRldGFpbHMuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb21tb24vcGlwZXMvdHMvbnVtYmVyX3BpcGUudHMgcmVnaW9uPSdEZXByZWNhdGVkTnVtYmVyUGlwZSd9XG4gKlxuICovXG5AUGlwZSh7bmFtZTogJ251bWJlcid9KVxuZXhwb3J0IGNsYXNzIERlcHJlY2F0ZWREZWNpbWFsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmcpIHt9XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGRpZ2l0cz86IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gZm9ybWF0TnVtYmVyKFxuICAgICAgICBEZXByZWNhdGVkRGVjaW1hbFBpcGUsIHRoaXMuX2xvY2FsZSwgdmFsdWUsIE51bWJlckZvcm1hdFN0eWxlLkRlY2ltYWwsIGRpZ2l0cyk7XG4gIH1cbn1cblxuLyoqXG4gKiBAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogRm9ybWF0cyBhIG51bWJlciBhcyBwZXJjZW50YWdlIGFjY29yZGluZyB0byBsb2NhbGUgcnVsZXMuXG4gKlxuICogLSBgZGlnaXRJbmZvYCBTZWUge0BsaW5rIERlY2ltYWxQaXBlfSBmb3IgZGV0YWlsZWQgZGVzY3JpcHRpb24uXG4gKlxuICogV0FSTklORzogdGhpcyBwaXBlIHVzZXMgdGhlIEludGVybmF0aW9uYWxpemF0aW9uIEFQSSB3aGljaCBpcyBub3QgeWV0IGF2YWlsYWJsZSBpbiBhbGwgYnJvd3NlcnNcbiAqIGFuZCBtYXkgcmVxdWlyZSBhIHBvbHlmaWxsLiBTZWUgW0Jyb3dzZXIgU3VwcG9ydF0oZ3VpZGUvYnJvd3Nlci1zdXBwb3J0KSBmb3IgZGV0YWlscy5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvbW1vbi9waXBlcy90cy9wZXJjZW50X3BpcGUudHMgcmVnaW9uPSdEZXByZWNhdGVkUGVyY2VudFBpcGUnfVxuICpcbiAqXG4gKi9cbkBQaXBlKHtuYW1lOiAncGVyY2VudCd9KVxuZXhwb3J0IGNsYXNzIERlcHJlY2F0ZWRQZXJjZW50UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmcpIHt9XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGRpZ2l0cz86IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gZm9ybWF0TnVtYmVyKFxuICAgICAgICBEZXByZWNhdGVkUGVyY2VudFBpcGUsIHRoaXMuX2xvY2FsZSwgdmFsdWUsIE51bWJlckZvcm1hdFN0eWxlLlBlcmNlbnQsIGRpZ2l0cyk7XG4gIH1cbn1cblxuLyoqXG4gKiBAbmdNb2R1bGUgQ29tbW9uTW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBGb3JtYXRzIGEgbnVtYmVyIGFzIGN1cnJlbmN5IHVzaW5nIGxvY2FsZSBydWxlcy5cbiAqXG4gKiBVc2UgYGN1cnJlbmN5YCB0byBmb3JtYXQgYSBudW1iZXIgYXMgY3VycmVuY3kuXG4gKlxuICogLSBgY3VycmVuY3lDb2RlYCBpcyB0aGUgW0lTTyA0MjE3XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fNDIxNykgY3VycmVuY3kgY29kZSwgc3VjaFxuICogICAgYXMgYFVTRGAgZm9yIHRoZSBVUyBkb2xsYXIgYW5kIGBFVVJgIGZvciB0aGUgZXVyby5cbiAqIC0gYHN5bWJvbERpc3BsYXlgIGlzIGEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gdXNlIHRoZSBjdXJyZW5jeSBzeW1ib2wgb3IgY29kZS5cbiAqICAgLSBgdHJ1ZWA6IHVzZSBzeW1ib2wgKGUuZy4gYCRgKS5cbiAqICAgLSBgZmFsc2VgKGRlZmF1bHQpOiB1c2UgY29kZSAoZS5nLiBgVVNEYCkuXG4gKiAtIGBkaWdpdEluZm9gIFNlZSB7QGxpbmsgRGVjaW1hbFBpcGV9IGZvciBkZXRhaWxlZCBkZXNjcmlwdGlvbi5cbiAqXG4gKiBXQVJOSU5HOiB0aGlzIHBpcGUgdXNlcyB0aGUgSW50ZXJuYXRpb25hbGl6YXRpb24gQVBJIHdoaWNoIGlzIG5vdCB5ZXQgYXZhaWxhYmxlIGluIGFsbCBicm93c2Vyc1xuICogYW5kIG1heSByZXF1aXJlIGEgcG9seWZpbGwuIFNlZSBbQnJvd3NlciBTdXBwb3J0XShndWlkZS9icm93c2VyLXN1cHBvcnQpIGZvciBkZXRhaWxzLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29tbW9uL3BpcGVzL3RzL2N1cnJlbmN5X3BpcGUudHMgcmVnaW9uPSdEZXByZWNhdGVkQ3VycmVuY3lQaXBlJ31cbiAqXG4gKlxuICovXG5AUGlwZSh7bmFtZTogJ2N1cnJlbmN5J30pXG5leHBvcnQgY2xhc3MgRGVwcmVjYXRlZEN1cnJlbmN5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KExPQ0FMRV9JRCkgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmcpIHt9XG5cbiAgdHJhbnNmb3JtKFxuICAgICAgdmFsdWU6IGFueSwgY3VycmVuY3lDb2RlOiBzdHJpbmcgPSAnVVNEJywgc3ltYm9sRGlzcGxheTogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgZGlnaXRzPzogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiBmb3JtYXROdW1iZXIoXG4gICAgICAgIERlcHJlY2F0ZWRDdXJyZW5jeVBpcGUsIHRoaXMuX2xvY2FsZSwgdmFsdWUsIE51bWJlckZvcm1hdFN0eWxlLkN1cnJlbmN5LCBkaWdpdHMsXG4gICAgICAgIGN1cnJlbmN5Q29kZSwgc3ltYm9sRGlzcGxheSk7XG4gIH1cbn1cbiJdfQ==