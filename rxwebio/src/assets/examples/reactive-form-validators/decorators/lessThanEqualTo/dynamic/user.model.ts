import {  lessThanEqualTo,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	totalMarks: number;

	@prop()
	passingMarks: number;

	@prop()
	practicalExamMarks: number;

	@prop()
	otherMarks: number;

}
