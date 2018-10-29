import {  contains,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@contains({value:'@gmail.com' }) 
	emailAddress: string;

	//If you want to apply conditional expression of type 'function'
	@contains({value:'@gmail.com'  ,conditionalExpression:(x,y) => x.emailAddress == "abc@gmail.com" }) 
	businessEmailAddress: string;

	//If you want to apply conditional expression of type 'string'
	@contains({value:'@gmail.com'  ,conditionalExpression:'x => x.emailAddress == "abc@gmail.com"' }) 
	recoveryEmailAddress: string;

	@contains({value:'@gmail.com'  ,message:'Please enter valid gmailId' }) 
	otherEmailAddress: string;

}
