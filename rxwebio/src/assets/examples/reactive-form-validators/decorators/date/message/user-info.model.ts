import {  date, } from   "@rxweb/reactive-form-validators"   
 
export class UserInfo {

	@date({message:'{{0}} is not a valid date' }) 
	allocationDate: string;

}
