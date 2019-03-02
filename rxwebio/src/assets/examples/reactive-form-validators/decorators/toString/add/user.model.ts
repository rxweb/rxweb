import {  toString,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@toString() 
	freeText: string;
	
	

}
