import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-range-conditionalExpression-validator',
    templateUrl: './range-conditional-expression.component.html'
})
export class RangeConditionalExpressionValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.formGroup({
										age:['',RxwebValidators.range({minimumNumber:18  ,maximumNumber:60 })], 
													experience:['',RxwebValidators.range({minimumNumber:2  ,maximumNumber:20  ,conditionalExpression:x => x.age >=25 })], 
													projectDuration:['',RxwebValidators.range({minimumNumber:6  ,maximumNumber:8  ,conditionalExpression:(x,y) =>{ return  x.age >= 25 } })], 
								});
    }
}
