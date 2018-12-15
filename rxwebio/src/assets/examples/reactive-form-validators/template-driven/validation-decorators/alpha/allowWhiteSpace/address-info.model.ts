import {  alpha, } from "@rxweb/reactive-form-validators"

export class AddressInfo {

	@alpha({allowWhiteSpace:true }) 
	stateName: string;

}
