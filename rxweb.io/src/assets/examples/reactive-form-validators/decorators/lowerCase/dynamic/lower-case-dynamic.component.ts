import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-lowerCase-dynamic',
    templateUrl: './lower-case-dynamic.component.html'
})
export class LowerCaseDynamicComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
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
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
