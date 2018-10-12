import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-contains-dynamic-validator',
    templateUrl: './contains-dynamic.component.html'
})
export class ContainsDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			emailAddress : {
				contains :  {value:'@gmail.com',} 
			},
						
			businessEmailAddress : {
				contains :  {value:'@gmail.com',conditionalExpression:(x,y) => x.emailAddress == "abc@gmail.com",} 
			},
						
			recoveryEmailAddress : {
				contains :  {value:'@gmail.com',conditionalExpression:'x => x.emailAddress == "abc@gmail.com"',} 
			},
						
			otherEmailAddress : {
				contains :  {value:'@gmail.com',message:'Please enter valid gmailId',} 
			},
			        };
		 var user = {
			emailAddress:'', businessEmailAddress:'', recoveryEmailAddress:'', otherEmailAddress:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
