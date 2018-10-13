import {  alpha,prop, } from "@rxweb/reactive-form-validators"

export class AddressInfo {

	@alpha() 
	countryName: string;

	//If you want to apply conditional expression of type 'string'
	@alpha({conditionalExpression:'x => x.countryName =="Australia"' }) 
	cityName: string;

	//If you want to apply conditional expression of type 'function'
	@alpha({conditionalExpression:(x,y) => x.countryName == "Australia" }) 
	countryCode: string;

}
