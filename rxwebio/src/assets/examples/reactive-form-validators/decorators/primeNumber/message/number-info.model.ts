import {  primeNumber, } from   "@rxweb/reactive-form-validators"   

export class NumberInfo {

	@primeNumber({message:'{{0}} is not a prime number' }) 
	firstNumber: string;
	
	
}
