import {  minLength, } from "@rxweb/reactive-form-validators"
export class Contact {

	@minLength() 
	countryName: string;

	@minLength({value:10  ,message:'Only 10 characters are allowed' }) 
	mobileNo: string;

	@minLength({value:8  ,message:'Only 8 characters are allowed' }) 
	landLineNo: string;

	@minLength({value:3  ,conditionalExpressions:(x,y)=>{ return x.countryName == "India"} }) 
	countryCode: string;

}
