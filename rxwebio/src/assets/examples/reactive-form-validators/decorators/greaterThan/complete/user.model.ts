import {  greaterThan,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	age: number;

	//If you want to apply conditional expression of type 'function'
	@greaterThan({fieldName:'age'  ,conditionalExpression:(x,y) => x.age > 17  }) 
	memberAge: number;

	//If you want to apply conditional expression of type 'string'
	@greaterThan({fieldName:'age'  ,conditionalExpression:'x => x.age > 17' }) 
	voterAge: number;

	@greaterThan({fieldName:'age'  ,message:'Please enter number greater than 0.' }) 
	otherAge: number;

}
