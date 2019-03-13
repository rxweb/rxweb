import {  toInt,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@toInt(10 ) 
	totalAmount: number;
	
}
