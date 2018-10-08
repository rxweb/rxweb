import {  creditCard,prop, CreditCardType,} from "@rxweb/reactive-form-validators"

export class User {

	@creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:x => x.cardType == "visa"  ,message:'Invalid Visa Credit Card Number.' }) 
	visaCard: string;
}
