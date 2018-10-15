import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-json-dynamic-validator',
    templateUrl: './json-dynamic.component.html'
})
export class JsonDynamicValidatorComponent implements OnInit {
    jsonInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
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
		 var jsonInfo = {
			location:'', addressJson:'', locationJson:'', contactJson:'', 
		}
		this.jsonInfoFormGroup = this.formBuilder.group(jsonInfo,formBuilderConfiguration);
    }
}
