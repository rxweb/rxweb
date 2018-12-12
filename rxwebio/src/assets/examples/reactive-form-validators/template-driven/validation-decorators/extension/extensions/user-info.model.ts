import {  extension, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@extension({extensions:['jpg','bmp']  ,conditionalExpression:'x => x.fileType == "Picture"' }) 
	imageFile: string;

	@extension({extensions:['doc','docx']  ,conditionalExpression:'(x,y) => x.fileType == "Document"' }) 
	documentFile: string;

}
