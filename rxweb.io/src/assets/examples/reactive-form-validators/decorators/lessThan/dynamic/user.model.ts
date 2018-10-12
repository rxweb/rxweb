import {  lessThan,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	obtainedMarks: number;

	@prop()
	practicalExamMarks: number;

	@prop()
	passingMarks: number;

	@prop()
	otherMarks: number;

}
