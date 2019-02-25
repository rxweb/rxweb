import {  image, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@image({minHeight:10  ,maxHeight:100  ,maxWidth:100 }) 
	identityCard: string;
	
	
}
