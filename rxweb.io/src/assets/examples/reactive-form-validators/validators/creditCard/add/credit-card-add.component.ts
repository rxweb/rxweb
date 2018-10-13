import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators	,CreditCardType 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-creditCard-add-validator',
    templateUrl: './credit-card-add.component.html'
})
export class CreditCardAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
										creditCardNumber:['',RxwebValidators.creditCard({creditCardTypes:[ CreditCardType.Visa ] })], 
								});
    }
}
