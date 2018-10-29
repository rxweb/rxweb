/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
  */
import * as tslib_1 from "tslib";
import { Inject, LOCALE_ID, Pipe } from '@angular/core';
import { ISO8601_DATE_REGEX, isoStringToDate } from '../../i18n/format_date';
import { invalidPipeArgumentError } from '../invalid_pipe_argument_error';
import { DateFormatter } from './intl';
/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a date according to locale rules.
 *
 * Where:
 * - `expression` is a date object or a number (milliseconds since UTC epoch) or an ISO string
 * (https://www.w3.org/TR/NOTE-datetime).
 * - `format` indicates which date/time components to include. The format can be predefined as
 *   shown below or custom as shown in the table.
 *   - `'medium'`: equivalent to `'yMMMdjms'` (e.g. `Sep 3, 2010, 12:05:08 PM` for `en-US`)
 *   - `'short'`: equivalent to `'yMdjm'` (e.g. `9/3/2010, 12:05 PM` for `en-US`)
 *   - `'fullDate'`: equivalent to `'yMMMMEEEEd'` (e.g. `Friday, September 3, 2010` for `en-US`)
 *   - `'longDate'`: equivalent to `'yMMMMd'` (e.g. `September 3, 2010` for `en-US`)
 *   - `'mediumDate'`: equivalent to `'yMMMd'` (e.g. `Sep 3, 2010` for `en-US`)
 *   - `'shortDate'`: equivalent to `'yMd'` (e.g. `9/3/2010` for `en-US`)
 *   - `'mediumTime'`: equivalent to `'jms'` (e.g. `12:05:08 PM` for `en-US`)
 *   - `'shortTime'`: equivalent to `'jm'` (e.g. `12:05 PM` for `en-US`)
 *
 *
 *  | Component | Symbol | Narrow | Short Form   | Long Form         | Numeric   | 2-digit   |
 *  |-----------|:------:|--------|--------------|-------------------|-----------|-----------|
 *  | era       |   G    | G (A)  | GGG (AD)     | GGGG (Anno Domini)| -         | -         |
 *  | year      |   y    | -      | -            | -                 | y (2015)  | yy (15)   |
 *  | month     |   M    | L (S)  | MMM (Sep)    | MMMM (September)  | M (9)     | MM (09)   |
 *  | day       |   d    | -      | -            | -                 | d (3)     | dd (03)   |
 *  | weekday   |   E    | E (S)  | EEE (Sun)    | EEEE (Sunday)     | -         | -         |
 *  | hour      |   j    | -      | -            | -                 | j (13)    | jj (13)   |
 *  | hour12    |   h    | -      | -            | -                 | h (1 PM)  | hh (01 PM)|
 *  | hour24    |   H    | -      | -            | -                 | H (13)    | HH (13)   |
 *  | minute    |   m    | -      | -            | -                 | m (5)     | mm (05)   |
 *  | second    |   s    | -      | -            | -                 | s (9)     | ss (09)   |
 *  | timezone  |   z    | -      | -            | z (Pacific Standard Time)| -  | -         |
 *  | timezone  |   Z    | -      | Z (GMT-8:00) | -                 | -         | -         |
 *  | timezone  |   a    | -      | a (PM)       | -                 | -         | -         |
 *
 * In javascript, only the components specified will be respected (not the ordering,
 * punctuations, ...) and details of the formatting will be dependent on the locale.
 *
 * Timezone of the formatted text will be the local system timezone of the end-user's machine.
 *
 * When the expression is a ISO string without time (e.g. 2016-09-19) the time zone offset is not
 * applied and the formatted text will have the same day, month and year of the expression.
 *
 * WARNINGS:
 * - this pipe is marked as pure hence it will not be re-evaluated when the input is mutated.
 *   Instead users should treat the date as an immutable object and change the reference when the
 *   pipe needs to re-run (this is to avoid reformatting the date on every change detection run
 *   which would be an expensive operation).
 * - this pipe uses the Internationalization API. Therefore it is only reliable in Chrome and Opera
 *   browsers.
 *
 * @usageNotes
 *
 * ### Examples
 *
 * Assuming `dateObj` is (year: 2010, month: 9, day: 3, hour: 12 PM, minute: 05, second: 08)
 * in the _local_ time and locale is 'en-US':
 *
 * {@example common/pipes/ts/date_pipe.ts region='DeprecatedDatePipe'}
 *
 *
 */
var DeprecatedDatePipe = /** @class */ (function () {
    function DeprecatedDatePipe(_locale) {
        this._locale = _locale;
    }
    DeprecatedDatePipe_1 = DeprecatedDatePipe;
    DeprecatedDatePipe.prototype.transform = function (value, pattern) {
        if (pattern === void 0) { pattern = 'mediumDate'; }
        if (value == null || value === '' || value !== value)
            return null;
        var date;
        if (typeof value === 'string') {
            value = value.trim();
        }
        if (isDate(value)) {
            date = value;
        }
        else if (!isNaN(value - parseFloat(value))) {
            date = new Date(parseFloat(value));
        }
        else if (typeof value === 'string' && /^(\d{4}-\d{1,2}-\d{1,2})$/.test(value)) {
            /**
             * For ISO Strings without time the day, month and year must be extracted from the ISO String
             * before Date creation to avoid time offset and errors in the new Date.
             * If we only replace '-' with ',' in the ISO String ("2015,01,01"), and try to create a new
             * date, some browsers (e.g. IE 9) will throw an invalid Date error
             * If we leave the '-' ("2015-01-01") and try to create a new Date("2015-01-01") the
             * timeoffset
             * is applied
             * Note: ISO months are 0 for January, 1 for February, ...
             */
            var _a = tslib_1.__read(value.split('-').map(function (val) { return parseInt(val, 10); }), 3), y = _a[0], m = _a[1], d = _a[2];
            date = new Date(y, m - 1, d);
        }
        else {
            date = new Date(value);
        }
        if (!isDate(date)) {
            var match = void 0;
            if ((typeof value === 'string') && (match = value.match(ISO8601_DATE_REGEX))) {
                date = isoStringToDate(match);
            }
            else {
                throw invalidPipeArgumentError(DeprecatedDatePipe_1, value);
            }
        }
        return DateFormatter.format(date, this._locale, DeprecatedDatePipe_1._ALIASES[pattern] || pattern);
    };
    var DeprecatedDatePipe_1;
    /** @internal */
    DeprecatedDatePipe._ALIASES = {
        'medium': 'yMMMdjms',
        'short': 'yMdjm',
        'fullDate': 'yMMMMEEEEd',
        'longDate': 'yMMMMd',
        'mediumDate': 'yMMMd',
        'shortDate': 'yMd',
        'mediumTime': 'jms',
        'shortTime': 'jm'
    };
    DeprecatedDatePipe = DeprecatedDatePipe_1 = tslib_1.__decorate([
        Pipe({ name: 'date', pure: true }),
        tslib_1.__param(0, Inject(LOCALE_ID)),
        tslib_1.__metadata("design:paramtypes", [String])
    ], DeprecatedDatePipe);
    return DeprecatedDatePipe;
}());
export { DeprecatedDatePipe };
function isDate(value) {
    return value instanceof Date && !isNaN(value.valueOf());
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZV9waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tbW9uL3NyYy9waXBlcy9kZXByZWNhdGVkL2RhdGVfcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0lBTUk7O0FBRUosT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDM0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUVyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0RHO0FBRUg7SUFhRSw0QkFBdUMsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFBRyxDQUFDOzJCQWIvQyxrQkFBa0I7SUFlN0Isc0NBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxPQUE4QjtRQUE5Qix3QkFBQSxFQUFBLHNCQUE4QjtRQUNsRCxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUUsSUFBSSxLQUFLLEtBQUssS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRWxFLElBQUksSUFBVSxDQUFDO1FBRWYsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QjtRQUVELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLElBQUksR0FBRyxLQUFLLENBQUM7U0FDZDthQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzVDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLDJCQUEyQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMvRTs7Ozs7Ozs7O2VBU0c7WUFDRyxJQUFBLDBGQUFvRSxFQUFuRSxTQUFDLEVBQUUsU0FBQyxFQUFFLFNBQUMsQ0FBNkQ7WUFDM0UsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlCO2FBQU07WUFDTCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLElBQUksS0FBSyxTQUF1QixDQUFDO1lBQ2pDLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRTtnQkFDNUUsSUFBSSxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQjtpQkFBTTtnQkFDTCxNQUFNLHdCQUF3QixDQUFDLG9CQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzNEO1NBQ0Y7UUFFRCxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLG9CQUFrQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQztJQUMzRSxDQUFDOztJQXZERCxnQkFBZ0I7SUFDVCwyQkFBUSxHQUE0QjtRQUN6QyxRQUFRLEVBQUUsVUFBVTtRQUNwQixPQUFPLEVBQUUsT0FBTztRQUNoQixVQUFVLEVBQUUsWUFBWTtRQUN4QixVQUFVLEVBQUUsUUFBUTtRQUNwQixZQUFZLEVBQUUsT0FBTztRQUNyQixXQUFXLEVBQUUsS0FBSztRQUNsQixZQUFZLEVBQUUsS0FBSztRQUNuQixXQUFXLEVBQUUsSUFBSTtLQUNsQixDQUFDO0lBWFMsa0JBQWtCO1FBRDlCLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO1FBY2xCLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTs7T0FibkIsa0JBQWtCLENBeUQ5QjtJQUFELHlCQUFDO0NBQUEsQUF6REQsSUF5REM7U0F6RFksa0JBQWtCO0FBMkQvQixnQkFBZ0IsS0FBVTtJQUN4QixPQUFPLEtBQUssWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDMUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBAbGljZW5zZVxuKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbipcbiogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICAqL1xuXG5pbXBvcnQge0luamVjdCwgTE9DQUxFX0lELCBQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SVNPODYwMV9EQVRFX1JFR0VYLCBpc29TdHJpbmdUb0RhdGV9IGZyb20gJy4uLy4uL2kxOG4vZm9ybWF0X2RhdGUnO1xuaW1wb3J0IHtpbnZhbGlkUGlwZUFyZ3VtZW50RXJyb3J9IGZyb20gJy4uL2ludmFsaWRfcGlwZV9hcmd1bWVudF9lcnJvcic7XG5pbXBvcnQge0RhdGVGb3JtYXR0ZXJ9IGZyb20gJy4vaW50bCc7XG5cbi8qKlxuICogQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogRm9ybWF0cyBhIGRhdGUgYWNjb3JkaW5nIHRvIGxvY2FsZSBydWxlcy5cbiAqXG4gKiBXaGVyZTpcbiAqIC0gYGV4cHJlc3Npb25gIGlzIGEgZGF0ZSBvYmplY3Qgb3IgYSBudW1iZXIgKG1pbGxpc2Vjb25kcyBzaW5jZSBVVEMgZXBvY2gpIG9yIGFuIElTTyBzdHJpbmdcbiAqIChodHRwczovL3d3dy53My5vcmcvVFIvTk9URS1kYXRldGltZSkuXG4gKiAtIGBmb3JtYXRgIGluZGljYXRlcyB3aGljaCBkYXRlL3RpbWUgY29tcG9uZW50cyB0byBpbmNsdWRlLiBUaGUgZm9ybWF0IGNhbiBiZSBwcmVkZWZpbmVkIGFzXG4gKiAgIHNob3duIGJlbG93IG9yIGN1c3RvbSBhcyBzaG93biBpbiB0aGUgdGFibGUuXG4gKiAgIC0gYCdtZWRpdW0nYDogZXF1aXZhbGVudCB0byBgJ3lNTU1kam1zJ2AgKGUuZy4gYFNlcCAzLCAyMDEwLCAxMjowNTowOCBQTWAgZm9yIGBlbi1VU2ApXG4gKiAgIC0gYCdzaG9ydCdgOiBlcXVpdmFsZW50IHRvIGAneU1kam0nYCAoZS5nLiBgOS8zLzIwMTAsIDEyOjA1IFBNYCBmb3IgYGVuLVVTYClcbiAqICAgLSBgJ2Z1bGxEYXRlJ2A6IGVxdWl2YWxlbnQgdG8gYCd5TU1NTUVFRUVkJ2AgKGUuZy4gYEZyaWRheSwgU2VwdGVtYmVyIDMsIDIwMTBgIGZvciBgZW4tVVNgKVxuICogICAtIGAnbG9uZ0RhdGUnYDogZXF1aXZhbGVudCB0byBgJ3lNTU1NZCdgIChlLmcuIGBTZXB0ZW1iZXIgMywgMjAxMGAgZm9yIGBlbi1VU2ApXG4gKiAgIC0gYCdtZWRpdW1EYXRlJ2A6IGVxdWl2YWxlbnQgdG8gYCd5TU1NZCdgIChlLmcuIGBTZXAgMywgMjAxMGAgZm9yIGBlbi1VU2ApXG4gKiAgIC0gYCdzaG9ydERhdGUnYDogZXF1aXZhbGVudCB0byBgJ3lNZCdgIChlLmcuIGA5LzMvMjAxMGAgZm9yIGBlbi1VU2ApXG4gKiAgIC0gYCdtZWRpdW1UaW1lJ2A6IGVxdWl2YWxlbnQgdG8gYCdqbXMnYCAoZS5nLiBgMTI6MDU6MDggUE1gIGZvciBgZW4tVVNgKVxuICogICAtIGAnc2hvcnRUaW1lJ2A6IGVxdWl2YWxlbnQgdG8gYCdqbSdgIChlLmcuIGAxMjowNSBQTWAgZm9yIGBlbi1VU2ApXG4gKlxuICpcbiAqICB8IENvbXBvbmVudCB8IFN5bWJvbCB8IE5hcnJvdyB8IFNob3J0IEZvcm0gICB8IExvbmcgRm9ybSAgICAgICAgIHwgTnVtZXJpYyAgIHwgMi1kaWdpdCAgIHxcbiAqICB8LS0tLS0tLS0tLS18Oi0tLS0tLTp8LS0tLS0tLS18LS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLXwtLS0tLS0tLS0tLXxcbiAqICB8IGVyYSAgICAgICB8ICAgRyAgICB8IEcgKEEpICB8IEdHRyAoQUQpICAgICB8IEdHR0cgKEFubm8gRG9taW5pKXwgLSAgICAgICAgIHwgLSAgICAgICAgIHxcbiAqICB8IHllYXIgICAgICB8ICAgeSAgICB8IC0gICAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgeSAoMjAxNSkgIHwgeXkgKDE1KSAgIHxcbiAqICB8IG1vbnRoICAgICB8ICAgTSAgICB8IEwgKFMpICB8IE1NTSAoU2VwKSAgICB8IE1NTU0gKFNlcHRlbWJlcikgIHwgTSAoOSkgICAgIHwgTU0gKDA5KSAgIHxcbiAqICB8IGRheSAgICAgICB8ICAgZCAgICB8IC0gICAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgZCAoMykgICAgIHwgZGQgKDAzKSAgIHxcbiAqICB8IHdlZWtkYXkgICB8ICAgRSAgICB8IEUgKFMpICB8IEVFRSAoU3VuKSAgICB8IEVFRUUgKFN1bmRheSkgICAgIHwgLSAgICAgICAgIHwgLSAgICAgICAgIHxcbiAqICB8IGhvdXIgICAgICB8ICAgaiAgICB8IC0gICAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgaiAoMTMpICAgIHwgamogKDEzKSAgIHxcbiAqICB8IGhvdXIxMiAgICB8ICAgaCAgICB8IC0gICAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgaCAoMSBQTSkgIHwgaGggKDAxIFBNKXxcbiAqICB8IGhvdXIyNCAgICB8ICAgSCAgICB8IC0gICAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgSCAoMTMpICAgIHwgSEggKDEzKSAgIHxcbiAqICB8IG1pbnV0ZSAgICB8ICAgbSAgICB8IC0gICAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgbSAoNSkgICAgIHwgbW0gKDA1KSAgIHxcbiAqICB8IHNlY29uZCAgICB8ICAgcyAgICB8IC0gICAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgcyAoOSkgICAgIHwgc3MgKDA5KSAgIHxcbiAqICB8IHRpbWV6b25lICB8ICAgeiAgICB8IC0gICAgICB8IC0gICAgICAgICAgICB8IHogKFBhY2lmaWMgU3RhbmRhcmQgVGltZSl8IC0gIHwgLSAgICAgICAgIHxcbiAqICB8IHRpbWV6b25lICB8ICAgWiAgICB8IC0gICAgICB8IFogKEdNVC04OjAwKSB8IC0gICAgICAgICAgICAgICAgIHwgLSAgICAgICAgIHwgLSAgICAgICAgIHxcbiAqICB8IHRpbWV6b25lICB8ICAgYSAgICB8IC0gICAgICB8IGEgKFBNKSAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgLSAgICAgICAgIHwgLSAgICAgICAgIHxcbiAqXG4gKiBJbiBqYXZhc2NyaXB0LCBvbmx5IHRoZSBjb21wb25lbnRzIHNwZWNpZmllZCB3aWxsIGJlIHJlc3BlY3RlZCAobm90IHRoZSBvcmRlcmluZyxcbiAqIHB1bmN0dWF0aW9ucywgLi4uKSBhbmQgZGV0YWlscyBvZiB0aGUgZm9ybWF0dGluZyB3aWxsIGJlIGRlcGVuZGVudCBvbiB0aGUgbG9jYWxlLlxuICpcbiAqIFRpbWV6b25lIG9mIHRoZSBmb3JtYXR0ZWQgdGV4dCB3aWxsIGJlIHRoZSBsb2NhbCBzeXN0ZW0gdGltZXpvbmUgb2YgdGhlIGVuZC11c2VyJ3MgbWFjaGluZS5cbiAqXG4gKiBXaGVuIHRoZSBleHByZXNzaW9uIGlzIGEgSVNPIHN0cmluZyB3aXRob3V0IHRpbWUgKGUuZy4gMjAxNi0wOS0xOSkgdGhlIHRpbWUgem9uZSBvZmZzZXQgaXMgbm90XG4gKiBhcHBsaWVkIGFuZCB0aGUgZm9ybWF0dGVkIHRleHQgd2lsbCBoYXZlIHRoZSBzYW1lIGRheSwgbW9udGggYW5kIHllYXIgb2YgdGhlIGV4cHJlc3Npb24uXG4gKlxuICogV0FSTklOR1M6XG4gKiAtIHRoaXMgcGlwZSBpcyBtYXJrZWQgYXMgcHVyZSBoZW5jZSBpdCB3aWxsIG5vdCBiZSByZS1ldmFsdWF0ZWQgd2hlbiB0aGUgaW5wdXQgaXMgbXV0YXRlZC5cbiAqICAgSW5zdGVhZCB1c2VycyBzaG91bGQgdHJlYXQgdGhlIGRhdGUgYXMgYW4gaW1tdXRhYmxlIG9iamVjdCBhbmQgY2hhbmdlIHRoZSByZWZlcmVuY2Ugd2hlbiB0aGVcbiAqICAgcGlwZSBuZWVkcyB0byByZS1ydW4gKHRoaXMgaXMgdG8gYXZvaWQgcmVmb3JtYXR0aW5nIHRoZSBkYXRlIG9uIGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb24gcnVuXG4gKiAgIHdoaWNoIHdvdWxkIGJlIGFuIGV4cGVuc2l2ZSBvcGVyYXRpb24pLlxuICogLSB0aGlzIHBpcGUgdXNlcyB0aGUgSW50ZXJuYXRpb25hbGl6YXRpb24gQVBJLiBUaGVyZWZvcmUgaXQgaXMgb25seSByZWxpYWJsZSBpbiBDaHJvbWUgYW5kIE9wZXJhXG4gKiAgIGJyb3dzZXJzLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogIyMjIEV4YW1wbGVzXG4gKlxuICogQXNzdW1pbmcgYGRhdGVPYmpgIGlzICh5ZWFyOiAyMDEwLCBtb250aDogOSwgZGF5OiAzLCBob3VyOiAxMiBQTSwgbWludXRlOiAwNSwgc2Vjb25kOiAwOClcbiAqIGluIHRoZSBfbG9jYWxfIHRpbWUgYW5kIGxvY2FsZSBpcyAnZW4tVVMnOlxuICpcbiAqIHtAZXhhbXBsZSBjb21tb24vcGlwZXMvdHMvZGF0ZV9waXBlLnRzIHJlZ2lvbj0nRGVwcmVjYXRlZERhdGVQaXBlJ31cbiAqXG4gKlxuICovXG5AUGlwZSh7bmFtZTogJ2RhdGUnLCBwdXJlOiB0cnVlfSlcbmV4cG9ydCBjbGFzcyBEZXByZWNhdGVkRGF0ZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzdGF0aWMgX0FMSUFTRVM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICdtZWRpdW0nOiAneU1NTWRqbXMnLFxuICAgICdzaG9ydCc6ICd5TWRqbScsXG4gICAgJ2Z1bGxEYXRlJzogJ3lNTU1NRUVFRWQnLFxuICAgICdsb25nRGF0ZSc6ICd5TU1NTWQnLFxuICAgICdtZWRpdW1EYXRlJzogJ3lNTU1kJyxcbiAgICAnc2hvcnREYXRlJzogJ3lNZCcsXG4gICAgJ21lZGl1bVRpbWUnOiAnam1zJyxcbiAgICAnc2hvcnRUaW1lJzogJ2ptJ1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIF9sb2NhbGU6IHN0cmluZykge31cblxuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgcGF0dGVybjogc3RyaW5nID0gJ21lZGl1bURhdGUnKTogc3RyaW5nfG51bGwge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSAnJyB8fCB2YWx1ZSAhPT0gdmFsdWUpIHJldHVybiBudWxsO1xuXG4gICAgbGV0IGRhdGU6IERhdGU7XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSB2YWx1ZS50cmltKCk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIGRhdGUgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKCFpc05hTih2YWx1ZSAtIHBhcnNlRmxvYXQodmFsdWUpKSkge1xuICAgICAgZGF0ZSA9IG5ldyBEYXRlKHBhcnNlRmxvYXQodmFsdWUpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgL14oXFxkezR9LVxcZHsxLDJ9LVxcZHsxLDJ9KSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAvKipcbiAgICAgICAqIEZvciBJU08gU3RyaW5ncyB3aXRob3V0IHRpbWUgdGhlIGRheSwgbW9udGggYW5kIHllYXIgbXVzdCBiZSBleHRyYWN0ZWQgZnJvbSB0aGUgSVNPIFN0cmluZ1xuICAgICAgICogYmVmb3JlIERhdGUgY3JlYXRpb24gdG8gYXZvaWQgdGltZSBvZmZzZXQgYW5kIGVycm9ycyBpbiB0aGUgbmV3IERhdGUuXG4gICAgICAgKiBJZiB3ZSBvbmx5IHJlcGxhY2UgJy0nIHdpdGggJywnIGluIHRoZSBJU08gU3RyaW5nIChcIjIwMTUsMDEsMDFcIiksIGFuZCB0cnkgdG8gY3JlYXRlIGEgbmV3XG4gICAgICAgKiBkYXRlLCBzb21lIGJyb3dzZXJzIChlLmcuIElFIDkpIHdpbGwgdGhyb3cgYW4gaW52YWxpZCBEYXRlIGVycm9yXG4gICAgICAgKiBJZiB3ZSBsZWF2ZSB0aGUgJy0nIChcIjIwMTUtMDEtMDFcIikgYW5kIHRyeSB0byBjcmVhdGUgYSBuZXcgRGF0ZShcIjIwMTUtMDEtMDFcIikgdGhlXG4gICAgICAgKiB0aW1lb2Zmc2V0XG4gICAgICAgKiBpcyBhcHBsaWVkXG4gICAgICAgKiBOb3RlOiBJU08gbW9udGhzIGFyZSAwIGZvciBKYW51YXJ5LCAxIGZvciBGZWJydWFyeSwgLi4uXG4gICAgICAgKi9cbiAgICAgIGNvbnN0IFt5LCBtLCBkXSA9IHZhbHVlLnNwbGl0KCctJykubWFwKCh2YWw6IHN0cmluZykgPT4gcGFyc2VJbnQodmFsLCAxMCkpO1xuICAgICAgZGF0ZSA9IG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzRGF0ZShkYXRlKSkge1xuICAgICAgbGV0IG1hdGNoOiBSZWdFeHBNYXRjaEFycmF5fG51bGw7XG4gICAgICBpZiAoKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpICYmIChtYXRjaCA9IHZhbHVlLm1hdGNoKElTTzg2MDFfREFURV9SRUdFWCkpKSB7XG4gICAgICAgIGRhdGUgPSBpc29TdHJpbmdUb0RhdGUobWF0Y2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgaW52YWxpZFBpcGVBcmd1bWVudEVycm9yKERlcHJlY2F0ZWREYXRlUGlwZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBEYXRlRm9ybWF0dGVyLmZvcm1hdChcbiAgICAgICAgZGF0ZSwgdGhpcy5fbG9jYWxlLCBEZXByZWNhdGVkRGF0ZVBpcGUuX0FMSUFTRVNbcGF0dGVybl0gfHwgcGF0dGVybik7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNEYXRlKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBEYXRlIHtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiAhaXNOYU4odmFsdWUudmFsdWVPZigpKTtcbn1cbiJdfQ==