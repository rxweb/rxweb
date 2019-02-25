import {  alphaNumeric, } from   "@rxweb/reactive-form-validators"   

export class Location {

	//Shows custom message
	@alphaNumeric({message:'Please enter only alphanumerics, special characters are not allowed.' }) 
	postalAddress: string;
	
	
	

}
