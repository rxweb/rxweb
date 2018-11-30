import {  pattern, } from "@rxweb/reactive-form-validators"
export class User {

	@pattern({pattern:{'onlyAlpha': /^[A-Za-z]+$/} }) 
	userName: string;

}
