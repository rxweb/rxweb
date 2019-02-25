import {  lowerCase, } from   "@rxweb/reactive-form-validators"   

export class User {

	//Shows custom message
	@lowerCase({message:'You can enter only lowerCase letters.' }) 
	lastName: string;
	
	
	

}
