import {  maxNumber,prop, } from "@rxweb/reactive-form-validators"

export class SubjectDetails {

	@maxNumber({value:50 }) 
	passingMarks: number;

}
