import {  port,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	browser: string;

	//If you want to apply conditional expression of type 'function'
	@port({conditionalExpression:(x,y) => x.browser == "Chrome"  }) 
	entertainmentWebsitePort: string;

	//If you want to apply conditional expression of type 'string'
	@port({conditionalExpression:'x => x.browser =="Chrome"' }) 
	shoppingWebsitePort: string;

	@port({message:'{{0}} is not a proper port number' }) 
	educationalWebsitePort: string;

}
