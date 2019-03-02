import {  creditCard,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	cardType: string;

	@creditCard({fieldName:'cardType' }) 
	creditCardNumber: string;
	
	
}
