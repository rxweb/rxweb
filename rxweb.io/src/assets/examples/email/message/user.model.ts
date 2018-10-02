import {  email,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@email({message:'Please enter valid email' }) 
	otherEmailAddress: string;
}
