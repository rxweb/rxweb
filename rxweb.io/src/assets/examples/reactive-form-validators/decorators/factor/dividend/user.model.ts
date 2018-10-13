import {  factor,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@factor({dividend:50  ,message:'{{0}} is not a factor of 50' }) 
	fourthNumber: number;

}
