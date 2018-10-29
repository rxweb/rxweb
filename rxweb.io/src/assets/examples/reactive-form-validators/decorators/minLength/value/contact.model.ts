import {  minLength,prop, } from "@rxweb/reactive-form-validators"

export class Contact {

	//If you want to apply conditional expression of type 'function'
	@minLength({value:3  ,conditionalExpression:(x,y)=> x.countryName == "India" }) 
	countryCode: string;

}
