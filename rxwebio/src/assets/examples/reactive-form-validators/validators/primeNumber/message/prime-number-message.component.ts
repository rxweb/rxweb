import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-primeNumber-message-validator',
    templateUrl: './prime-number-message.component.html'
})
export class PrimeNumberMessageValidatorComponent implements OnInit {
    numberInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.numberInfoFormGroup = this.formBuilder.group({
            firstNumber:['', RxwebValidators.primeNumber({message:'{{0}} is not a prime number' })], 
        });
    }
}
