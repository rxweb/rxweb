import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThan-dynamic-validator',
    templateUrl: './greater-than-dynamic.component.html'
})
export class GreaterThanDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			voterAge : {
				greaterThan : {fieldName:'age',conditionalExpression:'x => x.age > 17',} 
			},			
			otherAge : {
				greaterThan : {fieldName:'age',message:'Please enter number greater than 0.',} 
			},
		};
		var user = { age:'', memberAge:'', voterAge:'', otherAge:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
