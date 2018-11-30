import {  maxNumber,prop, } from "@rxweb/reactive-form-validators"

export class SubjectDetails {

	@prop()
	subjectCode: string;

	@prop()
	obtainedMarks: number;

	@prop()
	passingMarks: number;

}
