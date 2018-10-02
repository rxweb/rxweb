import {  minLength,prop,} from "@rxweb/reactive-form-validators"

export class Contact {

	@minLength({value:8 }) 
	countryName: string;
}
