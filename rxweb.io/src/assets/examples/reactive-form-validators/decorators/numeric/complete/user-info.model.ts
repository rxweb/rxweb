import {  numeric,prop, NumericValueType, } from "@rxweb/reactive-form-validators"

export class UserInfo {

	@prop()
	dataType: string;

	//If you want to apply conditional expression of type 'function'
	@numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false  ,conditionalExpression:(x,y) => x.dataType == "Number"  }) 
	integerNumber: number;

	//If you want to apply conditional expression of type 'string'
	@numeric({acceptValue:NumericValueType.Both  ,allowDecimal:false  ,conditionalExpression:'x => x.dataType == "Number"' }) 
	realNumber: number;

	@numeric({acceptValue:NumericValueType.NegativeNumber  ,allowDecimal:true  ,message:'{{0}} is not a negative number' }) 
	negativeNumber: number;

}
