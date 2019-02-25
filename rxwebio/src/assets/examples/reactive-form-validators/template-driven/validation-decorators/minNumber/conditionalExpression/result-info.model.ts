import {  minNumber, } from   "@rxweb/reactive-form-validators"   

export class ResultInfo {

	@minNumber({value:35 }) 
	maths: number;
	
	
	

	@minNumber({value:35  ,conditionalExpression:'x => x.maths == 50' }) 
	statstics: number;
	
	
	

	//If you want to apply conditional expression of type 'function'
	@minNumber({value:35  ,conditionalExpression:(x,y) => x.maths == 50  }) 
	english: number;
	
	
	

}
