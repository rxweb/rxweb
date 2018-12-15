import {  fileSize,prop, } from "@rxweb/reactive-form-validators"

export class StorageCapacity {

	@prop()
	device: string;

	@prop()
	photographStorageSize: string;

	@prop()
	videoStorageSize: string;

}
