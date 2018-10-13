import {  minDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@minDate({value:new Date(2018,7,30)  ,message:'{{0}} exceeds the Minimum Date Limit' }) 
	registrationDate: Date;

}
