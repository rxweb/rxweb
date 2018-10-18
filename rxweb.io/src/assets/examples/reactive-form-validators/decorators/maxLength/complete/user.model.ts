import {  maxLength,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@maxLength({value:16 }) 
	firstName: string;

	//If you want to apply conditional expression of type 'function'
	@maxLength({value:16  ,conditionalExpression:(x,y)=> x.firstName == "John" }) 
	middleName: string;

	//If you want to apply conditional expression of type 'string'
	@maxLength({value:16  ,conditionalExpression:'x => x.firstName == "John"' }) 
	lastName: string;

	@maxLength({value:10  ,message:'Maximum 10 characters are allowed' }) 
	userName: string;

}
