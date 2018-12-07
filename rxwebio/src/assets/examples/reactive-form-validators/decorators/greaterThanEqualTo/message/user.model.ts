import {  greaterThanEqualTo,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	admissionAge: number;

	@greaterThanEqualTo({fieldName:'admissionAge'  ,message:'Please enter number greater than or equal to 1.' }) 
	otherAge: number;

}
