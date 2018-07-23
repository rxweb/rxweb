import {  lessThan, } from "@rxweb/reactive-form-validators"
export class User {

	@lessThan() 
	obtainedMarks: number;

	@lessThan({'fieldName':'obtainedMarks'  ,conditionalExpressions:x => x.obtainedMarks < 35  }) 
	passingMarks: number;

	@lessThan({fieldName:'obtainedMarks'  ,message:'Please enter number greater than 100.' }) 
	otherMarks: number;

}
