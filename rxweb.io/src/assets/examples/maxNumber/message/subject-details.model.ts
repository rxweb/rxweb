import {  maxNumber,prop,} from "@rxweb/reactive-form-validators"

export class SubjectDetails {

	@maxNumber({value:50  ,message:'{{0}} exceeds the Maximum marks Limit' }) 
	passingMarks: number;

}
