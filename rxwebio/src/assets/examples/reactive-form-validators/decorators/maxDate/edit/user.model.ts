import {  maxDate, } from   "@rxweb/reactive-form-validators"   

export class User {

	@maxDate({value:'07/30/2018' }) 
	registrationDate: string;
	
	
}
