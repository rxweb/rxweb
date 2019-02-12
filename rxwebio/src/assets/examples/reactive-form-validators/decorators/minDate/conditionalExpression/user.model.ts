import {  minDate,prop, } from   "@rxweb/reactive-form-validators"   
 
export class User {

	@prop()
	userName: string;

	//If you want to apply conditional expression of type 'string'
	@minDate({value:'07/30/2018'  ,conditionalExpression:'x => x.userName == "Bharat"' }) 
	admissionDate: string;

	//If you want to apply conditional expression of type 'function'
	@minDate({value:'07/30/2018'  ,conditionalExpression:(x,y) => x.userName == "Bharat"  }) 
	birthDate: string;

}
