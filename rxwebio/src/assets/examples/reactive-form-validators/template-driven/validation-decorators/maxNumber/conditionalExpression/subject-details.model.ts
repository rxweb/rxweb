import {  maxNumber,prop, } from "@rxweb/reactive-form-validators"

export class SubjectDetails {

	@prop()
	subjectCode: string;

	//If you want to apply conditional expression of type 'string'
	@maxNumber({value:100  ,conditionalExpression:'x => x.subjectCode == "8CS5A"' }) 
	obtainedMarks: number;

	//If you want to apply conditional expression of type 'function'
	@maxNumber({value:100  ,conditionalExpression:(x,y) => x.subjectCode == "8CS5A"  }) 
	maximumMarks: number;

}
