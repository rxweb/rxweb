import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators	,CreditCardType 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-creditCard-conditionalExpression-validator',
    templateUrl: './credit-card-conditional-expression.component.html'
})
export class CreditCardConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
																otherVisaCard:['',RxwebValidators.creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:x => x.cardType == "visa"  ,message:'Invalid Visa Credit Card Number.' })], 
													dinersClubCard:['',RxwebValidators.creditCard({creditCardTypes:[ CreditCardType.DinersClub ]  ,conditionalExpression:x => x.cardType == "dinersClubCard" })], 
								});
    }
}
