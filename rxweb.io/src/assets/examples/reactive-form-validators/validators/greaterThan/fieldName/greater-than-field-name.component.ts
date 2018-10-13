import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThan-fieldName-validator',
    templateUrl: './greater-than-field-name.component.html'
})
export class GreaterThanFieldNameValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
																voterAge:['',RxwebValidators.greaterThan({fieldName:'age'  ,conditionalExpression:x => x.age > 17 })], 
													otherAge:['',RxwebValidators.greaterThan({fieldName:'age'  ,message:'Please enter number greater than 0.' })], 
								});
    }
}
