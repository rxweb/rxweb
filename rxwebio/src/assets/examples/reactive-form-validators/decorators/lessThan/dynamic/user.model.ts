import {  lessThan,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	obtainedMarks: number;

	@prop()
	otherActivityMarks: number;

	@prop()
	passingMarks: number;

	@prop()
	otherMarks: number;

}
