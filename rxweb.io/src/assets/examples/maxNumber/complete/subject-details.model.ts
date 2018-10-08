import {  maxNumber,prop,} from "@rxweb/reactive-form-validators"

export class SubjectDetails {

	@prop()
	subjectCode: string;
	@maxNumber({value:100  ,conditionalExpression:x => x.subjectCode == "8CS5A" }) 
	maximumMarks: number;
	@maxNumber({value:50  ,message:'{{0}} exceeds the Maximum marks Limit' }) 
	passingMarks: number;
}
