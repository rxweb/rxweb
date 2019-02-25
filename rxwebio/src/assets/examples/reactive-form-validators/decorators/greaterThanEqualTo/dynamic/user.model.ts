import {  greaterThanEqualTo,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	admissionAge: number;

	@prop()
	retiermentAge: number;

	@prop()
	memberAge: number;

	@prop()
	otherAge: number;

}
