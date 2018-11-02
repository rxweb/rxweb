import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@NgModule({
    declarations: [
        MergeDashPipe
    ],
    exports: [MergeDashPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PipeCommonModule {
}
