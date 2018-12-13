import {  fileSize, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@fileSize({minSize:3  ,maxSize:100 }) 
	audioFile: string;

}
