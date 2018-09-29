import {  lessThanEqualTo,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@lessThanEqualTo({fieldName:'totalMarks'  ,message:'Please enter number less than 100.' }) 
	otherMarks: number;

}
