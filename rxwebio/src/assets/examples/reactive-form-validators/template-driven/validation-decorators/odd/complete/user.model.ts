import {  odd,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	type: string;

	//If you want to apply conditional expression of type 'function'
	@odd({conditionalExpression:(x,y) => x.type == "Odd"  }) 
	number: number;
	
	
	//If you want to apply conditional expression of type 'string'
	@odd({conditionalExpression:'x => x.type == "Odd"' }) 
	oddNumber: number;
	
	
	@odd({message:'{{0}} is not an odd number' }) 
	multiplesOfOddNumber: number;
	
	
}
