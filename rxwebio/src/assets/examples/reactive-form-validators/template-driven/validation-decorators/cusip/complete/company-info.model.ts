import {  cusip,prop, } from   "@rxweb/reactive-form-validators"   
 
export class CompanyInfo {

	@prop()
	companyName: string;

	@cusip() 
	oracleCorporationCusipCode: string;

	//If you want to apply conditional expression of type 'function'
	@cusip({conditionalExpression:(x,y) => x.companyName == "Google"  }) 
	googleIncCusipCode: string;

	//If you want to apply conditional expression of type 'string'
	@cusip({conditionalExpression:'x => x.companyName =="Microsoft"' }) 
	microsoftCorporationCusipCode: string;

	@cusip({message:'{{0}} is not a valid cusip Code' }) 
	appleIncCusipCode: string;

}
