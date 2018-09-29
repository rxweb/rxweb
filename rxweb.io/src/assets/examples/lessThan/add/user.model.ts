import {  lessThan,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	marks: number;

	@lessThan({fieldName:'marks' }) 
	passingMarks: number;

}
