import {  fileSize,prop, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@prop()
	fileType: string;

	@fileSize({maxSize:100 }) 
	videoFile: string;
	
	
	@fileSize({minSize:3  ,maxSize:100 }) 
	audioFile: string;
	
	
	@fileSize({maxSize:50  ,conditionalExpression:'x => x.fileType == "Picture"' }) 
	imageFile: string;
	
	
	@fileSize({maxSize:10  ,conditionalExpression:'(x,y) => x.fileType == "Document"' }) 
	documentFile: string;
	
	
	@fileSize({maxSize:10  ,message:'File exceed maximum size.' }) 
	contactFile: string;
	
	
	@fileSize({maxSize:50 }) 
	profilePicture: string;
	
	
}
