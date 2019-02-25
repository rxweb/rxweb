import {  longitude, } from   "@rxweb/reactive-form-validators"   

export class Country {

	@longitude({message:'{{0}} is not a longitude' }) 
	firstCountryLongitude: string;
	
	
	

}
