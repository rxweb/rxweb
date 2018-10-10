import {  minNumber,prop, } from "@rxweb/reactive-form-validators"

export class ResultInfo {

	@minNumber({value:35 }) 
	maths: number;

	@minNumber({value:35  ,message:'Number should not be less than 35' }) 
	science: number;

	//If you want to apply conditional expression of type 'function'
	@minNumber({value:35  ,conditionalExpression:(x,y) =>{ return  x.maths == 50 } }) 
	english: number;

	@minNumber({value:35  ,conditionalExpression:x => x.maths == 50 }) 
	statstics: number;

}
