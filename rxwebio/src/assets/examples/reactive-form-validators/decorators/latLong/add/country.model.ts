import {  latLong,prop, } from "@rxweb/reactive-form-validators"

export class Country {

	@latLong() 
	firstCountry: string;

}
