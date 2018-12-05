import {  numeric,prop, NumericValueType, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@prop()
	dataType: string;

	@numeric({acceptValue:NumericValueType.NegativeNumber  ,message:'{{0}} is not a negative number' }) 
	negativeNumber: number;

	@numeric({allowDecimal:true  ,message:'{{0}} is not a positive decimal number' }) 
	decimalNumber: number;

	//If you want to apply conditional expression of type 'function'
	@numeric({acceptValue:NumericValueType.PositiveNumber  ,conditionalExpression:(x,y) => x.dataType == "Positive"  }) 
	integerNumber: number;

	//If you want to apply conditional expression of type 'string'
	@numeric({acceptValue:NumericValueType.Both  ,conditionalExpression:'x => x.dataType == "Real"' }) 
	realNumber: number;

}
