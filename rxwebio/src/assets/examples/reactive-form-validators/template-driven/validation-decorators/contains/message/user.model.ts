import {  contains, } from "@rxweb/reactive-form-validators"

export class User {

	@contains({value:'@gmail.com'  ,message:'Please enter valid gmailId' }) 
	otherEmailAddress: string;

}
