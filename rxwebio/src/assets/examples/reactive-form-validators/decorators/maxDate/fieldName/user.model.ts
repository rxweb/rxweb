import {  maxDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	enrollmentDate: string;

	@maxDate({fieldName:'enrollmentDate' }) 
	lastRegistrationDate: string;

}
