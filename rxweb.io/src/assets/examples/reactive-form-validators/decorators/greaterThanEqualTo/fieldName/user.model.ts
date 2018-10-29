import {  greaterThanEqualTo,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	age: number;

	//If you want to apply conditional expression of type 'string'
	@greaterThanEqualTo({fieldName:'age'  ,conditionalExpression:'x => x.age >= 18 ' }) 
	memberAge: number;

	//If you want to apply conditional expression of type 'function'
	@greaterThanEqualTo({fieldName:'age'  ,conditionalExpression:(x,y) => x.age >= 18  }) 
	voterAge: number;

}
