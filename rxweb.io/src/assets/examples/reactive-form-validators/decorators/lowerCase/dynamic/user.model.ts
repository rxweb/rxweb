import {  lowerCase,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	username: string;

	@prop()
	middleName: string;

	@prop()
	lastName: string;

}
