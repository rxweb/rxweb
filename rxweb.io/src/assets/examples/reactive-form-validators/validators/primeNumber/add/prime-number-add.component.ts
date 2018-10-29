import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-primeNumber-add-validator',
    templateUrl: './prime-number-add.component.html'
})
export class PrimeNumberAddValidatorComponent implements OnInit {
    numberInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.numberInfoFormGroup = this.formBuilder.group({
            firstNumber:['', RxwebValidators.primeNumber()], 
        });
    }
}
