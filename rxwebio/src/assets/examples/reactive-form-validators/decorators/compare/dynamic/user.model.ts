import {  compare,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	password: string;

	@prop()
	confirmPassword: string;

}
