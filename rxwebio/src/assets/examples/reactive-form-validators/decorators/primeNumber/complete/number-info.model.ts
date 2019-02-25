import {  primeNumber,prop, } from   "@rxweb/reactive-form-validators"   

export class NumberInfo {

	@prop()
	numberType: string;

	//If you want to apply conditional expression of type 'function'
	@primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime"  }) 
	secondNumber: string;
	
	
	//If you want to apply conditional expression of type 'string'
	@primeNumber({conditionalExpression:'x => x.numberType =="Prime"' }) 
	thirdNumber: string;
	
	
	@primeNumber({message:'{{0}} is not a prime number' }) 
	firstNumber: string;
	
	
}
