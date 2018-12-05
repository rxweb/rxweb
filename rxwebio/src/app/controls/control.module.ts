import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RxSpinnerComponent,RxSpinner } from "src/app/controls/spinner/spinners";




@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [ RxSpinnerComponent ], 
    exports: [
        RxSpinnerComponent
    ],
    providers:[RxSpinner],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlModule {
}