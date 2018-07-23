import {  greaterThanEqualTo, } from "@rxweb/reactive-form-validators"
export class User {

	@greaterThanEqualTo() 
	age: number;

}
