import {  minDate, } from   "@rxweb/reactive-form-validators"   
 
export class User {

	@minDate({fieldName:'enrollmentDate'  ,operator:'>' }) 
	confirmationDate: string;

}
