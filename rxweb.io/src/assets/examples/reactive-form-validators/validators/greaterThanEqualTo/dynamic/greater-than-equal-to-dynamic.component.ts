import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThanEqualTo-dynamic-validator',
    templateUrl: './greater-than-equal-to-dynamic.component.html'
})
export class GreaterThanEqualToDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			memberAge : {
				greaterThanEqualTo : {fieldName:'age',conditionalExpression:'x => x.age >= 18 ',} 
			},			
			otherAge : {
				greaterThanEqualTo : {fieldName:'age',message:'Please enter number greater than or equal to 1.',} 
			},
		};
		var user = { age:'', voterAge:'', memberAge:'', otherAge:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
