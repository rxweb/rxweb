import {  even,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@even() 
	evenNumber: number;

}
