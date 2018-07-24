import {  maxNumber, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class SubjectDetails {

	@prop()
	subjectCode: string;

	@prop()
	maximumMarks: number;

	@prop()
	passingMarks: number;

}
