import {  maxNumber,prop,} from "@rxweb/reactive-form-validators"

export class SubjectDetails {

	@prop()
	subjectCode: string;
	@maxNumber({value:100  ,conditionalExpressions:x => x.subjectCode == "8CS5A" }) 
	maximumMarks: number;
}
