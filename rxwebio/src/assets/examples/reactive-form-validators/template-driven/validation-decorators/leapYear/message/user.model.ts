import {  leapYear, } from   "@rxweb/reactive-form-validators"   

export class User {

	@leapYear({message:'{{0}} is not a leap year' }) 
	joiningYear: number;
	
	
}
