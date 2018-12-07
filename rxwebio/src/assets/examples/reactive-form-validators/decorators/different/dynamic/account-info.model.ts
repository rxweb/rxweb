import {  different,prop, } from "@rxweb/reactive-form-validators"

export class AccountInfo {

	@prop()
	firstName: string;

	@prop()
	middleName: string;

	@prop()
	password: string;

	@prop()
	userName: string;

}
