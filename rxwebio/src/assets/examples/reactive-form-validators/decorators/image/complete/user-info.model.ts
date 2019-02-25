import {  image,prop, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@prop()
	imageType: string;

	@image({maxHeight:100  ,maxWidth:100 }) 
	profilePhoto: string;
	
	
	

	@image({maxHeight:100  ,maxWidth:100 }) 
	signature: string;
	
	
	

	@image({minHeight:10  ,maxHeight:100  ,maxWidth:100 }) 
	identityCard: string;
	
	
	

	@image({maxHeight:100  ,maxWidth:100 }) 
	drivinglicense: string;
	
	
	

	@image({maxHeight:50  ,maxWidth:100  ,conditionalExpression:'x => x.ImageType == "IdentityCard"' }) 
	aadharCard: string;
	
	
	

	@image({maxHeight:100  ,maxWidth:200  ,conditionalExpression:'(x,y) => x.ImageType == "IdentityCard"' }) 
	panCard: string;
	
	
	

	@image({maxHeight:100  ,maxWidth:100  ,message:'File exceed maximum Height.' }) 
	residenceProof: string;
	
	
	

}
