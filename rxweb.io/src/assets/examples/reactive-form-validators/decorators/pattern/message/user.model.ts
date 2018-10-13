import {  pattern,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@pattern({pattern:{'zipCode':RegExp('/^\d{5}(?:[-\s]\d{4})?$/') }  ,message:'Zipcode must be 5 digits' }) 
	zipCode: string;

}
