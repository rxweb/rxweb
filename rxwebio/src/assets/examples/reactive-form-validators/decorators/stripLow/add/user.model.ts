import {  stripLow,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@stripLow() 
	freeText: string;
	
	

}
