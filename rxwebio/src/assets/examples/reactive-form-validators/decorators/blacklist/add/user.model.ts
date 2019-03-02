import {  blacklist,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@blacklist('abc' ) 
	freeText: string;
	
}
