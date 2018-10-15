import {  creditCard,prop, CreditCardType, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	cardType: string;

	//If you want to apply conditional expression of type 'string'
	@creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:'x => x.cardType == "visa"'  ,message:'Invalid Visa Credit Card Number.' }) 
	otherVisaCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.DinersClub ]  ,conditionalExpression:'x => x.cardType == "dinersClubCard"' }) 
	dinersClubCard: string;

}
