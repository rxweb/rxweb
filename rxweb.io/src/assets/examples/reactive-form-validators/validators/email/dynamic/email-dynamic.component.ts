import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-email-dynamic-validator',
    templateUrl: './email-dynamic.component.html'
})
export class EmailDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			email : {
				email : true  
			},
						
			recoveryEmailAddress : {
				email :  {conditionalExpression:(x,y) =>{ return  x.email == "abc@gmail.com" },} 
			},
						
			businessEmailAddress : {
				email :  {conditionalExpression:x => x.email =="abc@gmail.com",} 
			},
						
			otherEmailAddress : {
				email :  {message:'Please enter valid email',} 
			},
			        };
		 var user = {
			email:'', recoveryEmailAddress:'', businessEmailAddress:'', otherEmailAddress:'', 
		}
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
