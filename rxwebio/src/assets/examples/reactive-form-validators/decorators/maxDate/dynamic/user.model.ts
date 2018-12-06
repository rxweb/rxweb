import {  maxDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	userName: string;

	@prop()
	admissionDate: Date;

	@prop()
	registrationDate: Date;

	@prop()
	enrollmentDate: Date;

	@prop()
	lastRegistrationDate: Date;

}
