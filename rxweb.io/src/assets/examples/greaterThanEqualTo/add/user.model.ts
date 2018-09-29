import {  greaterThanEqualTo,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	age: number;

	@greaterThanEqualTo({fieldName:'age' }) 
	voterAge: number;

}
