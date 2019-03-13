import {  toDate,prop } from   "@rxweb/reactive-form-validators"   

export class User {

	
	@prop()
	@toDate() 
	dob: Date;
	
}
