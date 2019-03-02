import {  pattern,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	userName: string;

	@prop()
	zipCode: string;

	@prop()
	age: string;

}
