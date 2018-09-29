/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { COMMON_DIRECTIVES } from './directives/index';
import { DEPRECATED_PLURAL_FN, NgLocaleLocalization, NgLocalization, getPluralCase } from './i18n/localization';
import { COMMON_DEPRECATED_I18N_PIPES } from './pipes/deprecated/index';
import { COMMON_PIPES } from './pipes/index';
// Note: This does not contain the location providers,
// as they need some platform specific implementations to work.
/**
 * The module that includes all the basic Angular directives like {@link NgIf}, {@link NgForOf}, ...
 *
 *
 */
var CommonModule = /** @class */ (function () {
    function CommonModule() {
    }
    CommonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMMON_DIRECTIVES, COMMON_PIPES],
                    exports: [COMMON_DIRECTIVES, COMMON_PIPES],
                    providers: [
                        { provide: NgLocalization, useClass: NgLocaleLocalization },
                    ],
                },] }
    ];
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
    DeprecatedI18NPipesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMMON_DEPRECATED_I18N_PIPES],
                    exports: [COMMON_DEPRECATED_I18N_PIPES],
                    providers: [{ provide: DEPRECATED_PLURAL_FN, useValue: ɵ0 }],
                },] }
    ];
    return DeprecatedI18NPipesModule;
}());
export { DeprecatedI18NPipesModule };
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX21vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9zcmMvY29tbW9uX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDOUcsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUczQyxzREFBc0Q7QUFDdEQsK0RBQStEO0FBQy9EOzs7O0dBSUc7QUFDSDtJQUFBO0lBUUEsQ0FBQzs7Z0JBUkEsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLFlBQVksQ0FBQztvQkFDL0MsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDO29CQUMxQyxTQUFTLEVBQUU7d0JBQ1QsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBQztxQkFDMUQ7aUJBQ0Y7O0lBRUQsbUJBQUM7Q0FBQSxBQVJELElBUUM7U0FEWSxZQUFZO1NBVytCLGFBQWE7QUFSckU7Ozs7R0FJRztBQUNIO0lBQUE7SUFNQSxDQUFDOztnQkFOQSxRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsNEJBQTRCLENBQUM7b0JBQzVDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO29CQUN2QyxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLElBQWUsRUFBQyxDQUFDO2lCQUN0RTs7SUFFRCxnQ0FBQztDQUFBLEFBTkQsSUFNQztTQURZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NPTU1PTl9ESVJFQ1RJVkVTfSBmcm9tICcuL2RpcmVjdGl2ZXMvaW5kZXgnO1xuaW1wb3J0IHtERVBSRUNBVEVEX1BMVVJBTF9GTiwgTmdMb2NhbGVMb2NhbGl6YXRpb24sIE5nTG9jYWxpemF0aW9uLCBnZXRQbHVyYWxDYXNlfSBmcm9tICcuL2kxOG4vbG9jYWxpemF0aW9uJztcbmltcG9ydCB7Q09NTU9OX0RFUFJFQ0FURURfSTE4Tl9QSVBFU30gZnJvbSAnLi9waXBlcy9kZXByZWNhdGVkL2luZGV4JztcbmltcG9ydCB7Q09NTU9OX1BJUEVTfSBmcm9tICcuL3BpcGVzL2luZGV4JztcblxuXG4vLyBOb3RlOiBUaGlzIGRvZXMgbm90IGNvbnRhaW4gdGhlIGxvY2F0aW9uIHByb3ZpZGVycyxcbi8vIGFzIHRoZXkgbmVlZCBzb21lIHBsYXRmb3JtIHNwZWNpZmljIGltcGxlbWVudGF0aW9ucyB0byB3b3JrLlxuLyoqXG4gKiBUaGUgbW9kdWxlIHRoYXQgaW5jbHVkZXMgYWxsIHRoZSBiYXNpYyBBbmd1bGFyIGRpcmVjdGl2ZXMgbGlrZSB7QGxpbmsgTmdJZn0sIHtAbGluayBOZ0Zvck9mfSwgLi4uXG4gKlxuICpcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQ09NTU9OX0RJUkVDVElWRVMsIENPTU1PTl9QSVBFU10sXG4gIGV4cG9ydHM6IFtDT01NT05fRElSRUNUSVZFUywgQ09NTU9OX1BJUEVTXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IE5nTG9jYWxpemF0aW9uLCB1c2VDbGFzczogTmdMb2NhbGVMb2NhbGl6YXRpb259LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb21tb25Nb2R1bGUge1xufVxuXG4vKipcbiAqIEEgbW9kdWxlIHRoYXQgY29udGFpbnMgdGhlIGRlcHJlY2F0ZWQgaTE4biBwaXBlcy5cbiAqXG4gKiBAZGVwcmVjYXRlZCBmcm9tIHY1XG4gKi9cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0NPTU1PTl9ERVBSRUNBVEVEX0kxOE5fUElQRVNdLFxuICBleHBvcnRzOiBbQ09NTU9OX0RFUFJFQ0FURURfSTE4Tl9QSVBFU10sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBERVBSRUNBVEVEX1BMVVJBTF9GTiwgdXNlVmFsdWU6IGdldFBsdXJhbENhc2V9XSxcbn0pXG5leHBvcnQgY2xhc3MgRGVwcmVjYXRlZEkxOE5QaXBlc01vZHVsZSB7XG59XG4iXX0=