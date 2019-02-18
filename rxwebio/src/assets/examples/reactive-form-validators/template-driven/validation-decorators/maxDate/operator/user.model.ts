import {  maxDate, } from   "@rxweb/reactive-form-validators"   
 
export class User {

	@maxDate({fieldName:'enrollmentDate'  ,operator:'<' }) 
	confirmationDate: string;

}
