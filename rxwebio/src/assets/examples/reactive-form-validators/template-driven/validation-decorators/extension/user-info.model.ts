import {  extension, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@extension({extensions:['jpg','bmp'] }) 
	profilePicture: string;
	
	
	

}
