import {  minLength, } from "@rxweb/reactive-form-validators"
export class Contact {

	@minLength() 
	countryName: string;

}
