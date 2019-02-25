import {  date, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@date() 
	birthDate: string;
	
	
	//If you want to apply conditional expression of type 'string'
	@date({conditionalExpression:'x => x.birthDate =="16/04/1997"' }) 
	enrollmentDate: string;
	
	
	//If you want to apply conditional expression of type 'function'
	@date({conditionalExpression:(x,y) => x.birthDate == "16/04/1997"  }) 
	admissionDate: string;
	
	
}
