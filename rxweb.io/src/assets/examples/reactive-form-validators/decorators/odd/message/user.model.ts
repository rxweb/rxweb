import {  odd,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@odd({message:'{{0}} is not an odd number' }) 
	multiplesOfOddNumber: number;

}
