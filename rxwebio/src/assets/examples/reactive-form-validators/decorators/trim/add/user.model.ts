import {  trim,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@trim() 
	freeText: string;
	
}
