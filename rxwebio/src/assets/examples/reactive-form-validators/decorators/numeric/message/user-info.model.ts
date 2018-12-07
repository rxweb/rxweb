import {  numeric,prop, NumericValueType, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@numeric({message:'{{0}} is not a positive number' }) 
	positiveNumber: number;

}
