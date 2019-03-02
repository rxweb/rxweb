import {  greaterThanEqualTo,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	admissionAge: number;

	//If you want to apply conditional expression of type 'string'
	@greaterThanEqualTo({fieldName:'admissionAge'  ,conditionalExpression:'x => x.admissionAge >= 18 ' }) 
	memberAge: number;
	
	
	//If you want to apply conditional expression of type 'function'
	@greaterThanEqualTo({fieldName:'admissionAge'  ,conditionalExpression:(x,y) => x.admissionAge >= 18  }) 
	voterAge: number;
	
	
}
