import {  maxDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	userName: string;

	//If you want to apply conditional expression of type 'function'
	@maxDate({value:new Date(2018,7,30)  ,conditionalExpression:x => x.userName == "John" }) 
	birthDate: Date;

	//If you want to apply conditional expression of type 'string'
	@maxDate({value:new Date(2018,7,30)  ,conditionalExpression:x => x.userName == "John" }) 
	admissionDate: Date;

	@maxDate({value:new Date(2018,7,30)  ,message:'{{0}} exceeds the Maximum Date Limit' }) 
	registrationDate: Date;

}
