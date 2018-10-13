import {  even,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	type: string;

	@prop()
	number: number;

	@prop()
	evenNumber: number;

	@prop()
	multiplesOfEvenNumber: number;

}
