import {  digit,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@digit({message:'Please enter only digit.' }) 
	mobileNumber: number;
}
