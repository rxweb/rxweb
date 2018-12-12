import {  minDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	userName: string;

	@minDate({value:'07/30/2018' }) 
	allocationDate: Date;

	//If you want to apply conditional expression of type 'function'
	@minDate({value:'07/30/2018'  ,conditionalExpression:(x,y) => x.userName == "Bharat"  }) 
	birthDate: Date;

	//If you want to apply conditional expression of type 'string'
	@minDate({value:'07/30/2018'  ,conditionalExpression:'x => x.userName == "Bharat"' }) 
	admissionDate: Date;

	@minDate({value:'07/30/2018'  ,message:'{{0}} exceeds the Minimum Date Limit' }) 
	registrationDate: Date;

	@prop()
	enrollmentDate: Date;

	@minDate({fieldName:'enrollmentDate' }) 
	lastRegistrationDate: Date;

}
