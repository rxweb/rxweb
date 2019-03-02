import {  toBoolean,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@toBoolean() 
	active: boolean;
	
	
	@prop()
	@toBoolean(true ) 
	strictActive: boolean;
	
}
