import {  toBoolean,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@toBoolean(true ) 
	strictActive: boolean;
	
}
