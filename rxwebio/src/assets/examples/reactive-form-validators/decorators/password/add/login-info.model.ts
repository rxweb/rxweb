import {  password, } from   "@rxweb/reactive-form-validators"   

export class LoginInfo {

	@password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true} }) 
	password: string;
	
	
}
