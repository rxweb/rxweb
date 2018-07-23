import {  greaterThanEqualTo, } from "@rxweb/reactive-form-validators"
export class User {

	@greaterThanEqualTo() 
	age: number;

	@greaterThanEqualTo({fieldName:age  ,conditionalExpressions:x => x.age >= 18  }) 
	voterAge: number;

	@greaterThanEqualTo({fieldName:age  ,message:'Please enter number greater than or equal to 1.' }) 
	otherAge: number;

}
