import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-required-dynamic-validator',
    templateUrl: './required-dynamic.component.html'
})
export class RequiredDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			firstName : {
				required :true  
			},			
			lastName : {
				required : {conditionalExpression:'x => x.firstName == "Bharat"',} 
			},			
			userName : {
				required : {message:'Username cannot be blank.',} 
			},
		};
		var user = { firstName:'', middleName:'', lastName:'', userName:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
