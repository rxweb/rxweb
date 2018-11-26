import {  different,prop, } from "@rxweb/reactive-form-validators"

export class AccountInfo {

	@prop()
	firstName: string;

	//If you want to apply conditional expression of type 'string'
	@different({fieldName:"firstName"  ,conditionalExpression:'x => x.firstName == "Bharat"' }) 
	userName: string;

	//If you want to apply conditional expression of type 'function'
	@different({fieldName:"firstName"  ,conditionalExpression:(x,y) => x.firstName == "Bharat"  }) 
	lastName: string;

}
