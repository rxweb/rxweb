import {  dataUri, } from "@rxweb/reactive-form-validators"

export class User {

	@dataUri({message:'{{0}} is not a proper data URI' }) 
	htmlDataUri: string;

}
