import {  pattern,prop, } from "@rxweb/reactive-form-validators"

export class User {

	//If you want to apply conditional expression of type 'function'
	@pattern({pattern:{'onlyDigit': RegExp('/^[0-9]*$/')}  ,conditionalExpression:(x,y) =>{ return  x.userName == "John" } }) 
	contactNumber: number;

}
