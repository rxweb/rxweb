import {  email,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	email: string;

	@prop()
	recoveryEmailAddress: string;

	@prop()
	businessEmailAddress: string;

	@prop()
	otherEmailAddress: string;

}
