import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration } from '@rxweb/reactive-form-validators';

import { User } from '../user.model';

@Component({
    selector: 'app-user-add',
    templateUrl: './user-add.component.html'
})
export class UserAddComponent implements OnInit {

    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.validations = {
			cardType : {
				creditcard : true  
			},
			visaCard : {
				creditcard :  {creditCardTypes:[CreditCardType.Visa],conditionalExpressions:'x => x.cardType == 'visa'',message:'Invalid Visa Credit Card Number.',} 
			},
			americanExpressCard : {
				creditcard :  {creditCardTypes:[ CreditCardType.AmericanExpress ],conditionalExpressions:'x => x.cardType == 'AmericanExpress'',} 
			},
			maestroCard : {
				creditcard :  {creditCardTypes:[ CreditCardType.maestroCard ],conditionalExpressions:'x => x.cardType == 'maestroCard'',} 
			},
			jcbCard : {
				creditcard :  {creditCardTypes:[ CreditCardType.jcbCard ],conditionalExpressions:'x => x.cardType == 'jcbCard'',} 
			},
			discoverCard : {
				creditcard :  {creditCardTypes:[ CreditCardType.discoverCard ],conditionalExpressions:'x => x.cardType == 'discoverCard'',} 
			},
			masterCard : {
				creditcard :  {creditCardTypes:[ CreditCardType.masterCard ],conditionalExpressions:'x => x.cardType == 'masterCard'',} 
			},
			dinersClubCard : {
				creditcard :  {creditCardTypes:[ CreditCardType.dinersClubCard ],conditionalExpressions:'x => x.cardType == 'dinersClubCard'',} 
			},
        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
