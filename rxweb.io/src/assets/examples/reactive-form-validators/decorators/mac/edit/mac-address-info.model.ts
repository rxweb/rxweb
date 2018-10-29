import {  mac,prop, } from "@rxweb/reactive-form-validators"

export class MacAddressInfo {

	@mac() 
	systemMacAddress: string;

}
