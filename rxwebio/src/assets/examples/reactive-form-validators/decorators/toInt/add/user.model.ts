import {  toInt,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@toInt() 
	amount: number;
	
}
