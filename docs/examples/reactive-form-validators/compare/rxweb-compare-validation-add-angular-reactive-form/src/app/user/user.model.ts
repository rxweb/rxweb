import {  compare, } from "@rxweb/reactive-form-validators"
export class User {

	@compare() 
	password: string;

	@compare({fieldName:password }) 
	confirmPassword: string;

}
