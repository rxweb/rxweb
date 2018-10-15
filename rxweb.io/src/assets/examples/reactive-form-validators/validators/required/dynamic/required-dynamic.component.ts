import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-required-dynamic-validator',
    templateUrl: './required-dynamic.component.html'
})
export class RequiredDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			firstName : {
				required : true  
			},
						
			middleName : {
				required :  {conditionalExpression:(x,y) => x.firstName == "John" ,} 
			},
						
			lastName : {
				required :  {conditionalExpression:'x => x.firstName == "John"',} 
			},
						
			userName : {
				required :  {message:'Username cannot be blank.',} 
			},
			        };
		 var user = {
			firstName:'', middleName:'', lastName:'', userName:'', 
		}
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
