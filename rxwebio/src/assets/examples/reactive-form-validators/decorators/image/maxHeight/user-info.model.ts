import {  image, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@image({maxHeight:100  ,maxWidth:100 }) 
	profilePhoto: string;

}
