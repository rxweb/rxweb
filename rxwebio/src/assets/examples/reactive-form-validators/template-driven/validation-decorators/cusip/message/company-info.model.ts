import {  cusip, } from   "@rxweb/reactive-form-validators"   

export class CompanyInfo {

	@cusip({message:'{{0}} is not a valid cusip Code' }) 
	appleIncCusipCode: string;
	
	
}
