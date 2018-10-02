import {  alphaNumeric,prop,} from "@rxweb/reactive-form-validators"

export class Location {

	@alphaNumeric({allowWhiteSpace:true  ,message:'Please enter only alphanumerics, special characters are not allowed and whitespace is allowed.' }) 
	postalAddress: string;
}
