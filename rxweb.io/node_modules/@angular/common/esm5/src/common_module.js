/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { COMMON_DIRECTIVES } from './directives/index';
import { DEPRECATED_PLURAL_FN, NgLocaleLocalization, NgLocalization, getPluralCase } from './i18n/localization';
import { COMMON_DEPRECATED_I18N_PIPES } from './pipes/deprecated/index';
import { COMMON_PIPES } from './pipes/index';
// Note: This does not contain the location providers,
// as they need some platform specific implementations to work.
/**
 * Exports all the basic Angular directives and pipes,
 * such as `NgIf`, `NgForOf`, `DecimalPipe`, and so on.
 * Re-exported by `BrowserModule`, which is included automatically in the root
 * `AppModule` when you create a new app with the CLI `new` command.
 *
 * * The `providers` options configure the NgModule's injector to provide
 * localization dependencies to members.
 * * The `exports` options make the declared directives and pipes available for import
 * by other NgModules.
 *
 */
var CommonModule = /** @class */ (function () {
    function CommonModule() {
    }
    CommonModule = tslib_1.__decorate([
        NgModule({
            declarations: [COMMON_DIRECTIVES, COMMON_PIPES],
            exports: [COMMON_DIRECTIVES, COMMON_PIPES],
            providers: [
                { provide: NgLocalization, useClass: NgLocaleLocalization },
            ],
        })
    ], CommonModule);
    return CommonModule;
}());
export { CommonModule };
var ɵ0 = getPluralCase;
/**
 * A module that contains the deprecated i18n pipes.
 *
 * @deprecated from v5
 */
var DeprecatedI18NPipesModule = /** @class */ (function () {
    function DeprecatedI18NPipesModule() {
    }
    DeprecatedI18NPipesModule = tslib_1.__decorate([
        NgModule({
            declarations: [COMMON_DEPRECATED_I18N_PIPES],
            exports: [COMMON_DEPRECATED_I18N_PIPES],
            providers: [{ provide: DEPRECATED_PLURAL_FN, useValue: ɵ0 }],
        })
    ], DeprecatedI18NPipesModule);
    return DeprecatedI18NPipesModule;
}());
export { DeprecatedI18NPipesModule };
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX21vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9zcmMvY29tbW9uX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlHLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHM0Msc0RBQXNEO0FBQ3RELCtEQUErRDtBQUMvRDs7Ozs7Ozs7Ozs7R0FXRztBQVFIO0lBQUE7SUFDQSxDQUFDO0lBRFksWUFBWTtRQVB4QixRQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUM7WUFDL0MsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDO1lBQzFDLFNBQVMsRUFBRTtnQkFDVCxFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFDO2FBQzFEO1NBQ0YsQ0FBQztPQUNXLFlBQVksQ0FDeEI7SUFBRCxtQkFBQztDQUFBLEFBREQsSUFDQztTQURZLFlBQVk7U0FXK0IsYUFBYTtBQVJyRTs7OztHQUlHO0FBTUg7SUFBQTtJQUNBLENBQUM7SUFEWSx5QkFBeUI7UUFMckMsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsNEJBQTRCLENBQUM7WUFDNUMsT0FBTyxFQUFFLENBQUMsNEJBQTRCLENBQUM7WUFDdkMsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxJQUFlLEVBQUMsQ0FBQztTQUN0RSxDQUFDO09BQ1cseUJBQXlCLENBQ3JDO0lBQUQsZ0NBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDT01NT05fRElSRUNUSVZFU30gZnJvbSAnLi9kaXJlY3RpdmVzL2luZGV4JztcbmltcG9ydCB7REVQUkVDQVRFRF9QTFVSQUxfRk4sIE5nTG9jYWxlTG9jYWxpemF0aW9uLCBOZ0xvY2FsaXphdGlvbiwgZ2V0UGx1cmFsQ2FzZX0gZnJvbSAnLi9pMThuL2xvY2FsaXphdGlvbic7XG5pbXBvcnQge0NPTU1PTl9ERVBSRUNBVEVEX0kxOE5fUElQRVN9IGZyb20gJy4vcGlwZXMvZGVwcmVjYXRlZC9pbmRleCc7XG5pbXBvcnQge0NPTU1PTl9QSVBFU30gZnJvbSAnLi9waXBlcy9pbmRleCc7XG5cblxuLy8gTm90ZTogVGhpcyBkb2VzIG5vdCBjb250YWluIHRoZSBsb2NhdGlvbiBwcm92aWRlcnMsXG4vLyBhcyB0aGV5IG5lZWQgc29tZSBwbGF0Zm9ybSBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbnMgdG8gd29yay5cbi8qKlxuICogRXhwb3J0cyBhbGwgdGhlIGJhc2ljIEFuZ3VsYXIgZGlyZWN0aXZlcyBhbmQgcGlwZXMsXG4gKiBzdWNoIGFzIGBOZ0lmYCwgYE5nRm9yT2ZgLCBgRGVjaW1hbFBpcGVgLCBhbmQgc28gb24uXG4gKiBSZS1leHBvcnRlZCBieSBgQnJvd3Nlck1vZHVsZWAsIHdoaWNoIGlzIGluY2x1ZGVkIGF1dG9tYXRpY2FsbHkgaW4gdGhlIHJvb3RcbiAqIGBBcHBNb2R1bGVgIHdoZW4geW91IGNyZWF0ZSBhIG5ldyBhcHAgd2l0aCB0aGUgQ0xJIGBuZXdgIGNvbW1hbmQuXG4gKlxuICogKiBUaGUgYHByb3ZpZGVyc2Agb3B0aW9ucyBjb25maWd1cmUgdGhlIE5nTW9kdWxlJ3MgaW5qZWN0b3IgdG8gcHJvdmlkZVxuICogbG9jYWxpemF0aW9uIGRlcGVuZGVuY2llcyB0byBtZW1iZXJzLlxuICogKiBUaGUgYGV4cG9ydHNgIG9wdGlvbnMgbWFrZSB0aGUgZGVjbGFyZWQgZGlyZWN0aXZlcyBhbmQgcGlwZXMgYXZhaWxhYmxlIGZvciBpbXBvcnRcbiAqIGJ5IG90aGVyIE5nTW9kdWxlcy5cbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0NPTU1PTl9ESVJFQ1RJVkVTLCBDT01NT05fUElQRVNdLFxuICBleHBvcnRzOiBbQ09NTU9OX0RJUkVDVElWRVMsIENPTU1PTl9QSVBFU10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBOZ0xvY2FsaXphdGlvbiwgdXNlQ2xhc3M6IE5nTG9jYWxlTG9jYWxpemF0aW9ufSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29tbW9uTW9kdWxlIHtcbn1cblxuLyoqXG4gKiBBIG1vZHVsZSB0aGF0IGNvbnRhaW5zIHRoZSBkZXByZWNhdGVkIGkxOG4gcGlwZXMuXG4gKlxuICogQGRlcHJlY2F0ZWQgZnJvbSB2NVxuICovXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDT01NT05fREVQUkVDQVRFRF9JMThOX1BJUEVTXSxcbiAgZXhwb3J0czogW0NPTU1PTl9ERVBSRUNBVEVEX0kxOE5fUElQRVNdLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogREVQUkVDQVRFRF9QTFVSQUxfRk4sIHVzZVZhbHVlOiBnZXRQbHVyYWxDYXNlfV0sXG59KVxuZXhwb3J0IGNsYXNzIERlcHJlY2F0ZWRJMThOUGlwZXNNb2R1bGUge1xufVxuIl19