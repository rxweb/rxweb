import {  minDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	userName: string;

	@prop()
	enrollmentDate: Date;

	@minDate({fieldName:'enrollmentDate' }) 
	lastRegistrationDate: Date;

}
