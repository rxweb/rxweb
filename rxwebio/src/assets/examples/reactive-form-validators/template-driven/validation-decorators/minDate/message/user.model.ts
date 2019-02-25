import {  minDate, } from   "@rxweb/reactive-form-validators"   

export class User {

	@minDate({value:'07/30/2018'  ,message:'{{0}} exceeds the Minimum Date Limit' }) 
	registrationDate: string;
	
	
	

}
