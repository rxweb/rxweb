import {  upperCase, } from "@rxweb/reactive-form-validators"

export class Location {

	@upperCase() 
	countryName: string;

}
