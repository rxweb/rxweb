import {  minDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	userName: string;

	//If you want to apply conditional expression of type 'string'
	@minDate({value:new Date(2018,7,30)  ,conditionalExpression:'x => x.userName == "John"' }) 
	admissionDate: Date;

	//If you want to apply conditional expression of type 'function'
	@minDate({value:new Date(2018,7,30)  ,conditionalExpression:(x,y) => x.userName == "John"  }) 
	birthDate: Date;

}
