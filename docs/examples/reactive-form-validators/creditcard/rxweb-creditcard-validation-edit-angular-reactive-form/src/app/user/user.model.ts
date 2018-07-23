import {  creditcard, } from "@rxweb/reactive-form-validators"
export class User {

	@creditcard({creditCardTypes:[ CreditCardType.Visa ]  ,conditionalExpressions:x => x.cardType == 'visa' }) 
	creditCardNumber: string;

}
