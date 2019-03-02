import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { KeysPipe } from "./key.pipe";
import { FilterPipe } from "./filter.pipe";

@NgModule({
    declarations: [
        KeysPipe,FilterPipe
    ],
    exports: [KeysPipe,FilterPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PipeCommonModule {
}
