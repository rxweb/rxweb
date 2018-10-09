import {  email,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@email() 
	email: string;

	//If you want to apply conditional expression of type 'string'
	@email({conditionalExpression:x => x.email =="abc@gmail.com" }) 
	businessEmailAddress: string;

	//If you want to apply conditional expression of type 'function'
	@email({conditionalExpression:(x,y) =>{ return  x.email == "abc@gmail.com" } }) 
	recoveryEmailAddress: string;

}
