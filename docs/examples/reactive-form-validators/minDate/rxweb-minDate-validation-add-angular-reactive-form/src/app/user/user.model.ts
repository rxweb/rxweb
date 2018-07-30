import {  minDate, } from "@rxweb/reactive-form-validators"
export class user {

	@minDate({value:2018,07,30 }) 
	registrationDate: Date;

}
