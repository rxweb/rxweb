import {  lessThanEqualTo, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class User {

	@prop()
	obtainedMarks: number;

	@prop()
	totalMarks: number;

	@prop()
	otherMarks: number;

}
