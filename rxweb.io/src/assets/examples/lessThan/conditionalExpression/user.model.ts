import {  lessThan,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	obtainedMarks: number;

	//If you want to apply conditional expression of type 'string'
	@lessThan({fieldName:'obtainedMarks'  ,conditionalExpression:x => x.obtainedMarks < 35  }) 
	passingMarks: number;

	//If you want to apply conditional expression of type 'function'
	@lessThan({fieldName:'obtainedMarks'  ,conditionalExpression:(x,y) =>{ return  x.obtainedMarks < 35} }) 
	practicalExamMarks: number;

}
