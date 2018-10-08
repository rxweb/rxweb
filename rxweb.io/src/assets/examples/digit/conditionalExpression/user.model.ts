import {  digit,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@digit() 
	age: number;
	@digit({conditionalExpression:(x,y) =>{ return  x.age >= 25 } }) 
	phoneNumber: number;
}
