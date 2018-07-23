import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration } from '@rxweb/reactive-form-validators';

import { JsonInfo } from '../json-info.model';

@Component({
    selector: 'app-json-info-add',
    templateUrl: './json-info-add.component.html'
})
export class JsonInfoAddComponent implements OnInit {

    jsonInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let jsonInfo = new JsonInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.validations = {
			name : {
				json :  {message:'Enter the text in JSON format --> {key:value}',} 
			},
			age : {
				json :  {conditionalExpressions:'x,y=>x.name ==  "firstName": "John", "lastName": "Doe"  ',} 
			},
			address : {
				json :  {message:'Enter only JSON type data',} 
			},
        };
		this.jsonInfoFormGroup = this.formBuilder.formGroup(jsonInfo,formBuilderConfiguration);
    }
}
