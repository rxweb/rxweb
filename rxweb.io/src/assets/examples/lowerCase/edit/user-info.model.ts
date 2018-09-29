import {  lowerCase,prop,} from "@rxweb/reactive-form-validators"

export class UserInfo {

	@lowerCase() 
	username: string;

}
