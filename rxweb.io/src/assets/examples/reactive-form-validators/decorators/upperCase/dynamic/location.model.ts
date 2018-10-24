import {  upperCase,prop, } from "@rxweb/reactive-form-validators"

export class Location {

	@prop()
	countryName: string;

	@prop()
	cityName: string;

	@prop()
	colonyName: string;

}
