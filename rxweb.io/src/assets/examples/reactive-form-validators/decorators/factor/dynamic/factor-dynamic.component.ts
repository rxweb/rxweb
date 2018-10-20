import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-factor-dynamic',
    templateUrl: './factor-dynamic.component.html'
})
export class FactorDynamicComponent implements OnInit {

    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			secondNumber : {
				factor :  {fieldName:"firstNumber",conditionalExpression:(x,y) =>x.firstNumber == 25 ,} 
			},
						
			thirdNumber : {
				factor :  {fieldName:"firstNumber",conditionalExpression:'x => x.firstNumber == 25',} 
			},
						
			fourthNumber : {
				factor :  {dividend:50,message:'{{0}} is not a factor of 50',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
