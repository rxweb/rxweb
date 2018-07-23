import {  url, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class User {

	@prop()
	adminWebsiteUrl: string;

	@prop()
	customerWebsiteUrl: string;

	@prop()
	maintenanceWebSiteUrl: string;

}
