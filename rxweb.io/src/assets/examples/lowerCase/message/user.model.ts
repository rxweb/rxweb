import {  lowerCase,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@lowerCase({message:'You can enter only lowerCase letters.' }) 
	lastName: string;

}
