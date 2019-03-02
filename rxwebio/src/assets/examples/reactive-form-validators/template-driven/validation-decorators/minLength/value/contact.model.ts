import {  minLength, } from   "@rxweb/reactive-form-validators"   

export class Contact {

	@minLength({value:10 }) 
	mobileNo: string;
	
	
}
