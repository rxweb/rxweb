import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-primeNumber-add-validator',
    templateUrl: './prime-number-add.component.html'
})
export class PrimeNumberAddValidatorComponent implements OnInit {
    numberInfoFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.numberInfoFormGroup = this.formBuilder.group({
										firstNumber:['', RxwebValidators.primeNumber()], 
								});
    }
}
