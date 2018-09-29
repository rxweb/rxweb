import {  minNumber,prop,} from "@rxweb/reactive-form-validators"

export class ResultInfo {

	@minNumber({value:35 }) 
	maths: number;

}
