import {  endsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	name: string;

	@prop()
	taskId: string;

	@prop()
	company: string;

}
