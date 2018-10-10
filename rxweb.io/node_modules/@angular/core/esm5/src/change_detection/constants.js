/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The strategy that the default change detector uses to detect changes.
 * When set, takes effect the next time change detection is triggered.
 *
 */
export var ChangeDetectionStrategy;
(function (ChangeDetectionStrategy) {
    /**
     * Use the `CheckOnce` strategy, meaning that automatic change detection is deactivated
     * until reactivated by setting the strategy to `Default` (`CheckAlways`).
     * Change detection can still be explictly invoked.
     */
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
    /**
     * Use the default `CheckAlways` strategy, in which change detection is automatic until
     * explicitly deactivated.
     */
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
})(ChangeDetectionStrategy || (ChangeDetectionStrategy = {}));
/**
 * Defines the possible states of the default change detector.
 * @see `ChangeDetectorRef`
 */
export var ChangeDetectorStatus;
(function (ChangeDetectorStatus) {
    /**
     * A state in which, after calling `detectChanges()`, the change detector
     * state becomes `Checked`, and must be explicitly invoked or reactivated.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["CheckOnce"] = 0] = "CheckOnce";
    /**
     * A state in which change detection is skipped until the change detector mode
     * becomes `CheckOnce`.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Checked"] = 1] = "Checked";
    /**
     * A state in which change detection continues automatically until explictly
     * deactivated.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["CheckAlways"] = 2] = "CheckAlways";
    /**
     * A state in which a change detector sub tree is not a part of the main tree and
     * should be skipped.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Detached"] = 3] = "Detached";
    /**
     * Indicates that the change detector encountered an error checking a binding
     * or calling a directive lifecycle method and is now in an inconsistent state. Change
     * detectors in this state do not detect changes.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Errored"] = 4] = "Errored";
    /**
     * Indicates that the change detector has been destroyed.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Destroyed"] = 5] = "Destroyed";
})(ChangeDetectorStatus || (ChangeDetectorStatus = {}));
/**
 * Reports whether a given strategy is currently the default for change detection.
 * @param changeDetectionStrategy The strategy to check.
 * @returns True if the given strategy is the current default, false otherwise.
 * @see `ChangeDetectorStatus`
 * @see `ChangeDetectorRef`
 */
export function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
    return changeDetectionStrategy == null ||
        changeDetectionStrategy === ChangeDetectionStrategy.Default;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvY2hhbmdlX2RldGVjdGlvbi9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0g7Ozs7R0FJRztBQUNILE1BQU0sQ0FBTixJQUFZLHVCQWFYO0FBYkQsV0FBWSx1QkFBdUI7SUFDakM7Ozs7T0FJRztJQUNILHlFQUFVLENBQUE7SUFFVjs7O09BR0c7SUFDSCwyRUFBVyxDQUFBO0FBQ2IsQ0FBQyxFQWJXLHVCQUF1QixLQUF2Qix1QkFBdUIsUUFhbEM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLENBQU4sSUFBWSxvQkFvQ1g7QUFwQ0QsV0FBWSxvQkFBb0I7SUFDOUI7OztPQUdHO0lBQ0gseUVBQVMsQ0FBQTtJQUVUOzs7T0FHRztJQUNILHFFQUFPLENBQUE7SUFFUDs7O09BR0c7SUFDSCw2RUFBVyxDQUFBO0lBRVg7OztPQUdHO0lBQ0gsdUVBQVEsQ0FBQTtJQUVSOzs7O09BSUc7SUFDSCxxRUFBTyxDQUFBO0lBRVA7O09BRUc7SUFDSCx5RUFBUyxDQUFBO0FBQ1gsQ0FBQyxFQXBDVyxvQkFBb0IsS0FBcEIsb0JBQW9CLFFBb0MvQjtBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sMkNBQTJDLHVCQUFnRDtJQUUvRixPQUFPLHVCQUF1QixJQUFJLElBQUk7UUFDbEMsdUJBQXVCLEtBQUssdUJBQXVCLENBQUMsT0FBTyxDQUFDO0FBQ2xFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuLyoqXG4gKiBUaGUgc3RyYXRlZ3kgdGhhdCB0aGUgZGVmYXVsdCBjaGFuZ2UgZGV0ZWN0b3IgdXNlcyB0byBkZXRlY3QgY2hhbmdlcy5cbiAqIFdoZW4gc2V0LCB0YWtlcyBlZmZlY3QgdGhlIG5leHQgdGltZSBjaGFuZ2UgZGV0ZWN0aW9uIGlzIHRyaWdnZXJlZC5cbiAqXG4gKi9cbmV4cG9ydCBlbnVtIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHtcbiAgLyoqXG4gICAqIFVzZSB0aGUgYENoZWNrT25jZWAgc3RyYXRlZ3ksIG1lYW5pbmcgdGhhdCBhdXRvbWF0aWMgY2hhbmdlIGRldGVjdGlvbiBpcyBkZWFjdGl2YXRlZFxuICAgKiB1bnRpbCByZWFjdGl2YXRlZCBieSBzZXR0aW5nIHRoZSBzdHJhdGVneSB0byBgRGVmYXVsdGAgKGBDaGVja0Fsd2F5c2ApLlxuICAgKiBDaGFuZ2UgZGV0ZWN0aW9uIGNhbiBzdGlsbCBiZSBleHBsaWN0bHkgaW52b2tlZC5cbiAgICovXG4gIE9uUHVzaCA9IDAsXG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgZGVmYXVsdCBgQ2hlY2tBbHdheXNgIHN0cmF0ZWd5LCBpbiB3aGljaCBjaGFuZ2UgZGV0ZWN0aW9uIGlzIGF1dG9tYXRpYyB1bnRpbFxuICAgKiBleHBsaWNpdGx5IGRlYWN0aXZhdGVkLlxuICAgKi9cbiAgRGVmYXVsdCA9IDEsXG59XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgcG9zc2libGUgc3RhdGVzIG9mIHRoZSBkZWZhdWx0IGNoYW5nZSBkZXRlY3Rvci5cbiAqIEBzZWUgYENoYW5nZURldGVjdG9yUmVmYFxuICovXG5leHBvcnQgZW51bSBDaGFuZ2VEZXRlY3RvclN0YXR1cyB7XG4gIC8qKlxuICAgKiBBIHN0YXRlIGluIHdoaWNoLCBhZnRlciBjYWxsaW5nIGBkZXRlY3RDaGFuZ2VzKClgLCB0aGUgY2hhbmdlIGRldGVjdG9yXG4gICAqIHN0YXRlIGJlY29tZXMgYENoZWNrZWRgLCBhbmQgbXVzdCBiZSBleHBsaWNpdGx5IGludm9rZWQgb3IgcmVhY3RpdmF0ZWQuXG4gICAqL1xuICBDaGVja09uY2UsXG5cbiAgLyoqXG4gICAqIEEgc3RhdGUgaW4gd2hpY2ggY2hhbmdlIGRldGVjdGlvbiBpcyBza2lwcGVkIHVudGlsIHRoZSBjaGFuZ2UgZGV0ZWN0b3IgbW9kZVxuICAgKiBiZWNvbWVzIGBDaGVja09uY2VgLlxuICAgKi9cbiAgQ2hlY2tlZCxcblxuICAvKipcbiAgICogQSBzdGF0ZSBpbiB3aGljaCBjaGFuZ2UgZGV0ZWN0aW9uIGNvbnRpbnVlcyBhdXRvbWF0aWNhbGx5IHVudGlsIGV4cGxpY3RseVxuICAgKiBkZWFjdGl2YXRlZC5cbiAgICovXG4gIENoZWNrQWx3YXlzLFxuXG4gIC8qKlxuICAgKiBBIHN0YXRlIGluIHdoaWNoIGEgY2hhbmdlIGRldGVjdG9yIHN1YiB0cmVlIGlzIG5vdCBhIHBhcnQgb2YgdGhlIG1haW4gdHJlZSBhbmRcbiAgICogc2hvdWxkIGJlIHNraXBwZWQuXG4gICAqL1xuICBEZXRhY2hlZCxcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoYXQgdGhlIGNoYW5nZSBkZXRlY3RvciBlbmNvdW50ZXJlZCBhbiBlcnJvciBjaGVja2luZyBhIGJpbmRpbmdcbiAgICogb3IgY2FsbGluZyBhIGRpcmVjdGl2ZSBsaWZlY3ljbGUgbWV0aG9kIGFuZCBpcyBub3cgaW4gYW4gaW5jb25zaXN0ZW50IHN0YXRlLiBDaGFuZ2VcbiAgICogZGV0ZWN0b3JzIGluIHRoaXMgc3RhdGUgZG8gbm90IGRldGVjdCBjaGFuZ2VzLlxuICAgKi9cbiAgRXJyb3JlZCxcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoYXQgdGhlIGNoYW5nZSBkZXRlY3RvciBoYXMgYmVlbiBkZXN0cm95ZWQuXG4gICAqL1xuICBEZXN0cm95ZWQsXG59XG5cbi8qKlxuICogUmVwb3J0cyB3aGV0aGVyIGEgZ2l2ZW4gc3RyYXRlZ3kgaXMgY3VycmVudGx5IHRoZSBkZWZhdWx0IGZvciBjaGFuZ2UgZGV0ZWN0aW9uLlxuICogQHBhcmFtIGNoYW5nZURldGVjdGlvblN0cmF0ZWd5IFRoZSBzdHJhdGVneSB0byBjaGVjay5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGdpdmVuIHN0cmF0ZWd5IGlzIHRoZSBjdXJyZW50IGRlZmF1bHQsIGZhbHNlIG90aGVyd2lzZS5cbiAqIEBzZWUgYENoYW5nZURldGVjdG9yU3RhdHVzYFxuICogQHNlZSBgQ2hhbmdlRGV0ZWN0b3JSZWZgIFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3koY2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5KTpcbiAgICBib29sZWFuIHtcbiAgcmV0dXJuIGNoYW5nZURldGVjdGlvblN0cmF0ZWd5ID09IG51bGwgfHxcbiAgICAgIGNoYW5nZURldGVjdGlvblN0cmF0ZWd5ID09PSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0O1xufVxuIl19