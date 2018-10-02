import {  minLength,prop,} from "@rxweb/reactive-form-validators"

export class Contact {

	@prop()
	countryName: string;
	@minLength({value:3  ,conditionalExpressions:(x,y)=>{ return x.countryName == "India"} }) 
	countryCode: string;
}
