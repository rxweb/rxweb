import {  image, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@image({maxHeight:100  ,maxWidth:100  ,message:'File exceed maximum Height.' }) 
	residenceProof: string;
	
	
	

}
