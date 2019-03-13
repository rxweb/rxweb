import {  whitelist,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@whitelist('abc' ) 
	freeText: string;
	
}
