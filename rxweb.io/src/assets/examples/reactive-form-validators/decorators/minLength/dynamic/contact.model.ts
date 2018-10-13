import {  minLength,prop, } from "@rxweb/reactive-form-validators"

export class Contact {

	@prop()
	countryName: string;

	@prop()
	mobileNo: string;

	@prop()
	landLineNo: string;

	@prop()
	countryCode: string;

	@prop()
	stateCode: string;

}
