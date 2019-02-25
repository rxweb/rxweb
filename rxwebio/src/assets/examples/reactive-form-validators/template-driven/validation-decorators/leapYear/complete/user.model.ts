import {  leapYear,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	name: string;

	//If you want to apply conditional expression of type 'function'
	@leapYear({conditionalExpression:(x,y) => x.name == "Bharat"  }) 
	birthYear: number;
	
	
	//If you want to apply conditional expression of type 'string'
	@leapYear({conditionalExpression:'x => x.name == "Bharat"' }) 
	admissionYear: number;
	
	
	@leapYear({message:'{{0}} is not a leap year' }) 
	joiningYear: number;
	
	
}
