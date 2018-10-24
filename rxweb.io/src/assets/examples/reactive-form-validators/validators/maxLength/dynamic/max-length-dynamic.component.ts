import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxLength-dynamic-validator',
    templateUrl: './max-length-dynamic.component.html'
})
export class MaxLengthDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			firstName : {
				maxLength : {value:16,} 
			},			
			lastName : {
				maxLength : {value:16,conditionalExpression:'x => x.firstName == "Bharat"',} 
			},			
			userName : {
				maxLength : {value:10,message:'Maximum 10 characters are allowed',} 
			},
		};
		var user = { firstName:'', middleName:'', lastName:'', userName:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
