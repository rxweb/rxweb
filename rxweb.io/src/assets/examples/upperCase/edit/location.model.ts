import {  upperCase,prop,} from "@rxweb/reactive-form-validators"

export class Location {

	@upperCase() 
	countryName: string;

}
