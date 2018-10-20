import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-different-dynamic-validator',
    templateUrl: './different-dynamic.component.html'
})
export class DifferentDynamicValidatorComponent implements OnInit {
    accountInfoFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			password : {
				different :  {fieldName:"firstName",message:'{{0}} is same as firstName',} 
			},
						
			lastName : {
				different :  {fieldName:"firstName",conditionalExpression:(x,y) => x.firstName == "John" ,} 
			},
						
			userName : {
				different :  {fieldName:"firstName",conditionalExpression:'x => x.firstName == "John"',} 
			},
			        };
		 var accountInfo = {
			firstName:'', password:'', lastName:'', userName:'', 
		}
		this.accountInfoFormGroup = this.formBuilder.group(accountInfo,formBuilderConfiguration);
    }
}
