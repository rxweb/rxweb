import {  date,prop, } from   "@rxweb/reactive-form-validators"   
 
export class UserInfo {

	@prop()
	birthDate: string;

	@prop()
	enrollmentDate: string;

	@prop()
	allocationDate: string;

}
