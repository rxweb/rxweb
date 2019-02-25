import {  password,prop, } from   "@rxweb/reactive-form-validators"   

export class LoginInfo {

	@prop()
	newPassword: string;

	@prop()
	oldPassword: string;

}
