import {  alphaNumeric,prop, } from "@rxweb/reactive-form-validators"

export class Location {

	@alphaNumeric() 
	areaName: string;

	//If you want to apply conditional expression of type 'string'
	@alphaNumeric({conditionalExpression:x => x.areaName =="Boston" }) 
	cityCode: string;

	//If you want to apply conditional expression of type 'function'
	@alphaNumeric({conditionalExpression:(x,y) =>{ return  x.areaName == "Boston" } }) 
	countryCode: string;

}
