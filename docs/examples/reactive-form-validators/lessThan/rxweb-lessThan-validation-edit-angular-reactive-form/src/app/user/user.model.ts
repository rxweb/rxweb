import {  lessThan, } from "@rxweb/reactive-form-validators"
export class User {

	@lessThan() 
	marks: number;

}
