import {  file,prop, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@prop()
	fileType: string;

	@file({maxFiles:5 }) 
	totalImageFiles: number;
	
	
	

	@file({minFiles:5 }) 
	totalDocumentFiles: number;
	
	
	

	@file({minFiles:5  ,conditionalExpression:'x => x.fileType == "Picture"' }) 
	minimumFiles: string;
	
	
	

	@file({maxFiles:5  ,conditionalExpression:'(x,y) => x.fileType == "Document"' }) 
	maximumFile: string;
	
	
	

	@file({minFiles:5  ,maxFiles:10  ,message:'You can upload minimum 5 and maximum 10 files.' }) 
	minMaxFiles: string;
	
	
	

}
