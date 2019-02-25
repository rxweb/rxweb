import {  compare, } from   "@rxweb/reactive-form-validators"   

export class User {

	//Shows custom message
	@compare({fieldName:'password'  ,message:'You must enter same password' }) 
	confirmPassword: string;
	
	
	

}
