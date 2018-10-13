import {  url,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	adminWebsiteUrl: string;

	@prop()
	qaWebsiteUrl: string;

	@prop()
	customerWebsiteUrl: string;

	@prop()
	maintenanceWebSiteUrl: string;

}
