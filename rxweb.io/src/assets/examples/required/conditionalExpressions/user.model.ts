import {  required,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@required() 
	firstName: string;

	@required({conditionalExpressions:x => x.firstName == "John" }) 
	lastName: string;

}
