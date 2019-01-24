import {  rule,prop, } from "@rxweb/reactive-form-validators"

export class AddressInfo {

	@prop()
	zipcode: number;

	@prop()
	countryName: string;

	//If you want to apply conditional expression of type 'function'
	@rule({customRules:[(entity) => {return entity.zipcode == 4000 ? { 'required': 'This field is dependent on the zipcode and countryName field' } : null;}]  ,conditionalExpression:(x,y) => x.countryName == "India" }) 
	stateName: string;

	//If you want to apply conditional expression of type 'string'
	@rule({customRules:[(entity) => {return entity.zipcode == 4000 ? { 'required': 'This field is dependent on the zipcode and countryName field' } : null;}]  ,conditionalExpression:'x => x.countryName =="India"' }) 
	cityName: string;

	@rule({customRules:[(entity) => {return entity.zipcode == 10001 ? { 'required': 'This field is dependent on the zipcode field' } : null;}] }) 
	colonyName: string;

}
