import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { KeysPipe } from "./key.pipe";

@NgModule({
    declarations: [
        KeysPipe
    ],
    exports: [KeysPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PipeCommonModule {
}
