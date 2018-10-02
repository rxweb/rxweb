import {  url,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@url({message:'Is not the correct url pattern.' }) 
	maintenanceWebSiteUrl: string;
}
