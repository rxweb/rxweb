import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-greaterThanEqualTo-dynamic',
    templateUrl: './greater-than-equal-to-dynamic.component.html'
})
export class GreaterThanEqualToDynamicComponent implements OnInit {

    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			voterAge : {
				greaterThanEqualTo :  {fieldName:'age',conditionalExpression:(x,y) => x.age >= 18 ,} 
			},
						
			memberAge : {
				greaterThanEqualTo :  {fieldName:'age',conditionalExpression:'x => x.age >= 18 ',} 
			},
						
			otherAge : {
				greaterThanEqualTo :  {fieldName:'age',message:'Please enter number greater than or equal to 1.',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
