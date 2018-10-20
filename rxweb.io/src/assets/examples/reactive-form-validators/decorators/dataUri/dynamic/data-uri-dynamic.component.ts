import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-dataUri-dynamic',
    templateUrl: './data-uri-dynamic.component.html'
})
export class DataUriDynamicComponent implements OnInit {

    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
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
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
