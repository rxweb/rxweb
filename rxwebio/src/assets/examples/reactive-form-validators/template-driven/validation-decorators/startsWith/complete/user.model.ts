import {  startsWith, } from   "@rxweb/reactive-form-validators"   

export class User {

	@startsWith({value:'B' }) 
	name: string;
	
	
	//If you want to apply conditional expression of type 'function'
	@startsWith({value:'Senior'  ,conditionalExpression:(x,y) => x.name == "Bharat"  }) 
	profession: string;
	
	
	//If you want to apply conditional expression of type 'string'
	@startsWith({value:'#'  ,conditionalExpression:'x => x.name =="Bharat"' }) 
	taskId: string;
	
	
	@startsWith({value:'R'  ,message:'{{0}} does not starts with `R`' }) 
	company: string;
	
	
}
