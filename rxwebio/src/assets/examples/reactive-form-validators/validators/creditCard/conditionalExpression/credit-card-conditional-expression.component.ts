import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-creditCard-conditionalExpression-validator',
    templateUrl: './credit-card-conditional-expression.component.html'
})
export class CreditCardConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

				creditCardTypes = [ "Visa", "AmericanExpress", "Maestro", "JCB", "Discover", "DinersClub", "MasterCard",];
	
	
	
	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            cardType:['',], 
            otherVisaCard:['', RxwebValidators.creditCard({fieldName:'cardType'  ,conditionalExpression:'x => x.cardType == "Visa"'  ,message:'Invalid Visa Credit Card Number.' })], 
            visaCard:['', RxwebValidators.creditCard({fieldName:'cardType'  ,conditionalExpression:(x,y) => x.cardType == "Visa"   ,message:'Invalid Visa Credit Card Number.' })], 
        });
    }
}
