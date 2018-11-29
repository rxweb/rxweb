import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-primeNumber-complete-validator',
    templateUrl: './prime-number-complete.component.html'
})
export class PrimeNumberCompleteValidatorComponent implements OnInit {
    numberInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.numberInfoFormGroup = this.formBuilder.group({
            numberType:['',], 
            secondNumber:['', RxwebValidators.primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime"  })], 
            thirdNumber:['', RxwebValidators.primeNumber({conditionalExpression:'x => x.numberType =="Prime"' })], 
            firstNumber:['', RxwebValidators.primeNumber({message:'{{0}} is not a prime number' })], 
        });
    }
}
