import {  greaterThan,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	age: number;

	@greaterThan({fieldName:'age' }) 
	retiermentAge: number;
	
	
	

}
