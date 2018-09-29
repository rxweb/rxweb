import {  alpha,prop,} from "@rxweb/reactive-form-validators"

export class AddressInfo {

	@alpha({message:'You can enter only alphabets.' }) 
	stateCode: string;

}
