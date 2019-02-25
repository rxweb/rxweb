import {  pattern, } from   "@rxweb/reactive-form-validators"   

export class User {

	@pattern({expression:{'onlyAlpha': /^[A-Za-z]+$/} }) 
	userName: string;
	
	
	

	//If you want to apply conditional expression of type 'string'
	@pattern({expression:{'onlyDigit': /^[0-9]*$/}  ,conditionalExpression:'x => x.userName=="Bharat"' }) 
	age: string;
	
	
	

	//If you want to apply conditional expression of type 'function'
	@pattern({expression:{'onlyDigit': /^[0-9]*$/}  ,conditionalExpression:(x,y) => x.userName == "Bharat"  }) 
	contactNumber: number;
	
	
	

}
