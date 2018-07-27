import {  pattern, } from "@rxweb/reactive-form-validators"
export class User {

	@pattern({pattern:{'onlyAlpha': /^[A-Z]+$/} }) 
	userName: string;

	@pattern({pattern:{'zipCode':/^\d{5}(?:[-\s]\d{4})?$/ }  ,message:'Zipcode must be 5 digits' }) 
	zipCode: string;

	@pattern({pattern:{'onlyDigit': /^[0-9]*$/}  ,conditionalExpressions:x=>x.userName=='John' }) 
	age: string;

}
