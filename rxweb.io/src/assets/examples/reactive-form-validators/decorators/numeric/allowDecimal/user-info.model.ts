import {  numeric,prop, NumericValueType, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@numeric({allowDecimal:true  ,message:'{{0}} is not a decimal number' }) 
	decimalNumber: number;

}
