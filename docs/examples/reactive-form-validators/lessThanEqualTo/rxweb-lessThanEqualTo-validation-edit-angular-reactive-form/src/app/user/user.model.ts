import {  lessThanEqualTo, } from "@rxweb/reactive-form-validators"
export class User {

	@lessThanEqualTo() 
	marks: number;

	@lessThanEqualTo({fieldName:'marks' }) 
	totalMarks: number;

}
