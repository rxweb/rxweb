import {  upperCase, } from "@rxweb/reactive-form-validators"
export class Location {

	@upperCase() 
	countryName: string;

	@upperCase({conditionalExpressions:x => x.countryName == 'INDIA' }) 
	stateName: string;

	@upperCase({message:'You can enter only upperCase letters.' }) 
	cityName: string;

}
