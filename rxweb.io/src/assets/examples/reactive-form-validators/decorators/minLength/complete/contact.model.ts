import {  minLength,prop, } from "@rxweb/reactive-form-validators"

export class Contact {

	@prop()
	countryName: string;

	@minLength({value:10 }) 
	mobileNo: string;

	@minLength({value:8  ,message:'Minimum 8 characters are allowed' }) 
	landLineNo: string;

	//If you want to apply conditional expression of type 'function'
	@minLength({value:3  ,conditionalExpression:(x,y)=> x.countryName == "India" }) 
	countryCode: string;

	//If you want to apply conditional expression of type 'string'
	@minLength({value:3  ,conditionalExpression:'x => x.countryName == "India"' }) 
	stateCode: string;

}
