import {  alpha,prop,} from "@rxweb/reactive-form-validators"

export class AddressInfo {

	@alpha() 
	countryName: string;
	@alpha({conditionalExpression:(x, y) => x.countryName == "Australia"  }) 
	countryCode: string;
	@alpha({allowWhiteSpace:true }) 
	stateName: string;
	@alpha({message:'You can enter only alphabets.' }) 
	stateCode: string;
}
