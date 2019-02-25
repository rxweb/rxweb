import {  leapYear, } from   "@rxweb/reactive-form-validators"   

export class User {

	@leapYear() 
	birthYear: number;
	
	
	

}
