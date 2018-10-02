import {  upperCase,prop,} from "@rxweb/reactive-form-validators"

export class Location {

	@upperCase({message:'You can enter only upperCase letters.' }) 
	cityName: string;
}
