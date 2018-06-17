import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {CommonModule} from "@angular/common";

import {
    RxAuthorizationDirective, RxPermissionDirective, RxPermissionItemDirective
} from './security'



@NgModule({
    imports: [CommonModule],
    declarations: [
        RxPermissionItemDirective, RxPermissionDirective, RxAuthorizationDirective
    ], exports: [RxPermissionItemDirective, RxPermissionDirective,  RxAuthorizationDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RxSecurityModule {
}
