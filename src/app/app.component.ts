import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import {
    RxFormBuilder, ReactiveFormConfig
} from "@rxweb/reactive-form-validators";
import { dynamicComponent, DynamicFormBuildConfig, DynamicFormConfiguration, RxDynamicFormBuilder, AbstractControlConfig } from "@rxweb/reactive-dynamic-forms";

@dynamicComponent("addressSection")
@Component({
    template: `
        <div>
<div class="card" >
<div class="card-header" >{{controlConfig.config.ui.text}}</div>
<div class="card-body">
 <form>
    <div viewMode="basic" [rxwebDynamicForm]="dynamicFormBuildConfig" [uiBindings]="controlConfig.config.childrens">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
</div>
    `
})
export class AddressSectionComponent extends AbstractControlConfig implements OnInit {
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    additionalConfig: any[] = [
        //{
        //    type: 'card',
        //    name: 'addressSection',
        //    childrens: [{ type: 'card-header', ui: { text: 'Address' } }, { type: 'card-body', childrens: ['address.name'] }],
        //    skipDefaultView: true
        //}
        {
            type: "#addressSection",
            name: 'addressSection',
            ui: {text:'Address'},
            childrens:["address.name"],
            skipDefaultView:true,
        }
    ]

    newServerData: any[] = [
        {
            name: 'address.name',
            type: 'text',
        }
    ]

    uiBindings: string[] = ["addressSection"];

    dynamicFormBuildConfig: DynamicFormBuildConfig;

    constructor(private formBuilder: RxDynamicFormBuilder) { }
    ngOnInit() {
        this.dynamicFormBuildConfig = this.formBuilder.formGroup(this.newServerData, {
            additionalConfig: this.additionalConfig
        });
        
    }
}


