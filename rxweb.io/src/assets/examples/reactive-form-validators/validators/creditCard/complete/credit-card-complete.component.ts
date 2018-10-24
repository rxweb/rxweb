import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-creditCard-complete-validator',
    templateUrl: './credit-card-complete.component.html'
})
export class CreditCardCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

				creditCardTypes = [ "Visa", "AmericanExpress", "Maestro", "JCB", "Discover", "DinersClub", "MasterCard",];
	
	
	
	
	
	
	
	
	
	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            cardType:['',], 
            visaCard:['', RxwebValidators.creditCard({fieldName:'cardType'  ,conditionalExpression:(x,y) => x.cardType == "Visa"   ,message:'Invalid Visa Credit Card Number.' })], 
            otherVisaCard:['', RxwebValidators.creditCard({fieldName:'cardType'  ,conditionalExpression:'x => x.cardType == "Visa"'  ,message:'Invalid Visa Credit Card Number.' })], 
            americanExpressCard:['', RxwebValidators.creditCard({fieldName:'cardType'  ,conditionalExpression:'x => x.cardType == "AmericanExpress"' })], 
            maestroCard:['', RxwebValidators.creditCard({fieldName:'cardType'  ,conditionalExpression:'x => x.cardType == "Maestro"' })], 
            jcbCard:['', RxwebValidators.creditCard({fieldName:'cardType'  ,conditionalExpression:'x => x.cardType == "JCB"' })], 
            discoverCard:['', RxwebValidators.creditCard({fieldName:'cardType'  ,conditionalExpression:'x => x.cardType == "Discover"' })], 
            masterCard:['', RxwebValidators.creditCard({fieldName:'cardType'  ,conditionalExpression:'x => x.cardType == "MasterCard"' })], 
            dinersClubCard:['', RxwebValidators.creditCard({fieldName:'cardType'  ,conditionalExpression:'x => x.cardType == "DinersClub"' })], 
        });
    }
}
