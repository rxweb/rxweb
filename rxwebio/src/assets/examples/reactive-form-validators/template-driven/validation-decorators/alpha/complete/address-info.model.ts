import {  alpha, } from   "@rxweb/reactive-form-validators"   

export class AddressInfo {

	@alpha() 
	countryName: string;
	
	
	

	//If you want to apply conditional expression of type 'function'
	@alpha({conditionalExpression:(x,y) => x.countryName == "India" }) 
	countryCode: string;
	
	
	

	//If you want to apply conditional expression of type 'string'
	@alpha({conditionalExpression:'x => x.countryName =="India"' }) 
	cityName: string;
	
	
	

	@alpha({allowWhiteSpace:true }) 
	stateName: string;
	
	
	

	@alpha({message:'You can enter only alphabets.' }) 
	stateCode: string;
	
	
	

}
