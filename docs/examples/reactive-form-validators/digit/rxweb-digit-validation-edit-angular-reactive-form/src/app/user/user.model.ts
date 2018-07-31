import {  digit, } from "@rxweb/reactive-form-validators"
export class User {

	@digit() 
	age: number;

}
