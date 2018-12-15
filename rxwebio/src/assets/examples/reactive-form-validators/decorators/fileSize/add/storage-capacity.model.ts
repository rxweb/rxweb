import {  fileSize, } from "@rxweb/reactive-form-validators"

export class StorageCapacity {

	@fileSize({maxSize:50 }) 
	videoStorageSize: string;

}
