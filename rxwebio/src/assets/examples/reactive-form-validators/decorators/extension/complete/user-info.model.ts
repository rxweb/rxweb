import {  extension,prop, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@prop()
	fileType: string;

	@extension({extensions:['jpg','bmp']  ,conditionalExpression:'x => x.fileType == "Picture"' }) 
	imageFile: string;

	@extension({extensions:['doc','docx']  ,conditionalExpression:'(x,y) => x.fileType == "Document"' }) 
	documentFile: string;

	@extension({extensions:['.vcf']  ,message:'You can upload only .vcf files.' }) 
	contactFile: string;

	@extension({extensions:['jpg','bmp'] }) 
	profilePicture: string;

}
