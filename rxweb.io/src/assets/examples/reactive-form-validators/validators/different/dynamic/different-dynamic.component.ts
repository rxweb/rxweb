import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-different-dynamic-validator',
    templateUrl: './different-dynamic.component.html'
})
export class DifferentDynamicValidatorComponent implements OnInit {
    accountInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			password : {
				different : {fieldName:"firstName",message:'{{0}} is same as firstName',} 
			},			
			userName : {
				different : {fieldName:"firstName",conditionalExpression:'x => x.firstName == "Bharat"',} 
			},
		};
		var accountInfo = { firstName:'', password:'', lastName:'', userName:'',  }
		this.accountInfoFormGroup = this.formBuilder.group(accountInfo,formBuilderConfiguration);
    }
}
