import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-compare-dynamic-validator',
    templateUrl: './compare-dynamic.component.html'
})
export class CompareDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			confirmPassword : {
				compare :  {fieldName:'password',message:'Both Input is not matched',} 
			},
			        };
		 var user = {
			password:'', confirmPassword:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
