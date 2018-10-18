import {  ascii,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	language: string;

	@prop()
	numberAsciiCode: string;

	@prop()
	alphabetAsciiCode: string;

	@prop()
	specialCharAsciiCode: string;

}
