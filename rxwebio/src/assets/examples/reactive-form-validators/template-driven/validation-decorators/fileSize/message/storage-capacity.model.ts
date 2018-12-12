import {  fileSize, } from "@rxweb/reactive-form-validators"

export class StorageCapacity {

	@fileSize({maxSize:50  ,message:'{{0}} is not a valid size' }) 
	videoStorageSize: string;

}
