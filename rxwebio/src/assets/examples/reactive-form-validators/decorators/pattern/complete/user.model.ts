import {  pattern,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@pattern({expression:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')} }) 
	userName: string;

	@pattern({expression:{'zipCode':RegExp('^[0-9]{5}(?:-[0-9]{4})?$') }  ,message:'Zip code should match 12345 or 12345-6789' }) 
	zipCode: string;

	//If you want to apply conditional expression of type 'function'
	@pattern({expression:{'onlyDigit': RegExp('/^[0-9]*$/')}  ,conditionalExpression:(x,y) => x.userName == "Bharat"  }) 
	contactNumber: number;

	//If you want to apply conditional expression of type 'string'
	@pattern({expression:{'onlyDigit': RegExp('/^[0-9]*$new /')}  ,conditionalExpression:'x => x.userName=="Bharat"' }) 
	age: string;

}
