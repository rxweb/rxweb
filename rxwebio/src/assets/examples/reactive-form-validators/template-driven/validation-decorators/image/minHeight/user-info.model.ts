import {  image, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@image({minHeight:10  ,maxHeight:100  ,minWidth:10  ,maxWidth:10 }) 
	voterId: string;
	
	
}
