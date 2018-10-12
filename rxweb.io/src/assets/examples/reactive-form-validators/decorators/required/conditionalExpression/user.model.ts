import {  required,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@required() 
	firstName: string;

	//If you want to apply conditional expression of type 'string'
	@required({conditionalExpression:'x => x.firstName == "John"' }) 
	lastName: string;

	//If you want to apply conditional expression of type 'function'
	@required({conditionalExpression:(x,y) => x.firstName == "John"  }) 
	middleName: string;

}
