import {  latLong, } from   "@rxweb/reactive-form-validators"   

export class Country {

	@latLong({message:'{{0}} is not a proper proper Latitude or Longitude' }) 
	firstCountry: string;
	
	
	

}
