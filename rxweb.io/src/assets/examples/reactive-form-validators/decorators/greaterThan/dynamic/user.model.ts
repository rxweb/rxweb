import {  greaterThan,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	age: number;

	@prop()
	memberAge: number;

	@prop()
	voterAge: number;

	@prop()
	otherAge: number;

}
