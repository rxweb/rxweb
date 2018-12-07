import {  creditCard,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	cardType: string;

	//If you want to apply conditional expression of type 'string'
	@creditCard({fieldName:'cardType'  ,conditionalExpression:'x => x.cardType == "Visa"'  ,message:'Invalid Visa Credit Card Number.' }) 
	otherVisaCard: string;

	//If you want to apply conditional expression of type 'function'
	@creditCard({fieldName:'cardType'  ,conditionalExpression:(x,y) => x.cardType == "Visa"   ,message:'Invalid Visa Credit Card Number.' }) 
	visaCard: string;

}
