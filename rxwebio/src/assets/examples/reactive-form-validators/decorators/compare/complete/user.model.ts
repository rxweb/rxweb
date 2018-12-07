import {  compare,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	email: string;

	@compare({fieldName:'email' }) 
	confirmEmail: string;

	@prop()
	password: string;

	@compare({fieldName:'password'  ,message:'You must enter same password' }) 
	confirmPassword: string;

}
