import {  minLength,prop,} from "@rxweb/reactive-form-validators"

export class Contact {

	@prop()
	countryName: string;
	@minLength({value:10 }) 
	mobileNo: string;
	@minLength({value:8  ,message:'Minimum 8 characters are allowed' }) 
	landLineNo: string;
	@minLength({value:3  ,conditionalExpressions:(x,y)=>{ return x.countryName == "India"} }) 
	countryCode: string;
}
