import {  maxDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@maxDate({value:new Date(2018,7,30) }) 
	allocationDate: Date;

}
