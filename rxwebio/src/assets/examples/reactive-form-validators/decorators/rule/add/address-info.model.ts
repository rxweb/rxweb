import {  rule,prop, } from "@rxweb/reactive-form-validators"

export class AddressInfo {

	@prop()
	zipcode: number;

	@rule({customRules:[(entity) => {return entity.zipcode == 10001 ? { 'required': 'This field is dependent on the zipcode field' } : null;}] }) 
	colonyName: string;

}
