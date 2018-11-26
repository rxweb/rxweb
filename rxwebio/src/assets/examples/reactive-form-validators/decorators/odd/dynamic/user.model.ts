import {  odd,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	type: string;

	@prop()
	oddNumber: number;

	@prop()
	multiplesOfOddNumber: number;

}
