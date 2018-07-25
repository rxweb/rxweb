import {prop} from '@rxweb/reactive-form-validators'
export class SubjectDetails {

	@prop()
	subjectCode: string;

	@prop()
	maximumMarks: number;

	@prop()
	passingMarks: number;

}
