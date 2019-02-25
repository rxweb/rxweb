import {  factor,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	firstNumber: number;

	@factor({fieldName:'firstNumber' }) 
	fifthNumber: number;
	
	
}
