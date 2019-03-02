import {  email,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	email: string;

	@prop()
	businessEmailAddress: string;

	@prop()
	otherEmailAddress: string;

}
