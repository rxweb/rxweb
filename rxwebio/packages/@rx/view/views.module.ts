import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {
    RxTooltipDirective,
    RxTooltipGroupDirective,
    RxTooltipComponent,
    RxRemoveDirective,
    RxTabContentDirective,
    RxTabDirective,
    RxTabsDirective,
    PortalHostDirective,
    RxTabComponent, RxTabContentComponent, RxTabsComponent,
    RxToastComponent, RxToast, RxDialogComponent, RxDialog, RxCollapseDirective,
    RxPopupComponent, RxPopup, RxSpinnerComponent, RxSpinner, RxPopoverDirective, ValidationFailedComponent,
    RxLabelDirective, UnAuthorizedAccessComponent, RxHtmlDirective
} from './views'



@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
        RxRemoveDirective,
        RxTooltipDirective,
        RxTooltipGroupDirective,
        RxTooltipComponent,
        RxTabContentDirective,
        RxTabDirective,
        RxTabsDirective,
        PortalHostDirective,
        RxTabComponent, RxTabContentComponent, RxCollapseDirective, RxTabsComponent,  RxToastComponent,
        RxDialogComponent, RxPopupComponent, RxSpinnerComponent, RxPopoverDirective,
        RxLabelDirective, ValidationFailedComponent, UnAuthorizedAccessComponent, RxHtmlDirective
    ], exports: [RxTooltipDirective, RxTooltipGroupDirective, 
        RxTabContentDirective,
        RxTabDirective,
        RxTabsDirective,
        RxTabComponent, RxTabContentComponent, RxTabsComponent, RxCollapseDirective,
        RxToastComponent, RxDialogComponent, RxPopupComponent,
        RxSpinnerComponent, RxPopoverDirective, RxRemoveDirective,
        RxLabelDirective, ValidationFailedComponent, UnAuthorizedAccessComponent, RxHtmlDirective
    ],
    entryComponents: [RxTooltipComponent],
   // providers: [RxToast, RxDialog, RxPopup, RxSpinner],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RxViewModule {
}

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
        
    ], exports: [
    ],
    providers: [RxToast, RxDialog, RxPopup, RxSpinner],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RxViewServiceModule {
    static forRoot(): ModuleWithProviders { return { ngModule: RxViewServiceModule, providers: [] }; }
}
