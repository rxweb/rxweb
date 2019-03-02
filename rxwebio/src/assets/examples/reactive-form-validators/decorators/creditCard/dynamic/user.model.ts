import {  creditCard,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	cardType: string;

	@prop()
	otherVisaCard: string;

	@prop()
	americanExpressCard: string;

	@prop()
	maestroCard: string;

	@prop()
	jcbCard: string;

	@prop()
	discoverCard: string;

	@prop()
	masterCard: string;

	@prop()
	dinersClubCard: string;

}
