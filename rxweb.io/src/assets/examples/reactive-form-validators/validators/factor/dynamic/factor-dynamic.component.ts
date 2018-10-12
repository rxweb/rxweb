import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-factor-dynamic-validator',
    templateUrl: './factor-dynamic.component.html'
})
export class FactorDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			secondNumber : {
				factor :  {fieldName:"firstNumber",conditionalExpression:(x,y) =>{ return  x.firstNumber == 25 },} 
			},
						
			thirdNumber : {
				factor :  {fieldName:"firstNumber",conditionalExpression:x => x.firstNumber == 25,} 
			},
						
			fourthNumber : {
				factor :  {dividend:50,message:'{{0}} is not a factor of 50',} 
			},
			        };
		 var user = {
			secondNumber:'', thirdNumber:'', fourthNumber:'', 
		}
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
