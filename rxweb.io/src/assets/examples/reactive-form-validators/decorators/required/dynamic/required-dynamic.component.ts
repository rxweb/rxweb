import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-required-dynamic',
    templateUrl: './required-dynamic.component.html'
})
export class RequiredDynamicComponent implements OnInit {

    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			firstName : {
				required : true  
			},
						
			middleName : {
				required :  {conditionalExpression:(x,y) => x.firstName == "Bharat" ,} 
			},
						
			lastName : {
				required :  {conditionalExpression:'x => x.firstName == "Bharat"',} 
			},
						
			userName : {
				required :  {message:'Username cannot be blank.',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
