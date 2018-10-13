import {  greaterThanEqualTo,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	age: number;

	//If you want to apply conditional expression of type 'string'
	@greaterThanEqualTo({fieldName:'age'  ,conditionalExpression:x => x.age >= 18  }) 
	memberAge: number;

	@greaterThanEqualTo({fieldName:'age'  ,message:'Please enter number greater than or equal to 1.' }) 
	otherAge: number;

}
