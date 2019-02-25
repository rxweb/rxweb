import {  latLong,prop, } from   "@rxweb/reactive-form-validators"   

export class Country {

	@prop()
	continent: string;

	//If you want to apply conditional expression of type 'function'
	@latLong({conditionalExpression:(x,y) => x.continent == "Asia"  }) 
	secondCountry: string;
	
	
	

	//If you want to apply conditional expression of type 'string'
	@latLong({conditionalExpression:'x => x.continent =="Asia"' }) 
	thirdCountry: string;
	
	
	

	@latLong({message:'{{0}} is not a proper proper Latitude or Longitude' }) 
	firstCountry: string;
	
	
	

}
