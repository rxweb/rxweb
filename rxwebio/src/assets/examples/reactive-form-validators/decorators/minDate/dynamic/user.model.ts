import {  minDate,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	userName: string;

	@prop()
	allocationDate: string;

	@prop()
	admissionDate: string;

	@prop()
	registrationDate: string;

	@prop()
	enrollmentDate: string;

	@prop()
	lastRegistrationDate: string;

}
