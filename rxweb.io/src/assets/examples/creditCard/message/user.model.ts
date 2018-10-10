import {  creditCard,prop, CreditCardType, } from "@rxweb/reactive-form-validators"

export class User {

	//If you want to apply conditional expression of type 'function'
	@creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:(x,y) =>{ return  x.cardType == "visa" }  ,message:'Invalid Visa Credit Card Number.' }) 
	visaCard: string;

}
