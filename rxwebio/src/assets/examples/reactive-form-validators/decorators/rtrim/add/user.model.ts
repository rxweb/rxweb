import {  rtrim,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@rtrim() 
	freeText: string;
	
	

}
