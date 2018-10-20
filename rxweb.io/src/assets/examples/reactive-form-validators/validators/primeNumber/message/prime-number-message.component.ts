import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-primeNumber-message-validator',
    templateUrl: './prime-number-message.component.html'
})
export class PrimeNumberMessageValidatorComponent implements OnInit {
    numberInfoFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.numberInfoFormGroup = this.formBuilder.group({
										firstNumber:['', RxwebValidators.primeNumber({message:'{{0}} is not a prime number' })], 
								});
    }
}
