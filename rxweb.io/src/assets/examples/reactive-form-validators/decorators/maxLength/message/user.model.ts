import {  maxLength,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@maxLength({value:10  ,message:'Maximum 10 characters are allowed' }) 
	userName: string;

}
