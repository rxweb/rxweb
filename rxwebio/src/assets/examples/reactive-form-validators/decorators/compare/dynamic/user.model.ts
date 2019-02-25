import {  compare,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	email: string;

	@prop()
	confirmEmail: string;

	@prop()
	password: string;

	@prop()
	confirmPassword: string;

}
