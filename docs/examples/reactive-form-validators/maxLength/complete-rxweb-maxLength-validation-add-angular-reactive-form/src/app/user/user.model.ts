import {  maxLength, } from "@rxweb/reactive-form-validators"
export class User {

	@maxLength({value:16 }) 
	firstName: string;

	@maxLength({value:16  ,conditionalExpressions:(x,y)=>{ return x.firstName == "John"} }) 
	lastName: string;

	@maxLength({value:10  ,message:'Maximum 10 characters are allowed' }) 
	userName: string;

}
