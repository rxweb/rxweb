import {  latitude,prop, } from   "@rxweb/reactive-form-validators"   

export class Country {

	@prop()
	continent: string;

	//If you want to apply conditional expression of type 'string'
	@latitude({conditionalExpression:'x => x.continent =="Asia"' }) 
	thirdCountryLatitude: string;
	
	
	//If you want to apply conditional expression of type 'function'
	@latitude({conditionalExpression:(x,y) => x.continent == "Asia"  }) 
	secondCountryLatitude: string;
	
	
}
