import {  maxDate,prop, } from   "@rxweb/reactive-form-validators"   
 
export class User {

	@prop()
	userName: string;

	//If you want to apply conditional expression of type 'string'
	@maxDate({value:'07/30/2018'  ,conditionalExpression:'x => x.userName == "Bharat"' }) 
	admissionDate: string;

	//If you want to apply conditional expression of type 'function'
	@maxDate({value:'07/30/2018'  ,conditionalExpression:(x,y) => x.userName == "Bharat"  }) 
	birthDate: string;

}
