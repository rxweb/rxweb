import {  password, } from "@rxweb/reactive-form-validators"
export class LoginInfo {

	@password() 
	password: string;

}
