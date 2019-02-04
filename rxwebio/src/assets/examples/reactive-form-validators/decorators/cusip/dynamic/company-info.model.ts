import {  cusip,prop, } from   "@rxweb/reactive-form-validators"   
 
export class CompanyInfo {

	@prop()
	companyName: string;

	@prop()
	oracleCorporationCusipCode: string;

	@prop()
	microsoftCorporationCusipCode: string;

	@prop()
	appleIncCusipCode: string;

}
