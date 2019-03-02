import {  endsWith, } from   "@rxweb/reactive-form-validators"   

export class User {

	@endsWith({value:'t' }) 
	name: string;
	
	
	//If you want to apply conditional expression of type 'string'
	@endsWith({value:'1'  ,conditionalExpression:'x => x.name =="Bharat"' }) 
	taskId: string;
	
	
	//If you want to apply conditional expression of type 'function'
	@endsWith({value:'r'  ,conditionalExpression:(x,y) => x.name == "Bharat"  }) 
	profession: string;
	
	
}
