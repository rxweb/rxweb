import {  alphaNumeric,prop, } from "@rxweb/reactive-form-validators"

export class Location {

	@alphaNumeric({message:'Please enter only alphanumerics, special characters are not allowed.' }) 
	postalAddress: string;

}
