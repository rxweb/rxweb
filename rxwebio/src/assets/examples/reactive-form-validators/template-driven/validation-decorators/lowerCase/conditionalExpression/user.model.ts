import {  lowerCase, } from "@rxweb/reactive-form-validators"

export class User {

	@lowerCase() 
	username: string;

	//If you want to apply conditional expression of type 'string'
	@lowerCase({conditionalExpression:'x => x.username == "jonathan.feldman"' }) 
	middleName: string;

	//If you want to apply conditional expression of type 'function'
	@lowerCase({conditionalExpression:(x,y) =>  x.username == "jonathan.feldman"  }) 
	firstName: string;

}
