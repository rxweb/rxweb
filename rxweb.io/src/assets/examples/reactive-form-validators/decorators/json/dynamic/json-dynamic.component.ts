import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { JsonInfo } from './json-info.model';

@Component({
    selector: 'app-json-dynamic',
    templateUrl: './json-dynamic.component.html'
})
export class JsonDynamicComponent implements OnInit {

    jsonInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let jsonInfo = new JsonInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			addressJson : {
				json :  {conditionalExpression:(x,y)=> x.location == "{CountryName:India}" ,} 
			},
						
			locationJson : {
				json :  {conditionalExpression:'x => x.location == "{CountryName:India}"',message:'Enter the text in JSON format --> {key:value}',} 
			},
						
			contactJson : {
				json :  {message:'Enter only JSON type data',} 
			},
			        };
		this.jsonInfoFormGroup = this.formBuilder.formGroup(jsonInfo,formBuilderConfiguration);
    }
}
