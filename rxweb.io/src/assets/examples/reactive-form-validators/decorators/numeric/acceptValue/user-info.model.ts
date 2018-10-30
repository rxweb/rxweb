import {  numeric,prop, NumericValueType, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@numeric({acceptValue:NumericValueType.NegativeNumber  ,message:'{{0}} is not a negative number' }) 
	negativeNumber: number;

}
