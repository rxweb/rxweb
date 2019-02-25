import {  url, } from   "@rxweb/reactive-form-validators"   

export class User {

	@url({message:'{{0}} Is not the correct url pattern.' }) 
	maintenanceWebSiteUrl: string;
	
	
	

}
