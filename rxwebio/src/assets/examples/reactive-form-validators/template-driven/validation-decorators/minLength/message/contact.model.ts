import {  minLength, } from   "@rxweb/reactive-form-validators"   

export class Contact {

	@minLength({value:8  ,message:'Minimum 8 characters are allowed' }) 
	landLineNo: string;
	
	
	

}
