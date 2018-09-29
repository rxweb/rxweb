import {  required,prop,} from "@rxweb/reactive-form-validators"

export class UserInfo {

	@required() 
	firstName: string;

}
