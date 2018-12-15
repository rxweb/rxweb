import {  file,prop, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@prop()
	fileType: string;

	@prop()
	totalImageFiles: number;

	@prop()
	totalDocumentFiles: number;

	@prop()
	minimumFiles: string;

	@prop()
	minMaxFiles: string;

}
