import {  maxLength, } from   "@rxweb/reactive-form-validators"   

export class Location {

	@maxLength({value:10 }) 
	firstName: string;
	
	
	

}
