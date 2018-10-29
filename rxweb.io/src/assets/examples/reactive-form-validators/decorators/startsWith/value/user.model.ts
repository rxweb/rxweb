import {  startsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	//If you want to apply conditional expression of type 'function'
	@startsWith({value:'Senior'  ,conditionalExpression:(x,y) => x.name == "Bharat"  }) 
	profession: string;

}
