import {  port,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@port({message:'{{0}} is not a proper port number' }) 
	educationalWebsitePort: string;

}
