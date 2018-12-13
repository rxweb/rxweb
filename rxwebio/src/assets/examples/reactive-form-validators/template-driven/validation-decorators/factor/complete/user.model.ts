import {  factor,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	firstNumber: number;

	@factor({fieldName:'firstNumber' }) 
	fifthNumber: number;

	//If you want to apply conditional expression of type 'function'
	@factor({fieldName:'firstNumber'  ,conditionalExpression:(x,y) =>x.firstNumber == 25  }) 
	secondNumber: number;

	//If you want to apply conditional expression of type 'string'
	@factor({fieldName:'firstNumber'  ,conditionalExpression:'x => x.firstNumber == 25' }) 
	thirdNumber: number;

	@factor({dividend:50 }) 
	fourthNumber: number;

	@factor({dividend:30  ,message:'{{0}} is not a factor of 50' }) 
	sixthNumber: number;

}
