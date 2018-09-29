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
/** *
 * \@experimental i18n support is experimental.
  @type {?} */
export const LOCALE_DATA = {};
/**
 * Register global data to be used internally by Angular. See the
 * ["I18n guide"](guide/i18n#i18n-pipes) to know how to import additional locale data.
 *
 * \@experimental i18n support is experimental.
 * @param {?} data
 * @param {?=} localeId
 * @param {?=} extraData
 * @return {?}
 */
export function registerLocaleData(data, localeId, extraData) {
    if (typeof localeId !== 'string') {
        extraData = localeId;
        localeId = data[0 /* LocaleId */];
    }
    localeId = localeId.toLowerCase().replace(/_/g, '-');
    LOCALE_DATA[localeId] = data;
    if (extraData) {
        LOCALE_DATA[localeId][19 /* ExtraData */] = extraData;
    }
}
/** @enum {number} */
const LocaleDataIndex = {
    LocaleId: 0,
    DayPeriodsFormat: 1,
    DayPeriodsStandalone: 2,
    DaysFormat: 3,
    DaysStandalone: 4,
    MonthsFormat: 5,
    MonthsStandalone: 6,
    Eras: 7,
    FirstDayOfWeek: 8,
    WeekendRange: 9,
    DateFormat: 10,
    TimeFormat: 11,
    DateTimeFormat: 12,
    NumberSymbols: 13,
    NumberFormats: 14,
    CurrencySymbol: 15,
    CurrencyName: 16,
    Currencies: 17,
    PluralCase: 18,
    ExtraData: 19,
};
export { LocaleDataIndex };
/** @enum {number} */
const ExtraLocaleDataIndex = {
    ExtraDayPeriodFormats: 0,
    ExtraDayPeriodStandalone: 1,
    ExtraDayPeriodsRules: 2,
};
export { ExtraLocaleDataIndex };
/** @enum {number} */
const CurrencyIndex = {
    Symbol: 0, SymbolNarrow: 1, NbOfDigits: 2,
};
export { CurrencyIndex };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlX2RhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vc3JjL2kxOG4vbG9jYWxlX2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFXQSxhQUFhLFdBQVcsR0FBOEIsRUFBRSxDQUFDOzs7Ozs7Ozs7OztBQVN6RCxNQUFNLDZCQUE2QixJQUFTLEVBQUUsUUFBdUIsRUFBRSxTQUFlO0lBQ3BGLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ2hDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDckIsUUFBUSxHQUFHLElBQUksa0JBQTBCLENBQUM7S0FDM0M7SUFFRCxRQUFRLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFckQsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUU3QixJQUFJLFNBQVMsRUFBRTtRQUNiLFdBQVcsQ0FBQyxRQUFRLENBQUMsb0JBQTJCLEdBQUcsU0FBUyxDQUFDO0tBQzlEO0NBQ0Y7OztJQU1DLFdBQVk7SUFDWixtQkFBZ0I7SUFDaEIsdUJBQW9CO0lBQ3BCLGFBQVU7SUFDVixpQkFBYztJQUNkLGVBQVk7SUFDWixtQkFBZ0I7SUFDaEIsT0FBSTtJQUNKLGlCQUFjO0lBQ2QsZUFBWTtJQUNaLGNBQVU7SUFDVixjQUFVO0lBQ1Ysa0JBQWM7SUFDZCxpQkFBYTtJQUNiLGlCQUFhO0lBQ2Isa0JBQWM7SUFDZCxnQkFBWTtJQUNaLGNBQVU7SUFDVixjQUFVO0lBQ1YsYUFBUzs7Ozs7SUFPVCx3QkFBeUI7SUFDekIsMkJBQXdCO0lBQ3hCLHVCQUFvQjs7Ozs7SUFNVyxTQUFVLEVBQUUsZUFBWSxFQUFFLGFBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbCBpMThuIHN1cHBvcnQgaXMgZXhwZXJpbWVudGFsLlxuICovXG5leHBvcnQgY29uc3QgTE9DQUxFX0RBVEE6IHtbbG9jYWxlSWQ6IHN0cmluZ106IGFueX0gPSB7fTtcblxuLyoqXG4gKiBSZWdpc3RlciBnbG9iYWwgZGF0YSB0byBiZSB1c2VkIGludGVybmFsbHkgYnkgQW5ndWxhci4gU2VlIHRoZVxuICogW1wiSTE4biBndWlkZVwiXShndWlkZS9pMThuI2kxOG4tcGlwZXMpIHRvIGtub3cgaG93IHRvIGltcG9ydCBhZGRpdGlvbmFsIGxvY2FsZSBkYXRhLlxuICpcbiAqIEBleHBlcmltZW50YWwgaTE4biBzdXBwb3J0IGlzIGV4cGVyaW1lbnRhbC5cbiAqL1xuLy8gVGhlIHNpZ25hdHVyZSByZWdpc3RlckxvY2FsZURhdGEoZGF0YTogYW55LCBleHRyYURhdGE/OiBhbnkpIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjUuMVxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTG9jYWxlRGF0YShkYXRhOiBhbnksIGxvY2FsZUlkPzogc3RyaW5nIHwgYW55LCBleHRyYURhdGE/OiBhbnkpOiB2b2lkIHtcbiAgaWYgKHR5cGVvZiBsb2NhbGVJZCAhPT0gJ3N0cmluZycpIHtcbiAgICBleHRyYURhdGEgPSBsb2NhbGVJZDtcbiAgICBsb2NhbGVJZCA9IGRhdGFbTG9jYWxlRGF0YUluZGV4LkxvY2FsZUlkXTtcbiAgfVxuXG4gIGxvY2FsZUlkID0gbG9jYWxlSWQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9fL2csICctJyk7XG5cbiAgTE9DQUxFX0RBVEFbbG9jYWxlSWRdID0gZGF0YTtcblxuICBpZiAoZXh0cmFEYXRhKSB7XG4gICAgTE9DQUxFX0RBVEFbbG9jYWxlSWRdW0xvY2FsZURhdGFJbmRleC5FeHRyYURhdGFdID0gZXh0cmFEYXRhO1xuICB9XG59XG5cbi8qKlxuICogSW5kZXggb2YgZWFjaCB0eXBlIG9mIGxvY2FsZSBkYXRhIGZyb20gdGhlIGxvY2FsZSBkYXRhIGFycmF5XG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIExvY2FsZURhdGFJbmRleCB7XG4gIExvY2FsZUlkID0gMCxcbiAgRGF5UGVyaW9kc0Zvcm1hdCxcbiAgRGF5UGVyaW9kc1N0YW5kYWxvbmUsXG4gIERheXNGb3JtYXQsXG4gIERheXNTdGFuZGFsb25lLFxuICBNb250aHNGb3JtYXQsXG4gIE1vbnRoc1N0YW5kYWxvbmUsXG4gIEVyYXMsXG4gIEZpcnN0RGF5T2ZXZWVrLFxuICBXZWVrZW5kUmFuZ2UsXG4gIERhdGVGb3JtYXQsXG4gIFRpbWVGb3JtYXQsXG4gIERhdGVUaW1lRm9ybWF0LFxuICBOdW1iZXJTeW1ib2xzLFxuICBOdW1iZXJGb3JtYXRzLFxuICBDdXJyZW5jeVN5bWJvbCxcbiAgQ3VycmVuY3lOYW1lLFxuICBDdXJyZW5jaWVzLFxuICBQbHVyYWxDYXNlLFxuICBFeHRyYURhdGFcbn1cblxuLyoqXG4gKiBJbmRleCBvZiBlYWNoIHR5cGUgb2YgbG9jYWxlIGRhdGEgZnJvbSB0aGUgZXh0cmEgbG9jYWxlIGRhdGEgYXJyYXlcbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gRXh0cmFMb2NhbGVEYXRhSW5kZXgge1xuICBFeHRyYURheVBlcmlvZEZvcm1hdHMgPSAwLFxuICBFeHRyYURheVBlcmlvZFN0YW5kYWxvbmUsXG4gIEV4dHJhRGF5UGVyaW9kc1J1bGVzXG59XG5cbi8qKlxuICogSW5kZXggb2YgZWFjaCB2YWx1ZSBpbiBjdXJyZW5jeSBkYXRhICh1c2VkIHRvIGRlc2NyaWJlIENVUlJFTkNJRVNfRU4gaW4gY3VycmVuY2llcy50cylcbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gQ3VycmVuY3lJbmRleCB7U3ltYm9sID0gMCwgU3ltYm9sTmFycm93LCBOYk9mRGlnaXRzfVxuIl19