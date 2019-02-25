import {  fileSize, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@fileSize({maxSize:10 }) 
	profilePicture: string;
	
	
	

}
