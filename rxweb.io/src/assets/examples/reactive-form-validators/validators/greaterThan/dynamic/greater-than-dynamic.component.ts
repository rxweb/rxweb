import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThan-dynamic-validator',
    templateUrl: './greater-than-dynamic.component.html'
})
export class GreaterThanDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
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
		 var user = {
			memberAge:'', voterAge:'', otherAge:'', 
		}
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
