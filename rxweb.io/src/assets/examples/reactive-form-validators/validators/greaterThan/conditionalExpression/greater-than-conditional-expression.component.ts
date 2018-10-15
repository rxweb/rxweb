import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThan-conditionalExpression-validator',
    templateUrl: './greater-than-conditional-expression.component.html'
})
export class GreaterThanConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										age:['',], 
													voterAge:['', RxwebValidators.greaterThan({fieldName:'age'  ,conditionalExpression:'x => x.age > 17' })], 
													memberAge:['', RxwebValidators.greaterThan({fieldName:'age'  ,conditionalExpression:(x,y) => x.age > 17  })], 
								});
    }
}
