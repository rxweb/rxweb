import {  file, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@file({minFiles:5 }) 
	totalDocumentFiles: number;

}
