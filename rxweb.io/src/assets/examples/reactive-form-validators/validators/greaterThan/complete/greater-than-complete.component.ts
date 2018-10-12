import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThan-complete-validator',
    templateUrl: './greater-than-complete.component.html'
})
export class GreaterThanCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
																memberAge:['',RxwebValidators.greaterThan({fieldName:'age'  ,conditionalExpression:(x,y) =>{ return  x.age > 17 } })], 
													voterAge:['',RxwebValidators.greaterThan({fieldName:'age'  ,conditionalExpression:x => x.age > 17 })], 
													otherAge:['',RxwebValidators.greaterThan({fieldName:'age'  ,message:'Please enter number greater than 0.' })], 
								});
    }
}
