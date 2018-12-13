import {  maxDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	enrollmentDate: Date;

	@maxDate({fieldName:'enrollmentDate' }) 
	lastRegistrationDate: Date;

}
