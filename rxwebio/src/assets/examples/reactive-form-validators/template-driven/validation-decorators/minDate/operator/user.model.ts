import {  minDate, } from   "@rxweb/reactive-form-validators"   
 
export class User {

	@minDate({value:'04/16/1997'  ,operator:'>' }) 
	confirmationDate: string;

}
