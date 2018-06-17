import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {CommonModule, DatePipe} from "@angular/common"

import {
    RxDatePipe, RxDateAgoPipe
} from './common'



@NgModule({
    imports: [CommonModule],
    declarations: [
        RxDatePipe, RxDateAgoPipe
    ],
    exports: [RxDatePipe, RxDateAgoPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RxCommonModule {
}
