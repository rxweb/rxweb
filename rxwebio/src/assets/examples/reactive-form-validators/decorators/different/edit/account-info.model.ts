import {  different,prop, } from "@rxweb/reactive-form-validators"

export class AccountInfo {

	@prop()
	firstName: string;

	@different({fieldName:'firstName' }) 
	lastName: string;

}
