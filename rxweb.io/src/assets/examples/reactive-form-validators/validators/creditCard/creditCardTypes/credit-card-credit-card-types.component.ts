import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators	,CreditCardType 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-creditCard-creditCardTypes-validator',
    templateUrl: './credit-card-credit-card-types.component.html'
})
export class CreditCardCreditCardTypesValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										cardType:['',], 
													otherVisaCard:['', RxwebValidators.creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:'x => x.cardType == "visa"'  ,message:'Invalid Visa Credit Card Number.' })], 
													dinersClubCard:['', RxwebValidators.creditCard({creditCardTypes:[ CreditCardType.DinersClub ]  ,conditionalExpression:'x => x.cardType == "dinersClubCard"' })], 
								});
    }
}
