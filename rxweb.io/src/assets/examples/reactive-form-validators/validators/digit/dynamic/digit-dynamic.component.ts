import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-digit-dynamic-validator',
    templateUrl: './digit-dynamic.component.html'
})
export class DigitDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			age : {
				digit :true  
			},			
			faxNumber : {
				digit : {conditionalExpression:'x => x.age ==25',} 
			},			
			mobileNumber : {
				digit : {message:'Please enter only digit.',} 
			},
		};
		var user = { age:'', phoneNumber:'', faxNumber:'', mobileNumber:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
