import {  pattern, } from "@rxweb/reactive-form-validators"

export class User {

	@pattern({expression:{'onlyAlpha': /^[A-Za-z]+$/} }) 
	userName: string;

	@pattern({expression:{'zipCode':/^[0-9]{5}(?:-[0-9]{4})?$/ }  ,message:'Zip code should match 12345 or 12345-6789' }) 
	zipCode: string;

	//If you want to apply conditional expression of type 'function'
	@pattern({expression:{'onlyDigit': /^[0-9]*$/}  ,conditionalExpression:(x,y) => x.userName == "Bharat"  }) 
	contactNumber: number;

	//If you want to apply conditional expression of type 'string'
	@pattern({expression:{'onlyDigit': /^[0-9]*$/}  ,conditionalExpression:'x => x.userName=="Bharat"' }) 
	age: string;

}
