import {  compare,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	password: string;

	@compare({fieldName:'password' }) 
	confirmPassword: string;

}
