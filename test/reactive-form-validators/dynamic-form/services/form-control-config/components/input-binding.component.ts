import { Component,OnInit } from "@angular/core";
import { RxFormBuilder,DynamicFormBuildConfig, DynamicFormConfiguration } from "@rxweb/reactive-form-validators"

@Component({
    template: `
<form [rxDynamicForm]="dynamicFormBuildConfig">
    <rxweb-dynamic-form [viewMode]="viewMode" [controlsConfig]="dynamicFormBuildConfig.controlsConfig" [bindings]="uiBindings"></rxweb-dynamic-form>
</form>
    `
})
export class InputBindingComponent implements OnInit {
    serverData: Array<{ [key: string]: any}> = [];

    uiBindings: string[] = ["firstName"];

    dynamicFormBuildConfig: DynamicFormBuildConfig;

    viewMode: string = "bootstrap-basic";

    dynamicFormConfiguration: DynamicFormConfiguration

    constructor(private formBuilder: RxFormBuilder) {}

    ngOnInit() {
        this.dynamicFormBuildConfig = this.formBuilder.dynamicForm(this.serverData,this.dynamicFormConfiguration);
    }
}





