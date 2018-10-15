import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators	,CreditCardType 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-creditCard-complete-validator',
    templateUrl: './credit-card-complete.component.html'
})
export class CreditCardCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										cardType:['',], 
													visaCard:['', RxwebValidators.creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:(x,y) => x.cardType == "visa"   ,message:'Invalid Visa Credit Card Number.' })], 
													otherVisaCard:['', RxwebValidators.creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:'x => x.cardType == "visa"'  ,message:'Invalid Visa Credit Card Number.' })], 
													americanExpressCard:['', RxwebValidators.creditCard({creditCardTypes:[ CreditCardType.AmericanExpress ]  ,conditionalExpression:'x => x.cardType == "AmericanExpress"' })], 
													maestroCard:['', RxwebValidators.creditCard({creditCardTypes:[ CreditCardType.Maestro ]  ,conditionalExpression:'x => x.cardType == "maestroCard"' })], 
													jcbCard:['', RxwebValidators.creditCard({creditCardTypes:[ CreditCardType.JCB ]  ,conditionalExpression:'x => x.cardType == "jcbCard"' })], 
													discoverCard:['', RxwebValidators.creditCard({creditCardTypes:[ CreditCardType.Discover ]  ,conditionalExpression:'x => x.cardType == "discoverCard"' })], 
													masterCard:['', RxwebValidators.creditCard({creditCardTypes:[ CreditCardType.MasterCard ]  ,conditionalExpression:'x => x.cardType == "masterCard"' })], 
													dinersClubCard:['', RxwebValidators.creditCard({creditCardTypes:[ CreditCardType.DinersClub ]  ,conditionalExpression:'x => x.cardType == "dinersClubCard"' })], 
								});
    }
}
