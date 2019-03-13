import {  ltrim,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@ltrim() 
	freeText: string;
	
}
