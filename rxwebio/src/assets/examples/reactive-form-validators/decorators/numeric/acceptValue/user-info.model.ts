import {  numeric,prop, NumericValueType, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@numeric({acceptValue:NumericValueType.NegativeNumber }) 
	negativeNumber: number;

}
