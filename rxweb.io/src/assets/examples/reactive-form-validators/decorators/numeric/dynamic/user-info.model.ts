import {  numeric,prop, NumericValueType, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@prop()
	dataType: string;

	@prop()
	realNumber: number;

	@prop()
	negativeNumber: number;

}
