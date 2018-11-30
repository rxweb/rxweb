import {  primeNumber,prop, } from "@rxweb/reactive-form-validators"

export class NumberInfo {

	@primeNumber() 
	firstNumber: string;

}
