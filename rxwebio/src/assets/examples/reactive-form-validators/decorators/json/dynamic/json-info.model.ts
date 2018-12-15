import {  json,prop, } from "@rxweb/reactive-form-validators"

export class JsonInfo {

	@prop()
	location: string;

	@prop()
	locationJson: string;

	@prop()
	contactJson: string;

}
