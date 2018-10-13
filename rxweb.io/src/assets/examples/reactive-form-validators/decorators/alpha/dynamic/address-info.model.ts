import {  alpha,prop, } from "@rxweb/reactive-form-validators"

export class AddressInfo {

	@prop()
	countryName: string;

	@prop()
	countryCode: string;

	@prop()
	cityName: string;

	@prop()
	stateName: string;

	@prop()
	stateCode: string;

}
