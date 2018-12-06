import {  maxDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	userName: string;

	@prop()
	enrollmentDate: Date;

	@maxDate({fieldName:'enrollmentDate' }) 
	lastRegistrationDate: Date;

}
