import {  maxLength, } from "@rxweb/reactive-form-validators"
export class Location {

	@maxLength() 
	firstName: string;

}
