import {  maxLength, } from   "@rxweb/reactive-form-validators"   

export class User {

	@maxLength({value:16 }) 
	firstName: string;
	
	
}
