import {  toDouble,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@toDouble() 
	amount: number;
	
}
