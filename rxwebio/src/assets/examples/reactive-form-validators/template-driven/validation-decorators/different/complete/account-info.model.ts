import {  different,prop, } from   "@rxweb/reactive-form-validators"   

export class AccountInfo {

	@prop()
	firstName: string;

	@different({fieldName:'firstName' }) 
	lastName: string;
	
	
	@different({fieldName:'firstName'  ,message:'{{0}} is same as firstName' }) 
	middleName: string;
	
	
}
