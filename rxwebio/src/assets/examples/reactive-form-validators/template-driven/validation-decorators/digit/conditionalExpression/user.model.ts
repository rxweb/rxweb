import {  digit, } from "@rxweb/reactive-form-validators"

export class User {

	@digit() 
	age: number;

	//If you want to apply conditional expression of type 'string'
	@digit({conditionalExpression:'x => x.age >=25' }) 
	faxNumber: number;

	//If you want to apply conditional expression of type 'function'
	@digit({conditionalExpression:(x,y) => x.age >= 25  }) 
	phoneNumber: number;

}
