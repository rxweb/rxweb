import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-email-dynamic-validator',
    templateUrl: './email-dynamic.component.html'
})
export class EmailDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			email : {
				email :true  
			},			
			businessEmailAddress : {
				email : {conditionalExpression:'x => x.email =="abc@gmail.com"',} 
			},			
			otherEmailAddress : {
				email : {message:'Please enter valid email',} 
			},
		};
		var user = { email:'', recoveryEmailAddress:'', businessEmailAddress:'', otherEmailAddress:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
