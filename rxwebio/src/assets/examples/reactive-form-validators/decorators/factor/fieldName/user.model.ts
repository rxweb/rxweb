import {  factor,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	firstNumber: number;

	//If you want to apply conditional expression of type 'string'
	@factor({fieldName:'firstNumber'  ,conditionalExpression:'x => x.firstNumber == 25' }) 
	thirdNumber: number;

	@factor({fieldName:'firstNumber' }) 
	fifthNumber: number;

}
