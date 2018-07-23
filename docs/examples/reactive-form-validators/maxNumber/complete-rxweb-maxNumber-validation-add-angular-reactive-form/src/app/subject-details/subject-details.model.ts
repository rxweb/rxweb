import {  maxNumber, } from "@rxweb/reactive-form-validators"
export class SubjectDetails {

	@maxNumber() 
	subjectCode: string;

	@maxNumber({value:100  ,conditionalExpressions:x => x.subjectCode == '8CS5A' }) 
	maximumMarks: number;

	@maxNumber({value:50  ,message:'{{0}} exceeds the Maximum Students Limit' }) 
	numberOfStudents: number;

}
