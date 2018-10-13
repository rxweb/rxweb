import {  mac,prop, } from "@rxweb/reactive-form-validators"

export class MacAddressInfo {

	@prop()
	username1: string;

	@mac() 
	systemMacAddress: string;

}
