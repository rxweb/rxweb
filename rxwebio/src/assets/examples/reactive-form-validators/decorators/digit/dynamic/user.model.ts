import {  digit,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	age: number;

	@prop()
	faxNumber: number;

	@prop()
	mobileNumber: number;

}
