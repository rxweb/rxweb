import {  endsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	//If you want to apply conditional expression of type 'function'
	@endsWith({value:'r'  ,conditionalExpression:(x,y) => x.name == "Adam"  }) 
	profession: string;

}
