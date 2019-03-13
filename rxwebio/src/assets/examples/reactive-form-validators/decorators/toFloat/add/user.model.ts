import {  toFloat,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@toFloat() 
	amount: number;
	
}
