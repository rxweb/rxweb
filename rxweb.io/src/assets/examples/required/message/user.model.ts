import {  required,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@required({message:'Username cannot be blank.' }) 
	userName: string;

}
