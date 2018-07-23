import {  alphaNumeric, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class Location {

	@prop()
	areaName: string;

	@prop()
	flatAddress: string;

	@prop()
	postalAddress: string;

	@prop()
	cityCode: string;

}
