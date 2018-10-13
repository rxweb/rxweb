import {  leapYear,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	name: string;

	@prop()
	birthYear: number;

	@prop()
	admissionYear: Date;

	@prop()
	joiningYear: number;

}
