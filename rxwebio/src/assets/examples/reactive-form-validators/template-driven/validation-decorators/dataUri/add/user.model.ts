import {  dataUri, } from "@rxweb/reactive-form-validators"

export class User {

	@dataUri() 
	htmlDataUri: string;

}
