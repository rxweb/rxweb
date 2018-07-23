import {  greaterThan, } from "@rxweb/reactive-form-validators"
export class User {

	@greaterThan() 
	age: number;

	@greaterThan({'fieldName':'age'  ,conditionalExpressions:x => x.age > 17 }) 
	voterAge: number;

	@greaterThan({fieldName:age  ,message:'Please enter number greater than 0.' }) 
	otherAge: number;

}
