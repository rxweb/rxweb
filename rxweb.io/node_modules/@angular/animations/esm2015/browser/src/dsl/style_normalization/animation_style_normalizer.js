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
/**
 * \@experimental Animation support is experimental.
 * @abstract
 */
export class AnimationStyleNormalizer {
}
if (false) {
    /**
     * @abstract
     * @param {?} propertyName
     * @param {?} errors
     * @return {?}
     */
    AnimationStyleNormalizer.prototype.normalizePropertyName = function (propertyName, errors) { };
    /**
     * @abstract
     * @param {?} userProvidedProperty
     * @param {?} normalizedProperty
     * @param {?} value
     * @param {?} errors
     * @return {?}
     */
    AnimationStyleNormalizer.prototype.normalizeStyleValue = function (userProvidedProperty, normalizedProperty, value, errors) { };
}
/**
 * \@experimental Animation support is experimental.
 */
export class NoopAnimationStyleNormalizer {
    /**
     * @param {?} propertyName
     * @param {?} errors
     * @return {?}
     */
    normalizePropertyName(propertyName, errors) { return propertyName; }
    /**
     * @param {?} userProvidedProperty
     * @param {?} normalizedProperty
     * @param {?} value
     * @param {?} errors
     * @return {?}
     */
    normalizeStyleValue(userProvidedProperty, normalizedProperty, value, errors) {
        return /** @type {?} */ (value);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3N0eWxlX25vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL2RzbC9zdHlsZV9ub3JtYWxpemF0aW9uL2FuaW1hdGlvbl9zdHlsZV9ub3JtYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQVdBLE1BQU07Q0FLTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtELE1BQU07Ozs7OztJQUNKLHFCQUFxQixDQUFDLFlBQW9CLEVBQUUsTUFBZ0IsSUFBWSxPQUFPLFlBQVksQ0FBQyxFQUFFOzs7Ozs7OztJQUU5RixtQkFBbUIsQ0FDZixvQkFBNEIsRUFBRSxrQkFBMEIsRUFBRSxLQUFvQixFQUM5RSxNQUFnQjtRQUNsQix5QkFBWSxLQUFLLEVBQUM7S0FDbkI7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBAZXhwZXJpbWVudGFsIEFuaW1hdGlvbiBzdXBwb3J0IGlzIGV4cGVyaW1lbnRhbC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFuaW1hdGlvblN0eWxlTm9ybWFsaXplciB7XG4gIGFic3RyYWN0IG5vcm1hbGl6ZVByb3BlcnR5TmFtZShwcm9wZXJ0eU5hbWU6IHN0cmluZywgZXJyb3JzOiBzdHJpbmdbXSk6IHN0cmluZztcbiAgYWJzdHJhY3Qgbm9ybWFsaXplU3R5bGVWYWx1ZShcbiAgICAgIHVzZXJQcm92aWRlZFByb3BlcnR5OiBzdHJpbmcsIG5vcm1hbGl6ZWRQcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfG51bWJlcixcbiAgICAgIGVycm9yczogc3RyaW5nW10pOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbCBBbmltYXRpb24gc3VwcG9ydCBpcyBleHBlcmltZW50YWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb29wQW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyIHtcbiAgbm9ybWFsaXplUHJvcGVydHlOYW1lKHByb3BlcnR5TmFtZTogc3RyaW5nLCBlcnJvcnM6IHN0cmluZ1tdKTogc3RyaW5nIHsgcmV0dXJuIHByb3BlcnR5TmFtZTsgfVxuXG4gIG5vcm1hbGl6ZVN0eWxlVmFsdWUoXG4gICAgICB1c2VyUHJvdmlkZWRQcm9wZXJ0eTogc3RyaW5nLCBub3JtYWxpemVkUHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZ3xudW1iZXIsXG4gICAgICBlcnJvcnM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gPGFueT52YWx1ZTtcbiAgfVxufVxuIl19