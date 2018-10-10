import {  greaterThan,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	age: number;

	//If you want to apply conditional expression of type 'string'
	@greaterThan({fieldName:'age'  ,conditionalExpression:x => x.age > 17 }) 
	voterAge: number;

	//If you want to apply conditional expression of type 'function'
	@greaterThan({fieldName:'age'  ,conditionalExpression:(x,y) =>{ return  x.age > 17 } }) 
	memberAge: number;

}
