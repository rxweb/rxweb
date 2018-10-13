import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators	,CreditCardType 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-creditCard-dynamic-validator',
    templateUrl: './credit-card-dynamic.component.html'
})
export class CreditCardDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			visaCard : {
				creditCard :  {creditCardTypes:[CreditCardType.Visa],conditionalExpression:(x,y) =>{ return  x.cardType == "visa" },message:'Invalid Visa Credit Card Number.',} 
			},
						
			otherVisaCard : {
				creditCard :  {creditCardTypes:[CreditCardType.Visa],conditionalExpression:x => x.cardType == "visa",message:'Invalid Visa Credit Card Number.',} 
			},
						
			americanExpressCard : {
				creditCard :  {creditCardTypes:[ CreditCardType.AmericanExpress ],conditionalExpression:x => x.cardType == "AmericanExpress" ,} 
			},
						
			maestroCard : {
				creditCard :  {creditCardTypes:[ CreditCardType.Maestro ],conditionalExpression:x => x.cardType == "maestroCard",} 
			},
						
			jcbCard : {
				creditCard :  {creditCardTypes:[ CreditCardType.JCB ],conditionalExpression:x => x.cardType == "jcbCard",} 
			},
						
			discoverCard : {
				creditCard :  {creditCardTypes:[ CreditCardType.Discover ],conditionalExpression:x => x.cardType == "discoverCard",} 
			},
						
			masterCard : {
				creditCard :  {creditCardTypes:[ CreditCardType.MasterCard ],conditionalExpression:x => x.cardType == "masterCard",} 
			},
						
			dinersClubCard : {
				creditCard :  {creditCardTypes:[ CreditCardType.DinersClub ],conditionalExpression:x => x.cardType == "dinersClubCard",} 
			},
			        };
		 var user = {
			visaCard:'', otherVisaCard:'', americanExpressCard:'', maestroCard:'', jcbCard:'', discoverCard:'', masterCard:'', dinersClubCard:'', 
		}
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
