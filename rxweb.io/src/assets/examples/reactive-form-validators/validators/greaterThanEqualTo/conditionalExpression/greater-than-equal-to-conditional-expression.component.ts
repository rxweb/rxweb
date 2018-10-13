import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThanEqualTo-conditionalExpression-validator',
    templateUrl: './greater-than-equal-to-conditional-expression.component.html'
})
export class GreaterThanEqualToConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
																memberAge:['',RxwebValidators.greaterThanEqualTo({fieldName:'age'  ,conditionalExpression:x => x.age >= 18  })], 
													voterAge:['',RxwebValidators.greaterThanEqualTo({fieldName:'age'  ,conditionalExpression:(x,y) =>{ return  x.age >= 18 } })], 
								});
    }
}
