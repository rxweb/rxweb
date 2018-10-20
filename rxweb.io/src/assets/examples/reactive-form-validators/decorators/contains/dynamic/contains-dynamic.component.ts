import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-contains-dynamic',
    templateUrl: './contains-dynamic.component.html'
})
export class ContainsDynamicComponent implements OnInit {

    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
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
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
