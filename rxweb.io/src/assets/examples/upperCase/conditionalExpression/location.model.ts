import {  upperCase,prop,} from "@rxweb/reactive-form-validators"

export class Location {

	@upperCase() 
	countryName: string;
	@upperCase({conditionalExpression:x => x.countryName == "INDIA" }) 
	stateName: string;
}
