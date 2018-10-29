import {  greaterThan,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@greaterThan({fieldName:'age'  ,message:'Please enter number greater than 0.' }) 
	otherAge: number;

}
