import {  pattern, } from "@rxweb/reactive-form-validators"

export class User {

	@pattern({expression:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')} }) 
	userName: string;

}
