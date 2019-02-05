import {  date, } from   "@rxweb/reactive-form-validators"   
 
export class UserInfo {

	@date() 
	birthDate: string;

}
