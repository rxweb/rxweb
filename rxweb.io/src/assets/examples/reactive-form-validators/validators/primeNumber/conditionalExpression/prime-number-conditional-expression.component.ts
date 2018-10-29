import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-primeNumber-conditionalExpression-validator',
    templateUrl: './prime-number-conditional-expression.component.html'
})
export class PrimeNumberConditionalExpressionValidatorComponent implements OnInit {
    numberInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.numberInfoFormGroup = this.formBuilder.group({
            numberType:['',], 
            thirdNumber:['', RxwebValidators.primeNumber({conditionalExpression:'x => x.numberType =="Prime"' })], 
            secondNumber:['', RxwebValidators.primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime"  })], 
        });
    }
}
