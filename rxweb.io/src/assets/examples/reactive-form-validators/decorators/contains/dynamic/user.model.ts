import {  contains,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	emailAddress: string;

	@prop()
	businessEmailAddress: string;

	@prop()
	recoveryEmailAddress: string;

	@prop()
	otherEmailAddress: string;

}
