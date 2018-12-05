import {  pattern,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@pattern({expression:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')} }) 
	userName: string;

	//If you want to apply conditional expression of type 'string'
	@pattern({expression:{'onlyDigit': RegExp('/^[0-9]*$new /')}  ,conditionalExpression:'x => x.userName=="Bharat"' }) 
	age: string;

	//If you want to apply conditional expression of type 'function'
	@pattern({expression:{'onlyDigit': RegExp('/^[0-9]*$/')}  ,conditionalExpression:(x,y) => x.userName == "Bharat"  }) 
	contactNumber: number;

}
