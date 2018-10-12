import {  different,prop, } from "@rxweb/reactive-form-validators"

export class AccountInfo {

	@prop()
	firstName: string;

	@prop()
	password: string;

	@prop()
	lastName: string;

	@prop()
	userName: string;

}
