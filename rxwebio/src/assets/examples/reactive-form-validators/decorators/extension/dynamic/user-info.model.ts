import {  extension,prop, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@prop()
	fileType: string;

	@prop()
	imageFile: string;

	@prop()
	contactFile: string;

	@prop()
	profilePicture: string;

}
