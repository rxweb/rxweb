import {  maxDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	userName: string;

	@maxDate({value:new Date(2018,7,30) }) 
	allocationDate: Date;

	//If you want to apply conditional expression of type 'function'
	@maxDate({value:new Date(2018,7,30)  ,conditionalExpression:(x,y) => x.userName == "Bharat"  }) 
	birthDate: Date;

	//If you want to apply conditional expression of type 'string'
	@maxDate({value:new Date(2018,7,30)  ,conditionalExpression:'x => x.userName == "Bharat"' }) 
	admissionDate: Date;

	@maxDate({value:new Date(2018,7,30)  ,message:'{{0}} exceeds the Maximum Date Limit' }) 
	registrationDate: Date;

	@prop()
	enrollmentDate: Date;

	@maxDate({fieldName:'enrollmentDate' }) 
	lastRegistrationDate: Date;

}
