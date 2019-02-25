import {  fileSize, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@fileSize({maxSize:10  ,message:'File exceed maximum size.' }) 
	contactFile: string;
	
	
	

}
