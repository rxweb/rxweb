import {  minDate, prop, } from   "@rxweb/reactive-form-validators"   
 
export class User {

	@prop()
	enrollmentDate: string;

	@minDate({fieldName:'enrollmentDate'  ,operator:'>' }) 
	confirmationDate: string;

}
