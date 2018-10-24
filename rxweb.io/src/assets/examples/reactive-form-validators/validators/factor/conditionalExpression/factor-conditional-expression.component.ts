import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-factor-conditionalExpression-validator',
    templateUrl: './factor-conditional-expression.component.html'
})
export class FactorConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            firstNumber:['',], 
            thirdNumber:['', RxwebValidators.factor({fieldName:"firstNumber"  ,conditionalExpression:'x => x.firstNumber == 25' })], 
            secondNumber:['', RxwebValidators.factor({fieldName:"firstNumber"  ,conditionalExpression:(x,y) =>x.firstNumber == 25  })], 
        });
    }
}
