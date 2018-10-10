import {  different,prop, } from "@rxweb/reactive-form-validators"

export class AccountInfo {

	@prop()
	firstName: string;

	//If you want to apply conditional expression of type 'function'
	@different({fieldName:"firstName"  ,conditionalExpression:(x,y) =>{ return  x.firstName == "John" } }) 
	lastName: string;

	//If you want to apply conditional expression of type 'string'
	@different({fieldName:"firstName"  ,conditionalExpression:x => x.firstName == "John" }) 
	userName: string;

	@different({fieldName:"firstName"  ,message:'{{0}} is same as Username' }) 
	password: string;

}
