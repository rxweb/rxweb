import {  digit, } from "@rxweb/reactive-form-validators"
export class User {

	@digit() 
	age: number;

	@digit({conditionalExpressions:(x,y) =>{ return  x.age >= 25 } }) 
	phoneNumber: number;

	@digit({message:'Please enter only digit.' }) 
	mobileNumber: number;

}
