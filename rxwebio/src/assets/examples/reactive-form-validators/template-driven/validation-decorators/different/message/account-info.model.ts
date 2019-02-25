import {  different, } from   "@rxweb/reactive-form-validators"   

export class AccountInfo {

	@different({fieldName:'firstName'  ,message:'{{0}} is same as firstName' }) 
	middleName: string;
	
	
	

}
