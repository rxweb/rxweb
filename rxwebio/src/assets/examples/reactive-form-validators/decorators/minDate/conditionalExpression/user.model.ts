import {  minDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	userName: string;

	@prop()
	enrollmentDate: Date;

	//If you want to apply conditional expression of type 'string'
	@minDate({value:new Date(2018,7,30)  ,conditionalExpression:'x => x.userName == "Bharat"' }) 
	admissionDate: Date;

	//If you want to apply conditional expression of type 'function'
	@minDate({value:new Date(2018,7,30)  ,conditionalExpression:(x,y) => x.userName == "Bharat"  }) 
	birthDate: Date;

}
