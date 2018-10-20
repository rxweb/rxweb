import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-creditCard-fieldName-validator',
    templateUrl: './credit-card-field-name.component.html'
})
export class CreditCardFieldNameValidatorComponent implements OnInit {
    userFormGroup: FormGroup
								creditCardTypes = [ "Visa", "AmericanExpress", "Maestro", "JCB", "Discover", "DinersClub", "MasterCard",];
				
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										cardType:['',], 
													otherVisaCard:['', RxwebValidators.creditCard({fieldName:'cardType'  ,conditionalExpression:'x => x.cardType == "Visa"'  ,message:'Invalid Visa Credit Card Number.' })], 
													dinersClubCard:['', RxwebValidators.creditCard({fieldName:'cardType'  ,conditionalExpression:'x => x.cardType == "DinersClub"' })], 
								});
    }
}
