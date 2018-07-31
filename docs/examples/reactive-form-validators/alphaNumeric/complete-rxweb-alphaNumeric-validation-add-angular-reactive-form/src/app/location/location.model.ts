import {  alphaNumeric, } from "@rxweb/reactive-form-validators"
export class Location {

	@alphaNumeric() 
	areaName: string;

	@alphaNumeric({allowWhiteSpace:true }) 
	flatAddress: string;

	@alphaNumeric({allowWhiteSpace:true  ,message:'Please enter only alphanumerics, special characters are not allowed and whitespace is allowed.' }) 
	postalAddress: string;

	@alphaNumeric({conditionalExpressions:x => x.areaName =="Boston" }) 
	cityCode: string;

}
