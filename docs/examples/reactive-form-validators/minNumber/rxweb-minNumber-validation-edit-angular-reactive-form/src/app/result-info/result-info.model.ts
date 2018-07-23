import {  minNumber, } from "@rxweb/reactive-form-validators"
export class ResultInfo {

	@minNumber() 
	maths: number;

}
