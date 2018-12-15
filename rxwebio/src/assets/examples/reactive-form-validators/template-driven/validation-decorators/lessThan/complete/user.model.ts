import {  lessThan,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	obtainedMarks: number;

	@lessThan({fieldName:'obtainedMarks' }) 
	otherActivityMarks: number;

	//If you want to apply conditional expression of type 'function'
	@lessThan({fieldName:'obtainedMarks'  ,conditionalExpression:(x,y) =>  x.obtainedMarks < 35 }) 
	practicalExamMarks: number;

	//If you want to apply conditional expression of type 'string'
	@lessThan({fieldName:'obtainedMarks'  ,conditionalExpression:'x => x.obtainedMarks < 35' }) 
	passingMarks: number;

	@lessThan({fieldName:'obtainedMarks'  ,message:'Please enter number greater than 100.' }) 
	otherMarks: number;

}
