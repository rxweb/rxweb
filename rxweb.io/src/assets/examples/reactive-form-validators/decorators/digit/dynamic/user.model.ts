import {  digit,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	age: number;

	@prop()
	phoneNumber: number;

	@prop()
	faxNumber: number;

	@prop()
	mobileNumber: number;

}
