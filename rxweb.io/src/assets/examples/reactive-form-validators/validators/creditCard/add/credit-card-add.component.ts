import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-creditCard-add-validator',
    templateUrl: './credit-card-add.component.html'
})
export class CreditCardAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup
								creditCardTypes = [ "Visa", "AmericanExpress", "Maestro", "JCB", "Discover", "DinersClub", "MasterCard",];
				
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										cardType:['',], 
													creditCardNumber:['', RxwebValidators.creditCard({fieldName:'cardType' })], 
								});
    }
}
