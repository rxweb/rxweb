﻿import { Component, OnInit } from "@angular/core";
import { RxDynamicFormBuilder, DynamicFormBuildConfig, DynamicFormConfiguration } from "@rxweb/reactive-dynamic-forms"
import { AddressSectionComponent } from "./sections/address-section.component";

@Component({
    template: `
    <form [formGroup]="dynamicFormBuildConfig.formGroup">
        <div [viewMode]="viewMode" [rxwebDynamicForm]="dynamicFormBuildConfig" [uiBindings]="uiBindings"></div>
    </form>
    `,
    entryComponents: [AddressSectionComponent],
})
export class BindingComponent implements OnInit {
    serverData: Array<{ [key: string]: any}> = [];

    uiBindings: string[] = ["firstName"];

    dynamicFormBuildConfig: DynamicFormBuildConfig;

    dynamicFormConfiguration: DynamicFormConfiguration;

    viewMode: string = "basic";

    constructor(private formBuilder: RxDynamicFormBuilder) { }

    ngOnInit() {
        this.dynamicFormBuildConfig = this.formBuilder.formGroup(this.serverData, this.dynamicFormConfiguration);
    }
}





