import {  email, } from   "@rxweb/reactive-form-validators"   

export class User {

	@email() 
	email: string;
	
	
	//If you want to apply conditional expression of type 'function'
	@email({conditionalExpression:(x,y) => x.email == "abc@gmail.com"  }) 
	recoveryEmailAddress: string;
	
	
	//If you want to apply conditional expression of type 'string'
	@email({conditionalExpression:'x => x.email =="abc@gmail.com"' }) 
	businessEmailAddress: string;
	
	
	@email({message:'Please enter valid email' }) 
	otherEmailAddress: string;
	
	
}
