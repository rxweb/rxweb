import {  url,prop,} from "@rxweb/reactive-form-validators"

export class WebSiteInfoModel {

	@url() 
	adminWebsiteUrl: string;
}
