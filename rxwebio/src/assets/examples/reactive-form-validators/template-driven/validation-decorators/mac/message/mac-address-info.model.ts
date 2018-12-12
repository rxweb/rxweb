import {  mac, } from "@rxweb/reactive-form-validators"

export class MacAddressInfo {

	@mac({message:'{{0}} is not a MAC address' }) 
	systemMacAddress: string;

}
