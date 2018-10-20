import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThanEqualTo-fieldName-validator',
    templateUrl: './greater-than-equal-to-field-name.component.html'
})
export class GreaterThanEqualToFieldNameValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										age:['',], 
													memberAge:['', RxwebValidators.greaterThanEqualTo({fieldName:'age'  ,conditionalExpression:'x => x.age >= 18 ' })], 
													otherAge:['', RxwebValidators.greaterThanEqualTo({fieldName:'age'  ,message:'Please enter number greater than or equal to 1.' })], 
								});
    }
}
