import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-greaterThan-dynamic',
    templateUrl: './greater-than-dynamic.component.html'
})
export class GreaterThanDynamicComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			memberAge : {
				greaterThan :  {fieldName:'age',conditionalExpression:(x,y) =>{ return  x.age > 17 },} 
			},
						
			voterAge : {
				greaterThan :  {fieldName:'age',conditionalExpression:x => x.age > 17,} 
			},
						
			otherAge : {
				greaterThan :  {fieldName:'age',message:'Please enter number greater than 0.',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
