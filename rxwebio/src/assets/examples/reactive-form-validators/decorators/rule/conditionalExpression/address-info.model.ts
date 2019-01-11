import { rule, prop, } from "@rxweb/reactive-form-validators"

export class AddressInfo {

	@prop()
	zipcode: number;

	@prop()
	countryName: string;

	//If you want to apply conditional expression of type 'string'
	@rule({ customRules: [(entity) => { return entity.zipcode == 4000 ? { 'required': 'This field is required' } : null; }], conditionalExpression: 'x => x.countryName =="India"' })
	cityName: string;

	//If you want to apply conditional expression of type 'function'
	@rule({ customRules: [(entity) => { return entity.zipcode == 4000 ? { 'required': 'This field is required' } : null; }], conditionalExpression: (x, y) => x.countryName == "India" })
	stateName: string;

}
