import {  pattern,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@pattern({pattern:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')} }) 
	userName: string;

	@pattern({pattern:{'zipCode':RegExp('/^\d{5}(?:[-\s]\d{4})?$/') }  ,message:'Zipcode must be 5 digits' }) 
	zipCode: string;

	//If you want to apply conditional expression of type 'function'
	@pattern({pattern:{'onlyDigit': RegExp('/^[0-9]*$/')}  ,conditionalExpression:(x,y) => x.userName == "John"  }) 
	contactNumber: number;

	//If you want to apply conditional expression of type 'string'
	@pattern({pattern:{'onlyDigit': RegExp('/^[0-9]*$/')}  ,conditionalExpression:'x => x.userName=="John"' }) 
	age: string;

}
