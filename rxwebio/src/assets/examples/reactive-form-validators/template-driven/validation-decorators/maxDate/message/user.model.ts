import {  maxDate, } from "@rxweb/reactive-form-validators"

export class User {

	@maxDate({value:'07/30/2018'  ,message:'{{0}} exceeds the Maximum Date Limit' }) 
	registrationDate: string;

}
