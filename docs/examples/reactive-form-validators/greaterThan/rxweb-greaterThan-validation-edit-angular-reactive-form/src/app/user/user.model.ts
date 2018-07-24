import {  greaterThan, } from "@rxweb/reactive-form-validators"
export class User {

	@greaterThan() 
	age: number;

	@greaterThan({fieldName:'age' }) 
	voterAge: number;

}
