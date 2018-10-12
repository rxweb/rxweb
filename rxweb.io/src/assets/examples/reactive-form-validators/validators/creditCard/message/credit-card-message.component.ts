import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators	,CreditCardType 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-creditCard-message-validator',
    templateUrl: './credit-card-message.component.html'
})
export class CreditCardMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										cardType:['',], 
													otherVisaCard:['', RxwebValidators.creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:'x => x.cardType == "visa"'  ,message:'Invalid Visa Credit Card Number.' })], 
													visaCard:['', RxwebValidators.creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:(x,y) => x.cardType == "visa"   ,message:'Invalid Visa Credit Card Number.' })], 
								});
    }
}
