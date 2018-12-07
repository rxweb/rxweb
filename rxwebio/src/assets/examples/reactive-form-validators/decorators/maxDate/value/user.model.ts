import {  maxDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@maxDate({value:'07/30/2018' }) 
	allocationDate: Date;

}
