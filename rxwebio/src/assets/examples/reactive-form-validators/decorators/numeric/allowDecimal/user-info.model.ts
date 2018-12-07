import {  numeric,prop, NumericValueType, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@numeric({allowDecimal:true }) 
	decimalNumber: number;

}
