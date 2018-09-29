import {  pattern,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@pattern({pattern:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')} }) 
	userName: string;

}
