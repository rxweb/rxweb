import {  upperCase, } from   "@rxweb/reactive-form-validators"   

export class Location {

	@upperCase() 
	countryName: string;
	
	
	//If you want to apply conditional expression of type 'string'
	@upperCase({conditionalExpression:'x => x.countryName == "INDIA"' }) 
	cityName: string;
	
	
	//If you want to apply conditional expression of type 'function'
	@upperCase({conditionalExpression:(x,y) => x.countryName == "INDIA"  }) 
	stateName: string;
	
	
}
