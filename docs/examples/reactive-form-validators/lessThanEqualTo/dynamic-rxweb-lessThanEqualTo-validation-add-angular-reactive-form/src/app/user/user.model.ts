import {prop} from '@rxweb/reactive-form-validators'
export class User {

	@prop()
	totalMarks: number;

	@prop()
	obtainedMarks: number;

	@prop()
	otherMarks: number;

}
