import {  numeric,prop, NumericValueType, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	//If you want to apply conditional expression of type 'function'
	@numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false  ,conditionalExpression:(x,y) => x.dataType == "Number"  }) 
	integerNumber: number;

}
