import {  maxDate,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	userName: string;

	@maxDate({value:'07/30/2018' }) 
	allocationDate: Date;

	//If you want to apply conditional expression of type 'function'
	@maxDate({value:'07/30/2018'  ,conditionalExpression:(x,y) => x.userName == "Bharat"  }) 
	birthDate: Date;

	//If you want to apply conditional expression of type 'string'
	@maxDate({value:'07/30/2018'  ,conditionalExpression:'x => x.userName == "Bharat"' }) 
	admissionDate: Date;

	@maxDate({value:'07/30/2018'  ,message:'{{0}} exceeds the Maximum Date Limit' }) 
	registrationDate: Date;

	@prop()
	enrollmentDate: Date;

	@maxDate({fieldName:'enrollmentDate' }) 
	lastRegistrationDate: Date;

}
