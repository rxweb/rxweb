import {  alphaNumeric,prop, } from "@rxweb/reactive-form-validators"

export class Location {

	@alphaNumeric({allowWhiteSpace:true }) 
	flatAddress: string;

}
