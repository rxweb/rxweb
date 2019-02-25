import {  greaterThanEqualTo,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	admissionAge: number;

	@greaterThanEqualTo({fieldName:'admissionAge' }) 
	retiermentAge: number;
	
	
	

}
