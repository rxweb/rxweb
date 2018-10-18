import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-dataUri-dynamic-validator',
    templateUrl: './data-uri-dynamic.component.html'
})
export class DataUriDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			cssDataUri : {
				dataUri :  {conditionalExpression:(x,y) => x.scheme == "DataUri" ,} 
			},
						
			javascriptDataUri : {
				dataUri :  {conditionalExpression:'x => x.scheme =="DataUri"',} 
			},
						
			htmlDataUri : {
				dataUri :  {message:'{{0}} is not a proper data URI',} 
			},
			        };
		 var user = {
			scheme:'', cssDataUri:'', javascriptDataUri:'', htmlDataUri:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
