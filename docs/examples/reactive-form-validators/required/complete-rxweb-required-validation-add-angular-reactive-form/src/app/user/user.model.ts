import {  required, } from "@rxweb/reactive-form-validators"
export class User {

	@required() 
	firstName: string;

	@required({conditionalExpressions:x => x.FirstName == "John" }) 
	lastName: string;

	@required({message:'Username cannot be blank.' }) 
	userName: string;

}
