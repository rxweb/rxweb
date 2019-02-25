import {  maxLength, } from   "@rxweb/reactive-form-validators"   

export class User {

	@maxLength({value:16 }) 
	firstName: string;
	
	
	

	//If you want to apply conditional expression of type 'function'
	@maxLength({value:16  ,conditionalExpression:(x,y)=> x.firstName == "Bharat" }) 
	middleName: string;
	
	
	

	//If you want to apply conditional expression of type 'string'
	@maxLength({value:16  ,conditionalExpression:'x => x.firstName == "Bharat"' }) 
	lastName: string;
	
	
	

	//Shows custom message
	@maxLength({value:10  ,message:'Maximum 10 characters are allowed' }) 
	userName: string;
	
	
	

}
