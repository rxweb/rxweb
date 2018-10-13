import {  odd,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@odd() 
	oddNumber: number;

}
