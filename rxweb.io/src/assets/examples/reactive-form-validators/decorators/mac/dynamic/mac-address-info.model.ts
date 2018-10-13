import {  mac,prop, } from "@rxweb/reactive-form-validators"

export class MacAddressInfo {

	@prop()
	device: string;

	@prop()
	macAddress: string;

	@prop()
	localMacAddress: string;

	@prop()
	systemMacAddress: string;

}
