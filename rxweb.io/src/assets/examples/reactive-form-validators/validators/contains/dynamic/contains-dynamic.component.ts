import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-contains-dynamic-validator',
    templateUrl: './contains-dynamic.component.html'
})
export class ContainsDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			emailAddress : {
				contains : {value:'@gmail.com',} 
			},			
			recoveryEmailAddress : {
				contains : {value:'@gmail.com',conditionalExpression:'x => x.emailAddress == "abc@gmail.com"',} 
			},			
			otherEmailAddress : {
				contains : {value:'@gmail.com',message:'Please enter valid gmailId',} 
			},
		};
		var user = { emailAddress:'', businessEmailAddress:'', recoveryEmailAddress:'', otherEmailAddress:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
