import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lowerCase-dynamic-validator',
    templateUrl: './lower-case-dynamic.component.html'
})
export class LowerCaseDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			username : {
				lowerCase : true  
			},
						
			firstName : {
				lowerCase :  {conditionalExpression:(x, y) => { return x.username == "jonathan.feldman" },} 
			},
						
			middleName : {
				lowerCase :  {conditionalExpression:x => x.username == "jonathan.feldman",} 
			},
						
			lastName : {
				lowerCase :  {message:'You can enter only lowerCase letters.',} 
			},
			        };
		 var user = {
			username:'', firstName:'', middleName:'', lastName:'', 
		}
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
