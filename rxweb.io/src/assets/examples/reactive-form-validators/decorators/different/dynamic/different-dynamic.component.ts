import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { AccountInfo } from './account-info.model';

@Component({
    selector: 'app-different-dynamic',
    templateUrl: './different-dynamic.component.html'
})
export class DifferentDynamicComponent implements OnInit {

    accountInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let accountInfo = new AccountInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			password : {
				different :  {fieldName:"firstName",message:'{{0}} is same as firstName',} 
			},
						
			lastName : {
				different :  {fieldName:"firstName",conditionalExpression:(x,y) =>{ return  x.firstName == "John" },} 
			},
						
			userName : {
				different :  {fieldName:"firstName",conditionalExpression:x => x.firstName == "John",} 
			},
			        };
		this.accountInfoFormGroup = this.formBuilder.formGroup(accountInfo,formBuilderConfiguration);
    }
}
