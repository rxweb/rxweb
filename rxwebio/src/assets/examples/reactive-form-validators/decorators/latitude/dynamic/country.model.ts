import {  latitude,prop, } from   "@rxweb/reactive-form-validators"   

export class Country {

	@prop()
	continent: string;

	@prop()
	thirdCountryLatitude: string;

	@prop()
	firstCountryLatitude: string;

}
