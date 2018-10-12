import {  even,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	type: string;

	//If you want to apply conditional expression of type 'string'
	@even({conditionalExpression:x => x.type == "Even" }) 
	evenNumber: number;

	//If you want to apply conditional expression of type 'function'
	@even({conditionalExpression:(x,y) =>{ return  x.type == "Even" } }) 
	number: number;

}
