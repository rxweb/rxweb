import {  minNumber,prop, } from "@rxweb/reactive-form-validators"

export class ResultInfo {

	//If you want to apply conditional expression of type 'function'
	@minNumber({value:35  ,conditionalExpression:(x,y) =>{ return  x.maths == 50 } }) 
	english: number;

}
