import {  url, } from   "@rxweb/reactive-form-validators"   

export class User {

	@url() 
	adminWebsiteUrl: string;
	
	
	

	//If you want to apply conditional expression of type 'function'
	@url({conditionalExpression:(x,y) => x.adminWebsiteUrl == "https://google.co.in"  }) 
	qaWebsiteUrl: string;
	
	
	

	//If you want to apply conditional expression of type 'string'
	@url({conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"'  }) 
	customerWebsiteUrl: string;
	
	
	

	@url({message:'{{0}} Is not the correct url pattern.' }) 
	maintenanceWebSiteUrl: string;
	
	
	

}
