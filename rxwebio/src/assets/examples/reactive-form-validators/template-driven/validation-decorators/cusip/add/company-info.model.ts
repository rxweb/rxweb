import {  cusip, } from   "@rxweb/reactive-form-validators"   
 
export class CompanyInfo {

	@cusip() 
	oracleCorporationCusipCode: string;

}
