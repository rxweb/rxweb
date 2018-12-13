import {  greaterThanEqualTo, } from "@rxweb/reactive-form-validators"

export class User {

	@greaterThanEqualTo({fieldName:'admissionAge'  ,message:'Please enter number greater than or equal to 1.' }) 
	otherAge: number;

}
