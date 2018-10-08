import {  minLength,prop,} from "@rxweb/reactive-form-validators"

export class Contact {

	@prop()
	countryName: string;
	@minLength({value:3  ,conditionalExpression:(x,y)=>{ return x.countryName == "India"} }) 
	countryCode: string;
}
