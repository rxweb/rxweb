import {  numeric,prop, NumericValueType, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@prop()
	dataType: string;

	@prop()
	negativeNumber: number;

	@prop()
	decimalNumber: number;

	@prop()
	realNumber: number;

	@prop()
	positiveNumber: number;

}
