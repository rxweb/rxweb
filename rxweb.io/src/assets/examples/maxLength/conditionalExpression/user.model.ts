import {  maxLength,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@maxLength({value:16 }) 
	firstName: string;

	//If you want to apply conditional expression of type 'string'
	@maxLength({value:16  ,conditionalExpression:(x,y)=>{ return x.firstName == "John"} }) 
	lastName: string;

	//If you want to apply conditional expression of type 'function'
	@maxLength({value:16  ,conditionalExpression:(x,y)=>{ return x.firstName == "John"} }) 
	middleName: string;

}
