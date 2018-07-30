import {  minDate, } from "@rxweb/reactive-form-validators"
export class user {

	@minDate({value:new Date(2018,7,30) }) 
	registrationDate: Date;

}
