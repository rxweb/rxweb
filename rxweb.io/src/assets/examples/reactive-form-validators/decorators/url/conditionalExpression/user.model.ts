import {  url,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@url() 
	adminWebsiteUrl: string;

	//If you want to apply conditional expression of type 'function'
	@url({conditionalExpression:(x,y) => x.adminWebsiteUrl == "https://google.co.in"  }) 
	qaWebsiteUrl: string;

}
