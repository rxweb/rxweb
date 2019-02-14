import {  maxDate, } from   "@rxweb/reactive-form-validators"   
 
export class User {

	@maxDate({value:'04/16/2015'  ,operator:'<' }) 
	confirmationDate: string;

}
