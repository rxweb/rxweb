import {  prop, } from "@rxweb/reactive-form-validators"
export class User {

	@prop({name:'email_Address'})
	emailAddress: string;

}
