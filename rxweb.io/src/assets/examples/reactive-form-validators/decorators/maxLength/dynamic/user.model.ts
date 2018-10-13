import {  maxLength,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	firstName: string;

	@prop()
	middleName: string;

	@prop()
	lastName: string;

	@prop()
	userName: string;

}
