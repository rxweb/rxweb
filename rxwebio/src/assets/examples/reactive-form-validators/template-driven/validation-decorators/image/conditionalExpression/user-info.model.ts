import {  image, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@image({maxHeight:50  ,maxWidth:100  ,conditionalExpression:'x => x.ImageType == "IdentityCard"' }) 
	aadharCard: string;
	
	
	

	@image({maxHeight:100  ,maxWidth:200  ,conditionalExpression:'(x,y) => x.ImageType == "IdentityCard"' }) 
	panCard: string;
	
	
	

}
