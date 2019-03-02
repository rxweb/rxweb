import {  numeric, NumericValueType, } from   "@rxweb/reactive-form-validators"   

export class UserInfo {

	@numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false }) 
	integerNumber: number;
	
	
}
