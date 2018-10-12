import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-maxLength-dynamic',
    templateUrl: './max-length-dynamic.component.html'
})
export class MaxLengthDynamicComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			firstName : {
				maxLength :  {value:16,} 
			},
						
			middleName : {
				maxLength :  {value:16,conditionalExpression:(x,y)=>{ return x.firstName == "John"},} 
			},
						
			lastName : {
				maxLength :  {value:16,conditionalExpression:x=> x.firstName == "John",} 
			},
						
			userName : {
				maxLength :  {value:10,message:'Maximum 10 characters are allowed',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
