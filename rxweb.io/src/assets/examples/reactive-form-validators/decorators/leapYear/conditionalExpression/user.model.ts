import {  leapYear,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	name: string;

	//If you want to apply conditional expression of type 'string'
	@leapYear({conditionalExpression:x => x.name == "John" }) 
	admissionYear: Date;

	//If you want to apply conditional expression of type 'function'
	@leapYear({conditionalExpression:(x,y) =>{ return  x.name == "John" } }) 
	birthYear: number;

}
