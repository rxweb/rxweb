import {  alpha, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class AddressInfo {

	@prop()
	countryName: string;

	@prop()
	countryCode: string;

	@prop()
	stateName: string;

	@prop()
	stateCode: string;

}
