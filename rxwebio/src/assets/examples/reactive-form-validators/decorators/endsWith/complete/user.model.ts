import {  endsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@endsWith({value:'t'  ,message:'{{0}} does not ends with `t`' }) 
	name: string;

	//If you want to apply conditional expression of type 'function'
	@endsWith({value:'r'  ,conditionalExpression:(x,y) => x.name == "Bharat"  }) 
	profession: string;

	//If you want to apply conditional expression of type 'string'
	@endsWith({value:'#'  ,conditionalExpression:'x => x.name =="Bharat"' }) 
	taskId: string;

}
