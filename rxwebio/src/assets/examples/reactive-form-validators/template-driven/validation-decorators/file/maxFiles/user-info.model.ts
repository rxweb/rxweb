import {  file, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@file({maxFiles:5 }) 
	totalImageFiles: number;

}
