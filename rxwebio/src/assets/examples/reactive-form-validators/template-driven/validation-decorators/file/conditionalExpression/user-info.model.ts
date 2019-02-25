import {  file,prop, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@prop()
	fileType: string;

	@file({minFiles:5  ,conditionalExpression:'x => x.fileType == "Picture"' }) 
	minimumFiles: string;
	
	
	

	@file({maxFiles:5  ,conditionalExpression:'(x,y) => x.fileType == "Document"' }) 
	maximumFile: string;
	
	
	

}
