import {  minDate, } from "@rxweb/reactive-form-validators"

export class User {

	@minDate({value:'07/30/2018' }) 
	registrationDate: string;

}
