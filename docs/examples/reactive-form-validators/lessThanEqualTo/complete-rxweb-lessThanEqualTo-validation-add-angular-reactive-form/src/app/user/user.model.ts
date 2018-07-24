import {  lessThanEqualTo, } from "@rxweb/reactive-form-validators"
export class User {

	@lessThanEqualTo() 
	totalMarks: number;

	@lessThanEqualTo({fieldName:'obtainedMarks'  ,conditionalExpression:x => x.totalMarks == 100 }) 
	obtainedMarks: number;

	@lessThanEqualTo({fieldName:'obtainedMarks'  ,message:'Please enter number less than 100.' }) 
	otherMarks: number;

}
