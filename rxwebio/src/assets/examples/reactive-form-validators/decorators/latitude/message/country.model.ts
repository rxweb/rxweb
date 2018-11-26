import {  latitude,prop, } from "@rxweb/reactive-form-validators"

export class Country {

	@latitude({message:'{{0}} is not a latitude' }) 
	firstCountryLatitude: string;

}
