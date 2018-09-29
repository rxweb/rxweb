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
import { Pipe } from '@angular/core';
import { NgLocalization, getPluralCategory } from '../i18n/localization';
import { invalidPipeArgumentError } from './invalid_pipe_argument_error';
/** @type {?} */
const _INTERPOLATION_REGEXP = /#/g;
/**
 * \@ngModule CommonModule
 * \@description
 *
 * Maps a value to a string that pluralizes the value according to locale rules.
 *
 * \@usageNotes
 *
 * ### Example
 *
 * {\@example common/pipes/ts/i18n_pipe.ts region='I18nPluralPipeComponent'}
 *
 * \@experimental
 */
export class I18nPluralPipe {
    /**
     * @param {?} _localization
     */
    constructor(_localization) {
        this._localization = _localization;
    }
    /**
     * @param {?} value the number to be formatted
     * @param {?} pluralMap an object that mimics the ICU format, see
     * http://userguide.icu-project.org/formatparse/messages.
     * @param {?=} locale a `string` defining the locale to use (uses the current {\@link LOCALE_ID} by
     * default).
     * @return {?}
     */
    transform(value, pluralMap, locale) {
        if (value == null)
            return '';
        if (typeof pluralMap !== 'object' || pluralMap === null) {
            throw invalidPipeArgumentError(I18nPluralPipe, pluralMap);
        }
        /** @type {?} */
        const key = getPluralCategory(value, Object.keys(pluralMap), this._localization, locale);
        return pluralMap[key].replace(_INTERPOLATION_REGEXP, value.toString());
    }
}
I18nPluralPipe.decorators = [
    { type: Pipe, args: [{ name: 'i18nPlural', pure: true },] }
];
/** @nocollapse */
I18nPluralPipe.ctorParameters = () => [
    { type: NgLocalization }
];
if (false) {
    /** @type {?} */
    I18nPluralPipe.prototype._localization;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9wbHVyYWxfcGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9zcmMvcGlwZXMvaTE4bl9wbHVyYWxfcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBWSxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxjQUFjLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQzs7QUFFdkUsTUFBTSxxQkFBcUIsR0FBVyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQWlCM0MsTUFBTTs7OztJQUNKLFlBQW9CLGFBQTZCO1FBQTdCLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtLQUFJOzs7Ozs7Ozs7SUFTckQsU0FBUyxDQUFDLEtBQWEsRUFBRSxTQUFvQyxFQUFFLE1BQWU7UUFDNUUsSUFBSSxLQUFLLElBQUksSUFBSTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRTdCLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDdkQsTUFBTSx3QkFBd0IsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDM0Q7O1FBRUQsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV6RixPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDeEU7OztZQXJCRixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUM7Ozs7WUFuQjlCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TE9DQUxFX0lELCBQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdMb2NhbGl6YXRpb24sIGdldFBsdXJhbENhdGVnb3J5fSBmcm9tICcuLi9pMThuL2xvY2FsaXphdGlvbic7XG5pbXBvcnQge2ludmFsaWRQaXBlQXJndW1lbnRFcnJvcn0gZnJvbSAnLi9pbnZhbGlkX3BpcGVfYXJndW1lbnRfZXJyb3InO1xuXG5jb25zdCBfSU5URVJQT0xBVElPTl9SRUdFWFA6IFJlZ0V4cCA9IC8jL2c7XG5cbi8qKlxuICogQG5nTW9kdWxlIENvbW1vbk1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogTWFwcyBhIHZhbHVlIHRvIGEgc3RyaW5nIHRoYXQgcGx1cmFsaXplcyB0aGUgdmFsdWUgYWNjb3JkaW5nIHRvIGxvY2FsZSBydWxlcy5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvbW1vbi9waXBlcy90cy9pMThuX3BpcGUudHMgcmVnaW9uPSdJMThuUGx1cmFsUGlwZUNvbXBvbmVudCd9XG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5AUGlwZSh7bmFtZTogJ2kxOG5QbHVyYWwnLCBwdXJlOiB0cnVlfSlcbmV4cG9ydCBjbGFzcyBJMThuUGx1cmFsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9sb2NhbGl6YXRpb246IE5nTG9jYWxpemF0aW9uKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gdmFsdWUgdGhlIG51bWJlciB0byBiZSBmb3JtYXR0ZWRcbiAgICogQHBhcmFtIHBsdXJhbE1hcCBhbiBvYmplY3QgdGhhdCBtaW1pY3MgdGhlIElDVSBmb3JtYXQsIHNlZVxuICAgKiBodHRwOi8vdXNlcmd1aWRlLmljdS1wcm9qZWN0Lm9yZy9mb3JtYXRwYXJzZS9tZXNzYWdlcy5cbiAgICogQHBhcmFtIGxvY2FsZSBhIGBzdHJpbmdgIGRlZmluaW5nIHRoZSBsb2NhbGUgdG8gdXNlICh1c2VzIHRoZSBjdXJyZW50IHtAbGluayBMT0NBTEVfSUR9IGJ5XG4gICAqIGRlZmF1bHQpLlxuICAgKi9cbiAgdHJhbnNmb3JtKHZhbHVlOiBudW1iZXIsIHBsdXJhbE1hcDoge1tjb3VudDogc3RyaW5nXTogc3RyaW5nfSwgbG9jYWxlPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHR5cGVvZiBwbHVyYWxNYXAgIT09ICdvYmplY3QnIHx8IHBsdXJhbE1hcCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgaW52YWxpZFBpcGVBcmd1bWVudEVycm9yKEkxOG5QbHVyYWxQaXBlLCBwbHVyYWxNYXApO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGdldFBsdXJhbENhdGVnb3J5KHZhbHVlLCBPYmplY3Qua2V5cyhwbHVyYWxNYXApLCB0aGlzLl9sb2NhbGl6YXRpb24sIGxvY2FsZSk7XG5cbiAgICByZXR1cm4gcGx1cmFsTWFwW2tleV0ucmVwbGFjZShfSU5URVJQT0xBVElPTl9SRUdFWFAsIHZhbHVlLnRvU3RyaW5nKCkpO1xuICB9XG59XG4iXX0=