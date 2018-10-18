import {  longitude,prop, } from "@rxweb/reactive-form-validators"

export class Country {

	@prop()
	continent: string;

	@prop()
	secondCountryLongitude: string;

	@prop()
	thirdCountryLongitude: string;

	@prop()
	firstCountryLongitude: string;

}
