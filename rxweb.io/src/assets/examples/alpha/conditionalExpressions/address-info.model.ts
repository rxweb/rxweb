import {  alpha,prop,} from "@rxweb/reactive-form-validators"

export class AddressInfo {

	@alpha() 
	countryName: string;

	@alpha({conditionalExpressions:(x, y) => x.countryName == "Australia"  }) 
	countryCode: string;

}
