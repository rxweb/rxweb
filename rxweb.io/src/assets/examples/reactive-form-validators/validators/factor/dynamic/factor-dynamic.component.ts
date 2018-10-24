import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-factor-dynamic-validator',
    templateUrl: './factor-dynamic.component.html'
})
export class FactorDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			thirdNumber : {
				factor : {fieldName:"firstNumber",conditionalExpression:'x => x.firstNumber == 25',} 
			},			
			fourthNumber : {
				factor : {dividend:50,message:'{{0}} is not a factor of 50',} 
			},
		};
		var user = { firstNumber:'', secondNumber:'', thirdNumber:'', fourthNumber:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
