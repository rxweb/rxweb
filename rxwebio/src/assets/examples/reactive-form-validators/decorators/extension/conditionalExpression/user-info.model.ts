import {  extension,prop, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@prop()
	fileType: string;

	@extension({extensions:['jpg','bmp']  ,conditionalExpression:'x => x.fileType == "Picture"' }) 
	imageFile: string;
	
	
	@extension({extensions:['doc','docx']  ,conditionalExpression:'(x,y) => x.fileType == "Document"' }) 
	documentFile: string;
	
	
}
