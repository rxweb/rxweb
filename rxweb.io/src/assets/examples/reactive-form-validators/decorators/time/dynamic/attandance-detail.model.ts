import {  time,prop, } from "@rxweb/reactive-form-validators"

export class AttandanceDetail {

	@prop()
	entryPlace: string;

	@prop()
	totalIn: string;

	@prop()
	entryTime: string;

	@prop()
	totalOutTime: string;

	@prop()
	exitTime: string;

}
