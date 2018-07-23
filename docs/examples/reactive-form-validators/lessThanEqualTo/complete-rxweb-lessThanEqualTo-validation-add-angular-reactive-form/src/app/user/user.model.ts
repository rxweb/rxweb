import {  lessThanEqualTo, } from "@rxweb/reactive-form-validators"
export class User {

	@lessThanEqualTo() 
	obtainedMarks: number;

	@lessThanEqualTo({fieldName:obtainedMarks  ,conditionalExpressions:x => x.obtainedMarks <= 100  }) 
	totalMarks: number;

	@lessThanEqualTo({fieldName:obtainedMarks  ,message:'Please enter number less than 100.' }) 
	otherMarks: number;

}
