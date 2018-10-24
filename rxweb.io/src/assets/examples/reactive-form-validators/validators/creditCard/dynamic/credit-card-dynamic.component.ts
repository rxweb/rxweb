import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-creditCard-dynamic-validator',
    templateUrl: './credit-card-dynamic.component.html'
})
export class CreditCardDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

				creditCardTypes = [ "Visa", "AmericanExpress", "Maestro", "JCB", "Discover", "DinersClub", "MasterCard",];
	
	
	
	
	
	
	
	
	
	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			otherVisaCard : {
				creditCard : {fieldName:'cardType',conditionalExpression:'x => x.cardType == "Visa"',message:'Invalid Visa Credit Card Number.',} 
			},			
			americanExpressCard : {
				creditCard : {fieldName:'cardType',conditionalExpression:'x => x.cardType == "AmericanExpress"',} 
			},			
			maestroCard : {
				creditCard : {fieldName:'cardType',conditionalExpression:'x => x.cardType == "Maestro"',} 
			},			
			jcbCard : {
				creditCard : {fieldName:'cardType',conditionalExpression:'x => x.cardType == "JCB"',} 
			},			
			discoverCard : {
				creditCard : {fieldName:'cardType',conditionalExpression:'x => x.cardType == "Discover"',} 
			},			
			masterCard : {
				creditCard : {fieldName:'cardType',conditionalExpression:'x => x.cardType == "MasterCard"',} 
			},			
			dinersClubCard : {
				creditCard : {fieldName:'cardType',conditionalExpression:'x => x.cardType == "DinersClub"',} 
			},
		};
		var user = { cardType:'', visaCard:'', otherVisaCard:'', americanExpressCard:'', maestroCard:'', jcbCard:'', discoverCard:'', masterCard:'', dinersClubCard:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}
