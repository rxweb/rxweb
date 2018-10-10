import {  factor,prop, } from "@rxweb/reactive-form-validators"

export class User {

	//If you want to apply conditional expression of type 'function'
	@factor({fieldName:"firstNumber"  ,conditionalExpression:(x,y) =>{ return  x.firstNumber == 25 } }) 
	secondNumber: number;

}
