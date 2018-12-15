import {  compare,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	email: string;

	@compare({fieldName:'email' }) 
	confirmEmail: string;

}
