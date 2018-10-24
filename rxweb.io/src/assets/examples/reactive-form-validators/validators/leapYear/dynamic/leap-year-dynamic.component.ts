import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-leapYear-dynamic-validator',
    templateUrl: './leap-year-dynamic.component.html'
})
export class LeapYearDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			admissionYear : {
				leapYear : {conditionalExpression:'x => x.name == "Bharat"',} 
			},			
			joiningYear : {
				leapYear : {message:'{{0}} is not a leap year',} 
			},
		};
		var user = { name:'', birthYear:'', admissionYear:'', joiningYear:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
