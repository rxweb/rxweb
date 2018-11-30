import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-range-conditionalExpression-validator',
    templateUrl: './range-conditional-expression.component.html'
})
export class RangeConditionalExpressionValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.group({
            age:['', RxwebValidators.range({minimumNumber:18  ,maximumNumber:60 })], 
            experience:['', RxwebValidators.range({minimumNumber:2  ,maximumNumber:20  ,conditionalExpression:'x => x.age >=25' })], 
            projectDuration:['', RxwebValidators.range({minimumNumber:6  ,maximumNumber:8  ,conditionalExpression:(x,y) => x.age >= 25  })], 
        });
    }
}
