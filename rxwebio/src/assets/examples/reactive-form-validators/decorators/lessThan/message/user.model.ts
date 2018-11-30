import {  lessThan,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	obtainedMarks: number;

	@lessThan({fieldName:'obtainedMarks'  ,message:'Please enter number greater than 100.' }) 
	otherMarks: number;

}
