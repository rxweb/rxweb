import {  alphaNumeric,prop,} from "@rxweb/reactive-form-validators"

export class Location {

	@alphaNumeric() 
	areaName: string;
	@alphaNumeric({conditionalExpressions:x => x.areaName =="Boston" }) 
	cityCode: string;
}
