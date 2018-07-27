import {prop} from '@rxweb/reactive-form-validators'
export class Location {

	@prop()
	countryName: string;

	@prop()
	stateName: string;

	@prop()
	cityName: string;

}
