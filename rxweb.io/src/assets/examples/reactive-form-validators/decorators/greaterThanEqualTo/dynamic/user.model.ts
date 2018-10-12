import {  greaterThanEqualTo,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	age: number;

	@prop()
	voterAge: number;

	@prop()
	memberAge: number;

	@prop()
	otherAge: number;

}
