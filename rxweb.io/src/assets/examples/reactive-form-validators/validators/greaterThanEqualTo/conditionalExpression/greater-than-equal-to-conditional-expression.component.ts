import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThanEqualTo-conditionalExpression-validator',
    templateUrl: './greater-than-equal-to-conditional-expression.component.html'
})
export class GreaterThanEqualToConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            age:['',], 
            memberAge:['', RxwebValidators.greaterThanEqualTo({fieldName:'age'  ,conditionalExpression:'x => x.age >= 18 ' })], 
            voterAge:['', RxwebValidators.greaterThanEqualTo({fieldName:'age'  ,conditionalExpression:(x,y) => x.age >= 18  })], 
        });
    }
}
