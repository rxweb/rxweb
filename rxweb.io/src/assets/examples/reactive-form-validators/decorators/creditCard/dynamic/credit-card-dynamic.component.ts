import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-creditCard-dynamic',
    templateUrl: './credit-card-dynamic.component.html'
})
export class CreditCardDynamicComponent implements OnInit {

    userFormGroup: FormGroup
								creditCardTypes = [ "Visa", "AmericanExpress", "Maestro", "JCB", "Discover", "DinersClub", "MasterCard",];
				
					
					
					
					
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			visaCard : {
				creditCard :  {fieldName:'cardType',conditionalExpression:(x,y) => x.cardType == "Visa" ,message:'Invalid Visa Credit Card Number.',} 
			},
						
			otherVisaCard : {
				creditCard :  {fieldName:'cardType',conditionalExpression:'x => x.cardType == "Visa"',message:'Invalid Visa Credit Card Number.',} 
			},
						
			americanExpressCard : {
				creditCard :  {fieldName:'cardType',conditionalExpression:'x => x.cardType == "AmericanExpress"',} 
			},
						
			maestroCard : {
				creditCard :  {fieldName:'cardType',conditionalExpression:'x => x.cardType == "Maestro"',} 
			},
						
			jcbCard : {
				creditCard :  {fieldName:'cardType',conditionalExpression:'x => x.cardType == "JCB"',} 
			},
						
			discoverCard : {
				creditCard :  {fieldName:'cardType',conditionalExpression:'x => x.cardType == "Discover"',} 
			},
						
			masterCard : {
				creditCard :  {fieldName:'cardType',conditionalExpression:'x => x.cardType == "MasterCard"',} 
			},
						
			dinersClubCard : {
				creditCard :  {fieldName:'cardType',conditionalExpression:'x => x.cardType == "DinersClub"',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}
